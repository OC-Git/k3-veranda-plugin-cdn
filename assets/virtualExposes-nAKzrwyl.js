import { _ as __vitePreload } from './preload-helper-CqoC6PUU.js';

const exposesMap = {
    
        "./Plugin": async () => {
          const importModule = await __vitePreload(() => import('./Plugin-D6fE29R1.js'),true              ?[]:void 0);
          const exportModule = {};
          Object.assign(exportModule, importModule);
          Object.defineProperty(exportModule, "__esModule", {
            value: true,
            enumerable: false
          });
          return exportModule
        }
      
  };

export { exposesMap as default };
