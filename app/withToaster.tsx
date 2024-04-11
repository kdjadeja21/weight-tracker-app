import { Toaster } from "react-hot-toast";
import React, { ComponentType } from "react";

const withToaster = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WrappedWithToaster: React.FC<P> = (props) => {
    return (
      <>
        <Toaster />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WrappedWithToaster;
};

export default withToaster;
