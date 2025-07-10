import Modal from "./Modal";

interface dangerModalProps {
    dangerOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    onConfirm: () => void;
    loading?: boolean;
}

const DangerModal = ({dangerOpen, onOpenChange, title, description, onConfirm, loading}: dangerModalProps) => {
  return (
    <Modal
       isOpen={dangerOpen}
       onOpenChange={onOpenChange}
       title={title}
       description={description}
       variant="info"
       confirmText="Got it"
       isLoading={loading}
       onConfirm={onConfirm}
    />
  )
}

export default DangerModal