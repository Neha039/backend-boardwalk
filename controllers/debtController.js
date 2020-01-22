//Require our user model
const Debt = require("../models/debt");

module.exports = {
    findAll: async function (req, res) {
        try {
            const results = await Debt.find({});
            res.status(200).json(results);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    findById: async function (req, res) {
        try {
            const result = await Debt.findById(req.params.id);
            if (!result) {
                return res.sendStatus(404); //we didn't actually find anybody!
            }
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    create: async function (req, res) {
        try {
            //create a new debt calculation
            //BUT FIRST!  validation for each variable
            const { loanAmount, downPayment, loanTerm, interestRate, debtAmount, monthlyPaymentAmount, oldInterestRate } = req.body;
            if (typeof loanAmount !== "Number" || loanAmount === "" || loanAmount < 0) {
                return res.status(400).json({ error: "Must provide a valid loan amount!" });
            }

            if (typeof downPayment !== "Number" || downPayment === "" || downPayment < 0) {
                return res.status(400).json({ error: "Must provide a valid down payment amount!" });
            }

            if (typeof loanTerm !== "Number" || loanTerm === "" || loanTerm < 0 || loanTerm > 30) {
                return res.status(400).json({ error: "Must provide a valid loan term!" });
            }

            if (typeof interestRate !== "Number" || interestRate === "" || interestRate < 0 || interestRate > 30) {
                return res.status(400).json({ error: "Must provide a valid interest rate!" });
            }

            if (typeof debtAmount !== "Number" || debtAmount === "" || debtAmount < 0) {
                return res.status(400).json({ error: "Must provide a valid debt amount!" });
            }

            if (typeof monthlyPaymentAmount !== "Number" || monthlyPaymentAmount === "" || monthlyPaymentAmount < 0) {
                return res.status(400).json({ error: "Must provide a valid monthly payment amount!" });
            }

            if (typeof oldInterestRate !== "Number" || oldInterestRate === "" || oldInterestRate < 0 || oldInterestRate > 30) {
                return res.status(400).json({ error: "Must provide a valid interest rate!" });
            }
            
            // I dont think  we need this part rt now, maybe for the demo day in feb so kept it here
            const newDebt = await Debt.create({ loanPayment: loanPayment, downPayment: downPayment, loanTerm: loanTerm, interestRate: interestRate, debtAmount: debtAmount, monthlyPaymentAmount: monthlyPaymentAmount, oldInterestRate: oldInterestRate});
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};