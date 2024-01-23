"use server";
import { auth } from "@/auth";
import { createTopicSchema } from "@/schema";

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
  return {
    errors: {}
  };
}
