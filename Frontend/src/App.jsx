// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
// 추가 페이지 컴포넌트들은 여기에 import 하고 Route를 추가합니다.
// import ViewBooksPage from './pages/ViewBooksPage';
import AddBookPage from './pages/AddBookPage';
// import BookDetailPage from './pages/BookDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지를 기본 경로로 설정 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/add-book" element={<AddBookPage />} />

        {/* 다른 페이지 라우트 예시 (필요시 주석 해제 후 구현) */}
        {/* <Route path="/books" element={<ViewBooksPage />} /> */}
        {/* <Route path="/books/:id" element={<BookDetailPage />} /> */}

        {/* 정의되지 않은 모든 경로를 메인 페이지로 리디렉션 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;