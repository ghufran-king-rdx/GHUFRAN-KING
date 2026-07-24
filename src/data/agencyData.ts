import { Service, PortfolioItem, PricingPlan, Testimonial, FAQItem } from '../types';

export const AGENCY_INFO = {
  name: "GHUFRAN KING DIGITAL",
  shortName: "GK DIGITAL",
  tagline: "Build Your Digital Future",
  subTagline: "Professional Website Development, Digital Marketing, Hosting, Domains, AI Solutions & Online Business Services.",
  email: "ghufranking93@gmail.com",
  phone: "+92 300 1234567",
  whatsappNumber: "923001234567",
  whatsappMessage: "Hello Ghufran King Digital! I am interested in building my digital project. Please share details.",
  location: "Digital HQ, Business District, Karachi / Global Remote Service",
  workingHours: "24/7 Global Client Support & Instant Consultation",
  socials: {
    facebook: "https://facebook.com/ghufrankingdigital",
    instagram: "https://instagram.com/ghufrankingdigital",
    linkedin: "https://linkedin.com/company/ghufrankingdigital",
    twitter: "https://twitter.com/ghufrankingdigital",
    youtube: "https://youtube.com/@ghufrankingdigital",
    whatsapp: "https://wa.me/923001234567"
  }
};

export const SERVICES_DATA: Service[] = [
  {
    id: "website-development",
    title: "Website Development",
    category: "development",
    categoryLabel: "Development",
    iconName: "Code",
    shortDescription: "Custom-crafted responsive web applications built with React, Next.js, and high-performance modern tech stacks.",
    fullDescription: "Transform your business vision into a high-speed, secure, and visually striking custom web application. Tailored for scalable enterprise performance with modern interactive UI components.",
    features: [
      "Custom UI/UX Tailwind Design",
      "Full Mobile & Desktop Responsiveness",
      "Fast Core Web Vitals & Instant Load Speeds",
      "API Integrations & Custom Backend Options",
      "Cross-Browser Compatibility & Security Hardening"
    ],
    deliverables: ["Full Source Code", "Production Build Deployment", "Domain & SSL Setup", "1 Year Maintenance Support"],
    timeline: "7 - 14 Days",
    pricingStarting: "$299",
    popular: true
  },
  {
    id: "landing-page",
    title: "Landing Page",
    category: "development",
    categoryLabel: "Development",
    iconName: "Layout",
    shortDescription: "High-converting, sleek sales pages engineered to turn clicks into buyers and max lead generation.",
    fullDescription: "Stop wasting ad budgets on weak pages. Our conversion-optimized landing pages are built with copywriting psychology, fast hero sections, and clear call-to-action flows.",
    features: [
      "A/B Tested Layout Structures",
      "Direct Lead Capture & WhatsApp Integration",
      "Ultra-Fast Mobile Speed Optimization",
      "Facebook Pixel & Google Analytics Setup",
      "Interactive Modals & Sales Countdown Timers"
    ],
    deliverables: ["Single High-Converting Page", "Lead Form Webhooks", "Analytics Integration", "A/B Testing Guide"],
    timeline: "2 - 4 Days",
    pricingStarting: "$149"
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "development",
    categoryLabel: "Development",
    iconName: "UserCheck",
    shortDescription: "Showcase your work, skills, and brand authority with a stunning dark luxury personal portfolio.",
    fullDescription: "Ideal for freelancers, agency owners, artists, and executives wanting to build a authoritative online presence and get high-paying international clients.",
    features: [
      "Interactive Case Study Displays",
      "Downloadable Resume & Credentials Link",
      "Client Testimonials & Video Embeds",
      "Direct Booking Calendar Integration",
      "SEO Tagging & Social Sharing Cards"
    ],
    deliverables: ["Custom Portfolio Website", "Content Management Ready", "Domain Routing", "Social Media Preview Cards"],
    timeline: "3 - 5 Days",
    pricingStarting: "$179"
  },
  {
    id: "business-website",
    title: "Business Website",
    category: "development",
    categoryLabel: "Development",
    iconName: "Building2",
    shortDescription: "Corporate websites that build trust, communicate services, and capture high-intent B2B inquiries.",
    fullDescription: "Complete multi-page corporate web solution with company overview, service catalogs, team profiles, location maps, and instant contact forms.",
    features: [
      "Multi-Page Structured Navigation",
      "Service Catalog & Case Studies",
      "Google Map & HQ Location Integration",
      "SSL Certificate & Cloudflare Protection",
      "Multi-Language Support Available"
    ],
    deliverables: ["Complete Multi-Page Website", "Admin Control Panel", "Corporate Email Setup", "SEO Readiness"],
    timeline: "7 - 10 Days",
    pricingStarting: "$399",
    popular: true
  },
  {
    id: "ecommerce-website",
    title: "E-commerce Website",
    category: "development",
    categoryLabel: "Development",
    iconName: "ShoppingCart",
    shortDescription: "Full-scale online store with shopping carts, checkout gateways, inventory systems, and order tracking.",
    fullDescription: "Launch your online retail brand with a fast, modern e-commerce platform supporting Stripe, PayPal, Local Gateways, Cash on Delivery, and product analytics.",
    features: [
      "Product Catalog & Category Filtering",
      "Secure Multi-Currency Checkout",
      "Customer Account Dashboard & Order Tracking",
      "Coupon Codes & Automated Discounts",
      "WhatsApp Cart Ordering Mechanism"
    ],
    deliverables: ["Full E-commerce Store", "Payment Gateway Setup", "50 Initial Product Uploads", "Inventory Admin Guide"],
    timeline: "10 - 18 Days",
    pricingStarting: "$599",
    popular: true
  },
  {
    id: "domain-registration",
    title: "Domain Registration",
    category: "hosting",
    categoryLabel: "Hosting & Domains",
    iconName: "Globe2",
    shortDescription: "Secure your brand name with top-tier .com, .net, .org, or local domain extensions.",
    fullDescription: "We help you brainstorm, find, register, and protect the perfect domain name with full DNS control and privacy protection.",
    features: [
      "Instant DNS Management Panel",
      "WHOIS Privacy Guard Included",
      "Domain Transfer & Auto-Renewal Setup",
      "Subdomain Routing & Email Forwarding",
      "Brand Name Availability Scouting"
    ],
    deliverables: ["Registered Domain Ownership", "DNS Configuration", "WHOIS Protection", "Renewal Dashboard"],
    timeline: "Instant (1 Hour)",
    pricingStarting: "$15/yr"
  },
  {
    id: "web-hosting",
    title: "Web Hosting",
    category: "hosting",
    categoryLabel: "Hosting & Domains",
    iconName: "Server",
    shortDescription: "Ultra-fast Cloud NVMe SSD Hosting with 99.99% uptime SLA, daily backups, and free SSL.",
    fullDescription: "High-speed enterprise cloud hosting servers engineered for high traffic, low latency, and maximum server security.",
    features: [
      "LiteSpeed Web Server & LSCache",
      "Unlimited Free SSL Certificates",
      "Automated Daily Off-Site Backups",
      "DDoS Attack Protection & Web Firewall",
      "Unlimited Corporate Email Accounts"
    ],
    deliverables: ["Cloud Hosting Account", "cPanel/Control Panel", "SSL Activation", "Server Health Monitoring"],
    timeline: "Instant Activation",
    pricingStarting: "$9/mo"
  },
  {
    id: "website-deployment",
    title: "Website Deployment",
    category: "hosting",
    categoryLabel: "Hosting & Domains",
    iconName: "CloudUpload",
    shortDescription: "Seamless deployment of your website to Vercel, Cloudflare, Cloud Run, AWS, or cPanel.",
    fullDescription: "Hassle-free migration and automated CI/CD pipeline deployment ensuring your app runs smoothly with zero downtime.",
    features: [
      "GitHub & Gitlab Repository Linking",
      "CI/CD Automated Build Pipeline",
      "Custom Domain SSL Binding",
      "CDN Edge Cache Configuration",
      "Environment Secret Configuration"
    ],
    deliverables: ["Live Production Server URL", "CI/CD Deployment Pipeline", "SSL Binding", "Handover Document"],
    timeline: "1 Day",
    pricingStarting: "$79"
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    category: "hosting",
    categoryLabel: "Hosting & Domains",
    iconName: "ShieldAlert",
    shortDescription: "Keep your website secure, updated, bug-free, and lightning fast with 24/7 active care.",
    fullDescription: "Don't let broken scripts, malware, or slow load speeds hurt your business. Our care team monitors and maintains your web assets round the clock.",
    features: [
      "Weekly Core & Plugin Updates",
      "24/7 Uptime & Security Monitoring",
      "Malware Scanning & Hack Recovery",
      "Content & Graphic Updates Included",
      "Monthly Speed & SEO Health Reports"
    ],
    deliverables: ["Monthly Security Audits", "Bug Fixes Guarantee", "Regular Data Backups", "Dedicated Tech Manager"],
    timeline: "Ongoing Monthly",
    pricingStarting: "$49/mo"
  },
  {
    id: "seo-optimization",
    title: "SEO (Search Engine Optimization)",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    iconName: "Search",
    shortDescription: "Rank #1 on Google search results for valuable keywords and drive organic buyer traffic.",
    fullDescription: "Comprehensive Technical, On-Page, and Off-Page SEO strategy that boosts your search visibility, builds domain authority, and guarantees steady organic growth.",
    features: [
      "In-Depth Keyword Research & Competitor Gap Analysis",
      "Technical SEO & Schema Markup Integration",
      "On-Page Optimization (Headings, Meta, Speed)",
      "High Authority Backlink Acquisition",
      "Google Search Console & Analytics Audits"
    ],
    deliverables: ["SEO Keyword Strategy", "On-Page Code Fixes", "Monthly Ranking Reports", "Backlink Profile"],
    timeline: "Ongoing (3-6 mo results)",
    pricingStarting: "$249/mo",
    popular: true
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    iconName: "TrendingUp",
    shortDescription: "360-degree online growth strategy to expand your audience, generate leads, and boost sales.",
    fullDescription: "Omnichannel digital marketing strategies combining funnel creation, conversion rate optimization, email automation, and paid ad campaigns.",
    features: [
      "Customer Persona & Funnel Mapping",
      "Multi-Channel Campaign Architecture",
      "Conversion Rate Optimization (CRO)",
      "Lead Magnet & Email Nurture Flow",
      "ROI Tracking & Performance Dashboards"
    ],
    deliverables: ["Growth Strategy Blueprint", "Campaign Execution", "Weekly Metric Audits", "Dedicated Growth Specialist"],
    timeline: "Ongoing Strategy",
    pricingStarting: "$349/mo"
  },
  {
    id: "facebook-ads",
    title: "Facebook Ads",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    iconName: "Facebook",
    shortDescription: "Laser-targeted Meta advertising campaigns on Facebook & Instagram that scale ROI.",
    fullDescription: "High-ROI ad strategy featuring creative graphic design, persuasive video angles, custom lookalike audiences, and Meta Pixel retargeting.",
    features: [
      "Ad Creative Design & Video Reels",
      "Custom Audience & Retargeting Setup",
      "Meta Pixel & Conversions API Setup",
      "Daily Ad Budget & Bid Optimization",
      "Comprehensive Weekly Performance Reports"
    ],
    deliverables: ["Active Meta Ad Campaigns", "High-Converting Creatives", "Pixel Setup", "Ad Analytics Dashboard"],
    timeline: "3 - 5 Days Setup",
    pricingStarting: "$199/mo"
  },
  {
    id: "google-ads",
    title: "Google Ads",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    iconName: "Target",
    shortDescription: "Capture high-intent buyers searching on Google Search, YouTube, and Display Network.",
    fullDescription: "Target customers actively looking for your products or services. Pay only when someone clicks to call, message, or purchase.",
    features: [
      "High-Intent Search Keyword Targeting",
      "Negative Keyword List Filtering",
      "Compelling Ad Copywriting & Extensions",
      "Conversion Tracking Setup",
      "Quality Score & Bid Price Optimization"
    ],
    deliverables: ["Google Search & Performance Max Campaigns", "Conversion Setup", "Click Fraud Prevention", "Weekly ROI Audit"],
    timeline: "3 - 5 Days Setup",
    pricingStarting: "$249/mo"
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    iconName: "Share2",
    shortDescription: "Complete management of your Instagram, Facebook, LinkedIn, and TikTok channels.",
    fullDescription: "Build an active, engaging, and professional brand presence with custom graphics, video reels, strategic hashtags, and community engagement.",
    features: [
      "Monthly Content Calendar & Strategy",
      "Custom Graphic Posts & Short Video Reels",
      "Captivating Copywriting & Hashtags",
      "Community Comment & DM Engagement",
      "Profile Aesthetics & Bio Optimization"
    ],
    deliverables: ["12-20 Monthly Posts", "4-8 Video Reels", "Content Calendar", "Growth & Reach Report"],
    timeline: "Monthly Retainer",
    pricingStarting: "$299/mo"
  },
  {
    id: "youtube-growth",
    title: "YouTube Growth",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    iconName: "Youtube",
    shortDescription: "Channel optimization, video SEO, clickbait-worthy thumbnails, and subscriber growth.",
    fullDescription: "Turn your YouTube channel into a lead machine and monetization powerhouse with high CTR thumbnails, tag optimization, and video editing.",
    features: [
      "Custom High-CTR Thumbnail Design",
      "Video Title & Description SEO",
      "Channel Branding & Banner Design",
      "Shorts & Long-Form Video Editing",
      "Monetization & Subscriber Strategy"
    ],
    deliverables: ["Optimized YouTube Channel", "Thumbnails & Tags per Upload", "Growth Dashboard"],
    timeline: "Monthly Plan",
    pricingStarting: "$199/mo"
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    category: "design",
    categoryLabel: "Design & Media",
    iconName: "Palette",
    shortDescription: "Eye-catching branding assets, social media banners, flyers, brochures, and digital UI.",
    fullDescription: "Professional visual graphics crafted to make your brand look world-class, memorable, and high-value across all media.",
    features: [
      "Social Media Post Banners & Story Templates",
      "Print Materials (Flyers, Business Cards, Brochures)",
      "Digital Ad Banners & Web Visuals",
      "Brand Style Guides & Color Palettes",
      "High Resolution Vector & Raster Formats"
    ],
    deliverables: ["PNG, JPG, SVG, PSD/AI Source Files", "Print-Ready PDFs", "Full Commercial Rights"],
    timeline: "2 - 4 Days",
    pricingStarting: "$99"
  },
  {
    id: "logo-design",
    title: "Logo Design",
    category: "design",
    categoryLabel: "Design & Media",
    iconName: "Sparkles",
    shortDescription: "Iconic, modern logo concepts and complete brand identity packages.",
    fullDescription: "Establish a distinct and timeless visual identity that leaves a lasting impression on your customers and sets you apart from competitors.",
    features: [
      "3-5 Unique Initial Concepts",
      "Unlimited Design Revisions",
      "Vector Source Files (AI, EPS, SVG, PDF, PNG)",
      "Dark & Light Background Variations",
      "Brand Identity Guidelines Document"
    ],
    deliverables: ["Final Vector Master Files", "Transparent PNGs", "Social Media Favicons", "Brand Style Guide"],
    timeline: "3 - 5 Days",
    pricingStarting: "$129"
  },
  {
    id: "video-editing",
    title: "Video Editing",
    category: "design",
    categoryLabel: "Design & Media",
    iconName: "Video",
    shortDescription: "Engaging video editing for Instagram Reels, TikTok, YouTube Shorts, and Ad Promo Videos.",
    fullDescription: "High-retention video editing packed with motion subtitles, sound effects, B-roll transitions, color grading, and viral pacing.",
    features: [
      "Dynamic Motion Subtitles & Captions",
      "Sound Effects (SFX) & Background Music",
      "Color Grading & Visual Effects",
      "Vertical (9:16) & Horizontal (16:9) Cuts",
      "Hook-Oriented Fast Pacing"
    ],
    deliverables: ["4K Rendered Videos", "Thumbnail Frame", "Multi-Platform Formats"],
    timeline: "2 - 3 Days",
    pricingStarting: "$79/video"
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    category: "automation",
    categoryLabel: "AI & Automation",
    iconName: "Bot",
    shortDescription: "AI chatbots, automated customer support workflows, and smart lead qualification pipelines.",
    fullDescription: "Automate repetitive business tasks using Gemini AI models, Zapier, Make.com, and custom API bots that save hundreds of hours every month.",
    features: [
      "Custom AI Chatbots Trained on Your Business Data",
      "Automated Lead Qualification & CRM Sync",
      "Auto Email Response Systems",
      "AI Copywriting & Asset Generators",
      "Zapier / Make.com Automated Workflows"
    ],
    deliverables: ["Deploys Active AI Bot", "Workflow Integrations", "Training Data Setup", "User Manual"],
    timeline: "5 - 9 Days",
    pricingStarting: "$299",
    popular: true
  },
  {
    id: "whatsapp-business-setup",
    title: "WhatsApp Business Setup",
    category: "automation",
    categoryLabel: "AI & Automation",
    iconName: "MessageSquare",
    shortDescription: "Official WhatsApp Business API, auto-reply bots, product catalogs, and broadcast messaging.",
    fullDescription: "Turn WhatsApp into your primary sales channel. Set up automated greeting messages, product catalogs, quick replies, and broadcast lead funnels.",
    features: [
      "WhatsApp Business Profile & Verified Setup",
      "Automated Welcome & Away Messages",
      "Interactive Product Catalog Setup",
      "Keyword Triggered Auto-Replies",
      "Click-to-WhatsApp Website Floating Widget"
    ],
    deliverables: ["Configured WhatsApp Business Account", "Auto-Responder Bot", "Catalog Integration", "Floating Website Widget"],
    timeline: "1 - 2 Days",
    pricingStarting: "$89"
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Apex Luxury Real Estate Platform",
    category: "Website",
    client: "Apex Properties Dubai",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    description: "High-end real estate portal with interactive 3D property tours, dynamic currency conversion, and instant WhatsApp agent routing.",
    results: "+240% Lead Inquiries in 60 Days",
    tags: ["React", "Tailwind", "WhatsApp API", "3D Villa Views"]
  },
  {
    id: "port-2",
    title: "Velvet Couture E-Commerce Store",
    category: "E-commerce",
    client: "Velvet Fashion House",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-fast online apparel store with 1-click cart checkout, size recommendation AI, and automated stock management.",
    results: "$180k+ Sales Generated in First Quarter",
    tags: ["E-Commerce", "Stripe Gateway", "Meta Pixel", "Fast Load"]
  },
  {
    id: "port-3",
    title: "FinTech Quantum Dashboard",
    category: "Website",
    client: "Quantum Capital Group",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Dark luxury financial analytics web portal with live market data feeds, interactive charting, and secure OAuth login.",
    results: "99.99% Uptime & 100k Monthly Active Users",
    tags: ["Full Stack", "Charts.js", "Dark Mode", "High Security"]
  },
  {
    id: "port-4",
    title: "SaaS AI Copywriting Automation",
    category: "AI Solutions",
    client: "CopyMind AI",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Custom AI web app harnessing Gemini AI to generate viral social media captions, email newsletters, and blog articles in seconds.",
    results: "50,000+ Generated Copies & 4.9/5 User Rating",
    tags: ["Gemini API", "React", "AI Workflows", "SaaS Billing"]
  },
  {
    id: "port-5",
    title: "Global E-Learning Platform",
    category: "Website",
    client: "SkillNexus International",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    description: "Multi-instructor online course portal featuring video streaming, student progress badges, and automatic certificates.",
    results: "15,000 Active Enrolled Students",
    tags: ["LMS", "Video Player", "Certificate Auto-Gen"]
  },
  {
    id: "port-6",
    title: "Gourmet Bistro Digital Marketing & Ads",
    category: "Digital Marketing",
    client: "La Fleur Bistro",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    description: "Full-scale Facebook & Instagram Ad campaign paired with WhatsApp Table Reservation Bot.",
    results: "3.8x ROAS & 450+ Monthly Table Bookings",
    tags: ["Meta Ads", "Google Maps", "WhatsApp Bot", "SEO"]
  }
];

export const PRICING_DATA: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Package",
    priceMonthly: "$199",
    priceYearly: "$149",
    description: "Perfect for startups, personal brands, and small businesses launching their online footprint.",
    features: [
      "Custom 1-3 Page Responsive Website",
      "Free Domain & Hosting Setup (1 Year)",
      "Basic On-Page SEO Optimization",
      "WhatsApp Chat Button & Contact Form",
      "Mobile Speed Optimization (90+ Score)",
      "SSL Security Certificate",
      "7 Days Post-Launch Support"
    ],
    notIncluded: ["E-Commerce Storefront", "Paid Ad Campaigns", "AI Chatbot Integration"],
    ctaText: "Get Started Now",
    badge: "Startup Friendly"
  },
  {
    id: "professional",
    name: "Professional Agency",
    priceMonthly: "$499",
    priceYearly: "$399",
    description: "Ideal for growing businesses looking to dominate competitors, get consistent leads, and build trust.",
    features: [
      "Full Multi-Page Corporate Website (Up to 10 Pages)",
      "E-Commerce or Booking System Integration",
      "Advanced SEO & Google Search Console Setup",
      "Social Media Setup (FB, Insta, LinkedIn, Google Maps)",
      "1 Month Meta / Google Ad Campaign Management",
      "Custom Graphic Branding & Logo Assets",
      "WhatsApp Business Auto-Responder",
      "30 Days Dedicated VIP Tech Support"
    ],
    ctaText: "Claim Professional Plan",
    popular: true,
    badge: "Most Popular"
  },
  {
    id: "business",
    name: "Enterprise Business",
    priceMonthly: "$999",
    priceYearly: "$799",
    description: "Complete 360° digital dominance package for scaling brands, high-tier stores, and enterprises.",
    features: [
      "Unlimited Page Custom Web Application / SaaS",
      "Full E-Commerce Platform with Payment Gateways",
      "Custom AI Chatbot Trained on Your Business Data",
      "3 Months SEO & Organic Growth Campaigns",
      "Full Social Media Management (16 Posts + 8 Reels/mo)",
      "Facebook, Instagram & Google Ads Management",
      "4K Video Editing & Graphic Banners Package",
      "24/7 Priority Tech & Server Manager Support"
    ],
    ctaText: "Scale Your Enterprise",
    badge: "Maximum Growth"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Hamza Malik",
    role: "CEO & Founder",
    company: "Apex Properties Dubai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "Ghufran King Digital completely overhauled our real estate portal. Our website speed jumped by 300% and lead conversion tripled in less than a month! The dark neon aesthetic and WhatsApp routing are unmatched.",
    serviceUsed: "Website Development & Meta Ads"
  },
  {
    id: "test-2",
    name: "Sarah Jenkins",
    role: "Marketing Director",
    company: "Velvet Couture UK",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "Working with Ghufran King Digital was smooth and professional. They delivered our e-commerce store ahead of schedule, configured Stripe payments flawlessly, and set up our Meta pixel ads. Highly recommended!",
    serviceUsed: "E-commerce Website & Facebook Ads"
  },
  {
    id: "test-3",
    name: "Dr. Tariq Mahmood",
    role: "Managing Director",
    company: "Quantum Health Care",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "The AI Automation and WhatsApp Business bot built by GK Digital saved our team over 20 hours every week. Patient inquiries are answered 24/7 automatically!",
    serviceUsed: "AI Automation & WhatsApp Setup"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Why should I choose GHUFRAN KING DIGITAL for my project?",
    answer: "We combine modern cutting-edge tech (React, Next.js, AI) with high-converting marketing strategies. Unlike generic agencies, we build fast, ultra-secure, custom digital assets that deliver measurable business ROI.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "How long does it take to complete a custom website?",
    answer: "Landing pages take 2-4 days, standard business websites take 7-10 days, and complex e-commerce or full-stack platforms take 10-18 days depending on requirements.",
    category: "Development"
  },
  {
    id: "faq-3",
    question: "Do you offer domain, hosting, and SSL certificates?",
    answer: "Yes! We handle full domain registration, cloud NVMe SSD web hosting, SSL security configuration, and website deployment so you get a turnkey live platform without technical stress.",
    category: "Hosting & Domains"
  },
  {
    id: "faq-4",
    question: "How do your Google and Facebook Ad services work?",
    answer: "We design high-converting ad graphics/videos, set up retargeting pixels, target laser-focused buyer demographics, and continuously optimize ad budgets to deliver maximum return on ad spend (ROAS).",
    category: "Marketing"
  },
  {
    id: "faq-5",
    question: "Can you automate my customer support with AI and WhatsApp?",
    answer: "Absolutely! We build custom AI chatbots trained on your business data and integrate them directly into your website and WhatsApp Business number to qualify leads and answer inquiries 24/7.",
    category: "AI & WhatsApp"
  }
];

export const COMPANY_VALUES = [
  {
    title: "Mission",
    description: "To empower global businesses, entrepreneurs, and brands with hyper-modern digital websites, high-conversion marketing, and automated AI solutions.",
    icon: "Target"
  },
  {
    title: "Vision",
    description: "To be the premier digital agency trusted globally for craftsmanship, lightning speed, bulletproof security, and transformative online business growth.",
    icon: "Eye"
  },
  {
    title: "Why Choose Us",
    description: "100% custom non-templated craftsmanship, 24/7 VIP client communication, transparent pricing, zero hidden fees, and guaranteed performance results.",
    icon: "Award"
  }
];
