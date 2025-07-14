import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/invoices/external/[externalId] - Fetch invoice by externalId
export async function GET(
    request: Request,
    { params }: { params: { externalId: string } }
) {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: { externalId: params.externalId },
        });

        if (!invoice) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        return NextResponse.json(invoice);
    } catch (error) {
        console.error('Failed to fetch invoice:', error);
        return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
    }
}