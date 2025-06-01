// src/components/FeaturedBookCard.jsx
import React from 'react';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const DEFAULT_COVER_IMAGE_PATH = '/default-cover.png';

function FeaturedBookCard({ book }) {
  if (!book) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: '#6a7681' }}>
        No featured book available.
      </Box>
    );
  }

  return (
    <Box sx={{
      p: { xs: 2, sm: 3 },
      width: { xs: '100%', md: '900px' }, // md 이상에서 카드 너비 (기존 코드 값 유지)
      maxWidth: { xs: 'calc(100vw - 40px)', md: '900px' },
      boxSizing: 'border-box',
      height: '250px', 
      display: 'flex',
      flexDirection: 'column',
      // boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      // border: '1px solid #e0e0e0',
      // borderRadius: '12px',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', sm: 'stretch' },
        justifyContent: 'space-between',
        gap: { xs: 2, sm: 3 },
        width: '100%',
        boxSizing: 'border-box',
        flex: 1, 
        overflow: 'hidden',
      }}>
        {/* 텍스트 내용 영역 */}
        <Box sx={{
          flex: { xs: '1 1 auto', sm: '2 2 0px' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1,
          textAlign: { xs: 'center', sm: 'left' },
          overflow: 'hidden', 
          py: {sm: 1} 
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#121416',
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {book.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6a7681', 
                fontWeight: 'normal',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {book.content} 
            </Typography>
          </Box>
          <Button
            component={Link}
            to={`/books/${book.id}`}
            sx={{
              minWidth: 84,
              height: 32,
              borderRadius: '9999px',
              bgcolor: '#f1f2f4',
              color: '#121416',
              fontWeight: 500,
              textTransform: 'none',
              width: 'fit-content',
              mt: 'auto', 
              alignSelf: { xs: 'center', sm: 'flex-start' },
              '&:hover': {
                bgcolor: '#e0e1e3',
              },
            }}
          >
            View Details
          </Button>
        </Box>
        
        {/* 이미지 영역 */}
        <CardMedia
          component="img"
          sx={{
            objectFit: 'cover',
            borderRadius: '12px',

            // 작은 화면 (xs) 설정: 높이 고정, 너비는 부모의 80% (최대 250px)
            width: { xs: '80%', sm: 'auto' }, // sm 이상에서는 너비가 aspectRatio에 의해 결정됨
            height: { xs: '150px', sm: '100%' }, // sm 이상에서는 카드 높이(250px) 전체 사용
            maxWidth: { xs: '250px', sm: 'none' }, // xs에서만 최대 너비, sm에서는 aspectRatio가 너비 제어
            alignSelf: { xs: 'center', sm: 'stretch' },

            // ✨ 중간 화면 (sm) 이상일 때 가로세로 비율 고정 ✨
            aspectRatio: { sm: '16/9' }, // 예시: 세로가 긴 3:4 비율 (너비 3 : 높이 4)
                                        // 이 값을 '16/9' (가로가 긴 비율) 등으로 변경 가능
            
            // sm 이상일 때 flex 아이템으로서의 동작 정의
            // aspectRatio로 크기가 결정되므로, 늘어나거나 줄어들지 않도록 설정
            flexGrow: { sm: 0 },
            flexShrink: { sm: 0 },
            // flexBasis는 내용(이미지)에 따르거나, aspectRatio로 계산된 너비가 됨
            // flex: { xs: 'none', sm: 1 } 이전 설정 대신 위와 같이 grow/shrink 명시
          }}
          image={book.coverUrl || DEFAULT_COVER_IMAGE_PATH}
          alt={book.title || 'Book cover'}
        />
      </Box>
    </Box>
  );
}

export default FeaturedBookCard;