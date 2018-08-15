import React, { Component } from 'react';

class book extends Component {

/*	handleChange(value) {
		this.props.sendShelfChange(this.props.book ,value)
	}
*/
	render() {
		let bookCover;
		if(!!this.props.book.imageLinks){
          bookCover = this.props.book.imageLinks.thumbnail;
      }else{
          bookCover= `url('https://placeholdit.co//i/128x193?&bg=555&fc=fff&text=BookCover')`
      }

      const style = {
      	width:127,
      	height:192,
      	backgroundImage:`url("${this.props.book.imageLinks.thumbnail}")`
      }

		return (

	  <div className="book">
	    <div className="book-top">
	      <div className="book-cover" style={style}></div>
	      	<div className="book-shelf-changer">
	        	<select 
	                 
	                onChange={(event) => this.props.handleShelfChange(
	                	this.props.book,	event.target.value
	                	)}
	                value={this.props.book.shelf}

	                >

	                      <option value="move" disabled>Move to...</option>
	                      <option value="currentlyReading">Currently Reading</option>
	                      <option value="wantToRead">Want to Read</option>
	                      <option value="read">Read</option>
	                      <option value="none">None</option>
	        	</select>
	      </div>
	    </div>
	    	<div className="book-title">{this.props.book.title}</div>
	    		<div className="book-authors">
	    			{this.props.book.authors}
	    		</div>

	  </div>

    )
  }
}
export default book