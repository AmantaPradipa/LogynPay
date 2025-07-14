import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { xendit } from '@/lib/xendit';

// GET /api/invoices - Fetch user's invoices
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const invoices = await prisma.invoice.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(invoices);
    } catch (error) {
        console.error('Failed to fetch invoices:', error);
        return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
}

// POST /api/invoices - Create a new invoice
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { amount } = await request.json();

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        const externalId = `invoice-${Date.now()}`;

        // Create invoice in our database first
        const newInvoice = await prisma.invoice.create({
            data: {
                userId: session.user.id,
                amount,
                status: 'PENDING',
                externalId,
                checkoutUrl: `${process.env.NEXTAUTH_URL}/invoice/${externalId}`, // Temporary checkout URL
            },
        });

        // For now, we'll create a simple invoice without Xendit integration
        // TODO: Integrate with Xendit when ready
        // const { Invoice } = xendit;
        // const xenditInvoice = await Invoice.createInvoice({
        //   data: {
        //     externalId: externalId,
        //     amount,
        //     payerEmail: session.user.email,
        //     description: `Invoice for ${amount}`,
        //     successRedirectUrl: `${process.env.NEXTAUTH_URL}/invoice/${newInvoice.id}`,
        //     failureRedirectUrl: `${process.env.NEXTAUTH_URL}/invoice/${newInvoice.id}`,
        //   }
        // });

        return NextResponse.json(newInvoice, { status: 201 });
    } catch (error) {
        console.error('Failed to create invoice:', error);
        return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}