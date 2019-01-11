import React, { Component } from 'react';
import { formatDollars } from '../utils'

/* ********************************************
*  Book row, expanded
*  Displays the exanded view of book with button to add to cart
*
*  book -- see App state for shape
*  addToCartCB -- callback if button clicked to add to cart
*********************************************** */
const BookRowExpanded = ({ book, addToCartCB }) => {

  /* **********************************
  *  onclickAddToCart()
  ************************************* */
  const onclickAddToCart = (e) => {
    console.log('---- BookRowExpanded::onclickAddToCart()');
    e.stopPropagation();
    addToCartCB(book.id);
  };

  /* **********************************
  *  render()
  ************************************* */
  return (
    <div className="row">
      <div className="col expanded" data-id={book.id}>
        <div className="expanded-title">{book.title}</div>
        <div className="expanded-para">
          <button className="btn btn-success btn-sm"
            onClick={onclickAddToCart}
            type="button"
          >
            <i className="fas fa-cart-plus" />
            &nbsp;add to cart
          </button>
          &nbsp;&nbsp;
          <span className="book-list-heading">Price:</span>
          &nbsp;&nbsp;
          {formatDollars(book.price)}
        </div>
        <div className="expanded-para">
          <span className="book-list-heading">Author:</span>
          &nbsp;
          {book.author}
        </div>
        <div className="expanded-para">
          <span className="book-list-heading">Subtitle:</span>
          &nbsp;
          {book.subtitle}
        </div>
        <div className="expanded-para">
          <span className="book-list-heading">Decription:</span>
          &nbsp;
          {book.description}
        </div>
        <div className="expanded-para">
          <span className="book-list-heading">Publication:</span>
          &nbsp;
          {new Date(book.published).toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}
          ,&nbsp;
          {book.pages}
          &nbsp;pages,&nbsp;
          {book.publisher}
        </div>
        <div className="expanded-para mb-2"><a target="_blank" href={book.website}>website</a></div>
      </div>
    </div>
  );
};

export default BookRowExpanded
