import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendTelegramMessage } from "@/utils/sendTelegramMessage";

const Terminal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = `
*Name:* ${formData.name}
*Email:* ${formData.email}
*Message:* ${formData.message}
    `;
    await sendTelegramMessage(message);
    setIsSubmitted(true);
    toast.success("Message sent successfully!");
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-dark" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Contact Me</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[#1E1E1E] rounded-lg overflow-hidden shadow-xl border border-primary/20">
            <div className="bg-[#2D2D2D] p-2 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="text-white/60 text-sm ml-2">visitor@konstantin:~</div>
            </div>
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-8 space-y-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60">
                      <span className="text-primary mr-2">$</span>
                      <span>name:</span>
                    </div>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="bg-dark-card border-primary/20 focus:border-primary text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60">
                      <span className="text-primary mr-2">$</span>
                      <span>email:</span>
                    </div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="bg-dark-card border-primary/20 focus:border-primary text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60">
                      <span className="text-primary mr-2">$</span>
                      <span>message:</span>
                    </div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message..."
                      className="bg-dark-card border-primary/20 focus:border-primary text-white min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 text-white py-6 text-lg font-medium"
                    >
                      Send Message
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center space-y-6"
                >
                  <div className="text-2xl font-semibold text-primary">Message Sent Successfully!</div>
                  <p className="text-white/60">Thank you for reaching out. I'll get back to you soon.</p>
                  <Button
                    onClick={handleReset}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 text-white py-6 px-8 text-lg font-medium"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;