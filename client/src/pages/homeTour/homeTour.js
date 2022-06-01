import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Form,
    Row,
    Col,
    Card,
    Spinner,
    Navbar,
    Nav,
    Modal,
    Alert,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { getRanking, getRankingPlayer } from "../../actions/tour.js";
import { signin, signup } from "../../actions/user.js";
import MotionHoc from "../../components/MotionHoc.js";

const initializeRegisterFormData = {
    phoneNumber: "",
    country: "",
    userName: "",
    password: "",
};

const initializeLoginFormData = {
    phoneNumber: "",
    password: "",
};

function HomeTourComponent({ isLoading }) {
    const dispatch = useDispatch();

    const tour = useSelector((state) => state.tour);
    const awayMatches = tour?.calendar?.awayMatches;
    const homeMatches = tour?.calendar?.homeMatches;

    const user = useSelector((state) => state.user);
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
    const history = useHistory();

    useEffect(() => {
        if (user.isLogin) {
            history.push("/");
        }
    }, [user]);

    const loginFormClose = () => {
        setLoginFormData(initializeLoginFormData);
        setShowLoginForm(false);
    };

    const loginFormHandleChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const erMessage = useSelector((state) => state.erMessage);
    useEffect(() => {
        if (user.isLogin) loginFormClose();
    }, [user]);
    const loginFormSubmit = async (e) => {
        e.preventDefault();
        await dispatch(signin(loginFormData));
    };

    const registerFormHandleChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    const registerFormSubmit = async (e) => {
        e.preventDefault();
        if (reenterPassword && reenterPassword === registerFormData.password) {
            await dispatch(signup(registerFormData, setIsSuccess));
        } else {
            alert("Please confirm password");
        }
    };

    const Ranking = () => {
        return (
            <Container className="mt-3">
                <h3 className="text-center bg-danger text-white">
                    Bảng xếp hạng
                    <span
                        style={{
                            fontSize: "1rem",
                            position: "absolute",
                            cursor: "pointer",
                        }}
                    >
                        <i
                            className="fa-solid fa-rotate"
                            onClick={() => dispatch(getRanking())}
                        ></i>
                    </span>
                </h3>
                <Row className="text-center">
                    <Col xs={6}>
                        <b>Tên đội bóng</b>
                    </Col>
                    <Col xs={3}>
                        <b>Hiệu số</b>
                    </Col>
                    <Col xs={3}>
                        <b>Điểm số</b>
                    </Col>
                </Row>
                {tour?.ranking?.map((team) => (
                    <Card className="mt-2" key={team.teamName}>
                        <Card.Body className="text-center">
                            <Row>
                                <Col xs={6}>{team.teamName}</Col>
                                <Col xs={3}>{team.goalDifference}</Col>
                                <Col xs={3}>{team.point}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
    };

    const RankingPlayer = () => {
        return (
            <Container className="mt-3">
                <h3 className="text-center bg-danger text-white">
                    Bảng xếp hạng cầu thủ
                    <span
                        style={{
                            fontSize: "1rem",
                            position: "absolute",
                            cursor: "pointer",
                        }}
                    >
                        <i
                            className="fa-solid fa-rotate"
                            onClick={() => dispatch(getRankingPlayer())}
                        ></i>
                    </span>
                </h3>
                <Row className="text-center">
                    <Col xs={6}>
                        <b>Tên cầu thủ</b>
                    </Col>
                    <Col xs={3}>
                        <b>Bàn thắng</b>
                    </Col>
                    <Col xs={3}>
                        <b>Kiến tạo</b>
                    </Col>
                </Row>
                {tour?.rankingPlayer?.map((player) => (
                    <Card className="mt-2" key={player.playerName}>
                        <Card.Body className="text-center">
                            <Row>
                                <Col xs={6}>{player.playerName}</Col>
                                <Col xs={3}>{player.allGoals.length}</Col>
                                <Col xs={3}>{player.allAssists.length}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
    };

    const MatchHappen = () => {
        return (
            <Container className="mt-3">
                <h3 className="text-center bg-danger text-white">
                    Lịch thi đấu
                </h3>
                {homeMatches?.map((round) =>
                    round.matches.map((match) => (
                        <Card className="mt-2" key={match?._id}>
                            <Card.Body className="text-center">
                                <Row>
                                    <Col xs={5}>{match?.team1?.teamName}</Col>
                                    <Col xs={2}>VS</Col>
                                    <Col xs={5}>{match?.team2?.teamName}</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                )}

                {awayMatches?.map((round) =>
                    round.matches.map((match) => (
                        <Card className="mt-2" key={match?._id}>
                            <Card.Body className="text-center">
                                <Row>
                                    <Col xs={5}>{match?.team1?.teamName}</Col>
                                    <Col xs={2}>VS</Col>
                                    <Col xs={5}>{match?.team2?.teamName}</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>
        );
    };

    const TourGallery = () => {
        return (
            <Container className="my-5">
                <h3 className="text-center bg-danger text-white">
                    {tour.tourName}
                </h3>
                <Row>
                    <Col xs={8}>
                        <MatchHappen />
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Ranking />
                        </Row>
                        <Row>
                            <RankingPlayer />
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    };

    return (
        <Container>
            {!user.isLogin ? (
                <>
                    <Navbar className="bg-white">
                        <Container>
                            <Navbar.Brand>Soccer Tour</Navbar.Brand>
                            <Nav>
                                <Button
                                    className="bg-danger mx-2"
                                    onClick={() => setShowLoginForm(true)}
                                >
                                    Đăng nhập
                                </Button>
                                <Button
                                    className="bg-danger"
                                    onClick={() => setShowRegisterForm(true)}
                                >
                                    Đăng ký
                                </Button>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            ) : (
                <></>
            )}
            {isLoading ? (
                <Container className="text-center">
                    <Spinner animation="grow" />
                </Container>
            ) : (
                <TourGallery />
            )}

            {/* <ModalLogin /> */}
            <Modal show={showLoginForm} onHide={() => loginFormClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {erMessage !== "" ? (
                        <Alert variant="danger">{erMessage}</Alert>
                    ) : (
                        <></>
                    )}
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
                                />
                            </Col>
                            <Col>
                                <Form.Label>Country</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={registerFormHandleChange}
                                    name="country"
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
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

const HomeTour = MotionHoc(HomeTourComponent);

export default HomeTour;
