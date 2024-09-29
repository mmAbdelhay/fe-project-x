import React, { useState, createContext, useEffect } from "react";
import { UserData } from "../requests/User/get.user.request.ts";
import { ProjectData } from "../requests/Project/get.projects.request.ts";

export const MainContext = createContext(null);

const StoreProvider = (props: any) => {
  const [user, setUser] = useState<UserData>();
  const [cart, setCart] = useState<ProjectData[]>([]);

  const addToCart = (project: ProjectData) => {
    const isProjectInCart = cart.some((item) => item.full_name === project.full_name);
    if (!isProjectInCart) {
      sessionStorage.setItem("cart", JSON.stringify([...cart, project]));
      setCart([...cart, project]);
    }
  };

  const removeFromCart = (project: ProjectData) => {
    const updatedCart = cart.filter((item) => item.full_name !== project.full_name);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    // @ts-ignore
    const cartFromSessionStorage = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : [];
    setCart(cartFromSessionStorage);
  }, []);

  return (
    <React.Fragment>
      <MainContext.Provider
        // @ts-ignore
        value={{
          user,
          setUser,
          cart,
          addToCart,
          removeFromCart,
        }}
      >
        {props.children}
      </MainContext.Provider>
    </React.Fragment>
  );
};
export default StoreProvider;
