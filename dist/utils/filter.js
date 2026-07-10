import isEmpty from "lodash/isEmpty";
export function filterByCategoryAndParams(entity, filter) {
    const { tier1, tier2, tier3, type, subtype, ...params } = filter;
    const categories = { tier1, tier2, tier3, type, subtype };
    // eslint-disable-next-line no-restricted-syntax
    for (const key in categories) {
        if (categories[key] && entity.categories[key] !== categories[key])
            return false;
    }
    if (!entity.parameters || isEmpty(entity.parameters))
        return true;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in params) {
        if (params[key] && entity.parameters[key] !== params[key])
            return false;
    }
    return true;
}
