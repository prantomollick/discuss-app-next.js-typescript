"use server";

import { auth } from "@/auth";
import { CreatePostSchema } from "@/schema";
import { Post, Topic } from "@prisma/client";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { path } from "@/path";
import { redirect } from "next/navigation";

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

  let post: Post;

  try {
    post = await prisma.post.create({
      data: {
        title: validation.data.title,
        content: validation.data.content,
        topicId: topic.id,
        userId: session.user.id
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create post!"]
        }
      };
    }
  }

  revalidatePath(path.topicShow(topic.slug));
  redirect(path.postShow(topic.slug, post.id));
}
