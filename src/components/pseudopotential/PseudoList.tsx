/* eslint-disable react/prop-types */
import IconByName from "@exabyte-io/cove.js/dist/mui/components/icon/IconByName";
import type { PseudopotentialMetaProperty } from "@mat3ra/prode";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from "react";

import PseudoAutocomplete, { type PseudoItem } from "./PseudoAutocomplete";

// Standalone stub — ElementAvatar shows the element symbol in a small colored chip.
function ElementAvatar({ element }: { element: string }) {
    return (
        <span
            style={{
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
            }}>
            {element}
        </span>
    );
}

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

export function PseudopotentialList({
    pseudoData,
    isActive,
    onChange,
    onButtonClick,
}: PseudopotentialListProps) {
    return (
        <Box className="PseudopotentialList">
            {pseudoData.map((ppDoc) => {
                const { value: element, selectedPseudo, dataSource: availablePseudos } = ppDoc;

                return (
                    <Stack
                        direction="row"
                        width="100%"
                        spacing={1}
                        key={element}
                        data-tid={element}
                        alignItems="center">
                        <ElementAvatar element={element ?? ""} />
                        <PseudoAutocomplete
                            className="pseudos-input"
                            disabled={!isActive}
                            options={availablePseudos}
                            onChange={onChange}
                            value={selectedPseudo}
                        />
                        <Button
                            data-tid="pseudo-upload"
                            onClick={onButtonClick}
                            variant="outlined"
                            color="secondary"
                            startIcon={<IconByName name="gateway.upload" />}>
                            Upload
                        </Button>
                    </Stack>
                );
            })}
        </Box>
    );
}
