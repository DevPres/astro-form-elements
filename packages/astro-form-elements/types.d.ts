type InputHTMLAttributes = import("astro/types").HTMLAttributes<"input">;

declare module "astro-form-elements";
declare module "astro-form-elements/components";

export declare interface ElementProps extends InputHTMLAttributes {
  label?: string;
  formElementName: string;
  emitOnInput?: boolean;
  emitOnFocus?: boolean;
  emitOnUpdate?: boolean;
  emitOnChange?: boolean;
}

export declare interface ElementChangesValue {
  eventType: string;
  element: {
    name: string;
  };
  data: {
    value: any;
    lastValueInsert: any;
  };
}
