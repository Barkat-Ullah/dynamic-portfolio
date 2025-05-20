"use server";

import { cookies } from "next/headers";
import { backendUrl } from "./backend";
import { jwtDecode } from "jwt-decode";
export interface FormValues {
  email: string;
  password: string;
}

export interface FormValues {
  email: string;
  password: string;
}

export const loggedInUser = async (data: FormValues) => {
  try {
    const res = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();
    console.log("result ", result);

    if (!res.ok || !result?.success) {
      throw new Error(result?.message || "Login failed");
    }

    (await cookies()).set("token", result?.data?.accessToken);

    return {
      success: true,
      user: result.data.user,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: "Login failed",
    };
  }
};

export interface DecodedUser {
  id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

export const getServerUser = async (): Promise<DecodedUser | null> => {
  const accessToken = (await cookies()).get("token")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    console.log("decode", decodedData);
    return decodedData;
  } else {
    return null;
  }
};
export const logout = async () => {
  (await cookies()).delete("token");
};
