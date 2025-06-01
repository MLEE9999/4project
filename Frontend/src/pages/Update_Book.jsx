// src/pages/Update_Book.jsx
import React, { useState, useEffect, useCallback } from "react"; // useCallback 추가
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, MenuItem, Snackbar } from '@mui/material';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import { getBookById, partialUpdateBook, generateBookCoverImage } from '../api';

import {
  PageContainer,
  SectionTitle,
  StyledTextField,
  MainContentContainer,
  FormContainer ,
  SectionHeader,
  TooltipIcon,
  TooltipText,
  FormFieldsContainer,
  InputFieldWrapper,
  ButtonContainer,
  CancelButton,
  UpdateButton,
  GenerateButton,
  CoverImage,
  NoImagePlaceholder,
  ImagePreviewContainer,
  LoadingContainer,
  ErrorContainer,
  ApiKeyInputWrapper,
  StyledMuiAlert,
} from '../pages/styles';

const CATEGORY_OPTIONS = [
  { value: 'NOVELS', label: 'Novels' },
  { value: 'POETRY', label: 'Poetry' },
  { value: 'COOKING', label: 'Cooking' },
  { value: 'HEALTH', 'label': 'Health' },
  { value: 'TECHNOLOGY', label: 'Technology' },
];

// 간단한 객체 비교 함수 (얕은 비교)
const shallowEqual = (objA, objB) => {
  if (objA === objB) return true;
  if (!objA || !objB) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }
  return true;
};


function BookUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialFormData, setInitialFormData] = useState(null); // 1. 초기 데이터 저장용 state
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

  // 2. 변경 여부 확인 함수 (useCallback으로 최적화)
  const hasFormChanged = useCallback(() => {
    if (!initialFormData) return false; // 초기 데이터가 없으면 변경된 것으로 간주하지 않음
    // formData에서 initialFormData에 있는 키들만 비교
    const relevantFormData = {
        title: formData.title,
        content: formData.content,
        coverUrl: formData.coverUrl,
        category: formData.category,
    };
    return !shallowEqual(initialFormData, relevantFormData);
  }, [initialFormData, formData]);


  useEffect(() => {
    if (id) {
      setLoading(true);
      getBookById(id)
        .then(res => {
          const fetchedData = {
            title: res.title || '',
            content: res.content || '',
            coverUrl: res.coverUrl || '',
            category: res.category || '',
          };
          setFormData(fetchedData);
          setInitialFormData(fetchedData); // 1. 초기 데이터 저장
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
      setFormData((prevData) => ({ ...prevData, coverUrl: imageUrl })); // coverUrl 변경 시 hasFormChanged가 true가 됨
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
    setError(null);

    // 3. 변경 여부 확인
    if (!hasFormChanged()) {
      setSnackbar({ open: true, message: '변경된 내용이 없습니다.', severity: 'info' });
      setSaving(false);
      return;
    }

    try {
      if (!formData.category) {
        setSnackbar({ open: true, message: 'Please select a category.', severity: 'warning' });
        setSaving(false);
        return;
      }
      await partialUpdateBook(id, formData);
      setSnackbar({ open: true, message: '책이 성공적으로 업데이트되었습니다!', severity: 'success' });
      // 업데이트 성공 시 initialFormData도 현재 formData로 갱신
      setInitialFormData(formData);
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
    navigate(-1);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading && !initialFormData) { // 초기 로딩 중일 때만 표시
    return (
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

  // 4. 버튼 비활성화 조건에 !hasFormChanged() 추가
  const isUpdateButtonDisabled =
    !formData.title ||
    !formData.content ||
    !formData.category ||
    !formData.coverUrl ||
    saving ||
    imageGenerating ||
    !hasFormChanged(); // 내용 변경이 없으면 비활성화

  return (
    <PageContainer>
      <AppBar />

      <MainContentContainer component="form" onSubmit={handleSubmit}>
        <FormContainer >
          <SectionHeader>
            <SectionTitle component="h2">
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
                변경된 내용이 있을 경우에만 도서 수정 버튼이 활성화 됩니다.
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
                // helperTextAlignment="right" // 이 prop은 StyledTextField에 구현되어 있어야 합니다.
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
                className="MuiTextField-multiline"
                inputProps={{ maxLength: 500 }}
                helperText={`${formData.content.length}/500`}
                // helperTextAlignment="right"
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
              <CancelButton
                variant="outlined"
                onClick={handleCancel}
                disabled={saving || imageGenerating}
              >
                Cancel
              </CancelButton>
              <UpdateButton
                type="submit"
                variant="contained"
                disabled={isUpdateButtonDisabled} // 수정된 비활성화 조건 사용
              >
                {saving ? <CircularProgress size={24} color="inherit" /> : 'Update Book'}
              </UpdateButton>
            </ButtonContainer>
          </FormFieldsContainer>
        </FormContainer >

        {/* ImagePreviewContainer는 AddBookPage와 유사한 구조를 가질 것으로 예상됩니다. */}
        {/* Update_Book.jsx에 맞게 ImagePreviewContainer 또는 유사한 이름의 컴포넌트를 사용해주세요. */}
        {/* 여기서는 AddBookPage의 ImagePreviewContainer 구조를 가져왔다고 가정합니다. */}
        <ImagePreviewContainer>
          <SectionHeader>
            <SectionTitle component="h2" className="cover-preview-title">
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
            variant="contained"
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
              src="/default-cover.png" // 기본 이미지 경로
              alt="기본 표지"
            />
          ) : (
            <NoImagePlaceholder>
              이미지 생성 중...
            </NoImagePlaceholder>
          )}
        </ImagePreviewContainer>
      </MainContentContainer>

      <Footer />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <StyledMuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%'}}>
          {snackbar.message}
        </StyledMuiAlert>
      </Snackbar>
    </PageContainer>
  );
}

export default BookUpdate;