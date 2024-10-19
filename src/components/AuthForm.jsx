import Loading from "./Loading"
export default function AuthForm({ onSubmit, onEmailChange, onPasswordChange, type, error, processing }) {
  return (
    <form action="#" method="POST" className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            onChange={onEmailChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2a628f]indigo-600 sm:text-sm sm:leading-6 dark:placeholder-gray-500 dark:bg-[#212121] dark:text-white"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400">
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            onChange={onPasswordChange}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2a628f] sm:text-sm sm:leading-6 dark:placeholder-gray-500 dark:bg-[#212121] dark:text-white"
          />
        </div>
      </div>

      <div className="text-red-500">
        {error}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-[#2a2d30] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a628f] dark:bg-[#0046cc]"
        >
          {processing ?
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            : 
            type} 
        </button>
      </div>
    </form>
  )
}