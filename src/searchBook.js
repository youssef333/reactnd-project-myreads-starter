import React , { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './book'
import { Link } from 'react-router-dom'

class searchBook extends Component {
	state = {
    query:'',
    searchResult:[]
  };

  updateQuery=(query) =>{
    this.setState({query:query})
  }


  searchBooks(query) {
  	if(query) {
  		BooksAPI.search(query).then(data => {
        if(!!data.error) {
          let bookshelf= data.map(book => {
            for (var i = 0; i < this.props.books.length; i++) {
              if (this.props.books[i].id === book.id) {
                book.shelf = this.props.books[i].shelf;
              }
            }
            return book;
          })
           this.setState({
            searchResult: data
          })
  				
  			}
        else{
          this.setState({searchResult: []});  
        }

        }
      )
    }
  }
  
  handleChange = (query, event) => {
    this.updateQuery(query)
    this.searchBooks(query)
  }

  sendShelfChange(book,shelf){
           this.props.sendShelfChange(book,shelf)
       }
  	
  

render() {

	const {books}= this.state;

	return (
		<div className="search-books">
            <div className="search-books-bar">
            	<Link to="/" className="close-search">close</Link>
            		<div className="search-books-input-wrapper">
            			<input 
            			type="text"
            			placeholder="Search by title or author"
            			onChange={(event) => this.handleChange(event.target.value)} />
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

	)
}

}


export default searchBook
