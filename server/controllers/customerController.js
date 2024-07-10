import Customer from "../models/customerModal.js";
// Add a new customer
export async function addCustomer(req, res) {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({ message: "Customer added successfully", customer });
    } catch (error) {
        res.status(400).json({ message: "Error adding customer", error });
    }
}

// Get all customers
export async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving customers", error });
    }
}


// Edit a customer
export async function editCustomer(req, res) {
    try {
        const customerId = req.params.id;
        const updates = req.body;

        // Find the customer by ID
        let customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Update customerDetails fields if they exist in the request body
        if (updates.customerDetails) {
            for (const key in updates.customerDetails) {
                if (updates.customerDetails.hasOwnProperty(key)) {
                    customer.customerDetails[key] = updates.customerDetails[key];
                }
            }
        }

        // Save the updated customer
        const updatedCustomer = await customer.save();

        res.status(200).json({ message: "Customer updated successfully", updatedCustomer });
    } catch (error) {
        res.status(400).json({ message: "Error updating customer", error });
    }
}


// Delete a customer
export async function deleteCustomer(req, res) {
    try {
        const customerId = req.params.id;
        const deletedCustomer = await Customer.findByIdAndDelete(customerId);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error });
    }
}
