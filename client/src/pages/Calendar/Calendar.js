import _ from "lodash";
import React, { useState, useRef, useEffect } from "react";
import {
    Container,
    Button,
    Row,
    Col,
    Modal,
    Form,
    Alert,
    Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateCalendar } from "../../actions/tour.js";
import { updateMatch, updateMatchResult } from "../../actions/match.js";
import MatchRow from "../../components/MatchRow.js";
import MotionHoc from "../../components/MotionHoc.js";

const initializeMatchData = {
    team1: {
        teamName: "",
        homeGround: "",
        playerList: [],
    },
    team2: {
        teamName: "",
        homeGround: "",
        playerList: [],
    },
    field: "",
    vongthidau: null,
    tenluotthidau: "",
    date: null,
    time: null,
    result: null,
    _id: null,
};
const initializeMatchResult = {
    _id: null,
    matchLength: {
        minute: null,
        second: null,
    },
    team1Result: {
        totalGoals: null,
        goals: [
            {
                name: "",
                player: "",
                assist: "",
                type: "",
                minute: "",
                second: "",
            },
        ],
    },
    team2Result: {
        totalGoals: null,
        goals: [
            {
                name: "",
                player: "",
                assist: "",
                type: "",
                minute: "",
                second: "",
            },
        ],
    },
};

function CalendarComponent() {
    const dispatch = useDispatch();
    const erMessage = useSelector((state) => state.erMessage);

    const tour = useSelector((state) => state.tour);
    const [loading, setLoading] = useState(false);
    const [showMatchInfo, setShowMatchInfo] = useState(false);
    const handleCloseMatchInfo = () => {
        setShowMatchInfo(false);
        setSelectedMatch(initializeMatchData);
        setSelectedMatchResult(initializeMatchResult);
    };
    const [selectedMatch, setSelectedMatch] = useState(initializeMatchData);
    const [showMatchResult, setShowMatchResult] = useState(false);
    const handleCloseMatchResult = () => {
        setShowMatchResult(false);
        setSelectedMatch(initializeMatchData);
        setSelectedMatchResult(initializeMatchResult);
    };
    const [selectedMatchResult, setSelectedMatchResult] = useState(
        initializeMatchResult
    );

    const isInitialMount = useRef(true);
    const [alertNotification, setAlertNotification] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (erMessage.length > 0) {
                setAlertNotification(`${erMessage}`);
                setShowAlert(true);
            } else {
                setShowMatchInfo(false);
                setShowMatchResult(false);
                setShowAlert(false);
            }
        }
    }, [erMessage]);

    const onSaveMatchInfo = async () => {
        await dispatch(updateMatch(selectedMatch._id, selectedMatch));
    };

    const onSaveMatchResult = async () => {
        setLoading(true);
        const temp = _.cloneDeep(selectedMatchResult);

        // Change player index to player id
        for (const team of ["team1Result", "team2Result"]) {
            const teami = team === "team1Result" ? "team1" : "team2";
            for (const goalIndex in temp[team].goals) {
                let playerIndex = selectedMatch[teami].playerList.findIndex(
                    (player) =>
                        player._id ===
                        selectedMatchResult[team].goals[goalIndex].player._id
                );
                if (playerIndex === -1)
                    playerIndex =
                        selectedMatchResult[team].goals[goalIndex].player;
                _.update(
                    temp,
                    `${team}.goals[${goalIndex}].player`,
                    () => selectedMatch[teami]?.playerList[playerIndex]?._id
                );

                let assistIndex = selectedMatch[teami].playerList.findIndex(
                    (player) =>
                        player._id ===
                        selectedMatchResult[team].goals[goalIndex].assist._id
                );
                if (assistIndex === -1)
                    assistIndex =
                        selectedMatchResult[team].goals[goalIndex].assist;
                _.update(
                    temp,
                    `${team}.goals[${goalIndex}].assist`,
                    () => selectedMatch[teami]?.playerList[assistIndex]?._id
                );
            }
        }
        //---------------------------------------------------------------------------

        await dispatch(updateMatchResult(selectedMatch._id, temp));

        setLoading(false);
    };

    const onChangeMatchLength = (e) => {
        const copy = _.cloneDeep(selectedMatchResult);

        copy.matchLength[e.target.name] = e.target.value;
        setSelectedMatchResult(copy);
    };

    const onChangeGoalTeam1 = (e) => {
        const copy = _.cloneDeep(selectedMatchResult);
        copy.team1Result.totalGoals = e.target.value;

        setSelectedMatchResult({ ...copy });
    };

    const onChangeGoalTeam2 = (e) => {
        const copy = _.cloneDeep(selectedMatchResult);
        copy.team2Result.totalGoals = e.target.value;

        setSelectedMatchResult({ ...copy });
    };

    const onAddGoalTeam1 = () => {
        const template = {
            name: "",
            player: "",
            assist: "",
            type: "",
            minute: "",
            second: "",
        };

        const t = _.cloneDeep(selectedMatchResult);
        t.team1Result.goals.push(template);
        setSelectedMatchResult(t);
    };

    const onRemoveGoalTeam1 = (index) => {
        const t = _.cloneDeep(selectedMatchResult);
        t.team1Result.goals.splice(index, 1);
        setSelectedMatchResult(t);
    };

    const onAddGoalTeam2 = (e) => {
        const template = {
            name: "",
            player: "",
            assist: "",
            type: "",
            minute: "",
            second: "",
        };

        const t = _.cloneDeep(selectedMatchResult);
        t.team2Result.goals.push(template);
        setSelectedMatchResult(t);
    };

    const onRemoveGoalTeam2 = (index) => {
        const t = _.cloneDeep(selectedMatchResult);
        t.team2Result.goals.splice(index, 1);
        setSelectedMatchResult(t);
    };

    const handleChangeGoal = (e, team, index) => {
        var temp = _.cloneDeep(selectedMatchResult);
        _.set(
            temp,
            `[${team}].goals[${index}].[${e.target.name}]`,
            e.target.value
        );
        setSelectedMatchResult(temp);
    };

    const handleChangePlayerAttending = (e, player, team) => {
        const copySelectedMatch = _.cloneDeep(selectedMatch);
        if (e.target.checked) {
            copySelectedMatch.playerAttending[team].push(player._id);
        } else {
            _.remove(
                copySelectedMatch.playerAttending[team],
                (playerId) => playerId === player._id
            );
        }
        setSelectedMatch(copySelectedMatch);
    };

    const CalendarGenerate = () => {
        if (Object.keys(tour).length === 0) {
            return <h1>Tournament Loading...</h1>;
        }
        if (
            tour.calendar.awayMatches.length < 1 &&
            tour.calendar.homeMatches.length < 1
        )
            return (
                <Container className="mt-5 text-center">
                    <div>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={async () => {
                                setLoading(true);
                                await dispatch(updateCalendar(tour));
                                setLoading(false);
                            }}
                        >
                            T???o l???ch thi ?????u v?? ????ng form ????ng k?? ?????i
                        </Button>
                        {showAlert ? (
                            <Alert
                                variant="warning"
                                dismissible
                                onClose={() => setShowAlert(false)}
                            >
                                {alertNotification}
                            </Alert>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div>
                        {loading ? (
                            <Spinner animation="grow" className="mt-5" />
                        ) : (
                            <></>
                        )}
                    </div>
                </Container>
            );
        return (
            <div>
                {["awayMatches", "homeMatches"].map((homeOrAway) => (
                    <>
                        {
                            <h3 className="text-center mt-5 bg-danger text-white py-2">
                                {homeOrAway === "awayMatches"
                                    ? "L?????t ??i"
                                    : "L?????t v???"}
                            </h3>
                        }
                        {tour?.calendar[homeOrAway]?.map((round, index) => {
                            return (
                                <div key={index}>
                                    <h4 className="text-center mt-3">{`V??ng ${round.round}`}</h4>
                                    {index === 0 ? (
                                        <Row>
                                            <Col sm={1} className="text-center">
                                                <h5>Ng??y</h5>
                                            </Col>
                                            <Col sm={1} className="text-center">
                                                <h5>Gi???</h5>
                                            </Col>
                                            <Col sm={4} className="text-center">
                                                <h5>?????i 1</h5>
                                            </Col>
                                            <Col sm={4} className="text-center">
                                                <h5>?????i 2</h5>
                                            </Col>
                                            <Col
                                                sm={2}
                                                className="text-center align-center"
                                            ></Col>
                                        </Row>
                                    ) : null}
                                    {round?.matches?.map((match) => {
                                        return (
                                            <MatchRow
                                                key={match._id}
                                                team1={match.team1.teamName}
                                                team2={match.team2.teamName}
                                                matchData={match}
                                                matchResult={match.result}
                                                setSelectedMatch={
                                                    setSelectedMatch
                                                }
                                                setShowMatchInfo={
                                                    setShowMatchInfo
                                                }
                                                setShowMatchResult={
                                                    setShowMatchResult
                                                }
                                                setSelectedMatchResult={
                                                    setSelectedMatchResult
                                                }
                                            />
                                        );
                                    })}
                                    {index !==
                                    tour.calendar.awayMatches.length - 1 ? (
                                        <hr size={3} />
                                    ) : null}
                                </div>
                            );
                        })}
                    </>
                ))}
            </div>
        );
    };

    return (
        <Container className="mt-5">
            <CalendarGenerate />
            {/* MatchInfo Modal */}

            <Modal show={showMatchInfo} onHide={handleCloseMatchInfo} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>C???p nh???t th??ng tin tr???n ?????u</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showAlert ? (
                        <Alert
                            variant="warning"
                            dismissible
                            onClose={() => setShowAlert(false)}
                        >
                            {alertNotification}
                        </Alert>
                    ) : (
                        <></>
                    )}
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label>Ng??y</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Nh???p t??n ?????i"
                                    name="date"
                                    value={
                                        selectedMatch.date
                                            ? selectedMatch.date
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setSelectedMatch({
                                            ...selectedMatch,
                                            date: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                            <Col>
                                <Form.Label>Gi???</Form.Label>
                                <Form.Control
                                    type="time"
                                    placeholder="Nh???p t??n ?????i"
                                    value={
                                        selectedMatch.time
                                            ? selectedMatch.time
                                            : ""
                                    }
                                    name="time"
                                    onChange={(e) =>
                                        setSelectedMatch({
                                            ...selectedMatch,
                                            time: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>?????i 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="?????i 1"
                                    value={selectedMatch.team1.teamName}
                                    name="team1"
                                    onChange={(e) =>
                                        setSelectedMatch({
                                            ...selectedMatch,
                                            team1: e.target.value,
                                        })
                                    }
                                    disabled
                                />
                            </Col>
                            <Col>
                                <Form.Label>?????i 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="?????i 2"
                                    name="team2"
                                    value={selectedMatch.team2.teamName}
                                    onChange={(e) =>
                                        setSelectedMatch({
                                            ...selectedMatch,
                                            team2: e.target.value,
                                        })
                                    }
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>S??n</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nh???p t??n ?????i"
                                    value={selectedMatch.field}
                                    name="field"
                                    onChange={(e) =>
                                        setSelectedMatch({
                                            ...selectedMatch,
                                            field: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className="text-center mt-2">
                            <Col>Danh s??ch c???u th??? ????ng k??</Col>
                        </Row>
                        <Row className="text-center mt-2">
                            <Col>?????i 1</Col>
                            <Col>?????i 2</Col>
                        </Row>
                        <Row>
                            {["team1", "team2"].map((team) => {
                                return (
                                    <Col>
                                        {selectedMatch[team]?.playerList?.map(
                                            (player, index) => {
                                                return (
                                                    <Form.Check
                                                        type="checkbox"
                                                        label={
                                                            player.playerName
                                                        }
                                                        value={index}
                                                        onChange={(e) =>
                                                            handleChangePlayerAttending(
                                                                e,
                                                                player,
                                                                team
                                                            )
                                                        }
                                                        checked={selectedMatch.playerAttending[
                                                            team
                                                        ].find(
                                                            (playerId) =>
                                                                playerId ===
                                                                player._id
                                                        )}
                                                    />
                                                );
                                            }
                                        )}
                                    </Col>
                                );
                            })}
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onSaveMatchInfo}>
                        L??u
                    </Button>
                    <Button variant="danger" onClick={handleCloseMatchInfo}>
                        H???y
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MatchResult Modal */}
            <Modal
                show={showMatchResult}
                onHide={handleCloseMatchResult}
                size="lg"
                className="text-center"
            >
                <Modal.Header closeButton>
                    <Modal.Title>C???p nh???t k???t qu??? tr???n ?????u</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showAlert ? (
                        <Alert
                            variant="warning"
                            dismissible
                            onClose={() => setShowAlert(false)}
                        >
                            {alertNotification}
                        </Alert>
                    ) : (
                        <></>
                    )}
                    <Form>
                        <Row>
                            <Form.Label>
                                <h5>K???t qu??? tr???n ?????u</h5>
                            </Form.Label>
                            <Col className="text-center">
                                <Form.Label>
                                    {selectedMatch.team1.teamName}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="result1"
                                    min={0}
                                    className="text-center"
                                    onChange={onChangeGoalTeam1}
                                    required
                                    value={
                                        selectedMatchResult.team1Result
                                            .totalGoals
                                    }
                                />
                            </Col>
                            <Col className="text-center">
                                <Form.Label>
                                    {selectedMatch.team2.teamName}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="result2"
                                    min={0}
                                    className="text-center"
                                    onChange={onChangeGoalTeam2}
                                    required
                                    value={
                                        selectedMatchResult.team2Result
                                            .totalGoals
                                    }
                                />
                            </Col>
                        </Row>
                        <Form.Label>Th???i l?????ng tr???n ?????u</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="number"
                                    name="minute"
                                    min={0}
                                    className="text-center"
                                    onChange={onChangeMatchLength}
                                    required
                                    value={
                                        selectedMatchResult.matchLength.minute
                                    }
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="number"
                                    name="second"
                                    min={0}
                                    max={59}
                                    className="text-center"
                                    onChange={onChangeMatchLength}
                                    required
                                    value={
                                        selectedMatchResult.matchLength.second
                                    }
                                />
                            </Col>
                        </Row>
                        <Form.Label className="w-100">
                            <h5>Th??ng tin c??c b??n th???ng</h5>
                        </Form.Label>
                        {
                            <Row>
                                {["team1Result", "team2Result"].map((team) => (
                                    <Col key={team}>
                                        {selectedMatchResult[team]?.goals?.map(
                                            (goal, index) => {
                                                const teami =
                                                    team === "team1Result"
                                                        ? "team1"
                                                        : "team2";
                                                let playerIndex = selectedMatch[
                                                    teami
                                                ].playerList.findIndex(
                                                    (player) =>
                                                        player._id ===
                                                        selectedMatchResult[
                                                            team
                                                        ].goals[index].player
                                                            ._id
                                                );
                                                if (playerIndex === -1)
                                                    playerIndex =
                                                        selectedMatchResult[
                                                            team
                                                        ]?.goals[index]?.player;
                                                let assistIndex = selectedMatch[
                                                    teami
                                                ]?.playerList?.findIndex(
                                                    (player) =>
                                                        player._id ===
                                                        selectedMatchResult[
                                                            team
                                                        ]?.goals[index]?.assist
                                                            ?._id
                                                );
                                                if (assistIndex === -1)
                                                    assistIndex =
                                                        selectedMatchResult[
                                                            team
                                                        ]?.goals[index]?.assist;
                                                return (
                                                    <Row
                                                        className="pt-2 text-left"
                                                        key={index}
                                                    >
                                                        <Col xs={1}>
                                                            <b>{index + 1}</b>
                                                            <Button
                                                                size="sm"
                                                                variant="danger"
                                                                onClick={() => {
                                                                    team ===
                                                                    "team1Result"
                                                                        ? onRemoveGoalTeam1(
                                                                              index
                                                                          )
                                                                        : onRemoveGoalTeam2(
                                                                              index
                                                                          );
                                                                }}
                                                            >
                                                                x
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Form.Select
                                                                name="player"
                                                                className="mt-1"
                                                                onChange={(e) =>
                                                                    handleChangeGoal(
                                                                        e,
                                                                        team,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                {/* N???u ng?????i d??ng click qua l???i nhanh qu??, ch??a k???p load playerIndex th?? b??? l???i */}
                                                                <option>
                                                                    {!selectedMatchResult[
                                                                        team
                                                                    ].goals[
                                                                        index
                                                                    ].player
                                                                        ? "C???u th??? ghi b??n"
                                                                        : selectedMatch[
                                                                              teami
                                                                          ]
                                                                              .playerList[
                                                                              playerIndex
                                                                          ]
                                                                              ?.playerName}
                                                                </option>
                                                                {selectedMatch[
                                                                    teami
                                                                ]?.playerList?.map(
                                                                    (
                                                                        player,
                                                                        index
                                                                    ) => (
                                                                        <option
                                                                            value={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                player.playerName
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Form.Select>

                                                            <Form.Select
                                                                name="type"
                                                                className="mt-1"
                                                                onChange={(e) =>
                                                                    handleChangeGoal(
                                                                        e,
                                                                        team,
                                                                        index,
                                                                        teami
                                                                    )
                                                                }
                                                            >
                                                                <option>
                                                                    {!selectedMatchResult[
                                                                        team
                                                                    ].goals[
                                                                        index
                                                                    ].type
                                                                        ? "Lo???i b??n th???ng"
                                                                        : selectedMatchResult[
                                                                              team
                                                                          ]
                                                                              .goals[
                                                                              index
                                                                          ]
                                                                              ?.type}
                                                                </option>
                                                                <option value="OG">
                                                                    OG
                                                                </option>
                                                                <option value="Penalty">
                                                                    Penalty
                                                                </option>
                                                                <option value="Normal">
                                                                    Normal
                                                                </option>
                                                            </Form.Select>

                                                            <Form.Select
                                                                name="assist"
                                                                className="mt-1"
                                                                onChange={(e) =>
                                                                    handleChangeGoal(
                                                                        e,
                                                                        team,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <option
                                                                    value={null}
                                                                >
                                                                    {!selectedMatchResult[
                                                                        team
                                                                    ].goals[
                                                                        index
                                                                    ].assist
                                                                        ? "C???u th??? ki???n t???o"
                                                                        : selectedMatch[
                                                                              teami
                                                                          ]
                                                                              ?.playerList[
                                                                              assistIndex
                                                                          ]
                                                                              ?.playerName}
                                                                </option>
                                                                {selectedMatch[
                                                                    teami
                                                                ]?.playerList?.map(
                                                                    (
                                                                        player,
                                                                        index
                                                                    ) => (
                                                                        <option
                                                                            value={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                player?.playerName
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Form.Select>

                                                            <Form.Control
                                                                className="mt-1"
                                                                type="number"
                                                                placeholder="Ph??t"
                                                                name="minute"
                                                                onChange={(e) =>
                                                                    handleChangeGoal(
                                                                        e,
                                                                        team,
                                                                        index
                                                                    )
                                                                }
                                                                value={
                                                                    selectedMatchResult[
                                                                        team
                                                                    ].goals[
                                                                        index
                                                                    ].minute
                                                                }
                                                            />

                                                            <Form.Control
                                                                className="mt-1"
                                                                type="number"
                                                                placeholder="Gi??y"
                                                                name="second"
                                                                onChange={(e) =>
                                                                    handleChangeGoal(
                                                                        e,
                                                                        team,
                                                                        index
                                                                    )
                                                                }
                                                                value={
                                                                    selectedMatchResult[
                                                                        team
                                                                    ].goals[
                                                                        index
                                                                    ].second
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                );
                                            }
                                        )}
                                        <Button
                                            onClick={() => {
                                                team === "team1Result"
                                                    ? onAddGoalTeam1()
                                                    : onAddGoalTeam2();
                                            }}
                                        >
                                            +
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onSaveMatchResult}>
                        {loading ? (
                            <Spinner
                                animation="border"
                                variant="secondary"
                                size="sm"
                            />
                        ) : (
                            <></>
                        )}
                        L??u
                    </Button>
                    <Button variant="danger" onClick={handleCloseMatchResult}>
                        H???y
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

const Calendar = MotionHoc(CalendarComponent);

export default Calendar;
