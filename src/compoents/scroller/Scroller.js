import React, { Component } from 'react';
import './scroller.css';
const bind = (el,type,fn)=>{
    el.addEventListener(type,fn,false);
};
const reverseEase = (y)=>{
    return 1 - Math.sqrt(1 - y * y);
};
class Scroller extends Component {
    constructor(props){
        super(props);
        this.data = [];
        for (let i = 0 ; i< 1000 ; i++)
        {
            this.data.push("我是你爸爸"+i);
        }
    }
    componentDidMount(){
        this.initEvent();
        // 可滑动的最大宽高

        this.wrapW = this.wrap.offsetWidth;
        this.wrapH = this.wrap.offsetHeight;
        this.scrollerW = this.scroller.offsetWidth;
        this.scrollerH = this.scroller.offsetHeight;
        this.deceleration = 0.0006;
        this.maxScrollX = this.wrapW - this.scrollerW;
        this.maxScrollY = this.wrapH - this.scrollerH;

        this.max = 20;
        this.scrollerStyle = this.scroller.style;
    }
    initEvent(){
        this.isTouchStart = false;
        this.preY = 0;
        this.x = 0;
        this.y = 0;
        this.disY = 0;
        bind(this.wrap,"touchstart",this);
        bind(window,"touchmove",this);
        bind(window,"touchend",this);
    }
    touchStart(evt){


        if(evt.touches.length === 1){
            // this.startX = evt.touches[0].pageX;
            // this.startY = evt.touches[0].pageY;
            this.isTouchStart = true;
            this.startTime = Date.now();
            this.startX = this.x;
            this.startY = evt.touches[0].pageY;
            this.preX = evt.touches[0].pageX;
            this.preY = evt.touches[0].pageY;
            this.distX = 0;
            this.distY = 0;

        }
    }

    touchEnd(evt){
        this.isTouchStart = false;
        this.endTime=Date.now();

        let duration = this.endTime-this.startTime;

        //小于300ms
        if(duration < 300){

            let distance = evt.changedTouches[0].pageY -  this.startY,
                speed = Math.abs(distance) / duration;

            let destination = this.y + (speed * speed) / (2 * this.deceleration) * (distance < 0 ? -1 : 1);

            if(Math.abs(destination-this.y)<=10)
                return;

            if(this.y>=this.max)
                return;
            
            console.log(speed, distance,destination);

            let d = Math.round(speed/this.deceleration);




            this.scrollTo(0,destination,d);

            // console.log("滑动动画",destination);
        }


    }



    scrollTo(destX, destY, duration){
        if(duration === void 0){
            this.scroller.style["transition-duration"] =  0 + 'ms';


        }
        else{
            this.scroller.style["transition-duration"] =  duration + 'ms';
            this.scroller.style['transition-timing-function'] = "cubic-bezier(0.1, 0.57, 0.1, 1)";
            if(destY>this.max){
                // let ratio = reverseEase((this.max - this.y) / (destY - this.y));

                this.outBounce(600);
                return;
            }


        }
        this.scroller.style['transform'] = `translate(0px,${destY}px) translateZ(0px)`;
        this.y = destY;

    }
    outBounce(duration,type=1){
        if(type===1){

            this.scroller.style["transition-duration"] =  duration + 'ms';
            this.scroller.style['transition-timing-function'] = "cubic-bezier(0.1, 0.57, 0.1, 1)";

            this.scroller.style['transform'] = `translate(0px,${this.max}px) translateZ(0px)`;

            this.y = this.max;
        }
    }
    touchMove(evt){
        if(this.isTouchStart){

            var currentX = evt.touches[0].pageX,
                currentY = evt.touches[0].pageY,
                startX = this.startX,
                startY = this.startY;

            //计算移动距离上一次的手指偏移位置

            let deltaY = currentY - this.preY;
            let deltaX = currentX = this.preX;



            this.distX += deltaX;
            this.distY += deltaY;
            const absDistX = Math.abs(this.distX);
            const absDistY = Math.abs(this.distY);


            // // 如果时间间隔相差300ms 并且 实际滚动的距离小于10像素
            // var timestamp = Date.now();
            // if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
            //
            //     return;
            // }


            if(this.y+deltaY > this.max)
                return;

            if(this.y>0 && deltaY>0){
                deltaY*=0.3;
                console.log("减慢");
            }


            let destY = this.y+deltaY;
            let destX = this.y+deltaX;



            //移动
            this.scrollTo(destX,destY);
            //记录这一次的currentY
            this.preY = currentY;
            this.preX = currentX;
        }




    }
    //处理绑定的事件
    handleEvent(evt){
        switch (evt.type){
            case 'touchstart':
                this.touchStart(evt);
                break;
            case 'touchmove':
                this.touchMove(evt);
                break;
            case 'touchend':
                this.touchEnd(evt);
                break;
            default:
                console.warn('no match event type!');
                break;
        }
    }
    render(){
        return (
            <div className="scroller-wrap"
                ref={(ref)=>{
                    this.wrap = ref;
                }}
            >
                <div
                    className="content"
                    ref={(ref)=>{
                        this.scroller = ref;
                    }}
                >
                    <ul>
                        {
                            this.data.map((item)=>{
                                return (<li>{item}</li>);
                            })
                        }


                    </ul>
                </div>
            </div>


        )
    }

}
export default Scroller;