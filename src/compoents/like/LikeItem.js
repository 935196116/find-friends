import React, { Component } from 'react';

import './LikeOrDiss.css';
class LikeItem extends Component {
    constructor(props) {

        super(props);
        console.log(this.props.computeStyle(this.props.idx));
    }
    render(){
        let style = this.props.computeStyle(this.props.idx);
        return(

            <li className="card-item"

                style={style}
                onTouchStart={(e)=>{
                    this.props.onTouchStart(e)
                }}
                onTouchEnd={(e)=>{
                    this.props.onTouchEnd(e)
                }}
                onTouchMove={(e)=>{
                    this.props.onTouchMove(e)
                }}
                onMouseDown={(e)=>{
                    this.props.onMouseDown(e)
                }}
                onMouseUp={(e)=>{
                    this.props.onMouseUp(e)
                }}
                onMouseMove={(e)=>{
                    this.props.onMouseMove(e)
                }}
                onTransitionEnd={(e)=>{
                    this.props.onTransitionEnd(this.props.idx);
                }}

            >


                {this.props.children}

            </li>

        )
    }


}
export default LikeItem;