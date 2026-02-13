import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getuserToken() {
  const decodedToken = (await cookies()).get("next-auth.session-token")?.value;

  const token = await decode({
    token: decodedToken,
    secret: process.env.AUTH_SECRET!,
  });
  console.log(token?.tokend);

  return token?.tokend as string;
}
