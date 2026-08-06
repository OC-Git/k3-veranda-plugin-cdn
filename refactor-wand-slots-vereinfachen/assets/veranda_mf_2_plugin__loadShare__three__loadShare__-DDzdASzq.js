import { g as getDefaultExportFromCjs } from './_commonjsHelpers-B85MJLTf.js';
import { v as veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__, a as index_cjs } from './veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__-YRia8a0_.js';

function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    } }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }));
}

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("three", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "*"
    }}}));
    const exportModule = await res.then(factory => factory());
    var veranda_mf_2_plugin__loadShare__three__loadShare__ = exportModule;

const veranda_mf_2_plugin__loadShare__three__loadShare___default = /*@__PURE__*/getDefaultExportFromCjs(veranda_mf_2_plugin__loadShare__three__loadShare__);

const THREE = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: veranda_mf_2_plugin__loadShare__three__loadShare___default
}, [veranda_mf_2_plugin__loadShare__three__loadShare__]);

export { THREE as T, veranda_mf_2_plugin__loadShare__three__loadShare__ as v };
