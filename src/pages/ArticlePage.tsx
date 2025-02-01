import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";
import { fetchArticleById } from "@/api/articles";

const ArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prevArticleId, setPrevArticleId] = useState<string | null>(null);
    const [nextArticleId, setNextArticleId] = useState<string | null>(null);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const data = await fetchArticleById(id);
                setArticle(data);
                // Assuming the API returns adjacent article IDs
                setPrevArticleId(data.prev); // Adjust according to your API response
                setNextArticleId(data.next); // Adjust according to your API response
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };
        loadArticle();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!article) return <div>Article not found.</div>;

    const handlePrevArticle = () => {
        if (prevArticleId) {
            navigate(`/article/${prevArticleId}`);
        }
    };

    const handleNextArticle = () => {
        if (nextArticleId) {
            navigate(`/article/${nextArticleId}`);
        }
    };

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
                        src={article.image_url.startsWith('http') 
                            ? article.image_url 
                            : `http://localhost:8080${article.image_url}`}
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-xl mb-8"
                    />
                    <h1 className="text-4xl font-bold text-white mb-8">{article.title}</h1>
                    <div className="prose prose-invert max-w-none text-white">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </div>
                    
                    <div className="flex justify-between mt-16">
                        {prevArticleId && (
                            <Button variant="ghost" className="text-white hover:text-primary" onClick={handlePrevArticle}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Previous Article
                            </Button>
                        )}
                        {nextArticleId && (
                            <Button variant="ghost" className="text-white hover:text-primary" onClick={handleNextArticle}>
                                Next Article
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ArticlePage;