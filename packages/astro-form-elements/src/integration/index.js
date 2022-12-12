export default function astroFormElements() {
  return {
    name: "astro-form-elements",
    hooks: {
      "astro:config:setup": (options) => {
        console.log("optimizing");
        options.injectScript("page", 'import "./form-service.ts";');
      },
    },
  };
}
