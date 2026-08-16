/* eslint-disable @typescript-eslint/no-floating-promises */
import assert from "node:assert";
import test from "node:test";

import {
    type BrillouinZoneFaceLike,
    projectBrillouinZoneFaces,
} from "../src/components/BrillouinZone";

/** Unit cube centred on the origin: six square faces, enough to exercise the projection. */
const CUBE_FACES: BrillouinZoneFaceLike[] = [
    {
        normal: [0, 0, 1],
        vertices: [
            [-1, -1, 1],
            [1, -1, 1],
            [1, 1, 1],
            [-1, 1, 1],
        ],
    },
    {
        normal: [0, 0, -1],
        vertices: [
            [-1, -1, -1],
            [-1, 1, -1],
            [1, 1, -1],
            [1, -1, -1],
        ],
    },
    {
        normal: [1, 0, 0],
        vertices: [
            [1, -1, -1],
            [1, 1, -1],
            [1, 1, 1],
            [1, -1, 1],
        ],
    },
    {
        normal: [-1, 0, 0],
        vertices: [
            [-1, -1, -1],
            [-1, -1, 1],
            [-1, 1, 1],
            [-1, 1, -1],
        ],
    },
    {
        normal: [0, 1, 0],
        vertices: [
            [-1, 1, -1],
            [-1, 1, 1],
            [1, 1, 1],
            [1, 1, -1],
        ],
    },
    {
        normal: [0, -1, 0],
        vertices: [
            [-1, -1, -1],
            [1, -1, -1],
            [1, -1, 1],
            [-1, -1, 1],
        ],
    },
];

const SIZE = 220;

function parsePoints(points: string): Array<[number, number]> {
    return points.split(" ").map((pair) => pair.split(",").map(Number) as [number, number]);
}

test("projects every face to a polygon with the same vertex count", () => {
    const projected = projectBrillouinZoneFaces(CUBE_FACES, SIZE);
    assert.strictEqual(projected.length, CUBE_FACES.length);
    projected.forEach((face) => assert.strictEqual(parsePoints(face.points).length, 4));
});

test("fits the drawing inside the viewport", () => {
    const projected = projectBrillouinZoneFaces(CUBE_FACES, SIZE);
    const coordinates = projected.flatMap((face) => parsePoints(face.points).flat());
    assert.ok(Math.min(...coordinates) >= 0, "no coordinate falls outside the left/top edge");
    assert.ok(
        Math.max(...coordinates) <= SIZE,
        "no coordinate falls outside the right/bottom edge",
    );
});

test("orders faces back to front so the painter's algorithm hides rear faces", () => {
    const projected = projectBrillouinZoneFaces(CUBE_FACES, SIZE);
    const depths = projected.map((face) => face.depth);
    const sorted = [...depths].sort((left, right) => left - right);
    assert.deepStrictEqual(depths, sorted);
});

test("shades faces by orientation, brightest towards the light", () => {
    const projected = projectBrillouinZoneFaces(CUBE_FACES, SIZE);
    const shades = projected.map((face) => face.shade);
    assert.ok(Math.max(...shades) > Math.min(...shades), "faces are not uniformly shaded");
    assert.ok(
        shades.every((shade) => shade >= 0),
        "shading never goes negative",
    );
});

test("scales with the requested size", () => {
    const small = projectBrillouinZoneFaces(CUBE_FACES, 100);
    const large = projectBrillouinZoneFaces(CUBE_FACES, 400);
    const extent = (faces: ReturnType<typeof projectBrillouinZoneFaces>) => {
        const xs = faces.flatMap((face) => parsePoints(face.points).map(([x]) => x));
        return Math.max(...xs) - Math.min(...xs);
    };
    assert.ok(extent(large) > extent(small));
});
