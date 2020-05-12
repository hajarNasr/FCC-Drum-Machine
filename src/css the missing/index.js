import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Root(props){
    return(
        <div >
           <div className="main">
              Hajar
           </div>
           <div style={{backgroundColor:'teal', width:'200px', height:'200px'}}>

           </div>

        </div>
    );
}

ReactDOM.render(<Root/>, document.getElementById('root'));