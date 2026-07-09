import { GenericObjectType } from "@rjsf/utils";
import React from "react";
interface Props<FormData extends GenericObjectType> {
    onChange: (formData: FormData) => void;
    value: FormData;
    variant: "modelFilter" | "methodFilter";
    onSubmit?: (formData: FormData) => void;
    disabled?: boolean;
}
declare function EntityFilterForm<FormData extends GenericObjectType>(props: Props<FormData>): React.JSX.Element;
export default EntityFilterForm;
//# sourceMappingURL=EntityFilterForm.d.ts.map