import React, { Component } from 'react';

import './LikeOrDiss.css';

/*
*   左滑右滑 你喜欢谁？
*   需要传入两个props
*   visibleNum={3}
*   data Array [{src:"",sign:"",name:""}]可以自己定制嘛~~~
*
* ！！注意！！visibleNum需要小于data.length
*  by volankey
*/



class LikeOrDiss extends Component {
    constructor(props){

        super(props);

        this.state={

                slideValue:{
                    w:0,
                    h:0
                },


        };
        this.tmpData={
            isTracking:false,
            isAnimating:false,
            // isMovingGround:false,

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
            currentPage:0

        };


    }
    //计算z轴 包括z-index 和 translateZ值
    computeZ(idx)
    {
        //具体方法是算步长，算出 每个idx 与 currentPage 步长（从currentPage向右走）
        let vis =this.props.visibleNum;
        let z = 10;//z-index
        if(idx===this.basicData.currentPage)
        {
            z=10;
            let tranZ=0;
            return {
                z,
                tranZ
            };
        }
        else if(idx < this.basicData.currentPage)
        {
            z= vis-(this.props.data.length+idx-this.basicData.currentPage);

        }
        else
            z= vis-idx+this.basicData.currentPage;


        if(z<=0)
            z=-1;

        //计算z轴 translateZ值
        let tranZ= z<=-1?(vis*-40):(vis-z)*(-40);
        return {
            z,
            tranZ
        };
    }

    //计算样式，所有变化计算都在这个函数内
    computeStyle(idx){


        let opacity=1;


        let {z,tranZ}=this.computeZ(idx);

        if(z<=0)
        {
            opacity=0;
        }


        let style={
            transform: 'translate3d(0px, 0px, '+tranZ+'px) rotate(0deg)',
            zIndex:z,
            opacity:opacity,
        };

        //鼠标是否在按着
        if(this.tmpData.isTracking)
            if( idx === this.basicData.currentPage )
                return this.computeMoveStyle(idx);
            else if( this.basicData.currentPage+this.props.visibleNum>=idx+1)
                return this.computeMoveStyle(idx);
        //是否正在移除
        if(this.tmpData.isAnimating)
        {
            let style = this.computeOutStyle(idx);
            if(style)
                return style;
        }

        return style;
    };
    //得到当前卡片的上一个卡片索引
    getPre(){
        let current = this.basicData.currentPage;
        let pre = current-1>=0?current-1:this.props.data.length-1;
        return pre;
    }
   //计算并返回鼠标移动卡片的样式
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
            let {z,tranZ} = this.computeZ(idx);
            // let tranZ = this.computeTranZ(z);
            style.transform = 'translate3D(0px,0px' + ','+(tranZ+Math.max(x,y)*40)+'px)';
            style.transition="none";
            style.zIndex=z;
            if(z<=0)
            {
                style.opacity=0;
            }
        }
        return style;
    }
   //计算移出的样式
    computeOutStyle(idx){
        if(idx === this.getPre())
        {
            console.log("computeOutStyle")
            let {
                slideValue
            } = this.state;
            let style ={
                opacity:0,

            };
            style.transform = 'translate3D('+ slideValue.w + 'px' + ','+ slideValue.h + 'px' + ',0px)';

            return style;
        }
        return null;
    }
   //监听transion是否结束，当移出去的那张卡片完成移出动画300ms后将他移到初始位置
    animateEnd(idx){

        if(this.tmpData.isAnimating===true && idx===this.getPre())
        {
            // console.log("animateEnd");
            this.tmpData.isAnimating=false;

            // this.tmpData.isMovingGround=true;

            this.setState({
                slideValue:{
                    w:0,h:0
                },
            })
        }



    }
    //移出当前卡片，并将 当前卡片索引置为下一个
    moveOut(w,h){
        console.log("moveOUt移除");
        this.tmpData.isTracking=false;
        this.tmpData.isAnimating=true;


        this.setState({
            slideValue:{
                w,h
            },

        })
        this.basicData.currentPage = (this.basicData.currentPage+1)%this.props.data.length

    }

    handleTouchEnd(e){


        this.tmpData.isTracking=false;

        //判断是否移动出了边界 执行移除动画

        if(Math.abs(this.state.slideValue.w)>100)
        {
            let {
                w,h
            }=this.state.slideValue;
            let radio = h/w;
            let new_w = w>=0?w+200:w-200;
            let new_h = h>=0?  Math.abs(new_w*radio):-Math.abs(new_w*radio);
            
            this.moveOut(new_w,new_h);






        }
        else
        //没有超出边界 状态回归初始

        this.setState({

                slideValue:{
                    w:0,
                    h:0
                }

        });




    }
    handleTouchMove(e){
        //防止手机浏览器的默认弹性滑动
        e.preventDefault();
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

        }
    }
    handleTouchStart(e){
        //记录开始按下的坐标
        if(this.tmpData.isTracking===true)
            return;
        //手机端
        if(e.type === 'touchstart')
        {

            if(e.touches)
            {

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
        console.log("渲染");
        return (
            <div className="lapped-card-wrap">
                <div className="lapped-card">
                    <div className="center-wrap">
                        <ul>
                            {this.props.data && this.props.data.map( (item,idx) =>{
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
                                        onTransitionEnd={(e)=>{
                                            this.animateEnd(idx);
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
