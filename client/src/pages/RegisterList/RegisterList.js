import React, { useState } from "react";
import { Container, Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    acceptRegister,
    getRanking,
    getRankingPlayer,
    deleteRegister
} from "../../actions/tour";

const RegisterList = () => {
    const dispatch = useDispatch();
    const registerList = useSelector((state) => state.tour.registerList);
    const isAcceptingRegister = useSelector(
        (state) => state.tour.isAcceptingRegister
    );
    const allTeamInTour = useSelector((state) => state.tour.allTeams);

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [seeTeam, setSeeTeam] = useState(false);

    const currentYear = parseInt(new Date().getFullYear());

    const onAccepted = async (team) => {
        if (
            isAcceptingRegister ||
            allTeamInTour.some((teamInTour) => teamInTour._id === team._id)
        ) {
            await dispatch(acceptRegister(team._id));
            await dispatch(getRanking());
            await dispatch(getRankingPlayer());
            alert("Cập nhật thành công");
        } else {
            alert("Giải đấu đã bắt đầu không thể thêm đơn đăng ký");
        }
    };

    const onDelete = async (team) => {
        await dispatch(deleteRegister(team._id))
        console.log(registerList);
    };

    const onDetail = async (team) => {
        setSelectedTeam(team);
        setSeeTeam(true);
    };

    return (
        <Container className="my-5">
            <h3 className="bg-danger text-center text-white">
                Danh sách đơn đăng ký
            </h3>
            {registerList.map((team, index) => (
                <Card className="my-2">
                    <Card.Header as="h5"></Card.Header>
                    <Card.Body>
                        <Card.Title>{team.teamName}</Card.Title>
                        <Card.Text>
                            Số lượng cầu thủ: {team.playerList.length}
                        </Card.Text>
                        <Button
                            variant="primary"
                            className="mx-2"
                            onClick={() => onDetail(team)}
                        >
                            Xem chi tiết
                        </Button>
                        <Button
                            variant="primary"
                            className="mx-2"
                            onClick={() => onAccepted(team)}
                        >
                            {isAcceptingRegister
                                ? "Chấp nhận"
                                : "Chấp nhận cập nhật team"}
                        </Button>
                        <Button
                            variant="primary"
                            className="mx-2"
                            onClick={() => onDelete(team)}
                        >
                            Xóa đơn
                        </Button>
                    </Card.Body>
                </Card>
            ))}

            <Modal
                size="lg"
                show={seeTeam}
                onHide={() => setSeeTeam(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Thông tin đội
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>{`Tên đội: ${selectedTeam?.teamName}`}</Col>
                        <Col>{`Sân nhà: ${selectedTeam?.homeGround}`}</Col>
                    </Row>
                    <Row className="text-center mt-3">
                        <Col xs={1}><b>STT</b></Col>
                        <Col>
                            <b>{`Tên cầu thủ`}</b>
                        </Col>
                        <Col>
                            <b>{`Quốc tịch`}</b>
                        </Col>
                        <Col>
                            <b>{`Vị trí`}</b>
                        </Col>
                        <Col>
                            <b>{`Tuổi`}</b>
                        </Col>
                    </Row>
                    {selectedTeam?.playerList.map((player, index) => (
                        <Row key={player?.playerName} className="text-center">
                            <Col xs={1}>{index + 1}</Col>
                            <Col>{`${player?.playerName}`}</Col>
                            <Col>{`${player?.nationality}`}</Col>
                            <Col>{`${player?.playerType}`}</Col>
                            <Col>{`${
                                currentYear -
                                parseInt(player?.dayOfBirth.split()[0])
                            }`}</Col>
                        </Row>
                    ))}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default RegisterList;
