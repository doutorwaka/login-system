"use server";

export type RegisterServiceInput = {
    email: string;
    password: string;
};

export type RegisterServiceOutput = void;

export async function registerService(
    input: RegisterServiceInput
): Promise<RegisterServiceOutput> {
    console.log("RegisterService called with input:", input);
    return Promise.resolve();
}
