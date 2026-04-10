"use client";

import TopicPageLayout from "@/components/TopicPageLayout";
import { topicData } from "@/content/react/data";

export default function TopicClient() {
  return <TopicPageLayout {...topicData} />;
}
