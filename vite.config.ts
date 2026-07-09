import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const stubsDir = path.resolve(__dirname, "src/standalone/stubs");

/**
 * Vite config for the move standalone demo app.
 * This is ONLY used for local development (`npm run dev`).
 * The library build (tsc) ignores this file entirely.
 */
export default defineConfig({
    base: "/move/",
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: ["@emotion/babel-plugin"],
            },
        }),
        nodePolyfills(),
    ],
    define: {
        __dirname: JSON.stringify(__dirname),
    },
    server: {
        port: 3005,
    },
    resolve: {
        dedupe: ["@mat3ra/esse", "@mui/material", "@mui/styles", "@emotion/react", "@emotion/styled"],
        alias: [
            // Resolve node-polyfills shims from local node_modules absolute path
            {
                find: /^vite-plugin-node-polyfills\/shims\/(.*)$/,
                replacement: path.resolve(__dirname, "node_modules/vite-plugin-node-polyfills/shims/$1"),
            },
            // Stub Meteor/webapp-specific imports
            {
                find: /^\/imports\/client\/components\/molecules\/ElementAvatar/,
                replacement: path.resolve(stubsDir, "ElementAvatar.tsx"),
            },
            {
                find: /^\/imports\/client\/components\/organisms\/dialogs\/InfoPopoverWithDocumentationDialog/,
                replacement: path.resolve(stubsDir, "InfoPopoverWithDocumentationDialog.tsx"),
            },
            {
                find: /^\/imports\/app_settings\/settings/,
                replacement: path.resolve(stubsDir, "appSettingsClient.ts"),
            },
            // Stub Meteor-only paths
            {
                find: /^\/imports\/(.*)$/,
                replacement: path.resolve(stubsDir, "meteor.js"),
            },
            {
                find: /^meteor\/(.*)$/,
                replacement: path.resolve(stubsDir, "meteor.js"),
            },
            // Stub moment-duration-format (side-effect-only import in ive)
            {
                find: "moment-duration-format",
                replacement: path.resolve(stubsDir, "moment-duration-format.js"),
            },
            // Redirect local source packages to their src/ for live editing
            {
                find: /^@mat3ra\/move$/,
                replacement: path.resolve(__dirname, "src/exports.ts"),
            },
            {
                find: /^@mat3ra\/move\/dist\/(.*)$/,
                replacement: path.resolve(__dirname, "src/$1"),
            },
            {
                find: /^@mat3ra\/prode\/dist\/(.*)$/,
                replacement: path.resolve(__dirname, "node_modules/@mat3ra/prode/dist/$1"),
            },
            // MUI ESM fixes
            {
                find: /^@mui\/system\/(?!esm\/)(.*)$/,
                replacement: path.resolve(__dirname, "node_modules/@mui/system/esm/$1"),
            },
            {
                find: /^@mui\/icons-material\/(?!esm\/)(.*)$/,
                replacement: path.resolve(__dirname, "node_modules/@mui/icons-material/esm/$1"),
            },
            {
                find: /^lodash\/(?!es\/)(.*)$/,
                replacement: path.resolve(__dirname, "node_modules/lodash-es/$1.js"),
            },
        ],
    },
    build: {
        outDir: "build",
        rollupOptions: {
            output: {
                entryFileNames: "main.js",
                chunkFileNames: "[name]-[hash].js",
                assetFileNames: "[name]-[hash].[ext]",
            },
        },
    },
});
