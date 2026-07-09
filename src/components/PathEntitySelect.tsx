/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
import { PathEntitySchema as PathEntity } from "@mat3ra/esse/dist/js/types";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { MouseEventHandler, useEffect, useState } from "react";

interface Props<Entity extends PathEntity> {
    options: Entity[];
    selected?: Entity;
    placeholder?: string;
    disabled?: boolean;
    onChange: (entity?: Entity) => void;
    descriptionFn?: (entity: Entity) => string;
    title?: string;
    idPrefix?: string;
}

interface OptionProps<Entity> {
    option: Entity;
    onClick?: MouseEventHandler;
    "data-option-index"?: string | number;
    descriptionFn?: (entity: Entity) => string;
    id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [otherProps: string]: any;
}

const StyledOptionBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.25),
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
})) as typeof Box;

function OptionWithDescription<Entity extends PathEntity>({
    option,
    onClick,
    "data-option-index": dataOptionIndex,
    descriptionFn,
    id,
}: OptionProps<Entity>) {
    return (
        <StyledOptionBox
            id={id}
            onClick={onClick}
            data-option-index={dataOptionIndex}
            role="option">
            <Typography variant="body1">{option.name}</Typography>
            <Typography variant="body2">
                {descriptionFn ? descriptionFn(option) : option.path}
            </Typography>
        </StyledOptionBox>
    );
}

function PathEntitySelect<Entity extends PathEntity>({
    options,
    selected,
    placeholder = "Select an option...",
    disabled = false,
    onChange,
    descriptionFn,
    title,
    idPrefix,
}: Props<Entity>) {
    const [value, setValue] = useState<Entity | undefined>(selected);
    const paths = options.map((o) => o.path);
    useEffect(() => {
        if ((!selected && options.length > 0) || (selected && !paths.includes(selected.path))) {
            const valueToSet = options.length ? options[0] : undefined;
            setValue(valueToSet);
            onChange(valueToSet);
        } else {
            setValue(selected);
        }
    }, [selected, paths]);

    const handleChange = (_: React.SyntheticEvent, value: Entity | null, reason: string) => {
        if (reason === "selectOption" && value) {
            setValue(value);
            onChange(value);
        }
    };

    return (
        <Box id={`${idPrefix}-wrapper`}>
            <Autocomplete
                id={`${idPrefix}-autocomplete`}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        placeholder={placeholder}
                        label={title || undefined}
                        size="small"
                    />
                )}
                renderOption={(params, option) => (
                    <OptionWithDescription<Entity>
                        {...params}
                        descriptionFn={descriptionFn}
                        option={option}
                    />
                )}
                getOptionLabel={(option) => option.name as string}
                options={options}
                value={value}
                isOptionEqualToValue={(option, value) => option?.path === value?.path}
                onChange={handleChange}
                disabled={disabled}
                size="small"
                fullWidth
                openOnFocus
                disablePortal
            />
        </Box>
    );
}

export default PathEntitySelect;
