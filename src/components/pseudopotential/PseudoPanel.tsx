import Accordion from "@mat3ra/cove.js/dist/mui/components/accordion/Accordion";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

import InfoPopoverWithDocumentation from "@mat3ra/cove.js/dist/mui/components/popover/info-popover/InfoPopoverWithDocumentation";

export interface MetaProperty {
    owner?: { slug: string };
    path: string;
    isCustom?: boolean;
}

export function PseudoPanel({ children }: { children: React.ReactNode }) {
    return (
        <Accordion
            isExpanded
            // @ts-ignore TODO: fix Accordion types
            className="pseudopotential-form"
            id="pseudo-panel"
            renderSummary={
                <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between">
                    <Typography className="pseudo" variant="subtitle2" color="text.primary">
                        Pseudopotentials
                    </Typography>
                    {/* @ts-ignore */}
                    <InfoPopoverWithDocumentation
                        popoverTitle="Pseudopotentials"
                    >
                        We supply pseudopotentials from default sets:{" "}
                        <a href="https://www.physics.rutgers.edu/gbrv/" target="_blank" rel="noreferrer">
                            gbrv v1.5
                        </a>{" "}
                        for espresso, and `v5.*-default` for vasp. You may upload your custom files
                        here during job creation. During workflow design we show <i>Si</i>{" "}
                        pseudopotentials as example. You may type text or comma-separated regular
                        expressions to filter pseudopotentials during job creation. Default pseudo
                        for the element is used if no match found.
                    </InfoPopoverWithDocumentation>
                </Stack>
            }>
            {children}
        </Accordion>
    );
}

export function PseudoSearchBar({
    searchText = "",
    onChange,
}: {
    searchText?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <TextField
            id="pseudopotential-searchText"
            label="Filter by text or regular expression: eg. ^(?!.*sv)(?=.*GW)"
            type="text"
            variant="standard"
            value={searchText}
            onChange={onChange}
            fullWidth
        />
    );
}
