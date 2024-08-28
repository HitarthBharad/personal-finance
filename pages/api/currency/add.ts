import dbConnectorPromise from "@/utils/dbConnector";
import { NextApiHandler } from "next";

const addCurrency: NextApiHandler = async (req, res) => {
    try {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                errorType: "submit",
                messagee: "Data not found!"
            })
        }

        if (body.currencySymbol && body.currencyName) {

            const dbClient = await dbConnectorPromise;

            await dbClient.db(process.env.DB_NAME)
                .collection("currency")
                .insertOne({
                    currencyName: body.currencyName,
                    currencySymbol: body.currencySymbol,
                    createdAt: new Date()
                })
            
            return res.status(201).json({
                success: true,
                message: "Currency Added successfully"
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

export default addCurrency;