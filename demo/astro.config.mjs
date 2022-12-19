import { defineConfig } from "astro/config";
import astroFormElements from "astro-form-elements/integration";

// https://astro.build/config
export default defineConfig({
  integrations: [astroFormElements()],
});
