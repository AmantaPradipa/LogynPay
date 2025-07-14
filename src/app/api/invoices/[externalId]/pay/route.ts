import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/invoices/[externalId]/pay - Process payment for invoice
export async function POST(
    request: Request,
    { params }: { params: { externalId: string } }
) {
    try {
        // Find the invoice
        const invoice = await prisma.invoice.findUnique({
            where: { externalId: params.externalId },
        });

        if (!invoice) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        if (invoice.status === 'PAID') {
            return NextResponse.json({ error: 'Invoice already paid' }, { status: 400 });
        }

        // Update invoice status to PAID
        const updatedInvoice = await prisma.invoice.update({
            where: { externalId: params.externalId },
            data: { status: 'PAID' },
        });

        // Create payment record
        await prisma.payment.create({
            data: {
                invoiceId: invoice.id,
                status: 'COMPLETED',
                paidAt: new Date(),
            },
        });

        return NextResponse.json(updatedInvoice);
    } catch (error) {
        console.error('Failed to process payment:', error);
        return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
    }
}