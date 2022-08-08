import React, { Fragment, useContext, useEffect, useState } from "react";
import Classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import cartContext from "../../store/cart-context";

const HeaderCartButton = props => {
  const [btnisbump, setbtnisbump] = useState(false);
  const ctrctX = useContext(cartContext);

  const cartCount = ctrctX.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);
  const { items } = ctrctX;
  const btnClasses = `${Classes.button} ${btnisbump ? Classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnisbump(true);
    const timer = setTimeout(() => {
      setbtnisbump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <Fragment>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={Classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={Classes.badge}>{cartCount}</span>
      </button>
    </Fragment>
  );
};

export default HeaderCartButton;
