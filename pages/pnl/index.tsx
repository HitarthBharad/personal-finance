import AddCurrency from "@/components/currency/AddCurrency";
import ListCurrency from "@/components/currency/ListCurrency";
import AddTransactions from "@/components/transactions/AddTransactions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator"
import DataTable from "@/components/DataTable";
import getTransactionTableColumns from "./table-columns";
import authenticationVerification from "@/wrapper/authenticationVerification";
import Loader from "@/components/Loader";

interface IListCurrency {
    currencyName: string;
    balance: number;
    currencySymbol: string;
}

interface IListTransactions {
    date: any;
    type: "Credit" | "Expense";
    source: "Cash" | "Credit Card" | "Bank";
    title: string;
    description: string;
    amount: number;
    balance: number;
    cardNumber?: string;
};

type currencyType = {
    name: string;
    symbol: string;
}

const PNLPage = () => {
    const [currencyList, setCurrencyList] = useState<IListCurrency[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState<currencyType | undefined>({
        name: "",
        symbol: ""
    });
    const [transactions, setTransactions] = useState<IListTransactions[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/currency/fetch');
                const result = await res.json();
                if (!res.ok) {
                    toast(result.message);
                }
                setCurrencyList(result.data);

                if (result.count > 0) {
                    setSelectedCurrency({
                        name: result.data[0].currencyName,
                        symbol: result.data[0].currencySymbol
                    })
                }
            } catch (err) {
                toast(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedCurrency?.name) {
                    const res = await fetch(`/api/transactions/fetch/${selectedCurrency?.name}`);
                    const result = await res.json();
                    if (!res.ok) {
                        toast(result.message);
                    }
                    setTransactions(result.data);
                }
            } catch (err) {
                toast(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCurrency]);

    if (loading) return <Loader />;

    return (
        <ScrollArea className="h-full p-6">
            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Your Balance
                    </h2>
                    <AddCurrency setCurrencyList={setCurrencyList} />
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {currencyList.length > 0 ? (
                                currencyList.map((item, index) => (
                                    <ListCurrency
                                        key={index}
                                        item={item}
                                        selectedCurrency={selectedCurrency}
                                        setSelectedCurrency={setSelectedCurrency}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    No Currencies are available at the moment
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="mt-4 mb-4">
                <Separator />
            </div>
            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {selectedCurrency?.name} Transactions
                    </h2>
                    {
                        selectedCurrency?.name && (
                            <AddTransactions currency={selectedCurrency} setTransactionList={setTransactions} />
                        )
                    }
                </div>
                {
                    selectedCurrency?.name && (
                        <DataTable data={transactions} columns={getTransactionTableColumns({ currency: selectedCurrency })} />
                    )
                }
            </div>
        </ScrollArea>
    );
};

export default authenticationVerification(PNLPage);
