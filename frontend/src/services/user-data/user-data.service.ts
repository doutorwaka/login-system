"use server";

export type UserDataServiceInput = {
    authToken: string;
};

export type UserDataServiceOutput = {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

type ResponseErrorData = {
    statusCode: number;
    timestamp: string;
    message: string;
};

export async function userDataService(
    input: UserDataServiceInput,
): Promise<UserDataServiceOutput> {
    const fetchOptions: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${input.authToken}`,
        },
    };

    const result = await fetch("http://localhost:3000/users/me", fetchOptions);

    if (result.ok) {
        const jsonData = await result.json();
        const output: UserDataServiceOutput = {
            id: jsonData.id,
            email: jsonData.email,
            createdAt: jsonData.createdAt,
            updatedAt: jsonData.updatedAt,
        };

        return output;
    }

    if (result.headers.get("Content-Type")?.includes("application/json")) {
        const { timestamp, message, statusCode }: ResponseErrorData =
            await result.json();
        console.error(`${timestamp} - ${statusCode}: ${message}`);

        throw new Error(message);
    }

    console.error(
        `Error while getting user data: ${result.status} - ${result.statusText}`,
    );

    throw new Error(
        "Um erro inesperado aconteceu. Por favor, tente mais tarde.",
    );
}
