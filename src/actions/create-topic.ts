"use server";
import { createTopicSchema } from "@/schema";

export interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
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

  return {
    errors: {}
  };
}
