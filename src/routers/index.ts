import express from "express";
const router = express.Router();

// test
router.get("/", (req, res) => {
  res.send({ message: "hello mongoexp" });
});

export default router;
