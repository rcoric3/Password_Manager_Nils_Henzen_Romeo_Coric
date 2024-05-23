import { db } from "../db"
import { Users } from "../types"

export async function findPersonByUserName(Name:String) {
    return await db.selectFrom("users")
}