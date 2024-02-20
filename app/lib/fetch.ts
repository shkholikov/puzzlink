import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Link = {
  id: string;
  user_id: string;
  links: { type: string; href: string }[];
};

export async function getUser(email: string) {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getLinks(userId: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM links WHERE user_id=${userId}`;
    return user.rows[0] as Link;
  } catch (error) {
    console.error("Failed to fetch user's links:", error);
    throw new Error("Failed to fetch user's links.");
  }
}
