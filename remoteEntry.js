import { i as init_1, v as veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__ } from './assets/veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__-YRia8a0_.js';
import exposesMap from './assets/virtualExposes-BllVg3GF.js';
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
          let pkg = await __vitePreload(() => import('./assets/react-three-fiber.esm-DKCmiN0D.js'),true              ?[]:void 0);
          return pkg
        }
      ,
        "three": async () => {
          let pkg = await __vitePreload(() => import('./assets/three.module-wdyv8Ec4.js'),true              ?[]:void 0);
          return pkg
        }
      ,
        "@react-three/drei": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-DoqVf8DA.js'),true              ?[]:void 0);
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-BFYwJfNF.js').then(n => n.i),true              ?[]:void 0);
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
              requiredVersion: "^19.0.0"
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
              requiredVersion: "^19.0.0"
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
              requiredVersion: "^0.177.0"
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
              requiredVersion: "^19.0.0"
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
    // Problem: Vite-preopt-Module werden mit einem Browser-Hash
    // ausgeliefert (?v=XXXX). react.js und react.js?v=XXXX sind
    // im Browser-Modul-Cache VERSCHIEDENE Instanzen. r3f's
    // Reconciler nutzt react.js?v=XXXX, daher müssen wir dieselbe
    // URL verwenden – sonst ist ReactCurrentDispatcher.current null.
    try {
        var hostOrigin = window.location.origin;

        // Schritt 1: Aktuellen Vite-Hash aus dem DOM extrahieren.
        // _metadata.json kann einen VERALTETEN Hash enthalten wenn Vite re-optimiert hat.
        // Der korrekte Hash ist bereits in den geladenen Script-Tags / Performance-Entries
        // der Host-Seite vorhanden – deren Wert ist immer aktuell.
        var _viteHash = null;

        // Methode A: Performance API – Resource-Timing-Einträge der bereits geladenen Deps
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

        // Methode B: Script-Tags im DOM (z.B. Vite-Preload-Module)
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

        // Methode C: _metadata.json – letzter Fallback, kann veraltet sein
        if (!_viteHash) {
            try {
                var _metaRes = await fetch(hostOrigin + '/node_modules/.vite/deps/_metadata.json');
                if (_metaRes.ok) {
                    var _metaJson = await _metaRes.json();
                    _viteHash = _metaJson.browserHash || _metaJson.hash || null;
                }
            } catch(_mErr) {
            }
        }

        // Hilfsfunktion: URL mit oder ohne Hash bauen
        var _depsUrl = function(name) {
            var base = hostOrigin + '/node_modules/.vite/deps/' + name;
            return _viteHash ? base + '?v=' + _viteHash : base;
        };

        // Schritt 2: React laden – Strategie: K3's MF-Shared-Scope zuerst verwenden.
        // K3 v3 übergibt React im shared-Scope von init(). Dieser zeigt auf K3's
        // echte React-Instanz (react-XXXXX.js). Wenn wir stattdessen react.js von
        // .vite/deps laden, entsteht eine zweite Instanz mit einem ANDEREN
        // ReactCurrentDispatcher – Hooks schlagen dann still fehl (Error Boundary
        // fängt den Fehler, nichts wird gerendert).
        var _hostReact = null;
        var _reactSourceLabel = 'none';

        // Versuch A: K3's Shared Scope (direkter Zugriff auf K3's React-Instanz)
        try {
            var _sharedReact = shared && shared['react'];
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
        } catch(_srErr) {
        }

        // Versuch B: .vite/deps/react.js (Fallback, gleiche Instanz wenn Hash übereinstimmt)
        if (!_hostReact) {
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

        if (!_hostReact) throw new Error('[VERANDA-PLUGIN] React konnte nicht vom Host geladen werden');

        // React-Objekt auflösen: Vite wrappet CJS manchmal nur als default-Export
        var _React = _hostReact;
        if (typeof _hostReact.createElement !== 'function' && _hostReact.default && typeof _hostReact.default.createElement === 'function') {
            _React = _hostReact.default;
        }

        // Schritt 3: usedShared["react"].get() → K3's exakte React-Instanz zurückgeben.
        // WICHTIG: _React MUSS die identische Objekt-Referenz sein die K3's Reconciler
        // verwendet – sonst ist ReactCurrentDispatcher in unseren Hooks eine andere
        // Instanz als der vom Reconciler gesetzte Dispatcher → useState/useEffect crashen.
        usedShared["react"].get = async function() {
            usedShared["react"].loaded = true;
            return function() { return _React; };
        };

        // Schritt 4: jsx-runtime von K3's Vite Dev-Server laden
        // Vite optimiert react/jsx-runtime als react_jsx-runtime.js.
        // Wir MÜSSEN die echte jsx-runtime verwenden (statt createElement-Shim),
        // weil jsxs() statische Children signalisiert → React prüft keine Keys.
        // Der createElement-Shim verliert diese Semantik → falsche Key-Warnings.
        var _jsxMod = null;
        try {
            _jsxMod = await import(/* @vite-ignore */ _depsUrl('react_jsx-runtime.js'));
        } catch(_jsxErr) {
            try { _jsxMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/react_jsx-runtime.js'); } catch(_jsxErr2) {}
        }

        if (_jsxMod && (typeof _jsxMod.jsx === 'function' || typeof (_jsxMod.default || {}).jsx === 'function')) {
            // Echte jsx-runtime vom Host verwenden
            var _jrFinal = _jsxMod;
            if (typeof _jsxMod.jsx !== 'function' && _jsxMod.default) _jrFinal = _jsxMod.default;
            usedShared["react/jsx-runtime"].get = async function() {
                usedShared["react/jsx-runtime"].loaded = true;
                return function() { return _jrFinal; };
            };
        } else {
            // Fallback: createElement-Shim (mit korrektem children-Handling)
            var _shimJsx = function(type, config, maybeKey) {
                if (!config) config = {};
                if (maybeKey !== undefined) {
                    config = Object.assign({}, config);
                    config.key = '' + maybeKey;
                }
                // Children aus config extrahieren und als separate Args übergeben,
                // damit React sie als static children behandelt (keine Key-Warnung)
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
            usedShared["react/jsx-runtime"].get = async function() {
                usedShared["react/jsx-runtime"].loaded = true;
                var _m = { jsx: _shimJsx, jsxs: _shimJsx, Fragment: _React.Fragment };
                Object.defineProperty(_m, '__esModule', { value: true, enumerable: false });
                return function() { return _m; };
            };
        }

    } catch(_e) {
        console.warn('[VERANDA-PLUGIN] Host React import fehlgeschlagen:', _e);
    }

    // ============================================================
    // [inject-host-k3core] @k3/core vom K3-Host laden
    // ============================================================
    // K3's init() übergibt ein leeres SharedScope (11.8.15).
    // @k3/core ist K3's eigener src/index.ts Export-Barrel.
    // Es ist KEIN npm-Paket → nicht in .vite/deps.
    // Lösung: direkt von K3's Vite-Dev-Server als Source importieren.
    try {
        var _k3CoreMod = null;
        var _k3CoreSource = 'none';

        // 1. SharedScope (falls K3 doch @k3/core übergibt)
        var _k3SharedEntry = shared && shared["@k3/core"];
        if (_k3SharedEntry) {
            try {
                var _k3ver = Object.keys(_k3SharedEntry)[0];
                var _k3info = _k3SharedEntry[_k3ver];
                var _getRes = await _k3info.get();
                _k3CoreMod = typeof _getRes === 'function' ? _getRes() : _getRes;
                _k3CoreSource = 'SharedScope v' + _k3ver;
            } catch(_k3ssErr) {
            }
        }

        // 2. K3's Source-Barrel direkt vom Vite-Dev-Server
        //    @k3/core = Konfigurator3/src/index.ts
        if (!_k3CoreMod) {
            try {
                _k3CoreMod = await import(/* @vite-ignore */ hostOrigin + '/src/index.ts');
                _k3CoreSource = 'K3 Source (/src/index.ts)';
            } catch(_srcErr) {
            }
        }

        // 3. Fallback: Vite optimized deps (falls K3 @k3/core jemals als Dep registriert)
        if (!_k3CoreMod) {
            try {
                _k3CoreMod = await import(/* @vite-ignore */ _depsUrl('@k3_core.js'));
                _k3CoreSource = 'Vite deps (@k3_core.js)';
            } catch(_) {}
        }

        if (_k3CoreMod) {
            // Falls .default-Wrapper: auflösen
            var _k3Exports = _k3CoreMod;
            if (_k3CoreMod.default && typeof _k3CoreMod.default === 'object' && !_k3CoreMod.SlotModelRenderer) {
                _k3Exports = _k3CoreMod.default;
            }

            // Fehlende Exports als sichere No-Op-Proxies wrappen (verhindert React.createElement(undefined) Crash)
            var _k3SafeExports = Object.assign(Object.create(null), _k3Exports);
            var _requiredExports = ['SecondaryTitle', 'ExpressionInput', 'VariableSelector', 'ModelSelector'];
            for (var _rei = 0; _rei < _requiredExports.length; _rei++) {
                var _reName = _requiredExports[_rei];
                if (typeof _k3SafeExports[_reName] !== 'function') {
                    _k3SafeExports[_reName] = function MissingK3Export() { return null; };
                }
            }

            // BasicDynamicModelEditor: K3 v3 hat ein anderes Interface und rendert leer.
            // Wir überschreiben IMMER mit unserer Implementierung, die extraFields direkt rendert.
            _k3SafeExports['BasicDynamicModelEditor'] = function BasicDynamicModelEditor(props) {
                return (props && props.extraFields != null) ? props.extraFields : null;
            };

            // SlotModelRenderer: K3's native Implementierung wrappen (createElement statt direktem
            // Funktionsaufruf), damit K3's Komponente als echtes React-Fiber mit eigenem
            // Hook-Kontext & Redux-Subscription läuft und Props-Updates reaktiv durchkommen.
            var _nativeSlotModelRenderer = _k3Exports['SlotModelRenderer'];
            if (typeof _nativeSlotModelRenderer === 'function') {
                _k3SafeExports['SlotModelRenderer'] = function SlotModelRenderer(props) {
                    return _React.createElement(_nativeSlotModelRenderer, props);
                };
            } else {
                // Fallback falls K3 SlotModelRenderer nicht exportiert
                _k3SafeExports['SlotModelRenderer'] = function SlotModelRenderer(props) {
                    var instance = props && props.instance;
                    if (!instance) return null;
                    var Comp = instance.component;
                    if (typeof Comp !== 'function') return null;
                    return _React.createElement(Comp, instance.props || {});
                };
            }

            // window.__k3core setzen (für Stub-Proxies falls MF-Auflösung scheitert)
            window.__k3core = _k3SafeExports;

            // usedShared patchen
            if (usedShared["@k3/core"]) {
                usedShared["@k3/core"].get = async function() {
                    usedShared["@k3/core"].loaded = true;
                    return function() { return _k3SafeExports; };
                };
            }
        } else {
            console.warn('[VERANDA-PLUGIN] @k3/core konnte nicht geladen werden – Stubs aktiv.',
                         'Versuche: /src/index.ts');
        }
    } catch(_e2) {
        console.warn('[VERANDA-PLUGIN] @k3/core Lade-Fehler:', _e2);
    }

    // @react-three/fiber vom Host laden (MUSS dieselbe Instanz wie K3 sein für Kontext-Sharing)
    // K3 rendert ein r3f-Canvas; unsere Modelle laufen als Kinder darin → useThree() etc.
    // benötigen denselben React-Kontext-Wert wie K3's r3f-Canvas-Provider setzt.
    try {
        var _r3fMod = null;
        // Vite mangled: @react-three/fiber → @react-three_fiber.js
        try {
            _r3fMod = await import(/* @vite-ignore */ _depsUrl('@react-three_fiber.js'));
        } catch(_r3fE1) {
            try {
                _r3fMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/@react-three_fiber.js');
            } catch(_r3fE2) {
                console.warn('[VERANDA-PLUGIN] @react-three/fiber vom Host nicht geladen:', _r3fE2.message);
            }
        }
        if (_r3fMod && usedShared["@react-three/fiber"]) {
            usedShared["@react-three/fiber"].get = async function() {
                usedShared["@react-three/fiber"].loaded = true;
                return function() { return _r3fMod; };
            };
        }
    } catch(_r3fe) {
        console.warn('[VERANDA-PLUGIN] @react-three/fiber Lade-Fehler:', _r3fe);
    }

    // @react-three/drei vom Host laden
    try {
        var _dreiMod = null;
        // Vite mangled: @react-three/drei → @react-three_drei.js
        try {
            _dreiMod = await import(/* @vite-ignore */ _depsUrl('@react-three_drei.js'));
        } catch(_dreiE1) {
            try {
                _dreiMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/@react-three_drei.js');
            } catch(_dreiE2) {
                console.warn('[VERANDA-PLUGIN] @react-three/drei vom Host nicht geladen:', _dreiE2.message);
            }
        }
        if (_dreiMod && usedShared["@react-three/drei"]) {
            usedShared["@react-three/drei"].get = async function() {
                usedShared["@react-three/drei"].loaded = true;
                return function() { return _dreiMod; };
            };
        }
    } catch(_dreie) {
        console.warn('[VERANDA-PLUGIN] @react-three/drei Lade-Fehler:', _dreie);
    }

    // @react-three/drei vom Host laden
    try {
        var _dreiMod = null;
        // Vite mangled: @react-three/drei → @react-three_drei.js
        try {
            _dreiMod = await import(/* @vite-ignore */ _depsUrl('@react-three_drei.js'));
        } catch(_dreiE1) {
            try {
                _dreiMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/@react-three_drei.js');
            } catch(_dreiE2) {
                console.warn('[VERANDA-PLUGIN] @react-three/drei vom Host nicht geladen:', _dreiE2.message);
            }
        }
        if (_dreiMod && usedShared["@react-three/drei"]) {
            usedShared["@react-three/drei"].get = async function() {
                usedShared["@react-three/drei"].loaded = true;
                return function() { return _dreiMod; };
            };
        }
    } catch(_dreie) {
        console.warn('[VERANDA-PLUGIN] @react-three/drei Lade-Fehler:', _dreie);
    }

    // Three.js vom Host laden (MUSS dieselbe Instanz wie K3 sein für Material-Tracking).
    // K3's Rule-Engine tracked Materialien über seine eigene THREE-Instanz.
    // Wenn das Plugin eine eigene THREE-Instanz hat, sind Plugin-Materialien für K3 unsichtbar.
    // Vite optimiert 'three' → 'three.js' in .vite/deps.
    try {
        var _threeMod = null;
        // Strategie A: SharedScope (falls K3 three als shared übergibt)
        try {
            var _threeShared = shared && shared['three'];
            if (_threeShared) {
                var _threeVer = Object.keys(_threeShared)[0];
                var _threeEntry = _threeShared[_threeVer];
                if (_threeEntry && typeof _threeEntry.get === 'function') {
                    var _threeGetResult = await _threeEntry.get();
                    _threeMod = typeof _threeGetResult === 'function' ? _threeGetResult() : _threeGetResult;
                    if (_threeMod) console.log('[VERANDA-PLUGIN] three: SharedScope v' + _threeVer);
                }
            }
        } catch(_tssErr) {}
        // Strategie B: Vite-Deps mit/ohne Hash
        if (!_threeMod) {
            try {
                _threeMod = await import(/* @vite-ignore */ _depsUrl('three.js'));
                if (_threeMod) console.log('[VERANDA-PLUGIN] three: .vite/deps/three.js (mit Hash)');
            } catch(_tE1) {
                try {
                    _threeMod = await import(/* @vite-ignore */ hostOrigin + '/node_modules/.vite/deps/three.js');
                    if (_threeMod) console.log('[VERANDA-PLUGIN] three: .vite/deps/three.js (ohne Hash)');
                } catch(_tE2) {
                    console.warn('[VERANDA-PLUGIN] three: Host-Laden fehlgeschlagen, eigene Instanz aktiv:', _tE2.message);
                }
            }
        }
        if (_threeMod && usedShared['three']) {
            var _threeExports = _threeMod.default && typeof _threeMod.default === 'object' && _threeMod.default.MeshPhysicalMaterial
                ? _threeMod.default : _threeMod;
            usedShared['three'].get = async function() {
                usedShared['three'].loaded = true;
                return function() { return _threeExports; };
            };
        }
    } catch(_te) {
        console.warn('[VERANDA-PLUGIN] three Lade-Fehler:', _te);
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
