import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LoadingIndicator } from "@mat3ra/cove/dist/mui-composed/components/loading/LoadingIndicator";
import Stack from "@mui/material/Stack";
import setClass from "classnames";
import { useCallback, useState } from "react";
import { PseudoPanel, PseudoSearchBar } from "./PseudoPanel";
import { PseudopotentialList } from "./PseudoList";
export function PseudoForm({ pseudosListData, subworkflow, onUpdate, onUploadClick, isLoading, adjustable = true, className, }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const method = subworkflow.modelInstance.Method;
    if (method.type !== "pseudopotential") {
        throw new Error("Method is not a PseudopotentialMethod");
    }
    const [searchText, setSearchText] = useState(method.searchText || "");
    const onUpdateSearchText = (event) => {
        const newSearchText = event.target.value;
        setSearchText(newSearchText);
        method.setSearchText(newSearchText);
        onUpdate(subworkflow);
    };
    const onPseudoSelected = useCallback((pseudoItem) => {
        method.setPseudopotentialPerElement(pseudoItem);
        onUpdate(subworkflow);
    }, [method, subworkflow, onUpdate]);
    return (_jsx("div", { className: setClass(className), children: _jsx(PseudoPanel, { children: _jsxs(Stack, { spacing: 1, children: [_jsx(PseudoSearchBar, { searchText: searchText, onChange: onUpdateSearchText }), isLoading ? (_jsx(LoadingIndicator, { included: true })) : (_jsx(PseudopotentialList, { pseudoData: pseudosListData, isActive: adjustable, onChange: onPseudoSelected, onButtonClick: onUploadClick }))] }) }) }));
}
