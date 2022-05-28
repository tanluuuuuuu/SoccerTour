import React, { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../actions/user.js";

const UserList = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    useEffect(() => {
        if (userList.length === 0) {
            dispatch(getUserList());
        }
    });

    const onSeeTeam = (team) => {
        console.log(team);
    };

    return (
        <Container className="mt-5">
            <h3 className="text-center bg-danger text-white">
                Danh sách người dùng
            </h3>
            {userList.map((user) => (
                <Card className="my-3">
                    <Card.Header as="h5">{user.role}</Card.Header>
                    <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to
                            additional content.
                        </Card.Text>
                        {user.team ? (
                            <Button variant="primary" onClick={() => onSeeTeam(user.team)}>
                                Xem đội
                            </Button>
                        ) : (
                            <></>
                        )}

                        <Button variant="primary" className="mx-2">
                            Cấp quyền admin
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default UserList;
