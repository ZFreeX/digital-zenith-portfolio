import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    description: "",
    timeline: "",
    budget: "",
    contact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    toast({
      title: "Success!",
      description: "Your message has been sent. I'll get back to you soon!",
      duration: 5000,
    });
    setFormData({
      name: "",
      company: "",
      description: "",
      timeline: "",
      budget: "",
      contact: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-16 p-8 bg-dark-card rounded-xl shadow-lg"
    >
      <h3 className="text-2xl font-bold text-white mb-8">Let's Work Together</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="bg-dark border-primary/20 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-white">Company</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name"
            className="bg-dark border-primary/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">Project Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell me about your project"
            className="bg-dark border-primary/20 text-white min-h-[120px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline" className="text-white">Expected Timeline</Label>
          <Input
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            placeholder="e.g., 3 months"
            className="bg-dark border-primary/20 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-white">Expected Budget</Label>
          <Input
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Your budget range"
            className="bg-dark border-primary/20 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-white">Contact (Email or Telegram)</Label>
          <Input
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="your@email.com or @telegram_handle"
            className="bg-dark border-primary/20 text-white"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-medium py-3"
        >
          Send Message
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;