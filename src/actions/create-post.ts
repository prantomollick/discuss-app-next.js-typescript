"use server";

import { CreatePostSchema } from "@/schema";
import { title } from "process";

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  //TODO: revalidate the topic show page

  const validation = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors
    };
  }

  return {
    errors: {}
  };
}
