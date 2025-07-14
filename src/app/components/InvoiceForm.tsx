'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';

interface InvoiceFormProps {
    onInvoiceCreated: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onInvoiceCreated }) => {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const parsedAmount = parseInt(amount);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid amount.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: parsedAmount }),
            });

            const data = await response.json();

            if (response.ok) {
                setAmount('');
                onInvoiceCreated(); // Notify parent component to refresh invoice list
                if (data.checkoutUrl) {
                    router.push(data.checkoutUrl); // Redirect to Xendit checkout
                }
            } else {
                setError(data.error || 'Failed to create invoice.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-white/70 text-sm font-medium mb-2">Amount</label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="e.g., 100000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                    />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Invoice'}
                </Button>
            </form>
        </Card>
    );
};

export default InvoiceForm;