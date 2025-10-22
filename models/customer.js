const mongoose = require('mongoose');

// Defina model 
const customerSchema = new mongoose.Schema({
    name:{type: String, required: true, trim: true},
    age: {type: Number},
    email:{type: String, required: true, unique: true},
    phone: {type:String},
    status: {type: String, enum:['lead','prospect','customer']},
    isActive:{ type:Boolean, default:true},
    createdAt: {type: Date, default: Date.now}
});







const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;