/* eslint-disable jsx-a11y/label-has-associated-control */
import UploadButton from "@mat3ra/cove.js/dist/mui/components/button/UploadButton";
import Dialog from "@mat3ra/cove.js/dist/mui/components/dialog/Dialog";
import Select from "@mat3ra/cove.js/dist/mui/components/select";
const SelectComponent = Select as any;
import { PERIODIC_TABLE } from "@exabyte-io/periodic-table.js";
import type { FileDataItem } from "@mat3ra/esse/dist/js/types";
import { tree } from "@mat3ra/mode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

import { PseudoSelectSchema } from "../../schemas/pseudo_select";

// In standalone mode, appSettingsClient is not available. Provide a safe default.
const appSettingsClient = () => ({ fileSizeLimit: 50 * 1024 * 1024 }); // 50 MB default

const { getDFTFunctionalsByApproximation } = tree;

interface PeriodicElement {
    symbol: string;
}

interface PeriodicTable {
    [key: string]: PeriodicElement;
}

interface ParsedElement {
    id: string;
    name: string;
    value: string;
}

const allElements: string[] = Object.values(PERIODIC_TABLE as PeriodicTable)
    .map((el: PeriodicElement): string => el.symbol)
    .sort();

interface SubmitParams {
    element: string;
    approximation: string;
    functional: string;
    application: string;
    content: string;
    filename: string;
    type: FileDataItem["type"];
}
export interface PseudoUploadDialogProps {
    id?: string;
    title?: string;
    onClose: () => void;
    onSubmit: (data: SubmitParams) => Promise<void>;
    isSubmitButtonProcessing?: boolean;
    elements?: string[];
    isElementSelectEnabled?: boolean;
}

function PseudoUploadDialog({
    id = "pseudo-upload-dialog",
    title = "Upload Pseudopotential File",
    onClose,
    onSubmit,
    isSubmitButtonProcessing = false,
    elements = [],
    isElementSelectEnabled = false,
}: PseudoUploadDialogProps) {
    const [element, setElement] = useState(elements[0] || "");
    const [approximation, setApproximation] = useState("");
    const [functional, setFunctional] = useState("");
    const [type, setType] = useState<FileDataItem["type"] | null>(null);
    const [application, setApplication] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const getFunctionalSelectedValues = (currentApproximation: string) => {
        return getDFTFunctionalsByApproximation(currentApproximation as Parameters<typeof getDFTFunctionalsByApproximation>[0]);
    };

    const getAllowedValues = (field: string) =>
        PseudoSelectSchema.schema(field).type.definitions[0]!.allowedValues;

    useEffect(() => {
        setApproximation(getAllowedValues("approximation")![0]);
        setFunctional(getFunctionalSelectedValues(getAllowedValues("approximation")?.[0] ?? "")?.[0] ?? "");
        setType(getAllowedValues("type")![0] as FileDataItem["type"]);
        setApplication(getAllowedValues("app")![0]);
        setFile(null);
    }, []);

    const getSelectItems = (items: string[]): ParsedElement[] => {
        if (!items) return [];
        return items.map((item: string) => ({
            id: item,
            name: item,
            value: item,
        }));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const fileFromInput: File = event.target.files[0];

        setFile(fileFromInput);
    };

    const handleSubmit = () => {
        setErrorMessage("");

        // test if file exist
        if (!file) {
            return setErrorMessage("File is not selected");
            // File size limit is set in appSettings
        }
        if (file && file.size > appSettingsClient().fileSizeLimit) {
            setErrorMessage(
                `File is too big. Limit is ${appSettingsClient().fileSizeLimit / 1024 ** 2}MB`,
            );
        } else {
            // submit ok event state
            const reader = new FileReader();

            reader.onload = async (evt: ProgressEvent<FileReader>) => {
                if (!evt?.target?.result || !type) return;

                await onSubmit({
                    element,
                    approximation,
                    functional,
                    type,
                    application,
                    content: evt.target.result.toString(),
                    filename: file.name,
                });
            };
            reader.readAsText(file);
        }
    };

    return (
        <Dialog
            open
            id={id}
            title={title}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText="Save"
            isSubmitButtonDisabled={!file}
            isSubmitButtonProcessing={isSubmitButtonProcessing}
            scroll="body"
            maxWidth="sm">
            <SelectComponent
                id="select-element"
                label="Element"
                value={element}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setElement(e.target.value)}
                items={getSelectItems(isElementSelectEnabled ? allElements : elements)}
            />
            <SelectComponent
                id="select-approximation"
                label="Approximation"
                value={approximation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setApproximation(e.target.value);
                    setFunctional(getFunctionalSelectedValues(e.target.value)?.[0] ?? "");
                }}
                items={getSelectItems(getAllowedValues("approximation"))}
            />
            <SelectComponent
                id="select-functional"
                label="Functional"
                value={functional}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFunctional(e.target.value);
                }}
                items={getSelectItems(getFunctionalSelectedValues(approximation) ?? [])}
            />
            <SelectComponent
                id="select-type"
                label="Type"
                value={type}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setType(e.target.value as FileDataItem["type"]);
                }}
                items={getSelectItems(getAllowedValues("type"))}
            />
            <SelectComponent
                id="select-application"
                label="application"
                value={application}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setApplication(e.target.value);
                }}
                items={getSelectItems(getAllowedValues("app"))}
            />
            <Box sx={{ pt: 1 }}>
                <UploadButton
                    id="pseudo-upload-file"
                    label="Upload file"
                    file={file}
                    onFileUpload={handleFileUpload}
                />
            </Box>
            <Box alignItems="center" justifyContent="center" display="flex" sx={{ width: "100%" }}>
                {/* @ts-ignore */}
                <Typography variant="error">{errorMessage}</Typography>
            </Box>
        </Dialog>
    );
}

export default PseudoUploadDialog;
