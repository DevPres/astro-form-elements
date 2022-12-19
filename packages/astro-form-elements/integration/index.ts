import type { AstroIntegration, InjectedScriptStage } from "astro";

export default function (): AstroIntegration {
  return {
    name: "astro-form-elements",
    hooks: {
      "astro:config:setup": ({
        injectScript,
      }: {
        injectScript: (stage: InjectedScriptStage, content: string) => void;
      }) => {
        injectScript(
          "page",
          'import { FormElement } from "astro-form-elements";'
        );
      },
    },
  };
}
