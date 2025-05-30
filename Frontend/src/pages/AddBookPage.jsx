// src/pages/AddBookPage.jsx
import React, { useState } from 'react';
import {
  CircularProgress,
  MenuItem,
  Snackbar,
  // Box, Typography 등은 더 이상 직접적인 스타일링에 많이 사용되지 않으므로,
  // 필요에 따라 남겨두거나 제거할 수 있습니다.
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import { createBook, generateBookCoverImage } from '../api';
import { useNavigate } from 'react-router-dom';

// 스타일 컴포넌트 임포트
import {
  PageContainer,
  MainContentContainer,
  FormContainer,
  SectionTitle,
  StyledTextField,
  InputFieldWrapper,
  SubmitButton,
  SubmitButtonWrapper,
  ImagePreviewContainer,
  ApiKeyInputWrapper,
  GenerateImageButton,
  GeneratedCoverImage,
  NoImageText,
} from './AddBookPage.styles'; // 생성한 스타일 파일 경로

const CATEGORY_OPTIONS = [
  { value: 'NOVELS', label: 'Novels' },
  { value: 'POETRY', label: 'Poetry' },
  { value: 'COOKING', label: 'Cooking' },
  { value: 'HEALTH', label: 'Health' },
  { value: 'TECHNOLOGY', label: 'Technology' },
];

function AddBookPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
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
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.category) {
        setSnackbar({ open: true, message: 'Please select a category.', severity: 'warning' });
        setLoading(false);
        return;
      }
      if (!formData.author) {
        setSnackbar({ open: true, message: 'Please enter the author.', severity: 'warning' });
        setLoading(false);
        return;
      }
      await createBook(formData);
      setSnackbar({ open: true, message: 'Book added successfully!', severity: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Failed to add book:', error);
      let errorMessage = 'Failed to add book. Please try again.';
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

  return (
    <PageContainer>
      <AppBar />
      
      <MainContentContainer>
        {/* Left: Book Input Form */}
        <FormContainer component="form" onSubmit={handleSubmit}>
          <SectionTitle variant="h4" component="h2">
            Add New Book
          </SectionTitle>

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
              FormHelperTextProps={{ sx: { textAlign: 'right' } }} // 이 부분은 필요시 StyledTextField 내부에서 처리하거나 sx 유지
            />
          </InputFieldWrapper>
          
          {/* Author 필드가 원본 코드에는 없었지만, 이전 요청에서 추가되었을 수 있으므로 예시로 포함 */}
          <InputFieldWrapper>
            <StyledTextField
              label="Author"
              name="author"
              placeholder="Enter author's name" /* 실제 프로젝트에 맞게 수정 */
              value={formData.author}
              onChange={handleChange}
              fullWidth
              required /* 실제 프로젝트에 맞게 수정 */
              variant="outlined"
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
              // multiline일 경우 StyledTextField의 height 고정 로직이 영향받지 않도록 multiline 클래스 추가
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

          <SubmitButtonWrapper>
            <SubmitButton
              type="submit"
              variant="contained" // styled 컴포넌트에서 variant는 Material-UI 기본 스타일링에 영향 주지 않음
              disableElevation
              disabled={loading || imageGenerating}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Book'}
            </SubmitButton>
          </SubmitButtonWrapper>
        </FormContainer>

        {/* Right: Image Generation */}
        <ImagePreviewContainer>
          <SectionTitle variant="h4" component="h2" className="cover-preview-title">
            Cover Preview
          </SectionTitle>
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
          <GenerateImageButton
            onClick={handleGenerateImage}
            disabled={imageGenerating || !apiKey || !formData.title}
            variant="contained"
            disableElevation
          >
            {imageGenerating ? <CircularProgress size={24} color="inherit" /> : 'Generate Image'}
          </GenerateImageButton>
          {formData.coverUrl ? (
            <GeneratedCoverImage component="img" src={formData.coverUrl} alt="Generated cover" />
          ) : (
            <NoImageText>No image generated</NoImageText>
          )}
        </ImagePreviewContainer>
      </MainContentContainer>

      <Footer />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}> 
          {/* Snackbar 내 Alert의 sx는 유지하거나 필요시 별도 스타일 컴포넌트 생성 */}
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </PageContainer>
  );
}

export default AddBookPage;
