import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const THAMSO = {
    ThoiLuongThiDauToiDa: 120,
    ThoiDiemGhiBanToiThieu: 0,
    ThoiDiemGhiBanToiDa: 120,
};

const playerSchema = mongoose.Schema({
    playerName: { type: String, require: [true, "Vui lòng nhập tên cầu thủ"] },
    dayOfBirth: Date,
    nationality: { type: String, require: [true, "Vui lòng nhập quốc tịch"] },
    playerType: {
        type: String,
        enum: ["Tiền đạo", "Tiền vệ", "Hậu vệ", "Thủ môn", ""],
    },
    teamName: { type: String },
    allGoals: [{ type: mongoose.Types.ObjectId, ref: "goalModel" }],
    allAssists: [{ type: mongoose.Types.ObjectId, ref: "goalModel" }],
});

const teamSchema = mongoose.Schema({
    // id
    teamName: {
        type: String,
        required: [true, "Vui lòng bổ sung tên đội"],
        unique: true,
    },
    homeGround: {
        type: String,
        required: [true, "Vui lòng bổ sung tên sân nhà"],
    },
    playerList: {
        type: [{ type: mongoose.Types.ObjectId, ref: "playerModel" }],
        required: [true, "Vui lòng nhập danh sách cầu thủ"],
    },
    gameWin: [{ type: mongoose.Types.ObjectId, ref: "matchModel" }],
    gameDraw: [{ type: mongoose.Types.ObjectId, ref: "matchModel" }],
    gameLose: [{ type: mongoose.Types.ObjectId, ref: "matchModel" }],
    point: { type: Number, default: 0 },
    goalDifference: { type: Number, default: 0 },
});

const goalSchema = mongoose.Schema({
    name: String,
    player: {
        type: mongoose.Types.ObjectId,
        ref: "playerModel",
        required: [true, "Vui lòng nhập cầu thủ ghi bàn"],
    },
    assist: {
        type: mongoose.Types.ObjectId,
        ref: "playerModel",
    },
    type: String,
    minute: {
        type: Number,
        required: [true, "Vui lòng nhập thời điểm (phút) của bàn thắng"],
    },
    second: {
        type: Number,
        required: [true, "Vui lòng nhập thời điểm (giây) của bàn thắng"],
    },
});

const matchResultSchema = mongoose.Schema({
    matchLength: {
        minute: Number,
        second: Number,
    },
    team1Result: {
        totalGoals: Number,
        goals: [
            {
                type: mongoose.Types.ObjectId,
                ref: "goalModel",
            },
        ],
    },
    team2Result: {
        totalGoals: Number,
        goals: [
            {
                type: mongoose.Types.ObjectId,
                ref: "goalModel",
            },
        ],
    },
});

const matchSchema = mongoose.Schema({
    team1: {
        type: mongoose.Types.ObjectId,
        ref: "teamModel",
    },
    team2: {
        type: mongoose.Types.ObjectId,
        ref: "teamModel",
    },
    playerAttending: {
        team1: [
            {
                type: mongoose.Types.ObjectId,
                ref: "playerModel",
            },
        ],
        team2: [
            {
                type: mongoose.Types.ObjectId,
                ref: "playerModel",
            },
        ],
    },
    field: String,
    vongthidau: Number,
    tenluotthidau: String,
    date: String,
    time: String,
    result: { type: mongoose.Types.ObjectId, ref: "matchResultModel" },
});

// Database lịch thi đấu
const TourSchema = mongoose.Schema({
    allTeams: [{ type: mongoose.Types.ObjectId, ref: "teamModel" }], // Tất cả các đội
    players: [{ type: mongoose.Types.ObjectId, ref: "playerModel" }], // Tất cả các cầu thủ
    calendar: {
        // Lịch thi đấu
        awayMatches: [
            // Lượt đi chứa danh sách các vòng thi đấu và các trận trong vòng thi đấu đó
            {
                round: Number, // Vòng thi đấu
                timeBegin: Date,
                timeEnd: Date,
                matches: [{ type: mongoose.Types.ObjectId, ref: "matchModel" }], // Các trận trong vòng thi đấu này
            },
        ],
        homeMatches: [
            // Lượt về chứa danh sách các vòng thi đấu và các trận trong vòng thi đấu đó
            {
                round: Number, // Vòng thi đấu
                timeBegin: Date,
                timeEnd: Date,
                matches: [{ type: mongoose.Types.ObjectId, ref: "matchModel" }], // Các trận trong vòng thi đấu này
            },
        ],
    },
    tourName: String,
    maxTeam: Number,
    minTeam: Number,
    maxPlayerOfTeam: Number,
    minPlayerOfTeam: Number,
    maxForeignPlayer: Number,
    maxAge: Number,
    minAge: Number,
    isAcceptingRegister: {
        type: Boolean,
        default: true,
    },
    isClosed: {
        type: Boolean,
        default: false,
    },
    dateStart: Date,
    dateEnd: Date,
    winPoint: {
        type: Number,
        default: 3,
    },
    drawPoint: {
        type: Number,
        default: 1,
    },
    losePoint: {
        type: Number,
        default: 0,
    },
    registerList: [{ type: mongoose.Types.ObjectId, ref: "teamModel" }],
});

const seasonSchema = mongoose.Schema({
    // MaMua: Object id
    seasonName: {
        type: String,
        required: true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: Date,
});

// export const tourModel = mongoose.model("tourModel", tourSchema);
export const goalModel = mongoose.model("goalModel", goalSchema);
export const matchResultModel = mongoose.model(
    "matchResultModel",
    matchResultSchema
);
export const playerModel = mongoose.model("playerModel", playerSchema);
export const teamModel = mongoose.model("teamModel", teamSchema);
export const TourModel = mongoose.model("TourModel", TourSchema);
export const matchModel = mongoose.model("matchModel", matchSchema);

/* User */

const userSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
    },
    country: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 2,
        select: false,
    },
    role: {
        type: String,
        enum: ["teamManager", "adMin"],
        default: "teamManager",
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: "teamModel",
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const userModel = mongoose.model("userModel", userSchema);
