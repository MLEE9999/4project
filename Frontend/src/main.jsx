// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // 전역 CSS 임포트
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // MUI 기본 스타일 초기화

// 커스텀 MUI 테마 생성 (폰트 및 기타 전역 스타일 설정)
const theme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif', // HTML 원본의 폰트 적용
  },
  palette: {
    // 필요에 따라 색상 팔레트 정의 (Tailwind와 유사하게 설정하거나 기본 Material Design 사용)
    primary: {
      main: '#1976d2', // 예시로 파란색 설정
    },
    secondary: {
      main: '#dc004e', // 예시로 핑크색 설정
    },
    background: {
      default: '#fff', // HTML 원본의 배경색
    },
  },
  components: {
    // 특정 MUI 컴포넌트의 기본 스타일을 오버라이드
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white', // App Bar 배경색을 흰색으로 강제
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // 전역 버튼 스타일을 원할 경우 여기에 추가
        }
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* MUI의 기본 CSS 초기화 적용 */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);