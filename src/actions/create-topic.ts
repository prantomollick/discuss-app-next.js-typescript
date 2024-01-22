"use server";
import { createTopicSchema } from "@/schema";

export async function createTopic(formData: FormData) {
  //TODO: revalidate the homepage after creating a topic
  const name = formData.get("name");
  const description = formData.get("description");
  const validation = createTopicSchema.safeParse({ name, description });

  if (!validation.success) console.log(validation.error.flatten().fieldErrors);
  // console.log(name, description);
}
