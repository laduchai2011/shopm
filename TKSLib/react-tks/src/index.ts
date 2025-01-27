import * as components from './components';
import * as hooks from './hooks';
import * as handles from './handles';
import * as utils from './utils';

type ReactTKSProps = {
    Components: any;
    Hooks: any;
    Handles: any;
    Utils: any
};

const ReactTKS: ReactTKSProps = {
    Components: components,
    Hooks: hooks,
    Handles: handles,
    Utils: utils
}

export default ReactTKS;