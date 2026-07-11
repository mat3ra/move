import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsx-a11y/label-has-associated-control */
import UploadButton from "@exabyte-io/cove.js/dist/mui/components/button/UploadButton";
import Dialog from "@exabyte-io/cove.js/dist/mui/components/dialog/Dialog";
import Select from "@exabyte-io/cove.js/dist/mui/components/select";
const SelectComponent = Select;
import { PERIODIC_TABLE } from "@exabyte-io/periodic-table.js";
import { tree } from "@mat3ra/mode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { PseudoSelectSchema } from "../../schemas/pseudo_select";
// In standalone mode, appSettingsClient is not available. Provide a safe default.
const appSettingsClient = () => ({ fileSizeLimit: 50 * 1024 * 1024 }); // 50 MB default
const { getDFTFunctionalsByApproximation } = tree;
const allElements = Object.values(PERIODIC_TABLE)
    .map((el) => el.symbol)
    .sort();
function PseudoUploadDialog({ id = "pseudo-upload-dialog", title = "Upload Pseudopotential File", onClose, onSubmit, isSubmitButtonProcessing = false, elements = [], isElementSelectEnabled = false, }) {
    var _a;
    const [element, setElement] = useState(elements[0] || "");
    const [approximation, setApproximation] = useState("");
    const [functional, setFunctional] = useState("");
    const [type, setType] = useState(null);
    const [application, setApplication] = useState("");
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const getFunctionalSelectedValues = (currentApproximation) => {
        return getDFTFunctionalsByApproximation(currentApproximation);
    };
    const getAllowedValues = (field) => PseudoSelectSchema.schema(field).type.definitions[0].allowedValues;
    useEffect(() => {
        var _a, _b, _c, _d;
        setApproximation(getAllowedValues("approximation")[0]);
        setFunctional((_d = (_c = getFunctionalSelectedValues((_b = (_a = getAllowedValues("approximation")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "")) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : "");
        setType(getAllowedValues("type")[0]);
        setApplication(getAllowedValues("app")[0]);
        setFile(null);
    }, []);
    const getSelectItems = (items) => {
        if (!items)
            return [];
        return items.map((item) => ({
            id: item,
            name: item,
            value: item,
        }));
    };
    const handleFileUpload = (event) => {
        if (!event.target.files)
            return;
        const fileFromInput = event.target.files[0];
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
            setErrorMessage(`File is too big. Limit is ${appSettingsClient().fileSizeLimit / 1024 ** 2}MB`);
        }
        else {
            // submit ok event state
            const reader = new FileReader();
            reader.onload = async (evt) => {
                var _a;
                if (!((_a = evt === null || evt === void 0 ? void 0 : evt.target) === null || _a === void 0 ? void 0 : _a.result) || !type)
                    return;
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
    return (_jsxs(Dialog, { open: true, id: id, title: title, onClose: onClose, onSubmit: handleSubmit, submitButtonText: "Save", isSubmitButtonDisabled: !file, isSubmitButtonProcessing: isSubmitButtonProcessing, scroll: "body", maxWidth: "sm", children: [_jsx(SelectComponent, { id: "select-element", label: "Element", value: element, onChange: (e) => setElement(e.target.value), items: getSelectItems(isElementSelectEnabled ? allElements : elements) }), _jsx(SelectComponent, { id: "select-approximation", label: "Approximation", value: approximation, onChange: (e) => {
                    var _a, _b;
                    setApproximation(e.target.value);
                    setFunctional((_b = (_a = getFunctionalSelectedValues(e.target.value)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "");
                }, items: getSelectItems(getAllowedValues("approximation")) }), _jsx(SelectComponent, { id: "select-functional", label: "Functional", value: functional, onChange: (e) => {
                    setFunctional(e.target.value);
                }, items: getSelectItems((_a = getFunctionalSelectedValues(approximation)) !== null && _a !== void 0 ? _a : []) }), _jsx(SelectComponent, { id: "select-type", label: "Type", value: type, onChange: (e) => {
                    setType(e.target.value);
                }, items: getSelectItems(getAllowedValues("type")) }), _jsx(SelectComponent, { id: "select-application", label: "application", value: application, onChange: (e) => {
                    setApplication(e.target.value);
                }, items: getSelectItems(getAllowedValues("app")) }), _jsx(Box, { sx: { pt: 1 }, children: _jsx(UploadButton, { id: "pseudo-upload-file", label: "Upload file", file: file, onFileUpload: handleFileUpload }) }), _jsx(Box, { alignItems: "center", justifyContent: "center", display: "flex", sx: { width: "100%" }, children: _jsx(Typography, { variant: "error", children: errorMessage }) })] }));
}
export default PseudoUploadDialog;
