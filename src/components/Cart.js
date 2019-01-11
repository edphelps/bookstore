import React, { Component } from 'react';
import { formatDollars } from '../utils'

/* ********************************************
*  CartRow
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

/* ********************************************
*  CartTotal
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

/* ********************************************
*  Cart
   Displays books in the cart
   books -- see App state
}
*********************************************** */
const Cart = ({ books, removeFromCartCB }) => {

  /* **********************************
  *  render()
  ************************************* */
  console.log('Cart::render()');

  // short circuit: still loading
  if (!books) {
    return (
      <div className="container">
        <h3>Loading cart...</h3>
      </div>
    );
  }

  let filteredBooks = [...books];

  // filter for book in the cart
  filteredBooks = filteredBooks.filter(book => book.inCart);

  // short circuit: no books to display in cart
  if (!filteredBooks.length) {
    return (
      <div className="container">
        <h2>Buy something!!!</h2>
      </div>
    );
  }

  // sort by title
  filteredBooks.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  // render
  return (
    <div className="container">
      <h3 className="text-center"><i className="fas fa-shopping-cart" /> Cart</h3>
      <CartTotal books={books} />
      <div className="list-group">
        { filteredBooks.map(book => (
          <CartRow
            key={book.id}
            book={book}
            removeFromCartCB={removeFromCartCB}
          />
        ))
        }
      </div>
    </div>
  );
};


export default Cart
