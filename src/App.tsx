
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Resume from "@/pages/Resume";
import Admin from "@/pages/Admin";
import ProjectPage from "@/pages/ProjectPage";
import Articles from "@/pages/Articles";
import ArticlePage from "@/pages/ArticlePage";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
