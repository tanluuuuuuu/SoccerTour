import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const User = () => {
    const user = useSelector((state) => state.user)

    return (
        <Container className="my-5">
            <h3 className="text-center bg-danger text-white">{user.username}</h3>
            <Row className="text-center">
              <Col><h5>Số điện thoại: </h5></Col>
              <Col>{user.phoneNumber}</Col>
            </Row>
            <Row className="text-center">
              <Col><h5>Loại tài khoản: </h5></Col>
              <Col>{user.role}</Col>
            </Row>
            <Row className="text-center">
              <Col><h5>Quốc tịch:  </h5></Col>
              <Col>{user.country}</Col>
            </Row>
        </Container>
    );
};

export default User;
