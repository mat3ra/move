import {
    BaseMethod,
    CategorizedMethod,
    MethodParameters,
} from "@mat3ra/esse/dist/js/types";
type Categories = any;
import { type Method as ModeMethod, MethodConversionHandler, MethodFactory } from "@mat3ra/mode";
import { MethodStandata } from "@mat3ra/standata";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useCallback, useMemo, useState } from "react";

import { filterByCategoryAndParams } from "../utils/filter";
import FilterForm from "./EntityFilterForm";
import EntitySelect from "./PathEntitySelect";

interface Props {
    method?: BaseMethod;
    methods?: CategorizedMethod[];
    /** Always a Mode `Method` from `MethodFactory.create`, not plain JSON. */
    onUpdate: (method: ModeMethod) => void;
    editable?: boolean;
    id?: string;
}

function Method({ method, methods, onUpdate, editable = false, id }: Props) {
    const [filters, setFilters] = useState<Array<Categories & MethodParameters>>([]);

    // Get categorized method list from standata
    const categorizedMethodList = useMemo(() => new MethodStandata().getAll(), []);

    // Use provided methods or fall back to all methods from standata
    const allMethods = methods || (categorizedMethodList as CategorizedMethod[]);

    const handleChange = (method_?: CategorizedMethod) => {
        const simpleMethod = MethodConversionHandler.convertToSimple(method_);
        const methodInstance = MethodFactory.create(simpleMethod);
        onUpdate(methodInstance);
    };

    const onFilterChange = (arr: Array<Categories & MethodParameters>) => {
        setFilters(arr);
    };

    const methodFilterFn = useCallback(
        (cm: CategorizedMethod) => {
            return filters.length
                ? filters.reduce((accumulator, filter) => {
                      return (
                          accumulator &&
                          cm.units.some((unit) =>
                              filterByCategoryAndParams<MethodParameters>(unit as any, filter),
                          )
                      );
                  }, true)
                : true;
        },
        [filters],
    );

    return (
        <Stack spacing={1} sx={{ width: "100%" }} id={id}>
            <Typography variant="subtitle2" color="text.primary">
                Method
            </Typography>
            {filters.length === 0 ? (
                <Box>
                    <Button
                        id="add-method-filter"
                        disabled={!editable}
                        onClick={() => setFilters([{}])}
                        variant="outlined"
                        size="small">
                        Add Filter
                    </Button>
                </Box>
            ) : (
                <FilterForm<Array<Categories & MethodParameters>>
                    onChange={onFilterChange}
                    value={filters}
                    variant="methodFilter"
                    onSubmit={() => setFilters([])}
                    disabled={!editable}
                />
            )}
            <EntitySelect<CategorizedMethod>
                idPrefix="method-select"
                placeholder="Select a method"
                title="Selected Method"
                options={allMethods.filter(methodFilterFn)}
                onChange={handleChange}
                disabled={!editable}
                selected={MethodConversionHandler.convertToCategorized(
                    method,
                    allMethods.filter(methodFilterFn),
                )}
            />
        </Stack>
    );
}

export default Method;
