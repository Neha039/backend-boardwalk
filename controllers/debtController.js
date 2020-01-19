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
            //BUT FIRST!  validation (8
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

            if (typeof downPayment !== "Number" || downPayment === "" || downPayment < 0) {
                return res.status(400).json({ error: "Must provide a valid down payment amount!" });
            }



            //Now that we have valid input, we have to protect our password
            //(Note: this work can also live in the user schema; it is shown here so that we can trace what's going on)
            const salt = await bcrypt.genSalt(10);
            const saltedAndHashedPwd = await bcrypt.hash(password, salt);

            //Finally, we create the new user:
            const newUser = await User.create({ firstName: firstName, lastName: lastName, email: email, password: saltedAndHashedPwd });
            
            //And now, we log them in!
            req.login(newUser, err => {
                if(err) { throw err };
                res.json(req.user); 
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};