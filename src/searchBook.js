import React , { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './book';
import { Link } from 'react-router-dom';

class searchBook extends Component {
	state = {
    query:'',
    searchedBooks:[]
  };

  updateQuery=(query) => {
    this.setState({query:query})
    this.updateSearchedBooks(query)
  }

  updateSearchedBooks = (query) => {
  	if(query) {
  	BooksAPI.search(query)
  	.then((searchedBooks) => {
  		if (searchedBooks.error) {
  			this.setState({ searchedBooks : [] })
  		} else {
  			this.setState({ searchedBooks : searchedBooks })
  		}
  		
  		})
  	} else {
  		this.setState({ searchedBooks : [] })
  	}
  }

render() {


	return (

          <div className="search-books">
            <div className="search-books-bar">
            	<Link to="/" className="close-search">close</Link>
            		<div className="search-books-input-wrapper">
            			<input 
            			type="text"
            			placeholder="Search by title or author"
            			onChange={(event) => this.updateQuery(event.target.value)}
            			value={this.state.query} 
            			/>
            		</div>
            </div>

            <div className="search-books-results">
              <ol className="books-grid">
              {
              	this.state.searchedBooks.map(searchedBook => {
              		let shelf='none';

              		return (
              			<li key={searchedBook.id} >
	              			<Book 
	              			book={searchedBook}
	              			handleShelfChange={this.props.handleShelfChange}
	              			currentShelf={shelf}
	              			/>
              			</li>
              			)
              	})
             }
              
              </ol>
            </div>
        </div>
	)
}

}


export default searchBook
