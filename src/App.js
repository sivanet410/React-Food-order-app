import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "../src/store/cartProvider";

function App() {
  const [cartIsshown, setcartIsshown] = useState(false);

  const showCartHandler = () => {
    setcartIsshown(true);
  };

  const hideCartHandler = () => {
    setcartIsshown(false);
  };

  return (
    <CartProvider>
      {cartIsshown && <Cart onClose={hideCartHandler} />}
      <Header onShow={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
