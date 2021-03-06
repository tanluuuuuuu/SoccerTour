import React, { useEffect, useState, useRef } from "react";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Modal,
    Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { createTeam } from "../../actions/tour.js";
import MotionHoc from "../../components/MotionHoc.js";

const initializeTeamData = {
    teamName: "",
    homeGround: "",
    playerList: [
        {
            playerName: "",
            dayOfBirth: "",
            teamName: "",
            playerType: "",
            nationality: "",
            numberOfGoals: 0,
            numberOfAssits: 0,
        },
    ],
};

function CreateTeamComponent() {
    const dispatch = useDispatch();
    const tour = useSelector((state) => state.tour);
    const user = useSelector((state) => state.user);
    const userTeam = useSelector((state) => {
        let searchTeam = state.tour.allTeams.find(
            (team) => team._id === user.team
        );
        if (!searchTeam) {
            searchTeam = state.tour.registerList.find(
                (team) => team._id === user.team
            );
        }
        console.log(searchTeam);
        return searchTeam;
    });
    const formatDate = (date) => {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
    };
    const isOpenForRegister = useSelector(
        (state) => state.tour.isAcceptingRegister
    );
    const registerList = useSelector((state) => state.tour.registerList);
    const userRegister = registerList?.filter(
        (registration) => registration.userId.toString() === user._id
    );

    const [loading, setLoading] = useState(false);

    const isInitialMount = useRef(true);
    const erMessage = useSelector((state) => state.erMessage);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (erMessage.length > 0) {
                handleShow();
                setModalHeading("Error");
                setModalNotification(`${erMessage}`);
            } else {
                handleShow();
                setModalHeading("DONE");
                setModalNotification(`Team submit successfully`);
            }
        }
    }, [erMessage]);

    const [teamData, setTeamData] = useState(
        userTeam ? userTeam : initializeTeamData
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(createTeam(teamData));
        setLoading(false);
    };

    const handlePlayerChange = (index, e) => {
        let data = [...teamData.playerList];

        data[index][e.target.name] = e.target.value;

        setTeamData({ ...teamData, playerList: data });
    };

    const addPlayerData = () => {
        let newPlayerData = {
            playerName: "",
            dayOfBirth: "",
            teamName: "",
            playerType: "",
            nationality: "",
            numberOfGoals: 0,
            numberOfAssits: 0,
        };

        setTeamData({
            ...teamData,
            playerList: [...teamData.playerList, newPlayerData],
        });
    };

    const removePlayerData = (index) => {
        const data = [...teamData.playerList];
        data.splice(index, 1);

        setTeamData({ ...teamData, playerList: data });
    };

    const [show, setShow] = useState(false);
    const [modalHeading, setModalHeading] = useState("");
    const [modalNotification, setModalNotification] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [modalTourRule, setModalTourRule] = useState(false);
    const TourRule = () => {
        return (
            <Modal show={modalTourRule} onHide={() => setModalTourRule(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Quy ?????nh gi???i ?????u</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>S??? ?????i t???i ??a: {tour.maxTeam}</p>
                    <p>S??? ?????i t???i thi???u: {tour.minTeam}</p>
                    <p>S??? c???u th??? t???i ??a m???i ?????i: {tour.maxPlayerOfTeam}</p>
                    <p>S??? c???u th??? t???i thi???u m???i ?????i: {tour.minPlayerOfTeam}</p>
                    <p>
                        S??? c???u th??? ng?????c ngo??i t???i ??a m???i ?????i:{" "}
                        {tour.maxForeignPlayer}
                    </p>
                    <p>????? tu???i t???i thi???u: {tour.minAge}</p>
                    <p>????? tu???i t???i ??a: {tour.maxAge}</p>
                    <p>??i???m s??? m???i tr???n th???ng: {tour.winPoint}</p>
                    <p>??i???m s??? m???i tr???n h??a: {tour.drawPoint}</p>
                    <p>??i???m s??? m???i tr???n thua: {tour.losePoint}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalTourRule(false)}
                    >
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <Container className="mt-5">
            <h3 className="bg-danger text-center text-white">
                ????ng k?? tham gia gi???i ?????u
            </h3>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalNotification}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <TourRule />
            <Container className="text-right">
                <Button className="mb-2" onClick={() => setModalTourRule(true)}>
                    Xem quy ?????nh gi???i ?????u
                </Button>
            </Container>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>T??n ?????i</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nh???p t??n ?????i"
                                value={teamData.teamName}
                                onChange={(e) =>
                                    setTeamData({
                                        ...teamData,
                                        teamName: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>S??n nh??</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nh???p t??n s??n nh??"
                                value={teamData.homeGround}
                                onChange={(e) =>
                                    setTeamData({
                                        ...teamData,
                                        homeGround: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={1}>
                        <div style={{ textAlign: "center" }}>STT</div>
                    </Col>
                    <Col sm={4}>
                        <div style={{ textAlign: "center" }}>T??n c???u th???</div>
                    </Col>
                    <Col sm={2}>
                        <div style={{ textAlign: "center" }}>Ng??y sinh</div>
                    </Col>
                    <Col sm={2}>
                        <div style={{ textAlign: "center" }}>Lo???i c???u th???</div>
                    </Col>
                    <Col sm={2}>
                        <div style={{ textAlign: "center" }}>Qu???c t???ch</div>
                    </Col>
                    <Col sm={1}>
                        <div style={{ textAlign: "center" }}>X??a c???u th???</div>
                    </Col>
                </Row>

                {teamData?.playerList?.map((player, index) => {
                    return (
                        <Row key={index}>
                            <Col sm={1}>
                                <Form.Group
                                    className="mb-3"
                                    style={{ textAlign: "center" }}
                                >
                                    {index + 1}
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        value={player.playerName}
                                        name="playerName"
                                        onChange={(e) =>
                                            handlePlayerChange(index, e)
                                        }
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="date"
                                        value={player.dayOfBirth}
                                        name="dayOfBirth"
                                        onChange={(e) =>
                                            handlePlayerChange(index, e)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Select
                                        onChange={(e) =>
                                            handlePlayerChange(index, e)
                                        }
                                        name="playerType"
                                        value={player.playerType}
                                    >
                                        <option value={""}></option>
                                        <option value={"Ti???n ?????o"}>
                                            Ti???n ?????o
                                        </option>
                                        <option value={"Ti???n v???"}>
                                            Ti???n v???
                                        </option>
                                        <option value={"H???u v???"}>H???u v???</option>
                                        <option value={"Th??? m??n"}>
                                            Th??? m??n
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Select
                                        onChange={(e) =>
                                            handlePlayerChange(index, e)
                                        }
                                        name="nationality"
                                        value={player.nationality}
                                        required
                                    >
                                        <option value={""}></option>
                                        <option value={"Vi???t Nam"}>
                                            Vi???t Nam
                                        </option>
                                        <option value={"N?????c ngo??i"}>
                                            N?????c ngo??i
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            {/* <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        value={player.nationality}
                                        name="nationality"
                                        onChange={(e) =>
                                            handlePlayerChange(index, e)
                                        }
                                    />
                                </Form.Group>
                            </Col> */}
                            <Col
                                sm={1}
                                className="justify-content-center text-center"
                            >
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => {
                                        removePlayerData(index);
                                    }}
                                >
                                    x
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
                <div className="d-grid mb-3">
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => {
                            addPlayerData();
                        }}
                        disabled={!isOpenForRegister && !user.team && !loading}
                    >
                        +
                    </Button>
                </div>
                <div className="d-grid gap-2 mb-5">
                    <Button
                        variant="danger"
                        type="submit"
                        disabled={!isOpenForRegister && !user.team && !loading}
                    >
                        {isOpenForRegister ? "????ng k??" : "C???p nh???t ?????i b??ng"}
                    </Button>
                </div>
            </Form>
            <div className="text-center">
                {loading ? <Spinner animation="border" /> : <></>}
            </div>

            {userRegister.length > 0 ? (
                <h3 className="text-center bg-danger text-white py-2">
                    Danh s??ch ????n ????ng k?? ??ang ch??? duy???t c???a b???n
                </h3>
            ) : (
                <></>
            )}

            {userRegister?.map((userRegister) => (
                <>
                    <Row>
                        <Col>T??n ?????i: {userRegister.teamName}</Col>
                        <Col>S??n nh??: {userRegister.homeGround}</Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <b>T??n c???u th???</b>
                        </Col>
                        <Col>
                            <b>Ng??y sinh</b>
                        </Col>
                        <Col>
                            <b>Lo???i c???u th???</b>
                        </Col>
                        <Col>
                            <b>Qu???c t???ch</b>
                        </Col>
                    </Row>
                    {userRegister.playerList.map((player) => (
                        <Row className="text-center">
                            <Col>{player.playerName}</Col>
                            <Col>{player.dayOfBirth}</Col>
                            <Col>{player.playerType}</Col>
                            <Col>{player.nationality}</Col>
                        </Row>
                    ))}
                </>
            ))}
        </Container>
    );
}

const CreateTeam = MotionHoc(CreateTeamComponent);

export default CreateTeam;
