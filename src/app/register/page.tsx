"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al registrarse");
            }

            // Login automático
            const signInRes = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (signInRes?.error) {
                throw new Error("Error al iniciar sesión después del registro");
            }

            router.push("/onboarding");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="flex-1 flex flex-col justify-center px-6 py-12">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Link href="/" className="inline-block p-2 -ml-2 mb-6">
                        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h2 className="text-3xl font-bold leading-9 tracking-tight text-foreground">
                        Crear cuenta
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Únete y comienza tu transformación hoy.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Nombre completo"
                            type="text"
                            placeholder="Juan Pérez"
                            error={errors.name?.message}
                            {...register("name")}
                        />

                        <Input
                            label="Correo electrónico"
                            type="email"
                            placeholder="tu@email.com"
                            error={errors.email?.message}
                            {...register("email")}
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register("password")}
                        />

                        {error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                {error}
                            </div>
                        )}

                        <div>
                            <Button type="submit" disabled={isLoading} className="w-full text-lg shadow-md transition-transform active:scale-[0.98]">
                                {isLoading ? "Creando cuenta..." : "Registrarse"}
                            </Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            href="/login"
                            className="font-semibold leading-6 text-primary hover:text-primary/80"
                        >
                            Iniciar sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
