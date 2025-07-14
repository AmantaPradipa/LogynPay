import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/invoices/export - Export invoice data as CSV
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

        // Create CSV content
        const csvHeaders = [
            'Invoice ID',
            'External ID',
            'Amount',
            'Status',
            'Created Date',
            'Payment Date',
            'Checkout URL'
        ];

        const csvRows = invoices.map(invoice => {
            const paymentDate = invoice.payments.length > 0 && invoice.payments[0].paidAt 
                ? new Date(invoice.payments[0].paidAt).toLocaleDateString('id-ID')
                : '';

            return [
                invoice.id,
                invoice.externalId,
                invoice.amount,
                invoice.status,
                new Date(invoice.createdAt).toLocaleDateString('id-ID'),
                paymentDate,
                invoice.checkoutUrl || ''
            ];
        });

        // Combine headers and rows
        const csvContent = [
            csvHeaders.join(','),
            ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
        ].join('\n');

        // Return CSV file
        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="invoices-${new Date().toISOString().split('T')[0]}.csv"`
            }
        });
    } catch (error) {
        console.error('Failed to export invoice data:', error);
        return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
    }
}