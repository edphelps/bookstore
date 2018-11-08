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
const SearchBar = ({searchState}) => {

  const onChange = (e) => {
    console.log("SearchBar::onChange()");
    e.preventDefault();
  }
  const onSubmit = (e) => {
    console.log("SearchBar::onSubmit() -- do nothing");
    e.preventDefault();
  }

  return (
  <div>
    <div id="search-bar" className="navbar bg-secondary text-light">
      <form id="myform" onSubmit={onSubmit}>
         <div className="input-group input-group-sm">

           {/*seach box*/}
          <button className="btn btn-sm btn-info" type="button">Reset</button>
          &nbsp;&nbsp;
          <input id="search-text" type="text" className="form-control" placeholder="search..."/>

          {/*author or title radio buttons*/}
          &nbsp;&nbsp;
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-info btn-sm active">
              <input type="radio" name="search-rbtns" id="author-rbtn" value="author" autoComplete="off" checked />
              <label className="form-check-label" htmlFor="author-rbtn">author</label>
            </label>
            <label className="btn btn-info btn-sm">
              <input type="radio" name="search-rbtns" id="title-rbtn" value="title" autoComplete="off" />
              <label className="form-check-label" htmlFor="title-rbtn">title</label>
            </label>
            <label className="btn btn-info btn-sm">
              <input type="radio" name="search-rbtns" id="desc-rbtn" value="description" autoComplete="off" />
              <label className="form-check-label" htmlFor="title-rbtn">description</label>
            </label>
          </div>

          {/*<div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="search-rbtn" id="author-rbtn" value="author-rbtn" />
            <label className="form-check-label" htmlFor="author-rbtn">author</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="search-rbtn" id="title-rbtn" value="title-rbtn" />
            <label className="form-check-label" htmlFor="title-rbtn">title</label>
          </div>*/}

         </div> {/*input-group*/}
       </form>
    </div>
  </div>
);

  return (
    <div>
      <div id="search-bar" className="navbar bg-secondary text-light">
        {/*<form onSubmit={this.onSubmit}>*/}
        <form id="myform" onSubmit={onSubmit}>

          <div className="input-group input-group-sm">

            <button className="btn btn-sm btn-info" type="button">Reset</button>
            &nbsp;&nbsp;
            {/*search box*/}
            {/*<div className="input-group-prepend">
              <span className="input-group-text" id="search-btn">Search:</span>
            </div>*/}
            <input id="search-text" type="text" className="form-control" placeholder="search"/>

            {/* author/title radio buttons */}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {/*<div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="search-rbtn" id="author-rbtn" value="author-rbtn" />
              <label className="form-check-label" htmlFor="author-rbtn">author</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="search-rbtn" id="title-rbtn" value="title-rbtn" />
              <label className="form-check-label" htmlFor="title-rbtn">title</label>
            </div>*/}

            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-outline-primary active">
                <input type="radio" name="search-rbtns" id="author-rbtn" value="author" autoComplete="off" checked />
                <label className="form-check-label" htmlFor="author-rbtn">author</label>
              </label>
              <label className="btn btn-outline-primary">
                <input type="radio" name="search-rbtns" id="title-rbtn" value="author" autoComplete="off" />
                <label className="form-check-label" htmlFor="title-rbtn">title</label>
              </label>
              {/*<label className="btn btn-secondary active">
                <input type="radio" name="search-rbtns" id="author-rbtn" autoComplete="off" checked>author</input>
              </label>
              <label className="btn btn-secondary">
                <input type="radio" name="search-rbtns" id="title-rbtn" autoComplete="off">title</input>
              </label>*/}
            </div>

          </div> {/*input-group*/}

        </form>
      </div>
    </div>
  );
};

class App extends Component {

  state = {
    search: {
      text: "ed",
      authorOrTitle: "author"
    },
  }

  render() {
    const { search } = this.state;
    return (
      <div>
        <Nav />
        <SearchBar searchState={search} />
        <p>content</p>
        <Foot />
      </div>
    );
  }
}

export default App;
