package com.aivle_17.library_management.controller;

import com.aivle_17.library_management.domain.Book;
import com.aivle_17.library_management.domain.CategoryEnum;
import com.aivle_17.library_management.service.BookService;
import jakarta.validation.Valid; // @Valid 어노테이션 사용을 위해 필요
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

    private final BookService bookService;

    // 1. 도서 생성 (Create a Book) - POST
    @PostMapping
    // @Valid: Book 엔티티에 직접 유효성 검사 어노테이션(@NotNull, @Size 등)이 정의되어 있어야 함.
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
        // 클라이언트로부터 받은 Book 엔티티를 그대로 서비스로 전달
        Book createdBook = bookService.createBook(book);
        // 생성된 엔티티를 직접 반환
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    // 2. 도서 목록 조회 (Read All Books) - GET
    @GetMapping
    public ResponseEntity<Page<Book>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) CategoryEnum category
    ) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        // 서비스로부터 Page<Book>을 직접 받아서 반환
        Page<Book> bookPage = bookService.getAllBooks(title, category, pageable);
        return ResponseEntity.ok(bookPage);
    }

    // 3. 특정 도서 조회 (Read a Single Book) - GET
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        // 서비스로부터 Book 엔티티를 직접 받아서 반환
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    // 4. 도서 정보 수정 (Update a Book) - PUT
    @PutMapping("/{id}")
    // @Valid: Book 엔티티에 직접 유효성 검사 어노테이션이 정의되어 있어야 함.
    // 기존 DTO의 필드와 동일하게 Book 엔티티가 모든 필수 필드를 포함해야 함.
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book book) {
        // 클라이언트로부터 받은 Book 엔티티와 ID를 서비스로 전달
        Book updatedBook = bookService.updateBook(id, book);
        // 업데이트된 엔티티를 직접 반환
        return ResponseEntity.ok(updatedBook);
    }

    // 5. 도서 정보 부분 수정 (Partially Update a Book) - PATCH
    @PatchMapping("/{id}")
    // Partial update는 클라이언트가 모든 필드를 보낼 필요가 없으므로,
    // 이 경우 Book 엔티티를 RequestBody로 받는 것이 모호할 수 있습니다.
    // 여기서는 일단 Book 엔티티를 받되, 서비스에서 null 체크를 통해 필드를 업데이트하도록 변경해야 합니다.
    // Book 엔티티에 @Size 등의 유효성 검사 어노테이션은 유효할 수 있지만, @NotNull은 의미가 없어집니다.
    public ResponseEntity<Book> partialUpdateBook(@PathVariable Long id, @RequestBody Book book) {
        // 클라이언트로부터 받은 Book 엔티티(일부 필드만 포함될 수 있음)와 ID를 서비스로 전달
        Book updatedBook = bookService.partialUpdateBook(id, book);
        // 업데이트된 엔티티를 직접 반환
        return ResponseEntity.ok(updatedBook);
    }

    // 6. 도서 삭제 (Delete a Book) - DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}