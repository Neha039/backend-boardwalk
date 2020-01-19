const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtSchema = new Schema({
    loanAmount:{
        type: Number,
        required: true,
    },
    downPayment:{
        type: Number,
        required: true,
    },
    loanTerm:{
        type: Number,
        required: true,
    },
    interestRate:{
        type: Number,
        required: true,
    }
});

const Debt = mongoose.model('Debt', debtSchema);

module.exports = Debt;