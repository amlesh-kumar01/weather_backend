import mongoose from "mongoose";
import User from "../models/user.model.js";
import Location from "../models/location.model.js";

async function addLocation(req, res) {
  try {
    // getting the username and id of the user after login
    const locationName = req.params.location;
    const username = req.user.username;
    const userId = req.user._id;

    const user = await User.findOne({ $or: [{ username }, { _id: userId }] });

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new location
    const newLocation = new Location({
      name: locationName,
      createdBy: user._id,
    });

    // Save the new location
    await newLocation.save();

    // Add the location's ObjectId to the user's savedLocations array
    user.savedLocations.push(newLocation._id);

    // Save the updated user
    await user.save();

    res.status(200).send("Location added successfully");
  } catch (error) {
    res.status(404).send("Error adding location:", error);
  }
}

async function removeLocation(req, res) {
  try {
    // Getting the username and id of the user after login
    const locationName = req.params.location;
    const username = req.user.username;
    const userId = req.user._id;

    // Find the user by username or userId
    const user = await User.findOne({ $or: [{ username }, { _id: userId }] });

    if (!user) {
      throw new Error("User not found");
    }

    // Find the location to be removed by its name and createdBy field
    const location = await Location.findOne({
      name: locationName,
      createdBy: user._id,
    });

    if (!location) {
      throw new Error("Location not found");
    }

    // Remove the location from the Location collection
    await Location.deleteOne({ _id: location._id });

    // Remove the location's ObjectId from the user's savedLocations array
    user.savedLocations = user.savedLocations.filter(
      (locId) => !locId.equals(location._id)
    );

    // Save the updated user
    await user.save();

    res.status(200).send("Location removed successfully");
  } catch (error) {
    res.status(404).send(`Error removing location: ${error.message}`);
  }
}

async function getAllLocations(req, res) {
    try {
      // Getting the username and id of the user after login
      const username = req.user.username;
      const userId = req.user._id;
  
      // Find the user by username or userId
      const user = await User.findOne({ $or: [{ username }, { _id: userId }] });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Retrieve all locations associated with the user
      const locations = await Location.find({ _id: { $in: user.savedLocations } });
  
      res.status(200).json(locations);
    } catch (error) {
      res.status(404).send(`Error retrieving locations: ${error.message}`);
    }
  }

export { addLocation, removeLocation, getAllLocations };
