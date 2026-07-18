import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/prop-types */
import IconByName from "@mat3ra/cove.js/dist/mui/components/icon/IconByName";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PseudoAutocomplete from "./PseudoAutocomplete";
// Standalone stub — ElementAvatar shows the element symbol in a small colored chip.
function ElementAvatar({ element }) {
    return (_jsx("span", { style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#7c4dff",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
        }, children: element }));
}
export function PseudopotentialList({ pseudoData, isActive, onChange, onButtonClick, }) {
    return (_jsx(Box, { className: "PseudopotentialList", children: pseudoData.map((ppDoc) => {
            const { value: element, selectedPseudo, dataSource: availablePseudos } = ppDoc;
            return (_jsxs(Stack, { direction: "row", width: "100%", spacing: 1, "data-tid": element, alignItems: "center", children: [_jsx(ElementAvatar, { element: element !== null && element !== void 0 ? element : "" }), _jsx(PseudoAutocomplete, { className: "pseudos-input", disabled: !isActive, options: availablePseudos, onChange: onChange, value: selectedPseudo }), _jsx(Button, { "data-tid": "pseudo-upload", onClick: onButtonClick, variant: "outlined", color: "secondary", startIcon: _jsx(IconByName, { name: "gateway.upload" }), children: "Upload" })] }, element));
        }) }));
}
