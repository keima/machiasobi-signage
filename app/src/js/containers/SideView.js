import React, {Component, PropTypes} from "react";

export default class SideView extends Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      duration: PropTypes.number,
    }))
  }

  static defaultProps = {
    items: []
  }

  render() {
    return (
      <div className="sideView">
        {(()=> {
          return this.props.items.slice(0, 4).map((item, idx)=> {
            let sideViewItemClassName, statusIconClassName, statusText;
            if (item.duration < 0) {
              sideViewItemClassName = "sideView__item--haste"
              statusIconClassName = "ion-ios-information-outline"
              statusText = "早く進んでいます"
            } else if (item.duration == 0) {
              sideViewItemClassName = "sideView__item--ontime"
              statusIconClassName = "ion-android-checkmark-circle"
              statusText = "定刻通りです"
            } else if (item.duration > 0 && item.duration < 60) {
              sideViewItemClassName = "sideView__item--delay"
              statusIconClassName = "ion-alert-circled"
              statusText = "遅れています"
            } else {
              sideViewItemClassName = "sideView__item--disaster"
              statusIconClassName = "ion-fireball"
              statusText = "遅れています！"
            }

            return (
              <div className={`sideView__item ${sideViewItemClassName}`}>
                <div className="sideView__item__name">
                  <span>
                    {item.name}
                  </span>
                </div>
                <div className="sideView__item__duration">
                  <span>
                  <i className="icon ion-clock"/>
                    {Math.abs(item.duration)}<span>分</span>
                  </span>
                </div>
                <div className="sideView__item__status">
                  <span>
                  <i className={`icon ${statusIconClassName}`}/>
                    {statusText}
                  </span>
                </div>
              </div>
            )
          });
        })()}
      </div>
    )
  }
}
