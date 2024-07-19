import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    enum: ['cash', 'bank'],
    required: true
  },
  orderNo: {
    type: String,
    required: true,
  },
  cash: {
    amount: {
      type: String,
      required: function() { return this.paymentType === 'cash'; }
    },
   
    advance: {
      type: Number,
      required: function() { return this.paymentType === 'cash'; }
    },
    paid: {
      type: Number,
      required: function() { return this.paymentType === 'cash'; }
    },
    balance: {
      type: Number,
      required: function() { return this.paymentType === 'cash'; }
    },
    description: {
      type: String,
      required: function() { return this.paymentType === 'cash'; }
    }
  },
  bank: {
    selectBank: {
      type: String,
      required: function() { return this.paymentType === 'bank'; }
    },
    paymentMethod: {
      type: String,
      enum: ['online', 'cheque'],
      required: function() { return this.paymentType === 'bank'; }
    },
    online: {
      transactionDate: {
        type: Date,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'online'; }
      },
      transactionNo: {
        type: String,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'online'; }
      },
      advance: {
        type: Number,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'online'; }
      },
      paid: {
        type: Number,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'online'; }
      },
      balance: {
        type: Number,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'online'; }
      },
      description: {
        type: String,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'online'; }
      }
    },
    cheque: {
      transactionDate: {
        type: Date,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'cheque'; }
      },
      chequeNo: {
        type: String,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'cheque'; }
      },
      advance: {
        type: Number,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'cheque'; }
      },
      paid: {
        type: Number,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'cheque'; }
      },
      balance: {
        type: Number,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'cheque'; }
      },
      description: {
        type: String,
        required: function() { return this.paymentType === 'bank' && this.paymentMethod === 'cheque'; }
      }
    }
  }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
