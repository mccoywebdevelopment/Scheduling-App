var mongoose = require("mongoose");

var CustomerSchema = new mongoose.Schema({
    customerID:{type:String,required:true}
});

module.exports = mongoose.model("Customer", CustomerSchema);