import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as Actions from "../actions";
import Telop from "../containers/Telop"
import SignageMaster from "../containers/SignageMaster"

@connect(
  state => ({}),
  dispatch => bindActionCreators(Actions, dispatch)
)
export default class App extends Component {
  static propTypes = {
    fetchInitialData: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

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
        <SignageMaster />
        <Telop />
        {/*<Loadingindicator />*/}
      </div>
    )
  }
}