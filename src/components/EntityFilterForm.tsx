import ObjectFieldTemplate from "@exabyte-io/cove.js/dist/other/rjsf/templates/CustomObjectFieldTemplate";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Widgets } from "@rjsf/mui";
import { GenericObjectType, TitleFieldProps, WidgetProps } from "@rjsf/utils";
import merge from "lodash/merge";
import React, { useMemo } from "react";

import { useRJSFSchema } from "../hooks/useRJSFSchema";
import { ENTITY_FILTER_SCHEMAS } from "../schemas/filters";
import FixedRJSForm from "./FixedRJSForm";

interface Props<FormData extends GenericObjectType> {
    onChange: (formData: FormData) => void;
    value: FormData;
    variant: "modelFilter" | "methodFilter";
    onSubmit?: (formData: FormData) => void;
    disabled?: boolean;
}

const getBaseUiSchema = (id) => ({
    "ui:submitButtonOptions": {
        props: {
            variant: "outlined",
            size: "small",
            id: `${id}-resetButton`,
        },
        norender: false,
        submitText: "Reset filter",
    },
});

function TitleField({ title, id }: TitleFieldProps) {
    return (
        <Box id={id} mb={1} mt={1}>
            <Typography variant="caption">{title}</Typography>
        </Box>
    );
}

function CustomSelectWidget(props: WidgetProps) {
    const { SelectWidget } = Widgets;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SelectWidget {...props} size="small" />;
}

function EntityFilterForm<FormData extends GenericObjectType>(props: Props<FormData>) {
    const { onChange, value, variant, onSubmit, disabled = false } = props;

    const [schema, uiSchema] = useRJSFSchema({
        schemaId: variant,
        customSchemas: ENTITY_FILTER_SCHEMAS,
    });

    const baseUiSchema = useMemo(() => getBaseUiSchema(variant), [variant]);

    const handleChange = (event) => {
        onChange(event.formData);
    };

    return (
        <FixedRJSForm
            schema={schema}
            uiSchema={merge(baseUiSchema, uiSchema)}
            formData={value}
            id={variant}
            onChange={handleChange}
            onSubmit={(e) => onSubmit && onSubmit(e.formData)}
            widgets={{ SelectWidget: CustomSelectWidget }}
            templates={{ ObjectFieldTemplate, TitleFieldTemplate: TitleField }}
            disabled={disabled}
        />
    );
}

export default EntityFilterForm;
