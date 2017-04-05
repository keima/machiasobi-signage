import React, {Component, PropTypes} from 'react';

export default class Slide_Image extends Component {
  static propTypes = {
    title: PropTypes.string,
    src: PropTypes.string.isRequired
  }

  static defaultProps = {
    title: "",
    src: ""
  }

  render() {
    return (
      <div className="slide slide__image">
        { this.props.title ? <h1>{this.props.title}</h1> : null }
        <div className="slide__image__canvasArea">
          <img src={this.props.src} />
        </div>
      </div>
    )
  }

}