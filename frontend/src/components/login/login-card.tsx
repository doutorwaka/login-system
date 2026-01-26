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
import useFormLogin from "@/hooks/login/useFormLogin";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

export function LoginCard() {
    const { form, onSubmit } = useFormLogin();

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Faça o Login</CardTitle>
                <CardDescription>Entre com os dados</CardDescription>
                <CardAction>
                    <Link href={"/cadastro"}>
                        <Button variant="link">Criar Conta</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="email">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="text"
                                                    placeholder="seu@email.com"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2 mb-6">
                                <FormField
                                    control={form.control}
                                    name="password"
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
                        </div>
                        <div className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
