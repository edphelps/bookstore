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
*  Book row
*********************************************** */
const BookRow = ({ book }) => (
  <div className="list-group-item">
    <div className="row">
      <div className="col-2">
        {formatDollars(book.price)}
      </div>
      <div className="col">{book.title}<br />{book.author}</div>
    </div>
  </div>
);


/* ********************************************
*  BookList
   Displays list of books that match the search criteria and aren't in cart
   books -- see App state
   searchCriteria -- see App state
}
*********************************************** */
const BookList = ({books, searchCriteria}) => {
  console.log("BookList::render(), books: ", books);
  if (!books) {
    return (
      <div className="container">
          <h1>Loading...</h1>
      </div>
  )}

  let filteredBooks = [...books];

  // Apply search criteria
  if (searchCriteria) {
    filteredBooks = filteredBooks.filter((book) => {
      if (searchCriteria.authorOrTitle==="author") {
        return book.author.toLowerCase().startsWith(searchCriteria.text.toLowerCase());
      } else if (searchCriteria.authorOrTitle==="title") {
        return book.title.toLowerCase().startsWith(searchCriteria.text.toLowerCase());
      } else {
        console.log("ERROR: bad searchCriteria.authorOrTitle: ", searchCriteria.authorOrTitle);
        return false;
      }
    });
    console.log("-- books: ", filteredBooks);

    // filter out books already in the cart
    filteredBooks = filteredBooks.filter((book) => !book.inCart )

    // sort by title
    filteredBooks.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    })
  }

  return (
    <div className="container">
      <h1>Books!</h1>
      <div className="list-group">
        <div className="list-group-item">
          <div className="row">
            <div className="col-2"><b>cart</b></div>
            <div className="col"><b>book</b></div>
          </div>
        </div>
        { filteredBooks.map(book => <BookRow key={book.id} book={book} />) }
      </div>
    </div>
  )

}

/* ********************************************
*  SearchBar
   Displays search bar at top and notifies parent of any change
     searchState -- {
        text: "phelps",
        authorOrTitle: "author" / "title"
      }
     onChangeCB -- parent callback when content changes, passing
       { text: "xx", authorOrTitle: "author" / "title" }
}
*********************************************** */
const SearchBar = ({searchCriteria, onChangeCB}) => {

  const onChange = () => {
    // console.log("-----------------");
    console.log("SearchBar::onChange()");
    // console.log("search for: ", document.forms.searchForm.searchText.value);
    // console.log("search in: ", document.forms.searchForm.searchRBtns.value);
    onChangeCB({
      text: document.forms.searchForm.searchText.value.trim(),
      authorOrTitle: document.forms.searchForm.searchRBtns.value,
    });
    // e.preventDefault();
  }
  const onSubmit = (e) => {
    console.log("SearchBar::onSubmit() -- do nothing");
    e.preventDefault();
  }
  const onReset = () => {
    document.forms.searchForm.searchText.value = "";
    document.getElementById("titleRBtn").checked = false;
    document.getElementById("authorRBtn").checked = true;
    onChange();
    // Can't change the radio buttons b/c I'd have to make a jQuery call on the button and I
    //  don't know how to do that.
    // document.forms.searchForm.authorRBtn.checked = true;
    // console.log("rb value A: ", document.forms.searchForm.searchRBtns.value);
    // document.getElementById("descRBtn").checked = false;
    // document.getElementById("titleRBtn").checked = false;
    // document.getElementById("authorRBtn").checked = true;
    // console.log("rb value B: ", document.forms.searchForm.searchRBtns.value);
  }

  console.log("SearchBar::render()");
  return (
    <div>
      <div id="search-bar" className="navbar bg-secondary text-light">
        <form id="searchForm" onSubmit={onSubmit}>
           <div className="input-group input-group-sm">

             {/*search box*/}
            <button className="btn btn-sm btn-info" type="button" onClick={onReset}>Reset</button>
            &nbsp;&nbsp;
            <input id="searchText" onChange={onChange} type="text" className="form-control" value={searchCriteria.text} placeholder="search..." />

            {/*author or title radio buttons*/}
            &nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" onChange={onChange} checked={searchCriteria.authorOrTitle==='author'} type="radio" name="searchRBtns" id="authorRBtn" value="author" />
              <label className="form-check-label" htmlFor="authorRBtn">author</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" onChange={onChange} checked={searchCriteria.authorOrTitle==='title'} type="radio" name="searchRBtns" id="titleRBtn" value="title" />
              <label className="form-check-label" htmlFor="titleRBtn">title</label>
            </div>

            {/*WHY CAN'T I CAPTURE THE ONLCICK?*/}
            {/*<div className="btn-group btn-group-toggle" data-toggle="buttons">
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
            </div>*/}

           </div> {/*input-group*/}
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
      text: "",
      authorOrTitle: "author" // "title"
    },
    // books: [ {
    //     "author": "Glenn Block, et al.",
    //     "description": "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft’s ASP.NET Web API framework. In the process, you’ll learn how design and implement a real-world Web API.",
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
  *  Callback when the search bar state has changed
  *  searchCriteria -- { text: "Tolstoy", authorOrTitle: "author"}
  ************************************* */
  searchCriteriaChanged = (searchCriteria) => {
    this.setState((prevState) => ({
      searchCriteria: searchCriteria,
    }))
    // log will lag one keystroke behind b/c of the async call above
    // console.log("App:searchCriteriaChanged(): ",this.state.searchCriteria);
  }

  /* **********************************
  *  loadBooks()
  *  Load books from the api and setState()
  ************************************* */
  async loadBooks() {
    console.log("App:loadBooks()");
    const response = await fetch('http://localhost:8082/api/books');
    // console.log("response: ", response);
    const json = await response.json();
    this.setState({books: json});
    // console.log("books: ", json);
  }

  /* **********************************
  *  componentDidMount()
  ************************************* */
  async componentDidMount() {
    console.log("App:componentDidMount()");
    this.loadBooks();
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log("App:render()");
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
