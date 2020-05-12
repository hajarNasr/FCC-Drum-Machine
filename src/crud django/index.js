import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class BookDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books:[
                { id: 1,
                  title: 'A simple book',
                  author: 'Jude Ben',
                  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud`
                },
                { id: 2,
                    title: 'The Book',
                    author: 'Jude Ben',
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud`
                },
                { id: 3,
                    title: 'A book of Secrets',
                    author: 'Jude Ben',
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud`
                },
            ]
        }
    }
    createNewBook = (book) => {
       book.id = Math.floor(Math.random()*10000);
       this.setState({books:this.state.books.concat(book)});
    }
    updateBook = (newBook) => {
        const allBooks = this.state.books.filter(item=>item.id!==newBook.id);
        allBooks.push(newBook);
        this.setState({books:allBooks});
    }
    deleteBook = (bookID) =>{
        const allBooks = this.state.books.filter(item=>item.id!==bookID);
        this.setState({books:allBooks});
    }

    render(){
        return(
            <main className="d-flex justify-content-center my-4">
                <div className="col-5">
                    <BookList
                        books={this.state.books}
                        onDeleteClick={this.deleteBook}
                        onUpdateClick = {this.updateBook}
                    >
                    </BookList>
                    <ToggleableBookForm
                       onBookCreate={this.createNewBook}
                    ></ToggleableBookForm>
                </div>
            </main>
        );
    }

}

class BookList extends React.Component{
    render(){
        const books = this.props.books.map(book=>(
            <EditableBook
             key={book.id}
             id={book.id}
             title = {book.title}
             author={book.author}
             description = {book.description}
             onDeleteClick = {this.props.onDeleteClick}
             onUpdateClick = {this.props.onUpdateClick}
            >
            </EditableBook>
        ));
        return(
            <div>
                {books}
            </div>
        );
    }
}

class EditableBook extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            inEditMode:false,
        }
    }
    enterEditMode = ()=>{
        this.setState({inEditMode:true});
    }
    leaveEditMode = ()=>{
        this.setState({inEditMode:false});
    }
    handelDelete = ()=>{
        this.props.onDeleteClick(this.props.id);
    }
    handelUpdate= (book)=>{
        this.leaveEditMode();
        book.id=this.props.id;
        this.props.onUpdateClick(book);
    }
    render(){
        const component = ()=>{
            if(this.state.inEditMode){
                return(
                    <BookForm
                      id={this.props.id}
                      title={this.props.title}
                      author = {this.props.author}
                      description = {this.props.description}
                      onCancelClick = {this.leaveEditMode}
                      onFormSubmit={this.handelUpdate}
                    >
                    </BookForm>
                );
            }
        return(
            <Book
               title={this.props.title}
               author = {this.props.author}
               description = {this.props.description}
               onEditClick = {this.enterEditMode}
               onDeleteClick={this.handelDelete}
            ></Book>
        );   
        }
        return(
            <div className="mb-3 p-4" style={{boxShadow:'0 0 10px #ccc'}}>
                {component()}
            </div>
        );
    }
}

class Book extends React.Component{
    render(){
        return (
            <div className="card" style={{width:'18rem'}}>
                  <div className="card-header d-flex justify-content-between">
          <span>
            <strong>Title: </strong>{this.props.title}
          </span>
          <div>
            <span onClick={this.props.onEditClick} className="mr-2"><i className="far fa-edit"></i></span>
            <span onClick={this.props.onDeleteClick}><i className="fas fa-trash"></i></span>
          </div>
        </div>
        <div className="card-body">
          {this.props.description}
        </div>
        <div className="card-footer">
          <strong>Author:</strong>  {this.props.author}
        </div>
            </div>
        );
    }
}

class BookForm extends React.Component {
      state = {
    
        title: this.props.title || '',
    
        author: this.props.author || '',
        description: this.props.description || ''
    
      }
    
      handleFormSubmit = (evt) => {
    
        evt.preventDefault();
        this.props.onFormSubmit({...this.state});
    
      }
    
      handleTitleUpdate = (evt) => {
    
        this.setState({title: evt.target.value});
      }
    
      handleAuthorUpdate = (evt) => {
        this.setState({author: evt.target.value});
      }
      handleDescriptionUpdate = (evt) => {
        this.setState({description: evt.target.value});
    
      }
    
      render() {
    
        const buttonText = this.props.id ? 'Update Book': 'Create Book';
    
        return (
          <form onSubmit={this.handleFormSubmit}>
    
            <div className="form-group">
    
              <label>
    
                Title
              </label>
              <input type="text" placeholder="Enter a title"
                value={this.state.title} onChange={this.handleTitleUpdate}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>
                Author
              </label>
              <input type="text" placeholder="Author's name"
                value={this.state.author} onChange={this.handleAuthorUpdate}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>
    
                Description
    
              </label>
    
              <textarea className="form-control" placeholder="Book Description"
    
                rows="5" value={this.state.description}
    
                onChange={this.handleDescriptionUpdate}
    
              >
    
                {this.state.description}
    
              </textarea>
   
            </div>
    
            <div className="form-group d-flex justify-content-between">
    
              <button type="submit" className="btn btn-md btn-primary">
    
                {buttonText}
   
              </button>
    
              <button type="button" className="btn btn-md btn-secondary" onClick={this.props.onCancelClick}>
    
                Cancel
   
              </button>
   
            </div>
    
          </form>
    
        )
  
      }
   
    }
    class ToggleableBookForm extends React.Component {
          state = {
        
            inCreateMode: false
        
          }
        
          handleCreateClick = () => {
            this.setState({inCreateMode: true});
        
          }
          leaveCreateMode = () => {
        
            this.setState({inCreateMode: false});
          }
          handleCancleClick = () => {
            this.leaveCreateMode();
          }
          handleFormSubmit = (book) => {
            this.leaveCreateMode();
        
            this.props.onBookCreate(book);
          }
        
          render() {
        
            if (this.state.inCreateMode) {
              return (
                <div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >

                  <BookForm

                    onFormSubmit={this.handleFormSubmit}

                    onCancelClick={this.handleCancleClick}></BookForm>

                </div>
        
              )
            }
            return (
              <button onClick={this.handleCreateClick} className="btn btn-secondary">
                <i className="fas fa-plus"></i>
        
              </button>
        //34
            );
       // 35
          }
      //  36
        }
        
ReactDOM.render(<BookDashboard />, document.getElementById('root'))
