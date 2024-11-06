import { CategoryDTO } from "../types/category.type";

const API_URL = import.meta.env.VITE_API_URL;

export const findAllCategories = async () => {
  const response = await fetch(`${API_URL}/categories`)
  const data = await response.json()
  return data;
}

export const findOneCategoryById = async (id: string) => {
  const response = await fetch(`${API_URL}/categories/${id}`)
  const data = await response.json()
  return data;
}

export const createCategory = async (category: CategoryDTO) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(category),
  });
  const data = await response.json()
  return data;
}

export const updateCategory = async (category: CategoryDTO, id: string) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(category),
  });
  const data = await response.json()
  return data;
}

export const removeCategory = async (id: string) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": 'application/json',
    },
  });
  const data = await response.json()
  return data;
}