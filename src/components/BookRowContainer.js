import React, { Component } from 'react';
import BookRow from './BookRow'
import BookRowExpanded from './BookRowExpanded'

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


export default BookRowContainer
