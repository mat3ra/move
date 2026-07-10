import {
    type ApplicationSchema,
    CategorizedModel,
    ModelParameters,
} from "@mat3ra/esse/dist/js/types";
type Categories = any;
import {
    type Method as ModeMethod,
    type Model as ModeModel,
    ModelConversionHandler,
    ModelFactory,
} from "@mat3ra/mode";
import { filterMethodsByModel, MethodStandata, ModelStandata } from "@mat3ra/standata";
import type { ModelConfig } from "@mat3ra/standata/dist/js/types/model";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useCallback, useMemo, useState } from "react";

import { filterByCategoryAndParams } from "../utils/filter";
import FilterForm from "./EntityFilterForm";
import Method from "./Method";
import EntitySelect from "./PathEntitySelect";

interface Props {
    /** Mode entity instance (e.g. `subworkflow.modelInstance`), not plain model JSON. */
    model?: ModeModel;
    models?: CategorizedModel[];
    /** Always a Mode `Model` from `ModelFactory.create` / `createFromApplication`, not plain JSON. */
    onUpdate: (model: ModeModel) => void;
    editable?: boolean;
    application: ApplicationSchema;
    id?: string;
}

function Model({ model, models, onUpdate, editable = true, application, id }: Props) {
    const [filter, setFilter] = useState<Categories & ModelParameters>({});
    const [showFilter, setShowFilter] = useState<boolean>(false);

    // Get categorized lists from standata
    const categorizedMethodList = useMemo(() => new MethodStandata().getAll(), []);
    const categorizedModelList = useMemo(
        () => new ModelStandata().getAll() as CategorizedModel[],
        [],
    );

    // Use provided models or fall back to all models from standata
    const allModels = models || categorizedModelList;

    const modelFilter = useCallback(
        (cm: CategorizedModel) => filterByCategoryAndParams<ModelParameters>(cm, filter),
        [filter],
    );

    const onModelUpdate = (model_?: Omit<CategorizedModel, "method">) => {
        const simpleModel = ModelConversionHandler.convertToSimple(model_ as any);
        const modelInstance = ModelFactory.create({
            ...simpleModel,
            application,
        });
        onUpdate(modelInstance);
    };

    const onMethodUpdate = (method: ModeMethod) => {
        const modelInstance = model ?? ModelFactory.createFromApplication({ application });
        modelInstance.setMethod(method);
        onUpdate(modelInstance);
    };

    const filteredMethodList = filterMethodsByModel({
        methodList: categorizedMethodList,
        model: ModelConversionHandler.convertToCategorized(
            model?.toJSON(),
            categorizedModelList,
        ) as ModelConfig | undefined,
    });

    const onFilterChange = (f: Categories & ModelParameters) => {
        setFilter(f);
    };

    const resetFilter = useCallback(() => {
        setShowFilter(false);
        setFilter({});
    }, []);

    return (
        <Stack spacing={1} sx={{ width: "100%" }} id={id}>
            <Typography variant="subtitle2" color="text.primary">
                Model
            </Typography>
            {!showFilter ? (
                <Box>
                    <Button
                        id="add-model-filter"
                        disabled={!editable}
                        onClick={() => setShowFilter(true)}
                        variant="outlined"
                        size="small">
                        Add Filter
                    </Button>
                </Box>
            ) : (
                <FilterForm<Categories & ModelParameters>
                    onChange={onFilterChange}
                    value={filter}
                    variant="modelFilter"
                    onSubmit={resetFilter}
                    disabled={!editable}
                />
            )}
            <EntitySelect<Omit<CategorizedModel, "method">>
                idPrefix="model-select"
                placeholder="Select a model"
                title="Selected Model"
                options={allModels.filter(modelFilter)}
                onChange={onModelUpdate}
                disabled={!editable}
                selected={ModelConversionHandler.convertToCategorized(
                    model?.toJSON(),
                    categorizedModelList,
                )}
            />
            <Method
                id="method"
                method={model?.method}
                methods={filteredMethodList}
                editable={editable}
                onUpdate={onMethodUpdate}
            />
        </Stack>
    );
}

export default Model;
