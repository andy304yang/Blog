"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sky-950 text-sky-400 border border-sky-900">
      {children}
    </span>
  );
}

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // h2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold text-slate-100 mt-8 mb-3">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // h3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-slate-200 mt-6 mb-2">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // hr
    if (line.startsWith("---")) {
      elements.push(
        <hr key={key++} className="border-slate-800 my-6" />
      );
      i++;
      continue;
    }

    // code block
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key++} className="rounded-lg bg-slate-950 border border-slate-800 p-4 overflow-x-auto my-4">
          <code className="text-xs text-slate-300 font-mono whitespace-pre">{codeLines.join("\n")}</code>
        </pre>
      );
      i++;
      continue;
    }

    // table
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter(l => !l.includes("---") && l.trim() !== "");
      if (rows.length > 1) {
        const headers = rows[0].split("|").filter((_, idx) => idx > 0 && idx < rows[0].split("|").length - 1).map(h => h.trim());
        const bodyRows = rows.slice(1).map(row =>
          row.split("|").filter((_, idx) => idx > 0 && idx < row.split("|").length - 1).map(c => c.trim())
        );
        elements.push(
          <div key={key++} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  {headers.map((h, idx) => (
                    <th key={idx} className="text-left py-2 px-3 text-slate-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ridx) => (
                  <tr key={ridx} className="border-b border-slate-800">
                    {row.map((cell, cidx) => (
                      <td key={cidx} className="py-2 px-3 text-slate-300">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // list item
    if (line.match(/^[-*] /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-3 text-slate-400">
          {listItems.map((item, idx) => {
            // handle bold
            const parts = item.split(/(\*\*[^*]+\*\*)/g);
            return (
              <li key={idx}>
                {parts.map((part, pIdx) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={pIdx} className="text-slate-200 font-semibold">{part.slice(2, -2)}</strong>;
                  }
                  return <span key={pIdx}>{renderInline(part)}</span>;
                })}
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    // numbered list
    if (line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="list-decimal list-inside space-y-1 my-3 text-slate-400">
          {listItems.map((item, idx) => {
            const parts = item.split(/(\*\*[^*]+\*\*)/g);
            return (
              <li key={idx}>
                {parts.map((part, pIdx) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={pIdx} className="text-slate-200 font-semibold">{part.slice(2, -2)}</strong>;
                  }
                  return <span key={pIdx}>{renderInline(part)}</span>;
                })}
              </li>
            );
          })}
        </ol>
      );
      continue;
    }

    // image
    if (line.trim().match(/^!\[.*?\]\(.*?\)$/)) {
      const match = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        elements.push(
          <img key={key++} src={match[2]} alt={match[1]} className="rounded-lg my-4 max-w-full" />
        );
        i++;
        continue;
      }
    }

    // paragraph
    if (line.trim()) {
      const trimmed = line.trim();
      const parts = trimmed.split(/(\[.*?\]\(.*?\)|\*\*[^*]+\*\*|`[^`]+`)/g);
      elements.push(
        <p key={key++} className="text-slate-400 leading-relaxed my-3">
          {parts.map((part, idx) => {
            if (part.startsWith("[") && part.includes("](")) {
              const match = part.match(/\[(.*?)\]\((.*?)\)/);
              if (match) {
                return <a key={idx} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline">{match[1]}</a>;
              }
            }
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={idx} className="text-slate-200 font-semibold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith("`") && part.endsWith("`")) {
              return <code key={idx} className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 text-xs font-mono">{part.slice(1, -1)}</code>;
            }
            return <span key={idx}>{renderInline(part)}</span>;
          })}
        </p>
      );
      i++;
      continue;
    }

    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\[.*?\]\(.*?\)|\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return <a key={idx} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline">{match[1]}</a>;
      }
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx} className="text-slate-200 font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={idx} className="px-1 py-0.5 rounded bg-slate-800 text-sky-300 text-xs font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
          <Link href="/" className="text-sky-400 hover:text-sky-300">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <div className="flex-1" />
          <a href="https://github.com/andy304yang" target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 transition-colors">
            <GitHubIcon className="w-5 h-5" />
          </a>
        </div>
      </nav>

      {/* Article */}
      <main className="max-w-2xl mx-auto px-5 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-snug mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <article className="text-slate-300 text-[15px] leading-relaxed">
          {renderMarkdown(post.content)}
        </article>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </main>
    </div>
  );
}
