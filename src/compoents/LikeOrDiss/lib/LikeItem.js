'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./LikeOrDiss.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LikeItem = function (_Component) {
    _inherits(LikeItem, _Component);

    function LikeItem(props) {
        _classCallCheck(this, LikeItem);

        var _this = _possibleConstructorReturn(this, (LikeItem.__proto__ || Object.getPrototypeOf(LikeItem)).call(this, props));

        console.log(_this.props.computeStyle(_this.props.idx));
        return _this;
    }

    _createClass(LikeItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var style = this.props.computeStyle(this.props.idx);
            return _react2.default.createElement(
                'li',
                { className: 'card-item',

                    style: style,
                    onTouchStart: function onTouchStart(e) {
                        _this2.props.onTouchStart(e);
                    },
                    onTouchEnd: function onTouchEnd(e) {
                        _this2.props.onTouchEnd(e);
                    },
                    onTouchMove: function onTouchMove(e) {
                        _this2.props.onTouchMove(e);
                    },
                    onMouseDown: function onMouseDown(e) {
                        _this2.props.onMouseDown(e);
                    },
                    onMouseUp: function onMouseUp(e) {
                        _this2.props.onMouseUp(e);
                    },
                    onMouseMove: function onMouseMove(e) {
                        _this2.props.onMouseMove(e);
                    },
                    onTransitionEnd: function onTransitionEnd(e) {
                        _this2.props.onTransitionEnd(_this2.props.idx);
                    }

                },
                this.props.children
            );
        }
    }]);

    return LikeItem;
}(_react.Component);

exports.default = LikeItem;