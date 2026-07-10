import { tree } from "@mat3ra/mode";
import SimpleSchema from "simpl-schema";

const { getDFTFunctionalsFromTree, getPseudopotentialTypesFromTree } = tree;

export const PseudoSelectSchema = new SimpleSchema({
    approximation: {
        type: String,
        allowedValues: getDFTFunctionalsFromTree(),
    },
    source: {
        type: String,
        allowedValues: ["pre-defined", "custom"],
    },
    type: {
        type: String,
        allowedValues: getPseudopotentialTypesFromTree(),
        defaultValue: getPseudopotentialTypesFromTree()[0],
    },
    app: {
        type: String,
        allowedValues: ["espresso", "vasp"],
        defaultValue: "espresso",
    },
});
