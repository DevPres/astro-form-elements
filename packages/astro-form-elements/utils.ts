/**
 * @description Generate a ranom uuid for in view elements using the window.crypto object combined with performance.now() function. Use only for insecure operations!
 *
 *  @link https://developer.mozilla.org/en-US/docs/Web/API/crypto_property
 *  @link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
 *
 *  Thanks to "@chaitanyabd" for the good one!
 *  @link https://gist.github.com/gordonbrander/2230317
 */
export const generateRandomUUID = (Uint32ArrayLength = 2): string => {
  let a = new Uint32Array(2);
  crypto.getRandomValues(a);
  return (
    performance.now().toString(36) +
    Array.from(a)
      .map((A) => A.toString(36))
      .join("")
  ).replace(/\./g, "");
};
/**
 * @desccription passing an Astro.props to this function it return a new object with keys prefixed by 'data-'. This is usefull to pass props to a customComponents
 * 
 * @example 
 * ```
 * interface Props {
    label?: string;
    title?: string
  }
  console.log(createDatasetFromAstroProps<Props>(Astro.props)) 
  //result
  {
    'data-label': ...
    'data-title': ...
  }
 * ```

 */
export const createDatasetFromAstroProps = <T>(
  props: T
): { [key: string]: any } =>
  (!!props &&
    Object.entries(props).reduce((next, prop) => {
      const [key, value] = prop;
      return { ...next, [`data-${key}`]: value };
    }, {})) ||
  {};
