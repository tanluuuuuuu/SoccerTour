import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function PlayerInMatch() {
    const calendar = useSelector((state) => state.tour.calendar);
    const allTeams = useSelector((state) => state.tour.allTeams);

    return (
        <Container className="mt-5">
            <h3 className="text-center bg-danger text-white py-2">
                Lịch thi đấu từng đội
            </h3>
            {allTeams?.map((team) => (
                <div className="text-center mt-3">
                    <h4 className="text-center">{team.teamName}</h4>
                    <Row>
                        <Col><b>Đội 1</b></Col>
                        <Col><b>Đội 2</b></Col>
                        <Col><b>Sân</b></Col>
                    </Row>
                    {calendar?.awayMatches?.map((round) => {
                        for (const match of round.matches) {
                            if (
                                match.team1._id === team._id ||
                                match.team2._id === team._id
                            )
                                return (<Row>
                                    <Col>{match.team1.teamName}</Col>
                                    <Col>{match.team2.teamName}</Col>
                                    <Col>{match.field}</Col>
                                </Row>);
                        }
                    })}
                </div>
            ))}
        </Container>
    );
}

export default PlayerInMatch;
