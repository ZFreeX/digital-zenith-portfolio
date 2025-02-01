// portfolio/frontend/src/api/articles.ts

export interface Article {
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

const API_URL = 'http://localhost:8080/api/articles';

export async function fetchArticles() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
}

export async function fetchArticleById(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
}

export async function createArticle(article: Article) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Failed to create article');
    return response.json();
}

export async function updateArticle(article: Article) {
    const response = await fetch(`${API_URL}/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Failed to update article');
    return response.json();
}

export async function deleteArticle(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete article');
}