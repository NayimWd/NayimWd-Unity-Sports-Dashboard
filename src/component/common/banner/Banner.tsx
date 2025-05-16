
interface BannerProps {
    pageText: string;
    navText?: string;
    navLink?: string;
}


const Banner = ({pageText, navText, navLink}: BannerProps) => {
    return (
        <div className=" shadow-md flex items-center h-40 rounded-md w-full bg-surface glassBg">
            <div className="w-full bg-surface paddingX flex flex-wrap justify-between items-center gap-2 leading-7 tracking-wider sm:text-lg font-bold">
                {" "}
                <h2 className={`text-lg xsm:text-xl md:text-2xl text-primary uppercase font-inter`}> {pageText ? pageText : "Place Holder"} </h2>
                <div className="text-primary font-merriweather uppercase flex items-center gap-5">
                    {" "}
                    <p>{navText ? navText : "Place Holder"}</p>
                    <span className="text-2xl text-primary"> &#62;</span> 
                    <p>{navLink ? navLink : "Place Holder"}</p>
                </div>
            </div>
        </div>
    )
}

export default Banner;