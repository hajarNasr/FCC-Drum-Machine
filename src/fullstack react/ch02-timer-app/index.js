import React from 'react';
import ReactDOM from 'react-dom';
import EditableTimer from './EditableTimer';
import ToggleableTimerForm from './ToggleableTimerForm';
import uuid from "uuid";
import './index.css'

class EditableTimerList extends React.Component{
      render(){
          const timers = this.props.timers.map((timer)=>
            <EditableTimer
                title = {timer.title}
                key = {timer.id}
                id = {timer.id}
                project = {timer.project}
                elapsed = {timer.elapsed}
                runningSince = {timer.runningSince}
                onFormSubmit={this.props.onFormSubmit}
                onDelete = {this.props.onDelete}
                onStartClick={this.props.onStartClick}
                onStopClick={this.props.onStopClick}
            />
          )
          return(
              <div className="timer-list">
                  {timers}
              </div>
          );
      }
}
class TimerDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timers: []
        }
    }
        handleCreateFormSubmit = (timer)=>{
            this.createTimer(timer)
               
        }
        createTimer(timer){
            if (!(timer.id)){
                const newTimer = {title: timer.title,
                                  project: timer.project,
                                  id:uuid.v4(),
                                  elapsed: 5456099,
                                  runningSince: Date.now(),}
                const allTimers = [...this.state.timers, newTimer];
                this.setState({timers:allTimers});                  
            }
        }
        handleEditFormSubmit= (attrs)=>{
             this.updateTimer(attrs);
        }
        updateTimer = (attrs) =>{
            this.setState({
                timers:this.state.timers.map(timer=>{
                    if(timer.id===attrs.id){
                        return Object.assign({},
                                             timer, 
                                            {title:attrs.title, project:attrs.project})
                    }
                    else{
                        return timer
                    }
                })
            })
        }
        handleDeleteBtn = (timerID)=>{
            const newState = {...this.state};
            const stateWithoutTimer = newState.timers.filter(item=>item.id !=timerID);
            this.setState({timers: stateWithoutTimer});
        }
        handleStartClick = (timerId) => {
            this.startTimer(timerId);
        };
        handleStopClick = (timerId) => {
            this.stopTimer(timerId);
        };

        startTimer = (timerId) => {
            const now = Date.now();
            this.setState({
                   timers: this.state.timers.map((timer) => {
                   if (timer.id === timerId) {
                      return Object.assign({}, timer, {
                                    runningSince: now,});
                   } else {
                        return timer;
                   }}),
            });
        };
        stopTimer = (timerId) => {
            const now = Date.now();
            this.setState({
            timers: this.state.timers.map((timer) => {
            if (timer.id === timerId) {
                const lastElapsed = now - timer.runningSince;
                 return Object.assign({}, timer, {
                 elapsed: timer.elapsed + lastElapsed,
                 runningSince: null, });
            } else {
               return timer;
            } }),
         });};
    render(){
        return(
            <div>
               <EditableTimerList timers={this.state.timers}
                 onFormSubmit={this.handleEditFormSubmit}
                 onDelete = {this.handleDeleteBtn}
                 onStartClick={this.handleStartClick}
                 onStopClick={this.handleStopClick}
                />
               <ToggleableTimerForm
                  onFormSubmit= {this.handleCreateFormSubmit}
               />           
            </div>
        );
    }
}

ReactDOM.render(<TimerDashboard/>, document.getElementById('content'));

