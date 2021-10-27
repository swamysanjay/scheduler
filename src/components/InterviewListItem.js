import React from "react";
import 'components/InterviewListItem.scss';
import classNames from "classnames";

export default function InterviewListItem (props) {
  let interviewStyles = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item": !props.selected
  })

  return (
    <li className={interviewStyles} onClick={() => props.setInterviewer(props.name)}>
      <img 
        className="interviewers__item-image" 
        src={props.avatar} 
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}