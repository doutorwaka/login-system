import { userDataService } from "@/services/user-data/user-data.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { UserDataCard } from "@/components/user-data/user-data-card";

export default async function DashboardPage() {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect("/");
    }

    const authToken = session.authToken;

    if (!authToken) {
        redirect("/");
    }

    const userData = await userDataService({ authToken });

    return <UserDataCard {...userData} />;
}
