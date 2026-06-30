import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { useMemo } from "react";

interface Props {
    schemaId: string;
    customSchemas?: {
        [key: string]: RJSFSchema;
    };
}

export function useRJSFSchema({ schemaId, customSchemas }: Props): [RJSFSchema, UiSchema] {
    const schemas = useMemo<RJSFSchema>(() => {
        if (!schemaId) return [{}, {}];
        if (customSchemas && schemaId in customSchemas) {
            return customSchemas[schemaId];
        }
        return { schema: JSONSchemasInterface.getSchemaById(schemaId), uiSchema: {} };
    }, [schemaId, customSchemas]);
    return [schemas.schema, schemas.uiSchema];
}
