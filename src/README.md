# MoVe

Houses model-(and method-)-specific viewer components for use within the Mat3ra workflow ecosystem.
See the README documentation for `CoVe` for best practices when developing viewer component libraries.

## Contents

### UI Trees

UI tree data structures for models and methods are now maintained in the `@mat3ra/standata` repository and imported as a dependency. These trees are used to construct schemas for the `<Form />` components of the [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/docs/) (RJSF) package.

The trees describe:
- **Hierarchy of properties** (dependencies) for category-based filtering
- **Non-hierarchical entity-specific data fields** (e.g. functional, dispersion corrections)
- **Human-readable names** for UI display via `namesMap`

#### Importing Trees

```typescript
import modelTree from "@mat3ra/standata/dist/js/ui/modelTree.json";
import methodTree from "@mat3ra/standata/dist/js/ui/methodTree.json";
import baseUiSchemas from "@mat3ra/standata/dist/js/ui/schemas.json";
```

#### Tree Structure

Each tree node follows this structure:

```typescript
interface TreeNode {
    path: string;                    // unique node path (e.g. "/pb/qm/dft")
    data: {                          // node data (null for root)
        key: string;                 // property name (e.g. "tier1", "subtype")
        value: string;               // raw value for enum
        name: string;                // human-readable name for enumNames
    } | null;
    children?: TreeNode[];           // child nodes (optional)
    staticOptions?: {                // non-hierarchical options (optional)
        key: string;                 // parameter name
        values: string[];            // allowed values
        namesMap?: Record<string, string>; // value → human-readable name
    }[];
}
```

#### Base UI Schemas

The `baseUiSchemas` object provides RJSF UI schema titles for form fields:

```typescript
{
    categories: { tier1: { "ui:title": "Tier 1" }, ... },
    modelParameters: { functional: { "ui:title": "Functional" }, ... },
    methodParameters: { basisSlug: { "ui:title": "Basis Set" }, ... }
}
```

#### Maintaining Trees

To modify tree structures or add new categories:

1. Edit YAML assets in `@mat3ra/standata/ui/assets/`
2. Run `npm run build:ui` in the standata repository
3. Trees are automatically validated with comprehensive tests
4. Update the standata dependency version in this project
