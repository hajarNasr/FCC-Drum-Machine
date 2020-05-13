import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class DrumMachine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            kit: SMOOTHPIANOKIT,
            power: true,
            name: 'SMOOTHPIANOKIT',
            volume: 50,
        }
    }
    handleChangePower = (pow) =>{ 
      this.setState({power:pow, name:"SMOOTHPIANOKIT"});
   }
   handleChangeBank = (bankObj, name)=>{
    this.setState({kit:bankObj, name:name})
   }
   handlePadNameChange = (name)=>{
    this.setState({name:name});
   }
   handleChangeVolume = (value)=>{
      this.setState({volume:value, name:`Volume: ${value}`});
   }
    render(){
        return(
            <div id="drum-machine" className={this.state.power?"drum-machine":""}>
                <KeyBoard
                    kit= {this.state.kit}
                    power={this.state.power}
                    volume = {this.state.volume}
                    onPadNameChange = {this.handlePadNameChange}
                />
                <PowerBoard
                    kit= {this.state.kit}
                    power = {this.state.power}
                    name  = {this.state.name}
                    volume = {this.state.volume}
                    onChangePower={this.handleChangePower}
                    onChangeBank = {this.handleChangeBank}
                    onChangeVolume = {this.handleChangeVolume}
                />
            </div>
        );
    }
}

class KeyBoard extends React.Component{
    render(){
        const disabled = this.props.power? false: true;
        const keyPads = this.props.kit.map(obj=>
             <DrumPad
                 key = {obj.keyCode}
                 keyTrigger = {obj.keyTrigger}
                 keyCode = {obj.keyCode}
                 url = {obj.url}
                 power = {disabled}
                 name = {obj.id}
                 volume = {this.props.volume}
                 onChangePadName = {this.props.onPadNameChange}
             />
          )
        return(
            <div className="key-pads"> 
             {keyPads}
            </div>
        );
    }
}

class PowerBoard extends React.Component{
      handleChangePower = (pow) =>{ 
         this.props.onChangePower(pow);
      }
      handleChangeBank = (bankObj, name)=>{
        this.props.onChangeBank(bankObj, name)
    }
   
      render(){
        return(
          <div className={this.props.power? "power-board" : "power-only"}>
            
            {this.props.power && 
             <div className="power-bank">
                <Bank kit= {this.props.kit}
                      onCheckedChange={this.handleChangeBank}
                      />
                <Label nameToShow={this.props.name}/>  
                <VolumeBar
                  onChangeVolume = {this.props.onChangeVolume}
                />     
             </div>
            }
            <Power onCheckedChange={this.handleChangePower}/>
          </div>
        );
      }
}
class VolumeBar extends React.Component{
  handleVolumeChange = (e)=>{
    if(e.target.hasAttribute("fa-icon-value")){
      
      let faIconValue = e.target.getAttribute("fa-icon-value")
      let slidebar = document.getElementById('range');
      slidebar.value = faIconValue;

      this.props.onChangeVolume(faIconValue);
    }
    else{
    this.props.onChangeVolume(e.target.value);
    }
  }

  render(){
    return(
        <div className="slider-container">
           <i 
              className="fa fa-volume-down fa-icon" 
              aria-hidden="true"
              fa-icon-value = "0"
              onClick = {this.handleVolumeChange}
            ></i>
           <input type="range" min="0" max="100" id="range" className="slider" onChange={this.handleVolumeChange}/>
           <i className="fa fa-volume-up fa-icon"
              aria-hidden="true"
              fa-icon-value = "100"
              onClick = {this.handleVolumeChange}
              ></i>
       </div>
    );
  }
}

class Label extends React.Component{
  render(){
    return(
      <div>
         <label id="display">
            {this.props.nameToShow}
         </label>
      </div>
    );
  }
}

class Bank extends React.Component{
  handleChangeBank = () =>{ 
    let nextKit ='';
    let nextKitName = '';
    if (this.props.kit === HEATERKIT){
        nextKit= SMOOTHPIANOKIT;
        nextKitName = "SMOOTHPIANOKIT";
    }
    else{
        nextKit= HEATERKIT;
        nextKitName = "HEATERKIT";
    }
    this.props.onCheckedChange(nextKit, nextKitName);
 }
render(){
    return(
        <SwitchButton onCheckedChange={this.handleChangeBank}
                      choiceOneText="H"
                      choiceTwoText="S"  
                     />
    );
}
}

class Power extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      power: true,
    }
  }
  handleChangePower = (pow) =>{ 
      this.setState({power:pow});
      this.props.onCheckedChange(pow);
   }
  render(){
      return(
          <SwitchButton onCheckedChange={this.handleChangePower} 
                        choiceOneText="OFF"
                        choiceTwoText="ON"  
                        power = {this.state.power}
                        />
      );
  }
}
class SwitchButton extends React.Component{
  handleCheckedChange =(event)=>{
      this.props.onCheckedChange(!event.target.checked);
  }
  render(){
      let switchBtnClassNames = ["switch-btn"]
      if (!this.props.power && this.props.choiceOneText === "OFF"){
        switchBtnClassNames.push("disabled-bg");
      }
      return(
          <div>
             <label className="switch">
                <input type="checkbox" className="zero-opt" onClick={this.handleCheckedChange}/>
                <div className={switchBtnClassNames.join(" ")}>
                   <span><small>{this.props.choiceOneText}</small></span>
                   <span><small>{this.props.choiceTwoText}</small></span>
               </div>
            </label>
          </div>
      );
  }
}
class DrumPad extends React.Component{
   componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
   }
   componentWillUnmount() {
     document.removeEventListener('keydown', this.handleKeyPress);
   }
   handleKeyPress = (e) =>{
      if (e.keyCode === this.props.keyCode) {
         this.playAudio();
      }
   }
   playAudio = (e)=>{
      let audio = document.getElementById(this.props.keyTrigger);
      let btn = document.getElementById(this.props.name);
      audio.currentTime = 0;
      audio.volume = this.props.volume / 100;
      btn.classList.add('playing');
      audio.play();

      this.props.onChangePadName(this.props.name);

      setTimeout(() => btn.classList.remove('playing'), 500);
   }
    render(){
      return(
        <div>
          <button
             className="drum-pad"
             onClick={this.playAudio}
             id={this.props.name}
             disabled = {this.props.power}
          >
          {this.props.keyTrigger}
          <audio className='clip' id={this.props.keyTrigger} src={this.props.url}></audio>
          </button>
        </div>
      );
    }
}

const HEATERKIT = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

const SMOOTHPIANOKIT= [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

ReactDOM.render(<DrumMachine/>, document.getElementById('root'));