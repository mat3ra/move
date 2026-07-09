import type { PseudopotentialMetaProperty } from "@mat3ra/prode";
import React from "react";
import { type PseudoItem } from "./PseudoAutocomplete";
export interface PseudoData {
    value?: string;
    selectedPseudo: PseudoItem;
    dataSource: PseudopotentialMetaProperty[];
}
export interface PseudopotentialListProps {
    pseudoData: PseudoData[];
    isActive: boolean;
    onChange: (value: PseudoItem) => void;
    onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}
export declare function PseudopotentialList({ pseudoData, isActive, onChange, onButtonClick, }: PseudopotentialListProps): React.JSX.Element;
//# sourceMappingURL=PseudoList.d.ts.map