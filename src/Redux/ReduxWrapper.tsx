"use client";
import { Provider } from "react-redux";

import { ReactNode } from "react";
import { store } from "./app/store";

interface ReduxWrapperProps {
    children: ReactNode;
}
const ReduxWrapper: React.FC<ReduxWrapperProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;