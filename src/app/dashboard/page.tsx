import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DayButton from "@/components/ui/day-button";
import LogoutButton from "@/components/ui/logout-button";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/login");
    }

    const userId = session.user.id;
    const prisma = getPrisma();

    // Obtener perfil de usuario y progresos
    const [profile, progressLogs] = await Promise.all([
        prisma.profile.findUnique({ where: { userId } }),
        prisma.progressLog.findMany({ where: { userId } }),
    ]);

    if (!profile) {
        redirect("/onboarding");
    }

    const completedDays = progressLogs.map((log: any) => log.dayNumber);
    const totalDays = 21;
    const progressPercentage = Math.round((completedDays.length / totalDays) * 100);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-border p-4 sticky top-0 z-10 flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl text-foreground">Hola, {session.user.name || "Guerrero"}</h1>
                    <p className="text-sm text-muted-foreground font-medium">Día {completedDays.length} de {totalDays}</p>
                </div>
                <LogoutButton />
            </header>

            <main className="flex-1 p-6 space-y-8">
                {/* Status Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tu IMC Actual</h2>
                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">
                            {(profile.goal || "").replace("_", " ").toUpperCase()}
                        </span>
                    </div>
                    <div className="flex items-end space-x-2">
                        <span className="text-4xl font-extrabold text-foreground">{profile.bmi}</span>
                        <span className="text-sm font-medium text-muted-foreground mb-1">IMC</span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2.5 mt-6 overflow-hidden">
                        <div
                            className="bg-primary h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-right text-muted-foreground font-medium">{progressPercentage}% del reto</p>
                </div>

                {/* 21 Days Grid */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-foreground">Reto de 21 Días</h2>
                    <div className="grid grid-cols-5 gap-3">
                        {Array.from({ length: totalDays }).map((_, i) => {
                            const day = i + 1;
                            const isCompleted = completedDays.includes(day);

                            // Los días 20 y 21 los agrupamos en un divisor diferente o mismo grid
                            const isLastRow = day >= 21;

                            return (
                                <div key={day} className={`${isLastRow ? "col-span-5 max-w-24 mx-auto w-full" : ""}`}>
                                    <DayButton day={day} isCompleted={isCompleted} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
