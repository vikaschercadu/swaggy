const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerAddress_Schema = new Schema({
  Customer_Name: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
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

module.exports = mongoose.model("Customer_Address", customerAddress_Schema,'customeradd_Collection');