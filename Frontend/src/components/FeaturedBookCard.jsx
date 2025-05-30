// src/components/FeaturedBookCard.jsx
import React from 'react';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

function FeaturedBookCard({ book }) {
  // book 데이터가 없을 경우 (예: 로딩 중이거나 데이터 로드 실패 시)
  if (!book) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: '#6a7681' }}>
        No featured book available.
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 4, borderRadius: '12px' }}>
        <Box sx={{ flex: '2 2 0px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="h6" sx={{ color: '#121416', fontWeight: 'bold' }}>
              {book.title}
            </Typography>
            {/* HTML 원본에서는 작가(author)였으나, 현재 Book 도메인에는 content 필드가 있습니다. */}
            {/* content를 짧게 표시하거나, 작가 정보가 있다면 해당 필드를 사용합니다. */}
            <Typography variant="body2" sx={{ color: '#6a7681', fontWeight: 'normal' }}>
              {book.content && book.content.length > 100 ? `${book.content.substring(0, 100)}...` : book.content}
            </Typography>
          </Box>
          <Button
            component={Link}
            to={`/books/${book.id}`} // 상세 페이지로 이동하는 링크 (구현 필요)
            variant="contained"
            disableElevation
            sx={{
              minWidth: 84,
              height: 32,
              borderRadius: '9999px',
              bgcolor: '#f1f2f4',
              color: '#121416',
              fontWeight: 500,
              textTransform: 'none',
              width: 'fit-content',
              '&:hover': {
                bgcolor: '#e0e1e3',
              },
            }}
          >
            View Details
          </Button>
        </Box>
        <CardMedia
          component="img" // img 태그로 렌더링
          sx={{
            width: '100%',
            height: 'auto', // 높이 자동 조절
            aspectRatio: '16 / 9', // 16:9 비율 유지
            objectFit: 'cover', // 이미지 채우기 방식
            borderRadius: '12px',
            flex: 1,
            maxWidth: '300px', // 이미지 최대 너비 제한
          }}
          image={book.coverUrl || 'https://via.placeholder.com/400x225?text=No+Cover'} // 커버 URL 없으면 대체 이미지
          alt={book.title}
        />
      </Box>
    </Box>
  );
}

export default FeaturedBookCard;