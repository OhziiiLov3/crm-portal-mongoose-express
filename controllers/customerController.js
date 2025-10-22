const Customer = require('../models/customer');



// get all customers from db 
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// add a new customer to db 
const addCustomer = async (req, res) => {
    const { name, age, email, phone, status, isActive } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required." });
    };

    try {
        const customer = await Customer.create({
            name,
            age,
            email,
            phone,
            status,
            isActive
        });
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Get Customer by ID
const getCustomerById = async (req,res)=>{
    const {id} = req.params
    try {
        const customer = await Customer.findById(id);
        if(!customer) return res.status(404).json({message: 'Customer not found'});
        res.json(customer)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

// Update Customer By Id
const updateCustomer = async (req,res) =>{
    const {id} = req.params
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            req.body,
            {new:true, runValidators: true}
        );
        if(!updateCustomer){
            return res.status(404).json({message: 'Customer not found'})
        };
        res.json(updateCustomer);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const deleteCustomer = async (req,res) => {
    const {id} = req.params
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if(!deletedCustomer){
            return res.status(404).json({message: 'Customer not found.'})
        };
        res.json({message: 'Customer deleted successfully'});
        
    } catch (error) {
       res.status(500).json({error: error.message})
    }
};

module.exports = {
    getAllCustomers,
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}