"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";

export default function LogoutButton() {
    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => signOut({ callbackUrl: "/" })}
        >
            Cerrar Sesión
        </Button>
    );
}
