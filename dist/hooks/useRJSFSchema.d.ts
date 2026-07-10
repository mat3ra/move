import { RJSFSchema, UiSchema } from "@rjsf/utils";
interface Props {
    schemaId: string;
    customSchemas?: {
        [key: string]: RJSFSchema;
    };
}
export declare function useRJSFSchema({ schemaId, customSchemas }: Props): [RJSFSchema, UiSchema];
export {};
