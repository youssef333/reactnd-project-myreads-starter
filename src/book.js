import React, { component } from 'react';

class book extends component {

	handleChange(value) {
		this.props.sendShelfChange(this.props.book ,value)
	}

	render() {
		let bookCover;
		if(this.props.book.imageLinks){
          bookCover =`url(${this.props.books.imageLinks.bookCover})`
      }else{
          bookCover= `url('https://placeholdit.co//i/128x193?&bg=555&fc=fff&text=BookCover')`
      }
		return (
<li>
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={style}>
      </div>
      <div className="book-shelf-changer">
        <select 
                value={this.props.info.shelf || 'none'} 
                onChange={(event) => this.handleChange(event.target.value)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>

  </div>
  </li>
    )
  }
}
export default book