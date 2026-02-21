"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const onboardingSchema = z.object({
    age: z.coerce.number().min(10, "Edad mínima es 10 años").max(120),
    weight: z.coerce.number().min(30, "Mínimo 30 kg").max(300),
    height: z.coerce.number().min(100, "Mínimo 100 cm").max(250),
    goal: z.string().min(2, "Selecciona o escribe un objetivo"),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

export default function Onboarding() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardingData>({
        resolver: zodResolver(onboardingSchema) as any,
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Error al guardar los datos");
            }

            router.push("/resultado");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white p-6">
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <h2 className="text-3xl font-extrabold text-foreground mb-2">Cuéntanos sobre ti</h2>
                <p className="text-muted-foreground mb-8">
                    Estos datos nos ayudarán a calcular tu estado inicial y programar tu reto de 21 días.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Edad (años)"
                            type="number"
                            placeholder="Ej. 28"
                            error={errors.age?.message}
                            {...register("age")}
                        />
                        <Input
                            label="Peso (kg)"
                            type="number"
                            step="0.1"
                            placeholder="Ej. 70.5"
                            error={errors.weight?.message}
                            {...register("weight")}
                        />
                    </div>

                    <Input
                        label="Altura (cm)"
                        type="number"
                        placeholder="Ej. 175"
                        error={errors.height?.message}
                        {...register("height")}
                    />

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Objetivo principal</label>
                        <select
                            {...register("goal")}
                            className="flex h-12 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
                        >
                            <option value="">Selecciona tu objetivo...</option>
                            <option value="perder_peso">Perder peso</option>
                            <option value="ganar_musculo">Ganar masa muscular</option>
                            <option value="mantenimiento">Mantenimiento y salud</option>
                            <option value="resistencia">Aumentar resistencia</option>
                        </select>
                        {errors.goal && <span className="text-xs text-destructive">{errors.goal.message}</span>}
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button type="submit" disabled={isLoading} size="lg" className="w-full mt-4">
                        {isLoading ? "Calculando..." : "Calcular mi IMC"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
