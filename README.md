# 描述
模仿qq颜值配对

右滑动为喜欢

左滑动为不喜欢

已经封装成组件

**[demo](https://volankey.github.io/find-friends/demo/)**

![image](./show.gif)
## Props

Name | type | arguments | desc
---|---|---|---
moveRight | Func | index| 右滑动结束回调 传出数据索引
moveLeft | Func | index|左滑动结束回调 传出数据索引
data | Array [src:"",sign:"",name:""]||列表数据
visibleNum | Number  | |能显示的卡片个数,需要==小于data.length==
renderItem | Func | item 单个数据 | 渲染每个卡片

## 使用示例

安装组件

> **npm install react-like-or-diss --save-dev**


```
import React, { Component } from 'react';

import './App.css';
import LikeOrDiss from './compoents/LikeOrDiss/LikeOrDiss';

const ItemContent = (item)=>{
    return (
        <div className="card-item-content">
            <div>
                <img  src={item.src} alt=""/>
            </div>
            <section>
                <p className="card-name">{item.name}</p>
                <p className="card-sign">{item.sign}</p>
                <p className="card-host">volankey</p>
            </section>

        </div>

    )
};
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
                {src:require('./imgs/2.jpg'),sign:"寻找张无忌",name:"周芷若"},
                {src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1871526827,46354526&fm=27&gp=0.jpg',sign:"杀光所有坏人",name:"大表姐"},
                {src:require('./imgs/3.jpg'),sign:"hello world",name:"小姐姐"},
                {src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521382896670&di=f094b281746d72bdd4e0d757f0346830&imgtype=0&src=http%3A%2F%2Ftvax1.sinaimg.cn%2Fcrop.0.0.1080.1080.1024%2F006RKM5sly8fgwmaicn1mj30u00u00ux.jpg',sign:" 我爱歌唱",name:"冯提莫"}
            ]
        })
    }
      render() {
        return (
            <div className="bgc">
                {/*my-card-wrap 一定要有宽高 组件的宽高是充满他的*/}
                <div className="my-card-wrap">
                    <LikeOrDiss
                        data={this.state.data}
                        moveRight={(idx)=>{}}
                        moveLeft={(idx)=>{}}
                        visibleNum={3}
                        renderItem={(item)=>ItemContent(item)}
                    />
                </div>
            </div>



        );
      }
}

export default App;

```
