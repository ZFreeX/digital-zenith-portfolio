// portfolio/frontend/models/project.ts

export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string;
    status: "shown" | "hidden";
    tags: string[];
    techStack: Record<string, string[]>;
    features: string[];
    demo_video_url?: string | null;    // Add video URL field
    screen_type?: "mobile" | "pc";     // Add screen type field
    next?: string; // Optional, as it may not always be present
    prev?: string; // Optional, as it may not always be present
    created_at: string; // Use string for date representation
    updated_at: string; // Use string for date representation
}



const API_URL = `${import.meta.env.VITE_API_URL}/api/projects`;


export async function fetchProjects() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function createProject(project: Partial<Project>) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...project,
            demo_video_url: project.demo_video_url || null,
            screen_type: project.screen_type || null
        })
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
}

export async function deleteProject(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete project');
}

export async function toggleVisibility(id: string, status: string) {
    const response = await fetch(`${API_URL}/${id}/visibility`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to toggle visibility');
    return response.json();
}

export async function updateOrder(id: string, direction: 'up' | 'down') {
    const response = await fetch(`${API_URL}/${id}/order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction })
    });
    if (!response.ok) throw new Error('Failed to update order');
}

export async function fetchPublicProjects() {
    const response = await fetch(`${API_URL}/public`);
    console.log("Actual Backend api url: ", API_URL);
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function fetchProjectById(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
}

// Add a new function for file uploads (can be used for both images and videos)
export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error response:", errorText);
        throw new Error('Failed to upload file');
    }

    return response.json();
}

