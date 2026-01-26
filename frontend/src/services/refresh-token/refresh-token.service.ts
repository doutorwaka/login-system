export type RefreshTokenServiceInput = {
    refreshToken: string;
};

export type RefreshTokenServiceOutput = {
    authToken: string;
};

type RequestData = {
    refreshToken: string;
};

type ResponseErrorData = {
    statusCode: number;
    timestamp: string;
    message: string;
};

type ResponseSuccessData = {
    authToken: string;
};

export async function refreshTokenService(
    input: RefreshTokenServiceInput,
): Promise<RefreshTokenServiceOutput> {
    const data: RequestData = {
        refreshToken: input.refreshToken,
    };

    const fetchOptions: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const result = await fetch(
        "http://localhost:3000/users/refresh",
        fetchOptions,
    );

    if (result.ok) {
        const responseSuccessData =
            (await result.json()) as ResponseSuccessData;

        const output: RefreshTokenServiceOutput = {
            authToken: responseSuccessData.authToken,
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
        `Error while refreshing token: ${result.status} - ${result.statusText}`,
    );

    throw new Error(
        "Um erro inesperado aconteceu. Por favor, tente mais tarde.",
    );
}
