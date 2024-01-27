import * as z from "zod";
export const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/, {
      message: "Must be lowercase letters or dashes without spaces"
    }),
  description: z.string().min(10)
});

export const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10)
});

export const createCommentSchema = z.object({
  content: z.string().min(3)
});
