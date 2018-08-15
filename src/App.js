import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
//import BookShelf from './bookShelf'
import SearchBook from './searchBook'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MainPage from './mainPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => { this.setState({ books: books })
    })

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


    return (
      <div className="app">

        <Route exact path="/" render={(history) => (
          <MainPage books={this.state.books} handleShelfChange={this.handleShelfChange}/>
          )}
        />

        <Route path="search" render={(history) => (
          <SearchBook books={this.state.books} handleShelfChange={this.handleShelfChange}/>
          )}
        />
         
</div>
  )}
}

export default BooksApp
