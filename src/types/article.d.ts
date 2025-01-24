interface Article {
  id: string;
  title: string;
  content: string;
  preview: string;
  tags: string[];
  image_url: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
}