import Transaction from "../models/bankTranscationModal.js";


export const createTransaction = async (req, res) => {
    try {
        console.log("Received request body:", req.body);


        const { transactionType, date, contraNo, fromAccount, toAccount, amount  } = req.body;

        if (amount === undefined || amount === null ||  amount === '') {
            return res.status(400).json({ message: 'Amount is required' });
        }

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
          return res.status(400).json({ message: 'Amount must be a valid number' });
        }

        let transaction;


       
      
        switch(transactionType) {
            case 'Bank to Bank':
                transaction = new Transaction({
                    transactionType,
                    date,
                    contraNo,
                    fromAccount, 
                    toAccount,   
                    amount:parsedAmount
                });
                break;
                case 'Cash Deposit in Bank':
                    transaction = new Transaction({
                        transactionType,
                        date,
                        contraNo,
                        amount: parsedAmount,
                        toAccount,  
                        
                       
                       
 
                    });
                    console.log(amount);
                    break;
                    case 'Cash Withdrawal from Bank':
                        transaction = new Transaction({
                            transactionType,
                            date,
                            contraNo,
                            amount: parsedAmount, 
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
                    // console.log(transaction)
                    const savedTransaction = await transaction.save();
                    console.log("Saved transaction:", savedTransaction);

                    res.status(201).json({ 
                        message: 'Transaction created successfully', 
                        transaction: savedTransaction.toObject()  // Convert to plain object to ensure all fields are included
                    });

                    
                    // res.status(201).json({ message: 'Transaction created successfully', transaction });
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

            // New delete controller
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the transaction exists
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }
          // Delete the transaction

          await Transaction.findByIdAndDelete(id);

          res.status(200).json({
              success: true,
              message: 'Transaction deleted successfully'
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Server Error',
              error: error.message
          });
      }
    };
