import React, { useState, useEffect } from "react";
import axios from "axios";
import "../BookList.css";
import AppBar from '../components/AppBar'; // Import AppBar
import Footer from '../components/Footer'; // Import Footer

const BookList = () => {
  const [books, setBooks] = useState([
    {
      id: 0,
      title: "Test Book",
      author: "Test Author",
      genre: "Test Genre",
      publishedDate: "2025-01-01"
    }
  ]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    axios.get("/books")
      .then(res => {
        if (Array.isArray(res.data)) {
          setBooks(prev => [...prev.filter(b => b.id === 0), ...res.data]);
        }
      })
      .catch(err => console.error("도서 목록 로딩 실패:", err));
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="page-root full-width">
      {/* Replace existing header with AppBar */}
      <AppBar
        searchKeyword={searchKeyword}
        onSearchChange={(e) => setSearchKeyword(e.target.value)}
        // You might need to pass other props based on your AppBar component's design
        // For example, if AppBar handles the "Add Book" button:
        // onAddBookClick={() => alert("Add Book clicked from AppBar")}
      />

      <main className="main-content">
        <div className="title-group">
          <h1>All Books</h1>
          <p>Manage your collection of books.</p>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Published Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.publishedDate}</td>
                  <td className="action-cell">
                    <div>
                      <span className="action-link" onClick={() => alert(`View ${book.title}`)}>View Details</span> |{" "}
                      <span className="action-link" onClick={() => alert(`Edit ${book.title}`)}>Edit</span> |{" "}
                      <span className="action-link" onClick={() => alert(`Delete ${book.title}`)}>Delete</span>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBooks.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-books">No books found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Footer component */}
      <Footer />
    </div>
  );
};

export default BookList;