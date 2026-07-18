import { jsx as _jsx } from "react/jsx-runtime";
import ObjectFieldTemplate from "@mat3ra/cove/dist/other/rjsf/templates/CustomObjectFieldTemplate";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Widgets } from "@rjsf/mui";
import merge from "lodash/merge";
import { useMemo } from "react";
import { useRJSFSchema } from "../hooks/useRJSFSchema";
import { ENTITY_FILTER_SCHEMAS } from "../schemas/filters";
import FixedRJSForm from "./FixedRJSForm";
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
function TitleField({ title, id }) {
    return (_jsx(Box, { id: id, mb: 1, mt: 1, children: _jsx(Typography, { variant: "caption", children: title }) }));
}
function CustomSelectWidget(props) {
    const { SelectWidget } = Widgets;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return _jsx(SelectWidget, { ...props, size: "small" });
}
function EntityFilterForm(props) {
    const { onChange, value, variant, onSubmit, disabled = false } = props;
    const [schema, uiSchema] = useRJSFSchema({
        schemaId: variant,
        customSchemas: ENTITY_FILTER_SCHEMAS,
    });
    const baseUiSchema = useMemo(() => getBaseUiSchema(variant), [variant]);
    const handleChange = (event) => {
        onChange(event.formData);
    };
    return (_jsx(FixedRJSForm, { schema: schema, uiSchema: merge(baseUiSchema, uiSchema), formData: value, id: variant, onChange: handleChange, onSubmit: (e) => onSubmit && onSubmit(e.formData), widgets: { SelectWidget: CustomSelectWidget }, templates: { ObjectFieldTemplate, TitleFieldTemplate: TitleField }, disabled: disabled }));
}
export default EntityFilterForm;
