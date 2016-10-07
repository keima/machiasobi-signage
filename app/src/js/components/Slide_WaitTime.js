import React, {Component, PropTypes} from 'react';

export default class Slide_WaitTime extends Component {
  static propTypes = {
    placeName: PropTypes.string.isRequired,
    items: React.PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      duration: PropTypes.number,
      message: PropTypes.string,
    }))
  };

  static defaultProps = {
    placeName: "",
    items: [],
  };

  render() {
    const {placeName, items} = this.props;

    return (
      <div className="slide slide__waitTime">
        <h1 className="slide__waitTime__placeName">{ placeName }</h1>

        <div className="slide__waitTime__timeScores">
          {(()=> {
            return items.slice(0, 2).map((item, idx) => {

              return (
                <div className="slide__waitTime__timeScore">
                  <h2>{item.name}</h2>

                  <div className="slide__waitTime__timeScore__duration">
                    只今の待ち時間
                    <div className="slide__waitTime__timeScore__duration__time">
                      約 <span>{item.duration}</span> 分
                    </div>
                  </div>

                  <div className="slide__waitTime__timeScore__message"
                       style={{"visibility": (item.message) ? "visible" : "hidden"}}>
                    {item.message}
                  </div>
                </div>
              )
            })
          })()}
        </div>

        <div className="slide__waitTime__alert">
          <p>
            <strong>待ち時間は目安です</strong><br />
            運行状況により実際の時間と異なる場合があります
          </p>
        </div>

      </div>
    )
  }

}