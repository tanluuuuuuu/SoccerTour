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
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { createTour, getRanking, getRankingPlayer } from "../../actions/tour.js";
import { signin, signup } from "../../actions/user.js";

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

const initializeTourData = {
    allTeams: [],
    players: [],
    calendar: {
        awayMatches: [],
        homeMatches: [],
    },
    tourName: "",
    maxTeam: "",
    minTeam: "",
    maxPlayerOfTeam: "",
    minPlayerOfTeam: "",
    maxForeignPlayer: "",
    maxAge: "",
    minAge: "",
    ranking: [],
};

function HomeTour({ isLoading }) {
    const dispatch = useDispatch();
    const tour = useSelector((state) => state.tour);
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

    const [tourData, setTourData] = useState(initializeTourData);

    const loginFormClose = () => {
        setLoginFormData(initializeLoginFormData);
        setShowLoginForm(false);
    };

    const loginFormHandleChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const loginFormSubmit = async (e) => {
        e.preventDefault();
        await dispatch(signin(loginFormData));
        setShowLoginForm(false);
    };

    const registerFormHandleChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    const registerFormSubmit = async (e) => {
        e.preventDefault();
        if (reenterPassword === registerFormData.password) {
            await dispatch(signup(registerFormData, setIsSuccess));
        } else {
            alert("Please confirm password");
        }
    };

    // if (Object.keys(tour).length === 0) {
    //     return (
    //         <Container className="mt-5 text-center">
    //             {/* <h3 className="text-center">Tạo giải đấu đầu tiên</h3>
    //             <Container fluid="sm">
    //                 <Form>
    //                     <Row className="mx-5 my-2">
    //                         <Col>
    //                             <Form.Label>Tên giải đấu</Form.Label>
    //                             <Form.Control
    //                                 type="text"
    //                                 name="tourName"
    //                                 onChange={handleChange}
    //                                 value={tourData.tourName}
    //                             />
    //                         </Col>
    //                     </Row>
    //                     <Row className="mx-5 my-2">
    //                         <Col>
    //                             <Form.Label>Số đội tối thiểu</Form.Label>
    //                             <Form.Control
    //                                 type="number"
    //                                 name="minTeam"
    //                                 onChange={handleChange}
    //                                 value={tourData.minTeam}
    //                             />
    //                         </Col>
    //                         <Col>
    //                             <Form.Label>Số đội tối đa</Form.Label>
    //                             <Form.Control
    //                                 type="number"
    //                                 name="maxTeam"
    //                                 onChange={handleChange}
    //                                 value={tourData.maxTeam}
    //                             />
    //                         </Col>
    //                     </Row>
    //                     <Row className="mx-5 my-2">
    //                         <Col>
    //                             <Form.Label>
    //                                 Số cầu thủ tối thiểu mỗi đội
    //                             </Form.Label>
    //                             <Form.Control
    //                                 type="number"
    //                                 name="minPlayerOfTeam"
    //                                 onChange={handleChange}
    //                                 value={tourData.minPlayerOfTeam}
    //                             />
    //                         </Col>
    //                         <Col>
    //                             <Form.Label>
    //                                 Số cầu thủ tối đa mỗi đội
    //                             </Form.Label>
    //                             <Form.Control
    //                                 type="number"
    //                                 name="maxPlayerOfTeam"
    //                                 onChange={handleChange}
    //                                 value={tourData.maxPlayerOfTeam}
    //                             />
    //                         </Col>
    //                     </Row>
    //                     <Row className="mx-5 my-2">
    //                         <Col>
    //                             <Form.Label>Độ tuổi tối thiểu</Form.Label>
    //                             <Form.Control
    //                                 type="number"
    //                                 name="minAge"
    //                                 onChange={handleChange}
    //                                 value={tourData.minAge}
    //                             />
    //                         </Col>
    //                         <Col>
    //                             <Form.Label>Độ tuổi tối đa</Form.Label>
    //                             <Form.Control
    //                                 type="number"
    //                                 name="maxAge"
    //                                 onChange={handleChange}
    //                                 value={tourData.maxAge}
    //                             />
    //                         </Col>
    //                     </Row>
    //                     <Row className="mx-5 my-2">
    //                         <Col>
    //                             <Form.Label>
    //                                 Số cầu thủ nước ngoài tối đa
    //                             </Form.Label>
    //                             <Form.Control
    //                                 type="number"
    //                                 name="maxForeignPlayer"
    //                                 onChange={handleChange}
    //                                 value={tourData.maxForeignPlayer}
    //                             />
    //                         </Col>
    //                     </Row>
    //                     <Row className="mx-5 my-2">
    //                         <Col sx={12}>
    //                             <Button
    //                                 className="text-right float-right my-2"
    //                                 type="button"
    //                                 onClick={handleSubmit}
    //                             >
    //                                 Tạo giải đấu
    //                             </Button>
    //                         </Col>
    //                     </Row>
    //                 </Form>
    //             </Container> */}
    //         </Container>
    //     );
    // }

    const Ranking = () => {
        return (
            <Container className="mt-3">
                <h3 className="text-center bg-danger text-white">
                    Bảng xếp hạng
                </h3>
                <Row className="text-center">
                    <Col>
                        <b>Tên đội bóng</b>
                    </Col>
                    <Col>
                        <b>Thắng</b>
                    </Col>
                    <Col>
                        <b>Hòa</b>
                    </Col>
                    <Col>
                        <b>Thua</b>
                    </Col>
                    <Col>
                        <b>Hiệu số</b>
                    </Col>
                    <Col>
                        <b>Điểm số</b>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button
                            className="float-right"
                            onClick={() => dispatch(getRanking())}
                        >
                            Cập nhật
                        </Button>
                    </Col>
                </Row>
                {tour.ranking.map((team) => (
                    <Card className="mt-2" key={team.teamName}>
                        <Card.Body className="text-center">
                            <Row>
                                <Col>{team.teamName}</Col>
                                <Col>{team.gameWin.length}</Col>
                                <Col>{team.gameDraw.length}</Col>
                                <Col>{team.gameLose.length}</Col>
                                <Col>{team.point}</Col>
                                <Col>{team.point}</Col>
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
                </h3>
                <Row className="text-center">
                    <Col>
                        <b>Tên cầu thủ</b>
                    </Col>
                    <Col>
                        <b>Số bàn thắng</b>
                    </Col>
                    <Col>
                        <b>Số kiến tạo</b>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button
                            className="float-right"
                            onClick={() => dispatch(getRankingPlayer())}
                        >
                            Cập nhật
                        </Button>
                    </Col>
                </Row>
                {tour.rankingPlayer.map((player) => (
                    <Card className="mt-2" key={player.playerName}>
                        <Card.Body className="text-center">
                            <Row>
                                <Col>{player.playerName}</Col>
                                <Col>{player.allGoals.length}</Col>
                                <Col>{player.allAssists.length}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
    }

    const TourGallery = () => {
        return (
            <Container className="my-5">
                <h3 className="text-center bg-danger text-white">
                    {tour.tourName}
                </h3>
                <h5>Hiện tại có {tour.allTeams.length} đội</h5>
                <h5>Hiện tại có {tour.players.length} cầu thủ</h5>
                <Ranking />
                <RankingPlayer/>
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
                            Quên mật khẩu
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
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
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
        </Container>
    );
}

export default HomeTour;
