export default FixedRJSForm;
declare class FixedRJSForm extends React.Component<any, any, any> {
    constructor(props: any);
    formRef: React.RefObject<any>;
    handleChange: ({ formData: formDataToChange }: {
        formData: any;
    }) => any;
    render(): React.JSX.Element;
}
declare namespace FixedRJSForm {
    namespace propTypes {
        let id: PropTypes.Validator<string>;
        let className: PropTypes.Requireable<string>;
        let schema: PropTypes.Validator<object>;
        let uiSchema: PropTypes.Requireable<object>;
        let formData: PropTypes.Validator<object>;
        let liveValidate: PropTypes.Requireable<boolean>;
        let transformErrors: PropTypes.Requireable<(...args: any[]) => any>;
        let onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
        let customValidate: PropTypes.Requireable<(...args: any[]) => any>;
        let onError: PropTypes.Requireable<(...args: any[]) => any>;
        let widgets: PropTypes.Requireable<object>;
        let templates: PropTypes.Requireable<object>;
        let disabled: PropTypes.Requireable<boolean>;
        let children: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        export function onError_1(): void;
        export { onError_1 as onError };
        export function onSubmit_1(): void;
        export { onSubmit_1 as onSubmit };
        let onChange_1: any;
        export { onChange_1 as onChange };
        let uiSchema_1: {};
        export { uiSchema_1 as uiSchema };
        let className_1: string;
        export { className_1 as className };
        export function transformErrors_1(errors: any): any;
        export { transformErrors_1 as transformErrors };
        export function customValidate_1(formData: any, errors: any): any;
        export { customValidate_1 as customValidate };
        let liveValidate_1: boolean;
        export { liveValidate_1 as liveValidate };
        let widgets_1: any;
        export { widgets_1 as widgets };
        let templates_1: any;
        export { templates_1 as templates };
        let disabled_1: boolean;
        export { disabled_1 as disabled };
        let children_1: any;
        export { children_1 as children };
    }
}
import React from "react";
import PropTypes from "prop-types";
