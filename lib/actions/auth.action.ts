"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "This user already exists,Please sign in instead.",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Successfully signed up.",
    };
  } catch (error) {
    console.log("Failed to sign up.", error);
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already used. Please sign in instead.",
      };
    }
    return {
      success: false,
      message: "failed to sign up.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  (await cookieStore).set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "This user does not exist,Please sign up instead.",
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.log("Failed to sign in.", error);
    return {
      success: false,
      message: "failed to login to an account.",
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(session, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log("Failed to get current user.", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
