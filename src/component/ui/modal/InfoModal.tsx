import Modal from "./Modal";

interface modalProps {
    infoOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    onConfirm: () => void;
    loading?: boolean;
}

const InfoModal = ({infoOpen, onOpenChange, title, description, onConfirm, loading}: modalProps) => {
  return (
    <Modal
       isOpen={infoOpen}
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

export default InfoModal