import { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { login, signup } from "../Controllers/AuthController.js";
import ensureAuthenticated from "../Middlewares/Auth.js";
import {addLocation,removeLocation,getAllLocations} from "../Controllers/LocationController.js";

const router = Router();

router.route("/").get(async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/addloc/:userInfo/:location").post(ensureAuthenticated, addLocation);

router.route("/removeloc/:userInfo/:location").post(ensureAuthenticated, removeLocation);

router.route("/getlocs/:userInfo").get(ensureAuthenticated,getAllLocations)


export default router;
