import React from "react";
import { Container } from "react-bootstrap";
import { BoldOrange } from "../style/Style";

const Footer = () => {
  return (
    <BoldOrange fluid className="position-absolute bottom-0">
      <Container fluid="xxl" className="d-flex">
        <p className="py-3 fw-bold m-auto">
          © 2022. Kimkyeongbeom4844 All right reserved
        </p>
      </Container>
    </BoldOrange>
  );
};

export default Footer;
