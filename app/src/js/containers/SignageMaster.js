import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as Actions from "../actions/";
import Slideshow from "./Slideshow"
import SideView from "./SideView"

@connect(
  state => ({
    items: state.slide.items
  }),
  dispatch => bindActionCreators(Actions, dispatch)
)
export default class SignageMaster extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Slideshow items={this.props.items} />
        <SideView items={[]} />
      </div>
    );
  }

}