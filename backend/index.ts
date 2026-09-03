import { PrismaClient } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import auth, { CustomRequest } from "./auth";

const app = express();
app.use(express.json());
const port = 3000;
const prisma = new PrismaClient;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body
		if (!email) throw new Error("Email missing");
		if (!password) throw new Error("Password missing");
		const salt = await bcrypt.genSalt(8);

		await prisma.user.create({
			data: {
				email,
				password: await bcrypt.hash(password, salt),
			}
		})

		res.status(200).json({message: "User successfully created"});
	} catch(err) {
		console.log("error");
		console.log(err);
		res.status(400).json({"message": `Error: ${err}`});
	}
});

app.post("/login", async (req, res) => {
	const {email, password} = req.body;

	try {
	const existingUser = await prisma.user.findUnique({
		where: {
			email,
		},
		select : {
			id: true,
			password: true,
		}
	});
	
	if (!existingUser) throw new Error("No account with that email.")
	const passwordIsValid = bcrypt.compare(password, existingUser.password);
	if (!passwordIsValid) throw new Error("Password doesn't match");

	const token = jwt.sign({id: existingUser.id, email}, process.env.AUTH_SECRET as string);
	res.status(200).json({
		message: "Successfully logged in",
		token
	})
} catch(err) {
		console.log("error");
		console.log(err);
		res.status(400).json({"message": `Error: ${err}`});
	}
})
// process.env.AUTH_SECRET = require('crypto').randomBytes(64).toString('hex');
app.post("/logout", auth, async (req: CustomRequest, res) => {
	// Note: I understand this isn't something you would do in production,
	// but it was about the only way I could get signing-out to work with JTW.

	const user = req.user;
	try {
		if (!user) throw new Error("Invalid login");

		process.env.AUTH_SECRET = require('crypto').randomBytes(64).toString('hex');
		res.status(200).json({message: "Successfully logged out"});
	} catch (err) {
		console.log("error");
		console.log(err);
		res.status(400).json({"message": `Error: ${err}`});
	}
})

app.get("/books", auth, async (req: CustomRequest, res) => {
	const user = req.user;
	
	try {
		if (!user) throw new Error("Invalid login");

		const result = await prisma.book.findMany({
			where: {
				userEmail: user.email,
			}
		});

		console.log(result);
		console.log("result");
		res.status(200).json({books: result});
	} catch (err) {
		console.log("error");
		console.log(err);
		res.status(400).json({"message": `Error: ${err}`});
	}
})

app.post("/books", auth, async (req: CustomRequest, res) => {
	const user = req.user;
	const { title, author, genre, status } = req.body;

	try {
		if (!title) throw new Error("Title is required");
		if (!author) throw new Error("Author is required");
		if (!genre) throw new Error("Genre is required");
		if (!status) throw new Error("Status is required");
		if (!user?.email) throw new Error("Not logged in");
		const createdBook = await prisma.book.create({
			data: {
				title,
				author,
				genre,
				status,
				userEmail: user.email,
			},
			select: {
				id : true
			}
		});

		res.status(200).json({message: `Book with id ${createdBook.id} created`})
	}catch(error){
		console.log("error");
		console.log(error);
		res.status(400).json({ message: `Error: ${error}`})
	}
});

app.put("/books/:id", auth, async (req: CustomRequest, res) => {
	const user = req.user;
	const { title, author, genre, status } = req.body;
	const id = req.params.id as string;

	try {
		if (!title) throw new Error("Title is required");
		if (!author) throw new Error("Author is required");
		if (!genre) throw new Error("Genre is required");
		if (!status) throw new Error("Status is required");
		if (!user?.email) throw new Error("Not logged in");

		const createdBook = await prisma.book.update({
			where: {
				id
			},
			data: {
				title,
				author,
				genre,
				status,
				userEmail: user.email,
			},
		});

		res.status(200).json({message: `Book with id ${createdBook.id} updated`})
	}catch(error){
		console.log("error");
		console.log(error);
		res.status(400).json({ message: `Error: ${error}`})
	}
});

app.delete("/books/:id", auth, async (req: CustomRequest, res) => {
	const user = req.user;
	const id = req.params.id as string;

	try {
		if (!id) throw new Error("Id is required");
		if (!user?.email) throw new Error("Not logged in");
		
		await prisma.book.delete({
			where: {
				id
			}
		})

		res.status(200).json({message: `Successfully deleted book with id ${id}`})
	}catch(error){
		console.log("error");
		console.log(error);
		res.status(400).json({ message: `Error: ${error}`})
	}
});

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
})