import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MethodConversionHandler, MethodFactory } from "@mat3ra/mode";
import { MethodStandata } from "@mat3ra/standata";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useState } from "react";
import { filterByCategoryAndParams } from "../utils/filter";
import FilterForm from "./EntityFilterForm";
import EntitySelect from "./PathEntitySelect";
function Method({ method, methods, onUpdate, editable = false, id }) {
    const [filters, setFilters] = useState([]);
    // Get categorized method list from standata
    const categorizedMethodList = useMemo(() => new MethodStandata().getAll(), []);
    // Use provided methods or fall back to all methods from standata
    const allMethods = methods || categorizedMethodList;
    const handleChange = (method_) => {
        const simpleMethod = MethodConversionHandler.convertToSimple(method_);
        const methodInstance = MethodFactory.create(simpleMethod);
        onUpdate(methodInstance);
    };
    const onFilterChange = (arr) => {
        setFilters(arr);
    };
    const methodFilterFn = useCallback((cm) => {
        return filters.length
            ? filters.reduce((accumulator, filter) => {
                return (accumulator &&
                    cm.units.some((unit) => filterByCategoryAndParams(unit, filter)));
            }, true)
            : true;
    }, [filters]);
    return (_jsxs(Stack, { spacing: 1, sx: { width: "100%" }, id: id, children: [_jsx(Typography, { variant: "subtitle2", color: "text.primary", children: "Method" }), filters.length === 0 ? (_jsx(Box, { children: _jsx(Button, { id: "add-method-filter", disabled: !editable, onClick: () => setFilters([{}]), variant: "outlined", size: "small", children: "Add Filter" }) })) : (_jsx(FilterForm, { onChange: onFilterChange, value: filters, variant: "methodFilter", onSubmit: () => setFilters([]), disabled: !editable })), _jsx(EntitySelect, { idPrefix: "method-select", placeholder: "Select a method", title: "Selected Method", options: allMethods.filter(methodFilterFn), onChange: handleChange, disabled: !editable, selected: MethodConversionHandler.convertToCategorized(method, allMethods.filter(methodFilterFn)) })] }));
}
export default Method;
