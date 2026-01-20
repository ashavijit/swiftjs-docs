import { getDocBySlug, getAllDocsSlugs } from "@/lib/docs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CustomComponents } from "@/components/mdx";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";

type Props = {
    params: Promise<{
        slug: string[];
    }>;
};

export async function generateStaticParams() {
    const slugs = await getAllDocsSlugs();
    return slugs;
}

export default async function DocPage(props: Props) {
    const params = await props.params;
    // Handle /docs route directly (index)
    const slug = params.slug || ["index"];
    const doc = await getDocBySlug(slug);

    if (!doc) {
        notFound();
    }

    return (
        <article className="max-w-3xl">
            <div className="mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-8">
                <h1 className="font-serif text-4xl font-medium tracking-tight text-black dark:text-white">
                    {doc.meta.title}
                </h1>
                {doc.meta.description && (
                    <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 font-sans">
                        {doc.meta.description}
                    </p>
                )}
            </div>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <MDXRemote
                    source={doc.content}
                    components={CustomComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                        },
                    }}
                />
            </div>
        </article>
    );
}
