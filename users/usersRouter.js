const express = require("express");
const Users = require("./UsersModel");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await Users.create(req.body);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Users.remove(req.params.id);

    res.status(201).json({ msg: `User Removed` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
