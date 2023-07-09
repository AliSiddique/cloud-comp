"use client"
import { Provider } from "react-redux";
import { Store } from "./store";
import React from "react";
import {configuredStore} from "./store";

type Props = {
  children: React.ReactNode;
};
const storeValue = configuredStore();

const RootRedux = ({children} : Props) => (
  <Provider store={storeValue}>
    {children}
  </Provider>
);

export default RootRedux;