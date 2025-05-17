import { useEffect, useState } from "react"
import Tooltip from "./Tooltip";
import cn from "../../utils/cn";
import { Copy, PartyPopper, Share2 } from "lucide-react";

interface buttonProps {
    textCopy: string;
    className?: string;
}

const CopyButton = ({ textCopy }: buttonProps) => {

    const [copied, setCopied] = useState(false);
    const [hovered, setHover] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textCopy);
        setCopied(true);
    }

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [copied])

    return (
        <Tooltip position="left" content={copied ? "Copied!" : "Copy Link"}>
            <button
                onClick={handleCopy}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className={cn("p-2 rounded transition-colors hover:bg-surface text-muted-foreground")}
            >
                {
                    copied ? (
                        <div className="relative">
                            <Copy size={16} className="text-green-500" />
                            <PartyPopper
                                size={14}
                                className="absolute -top-2 -right-2 text-yellow-500 animate-bounce"
                            />
                        </div>
                    )
                        :
                        hovered ? (
                            <Copy className="text-secondary" size={16} />
                        )
                            :
                            (
                                <Share2 className="text-red-600 font-bold" size={18} />
                            )
                }
            </button>
        </Tooltip>
    )
}

export default CopyButton;