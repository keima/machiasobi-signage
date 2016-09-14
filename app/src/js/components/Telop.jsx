import React, {Component, PropTypes} from "react"
import {connect} from "react-redux";

@connect(
  state => ({
    items: state.telop.items,
    selectPos: state.telop.selectPos
  })
)
export default class Telop extends Component {
  static PropTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render() {
    let {items} = this.props;
    var message = items[0] || "";

    return (
      <div>{message}</div>
    )
  }


}