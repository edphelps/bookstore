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
*  SearchBar
*********************************************** */
const SearchBar = () => {

  const onSubmit = (e) => {
    console.log("search submit");
    e.preventDefault();
  }

  return (
    <div>
      <div id="search-bar" className="navbar bg-secondary text-light">
        {/*<form onSubmit={this.onSubmit}>*/}
        <form id="myform" onSubmit={onSubmit}>

          <div className="input-group input-group-sm">

            {/*seach box*/}
            {/*<div className="input-group-prepend">
              <span className="input-group-text" id="search-btn">Search</span>
            </div>*/}
            <button type="submit">Search</button>
            &nbsp;&nbsp;
            <input id="search-text" type="text" className="form-control" />

            {/*author or title radio buttons*/}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="search-rbtn" id="author-rbtn" value="author-rbtn" />
              <label className="form-check-label" htmlFor="author-rbtn">author</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="search-rbtn" id="title-rbtn" value="title-rbtn" />
              <label className="form-check-label" htmlFor="title-rbtn">title</label>
            </div>

          </div> {/*input-group*/}

        </form>
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <SearchBar />
        <p>content</p>
        <Foot />
      </div>
    );
  }
}

export default App;
