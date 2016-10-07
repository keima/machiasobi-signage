import React, {Component, PropTypes} from 'react';

export default class Slide_Text extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired
  }

  static defaultProps = {
    title: "",
    content: ""
  }

  getContent() {
    return {__html: this.props.content}
  }

  render() {
    return (
      <div className="slide slide__text">
        { this.props.title ? <h1>{this.props.title}</h1> : null }
        <div className="slide__text__displayArea"
             dangerouslySetInnerHTML={this.getContent()} />
      </div>
    )
  }

}