"use server";

import { redirect } from "next/navigation";
import getLoggedInUser from "../lib/session";
import LogoutButton from "../ui/logout";
import { getBooks } from "../lib/actions";
import BookDiv from "../ui/book-div";
import NewBookForm from "../ui/new-book-form";

export default async function Page() {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser) redirect("/logic");

    const books = await getBooks();

    return <div className="w-full flex flex-col">
        <LogoutButton classes="ml-auto"/>
        <h1 className="">Welcome {loggedInUser?.email}!</h1>
        <h2>Books:</h2>

        {!books || books.length == 0 ? "No Books Yet" :
            books?.map((book, index) =>
                <BookDiv book={book} key={index}/>
        )}

        <NewBookForm/>
    </div>
}