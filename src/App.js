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
*  Book row, unexpanded
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
const BookRowExpanded = ({ book }) => {

  /* **********************************
  *  onclickAddToCart()
  ************************************* */
  const onclickAddToCart = (e) => {
    console.log('---- BookRowExpanded::onclickAddToCart()');
    e.stopPropagation();
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
           &nbsp;
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
        <div className="expanded-para"><a target="_blank" href={book.website}>website</a></div>
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
    return (
      <div
        className="list-group-item"
        id={`book_list_id_${id}`}
        data-id={id}
        onClick={this.onclick}
      >
        {isExpanded ? (
          <BookRowExpanded book={book} />
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
}
*********************************************** */
const BookList = ({ books, searchCriteria }) => {
  /* **********************************
  *  render()
  ************************************* */
  console.log('BookList::render(), books: ', books);

  // short circuit: still loading
  if (!books) {
    return (
      <div className="container">
        <h1>Loading book list...</h1>
      </div>
    );
  }

  // short circuit: no books
  if (!books.length) {
    return (
      <div className="container">
        <h1>You bought the store!</h1>
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

    // filter out books already in the cart
    filteredBooks = filteredBooks.filter(book => !book.inCart);

    // sort by title
    filteredBooks.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
  }

  // render
  return (
    <div className="container">
      <h2>Select a title below</h2>
      <div className="list-group">
        { filteredBooks.map(book => <BookRowContainer key={book.id} book={book} />) }
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

            {/* WHY CAN'T I CAPTURE THE ONLCICK? */}
            {/* <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-info btn-sm active">
                <input type="radio" onClick={onChange} name="searchRBtns" id="authorRBtn" value="author" autoComplete="off" checked />
                author
              </label>
              <label className="btn btn-info btn-sm">
                <input type="radio" onClick={onChange} name="searchRBtns" id="titleRBtn" value="title" autoComplete="off" />
                title
              </label>
              <label className="btn btn-info btn-sm">
                <input type="radio" onClick={onChange} name="searchRBtns" id="descRBtn" value="description" autoComplete="off" />
                description
              </label>
            </div> */}

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
    // DON'T DELETE!!!!
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
    // log will lag one keystroke behind b/c of the async call above
    // console.log("App:searchCriteriaChanged(): ",this.state.searchCriteria);
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

        <BookList books={books} searchCriteria={searchCriteria} />
        <Foot />
      </div>
    );
  }
}

export default App;
