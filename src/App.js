import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import Foot from './components/Foot'
import SearchBar from './components/SearchBar'
import BookList from './components/BookList'
import Cart from './components/Cart'

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
    // The following is loaded in componentDidMount
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
