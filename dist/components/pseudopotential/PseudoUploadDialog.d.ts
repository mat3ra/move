import type { FileDataItem } from "@mat3ra/esse/dist/js/types";
import React from "react";
interface SubmitParams {
    element: string;
    approximation: string;
    functional: string;
    application: string;
    content: string;
    filename: string;
    type: FileDataItem["type"];
}
export interface PseudoUploadDialogProps {
    id?: string;
    title?: string;
    onClose: () => void;
    onSubmit: (data: SubmitParams) => Promise<void>;
    isSubmitButtonProcessing?: boolean;
    elements?: string[];
    isElementSelectEnabled?: boolean;
}
declare function PseudoUploadDialog({ id, title, onClose, onSubmit, isSubmitButtonProcessing, elements, isElementSelectEnabled, }: PseudoUploadDialogProps): React.JSX.Element;
export default PseudoUploadDialog;
