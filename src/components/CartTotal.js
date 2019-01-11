import React, { Component } from 'react';
import { formatDollars } from '../utils'

/* ********************************************
*  CartTotal
*  Calculates and displays the cart total
*
*  books -- see App state for shape
*********************************************** */
const CartTotal = ({ books }) => {
  console.log("-- CartTotal::render()");
  const grandTotal = books.reduce((total, book) => {
    return total += (book.inCart) ? book.price : 0;
  }, 0);
  return (
    <div className="row">
      <div className="col mt-2 mb-2 text-center">
        <span className="book-list-heading">Cart Total:</span>&nbsp;
        {formatDollars(grandTotal)}
      </div>
    </div>
  );
};

export default CartTotal
