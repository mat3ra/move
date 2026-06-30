import Tooltip from "@mui/material/Tooltip";
import React from "react";

/** Stub replacing the webapp's InfoPopoverWithDocumentationDialog. */
export function InfoPopoverWithDocumentationDialog({
    children,
    popoverTitle,
}: {
    children?: React.ReactNode;
    popoverTitle?: string;
    searchText?: string;
}) {
    return (
        <Tooltip title={popoverTitle ?? ""} arrow>
            <span style={{ cursor: "help", opacity: 0.6, fontSize: 12 }}>
                {popoverTitle ?? "ℹ️"}
            </span>
        </Tooltip>
    );
}
