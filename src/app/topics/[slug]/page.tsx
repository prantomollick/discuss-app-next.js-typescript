import PostCreateForm from "@/components/posts/post-create-form";
import { prisma } from "@/db";
import type { Topic } from "@prisma/client";
interface Props {
  params: {
    slug: string;
  };
}

export default async function TopicShowPage({ params }: Props) {
  const topic = (await prisma.topic.findUnique({
    where: {
      slug: params.slug.toLowerCase()
    }
  })) as Topic;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">
          {topic?.slug.charAt(0).toUpperCase()! + topic?.slug.substring(1)}
        </h1>
      </div>
      <div>
        <PostCreateForm topic={topic} />
      </div>
    </div>
  );
}
