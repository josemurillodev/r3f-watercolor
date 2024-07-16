/* eslint-disable import/prefer-default-export */

export function makeControls(
  vert: string,
  frag: string,
  onChange?: (k: string, v: any) => void,
  render?: (get: any) => void,
  hideBooleans?: boolean
) {
  const shaders = `
    ${vert}
    ${frag}
  `
    .split('\n')
    .filter((x) => x.indexOf('uniform') > -1)
    .map((x) => x.match(/uniform (.+?) (.+?);.+(\/\/.+)/m))
    .filter((x) => x)
    .map((match) => ({
      type: match![1],
      name: match![2],
      controls: JSON.parse(match![3].replace('// ', '')),
    }));

  return shaders.reduce((controls: any, control) => {
    // eslint-disable-next-line no-param-reassign
    controls[control.name] = {
      ...control.controls,
      ...(onChange ? { onChange: (v: any) => onChange(control.name, v) } : {}),
      ...(render
        ? { render: (v: any) => (hideBooleans ? control.type !== 'bool' : render(v)) }
        : {}),
    };
    return controls;
  }, {});
}

export function extractValues(fragment: string) {
  const obj = makeControls(fragment, '');
  const keys = Object.keys(obj);
  const values = keys.reduce((acc, cur) => {
    acc[cur] = obj[cur].value;
    return acc;
  }, {} as Record<string, any>);
  return { keys, values };
}
