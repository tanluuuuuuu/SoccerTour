import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { acceptRegister, getRanking, getRankingPlayer } from "../../actions/tour";

const RegisterList = () => {
    const dispatch = useDispatch();
    const registerList = useSelector((state) => state.tour.registerList)
    const onAccepted = async (team) => {
        await dispatch(acceptRegister(team._id))
        await dispatch(getRanking());
        await dispatch(getRankingPlayer());
    }
    
    return (
        <Container className="my-5">
            <h3 className="bg-danger text-center text-white">
                Danh sách đơn đăng ký
            </h3>
            {registerList.map((team) => (
                <Card className="my-2">
                <Card.Header as="h5"></Card.Header>
                <Card.Body>
                    <Card.Title>{team.teamName}</Card.Title>
                    <Card.Text>
                        Số lượng cầu thủ: {team.playerList.length}
                    </Card.Text>
                    <Button variant="primary" className="mx-2" onClick={() => onAccepted(team)}>
                        Chấp nhận
                    </Button>
                </Card.Body>
            </Card>
            ))}
        </Container>
    );
};

export default RegisterList;
