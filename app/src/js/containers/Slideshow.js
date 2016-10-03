import React, {Component, PropTypes} from "react";

export default class Slideshow extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="slideshow">
        TBD... slideshow.
      </div>
    )
  }
}