import Transaction from "../models/bankTranscationModal.js";


export const createTransaction = async (req, res) => {
    try {
        const { transactionType, date, contraNo, fromAccount, toAccount, amount } = req.body;

        let transaction;

        switch(transactionType) {
            case 'Bank to Bank':
                transaction = new Transaction({
                    transactionType,
                    date,
                    contraNo,
                    fromAccount, 
                    toAccount,   
                });
                break;
                case 'Cash Deposit in Bank':
                    transaction = new Transaction({
                        transactionType,
                        date,
                        contraNo,
                        amount,
                        toAccount,  
                        
                       
                       
 
                    });
                    break;
                    case 'Cash Withdrawal from Bank':
                        transaction = new Transaction({
                            transactionType,
                            date,
                            contraNo,
                            amount,
                            fromAccount,
                            
                          
                        });
                        break;
                        default:
                            return res.status(400).json({ message: 'Invalid transaction type' });
                    }

                    const validationError = transaction.validateSync(); // This will synchronously validate the schema
 
                    if (validationError) {
                        // If validation fails, respond with a 400 Bad Request status and error details
                        console.log(validationError.message)
                        return res.status(400).json({ message: validationError.message });
                    }
                    await transaction.save();
                    res.status(201).json({ message: 'Transaction created successfully', transaction });
                } catch (error) {
                    res.status(400).json({ message: 'Transaction creation failed', error: error.message });
                }
            };

            export const getTransactions = async (req, res) => {
                try {
                    const transactions = await Transaction.find();
                    res.status(200).json(transactions);
                } catch (error) {
                    res.status(400).json({ message: 'Failed to fetch transactions', error: error.message });
                }
            };

            export const getAllTransactions = async (req, res) => {
                try {
                    const transactions = await Transaction.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
                    res.status(200).json({
                        success: true,
                        count: transactions.length,
                        data: transactions
                    });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        message: 'Server Error',
                        error: error.message
                    });
                }
            };
