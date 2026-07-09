import { jsx as _jsx } from "react/jsx-runtime";
import Tooltip from "@mui/material/Tooltip";
/** Stub replacing the webapp's InfoPopoverWithDocumentationDialog. */
export function InfoPopoverWithDocumentationDialog({ children, popoverTitle, }) {
    return (_jsx(Tooltip, { title: popoverTitle !== null && popoverTitle !== void 0 ? popoverTitle : "", arrow: true, children: _jsx("span", { style: { cursor: "help", opacity: 0.6, fontSize: 12 }, children: popoverTitle !== null && popoverTitle !== void 0 ? popoverTitle : "ℹ️" }) }));
}
