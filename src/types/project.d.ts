interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
  techStack: {
    [key: string]: string[];
  };
  prev?: string;
  next?: string;
}