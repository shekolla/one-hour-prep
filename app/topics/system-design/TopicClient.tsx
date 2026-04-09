"use client";

import TopicPageLayout from "@/components/TopicPageLayout";
import { topicData } from "@/content/system-design/data";

export default function TopicClient() {
  return <TopicPageLayout {...topicData} />;
}
