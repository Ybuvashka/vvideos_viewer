const Router = require("express");
const router = new Router();
const CoverController = require("../controllers/cover.controller");

router
  .route("/")
  .post(CoverController.createCover)
  .get(CoverController.getAllCovers);
router
  .route("/:slug")
  .patch(CoverController.updateCover)
  .get(CoverController.getCover)
  .delete(CoverController.deleteCover);
  
module.exports = router;
