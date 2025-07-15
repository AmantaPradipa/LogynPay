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
        // Get user data with invoice count
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                _count: {
                    select: { invoices: true }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            totalInvoices: user._count.invoices
        });
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}