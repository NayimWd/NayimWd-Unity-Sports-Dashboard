import { fontStyle } from "../../utils/ClassUtils";

interface PageHeaderProps {
    topTitle?: string;
    title: string;
    subtitle?: string;
}

const PageHeader = ({ topTitle, title, subtitle }: PageHeaderProps) => {
    return (
        <div className="text-center mt-10 mb-11">
            {topTitle && (
                <p className="text-xs font-medium uppercase tracking-widest text-muted mb-2">
                    · {topTitle} ·
                </p>
            )}
            <h1 className={`${fontStyle.pageTitle} text-font`}>{title}</h1>
            {subtitle && (
                <p className="text-sm text-muted mt-1">{subtitle}</p>
            )}
        </div>
    )
}

export default PageHeader