import { prisma } from "@/db";
import { path } from "@/path";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

async function TopicList() {
  const topics = await prisma.topic.findMany({
    take: 7,
    orderBy: {
      createdAt: "desc"
    }
  });

  const renderedTopics = topics.map((topic) => (
    <div key={topic.id}>
      <Link href={path.topicShow(topic.slug)}>
        <Chip color="warning" variant="shadow">
          {topic.slug}
        </Chip>
      </Link>
    </div>
  ));

  return <div className="flex flex-wrap gap-2">{renderedTopics}</div>;
}

export default TopicList;
