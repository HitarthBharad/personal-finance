import dbConnectorPromise from "@/utils/dbConnector";
import { NextApiHandler } from "next";

const fetchCurrency: NextApiHandler = async (req, res) => {
    const dbClient = await dbConnectorPromise;

    const currencyList = await dbClient.db(process.env.DB_NAME)
    .collection("currency")
    .find({})
    .toArray();

    return res.status(200).json({
        data: currencyList.map(cur => ({
            ...cur,
            balance: 0
        })),
        count: currencyList.length
    })
}

export default fetchCurrency;
