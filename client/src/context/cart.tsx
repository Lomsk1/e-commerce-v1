import { ReactNode, createContext, useEffect, useState } from "react";
import { ProductType } from "../types/product";

const LocalContext = createContext<ContextType | null>(null);

type ContextType = {
  addCartLocal: (data: ProductType) => void;
  removeCartLocal: (id: string) => void;
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string) => void;
  removeAllFromLocal: () => void;
  cartLengthLocal: number;
  cartDataLocal: ProductType[];
  totalPrice: number;
};

export const LocalContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartLocalStorageData, setCartLocalStorageData] = useState<
    ProductType[] | []
  >(JSON.parse(localStorage.getItem("cart") || "[]"));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartLocalStorageData));
  }, [cartLocalStorageData]);

  const [cartLength, setCartLength] = useState<number>(0);
  const [cartTiming, setCartTiming] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalPriceNew, setTotalPriceNew] = useState<number>(0);
  const [totalPriceOriginal, setTotalPriceOriginal] = useState<number>(0);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCartData = JSON.parse(cartData);
      setCartLength(parsedCartData.length);
      setCartLocalStorageData(parsedCartData);
    }
  }, [cartTiming]);

  const cartAddLocalHandler = (data: ProductType) => {
    const isExist = cartLocalStorageData
      .map((id) => id.data.id)
      .includes(data.data.id);

    if (isExist) {
      return setCartLocalStorageData(cartLocalStorageData);
    } else {
      setCartLocalStorageData([...cartLocalStorageData, data]);
      localStorage.setItem("cart", JSON.stringify(cartLocalStorageData));
      setCartTiming(!cartTiming);
    }
  };

  const removeFromLocal = (id: string) => {
    const deleteData = cartLocalStorageData.filter(
      (data) => data.data.id != id
    );
    setCartLocalStorageData(deleteData);
    localStorage.setItem("cart", JSON.stringify(cartLocalStorageData));

    setCartTiming(!cartTiming);
  };

  const removeAllFromLocal = () => {
    setCartLocalStorageData([]);
    localStorage.setItem("cart", JSON.stringify([]));

    setCartTiming(!cartTiming);
  };

  const increaseHandler = (id: string) => {
    const updateProduct = cartLocalStorageData.map((info) =>
      info.data.id === id
        ? {
            ...info,
            amount: info.data.amount + 1,
            total_price: (info.data.amount + 1) * info.data.price,
            total_new_price: (info.data.amount + 1) * info.data.newPrice,
          }
        : info
    );

    setCartLocalStorageData(updateProduct);
    setCartTiming(!cartTiming);
  };

  const decreaseHandler = (id: string) => {
    const updateTodo = cartLocalStorageData.map((todo) => {
      if (todo.data.amount <= 1) {
        return todo.data.id === id
          ? {
              ...todo,
              amount: (todo.data.amount = 1),
              total_price: todo.data.price,
              total_new_price: todo.data.newPrice,
            }
          : todo;
      } else {
        return todo.data.id === id
          ? {
              ...todo,
              amount: todo.data.amount - 1,
              total_price: (todo.data.amount - 1) * todo.data.price,
              total_new_price: (todo.data.amount - 1) * todo.data.newPrice,
            }
          : todo;
      }
    });
    setCartLocalStorageData(updateTodo);
    setCartTiming(!cartTiming);
  };

  useEffect(() => {
    const newPrice = cartLocalStorageData
      .filter((info) => info.data.sale > 0)
      .map((info) => info.data.totalNewPrice);

    const originalPrice = cartLocalStorageData
      .filter((info) => info.data.sale === 0)
      .map((info) => info.data.totalPrice);

    if (newPrice.length > 0) {
      setTotalPriceNew(
        newPrice.reduce((acc, cur) => {
          return acc + cur;
        })
      );
    } else {
      setTotalPriceNew(0);
    }
    if (originalPrice.length > 0) {
      setTotalPriceOriginal(
        originalPrice.reduce((acc, cur) => {
          return acc + cur;
        })
      );
    } else {
      setTotalPriceOriginal(0);
    }

    setTotalPrice(totalPriceNew + totalPriceOriginal);
  }, [cartLocalStorageData, totalPriceNew, totalPriceOriginal]);

  const contextData = {
    addCartLocal: cartAddLocalHandler,
    removeCartLocal: removeFromLocal,
    increaseAmount: increaseHandler,
    decreaseAmount: decreaseHandler,
    removeAllFromLocal: removeAllFromLocal,
    cartLengthLocal: cartLength,
    cartDataLocal: cartLocalStorageData,
    totalPrice: totalPrice,
  };

  return (
    <LocalContext.Provider value={contextData}>
      {children}
    </LocalContext.Provider>
  );
};

export default LocalContext;
