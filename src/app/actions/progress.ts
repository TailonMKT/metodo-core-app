"use server";

import { getPrisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleProgressDay(dayNumber: number, isCompleted: boolean) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("No autorizado");
    }

    const userId = session.user.id;
    const prisma = getPrisma();

    if (isCompleted) {
        // Si ya está completado, lo desmarcamos
        await prisma.progressLog.deleteMany({
            where: {
                userId,
                dayNumber,
            },
        });
    } else {
        // Si no está completado, lo creamos
        await prisma.progressLog.create({
            data: {
                userId,
                dayNumber,
            },
        });
    }

    // Refrescar al ruta para obtener la nueva data
    revalidatePath("/dashboard");
}
