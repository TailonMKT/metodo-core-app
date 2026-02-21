"use client";

import { useTransition } from "react";
import { toggleProgressDay } from "@/app/actions/progress";

export default function DayButton({
    day,
    isCompleted,
}: {
    day: number;
    isCompleted: boolean;
}) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(() => {
            toggleProgressDay(day, isCompleted);
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className={`
        relative aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all shadow-sm
        ${isCompleted
                    ? "bg-primary text-white border-2 border-primary scale-105"
                    : "bg-white text-muted-foreground border-2 border-border hover:border-primary/50"
                }
        ${isPending ? "opacity-50 pointer-events-none" : "active:scale-95"}
      `}
        >
            {isCompleted ? (
                <svg
                    className="w-6 h-6 animate-in fade-in zoom-in"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            ) : (
                <span className="opacity-70">{day}</span>
            )}
        </button>
    );
}
