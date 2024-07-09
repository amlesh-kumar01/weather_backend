import { Schema as _Schema, model } from "mongoose";

const userSchema = new _Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password : {
      type: String,
      required: true
    },
    savedLocations: [{
      type: _Schema.Types.ObjectId,
      ref:'Location'
    }]
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

export default User;