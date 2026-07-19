export interface ChatMember {
  _id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  status?: "online" | "offline";
  lastSeen?: string;
  publicKey?: string;
}

export interface EncryptedPayload {
  ciphertext: string;
  nonce: string;
}

export interface MessageKey {
  userId: string;
  encryptedKey: string;
  nonce: string;
}

export interface MessageAttachment {
  url: string;
  mimeType: string;
  size: number;
  fileNonce: string;
  fileName?: string;
}

export interface Receipt {
  userId: string;
  at: string;
}

export interface ChatMessage {
  _id: string;
  chatId: string;
  sender: string;
  type: "text" | "image" | "video" | "audio" | "file";
  content?: EncryptedPayload;
  attachment?: MessageAttachment;
  keys: MessageKey[];
  replyTo?: string;
  deliveredTo: Receipt[];
  readBy: Receipt[];
  deletedFor: string[];
  edited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatSummary {
  _id: string;
  type: "direct" | "group";
  members: ChatMember[];
  name?: string;
  groupIcon?: string;
  description?: string;
  admins: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: ChatMessage | null;
  unreadCount?: number;
}

export interface MessagesPagination {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}
