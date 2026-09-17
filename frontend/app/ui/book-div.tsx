"use client";

import { ChangeEvent, useState } from "react";
import { updateBook, deleteBookWithId} from "../lib/actions";

export type Book = {
  id: string,
  title: string,
  author: string,
  genre: string,
  status: string,
}

export default function BookDiv({book,} : {book: Book}) {
    const {id, title, author, genre, status} = book;

    const [newTitle, setNewTitle] = useState(title);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newGenre, setNewGenre] = useState(genre);
    const [newStatus, setNewStatus] = useState(status);

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

    console.log(status);

   return <div className="border-2 border-black mb-1" >
        <form action={updateBook}>
                <label htmlFor="title" >Title:</label>
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
                <input type="text" name="id" hidden defaultValue={id}/>
                <button type="submit">Update Book</button>
    </form>
    <form action={deleteBookWithId}>
        <input type="text" name="id" hidden defaultValue={id}/>
        <button type="submit">Delete Book</button>
    </form>
    </div>
}