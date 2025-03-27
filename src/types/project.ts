
export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string;
    status: "shown" | "hidden";
    tags: string[];
    techStack: Record<string, string[]>;
    features: string[];
    demo_video_url?: string | null;
    screen_type?: "mobile" | "pc";
    next?: string;
    prev?: string;
    created_at: string;
    updated_at: string;
}
