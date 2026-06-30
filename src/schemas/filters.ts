import { getSchemaWithDependencies } from "@mat3ra/code/dist/js/utils";
import methodTree from "@mat3ra/standata/dist/js/ui/methodTree.json";
import modelTree from "@mat3ra/standata/dist/js/ui/modelTree.json";
import baseUiSchema from "@mat3ra/standata/dist/js/ui/schemas.json";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

const modelFilterSchema: RJSFSchema = getSchemaWithDependencies({
    schema: {
        title: "Model Filters",
        type: "object",
        properties: {
            tier1: {
                type: "string",
            },
        },
    },
    nodes: modelTree.children,
    modifyProperties: true,
});

const methodFilterSchema: RJSFSchema = {
    type: "array",
    title: "Method Filters",
    items: getSchemaWithDependencies({
        schema: {
            type: "object",
            properties: {
                tier1: {
                    type: "string",
                },
            },
        },
        nodes: methodTree.children,
        modifyProperties: true,
    }),
};

const {
    categories,
    modelParameters,
    methodParameters,
}: { categories: UiSchema; modelParameters: UiSchema; methodParameters: UiSchema } = baseUiSchema;

export const ENTITY_FILTER_SCHEMAS = {
    modelFilter: {
        schema: modelFilterSchema,
        uiSchema: { ...categories, ...modelParameters },
    },
    methodFilter: {
        schema: methodFilterSchema,
        uiSchema: {
            items: { ...categories, ...methodParameters },
            "ui:options": { orderable: false },
        },
    },
};
