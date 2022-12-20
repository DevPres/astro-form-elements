type InputHTMLAttributes = import("astro/types").HTMLAttributes<"input">;

declare module "astro-form-elements";
declare module "astro-form-elements/components";

export declare interface ElementProps extends InputHTMLAttributes {
  formElementName: string;
  label?: string;
  events?: ElementEmitterEvents[];
}

export declare interface FormElementChangesValue {
  eventType: string;
  element: {
    name: string;
  };
  data: {
    value: any;
    lastValueInsert: any;
  };
}
export declare interface FormGroupElementChangesValue {
  eventType: string;
  element: {
    name: string;
  };
  data: {
    value: any;
  };
}

export declare type ElementEmitterEvents =
  | "input"
  | "change"
  | "focus"
  | "blur";
