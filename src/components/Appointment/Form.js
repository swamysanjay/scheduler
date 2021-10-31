import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form (props) {
  const [input, setInput] = useState(""); 
  const handleSave = function () {
    console.log("what's good", input);
    console.log("I'm saving");
  }
  const handleInput = (event) => {
    event.persist();
    setInput(event.target.value);
  }
  console.log("", input);

  console.log("Hello", props);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value = { input }
            onChange = { handleInput }
            /*
              This must be a controlled component
              your code goes here
            */
          />
        </form>
        <InterviewerList 
         interviewers = {props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger>Cancel</Button>
          <Button confirm onClick= {handleSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}