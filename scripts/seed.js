const { puzzlinkUsers } = require("../app/lib/init-data");
const bcrypt = require("bcrypt");
const { db } = require("@vercel/postgres");

async function seedPuzzlinkUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS puzzlinkUsers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        links JSONB NOT NULL
        )
        `;

    console.log(`Created "users" table for Puzzlink`);

    const insertedUsers = await Promise.all(
      puzzlinkUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const links = JSON.stringify(user.links);
        return client.sql`
                INSERT INTO puzzlinkUsers (id, name, email, password, links)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${links})
                ON CONFLICT (id) DO NOTHING
                `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users to Puzzlink`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users to Puzzlink:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedPuzzlinkUsers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
