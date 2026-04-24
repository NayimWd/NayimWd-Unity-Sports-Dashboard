interface StepNavigationProps {
    step: number;
    totalSteps: number;
    onNext: () => void;
    onBack: () => void;
    submitLabel?: string;
}

const StepNavigation = ({
    step,
    totalSteps,
    onNext,
    onBack,
    submitLabel = "Submit",
}: StepNavigationProps) => {
    return (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 text-sm text-subtext border border-border
                     rounded-lg hover:bg-subSurface transition-colors"
                >
                    ← Back
                </button>
            ) : <div />}

            {step < totalSteps ? (
                <button
                    type="button"
                    onClick={onNext}
                    className="px-5 py-2 text-sm font-medium text-white bg-primary
                     hover:bg-primaryHover rounded-lg transition-colors"
                >
                    Next →
                </button>
            ) : (
                <button
                    type="submit"
                    className="px-5 py-2 text-sm font-medium text-white bg-primary
                     hover:bg-primaryHover rounded-lg transition-colors"
                >
                    {submitLabel}
                </button>
            )}
        </div>
    );
};

export default StepNavigation;