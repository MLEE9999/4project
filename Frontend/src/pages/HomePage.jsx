// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material'; // Typography might not be needed
import AppBar from '../components/AppBar';
import FeaturedBookCard from '../components/FeaturedBookCard';
import Footer from '../components/Footer';
import { getAllBooks } from '../api';

import {
  PageContainer,
  HomeContentWrapper, // Use HomeContentWrapper
  HomeInnerContainer,   // Use HomeInnerContainer
  SectionTitle,       // Use SectionTitle with className for variations
  PageSubtitle,       // Use PageSubtitle
  CenteredSpinnerContainer, // Use CenteredSpinnerContainer
  ErrorDisplayBox,      // Use ErrorDisplayBox for local errors
  EmptyStateBox,        // Use EmptyStateBox for "no book" message
} from '../pages/styles'; // Import from ../styles

function HomePage() {
  const [featuredBook, setFeaturedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBook = async () => {
      try {
        setLoading(true);
        const response = await getAllBooks({ page: 0, size: 1, sortBy: 'createdAt', direction: 'desc' });
        if (response.content && response.content.length > 0) {
          setFeaturedBook(response.content[0]);
        } else {
          setFeaturedBook(null);
        }
      } catch (err) {
        setError('Failed to load featured book. Please try again later.');
        console.error('Error fetching featured book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBook();
  }, []);

    return (
    <PageContainer>
        <AppBar />
        <HomeContentWrapper>
          <HomeInnerContainer>
            <SectionTitle
              variant="h4" // Retain semantic variant if desired
              component="h2" // Retain semantic component if desired
              className="page-title" // Apply class for styling
            >
              걷기가 서재 - 작가의 산책
            </SectionTitle>
            <PageSubtitle
              variant="body1" // Retain semantic variant
            >
              "책장 사이를 거닐며 발견하는 영감과 사색의 발자취"
            </PageSubtitle>

            <SectionTitle
              variant="h5" // Retain semantic variant
              component="h2" // Retain semantic component
              className="section-heading" // Apply class for styling
            >
              Featured Book
            </SectionTitle>

            {loading ? (
              <CenteredSpinnerContainer>
                <CircularProgress />
              </CenteredSpinnerContainer>
            ) : error ? (
              <ErrorDisplayBox>
                {error}
              </ErrorDisplayBox>
            ) : featuredBook ? (
              <FeaturedBookCard book={featuredBook} />
            ) : (
              <EmptyStateBox>
                No featured book available. Please add some books first!
              </EmptyStateBox>
            )}
          </HomeInnerContainer>
        </HomeContentWrapper>
        <Footer />
    </PageContainer>
    );
}

export default HomePage;