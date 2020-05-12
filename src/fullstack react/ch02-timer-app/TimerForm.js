import React from 'react';
import './index.css';

class TimerForm extends React.Component{
      constructor(props){
          super(props);
          this.state = {
              title: this.props.title || '',
              project: this.props.project || '',
          }
      }
      handleTitleChange = (event)=>{
          this.setState({title:event.target.value})
      }
      handleProjectChange = (event)=>{
        this.setState({project:event.target.value})
    }
    handleSubmit = () => {
        this.props.onFormSubmit({
        id: this.props.id,
        title: this.state.title,
        project: this.state.project,
        });
    };
      render(){
          const submitText = this.props.id? 'Update' : 'Create';
          return(
              <div className="margin-auto">
                  <div className='form'>
                      <div className="field">
                           <label>Title</label>
                           <input type='text' value={this.state.title} 
                                  onChange={this.handleTitleChange}></input>
                      </div>
                      <div className='field'>
                           <label>Project</label>
                           <input type='text' value={this.state.project} 
                                  onChange={this.handleProjectChange}></input>
                      </div>
                      <div className="btns">
                           <button onClick={this.handleSubmit}>{submitText}</button>
                           <button onClick={this.props.onFormClose}>Cancel</button>
                      </div>
                  </div>
              </div>
          );
      }
}

export default TimerForm;