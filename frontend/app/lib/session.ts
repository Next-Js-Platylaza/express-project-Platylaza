"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function getLoggedInUser() {  
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        if (!token) throw new Error("Not logged in");
        const loggedInUser = await jwt.verify(token, process.env.AUTH_SECRET as string) as JwtPayload;
        return loggedInUser;
    } catch (err) {
        console.log("error");
        console.log(err);
        redirect("/login");
    }
}