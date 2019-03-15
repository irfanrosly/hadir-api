import Device from "../models/device";
exports.index = function(req, res) {
  Device.find(function(err, device) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Devices retrieved successfully",
      data: device
    });
  });
};
// Handle create contact actions
exports.new = function(req, res) {
  var device = new Device();
  device.name = req.body.name ? req.body.name : device.name;
  device.type = req.body.type;
  // save the contact and check for errors
  device.save(function(err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: "New device created!",
      data: device
    });
  });
};
// Handle view contact info
exports.view = function(req, res) {
  Device.findById(req.params.device_id, function(err, device) {
    if (err) res.send(err);
    res.json({
      message: "Device details loading..",
      data: device
    });
  });
};
// Handle update contact info
exports.update = function(req, res) {
  Device.findById(req.params.device_id, function(err, device) {
    if (err) res.send(err);
    device.name = req.body.name ? req.body.name : device.name;
    device.type = req.body.type;
    // save the contact and check for errors
    device.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Device Info updated",
        data: device
      });
    });
  });
};
// Handle delete contact
exports.delete = function(req, res) {
  Device.remove(
    {
      _id: req.params.device_id
    },
    function(err, device) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Device deleted"
      });
    }
  );
};
