import z from "zod";

// registration form schema
export const registrationSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .refine((val) => val !== "", {
      message: "Name is required",
    }),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
  role: z
    .string()
    .refine((val) => ["player", "manager", "umpire"].includes(val), {
      message: "Please select a role",
    }),
  phoneNumber: z.string().min(10, "Miminum 10 Digits are required").max(12),
  photo: z
    .custom<File>((v) => v instanceof File && v.size > 0, {
      message: "Photo is required",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less then 2MB",
    })
    .refine((file) => file.type.startsWith("image/"), "File Must be an image"),
});

// login form schema
export const loginSchema = z.object({
  email: z.string().email("valid emial is required"),
  password: z
    .string()
    .min(6, "At least 6 characters")
    .max(12, "At most 12 characters"),
});

// date picker schema

// blog schema
export const blogSchema = z.object({
  title: z.string().min(10).max(100),
  content: z.string().min(30).max(5000),
  tags: z
    .string()
    .refine(
      (tag) => ["news", "highlight", "tournaments", "awards"].includes(tag),
      {
        message: "Please Select a tag",
      }
    ),
  isPublished: z.boolean(),
  photo: z
    .array(
      z.custom<File>((v) => v instanceof File && v.size > 0, {
        message: "Each file must be a valid image",
      })
    )
    .min(1, { message: "At least one blog image is required" }),
});

// update blog schema
export const updateBlogPhotoSchema = z.object({
  photo: z.array(
    z.custom<File>((v) => v instanceof File && v.size > 0, {
      message: "At least one photo is required",
    })
  ),
});

// update blog
export const updateBlogSchema = z
  .object({
    title: z.string().min(10).max(100).optional(),
    content: z.string().min(30).max(5000).optional(),
    tags: z
      .string()
      .refine(
        (tag) => ["news", "highlight", "tournaments", "awards"].includes(tag),
        {
          message: "Please select a valid tag",
        }
      )
      .optional(),
  })
  .refine((data) => data.title || data.content || data.tags, {
    message: "At least one field must be provided",
    path: ["_form"],
  });

// blog filter schema
export const filterBlogSchema = z.object({
  tags: z
    .string()
    .refine(
      (tag) => ["news", "highlight", "tournaments", "awards", ""].includes(tag),
      {
        message: "Select a valid tag",
      }
    )
    .optional(),
  search: z.string().optional(),
  sort: z.string().optional(),
  isPublished: z.string().optional(),
});

// get all blogs filter schema
export const filterAllBlogsSchema = z.object({
  tags: z
    .string()
    .refine(
      (tag) => ["news", "highlight", "tournaments", "awards", ""].includes(tag),
      {
        message: "Select a valid tag",
      }
    )
    .optional(),
  search: z.string().optional(),
  sort: z.string().optional(),
});
