import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const TeamCalendar = () => {
    const awayMatches = useSelector(
        (state) => state.tour?.calendar?.awayMatches
    );
    const homeMatches = useSelector(
        (state) => state.tour?.calendar?.homeMatches
    );
    const userTeamId = useSelector((state) => state.user.team);

    const MatchHappen = ({ matchList }) => {
        return (
            <Container className="mt-3">
                {matchList?.map((round) =>
                    round.matches.map((match) => {
                        if (
                            match.team1._id === userTeamId ||
                            match.team2._id === userTeamId
                        ) {
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
                                    </Card.Body>
                                </Card>
                            );
                        }
                        return <></>;
                    })
                )}
            </Container>
        );
    };

    return (
        <Container className="mt-5">
            <h3 className="text-center bg-danger text-white">
                Lịch thi đấu đội
            </h3>
            <MatchHappen matchList={awayMatches}/>
            <MatchHappen matchList={homeMatches}/>
        </Container>
    );
};

export default TeamCalendar;
