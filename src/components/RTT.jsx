import { ChevronsUp } from "@geist-ui/icons";
import { useEffect, useState } from "react";

const RTT = () => {

    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;

            setIsEnd(scrollPosition >= pageHeight - 5);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <>
            {isEnd && (
                <button onClick={scrollToTop} className='return-to-top' title="Return to top">
                    <ChevronsUp size={16} />
                </button>
            )}
        </>
    )
}

export default RTT
