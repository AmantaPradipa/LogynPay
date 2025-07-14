'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface Invoice {
    id: string;
    amount: number;
    status: string;
    externalId: string;
    createdAt: string;
}

export default function InvoicePage() {
    const params = useParams();
    const router = useRouter();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                // Try to fetch by ID first, then by externalId
                let response = await fetch(`/api/invoices/${params.id}`);
                if (!response.ok) {
                    // If not found by ID, try as externalId
                    response = await fetch(`/api/invoices/external/${params.id}`);
                }
                
                if (response.ok) {
                    const data = await response.json();
                    setInvoice(data);
                }
            } catch (error) {
                console.error('Failed to fetch invoice:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchInvoice();
        }
    }, [params.id]);

    const handlePayment = async () => {
        setIsProcessing(true);
        
        // Simulate payment processing
        setTimeout(async () => {
            try {
                const response = await fetch(`/api/invoices/${invoice?.externalId || params.id}/pay`, {
                    method: 'POST',
                });
                
                if (response.ok) {
                    setInvoice(prev => prev ? { ...prev, status: 'PAID' } : null);
                    alert('Payment successful!');
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 2000);
                }
            } catch (error) {
                console.error('Payment failed:', error);
                alert('Payment failed. Please try again.');
            } finally {
                setIsProcessing(false);
            }
        }, 2000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="p-8 text-center">
                    <p className="text-white">Loading invoice...</p>
                </Card>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="p-8 text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Invoice Not Found</h1>
                    <p className="text-white/70 mb-6">The invoice you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="p-8 max-w-md w-full">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Invoice Payment</h1>
                    <p className="text-white/70 mb-6">Invoice #{invoice.externalId}</p>
                    
                    <div className="bg-white/5 rounded-lg p-6 mb-6">
                        <p className="text-white/70 text-sm mb-2">Amount to Pay</p>
                        <p className="text-3xl font-bold text-white">
                            Rp {invoice.amount.toLocaleString('id-ID')}
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-white/70 text-sm mb-2">Status</p>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            invoice.status === 'PAID' 
                                ? 'bg-green-500/20 text-green-400'
                                : invoice.status === 'PENDING'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                        }`}>
                            {invoice.status}
                        </span>
                    </div>

                    {invoice.status === 'PENDING' && (
                        <div className="space-y-4">
                            <Button 
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full bg-green-500 hover:bg-green-600"
                            >
                                {isProcessing ? 'Processing Payment...' : 'Pay Now'}
                            </Button>
                            <p className="text-white/50 text-xs">
                                This is a demo payment. No real money will be charged.
                            </p>
                        </div>
                    )}

                    {invoice.status === 'PAID' && (
                        <div className="space-y-4">
                            <div className="text-green-400 text-center">
                                <i className="ri-check-circle-fill text-4xl mb-2"></i>
                                <p className="font-semibold">Payment Completed!</p>
                            </div>
                            <Button onClick={() => router.push('/dashboard')} className="w-full">
                                Back to Dashboard
                            </Button>
                        </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-white/20">
                        <p className="text-white/50 text-xs">
                            Created: {new Date(invoice.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}