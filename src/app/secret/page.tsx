import { auth } from "@comp/auth";
import { redirect } from "next/navigation";

export default async function Secret() {
    const session = await auth()
    if(!session) 
        return redirect('/profile')

    return <h1 className="text-2xl">Welcome to Skill Pilot</h1>
}