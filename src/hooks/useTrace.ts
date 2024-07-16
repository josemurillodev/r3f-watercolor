/* eslint-disable no-param-reassign */
import { useRef, useEffect } from 'react';

// const areEqual = (prev, next) => JSON.stringify(prev) === JSON.stringify(next);

const useTraceUpdate = (props: any) => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      // const prevString = JSON.stringify(prev.current[k]);
      // const currentString = JSON.stringify(v);
      // const compare = prevString === currentString;
      // console.log({ compare, prevString, currentString });
      // if (!compare) {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
      // const isEqual = areEqual(changedProps[0], changedProps[1]);
      // console.log('isEqual:', isEqual);
    }
    prev.current = props;
  });
};

export default useTraceUpdate;
