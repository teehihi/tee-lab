export interface MetricItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface TechStackCategory {
  category: 'Frontend' | 'Backend' | 'Database' | 'AI' | 'Tools' | 'Deployment';
  technologies: string[];
}

export interface AIWorkflowInfo {
  llmProvider: string;
  promptEngineering: string;
  workflowSteps: string[];
  ragPipeline?: string;
  aiApis: string[];
  agentWorkflow?: string;
  modelLimitations: string;
  improvements: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  category: string;
  summary: string;
  motivation: string;
  targetUsers: string[];
  role: string[];
  techStack: TechStackCategory[];
  features: FeatureItem[];
  architectureDiagramSvg?: string;
  architectureNodes: { name: string; type: string; description: string }[];
  challenges: { problem: string; decision: string; outcome: string }[];
  aiWorkflow?: AIWorkflowInfo;
  resultsMetrics: MetricItem[];
  lessonsLearned: string[];
  futureRoadmap: string[];
  mediaGallery: { type: 'image' | 'code' | 'diagram'; title: string; url?: string; codeSnippet?: string }[];
  githubUrl: string;
  demoUrl?: string;
  isPrivate?: boolean;
  status: 'Production' | 'Proof of Concept' | 'Completed';
  gradient: string;
  heroImage: string;
}

export interface SecondaryProject {
  id: string;
  title: string;
  category: string;
  description: string;
  myContributions: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: 'Live' | 'Archived' | 'Hackathon Winner' | 'Completed';
  previewBadge?: string;
  gradient: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  period: string;
  responsibilities: string[];
  skills: string[];
}

export interface AchievementItem {
  title: string;
  event: string;
  description: string;
  badge: string;
  year: string;
  type: 'hackathon' | 'certification' | 'language';
  icon: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: 'Advanced' | 'Proficient' | 'Exploring'; icon?: string }[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  university: string;
  major: string;
  gpa: string;
  expectedGraduation: string;
  aboutText: string[];
  quote: string;
  learningTopics: string[];
}
