import React, { Component } from 'react';

import './App.css';
import LikeOrDiss from './compoents/LikeOrDiss/LikeOrDiss';
class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            data:[]
        }

    }
    componentDidMount(){
        this.setState({
            data:[
                {src:require('./imgs/1.jpg'),sign:"约吗 宝贝？",name:"你大姐"},
                {src:require('./imgs/2.jpg'),sign:"约吗 宝贝？",name:"你大姐"},
                {src:require('./imgs/3.jpg'),sign:"约吗 宝贝？",name:"你大姐"},
                {src:require('./imgs/1.jpg'),sign:"约吗 宝贝？",name:"你大姐"}
            ]
        })
    }
  render() {
    return (
        <LikeOrDiss data={this.state.data}/>
    );
  }
}

export default App;
