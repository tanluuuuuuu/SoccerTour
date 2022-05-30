import {
    TourModel,
    teamModel,
    playerModel,
    matchModel,
    matchResultModel,
    goalModel,
} from "../models/tourModel.js";
import mongoose from "mongoose";
import _ from "lodash";
import ErrorResponse from "../utils/errorResponse.js";

const helperFunction = {
    compareTeam: (a, b) => {
        if (a.point > b.point) return -1;
        else if (a.point < b.point) return 1;
        else return 0;
    },
    comparePlayer: (a, b) => {
        if (a.allGoals.length > b.allGoals.length) return -1;
        else if (a.allGoals.length < b.allGoals.length) return 1;
        else return 0;
    },
};

// Teams
export const fetchOneTeam = async (req, res) => {
    try {
        const { teamId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).send("Invalid team id");
        }

        const team = await teamModel
            .findById(teamId)
            .populate({ path: "playerList", model: "playerModel" });
        if (!team) {
            return res.status(400).send("No team with that id");
        }
        res.status(200).json(team);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
};

export const getTeams = async (req, res) => {
    try {
        const teams = await teamModel.find();

        res.status(200).json(teams);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createTeam = async (req, res, next) => {
    try {
        const team = req.body;
        const user = req.user;
        const tour = await TourModel.findOne();

        // Validate
        if (tour.allTeams.length + 1 > tour.maxTeam)
            return next(
                new ErrorResponse("Giải đấu đã đạt số lượng đội tối đa", 500)
            );

        if (
            !(
                team.playerList.length >= tour.minPlayerOfTeam &&
                team.playerList.length <= tour.maxPlayerOfTeam
            )
        ) {
            console.log(
                `Số cầu thủ trong đội phải trong khoảng từ ${tour.minPlayerOfTeam} đến ${tour.maxPlayerOfTeam}`
            );
            return res
                .status(500)
                .send(
                    `Số cầu thủ trong đội phải trong khoảng từ ${tour.minPlayerOfTeam} đến ${tour.maxPlayerOfTeam}`
                );
        }
        let foreignerCount = 0;
        if (
            team.playerList.some((player) => {
                if (player.nationality.toLowerCase() != "việt nam")
                    foreignerCount += 1;

                const newDate = new Date(player.dayOfBirth);
                return !(
                    2022 - newDate.getFullYear() >= tour.minAge &&
                    2022 - newDate.getFullYear() <= tour.maxAge
                );
            })
        ) {
            console.log(
                `Tuổi cầu thủ phải trong khoảng từ ${tour.minAge} đến ${tour.maxAge}`
            );
            return res
                .status(500)
                .send(
                    `Tuổi cầu thủ phải trong khoảng từ ${tour.minAge} đến ${tour.maxAge}`
                );
        }

        if (foreignerCount > tour.maxForeignPlayer) {
            console.log(
                `Số cầu thủ nước ngoài tối đa là ${tour.maxForeignPlayer} cầu thủ`
            );
            return res
                .status(500)
                .send(
                    `Số cầu thủ nước ngoài tối đa là ${tour.maxForeignPlayer} cầu thủ`
                );
        }

        // Get player Objects from Team data then save it
        const listPlayer = [];
        const listPlayerObject = [];
        for (const player of team.playerList) {
            player.teamName = team.teamName;
            const pl = await playerModel(player);
            await pl.save();
            listPlayer.push(pl._id.toString());
            listPlayerObject.push(pl);
        }
        team.playerList = listPlayer;
        console.log("Saved player successfully");

        // Create Team from team data and save it
        const newTeam = await teamModel(team);
        await newTeam.save();
        console.log("Saved team successfully");

        tour.registerList.push(newTeam._id);
        await tour.save();
        console.log("Register sent to tour successfully");

        newTeam.playerList = listPlayerObject;
        user.team = newTeam._id;
        await user.save();
        res.status(200).json(newTeam);
    } catch (er) {
        return res.status(500).send(er.message);
    }
};

// Calendar
export const createTour = async (req, res) => {
    try {
        const newTour = new TourModel(req.body);
        await newTour.save();

        console.log("Create new calendar successfully");
        res.status(200).json(newTour);
    } catch (error) {
        res.status(404).json(error);
    }
};

export const getTour = async (req, res) => {
    try {
        const tour = await TourModel.findOne()
            .populate({
                path: "allTeams",
                model: "teamModel",
                populate: {
                    path: "playerList",
                    model: "playerModel",
                },
            })
            .populate({
                path: "players",
                model: "playerModel",
            })
            .populate({
                path: "calendar.awayMatches.matches",
                model: "matchModel",
                populate: [
                    {
                        path: "team1",
                        model: "teamModel",
                        populate: {
                            path: "playerList",
                            model: "playerModel",
                        },
                    },
                    {
                        path: "team2",
                        model: "teamModel",
                        populate: {
                            path: "playerList",
                            model: "playerModel",
                        },
                    },
                    {
                        path: "result",
                        model: "matchResultModel",
                        populate: [
                            {
                                path: "team1Result.goals",
                                model: "goalModel",
                                populate: [
                                    {
                                        path: "player",
                                        model: "playerModel",
                                    },
                                    {
                                        path: "assist",
                                        model: "playerModel",
                                    },
                                ],
                            },
                            {
                                path: "team2Result.goals",
                                model: "goalModel",
                                populate: [
                                    {
                                        path: "player",
                                        model: "playerModel",
                                    },
                                    {
                                        path: "assist",
                                        model: "playerModel",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            })
            .populate({
                path: "calendar.homeMatches.matches",
                model: "matchModel",
                populate: [
                    {
                        path: "team1",
                        model: "teamModel",
                        populate: {
                            path: "playerList",
                            model: "playerModel",
                        },
                    },
                    {
                        path: "team2",
                        model: "teamModel",
                        populate: {
                            path: "playerList",
                            model: "playerModel",
                        },
                    },
                    {
                        path: "result",
                        model: "matchResultModel",
                        populate: [
                            {
                                path: "team1Result.goals",
                                model: "goalModel",
                                populate: [
                                    {
                                        path: "player",
                                        model: "playerModel",
                                    },
                                    {
                                        path: "assist",
                                        model: "playerModel",
                                    },
                                ],
                            },
                            {
                                path: "team2Result.goals",
                                model: "goalModel",
                                populate: [
                                    {
                                        path: "player",
                                        model: "playerModel",
                                    },
                                    {
                                        path: "assist",
                                        model: "playerModel",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            })
            .populate({
                path: "registerList",
                model: "teamModel",
                populate: {
                    path: "playerList",
                    model: "playerModel",
                },
            });
        console.log("Get tour successfully");
        res.status(200).json(tour);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
};

// Create all matches
export const updateTour = async (req, res) => {
    const tour = await TourModel.findOne();
    const data = req.body;

    if (data.allTeams.length <= tour.minTeam) {
        return res.status(500).send("Không đủ số lượng đội yêu cầu của giải");
    }

    data.allTeams.sort();
    const roundArray = _.cloneDeep(data.allTeams);

    if (data.allTeams.length % 2 == 0) {
        const maxRound = data.allTeams.length - 1;
        const matchPerRound = data.allTeams.length / 2;
        let i = 0;
        let z = 0;
        for (let round = 1; round <= maxRound; round++) {
            const roundTemplate1 = {
                round: round, // Vòng thi đấu
                timeBegin: null,
                timeEnd: null,
                matches: (function () {
                    const allMatches = [];
                    for (let i = 1; i <= matchPerRound; i++) {
                        allMatches.push({
                            team1: null,
                            team2: null,
                            field: null,
                            vongthidau: null,
                            tenluotthidau: null,
                            date: null,
                            time: null,
                            result: {
                                matchLength: {
                                    minute: null,
                                    second: null,
                                },
                                team1Result: {
                                    totalGoals: null,
                                    goals: [],
                                },
                                team2Result: {
                                    totalGoals: null,
                                    goals: [],
                                },
                            },
                            playerAttending: {
                                team1: [],
                                team2: [],
                            },
                        });
                    }
                    return allMatches;
                })(), // Các trận trong vòng thi đấu này
            };

            for (let match of roundTemplate1.matches) {
                match.team1 = roundArray[i];
                i++;
                match.team2 = roundArray[i];
                i++;
                match.field = match.team1.homeGround;
                match.vongthidau = round;
                match.tenluotthidau = "Lượt đi";
            }
            data.calendar.awayMatches.push(roundTemplate1);

            const roundTemplate2 = {
                round: round + maxRound, // Vòng thi đấu
                timeBegin: null,
                timeEnd: null,
                matches: (function () {
                    const allMatches = [];
                    for (let i = 1; i <= matchPerRound; i++) {
                        allMatches.push({
                            team1: null,
                            team2: null,
                            field: null,
                            vongthidau: null,
                            tenluotthidau: null,
                            date: null,
                            time: null,
                            result: {
                                matchLength: {
                                    minute: null,
                                    second: null,
                                },
                                team1Result: {
                                    totalGoals: null,
                                    goals: [],
                                },
                                team2Result: {
                                    totalGoals: null,
                                    goals: [],
                                },
                            },
                            playerAttending: {
                                team1: [],
                                team2: [],
                            },
                        });
                    }
                    return allMatches;
                })(), // Các trận trong vòng thi đấu này
            };

            for (let match of roundTemplate2.matches) {
                match.team2 = roundArray[z];
                z++;
                match.team1 = roundArray[z];
                z++;
                match.field = match.team1.homeGround;
                match.vongthidau = round;
                match.tenluotthidau = "Lượt về";
            }
            data.calendar.homeMatches.push(roundTemplate2);

            let temp = roundArray[1];
            for (let j = 1; j < roundArray.length - 1; j++) {
                roundArray[j] = roundArray[j + 1];
            }
            roundArray[roundArray.length - 1] = temp;
            i = 0;
            z = 0;
        }
    } else {
        const maxRound = data.allTeams.length;
        const matchPerRound = parseInt(data.allTeams.length / 2);
        let i = 1;
        let z = 1;
        for (let round = 1; round <= maxRound; round++) {
            const roundTemplate1 = {
                round: round, // Vòng thi đấu
                timeBegin: null,
                timeEnd: null,
                matches: (function () {
                    const allMatches = [];
                    for (let i = 1; i <= matchPerRound; i++) {
                        allMatches.push({
                            team1: null,
                            team2: null,
                            field: null,
                            vongthidau: null,
                            tenluotthidau: null,
                            date: null,
                            time: null,
                            result: {
                                team1Result: {
                                    totalGoals: null,
                                    goals: [],
                                },
                                team2Result: {
                                    totalGoals: null,
                                    goals: [],
                                },
                            },
                        });
                    }
                    return allMatches;
                })(), // Các trận trong vòng thi đấu này
            };

            for (let match of roundTemplate1.matches) {
                match.team1 = roundArray[i];
                i++;
                match.team2 = roundArray[i];
                i++;
                match.field = match.team1.homeGround;
                match.vongthidau = round;
                match.tenluotthidau = "Lượt đi";
            }
            data.calendar.awayMatches.push(roundTemplate1);

            const roundTemplate2 = {
                round: round + maxRound, // Vòng thi đấu
                timeBegin: null,
                timeEnd: null,
                matches: (function () {
                    const allMatches = [];
                    for (let i = 1; i <= matchPerRound; i++) {
                        allMatches.push({
                            team1: null,
                            team2: null,
                            field: null,
                            vongthidau: null,
                            tenluotthidau: null,
                            date: null,
                            time: null,
                            result: {
                                team1Result: {
                                    totalGoals: null,
                                    goals: [],
                                },
                                team2Result: {
                                    totalGoals: null,
                                    goals: [],
                                },
                            },
                        });
                    }
                    return allMatches;
                })(), // Các trận trong vòng thi đấu này
            };

            for (let match of roundTemplate2.matches) {
                match.team2 = roundArray[z];
                z++;
                match.team1 = roundArray[z];
                z++;
                match.field = match.team1.homeGround;
                match.vongthidau = round;
                match.tenluotthidau = "Lượt về";
            }
            data.calendar.homeMatches.push(roundTemplate2);

            let temp = roundArray[0];
            for (let j = 0; j < roundArray.length - 1; j++) {
                roundArray[j] = roundArray[j + 1];
            }
            roundArray[roundArray.length - 1] = temp;
            i = 1;
            z = 1;
        }
    }

    const originalData = JSON.parse(JSON.stringify(data));

    for (let homeOrAway of ["awayMatches", "homeMatches"]) {
        for (const round in data.calendar[homeOrAway]) {
            const allMatchesAddress = [];
            for (const match in data.calendar[homeOrAway][round].matches) {
                // Initialize result model and save it
                const newResultModel = await matchResultModel(
                    data.calendar[homeOrAway][round].matches[match].result
                );
                await newResultModel.save();
                data.calendar[homeOrAway][round].matches[match].result =
                    mongoose.Types.ObjectId(newResultModel._id);
                originalData.calendar[homeOrAway][round].matches[match].result =
                    newResultModel;

                data.calendar[homeOrAway][round].matches[match].team1 =
                    mongoose.Types.ObjectId(
                        data.calendar[homeOrAway][round].matches[match].team1
                            ._id
                    );
                data.calendar[homeOrAway][round].matches[match].team2 =
                    mongoose.Types.ObjectId(
                        data.calendar[homeOrAway][round].matches[match].team2
                            ._id
                    );

                const newMatch = await matchModel(
                    data.calendar[homeOrAway][round].matches[match]
                );
                await newMatch.save();
                allMatchesAddress.push(mongoose.Types.ObjectId(newMatch._id));
                originalData.calendar[homeOrAway][round].matches[match]._id =
                    newMatch._id;
            }
            data.calendar[homeOrAway][round].matches = allMatchesAddress;
        }
    }
    console.log("Save all matches successfully");
    data.isAcceptingRegister = false;
    const dataModel = await TourModel.findByIdAndUpdate(data._id, data, {
        new: true,
    });
    console.log("Save calendar successfully");
    originalData.isAcceptingRegister = false;
    res.status(200).json(originalData);
};

export const updateMatchData = async (req, res) => {
    const { id: _id } = req.params;
    const match = JSON.parse(JSON.stringify(req.body));
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(500).send("No match with that id");
    match.team1 = match.team1._id;
    match.team2 = match.team2._id;
    const updatedMatch = await matchModel.findByIdAndUpdate(_id, match, {
        new: true,
    });
    console.log("Update match successfully");
    res.json(req.body);
};

export const updateMatchResult = async (req, res) => {
    try {
        const { id: _id } = req.params;

        const matchResult = _.cloneDeep(req.body);

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(403).send("No match with that id");

        // Validate
        const tour = await TourModel.findOne();
        const sumTime = parseInt(
            matchResult.matchLength.minute * 60 + matchResult.matchLength.second
        );
        let sumResult1 = 0;
        let sumResult2 = 0;
        for (let teamiResult of ["team1Result", "team2Result"]) {
            for (const goal of matchResult[teamiResult].goals) {
                if (
                    parseInt(goal.minute * 60 + goal.second) > sumTime ||
                    parseInt(goal.minute * 60 + goal.second) < 0
                ) {
                    {
                        console.log(goal.minute * 60 + goal.second);
                        console.log(goal.minute * 60 + goal.second > sumTime);
                        console.log("Thời điểm của bàn thắng không hợp lệ");
                        return res
                            .status(500)
                            .send("Thời điểm của bàn thắng không hợp lệ");
                    }
                }

                // Validate sum goal
                if (goal.type !== "OG") {
                    if (teamiResult === "team1Result") sumResult1 += 1;
                    else sumResult2 += 1;
                } else {
                    if (teamiResult === "team2Result") sumResult1 += 1;
                    else sumResult2 += 1;
                }
            }
        }
        if (
            sumResult1 !== parseInt(matchResult.team1Result.totalGoals) ||
            sumResult2 !== parseInt(matchResult.team2Result.totalGoals)
        ) {
            console.log("Danh sách bàn thắng và tỉ số không đồng nhất");
            return res
                .status(500)
                .send("Danh sách bàn thắng và tỉ số không đồng nhất");
        }
        //.................................................

        // Create goal model to have reference
        for (let teami of ["team1Result", "team2Result"]) {
            const goalsAddress = [];
            for (const goal of matchResult[teami].goals) {
                if (!goal._id) {
                    const newGoalModel = await goalModel(goal);
                    await newGoalModel.save();
                    goalsAddress.push(newGoalModel._id);

                    // save goal an assistant
                    const player = await playerModel.findOne({
                        _id: newGoalModel.player,
                    });
                    player.allGoals.push(newGoalModel._id);
                    player.save();

                    const assistant = await playerModel.findOne({
                        _id: newGoalModel.assist,
                    });
                    assistant.allAssists.push(newGoalModel._id);
                    assistant.save();
                } else {
                    await goalModel.findByIdAndUpdate(goal._id, goal, {
                        new: true,
                    });
                    // save goal an assistant
                    const player = await playerModel.findOne({
                        _id: goal.player,
                    });
                    player.allGoals.push(goal._id);
                    player.save();

                    const assistant = await playerModel.findOne({
                        _id: goal.assist,
                    });
                    assistant.allAssists.push(goal._id);
                    assistant.save();
                }
                console.log("Added goal and assist to player");
            }
            if (goalsAddress.length > 0)
                _.update(matchResult, `${teami}.goals`, () => goalsAddress);
        }

        const updatedMatchResult = await matchResultModel.findByIdAndUpdate(
            matchResult._id,
            matchResult,
            {
                new: true,
            }
        );
        console.log("Update match result successfully");

        // Add game win or draw or lose
        const match = await matchModel.findOne({ _id: _id });
        const team1 = await teamModel.findOne({ _id: match.team1 });
        const team2 = await teamModel.findOne({ _id: match.team2 });
        if (
            parseInt(matchResult.team1Result.totalGoals) >
            parseInt(matchResult.team2Result.totalGoals)
        ) {
            team1.gameWin.push(updatedMatchResult._id);
            team2.gameLose.push(updatedMatchResult._id);

            team1.point += tour.winPoint;
            team2.point += tour.losePoint;

            console.log("Team1 win");
        } else if (
            parseInt(matchResult.team1Result.totalGoals) <
            parseInt(matchResult.team2Result.totalGoals)
        ) {
            team1.gameLose.push(updatedMatchResult._id);
            team2.gameWin.push(updatedMatchResult._id);

            team2.point += tour.winPoint;
            team1.point += tour.losePoint;

            console.log("Team2 win");
        } else {
            team1.gameDraw.push(updatedMatchResult._id);
            team2.gameDraw.push(updatedMatchResult._id);

            team1.point += tour.drawPoint;
            team2.point += tour.drawPoint;

            console.log("Draw");
        }
        
        team1.goalDifference =
            team1.goalDifference +
            matchResult.team1Result.totalGoals -
            matchResult.team2Result.totalGoals;
        team2.goalDifference =
            team2.goalDifference +
            matchResult.team2Result.totalGoals -
            matchResult.team1Result.totalGoals;

        await team1.save();
        await team2.save();
        console.log("Save match win lose successfully");
        //...............................................

        // Populating player objects in every goal to send back for rendering
        const updatedMatchResultForResponse = await updatedMatchResult.populate(
            [
                {
                    path: "team1Result.goals",
                    model: "goalModel",
                    populate: [
                        {
                            path: "player",
                            model: "playerModel",
                        },
                        {
                            path: "assist",
                            model: "playerModel",
                        },
                    ],
                },
                {
                    path: "team2Result.goals",
                    model: "goalModel",
                    populate: [
                        {
                            path: "player",
                            model: "playerModel",
                        },
                        {
                            path: "assist",
                            model: "playerModel",
                        },
                    ],
                },
            ]
        );

        res.status(200).json(updatedMatchResultForResponse);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
};

export const getPlayers = async (req, res) => {
    try {
        const data = req.body;
        const result = [];
        for (const playerAdd of data) {
            const player =
                typeof playerAdd === "string" || playerAdd instanceof String
                    ? await playerModel.findOne({ _id: playerAdd })
                    : playerAdd;
            result.push(player);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(404);
    }
};

export const getRank = async (req, res) => {
    try {
        const tour = await TourModel.findOne().populate({
            path: "allTeams",
            model: "teamModel",
        });
        tour.allTeams.sort(helperFunction.compareTeam);
        console.log("Get Rank successfully");
        res.status(200).json(tour.allTeams);
    } catch (error) {
        res.status(404).json(error);
    }
};

export const getRankPlayer = async (req, res) => {
    try {
        const tour = await TourModel.findOne().populate({
            path: "players",
            model: "playerModel",
        });
        tour.players.sort(helperFunction.comparePlayer);
        console.log("Get Rank Player successfully");
        res.status(200).json(tour.players);
    } catch (error) {
        res.status(404).json(error);
    }
};

export const changeTourRule = async (req, res) => {
    try {
        const tour = await TourModel.findOne();
        const newTourChange = req.body;

        const initializeTourData = {
            tourName: tour.tourName,
            maxTeam: tour.maxTeam,
            minTeam: tour.minTeam,
            maxPlayerOfTeam: tour.maxPlayerOfTeam,
            minPlayerOfTeam: tour.minPlayerOfTeam,
            maxForeignPlayer: tour.maxForeignPlayer,
            maxAge: tour.maxAge,
            minAge: tour.minAge,
        };

        await TourModel.findOneAndUpdate(
            { ...initializeTourData },
            { $set: newTourChange },
            { new: true }
        );
        console.log("Update tour rule successfully");
        res.status(200).send(newTourChange);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

export const acceptRegister = async (req, res, next) => {
    try {
        const { teamId } = req.body;
        const tour = await TourModel.findOne();
        const team = await teamModel.findById(teamId).populate({
            path: "playerList",
            model: "playerModel",
        });
        tour.allTeams.push(team._id);

        team.playerList.forEach((player) => {
            tour.players.push(player._id);
        });

        _.remove(tour.registerList, (teamRegiter) => {
            return teamRegiter._id.equals(team._id);
        });

        await TourModel.findByIdAndUpdate(tour._id, tour);
        console.log("Team accepted successfully");
        next();
    } catch (error) {
        res.status(404).send(error.message);
    }
};
