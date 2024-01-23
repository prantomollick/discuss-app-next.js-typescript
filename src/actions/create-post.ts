"use server";

import { auth } from "@/auth";
import { CreatePostSchema } from "@/schema";
import { Topic } from "@prisma/client";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  topic: Topic,
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

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this!"]
      }
    };
  }

  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic!"]
      }
    };
  }

  const post = await prisma.post.create({
    data: {
      title: validation.data.title,
      content: validation.data.content,
      topicId: topic.id,
      userId: session.user.id
    }
  });

  return {
    errors: {}
  };
}
