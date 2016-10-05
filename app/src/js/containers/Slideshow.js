import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom'

import Slide_TitleLogo from "../components/Slide_TitleLogo"
import Slide_StageEvent from "../components/Slide_StageEvent"

export default class Slideshow extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    duration: PropTypes.number
  };

  static defaultProps = {
    items: [],
    duration: 5000
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,

      startTime: 0,
      progressWidth: 0,
      liquidWidth: 0,
      animationCount: 0,
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
    const {index, liquidWidth, animationCount, progressWidth} = this.state;

    let item;
    if (this.props.items.length == 0) {
      item = null;
    } else {
      item = this.props.items[index];
    }

    // TODO: アニメーションの見直し
    var style = {
      "position": "relative",
      "width": animationCount % 2 ? progressWidth - liquidWidth : liquidWidth
    };
    style[animationCount % 2 ? "right" : "left"] = 0;

    return (
      <div className="slideshow">
        {/*<pre>{JSON.stringify(item, null, 2) }</pre>*/}
        {/*<Slide_TitleLogo />*/}
        <Slide_StageEvent
          placeName={"新町橋東公園"}
          duration={60}
          description={"遅れテストますああああああああああああああああああああああああああああ"}
          events={[
            {
              summary: "マヴェルトークショー(てすと)１",
              start: {
                dateTime: Date.now()
              },
              end: {
                dateTime: Date.now()
              }
            },
            {
              summary: "マヴェルトークショー(終日てすと)２",
              start: {
                date: Date.now()
              }
            }
          ]} />

        <div ref="progressBar" className="slideshow__progressBar">
          <span className="slideshow__progressBarText">{ index + 1 } / { this.props.items.length }</span>
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

      var liquidWidth = 0;

      if (delta > duration) {
        this._pageNext();

        liquidWidth = progressWidth;
        this.setState({
          startTime: Date.now(),
          animationCount: this.state.animationCount + 1
        })
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