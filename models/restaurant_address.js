const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantaddress_Schema = new Schema({
  Restaurant_Name: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  Address_Locality: {
    type: String,
    required: [true, "Address is required"],
  },
  Address_City: {
    type: String,
    required: [true, "City is required"],
  },
  Address_Pincode: {
    type: String,
    required: [true, "PINCODE is required"],
  }
});

module.exports = mongoose.model("Restaurant_Address", restaurantaddress_Schema,'RestaurantAdd_Collection');