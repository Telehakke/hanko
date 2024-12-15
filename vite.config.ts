import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import replace from "@rollup/plugin-replace";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "",
        emptyOutDir: false,
        lib: {
            entry: "src/main.ts",
            fileName: () => "main.js",
            formats: ["cjs"],
        },
        rollupOptions: {
            external: ["obsidian", "@codemirror/view"],
            plugins: [
                replace({
                    preventAssignment: true,
                    "process.env.NODE_ENV": '"production"',
                }),
            ],
        },
    },
});
