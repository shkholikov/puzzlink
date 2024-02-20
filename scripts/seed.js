const { puzzlinkUsers, linkItems } = require("../app/lib/init-data");
const bcrypt = require("bcrypt");
const { db } = require("@vercel/postgres");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        )
        `;

    console.log(`Created "users" table for PuzzLink`);

    const insertedUsers = await Promise.all(
      puzzlinkUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        // const links = JSON.stringify(user.links);
        return client.sql`
                INSERT INTO users (name, email, password)
                VALUES (${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING
                RETURNING id
                `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users to PuzzLink`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users to PuzzLink:", error);
    throw error;
  }
}

async function seedLinks(client, userId) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS links (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        links JSONB NOT NULL
      )
    `;

    console.log(`Created "links" table of PuzzLink`);

    const insertedLinks = await client.sql`
                INSERT INTO links (user_id, links)
                VALUES (${userId}, ${JSON.stringify(linkItems)})
                ON CONFLICT (id) DO NOTHING
                `;

    console.log(`Seeded ${userId}'s links to PuzzLink`);

    return {
      createTable,
      links: insertedLinks,
    };
  } catch (error) {
    console.error("Error seeding links of PuzzLink:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  const result = await seedUsers(client);
  console.log(result.users[0].rows[0].id);
  const userId = result.users[0].rows[0].id;
  await seedLinks(client, userId);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
