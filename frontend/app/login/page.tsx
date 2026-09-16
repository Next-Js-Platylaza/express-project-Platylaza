import { login } from "../lib/actions";

export default function Page(){
    return <form action={login}>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email"></input>
    
        <label htmlFor="password">Password:</label>
        <input type="password" name="password"></input>
    
        <button type="submit">Login</button> 
    </form>
}