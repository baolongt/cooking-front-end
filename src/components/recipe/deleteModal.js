import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const DeleteModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleClose, handleConfirm } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want delete this recipe?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
