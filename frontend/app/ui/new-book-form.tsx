"use client";

import { ChangeEvent, useState } from "react";
import { createBook } from "../lib/actions";

export default function NewBookForm() {
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const [newStatus, setNewStatus] = useState("TO_READ");

    const handleChangeToTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }
    const handleChangeToAuthor = (event: ChangeEvent<HTMLInputElement>) => {
        setNewAuthor(event.target.value);
    }
    const handleChangeToGenre = (event: ChangeEvent<HTMLInputElement>) => {
        setNewGenre(event.target.value);
    }
    const handleChangeToStatus = (event: ChangeEvent<HTMLSelectElement>) => {
        setNewStatus(event.target.value);
    }

   return <div className="border-2 border-black mb-1" >
        <form action={createBook}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" value={newTitle} required onChange={handleChangeToTitle}/>
                <br/>
                <label htmlFor="author" >Author:</label>
                <input type="text" name="author" value={newAuthor} required onChange={handleChangeToAuthor}/>
                <br/>
                <label htmlFor="genre" >Genre:</label>
                <input type="text" name="genre" value={newGenre} required onChange={handleChangeToGenre}/>
                <br/>

                <label htmlFor="status">Select:</label>
                <select name="status" defaultValue={newStatus} required onChange={handleChangeToStatus}>
                    <option value="TO_READ">To Read</option>
                    <option value="READING">Reading</option>
                    <option value="FINISHED">Finished</option>
                </select>
                <br/>

                <button type="submit">Add New Book</button>
    </form>
    </div>
}