// src/components/AppBar.jsx
import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from 'react-router-dom';

function AppBar() {
  return (
    <MuiAppBar
      position="static" // 뷰포트에 맞게 너비 자동 설정 (기본값)
      color="transparent"
      elevation={0}
      sx={{ borderBottom: '1px solid #f1f2f4' }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between', // 로고와 메뉴를 양 끝으로 정렬
          px: { xs: 2, sm: 5, md: 10 }, // 화면 크기별 반응형 좌우 패딩
          py: 1,
        }}
      >
        {/* ... (로고 및 제목) ... */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} component={Link} to="/">
          <LibraryBooksIcon sx={{ color: '#121416' }} />
          <Typography variant="h6" component="div" sx={{ color: '#121416', fontWeight: 'bold', letterSpacing: '-0.015em' }}>
            걷기가 서재
          </Typography>
        </Box>
        {/* ... (메뉴 및 버튼) ... */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 4, md: 8 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 4, md: 9 } }}>
            <Button component={Link} to="/books" color="inherit" sx={{ textTransform: 'none', color: '#121416', fontWeight: 500 }}>
              View Books
            </Button>
            {/* 'Add Book' 버튼 (활성화 상태로 표시) */}
            <Button
                component={Link}
                to="/add-book"
                variant="contained"
                disableElevation
                sx={{
                minWidth: 84,
                height: 40,
                borderRadius: '9999px',
                bgcolor: '#dce8f3',
                color: '#121416',
                fontWeight: 'bold',
                letterSpacing: '0.015em',
                textTransform: 'none',
                '&:hover': {
                    bgcolor: '#c2d4e8',
                },
                }}
            >
                <span style={{ textWrap: 'nowrap' }}>Add Book</span>
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;