package com.aivle_17.library_management.controller;

import com.aivle_17.library_management.domain.Book;
import com.aivle_17.library_management.domain.CategoryEnum;
import com.aivle_17.library_management.dto.BookCreateRequest;
import com.aivle_17.library_management.dto.BookPartialUpdateRequest;
import com.aivle_17.library_management.dto.BookResponse;
import com.aivle_17.library_management.dto.BookUpdateRequest;
import com.aivle_17.library_management.service.BookServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookServiceImpl bookServiceImpl;

    @PostMapping
    public ResponseEntity<BookResponse> createBook(@Valid @RequestBody BookCreateRequest request) {
        Book book = bookServiceImpl.createBook(request);
        return new ResponseEntity<>(BookResponse.from(book), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<BookResponse>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) CategoryEnum category
    ) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<BookResponse> bookPage = bookServiceImpl.getAllBooks(title, category, pageable)
                .map(BookResponse::from);
        return ResponseEntity.ok(bookPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable Long id) {
        Book book = bookServiceImpl.getBookById(id);
        return ResponseEntity.ok(BookResponse.from(book));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable Long id, @Valid @RequestBody BookUpdateRequest request) {
        Book updatedBook = bookServiceImpl.updateBook(id, request);
        return ResponseEntity.ok(BookResponse.from(updatedBook));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BookResponse> partialUpdateBook(@PathVariable Long id, @RequestBody BookPartialUpdateRequest request) {
        Book updatedBook = bookServiceImpl.partialUpdateBook(id, request);
        return ResponseEntity.ok(BookResponse.from(updatedBook));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookServiceImpl.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}