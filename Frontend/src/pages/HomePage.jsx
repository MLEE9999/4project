// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import AppBar from '../components/AppBar';
import FeaturedBookCard from '../components/FeaturedBookCard';
import Footer from '../components/Footer';
import { getAllBooks } from '../api'; // API 호출 함수 임포트

function HomePage() {
  const [featuredBook, setFeaturedBook] = useState(null); // 대표 도서 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchFeaturedBook = async () => {
      try {
        setLoading(true);
        // 백엔드에서 모든 책을 가져와서 가장 최근에 추가된 책(createdAt 기준 내림차순)을 대표 도서로 설정
        // size: 1, sortBy: 'createdAt', direction: 'desc' 파라미터를 사용
        const response = await getAllBooks({ page: 0, size: 1, sortBy: 'createdAt', direction: 'desc' });
        if (response.content && response.content.length > 0) {
          setFeaturedBook(response.content[0]); // 첫 번째 책을 대표 도서로 설정
        } else {
          setFeaturedBook(null); // 책이 없을 경우 null
        }
      } catch (err) {
        setError('Failed to load featured book. Please try again later.');
        console.error('Error fetching featured book:', err);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchFeaturedBook();
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

    return (
    <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // 최소 높이를 뷰포트 전체로 설정하여 푸터 고정
        bgcolor: 'white',
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
        }}
    >
        <AppBar />

        {/* 메인 콘텐츠를 감싸는 Box:
            - flexGrow: 1: 남은 수직 공간을 모두 차지
            - display: 'flex': 내부 요소를 Flexbox로 정렬
            - justifyContent: 'center': 내부 요소를 가로축으로 중앙 정렬
            - py, px: 반응형 수직/수평 패딩 */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', py: 5, px: { xs: 2, sm: 5, md: 10 } }}>
        {/* 실제 콘텐츠를 담는 Box:
            - flexDirection: 'column': 내부 요소들을 세로로 쌓음 */}
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* 이 안의 요소들은 이 Box의 너비 내에서 정렬됩니다. */}
            <Typography
            variant="h4"
            component="h2"
            sx={{
                color: '#121416',
                fontWeight: 'bold',
                textAlign: 'center', // 제목 중앙 정렬
                pb: 3,
                pt: 5,
                letterSpacing: 'light',
                fontSize: '28px',
            }}
            >
            걷기가 서재 - 작가의 산책
            </Typography>
            <Typography
            variant="body1"
            sx={{
                color: '#121416',
                fontWeight: 'normal',
                textAlign: 'center', // 설명 중앙 정렬
                pb: 3,
                pt: 1,
                px: 4,
            }}
            >
            "책장 사이를 거닐며 발견하는 영감과 사색의 발자취"
            </Typography>

            <Typography
            variant="h5"
            component="h2"
            sx={{
                color: '#121416',
                fontWeight: 'bold',
                letterSpacing: '-0.015em',
                px: 4, // 좌우 패딩만 적용 (왼쪽 정렬 유지)
                pb: 3,
                pt: 5,
                fontSize: '22px',
            }}
            >
            Featured Book
            </Typography>

          {/* 로딩, 에러, 데이터 표시 */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress /> {/* 로딩 스피너 */}
            </Box>
          ) : error ? (
            <Box sx={{ p: 4, textAlign: 'center', color: 'error.main' }}>
              {error}
            </Box>
          ) : featuredBook ? ( // featuredBook이 null이 아닐 때만 렌더링
            <FeaturedBookCard book={featuredBook} />
          ) : ( // 책이 아예 없을 경우 (404는 아니지만 DB에 책이 없는 경우)
             <Box sx={{ p: 4, textAlign: 'center', color: '#6a7681' }}>
               No featured book available. Please add some books first!
             </Box>
          )}
        </Box>
        </Box>

        <Footer />
    </Box>
    );
}

export default HomePage;