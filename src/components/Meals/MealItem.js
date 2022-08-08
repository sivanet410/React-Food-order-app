import { useContext } from "react";
import cartContext from "../../store/cart-context";
import Classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = props => {
  const ctrctX = useContext(cartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addAmountHandler = amount => {
   
    const cartnewItem = {
      id: props.mealid,
      name: props.name,
      amount: amount,
      price: props.price,
    };
    ctrctX.addItem(cartnewItem);
  };

  return (
    <li className={Classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={Classes.description}>{props.description}</div>
        <div className={Classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.mealid} toaddAmount={addAmountHandler} />
      </div>
    </li>
  );
};

export default MealItem;
