import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogActions, DialogContentText } from "@material-ui/core";
const UpdateModal = (props) => {
  const { onCloseUpdateModal, openUpdateModal } = props;
  return (
    <Dialog
      open={openUpdateModal}
      onClose={onCloseUpdateModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseUpdateModal} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
