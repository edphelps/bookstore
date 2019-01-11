import React, { Component } from 'react';
import CartRow from './CartRow'
import CartTotal from './CartTotal'

/* ********************************************
*  Cart
   Displays books in the cart

   books -- see App state for shape
   removeFromCartCB -- callback to remove book from cart
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
