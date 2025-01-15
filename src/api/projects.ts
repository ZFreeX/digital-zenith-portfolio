const API_URL = 'http://localhost:8080/api/projects';

export async function fetchProjects() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
}

export async function createProject(project: any) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
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
