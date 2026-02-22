import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = registerSchema.parse(body);

        const activePrisma = getPrisma();
        const existingUser = await activePrisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "El usuario ya existe" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await activePrisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "Usuario creado exitosamente", user: { id: newUser.id, email: newUser.email } },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            const zErr = error as z.ZodError<any>;
            return NextResponse.json({ message: zErr.issues[0].message }, { status: 400 });
        }

        // Return exact error message for Hostinger debugging
        const errorMessage = error instanceof Error ? error.message : "Error interno del servidor";
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}
