export default function astroFormElements() {
  return {
    name: "astro-form-elements",
    hooks: {
      "astro:config:setup": (options) => {
        console.log("optimizing");
        injectScript("page", 'import "./form-service.ts";');
      },
    },
  };
}
