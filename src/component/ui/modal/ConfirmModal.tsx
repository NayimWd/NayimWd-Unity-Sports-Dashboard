import Modal from "./Modal";

// interface confirm modal props
interface ConfirmModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    onConfirm: () => void;
    isLoading?: boolean;
}

const ConfirmModal = ({ isOpen, onOpenChange, title, description, onConfirm, isLoading }: ConfirmModalProps) => {

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            confirmText="Yes, Confirm"
            cancelText="Cancel"
            onConfirm={onConfirm}
            isLoading={isLoading}
            variant="info"
            size="sm"
        />
    )
}

export default ConfirmModal