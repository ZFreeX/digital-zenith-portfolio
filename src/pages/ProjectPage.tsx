import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const projects = {
  'telegram-bot': {
    title: "AI-Powered Telegram Bot",
    description: "A sophisticated Telegram bot leveraging OpenAI's GPT-4 for natural language processing and automated responses. This bot helps businesses automate customer support, handle inquiries, and provide instant assistance 24/7.",
    image: "/placeholder.svg",
    tags: ["Python", "OpenAI API", "Telegram API"],
    techStack: {
      "Backend": ["Python 3.9", "python-telegram-bot", "OpenAI API"],
      "Database": ["PostgreSQL", "SQLAlchemy"],
      "Deployment": ["Docker", "AWS Lambda", "AWS RDS"],
      "Testing": ["pytest", "unittest"]
    },
    features: [
      "Natural language processing for human-like interactions",
      "Multi-language support",
      "Custom command handling",
      "Conversation context management",
      "User session tracking"
    ]
  },
  'web3-tracker': {
    title: "Web3 Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio tracking application with advanced analytics and market insights. Track your investments across multiple blockchains and get detailed performance metrics.",
    image: "/placeholder.svg",
    tags: ["Next.js", "TypeScript", "Web3.js"],
    techStack: {
      "Frontend": ["Next.js", "TypeScript", "TailwindCSS"],
      "Web3": ["Web3.js", "Ethers.js"],
      "State Management": ["Redux Toolkit"],
      "Data Visualization": ["Recharts", "D3.js"]
    },
    features: [
      "Multi-chain portfolio tracking",
      "Real-time price updates",
      "Performance analytics",
      "Custom alerts and notifications",
      "DeFi protocol integration"
    ]
  },
  'pinterest-manager': {
    title: "Automated Pinterest Manager",
    description: "Pinterest marketing automation tool for scheduling, analytics, and content optimization. Streamline your Pinterest marketing workflow and maximize engagement.",
    image: "/placeholder.svg",
    tags: ["Python", "Selenium", "PostgreSQL"],
    techStack: {
      "Backend": ["Python", "FastAPI", "Celery"],
      "Frontend": ["React", "TypeScript"],
      "Database": ["PostgreSQL", "Redis"],
      "Automation": ["Selenium", "Beautiful Soup"]
    },
    features: [
      "Automated pin scheduling",
      "Content performance analytics",
      "Bulk pin management",
      "Competitor analysis",
      "SEO optimization"
    ]
  }
};

const ProjectPage = () => {
  const { id } = useParams();
  const project = projects[id as keyof typeof projects];

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-dark text-white pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
              <p className="text-lg text-white/70 leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Technical Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(project.techStack).map(([category, technologies]) => (
                  <div key={category} className="bg-dark-card rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3 text-primary">{category}</h3>
                    <ul className="space-y-2">
                      {technologies.map((tech, index) => (
                        <li key={index} className="text-white/70">{tech}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectPage;