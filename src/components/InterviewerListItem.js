import React from "react";

import "components/InterviewerListItem.scss";

import classNames from "classnames";

export default function InterviewerListItem(props) {

  let itemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  let imgClass = classNames("interviewers__item-image")

    return ( <li className={itemClass} onClick={props.setInterviewer}>
    <img
      className={imgClass}
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}

  </li>)
}