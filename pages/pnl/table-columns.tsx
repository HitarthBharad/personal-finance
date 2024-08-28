import { utcToBrowserDate, utcToCompanyTimezoneDate } from '@/utils/date';
import getBrowserTimezoneOffset from '@/utils/getTimezoneOffset';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
    ColumnDef
} from "@tanstack/react-table"
import { time } from 'console';
import { HandCoins, InfoIcon, Landmark } from 'lucide-react';

interface IListTransactions {
    _id: any
    date: any;
    type: "Credit" | "Expense";
    accountHeader: "Cash" | "Credit Card" | "Bank";
    title: string;
    description: string;
    amount: number;
    balance: number;
    cardNumber?: string;
};

const getTransactionTableColumns = ({ currency }: { currency: {name: string, symbol: string} }) => {

    const TransactionTableColumns: ColumnDef<IListTransactions>[] = [
        {
            accessorKey: "date",
            header: "Transaction Date",
            cell: ({ row }) => (
                <div className="capitalize">{utcToBrowserDate(row.getValue("date"), getBrowserTimezoneOffset())}</div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                switch (row.original?.type) {
                    case "Credit":
                        return <span className="text-green-600">Credit</span>
                    case "Expense":
                        return <span className="text-red-600">Expense</span>
                    default:
                        return ""
                }
            }
        },
        {
            accessorKey: "accountHeader",
            header: "Account Header",
            cell: ({ row }) => {
                switch (row.original?.accountHeader) {
                    case "Cash":
                        return (
                            <div className="flex place-items-center">
                                <span className="text-blue-500 mr-2">Cash</span>
                                <HandCoins size={16} className="text-gray-500 cursor-pointer" />
                            </div>
                        )
                    case "Bank":
                        return (
                            <div className="flex place-items-center">
                                <span className="text-blue-500 mr-2">Bank</span>
                                <Landmark size={16} className="text-gray-500 cursor-pointer" />
                            </div>
                        )
                    default:
                        return ""
                }
            }
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <Tooltip.Provider key={row.original._id}>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <div className="flex place-items-center">
                                <span className="text-blue-500">{row.original.title}</span>
                                {/* <InfoIcon size={16} className="text-gray-500 cursor-pointer" /> */}
                            </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content className="bg-gray-800 text-white text-sm p-2 rounded">
                            {row.original.description}
                            <Tooltip.Arrow className="fill-current text-gray-800" />
                        </Tooltip.Content>
                    </Tooltip.Root>
                </Tooltip.Provider>
            ),
        },
        {
            accessorKey: "amount",
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"))

                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency.name,
                }).format(amount)

                if (row.original.type === "Credit") {
                    return (
                        <div className="text-right font-medium text-green-600">+ {formatted}</div>
                    )
                }

                return <div className="text-right font-medium text-red-600">- {formatted}</div>
            },
        },
        {
            accessorKey: "balance",
            header: () => <div className="text-right">Balance</div>,
            cell: ({ row }) => {
                const balance = parseFloat(row.getValue("balance"))

                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency.name,
                }).format(balance)

                return <div className="text-right font-medium">{formatted}</div>
            },
        }
    ];

    return TransactionTableColumns;
};

export default getTransactionTableColumns;