import Income from "../models/incomeModal.js";
import Bank from "../models/bankModal.js";


export const addIncome = async (req, res)=>{
    try {
        const { method, transaction, chequeNO, bank } = req.body;

    // Validate that transaction is provided if method is Online
    if (method === 'Online' && !transaction) {
      return res.status(400).json({ message: 'Transaction number is required for Online method' });
    }

    // Validate that chequeNO is provided if method is Cheque
    if (method === 'Cheque' && !chequeNO) {
      return res.status(400).json({ message: 'Cheque number is required for Cheque method' });
    }

    // Validate the bank reference
    const bankRecord = await Bank.findById(bank);
    if (!bankRecord) {
      return res.status(404).json({ message: 'Bank not found' });
    }

    // Create the income entry
    const income = new Income(req.body);
    await income.save();

    // Populate the bank field with the bank name
    await income.populate('bank', 'bankName').execPopulate();

    res.status(201).json(income);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}