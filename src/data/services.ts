export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  features: string[];
  techStack: string[];
  metrics: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    category: "Modern Web & Digital Presence",
    description:
      "Pengembangan website perusahaan bereputasi tinggi, high-converting landing pages, e-commerce modern, dan custom CMS dengan performa sub-detik serta optimasi SEO teknis tingkat lanjut.",
    iconName: "Globe",
    features: [
      "High-Performance Company Profile & Corporate Web Portals",
      "Ultra-Fast E-Commerce & Interactive Landing Pages",
      "Headless CMS Architecture & Custom Content Management",
      "Advanced Technical SEO, Core Web Vitals 99+ & A11y Accessibility",
    ],
    techStack: ["Next.js 15", "React", "Tailwind CSS", "TypeScript", "Payload CMS", "Vercel"],
    metrics: "Lighthouse Performance 99/100",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    category: "Native & Cross-Platform Mobile",
    description:
      "Rekayasa aplikasi mobile iOS & Android yang responsif, intuitif, dan stabil dengan arsitektur offline-first, sinkronisasi realtime, serta integrasi hardware dan push notification terpadu.",
    iconName: "Smartphone",
    features: [
      "Cross-Platform iOS & Android Apps (Flutter & React Native)",
      "High-Performance Native Modules (Swift / iOS & Kotlin / Android)",
      "Offline-First Data Storage & Realtime Cloud Synchronization",
      "Biometric Auth, Hardware Sensor Integration & Push Notifications (FCM)",
    ],
    techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "PostgreSQL"],
    metrics: "Crash-Free Users > 99.9%",
  },
  {
    id: "webapp-development",
    title: "Web App & SaaS Development",
    category: "Scalable SaaS & Enterprise Systems",
    description:
      "Pembangunan aplikasi web kustom berskala enterprise, platform SaaS multi-tenant, dashboard analitik interaktif, ERP/CRM kustom, dan sistem backend mission-critical berkapasitas tinggi.",
    iconName: "Layers",
    features: [
      "Custom Enterprise SaaS & Multi-Tenant Cloud Architecture",
      "Interactive Operational Dashboards & Realtime Workflow Portals",
      "Robust RESTful & GraphQL API Infrastructure (Go / Laravel / Node)",
      "Automated Background Jobs, Queues & Distributed Redis Caching",
    ],
    techStack: ["Next.js", "React", "Laravel 11", "Node.js", "Go", "PostgreSQL", "Redis", "Docker"],
    metrics: "Latency Respon < 45ms P99",
  },
];

