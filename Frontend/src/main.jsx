import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import AllBooks from './components/AllBooks';
import ViewBook from './components/ViewBook';
import AddBookComponent from './components/AddBookComponent';
import DeleteBookComponent from './components/DeleteBookComponent';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<ViewBook />} />
        <Route path="/add-book" element={<AddBookComponent />} />
        <Route path="/delete-book/:id" element={<DeleteBookComponent />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
