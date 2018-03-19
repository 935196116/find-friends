'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./LikeOrDiss.css');

var _LikeItem = require('./LikeItem');

var _LikeItem2 = _interopRequireDefault(_LikeItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
*   左滑右滑 你喜欢谁？
*   需要传入两个props
*   visibleNum={3}
*   data Array [{src:"",sign:"",name:""}]可以自己定制嘛~~~
*
* ！！注意！！visibleNum需要小于data.length
*  by volankey
*/

var LikeOrDiss = function (_Component) {
    _inherits(LikeOrDiss, _Component);

    function LikeOrDiss(props) {
        _classCallCheck(this, LikeOrDiss);

        var _this = _possibleConstructorReturn(this, (LikeOrDiss.__proto__ || Object.getPrototypeOf(LikeOrDiss)).call(this, props));

        console.log(_this.props.children);
        _this.state = {

            slideValue: {
                w: 0,
                h: 0
            }

        };
        _this.tmpData = {
            isTracking: false,
            isAnimating: false
            // isMovingGround:false,

        };
        _this.basicData = {
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            },
            currentPage: 0

        };

        return _this;
    }
    //计算z轴 包括z-index 和 translateZ值


    _createClass(LikeOrDiss, [{
        key: 'computeZ',
        value: function computeZ(idx) {
            //具体方法是算步长，算出 每个idx 与 currentPage 步长（从currentPage向右走）
            var vis = this.props.visibleNum;
            var z = 10; //z-index
            if (idx === this.basicData.currentPage) {
                z = 10;
                var _tranZ = 0;
                return {
                    z: z,
                    tranZ: _tranZ
                };
            } else if (idx < this.basicData.currentPage) {
                z = vis - (this.props.data.length + idx - this.basicData.currentPage);
            } else z = vis - idx + this.basicData.currentPage;

            if (z <= 0) z = -1;

            //计算z轴 translateZ值
            var tranZ = z <= -1 ? vis * -40 : (vis - z) * -40;
            return {
                z: z,
                tranZ: tranZ
            };
        }

        //计算样式，所有变化计算都在这个函数内

    }, {
        key: 'computeStyle',
        value: function computeStyle(idx) {

            var opacity = 1;

            var _computeZ = this.computeZ(idx),
                z = _computeZ.z,
                tranZ = _computeZ.tranZ;

            if (z <= 0) {
                opacity = 0;
            }

            var style = {
                transform: 'translate3d(0px, 0px, ' + tranZ + 'px) rotate(0deg)',
                zIndex: z,
                opacity: opacity
            };

            //鼠标是否在按着
            if (this.tmpData.isTracking) if (idx === this.basicData.currentPage) return this.computeMoveStyle(idx);else if (this.basicData.currentPage + this.props.visibleNum >= idx + 1) return this.computeMoveStyle(idx);
            //是否正在移除
            if (this.tmpData.isAnimating) {
                var _style = this.computeOutStyle(idx);
                if (_style) return _style;
            }

            return style;
        }
    }, {
        key: 'getPre',

        //得到当前卡片的上一个卡片索引
        value: function getPre() {
            var current = this.basicData.currentPage;
            var pre = current - 1 >= 0 ? current - 1 : this.props.data.length - 1;
            return pre;
        }
        //计算并返回鼠标移动卡片的样式

    }, {
        key: 'computeMoveStyle',
        value: function computeMoveStyle(idx) {
            var slideValue = this.state.slideValue;

            var style = {
                opacity: 1

            };
            var x = Math.abs(slideValue.w + 1) / 200;
            var y = Math.abs(slideValue.h + 1) / 200;
            x = x >= 1 ? 1 : x;
            y = y >= 1 ? 1 : y;

            //如果是第一个被移动
            if (idx === this.basicData.currentPage) {
                //计算角度，最大为6
                var rotate = slideValue.w >= 0 ? x * 6 : -x * 6;
                style.transform = 'translate3D(' + slideValue.w + 'px' + ',' + slideValue.h + 'px' + ',0px) rotate(' + rotate + 'deg)';
                style.transition = "none";
                style.zIndex = 10;
            } else {
                //改变z轴

                //这里做计算是为了 在移动 首个标签时候 剩下的两个标签放大的过程
                var _computeZ2 = this.computeZ(idx),
                    z = _computeZ2.z,
                    tranZ = _computeZ2.tranZ;
                // let tranZ = this.computeTranZ(z);


                style.transform = 'translate3D(0px,0px' + ',' + (tranZ + Math.max(x, y) * 40) + 'px)';
                style.transition = "none";
                style.zIndex = z;
                if (z <= 0) {
                    style.opacity = 0;
                }
            }
            return style;
        }
        //计算移出的样式

    }, {
        key: 'computeOutStyle',
        value: function computeOutStyle(idx) {
            if (idx === this.getPre()) {
                console.log("computeOutStyle");
                var slideValue = this.state.slideValue;

                var style = {
                    opacity: 0,
                    zIndex: 11 //应该将移出去的卡片 层级设为最高的

                };
                style.transform = 'translate3D(' + slideValue.w + 'px' + ',' + slideValue.h + 'px' + ',0px)';

                return style;
            }
            return null;
        }
        //监听transion是否结束，当移出去的那张卡片完成移出动画300ms后将他移到初始位置

    }, {
        key: 'animateEnd',
        value: function animateEnd(idx) {

            if (this.tmpData.isAnimating === true && idx === this.getPre()) {
                // console.log("animateEnd");
                this.tmpData.isAnimating = false;

                //调用
                if (this.state.slideValue.w > 0) {
                    this.props.moveRight(idx);
                } else {
                    this.props.moveLeft(idx);
                }

                this.setState({
                    slideValue: {
                        w: 0, h: 0
                    }
                });
            }
        }
        //移出当前卡片，并将 当前卡片索引置为下一个

    }, {
        key: 'moveOut',
        value: function moveOut(w, h) {
            // console.log("moveOUt移出");
            this.tmpData.isTracking = false;
            this.tmpData.isAnimating = true;

            this.setState({
                slideValue: {
                    w: w, h: h
                }

            });

            this.basicData.currentPage = (this.basicData.currentPage + 1) % this.props.data.length;
        }
    }, {
        key: 'handleTouchEnd',
        value: function handleTouchEnd(e) {

            this.tmpData.isTracking = false;

            //判断是否移动出了边界 执行移除动画

            if (Math.abs(this.state.slideValue.w) > 100) {
                var _state$slideValue = this.state.slideValue,
                    w = _state$slideValue.w,
                    h = _state$slideValue.h;

                var radio = h / w;
                var new_w = w >= 0 ? w + 200 : w - 200;
                var new_h = h >= 0 ? Math.abs(new_w * radio) : -Math.abs(new_w * radio);

                this.moveOut(new_w, new_h);
            } else
                //没有超出边界 状态回归初始

                this.setState({

                    slideValue: {
                        w: 0,
                        h: 0
                    }

                });
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(e) {
            //防止手机浏览器的默认弹性滑动
            e.preventDefault();
            if (this.tmpData.isTracking === true) {

                //手机端
                if (e.type === 'touchmove') {

                    if (e.touches) {
                        // console.log(e.touches[0]);
                        this.basicData.end.x = e.touches[0].clientX;
                        this.basicData.end.y = e.touches[0].clientY;
                    }
                }
                //pc端
                else {
                        this.basicData.end.x = e.clientX;
                        this.basicData.end.y = e.clientY;
                    }
                // console.log("移动中:",this.basicData.end);

                //计算滑动值
                this.setState({

                    slideValue: {
                        w: this.basicData.end.x - this.basicData.start.x,
                        h: this.basicData.end.y - this.basicData.start.y
                    }

                });
            }
        }
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(e) {
            //记录开始按下的坐标
            if (this.tmpData.isTracking === true) return;
            //手机端
            if (e.type === 'touchstart') {

                if (e.touches) {

                    this.basicData.start.x = e.touches[0].clientX;
                    this.basicData.start.y = e.touches[0].clientY;
                }
            }
            //pc端
            else {

                    this.basicData.start.x = e.clientX;
                    this.basicData.start.y = e.clientY;
                }
            this.tmpData.isTracking = true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            console.log("渲染");
            return _react2.default.createElement(
                'div',
                { className: 'lapped-card center-wrap' },
                _react2.default.createElement(
                    'ul',
                    null,
                    this.props.data && this.props.data.map(function (item, idx) {
                        return _react2.default.createElement(
                            _LikeItem2.default,
                            {
                                key: idx,
                                idx: idx,
                                computeStyle: _this2.computeStyle.bind(_this2),
                                onTouchStart: function onTouchStart(e) {
                                    _this2.handleTouchStart(e);
                                },
                                onTouchEnd: function onTouchEnd(e) {
                                    _this2.handleTouchEnd(e);
                                },
                                onTouchMove: function onTouchMove(e) {
                                    _this2.handleTouchMove(e);
                                },
                                onMouseDown: function onMouseDown(e) {
                                    _this2.handleTouchStart(e);
                                },
                                onMouseUp: function onMouseUp(e) {
                                    _this2.handleTouchEnd(e);
                                },
                                onMouseMove: function onMouseMove(e) {
                                    _this2.handleTouchMove(e);
                                },
                                onTransitionEnd: function onTransitionEnd(e) {
                                    _this2.animateEnd(idx);
                                }
                            },
                            _this2.props.renderItem(item)
                        )

                        //
                        //     key={idx}
                        //     style={this.computeStyle.bind(this)(idx)}
                        //     onTouchStart={(e)=>{
                        //         this.handleTouchStart(e)
                        //     }}
                        //     onTouchEnd={(e)=>{
                        //         this.handleTouchEnd(e)
                        //     }}
                        //     onTouchMove={(e)=>{
                        //         this.handleTouchMove(e)
                        //     }}
                        //     onMouseDown={(e)=>{
                        //         this.handleTouchStart(e)
                        //     }}
                        //     onMouseUp={(e)=>{
                        //         this.handleTouchEnd(e)
                        //     }}
                        //     onMouseMove={(e)=>{
                        //         this.handleTouchMove(e)
                        //     }}
                        //     onTransitionEnd={(e)=>{
                        //         this.animateEnd(idx);
                        //     }}
                        //
                        // >
                        //     <div>
                        //         <img  src={item.src} alt=""/>
                        //     </div>
                        //     <section>
                        //         <p className="card-name">{item.name}</p>
                        //         <p className="card-sign">{item.sign}</p>
                        //     </section>
                        //
                        // </li>
                        ;
                    })
                )
            );
        }
    }]);

    return LikeOrDiss;
}(_react.Component);

exports.default = LikeOrDiss;