import { type ApplicationSchema, CategorizedModel } from "@mat3ra/esse/dist/js/types";
import { type Model as ModeModel } from "@mat3ra/mode";
import React from "react";
interface Props {
    /** Mode entity instance (e.g. `subworkflow.modelInstance`), not plain model JSON. */
    model?: ModeModel;
    models?: CategorizedModel[];
    /** Always a Mode `Model` from `ModelFactory.create` / `createFromApplication`, not plain JSON. */
    onUpdate: (model: ModeModel) => void;
    editable?: boolean;
    application: ApplicationSchema;
    id?: string;
}
declare function Model({ model, models, onUpdate, editable, application, id }: Props): React.JSX.Element;
export default Model;
//# sourceMappingURL=Model.d.ts.map