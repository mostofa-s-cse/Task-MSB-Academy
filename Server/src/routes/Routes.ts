import express from "express";
import DocumentController from "../controllers/DocumentController";

const router = express.Router();


// chat Routing
router.post("/api/chat", DocumentController.generateResponse);
router.get("/api/chatHistory", DocumentController.getAllHistory);

export default router;