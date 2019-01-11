import React, { Component } from 'react';
import { formatDollars } from '../utils'

/* ********************************************
*  Book row, compressed
*********************************************** */
const BookRow = ({ book }) => (
  <div className="row">
    <div className="col">
      <div className="book-title">{book.title}</div>
      {book.author}
    </div>
  </div>
);

/* ********************************************
*  Book row, expanded
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

/* ********************************************
*  BookRowContainer,
*  Manages clicking row to un/expand a book.
*  Stateful with a flag if it's expanded or not.
*********************************************** */
class BookRowContainer extends Component {
  /* **********************************
  *  constructor
  ************************************* */
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  /* **********************************
  *  onclick()
  *  Expands/Contracts the book row
  ************************************* */
  onclick = () => {
    console.log('BookRowContainer::onclick(), id: ', this.props.book.id);

    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('BookRowContainer::render()');
    const { isExpanded } = this.state;
    const { book } = this.props;
    const { id } = book;
    const { addToCartCB } = this.props;
    return (
      <div
        className="list-group-item"
        id={`book_list_id_${id}`}
        data-id={id}
        onClick={this.onclick}
      >
        {isExpanded ? (
          <BookRowExpanded book={book} addToCartCB={addToCartCB} />
        ) : (
          <BookRow book={book} />
        )}
      </div>
    );
  }
}

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