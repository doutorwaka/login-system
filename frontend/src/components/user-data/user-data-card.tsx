"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

export type UserDataCardProps = {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export function UserDataCard({
    id,
    email,
    createdAt,
    updatedAt,
}: UserDataCardProps) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Seus dados</CardTitle>
                <CardDescription>
                    Essas são as informações da sua conta.
                </CardDescription>
                <CardAction>
                    <Button variant="link" onClick={() => signOut()}>
                        Logout
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="grid-cols-2 gap-4 grid">
                    <div>
                        <p className="font-bold">ID:</p>
                        <p className="truncate text-ellipsis">{id}</p>
                    </div>
                    <div>
                        <p className="font-bold">E-mail:</p>
                        <p>{email}</p>
                    </div>
                    <div>
                        <p className="font-bold">CreatedAt:</p>
                        <p>{new Date(createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="font-bold">UpdatedAt:</p>
                        <p>{new Date(updatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
