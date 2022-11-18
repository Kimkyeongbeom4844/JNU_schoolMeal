import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column">
        <h1>404 Not Found</h1>
        <Link to="/" className="my-5">
          <Button variant="danger">메인 페이지로 이동</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
