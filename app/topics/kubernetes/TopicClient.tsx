"use client";

import TopicPageLayout from "@/components/TopicPageLayout";
import { topicData } from "@/content/kubernetes/data";

export default function TopicClient() {
  return <TopicPageLayout {...topicData} />;
}
