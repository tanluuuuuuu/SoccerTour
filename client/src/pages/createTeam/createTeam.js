import React, { useEffect, useState, useRef } from "react";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { createTeam } from "../../actions/tour.js";

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
}

function CreateTeam() {
    const dispatch = useDispatch();
    const isOpenForRegister = useSelector(
        (state) => state.tour.isAcceptingRegister
    );

    const user = useSelector((state) => state.user)
    const userTeam = useSelector((state) => {
        let searchTeam = state.tour.allTeams.find((team) => team._id === user.team)
        if (!searchTeam)
        {
            searchTeam = state.tour.registerList.find((team) => team._id === user.team)
        } 
        return searchTeam
    })

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

    const [teamData, setTeamData] = useState((userTeam) ? userTeam : initializeTeamData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createTeam(teamData));
    };

    // const clear = () => {
    //     setTeamData({
    //         teamName: "",
    //         homeGround: "",
    //         playerList: [
    //             {
    //                 playerName: "",
    //                 teamName: "",
    //                 dayOfBirth: "",
    //                 playerType: "",
    //                 nationality: "",
    //                 numberOfGoals: 0,
    //                 numberOfAssits: 0,
    //             },
    //         ],
    //     });
    // };

    const handlePlayerChange = (index, e) => {
        let data = [...teamData.playerList];

        // if (e.target.name === "dayOfBirth")
        //     data[index][e.target.name] = Date(e.target.value);
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

    return (
        <Container className="mt-5">
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

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên đội</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên đội"
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
                            <Form.Label>Sân nhà</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên sân nhà"
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
                        <div style={{ textAlign: "center" }}>Tên cầu thủ</div>
                    </Col>
                    <Col sm={2}>
                        <div style={{ textAlign: "center" }}>Ngày sinh</div>
                    </Col>
                    <Col sm={2}>
                        <div style={{ textAlign: "center" }}>Loại cầu thủ</div>
                    </Col>
                    <Col sm={2}>
                        <div style={{ textAlign: "center" }}>Quốc tịch</div>
                    </Col>
                    <Col sm={1}>
                        <div style={{ textAlign: "center" }}>Xóa cầu thủ</div>
                    </Col>
                </Row>

                {teamData.playerList.map((player, index) => {
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
                                        <option value={"Tiền đạo"}>
                                            Tiền đạo
                                        </option>
                                        <option value={"Tiền vệ"}>
                                            Tiền vệ
                                        </option>
                                        <option value={"Hậu vệ"}>Hậu vệ</option>
                                        <option value={"Thủ môn"}>
                                            Thủ môn
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
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
                            </Col>
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
                        disabled={!isOpenForRegister}
                    >
                        +
                    </Button>
                </div>
                <div className="d-grid gap-2 mb-5">
                    <Button
                        variant="danger"
                        type="submit"
                        disabled={!isOpenForRegister}
                    >
                        Đăng ký
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default CreateTeam;
