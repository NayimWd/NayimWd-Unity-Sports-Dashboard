const SectionError = ({ message = "Something Went Wrong!" }: { message?: string }) => {
    return (
        <div className="w-full flex justify-center items-center">
            <p className="bg-toastErrorBg text-toastErrorText p-8 rounded shadow text-lg font-inter font-semibold tracking-wide w-full max-w-sm break-words max-h-40 overflow-auto">
                {message}
            </p>
        </div>
    )
}

export default SectionError;