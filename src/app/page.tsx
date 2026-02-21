import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="space-y-4 max-w-sm">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Método <span className="text-primary">Core</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Transforma tu cuerpo y mente en solo 21 días. Seguimiento diario, cálculo de IMC y rutinas personalizadas.
          </p>
        </div>

        <div className="w-full space-y-4 pt-8">
          <Link href="/register" className="w-full block">
            <Button size="lg" className="w-full text-lg font-bold">
              Comenzar Ahora
            </Button>
          </Link>
          <Link href="/login" className="w-full block">
            <Button variant="outline" size="lg" className="w-full text-lg font-semibold">
              Ya tengo una cuenta
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white px-6 py-12 space-y-8 border-t border-border">
        <h2 className="text-2xl font-bold text-center">¿Qué obtendrás?</h2>
        <div className="space-y-6">
          <BenefitItem
            title="Cálculo de IMC"
            description="Conoce tu estado inicial y objetivos personalizados."
            icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
          <BenefitItem
            title="Reto 21 Días"
            description="Sigue tu progreso diario y mantén la consistencia."
            icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
          <BenefitItem
            title="Acceso 100% Móvil"
            description="Instala la aplicación en tu teléfono como PWA, rápido y sin tiendas."
            icon="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </div>
      </section>
    </div>
  );
}

function BenefitItem({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
