// src/pages/AddBookPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem, // CategoryEnum을 위한 MenuItem
  Snackbar, // 알림 메시지 (성공/실패)
} from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Snackbar와 함께 사용
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import { createBook } from '../api'; // 책 생성 API 임포트
import { useNavigate } from 'react-router-dom'; // 리디렉션을 위한 useNavigate

// 백엔드의 CategoryEnum 값을 프론트엔드에서 사용하기 위해 정의 (실제 Enum 값과 일치해야 함)
const CATEGORY_OPTIONS = [
  { value: 'NOVELS', label: 'Novels' },
  { value: 'POETRY', label: 'Poerty' },
  { value: 'COOKING', label: 'Cooking' },
  { value: 'HEALTH', label: 'Health' },
  { value: 'TECHNOLOGY', label: 'Technology' },
];

function AddBookPage() {
  const navigate = useNavigate(); // 리디렉션 훅
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverUrl: '',
    category: '', // CategoryEnum
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    setLoading(true);
    try {
      // 카테고리가 선택되지 않았다면 기본값 설정 또는 유효성 검사 에러 처리
      if (!formData.category) {
        setSnackbar({ open: true, message: 'Please select a category.', severity: 'warning' });
        setLoading(false);
        return;
      }

      await createBook(formData);
      setSnackbar({ open: true, message: 'Book added successfully!', severity: 'success' });
      // 성공 후 2초 뒤에 메인 페이지로 이동
      setTimeout(() => {
        navigate('/'); // 메인 페이지로 이동
      }, 2000);
    } catch (error) {
      console.error('Failed to add book:', error);
      let errorMessage = 'Failed to add book. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // 백엔드에서 온 에러 메시지
      } else if (error.message) {
        errorMessage = error.message; // Axios 에러 메시지
      }
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'white',
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
      <AppBar /> {/* 헤더 재사용 */}

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', py: 5, px: { xs: 2, sm: 5, md: 10 } }}>
        <Box
          component="form" // 폼 태그로 변경
          onSubmit={handleSubmit} // 폼 제출 핸들러
          sx={{
            flex: 1, // 남은 공간 채우기
            maxWidth: '512px', // HTML 원본의 폼 최대 너비 (w-[512px] max-w-[512px] 참조)
            display: 'flex',
            flexDirection: 'column',
            gap: 3, // 필드 간 간격
            py: 5, // 수직 패딩
          }}
        >
          <Box sx={{ p: 1 }}> {/* 타이틀 섹션 */}
            <Typography variant="h4" component="h2" sx={{
              color: '#111418', // HTML 색상 코드 사용
              fontWeight: 'bold',
              letterSpacing: 'light',
              fontSize: '32px',
              minWidth: '288px', // min-w-72 (tailwind 72 = 18rem = 288px)
            }}>
              Add New Book
            </Typography>
          </Box>

          {/* Title 입력 필드 */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: 4, px: 4, py: 3 }}>
            <TextField
              label="Title"
              name="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required // 필수 필드
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px', // rounded-xl (tailwind xl = 12px)
                  height: '56px', // h-14 (tailwind 14 = 3.5rem = 56px)
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: '#dbe0e6', // border-[#dbe0e6]
                  },
                  '&:hover fieldset': {
                    borderColor: '#dbe0e6', // focus:border-[#dbe0e6]
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dbe0e6', // focus:border-[#dbe0e6]
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#111418', // text-[#111418]
                  padding: '15px', // p-[15px]
                  fontSize: '16px', // text-base
                  fontWeight: 400, // font-normal
                },
                '& .MuiInputLabel-root': {
                  color: '#111418', // Label color
                  fontWeight: 500, // font-medium
                },
                '& .MuiInputLabel-shrink': {
                  // Label이 작아졌을 때의 스타일
                  transform: 'translate(14px, -9px) scale(0.75)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#60758a', // placeholder:text-[#60758a]
                  opacity: 1, // placeholder opacity by default is low in MUI
                },
              }}
            />
          </Box>

          {/* Content 입력 필드 (HTML의 Author 대신) */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: 4, px: 4, py: 3 }}>
            <TextField
              label="Content"
              name="content"
              placeholder="Enter book content or description"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              multiline // 여러 줄 입력 가능
              rows={4} // 기본 4줄
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  '& fieldset': { borderColor: '#dbe0e6' },
                  '&:hover fieldset': { borderColor: '#dbe0e6' },
                  '&.Mui-focused fieldset': { borderColor: '#dbe0e6' },
                },
                '& .MuiInputBase-input': {
                  color: '#111418',
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: 400,
                },
                '& .MuiInputLabel-root': {
                  color: '#111418',
                  fontWeight: 500,
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#60758a',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Cover URL 입력 필드 (HTML의 API Key 대신) */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: 4, px: 4, py: 3 }}>
            <TextField
              label="Cover Image URL"
              name="coverUrl"
              placeholder="Enter URL for cover image"
              value={formData.coverUrl}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: '56px',
                  backgroundColor: 'white',
                  '& fieldset': { borderColor: '#dbe0e6' },
                  '&:hover fieldset': { borderColor: '#dbe0e6' },
                  '&.Mui-focused fieldset': { borderColor: '#dbe0e6' },
                },
                '& .MuiInputBase-input': {
                  color: '#111418',
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: 400,
                },
                '& .MuiInputLabel-root': {
                  color: '#111418',
                  fontWeight: 500,
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#60758a',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Category 드롭다운 */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: 4, px: 4, py: 3 }}>
            <TextField
              select // 드롭다운으로 만듦
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: '56px',
                  backgroundColor: 'white',
                  '& fieldset': { borderColor: '#dbe0e6' },
                  '&:hover fieldset': { borderColor: '#dbe0e6' },
                  '&.Mui-focused fieldset': { borderColor: '#dbe0e6' },
                },
                '& .MuiInputBase-input': {
                  color: '#111418',
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: 400,
                },
                '& .MuiInputLabel-root': {
                  color: '#111418',
                  fontWeight: 500,
                },
              }}
            >
              {/* 기본 옵션 (선택 안 함) */}
              <MenuItem value="" disabled>
                Select a category
              </MenuItem>
              {CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Add Book 버튼 */}
          <Box sx={{ px: 4, py: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit" // 폼 제출 버튼
              variant="contained"
              disableElevation
              disabled={loading} // 로딩 중에는 버튼 비활성화
              sx={{
                minWidth: 84,
                height: 40,
                borderRadius: '12px', // rounded-xl
                bgcolor: '#0c7ff2', // bg-[#0c7ff2]
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: '0.015em',
                textTransform: 'none',
                px: 4,
                '&:hover': {
                  bgcolor: '#0a6ad1', // 호버 시 색상 변경
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Book'}
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer /> {/* 푸터 재사용 */}

      {/* 알림 메시지 (Snackbar) */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default AddBookPage;