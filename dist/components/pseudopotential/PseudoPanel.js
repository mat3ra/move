import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Accordion from "@mat3ra/cove/dist/mui/components/accordion/Accordion";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InfoPopoverWithDocumentation from "@mat3ra/cove/dist/mui/components/popover/info-popover/InfoPopoverWithDocumentation";
export function PseudoPanel({ children }) {
    return (_jsx(Accordion, { isExpanded: true, 
        // @ts-ignore TODO: fix Accordion types
        className: "pseudopotential-form", id: "pseudo-panel", renderSummary: _jsxs(Stack, { direction: "row", width: "100%", alignItems: "center", justifyContent: "space-between", children: [_jsx(Typography, { className: "pseudo", variant: "subtitle2", color: "text.primary", children: "Pseudopotentials" }), _jsxs(InfoPopoverWithDocumentation, { popoverTitle: "Pseudopotentials", children: ["We supply pseudopotentials from default sets:", " ", _jsx("a", { href: "https://www.physics.rutgers.edu/gbrv/", target: "_blank", rel: "noreferrer", children: "gbrv v1.5" }), " ", "for espresso, and `v5.*-default` for vasp. You may upload your custom files here during job creation. During workflow design we show ", _jsx("i", { children: "Si" }), " ", "pseudopotentials as example. You may type text or comma-separated regular expressions to filter pseudopotentials during job creation. Default pseudo for the element is used if no match found."] })] }), children: children }));
}
export function PseudoSearchBar({ searchText = "", onChange, }) {
    return (_jsx(TextField, { id: "pseudopotential-searchText", label: "Filter by text or regular expression: eg. ^(?!.*sv)(?=.*GW)", type: "text", variant: "standard", value: searchText, onChange: onChange, fullWidth: true }));
}
