import React from 'react';
import './index.css';
import TimerActionButton from './TimerActionButton';
import renderElapsedString from './helpers'

class Timer extends React.Component{
      componentDidMount(){
          this.forceUpdateInterval = setInterval(() => this.forceUpdate, 50);
      }
      componentWillMount(){
          clearInterval(this.forceUpdateInterval);
      }
      handleStartClick = () => {
            this.props.onStartClick(this.props.id);
      };
      handleStopClick = () => {
            this.props.onStopClick(this.props.id);
      };
      render(){
         const elapsedString = renderElapsedString(
                                        this.props.elapsed, 
                                        this.props.runningSince);
          return(
            <div className="timer">
                <div className="title">
                      {this.props.title}
                </div>
                <div className="project">
                      {this.props.project}
                </div>
                <div className="time">
                      {elapsedString}
                </div>
                <ul>
                    <li><i className="fa fa-trash" onClick={this.props.onClickDeleteBtn}></i></li>
                    <li><i className="fa fa-edit" onClick={this.props.onClickEditBtn}></i></li>
                </ul>
                <TimerActionButton
                     timerIsRunning={!!this.props.runningSince}
                     onStartClick= {this.handleStartClick}
                     onStopClick=  {this.handleStopClick}
                />
            </div>
          );
      }
}

export default Timer;