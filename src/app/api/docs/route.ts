import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface DocumentMetadata {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
  lastUpdated: string;
  category: string;
  order: number;
  slug: string;
}

export async function GET() {
  const documents: DocumentMetadata[] = [];

  try {
    const docsPath = path.join(process.cwd(), "src/app/docs");

    if (!fs.existsSync(docsPath)) {
      console.warn("Docs directory not found:", docsPath);
      return NextResponse.json([]);
    }

    const entries = fs.readdirSync(docsPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const mdxPath = path.join(docsPath, entry.name, "page.mdx");

      if (!fs.existsSync(mdxPath)) {
        continue;
      }

      try {
        const fileContent = fs.readFileSync(mdxPath, "utf8");
        const { data: frontmatter } = matter(fileContent);

        if (frontmatter) {
          documents.push({
            title: frontmatter.title || entry.name,
            titleEn: frontmatter.titleEn || frontmatter.title || entry.name,
            description: frontmatter.description || "",
            descriptionEn:
              frontmatter.descriptionEn || frontmatter.description || "",
            icon: frontmatter.icon || "FileText",
            color: frontmatter.color || "blue",
            lastUpdated:
              frontmatter.lastUpdated || new Date().toISOString().split("T")[0],
            category: frontmatter.category || "Document",
            order: frontmatter.order || 999,
            slug: entry.name,
          });
        }
      } catch (importError) {
        console.error(`Failed to read ${entry.name}:`, importError);
      }
    }

    const sortedDocuments = documents.sort((a, b) => a.order - b.order);
    return NextResponse.json(sortedDocuments);
  } catch (error) {
    console.error("Failed to read docs directory:", error);
    return NextResponse.json([], { status: 500 });
  }
}
