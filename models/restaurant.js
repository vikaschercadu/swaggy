const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurant_Schema = new Schema({
  Restaurant_Name: {
    type: String,
    required: [true, "Name is required"]
  },
  Restaurant_Email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address"
    ]
  },
  Restaurant_Phone: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please enter a valid mobile number"]
  },
  Restaurant_Password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
      "Pasword should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ]
  },        
  Restaurant_Image: {
    type: String
  },
  Restaurant_Address: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant_Address'
  },
  Restaurant_Token: {
    type: String
  },
  Restaurant_Active: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Restaurant", customerSchema,'Restaurant_Collection');