import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Card, Spinner } from "react-bootstrap";

function SearchPlayer() {
    const players = useSelector((state) => state.tour.players);

    const [searchTerm, setSearchTerm] = useState({
        playerName: "",
        team: "",
        playerType: "Bất kỳ",
        nationality: "",
    });
    const [playerfilted, setPlayerFilted] = useState(players);

    useEffect(() => {
        if (players.length > 0) {
            const intervalId = setInterval(() => {
                const arr = players.filter(
                    (player) =>
                        player.playerName
                            .toLowerCase()
                            .includes(searchTerm.playerName.toLowerCase()) &&
                        player.teamName
                            .toLowerCase()
                            .includes(searchTerm.team.toLowerCase()) &&
                        (searchTerm.playerType === "Bất kỳ" ||
                            player.playerType === searchTerm.playerType) &&
                        player.nationality
                            .toLowerCase()
                            .includes(searchTerm.nationality.toLowerCase())
                );
                setPlayerFilted(arr);
            }, 1000);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [searchTerm]);

    const handleChange = (e) => {
        setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
    };

    if (!players) {
        return (
            <Container className="mt-5">
                <Spinner animation="grow" variant="primary" />
            </Container>
        );
    }
    return (
        <Container className="mt-5">
            <h3 className="text-center bg-danger text-white">
                Tra cứu cầu thủ
            </h3>
            <Form className="text-center">
                <Row>
                    <Col>
                        <Form.Label>
                            <b>Tên cầu thủ</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            name="playerName"
                            value={searchTerm.playerName}
                        ></Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>
                            <b>Đội</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            name="team"
                            value={searchTerm.team}
                        ></Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>
                            <b>Loại cầu thủ</b>
                        </Form.Label>
                        <Form.Select name="playerType" onChange={handleChange}>
                            <option value="Bất kỳ" key={"Bất kỳ"}>
                                Bất kỳ
                            </option>
                            <option value="Tiền đạo" key={"Tiền đạo"}>
                                Tiền đạo
                            </option>
                            <option value="Tiền vệ" key={"Tiền vệ"}>
                                Tiền vệ
                            </option>
                            <option value="Hậu vệ" key={"Hậu vệ"}>
                                Hậu vệ
                            </option>
                            <option value="Thủ môn" key={"Thủ môn"}>
                                Thủ môn
                            </option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>
                            <b>Quốc tịch</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            name="nationality"
                            value={searchTerm.nationality}
                        ></Form.Control>
                    </Col>
                </Row>
            </Form>

            {/* Display player */}
            {playerfilted.map((player) => {
                return (
                    <Card className="mt-2">
                        <Card.Body>
                            <Row>
                                <Col>{player.playerName}</Col>
                                <Col className="text-center">
                                    {player.teamName}
                                </Col>
                                <Col className="text-center">
                                    {player.playerType}
                                </Col>
                                <Col className="text-center">
                                    {player.nationality}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                );
            })}
        </Container>
    );
}

export default SearchPlayer;
