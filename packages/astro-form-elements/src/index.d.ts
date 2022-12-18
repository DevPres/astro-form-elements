import type { HTMLAttributes } from "astro/types";

declare module "astro-form-elements";
declare module "astro-form-elements/components";

export declare interface ElementProps extends HTMLAttributes<"input"> {
  label?: string;
  formElementName: string;
  emitOnInput: boolean;
  emitOnFocus: boolean;
  emitOnUpdate: boolean;
}

export declare interface ElementChangesValue {
  type: string;
  element: {
    name: string;
  };
  data: {
    value: any;
    lastValueInsert: any;
  };
}
