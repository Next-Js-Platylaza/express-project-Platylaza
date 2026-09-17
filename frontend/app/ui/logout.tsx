import { logout } from "../lib/actions";

export default function LogoutButton(props : {classes: string}) {
    return <form action={logout} className={props.classes}>
        <button type="submit" className="border-1 p-1">Logout</button>
    </form>
}