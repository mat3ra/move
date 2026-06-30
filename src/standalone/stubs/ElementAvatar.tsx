import Avatar from "@mui/material/Avatar";
import React from "react";

/** Stub replacing the webapp's ElementAvatar. */
export function ElementAvatar({ element }: { element?: string }) {
    return (
        <Avatar
            sx={{
                width: 32,
                height: 32,
                fontSize: 12,
                fontWeight: 700,
                bgcolor: "primary.main",
                flexShrink: 0,
            }}>
            {element ?? "?"}
        </Avatar>
    );
}
