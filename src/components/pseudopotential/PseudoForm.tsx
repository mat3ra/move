import { LoadingIndicator } from "@mat3ra/cove.js/dist/mui-composed/components/loading/LoadingIndicator";
import type { Subworkflow } from "@mat3ra/wode";
import Stack from "@mui/material/Stack";
import setClass from "classnames";
import React, { useCallback, useEffect, useState } from "react";

import type { PseudoItem } from "./PseudoAutocomplete";
import { PseudoPanel, PseudoSearchBar } from "./PseudoPanel";
import { PseudopotentialList } from "./PseudoList";
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

export function PseudoForm({
    pseudosListData,
    subworkflow,
    onUpdate,
    onUploadClick,
    isLoading,
    adjustable = true,
    className,
}: PseudoFormProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const method = subworkflow.modelInstance.Method as any;

    if (method.type !== "pseudopotential") {
        throw new Error("Method is not a PseudopotentialMethod");
    }

    const [searchText, setSearchText] = useState<string>(method.searchText || "");

    const onUpdateSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchText = event.target.value;
        setSearchText(newSearchText);
        method.setSearchText(newSearchText);
        onUpdate(subworkflow);
    };

    const onPseudoSelected = useCallback(
        (pseudoItem: PseudoItem) => {
            method.setPseudopotentialPerElement(pseudoItem);
            onUpdate(subworkflow);
        },
        [method, subworkflow, onUpdate],
    );

    return (
        <div className={setClass(className)}>
            <PseudoPanel>
                <Stack spacing={1}>
                    <PseudoSearchBar searchText={searchText} onChange={onUpdateSearchText} />
                    {isLoading ? (
                        <LoadingIndicator included />
                    ) : (
                        <PseudopotentialList
                            pseudoData={pseudosListData}
                            isActive={adjustable}
                            onChange={onPseudoSelected}
                            onButtonClick={onUploadClick}
                        />
                    )}
                </Stack>
            </PseudoPanel>
        </div>
    );
}
