import React from "react";
import "components/InterviewerList.scss";
import InterviewListItem from "./InterviewListItem";


export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewerObject => {
    return(
      <InterviewListItem
        key={interviewerObject.id}
        name={interviewerObject.name}
        avatar={interviewerObject.avatar}
        selected={interviewerObject.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewerObject.id)} 
      />
    )
  })

  return(
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
  )
}