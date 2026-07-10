type Categories = any;
interface CategorizedEntity<Params> {
    categories: Categories;
    parameters?: Params;
}
export declare function filterByCategoryAndParams<Params>(entity: CategorizedEntity<Params>, filter: Categories & Params): boolean;
export {};
