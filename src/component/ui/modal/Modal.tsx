import { VariantProps } from "class-variance-authority"
import cn from "../../../utils/cn"
import { HtmlHTMLAttributes, ReactNode } from "react";
import { baseModal } from "./baseModal";
import Loader from "../../common/loader/Loader";

interface ModalProps
    extends HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof baseModal> {
    children: ReactNode;
    isOpen: boolean;
    onOpenChange: () => void;
    isLoading?: boolean;
}

interface ModalBodyProps {
    children: ReactNode;
}


const Modal = ({ children, className, isOpen, onOpenChange, isLoading, variant, size }: ModalProps) => {

    return (
        <div className="bg-black/30 w-full h-full">
            <div className={cn(baseModal({ variant, size, className }))}>
                {isLoading ? <Loader size="md"/> : children}
                <button onClick={onOpenChange} className="absolute top-5 right-5 rounded-full bg-red-500 shadow">
                </button>
            </div>
        </div>
    )
}

function ModalHeader({ children }: ModalBodyProps) {
    return (
        <>
            <h1 className="">{children}</h1>
        </>
    )
}
function ModalBody({ children }: ModalBodyProps) {
    return (
        <div>
            {children}
        </div>
    )
}
function ModalFooter({ children }: ModalBodyProps) {
    return (
        <div>
            {children}
        </div>
    )
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;


export default Modal;