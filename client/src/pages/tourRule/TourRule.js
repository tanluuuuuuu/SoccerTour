import React, { useState, useRef, useEffect } from "react";
import {
    Container,
    Button,
    Form,
    Row,
    Col,
    Spinner,
    Modal,
    Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeTourRule, endTour } from "../../actions/tour";
import TourReport from "./TourReport/TourReport";
import MotionHoc from "../../components/MotionHoc";

function TourRuleComponent() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showTourReport, setShowTourReport] = useState(false);
    const [showNewTourModal, setShowNewTourModal] = useState(false);
    const tour = useSelector((state) => state.tour);
    const erMessage = useSelector((state) => state.erMessage);

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
                setShowAlert(false);
            }
        }
    }, [erMessage]);

    const initializeTourData = {
        tourName: tour.tourName,
        maxTeam: tour.maxTeam,
        minTeam: tour.minTeam,
        maxPlayerOfTeam: tour.maxPlayerOfTeam,
        minPlayerOfTeam: tour.minPlayerOfTeam,
        maxForeignPlayer: tour.maxForeignPlayer,
        maxAge: tour.maxAge,
        minAge: tour.minAge,
        winPoint: tour.winPoint,
        drawPoint: tour.drawPoint,
        losePoint: tour.losePoint,
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

    const onTourReport = () => {
        setShowTourReport(true);
    };

    const onEndTour = async (e) => {
        e.preventDefault();
        await dispatch(endTour());
        setTourData({
            tourName: "",
            maxTeam: null,
            minTeam: null,
            maxPlayerOfTeam: null,
            minPlayerOfTeam: null,
            maxForeignPlayer: null,
            maxAge: null,
            minAge: null,
            winPoint: 3,
            drawPoint: 0,
            losePoint: -1,
            registerList: [],
        });
        setShowNewTourModal(true);
    };

    const NewTourModal = () => (
        <Modal
            show={showNewTourModal}
            onHide={() => setShowNewTourModal(false)}
        >
            <Modal.Body>
                Giải đấu mới tạo thành công, vui lòng cập nhật các thông số
            </Modal.Body>
        </Modal>
    );

    return (
        <Container className="mt-5">
            <h3 className="bg-danger text-center text-white py-2">
                Quy định giải đấu
            </h3>
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
            <Form onSubmit={handleSubmit}>
                <Form.Label>Tên giải đấu</Form.Label>
                <Form.Control
                    type="text"
                    value={tourData.tourName}
                    name="tourName"
                    onChange={handleChange}
                    placeholder={`Nhập tên giải đấu`}
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
                            placeholder={"Nhập số đội tối thiểu"}
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
                            placeholder={"Nhập số đội tối đa"}
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
                            placeholder={"Nhập số cầu thủ tối thiểu"}
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
                            placeholder={"Nhập số cầu thủ tối đa"}
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
                    placeholder={"Nhập số cầu thủ nước ngoài tối đa"}
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
                            placeholder={"Nhập độ tuổi tối thiểu"}
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
                            placeholder={"Nhập độ tuổi tối đa"}
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
                            placeholder={"Nhập số điểm nhận được khi thắng"}
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
                            placeholder={"Nhập số điểm mỗi nhận được khi hòa"}
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
                            placeholder={"Nhập số điểm nhận được khi thua"}
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
                    onClick={(e) => onEndTour(e)}
                >
                    Kết thúc giải đấu
                </Button>
            </Form>
            <Modal
                show={showTourReport}
                onHide={() => setShowTourReport(false)}
                size="lg"
                fullscreen={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tiến độ giải đấu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TourReport />
                </Modal.Body>
            </Modal>
            <NewTourModal />
        </Container>
    );
}

const TourRule = MotionHoc(TourRuleComponent);

export default TourRule;
