import React from 'react';
import * as components from './components';
import * as hooks from './hooks';
import * as handles from './handles';

type ReactTKSProps = {
    components: any;
    hooks: any;
    handles: any;
};

const ReactTKS: ReactTKSProps = {
    components: components,
    hooks: hooks,
    handles: handles
}

export default ReactTKS;