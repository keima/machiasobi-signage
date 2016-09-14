/**
 * https://github.com/jasonslyvia/react-marquee
 * + requestAnimationFrame
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const FPS = 30; // 60
const STEP = 1; // 1
const TIMEOUT = 1 / FPS * 1000;

const Marquee = React.createClass({
  propTypes: {
    text: PropTypes.string,
    loop: PropTypes.bool,
    leading: PropTypes.number,
    trailing: PropTypes.number,
    className: PropTypes.string,
    callback: PropTypes.func
  },

  getDefaultProps() {
    return {
      text: '',
      loop: false,
      leading: 0,
      trailing: 0
    };
  },

  getInitialState() {
    return {
      startTime: 0,
      animatedWidth: 0,
      overflowWidth: 0
    };
  },

  componentDidMount() {
    this._measureText();
    this._startAnimation();
  },

  componentDidUpdate() {
    this._measureText();
    this._startAnimation();
  },

  componentWillUnmount() {
    cancelAnimationFrame(this._marqueeTimer);
  },

  render() {
    const style = {
      'position': 'relative',
      'right': this.state.animatedWidth,
      'whiteSpace': 'nowrap'
    };

    return (
      <div className={`ui-marquee ${this.props.className}`} style={{overflow: 'hidden'}}>
        <span ref="text" style={style} title={this.props.text}>{this.props.text}</span>
      </div>
    );
  },

  _startAnimation() {
    console.log("start animation")

    cancelAnimationFrame(this._marqueeTimer);
    const isLeading = this.state.animatedWidth === 0;
    if (!this.state.startTime) {
      this.setState({ startTime: Date.now() })
    }

    var callback = this.props.callback;

    const animate = () => {
      console.log("animate");

      const {startTime, overflowWidth} = this.state;

      let lastTime = Date.now();

      // 時間差分(⊿t) / 1fpsあたり時間 を 全体フレーム数 で 割った余り = いまどこか
      let animatedWidth = Math.floor( (lastTime - startTime) / (1000 / FPS) % overflowWidth );
//        this.state.animatedWidth + STEP;

      const isRoundOver = animatedWidth > overflowWidth;

      if (isRoundOver) {
        if (callback) {
          callback();
          callback = null;
        }

        if (this.props.loop) {
          animatedWidth = 0;
        }
        else {
          return;
        }
      }

      if (isRoundOver && this.props.trailing) {
        setTimeout(() => {
          this.setState({
            animatedWidth
          });

          this._marqueeTimer = requestAnimationFrame(animate);
        }, this.props.trailing);
      }
      else {
        this.setState({
          animatedWidth
        });

        this._marqueeTimer = requestAnimationFrame(animate);
      }
    };

    if (isLeading) {
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, this.props.leading)
    } else {
      requestAnimationFrame(animate);
    }
  },

  _measureText() {
    const container = ReactDOM.findDOMNode(this);
    const node = ReactDOM.findDOMNode(this.refs.text);

    if (container && node) {
      const containerWidth = container.offsetWidth;
      const textWidth = node.offsetWidth;

      // const overflowWidth = textWidth - containerWidth;
      const overflowWidth = textWidth;

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({
          overflowWidth
        });
      }
    }
  }
});

module.exports = Marquee;
