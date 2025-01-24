import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const ArticlePage = () => {
  const { id } = useParams();
  
  // Mock data - replace with actual data fetching
  const article = {
    id: "1",
    title: "Understanding Modern Web Architecture",
    content: "# Modern Web Architecture\n\nIn today's digital landscape...",
    image_url: "/placeholder.svg",
    tags: ["Web Development", "Architecture", "Best Practices"],
  };

  const prevArticle = { id: "prev", title: "Previous Article" };
  const nextArticle = { id: "next", title: "Next Article" };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />
          <h1 className="text-4xl font-bold text-white mb-8">{article.title}</h1>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
          
          <div className="flex justify-between mt-16">
            {prevArticle && (
              <Link to={`/article/${prevArticle.id}`}>
                <Button variant="ghost" className="text-white hover:text-primary">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {prevArticle.title}
                </Button>
              </Link>
            )}
            {nextArticle && (
              <Link to={`/article/${nextArticle.id}`}>
                <Button variant="ghost" className="text-white hover:text-primary">
                  {nextArticle.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlePage;
