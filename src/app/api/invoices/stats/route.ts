import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/invoices/stats - Get invoice statistics for the current user
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Get all invoices for the user
        const invoices = await prisma.invoice.findMany({
            where: { userId: session.user.id },
        });

        // Calculate statistics
        const totalInvoices = invoices.length;
        
        const totalRevenue = invoices
            .filter(invoice => invoice.status === 'PAID')
            .reduce((sum, invoice) => sum + invoice.amount, 0);
        
        const pendingPayments = invoices
            .filter(invoice => invoice.status === 'PENDING').length;
        
        const completedPayments = invoices
            .filter(invoice => invoice.status === 'PAID').length;

        const stats = {
            totalInvoices,
            totalRevenue,
            pendingPayments,
            completedPayments
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Failed to fetch invoice statistics:', error);
        return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
    }
}