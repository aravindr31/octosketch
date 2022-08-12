import React from "react";
import { useLocation, useParams } from "react-router-dom";

function Data() {
  const { id } = useParams();
  return (
    <div>
      <h1>Data page</h1>
    </div>
  );
}

export default Data;
