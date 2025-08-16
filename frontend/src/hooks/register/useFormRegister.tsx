"use client";

import { registerService } from "@/services/register/register.service";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const registerFormSchema = z
    .object({
        email: z.email("Email inválido"),
        password: z
            .string()
            .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirmação de senha é obrigatória" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

type RegisterFormType = z.infer<typeof registerFormSchema>;

export type UseFormRegisterType = {
    form: ReturnType<typeof useForm<RegisterFormType>>;
    onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
};

export default function useFormRegister(): UseFormRegisterType {
    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onRegisterFormSubmit(input: RegisterFormType) {
        registerService({
            email: input.email,
            password: input.password,
        });
    }

    const onSubmit = async (event?: React.BaseSyntheticEvent) =>
        form.handleSubmit(onRegisterFormSubmit)(event);

    const output = {
        form,
        onSubmit,
    };

    return output;
}
