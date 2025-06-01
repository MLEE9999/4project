// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material'; // Box import 확인
import AppBar from '../components/AppBar';
import FeaturedBookCard from '../components/FeaturedBookCard';
import Footer from '../components/Footer';
import { getAllBooks } from '../api';

import {
  PageContainer,
  HomeContentWrapper,
  HomeInnerContainer,
  SectionTitle,
  PageSubtitle,
  CenteredSpinnerContainer,
  ErrorDisplayBox,
  EmptyStateBox,
} from '../pages/styles';

// getRandomItemsFromArray 함수는 이전 답변을 참고하여 여기에 두거나,
// utils 파일로 분리하여 import 할 수 있습니다.
// 여기서는 설명을 위해 HomePage.jsx 내에 있다고 가정합니다.
function getRandomItemsFromArray(arr, n) {
  if (!arr || arr.length === 0) {
    return [];
  }
  if (n >= arr.length) {
    const shuffledAll = [...arr].sort(() => 0.5 - Math.random());
    return shuffledAll.slice(0, Math.min(n, arr.length));
  }
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  let count = 0;
  while (count < n) {
    const x = Math.floor(Math.random() * len);
    if (!taken[x]) {
      result[count++] = arr[x];
      taken[x] = true;
    }
  }
  return result;
}


function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetRandomBooks = async () => {
      try {
        setLoading(true);
        // API 호출 시 모든 책을 가져온다고 가정 (getAllBooks 인자 없음 또는 API 명세 따름)
        const response = await getAllBooks({}); 

        if (response.content && response.content.length > 0) {
          const allBooks = response.content;
          const randomTwoBooks = getRandomItemsFromArray(allBooks, 2);
          setFeaturedBooks(randomTwoBooks);
        } else {
          setFeaturedBooks([]);
        }
      } catch (err) {
        setError('Failed to load featured books. Please try again later.');
        console.error('Error fetching or processing featured books:', err);
        setFeaturedBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetRandomBooks();
  }, []);

  return (
    <PageContainer>
      <AppBar />
      <HomeContentWrapper>
        <HomeInnerContainer>
          <SectionTitle
            variant="h4"
            component="h2"
            className="page-title"
          >
            걷기가 서재 - 작가의 산책
          </SectionTitle>
          <PageSubtitle
            variant="body1"
          >
            "책장 사이를 거닐며 발견하는 영감과 사색의 발자취"
          </PageSubtitle>

          <SectionTitle
            variant="h5"
            component="h2"
            className="section-heading"
          >
            Featured Books
          </SectionTitle>

          {loading ? (
            <CenteredSpinnerContainer>
              <CircularProgress />
            </CenteredSpinnerContainer>
          ) : error ? (
            <ErrorDisplayBox>
              {error}
            </ErrorDisplayBox>
          ) : featuredBooks.length > 0 ? (
            // ✨ 이 부분을 수정하여 카드들을 감싸고 스타일을 적용합니다. ✨
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', // 카드들을 세로로 나열
                alignItems: 'center', // 카드들을 가로축 중앙에 정렬
                gap: 3, // 카드들 사이의 간격
                width: '100%', // 부모 컨테이너의 전체 너비를 사용하도록 설정
              }}
            >
              {featuredBooks.map((book) => (
                // FeaturedBookCard 자체에 maxWidth가 설정되어 있어야 합니다.
                // (이전 답변에서 FeaturedBookCard.jsx에 maxWidth: '700px' 등을 설정한 것을 가정)
                <FeaturedBookCard key={book.id} book={book} />
              ))}
            </Box>
          ) : (
            <EmptyStateBox>
              No featured books available at the moment.
            </EmptyStateBox>
          )}
        </HomeInnerContainer>
      </HomeContentWrapper>
      <Footer />
    </PageContainer>
  );
}

export default HomePage;