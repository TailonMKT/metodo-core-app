import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function getBMIStatus(bmi: number) {
    if (bmi < 18.5) return { text: "Bajo peso", color: "text-blue-500", bg: "bg-blue-500/10" };
    if (bmi < 25) return { text: "Peso saludable", color: "text-green-500", bg: "bg-green-500/10" };
    if (bmi < 30) return { text: "Sobrepeso", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { text: "Obesidad", color: "text-red-500", bg: "bg-red-500/10" };
}

export default async function Resultado() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/login");
    }

    const prisma = getPrisma();
    const profile = await prisma.profile.findUnique({
        where: { userId: session.user.id },
    });

    if (!profile || !profile.bmi) {
        redirect("/onboarding");
    }

    const { text, color, bg } = getBMIStatus(profile.bmi);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Tu Resultado</h2>

                    <div className="flex flex-col items-center justify-center space-y-2 mb-8">
                        <span className="text-6xl font-extrabold text-primary">{profile.bmi}</span>
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${color} ${bg}`}>
                            {text}
                        </span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                        Tu índice de masa corporal (IMC) nos ayuda a personalizar tu Reto de 21 Días.
                        El objetivo "{(profile.goal || "").replace("_", " ")}" se ha configurado correctamente.
                    </p>

                    <Link href="/dashboard" className="w-full">
                        <Button size="lg" className="w-full text-lg shadow-md">
                            Ir al Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
