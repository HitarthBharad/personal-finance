import dbConnectorPromise from "@/utils/dbConnector";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { currencyName },
    } = req;

    if(!currencyName) {
        return res.status(400).json({
            success: false,
            data: [],
            message: "Currency Not found"
        })
    }

    const currency : string = Array.isArray(currencyName) ? currencyName[0] : currencyName;

    const dbClient = await dbConnectorPromise;

    const currencyObject = await dbClient.db(process.env.DB_NAME)
    .collection("currency")
    .findOne({
        currencyName: currency
    });

    if(!currencyObject) {
        return res.status(400).json({
            success: false,
            data: [],
            message: "Currency Not found"
        })
    }

    const transactionList = await dbClient.db(process.env.DB_NAME)
        .collection("bankAccount")
        .find({
            currency: new ObjectId(currencyObject._id)
        })
        .sort({
            date: -1
        })
        .toArray();
    
    return res.status(200).json({
        success: true,
        data: transactionList
    })
};

export default handler;