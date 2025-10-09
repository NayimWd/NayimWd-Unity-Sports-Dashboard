import RedixModal from "./RedixModal";

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
    <RedixModal
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