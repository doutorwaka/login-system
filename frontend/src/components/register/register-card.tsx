"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

export function RegisterCard() {
    const registerFormSchema = z
        .object({
            email: z.email("Email inválido"),
            password: z
                .string()
                .min(5, { message: "Senha deve ter pelo menos 5 caracteres" }),
            confirmPassword: z
                .string()
                .min(1, { message: "Confirmação de senha é obrigatória" }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "As senhas não coincidem",
            path: ["confirmPassword"],
        });

    type RegisterFormType = z.infer<typeof registerFormSchema>;

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onRegisterFormSubmit(input: RegisterFormType) {
        console.log("Form submitted:", input);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Crie sua conta</CardTitle>
                <CardDescription>Entre com os dados</CardDescription>
                <CardAction>
                    <Link href="/">
                        <Button variant="link">Faça o login!</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onRegisterFormSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={"email"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="email">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="waka@drwaka.com"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={"password"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="password">
                                                Senha
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={"confirmPassword"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="confirmPassword">
                                                Confirme a Senha
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="confirmPassword"
                                                    type="password"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex-col gap-2 py-8">
                            <Button type="submit" className="w-full">
                                Cadastrar
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
