import { PathEntitySchema as PathEntity } from "@mat3ra/esse/dist/js/types";
import React from "react";
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
declare function PathEntitySelect<Entity extends PathEntity>({ options, selected, placeholder, disabled, onChange, descriptionFn, title, idPrefix, }: Props<Entity>): React.JSX.Element;
export default PathEntitySelect;
//# sourceMappingURL=PathEntitySelect.d.ts.map