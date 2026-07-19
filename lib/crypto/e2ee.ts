// Lightweight end-to-end encryption for chat messages, built on tweetnacl.
// Browser-only (uses localStorage) — only call these from client components.
//
// Identity: each user has an X25519 keypair (nacl.box). The public key is
// synced to the backend (User.publicKey); the private key never leaves the
// browser (persisted in localStorage, scoped per user id).
//
// Per message: a random symmetric key encrypts the text (nacl.secretbox).
// That symmetric key is then wrapped once per chat member (including the
// sender) via nacl.box, using the sender's private key + that member's
// public key — an ECDH shared secret, so the same call also decrypts it
// (box.open with the same two public/private keys).
import nacl from "tweetnacl";
import {
  encodeBase64,
  decodeBase64,
  encodeUTF8,
  decodeUTF8,
} from "tweetnacl-util";

const STORAGE_PREFIX = "messengerx:e2ee:sk:";

export interface IdentityKeyPair {
  publicKey: string;
  secretKey: string;
}

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}${userId}`;
}

// Generates (once) and persists this browser's identity keypair for a user.
export function getOrCreateIdentityKeyPair(userId: string): IdentityKeyPair {
  const existing = window.localStorage.getItem(storageKey(userId));
  if (existing) {
    const secretKey = existing;
    const publicKey = encodeBase64(
      nacl.box.keyPair.fromSecretKey(decodeBase64(secretKey)).publicKey,
    );
    return { publicKey, secretKey };
  }
  const keyPair = nacl.box.keyPair();
  const secretKey = encodeBase64(keyPair.secretKey);
  window.localStorage.setItem(storageKey(userId), secretKey);
  return { publicKey: encodeBase64(keyPair.publicKey), secretKey };
}

export interface EncryptedPayload {
  ciphertext: string;
  nonce: string;
}

export interface MessageKeyPayload {
  userId: string;
  encryptedKey: string;
  nonce: string;
}

function decodeBytes(value: unknown): Uint8Array | null {
  if (!value) return null;
  if (value instanceof Uint8Array) return value;
  if (Array.isArray(value) && value.every((byte) => Number.isInteger(byte))) {
    return new Uint8Array(value);
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    "data" in value &&
    (value as { type?: unknown }).type === "Buffer" &&
    Array.isArray((value as { data?: unknown }).data)
  ) {
    return new Uint8Array((value as { data: number[] }).data);
  }
  if (typeof value !== "string") return null;
  try {
    return decodeBase64(value);
  } catch {
    return null;
  }
}

function decodeBase64WithLength(
  value: unknown,
  expectedLength: number,
): Uint8Array | null {
  const bytes = decodeBytes(value);
  if (!bytes || bytes.length !== expectedLength) return null;
  return bytes;
}

// Encrypts `plaintext` once, wraps the symmetric key for every recipient
// that has published a public key. Members without one silently can't
// decrypt this message (matches real E2E semantics).
export function encryptMessage(
  plaintext: string,
  recipients: { userId: string; publicKey?: string | null }[],
  mySecretKeyB64: string,
): { content: EncryptedPayload; keys: MessageKeyPayload[] } {
  const symmetricKey = nacl.randomBytes(nacl.secretbox.keyLength);
  const contentNonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const ciphertext = nacl.secretbox(
    decodeUTF8(plaintext),
    contentNonce,
    symmetricKey,
  );
  const mySecretKey = decodeBase64(mySecretKeyB64);

  const keys: MessageKeyPayload[] = [];
  for (const recipient of recipients) {
    if (!recipient.publicKey) continue;
    const keyNonce = nacl.randomBytes(nacl.box.nonceLength);
    const encryptedKey = nacl.box(
      symmetricKey,
      keyNonce,
      decodeBase64(recipient.publicKey),
      mySecretKey,
    );
    keys.push({
      userId: recipient.userId,
      encryptedKey: encodeBase64(encryptedKey),
      nonce: encodeBase64(keyNonce),
    });
  }

  return {
    content: {
      ciphertext: encodeBase64(ciphertext),
      nonce: encodeBase64(contentNonce),
    },
    keys,
  };
}

// Decrypts a message for the current user. Returns null if it can't be
// decrypted (no wrapped key for us, or the sender's public key is unknown).
export function decryptMessage(
  message: {
    content?: EncryptedPayload | null;
    keys?: MessageKeyPayload[];
  },
  myUserId: string,
  mySecretKeyB64: string,
  senderPublicKeyB64?: string | null,
): string | null {
  if (!message.content || !senderPublicKeyB64) return null;
  const myKeyEntry = message.keys?.find((k) => k.userId === myUserId);
  if (!myKeyEntry) return null;

  const encryptedKey = decodeBytes(myKeyEntry.encryptedKey);
  const keyNonce = decodeBase64WithLength(
    myKeyEntry.nonce,
    nacl.box.nonceLength,
  );
  const senderPublicKey = decodeBase64WithLength(
    senderPublicKeyB64,
    nacl.box.publicKeyLength,
  );
  const mySecretKey = decodeBase64WithLength(
    mySecretKeyB64,
    nacl.box.secretKeyLength,
  );

  if (!encryptedKey || !keyNonce || !senderPublicKey || !mySecretKey) {
    return null;
  }

  const symmetricKey = nacl.box.open(
    encryptedKey,
    keyNonce,
    senderPublicKey,
    mySecretKey,
  );
  if (!symmetricKey) return null;

  const contentCiphertext = decodeBytes(message.content.ciphertext);
  const contentNonce = decodeBase64WithLength(
    message.content.nonce,
    nacl.secretbox.nonceLength,
  );
  if (!contentCiphertext || !contentNonce) return null;

  const plaintextBytes = nacl.secretbox.open(
    contentCiphertext,
    contentNonce,
    symmetricKey,
  );
  if (!plaintextBytes) return null;

  return encodeUTF8(plaintextBytes);
}
