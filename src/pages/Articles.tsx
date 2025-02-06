import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { fetchArticles } from "@/api/articles";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    loadArticles();
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-white mb-16 text-center">Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
  {Array.isArray(articles) && articles.length > 0 ? (
    articles.map((article, index) => (
      <Link to={`/article/${article.id}`} key={article.id}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="h-full"
        >
          <Card className="bg-dark-card border-none overflow-hidden hover:shadow-xl hover:shadow-primary/20 transform transition-all duration-500 hover:-translate-y-2 h-full">
            <div className="relative h-48">
              <img
                src={article.image_url.startsWith('http') 
                  ? article.image_url 
                  : `${import.meta.env.VITE_API_URL}${article.image_url}`}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                {article.title}
              </CardTitle>
              <CardDescription className="text-white/60 line-clamp-3">
                {article.preview}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    ))
  ) : (
    <div className="text-center text-white">No articles available.</div>
  )}
</div>
      </div>
    </div>
  );
};

export default Articles;