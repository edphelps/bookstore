import React, { Component } from 'react';

/* ********************************************
*  SearchBar
   Displays search bar at top and notifies parent of any change
     searchCriteria -- see App state for shape
     onChangeCB -- parent callback when content changes, passing object:
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

export default SearchBar
