import React from 'react';
import TimerForm from './TimerForm';
import './index.css'
class ToggleableTimerForm extends React.Component{
      constructor(props){
          super(props);
          this.state={
              isOpen: false,
          }
      }
      handleFormClose = () => {
        this.setState({ isOpen: !this.state.isOpen });
        };
        handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.setState({ isOpen: false });
        };
      render(){ 
          if(this.state.isOpen){
              return(
                  <div>
                      <TimerForm 
                          onFormSubmit={this.handleFormSubmit}
                          onFormClose={this.handleFormClose}
                      />
                  </div>
              );
          } else{
              return(
                 <div>
                 <button className="add-btn" onClick={this.handleFormClose}><i className="fa fa-plus"></i></button>
                 </div>
              );
          }
      }
}

export default ToggleableTimerForm;