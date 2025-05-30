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
// import AppBar from '../components/AppBar'; // 이 컴포넌트가 없다면 직접 AppBar를 구성해야 합니다.
// import Footer from '../components/Footer'; // 이 컴포넌트가 없다면 직접 Footer를 구성해야 합니다.
import { createBook, generateBookCoverImage } from '../api'; // 책 생성 API 및 이미지 생성 API 임포트
import { useNavigate } from 'react-router-dom'; // 리디렉션을 위한 useNavigate

// AppBar 및 Footer 컴포넌트가 없으므로 임시로 여기에 복사하거나, 실제 프로젝트 구조에 맞게 import 경로를 수정해야 합니다.
// 예시: 임시 AppBar 컴포넌트 (실제 프로젝트에서는 src/components/AppBar.jsx에 있어야 함)
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Plus as PlusIcon } from '@phosphor-icons/react'; // PlusIcon 임포트 (가정: 설치되어 있음)


// 백엔드의 CategoryEnum 값을 프론트엔드에서 사용하기 위해 정의 (실제 Enum 값과 일치해야 함)
const CATEGORY_OPTIONS = [
  { value: 'NOVELS', label: 'Novels' },
  { value: 'POETRY', label: 'Poetry' },
  { value: 'COOKING', label: 'Cooking' },
  { value: 'HEALTH', label: 'Health' },
  { value: 'TECHNOLOGY', label: 'Technology' },
  // 여기에 더 많은 카테고리 추가
];

function AddBookPage() {
  const navigate = useNavigate(); // 리디렉션 훅
  const [formData, setFormData] = useState({
    title: '',
    author: '', // author 필드 추가
    content: '',
    coverUrl: '',
    category: '', // CategoryEnum
  });
  const [apiKey, setApiKey] = useState(''); // OpenAI API Key
  const [loading, setLoading] = useState(false);
  const [imageGenerating, setImageGenerating] = useState(false); // 이미지 생성 로딩 상태
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

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleGenerateImage = async () => {
    if (!apiKey || !formData.title) {
      setSnackbar({ open: true, message: 'Please enter a title and API Key to generate an image.', severity: 'warning' });
      return;
    }

    setImageGenerating(true);
    try {
      const imageUrl = await generateBookCoverImage(formData.title, apiKey);
      setFormData((prevData) => ({ ...prevData, coverUrl: imageUrl }));
      setSnackbar({ open: true, message: 'Image generated successfully!', severity: 'success' });
    } catch (error) {
      console.error('Image generation failed:', error);
      setSnackbar({ open: true, message: `Image generation failed: ${error.message}`, severity: 'error' });
    } finally {
      setImageGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    setLoading(true);
    try {
      // 카테고리가 선택되지 않았다면 유효성 검사 에러 처리
      if (!formData.category) {
        setSnackbar({ open: true, message: 'Please select a category.', severity: 'warning' });
        setLoading(false);
        return;
      }
      
      // author가 비어있다면 경고 메시지
      if (!formData.author) {
        setSnackbar({ open: true, message: 'Please enter the author.', severity: 'warning' });
        setLoading(false);
        return;
      }

      await createBook(formData);
      setSnackbar({ open: true, message: 'Book added successfully!', severity: 'success' });
      // 성공 후 2초 뒤에 메인 페이지로 이동
      setTimeout(() => {
        navigate('/'); // 메인 페이지로 이동 또는 책 목록 페이지로 이동
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
      {/* AppBar 임시 구현 (실제로는 src/components/AppBar.jsx에서 import) */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #f0f2f5', px: 5, py: 1.5 }}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#111418' }}>
            <Box sx={{ width: 16, height: 16 }}>
              <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2183 14.2173 24 4Z"></path>
              </svg>
            </Box>
            <Typography variant="h6" component="h2" sx={{ fontSize: '1.125rem', fontWeight: 'bold', letterSpacing: '-0.015em' }}>
              Book Manager
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Button color="inherit" onClick={() => navigate('/')} sx={{ color: '#111418', fontSize: '0.875rem', fontWeight: 500, textTransform: 'none' }}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate('/books')} sx={{ color: '#111418', fontSize: '0.875rem', fontWeight: 500, textTransform: 'none' }}>Books</Button>
            <Button color="inherit" sx={{ color: '#111418', fontSize: '0.875rem', fontWeight: 500, textTransform: 'none' }}>Authors</Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<PlusIcon size={20} weight="regular" />}
              sx={{
                bgcolor: '#f0f2f5', color: '#111418', borderRadius: '12px', height: 40, px: 2.5,
                fontWeight: 'bold', fontSize: '0.875rem', textTransform: 'none', '&:hover': { bgcolor: '#e0e0e0' }
              }}
            >
              Add Book
            </Button>
            <IconButton sx={{ p: 0.5, bgcolor: '#f0f2f5', borderRadius: '12px' }}>
              <NotificationsIcon sx={{ color: '#111418' }} />
            </IconButton>
            <Box
              sx={{
                width: 40, height: 40, borderRadius: '50%',
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADBGWM7eAsebCtpzl4qf3o2mzbFztzSspV4SrFHaHeROQZNj0L7gDeB1T2CJLAAoxjYl4JoDyXuqZb_w5Hu50D6Easfs7vaUWQTRBvhVBN8gY958oqI50AQgf1TKdl2Q6SRDYrVmULXwuMBtSzn9UnZenQM0EaV8lVd0bsmOQwQlmXBasIMcINGWDyTyBFDJOF0UnTs7Ds_HllDwVzXv8BYDXCE7O2f8l7110nxYMNBa4veazXY0P5Lu5hI5UmGTUjCLBoVsPjBvfH")',
                backgroundSize: 'cover', backgroundPosition: 'center',
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', py: 5, px: { xs: 2, sm: 5, md: 10 }, flexDirection: { xs: 'column', md: 'row' }, gap: 5 }}>
        {/* Left: Book Input Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            py: 5,
            maxWidth: { xs: '100%', md: '512px' }, // 모바일에서는 꽉 채우고, 데스크탑에서는 최대 512px
          }}
        >
          <Box sx={{ p: 1 }}>
            <Typography variant="h4" component="h2" sx={{
              color: '#111418',
              fontWeight: 'bold',
              fontSize: '32px',
              minWidth: '288px',
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
              required
              variant="outlined"
              inputProps={{ maxLength: 20 }} // 최대 길이 20
              helperText={`${formData.title.length}/20`} // 현재 길이 표시
              FormHelperTextProps={{ sx: { textAlign: 'right' } }}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: '12px', height: '56px', backgroundColor: 'white', '& fieldset': { borderColor: '#dbe0e6' }, '&:hover fieldset': { borderColor: '#dbe0e6' }, '&.Mui-focused fieldset': { borderColor: '#dbe0e6' } },
                '& .MuiInputBase-input': { color: '#111418', padding: '15px', fontSize: '16px', fontWeight: 400 },
                '& .MuiInputLabel-root': { color: '#111418', fontWeight: 500 },
                '& .MuiInputBase-input::placeholder': { color: '#60758a', opacity: 1 },
              }}
            />
          </Box>

          {/* Author 입력 필드 */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: 4, px: 4, py: 3 }}>
            <TextField
              label="Author"
              name="author"
              placeholder="Enter author's name"
              value={formData.author}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: '12px', height: '56px', backgroundColor: 'white', '& fieldset': { borderColor: '#dbe0e6' }, '&:hover fieldset': { borderColor: '#dbe0e6' }, '&.Mui-focused fieldset': { borderColor: '#dbe0e6' } },
                '& .MuiInputBase-input': { color: '#111418', padding: '15px', fontSize: '16px', fontWeight: 400 },
                '& .MuiInputLabel-root': { color: '#111418', fontWeight: 500 },
                '& .MuiInputBase-input::placeholder': { color: '#60758a', opacity: 1 },
              }}
            />
          </Box>

          {/* Content 입력 필드 */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: 4, px: 4, py: 3 }}>
            <TextField
              label="Content"
              name="content"
              placeholder="Enter book content or description"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: 'white', '& fieldset': { borderColor: '#dbe0e6' }, '&:hover fieldset': { borderColor: '#dbe0e6' }, '&.Mui-focused fieldset': { borderColor: '#dbe0e6' } },
                '& .MuiInputBase-input': { color: '#111418', padding: '15px', fontSize: '16px', fontWeight: 400 },
                '& .MuiInputLabel-root': { color: '#111418', fontWeight: 500 },
                '& .MuiInputBase-input::placeholder': { color: '#60758a', opacity: 1 },
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
                '& .MuiOutlinedInput-root': { borderRadius: '12px', height: '56px', backgroundColor: 'white', '& fieldset': { borderColor: '#dbe0e6' }, '&:hover fieldset': { borderColor: '#dbe0e6' }, '&.Mui-focused fieldset': { borderColor: '#dbe0e6' } },
                '& .MuiInputBase-input': { color: '#111418', padding: '15px', fontSize: '16px', fontWeight: 400 },
                '& .MuiInputLabel-root': { color: '#111418', fontWeight: 500 },
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
              disabled={loading || imageGenerating} // 로딩 중에는 버튼 비활성화
              sx={{
                minWidth: 84, height: 40, borderRadius: '12px', bgcolor: '#0c7ff2', color: 'white', fontWeight: 'bold', letterSpacing: '0.015em', textTransform: 'none', px: 4,
                '&:hover': { bgcolor: '#0a6ad1' },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Book'}
            </Button>
          </Box>
        </Box>

        {/* Right: Image Generation */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            py: 5,
            maxWidth: { xs: '100%', md: '512px' }, // 모바일에서는 꽉 채우고, 데스크탑에서는 최대 512px
          }}
        >
          <Typography variant="h4" component="h2" sx={{
            color: '#111418',
            fontWeight: 'bold',
            fontSize: '32px',
            mb: 3, // mb-6 (tailwind)
          }}>
            Cover Preview
          </Typography>
          <Box sx={{ px: 4, py: 3, width: '100%' }}> {/* API Key 입력 필드 */}
            <TextField
              label="API Key (for cover image)"
              type="password"
              placeholder="Enter OpenAI API key"
              value={apiKey}
              onChange={handleApiKeyChange}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: '12px', height: '56px', backgroundColor: 'white', '& fieldset': { borderColor: '#dbe0e6' }, '&:hover fieldset': { borderColor: '#dbe0e6' }, '&.Mui-focused fieldset': { borderColor: '#dbe0e6' } },
                '& .MuiInputBase-input': { color: '#111418', padding: '15px', fontSize: '16px', fontWeight: 400 },
                '& .MuiInputLabel-root': { color: '#111418', fontWeight: 500 },
                '& .MuiInputBase-input::placeholder': { color: '#60758a', opacity: 1 },
              }}
            />
          </Box>
          <Button
            onClick={handleGenerateImage}
            disabled={imageGenerating || !apiKey || !formData.title}
            variant="contained"
            disableElevation
            sx={{
              mb: 2, // mb-4 (tailwind)
              px: 3, py: 1, bgcolor: '#0c7ff2', color: 'white', borderRadius: '12px', fontWeight: 'semibold', textTransform: 'none',
              '&:hover': { bgcolor: '#0a6ad1' },
              '&.Mui-disabled': { opacity: 0.5, bgcolor: '#0c7ff2' } // disabled opacity
            }}
          >
            {imageGenerating ? <CircularProgress size={24} color="inherit" /> : 'Generate Image'}
          </Button>
          {formData.coverUrl ? (
            <Box
              component="img"
              src={formData.coverUrl}
              alt="Generated cover"
              sx={{
                width: '100%',
                maxWidth: '400px', // max-w-[400px]
                borderRadius: '12px', // rounded-xl
                border: '1px solid #dbe0e6', // border
                height: 'auto', // 이미지 비율 유지
                objectFit: 'cover', // 이미지 잘림 방지
              }}
            />
          ) : (
            <Typography sx={{ color: '#60758a', fontSize: '0.875rem' }}>No image generated</Typography>
          )}
        </Box>
      </Box>

      {/* Footer 임시 구현 (실제로는 src/components/Footer.jsx에서 import) */}
      <Box sx={{ mt: 'auto', py: 3, borderTop: '1px solid #f0f2f5', textAlign: 'center', color: '#60758a', fontSize: '0.875rem' }}>
        © 2025 Book Manager. All rights reserved.
      </Box>

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