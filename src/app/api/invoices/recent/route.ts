import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/invoices/recent - Get recent activity for the current user
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Get recent invoices and payments
        const recentInvoices = await prisma.invoice.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                payments: {
                    orderBy: { paidAt: 'desc' },
                    take: 1
                }
            }
        });

        // Format activity data
        const activities = [];

        for (const invoice of recentInvoices) {
            // Add invoice creation activity
            activities.push({
                type: 'invoice',
                description: `Invoice #${invoice.externalId} created for Rp ${invoice.amount.toLocaleString('id-ID')}`,
                time: new Date(invoice.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                timestamp: invoice.createdAt
            });

            // Add payment activity if exists
            if (invoice.payments.length > 0 && invoice.payments[0].paidAt) {
                activities.push({
                    type: 'payment',
                    description: `Payment received for invoice #${invoice.externalId}`,
                    time: new Date(invoice.payments[0].paidAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    timestamp: invoice.payments[0].paidAt
                });
            }
        }

        // Sort by timestamp and take latest 10
        const sortedActivities = activities
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10);

        return NextResponse.json(sortedActivities);
    } catch (error) {
        console.error('Failed to fetch recent activity:', error);
        return NextResponse.json({ error: 'Failed to fetch recent activity' }, { status: 500 });
    }
}