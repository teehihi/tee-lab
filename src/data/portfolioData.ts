import {
  AchievementItem,
  ExperienceItem,
  FeaturedProject,
  PersonalInfo,
  SecondaryProject,
  SkillGroup,
} from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: 'Nguyen Nhat Thien',
  title: 'Software Engineer | Full-Stack & AI Developer',
  location: 'Thu Duc, Ho Chi Minh City, Vietnam',
  email: 'teeforwork21@gmail.com',
  phone: '(+84) 389 037 546',
  github: 'https://github.com/teehihi',
  linkedin: 'https://linkedin.com/in/tee21',
  university: 'Ho Chi Minh City University of Technology and Education (HCMUTE)',
  major: 'Information Technology',
  gpa: '3.24 / 4.00',
  expectedGraduation: '2027',
  aboutText: [
    'I am a final-year Information Technology student at Ho Chi Minh City University of Technology and Education (HCMUTE).',
    'I enjoy building products instead of only completing assignments. My projects focus on solving real problems through full-stack development, AI integration, computer vision, and modern web technologies.',
    'I frequently leverage AI-assisted development tools such as OpenAI Codex, Gemini API, and Kiro to rapidly prototype, iterate, and improve software products.',
    'My goal is to become a software engineer working on products that impact real users.',
  ],
  quote: 'I believe the best way to learn software engineering is by building products that people actually use.',
  learningTopics: [
    'AI Agents',
    'LLM Applications',
    'Computer Vision',
    'System Design',
    'Cloud Deployment',
  ],
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'phoenixvision',
    title: 'PhoenixVision',
    tagline: 'Intelligent Fire Monitoring System',
    category: 'AI • Computer Vision • Desktop Application',
    summary:
      'PhoenixVision is a proof-of-concept intelligent fire monitoring system that combines computer vision and real-time communication to detect fire and smoke from live surveillance streams.',
    motivation:
      'Traditional fire monitoring systems are expensive and often require specialized hardware. This project explores a software-first approach that can leverage existing surveillance cameras using RTSP/IP protocols without requiring additional hardware investment.',
    targetUsers: [
      'Warehouses & Logistics Centers',
      'Small Manufacturing Workshops',
      'Commercial Spaces',
      'Educational Institutions',
    ],
    role: [
      'Full-Stack & Computer Vision Architecture',
      'FastAPI Backend & YOLO Inference Pipeline',
      'Electron Desktop Application Development',
      'WebSocket Real-Time Video Alert Relay',
      'React Dashboard & UI/UX Design',
    ],
    techStack: [
      {
        category: 'Frontend',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Electron'],
      },
      {
        category: 'Backend',
        technologies: ['Python', 'FastAPI', 'WebSocket', 'Uvicorn'],
      },
      {
        category: 'AI',
        technologies: ['YOLOv8', 'OpenCV', 'PyTorch', 'Computer Vision'],
      },
      {
        category: 'Tools',
        technologies: ['Electron', 'Git', 'RTSP Streams', 'Webcam API'],
      },
      {
        category: 'Deployment',
        technologies: ['Desktop Executable', 'Docker', 'Vercel Dashboard'],
      },
    ],
    features: [
      {
        title: 'Real-Time AI Fire & Smoke Detection',
        description:
          'Processes video frames at high FPS using lightweight YOLOv8 models fine-tuned to classify flames and smoke with high confidence.',
        iconName: 'Flame',
        badge: 'Core AI',
      },
      {
        title: 'OpenCV Stream Ingestion',
        description:
          'Flexible video pipeline supporting RTSP IP cameras, standard webcams, and pre-recorded video feeds.',
        iconName: 'Video',
        badge: 'Ingestion',
      },
      {
        title: 'Low-Latency WebSocket Relay',
        description:
          'Transmits annotated detection bounding boxes and risk telemetry instantly to the electron app and dashboard.',
        iconName: 'Zap',
        badge: 'Real-Time',
      },
      {
        title: 'Electron Desktop & React Dashboard',
        description:
          'Provides desktop tray notifications, visual audio alarms, stream management, and historical alert logs.',
        iconName: 'Layout',
        badge: 'Cross-Platform',
      },
      {
        title: 'Risk Level Visualization',
        description:
          'Multi-tiered warning matrix (Normal, Caution, Threat, Critical) calculated based on bounding box confidence and area density.',
        iconName: 'AlertTriangle',
        badge: 'Safety UI',
      },
    ],
    architectureNodes: [
      { name: 'RTSP / Webcam', type: 'Input', description: 'Surveillance stream feed' },
      { name: 'OpenCV Frame Ingestion', type: 'Pipeline', description: 'Decodes video frames' },
      { name: 'YOLOv8 Inference Engine', type: 'AI Model', description: 'Detects fire & smoke bounding boxes' },
      { name: 'FastAPI Backend & WS Manager', type: 'Server', description: 'Dispatches WebSocket events' },
      { name: 'Electron Desktop App & React UI', type: 'Client', description: 'Displays live feed & fires alarms' },
    ],
    challenges: [
      {
        problem: 'High latency and frame drop during continuous YOLO model inference on live video streams.',
        decision:
          'Decoupled frame capture from inference using async Python queues and skipped non-key frames for model prediction while maintaining 30 FPS render loops.',
        outcome: 'Reduced alert latency to under 120ms with 94.2% detection precision on test streams.',
      },
      {
        problem: 'RTSP video stream connection dropping over poor network connections.',
        decision:
          'Implemented auto-reconnect backoff mechanisms in OpenCV ingestion thread with fallback test frames.',
        outcome: 'System automatically recovers within 2 seconds of stream restoration.',
      },
    ],
    aiWorkflow: {
      llmProvider: 'YOLOv8 & OpenCV Computer Vision Models',
      promptEngineering: 'Custom spatial bounding box thresholds & confidence score filtering.',
      workflowSteps: [
        'Frame decimation & resizing to 640x640 tensor format',
        'YOLOv8 forward pass for class detection (fire = 0, smoke = 1)',
        'Non-Maximum Suppression (NMS) to eliminate duplicate boxes',
        'Bounding box overlay & JSON metadata packaging',
        'WebSocket broadcast to connected frontend clients',
      ],
      aiApis: ['PyTorch', 'YOLOv8 Engine', 'OpenCV Python'],
      modelLimitations: 'Requires adequate lighting and direct line of sight; false positives possible with bright orange heat lamps.',
      improvements: 'Plan to integrate thermal IR sensor feeds and multi-camera spatial tracking.',
    },
    resultsMetrics: [
      { label: 'Alert Latency', value: '< 120ms', subtext: 'Real-time WebSocket dispatch' },
      { label: 'Detection Accuracy', value: '94.2%', subtext: 'Fine-tuned YOLO v8 precision' },
      { label: 'Stream Ingestion', value: '30 FPS', subtext: 'RTSP / IP Camera support' },
      { label: 'Hardware Cost', value: '$0', subtext: 'Uses existing IP cameras' },
    ],
    lessonsLearned: [
      'Async Python concurrency models (asyncio + FastAPI) are essential for high-throughput video pipelines.',
      'Decoupling AI inferencing from UI rendering prevents application freezing in desktop environments.',
      'Designing software to leverage existing infrastructure is key for real-world adoption in SME factories.',
    ],
    futureRoadmap: [
      'Multi-camera grid dashboard management',
      'Mobile push notifications via Firebase / WebPush',
      'Edge AI deployment on NVIDIA Jetson Nano / Raspberry Pi 5',
      'Cloud monitoring backup with automated incident reporting',
    ],
    mediaGallery: [
      { type: 'diagram', title: 'System Architecture Flow' },
      { type: 'code', title: 'FastAPI YOLO Inference Route', codeSnippet: `from fastapi import FastAPI, WebSocket\nimport cv2\nfrom ultralytics import YOLO\n\nmodel = YOLO('fire_smoke_best.pt')\n@app.websocket("/ws/stream")\nasync def video_stream(websocket: WebSocket):\n    await websocket.accept()\n    cap = cv2.VideoCapture(RTSP_URL)\n    while cap.isOpened():\n        ret, frame = cap.read()\n        results = model(frame, conf=0.5)\n        await websocket.send_json({"boxes": results[0].boxes.data.tolist()})` },
    ],
    githubUrl: 'https://github.com/teehihi/PhoenixVision',
    demoUrl: 'https://github.com/teehihi/PhoenixVision',
    status: 'Proof of Concept',
    gradient: 'from-amber-500/20 via-emerald-500/20 to-teal-500/20',
    heroImage: '/images/phoenixvision.png',
  },
  {
    id: 'uniquizz',
    title: 'UniQuizz',
    tagline: 'AI-Powered Learning Platform & RAG System',
    category: 'EdTech • AI • RAG • Real-Time Multiplayer',
    summary:
      'UniQuizz is an AI-powered learning platform that automatically converts uploaded course materials into interactive quizzes, flashcards, and multiplayer classroom games using Gemini API and RAG.',
    motivation:
      'Students and teachers spend excessive manual hours converting lecture slides and PDFs into practice questions. UniQuizz automates content extraction, semantic chunking, and quiz generation while adding gamified multiplayer interaction.',
    targetUsers: [
      'University Students',
      'Course Instructors & TAs',
      'Study Groups & Learning Communities',
    ],
    role: [
      'Full-Stack Platform Architecture',
      'Gemini API & RAG Vector Pipeline Design',
      'Real-Time Multiplayer Engine with Socket.io',
      'Text-to-Speech & AI Mentor Features',
      'Database Schema & MongoDB Optimization',
    ],
    techStack: [
      {
        category: 'Frontend',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      },
      {
        category: 'Backend',
        technologies: ['Node.js', 'Express.js', 'Socket.io', 'JWT'],
      },
      {
        category: 'AI',
        technologies: ['Google Gemini API', 'RAG', 'Vector Embeddings', 'Text-to-Speech'],
      },
      {
        category: 'Database',
        technologies: ['MongoDB', 'Mongoose', 'Vector Search'],
      },
      {
        category: 'Tools',
        technologies: ['Git', 'Vercel', 'Postman'],
      },
    ],
    features: [
      {
        title: 'Instant Document-to-Quiz AI Generation',
        description:
          'Upload PDFs, DOCX, or text notes; Gemini API parses content into multiple-choice, true/false, and short answer questions.',
        iconName: 'Sparkles',
        badge: 'RAG Powered',
      },
      {
        title: 'Retrieval-Augmented Generation (RAG)',
        description:
          'Chunks documents and performs vector retrieval to ensure AI questions strictly match syllabus context without hallucinations.',
        iconName: 'Database',
        badge: 'Precision',
      },
      {
        title: 'Live Classroom Multiplayer Mode',
        description:
          'Kahoot-style real-time quiz lobbies with live leaderboards, timer sync, and streak points via Socket.io.',
        iconName: 'Users',
        badge: 'Socket.io',
      },
      {
        title: 'Interactive AI Mentor & TTS',
        description:
          'Embedded AI tutor explains correct answers on demand with native browser voice synthesis.',
        iconName: 'Bot',
        badge: 'Voice & AI',
      },
      {
        title: 'Smart Flashcards & Deck Sharing',
        description:
          'Spaced-repetition flashcards auto-generated from weak quiz topics with public sharing links.',
        iconName: 'Layers',
        badge: 'Study Tool',
      },
    ],
    architectureNodes: [
      { name: 'Document Upload (PDF/Text)', type: 'Input', description: 'User submits syllabus materials' },
      { name: 'Text Extraction & Vector Chunking', type: 'Pipeline', description: 'Splits text into 500-token chunks' },
      { name: 'Gemini RAG Engine', type: 'AI Service', description: 'Generates structured JSON quiz schemas' },
      { name: 'Node.js & MongoDB Database', type: 'Storage', description: 'Stores decks, scores, and flashcards' },
      { name: 'Socket.io Multiplayer Room', type: 'Real-Time', description: 'Synchronizes live session state' },
      { name: 'React Client Web App', type: 'UI', description: 'Interactive quiz & leaderboard interface' },
    ],
    challenges: [
      {
        problem: 'Ensuring structured JSON output consistency from LLMs without formatting errors.',
        decision:
          'Leveraged Gemini Schema enforcement and JSON mode prompt wrappers with Zod validation fallbacks.',
        outcome: 'Achieved 99.4% valid question schema generation rate across 500+ generated questions.',
      },
      {
        problem: 'Handling 50+ concurrent websocket connections during a live classroom test event without state desynchronization.',
        decision:
          'Built an in-memory lobby state manager in Node.js with delta updates and heartbeat synchronization.',
        outcome: 'Flawlessly supported a live 50+ student classroom event with zero dropped responses.',
      },
    ],
    aiWorkflow: {
      llmProvider: 'Google Gemini 1.5 Flash / Pro',
      promptEngineering: 'Few-shot structured JSON prompts with explicit context constraints to prevent hallucinations.',
      workflowSteps: [
        'Document parsing & text normalization',
        'Semantic sliding-window chunking',
        'Contextual prompt assembly with strict bloom taxonomy difficulty parameters',
        'Gemini API request with JSON response schema',
        'Schema validation & store in MongoDB',
      ],
      ragPipeline: 'TF-IDF / Cosine similarity vector search over document chunks.',
      aiApis: ['Google Generative AI SDK (@google/generative-ai)', 'Web Speech Synthesis API'],
      modelLimitations: 'Scanned image-only PDFs require OCR preprocessing before chunking.',
      improvements: 'Integrating multimodal image & diagram understanding directly into question generation.',
    },
    resultsMetrics: [
      { label: 'Live Classroom Users', value: '50+', subtext: 'Concurrent participants in live test' },
      { label: 'Registered Users', value: '30+', subtext: 'Active university students' },
      { label: 'Questions Generated', value: '500+', subtext: 'AI-generated study items' },
      { label: 'Uploaded Syllabus Docs', value: '34', subtext: 'Course documents indexed' },
      { label: 'Quiz Decks Created', value: '48', subtext: 'Active study decks' },
    ],
    lessonsLearned: [
      'Prompt engineering is code: strict schema enforcement and error boundaries are mandatory for production AI features.',
      'Real-time socket state management requires clean modular pub/sub abstractions to scale.',
      'Building for real users during a live classroom trial yields immediate invaluable feedback.',
    ],
    futureRoadmap: [
      'Teacher dashboard with cohort weakness analytics',
      'Personalized adaptive difficulty AI learning recommendations',
      'In-depth step-by-step AI video/audio explanations',
      'Offline PWA support for mobile revision',
    ],
    mediaGallery: [
      { type: 'diagram', title: 'UniQuizz RAG & Socket Flow' },
      { type: 'code', title: 'Gemini RAG Prompt Handler', codeSnippet: `const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });\nconst result = await model.generateContent([\n  "Generate 5 quiz questions based ONLY on this context in JSON format:",\n  contextChunk,\n]);` },
    ],
    githubUrl: 'https://github.com/teehihi/UniQuizz',
    demoUrl: 'https://uniquizzdom.vercel.app/',
    status: 'Production',
    gradient: 'from-teal-500/20 via-emerald-500/20 to-cyan-500/20',
    heroImage: '/images/uniquizz.png',
  },
  {
    id: 'xenow',
    title: 'XeNow',
    tagline: 'Online Vehicle Rental Platform',
    category: 'Full-Stack Web Application',
    summary:
      'XeNow is a complete vehicle rental platform that automates the full customer journey from vehicle discovery, real-time availability checking, booking management, and payment history.',
    motivation:
      'Many local rental providers operate manually with Excel sheets and Zalo messages. XeNow provides an end-to-end, responsive web platform designed to digitize rental operations.',
    targetUsers: ['Vehicle Rental Providers', 'Customers & Travelers'],
    role: [
      'Full-Stack Architecture & Database Design',
      'React Frontend UI Components & Form Handling',
      'Node.js REST API & MySQL Relational Schema',
      'Async API Integration & Robust Error Handling',
      'Usability Testing & Classmate Feedback Iterations',
    ],
    techStack: [
      {
        category: 'Frontend',
        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
      },
      {
        category: 'Backend',
        technologies: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
      },
      {
        category: 'Database',
        technologies: ['MySQL', 'Relational Schema', 'Sequelize / SQL'],
      },
      {
        category: 'Tools',
        technologies: ['Postman', 'Git', 'Vercel'],
      },
    ],
    features: [
      {
        title: 'Secure Authentication & Profiles',
        description:
          'JWT authentication with role-based access control for customers and fleet managers.',
        iconName: 'ShieldCheck',
        badge: 'Security',
      },
      {
        title: 'Fleet Catalog & Vehicle Filtering',
        description:
          'Filter vehicles by category (Motorbike, Sedan, SUV), seating capacity, fuel type, and daily rental rate.',
        iconName: 'Car',
        badge: 'Catalog',
      },
      {
        title: 'Booking & Date Range Availability',
        description:
          'Conflict-free date picker ensuring vehicles cannot be double-booked across overlapping timeframes.',
        iconName: 'Calendar',
        badge: 'Booking Engine',
      },
      {
        title: 'Payment & Rental Status Dashboard',
        description:
          'Track active, upcoming, and completed rental orders with detailed receipts and payment updates.',
        iconName: 'Receipt',
        badge: 'Management',
      },
    ],
    architectureNodes: [
      { name: 'React UI Client', type: 'Frontend', description: 'Responsive booking interface' },
      { name: 'Express REST Router', type: 'Backend API', description: 'Handles CRUD operations & Auth' },
      { name: 'MySQL Database', type: 'Storage', description: 'Relational data for users, vehicles, and bookings' },
    ],
    challenges: [
      {
        problem: 'Preventing double-booking race conditions when multiple users book the same vehicle concurrently.',
        decision:
          'Implemented SQL transactions with row-level locks (`SELECT FOR UPDATE`) on availability queries.',
        outcome: '100% data integrity with zero double-booking occurrences in stress testing.',
      },
    ],
    resultsMetrics: [
      { label: 'Booking Flow Time', value: '< 45s', subtext: 'From search to confirmed reservation' },
      { label: 'Usability Score', value: '4.8/5.0', subtext: 'Peer classroom testing feedback' },
      { label: 'Database Normalization', value: '3NF', subtext: 'Clean relational MySQL design' },
    ],
    lessonsLearned: [
      'Relational database design (3NF, foreign key integrity) is vital when handling time-bound transactions like rental bookings.',
      'Usability testing with real classmates quickly exposed UI friction points that developer-only testing missed.',
    ],
    futureRoadmap: [
      'Integration with VNPay / MoMo payment gateways',
      'Automated SMS & Email booking confirmations',
      'Admin analytics dashboard for fleet revenue reporting',
    ],
    mediaGallery: [{ type: 'diagram', title: 'XeNow Database & Booking Flow' }],
    githubUrl: 'https://github.com/teehihi/XeNow',
    demoUrl: 'https://github.com/teehihi/XeNow',
    status: 'Completed',
    gradient: 'from-emerald-500/20 via-teal-500/20 to-green-500/20',
    heroImage: '/images/xenow.png',
  },
];

export const secondaryProjects: SecondaryProject[] = [
  {
    id: 'movie-discovery',
    title: 'Movie Discovery Platform',
    category: 'Frontend Web App',
    description:
      'A sleek movie and TV show exploration web app using TMDB API with real-time search, trending carousels, genre filters, and trailer modal previews.',
    myContributions: [
      'Designed responsive dark glassmorphic UI layout',
      'Implemented async debounce search and infinity scrolling',
      'Integrated TMDB API with query caching',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'TMDB API', 'Framer Motion'],
    githubUrl: 'https://github.com/teehihi',
    demoUrl: 'https://github.com/teehihi',
    status: 'Live',
    previewBadge: 'Movie App',
    gradient: 'from-purple-500/20 to-emerald-500/20',
  },
  {
    id: 'corava-maris',
    title: 'Corava Maris',
    category: 'Full-Stack Web App',
    description:
      'E-commerce & presentation website featuring modern typography, product catalogs, shopping cart logic, and slick micro-interactions.',
    myContributions: [
      'Developed responsive shopping cart & checkout flow',
      'Built backend REST API routes and database models',
      'Crafted micro-animations with Framer Motion',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/teehihi',
    status: 'Completed',
    previewBadge: 'E-Commerce',
    gradient: 'from-blue-500/20 to-teal-500/20',
  },
  {
    id: 'skewer-sort',
    title: 'Skewer Sort',
    category: 'Web Game / Puzzle',
    description:
      'Interactive culinary sorting puzzle game built for browser canvas, testing algorithmic state logic, drag-and-drop mechanics, and score tracking.',
    myContributions: [
      'Programmed core grid sorting algorithm & state stack',
      'Designed visual assets and sound effect triggers',
    ],
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Vite'],
    githubUrl: 'https://github.com/teehihi',
    status: 'Completed',
    previewBadge: 'Puzzle Game',
    gradient: 'from-amber-500/20 to-emerald-500/20',
  },
  {
    id: 'dac-san-viet',
    title: 'Đặc Sản Việt',
    category: 'Regional Specialty Platform',
    description:
      'Web application highlighting traditional Vietnamese regional foods and cultural specialties with interactive maps, recipes, and vendor listings.',
    myContributions: [
      'Built interactive region selector map',
      'Created content management views for regional dishes',
    ],
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'MySQL'],
    githubUrl: 'https://github.com/teehihi',
    status: 'Completed',
    previewBadge: 'Cultural Web',
    gradient: 'from-red-500/20 to-teal-500/20',
  },
  {
    id: 'prompt-to-play-2026',
    title: 'Prompt To Play 2026 - Finalist',
    category: '24-hour AI Puzzle Game Competition',
    description:
      '24-hour hackathon project focused on rapid prototyping with AI assistance. Created interactive AI-driven puzzle mechanics under high sprint pressure.',
    myContributions: [
      'Led rapid prototyping and AI workflow integration',
      'Built gameplay UI & state sync within 24 hours',
      'Demonstrated project to competition judges',
    ],
    techStack: ['React', 'Vite', 'OpenAI Codex', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/teehihi/prompt-to-play-portfolio',
    status: 'Hackathon Winner',
    previewBadge: 'Finalist Award',
    gradient: 'from-emerald-500/30 to-teal-600/30',
  },
  {
    id: 'open-hackathon-2025',
    title: 'HCMUTE Open Hackathon 2025',
    category: 'Hackathon Project - Consolation Prize',
    description:
      'Developed an innovative software solution under hackathon conditions addressing real-world community issues with modern web architecture.',
    myContributions: [
      'Backend API integration & real-time features',
      'Pitch deck and technical demonstration',
    ],
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/teehihi',
    status: 'Hackathon Winner',
    previewBadge: 'Consolation Prize',
    gradient: 'from-teal-500/30 to-emerald-500/30',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'TypeScript', level: 'Proficient' },
      { name: 'Java', level: 'Proficient' },
      { name: 'Python', level: 'Proficient' },
      { name: 'SQL', level: 'Proficient' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'Vite', level: 'Advanced' },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
      { name: 'Angular', level: 'Exploring' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'Spring Boot', level: 'Proficient' },
      { name: 'FastAPI', level: 'Proficient' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'WebSocket', level: 'Proficient' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MySQL', level: 'Proficient' },
      { name: 'MongoDB', level: 'Proficient' },
      { name: 'SQL Server', level: 'Proficient' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced' },
      { name: 'Electron', level: 'Proficient' },
      { name: 'Postman', level: 'Advanced' },
      { name: 'Vercel', level: 'Proficient' },
    ],
  },
  {
    category: 'AI & Prompting',
    skills: [
      { name: 'Gemini API', level: 'Advanced' },
      { name: 'OpenAI Codex', level: 'Advanced' },
      { name: 'Kiro', level: 'Proficient' },
      { name: 'Prompt Engineering', level: 'Advanced' },
      { name: 'AI-assisted Development', level: 'Advanced' },
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    company: 'Outlier',
    role: 'AI Quality Evaluator',
    type: 'Part-time',
    period: '2024 - Present',
    responsibilities: [
      'Evaluated AI-generated outputs for quality, accuracy, code correctness, and strict instruction following.',
      'Refined complex technical prompts through iterative testing and RLHF preference labeling.',
      'Rewrote prompt test suites for multilingual AI evaluation workflows.',
      'Contributed directly to multilingual AI model training and quality assurance.',
    ],
    skills: [
      'AI Evaluation',
      'RLHF',
      'Prompt Engineering',
      'LLM Assessment',
      'Code Quality Review',
    ],
  },
];

export const achievementsData: AchievementItem[] = [
  {
    title: 'Finalist',
    event: 'VNGGames Prompt To Play 2026',
    description: '24-hour AI Puzzle Game Competition focused on rapid prototyping and AI-assisted development.',
    badge: 'Finalist',
    year: '2026',
    type: 'hackathon',
    icon: 'Trophy',
  },
  {
    title: 'Consolation Prize',
    event: 'HCMUTE Open Hackathon 2025',
    description: 'Recognized for building innovative full-stack application under 36-hour hackathon conditions.',
    badge: 'Winner',
    year: '2025',
    type: 'hackathon',
    icon: 'Award',
  },
  {
    title: 'TOEIC 685 ETS',
    event: 'ETS International English Certification',
    description: 'Demonstrated strong professional English reading & listening communication capabilities.',
    badge: '685 ETS',
    year: '2024',
    type: 'language',
    icon: 'GraduationCap',
  },
  {
    title: 'Prompt Design in Vertex AI',
    event: 'Google Cloud Skill Badge',
    description: 'Certified expertise in prompt engineering, parameter tuning, and GenAI models on Google Cloud Vertex AI.',
    badge: 'Google Certified',
    year: '2024',
    type: 'certification',
    icon: 'Sparkles',
  },
  {
    title: 'Data Engineering & Cloud Foundations',
    event: 'AWS Academy',
    description: 'Comprehensive certification in cloud architecture, data pipelines, S3, EC2, and distributed databases.',
    badge: 'AWS Academy',
    year: '2024',
    type: 'certification',
    icon: 'Cloud',
  },
];
