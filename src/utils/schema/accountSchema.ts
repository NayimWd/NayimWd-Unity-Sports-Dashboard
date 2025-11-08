import { z } from "zod";

export const accountUpdateSchema = z
  .object({
    Name: z.string(),
    PhoneNumber: z.string(),
    email: z.string(),
  })
  .refine((data) => data.Name || data.PhoneNumber || data.email, {
    message: "At least one field must be provided",
    path: ["_form"],
  });

export const changePhotoSchema = z.object({
  photo: z.custom<File>(
    (file) =>
      file instanceof File &&
      ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    {
      message: "Only JPEG, jpg or PNG files are allowed",
    }
  ),
});

export const changePassordSchema = z
  .object({
    oldPassword: z.string().min(6).max(12),
    newPassword: z.string().min(6).max(12),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from old password",
    path: ["newPassword"],
  });
