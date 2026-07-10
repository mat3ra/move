import Autocomplete from "@mui/material/Autocomplete";
import Stack, { StackOwnProps } from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

interface PseudoOptionProps
    extends Omit<StackOwnProps, "sx" | "alignItems" | "justifyContent" | "role" | "direction"> {
    option: PseudoItem & { isCustom?: boolean };
}

export type PseudoItem = { path: string; owner?: { slug: string } };

function PseudoOption({ option, ...props }: PseudoOptionProps) {
    const theme = useTheme();
    const ownerText = option.owner ? option.owner.slug : "user";

    return (
        <Stack
            width="100%"
            direction="row"
            role="option"
            justifyContent="space-between"
            sx={{
                paddingX: 1,
                "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                },
            }}
            alignItems="center"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle1" noWrap className="option-title">
                    {option.path.split("/").pop()}
                </Typography>
                <Typography
                    variant="subtitle2"
                    noWrap
                    className="option-path"
                    justifySelf="flex-start">
                    {option.path}
                </Typography>
            </Stack>
            <Typography variant="caption" noWrap>
                {option.isCustom ? ownerText : "default"}
            </Typography>
        </Stack>
    );
}

interface PseudoAutocompleteProps {
    options: PseudoItem[];
    onChange: (value: PseudoItem) => void;
    disabled?: boolean;
    value: PseudoItem;
    className?: string;
}

export default function PseudoAutocomplete({
    options,
    onChange,
    disabled,
    value,
    className,
}: PseudoAutocompleteProps) {
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
        } else if (!options.length) {
            setSelected({ path: "NO PSEUDOPOTENTIAL FOUND" });
        } else {
            setSelected(value);
        }
    }, [paths.join(""), value]);

    return !selected ? null : (
        <Autocomplete
            inputValue={selected?.path}
            value={selected}
            disabled={disabled}
            className={className}
            renderInput={(params) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <TextField {...params} focused={isFocused} variant="filled" size="small" />
            )}
            options={options}
            filterOptions={(options) => options}
            getOptionLabel={(option) => option.path}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderOption={(props, option) => <PseudoOption {...props} option={option} />}
            onChange={(_, value, reason) => {
                if (reason === "selectOption" && value) {
                    onChange(value);
                }
            }}
            isOptionEqualToValue={(option, value) => option.path === value.path}
            size="small"
            fullWidth
            openOnFocus
            disablePortal
        />
    );
}
