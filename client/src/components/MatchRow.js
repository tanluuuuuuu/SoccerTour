import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";

export default class MatchRow extends Component {
    render() {
        let d = "";
        if (this.props.matchData.date) {
            const arrayDate = this.props.matchData.date.split("-");
            d = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
        }

        return (
            <Row>
                <Col sm={1} className="text-center">
                    <p>{d}</p>
                </Col>
                <Col sm={1} className="text-center">
                    <p>{this.props.matchData.time}</p>
                </Col>
                <Col sm={4} className="text-center">
                    <p>{this.props.team1}</p>
                </Col>
                <Col sm={4} className="text-center">
                    <p>{this.props.team2}</p>
                </Col>
                <Col sm={2} className="text-center align-center">
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                type="button"
                                className="btn-sm"
                                onClick={() => {
                                    this.props.setShowMatchInfo(true);
                                    this.props.setSelectedMatch(
                                        this.props.matchData
                                    );
                                }}
                            >
                                Thông tin
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="primary"
                                type="button"
                                className="btn-sm"
                                onClick={() => {
                                    this.props.setShowMatchResult(true);
                                    this.props.setSelectedMatch(
                                        this.props.matchData
                                    );
                                    this.props.setSelectedMatchResult(
                                        this.props.matchResult
                                    );
                                }}
                            >
                                Kết quả
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
