import { CommentDTO } from "../types/comment.type";

const API_URL = import.meta.env.VITE_API_URL;

export const findAll = async () => {
  const response = await fetch(`${API_URL}/comments`);
  return await response.json();
}

export const create = async (comment: CommentDTO) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(comment),
  });
  const data = await response.json()
  return data;
}