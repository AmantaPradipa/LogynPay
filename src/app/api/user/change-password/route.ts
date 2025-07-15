import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { verifyPassword, hashPassword } from '@/lib/bcrypt';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { currentPassword, newPassword } = await request.json();

        // Validation
        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: 'New password must be at least 6 characters long' }, { status: 400 });
        }

        // Get current user
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Verify current password
        const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
        }

        // Hash new password
        const hashedNewPassword = await hashPassword(newPassword);

        // Update password
        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedNewPassword }
        });

        return NextResponse.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Failed to change password:', error);
        return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
    }
}