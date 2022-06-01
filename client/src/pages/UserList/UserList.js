import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../actions/user.js";
import { fetchOneTeam } from "../../actions/teams.js";
import MotionHoc from "../../components/MotionHoc.js";

const UserListComponent = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const team = useSelector((state) => state.team);
    const [teamModal, setShowTeamModal] = useState(false);

    useEffect(() => {
        if (userList.length === 0) {
            dispatch(getUserList());
        }
    });

    const onSeeTeam = async (team) => {
        console.log(`Send dispatch to see team with id ${team}`);
        await dispatch(fetchOneTeam(team));
        if (team) {
            setShowTeamModal(true);
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="text-center bg-danger text-white">
                Danh sách người dùng
            </h3>
            {userList.map((user) => (
                <Card className="my-3">
                    <Card.Header as="h5">{user.role}</Card.Header>
                    <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to
                            additional content.
                        </Card.Text>
                        {user.team ? (
                            <Button
                                variant="primary"
                                onClick={() => onSeeTeam(user.team)}
                            >
                                Xem đội
                            </Button>
                        ) : (
                            <></>
                        )}

                        <Button variant="primary" className="mx-2">
                            Cấp quyền admin
                        </Button>
                    </Card.Body>
                </Card>
            ))}

            <Modal
                size="lg"
                show={teamModal}
                onHide={() => setShowTeamModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Thông tin đội
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>{`Tên đội: ${team?.teamName}`}</Col>
                        <Col>{`Sân nhà: ${team?.homeGround}`}</Col>
                    </Row>
                    {team?.playerList.map((player) => (
                        <Row key={player?.playerName}>
                            <Col>{`Tên cầu thủ: ${player?.playerName}`}</Col>
                            <Col>{`Quốc tịch: ${player?.nationality}`}</Col>
                            <Col>{`Vị trí: ${player?.playerType}`}</Col>
                            <Col>{`Số bàn thắng: ${player?.allGoals.length}`}</Col>
                            <Col>{`Số kiến tạo: ${player?.allAssists.length}`}</Col>
                        </Row>
                    ))}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

const UserList = MotionHoc(UserListComponent)

export default UserList;
