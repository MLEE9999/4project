// src/pages/AddBookPage.styles.js
import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button } from '@mui/material';

// 전체 페이지 레이아웃을 위한 컨테이너
export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: 'white',
  fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
});

// 메인 컨텐츠 영역 (폼과 이미지 프리뷰를 감싸는 컨테이너)
export const MainContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  gap: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

// 책 정보 입력 폼 컨테이너
export const FormContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '512px',
  },
}));

// 페이지 제목 ("Add New Book", "Cover Preview")
export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#111418',
  fontWeight: 'bold',
  fontSize: '32px',
  minWidth: '288px',
  padding: theme.spacing(1), // 기존 Box sx={{ p: 1 }} 스타일 통합
  '&.cover-preview-title': { // Cover Preview 타이틀에만 적용될 mb (margin-bottom)
    marginBottom: theme.spacing(3),
  }
}));

// 입력 필드 (TextField) 공통 스타일
export const StyledTextField = styled(TextField)({
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
    // height는 필드 타입(single-line, multi-line, select)에 따라 유동적이므로 공통 스타일에서 제외
  },
  '& .MuiInputLabel-root': {
    color: '#111418',
    fontWeight: 500,
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#60758a',
    opacity: 1,
  },
  // select TextField의 height 조정을 위해
  '&.MuiFormControl-root .MuiSelect-select': {
     height: '26px', // 56px (root height) - 15px*2 (padding) = 26px. 실제 값에 맞게 조절
     lineHeight: '26px', // vertical-align을 위해
  },
  // 기본 TextField의 height 고정 (single-line)
  '&:not(.MuiTextField-multiline) .MuiOutlinedInput-root': {
      height: '56px',
  },
});

// 입력 필드를 감싸는 Wrapper Box 스타일
export const InputFieldWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'end',
  gap: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

// 제출 버튼 ("Add Book") 스타일
export const SubmitButton = styled(Button)({
  minWidth: 84,
  height: 40,
  borderRadius: '12px',
  backgroundColor: '#0c7ff2',
  color: 'white',
  fontWeight: 'bold',
  letterSpacing: '0.015em',
  textTransform: 'none',
  paddingLeft: '32px',
  paddingRight: '32px',
  '&:hover': {
    backgroundColor: '#0a6ad1',
  },
});

// 제출 버튼을 감싸는 Wrapper Box 스타일
export const SubmitButtonWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'flex-end',
}));

// 이미지 프리뷰 섹션 컨테이너
export const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '512px',
  },
}));

// API Key 입력 필드를 감싸는 Wrapper Box 스타일
export const ApiKeyInputWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  width: '100%',
}));

// 이미지 생성 버튼 스타일
export const GenerateImageButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: '#0c7ff2',
  color: 'white',
  borderRadius: '12px',
  fontWeight: '600', // semibold는 600에 해당
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#0a6ad1',
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    backgroundColor: '#0c7ff2',
  },
}));

// 생성된 책 표지 이미지 스타일
export const GeneratedCoverImage = styled(Box)({
  width: '100%',
  maxWidth: '400px',
  borderRadius: '12px',
  border: '1px solid #dbe0e6',
  height: 'auto',
  objectFit: 'cover',
});

// 이미지가 없을 때 표시되는 텍스트 스타일
export const NoImageText = styled(Typography)({
  color: '#60758a',
  fontSize: '0.875rem',
});
