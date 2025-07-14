'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from './ui/Card';

interface Invoice {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
    checkoutUrl?: string;
}

const InvoiceList = ({ refreshKey }: { refreshKey: number }) => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchInvoices = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/invoices');
                if (response.ok) {
                    const data = await response.json();
                    setInvoices(data);
                }
            } catch (error) {
                console.error('Failed to fetch invoices:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInvoices();
    }, [refreshKey]);

    const handlePay = (checkoutUrl: string | undefined) => {
        if (checkoutUrl) {
            router.push(checkoutUrl);
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'bg-green-500/20 text-green-400';
            case 'PENDING':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'EXPIRED':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    if (isLoading) {
        return (
            <Card className="p-6 mt-8 text-center">
                <p className="text-white/70">Loading invoices...</p>
            </Card>
        );
    }

    if (invoices.length === 0) {
        return (
            <Card className="p-10 mt-8 text-center">
                <h3 className="text-xl font-semibold text-white">No invoices yet</h3>
                <p className="text-white/60 mt-2">Create your first invoice to get started.</p>
            </Card>
        );
    }

    return (
        <Card className="p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Your Invoices</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/20">
                            <th className="p-4 text-white/70 font-semibold">Date</th>
                            <th className="p-4 text-white/70 font-semibold">Amount</th>
                            <th className="p-4 text-white/70 font-semibold">Status</th>
                            <th className="p-4 text-white/70 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                <td className="p-4 text-white">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-white font-medium">
                                    Rp {invoice.amount.toLocaleString('id-ID')}
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {invoice.status === 'PENDING' && invoice.checkoutUrl && (
                                        <button
                                            onClick={() => handlePay(invoice.checkoutUrl)}
                                            className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default InvoiceList;