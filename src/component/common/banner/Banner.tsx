import { fontStyle } from "../../../utils/ClassUtils";

interface BannerProps {
    pageText: string;
    navText?: string;
    navLink?: string;
}


const Banner = ({pageText, navText, navLink}: BannerProps) => {
    return (
        <div className=" shadow-md flex items-center h-48 rounded-md w-full bg-bg glassBg">
            <div className="w-full paddingX px-2 flex flex-wrap justify-between items-center gap-2 leading-7 tracking-wider sm:text-lg font-bold">
                {" "}
                <h2 className={`${fontStyle.SectionHeading} text-primary uppercase font-inter`}> {pageText ? pageText : "Place Holder"} </h2>
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