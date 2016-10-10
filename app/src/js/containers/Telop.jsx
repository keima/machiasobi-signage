import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Marquee from "../libraries/Marquee";

@connect(
  state => ({
    items: state.telop.items,
    selectPos: state.telop.selectPos
  })
)
export default class Telop extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string)
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {items} = this.props;
    var message = items[0];

    return (
      <div className="telop">
        <Marquee
          text={message}
          className={"telop__marquee"}
          velocity={300}
          leading={2000}
          trailing={2000}
          callback={() => {
            console.log("Live marquee!")
          } }
        />
      </div>
    )
  }


}