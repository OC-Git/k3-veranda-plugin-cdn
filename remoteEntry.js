import { i as init_1, v as veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__ } from './assets/veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__-YRia8a0_.js';
import exposesMap from './assets/virtualExposes-BEAVs8b-.js';
import { _ as __vitePreload } from './assets/preload-helper-CqoC6PUU.js';

const importMap = {
      
        "react/jsx-runtime": async () => {
          let pkg = await __vitePreload(() => import('./assets/jsx-runtime-5Hg6NRfr.js').then(n => n.j),true              ?[]:void 0);
          return pkg
        }
      ,
        "react": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-ByTSddbg.js').then(n => n.i),true              ?[]:void 0);
          return pkg
        }
      ,
        "@react-three/fiber": async () => {
          let pkg = await __vitePreload(() => import('./assets/react-three-fiber.esm-BrTeP3Is.js'),true              ?[]:void 0);
          return pkg
        }
      ,
        "three": async () => {
          let pkg = await __vitePreload(() => import('./assets/three.module-wdyv8Ec4.js'),true              ?[]:void 0);
          return pkg
        }
      ,
        "@react-three/drei": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-C5MYM6i2.js'),true              ?[]:void 0);
          return pkg
        }
      ,
        "k3-plugin-api": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-D4qpzhxu.js'),true              ?[]:void 0);
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-DJ09VdrH.js').then(n => n.i),true              ?[]:void 0);
          return pkg
        }
      
    };
      const usedShared = {
      
          "react/jsx-runtime": {
            name: "react/jsx-runtime",
            version: "19.2.4",
            scope: ["default"],
            loaded: false,
            from: "veranda-plugin",
            async get () {
              usedShared["react/jsx-runtime"].loaded = true;
              const {"react/jsx-runtime": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*"
            }
          }
        ,
          "react": {
            name: "react",
            version: "19.2.4",
            scope: ["default"],
            loaded: false,
            from: "veranda-plugin",
            async get () {
              usedShared["react"].loaded = true;
              const {"react": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*"
            }
          }
        ,
          "@react-three/fiber": {
            name: "@react-three/fiber",
            version: "9.5.0",
            scope: ["default"],
            loaded: false,
            from: "veranda-plugin",
            async get () {
              usedShared["@react-three/fiber"].loaded = true;
              const {"@react-three/fiber": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*"
            }
          }
        ,
          "three": {
            name: "three",
            version: "0.177.0",
            scope: ["default"],
            loaded: false,
            from: "veranda-plugin",
            async get () {
              usedShared["three"].loaded = true;
              const {"three": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*"
            }
          }
        ,
          "@react-three/drei": {
            name: "@react-three/drei",
            version: "10.7.7",
            scope: ["default"],
            loaded: false,
            from: "veranda-plugin",
            async get () {
              usedShared["@react-three/drei"].loaded = true;
              const {"@react-three/drei": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*"
            }
          }
        ,
          "k3-plugin-api": {
            name: "k3-plugin-api",
            version: "2.1.0",
            scope: ["default"],
            loaded: false,
            from: "veranda-plugin",
            async get () {
              usedShared["k3-plugin-api"].loaded = true;
              const {"k3-plugin-api": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.2.4",
            scope: ["default"],
            loaded: false,
            from: "veranda-plugin",
            async get () {
              usedShared["react-dom"].loaded = true;
              const {"react-dom": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*"
            }
          }
        
    };
      const usedRemotes = [
      ];

const initTokens = {};
  const shareScopeName = "default";
  const mfName = "veranda-plugin";
  async function init(shared = {}, initScope = []) {
    // ============================================================
    // [inject-host-react] Korrekte React-Instanz vom K3-Vite-Host
    // ============================================================
    // Guard: Nur einmal initialisieren
    if (window.__veranda_mf_initialized) return;
    window.__veranda_mf_initialized = true;

    try {
        var hostOrigin = window.location.origin;
        var isLocal = hostOrigin.indexOf('localhost') !== -1 || hostOrigin.indexOf('127.0.0.1') !== -1;

        // Schritt 1: Aktuellen Vite-Hash aus dem DOM extrahieren.
        var _viteHash = null;

        // Methode A: Performance API
        try {
            if (typeof performance !== 'undefined' && performance.getEntriesByType) {
                var _pe = performance.getEntriesByType('resource');
                for (var _pi = 0; _pi < _pe.length; _pi++) {
                    var _pn = _pe[_pi].name;
                    var _pidx = _pn.indexOf('/.vite/deps/');
                    var _pvidx = _pn.indexOf('?v=', _pidx);
                    if (_pidx !== -1 && _pvidx !== -1) { _viteHash = _pn.slice(_pvidx + 3, _pvidx + 11); break; }
                }
            }
        } catch(_pErr) {}

        // Methode B: Script-Tags im DOM
        if (!_viteHash) {
            try {
                var _dss = document.querySelectorAll('script[src*=".vite/deps"]');
                for (var _di = 0; _di < _dss.length; _di++) {
                    var _dsrc = _dss[_di].src || '';
                    var _dvidx = _dsrc.indexOf('?v=');
                    if (_dvidx !== -1) { _viteHash = _dsrc.slice(_dvidx + 3, _dvidx + 11); break; }
                }
            } catch(_dErr) {}
        }

        // Methode C: _metadata.json – Nur wenn lokal
        if (!_viteHash && isLocal) {
            try {
                var _metaRes = await fetch(hostOrigin + '/node_modules/.vite/deps/_metadata.json', { priority: 'low' });
                if (_metaRes.ok) {
                    var _metaJson = await _metaRes.json();
                    _viteHash = _metaJson.browserHash || _metaJson.hash || null;
                }
            } catch(_mErr) {}
        }

        // Hilfsfunktion: URL mit oder ohne Hash bauen
        var _depsUrl = function(name) {
            var base = hostOrigin + '/node_modules/.vite/deps/' + name;
            return _viteHash ? base + '?v=' + _viteHash : base;
        };

        // Schritt 2: React laden
        var _hostReact = null;
        var _reactSourceLabel = 'none';

        // Versuch A: K3's Shared Scope
        try {
            var _sharedReact = shared && (shared['react'] || shared.react);
            if (_sharedReact) {
                var _srv = Object.keys(_sharedReact)[0];
                var _srEntry = _sharedReact[_srv];
                if (_srEntry && typeof _srEntry.get === 'function') {
                    var _srGetResult = await _srEntry.get();
                    var _srMod = typeof _srGetResult === 'function' ? _srGetResult() : _srGetResult;
                    if (_srMod && (typeof _srMod.createElement === 'function' ||
                                  (typeof _srMod.default === 'object' && typeof _srMod.default.createElement === 'function'))) {
                        _hostReact = _srMod;
                        _reactSourceLabel = 'K3 shared scope v' + _srv;
                    }
                }
            }
        } catch(_srErr) {}

        // Versuch B: Global window.React
        if (!_hostReact && typeof window !== 'undefined' && window.React && window.React.createElement) {
            _hostReact = window.React;
            _reactSourceLabel = 'window.React';
        }

        // Versuch C: .vite/deps/react.js – Nur wenn lokal oder Fallback erfolgreich
        if (!_hostReact && isLocal) {
            try {
                _hostReact = await import(/* @vite-ignore */ _depsUrl('react.js'));
                _reactSourceLabel = '.vite/deps/react.js (mit Hash)';
            } catch(_rErr) {
                try {
                    _hostReact = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/react.js');
                    _reactSourceLabel = '.vite/deps/react.js (ohne Hash)';
                } catch(_rErr2) {}
            }
        }

        if (_hostReact) {
            var _React = _hostReact;
            if (typeof _hostReact.createElement !== 'function' && _hostReact.default && typeof _hostReact.default.createElement === 'function') {
                _React = _hostReact.default;
            }

            if (usedShared["react"]) {
                usedShared["react"].get = async function() {
                    usedShared["react"].loaded = true;
                    return function() { return _React; };
                };
            }

            // jsx-runtime
            var _jsxMod = null;
            try {
                if (_hostReact.jsx) { _jsxMod = _hostReact; }
                else if (isLocal) {
                    _jsxMod = await import(/* @vite-ignore */ _depsUrl('react_jsx-runtime.js'));
                }
            } catch(_jsxErr) {
                try { 
                    if (isLocal) _jsxMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/react_jsx-runtime.js'); 
                } catch(_jsxErr2) {}
            }

            if (_jsxMod && (typeof _jsxMod.jsx === 'function' || typeof (_jsxMod.default || {}).jsx === 'function')) {
                var _jrFinal = _jsxMod;
                if (typeof _jsxMod.jsx !== 'function' && _jsxMod.default) _jrFinal = _jsxMod.default;
                if (usedShared["react/jsx-runtime"]) {
                    usedShared["react/jsx-runtime"].get = async function() {
                        usedShared["react/jsx-runtime"].loaded = true;
                        return function() { return _jrFinal; };
                    };
                }
            } else {
                var _shimJsx = function(type, config, maybeKey) {
                    if (!config) config = {};
                    if (maybeKey !== undefined) {
                        config = Object.assign({}, config);
                        config.key = '' + maybeKey;
                    }
                    var _ch = config.children;
                    var _p = Object.assign({}, config);
                    delete _p.children;
                    if (_ch === undefined) {
                        return _React.createElement(type, _p);
                    } else if (Array.isArray(_ch)) {
                        return _React.createElement.apply(null, [type, _p].concat(_ch));
                    } else {
                        return _React.createElement(type, _p, _ch);
                    }
                };
                if (usedShared["react/jsx-runtime"]) {
                    usedShared["react/jsx-runtime"].get = async function() {
                        usedShared["react/jsx-runtime"].loaded = true;
                        var _m = { jsx: _shimJsx, jsxs: _shimJsx, Fragment: _React.Fragment };
                        Object.defineProperty(_m, '__esModule', { value: true, enumerable: false });
                        return function() { return _m; };
                    };
                }
            }
        }

    } catch(_e) {
        console.warn('[VERANDA-PLUGIN] Host React import fehlgeschlagen:', _e);
    }

    // @react-three/fiber vom Host laden
    try {
        var _r3fMod = null;
        // 1. SharedScope
        try {
            var _r3fShared = shared && (shared['@react-three/fiber'] || shared["@react-three/fiber"]);
            if (_r3fShared) {
                var _r3fVer = Object.keys(_r3fShared)[0];
                var _r3fEntry = _r3fShared[_r3fVer];
                var _r3fRes = await _r3fEntry.get();
                _r3fMod = typeof _r3fRes === 'function' ? _r3fRes() : _r3fRes;
            }
        } catch(_) {}
        
        // 2. Global
        if (!_r3fMod && typeof window !== 'undefined' && (window.ReactThreeFiber || window.R3F)) {
            _r3fMod = window.ReactThreeFiber || window.R3F;
        }

        // 3. Vite deps
        if (!_r3fMod && isLocal) {
            try {
                _r3fMod = await import(/* @vite-ignore */ _depsUrl('@react-three_fiber.js'));
            } catch(_r3fE1) {
                try {
                    _r3fMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/@react-three_fiber.js');
                } catch(_r3fE2) { }
            }
        }

        if (_r3fMod && usedShared["@react-three/fiber"]) {
            usedShared["@react-three/fiber"].get = async function() {
                usedShared["@react-three/fiber"].loaded = true;
                return function() { return _r3fMod; };
            };
        }
    } catch(_r3fe) {
    }

    // @react-three/drei vom Host laden
    try {
        var _dreiMod = null;
        try {
            var _dreiShared = shared && (shared['@react-three/drei'] || shared["@react-three/drei"]);
            if (_dreiShared) {
                var _dv = Object.keys(_dreiShared)[0];
                var _de = _dreiShared[_dv];
                var _dr = await _de.get();
                _dreiMod = typeof _dr === 'function' ? _dr() : _dr;
            }
        } catch(_) {}

        if (!_dreiMod && typeof window !== 'undefined' && window.Drei) {
            _dreiMod = window.Drei;
        }

        if (!_dreiMod && isLocal) {
            try {
                _dreiMod = await import(/* @vite-ignore */ _depsUrl('@react-three_drei.js'));
            } catch(_dreiE1) {
                try {
                    _dreiMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/@react-three_drei.js');
                } catch(_dreiE2) { }
            }
        }
        if (_dreiMod && usedShared["@react-three/drei"]) {
            usedShared["@react-three/drei"].get = async function() {
                usedShared["@react-three/drei"].loaded = true;
                return function() { return _dreiMod; };
            };
        }
    } catch(_dreie) {
    }


    // Three.js vom Host laden
    try {
        var _threeMod = null;
        // 1. SharedScope
        try {
            var _threeShared = shared && (shared['three'] || shared.three);
            if (_threeShared) {
                var _threeVer = Object.keys(_threeShared)[0];
                var _threeEntry = _threeShared[_threeVer];
                var _threeGetResult = await _threeEntry.get();
                _threeMod = typeof _threeGetResult === 'function' ? _threeGetResult() : _threeGetResult;
            }
        } catch(_tssErr) {}

        // 2. Global window.THREE
        if (!_threeMod && typeof window !== 'undefined' && window.THREE) {
            _threeMod = window.THREE;
        }

        // 3. Vite deps
        if (!_threeMod && isLocal) {
            try {
                _threeMod = await import(/* @vite-ignore */ _depsUrl('three.js'));
            } catch(_tE1) {
                try {
                    _threeMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/three.js');
                } catch(_tE2) { }
            }
        }
        if (_threeMod && usedShared['three']) {
            var _threeExports = _threeMod.MeshPhysicalMaterial ? _threeMod : (_threeMod.default || _threeMod);
            usedShared['three'].get = async function() {
                usedShared['three'].loaded = true;
                return function() { return _threeExports; };
            };
        }
    } catch(_te) {
    }
    
    const initRes = init_1({
      name: mfName,
      remotes: usedRemotes,
      shared: usedShared,
      plugins: [],
      shareStrategy: 'loaded-first'
    });
    // handling circular init calls
    var initToken = initTokens[shareScopeName];
    if (!initToken)
      initToken = initTokens[shareScopeName] = { from: mfName };
    if (initScope.indexOf(initToken) >= 0) return;
    initScope.push(initToken);
    initRes.initShareScopeMap('default', shared);
    try {
      await Promise.all(await initRes.initializeSharing('default', {
        strategy: 'loaded-first',
        from: "build",
        initScope
      }));
    } catch (e) {
      console.error(e);
    }
    veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__.initResolve(initRes);
    return initRes
  }

  function getExposes(moduleName) {
    if (!(moduleName in exposesMap)) throw new Error(`Module ${moduleName} does not exist in container.`)
    return (exposesMap[moduleName])().then(res => () => res)
  }

export { getExposes as get, init };
