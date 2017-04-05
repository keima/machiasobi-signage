import React, {Component, PropTypes} from 'react';

import * as dates from "../utils/dates"

export default class Slide_StageEvent extends Component {
  static propTypes = {
    placeName: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    placeName: "",
    duration: 0,
    description: "",
    events: []
  };

  render() {
    const {placeName, duration, description, events} = this.props;

    const timetableIndices = ["現在", "次", "次の次"];

    let timeScoreClassName, statusMessage;
    if (duration > 0) {
      timeScoreClassName = "slide__stageEvent__timeScore--delayed";
      statusMessage = "遅れています"
    } else if (duration == 0) {
      timeScoreClassName = "slide__stageEvent__timeScore--ontime";
      statusMessage = "定刻通り"
    } else {
      timeScoreClassName = "slide__stageEvent__timeScore--haste";
      statusMessage = "早く進んでいます"
    }


    return (
      <div className="slide slide__stageEvent">
        <h1 className="slide__stageEvent__placeName">{ placeName }</h1>

        <div className={`slide__stageEvent__timeScore ${ timeScoreClassName }`}>

          <div className="slide__stageEvent__timeScore__time">
            <div>
              { duration }<span>分</span>
            </div>
          </div>

          <div className="slide__stageEvent__timeScore__information">
            <div className="slide__stageEvent__timeScore__status">
              { statusMessage }
            </div>
            <div className="slide__stageEvent__timeScore__message">
              { description }
            </div>
            <div className="slide__stageEvent__timeScore__caution">
              <span className="icon ion-information-circled" />遅れ・進み時間は目安です
            </div>
          </div>

        </div>

        <dl className="slide__stageEvent__timeTable">
          {(() => {
            return events.slice(0, 3).map((event, idx) => {
              const indexName = timetableIndices[idx];

              var rangeDateTimeString = "";
              if ("dateTime" in event.start) {
                rangeDateTimeString =
                  `${dates.formatTime(event.start.dateTime, "HH:mm")} 〜 ${dates.formatTime(event.end.dateTime, "HH:mm")} (予定)`;
              }

              var items = [];
              items.push(<dd className="slide__stageEvent__timeTable__index">{ indexName }</dd>);
              items.push(<dd className="slide__stageEvent__timeTable__dateTime">{ rangeDateTimeString }</dd>);
              items.push(<dt className="slide__stageEvent__timeTable__summary">{ event.summary }</dt>);
              return items;
            });
          })()}
        </dl>

      </div>
    )
  }

}