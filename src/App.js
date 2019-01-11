import React, { Component } from 'react';
import './App.css';

/* ********************************************
*  Nav bar
*********************************************** */
const Nav = () => (
  <nav className="navbar navbar-dark bg-primary">
    <a className="navbar-brand" href="#">Barnes and Ignoble</a>
  </nav>
);

/* ********************************************
*  Footer
*********************************************** */
const Foot = () => (
  <nav className="navbar navbar-dark bg-dark">
    xx
  </nav>
);

/* ********************************************
*  Format 5 to $5.00
*********************************************** */
function formatDollars(dollars) {
  return `$${dollars}.00`;
}

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
          <button className="btn btn-success btn-sm" onClick={onclickAddToCart} type="button">
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
  *  Expands/Contract the book row
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

/* ********************************************
*  SearchBar
   Displays search bar at top and notifies parent of any change
     searchState -- see App state
     onChangeCB -- parent callback when content changes, passing
       { text: "xx", authorOrTitle: "author" / "title" }
}
*********************************************** */
const SearchBar = ({ searchCriteria, onChangeCB }) => {
  const onChange = () => {
    console.log('SearchBar::onChange()');
    onChangeCB({
      text: document.forms.searchForm.searchText.value.trim(),
      authorOrTitle: document.forms.searchForm.searchRBtns.value,
    });
  };
  const onSubmit = (e) => {
    console.log('SearchBar::onSubmit() -- do nothing');
    e.preventDefault();
  };
  const onReset = () => {
    document.forms.searchForm.searchText.value = '';
    document.getElementById('titleRBtn').checked = false;
    document.getElementById('authorRBtn').checked = true;
    onChange();
  };

  console.log('SearchBar::render()');
  return (
    <div>
      <div id="search-bar" className="navbar bg-secondary text-light">
        <form id="searchForm" onSubmit={onSubmit}>
          <div className="input-group input-group-sm">

            {/* search box */}
            <button className="btn btn-sm btn-info" type="button" onClick={onReset}>Reset</button>
            &nbsp;&nbsp;
            <input id="searchText" onChange={onChange} type="text" className="form-control" value={searchCriteria.text} placeholder="search..." />

            {/* author / title radio buttons */}
            &nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <label className="form-check-label" htmlFor="authorRBtn">
                <input className="form-check-input" onChange={onChange} checked={searchCriteria.authorOrTitle === 'author'} type="radio" name="searchRBtns" id="authorRBtn" value="author" />
                author
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label" htmlFor="titleRBtn">
                <input className="form-check-input" onChange={onChange} checked={searchCriteria.authorOrTitle === 'title'} type="radio" name="searchRBtns" id="titleRBtn" value="title" />
                title
              </label>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

/* *************************************************
*
**************************************************** */
class App extends Component {

  state = {
    searchCriteria: {
      text: '',
      authorOrTitle: 'author', // "title"
    },
    // ----------------
    // Data structure
    // ----------------
    // The following is loaded in compomnentDidMount
    // books: [ {
    //     "author": "Glenn Block, et al.",
    //     "description": "Design and build Web APIs for a broad ....",
    //     "id": 8,
    //     "inCart": true,
    //     "pages": 538,
    //     "price": 5,
    //     "published": "2014-04-07T00:00:00.000Z",
    //     "publisher": "O'Reilly Media",
    //     "subtitle": "Harnessing the Power of the Web",
    //     "title": "Designing Evolvable Web APIs with ASP.NET",
    //     "website": "http://chimera.labs.oreilly.com/books/1234000001708/index.html"
    //   },
    //   {...} ]
  }

  /* **********************************
  *  componentDidMount()
  *  load the books and get rendering
  ************************************* */
  async componentDidMount() {
    console.log('App:componentDidMount()');
    this.loadBooks();
  }

  /* **********************************
  *  Callback when the search bar state has changed
  *  searchCriteria -- { text: "Tolstoy", authorOrTitle: "author"}
  ************************************* */
  searchCriteriaChanged = (searchCriteria) => {
    this.setState(() => ({
      searchCriteria,
    }));
  }

  /* **********************************
  *  addToCart()
  *  Called when user clicks the add to cart button on a book
  *  id -- book id
  ************************************* */
  addToCart = async (id) => {
    console.log('App:addToCart()');
    const response = await fetch(`http://localhost:8082/api/books/cart/add/${id}`, {
      method: 'PATCH',
      body: '',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const json = await response.json();
    console.log('resulting json: ' + json);
    this.loadBooks();
  }

  /* **********************************
  *  removeFromCart()
  *  Called when user clicks to remove a book from the cart
  *  id -- book id
  ************************************* */
  removeFromCart = async (id) => {
    console.log('App:addToCart()');
    const response = await fetch(`http://localhost:8082/api/books/cart/remove/${id}`, {
      method: 'PATCH',
      body: '',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const json = await response.json();
    console.log('resulting json: ' + json);
    this.loadBooks();
  }

  /* **********************************
  *  loadBooks()
  *  Load books from the api and setState()
  ************************************* */
  async loadBooks() {
    console.log('App:loadBooks()');
    const response = await fetch('http://localhost:8082/api/books');
    const json = await response.json();
    this.setState({
      books: json,
    });
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('App:render()');
    const { books, searchCriteria } = this.state;
    return (
      <div>
        <Nav />

        <SearchBar searchCriteria={searchCriteria} onChangeCB={this.searchCriteriaChanged} />

        <div className="row mt-4">

          <div className="col-8 pt-3 ">
            <BookList books={books} searchCriteria={searchCriteria} addToCartCB={this.addToCart} />
          </div>

          <div className="col-4 pt-3 cart-bkgd">
            <Cart books={books} removeFromCartCB={this.removeFromCart} />
          </div>

        </div>
        <Foot />
      </div>
    );
  }
}

export default App;
