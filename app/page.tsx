import Link from "next/link";
import GlobalSearch from "@/components/GlobalSearch";

const topics = [
  {
    slug: "python",
    title: "Python",
    description: "GIL, memory model, concurrency, decorators, MRO, generators",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Backend",
  },
  {
    slug: "javascript",
    title: "JavaScript",
    description: "Event loop, closures, prototypes, async/await, type coercion, ES6+",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Frontend / Fullstack",
  },
  {
    slug: "nodejs",
    title: "Node.js",
    description: "Event loop phases, streams, worker threads, security, performance",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Backend",
  },
  {
    slug: "java",
    title: "Java",
    description: "JVM internals, concurrency, HashMap internals, Spring, GC algorithms",
    readTime: "50–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Backend",
  },
  {
    slug: "kubernetes",
    title: "Kubernetes & Docker",
    description: "Containers, pods, deployments, services, networking, and RBAC",
    readTime: "50–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "DevOps",
  },
  {
    slug: "dsa",
    title: "DSA",
    description: "Big O, trees, graphs, dynamic programming, sorting, hash tables",
    readTime: "60–75 min",
    level: "Mid–Senior",
    available: true,
    tag: "Coding Interview",
  },
  {
    slug: "system-design",
    title: "System Design",
    description: "Scalability, caching, CAP theorem, databases, messaging, reliability",
    readTime: "60–90 min",
    level: "Senior",
    available: true,
    tag: "Architecture",
  },
  {
    slug: "hld",
    title: "High-Level Design",
    description: "Microservices, event-driven, API design, observability, CQRS, sagas",
    readTime: "60–75 min",
    level: "Senior",
    available: true,
    tag: "Architecture",
  },
  {
    slug: "lld",
    title: "Low-Level Design",
    description: "SOLID, design patterns (Gang of Four), OOP, concurrency patterns",
    readTime: "50–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "OOP / Patterns",
  },
  {
    slug: "databases",
    title: "Databases",
    description: "OLTP vs OLAP, PostgreSQL, MongoDB, Snowflake, ClickHouse, BigQuery — when to use what",
    readTime: "60–75 min",
    level: "Mid–Senior",
    available: true,
    tag: "Data",
  },
  {
    slug: "react",
    title: "React",
    description: "Hooks, fiber architecture, reconciliation, server components, performance optimization",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Frontend / Fullstack",
  },
  {
    slug: "aws",
    title: "AWS / Cloud",
    description: "EC2, Lambda, S3, IAM, VPC, DynamoDB, CloudFormation — core cloud interview topics",
    readTime: "50–65 min",
    level: "Mid–Senior",
    available: true,
    tag: "DevOps",
  },
  {
    slug: "sql",
    title: "SQL Deep Dive",
    description: "Window functions, CTEs, query plans, indexes, transactions, MVCC, database internals",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Data",
  },
];

const tagColors: Record<string, string> = {
  "Backend": "bg-blue-500/10 text-blue-400",
  "Frontend / Fullstack": "bg-purple-500/10 text-purple-400",
  "DevOps": "bg-cyan-500/10 text-cyan-400",
  "Coding Interview": "bg-green-500/10 text-green-400",
  "Architecture": "bg-orange-500/10 text-orange-400",
  "OOP / Patterns": "bg-pink-500/10 text-pink-400",
  "Data": "bg-emerald-500/10 text-emerald-400",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <main className="max-w-4xl w-full mx-auto px-4 py-16 flex-1">
        {/* Hero */}
        <header className="mb-16 text-center">
          <div className="inline-block bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Interview Revision Platform
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Revise any tech topic
            <br />
            <span className="text-indigo-400">in under 1 hour.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            High-signal content for mid to senior engineers. Structured for fast
            recall, not passive reading.
          </p>
        </header>

        {/* Search */}
        <div className="mb-14">
          <GlobalSearch />
        </div>

        {/* Mode badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {[
            { icon: "⏱", label: "Last 1 Hour Mode" },
            { icon: "🎤", label: "Interview Answer Mode" },
            { icon: "⚠️", label: "Trap Mode" },
            { icon: "🌳", label: "Knowledge Tree" },
            { icon: "🟢🟡🔴", label: "Depth Levels" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="bg-gray-800 text-gray-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-700"
            >
              <span aria-hidden="true">{icon}</span> {label}
            </span>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-14 text-center" aria-label="Platform statistics">
          {[
            { value: "13", label: "Topics" },
            { value: "367", label: "Concepts" },
            { value: "104", label: "Interview Patterns" },
            { value: "157", label: "Common Mistakes" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Topics */}
        <section className="mb-8" aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
            Topics
          </h2>
          <div className="grid gap-3">
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/topics/${topic.slug}`} className="focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 rounded-xl">
                <div className="group bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-xl p-5 flex items-center justify-between transition-all cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-white font-semibold text-base group-hover:text-indigo-300 transition-colors">
                        {topic.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[topic.tag] ?? "bg-gray-700/50 text-gray-400"}`}>
                        {topic.tag}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{topic.description}</p>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <div className="text-gray-300 text-sm font-medium">{topic.readTime}</div>
                    <div className="text-gray-500 text-xs">{topic.level}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8" data-print-hidden>
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Stop reading docs. Start recalling.</p>
        </div>
      </footer>
    </div>
  );
}
