import * as React from "react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", type, label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col space-y-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={`flex h-12 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${error ? "border-destructive focus-visible:ring-destructive" : ""
                        } ${className}`}
                    ref={ref}
                    {...props}
                />
                {error && <span className="text-xs text-destructive">{error}</span>}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
