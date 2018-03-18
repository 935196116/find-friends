import React, { Component } from 'react';

import './LikeOrDiss.css';





class LikeOrDiss extends Component {
    constructor(props){

        super(props);

        this.state={

                slideValue:{
                    w:0,
                    h:0
                }



        };
        this.tmpData={
            isTracking:false,
            isAnimating:false,
        };
        this.basicData={
            start:{
                x:0,
                y:0
            },
            end:{
                x:0,
                y:0
            },
            currentPage:2
        };

    }
    computeZIndex(idx)
    {
        let z =3;
        if(idx===this.basicData.currentPage)
        {
            z=10;

        }
        else if(idx < this.basicData.currentPage)
        {
            z= this.basicData.currentPage-idx;

        }
        else
            z= 3-idx+this.basicData.currentPage;
        return z;
    }
    computeTranZ(z){
        let tranZ = 0;
        if(z===10)
            tranZ=0;
        else
            tranZ = (z-3)*40;
        return tranZ;
    }
    computeStyle(idx){


        let opacity=1,tranZ=0;


        let z=this.computeZIndex(idx);

        tranZ = this.computeTranZ(z);
        // if(idx>2)
        // {
        //     opacity=0;
        //     tranZ = -120;
        // }
        // else
        //     tranZ = -idx*40;

        let style={
            transform: 'translate3d(0px, 0px, '+tranZ+'px) rotate(0deg)',
            zIndex:z,
            opacity:opacity,
        };

        if(this.tmpData.isTracking)
            if( idx === this.basicData.currentPage )
                return this.computeMoveStyle(idx);
            else if( this.basicData.currentPage+3>=idx+1)
                return this.computeMoveStyle(idx);

        return style;
    };
    computeMoveStyle (idx){
        let {
            slideValue
        } = this.state;
        let style ={
            opacity:1,

         };
        //如果是第一个被移动
        if(idx===this.basicData.currentPage){
            style.transform = 'translate3D('+ slideValue.w + 'px' + ','+ slideValue.h + 'px' + ',0px)';
            style.transition="none";
            style.zIndex=10;

        }else{
            //改变z轴
            let x = Math.abs((slideValue.w+1))/200;
            let y = Math.abs((slideValue.h+1))/200;
            x=x>=1?1:x;
            y=y>=1?1:y;
            //这里做计算是为了 在移动 首个标签时候 剩下的两个标签放大的过程
            let z = this.computeZIndex(idx);
            let tranZ = this.computeTranZ(z);
            style.transform = 'translate3D(0px,0px' + ','+(tranZ+Math.max(x,y)*40)+'px)';
            style.transition="none";
            style.zIndex=z;
        }
        return style;




    }
    componentDidMount(){

    }
    handleTouchEnd(e){


        this.tmpData.isTracking=false;

        //判断是否移动出了边界 执行移除动画

        if(Math.abs(this.state.slideValue.w)>200)
        {
            this.basicData.currentPage = (this.basicData.currentPage+1)%3;
        }

        //没有超出边界 状态回归初始

        this.setState({

                slideValue:{
                    w:0,
                    h:0
                }

        });




    }
    handleTouchMove(e){
        if(this.tmpData.isTracking===true)
        {

            //手机端
            if(e.type === 'touchmove')
            {

                if(e.touches)
                {
                    // console.log(e.touches[0]);
                    this.basicData.end.x = e.touches[0].clientX;
                    this.basicData.end.y = e.touches[0].clientY;

                }
            }
            //pc端
            else
            {
                this.basicData.end.x = e.clientX;
                this.basicData.end.y = e.clientY;

            }
            // console.log("移动中:",this.basicData.end);

            //计算滑动值
            this.setState({

                    slideValue:{
                        w:this.basicData.end.x-this.basicData.start.x,
                        h:this.basicData.end.y-this.basicData.start.y
                    }

            });
            // this.tmp.slideValue.w = this.basicData.end.x-this.basicData.start.x;
            // this.tmp.slideValue.h = this.basicData.end.y-this.basicData.start.y;

        }
    }
    handleTouchStart(e){
        if(this.tmpData.isTracking===true)
            return;
        //手机端
        if(e.type === 'touchstart')
        {

            if(e.touches)
            {
                // console.log(e.touches[0]);
                this.basicData.start.x = e.touches[0].clientX;
                this.basicData.start.y = e.touches[0].clientY;

            }
        }
        //pc端
        else
        {

            this.basicData.start.x = e.clientX;
            this.basicData.start.y = e.clientY;

        }
         this.tmpData.isTracking=true;

    }
    render() {
        return (
            <div className="lapped-card-wrap">
                <div className="lapped-card">
                    <div className="center-wrap">
                        <ul>
                            {this.props.data && this.props.data.map( (item,idx) =>{
                                // let z = 3,opacity=1,tranZ=0;
                                // if(idx===0)
                                //     z=10;
                                // else
                                //     z=z-idx;
                                // if(idx>2)
                                // {
                                //     opacity=0;
                                //     tranZ = -120;
                                // }
                                // else
                                //     tranZ = -idx*40;
                                return(
                                    <li

                                        key={idx}
                                        style={this.computeStyle.bind(this)(idx)}
                                        onTouchStart={(e)=>{
                                            this.handleTouchStart(e)
                                        }}
                                        onTouchEnd={(e)=>{
                                            this.handleTouchEnd(e)
                                        }}
                                        onTouchMove={(e)=>{
                                            this.handleTouchMove(e)
                                        }}
                                        onMouseDown={(e)=>{
                                            this.handleTouchStart(e)
                                        }}
                                        onMouseUp={(e)=>{
                                            this.handleTouchEnd(e)
                                        }}
                                        onMouseMove={(e)=>{
                                            this.handleTouchMove(e)
                                        }}

                                    >
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
