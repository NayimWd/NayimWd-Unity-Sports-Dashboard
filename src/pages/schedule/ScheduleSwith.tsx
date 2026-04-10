import { useState } from "react";
import Buttons from "../../component/common/Buttons";
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout";
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils";
import { Link } from "react-router-dom";


type RoundType = "round1" | "qualifier";

const rounds = [
    { id: "round1" as RoundType, label: "Round 1", badge: "R1", meta: "Group stage" },
    { id: "qualifier" as RoundType, label: "Qualifier", badge: "QL", meta: "Elimination" },
];

const ScheduleSwith = () => {
    const goBack = useGoBack();
    const [selected, setSelected] = useState<RoundType>("round1");
    return (
        <PageLayout>
            <BackButton onClick={goBack}>Back</BackButton>
            <div className="text-center mt-10 mb-11">
                <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">
                    · Match Setup ·
                </p>
                <h1 className={`${fontStyle.pageTitle} text-font`}>Choose match round</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Select the round type to configure the schedule
                </p>
            </div>
            <SectionLayout>
                {/* Round cards */}
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
                    {rounds.map(({ id, label, badge, meta }) => {
                        const isActive = selected === id;
                        return (
                            <button
                                key={id}
                                onClick={() => setSelected(id)}
                                className={`
                  relative flex flex-col items-center gap-2.5 p-5 rounded-xl border text-left
                  transition-all duration-150
                  ${isActive
                                        ? "bg-bg"
                                        : "border-subSurface dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }
                `}
                            >
                                {/* Checkmark */}
                                {isActive && (
                                    <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                )}

                                {/* Badge */}
                                <div className={`
                  w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium
                  border transition-colors
                  ${isActive
                                        ? "bg-surface border-transparent text-font"
                                        : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                                    }
                `}>
                                    {badge}
                                </div>

                                <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
                                <span className="text-xs text-gray-400">{meta}</span>
                            </button>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-8">
                    <Link to={`${selected === "round1" ? `/dashboard/schedule/R1/create` :
                        `/dashboard/schedule/R2/create`}`}>
                        <Buttons variant="primary" size="md" className="px-7 rounded-lg flex items-center gap-2">
                            Continue <span>→</span>
                        </Buttons>
                    </Link>
                </div>
            </SectionLayout>
        </PageLayout>
    )
}

export default ScheduleSwith