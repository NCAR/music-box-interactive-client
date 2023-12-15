var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "music-box-interactive-client",
      private: true,
      version: "2.2.0",
      type: "module",
      scripts: {
        dev: "vite",
        "debug-dev": "vite --debug hmr",
        build: "vite build",
        lint: "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
        preview: "vite preview",
        format: 'prettier --write "**/*.{js,jsx,ts,tsx,json,md}"'
      },
      dependencies: {
        axios: "^1.6.2",
        "better-react-mathjax": "^2.0.3",
        bootstrap: "^5.3.2",
        buffer: "^6.0.3",
        d3: "^7.8.5",
        "open-iconic": "^1.1.1",
        react: "^18.2.0",
        "react-bootstrap": "^2.9.1",
        "react-csv": "^2.2.2",
        "react-dom": "^18.2.0",
        "react-helmet-async": "^2.0.3",
        "react-loader-spinner": "^5.4.5",
        "react-redux": "^9.0.0",
        "react-router": "^6.20.1",
        "react-router-dom": "^6.20.1",
        redux: "^5.0.0",
        "redux-persist": "^6.0.0",
        "redux-thunk": "^3.1.0",
        uuid: "^9.0.1"
      },
      devDependencies: {
        "@types/react": "^18.2.37",
        "@types/react-dom": "^18.2.15",
        "@vitejs/plugin-react": "^4.2.0",
        eslint: "^8.53.0",
        "eslint-plugin-react": "^7.33.2",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.4",
        prettier: "^3.1.0",
        vite: "^5.0.0"
      }
    };
  }
});

// vite.config.js
import { defineConfig } from "file:///Users/kshores/Documents/music-box-interactive-client/node_modules/vite/dist/node/index.js";
import react from "file:///Users/kshores/Documents/music-box-interactive-client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  css: {
    modules: true
  },
  define: {
    "process.env.VITE_APP_VERSION": JSON.stringify(
      require_package().version
    )
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZS5qc29uIiwgInZpdGUuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ7XG4gIFwibmFtZVwiOiBcIm11c2ljLWJveC1pbnRlcmFjdGl2ZS1jbGllbnRcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidmVyc2lvblwiOiBcIjIuMi4wXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiZGVidWctZGV2XCI6IFwidml0ZSAtLWRlYnVnIGhtclwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQganMsanN4IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1tYXgtd2FybmluZ3MgMFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwiZm9ybWF0XCI6IFwicHJldHRpZXIgLS13cml0ZSBcXFwiKiovKi57anMsanN4LHRzLHRzeCxqc29uLG1kfVxcXCJcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJheGlvc1wiOiBcIl4xLjYuMlwiLFxuICAgIFwiYmV0dGVyLXJlYWN0LW1hdGhqYXhcIjogXCJeMi4wLjNcIixcbiAgICBcImJvb3RzdHJhcFwiOiBcIl41LjMuMlwiLFxuICAgIFwiYnVmZmVyXCI6IFwiXjYuMC4zXCIsXG4gICAgXCJkM1wiOiBcIl43LjguNVwiLFxuICAgIFwib3Blbi1pY29uaWNcIjogXCJeMS4xLjFcIixcbiAgICBcInJlYWN0XCI6IFwiXjE4LjIuMFwiLFxuICAgIFwicmVhY3QtYm9vdHN0cmFwXCI6IFwiXjIuOS4xXCIsXG4gICAgXCJyZWFjdC1jc3ZcIjogXCJeMi4yLjJcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWhlbG1ldC1hc3luY1wiOiBcIl4yLjAuM1wiLFxuICAgIFwicmVhY3QtbG9hZGVyLXNwaW5uZXJcIjogXCJeNS40LjVcIixcbiAgICBcInJlYWN0LXJlZHV4XCI6IFwiXjkuMC4wXCIsXG4gICAgXCJyZWFjdC1yb3V0ZXJcIjogXCJeNi4yMC4xXCIsXG4gICAgXCJyZWFjdC1yb3V0ZXItZG9tXCI6IFwiXjYuMjAuMVwiLFxuICAgIFwicmVkdXhcIjogXCJeNS4wLjBcIixcbiAgICBcInJlZHV4LXBlcnNpc3RcIjogXCJeNi4wLjBcIixcbiAgICBcInJlZHV4LXRodW5rXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJ1dWlkXCI6IFwiXjkuMC4xXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMzdcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4xNVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4yLjBcIixcbiAgICBcImVzbGludFwiOiBcIl44LjUzLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zMy4yXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LXJlZnJlc2hcIjogXCJeMC40LjRcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMC4wXCJcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva3Nob3Jlcy9Eb2N1bWVudHMvbXVzaWMtYm94LWludGVyYWN0aXZlLWNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tzaG9yZXMvRG9jdW1lbnRzL211c2ljLWJveC1pbnRlcmFjdGl2ZS1jbGllbnQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tzaG9yZXMvRG9jdW1lbnRzL211c2ljLWJveC1pbnRlcmFjdGl2ZS1jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGNzczoge1xuICAgIG1vZHVsZXM6IHRydWUsXG4gIH0sXG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnYuVklURV9BUFBfVkVSU0lPTlwiOiBKU09OLnN0cmluZ2lmeShcbiAgICAgIHJlcXVpcmUoXCIuL3BhY2thZ2UuanNvblwiKS52ZXJzaW9uLFxuICAgICksXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQ0UsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLE1BQ1gsU0FBVztBQUFBLE1BQ1gsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLFFBQ1QsS0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsU0FBVztBQUFBLFFBQ1gsUUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBLGNBQWdCO0FBQUEsUUFDZCxPQUFTO0FBQUEsUUFDVCx3QkFBd0I7QUFBQSxRQUN4QixXQUFhO0FBQUEsUUFDYixRQUFVO0FBQUEsUUFDVixJQUFNO0FBQUEsUUFDTixlQUFlO0FBQUEsUUFDZixPQUFTO0FBQUEsUUFDVCxtQkFBbUI7QUFBQSxRQUNuQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixzQkFBc0I7QUFBQSxRQUN0Qix3QkFBd0I7QUFBQSxRQUN4QixlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxRQUNoQixvQkFBb0I7QUFBQSxRQUNwQixPQUFTO0FBQUEsUUFDVCxpQkFBaUI7QUFBQSxRQUNqQixlQUFlO0FBQUEsUUFDZixNQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsaUJBQW1CO0FBQUEsUUFDakIsZ0JBQWdCO0FBQUEsUUFDaEIsb0JBQW9CO0FBQUEsUUFDcEIsd0JBQXdCO0FBQUEsUUFDeEIsUUFBVTtBQUFBLFFBQ1YsdUJBQXVCO0FBQUEsUUFDdkIsNkJBQTZCO0FBQUEsUUFDN0IsK0JBQStCO0FBQUEsUUFDL0IsVUFBWTtBQUFBLFFBQ1osTUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUE7QUFBQTs7O0FDN0NpVixTQUFTLG9CQUFvQjtBQUM5VyxPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixnQ0FBZ0MsS0FBSztBQUFBLE1BQ25DLGtCQUEwQjtBQUFBLElBQzVCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
