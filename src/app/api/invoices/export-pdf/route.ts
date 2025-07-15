import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Get all invoices for the user
        const invoices = await prisma.invoice.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
            include: {
                payments: true
            }
        });

        // Get user info
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        // Create PDF data structure that will be processed on the client side
        const pdfData = {
            user: {
                email: user?.email || '',
                exportDate: new Date().toLocaleDateString('id-ID')
            },
            invoices: invoices.map(invoice => ({
                id: invoice.id,
                externalId: invoice.externalId,
                amount: invoice.amount,
                status: invoice.status,
                createdAt: invoice.createdAt,
                paymentDate: invoice.payments.length > 0 && invoice.payments[0].paidAt 
                    ? invoice.payments[0].paidAt 
                    : null,
                checkoutUrl: invoice.checkoutUrl || ''
            })),
            summary: {
                totalInvoices: invoices.length,
                totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
                paidInvoices: invoices.filter(inv => inv.status === 'PAID').length,
                pendingInvoices: invoices.filter(inv => inv.status === 'PENDING').length,
                expiredInvoices: invoices.filter(inv => inv.status === 'EXPIRED').length
            }
        };

        return NextResponse.json(pdfData);
    } catch (error) {
        console.error('Failed to prepare PDF data:', error);
        return NextResponse.json({ error: 'Failed to prepare PDF data' }, { status: 500 });
    }
}