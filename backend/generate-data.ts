import { Prisma, Status } from "@prisma/client";
import { faker } from "@faker-js/faker";

type BookData = Omit<Prisma.BookCreateInput, "user">;

export function generateBookData(): BookData {
    return {
        title: faker.book.title(),
        author: faker.book.author(),
        genre: faker.book.genre(),
        status: faker.helpers.arrayElement(Object.values(Status)),
    }
}
export function generateBooksData(): BookData[] {
    const booksData: BookData[] = [];
    const length = faker.number.int({min: 1, max: 5});
    for (let i = 0; i < length; i++) {
        const bookData = generateBookData();
        booksData.push(bookData);
    }

    return booksData;
}

export type UserData = Prisma.UserCreateInput;
export function generateUserData(): UserData {
    return {
            email: faker.internet.email(),
            password: faker.internet.password(),
            books: {
                create: generateBooksData(),
            }
        };
};