export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
};

export const docsConfig = {
  mainNav: [
    { title: "Docs", href: "/docs" },
    { title: "API", href: "/docs/api" },
    { title: "Examples", href: "/docs/examples" },
  ] as NavItem[],

  sidebar: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Quick Start", href: "/docs/getting-started" },
        { title: "CLI", href: "/docs/cli" },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { title: "Routing", href: "/docs/routing" },
        { title: "Middleware", href: "/docs/middleware" },
        { title: "Validation", href: "/docs/validation" },
        { title: "Plugins", href: "/docs/plugins" },
      ],
    },
    {
      title: "Features",
      items: [
        { title: "File Uploads", href: "/docs/features-upload" },
        { title: "Sessions", href: "/docs/features-session" },
        { title: "Caching", href: "/docs/features-cache" },
        { title: "Dependency Injection", href: "/docs/features-di" },
        { title: "Multi-Runtime", href: "/docs/features-runtime" },
      ],
    },
    {
      title: "Guides",
      items: [
        { title: "Build a REST API", href: "/docs/guide-rest-api" },
        { title: "Authentication", href: "/docs/guide-auth" },
        { title: "Real-time Apps", href: "/docs/guide-realtime" },
      ],
    },
    {
      title: "Reference",
      items: [
        { title: "API Reference", href: "/docs/api" },
        { title: "Benchmarks", href: "/docs/benchmark" },
        { title: "Advanced", href: "/docs/advanced" },
      ],
    },
  ] as SidebarNavItem[],
  links: {
    github: "https://github.com/swiftjs/swiftjs",
  },
};
