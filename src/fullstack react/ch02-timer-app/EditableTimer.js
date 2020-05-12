import React from 'react';
import './index.css'
import TimerForm from './TimerForm';
import Timer from './Timer';
class EditableTimer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editFormOpen: false,
        }
    }
    handleOpenCloseForm = ()=>{
        this.setState({editFormOpen:!this.state.editFormOpen})
    }
    handleSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.setState({editFormOpen: false})
    };
    handleDeleteBtn = () => {
        this.props.onDelete(this.props.id)
    }
    render(){
        if(this.state.editFormOpen){
            return(
                <TimerForm
                   id = {this.props.id}
                   title={this.props.title}
                   project={this.props.project}
                   onFormClose = {this.handleOpenCloseForm}
                   onFormSubmit={this.handleSubmit}
                />
            );
        } else{
            return(
                <Timer 
                   id = {this.props.id}
                   title={this.props.title}
                   project={this.props.project}
                   elapsed={this.props.elapsed}
                   runningSince={this.props.runningSince}
                   onClickEditBtn = {this.handleOpenCloseForm}
                   onClickDeleteBtn = {this.handleDeleteBtn}
                   onDelete = {this.handleDeleteBtn}
                   onStartClick={this.props.onStartClick}
                   onStopClick={this.props.onStopClick}
                />
            );
        }
    }

}

export default EditableTimer;