import { jsx as _jsx } from "react/jsx-runtime";
import Avatar from "@mui/material/Avatar";
/** Stub replacing the webapp's ElementAvatar. */
export function ElementAvatar({ element }) {
    return (_jsx(Avatar, { sx: {
            width: 32,
            height: 32,
            fontSize: 12,
            fontWeight: 700,
            bgcolor: "primary.main",
            flexShrink: 0,
        }, children: element !== null && element !== void 0 ? element : "?" }));
}
