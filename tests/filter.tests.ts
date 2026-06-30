/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from "node:assert";
import test from "node:test";

import { filterByCategoryAndParams } from "../src/utils/filter";

// ---------------------------------------------------------------------------
// filterByCategoryAndParams
// ---------------------------------------------------------------------------

test("filterByCategoryAndParams returns true for entity with matching tier1 category", () => {
    const entity = {
        categories: { tier1: "dft", tier2: undefined, tier3: undefined, type: undefined, subtype: undefined },
    };
    const filter = { tier1: "dft", tier2: undefined, tier3: undefined, type: undefined, subtype: undefined };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), true);
});

test("filterByCategoryAndParams returns false for entity with non-matching tier1 category", () => {
    const entity = {
        categories: { tier1: "dft", tier2: undefined, tier3: undefined, type: undefined, subtype: undefined },
    };
    const filter = { tier1: "force-field", tier2: undefined, tier3: undefined, type: undefined, subtype: undefined };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), false);
});

test("filterByCategoryAndParams returns true when entity has no parameters and filter has extra params", () => {
    const entity = {
        categories: { tier1: "dft" },
        // parameters is undefined
    };
    const filter = { tier1: "dft", someParam: "someValue" };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), true);
});

test("filterByCategoryAndParams returns true when entity has empty parameters object and filter has extra params", () => {
    const entity = {
        categories: { tier1: "dft" },
        parameters: {},
    };
    const filter = { tier1: "dft", someParam: "someValue" };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), true);
});

test("filterByCategoryAndParams returns true for entity with matching category AND matching params", () => {
    const entity = {
        categories: { tier1: "dft" },
        parameters: { functional: "pbe" },
    };
    const filter = { tier1: "dft", functional: "pbe" };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), true);
});

test("filterByCategoryAndParams returns false for entity with matching category but non-matching params", () => {
    const entity = {
        categories: { tier1: "dft" },
        parameters: { functional: "lda" },
    };
    const filter = { tier1: "dft", functional: "pbe" };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), false);
});

test("filterByCategoryAndParams returns true when filter has undefined category fields (only truthy values are checked)", () => {
    const entity = {
        categories: { tier1: "dft" },
    };
    // tier2, tier3, type, subtype are all undefined - should not cause entity to fail
    const filter = { tier1: undefined, tier2: undefined, tier3: undefined, type: undefined, subtype: undefined };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), true);
});

test("filterByCategoryAndParams returns true with all undefined filter fields and any entity", () => {
    const entity = {
        categories: { tier1: "any-value", tier2: "another-value" },
    };
    const filter = { tier1: undefined, tier2: undefined, tier3: undefined, type: undefined, subtype: undefined };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), true);
});

test("filterByCategoryAndParams returns true when type and subtype match", () => {
    const entity = {
        categories: { tier1: "dft", type: "calculation", subtype: "scf" },
    };
    const filter = { tier1: "dft", type: "calculation", subtype: "scf" };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), true);
});

test("filterByCategoryAndParams returns false when subtype does not match", () => {
    const entity = {
        categories: { tier1: "dft", type: "calculation", subtype: "scf" },
    };
    const filter = { tier1: "dft", type: "calculation", subtype: "nscf" };
    assert.strictEqual(filterByCategoryAndParams(entity, filter), false);
});
