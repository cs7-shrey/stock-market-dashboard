export default function CustomError({ message }) {
    return (
        <div className="bg-[#111111] border border-red-500 rounded-lg p-4 flex items-start space-x-4 max-w-sm">
            <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <div>
                <h3 className="text-lg font-medium text-red-300">Error</h3>
                <p className="mt-1 text-sm text-gray-300">{message}</p>
            </div>
        </div>
    )
}