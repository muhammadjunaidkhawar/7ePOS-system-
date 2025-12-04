import express from "express";
import {
  loginUser,
  getProfile,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// list users
router.get("/", getUsers);

// get profile (optionally ?username=)
router.get("/profile", getProfile);

// create user
router.post("/", createUser);

// update user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// login (kept for compatibility)
router.post("/login", loginUser);

export default router;
