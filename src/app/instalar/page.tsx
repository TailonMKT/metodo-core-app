import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Instalar() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="flex-1 flex flex-col p-6 max-w-sm mx-auto w-full">
                <Link href="/" className="inline-block p-2 -ml-2 mb-6">
                    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <h1 className="text-3xl font-extrabold text-foreground mb-4">Instalar App</h1>
                <p className="text-muted-foreground mb-8">
                    Método Core es una Aplicación Web Progresiva (PWA). Sigue estos pasos para instalarla en tu dispositivo y acceder más rápido.
                </p>

                <div className="space-y-6">
                    {/* iOS Section */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-border">
                        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center">
                            <span className="text-2xl mr-2">🍏</span> En iPhone / iPad (Safari)
                        </h2>
                        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                            <li>Abre esta página en el navegador <b>Safari</b>.</li>
                            <li>Toca el botón <b>Compartir</b> (el cuadrado con la flecha hacia arriba) en la barra inferior.</li>
                            <li>Desliza hacia abajo y selecciona <b>"Agregar a inicio"</b> (Add to Home Screen).</li>
                            <li>Toca <b>"Agregar"</b> en la esquina superior derecha.</li>
                        </ol>
                    </div>

                    {/* Android Section */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-border">
                        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center">
                            <span className="text-2xl mr-2">🤖</span> En Android (Chrome)
                        </h2>
                        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                            <li>Es posible que veas un aviso de <b>"Añadir a la pantalla de inicio"</b> o <b>"Instalar Aplicación"</b> en la parte inferior. Si es así, tócalo.</li>
                            <li>Si no lo ves, presiona los <b>3 puntos</b> en la esquina superior derecha del navegador.</li>
                            <li>Selecciona <b>"Añadir a la pantalla de inicio"</b> o <b>"Instalar aplicación"</b>.</li>
                            <li>Confirma seleccionando <b>"Instalar"</b>.</li>
                        </ol>
                    </div>
                </div>

                <div className="mt-8">
                    <Link href="/register" className="w-full">
                        <Button size="lg" className="w-full shadow-md">
                            Regístrate y Comienza
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
