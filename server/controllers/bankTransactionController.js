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
                        toAccount,  
                        amount,
                       
                       
 
                    });
                    break;
                    case 'Cash Withdrawal from Bank':
                        transaction = new Transaction({
                            transactionType,
                            date,
                            contraNo,
                            fromAccount,
                            amount,
                          
                        });
                        break;
                        default:
                            return res.status(400).json({ message: 'Invalid transaction type' });
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