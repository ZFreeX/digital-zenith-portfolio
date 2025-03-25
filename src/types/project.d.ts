
interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
  techStack: {
    [key: string]: string[];
  };
  demo_video_url?: string;
  screen_type?: "mobile" | "pc";
  prev?: string;
  next?: string;
}
