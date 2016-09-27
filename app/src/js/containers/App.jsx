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

  constructor(props) {
    super(props);
    this.state = {
      marquee: {
        text: "",

      }
    }
  }

  componentDidMount() {
    this.props.fetchInitialData();
    // this.timer = setInterval(this.props.syncDate, 1000)
  }

  componentDidUnmount() {
    clearInterval(this.timer)
  }

  _onChangeText(e) {
    console.log(e.target)
    this.setState({marquee: {text: e.target.value}});
  }

  render() {
    return (
      <div>
        {/*<SignageMaster />*/}
        {/*<Clock {...this.props.time} />*/}
        {/*<Telop />*/}
        {/*<Loadingindicator />*/}
        <input type="text" value={this.state.marquee.text} onChange={this._onChangeText.bind(this)}/>
        <Marquee2
          text={this.state.marquee.text}
          leading={2000}
          trailing={2000}
          callback={() => {console.log("Live marquee!")} }
        />
      </div>
    )
  }
}