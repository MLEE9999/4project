// src/pages/BookDetail.jsx
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material'; // Button might not be needed if using styled
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import DeleteBookDialog from '../components/DeleteBookDialog';
import { getBookById } from '../api';

import {
  PageContainer,
  SectionTitle, // Can be used for the main book title
  LoadingContainer,
  ErrorContainer,
  CenteredMessageContainer,
  DetailContentWrapper,
  DetailInnerContainer,
  BreadcrumbsContainer,
  BreadcrumbLink,
  BreadcrumbText,
  DetailTitleContentBox,
  DetailTitleWrapper,
  BookShortContent,
  DetailImageSectionWrapper,
  DetailImageTextContainer,
  DetailBookCoverImage,
  DetailTextContentBox,
  DetailBookTitle, // More specific title style for this context
  DetailMetaBox,
  DetailMetaInnerBox,
  BookContentText,
  DetailButtonsOuterContainer,
  DetailButtonsInnerContainer,
  DetailEditButton,
  DetailDeleteButton,
} from './styles'; // Corrected import path

function BookDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBookById(id)
        .then(res => {
          setBook(res);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load book details:", err);
          setError("책 정보를 불러오는 데 실패했습니다.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleEditClick = () => {
    navigate(`/books/${id}/edit`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteSuccess = () => {
    navigate('/books');
  };

  if (loading) {
    return (
      <PageContainer> {/* Wrap loading/error states in PageContainer for consistent AppBar/Footer */}
        <AppBar />
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
        <Footer />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <AppBar />
        <ErrorContainer>
          {error}
        </ErrorContainer>
        <Footer />
      </PageContainer>
    );
  }

  if (!book) {
    return (
      <PageContainer>
        <AppBar />
        <CenteredMessageContainer>
          책을 찾을 수 없습니다.
        </CenteredMessageContainer>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AppBar />

      <DetailContentWrapper>
        <DetailInnerContainer>
          <BreadcrumbsContainer>
            <BreadcrumbLink component="a" href="/books"> {/* Assuming /books is the list page */}
              Books
            </BreadcrumbLink>
            <BreadcrumbText>/</BreadcrumbText>
            <BreadcrumbText className="current">
              {book.title}
            </BreadcrumbText>
          </BreadcrumbsContainer>

          <DetailTitleContentBox>
            <DetailTitleWrapper>
              {/* Use SectionTitle for consistency if style matches, or a more specific styled title */}
              <SectionTitle component="h1" sx={{fontSize: '32px', pt:0, pb:0, pl:0 /* These are defaults for SectionTitle now*/}}>
                {book.title}
              </SectionTitle>
              <BookShortContent>
                {book.content && book.content.length > 100 ? `${book.content.substring(0, 100)}...` : book.content}
              </BookShortContent>
            </DetailTitleWrapper>
          </DetailTitleContentBox>

          <DetailImageSectionWrapper>
            <DetailImageTextContainer>
           <DetailBookCoverImage
                component="img"
                src={book.coverUrl || '/default-cover.png'} // coverUrl이 없으면 기본 이미지 표시
                alt={`${book.title} 표지`} // alt 텍스트 한국어로 수정
                onError={(e) => {
                  // book.coverUrl 로딩 실패 시 기본 이미지로 대체
                  if (e.target.src !== `${window.location.origin}/default-cover.png`) {
                    e.target.onerror = null; // 무한 루프 방지
                    e.target.src = '/default-cover.png';
                  }
                }}
              />
              <DetailTextContentBox>
                <DetailBookTitle>
                  {book.title}
                </DetailBookTitle>
                <DetailMetaBox>
                  <DetailMetaInnerBox>
                    <BookContentText>
                      {book.content}
                    </BookContentText>
                    <BookContentText component="div"> {/* Use div if it might contain block elements or for semantic grouping */}
                      Category: {book.category || 'Unknown Category'}
                    </BookContentText>
                  </DetailMetaInnerBox>
                </DetailMetaBox>
              </DetailTextContentBox>
            </DetailImageTextContainer>
          </DetailImageSectionWrapper>

          <DetailButtonsOuterContainer>
            <DetailButtonsInnerContainer>
              <DetailEditButton
                variant="contained" // Base variant from style, can be omitted if default
                disableElevation // Base elevation from style
                onClick={handleEditClick}
              >
                Edit
              </DetailEditButton>
              <DetailDeleteButton
                variant="contained"
                disableElevation
                onClick={handleDeleteClick}
              >
                Delete
              </DetailDeleteButton>
            </DetailButtonsInnerContainer>
          </DetailButtonsOuterContainer>
        </DetailInnerContainer>
      </DetailContentWrapper>

      <DeleteBookDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        bookId={id}
        onDeleteSuccess={handleDeleteSuccess}
      />

      <Footer />
    </PageContainer>
  );
}

export default BookDetail;