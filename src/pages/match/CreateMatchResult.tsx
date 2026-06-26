import { useState } from "react";
import PageLayout from "../../component/layout/PageLayout"
import PageHeader from "../../component/ui/PageHeader";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import SectionLayout from "../../component/layout/SectionLayout";
import { Link, useParams } from "react-router-dom";
import Buttons from "../../component/common/Buttons";

type ResultType = "innings" | "result";

const results = [
  {
    id: "innings" as ResultType, label: "Innings", badge: "IN", meta: "create innings"
  },
  {
    id: "result" as ResultType, label: "Result", badge: "RS", meta: "create result" 

  }
]

 const CreateMatchResult = () => {

  const {tournamentId, matchId} = useParams();

  const goBack = useGoBack();
  const [selected, setSelected] = useState<ResultType>("innings");


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Pick a option"
        title="Create Match Result or Innings"
        subtitle="Go for create innings first"
      />

      <SectionLayout>
          {/* option cards */}
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
                    {results.map(({ id, label, badge, meta }) => {
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
                    <Link to={`${selected === "result" ? `/dashboard/matchResult/create/${tournamentId}/${matchId}` :
                        `/dashboard/innings/create/${tournamentId}/${matchId}`}`}>
                        <Buttons variant="primary" size="md" className="px-7 rounded-lg flex items-center gap-2">
                            Continue <span>→</span>
                        </Buttons>
                    </Link>
                </div>
      </SectionLayout>

    </PageLayout>
  )
}

export default CreateMatchResult;