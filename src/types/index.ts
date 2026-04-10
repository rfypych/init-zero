export type ContentBlockType = 'text' | 'alert' | 'code' | 'interactive';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string; // Markdown or plain text
  metadata?: any;  // Extra data, e.g., code language, alert type, component name
}

export type QuizType = 'mcq' | 'log_analysis' | 'flag_submission';

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface BaseQuiz {
  id: string;
  type: QuizType;
  question: string;
  explanation?: string;
  hints?: string[]; // Progressive hints for beginners
}

export interface MCQQuiz extends BaseQuiz {
  type: 'mcq';
  options: MCQOption[];
}

export interface LogAnalysisQuiz extends BaseQuiz {
  type: 'log_analysis';
  logData: string;
  correctLines: number[]; // Array of line numbers that indicate vulnerability
}

export interface FlagSubmissionQuiz extends BaseQuiz {
  type: 'flag_submission';
  flag: string;
}

export type Quiz = MCQQuiz | LogAnalysisQuiz | FlagSubmissionQuiz;

export interface ModuleSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface CyberSecModule {
  id: string;
  slug: string;
  title: string;
  category: SyllabusCategory;
  description: string;
  sections: ModuleSection[];
  quiz?: Quiz;
  isPlaceholder?: boolean;
}

export type SyllabusCategory =
  | 'Bootcamp 101'
  | 'Infrastructure Hardening'
  | 'Offensive / Red Team Based CTF'
  | 'Web Exploitation'
  | 'Binary Exploitation'
  | 'Reverse Engineering'
  | 'Digital Forensic'
  | 'SOC';

export interface SyllabusItem {
  id: string;
  title: string;
  modules: CyberSecModule[];
}
