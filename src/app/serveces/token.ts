"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async  function getMyToken() {
   const myServerToken = await cookies()
   const token =   myServerToken.get("next-auth.session-token")?.value
   const mytoken = await  decode({ token: token , secret :process.env.AUTH_SECRET!  })
   return mytoken?.token
   
}