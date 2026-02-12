import {
  loginschemaType,
  registerschemaType,
} from "@/lib/authschema/auth.schema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log("API_URL:", API_URL);

export async function signupuser(formdata: registerschemaType) {
  const respons = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(formdata),
    headers: {
      "content-Type": "application/json",
    },
  });
  const data = respons.json();
  return data;
}
export async function signinuser(formdata: loginschemaType) {
  const respons = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(formdata),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = respons.json();
  return data;
}
