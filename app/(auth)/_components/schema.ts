import { z } from "zod";

export const phoneNumberSchema = z.object({
  phone: z.string().regex(/^\d{10}/, {
    message: "Phone number must be 10 digits",
  }),
});

export type phoneNumberData = z.infer<typeof phoneNumberSchema>;

export const detailsSchema = z.object({
  name: z.string().min(5, "Name is required"),
  about: z.string(),
});

export type DetailsData = z.infer<typeof detailsSchema>;
