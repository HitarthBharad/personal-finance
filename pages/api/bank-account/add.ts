import dbConnectorPromise from "@/utils/dbConnector";
import { ObjectId } from "mongodb";
import { NextApiHandler } from "next";

/*
 bankName,
                debitCardNumber,
                debitCardProvider,
                currencyName
                */

const addBankAccount: NextApiHandler = async (req, res) => {
    try {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                errorType: "submit",
                messagee: "Data not found!"
            })
        }

        if (body.bankName && body.debitCardNumber && body.debitCardProvider && body.currencyName) {

            const dbClient = await dbConnectorPromise;

            const currency = await dbClient.db(process.env.DB_NAME)
            .collection("currency")
            .findOne({
                currencyName: body.currencyName
            })

            if(!currency) {
                return res.status(400).json({
                    success: false,
                    errorType: "submit",
                    messagee: "Currency not found!"
                })
            }

            await dbClient.db(process.env.DB_NAME)
                .collection("bankAccount")
                .insertOne({
                    currency: new ObjectId(currency._id),
                    debitCardNumber: body.debitCardNumber,
                    debitCardProvider: body.debitCardProvider,
                    bankName: body.bankName,
                    createdAt: new Date()
                })
            
            return res.status(201).json({
                success: true,
                message: "Bank Account Added successfully"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                errorType: "field",
                error: {
                    currencySymbol: "Field is required",
                    currencyName: "Field is required"
                },
                message: "Missing Fields"
            })
        }
    }
    catch (err) {
        console.error(err)
        return res.status(400).json({
            success: false,
            errorType: "submit",
            messagee: err.message
        })
    }
};

export default addBankAccount;