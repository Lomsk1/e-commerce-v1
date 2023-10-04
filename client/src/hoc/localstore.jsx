import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const LocalContext = createContext();

export const LocalContextProvider = ({ children }) => {
  const [cartLocalStorageData, setCartLocalStorageData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartLocalStorageData));
  }, [cartLocalStorageData]);

  const [cartLength, setCartLength] = useState(0);
  const [cartTiming, setCartTiming] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceNew, setTotalPriceNew] = useState(0);
  const [totalPriceOriginal, setTotalPriceOriginal] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    setCartLength(cartData?.length);
    setCartLocalStorageData(cartData);
  }, [cartTiming]);

  const cartAddLocalHandler = (data) => {
    const isExist = cartLocalStorageData.map((id) => id.id).includes(data.id);

    if (isExist) {
      return setCartLocalStorageData(cartLocalStorageData);
    } else {
      setCartLocalStorageData([...cartLocalStorageData, data]);
      localStorage.setItem("cart", JSON.stringify(cartLocalStorageData));
      setCartTiming(!cartTiming);
    }
  };

  const removeFromLocal = (id) => {
    const deleteData = cartLocalStorageData.filter((data) => data.id != id);
    setCartLocalStorageData(deleteData);
    localStorage.setItem("cart", JSON.stringify(cartLocalStorageData));

    setCartTiming(!cartTiming);
  };

  const removeAllFromLocal = () => {
    setCartLocalStorageData([]);
    localStorage.setItem("cart", JSON.stringify([]));

    setCartTiming(!cartTiming);
  };

  const increaseHandler = (id) => {
    const updateProduct = cartLocalStorageData.map((info) =>
      info.id === id
        ? {
            ...info,
            amount: info.amount + 1,
            total_price: (info.amount + 1) * info.price,
            total_new_price: (info.amount + 1) * info.new_price,
          }
        : info
    );

    setCartLocalStorageData(updateProduct);
    setCartTiming(!cartTiming);
  };

  const decreaseHandler = (id) => {
    const updateTodo = cartLocalStorageData.map((todo) => {
      if (todo.amount <= 1) {
        return todo.id === id
          ? {
              ...todo,
              amount: (todo.amount = 1),
              total_price: todo.price,
              total_new_price: todo.new_price,
            }
          : todo;
      } else {
        return todo.id === id
          ? {
              ...todo,
              amount: todo.amount - 1,
              total_price: (todo.amount - 1) * todo.price,
              total_new_price: (todo.amount - 1) * todo.new_price,
            }
          : todo;
      }
    });
    setCartLocalStorageData(updateTodo);
    setCartTiming(!cartTiming);
  };

  useEffect(() => {
    const newPrice = cartLocalStorageData
      .filter((info) => info.sale > 0)
      .map((info) => info.total_new_price);

    const originalPrice = cartLocalStorageData
      .filter((info) => info.sale === 0)
      .map((info) => info.total_price);

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
  }, [cartLocalStorageData]);

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
