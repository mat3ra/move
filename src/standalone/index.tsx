import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import esseSchemas from "@mat3ra/esse/dist/js/schemas.json";
import type { JSONSchema7 } from "json-schema";
import { ModelFactory, MethodFactory } from "@mat3ra/mode";
import { ModelStandata, MethodStandata } from "@mat3ra/standata";
import { ApplicationRegistry } from "@mat3ra/standata";
import { ApplicationDriver } from "@mat3ra/standata/dist/js/ApplicationDriver";
import { MaterialStandata } from "@mat3ra/standata/dist/js/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useCallback, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import { Model, Method, PseudoPanel, PseudopotentialList } from "../exports";
import type { PseudoData } from "../components/pseudopotential/PseudoList";
import type { PseudoItem } from "../components/pseudopotential/PseudoAutocomplete";
import ThemeProvider from "@exabyte-io/cove.js/dist/theme/provider/ThemeProvider";
import pseudoDataset from "./data/pseudopotentials.json";

// Register all ESSE schemas
JSONSchemasInterface.setSchemas(esseSchemas as unknown as JSONSchema7[]);

// Bootstrap standata
const applicationDriver = new ApplicationDriver();
ApplicationRegistry.setDriver(applicationDriver);
const registry = new ApplicationRegistry();

console.log("MOVE standalone: mounting React app, schemas registered:", esseSchemas.length);

// --- Helpers ---

/** Map our local pseudo dataset to PseudopotentialMetaProperty[] for a given element */
function getPseudosForElement(element: string, appName = "espresso"): any[] {
    return (pseudoDataset as any[]).filter(
        (p) => p.element === element && p.apps && p.apps.includes(appName)
    );
}

/** Build PseudoData[] from a list of element symbols */
function buildPseudoData(elements: string[], appName = "espresso"): PseudoData[] {
    return elements.map((element) => {
        const options = getPseudosForElement(element, appName);
        return {
            value: element,
            selectedPseudo: options[0] ?? { path: `${appName}/unknown/${element}.UPF` },
            dataSource: options,
        };
    });
}

// --- App ---

function App() {
    // Material selector
    const materialStandata = useMemo(() => new MaterialStandata(), []);
    const allMaterials = useMemo(() => materialStandata.getAll(), [materialStandata]);
    const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0);
    const selectedMaterial = allMaterials[selectedMaterialIndex] as any;

    // Derive unique elements from selected material
    const elements: string[] = useMemo(() => {
        const basis = selectedMaterial?.basis;
        if (!basis?.elements) return ["Si"];
        const unique = [...new Set<string>(basis.elements.map((e: any) => e.value))];
        return unique;
    }, [selectedMaterial]);

    // Model state
    const modelStandata = useMemo(() => new ModelStandata(), []);
    const allModels = useMemo(() => (modelStandata as any).getAll?.() ?? [], [modelStandata]);
    const defaultApplication = useMemo(() => {
        const apps = registry.getAll?.() ?? [];
        return apps[0] ?? { name: "espresso", version: "7.2", build: "Default" };
    }, []);
    const [model, setModel] = useState(() =>
        ModelFactory.create({ type: "dft", subtype: "lda" })
    );

    // Method state
    const methodStandata = useMemo(() => new MethodStandata(), []);
    const allMethods = useMemo(() => (methodStandata as any).getAll?.() ?? [], [methodStandata]);
    const [method, setMethod] = useState(() =>
        MethodFactory.create({ type: "pseudopotential", subtype: "plane-wave" })
    );

    // Pseudopotential state
    const [appName, setAppName] = useState("espresso");
    const [pseudoData, setPseudoData] = useState<PseudoData[]>(() => buildPseudoData(["Si"], "espresso"));

    // Sync state when elements or appName change
    React.useEffect(() => {
        setPseudoData(buildPseudoData(elements, appName));
    }, [elements, appName]);

    // JSON override
    const [jsonInput, setJsonInput] = useState("");
    const [jsonError, setJsonError] = useState("");

    const handleLoadJson = useCallback(() => {
        try {
            const parsed = JSON.parse(jsonInput);
            if (parsed.pseudos) setPseudoData(parsed.pseudos);
            if (parsed.model) setModel(ModelFactory.create(parsed.model));
            if (parsed.method) setMethod(MethodFactory.create(parsed.method));
            setJsonError("");
        } catch (e: any) {
            setJsonError(e.message);
        }
    }, [jsonInput]);

    return (
        <ThemeProvider>
            <Stack spacing={0} sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
                {/* Top bar */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 3, py: 1.5, borderBottom: 1, borderColor: "divider" }}
                    spacing={2}>
                    <Typography variant="subtitle1" fontWeight={700}>
                        MOVE — Model/Method Viewer/Editor
                    </Typography>

                    {/* Material selector */}
                    <FormControl size="small" sx={{ minWidth: 280 }}>
                        <InputLabel>Material</InputLabel>
                        <Select
                            value={selectedMaterialIndex}
                            label="Material"
                            onChange={(e) => setSelectedMaterialIndex(Number(e.target.value))}>
                            {allMaterials.map((m: any, i: number) => (
                                <MenuItem key={i} value={i}>
                                    {m.name ?? `Material ${i}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* App selector */}
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>App</InputLabel>
                        <Select
                            value={appName}
                            label="App"
                            onChange={(e) => setAppName(e.target.value)}>
                            <MenuItem value="espresso">Quantum ESPRESSO</MenuItem>
                            <MenuItem value="vasp">VASP</MenuItem>
                        </Select>
                    </FormControl>

                    {/* JSON override */}
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder='Or paste JSON { model, method, pseudos } and click "Load"'
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            error={!!jsonError}
                            helperText={jsonError || undefined}
                        />
                        <Button variant="outlined" onClick={handleLoadJson} sx={{ whiteSpace: "nowrap" }}>
                            LOAD JSON
                        </Button>
                    </Stack>
                </Stack>

                {/* Main content */}
                <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", width: "100%" }}>
                    <Stack spacing={3}>
                        {/* Elements derived from material */}
                        <Typography variant="body2" color="text.secondary">
                            Elements: {elements.join(", ")} | Material: {selectedMaterial?.name}
                        </Typography>

                        <Divider />

                        {/* Model */}
                        <Model
                            model={model}
                            models={allModels}
                            onUpdate={setModel}
                            editable
                            application={defaultApplication}
                            id="standalone-model"
                        />

                        <Divider />

                        {/* Method */}
                        <Method
                            method={method as any}
                            methods={allMethods}
                            onUpdate={setMethod}
                            editable
                            id="standalone-method"
                        />

                        <Divider />

                        {/* Pseudopotentials */}
                        <PseudoPanel>
                            <PseudopotentialList
                                pseudoData={pseudoData}
                                isActive
                                onChange={(pseudo) => {
                                    setPseudoData((prev) =>
                                        prev.map((p) =>
                                            p.dataSource.some((opt: any) => opt.path === pseudo.path)
                                                ? { ...p, selectedPseudo: pseudo }
                                                : p
                                        ),
                                    );
                                }}
                                onButtonClick={() => {}}
                            />
                        </PseudoPanel>
                    </Stack>
                </Box>
            </Stack>
        </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
