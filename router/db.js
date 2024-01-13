const { Router } = require("express")
const router = Router()
const metodosBd = require("../controllers/db")
router.get("/",metodosBd.getAll)
router.get("/:id",metodosBd.getId)
router.get("/view/:id",metodosBd.getContentId)
router.post("/filter",metodosBd.getFilter)
router.post("/",metodosBd.insert)
router.delete("/",metodosBd.deleteAll)
router.delete("/:id",metodosBd.deleted)

module.exports= router;