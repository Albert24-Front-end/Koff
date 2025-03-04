import { defineConfig } from "vite";


export default defineConfig({
    base: "",
    export default defineConfig({
      server: {
        historyApiFallback: true // Это позволит Vite правильно обрабатывать SPA-маршруты
      }
    });
  },
);