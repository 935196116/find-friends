import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import pic from './imgs/1.png';
class App extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        this.setState({
            data:[
                {src:require('./imgs/1.jpg'),sign:"约吗 宝贝？",name:"你大姐"},
                {src:require('./imgs/2.jpg'),sign:"约吗 宝贝？",name:"你大姐"},
                {src:require('./imgs/3.jpg'),sign:"约吗 宝贝？",name:"你大姐"},
                {src:require('./imgs/4.png'),sign:"约吗 宝贝？",name:"你大姐"}
            ]
        })
    }
  render() {
    return (
      <div className="lapped-card">
          <div className="center-wrap">
              <ul>
                  {this.state.data && this.state.data.map(function (item,idx) {
                      let z = 3,opacity=1,tranZ=0;
                      if(idx===0)
                          z=10;
                      else
                          z=z-idx;
                      if(idx>2)
                      {
                          opacity=0;
                          tranZ = -120;
                      }
                      else
                          tranZ = -idx*40;
                      return(
                          <li key={idx} style={{transform: 'translate3d(0px, 0px, '+tranZ+'px) rotate(0deg)',zIndex:z,opacity:opacity}}>
                              <div>
                                  <img  src={item.src} alt=""/>
                              </div>
                              <section>
                                  <p className="card-name">{item.name}</p>
                                  <p className="card-sign">{item.sign}</p>
                              </section>

                          </li>
                      )
                  })}

              </ul>
          </div>
      </div>
    );
  }
}

export default App;
