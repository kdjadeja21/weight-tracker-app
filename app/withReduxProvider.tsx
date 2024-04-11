// hoc/withReduxProvider.tsx
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

const withReduxProvider = (WrappedComponent: React.ComponentType<any>) => {
  const WithReduxProvider: React.FC<any> = (props) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    );
  };

  return WithReduxProvider;
};

export default withReduxProvider;
