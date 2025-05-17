import { useEffect } from "react";
import { useParams } from "react-router-dom"

const ScrollToTop = () => {
    const pathName = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathName])

    return null;
}

export default ScrollToTop;