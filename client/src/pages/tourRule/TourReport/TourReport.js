import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const TourReport = () => {
    const tour = useSelector((state) => state.tour);
    const awayMatches = tour?.calendar?.awayMatches;
    const homeMatches = tour?.calendar?.homeMatches;

    console.log(awayMatches);

    const Ranking = () => {
        return (
            <Container className="mt-3">
                <h3 className="text-center bg-danger text-white">
                    Bảng xếp hạng
                </h3>
                <Row className="text-center mx-2">
                    <Col>
                        <b>Hạng</b>
                    </Col>
                    <Col>
                        <b>Tên đội bóng</b>
                    </Col>
                    <Col>
                        <b>Số trận thắng</b>
                    </Col>
                    <Col>
                        <b>Số trận hòa</b>
                    </Col>
                    <Col>
                        <b>Số trận thua</b>
                    </Col>
                    <Col>
                        <b>Hiệu số</b>
                    </Col>
                    <Col>
                        <b>Điểm số</b>
                    </Col>
                </Row>
                {tour.ranking.map((team, index) => (
                    <Card className="mt-2" key={team.teamName}>
                        <Card.Body className="text-center">
                            <Row>
                                <Col>{index + 1}</Col>
                                <Col>{team.teamName}</Col>
                                <Col>{team.gameWin.length}</Col>
                                <Col>{team.gameDraw.length}</Col>
                                <Col>{team.gameLose.length}</Col>
                                <Col>{team.goalDifference}</Col>
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
                <Row className="text-center mx-2">
                    <Col>
                        <b>Hạng</b>
                    </Col>
                    <Col>
                        <b>Tên cầu thủ</b>
                    </Col>
                    <Col>
                        <b>Đội</b>
                    </Col>
                    <Col>
                        <b>Loại cầu thủ</b>
                    </Col>
                    <Col>
                        <b>Bàn thắng</b>
                    </Col>
                    <Col>
                        <b>Kiến tạo</b>
                    </Col>
                </Row>
                {tour.rankingPlayer.map((player, index) => (
                    <Card className="mt-2" key={player.playerName}>
                        <Card.Body className="text-center">
                            <Row>
                                <Col>{index + 1}</Col>
                                <Col>{player.playerName}</Col>
                                <Col>{player.teamName}</Col>
                                <Col>{player.playerType}</Col>
                                <Col>{player.allGoals.length}</Col>
                                <Col>{player.allAssists.length}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
    };

    const MatchHappen = ({ matchList, wayName }) => {
        return (
            <Container className="mt-3">
                <h3 className="text-center bg-danger text-white">
                    Danh sách trận đấu {wayName}
                </h3>
                {matchList?.map((round) =>
                    round.matches.map((match) => (
                        <Card className="mt-2" key={match?._id}>
                            <Card.Body>
                                <Row>
                                    <Col xs={8} className="text-center">
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
                                                <h4>
                                                    {
                                                        match.result.team1Result
                                                            .totalGoals
                                                    }
                                                </h4>
                                            </Col>
                                            <Col xs={2}></Col>
                                            <Col xs={5}>
                                                <h4>
                                                    {
                                                        match.result.team2Result
                                                            .totalGoals
                                                    }
                                                </h4>
                                            </Col>
                                        </Row>
                                        <Row className="text-center">
                                            <Col>
                                                {
                                                    match.result.matchLength
                                                        .minute
                                                }
                                                :
                                                {
                                                    match.result.matchLength
                                                        .second
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4}>
                                        <p>Vòng đấu: {match?.vongthidau}</p>
                                        <p>Sân thi đấu: {match?.field}</p>
                                        <p>Ngày thi đấu: {match?.date}</p>
                                        <p>Giờ thi đấu: {match?.time}</p>
                                    </Col>
                                </Row>
                                <h5 className="text-center">
                                    Danh sách cầu thủ ra sân
                                </h5>
                                <Row>
                                    <Col className="border-right">
                                        <Row className="text-center">
                                            <Col>
                                                <b>Tên</b>
                                            </Col>
                                            <Col>
                                                <b>Vị trí</b>
                                            </Col>
                                            <Col>
                                                <b>Quốc tịch</b>
                                            </Col>
                                            <Col>
                                                <b>Ghi chú</b>
                                            </Col>
                                        </Row>
                                        {match.playerAttending.team1.map(
                                            (player) => (
                                                <Row className="text-center">
                                                    <Col>
                                                        {player.playerName}
                                                    </Col>
                                                    <Col>
                                                        {player.playerType}
                                                    </Col>
                                                    <Col>
                                                        {player.nationality}
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                            )
                                        )}
                                    </Col>
                                    <Col className="border-left">
                                        <Row className="text-center">
                                            <Col>
                                                <b>Tên</b>
                                            </Col>
                                            <Col>
                                                <b>Vị trí</b>
                                            </Col>
                                            <Col>
                                                <b>Quốc tịch</b>
                                            </Col>
                                            <Col>
                                                <b>Ghi chú</b>
                                            </Col>
                                        </Row>
                                        {match.playerAttending.team2.map(
                                            (player) => (
                                                <Row className="text-center">
                                                    <Col>
                                                        {player.playerName}
                                                    </Col>
                                                    <Col>
                                                        {player.playerType}
                                                    </Col>
                                                    <Col>
                                                        {player.nationality}
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                            )
                                        )}
                                    </Col>
                                </Row>
                                <h5 className="text-center mt-2">
                                    Danh sách bàn thắng
                                </h5>
                                <Row>
                                    <Col className="border-right text-center">
                                        <Row>
                                            <Col>
                                                <b>Ghi bàn</b>
                                            </Col>
                                            <Col>
                                                <b>Kiến tạo</b>
                                            </Col>
                                            <Col>
                                                <b>Loại</b>
                                            </Col>
                                            <Col>
                                                <b>Thời điểm</b>
                                            </Col>
                                        </Row>
                                        {match.result.team1Result.goals.map(
                                            (goal) => (
                                                <Row>
                                                    <Col>
                                                        {goal.player.playerName}
                                                    </Col>
                                                    <Col>
                                                        {goal.assist.playerName}
                                                    </Col>
                                                    <Col>{goal.type}</Col>
                                                    <Col>
                                                        {goal.minute}:
                                                        {goal.second}
                                                    </Col>
                                                </Row>
                                            )
                                        )}
                                    </Col>
                                    <Col className="border-left text-center">
                                        <Row>
                                            <Col>
                                                <b>Ghi bàn</b>
                                            </Col>
                                            <Col>
                                                <b>Kiến tạo</b>
                                            </Col>
                                            <Col>
                                                <b>Loại</b>
                                            </Col>
                                            <Col>
                                                <b>Thời điểm</b>
                                            </Col>
                                        </Row>
                                        {match.result.team2Result.goals.map(
                                            (goal) => (
                                                <Row>
                                                    <Col>
                                                        {goal.player.playerName}
                                                    </Col>
                                                    <Col>
                                                        {goal.assist.playerName}
                                                    </Col>
                                                    <Col>{goal.type}</Col>
                                                    <Col>
                                                        {goal.minute}:
                                                        {goal.second}
                                                    </Col>
                                                </Row>
                                            )
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>
        );
    };

    return (
        <Container className="mt-5">
            <h3 className="bg-danger text-center text-white">
                {tour.tourName}
            </h3>
            <Ranking />
            <RankingPlayer />
            <MatchHappen matchList={awayMatches} wayName={"lượt đi"} />
            <MatchHappen matchList={homeMatches} wayName={"lượt về"} />
        </Container>
    );
};

export default TourReport;
