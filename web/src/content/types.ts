export type Locale = "zh" | "en";

export type NavItem = {
  href: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string[];
  modules?: { title: string; body: string }[];
  highlights?: string[];
  applicable?: string[];
  format?: "full" | "brief";
  group?: "enterprise" | "public";
  featured?: boolean;
  stage?: {
    current: 1 | 2 | 3;
    note: string;
  };
  disclosure: "high" | "medium" | "low";
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    nameEn: string;
    tagline: string;
  };
  nav: NavItem[];
  cta: {
    consult: string;
    methodology: string;
    contact: string;
    careers: string;
    invest: string;
    learnMore: string;
    viewCase: string;
    backHome: string;
  };
  home: {
    hero: {
      brand: string;
      headline: string;
      sub: string;
      primaryCta: string;
      secondaryCta: string;
    };
    pain: {
      title: string;
      sub: string;
      items: { title: string; body: string }[];
    };
    method: {
      title: string;
      sub: string;
      steps: { title: string; body: string }[];
    };
    capabilities: {
      title: string;
      sub: string;
      items: { title: string; body: string }[];
    };
    industries: {
      title: string;
      sub: string;
      primary: { title: string; body: string }[];
      secondary: string[];
    };
    cases: {
      title: string;
      sub: string;
    };
    growth: {
      title: string;
      sub: string;
      stages: { title: string; body: string; period: string }[];
      note: string;
    };
    trust: {
      title: string;
      sub: string;
      points: string[];
    };
    outlook: {
      title: string;
      body: string;
    };
    finalCta: {
      title: string;
      sub: string;
      items: { label: string; href: string; desc: string }[];
    };
  };
  about: {
    title: string;
    sub: string;
    story: { title: string; paragraphs: string[] };
    method: {
      title: string;
      intro: string;
      palantir: { title: string; body: string };
      local: { title: string; points: string[] };
      lifecycle: { title: string; steps: string[] };
    };
    team: { title: string; sub: string; members: TeamMember[] };
    committee: { title: string; body: string };
  };
  solutions: {
    title: string;
    sub: string;
    items: {
      title: string;
      pain: string;
      method: string;
      deliverables: string;
      fit: string;
    }[];
  };
  industries: {
    title: string;
    sub: string;
    items: {
      title: string;
      priority: "primary" | "core" | "secondary";
      persona: string;
      scenarios: string[];
      problems: string[];
    }[];
  };
  cases: {
    title: string;
    sub: string;
    labels: {
      challenge: string;
      approach: string;
      solution: string;
      results: string;
      modules: string;
      highlights: string;
      applicable: string;
      enterpriseTitle: string;
      enterpriseLead: string;
      publicTitle: string;
      publicLead: string;
      stage: string;
      stageNames: [string, string, string];
    };
    items: CaseStudy[];
  };
  insights: {
    title: string;
    sub: string;
    categories: string[];
    empty: string;
    placeholders: { title: string; category: string; excerpt: string }[];
  };
  careers: {
    title: string;
    sub: string;
    why: { title: string; points: string[] };
    culture: { title: string; body: string };
    roles: { title: string; empty: string; items: { title: string; type: string; loc: string }[] };
  };
  contact: {
    title: string;
    sub: string;
    office: string;
    officeValue: string;
    form: {
      intent: string;
      intents: { value: string; label: string }[];
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      notConfigured: string;
      privacyNote: string;
    };
  };
  footer: {
    blurb: string;
    rights: string;
  };
};
