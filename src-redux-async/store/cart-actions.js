import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("dummy.com/cart.json");

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        uiActions.replaceCartData({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Failed",
          message: "Failed to fetch data!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Sending...",
        message: "Sending cart data...",
      })
    );
    const sendRequest = async () => {
      const response = await fetch("dumm.com/cart.json", {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error("Sending data failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sent",
          message: "Data sent sucessfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Failed",
          message: "Sending data failed!",
        })
      );
    }
  };
};
