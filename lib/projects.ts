export type Project = {
  slug: string;
  name: string;
  year: string;
  blurb: string;
  stack: string[];
  tags: ("AI" | "Full-stack")[];
  repo: string;
  live?: string;
  
  // Case study data
  problem?: string;
  solution?: string;
  architecture?: {
    nodes: string[]; // Sequential flow
  };
  engineeringDecisions?: { title: string; description: string }[];
  challenges?: string[];
  learnings?: string[];
};

export const projects: Project[] = [
  {
    slug: "proofly",
    name: "Proofly",
    year: "2026",
    blurb: "Skill-proof platform: AI-generated challenges, AI-evaluated submissions, and a place to find projects and teammates. The flagship, covered above.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
    tags: ["AI", "Full-stack"],
    repo: "https://github.com/Deep-2308/Proofly",
    live: "https://prooflly.vercel.app/",
    problem: "People often list skills on their resume that they cannot actually demonstrate, while capable engineers struggle to prove their competence without existing work experience. The original iteration, SkillSync, connected clients with freelancers, but I realized the core problem was validating skills reliably.",
    solution: "A platform where users take AI-generated skill challenges and submit answers for AI evaluation, building up verified evidence of their skills. It also includes team building and project workspace features.",
    architecture: {
      nodes: ["User Profile", "AI Challenge Generator", "User Submission", "AI Evaluation", "Verified Evidence Record"]
    },
    engineeringDecisions: [
      {
        title: "Rebuilding from SkillSync",
        description: "After building the first version (SkillSync), I identified architectural limitations and bug-prone areas. I chose to completely rebuild it as Proofly to ensure a more robust foundation for the AI features."
      },
      {
        title: "Full-Stack Next.js",
        description: "Used Next.js App Router to handle both the frontend UI and the backend API routes natively, simplifying deployment and sharing TypeScript types across the stack."
      }
    ]
  },
  {
    slug: "ai-clipping",
    name: "AI Clipping",
    year: "2026",
    blurb: "Local-first pipeline that turns long videos into edited short-form clips. Completed through V13.3, with subject-aware framing planned for V14.",
    stack: ["Python", "FFmpeg", "faster-whisper", "OpenCV", "YOLO11"],
    tags: ["AI"],
    repo: "https://github.com/Deep-2308/AI-Clipping",
    problem: "Automated video cropping tools often select the wrong moments, make jarring cuts, and fail to capture the pacing of human-edited clips.",
    solution: "A pipeline that evaluates moments, framing, and pacing to generate short vertical clips from long-form video. It is currently on version 13.3, with continuous iteration based on comparing the output quality against previous versions.",
    architecture: {
      nodes: ["Long-form Video Input", "faster-whisper Transcription", "Scene/Moment Analysis", "OpenCV & YOLO11 Framing", "FFmpeg Clip Generation"]
    },
    engineeringDecisions: [
      {
        title: "Local-First Architecture",
        description: "Built to run locally instead of relying on expensive cloud GPU APIs, utilizing faster-whisper and OpenCV for efficient local processing."
      },
      {
        title: "Iterative Evaluation",
        description: "Instead of trusting a single LLM prompt to edit video, I iterate by comparing each generated clip to the previous version and keeping only what looks objectively better."
      }
    ],
    learnings: [
      "Subject-aware framing is incredibly complex due to erratic movement. Planning to integrate YOLO11 tracking in V14 to fix center-framing drift."
    ]
  },
  {
    slug: "cinestream",
    name: "CineStream",
    year: "2026",
    blurb: "AI-powered movie discovery and streaming platform. React and Vite frontend, Express and Node backend, in one repo.",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB"],
    tags: ["AI", "Full-stack"],
    repo: "https://github.com/Deep-2308/CineStream",
    live: "https://cine-stream-nu.vercel.app",
    problem: "Finding a movie to watch often involves endless scrolling without personalized, context-aware recommendations.",
    solution: "An AI-powered discovery and streaming interface built with a decoupled frontend and backend.",
    architecture: {
      nodes: ["React + Vite Frontend", "Express + Node Backend", "AI Discovery Logic", "MongoDB Storage"]
    },
    engineeringDecisions: [
      {
        title: "Decoupled Architecture",
        description: "Separated the frontend (React/Vite) from the backend (Express/Node.js) while keeping them in a single repository for easier iteration."
      }
    ]
  },
  {
    slug: "skillsync",
    name: "SkillSync",
    year: "2026",
    blurb: "My first take on a skills and hiring marketplace, connecting clients with freelancers. The idea I later rebuilt as Proofly.",
    stack: ["Next.js", "TypeScript", "MongoDB"],
    tags: ["Full-stack"],
    repo: "https://github.com/Deep-2308/SkillSync",
    problem: "Connecting clients with reliable freelancers is difficult when skills cannot be easily verified.",
    solution: "A hiring marketplace platform serving as my initial prototype before pivoting to the AI-evaluated challenge model of Proofly.",
    architecture: {
      nodes: ["Client Portal", "Freelancer Profiles", "Marketplace Matching", "MongoDB Database"]
    },
    learnings: [
      "The initial marketplace idea was limited by the inability to truly verify skills. This directly led to the development of Proofly."
    ]
  },
  {
    slug: "sms-spam-classifier",
    name: "SMS Spam Classifier",
    year: "2026",
    blurb: "Neural network that labels SMS messages as spam or ham, with a Streamlit interface. Trained on 5,572 messages; the README reports 98.6% validation accuracy.",
    stack: ["Python", "TensorFlow", "Streamlit"],
    tags: ["AI"],
    repo: "https://github.com/Deep-2308/Text-Classification-TensorFlow",
    problem: "SMS spam is intrusive and relies on consistent patterns that are tedious to filter manually.",
    solution: "A machine learning model trained on 5,572 messages to classify texts as spam or ham, achieving 98.6% validation accuracy, wrapped in an interactive Streamlit UI.",
    architecture: {
      nodes: ["Text Input (Streamlit UI)", "Text Preprocessing & Tokenization", "TensorFlow Neural Network", "Spam/Ham Classification Result"]
    },
    engineeringDecisions: [
      {
        title: "Streamlit UI",
        description: "Chose Streamlit to rapidly deploy the model into a usable web interface without building a complex frontend."
      }
    ]
  },
  {
    slug: "cobalance",
    name: "CoBalance",
    year: "2026",
    blurb: "A digital ledger and shared-expense app. Built to replace the spreadsheet I used to track money owed between friends and family.",
    stack: ["React", "Vite", "Tailwind", "Node.js", "PostgreSQL"],
    tags: ["Full-stack"],
    repo: "https://github.com/Deep-2308/CoBalance",
    live: "https://co-balance.vercel.app",
    problem: "Tracking money owed between friends and family using spreadsheets was prone to errors, hard to access on mobile, and difficult to calculate settlements for.",
    solution: "A digital ledger that supports personal tracking, group splits, automatic settlement calculations, and monthly reports.",
    architecture: {
      nodes: ["React Frontend", "Node.js Backend", "Ledger Logic", "PostgreSQL Database"]
    },
    engineeringDecisions: [
      {
        title: "PostgreSQL for Ledger Data",
        description: "Chose a relational database (PostgreSQL) instead of NoSQL to ensure ACID compliance and strict relationships for financial transactions and user balances."
      }
    ]
  }
];
