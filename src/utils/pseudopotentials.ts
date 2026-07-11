import {
    type MetaPropertyHolderMixin,
    type PseudopotentialFilter,
    PseudopotentialMetaProperty as PseudopotentialMetaPropertyClass,
} from "@mat3ra/prode";
import type { PseudopotentialMetaProperty } from "@mat3ra/prode";
import type { Subworkflow } from "@mat3ra/wode";

import type { PseudoData } from "../components/pseudopotential/PseudoList";

/**
 * The shape of per-element data that `PseudopotentialList` expects as its `pseudoData` prop.
 * Each entry corresponds to one unique element in the material set.
 */
export type PseudoListData = PseudoData[];

/**
 * Computes the filtered and sorted list of pseudopotentials for each unique element,
 * ready to be passed directly to `PseudopotentialList` as `pseudoData`.
 *
 * Extracted from the webapp's `PseudoForm` component so that filtering logic can run
 * outside of React (e.g., in a server action or a pure test).
 */
export function computePseudosListData(
    metaProperties: MetaPropertyHolderMixin[],
    subworkflow: Subworkflow,
    uniqueElements: string[],
    searchText: string,
): PseudoListData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const method = subworkflow.modelInstance.Method as any;
    const model = subworkflow.modelInstance;

    const appName = subworkflow.application.name as string;
    const functional = "functional" in subworkflow.model ? (subworkflow.model as any).functional : undefined;

    const exchangeCorrelation = {
        approximation: model.subtype,
        functional,
    };

    const allPseudos: PseudopotentialMetaProperty[] = metaProperties.map((x) => x.property);

    const startFilters: PseudopotentialFilter = {
        appName,
        exchangeCorrelation,
        elements: uniqueElements,
    };

    const endFilters: PseudopotentialFilter = {
        appName,
        exchangeCorrelation,
        searchText,
        type: method.subtype,
    };

    let pseudos = PseudopotentialMetaPropertyClass.applyPseudoFilters(allPseudos, startFilters);
    pseudos = PseudopotentialMetaPropertyClass.sortPseudosByPattern(pseudos);
    pseudos = PseudopotentialMetaPropertyClass.sortByPathApplicationSpecific(pseudos, appName);
    pseudos = PseudopotentialMetaPropertyClass.filterUnique(pseudos);
    pseudos = PseudopotentialMetaPropertyClass.safelyFilterRawDataBySearchText(pseudos, searchText);
    pseudos = PseudopotentialMetaPropertyClass.filterUniqueByAppName(pseudos, appName);
    pseudos = PseudopotentialMetaPropertyClass.applyPseudoFilters(pseudos, endFilters);

    return uniqueElements.map((element) => {
        const current = method.pseudopotentials.find((x: PseudopotentialMetaProperty) => x.element === element);
        const next = pseudos.find((x) => x.element === element);
        const selectedPseudo = current || next;

        return {
            value: element,
            selectedPseudo,
            dataSource: pseudos.filter((x) => x.element === element),
        };
    });
}
