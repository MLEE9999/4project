// src/pages/Update_Book.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, MenuItem, Snackbar } from '@mui/material';
// MuiAlert is now StyledMuiAlert
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import { getBookById, partialUpdateBook, generateBookCoverImage } from '../api';

import {
  PageContainer,
  SectionTitle,
  StyledTextField,
  MainContentContainer,
  FormContainer ,
  UpdateRightSection,
  SectionHeader,
  TooltipIcon,
  TooltipText,
  FormFieldsContainer,
  InputFieldWrapper, // Re-using InputFieldWrapper
  ButtonContainer,
  CancelButton,
  UpdateButton,
  GenerateButton,
  CoverImage, // Using the generalized CoverImage
  NoImagePlaceholder,
  LoadingContainer,
  ErrorContainer,
  ApiKeyInputWrapper,
  StyledMuiAlert, // Using the styled Alert
} from '../pages/styles'; // Corrected import path

const CATEGORY_OPTIONS = [
  { value: 'NOVELS', label: 'Novels' },
  { value: 'POETRY', label: 'Poetry' },
  { value: 'COOKING', label: 'Cooking' },
  { value: 'HEALTH', label: 'Health' },
  { value: 'TECHNOLOGY', label: 'Technology' },
];

function BookUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverUrl: '',
    category: '',
  });
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageGenerating, setImageGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBookById(id)
        .then(res => {
          setFormData({
            title: res.title || '', // Ensure initial values are not undefined
            content: res.content || '',
            coverUrl: res.coverUrl || '',
            category: res.category || '',
          });
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load book details for update:", err);
          setError("책 정보를 불러오는 데 실패했습니다.");
          setLoading(false);
        });
    }
  }, [id]);

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
    setSaving(true);
    setError(null); // Clear previous errors
    try {
      if (!formData.category) {
        setSnackbar({ open: true, message: 'Please select a category.', severity: 'warning' });
        setSaving(false);
        return;
      }
      await partialUpdateBook(id, formData);
      setSnackbar({ open: true, message: '책이 성공적으로 업데이트되었습니다!', severity: 'success' });
      setTimeout(() => {
        navigate(`/books/${id}`);
      }, 2000);
    } catch (err) {
      console.error('책 업데이트 실패:', err);
      let errorMessage = '책 업데이트에 실패했습니다. 다시 시도해주세요.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return ( // Wrap in PageContainer for consistent AppBar/Footer if desired, or just LoadingContainer for centered content
      <PageContainer>
        <AppBar />
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
        <Footer />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <AppBar />
        <ErrorContainer>
          {error}
        </ErrorContainer>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AppBar />

      <MainContentContainer component="form" onSubmit={handleSubmit}>
        <FormContainer >
          <SectionHeader>
            <SectionTitle component="h2"> {/* Use h2 for semantic section titles */}
              Update Book
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
                제목, 소개 글, 카테고리가 모두 입력되고 이미지가 생성되면 도서 수정 버튼이 활성화 됩니다.
              </TooltipText>
            </TooltipIcon>
          </SectionHeader>

          <FormFieldsContainer> {/* This wraps InputFieldWrappers */}
            <InputFieldWrapper> {/* Re-using InputFieldWrapper */}
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
                helperTextAlignment="right" // Use the new prop
              />
            </InputFieldWrapper>

            <InputFieldWrapper> {/* Re-using InputFieldWrapper */}
              <StyledTextField
                label="Content"
                name="content"
                placeholder="Enter book content or description"
                value={formData.content}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4} // This will be overridden by minHeight in StyledTextField if .MuiTextField-multiline applies
                variant="outlined"
                className="MuiTextField-multiline" // To apply multiline specific styles from StyledTextField
                inputProps={{ maxLength: 500 }}
                helperText={`${formData.content.length}/500`}
                helperTextAlignment="right" // Use the new prop
              />
            </InputFieldWrapper>

            <InputFieldWrapper> {/* Re-using InputFieldWrapper */}
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
              <CancelButton
                variant="outlined" // Already part of CancelButton style
                onClick={handleCancel}
                disabled={saving || imageGenerating}
              >
                Cancel
              </CancelButton>
              <UpdateButton
                type="submit"
                variant="contained" // Already part of UpdateButton style
                disabled={!formData.title || !formData.content || !formData.category || !formData.coverUrl || saving || imageGenerating}
              >
                {saving ? <CircularProgress size={24} color="inherit" /> : 'Update Book'}
              </UpdateButton>
            </ButtonContainer>
          </FormFieldsContainer>
        </FormContainer >

        <UpdateRightSection>
          <SectionHeader>
            <SectionTitle component="h2" className="cover-preview-title"> {/* Add className if specific margin is needed */}
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
                제목과 API 키 입력 후 'Generate Image' 버튼을 클릭 해 커버 이미지를 생성할 수 있습니다.
              </TooltipText>
            </TooltipIcon>
          </SectionHeader>

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
            variant="contained" // Already part of GenerateButton style
            onClick={handleGenerateImage}
            disabled={imageGenerating || !apiKey || !formData.title}
          >
            {imageGenerating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Generate Image"
            )}
          </GenerateButton>

     {formData.coverUrl ? (
          <CoverImage
            component="img"
            src={formData.coverUrl}
            alt="생성된 표지"
          />
        ) : !imageGenerating ? (
          <CoverImage
            component="img"
           src="/default-cover.png"
            alt="기본 표지"
          />
        ) : (
          <NoImagePlaceholder>
            이미지 생성 중...
          </NoImagePlaceholder>
        )}
        </UpdateRightSection>
      </MainContentContainer>

      <Footer />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <StyledMuiAlert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </StyledMuiAlert>
      </Snackbar>
    </PageContainer>
  );
}

export default BookUpdate;