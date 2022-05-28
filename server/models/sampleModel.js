import mongoose from "mongoose";

const seasonSchema = mongoose.Schema({
    // id
    seasonName: String,
    dateStart: Date,
    dateEnd: Date,
});
export const seasonModel = mongoose.model("seasonModel", seasonSchema);

const playerSchema = mongoose.Schema({
    // id
    playerName: String,
    dateOfBirth: Date,
    nationality: String,
    playerNote: String,
    playerType: {
        type: mongoose.Types.ObjectId,
        ref: "playerTypeModel",
    },
    playerPicture: String,
});
export const playerModel = mongoose.model("playerModel", playerSchema);

const playerTypeSchema = mongoose.Schema({
    // id
    playerTypeName: {
        type: String,
        enum: ["Trong nước", "Ngoài nước"],
    },
});
export const playerTypeModel = mongoose.model(
    "playerTypeModel",
    playerTypeSchema
);

const teamSchema = mongoose.Schema({
    // id
    teamName: String,
    establishDate: Date,
});
export const teamModel = mongoose.model("teamModel", teamSchema);

const teamSeasonSchema = mongoose.Schema({
    // id Mã tham gia
    season: { type: mongoose.Types.ObjectId, ref: "seasonModel" },
    team: { type: mongoose.Types.ObjectId, ref: "teamModel" },
    field: { type: mongoose.Types.ObjectId, ref: "fieldModel" },
});
export const teamSeasonModel = mongoose.model(
    "teamSeasonModel",
    teamSeasonSchema
);

const teamSeasonPlayerSchema = mongoose.Schema({
    // id MaThiDau Mã thi đấu
    attending: { type: mongoose.Types.ObjectId, ref: "teamSeasonModel" },
    player: { type: mongoose.Types.ObjectId, ref: "playerModel" },
});
export const teamSeasonPlayerModel = mongoose.model(
    "teamSeasonPlayerModel",
    teamSeasonPlayerSchema
);

const fieldSchema = mongoose.Schema({
    // id
    fieldName: String,
    address: String,
});
export const fieldModel = mongoose.model("fieldModel", fieldSchema);

const refereeSchema = mongoose.Schema({
    // id
    refereeName: String,
    dateOfBirth: Date,
});
export const refereeModel = mongoose.model("refereeModel", refereeSchema);


const matchSchema = mongoose.Schema({
    // id
    season: { type: mongoose.Types.ObjectId, ref: "seasonModel" },
    round: { type: mongoose.Types.ObjectId, ref: "wayModel" },
    team1: { type: mongoose.Types.ObjectId, ref: "teamModel" },
    team2: { type: mongoose.Types.ObjectId, ref: "teamModel" },
    field: { type: mongoose.Types.ObjectId, ref: "fieldModel" },
    referee: { type: mongoose.Types.ObjectId, ref: "refereeModel" },
    timePrediction: Date,
    timeReality: Date,
    timeLength: Number,
    goalTeam1: Number,
    goalTeam2: Number,
    result: { type: mongoose.Types.ObjectId, ref: "resultModel" },
});
export const matchModel = mongoose.model("matchModel", matchSchema);


const waySchema = mongoose.Schema({
    // id
    wayName: {
        type: String,
        enum: ["Lượt đi", "Lượt về"],
    },
});
export const wayModel = mongoose.model("wayModel", waySchema);


const mainPlayerInTheMatchSchema = mongoose.Schema({
    match: { type: mongoose.Types.ObjectId, ref: "matchModel" },
    attending: { type: mongoose.Types.ObjectId, ref: "teamSeasonPlayerModel" },
    playerNumber: Number,
    position: { type: mongoose.Types.ObjectId, ref: "teamSeasonPlayerModel" },
});
export const mainPlayerInTheMatchModel = mongoose.model("mainPlayerInTheMatchModel", mainPlayerInTheMatchSchema);

const positionSchema = mongoose.Schema({
    // id
    positionName: String,
});
export const positionModel = mongoose.model("positionModel", positionSchema);


const playerScoredSchema = mongoose.Schema({
    match: { type: mongoose.Types.ObjectId, ref: "matchModel" },
    attending: { type: mongoose.Types.ObjectId, ref: "teamSeasonPlayerModel" },
    time: {
        minute: Number,
        second: Number,
    },
    goalType: { type: mongoose.Types.ObjectId, ref: "goalTypeModel" }
});
export const playerScoredModel = mongoose.model("playerScoredModel", playerScoredSchema);

const goalTypeSchema = mongoose.Schema({
    // _id Mã loại bàn thắng
    nameGoalType: {
        type: String
    }
})
export const goalTypeModel = mongoose.model("goalTypeModel", goalTypeSchema);

const pointSchema = mongoose.Schema({
    // _id: Mã kết quả
    name: String,
    point: Number
})
export const pointModel = mongoose.model("pointModel", pointSchema);

const prioritySchema = mongoose.Schema({
    // id Mã ưu tiên
})

const rankingTeam = mongoose.Schema({
    // id
})