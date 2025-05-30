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