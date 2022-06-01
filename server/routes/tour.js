import express from "express";
import {
    getTeams,
    createTeam,
    getTour,
    updateTour,
    updateMatchData,
    updateMatchResult,
    getPlayers,
    createTour,
    getRank,
    getRankPlayer,
    changeTourRule,
    acceptRegister,
    fetchOneTeam,
    deleteRegister,
    endTour
} from "../controllers/tour.js";
import { UserProtection, AdminProtection } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTeams);
router.post("/", UserProtection, createTeam);
router.get("/calendar", getTour);
router.post("/calendar", AdminProtection, createTour);
router.patch("/calendar", AdminProtection, updateTour);
router.put("/calendar/:id", AdminProtection, updateMatchData);
router.put("/calendar/result/:id", AdminProtection, updateMatchResult);
router.post("/players", getPlayers);
router.get("/ranking", getRank);
router.get("/rankingPlayer", getRankPlayer);
router.patch("/rule", AdminProtection, changeTourRule);
router.post("/acceptregister", AdminProtection, acceptRegister, getTour);
router.post("/deleteregister", AdminProtection, deleteRegister);
router.get("/team/:teamId", fetchOneTeam)
router.post("/endtour", AdminProtection, endTour)

export default router;
