"use server";

import { redirect } from "next/navigation";
import getLoggedInUser from "../lib/session";

export default async function Page() {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser) redirect("/logic");

    return <div>
        <h1>Welcome {loggedInUser?.email}</h1>
    </div>
}