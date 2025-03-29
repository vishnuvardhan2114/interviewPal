"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8),
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const formSchema = authFormSchema(type)
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                })

                if (!result?.success) {
                    toast.error("Error", {
                        description: `Something went wrong ${result.message}`,
                    })
                    return;
                }
                toast.success("Success", {
                    description: "Account created successfully Please Sign in",
                })
                router.push("/sign-in")
            } else {
                const { email, password } = values;
                const userCredentials = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                const idToken = await userCredentials.user.getIdToken();
                if (!idToken) {
                    toast.error("Sign in failed", {
                        description: `Something went wrong`,
                    })
                    return;
                }
                await signIn({
                    idToken,
                    email,
                });
                toast.success("Success", {
                    description: "Signed in successfully",
                })
                router.push("/")
            }
        } catch (error) {
            console.log(error);
            toast.error("Error", {
                description: `Something went wrong ${error}`,
            })
        }
    }

    const isSignIn = type === "sign-in"

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image
                        src="/logo.svg"
                        width={32}
                        height={32}
                        alt="logo"
                    />
                    <h2 className="text-primary-100">InterviewPal</h2>
                </div>
                <h3 className="text-white text-center">Practice job interview with AI</h3>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-4 form"
                    >
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                                type="text"
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />

                        <Button className="btn" type="submit">
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>
                <p className="text-center"> {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="text-user-primary font-bold ml-1" >

                        {!isSignIn ? 'Sign in' : 'Sign up'}
                    </Link>
                </p>

            </div>
        </div>
    )

}

export default AuthForm