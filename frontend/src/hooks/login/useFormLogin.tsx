"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const loginFormSchema = z.object({
    email: z.email("Email inválido"),
    password: z
        .string()
        .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export type UseFormLoginType = {
    form: ReturnType<typeof useForm<LoginFormType>>;
    onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
};

export default function useFormLogin(): UseFormLoginType {
    const router = useRouter();
    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onLoginFormSubmit(input: LoginFormType) {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: input.email,
                password: input.password,
            });

            if (result?.ok) {
                router.push("/dashboard");
                return;
            }

            toast.error("Erro ao fazer login", {
                description: result?.error || "Erro desconhecido",
                icon: <CircleX />,
            });
        } catch (error) {
            const err = error as Error;

            toast.error("Erro ao fazer login", {
                description: err.message,
                icon: <CircleX />,
            });
        }
    }

    const onSubmit = async (event?: React.BaseSyntheticEvent) =>
        form.handleSubmit(onLoginFormSubmit)(event);

    const output: UseFormLoginType = {
        form,
        onSubmit,
    };

    return output;
}
