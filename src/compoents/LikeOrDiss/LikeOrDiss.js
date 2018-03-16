import React, { Component } from 'react';

import './LikeOrDiss.css';

class LikeOrDiss extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){

    }
    render() {
        return (
            <div className="lapped-card-wrap">
                <div className="lapped-card">
                    <div className="center-wrap">
                        <ul>
                            {this.props.data && this.props.data.map(function (item,idx) {
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
            </div>

        );
    }
}

export default LikeOrDiss;
