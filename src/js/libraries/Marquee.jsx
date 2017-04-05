import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'

const AnimStatus = {
  STANDBY: "standby",
  LEADING: "leading",
  SCROLLING: "scrolling",
  TRAILING: "trailing"
};

export default class Marquee extends Component {

  static propTypes = {
    text: PropTypes.string,
    velocity: PropTypes.number,
    leading: PropTypes.number,
    trailing: PropTypes.number,
    className: PropTypes.string,
    callback: PropTypes.func
  };

  static defaultProps = {
    text: "",
    velocity: 120,
    leading: 0,
    trailing: 0,
    className: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      startTime: Date.now(),
      animatedWidth: 0,
      scrollWidth: 0,
      animationStatus: AnimStatus.STANDBY
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
      <div className={`ui-marquee ${this.props.className} ${this.state.animationStatus}`}
           style={{overflow: 'hidden'}}>
        <span ref="text" style={style} title={this.props.text}>{this.props.text}</span>
      </div>
    );
  }


  _initializeAnimation() {
    cancelAnimationFrame(this.animationId);

    if (!this.state.startTime) {
      this.setState({startTime: Date.now()})
    }

    const step = () => {
      const lastTime = Date.now();
      const {startTime, scrollWidth} = this.state;
      const {leading, trailing, velocity} = this.props;

      var animationStatus = AnimStatus.LEADING;
      var animatedWidth = 0;

      const delta = lastTime - startTime;
      const scrollDurationTime = scrollWidth * 1000 / velocity;

      if (delta < leading) {
        animationStatus = AnimStatus.LEADING
      } else if (delta > leading + trailing + scrollDurationTime) {
        if (this.props.callback) {
          this.props.callback();
        }

        this.setState({
          startTime: Date.now()
        });
      } else if (delta > leading + scrollDurationTime) {
        animationStatus = AnimStatus.TRAILING;
        animatedWidth = scrollWidth;
      } else {
        animationStatus = AnimStatus.SCROLLING;
        animatedWidth = Math.floor( (delta - leading) * ( velocity / 1000 ) );
      }

      this.setState({
        animationStatus,
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