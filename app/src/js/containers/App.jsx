import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as Actions from "../actions/";
import Clock from "../components/Clock"
import Telop from "../components/Telop"
import Marquee from "../libraries/Marquee"
import Marquee2 from "../libraries/Marquee2"

@connect(
  state => ({time: state.clock}),
  dispatch => bindActionCreators(Actions, dispatch)
)
export default class App extends Component {
  static propTypes = {
    syncDate: PropTypes.func.isRequired,
    fetchInitialData: PropTypes.func.isRequired,
    time: PropTypes.shape({
      hour: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.fetchInitialData();
    // this.timer = setInterval(this.props.syncDate, 1000)
  }

  componentDidUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        {/*<SignageMaster />*/}
        {/*<Clock {...this.props.time} />*/}
        {/*<Telop />*/}
        {/*<Loadingindicator />*/}
        <Marquee2
          text={"The quick brown fox jumps over the lazy dog." +
          "The quick brown fox jumps over the lazy dog." +
          "The quick brown fox jumps over the lazy dog."}
          hoverToStop={true}
          loop={true}
          leading={2000} // TODO: leading are not apply every time
          trailing={2000}
          callback={() => {console.log("Live marquee!")}}
        />
      </div>
    )
  }
}