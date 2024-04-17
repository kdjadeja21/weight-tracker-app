import React from "react";

const Loading = ({ isTitle = true }: { isTitle?: boolean }) => {
  return (
    <>
      <div className="loading-container">
        {isTitle && <div className="app-title">Weight Tracking App</div>}
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
