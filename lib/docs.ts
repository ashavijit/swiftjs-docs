import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "docs");

export type Doc = {
  slug: string;
  meta: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
  content: string;
};

export async function getDocBySlug(slug: string[]): Promise<Doc | null> {
  const realSlug = slug.join("/");
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  let title = data.title;
  let finalContent = content.trim();

  if (!title) {
    const match = finalContent.match(/^#\s+(.+)$/m);
    if (match) {
      title = match[1];
      finalContent = finalContent.replace(/^#\s+.+$/m, "").trim();
    } else {
      title = slug[slug.length - 1].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }
  }

  return {
    slug: realSlug,
    meta: {
      ...data,
      title,
    },
    content: finalContent,
  };
}


function getAllMdxFiles(dir: string, basePath: string = ""): string[][] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const slugs: string[][] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      slugs.push(...getAllMdxFiles(fullPath, relativePath));
    } else if (entry.name.endsWith(".mdx")) {
      const slug = relativePath.replace(/\.mdx$/, "").split("/");
      slugs.push(slug);
    }
  }

  return slugs;
}

export async function getAllDocsSlugs() {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const slugs = getAllMdxFiles(contentDirectory);
  return slugs.map((slug) => ({ slug }));
}
