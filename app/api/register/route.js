import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const { name, email, address, password } = body.data;

    if (!name || !email || !address || !password) {
        return new NextResponse('You are missing either a name, email or password.', { status: 400 });
    }

    const existingEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingEmail) {
        return new NextResponse('User already exists with that email.', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            address: address,
            password: hashedPassword
        }
    });

    return NextResponse.json(user);
}