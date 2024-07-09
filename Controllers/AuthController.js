import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. Try Different Username",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        
        const jwtToken = jwt.sign(
            { username: user.username, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login Successful",
            jwtToken,
            success: true,
        });
        } else {
        res
            .status(400)
            .json({ message: "Invalid username or password", success: "false" ,});
        }
  } catch (error) {
        res.status(400).json({ error: error.message });
  }
};

export { signup, login };
