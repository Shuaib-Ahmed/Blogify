import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div style={{textAlign: "center"}}>
      <InfinitySpin color="#ffead0" width="200"/>
    </div>
  );
};

export default Loading;
