import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
const StyledOptionBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.25),
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
}));
function OptionWithDescription({ option, onClick, "data-option-index": dataOptionIndex, descriptionFn, id, }) {
    return (_jsxs(StyledOptionBox, { id: id, onClick: onClick, "data-option-index": dataOptionIndex, role: "option", children: [_jsx(Typography, { variant: "body1", children: option.name }), _jsx(Typography, { variant: "body2", children: descriptionFn ? descriptionFn(option) : option.path })] }));
}
function PathEntitySelect({ options, selected, placeholder = "Select an option...", disabled = false, onChange, descriptionFn, title, idPrefix, }) {
    const [value, setValue] = useState(selected);
    const paths = options.map((o) => o.path);
    useEffect(() => {
        if ((!selected && options.length > 0) || (selected && !paths.includes(selected.path))) {
            const valueToSet = options.length ? options[0] : undefined;
            setValue(valueToSet);
            onChange(valueToSet);
        }
        else {
            setValue(selected);
        }
    }, [selected, paths]);
    const handleChange = (_, value, reason) => {
        if (reason === "selectOption" && value) {
            setValue(value);
            onChange(value);
        }
    };
    return (_jsx(Box, { id: `${idPrefix}-wrapper`, children: _jsx(Autocomplete, { id: `${idPrefix}-autocomplete`, renderInput: (params) => (_jsx(TextField, { ...params, variant: "filled", placeholder: placeholder, label: title || undefined, size: "small" })), renderOption: (params, option) => (_jsx(OptionWithDescription, { ...params, descriptionFn: descriptionFn, option: option })), getOptionLabel: (option) => option.name, options: options, value: value, isOptionEqualToValue: (option, value) => (option === null || option === void 0 ? void 0 : option.path) === (value === null || value === void 0 ? void 0 : value.path), onChange: handleChange, disabled: disabled, size: "small", fullWidth: true, openOnFocus: true, disablePortal: true }) }));
}
export default PathEntitySelect;
