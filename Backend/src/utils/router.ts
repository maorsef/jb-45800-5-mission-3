import { Router } from "express";
import * as groupController from "../controllers/groupController";
import * as meetingController from "../controllers/meetingController";

const router = Router();

router.get("/groups", groupController.getAllGroups);

// Must be registered before /meetings/:id so "group" is not captured as id
router.get("/meetings/group/:groupId", meetingController.getMeetingsByGroup);

router.get("/meetings/:id", meetingController.getMeetingById);
router.post("/meetings", meetingController.createMeeting);
router.put("/meetings/:id", meetingController.updateMeeting);
router.delete("/meetings/:id", meetingController.deleteMeeting);

export default router;
