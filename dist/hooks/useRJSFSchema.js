import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import { useMemo } from "react";
export function useRJSFSchema({ schemaId, customSchemas }) {
    const schemas = useMemo(() => {
        if (!schemaId)
            return [{}, {}];
        if (customSchemas && schemaId in customSchemas) {
            return customSchemas[schemaId];
        }
        return { schema: JSONSchemasInterface.getSchemaById(schemaId), uiSchema: {} };
    }, [schemaId, customSchemas]);
    return [schemas.schema, schemas.uiSchema];
}
