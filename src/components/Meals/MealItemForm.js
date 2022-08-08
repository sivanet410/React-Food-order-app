import React, { useRef } from "react";
import Input from "../UI/Input";
import Classes from "./MealItemForm.module.css";

const MealItemForm = props => {
  const amountRef = useRef();

  const addAmountHandler = event => {
    event.preventDefault();
    const enteredamount = amountRef.current.value;
    const enteredamountval = +enteredamount;

    if (
      enteredamount.trim().length === 0 ||
      enteredamountval < 1 ||
      enteredamountval > 5
    ) {
      return;
    }
    
    props.toaddAmount(enteredamountval);
  };

  return (
    <form className={Classes.form} onSubmit={addAmountHandler}>
      <Input
        label="Amount"
        input={{
          ref: amountRef,
          id: "amount_" + props.id,
          text: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
