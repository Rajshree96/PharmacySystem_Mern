import experss from "express";
import { addJournal } from "../controllers/journalController.js";

const journalRouter = experss.Router();

journalRouter.post("/add", addJournal);

export default journalRouter;

