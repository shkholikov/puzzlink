export default function NotFound() {
  return (
    <main id="content" role="main">
      <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="block text-2xl font-bold text-white sm:text-4xl">
          Requested page was not found 🤷🏻‍♂️
        </h1>
        <p className="mt-3 text-lg text-gray-300">
          Have not tried PuzzLink yet?
        </p>
        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <a
            className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm text-white font-semibold rounded-lg border border-transparent bg-gradient-to-br from-purple-600 to-blue-500 transition duration-300 ease-in-out hover:from-purple-500 hover:to-blue-400 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="/"
          >
            Try it now
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
