// const transactionFormSchema = z.object({
//     date: z.date(),
//     type: z.string(),
//     title: z.string(),
//     accountHeader: z.string(),
//     description: z.string(),
//     amount: z.string()
// });

import dbConnectorPromise from "@/utils/dbConnector";
import { ObjectId } from "mongodb";
import { NextApiHandler } from "next";

interface IInsertionDocument  {
    date: Date;
    type: any;
    title: any;
    description: any;
    accountHeader: any;
    amount: number;
    balance: number;
    createdAt: Date;
    bankAccountId?: any,
    creditCardId?: any
}

const addTransactions: NextApiHandler = async (req, res) => {
    
    const data = req.body;

    if(!data) {
        return res.status(400).json({
            success: false,
            errorType: "submit",
            messagee: "Data not found!"
        })
    }

    if(!data?.currencyName) {
        return res.status(400).json({
            success: false,
            errorType: "field",
            error: {
                currencyName: "Field is required"
            },
            message: "Missing Fields"
        })
    }
 
    const dbClient = await dbConnectorPromise;

    let document: IInsertionDocument = {
        date: new Date(data?.date),
        type: data?.type,
        title: data?.title,
        description: data?.description,
        accountHeader: data?.accountHeader,
        amount: parseFloat(data?.amount),
        balance: 7500,
        createdAt: new Date()
    };

    document.accountHeader === "Bank" ? document["bankAccountId"] = new ObjectId(document.bankAccountId) : document["bankAccountId"] = "";

    await dbClient.db(process.env.DB_NAME)
    .collection(data?.currencyName?.toLowerCase())
    .insertOne(document);

    return res.status(201).json({
        success: true,
        message: "Transaction Added successfully"
    })
};

export default addTransactions;