// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        py: 3, // 수직 패딩
        px: { xs: 2, sm: 5, md: 10 }, // 화면 크기별 반응형 좌우 패딩
        mt: 'auto', // 상위 flex 컨테이너에서 남은 공간을 밀어내어 푸터를 하단에 고정
        borderTop: '1px solid #f1f2f4',
        textAlign: 'center', // 텍스트 중앙 정렬
        bgcolor: '#f8f8f8',
      }}
    >
      <Typography variant="body2" sx={{ color: '#6a7681' }}>
        © 2025 Book Manager. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;