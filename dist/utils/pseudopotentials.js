import { PseudopotentialMetaProperty as PseudopotentialMetaPropertyClass, } from "@mat3ra/prode";
/**
 * Computes the filtered and sorted list of pseudopotentials for each unique element,
 * ready to be passed directly to `PseudopotentialList` as `pseudoData`.
 *
 * Extracted from the webapp's `PseudoForm` component so that filtering logic can run
 * outside of React (e.g., in a server action or a pure test).
 */
export function computePseudosListData(metaProperties, subworkflow, uniqueElements, searchText) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const method = subworkflow.modelInstance.Method;
    const model = subworkflow.modelInstance;
    const appName = subworkflow.application.name;
    const functional = "functional" in subworkflow.model ? subworkflow.model.functional : undefined;
    const exchangeCorrelation = {
        approximation: model.subtype,
        functional,
    };
    const allPseudos = metaProperties.map((x) => x.property);
    const startFilters = {
        appName,
        exchangeCorrelation,
        elements: uniqueElements,
    };
    const endFilters = {
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
        const current = method.pseudopotentials.find((x) => x.element === element);
        const next = pseudos.find((x) => x.element === element);
        const selectedPseudo = current || next;
        return {
            value: element,
            selectedPseudo,
            dataSource: pseudos.filter((x) => x.element === element),
        };
    });
}
