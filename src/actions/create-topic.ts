"use server";
import { auth } from "@/auth";
import { createTopicSchema } from "@/schema";
import { type Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import { path } from "@/path";
import { revalidatePath } from "next/cache";
import delay from "delay";

export interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  await delay(2000);
  //TODO: revalidate the homepage after creating a topic

  const name = formData.get("name");
  const description = formData.get("description");

  const validation = createTopicSchema.safeParse({ name, description });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."]
      }
    };
  }

  let topic: Topic;

  try {
    topic = await prisma.topic.create({
      data: {
        slug: validation.data.name.toLowerCase(),
        description: validation.data.description
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
          _form: ["Something wen wrong"]
        }
      };
    }
  }

  revalidatePath(path.home());
  redirect(path.topicShow(topic.slug));
}
