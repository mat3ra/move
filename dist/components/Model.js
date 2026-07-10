import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ModelConversionHandler, ModelFactory, } from "@mat3ra/mode";
import { filterMethodsByModel, MethodStandata, ModelStandata } from "@mat3ra/standata";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useState } from "react";
import { filterByCategoryAndParams } from "../utils/filter";
import FilterForm from "./EntityFilterForm";
import Method from "./Method";
import EntitySelect from "./PathEntitySelect";
function Model({ model, models, onUpdate, editable = true, application, id }) {
    const [filter, setFilter] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    // Get categorized lists from standata
    const categorizedMethodList = useMemo(() => new MethodStandata().getAll(), []);
    const categorizedModelList = useMemo(() => new ModelStandata().getAll(), []);
    // Use provided models or fall back to all models from standata
    const allModels = models || categorizedModelList;
    const modelFilter = useCallback((cm) => filterByCategoryAndParams(cm, filter), [filter]);
    const onModelUpdate = (model_) => {
        const simpleModel = ModelConversionHandler.convertToSimple(model_);
        const modelInstance = ModelFactory.create({
            ...simpleModel,
            application,
        });
        onUpdate(modelInstance);
    };
    const onMethodUpdate = (method) => {
        const modelInstance = model !== null && model !== void 0 ? model : ModelFactory.createFromApplication({ application });
        modelInstance.setMethod(method);
        onUpdate(modelInstance);
    };
    const filteredMethodList = filterMethodsByModel({
        methodList: categorizedMethodList,
        model: ModelConversionHandler.convertToCategorized(model === null || model === void 0 ? void 0 : model.toJSON(), categorizedModelList),
    });
    const onFilterChange = (f) => {
        setFilter(f);
    };
    const resetFilter = useCallback(() => {
        setShowFilter(false);
        setFilter({});
    }, []);
    return (_jsxs(Stack, { spacing: 1, sx: { width: "100%" }, id: id, children: [_jsx(Typography, { variant: "subtitle2", color: "text.primary", children: "Model" }), !showFilter ? (_jsx(Box, { children: _jsx(Button, { id: "add-model-filter", disabled: !editable, onClick: () => setShowFilter(true), variant: "outlined", size: "small", children: "Add Filter" }) })) : (_jsx(FilterForm, { onChange: onFilterChange, value: filter, variant: "modelFilter", onSubmit: resetFilter, disabled: !editable })), _jsx(EntitySelect, { idPrefix: "model-select", placeholder: "Select a model", title: "Selected Model", options: allModels.filter(modelFilter), onChange: onModelUpdate, disabled: !editable, selected: ModelConversionHandler.convertToCategorized(model === null || model === void 0 ? void 0 : model.toJSON(), categorizedModelList) }), _jsx(Method, { id: "method", method: model === null || model === void 0 ? void 0 : model.method, methods: filteredMethodList, editable: editable, onUpdate: onMethodUpdate })] }));
}
export default Model;
