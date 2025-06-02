package com.aivle_17.library_management.service;

import com.aivle_17.library_management.domain.Book;
import com.aivle_17.library_management.domain.CategoryEnum;
import com.aivle_17.library_management.dto.BookCreateRequest;
import com.aivle_17.library_management.dto.BookPartialUpdateRequest;
import com.aivle_17.library_management.dto.BookUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {
    Book createBook(BookCreateRequest request);

    Page<Book> getAllBooks(String title, CategoryEnum category, Pageable pageable);

    Book getBookById(Long bookId);

    Book updateBook(Long id, BookUpdateRequest request);

    Book partialUpdateBook(Long id, BookPartialUpdateRequest request);

    void deleteBook(Long bookId);
}
