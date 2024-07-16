import { Leva, LevaPanel } from 'leva';
import ReactDOM from 'react-dom';

import './style.scss';

import { StoreType } from 'leva/dist/declarations/src/types';
import ConfigPanel from '../../molecules/config-panel';

type ConfigsProps = {
  levaStore?: StoreType;
};

function Configs({ levaStore }: ConfigsProps) {
  return ReactDOM.createPortal(
    <ConfigPanel>
      <Leva fill flat collapsed titleBar={{ drag: false }} />
      <LevaPanel fill flat store={levaStore} titleBar={false} />
    </ConfigPanel>,
    document.body
  );
}

export default Configs;
