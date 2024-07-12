import Payment from "../models/paymentModel.js";
import PurchaseModal from "../models/purchaseModal.js";


// Add a new payment record
export const addPayment = async (req, res) => {
    const { paymentType, cash, bank , invoiceNumber} = req.body;
    try {

    const purchase = await PurchaseModal.findOne({ invoiceNumber });
            if (!purchase) {
                return res.status(404).json({ message: "Purchase not found" });
            }

   
        let newPaymentData = {};
        if (paymentType === 'cash') {

            
            newPaymentData = {
                cash: {
                    amount: purchase.amounts.netAmount,
                    avance: cash.avance,
                    paid: cash.paid,
                    balance: cash.balance,
                    description: cash.description
       }
            };
        } else if (paymentType === 'bank') {
            if (bank.paymentMethod === 'online') {
                newPaymentData = {
                    Bank: {
                        selectBank: bank.selectBank,
                        paymentMethod: {
                            online: {
                                transactionDate: bank.online.transactionDate,
                                transactionNo: bank.online.transactionNo
                            }
                        }
                    }
                };
            } else if (bank.paymentMethod === 'cheque') {
                newPaymentData = {
                    Bank: {
                        selectBank: bank.selectBank,
                        paymentMethod: {
                            cheque: {
                                transactionDate: bank.cheque.transactionDate,
                                chequeNo: bank.cheque.chequeNo,
                                advance: bank.cheque.advance,
                                paid: bank.cheque.paid,
                                balance: bank.cheque.balance,
                                description: bank.cheque.description
                            }
                        }
                    }
                };
            }
        }

        const newPayment = new Payment(newPaymentData);
        await newPayment.save();

        // Include the netAmount in the response
        const response = {
            ...newPayment._doc,
            cash: newPayment.cash ? { ...newPayment.cash, netAmount: purchase.amounts.netAmount } : undefined
        };

        res.status(201).json({ message: "Payment added successfully", newPayment: response });
    } catch (error) {
        res.status(400).json({ message: "Failed to add payment", error: error.message });
    }
};
