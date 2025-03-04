import { defineConfig } from "vite";


export default defineConfig({
    base: "",
   
  },
  server: {
    historyApiFallback: true // Это позволит Vite правильно обрабатывать SPA-маршруты
  });