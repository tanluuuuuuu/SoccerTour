import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/user";

const Container = styled.div`
    position: fixed;
    width: 4%;
    height: 100vh;

    display: flex;
    align-items: center;

    transition: width 1s;
    z-index: 0;
`;

const SidebarContainer = styled.div`
    position: relative;
    background-color: #d40f0f;
    width: 100%;
    height: 80%;
    color: #fff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 0 30px 30px 0;
    z-index: 1;
`;

const ListItem = styled.ul`
    list-style: none;
    padding: 0;
    flex: 2;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const Item = styled.li`
    font-size: 2rem;
    cursor: pointer;

    & a {
        color: inherit;
    }
`;

const ProfileContainer = styled.div`
    flex: 1;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Profile = styled.img`
    width: 50px;
    height: 50px;

    border-radius: 50%;

    object-fit: cover;
    position: absolute;
    bottom: 0;
    margin-bottom: 50px;

    cursor: pointer;
`;

function Sidebar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        dispatch(logout());
        history.push("/");
    };

    return (
        <Container>
            <SidebarContainer>
                <ListItem>
                    <Item>
                        <Link to={"/"}>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </Item>

                    {user.role === "teamManager" ? (
                        <Item>
                            <Link to={"/newteam"}>
                                <i className="fa-solid fa-file-signature"></i>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}

                    {user.role === "admin" ? (
                        <Item>
                            <Link to={"/registerlist"}>
                                <i className="fa-solid fa-file-signature"></i>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}

                    {user.role === "admin" ? (
                        <Item>
                            <Link to={"/calendar"}>
                                <i className="fa-solid fa-calendar"></i>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}

                    <Item>
                        <Link to={"/search"}>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </Link>
                    </Item>
                    
                    {user.role === "admin" ? (
                        <Item>
                            <Link to={"/rule"}>
                                <i className="fa-brands fa-autoprefixer"></i>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}
                    {user.role === "teamManager" ? (
                        <Item>
                            <Link to={"/user"}>
                                <i class="fa-solid fa-user"></i>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}
                    {user.role === "admin" ? (
                        <Item>
                            <Link to={"/userlist"}>
                                <i class="fa-solid fa-users"></i>
                            </Link>
                        </Item>
                    ) : (
                        <></>
                    )}
                </ListItem>
                <ProfileContainer>
                    <Button variant="light" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </ProfileContainer>
            </SidebarContainer>
        </Container>
    );
}

export default Sidebar;
