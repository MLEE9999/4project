// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import Detail_Book from './pages/Detail_Book'; // Detail_Book 페이지 컴포넌트
import Delete_Book from './pages/Delete_Book'; // Delete_Book 페이지 컴포넌트
import Update_Book from './pages/Update_Book'; // 수정 페이지 컴포넌트
import List_Book from './pages/List_Book'; // 수정 페이지 컴포넌트
// 주석 처리된 ViewBooksPage 예시도 필요시 유사하게 추가할 수 있습니다.
// import ViewBooksPage from './pages/ViewBooksPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지를 기본 경로로 설정 */}
        <Route path="/" element={<HomePage />} />

        {/* 책 추가 페이지 */}
        <Route path="/add-book" element={<AddBookPage />} />

        {/* 책 상세 정보 페이지 (동적 라우트 파라미터 :id 사용) */}
        <Route path="/book/:id" element={<Detail_Book />} />

        {/* 책 삭제 확인/처리 페이지 (동적 라우트 파라미터 :id 사용) */}
       
        <Route path="/book/:id/delete" element={<Delete_Book />} />

        {/* 책 수정 페이지 */}
        {/* "Update_Book"에 해당. URL 예: /edit-book/123 */}
        <Route path="/edit-book/:id" element={<Update_Book />} />
      
        <Route path="/books" element={<List_Book />} />

        {/* 정의되지 않은 모든 경로를 메인 페이지로 리디렉션 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
