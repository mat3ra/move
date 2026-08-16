import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";

/**
 * Structural shape of a zone face, matching `BrillouinZoneFace` from
 * `@mat3ra/made`'s `ReciprocalLattice.brillouinZone`. Declared structurally rather than
 * imported so this view layer does not pin a `made` version.
 */
export interface BrillouinZoneFaceLike {
    vertices: number[][];
    normal: number[];
}

export interface BrillouinZoneProps {
    /**
     * Zone faces, i.e. `new ReciprocalLattice(material.lattice).brillouinZone`. When absent,
     * the component falls back to {@link BrillouinZoneProps.imgSrc}.
     */
    faces?: BrillouinZoneFaceLike[] | null;
    /** Bravais lattice type, shown in the caption. */
    latticeType?: string;
    /** Pre-rendered artwork, used only when no `faces` are given. */
    imgSrc?: string;
    description?: React.ReactNode;
    /** Rendered size in pixels. */
    size?: number;
}

/** Fixed three-quarter view: the zone is an illustration, not an interactive scene. */
const VIEW_YAW = Math.PI / 5;
const VIEW_PITCH = Math.PI / 7;
const PADDING = 12;

interface ProjectedPoint {
    x: number;
    y: number;
    depth: number;
}

function project(vertex: number[]): ProjectedPoint {
    const [x, y, z] = vertex;
    const cosYaw = Math.cos(VIEW_YAW);
    const sinYaw = Math.sin(VIEW_YAW);
    const rotatedX = x * cosYaw + z * sinYaw;
    const rotatedZ = -x * sinYaw + z * cosYaw;

    const cosPitch = Math.cos(VIEW_PITCH);
    const sinPitch = Math.sin(VIEW_PITCH);
    const rotatedY = y * cosPitch - rotatedZ * sinPitch;

    // SVG's y axis grows downward, hence the negation.
    return { x: rotatedX, y: -rotatedY, depth: y * sinPitch + rotatedZ * cosPitch };
}

interface ProjectedFace {
    points: string;
    depth: number;
    shade: number;
}

export function projectBrillouinZoneFaces(
    faces: BrillouinZoneFaceLike[],
    size: number,
): ProjectedFace[] {
    const projectedByFace = faces.map((face) => face.vertices.map(project));
    const allPoints = projectedByFace.flat();
    const minimumX = Math.min(...allPoints.map((point) => point.x));
    const maximumX = Math.max(...allPoints.map((point) => point.x));
    const minimumY = Math.min(...allPoints.map((point) => point.y));
    const maximumY = Math.max(...allPoints.map((point) => point.y));
    const span = Math.max(maximumX - minimumX, maximumY - minimumY) || 1;
    const scaleFactor = (size - 2 * PADDING) / span;
    const offsetX = PADDING + (size - 2 * PADDING - (maximumX - minimumX) * scaleFactor) / 2;
    const offsetY = PADDING + (size - 2 * PADDING - (maximumY - minimumY) * scaleFactor) / 2;

    return (
        projectedByFace
            .map((projected, index) => {
                const points = projected
                    .map(
                        (point) =>
                            `${(offsetX + (point.x - minimumX) * scaleFactor).toFixed(2)},${(
                                offsetY +
                                (point.y - minimumY) * scaleFactor
                            ).toFixed(2)}`,
                    )
                    .join(" ");
                const depth =
                    projected.reduce((sum, point) => sum + point.depth, 0) /
                    (projected.length || 1);
                const [normalX, normalY, normalZ] = faces[index].normal;
                // Lambert-ish shading from a light above and to the viewer's left.
                const shade = Math.max(0, normalX * -0.3 + normalY * 0.55 + normalZ * 0.78);
                return { points, depth, shade };
            })
            // Painter's algorithm: the zone is convex, so far-to-near ordering hides back faces.
            .sort((left, right) => left.depth - right.depth)
    );
}

/**
 * Draws the first Brillouin zone from geometry rather than fetching one image per lattice type.
 *
 * Supersedes `BrillouinZoneImage`: pass `faces` from `@mat3ra/made`'s
 * `ReciprocalLattice.brillouinZone` and the zone reflects the material's actual cell, so two
 * materials of the same Bravais type but different axial ratios — a monolayer with vacuum
 * padding and a bulk crystal, say — no longer render identically. Hosts that still have
 * artwork can keep passing `imgSrc`, which is used when `faces` is absent.
 */
export function BrillouinZone({
    faces,
    latticeType,
    imgSrc,
    description,
    size = 220,
}: BrillouinZoneProps) {
    const theme = useTheme();
    const projectedFaces = useMemo(
        () => (faces && faces.length ? projectBrillouinZoneFaces(faces, size) : null),
        [faces, size],
    );

    if (!projectedFaces) {
        if (!imgSrc) return null;
        return (
            <Box id="brillouin-zone" className="brillouin-zone brillouin-zone--image">
                {latticeType ? (
                    <Typography variant="body2">{`Brillouin zone: ${latticeType}`}</Typography>
                ) : null}
                <img
                    style={{ maxHeight: "300px", maxWidth: "100%" }}
                    src={imgSrc}
                    alt={
                        latticeType
                            ? `Brillouin zone of a ${latticeType} lattice`
                            : "Brillouin zone"
                    }
                />
                {description}
            </Box>
        );
    }

    const faceColor = theme.palette.primary.main;
    const edgeColor = theme.palette.background.paper;

    return (
        <Box
            id="brillouin-zone"
            className="brillouin-zone"
            data-tid="brillouin-zone"
            sx={{ my: 1 }}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                role="img"
                aria-label={
                    latticeType
                        ? `First Brillouin zone of a ${latticeType} lattice`
                        : "First Brillouin zone"
                }
            >
                {projectedFaces.map((face) => (
                    <polygon
                        key={face.points}
                        points={face.points}
                        fill={faceColor}
                        fillOpacity={0.25 + 0.6 * face.shade}
                        stroke={edgeColor}
                        strokeWidth={1}
                        strokeLinejoin="round"
                    />
                ))}
            </svg>
            <Typography variant="caption" color="text.secondary" component="div">
                {latticeType
                    ? `First Brillouin zone — ${latticeType} lattice`
                    : "First Brillouin zone"}
            </Typography>
            {description}
        </Box>
    );
}

export default BrillouinZone;
