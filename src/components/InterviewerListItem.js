import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function InterviewerListItem(props) {
    return ( <li className="interviewers__item">
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.name}
  </li>)
}