import React from "react";
import {
    Container,
    Navbar,
    Row,
    Col,
    Button,
    Modal,
    Form,
} from "react-bootstrap";
import "./HomePage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { signin, signup } from "../../actions/user.js";

const initializeRegisterFormData = {
    phoneNumber: "",
    country: "",
    userName: "",
    password: "",
};

const initializeLoginFormData = {
    userName: "",
    password: "",
};

const HomePage = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [loginFormData, setLoginFormData] = useState(initializeLoginFormData);
    const [registerFormData, setRegisterFormData] = useState(
        initializeRegisterFormData
    );
    const [reenterPassword, setReenterPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        setRegisterFormData(initializeRegisterFormData);
        setReenterPassword("");
    }, [isSuccess]);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if (isLogin) {
            history.push("/tour");
        }
    }, [isLogin]);

    const loginFormClose = () => {
        setLoginFormData(initializeLoginFormData);
        setShowLoginForm(false);
    };

    const loginFormHandleChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const loginFormSubmit = (e) => {
        e.preventDefault();
        dispatch(signin(loginFormData, setIsLogin));
    };

    const registerFormHandleChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    const registerFormSubmit = async (e) => {
        if (reenterPassword && reenterPassword === registerFormData.password) {
            await dispatch(signup(registerFormData, setIsSuccess));
        } else {
            alert("Please confirm password");
        }
    };

    return (
        <Container fluid>
            <div className="home-page"></div>
            <Navbar>
                <Container fluid>
                    <Navbar.Brand href="#home" className="text-white">
                        Soccer Tour
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button
                            variant="danger"
                            className="mx-3"
                            onClick={() => setShowLoginForm(true)}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => setShowRegisterForm(true)}
                        >
                            Đăng ký
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <ModalLogin /> */}
            <Modal show={showLoginForm} onHide={() => loginFormClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={loginFormSubmit}>
                        <Row className="my-2">
                            <Col>
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập username"
                                    name="userName"
                                    onChange={loginFormHandleChange}
                                    value={loginFormData.userName}
                                    autoFocus
                                />
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col>
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    name="password"
                                    onChange={loginFormHandleChange}
                                    value={loginFormData.password}
                                />
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col className="text-center">
                                <Button
                                    variant="danger"
                                    type="submit"
                                    className="w-100"
                                    onClick={loginFormSubmit}
                                >
                                    Đăng nhập
                                </Button>
                            </Col>
                        </Row>
                        <Row className="my-4 text-center">
                            <Col>Quên mật khẩu</Col>
                        </Row>
                        <Row className="my-4">
                            <p className="my-1">
                                <small>Đăng nhập bằng</small>
                            </p>
                            <Col>
                                <Button variant="primary" className="w-100">
                                    Facebook
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="danger" className="w-100">
                                    Google
                                </Button>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <p className="my-1">
                                <small>Chưa có tài khoản?</small>
                            </p>
                            <Col>
                                <Button
                                    variant="secondary"
                                    className="w-100"
                                    onClick={() => {
                                        loginFormClose();
                                        setShowRegisterForm(true);
                                    }}
                                >
                                    Đăng ký
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* <ModalRegister /> */}
            <Modal
                show={showRegisterForm}
                onHide={() => {
                    setShowRegisterForm(false);
                    if (isSuccess) {
                        setIsSuccess(false);
                    }
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={registerFormSubmit}>
                        <Row className="my-2">
                            <Col>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    name="phoneNumber"
                                    pattern="[0-9]{10}"
                                    value={registerFormData.phoneNumber}
                                    onChange={registerFormHandleChange}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Label>Country</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={registerFormHandleChange}
                                    name="country"
                                    required
                                >
                                    <option>Select your country</option>
                                    <option value="Việt Nam">Việt Nam</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col>
                                <Form.Label>Tên tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    name="userName"
                                    value={registerFormData.userName}
                                    onChange={registerFormHandleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col>
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    name="password"
                                    value={registerFormData.password}
                                    onChange={registerFormHandleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col>
                                <Form.Label>Xác nhận mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    name="reenterPassword"
                                    value={reenterPassword}
                                    onChange={(e) =>
                                        setReenterPassword(e.target.value)
                                    }
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col className="text-center">
                                <Button
                                    variant={isSuccess ? "primary" : "danger"}
                                    className="w-100"
                                    type="submit"
                                    disabled={isSuccess}
                                >
                                    {isSuccess
                                        ? "Đăng ký thành công"
                                        : "Xác nhận đăng ký"}
                                </Button>
                            </Col>
                        </Row>
                        {isSuccess ? (
                            <Row className="my-2">
                                <Col className="text-center">
                                    <Button
                                        variant="dark"
                                        className="w-100"
                                        onClick={() => {
                                            setShowRegisterForm(false);
                                            setShowLoginForm(true);
                                            setIsSuccess(false);
                                        }}
                                    >
                                        Đến màn hình đăng nhập
                                    </Button>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                        <Row className="my-4">
                            <p className="my-1">
                                <small>Đăng nhập bằng</small>
                            </p>
                            <Col>
                                <Button
                                    variant="primary"
                                    className="w-100"
                                    disabled={isSuccess}
                                >
                                    Facebook
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    className="w-100"
                                    disabled={isSuccess}
                                >
                                    Google
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>

            <Container
                fluid
                className="text-center text-white"
                style={{
                    position: "relative",
                }}
            >
                <h1 className="my-5">Simple Approach to Manage Tournaments!</h1>
                <p className="my-1">
                    FootballTour.com to simplify tournament management process
                    in order to save your time
                </p>
                <p className="my-1">Join us now and you will love this.</p>
                <p className="my-5">
                    FootballTour tự tin đáp ứng được những nhu cầu thể thao mà
                    người quản lí đòi hỏi với chất lượng tuyệt vời nhất. Khán
                    giả yêu thích bóng đá hoàn toàn có thể thỏa mãn đam mê của
                    mình nhờ hệ thống tra cứu và quản lí bóng đá mà chúng tôi
                    cung cấp. Chắc chắn các bạn sẽ cảm thấy hài lòng với những
                    dịch vụ được cung cấp.
                </p>

                <Row>
                    <Col>
                        <h3>1.509</h3>
                        <p>GIẢI ĐẤU</p>
                    </Col>
                    <Col>
                        <h3>40.320</h3>
                        <p>ĐỘI</p>
                    </Col>
                    <Col>
                        <h3>1.052.202</h3>
                        <p>LƯỢT XEM</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default HomePage;
