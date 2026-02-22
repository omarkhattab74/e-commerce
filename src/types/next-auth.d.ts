import NextAuth, { DefaultSession } from "next-auth";
// import NextAuth ,{user} from "next-auth"
// import { JWT } from "next-auth/jwt"


// declare module "next-auth" {


  // interface user {


  //   user : {
  //       role: string,
  //       email : string,
  //       name: string
  //   },
  //   token : string,
  // }



//   interface Session {
//     user : {
//         role: string,
//         email : string,
//         name: string
//     }
//   }
// }


// declare module "next-auth/jwt" {
//   interface JWT extends user {
//     idToken?: string
//   }
// }



declare module "next-auth" {

  // interface user {


  //   user : {
  //       role: string,
  //       email : string,
  //       name: string
  //   },
  //   token : string,
  // }


  interface Session {
    user: any;
    token?: string;
  }

  interface User {
    user: any;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: any;
    token?: string;
  }
}