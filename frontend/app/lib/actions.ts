"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Book } from "../ui/book-div";
import { revalidatePath } from "next/cache";

export async function createAccount(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const result = await fetch("http://localhost:3000/signup", {
            method: "POST",
            body: JSON.stringify({
                email, 
                password
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (err) {
        redirect("/");
    }
    
    redirect("/login");
}

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try{
        const result = await fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseJSON = await result.json();
        const token = responseJSON.token;

        const cookiesStore = await cookies();
        cookiesStore.set("token", token);
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    redirect("/books");
}

export async function logout(formData: FormData) {
    try {
        const cookiesStore = await cookies();
        cookiesStore.delete("token");
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    redirect("/login");
}

export async function getBooks(): Promise<Book[] | undefined> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        const response = await fetch("http://localhost:3000/books", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const responseJSON = await response.json();
        return responseJSON.books;
    } catch (err) {
        console.log("error");
        console.log(err);
    }
}

export async function createBook(formData: FormData) {
    const title = formData.get("title");          
    const author = formData.get("author");          
    const genre = formData.get("genre");          
    const status = formData.get("status");          

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        await fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                author,
                genre,
                status,
            })
        })
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    revalidatePath("/books");
}

export async function updateBook(formData: FormData) {
    const id = formData.get("id");          
    const title = formData.get("title");          
    const author = formData.get("author");          
    const genre = formData.get("genre");          
    const status = formData.get("status");          

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        await fetch(`http://localhost:3000/books/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                author,
                genre,
                status,
            })
        })
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    revalidatePath("/books");
}

export async function deleteBookWithId(formData: FormData) {
    const id = formData.get("id");

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        await fetch(`http://localhost:3000/books/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    revalidatePath("/books");
}