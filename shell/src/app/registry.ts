import { loadRemoteModule } from '@angular-architects/module-federation';

export const registry = {
    mfe1: () => loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './web-components'
    }),
    mfe2: () => loadRemoteModule({
        type: 'script',
        remoteEntry: 'http://localhost:4200/remoteEntry.js',
        remoteName: 'mfe2',
        exposedModule: './web-components'
    }),
    // dms: () => loadRemoteModule({
    //     type: 'script',
    //     remoteEntry: 'http://localhost:4203/remoteEntry.js',
    //     remoteName: 'dms',
    //     exposedModule: './web-components'
    // }),
    // mfe4: () => loadRemoteModule({
    //     type: 'script',
    //     remoteEntry: 'http://localhost:4204/remoteEntry.js',
    //     remoteName: 'mfe4',
    //     exposedModule: './web-components'
    // }),
};
