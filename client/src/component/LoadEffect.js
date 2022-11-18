import React from "react";
import { Spinner } from "react-bootstrap";

const LoadEffect = () => {
  return (
    <div className="d-flex justify-content-center my-3">
      <Spinner animation="grow" variant="secondary"></Spinner>
      <Spinner animation="grow" variant="secondary" className="mx-3"></Spinner>
      <Spinner animation="grow" variant="secondary"></Spinner>
    </div>
  );
};

export default LoadEffect;
