import React, { useReducer } from "react";
import cartContext from "./cart-context";

const defaultcartValue = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "Add_item") {
    const existingCartitemindex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingCartitem = state.items[existingCartitemindex];
    let updatedItems;
    if (existingCartitem) {
      const updatedItem = {
        ...existingCartitem,
        amount: existingCartitem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartitemindex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalamount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalamount,
    };
  }

  if (action.type === "Remove_item") {
    const existingitemId = state.items.findIndex(item => item.id === action.id);
    const existingitem = state.items[existingitemId];
    const updatedTotalamount = state.totalAmount - existingitem.price;
    let updatedItems;
    if (existingitem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingitem, amount: existingitem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingitemId] = updatedItem;
    }

    return {
        items: updatedItems,
        totalAmount: updatedTotalamount,
      };
  }

  return defaultcartValue;
};

const CartProvider = props => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultcartValue
  );

  const addItemcartHandler = item => {
    dispatchCartState({ type: "Add_item", item: item });
  };
  const removeItemcartHandler = id => {
    dispatchCartState({ type: "Remove_item", id: id });
  };

  const cart_Context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemcartHandler,
    removeItem: removeItemcartHandler,
  };

  return (
    <cartContext.Provider value={cart_Context}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartProvider;
