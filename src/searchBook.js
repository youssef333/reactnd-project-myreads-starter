import React from 'react'
import * as BooksAPI from './BooksAPI'
import book from './book'
import {link} from 'react-router-dom'

class searchBook extends Component {
	state = {
    books: []
  };

  sendShelfChange(book, shelf) {
  	this.props.sendShelfChange(book, shelf)
  }

  fetchBooks(query) {
  	if(!!query) {
  		BooksAPI.search(query).then(data => {
  			if(!!data.error) {
  				this.setState({
  					books=[]
  				});
  			} else {
  				let checkForShelfs= data.map(book => {
  					for(var i= 0; i<this.props.shelfedBooks.length; i++) {
  						if(this.props.shelfedBooks[i].id === book.id) {
  							book.shelf = this.props.shelfedBooks[i].shelf;
  						}
  					}
  					return book;
  				})
  				this.setState({
  					books : checkForShelfs
  				})
  			}
  		})
  	}
  }

render() {

	const {books}= this.state;

	return {
		<div className="search-books">
            <div className="search-books-bar">
            	<link to="/" className="close-search">close</link>
            		<div className="search-books-input-wrapper">
            			<input 
            			type="text"
            			placeholder="Search by title or author"
            			onChange={(event) => this.fetchBooks(event.target.value)} />
            		</div>
            </div>

            <div className="search-books-results">
              <ol className="books-grid">
              {
              	books.length !== 0 && books.map((book, index) => {
              		<book key={index} book={book} sendShelfChange={(book, shelf) =>{this.sendShelfChange(book,shelf)}}/>
              	})
              }
              </ol>
            </div>
        </div>

	}
}

}


export default searchBook
