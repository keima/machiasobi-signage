import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom'

import Slide_TitleLogo from "../components/Slide_TitleLogo"

export default class Slideshow extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    duration: PropTypes.number
  };

  static defaultProps = {
    items: [],
    duration: 2000
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,

      startTime: 0,
      progressWidth: 0,
      liquidWidth: 0,
    }
  }

  componentDidMount() {
    this._measureProgressBar();
    this._initializeAnimation();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }



  render() {
    let item;
    if (this.props.items.length == 0) {
      item = null;
    } else {
      item = this.props.items[this.state.index];
    }

    const style = {
      "position": "relative",
      "right": 0,
      "width": this.state.liquidWidth
    };

    return (
      <div className="slideshow">
        {/*<pre>{JSON.stringify(item, null, 2) }</pre>*/}
        <Slide_TitleLogo />

        <div ref="progressBar" className="slideshow__progressBar">
          <span className="slideshow__progressBarText">{ this.state.index + 1 } / { this.props.items.length }</span>
          <div ref="progressBar__liquid" className="slideshow__progressBarLiquid" style={style}></div>
        </div>
      </div>
    )
  }

  _pageNext() {
    var index = this.state.index;
    if (this.props.items.length - 1 <= index) {
      index = 0
    } else {
      index = index + 1;
    }

    this.setState({index});
  }

  _pagePrev() {
    var index = this.state.index;
    if (index == 0) {
      index = this.props.items.length - 1;
    } else {
      index = index - 1;
    }

    this.setState({index});
  }

  _initializeAnimation() {
    cancelAnimationFrame(this.animationId);

    if (!this.state.startTime) {
      this.setState({startTime: Date.now()})
    }

    const step = () => {

      const lastTime = Date.now();
      const {startTime, progressWidth} = this.state;
      const {duration} = this.props;

      const delta = lastTime - startTime;
      // const duration = 0 // progressWidth * 1000 / duration;

      var liquidWidth = 0;

      if (delta > duration) {
        this._pageNext();

        liquidWidth = progressWidth;
        this.setState({startTime: Date.now()})
      } else {
        liquidWidth = Math.floor(delta * progressWidth / duration);
      }

      this.setState({liquidWidth});

      this.animationId = requestAnimationFrame(step);
    };

    step();
  }

  _measureProgressBar() {
    const progressBar = ReactDOM.findDOMNode(this.refs.progressBar);
    const liquid = ReactDOM.findDOMNode(this.refs.progressBar__liquid);

    if (progressBar && liquid) {
      const progressWidth = progressBar.offsetWidth;

      if (progressWidth !== this.state.progressWidth) {
        this.setState({progressWidth});
      }
    }

  }
}