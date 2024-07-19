
import PurchaseModal from "../models/purchaseModal.js";
import Payment from '../models/paymentModel.js'; // Adjust the import path as needed

export  const addPayment = async (req, res) => {
  try {
    const {
      paymentType,
      orderNo,
      cash,
      bank
    } = req.body;

    console.log('Request body:', req.body);

    // Validate presence of paymentType and orderNo
    if (!paymentType || !orderNo) {
      return res.status(400).json({ message: 'Payment type and order number are required' });
    }
    const purchase = await PurchaseModal.findOne({ orderNo });
                if (!purchase) {
                    return res.status(404).json({ message: "Purchase not found" });
                }
    // Validate paymentType
    if (!['cash', 'bank'].includes(paymentType)) {
      return res.status(400).json({ message: 'Invalid payment type' });
    }

    let paymentData = { paymentType, orderNo };

    if (paymentType === 'cash') {
      if (!cash || !cash.amount || cash.advance === undefined || cash.paid === undefined || cash.balance === undefined || !cash.description) {
        return res.status(400).json({ message: 'All cash payment fields are required' });
      }
      paymentData.cash = cash;
    } else if (paymentType === 'bank') {
      if (!bank || !bank.selectBank || !bank.paymentMethod) {
        return res.status(400).json({ message: 'Bank selectBank and paymentMethod are required' });
      }

      paymentData.bank = {
        selectBank: bank.selectBank,
        paymentMethod: bank.paymentMethod
      };

      if (bank.paymentMethod === 'online') {
        if (!bank.online || !bank.online.transactionDate || !bank.online.transactionNo || bank.online.advance === undefined || bank.online.paid === undefined || bank.online.balance === undefined || !bank.online.description) {
          return res.status(400).json({ message: 'All online payment fields are required' });
        }
        paymentData.bank.online = bank.online;
      } else if (bank.paymentMethod === 'cheque') {
        if (!bank.cheque || !bank.cheque.transactionDate || !bank.cheque.chequeNo || bank.cheque.advance === undefined || bank.cheque.paid === undefined || bank.cheque.balance === undefined || !bank.cheque.description) {
          return res.status(400).json({ message: 'All cheque payment fields are required' });
        }
        paymentData.bank.cheque = bank.cheque;
      } else {
        return res.status(400).json({ message: 'Invalid bank payment method' });
      }
    }

    const payment = new Payment(paymentData);
    await payment.save();

    res.status(201).json({ message: 'Payment added successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

