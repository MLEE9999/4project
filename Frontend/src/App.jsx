// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BookList from './pages/ViewBooksPage';
import AddBookPage from './pages/AddBookPage';
import BookDetail from './pages/BookDetailPage';
import BookUpdate from './pages/UpdateBookPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지를 기본 경로로 설정 */}
        <Route path="/" element={<HomePage />} />
        
        {/* 책 목록 페이지 */}
        <Route path="/books" element={<BookList />} />
        
        {/* 책 추가 페이지 */}
        <Route path="/add-book" element={<AddBookPage />} />
        
        {/* 책 상세 정보 페이지 */}
        <Route path="/books/:id" element={<BookDetail />} />
        
        {/* 책 수정 페이지 */}
        <Route path="/books/:id/edit" element={<BookUpdate />} />
        
        {/* 정의되지 않은 모든 경로를 메인 페이지로 리디렉션 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;