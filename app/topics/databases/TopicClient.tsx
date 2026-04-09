"use client";

import TopicPageLayout from "@/components/TopicPageLayout";
import { topicData } from "@/content/databases/data";

export default function TopicClient() {
  return <TopicPageLayout {...topicData} />;
}
