import { jsx as _jsx } from "react/jsx-runtime";
import Form from "@rjsf/mui";
import { getDefaultFormState } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import lodash from "lodash";
import PropTypes from "prop-types";
import React, { createRef } from "react";
/*
 * This Component is wrapper around RJSF Form
 * to fix not setting default values in chain of tree structure
 * see issue: https://github.com/rjsf-team/react-jsonschema-form/issues/1671
 */
class FixedRJSForm extends React.Component {
    constructor(props) {
        super(props);
        /*
         * This method will be called on each formData change
         * to validate it and in case of found errored field.
         * This field will be unset and then called getDefaultFormState
         * to set defaults based on current schema and formData
         */
        this.handleChange = ({ formData: formDataToChange }) => {
            var _a, _b, _c, _d, _e;
            const { onChange, schema } = this.props;
            const formDataCopy = JSON.parse(JSON.stringify(formDataToChange));
            if (((_a = this.formRef) === null || _a === void 0 ? void 0 : _a.current) && !((_c = (_b = this.formRef) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c.validateForm())) {
                const result = (_e = (_d = this.formRef) === null || _d === void 0 ? void 0 : _d.current) === null || _e === void 0 ? void 0 : _e.validate(formDataToChange);
                result.errors.forEach((error) => {
                    // We do .substring(1) here to remove redundant . symbol (".functional")
                    // which is substituted to errors payload after validation
                    lodash.unset(formDataCopy, error.property.substring(1));
                });
            }
            const updatedFormData = getDefaultFormState(validator, schema, formDataCopy, true);
            if (typeof onChange === "function") {
                return onChange({ formData: updatedFormData });
            }
        };
        this.formRef = createRef(null);
    }
    render() {
        const { id, schema, uiSchema, formData, liveValidate, customValidate, onSubmit, onError, transformErrors, className, children, widgets, templates, disabled, } = this.props;
        return (_jsx(Form, { id: id, ref: this.formRef, schema: schema, className: className, uiSchema: uiSchema, formData: formData, showErrorList: false, liveValidate: liveValidate, validator: validator, customValidate: customValidate, onSubmit: (event) => onSubmit(event), onChange: this.handleChange, onError: onError, transformErrors: transformErrors, widgets: widgets, templates: templates, disabled: disabled, children: children }));
    }
}
FixedRJSForm.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.object.isRequired,
    liveValidate: PropTypes.bool,
    transformErrors: PropTypes.func,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    customValidate: PropTypes.func,
    onError: PropTypes.func,
    widgets: PropTypes.object,
    templates: PropTypes.object,
    disabled: PropTypes.bool,
    children: PropTypes.object,
};
FixedRJSForm.defaultProps = {
    onError: () => { },
    onSubmit: () => { },
    onChange: null,
    uiSchema: {},
    className: "",
    transformErrors: (errors) => errors,
    customValidate: (formData, errors) => errors,
    liveValidate: false,
    widgets: null,
    templates: null,
    disabled: false,
    children: null,
};
export default FixedRJSForm;
