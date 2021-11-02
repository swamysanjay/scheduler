import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {
  const schedule = props.days.map(dayObject => {
    return (
      <DayListItem
        key={dayObject.id}
        selected={dayObject.name === props.day} setDay={props.onChange} {...dayObject} />
    )
  })
  return <ul>{schedule}</ul>
}