import React, { useState } from "react";
import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeTourRule } from "../../actions/tour";

function TourRule() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initializeTourData = {
        tourName: "",
        maxTeam: "",
        minTeam: "",
        maxPlayerOfTeam: "",
        minPlayerOfTeam: "",
        maxForeignPlayer: "",
        maxAge: "",
        minAge: "",
        winPoint: 3,
        drawPoint: 1,
        losePoint: 0,
        registerList: [],
    };
    const [tourData, setTourData] = useState(initializeTourData);

    const handleChange = (e) => {
        setTourData({ ...tourData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(loading);
        await dispatch(changeTourRule(tourData));
        setLoading(false);
    };

    const onReset = () => {
        setTourData(initializeTourData);
    };

    const onTourReport = () => {};

    const endTour = () => {};

    return (
        <Container className="mt-5">
            <h3 className="bg-danger text-center text-white">
                Quy định giải đấu
            </h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Tên giải đấu</Form.Label>
                <Form.Control
                    type="text"
                    value={tourData.tourName}
                    name="tourName"
                    onChange={handleChange}
                    required
                />
                <Row>
                    <Col>
                        <Form.Label>Số đội tối thiểu</Form.Label>
                        <Form.Control
                            type="Number"
                            min={0}
                            value={tourData.minTeam}
                            name="minTeam"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Số đội tối đa</Form.Label>
                        <Form.Control
                            type="text"
                            min={0}
                            value={tourData.maxTeam}
                            name="maxTeam"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label>Số cầu thủ tối thiểu</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            value={tourData.minPlayerOfTeam}
                            name="minPlayerOfTeam"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Số cầu thủ tối đa</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            value={tourData.maxPlayerOfTeam}
                            name="maxPlayerOfTeam"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>

                <Form.Label>Số cầu thủ nước ngoài tối đa</Form.Label>
                <Form.Control
                    type="number"
                    min={0}
                    value={tourData.maxForeignPlayer}
                    name="maxForeignPlayer"
                    onChange={handleChange}
                    required
                />

                <Row>
                    <Col>
                        <Form.Label>Độ tuổi tối thiểu</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            value={tourData.minAge}
                            name="minAge"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Độ tuổi tối đa</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            value={tourData.maxAge}
                            name="maxAge"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Số điểm thắng</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            value={tourData.winPoint}
                            name="winPoint"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Số điểm hòa</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            value={tourData.drawPoint}
                            name="drawPoint"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Số điểm thua</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            value={tourData.losePoint}
                            name="losePoint"
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>

                <Button
                    variant="secondary"
                    type="button"
                    className="float-right mt-2 mx-2"
                    onClick={onReset}
                >
                    Đặt lại
                </Button>
                <Button type="submit" className="float-right mt-2">
                    {loading ? (
                        <Spinner
                            animation="border"
                            variant="secondary"
                            size="sm"
                        ></Spinner>
                    ) : (
                        <></>
                    )}
                    Lưu
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    className="float-right mt-2 mx-2"
                    onClick={onTourReport}
                >
                    Lập báo cáo giải
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    className="float-right mt-2 mx-2"
                    onClick={endTour}
                >
                    Kết thúc giải đấu
                </Button>
            </Form>
        </Container>
    );
}

export default TourRule;
