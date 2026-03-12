import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";
import Testimonial from "./models/Testimonial.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eduvision-institute";

const courses = [
    {
        title: "Full Stack Web Development (MERN)",
        description: "Master the MERN stack — MongoDB, Express.js, React.js, and Node.js — to build modern, scalable web applications from scratch. This comprehensive course covers frontend and backend development, RESTful APIs, authentication, deployment, and real-world project building.",
        shortDescription: "Build full-stack apps with MongoDB, Express, React & Node.js",
        category: "Web Development",
        duration: "6 Months",
        price: 35000,
        discountPrice: 24999,
        instructor: "Rahul Sharma",
        level: "Beginner",
        totalStudents: 1250,
        rating: 4.8,
        isActive: true,
        features: [
            "Live Interactive Classes",
            "15+ Real-World Projects",
            "Placement Assistance",
            "Lifetime Access to LMS",
            "Certificate of Completion",
            "1:1 Doubt Resolution"
        ],
        syllabus: [
            {
                module: "HTML5 & CSS3 Fundamentals",
                topics: ["HTML Semantic Elements", "CSS Flexbox & Grid", "Responsive Design", "CSS Animations", "Bootstrap 5"]
            },
            {
                module: "JavaScript & ES6+",
                topics: ["Variables & Data Types", "Functions & Closures", "DOM Manipulation", "Async/Await & Promises", "ES6+ Features"]
            },
            {
                module: "React.js",
                topics: ["Components & Props", "State Management", "React Hooks", "React Router", "Context API & Redux", "Performance Optimization"]
            },
            {
                module: "Node.js & Express.js",
                topics: ["Node.js Fundamentals", "Express.js Framework", "REST API Development", "Middleware & Error Handling", "File Uploads"]
            },
            {
                module: "MongoDB & Database Design",
                topics: ["MongoDB Basics", "Mongoose ODM", "Schema Design", "Aggregation Pipeline", "Indexing & Performance"]
            },
            {
                module: "Authentication & Deployment",
                topics: ["JWT Authentication", "OAuth2.0", "Security Best Practices", "AWS/Vercel Deployment", "CI/CD Pipeline"]
            }
        ]
    },
    {
        title: "Advanced React.js & Next.js",
        description: "Take your React skills to the next level with advanced patterns, server-side rendering with Next.js, state management solutions, testing, and performance optimization techniques used by top companies.",
        shortDescription: "Master React patterns, Next.js SSR & advanced state management",
        category: "Web Development",
        duration: "4 Months",
        price: 28000,
        discountPrice: 19999,
        instructor: "Priya Patel",
        level: "Advanced",
        totalStudents: 820,
        rating: 4.7,
        isActive: true,
        features: [
            "Advanced Design Patterns",
            "Server-Side Rendering",
            "Testing with Jest & RTL",
            "Performance Optimization",
            "Portfolio Projects",
            "Career Mentorship"
        ],
        syllabus: [
            {
                module: "Advanced React Patterns",
                topics: ["Higher-Order Components", "Render Props", "Custom Hooks", "Compound Components", "Error Boundaries"]
            },
            {
                module: "State Management Deep Dive",
                topics: ["Redux Toolkit", "Zustand", "React Query / TanStack Query", "Context Optimization", "State Machines with XState"]
            },
            {
                module: "Next.js Framework",
                topics: ["Pages vs App Router", "Server Components", "Static & Dynamic Rendering", "API Routes", "Middleware & Auth"]
            },
            {
                module: "Testing & Performance",
                topics: ["Unit Testing with Jest", "React Testing Library", "E2E with Playwright", "Profiling & Optimization", "Code Splitting & Lazy Loading"]
            }
        ]
    },
    {
        title: "React Native Mobile App Development",
        description: "Build cross-platform mobile applications for iOS and Android using React Native. Learn component architecture, navigation, state management, native modules, and publish your apps to the App Store and Play Store.",
        shortDescription: "Build iOS & Android apps with React Native",
        category: "Mobile Development",
        duration: "5 Months",
        price: 32000,
        discountPrice: 22999,
        instructor: "Amit Kumar",
        level: "Intermediate",
        totalStudents: 650,
        rating: 4.6,
        isActive: true,
        features: [
            "Cross-Platform Development",
            "5+ Published Apps",
            "App Store Deployment",
            "Push Notifications",
            "Offline Storage",
            "Industry Mentorship"
        ],
        syllabus: [
            {
                module: "React Native Foundations",
                topics: ["Environment Setup", "Core Components", "Styling & Flexbox", "Platform-Specific Code", "Debugging"]
            },
            {
                module: "Navigation & State",
                topics: ["React Navigation", "Stack & Tab Navigators", "Redux in Mobile", "AsyncStorage", "Context API"]
            },
            {
                module: "Native Features",
                topics: ["Camera & Gallery", "Maps & Location", "Push Notifications", "Animations (Reanimated)", "Native Modules"]
            },
            {
                module: "Deployment & Publishing",
                topics: ["App Store Guidelines", "Play Store Publishing", "OTA Updates", "Performance Optimization", "CI/CD for Mobile"]
            }
        ]
    },
    {
        title: "Data Science & Machine Learning with Python",
        description: "Comprehensive data science program covering Python, statistics, machine learning algorithms, deep learning, NLP, and real-world data analysis using pandas, scikit-learn, TensorFlow, and more.",
        shortDescription: "Learn Python, ML, deep learning & data analysis",
        category: "Data Science",
        duration: "8 Months",
        price: 45000,
        discountPrice: 34999,
        instructor: "Dr. Sneha Reddy",
        level: "Beginner",
        totalStudents: 980,
        rating: 4.9,
        isActive: true,
        features: [
            "Python from Scratch",
            "Real Datasets & Projects",
            "Kaggle Competitions",
            "Research Paper Reviews",
            "Interview Preparation",
            "Placement Support"
        ],
        syllabus: [
            {
                module: "Python Programming",
                topics: ["Python Fundamentals", "Data Structures", "OOP in Python", "File Handling", "Libraries (NumPy, Pandas)"]
            },
            {
                module: "Statistics & Mathematics",
                topics: ["Descriptive Statistics", "Probability Theory", "Hypothesis Testing", "Linear Algebra", "Calculus for ML"]
            },
            {
                module: "Machine Learning",
                topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering", "Ensemble Methods"]
            },
            {
                module: "Deep Learning & NLP",
                topics: ["Neural Networks", "CNNs for Computer Vision", "RNNs & LSTMs", "Natural Language Processing", "TensorFlow & PyTorch"]
            },
            {
                module: "Data Visualization & Deployment",
                topics: ["Matplotlib & Seaborn", "Plotly Dashboards", "Tableau", "Flask API Deployment", "MLOps Basics"]
            }
        ]
    },
    {
        title: "AWS Cloud Computing & Solutions Architect",
        description: "Prepare for the AWS Solutions Architect certification while gaining practical cloud skills. Learn EC2, S3, Lambda, VPC, RDS, and architect scalable, fault-tolerant systems on AWS.",
        shortDescription: "Master AWS services & earn cloud certification",
        category: "Cloud Computing",
        duration: "4 Months",
        price: 30000,
        discountPrice: 21999,
        instructor: "Vikram Singh",
        level: "Intermediate",
        totalStudents: 540,
        rating: 4.7,
        isActive: true,
        features: [
            "AWS Certification Prep",
            "Hands-on Labs",
            "Real Cloud Projects",
            "Free AWS Credits",
            "Mock Exams",
            "Job Assistance"
        ],
        syllabus: [
            {
                module: "Cloud Fundamentals",
                topics: ["Cloud Computing Concepts", "AWS Global Infrastructure", "IAM & Security", "Billing & Cost Management", "AWS CLI"]
            },
            {
                module: "Compute & Storage",
                topics: ["EC2 Instances", "Auto Scaling", "S3 Buckets", "EBS & EFS", "Lambda Functions"]
            },
            {
                module: "Networking & Databases",
                topics: ["VPC & Subnets", "Route 53 (DNS)", "CloudFront CDN", "RDS & DynamoDB", "ElastiCache"]
            },
            {
                module: "Architecture & Deployment",
                topics: ["Well-Architected Framework", "High Availability Design", "CloudFormation / Terraform", "CI/CD with CodePipeline", "Monitoring with CloudWatch"]
            }
        ]
    },
    {
        title: "Ethical Hacking & Cyber Security",
        description: "Learn offensive and defensive security skills. Cover network security, web app vulnerabilities, penetration testing, SIEM tools, incident response, and prepare for CEH certification.",
        shortDescription: "Master ethical hacking, pen testing & security tools",
        category: "Cyber Security",
        duration: "6 Months",
        price: 38000,
        discountPrice: 27999,
        instructor: "Karan Mehta",
        level: "Intermediate",
        totalStudents: 430,
        rating: 4.5,
        isActive: true,
        features: [
            "CEH Exam Preparation",
            "Live Hacking Labs",
            "CTF Challenges",
            "Bug Bounty Training",
            "Security Tools Mastery",
            "Industry Certification"
        ],
        syllabus: [
            {
                module: "Security Fundamentals",
                topics: ["CIA Triad", "Network Security Basics", "Cryptography", "Linux for Security", "Security Policies"]
            },
            {
                module: "Network & Web Security",
                topics: ["OWASP Top 10", "SQL Injection", "XSS & CSRF", "Burp Suite", "Wireshark Analysis"]
            },
            {
                module: "Penetration Testing",
                topics: ["Reconnaissance", "Scanning & Enumeration", "Exploitation (Metasploit)", "Post-Exploitation", "Report Writing"]
            },
            {
                module: "Defense & Incident Response",
                topics: ["Firewall Configuration", "IDS/IPS Systems", "SIEM (Splunk)", "Incident Response Plan", "Digital Forensics Basics"]
            }
        ]
    },
    {
        title: "UI/UX Design Masterclass",
        description: "Learn user-centered design from scratch. Master Figma, design thinking, wireframing, prototyping, usability testing, and build a professional portfolio that lands you design roles.",
        shortDescription: "Master Figma, design thinking & user experience",
        category: "UI/UX Design",
        duration: "4 Months",
        price: 25000,
        discountPrice: 17999,
        instructor: "Ananya Gupta",
        level: "Beginner",
        totalStudents: 720,
        rating: 4.8,
        isActive: true,
        features: [
            "Figma Mastery",
            "Design System Creation",
            "Portfolio Projects",
            "Usability Testing",
            "Industry Case Studies",
            "Design Mentorship"
        ],
        syllabus: [
            {
                module: "Design Fundamentals",
                topics: ["Design Principles", "Color Theory", "Typography", "Layout & Composition", "Visual Hierarchy"]
            },
            {
                module: "UX Research & Strategy",
                topics: ["User Research Methods", "Personas & Journey Maps", "Information Architecture", "User Flows", "Design Thinking"]
            },
            {
                module: "Figma & Prototyping",
                topics: ["Figma Interface", "Components & Auto Layout", "Design Systems", "Interactive Prototyping", "Developer Handoff"]
            },
            {
                module: "Portfolio & Career",
                topics: ["Case Study Writing", "Portfolio Website", "Design Critique", "Interview Preparation", "Freelancing Tips"]
            }
        ]
    },
    {
        title: "Digital Marketing & SEO Mastery",
        description: "Complete digital marketing program covering SEO, SEM, social media marketing, content marketing, email campaigns, Google Ads, analytics, and growth hacking strategies for real business growth.",
        shortDescription: "Master SEO, Google Ads, social media & analytics",
        category: "Digital Marketing",
        duration: "3 Months",
        price: 20000,
        discountPrice: 14999,
        instructor: "Neha Verma",
        level: "Beginner",
        totalStudents: 1100,
        rating: 4.6,
        isActive: true,
        features: [
            "Google Ads Certification",
            "Live Campaigns",
            "SEO Audit Projects",
            "Analytics Dashboard",
            "Content Strategy",
            "Freelance Ready"
        ],
        syllabus: [
            {
                module: "SEO & Content Marketing",
                topics: ["On-Page SEO", "Off-Page SEO", "Keyword Research", "Content Strategy", "Technical SEO"]
            },
            {
                module: "Google Ads & SEM",
                topics: ["Google Ads Setup", "Campaign Types", "Bidding Strategies", "Ad Copywriting", "Conversion Tracking"]
            },
            {
                module: "Social Media Marketing",
                topics: ["Facebook & Instagram Ads", "LinkedIn Marketing", "YouTube Strategy", "Influencer Marketing", "Community Building"]
            },
            {
                module: "Analytics & Growth",
                topics: ["Google Analytics 4", "UTM Tracking", "A/B Testing", "Email Marketing", "Growth Hacking Techniques"]
            }
        ]
    },
    {
        title: "DevOps & CI/CD Engineering",
        description: "Learn DevOps tools and practices including Docker, Kubernetes, Jenkins, Terraform, monitoring, and CI/CD pipelines. Automate deployments and manage infrastructure at scale.",
        shortDescription: "Master Docker, Kubernetes, Jenkins & infrastructure automation",
        category: "DevOps",
        duration: "5 Months",
        price: 35000,
        discountPrice: 25999,
        instructor: "Arjun Nair",
        level: "Advanced",
        totalStudents: 380,
        rating: 4.7,
        isActive: true,
        features: [
            "Docker & Kubernetes",
            "CI/CD Pipeline Setup",
            "Infrastructure as Code",
            "Monitoring & Logging",
            "Cloud Integration",
            "Industry Projects"
        ],
        syllabus: [
            {
                module: "Linux & Scripting",
                topics: ["Linux Administration", "Shell Scripting", "Git & GitHub", "Networking Basics", "SSH & Security"]
            },
            {
                module: "Containerization",
                topics: ["Docker Fundamentals", "Docker Compose", "Multi-Stage Builds", "Container Registries", "Docker Networking"]
            },
            {
                module: "Orchestration & CI/CD",
                topics: ["Kubernetes Architecture", "Deployments & Services", "Helm Charts", "Jenkins Pipelines", "GitHub Actions"]
            },
            {
                module: "Infrastructure & Monitoring",
                topics: ["Terraform (IaC)", "Ansible Configuration", "Prometheus & Grafana", "ELK Stack", "Incident Management"]
            }
        ]
    },
    {
        title: "Python Full Stack Development",
        description: "Learn full stack development with Python — covering Django, Flask, PostgreSQL, React frontend integration, REST APIs, testing, and deployment. Build production-ready applications from day one.",
        shortDescription: "Build web apps with Python, Django, Flask & React",
        category: "Web Development",
        duration: "6 Months",
        price: 32000,
        discountPrice: 23999,
        instructor: "Deepak Joshi",
        level: "Beginner",
        totalStudents: 890,
        rating: 4.6,
        isActive: true,
        features: [
            "Python Fundamentals",
            "Django & Flask",
            "PostgreSQL Database",
            "REST API Development",
            "React Integration",
            "Deployment on AWS"
        ],
        syllabus: [
            {
                module: "Python Core",
                topics: ["Variables & Data Types", "Control Flow", "Functions & Modules", "OOP in Python", "Error Handling"]
            },
            {
                module: "Django Framework",
                topics: ["Django Setup & MVT", "Models & Migrations", "Views & Templates", "Forms & Validation", "Django Admin"]
            },
            {
                module: "Flask & APIs",
                topics: ["Flask Fundamentals", "Routing & Blueprints", "SQLAlchemy ORM", "REST API Design", "JWT Authentication"]
            },
            {
                module: "Frontend & Deployment",
                topics: ["React Integration", "State Management", "PostgreSQL", "Docker Deployment", "AWS EC2 & S3"]
            }
        ]
    },
    {
        title: "Flutter Mobile App Development",
        description: "Create stunning cross-platform apps with Flutter and Dart. Learn widget architecture, state management with Riverpod/BLoC, Firebase integration, and deploy to both app stores.",
        shortDescription: "Build beautiful cross-platform apps with Flutter & Dart",
        category: "Mobile Development",
        duration: "5 Months",
        price: 30000,
        discountPrice: 21999,
        instructor: "Saurabh Tiwari",
        level: "Beginner",
        totalStudents: 560,
        rating: 4.5,
        isActive: true,
        features: [
            "Dart Programming",
            "Flutter Widgets",
            "Firebase Integration",
            "State Management",
            "App Store Deployment",
            "Real-World Projects"
        ],
        syllabus: [
            {
                module: "Dart Programming",
                topics: ["Dart Basics", "Collections & Generics", "Async Programming", "Null Safety", "OOP in Dart"]
            },
            {
                module: "Flutter Core",
                topics: ["Widget Tree", "Material & Cupertino", "Layouts & Styling", "Navigation & Routing", "Animations"]
            },
            {
                module: "State & Backend",
                topics: ["Provider Pattern", "Riverpod / BLoC", "Firebase Auth", "Cloud Firestore", "Push Notifications"]
            },
            {
                module: "Advanced & Deployment",
                topics: ["Custom Painters", "Platform Channels", "App Store Publishing", "Play Store Publishing", "Performance Tuning"]
            }
        ]
    },
    {
        title: "Data Analytics with SQL & Power BI",
        description: "Become a data analyst by mastering SQL queries, data modeling, ETL processes, and creating stunning dashboards with Power BI. Analyze real business datasets and tell data-driven stories.",
        shortDescription: "Master SQL, Power BI & business data analytics",
        category: "Data Science",
        duration: "3 Months",
        price: 22000,
        discountPrice: 15999,
        instructor: "Meera Iyer",
        level: "Beginner",
        totalStudents: 760,
        rating: 4.7,
        isActive: true,
        features: [
            "SQL from Scratch",
            "Power BI Dashboards",
            "Real Business Datasets",
            "Excel Advanced",
            "Data Storytelling",
            "Job-Ready Portfolio"
        ],
        syllabus: [
            {
                module: "SQL Mastery",
                topics: ["Database Fundamentals", "SELECT & Joins", "Subqueries & CTEs", "Window Functions", "Stored Procedures"]
            },
            {
                module: "Data Modeling",
                topics: ["Star & Snowflake Schema", "Normalization", "ETL Concepts", "Data Warehousing", "Data Quality"]
            },
            {
                module: "Power BI",
                topics: ["Power BI Desktop", "DAX Formulas", "Data Visualization", "Interactive Dashboards", "Power Query (M)"]
            },
            {
                module: "Business Analytics",
                topics: ["KPI Definition", "Sales Analysis", "Customer Segmentation", "Reporting Best Practices", "Presentation Skills"]
            }
        ]
    }
];

const testimonials = [
    {
        name: "Rohan Jaiswal",
        email: "rohan@example.com",
        course: "Full Stack Web Development (MERN)",
        rating: 5,
        message: "EduVision Institute completely transformed my career! The MERN stack course was incredibly hands-on and practical. Within 3 months of completing the course, I landed a job as a Full Stack Developer at a top IT company. The instructors are amazing and always available for doubt resolution.",
        designation: "Full Stack Developer at TechCorp",
        isApproved: true
    },
    {
        name: "Priya Sharma",
        email: "priya@example.com",
        course: "Data Science & Machine Learning with Python",
        rating: 5,
        message: "The Data Science course at EduVision Institute is world-class. The curriculum covers everything from Python basics to advanced deep learning. Dr. Sneha's teaching style made complex concepts easy to understand. I now work as a Data Analyst and couldn't be happier!",
        designation: "Data Analyst at Infosys",
        isApproved: true
    },
    {
        name: "Amit Patel",
        email: "amit@example.com",
        course: "AWS Cloud Computing & Solutions Architect",
        rating: 5,
        message: "I cleared the AWS Solutions Architect exam on my first attempt, thanks to the amazing preparation at EduVision Institute. The hands-on labs and real-world projects gave me the confidence I needed. Highly recommended for anyone looking to build a career in cloud computing!",
        designation: "Cloud Engineer at Amazon",
        isApproved: true
    },
    {
        name: "Sneha Reddy",
        email: "sneha@example.com",
        course: "UI/UX Design Masterclass",
        rating: 4,
        message: "The UI/UX Design course helped me transition from graphic design to product design. The Figma workshops and design thinking sessions were incredibly valuable. I built an amazing portfolio during the course that helped me land my dream job.",
        designation: "Product Designer at Flipkart",
        isApproved: true
    },
    {
        name: "Vikram Singh",
        email: "vikram@example.com",
        course: "DevOps & CI/CD Engineering",
        rating: 5,
        message: "As a system administrator, the DevOps course helped me level up my skills significantly. Docker, Kubernetes, and CI/CD pipelines are now second nature to me. The real projects and industry mentorship were game-changers. My salary increased by 80% after the course!",
        designation: "DevOps Engineer at Wipro",
        isApproved: true
    },
    {
        name: "Ananya Gupta",
        email: "ananya@example.com",
        course: "Digital Marketing & SEO Mastery",
        rating: 5,
        message: "I started my own digital marketing agency after completing this course! The practical approach — running real campaigns, analyzing data, and learning growth hacking — gave me all the skills I needed. The Google Ads certification prep was exceptionally thorough.",
        designation: "Founder, AG Digital Solutions",
        isApproved: true
    },
    {
        name: "Karan Mehta",
        email: "karan@example.com",
        course: "Ethical Hacking & Cyber Security",
        rating: 4,
        message: "The Cyber Security course at EduVision is phenomenal. The CTF challenges and live hacking labs are incredibly engaging. I learned practical skills that I use daily in my security role. The instructors have real industry experience which makes all the difference.",
        designation: "Security Analyst at Deloitte",
        isApproved: true
    },
    {
        name: "Vikram Malhotra",
        email: "vikram.m@example.com", // Added email
        course: "UI/UX Design Masterclass",
        designation: "UI/UX Designer at Myntra",
        rating: 5,
        message: "Design thinking and prototyping were new to me, but the UI/UX course at EduVision made it so easy. The focus on accessibility and user psychology was enlightened. I completed 3 high-fidelity projects and got hired even before my course ended!",
        isApproved: true // Added isApproved
    },
    {
        name: "Neha Verma",
        email: "neha@example.com",
        course: "React Native Mobile App Development",
        rating: 5,
        message: "I built and published 3 apps during the course itself! The React Native course is very well-structured, covering everything from basics to advanced topics like animations and native modules. The placement support team helped me get interviews at top startups.",
        designation: "Mobile Developer at Zomato",
        isApproved: true
    },
    {
        name: "Neha Sharma", // Replaced Deepak Kumar with Neha Sharma
        email: "neha.sharma@example.com", // Added email
        course: "Python Full Stack Development",
        rating: 5,
        message: "Coming from a non-tech background, I was nervous about coding. But the Python Full Stack course at EduVision made the learning journey smooth and enjoyable. The step-by-step approach, combined with real projects, helped me build strong fundamentals. Now I'm a confident full-stack developer!",
        designation: "Software Engineer at Google", // Changed designation
        isApproved: true
    },
    {
        name: "Sanya Arora",
        email: "sanya@example.com",
        course: "Advanced React.js & Next.js",
        rating: 4,
        message: "If you already know React and want to level up, this course is a must. The advanced patterns, Next.js server components, and testing modules were exactly what I needed. My code quality improved drastically and I got promoted to Senior Developer within 6 months of completing the course.",
        designation: "Senior Frontend Developer at Paytm",
        isApproved: true
    },
    {
        name: "Rahul Mishra",
        email: "rahul@example.com",
        course: "Data Analytics with SQL & Power BI",
        rating: 5,
        message: "The SQL & Power BI course gave me exactly the skills that companies are looking for. I went from zero to building complex dashboards and writing advanced queries. The real business datasets used in the course made learning practical and engaging. Landed a data analyst role within a month!",
        designation: "Business Analyst at Accenture",
        isApproved: true
    },
    {
        name: "Tanvi Shah",
        email: "tanvi@example.com",
        course: "Flutter Mobile App Development",
        rating: 5,
        message: "Flutter is the future of mobile development and EduVision's course covers it brilliantly. From Dart basics to publishing apps, every module is well-planned. The Firebase integration projects were my favorite. I now freelance as a Flutter developer and earn more than my previous corporate job!",
        designation: "Freelance Flutter Developer",
        isApproved: true
    }
];

const seedDatabase = async () => {
    try {
        console.log("🔗 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");

        console.log("\n📚 Seeding Courses...");
        const existingCourses = await Course.countDocuments();
        if (existingCourses > 0) {
            console.log(`   ⚠️  Found ${existingCourses} existing courses. Clearing them...`);
            await Course.deleteMany({});
        }
        const coursesWithSlugs = courses.map(c => ({
            ...c,
            slug: c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        }));
        const createdCourses = await Course.insertMany(coursesWithSlugs);
        console.log(`   ✅ ${createdCourses.length} courses added successfully!`);

        console.log("\n💬 Seeding Testimonials...");
        const existingTestimonials = await Testimonial.countDocuments();
        if (existingTestimonials > 0) {
            console.log(`   ⚠️  Found ${existingTestimonials} existing testimonials. Clearing them...`);
            await Testimonial.deleteMany({});
        }
        const createdTestimonials = await Testimonial.insertMany(testimonials);
        console.log(`   ✅ ${createdTestimonials.length} testimonials added successfully!`);

        console.log("\n🎉 Database seeded successfully!");
        console.log("   📚 Courses:", createdCourses.length);
        console.log("   💬 Testimonials:", createdTestimonials.length);

        console.log("\n📋 Courses Added:");
        createdCourses.forEach((c, i) => {
            console.log(`   ${i + 1}. ${c.title} (${c.category}) - ₹${c.discountPrice || c.price}`);
        });

        console.log("\n📋 Testimonials Added:");
        createdTestimonials.forEach((t, i) => {
            console.log(`   ${i + 1}. ${t.name} - ${t.designation} (⭐ ${t.rating})`);
        });

    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 MongoDB connection closed.");
        process.exit(0);
    }
};

seedDatabase();
