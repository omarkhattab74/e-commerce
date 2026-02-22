import z from 'zod';

export const schema = z.object({
    name: z.string().nonempty("Name is Required").min(3, "Min Length Is 3").max(15, "Max Length Is 15"),
    email: z.email().nonempty("Email is Required"),
    password: z.string().nonempty("Password Is Required").min(8, "Min Length Is 8").max(20, "Max Length Is 20"),
    rePassword: z.string().nonempty("Repassword Is Required"),
    phone: z.string().nonempty("Phone Number Is Required").regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian Phone Number")
}).refine((data) => data.password === data.rePassword, {
    error: "Password And Repassword Do Not Match",
    path: ["rePassword"]

})

export type registerType = z.infer<typeof schema>