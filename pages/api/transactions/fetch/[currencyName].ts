import dbConnectorPromise from "@/utils/dbConnector";
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

    const dbName: string = Array.isArray(currencyName) ? currencyName[0] : currencyName;

    const dbClient = await dbConnectorPromise;

    const transactionList = await dbClient.db(process.env.DB_NAME)
        .collection(dbName?.toLowerCase())
        .find({})
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