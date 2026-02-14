// Portfolio Data - Edit this file to update your portfolio content
// All components read from this centralized data source

export const portfolioData = {
    // Personal Information
    personal: {
        name: "Nanda Kumar",
        title: "AI Engineer | Full Stack Developer",
        tagline: "Building intelligent applications with cutting-edge AI technologies",
        bio: `From building simple web applications to developing sophisticated AI agents, my journey in tech has been driven by curiosity and a passion for innovation. Currently, I'm part of Wipro's WAPTE team, where I work at the intersection of AI and software engineering—crafting intelligent solutions using LangChain, LangGraph, and state-of-the-art LLM frameworks. Every day, I tackle new challenges in building AI-powered applications with FastAPI and React, transforming complex requirements into elegant, scalable solutions. Whether it's designing type-safe AI models with Pydantic or creating seamless user experiences with shadcn/ui, I'm constantly learning and evolving. I believe the future of software is intelligent, and I'm excited to be part of building it.`,
        profileImage: "/images/profile.jpg",
        resumePDF: "/files/resume.pdf",
        email: "nk9219382@gmail.com",
        phone: "+91-9353560093",
        location: "Bangalore, India",
        socialLinks: {
            github: "https://github.com/vetrinanda",
            linkedin: "https://www.linkedin.com/in/nanda-kumar-0650b627b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            leetcode: "https://leetcode.com/u/1fqzS8kQV4/",
        }
    },

    // Education
    education: [
        {
            id: 1,
            institution: "H.K.B.K College of Engineering",
            degree: "Bachelor of Engineering",
            field: "Electronics and Communication Engineering",
            startYear: 2021,
            endYear: 2025,
            grade: "9.2 CGPA",
            description: "Specialized in Software Engineering with coursework in Data Structures, Algorithms, Database Systems, and Web Technologies. Active member of the Coding Club and organized multiple hackathons."
        },
        {
            id: 2,
            institution: "Indian Academy PU College",
            degree: "Pre-University Course (PUC)",
            field: "Science (PCMB)",
            startYear: 2019,
            endYear: 2021,
            grade: "93.38%",
            description: "Physics, Chemistry, Mathematics, and Biology."
        },
        {
            id: 3,
            institution: "Immanuel English High School",
            degree: "10th Standard",
            field: "General",
            startYear: 2018,
            endYear: 2019,
            grade: "87.36%",
            description: "Excelled in academics with distinction in Mathematics and Science. Active participant in school tech fests."
        }
    ],

    // Experience/Internships
    experience: [
        {
            id: 1,
            company: "Wipro Limited",
            position: "Project Intern",
            startDate: "June 2025",
            endDate: "Present",
            current: true,
            description: "Working on building intelligent AI agents and applications as part of the WAPTE (Wipro AI Platform and Technology Excellence) team. Developing and maintaining AI-powered solutions using cutting-edge LLM frameworks and modern web technologies.",
            technologies: ["LangChain", "LangGraph", "Pydantic AI", "FastAPI", "React", "shadcn/ui", "Tailwind CSS", "LLM", "Python", "Git"],
            achievements: [
                "Built AI agents using LangChain and LangGraph for diverse business requirements",
                "Developed full-stack applications with FastAPI backend and React frontend",
                "Implemented type-safe AI models using Pydantic AI framework",
                "Maintained and enhanced multiple applications within the WAPTE team",
                "Delivered scalable solutions using modern tech stack including shadcn/ui and Tailwind CSS"
            ]
        },
        {
            id: 2,
            company: "Octanet Services Pvt Ltd",
            position: "Web Development Intern",
            startDate: "August 2024",
            endDate: "September 2024",
            current: false,
            description: "Gained hands-on experience in web development by working on multiple projects and applications. Developed front-end solutions and demonstrated strong technical skills in creating responsive, user-friendly web interfaces.",
            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive Design",
                "Git"
            ],
            achievements: [
                "Developed a professional landing website with responsive design",
                "Created a fully functional To-Do List application with CRUD operations",
                "Actively engaged in various web development projects and tasks",
                "Demonstrated exceptional dedication and willingness to learn new technologies",
                "Maintained high level of professionalism in all assigned tasks"
            ],
            link: "https://octanet.in" // Optional: company website or project links
        },
        {
            id: 3,
            company: "COMEDKARES Innovation Hub",
            position: "Social Innovation Intern",
            startDate: "November 2023",
            endDate: "December 2023",
            current: false,
            description: "Worked on social innovation projects focused on developing assistive technologies and solutions for individuals with disabilities. Applied design thinking and technical skills to create impactful projects addressing real-world accessibility challenges.",
            technologies: [
                "Design Thinking",
                "Project Management",
                "Assistive Technology",
                "Prototyping",
                "Team Work",
                "Documentation",
                "Arduino",
                "IOT"
            ],
            achievements: [
                "Developed innovative assistive technology project for wheelchair-to-bed transfer assistance",
                "Created solutions addressing accessibility challenges for individuals with physical disabilities",
                "Promoted innovation activities among students through real-world problem-solving projects",
                "Streamlined administrative workflows and data management systems",
                "Applied academic knowledge to practical social impact initiatives",
                "Gained hands-on experience with various software tools and technical platforms"
            ],
            link: "https://comedkares.org" // Optional: organization website
        }
        // {
        //     id: 3,
        //     company: "StartUp Solutions",
        //     position: "Frontend Developer Intern",
        //     startDate: "January 2022",
        //     endDate: "May 2022",
        //     current: false,
        //     description: "Focused on building responsive user interfaces and improving website performance. Worked closely with the design team to implement pixel-perfect designs.",
        //     technologies: ["Vue.js", "Tailwind CSS", "JavaScript", "Figma"],
        //     achievements: [
        //         "Built 5+ reusable UI components used across multiple projects",
        //         "Improved website loading speed by 50% through optimization",
        //         "Created comprehensive documentation for component library"
        //     ]
        // },
    ],

    // Projects
    projects: [
        {
            id: 1,
            title: "JustBackend",
            description: "A production-ready backend system with JWT-based authentication, role-based access control, and secure APIs. Features database-level security using Supabase Row-Level Security (RLS), Redis-style caching, and indexing strategies for improved performance and scalability.",
            technologies: ["FastAPI", "Supabase", "JWT", "Redis"],
            image: "/images/backend.jpeg",
            githubUrl: "https://github.com/vetrinanda/JustBackend",
            liveDemoUrl: "https://justbackend-34zy.onrender.com/", // or null if no live demo
            featured: true,
            date: "January 2026"
        },
        {
            id: 2,
            title: "AI Recruitment Agent",
            description: "An AI-driven candidate screening system that automates resume analysis, skill matching, and interview/rejection routing. Integrated Google Gemini for semantic resume parsing, achieving 85%+ accuracy compared to manual review. Features NLP-based resume parsing, semantic similarity matching, and rule-based decision logic with ranking and text-processing algorithms aligned with real-world hiring workflows.",
            technologies: ["Python", "Langgraph", "Gemini LLM", "NLP"],
            image: "/images/ai.jpeg",
            githubUrl: "https://github.com/vetrinanda/AI-Recruitment-Agent",
            liveDemoUrl: "",
            featured: true,
            date: "January 2026"
        },
        {
            id: 3,
            title: "Customer Support Agent",
            description: "An AI-powered customer support chatbot built with LangGraph, FastAPI, and React. The agent intelligently categorizes user queries, analyzes sentiment, and routes them to specialized handlers — delivering context-aware support responses in real time through a premium glassmorphic chat interface.",
            technologies: ["LangGraph", "Gemini API", "FastAPI", "React","Tailwind CSS"],
            image: "/images/customer.jpeg",
            githubUrl: "https://github.com/vetrinanda/Customer-Support-Agent",
            liveDemoUrl: "https://customer-support-agent-flax.vercel.app",
            featured: true,
            date: "Feb 2026 - Mar 2026"
        },
        {
            id: 4,
            title: "Medi Analyser",
            description: "Medi Analyser is an advanced, AI-powered medical report analysis tool designed to provide users with comprehensive health insights. By leveraging cutting-edge Large Language Models (LLMs) and a multi-agent architecture, it simulates a team of specialized medical experts to analyze uploaded medical documents.",
            technologies: ["React", "FastAPI", "LangChain", "Google Gemini AI"],
            image: "/images/medical.png",
            githubUrl: "https://github.com/vetrinanda/Medi-Analyser",
            liveDemoUrl: "https://medi-analyser.vercel.app",
            featured: true,
            date: "Feb 2026 - Mar 2026"
        },
        {
            id: 5,
            title: "Portfolio Website",
            description: "This portfolio website! Built with React and featuring an AI chatbot powered by RAG technology to answer questions about my experience.",
            technologies: ["React", "FastAPI", "ChromaDB", "Tailwind CSS"],
            image: "/images/portfolio.jpeg",
            githubUrl: "https://github.com/vetrinanda/MyPersonalPortfolio",
            liveDemoUrl: "https://nanda-portfolio-website.vercel.app",
            featured: true,
            date: "Jan 2026"
        },
        {
            id: 6,
            title: "Advanced Railway Safety & Automation",
            description: "An IoT-based smart railway system featuring automated gate control, emergency braking, and real-time remote monitoring via GSM/GPS.",
            technologies: ["Arduino", "IoT", "C++", "ESP32-CAM", "Sensors"],
            image: "/images/research.jpeg",
            githubUrl: "https://github.com/yourusername/railway-safety",
            liveDemoUrl: "/files/research_paper.pdf", // Link to Research Paper
            featured: true,
            date: "May 2024 - Jun 2024"
        }
    ],

    // Skills
    skills: [
        {
            id: 1,
            category: "Programming Languages",
            items: [
                { name: "Python", percentage: 90 },
                { name: "JavaScript", percentage: 85 },
                // { name: "TypeScript", percentage: 80 },
                { name: "C", percentage: 70 }
            ]
        },
        {
            id: 2,
            category: "Frontend",
            items: [
                { name: "React.js", percentage: 90 },
                { name: "HTML/CSS/JS", percentage: 95 },
                { name: "Tailwind CSS", percentage: 85 },
                { name: "Shadcn UI", percentage: 80 }
                // { name: "Vue.js", percentage: 70 }
            ]
        },
        {
            id: 3,
            category: "Backend",
            items: [
                { name: "FastAPI", percentage: 85 },
                { name: "RestAPI", percentage: 80 },
                // { name: "Django", percentage: 70 },
                // { name: "GraphQL", percentage: 65 }
            ]
        },
        {
            id: 4,
            category: "Database",
            items: [
                { name: "MongoDB", percentage: 85 },
                // { name: "PostgreSQL", percentage: 80 },
                { name: "MySQL", percentage: 75 },
                { name: "Supabase", percentage: 70 }
                // { name: "Firebase", percentage: 75 }
            ]
        },
        {
            id: 5,
            category: "Tools & DevOps",
            items: [
                { name: "Git/GitHub", percentage: 90 },
                { name: "Docker", percentage: 75 }
                // { name: "AWS", percentage: 70 },
                // { name: "CI/CD", percentage: 70 },
                // { name: "Linux", percentage: 75 }
            ]
        }
    ],

    // Certifications
    certifications: [
        {
            id: 1,
            name: "Python for Beginners",
            issuer: "Simplilearn",
            dateIssued: "June 2025",
            credentialUrl: "/files/Python_Certificate.pdf",
            image: "/images/python-cert.png",
            description: "Completed a comprehensive Python programming course covering fundamental concepts, syntax, data structures, and object-oriented programming principles."
        },
        {
            id: 2,
            name: "Web Development Internship",
            issuer: "OCTANET SERVICES PVT LTD",
            dateIssued: "Sept  2024",
            credentialUrl: "/files/Web-dev.pdf",
            image: "/images/meta-cert.png",
            description: "During the internship period, He has demonstrated exceptional dedication, enthusiasm and astrong willingness to learn. They actively engaged in various projects and tasks assigned to them,exhibiting remarkable skills and a high level of professionalism."
        },
        {
            id: 3,
            name: "VLSI System On Chip Design - Overview",
            issuer: "Maven-Silicon",
            dateIssued: "Oct 2024",
            credentialUrl: "/files/VLSI_System_On_Chip_Design.pdf",
            image: "/images/gcp-cert.png",
            description: "Understanding the VLSI System On Chip Design - Overview."
        },
        {
            id: 4,
            name: "AWS Academic Cloud Foundation and Solution Architect Associate",
            issuer: "Maven-Silicon",
            dateIssued: "Oct 2024",
            credentialUrl: "/files/Aws.pdf",
            image: "/images/gcp-cert.png",
            description: "AWS Academic Cloud Foundation and Solution Architect Associate."
        }
    ],

    // Navigation Items
    navigation: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Education", href: "#education" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Certifications", href: "#certifications" },
        { name: "Contact", href: "#contact" }
    ]
};

export default portfolioData;
