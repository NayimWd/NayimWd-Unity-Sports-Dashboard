import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import cn from "../../utils/cn";


interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  desc?: string;
  children?: React.ReactNode;
  onConfirm?: ()=> void;
  confirmText?: ()=> string;
  cancelText?: string;
  isLoading?: boolean;
}

const Modal = ({isOpen, onOpenChange, title, desc, children, onConfirm, confirmText, cancelText, isLoading}: ModalProps) => {
  return (
    <div>Modal</div>
  )
}

export default Modal;