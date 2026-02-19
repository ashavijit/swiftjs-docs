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
  let fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    const indexPath = path.join(contentDirectory, realSlug, 'index.mdx');
    if (fs.existsSync(indexPath)) {
       fullPath = indexPath;
    } else {
       return null;
    }
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
      let slug = relativePath.replace(/\.mdx$/, "").split("/");
      // If the file is index.mdx, the slug should be the directory path
      if (slug[slug.length - 1] === "index") {
        slug.pop();
      }
      // Only push if slug is not empty (for root index.mdx, it becomes an empty array)
      if (slug.length > 0) {
        slugs.push(slug);
      } else {
        // Special case for root index.mdx? 
        // If we want /docs to work, we might need an empty slug or "index"
        // Let's keep it as is for now if root works.
      }
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
