// Initialize express router
let router = require("express").Router();

// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API is working!",
    message: "Welcome to HADIR API crafted by Toi!"
  });
});

// Import controller
var deviceController = require("../controller/deviceController");
var studentController = require("../controller/studentController");
var attendanceController = require("../controller/attendanceController.js");

// Device routes
router
  .route("/devices")
  .get(deviceController.index)
  .post(deviceController.new);
router
  .route("/device/:device_id")
  .get(deviceController.view)
  .patch(deviceController.update)
  .put(deviceController.update)
  .delete(deviceController.delete);

//Student routes
router
  .route("/students")
  .get(studentController.index)
  .post(studentController.new);

router.route("/student/:year/:class").get(studentController.view);

router.route("/student/:id").delete(studentController.delete);

// Attendance routes
router
  .route("/attendance")
  .get(attendanceController.index)
  .post(attendanceController.new);

router.route("/attendance/:date/:year/:class").get(attendanceController.view);

// Export API routes
module.exports = router;
