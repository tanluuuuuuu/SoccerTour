import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "./components/Sidebar.js";
import CreateTeam from "./pages/createTeam/createTeam.js";
import HomeTour from "./pages/homeTour/homeTour.js";
import Calendar from "./pages/Calendar/Calendar.js";
import SearchPlayer from "./pages/searchPlayer/SearchPlayer";
import TourRule from "./pages/tourRule/TourRule";
import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User.js";
import RegisterList from "./pages/RegisterList/RegisterList.js";

import { GlobalStyle } from "./globalStyledComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchTour, getRanking, getRankingPlayer } from "./actions/tour.js";
import { checkSignIn } from "./actions/user.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
    const dispatch = useDispatch();
    const [loadingData, setLoadingData] = useState(true);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const go = async () => {
            await dispatch(fetchTour());
            await dispatch(getRanking());
            await dispatch(getRankingPlayer());
            setLoadingData(false);
        };
        go();
        const token = localStorage.getItem("authToken");
        if (token)
            dispatch(checkSignIn({token}));
    }, [dispatch]);

    return (
        <div>
            <GlobalStyle />
            <Router>
                {user.isLogin ? <Sidebar /> : <></>}
                <Switch>
                    <Route exact path="/">
                        <HomeTour isLoading={loadingData} />
                    </Route>
                    <ProtectedRoute
                        exact
                        isLogin={user.isLogin}
                        path="/newteam"
                    >
                        <CreateTeam />
                    </ProtectedRoute>
                    <ProtectedRoute
                        exact
                        isLogin={user.isLogin}
                        path="/calendar"
                    >
                        <Calendar />
                    </ProtectedRoute>
                    <ProtectedRoute exact isLogin={user.isLogin} path="/search">
                        <SearchPlayer />
                    </ProtectedRoute>
                    <ProtectedRoute exact isLogin={user.isLogin} path="/rule">
                        <TourRule />
                    </ProtectedRoute>
                    <ProtectedRoute exact isLogin={user.isLogin} path="/user">
                        <User />
                    </ProtectedRoute>
                    <ProtectedRoute
                        exact
                        isLogin={user.isLogin}
                        path="/userlist"
                    >
                        <UserList />
                    </ProtectedRoute>
                    <ProtectedRoute
                        exact
                        isLogin={user.isLogin}
                        path="/registerlist"
                    >
                        <RegisterList />
                    </ProtectedRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
