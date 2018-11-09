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
      text: document.forms.searchForm.searchText.value,
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
      text: "ed phelps",
      authorOrTitle: "author"
    },
  }

  searchCriteriaChanged = (searchCriteria) => {
    this.setState((prevState) => ({
      searchCriteria: searchCriteria,
    }))
    // log will lag one keystroke behind b/c of the async call above
    // console.log("App:searchCriteriaChanged(): ",this.state.searchCriteria);
  }

  render() {
    console.log("App:render()");
    const { searchCriteria } = this.state;
    return (
      <div>
        <Nav />
        <SearchBar searchCriteria={searchCriteria} onChangeCB={this.searchCriteriaChanged} />
        <p>content</p>
        <Foot />
      </div>
    );
  }
}

export default App;
