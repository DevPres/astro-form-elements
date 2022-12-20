type InputHTMLAttributes = import("astro/types").HTMLAttributes<"input">;
type FormHTMLAttributes = import("astro/types").HTMLAttributes<"form">;

declare module "astro-form-elements";
declare module "astro-form-elements/components";

export declare interface FormElementProps extends InputHTMLAttributes {
  formElementName: string;
  formGroupName?: string;
  label?: string;
  events?: FormElementEmitterEvents[];
}
export declare interface FormGroupElementProps extends FormHTMLAttributes {
  formGroupElementName: string;
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

export declare type FormElementEmitterEvents =
  | "input"
  | "change"
  | "focus"
  | "blur";
