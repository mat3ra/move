import type { Subworkflow } from "@mat3ra/wode";
import React from "react";
import type { PseudoListData } from "../../utils/pseudopotentials";
interface PseudoFormProps {
    /**
     * Pre-filtered and sorted pseudopotential data for each element.
     * Compute this with `computePseudosListData()` in the parent.
     */
    pseudosListData: PseudoListData;
    subworkflow: Subworkflow;
    onUpdate: (subworkflow: Subworkflow) => void;
    onUploadClick: React.MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    adjustable?: boolean;
    className?: string;
}
export declare function PseudoForm({ pseudosListData, subworkflow, onUpdate, onUploadClick, isLoading, adjustable, className, }: PseudoFormProps): React.JSX.Element;
export {};
//# sourceMappingURL=PseudoForm.d.ts.map