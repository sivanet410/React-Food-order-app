import React, { useContext } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import Classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = props => {
  const ctrctX = useContext(cartContext);

  const totalAmount = `$${ctrctX.totalAmount.toFixed(2)}`;
  const hasItems = ctrctX.items.length > 0;

  const itemRemoveHandler= (id)=>{
    ctrctX.removeItem(id);
  }

  const itemAddHandler=(item)=>{
    ctrctX.addItem({...item,amount:1});
  }

  const cartitems = (
    <ul className={Classes["cart-items"]}>
      {ctrctX.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={itemRemoveHandler.bind(null,item.id)}
          onAdd={itemAddHandler.bind(null,item)}
        />
        // <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartitems}
      <div className={Classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={Classes.actions}>
        <button className={Classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={Classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
