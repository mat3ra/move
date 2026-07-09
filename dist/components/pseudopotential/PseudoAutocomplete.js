import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import path from "path";
import { useEffect, useState } from "react";
function PseudoOption({ option, ...props }) {
    const theme = useTheme();
    const ownerText = option.owner ? option.owner.slug : "user";
    return (_jsxs(Stack, { width: "100%", direction: "row", role: "option", justifyContent: "space-between", sx: {
            paddingX: 1,
            "&:hover": {
                backgroundColor: theme.palette.action.hover,
            },
        }, alignItems: "center", ...props, children: [_jsxs(Stack, { direction: "row", alignItems: "center", spacing: 1, children: [_jsx(Typography, { variant: "subtitle1", noWrap: true, className: "option-title", children: path.basename(option.path) }), _jsx(Typography, { variant: "subtitle2", noWrap: true, className: "option-path", justifySelf: "flex-start", children: option.path })] }), _jsx(Typography, { variant: "caption", noWrap: true, children: option.isCustom ? ownerText : "default" })] }));
}
export default function PseudoAutocomplete({ options, onChange, disabled, value, className, }) {
    const [selected, setSelected] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const paths = options.map((pseudo) => pseudo.path);
    useEffect(() => {
        if (value && options.length && !paths.includes(value.path)) {
            const valueToSet = options[0];
            setSelected(valueToSet);
            setIsFocused(true);
            setTimeout(() => {
                setIsFocused(false);
            }, 3000);
            onChange(valueToSet);
        }
        else if (!options.length) {
            setSelected({ path: "NO PSEUDOPOTENTIAL FOUND" });
        }
        else {
            setSelected(value);
        }
    }, [paths.join(""), value]);
    return !selected ? null : (_jsx(Autocomplete, { inputValue: selected === null || selected === void 0 ? void 0 : selected.path, value: selected, disabled: disabled, className: className, renderInput: (params) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        _jsx(TextField, { ...params, focused: isFocused, variant: "filled", size: "small" })), options: options, filterOptions: (options) => options, getOptionLabel: (option) => option.path, 
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderOption: (props, option) => _jsx(PseudoOption, { ...props, option: option }), onChange: (_, value, reason) => {
            if (reason === "selectOption" && value) {
                onChange(value);
            }
        }, isOptionEqualToValue: (option, value) => option.path === value.path, size: "small", fullWidth: true, openOnFocus: true, disablePortal: true }));
}
