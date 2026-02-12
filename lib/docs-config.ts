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
    { title: "Docs", href: "/docs/guide/introduction" },
    { title: "API", href: "/docs/api/index" },
    { title: "Examples", href: "/docs/guide/examples" },
  ] as NavItem[],

  sidebar: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs/guide/introduction" },
        { title: "Quick Start", href: "/docs/guide/quick-start" },
        { title: "Installation", href: "/docs/guide/installation" },
        { title: "CLI", href: "/docs/cli" },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { title: "Architecture", href: "/docs/core/architecture" },
        { title: "Configuration", href: "/docs/core/configuration" },
        { title: "Routing", href: "/docs/core/routing" },
        { title: "Middleware", href: "/docs/core/middleware" },
        { title: "Validation", href: "/docs/core/validation" },
        { title: "Plugins", href: "/docs/core/plugins" },
      ],
    },
    {
      title: "Features",
      items: [
        { title: "Authentication", href: "/docs/features/authentication" },
        { title: "Database", href: "/docs/features/database" },
        { title: "File Uploads", href: "/docs/features/upload" },
        { title: "Sessions", href: "/docs/features/session" },
        { title: "Caching", href: "/docs/features/cache" },
        { title: "Dependency Injection", href: "/docs/features/dependency-injection" },
        { title: "Multi-Runtime", href: "/docs/features/runtime" },
        { title: "Scheduling", href: "/docs/features/scheduling" },
        { title: "Webhooks", href: "/docs/features/webhooks" },
        { title: "Error Handling", href: "/docs/core/error-handling" },
        { title: "Logging", href: "/docs/core/logging" },
      ],
    },
    {
      title: "Guides",
      items: [
        { title: "Build a REST API", href: "/docs/guide/rest-api" },
        { title: "Authentication Guide", href: "/docs/guide/authentication" },
        { title: "Real-time Apps", href: "/docs/guide/realtime" },
        { title: "Project Structure", href: "/docs/guide/project-structure" },
      ],
    },
    {
      title: "Reference",
      items: [
        { title: "API Reference", href: "/docs/api" },
        { title: "Benchmarks", href: "/docs/advanced/benchmarks" },
        { title: "Deployment", href: "/docs/advanced/deployment" },
        { title: "Performance", href: "/docs/advanced/performance" },
        { title: "Security", href: "/docs/advanced/security" },
        { title: "Internals", href: "/docs/advanced/internals" },
        { title: "Advanced Features", href: "/docs/advanced/all-details" },
      ],
    },
  ] as SidebarNavItem[],
  links: {
    github: "https://github.com/swiftjs/swiftjs",
  },
};
