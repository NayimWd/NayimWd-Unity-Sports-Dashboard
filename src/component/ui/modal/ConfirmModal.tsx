import RedixModal from "./RedixModal";

// interface confirm modal props
interface ConfirmModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    onConfirm: () => void;
    loading?: boolean;
}

const ConfirmModal = ({ isOpen, onOpenChange, title, description, onConfirm, loading }: ConfirmModalProps) => {

    return (
        <RedixModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            confirmText="Yes, Confirm"
            cancelText="Cancel"
            onConfirm={onConfirm}
            isLoading={loading}
            variant="info"
            size="sm"
        />
    )
}

export default ConfirmModal