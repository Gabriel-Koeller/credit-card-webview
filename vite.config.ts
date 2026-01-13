/**
 * @fileoverview Configuração do Vite para build WebView mobile-first
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@services": resolve(__dirname, "./src/services"),
      "@contexts": resolve(__dirname, "./src/contexts"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@types": resolve(__dirname, "./src/types"),
    },
  },

  server: {
    port: 3000,
    host: true, // Expõe para rede local (útil para testar em dispositivos)
  },

  build: {
    target: "es2020",
    outDir: "dist",
    minify: "terser",
    sourcemap: false,
    cssCodeSplit: false, // Garante que o CSS seja gerado corretamente
    // Otimizações para WebView
    rollupOptions: {
      output: {
        manualChunks: undefined, // Bundle único para WebView
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 1, // Reduz passes para evitar otimizações agressivas
      },
      format: {
        comments: false,
      },
    } as any,
  },

  // Preview para testar build de produção
  preview: {
    port: 3000,
    host: true,
  },
});
