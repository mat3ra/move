import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import esseSchemas from "@mat3ra/esse/dist/js/schemas.json";
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
import ThemeProvider from "@exabyte-io/cove.js/dist/theme/provider/ThemeProvider";
import pseudoDataset from "./data/pseudopotentials.json";
// Register all ESSE schemas
JSONSchemasInterface.setSchemas(esseSchemas);
// Bootstrap standata
const applicationDriver = new ApplicationDriver();
ApplicationRegistry.setDriver(applicationDriver);
const registry = new ApplicationRegistry();
console.log("MOVE standalone: mounting React app, schemas registered:", esseSchemas.length);
// --- Helpers ---
/** Map our local pseudo dataset to PseudopotentialMetaProperty[] for a given element */
// TODO: use pseudo json from standata via metaProperty instead of local json file
function getPseudosForElement(element, appName = "espresso") {
    return pseudoDataset.filter((p) => p.element === element && p.apps && p.apps.includes(appName));
}
/** Build PseudoData[] from a list of element symbols */
function buildPseudoData(elements, appName = "espresso") {
    return elements.map((element) => {
        var _a;
        const options = getPseudosForElement(element, appName);
        return {
            value: element,
            selectedPseudo: (_a = options[0]) !== null && _a !== void 0 ? _a : { path: `${appName}/unknown/${element}.UPF` },
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
    const selectedMaterial = allMaterials[selectedMaterialIndex];
    // Derive unique elements from selected material
    const elements = useMemo(() => {
        const basis = selectedMaterial === null || selectedMaterial === void 0 ? void 0 : selectedMaterial.basis;
        if (!(basis === null || basis === void 0 ? void 0 : basis.elements))
            return ["Si"];
        const unique = [...new Set(basis.elements.map((e) => e.value))];
        return unique;
    }, [selectedMaterial]);
    // Model state
    const modelStandata = useMemo(() => new ModelStandata(), []);
    const allModels = useMemo(() => { var _a, _b, _c; return (_c = (_b = (_a = modelStandata).getAll) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : []; }, [modelStandata]);
    const defaultApplication = useMemo(() => {
        var _a, _b, _c, _d;
        const apps = (_c = (_b = (_a = registry).getAll) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : [];
        return (_d = apps[0]) !== null && _d !== void 0 ? _d : { name: "espresso", version: "7.2", build: "Default" };
    }, []);
    const [model, setModel] = useState(() => ModelFactory.create({ type: "dft", subtype: "lda" }));
    // Method state
    const methodStandata = useMemo(() => new MethodStandata(), []);
    const allMethods = useMemo(() => { var _a, _b, _c; return (_c = (_b = (_a = methodStandata).getAll) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : []; }, [methodStandata]);
    const [method, setMethod] = useState(() => MethodFactory.create({ type: "pseudopotential", subtype: "plane-wave" }));
    // Pseudopotential state
    const [appName, setAppName] = useState("espresso");
    const [pseudoData, setPseudoData] = useState(() => buildPseudoData(["Si"], "espresso"));
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
            if (parsed.pseudos)
                setPseudoData(parsed.pseudos);
            if (parsed.model)
                setModel(ModelFactory.create(parsed.model));
            if (parsed.method)
                setMethod(MethodFactory.create(parsed.method));
            setJsonError("");
        }
        catch (e) {
            setJsonError(e.message);
        }
    }, [jsonInput]);
    return (_jsx(ThemeProvider, { children: _jsxs(Stack, { spacing: 0, sx: { minHeight: "100vh", bgcolor: "background.default" }, children: [_jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", sx: { px: 3, py: 1.5, borderBottom: 1, borderColor: "divider" }, spacing: 2, children: [_jsx(Typography, { variant: "subtitle1", fontWeight: 700, children: "MOVE \u2014 Model/Method Viewer/Editor" }), _jsxs(FormControl, { size: "small", sx: { minWidth: 280 }, children: [_jsx(InputLabel, { children: "Material" }), _jsx(Select, { value: selectedMaterialIndex, label: "Material", onChange: (e) => setSelectedMaterialIndex(Number(e.target.value)), children: allMaterials.map((m, i) => {
                                        var _a;
                                        return (_jsx(MenuItem, { value: i, children: (_a = m.name) !== null && _a !== void 0 ? _a : `Material ${i}` }, i));
                                    }) })] }), _jsxs(FormControl, { size: "small", sx: { minWidth: 140 }, children: [_jsx(InputLabel, { children: "App" }), _jsxs(Select, { value: appName, label: "App", onChange: (e) => setAppName(e.target.value), children: [_jsx(MenuItem, { value: "espresso", children: "Quantum ESPRESSO" }), _jsx(MenuItem, { value: "vasp", children: "VASP" })] })] }), _jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", sx: { flex: 1 }, children: [_jsx(TextField, { size: "small", fullWidth: true, placeholder: 'Or paste JSON { model, method, pseudos } and click "Load"', value: jsonInput, onChange: (e) => setJsonInput(e.target.value), error: !!jsonError, helperText: jsonError || undefined }), _jsx(Button, { variant: "outlined", onClick: handleLoadJson, sx: { whiteSpace: "nowrap" }, children: "LOAD JSON" })] })] }), _jsx(Box, { sx: { p: 3, maxWidth: 1200, mx: "auto", width: "100%" }, children: _jsxs(Stack, { spacing: 3, children: [_jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Elements: ", elements.join(", "), " | Material: ", selectedMaterial === null || selectedMaterial === void 0 ? void 0 : selectedMaterial.name] }), _jsx(Divider, {}), _jsx(Model, { model: model, models: allModels, onUpdate: setModel, editable: true, application: defaultApplication, id: "standalone-model" }), _jsx(Divider, {}), _jsx(Method, { method: method, methods: allMethods, onUpdate: setMethod, editable: true, id: "standalone-method" }), _jsx(Divider, {}), _jsx(PseudoPanel, { children: _jsx(PseudopotentialList, { pseudoData: pseudoData, isActive: true, onChange: (pseudo) => {
                                        setPseudoData((prev) => prev.map((p) => p.dataSource.some((opt) => opt.path === pseudo.path)
                                            ? { ...p, selectedPseudo: pseudo }
                                            : p));
                                    }, onButtonClick: () => { } }) })] }) })] }) }));
}
ReactDOM.render(_jsx(App, {}), document.getElementById("root"));
