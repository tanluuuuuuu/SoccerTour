import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import MotionHoc from "../../components/MotionHoc";

const TeamCalendarComponent = () => {
    const awayMatches = useSelector(
        (state) => state.tour?.calendar?.awayMatches
    );
    const homeMatches = useSelector(
        (state) => state.tour?.calendar?.homeMatches
    );
    const userTeamId = useSelector((state) => state.user.team);
    let flag = false;
    const MatchHappen = ({ matchList }) => {
        return (
            <Container className="mt-3">
                {matchList?.map((round) =>
                    round.matches.map((match) => {
                        if (
                            match.team1._id === userTeamId ||
                            match.team2._id === userTeamId
                        ) {
                            flag = true;
                            return (
                                <Card className="mt-2" key={match?._id}>
                                    <Card.Body className="text-center">
                                        <Row>
                                            <Col xs={5}>
                                                {match?.team1?.teamName}
                                            </Col>
                                            <Col xs={2}>VS</Col>
                                            <Col xs={5}>
                                                {match?.team2?.teamName}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={5}>
                                                {
                                                    match?.result?.team1Result
                                                        .totalGoals
                                                }
                                            </Col>
                                            <Col xs={2}></Col>
                                            <Col xs={5}>
                                                {
                                                    match?.result?.team2Result
                                                        .totalGoals
                                                }{" "}
                                            </Col>
                                        </Row>
                                        <Row>S??n thi ?????u: {match.field}</Row>
                                        <Row>Ng??y: {match.date}</Row>
                                        <Row>Gi???: {match.time}</Row>
                                    </Card.Body>
                                </Card>
                            );
                        }
                        return (
                            <p className="text-center">
                                Gi???i ch??a b???t ?????u ho???c ?????i kh??ng tham gia gi???i
                                ?????u
                            </p>
                        );
                    })
                )}
            </Container>
        );
    };

    return (
        <Container className="mt-5">
            <h3 className="text-center bg-danger text-white py-2">
                L???ch thi ?????u ?????i
            </h3>
            <h4 className="text-center">L?????t ??i</h4>
            <MatchHappen matchList={awayMatches} />
            <h4 className="text-center">L?????t v???</h4>
            <MatchHappen matchList={homeMatches} />
        </Container>
    );
};

const TeamCalendar = MotionHoc(TeamCalendarComponent);

export default TeamCalendar;
