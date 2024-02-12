import { sql } from "@vercel/postgres";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  links: { type: string; href: string }[];
};

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM puzzlinkusers WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
