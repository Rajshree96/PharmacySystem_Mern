import Bank from "../models/bankModal.js";


// Controller function for adding a bank
export const addBank = async (req, res) => {
  try {
    const bank = new Bank(req.body);
    await bank.save();
    res.status(201).json({message:"Bank added successfully",bank});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function for getting all banks
export const getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.find();
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function for editing a bank
export const editBank = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBank = await Bank.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBank) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    res.status(200).json({message:"Bank Updated Successfully", updatedBank});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller function for deleting a bank
 export const deleteBank = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBank = await Bank.findByIdAndDelete(id);
    if (!deletedBank) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    res.status(200).json({ message: 'Bank deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};