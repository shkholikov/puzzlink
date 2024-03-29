import Link from "next/link";
import { icons } from "@/app/lib/icons";
import { getLinks, getUser } from "@/app/lib/fetch";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser("example@puzzlink.io");
  const userLinkItem = await getLinks(user.id);

  if (params.id === "oops") {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-auto">
      <img
        className="rounded-xl h-36 w-36 mx-auto"
        src="/avatar.png"
        alt="Image Description"
      ></img>
      <h1 className="text-white text-3xl mt-5">Helloouu 👋🏻</h1>
      <p className="text-white m-2.5">Your custom text here 💭</p>
      {userLinkItem.links.map((link, key) => {
        return (
          <>
            <Link
              key={key}
              href={link.href}
              target="_blank"
              className="flex flex-row w-5/6 sm:w-3/6 p-3 mb-5 justify-center items-center rounded-lg text-white bg-gradient-to-br from-purple-600 to-blue-500 transition duration-300 ease-in-out hover:from-purple-500 hover:to-blue-400 hover:shadow-md hover:shadow-blue-500/50"
            >
              <div className="mx-1">
                {icons[link.type as keyof typeof icons]}
              </div>
              <div className="mx-1">{link.type}</div>
            </Link>
          </>
        );
      })}
    </div>
  );
}
