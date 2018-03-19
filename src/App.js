import React, { Component } from 'react';

import './App.css';
import LikeOrDiss from 'react-like-or-diss';
//渲染单个卡片
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
