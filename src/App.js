import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import bookshelf from './bookshelf'
import searchbook from './searchbook'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

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
                  <bookShelf
                  title="Currently Reading"
                  books={
                    this.state.books.filter(item => item.shelf === 'CurrentlyReading')
                  }
                  sendShelfChange={(book,shelf) => {this.handleShelfChange(book,shelf)}}
                  />

                  <bookShelf
                  title="Want to Read"
                  books={
                    this.state.books.filter(item => item.shelf === 'WantToRead')
                  }
                  sendShelfChange={(book,shelf) => {this.handleShelfChange(book,shelf)}}
                  />

                  <bookShelf
                  title="Read"
                  books={
                    this.state.books.filter(item => item.shelf === 'Read')
                  }
                  sendShelfChange={(book,shelf) => {this.handleShelfChange(book,shelf)}}
                  />

                </div>
              </div>

              <div className="open-search">
                <link to './search'>Add a book </link>
              </div>
            </div>

            )} 
          />

        </div>
  )}
}

export default BooksApp
