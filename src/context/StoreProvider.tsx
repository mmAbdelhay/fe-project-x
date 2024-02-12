import React, {useState, createContext} from "react";
import {UserData} from "../requests/User/get.user.request.ts";

export const MainContext = createContext(null);


const StoreProvider = (props: any) => {
    const [user, setUser] = useState<UserData>();

    return (
        <React.Fragment>
            <MainContext.Provider
                // @ts-ignore
                value={{
                    user, setUser
                }}
            >
                {props.children}
            </MainContext.Provider>
        </React.Fragment>
    );
};
export default StoreProvider;