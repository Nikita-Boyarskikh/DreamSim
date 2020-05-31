import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const PaperComponent = (props) => (
  <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
    <Paper {...props} />
  </Draggable>
);

const DraggableDialog = ({ open, title, handleClose, children, actions }) => (
  <Dialog
    open={open}
    className="draggable-dialog"
    onClose={handleClose}
    PaperComponent={PaperComponent}
    aria-labelledby="draggable-dialog-title"
  >
    {title && <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
      { title }
    </DialogTitle>}
    <DialogContent>
      {children}
    </DialogContent>
    {actions && <DialogActions>
      {actions}
    </DialogActions>}
  </Dialog>
);

DraggableDialog.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  handleClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
};

export default DraggableDialog;
