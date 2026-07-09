import type { MetaPropertyHolderMixin } from "@mat3ra/prode/dist/js/holders/mixins/MetaPropertyHolderMixin";
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
export declare function computePseudosListData(metaProperties: MetaPropertyHolderMixin[], subworkflow: Subworkflow, uniqueElements: string[], searchText: string): PseudoListData;
