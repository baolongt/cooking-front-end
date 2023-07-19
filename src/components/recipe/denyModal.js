import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const DenyModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleClose, handleConfirm } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm deny</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want deny this recipe?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary">
          deny
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DenyModal;
