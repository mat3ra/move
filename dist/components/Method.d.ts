import { BaseMethod, CategorizedMethod } from "@mat3ra/esse/dist/js/types";
import { type Method as ModeMethod } from "@mat3ra/mode";
import React from "react";
interface Props {
    method?: BaseMethod;
    methods?: CategorizedMethod[];
    /** Always a Mode `Method` from `MethodFactory.create`, not plain JSON. */
    onUpdate: (method: ModeMethod) => void;
    editable?: boolean;
    id?: string;
}
declare function Method({ method, methods, onUpdate, editable, id }: Props): React.JSX.Element;
export default Method;
//# sourceMappingURL=Method.d.ts.map