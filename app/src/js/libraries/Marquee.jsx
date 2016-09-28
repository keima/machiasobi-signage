import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'

export default class Marquee extends Component {

  static propTypes = {
    text: PropTypes.string,
    leading: PropTypes.number,
    trailing: PropTypes.number,
    className: PropTypes.string,
    callback: PropTypes.func
  };

  static defaultProps = {
    text: "",
    leading: 0,
    trailing: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      startTime: Date.now(),
      animatedWidth: 0,
      scrollWidth: 0,
    }
  }

  componentDidMount() {
    this._measureText();
    this._initializeAnimation();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  componentDidUpdate() {
    this._measureText();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationId);
  }

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
  }


  _initializeAnimation() {

    const VELOCITY_PER_SEC = 60; // small then slow

    cancelAnimationFrame(this.animationId);

    console.log(this.state.startTime)
    if (!this.state.startTime) {
      this.setState({startTime: Date.now()})
    }

    const step = () => {
      const lastTime = Date.now();
      const {startTime, scrollWidth} = this.state;
      const {leading, trailing} = this.props;
      var animatedWidth = 0;

      const delta = lastTime - startTime;
      const scrollDurationTime = scrollWidth * 1000 / VELOCITY_PER_SEC;

      if (delta < leading) {
        // nothing
      } else if (delta > leading + trailing + scrollDurationTime) {
        console.log(lastTime, startTime, delta, leading, trailing, scrollDurationTime);

        if (this.props.callback) {
          this.props.callback();
        }

        this.setState({
          startTime: Date.now()
        });
      } else if (delta > leading + scrollDurationTime) {
        animatedWidth = scrollWidth;
      } else {
        animatedWidth = Math.floor( (delta - leading) * ( VELOCITY_PER_SEC / 1000 ) );
      }

      this.setState({
        animatedWidth
      });

      this.animationId = requestAnimationFrame(step);
    };

    step();

  }

  _measureText() {
    const container = ReactDOM.findDOMNode(this);
    const node = ReactDOM.findDOMNode(this.refs.text);

    if (container && node) {
      // const containerWidth = container.offsetWidth;
      const textWidth = node.offsetWidth;

      // const overflowWidth = textWidth - containerWidth;
      const scrollWidth = textWidth;

      if (scrollWidth !== this.state.scrollWidth) {
        this.setState({
          scrollWidth
        });
      }
    }
  }

}