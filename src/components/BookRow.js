import React, { Component } from 'react';

/* ********************************************
*  Book row, compressed
*  Displays simple view of book
*
*  book -- see App state for shape
*********************************************** */
const BookRow = ({ book }) => (
  <div className="row">
    <div className="col">
      <div className="book-title">{book.title}</div>
      {book.author}
    </div>
  </div>
);

export default BookRow
