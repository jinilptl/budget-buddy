import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
