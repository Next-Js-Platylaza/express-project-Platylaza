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
		const body = req.body;
		const { email, password } = body
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
	const body = req.body;
	const {email, password} = body;

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

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
})