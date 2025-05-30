import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Spring Boot 백엔드 주소 (필요시 변경)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 모든 책 가져오기 (메인 페이지에서 대표 도서 가져올 때 사용)
export const getAllBooks = async (params = {}) => {
  try {
    const response = await api.get('/books', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// ID로 특정 책 가져오기 (상세 페이지에서 사용될 수 있음)
export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

// 책 생성 (CRUD 기능 구현 시 사용)
export const createBook = async (bookData) => {
  try {
    const response = await api.post('/books', bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

// 책 업데이트 (PUT - 전체 업데이트)
export const updateBook = async (id, bookData) => {
  try {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error);
    throw error;
  }
};

// 책 부분 업데이트 (PATCH - 부분 업데이트)
export const partialUpdateBook = async (id, bookData) => {
  try {
    const response = await api.patch(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error partial updating book with ID ${id}:`, error);
    throw error;
  }
};

// 책 삭제
export const deleteBook = async (id) => {
  try {
    await api.delete(`/books/${id}`);
    console.log(`Book with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};

// OpenAI DALL-E 3를 사용하여 책 표지 이미지 생성
export const generateBookCoverImage = async (title, apiKey) => {
  if (!apiKey || !title) {
    throw new Error("API Key and title are required for image generation.");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Book cover for a book titled "${title}"`, // 제목을 포함하여 더 나은 프롬프트 생성
        size: "1024x1024",
        quality: "standard", // 또는 "hd"
        n: 1, // 생성할 이미지 수
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ? errorData.error.message : `API error: ${response.statusText}`);
    }

    const data = await response.json();
    const url = data?.data?.[0]?.url;
    if (!url) {
      throw new Error("No image URL received from the API.");
    }
    return url;
  } catch (err) {
    console.error("Image generation failed:", err);
    throw err;
  }
};