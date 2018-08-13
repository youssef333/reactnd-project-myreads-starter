import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './bookShelf'
import Searchbook from './searchBook'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(data => this.setState({ 
      books: data 
    }))
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      book.shelf=shelf;
      this.setState(state=>({
        books:state.books.filter(item=>item.id !== book.id).concat([book])
      }))
    })

  }

  render() {

    if(this.state.books.length === 0) {
      return null
    }

    return (
      <div className="app">
          <Route path="/search" render={({history}) =>(
            <searchbook
            sendShelfChange={(book, shelf) => (this.handleShelfChange(book,shelf))}
            shelfedBooks={this.state.books}
            />
        )} />

          <Route exact path="/" render={({history}) =>(

            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                <div>
                  <Bookshelf
                  title="Currently Reading"
                  books={
                    this.state.books.filter(item => item.shelf === 'currentlyReading')
                  }
                  sendShelfChange={(book,shelf) => {this.handleShelfChange(book,shelf)}}
                  />

                  <Bookshelf
                  title="Want to Read"
                  books={
                    this.state.books.filter(item => item.shelf === 'wantToRead')
                  }
                  sendShelfChange={(book,shelf) => {this.handleShelfChange(book,shelf)}}
                  />

                  <Bookshelf
                  title="Read"
                  books={
                    this.state.books.filter(item => item.shelf === 'read')
                  }
                  sendShelfChange={(book,shelf) => {this.handleShelfChange(book,shelf)}}
                  />

                </div>
              </div>

              <div className="open-search">
                <Link to="./searchBook">Add a book</Link>
              </div>
            </div>

            )} 
          />

        </div>
  )}
}

export default BooksApp
