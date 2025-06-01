import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';
import { deleteBook } from '../api';

function DeleteBookDialog({ open, onClose, bookId, onDeleteSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteBook(bookId);
      alert('책이 성공적으로 삭제되었습니다.');
      onDeleteSuccess(); // 삭제 성공 후 콜백 호출
      onClose(); // 다이얼로그 닫기
    } catch (err) {
      console.error('책 삭제 실패:', err);
      setError('책 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
        }
      }}
    >
      <DialogTitle
        sx={{
          color: '#111418',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          pb: 1,
        }}
      >
        책을 삭제하시겠습니까?
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText
          sx={{
            color: '#111418',
            fontSize: 'base',
            fontWeight: 'normal',
            textAlign: 'center',
            mb: error ? 2 : 0,
          }}
        >
          이 작업은 되돌릴 수 없습니다. 책을 삭제하면 라이브러리에서 영구적으로 제거됩니다.
        </DialogContentText>
        
        {error && (
          <Typography sx={{ color: 'error.main', textAlign: 'center', fontSize: '14px' }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1, justifyContent: 'center' }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            minWidth: '84px',
            height: '40px',
            px: '16px',
            bgcolor: '#f0f2f5',
            color: '#111418',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '12px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#e0e2e5',
            },
          }}
        >
          취소
        </Button>
        
        <Button
          onClick={handleDeleteConfirm}
          disabled={loading}
          sx={{
            minWidth: '84px',
            height: '40px',
            px: '16px',
            bgcolor: '#f44336',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '12px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#d32f2f',
            },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : '삭제'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteBookDialog;