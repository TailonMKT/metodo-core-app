import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
    age: z.number().min(10).max(120),
    weight: z.number().min(30).max(300),
    height: z.number().min(100).max(250), // in cm
    goal: z.string().min(2),
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 });
        }

        const body = await req.json();
        const { age, weight, height, goal } = profileSchema.parse(body);

        // Calculate BMI (IMC): weight (kg) / (height (m))^2
        const heightInMeters = height / 100;
        const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(2));

        const prisma = getPrisma();

        const profile = await prisma.profile.upsert({
            where: { userId: session.user.id },
            update: { age, weight, height, goal, bmi },
            create: {
                userId: session.user.id,
                age,
                weight,
                height,
                goal,
                bmi,
            },
        });

        return NextResponse.json({ profile }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });
        }
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
