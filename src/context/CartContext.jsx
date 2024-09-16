

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [product, setProduct] = useState([]);

  return (
    <CartContext.Provider value={{ product, setProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;