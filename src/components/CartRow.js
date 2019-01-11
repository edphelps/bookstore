import React, { Component } from 'react';
import { formatDollars } from '../utils'

/* ********************************************
*  CartRow
*
*  book -- see App state for shape
*  removeFromCartCB -- called when removing book from cart
*********************************************** */
const CartRow = ({ book, removeFromCartCB }) => {
  const onclickDelete = () => {
    console.log('CartRow::onclickDelete()');
    removeFromCartCB(book.id);
  }
  return (
    <div className="row">
      <div className="col cart-row">
        <i className="fas fa-trash-alt" onClick={onclickDelete} />&nbsp;
        <span className="">{book.title}</span>
        &nbsp;
        {formatDollars(book.price)}
      </div>
    </div>
  );
};

export default CartRow
