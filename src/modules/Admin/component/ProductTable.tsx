import React, { Fragment, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Paper,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Products } from '../../../shared/model';
import { getGender, getStatusProduct } from '../../../shared/helper/common';

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

export interface ProductTableProps {
  productList: Products[];
  onEdit?: (product: Products) => void;
  onRemove?: (product: Products) => void;
}

export default function ProductTable({ productList, onEdit, onRemove }: ProductTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products>();

  const handleClose = () => {
    setOpen(false);
  };

  const handlerRemoveClick = (product: Products) => {
    // Set selected student
    //Show confirm dialog
    setSelectedProduct(product);
    setOpen(true);
  };

  const handlerRemoveConfirm = (product: Products) => {
    //call onRemove
    //hide dialog
    onRemove?.(product);
    setOpen(false);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id}>
                <TableCell width={150}>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{getStatusProduct(product.quantity)}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                    onClick={() => onEdit?.(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handlerRemoveClick?.(product)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove student dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a product?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove product named "{selectedProduct?.name}". This action can'&apos;t
            be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handlerRemoveConfirm(selectedProduct as Products)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
