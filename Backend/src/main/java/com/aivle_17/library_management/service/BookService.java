package com.aivle_17.library_management.service;

import com.aivle_17.library_management.domain.Book;
import com.aivle_17.library_management.domain.CategoryEnum;
import com.aivle_17.library_management.exception.BookNotFoundException;
import com.aivle_17.library_management.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

    private final BookRepository bookRepository;

    @Transactional
    // BookCreateRequest 대신 Book 엔티티를 직접 받음
    public Book createBook(Book book) {
        // 클라이언트로부터 받은 Book 엔티티를 바로 저장 (id, createdAt, updatedAt은 JPA가 관리)
        return bookRepository.save(book);
    }

    public Page<Book> getAllBooks(String title, CategoryEnum category, Pageable pageable) {
        if (title != null && category != null) {
            return bookRepository.findByTitleContainingIgnoreCaseAndCategory(title, category, pageable);
        } else if (title != null) {
            return bookRepository.findByTitleContainingIgnoreCase(title, pageable);
        } else if (category != null) {
            return bookRepository.findByCategory(category, pageable);
        } else {
            return bookRepository.findAll(pageable);
        }
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book with ID " + id + " not found"));
    }

    @Transactional
    // BookUpdateRequest 대신 Book 엔티티를 직접 받음
    public Book updateBook(Long id, Book updatedBookData) { // 파라미터 이름을 updatedBookData로 변경하여 혼동 방지
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book with ID " + id + " not found"));
        // Book 엔티티의 update 메서드 호출 (이때, updatedBookData의 필드들을 사용)
        book.update(updatedBookData.getTitle(), updatedBookData.getContent(), updatedBookData.getCoverUrl(), updatedBookData.getCategory());
        return book; // 영속성 컨텍스트에 의해 변경 감지되어 자동으로 업데이트
    }

    @Transactional
    // BookPartialUpdateRequest 대신 Book 엔티티를 직접 받음
    public Book partialUpdateBook(Long id, Book partialBookData) { // 파라미터 이름을 partialBookData로 변경
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book with ID " + id + " not found"));

        // partialUpdate 메서드 호출 시, 클라이언트가 보내지 않은 필드는 null이 될 수 있으므로
        // Book 엔티티의 partialUpdate 메서드가 null 체크를 해야 함.
        book.partialUpdate(partialBookData.getTitle(), partialBookData.getContent(), partialBookData.getCoverUrl(), partialBookData.getCategory());
        return book; // 영속성 컨텍스트에 의해 변경 감지되어 자동으로 업데이트
    }

    @Transactional
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Book with ID " + id + " not found");
        }
        bookRepository.deleteById(id);
    }
}