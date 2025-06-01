
import React, { useState } from 'react';
import {
  CircularProgress,
  MenuItem,
  Snackbar,

} from '@mui/material';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import { createBook, generateBookCoverImage } from '../api';
import { useNavigate } from 'react-router-dom';

import {
  PageContainer,
  MainContentContainer,
  FormContainer,     
  StyledTextField,
  InputFieldWrapper,
  ImagePreviewContainer,
  ApiKeyInputWrapper,
  GeneratedCoverImage,
  NoImageText,
  PrimaryButton,
  GenerateButton,
  StyledMuiAlert,
  SectionTitle,
  SectionHeader,
  TooltipIcon,
  TooltipText,     
  FormFieldsContainer,
  ButtonContainer,  
  CancelButton,    
} from '../pages/styles'; 

const CATEGORY_OPTIONS = [
  { value: 'NOVELS', label: 'Novels' },
  { value: 'POETRY', label: 'Poetry' },
  { value: 'COOKING', label: 'Cooking' },
  { value: 'HEALTH', 'label': 'Health' },
  { value: 'TECHNOLOGY', label: 'Technology' },
];

function AddBookPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverUrl: '',
    category: '',
  });
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageGenerating, setImageGenerating] = useState(false);
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
      setSnackbar({ open: true, message: '제목과 API 키를 입력해야 이미지를 생성할 수 있습니다.', severity: 'warning' });
      return;
    }
    setImageGenerating(true);
    try {
      const imageUrl = await generateBookCoverImage(formData.title, apiKey);
      setFormData((prevData) => ({ ...prevData, coverUrl: imageUrl }));
      setSnackbar({ open: true, message: '이미지가 성공적으로 생성되었습니다!', severity: 'success' });
    } catch (error) {
      console.error('이미지 생성 실패:', error);
      setSnackbar({ open: true, message: `이미지 생성 실패: ${error.message}`, severity: 'error' });
    } finally {
      setImageGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.category) {
        setSnackbar({ open: true, message: '카테고리를 선택해주세요.', severity: 'warning' });
        setLoading(false);
        return;
      }

      await createBook(formData);
      setSnackbar({ open: true, message: '책이 성공적으로 추가되었습니다!', severity: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('책 추가 실패:', error);
      let errorMessage = '책 추가에 실패했습니다. 다시 시도해주세요.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
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


   const handleCancelAdd = () => {
    navigate('/'); // 또는 이전 페이지로 navigate(-1);
   };

  return (
    <PageContainer>
      <AppBar />

      <MainContentContainer>
     
        <FormContainer component="form" onSubmit={handleSubmit}>
          {/* SectionHeader와 TooltipIcon 추가 */}
          <SectionHeader>
            <SectionTitle variant="h4" component="h2">
              Add New Book
            </SectionTitle>
            <TooltipIcon>
              <div className="icon-circle">
             
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14px"
                  height="14px"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21 16.545 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.455 4.73L5.82 21z" />
                </svg>
              </div>
              <TooltipText className="tooltip">
                새로운 책의 제목, 내용, 카테고리를 입력하고, 필요시 표지 이미지를 생성한 후 'Add Book' 버튼을 클릭하세요.
              </TooltipText>
            </TooltipIcon>
          </SectionHeader>

    
          <FormFieldsContainer>
            <InputFieldWrapper>
              <StyledTextField
                label="Title"
                name="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                inputProps={{ maxLength: 20 }}
                helperText={`${formData.title.length}/20`}
                helperTextAlignment="right"
              />
            </InputFieldWrapper>

            <InputFieldWrapper>
              <StyledTextField
                label="Content"
                name="content"
                placeholder="Enter book content or description"
                value={formData.content}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                inputProps={{ maxLength: 500 }}
                helperText={`${formData.content.length}/500`}
                helperTextAlignment="right"
                className="MuiTextField-multiline"
              />
            </InputFieldWrapper>

            <InputFieldWrapper>
              <StyledTextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledTextField>
            </InputFieldWrapper>

    
            <ButtonContainer>
              { <CancelButton onClick={handleCancelAdd} variant="outlined" disabled={loading || imageGenerating}>
                Cancel
              </CancelButton> }
              <PrimaryButton
                type="submit"
                variant="contained" // 스타일 컴포넌트에 이미 포함되어 있을 수 있음
                disableElevation  // 스타일 컴포넌트에 이미 포함되어 있을 수 있음
                disabled={loading || imageGenerating}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Book'}
              </PrimaryButton>
            </ButtonContainer>
          </FormFieldsContainer>
        </FormContainer>

<ImagePreviewContainer>
  {/* === 수정된 헤더 부분 시작 === */}
  <SectionHeader>
    <SectionTitle component="h2" className="cover-preview-title"> {/* Update_Book.jsx 예시를 따름 */}
      Cover Preview
    </SectionTitle>
    <TooltipIcon>
      <div className="icon-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14px"
          height="14px"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21 16.545 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.455 4.73L5.82 21z" />
        </svg>
      </div>
      <TooltipText className="tooltip">
        {/* Update_Book.jsx 예시의 툴팁 텍스트를 사용합니다. */}
        제목과 API 키 입력 후 'Generate Image' 버튼을 클릭 해 커버 이미지를 생성할 수 있습니다.
      </TooltipText>
    </TooltipIcon>
  </SectionHeader>
  {/* === 수정된 헤더 부분 끝 === */}

  {/* === 기존 ImagePreviewContainer의 나머지 내용 시작 === */}
  <ApiKeyInputWrapper>
    <StyledTextField
      label="API Key (for cover image)"
      type="password"
      placeholder="Enter OpenAI API key"
      value={apiKey} 
      onChange={handleApiKeyChange} 
      fullWidth
      variant="outlined"
    />
          </ApiKeyInputWrapper>
          <GenerateButton
            onClick={handleGenerateImage}
            disabled={imageGenerating || !apiKey || !formData.title}
          >
            {imageGenerating ? <CircularProgress size={24} color="inherit" /> : 'Generate Image'}
          </GenerateButton>
          {formData.coverUrl ? (
            <GeneratedCoverImage component="img" src={formData.coverUrl} alt="생성된 표지" />
          ) : !imageGenerating ? (
            <GeneratedCoverImage component="img" src="/default-cover.png" alt="기본 표지" />
          ) : (
            <NoImageText>이미지 생성 중...</NoImageText>
          )}
        </ImagePreviewContainer>
      </MainContentContainer>

      <Footer />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <StyledMuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </StyledMuiAlert>
      </Snackbar>
    </PageContainer>
  );
}

export default AddBookPage;