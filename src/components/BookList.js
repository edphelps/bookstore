import React, { Component } from 'react';
import BookRowContainer from './BookRowContainer'

/* ********************************************
*  BookList
   Displays list of books that match the search criteria and aren't in the cart
   books -- see App state
   searchCriteria -- see App state
   addToCartCB -- callback when user clicks to add book to cart, pass the book__id
}
*********************************************** */
const BookList = ({ books, searchCriteria, addToCartCB }) => {

  /* **********************************
  *  render()
  ************************************* */
  console.log('BookList::render()');

  // short circuit: still loading
  if (!books) {
    return (
      <div className="container">
        <h3>Loading book list...</h3>
      </div>
    );
  }

  let filteredBooks = [...books];

  // Apply search criteria
  if (searchCriteria) {
    filteredBooks = filteredBooks.filter((book) => {
      switch (searchCriteria.authorOrTitle) {
        case 'author':
          return book.author.toLowerCase().startsWith(searchCriteria.text.toLowerCase());
        case 'title':
          return book.title.toLowerCase().startsWith(searchCriteria.text.toLowerCase());
        default:
          console.log('ERROR: bad searchCriteria.authorOrTitle: ', searchCriteria.authorOrTitle);
          return false;
      }
    });
  };

  // short circuit: no books match search
  if (!filteredBooks.length) {
    return (
      <div className="container">
      <h3>No books match the search</h3>
      </div>
    );
  }

  // filter out books already in the cart
  filteredBooks = filteredBooks.filter(book => !book.inCart);

  // short circuit: no books to display
  if (!filteredBooks.length) {
    return (
      <div className="container">
        <h3>You bought everything!</h3>
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
      <h3 className="text-center">Select a title to purchase</h3>
      <div className="list-group">
        { filteredBooks.map(book => <BookRowContainer key={book.id} book={book} addToCartCB={addToCartCB} />) }
      </div>
    </div>
  );
};

export default BookList
