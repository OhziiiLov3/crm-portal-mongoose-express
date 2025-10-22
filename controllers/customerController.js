const Customer = require('../models/customer');


// get all customers from db (filter by name, email, status, isActive)
const getAllCustomers = async (req, res) => {
    try {
     const { name, email, status, isActive, sortBy, order, page = 1, limit = 10 } = req.query;

    // filter object 
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' }
    if (email) filter.email = { $regex: email, $options: 'i' }
    if (status) filter.status = status;
    if (isActive !== undefined) filter.isActive = isActive === 'true'

    // Sorting 
    const sortOptions = {}
    if(sortBy){
        sortOptions[sortBy] = order === 'desc' ? - 1 : 1;
    }else{
        sortOptions.createdAt = - 1
    }

   // Pagination 
   const pageNumber = parseInt(page, 10);
   const pageSize = parseInt(limit, 10);
   const skip = (pageNumber - 1) * pageSize;


    // Query DB
    const customers = await Customer.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);

    // Count total (for frontend pagination UI);
    const total = await Customer.countDocuments(filter);

    res.json({
        total,
        page: pageNumber,
        totalPages: Math.ceil(total/pageSize),
        results: customers,
    });
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
const getCustomerById = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await Customer.findById(id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Update Customer By Id
const updateCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updateCustomer) {
            return res.status(404).json({ message: 'Customer not found' })
        };
        res.json(updateCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const deleteCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found.' })
        };
        res.json({ message: 'Customer deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports = {
    getAllCustomers,
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}