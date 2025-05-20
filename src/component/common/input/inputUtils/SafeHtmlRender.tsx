import { ReactNode, useMemo } from "react";
import DOMPufify from "dompurify";

interface SafeHtmlRendererProps {
    html: string | null | undefined;
    className?: string;
    style?: React.CSSProperties;
    fallback?: ReactNode;
}

const SafeHtmlRender = ({ html, className, style, fallback = <p className="text-muted italic">No content available.</p>, }: SafeHtmlRendererProps) => {
    // Memoize the sanitized HTML to avoid unnecessary recalculations
    const sanitizedHtml = useMemo(() => {
        if (!html || typeof html !== "string") return null;

        return DOMPufify.sanitize(html, {
            USE_PROFILES: { html: true },
        })
    }, [html])

    // Fallback if sanitized content is empty
    if (!sanitizedHtml || sanitizedHtml.trim() === "") {
        return <>{fallback}</>;
    }

    return (
        <div
            className={className}
            style={style}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            data-testid="safe-html-renderer"
        />
    )
}

export default SafeHtmlRender;