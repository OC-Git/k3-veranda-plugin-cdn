import { v as veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__, a as index_cjs } from './veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__-YRia8a0_.js';
import { v as veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__ } from './veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__-YXVZxRVS.js';
import { v as veranda_mf_2_plugin__loadShare__react__loadShare__, R as React } from './veranda_mf_2_plugin__loadShare__react__loadShare__-BxvQ6I45.js';
import { v as veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__ } from './veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__-DN29SLAj.js';
import { v as veranda_mf_2_plugin__loadShare__three__loadShare__ } from './veranda_mf_2_plugin__loadShare__three__loadShare__-DDzdASzq.js';
import './_commonjsHelpers-B85MJLTf.js';

// dev uses dynamic import to separate chunks
    
    const {loadShare: loadShare$1} = index_cjs;
    const {initPromise: initPromise$1} = veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__;
    const res$1 = initPromise$1.then(_ => loadShare$1("@react-three/drei", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "*"
    }}}));
    const exportModule$1 = await res$1.then(factory => factory());
    var veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__ = exportModule$1;

const DEFAULT_ENVIRONMENT = {
  intensity: 2,
  lightColor: "#fff4d6",
  envIntensity: 1,
  lightPosition: [12, 12, 8],
  ambientIntensity: 0.25,
  ambientColor: "#ffffff",
  shadowBias: -1e-3,
  isNight: false,
  _provided: false
};
const SceneEnvironmentContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT_ENVIRONMENT);
const useSceneEnvironment = () => veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(SceneEnvironmentContext);
const SceneEnvironmentProvider = ({ value, children }) => {
  const contextValue = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => ({
    ...DEFAULT_ENVIRONMENT,
    _provided: true,
    ...value
  }), [value]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneEnvironmentContext.Provider, { value: contextValue, children });
};

function probeEnabled() {
  if (typeof window === "undefined") return false;
  try {
    const param = new URLSearchParams(window.location.search).get("perfprobe");
    if (param === "1") return true;
    if (param === "0") return false;
    return window.localStorage.getItem("oc.veranda.perfprobe") === "1";
  } catch {
    return false;
  }
}
let probeMountCount = 0;
function createOverlay() {
  const el = document.createElement("div");
  el.style.cssText = [
    "position:fixed",
    "top:8px",
    "left:8px",
    "z-index:2147483647",
    "pointer-events:none",
    "font:11px/1.45 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
    "color:#e6edf3",
    "background:rgba(13,17,23,.86)",
    "border:1px solid rgba(110,118,129,.5)",
    "border-radius:6px",
    "padding:7px 10px",
    "white-space:pre",
    "min-width:210px"
  ].join(";");
  document.body.appendChild(el);
  return el;
}
function PerfProbe() {
  const gl = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useThree((s) => s.gl);
  const [isOwner] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(() => {
    const owner = probeMountCount === 0;
    probeMountCount++;
    return owner;
  });
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    probeMountCount--;
  }, []);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    if (!isOwner || !probeEnabled()) return;
    const overlay = createOverlay();
    let basePrograms = gl.info.programs?.length ?? 0;
    let baseGeometries = gl.info.memory.geometries;
    let longTasks = 0;
    let longTaskMaxMs = 0;
    let worstFrameGapMs = 0;
    let lastRenderFrame = gl.info.render.frame;
    let lastRenderAt = performance.now();
    let windowStart = performance.now();
    let framesInWindow = 0;
    let ticksInWindow = 0;
    let fps = 0;
    let rafHz = 0;
    const read = () => {
      const programs = gl.info.programs?.length ?? 0;
      const geometries = gl.info.memory.geometries;
      const loopMode = rafHz < 5 ? "unklar" : fps > rafHz * 0.85 ? "always" : "demand";
      return {
        fps,
        rafHz,
        loopMode,
        drawCalls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        programs,
        programsDelta: programs - basePrograms,
        geometries,
        textures: gl.info.memory.textures,
        geometriesDelta: geometries - baseGeometries,
        longTasks,
        longTaskMaxMs: Math.round(longTaskMaxMs),
        worstFrameGapMs: Math.round(worstFrameGapMs)
      };
    };
    const reset = () => {
      basePrograms = gl.info.programs?.length ?? 0;
      baseGeometries = gl.info.memory.geometries;
      longTasks = 0;
      longTaskMaxMs = 0;
      worstFrameGapMs = 0;
    };
    window.__VERANDA_PERF__ = {
      snapshot: read,
      reset,
      log: (label) => {
        const s = read();
        console.info(`[oc.veranda:perf] ${label}`, s);
        return s;
      }
    };
    let observer;
    if (typeof PerformanceObserver !== "undefined") {
      try {
        observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            longTasks++;
            if (entry.duration > longTaskMaxMs) longTaskMaxMs = entry.duration;
          }
        });
        observer.observe({ entryTypes: ["longtask"] });
      } catch {
        observer = void 0;
      }
    }
    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const now = performance.now();
      ticksInWindow++;
      const frame = gl.info.render.frame;
      if (frame !== lastRenderFrame) {
        const gap = now - lastRenderAt;
        if (gap < 1e3 && gap > worstFrameGapMs) worstFrameGapMs = gap;
        framesInWindow += frame - lastRenderFrame;
        lastRenderFrame = frame;
        lastRenderAt = now;
      }
      const elapsed = now - windowStart;
      if (elapsed >= 500) {
        fps = Math.round(framesInWindow * 1e3 / elapsed);
        rafHz = Math.round(ticksInWindow * 1e3 / elapsed);
        framesInWindow = 0;
        ticksInWindow = 0;
        windowStart = now;
        const s = read();
        const warn = (v) => v > 0 ? "  <<<" : "";
        overlay.textContent = [
          `fps ${String(s.fps).padStart(3)}   raf ${String(s.rafHz).padStart(3)}   ${s.loopMode}`,
          `calls ${s.drawCalls}   tris ${(s.triangles / 1e3).toFixed(1)}k`,
          `programs  ${s.programs}   Δ ${s.programsDelta}${warn(s.programsDelta)}`,
          `geo ${s.geometries}  Δ ${s.geometriesDelta}${warn(s.geometriesDelta)}  tex ${s.textures}`,
          `longtask ${s.longTasks}  max ${s.longTaskMaxMs}ms${warn(s.longTasks)}`,
          `worst gap ${s.worstFrameGapMs}ms`
        ].join("\n");
      }
    };
    rafId = requestAnimationFrame(tick);
    console.info(
      "[oc.veranda:perf] Probe aktiv. __VERANDA_PERF__.reset() / .log('idle') für die Baseline."
    );
    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      overlay.remove();
      if (window.__VERANDA_PERF__?.snapshot === read) delete window.__VERANDA_PERF__;
    };
  }, [gl, isOwner]);
  return null;
}

const LIGHT_USER_DATA_KEY = "oc.veranda.shadowLight.v1";
const HEMI_KEY = "oc.veranda.hemiLight.v1";
function SceneShadowLight() {
  const { gl, scene, invalidate } = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useThree();
  const { intensity, lightColor, lightPosition, shadowBias, ambientIntensity, ambientColor, isNight, _provided } = useSceneEnvironment();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    gl.localClippingEnabled = true;
    if (_provided) {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      gl.outputColorSpace = veranda_mf_2_plugin__loadShare__three__loadShare__.SRGBColorSpace;
      gl.toneMapping = veranda_mf_2_plugin__loadShare__three__loadShare__.ACESFilmicToneMapping;
      gl.toneMappingExposure = isNight ? 1.8 : 1;
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = veranda_mf_2_plugin__loadShare__three__loadShare__.PCFSoftShadowMap;
      gl.shadowMap.needsUpdate = true;
    }
    let light = scene.children.find((c) => c.userData[LIGHT_USER_DATA_KEY]);
    let ambient = scene.children.find((c) => c.userData[LIGHT_USER_DATA_KEY + ".ambient"]);
    if (!light) {
      light = new veranda_mf_2_plugin__loadShare__three__loadShare__.DirectionalLight(lightColor, intensity);
      light.castShadow = true;
      light.userData[LIGHT_USER_DATA_KEY] = true;
      scene.add(light);
      scene.add(light.target);
    }
    if (!ambient) {
      ambient = new veranda_mf_2_plugin__loadShare__three__loadShare__.AmbientLight(ambientColor, ambientIntensity);
      ambient.userData[LIGHT_USER_DATA_KEY + ".ambient"] = true;
      scene.add(ambient);
    }
    if (!_provided) {
      invalidate();
      return;
    }
    const MAP_SIZE = 4096;
    if (light.shadow.mapSize.width !== MAP_SIZE) {
      light.shadow.mapSize.set(MAP_SIZE, MAP_SIZE);
      if (light.shadow.map) {
        light.shadow.map.dispose();
        light.shadow.map = null;
      }
    }
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 60;
    light.shadow.camera.left = -7;
    light.shadow.camera.right = 7;
    light.shadow.camera.top = 7;
    light.shadow.camera.bottom = -7;
    light.shadow.camera.updateProjectionMatrix();
    light.intensity = isNight ? intensity * 0.4 : intensity;
    light.color.set(new veranda_mf_2_plugin__loadShare__three__loadShare__.Color(lightColor));
    light.position.set(...lightPosition);
    light.shadow.bias = shadowBias;
    light.shadow.normalBias = 0.035;
    light.shadow.radius = 4;
    ambient.intensity = isNight ? ambientIntensity * 0.6 : ambientIntensity;
    ambient.color.set(new veranda_mf_2_plugin__loadShare__three__loadShare__.Color(ambientColor));
    let hemi = scene.children.find((c) => c.userData[HEMI_KEY]);
    if (!hemi) {
      hemi = new veranda_mf_2_plugin__loadShare__three__loadShare__.HemisphereLight(8900331, 12888189, 0.4);
      hemi.userData[HEMI_KEY] = true;
      scene.add(hemi);
    }
    hemi.intensity = isNight ? 0.05 : 0.4;
    scene.fog = isNight ? new veranda_mf_2_plugin__loadShare__three__loadShare__.Fog(329743, 10, 45) : new veranda_mf_2_plugin__loadShare__three__loadShare__.Fog(11585759, 25, 90);
    invalidate();
  }, [gl, scene, invalidate, intensity, lightColor, lightPosition, shadowBias, ambientIntensity, ambientColor, isNight, _provided]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(PerfProbe, {});
}

const DEFAULT$1 = {
  glasDicke: 0,
  glasLeistenHoehe: 0,
  wandanschlussAktiv: false,
  wandanschlussTiefe: 0,
  sparrenAnzahl: 0,
  qubusOffset: 0,
  unterEindeckungHoehe: 0,
  setUnterEindeckungHoehe: () => {
  },
  aussensparrenHoehe: 0,
  setAussensparrenHoehe: () => {
  },
  sparrenAuflage: 0,
  setSparrenAuflage: () => {
  },
  sparrenHoehe: 0.12,
  setSparrenHoehe: () => {
  },
  lamellenLedData: null,
  setEindeckungInfo: () => {
  },
  setLamellenLedData: () => {
  }
};
const EindeckungInfoContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT$1);
function useEindeckungInfo() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(EindeckungInfoContext);
}

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("k3-plugin-api", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^2.5.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__ = exportModule;

const BLECH_STAERKE = 1e-3;
const GUMMI_BREITE = 8e-3;
const GUMMI_DICKE = 8e-3;
const ABKANTUNG_LAENGE = 5e-3;
const GLAS_PANEL_LUFT = 0.01;
const DEFAULT_FARBEN = {
  gummi: "#1a1a1a",
  profil: "#A0A0A0",
  holz: "#8B7355"
};
const KONSTRUKTION_SLOTS = {
  pfosten: {
    id: "konstruktion-slot-pfosten",
    name: "Stützstruktur",
    defaultModelId: "veranda-pfosten-eckig"
  },
  eindeckung: {
    id: "konstruktion-slot-eindeckung",
    name: "Überdachung",
    defaultModelId: "veranda-glas-eindeckung"
  },
  rinne: {
    id: "konstruktion-slot-rinne",
    name: "Regenrinne",
    defaultModelId: "veranda-regenrinne-kasten"
  },
  beschattung: {
    id: "konstruktion-slot-beschattung",
    name: "Beschattung",
    defaultModelId: "veranda-markise"
  },
  wandLinks: {
    id: "konstruktion-slot-wand-links",
    name: "Wand Links",
    defaultModelId: "veranda-highlight-plane"
  },
  wandRechts: {
    id: "konstruktion-slot-wand-rechts",
    name: "Wand Rechts",
    defaultModelId: "veranda-highlight-plane"
  },
  wandVorne: {
    id: "konstruktion-slot-wand-vorne",
    name: "Wand Vorne",
    defaultModelId: "veranda-wand-keil"
  },
  wandHinten: {
    id: "konstruktion-slot-wand-hinten",
    name: "Wand Hinten",
    defaultModelId: "veranda-wand-keil"
  },
  led: {
    id: "konstruktion-slot-led",
    name: "LED Beleuchtung"
  }
};
const SCENE_SLOTS = {
  haus: {
    id: "scene-slot-haus",
    name: "Haus"
  }
};
const MATERIAL_DEFAULTS = {
  /**
   * Profil-Material (Pfosten, Sparren, Querträger, Regenrinne etc.)
   * Entspricht dem Standard-Material in k3.veranda (MeshPhysicalMaterial).
   */
  profil: { metalness: 0, roughness: 0.55, clearcoat: 0.4, clearcoatRoughness: 0.25 },
  /** Metallische Oberfläche (Leisten, Blech) */
  metall: { metalness: 0.6, roughness: 0.25, clearcoat: 0.3, clearcoatRoughness: 0.15 },
  /** Leisten-Oberfläche */
  leiste: { metalness: 0.5, roughness: 0.3},
  /** Gummi-Oberfläche */
  gummi: { roughness: 0.9, metalness: 0 }};

const OFFSET = 6;
function collectSeitenInstanzen(inst, side, anchorPos) {
  const result = [];
  const id = inst.modelAction?.anchoringSelection?.instance?.id;
  if (id) result.push({ id: String(id), side, pos: anchorPos });
  if (inst.slots) {
    for (const children of Object.values(inst.slots)) {
      for (const child of children) {
        result.push(...collectSeitenInstanzen(child, side, anchorPos));
      }
    }
  }
  return result;
}
function useSeitenKamera(slotAnchors, height, filledInstanzen) {
  const openInstance = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useOpenInstance();
  const setCameraPosition = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useSetCameraPosition();
  const linksInsts = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useConfigurationInstances(KONSTRUKTION_SLOTS.wandLinks.id);
  const rechtsInsts = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useConfigurationInstances(KONSTRUKTION_SLOTS.wandRechts.id);
  const vorneInsts = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useConfigurationInstances(KONSTRUKTION_SLOTS.wandVorne.id);
  const hintenInsts = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useConfigurationInstances(KONSTRUKTION_SLOTS.wandHinten.id);
  const containerAnchors = [
    [linksInsts, 1, slotAnchors.wandLinks.position],
    [rechtsInsts, 0, slotAnchors.wandRechts.position],
    [vorneInsts, 2, slotAnchors.wandVorne.position],
    [hintenInsts, 3, slotAnchors.wandHinten.position]
  ];
  const idToEntry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const [insts, side, pos] of containerAnchors) {
      for (const inst of insts) map.set(inst.id, { side, pos });
    }
    for (const entry of filledInstanzen) {
      map.set(entry.id, { side: entry.side, pos: entry.pos });
    }
    return map;
  }, [linksInsts, rechtsInsts, vorneInsts, hintenInsts, filledInstanzen]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    const entry = idToEntry.get(openInstance.id);
    if (!entry) return;
    const [px, , pz] = entry.pos;
    const cy = height / 2;
    const cx = px + (entry.side === 0 ? -OFFSET : entry.side === 1 ? OFFSET : 0);
    const cz = pz + (entry.side === 2 ? -OFFSET : entry.side === 3 ? OFFSET : 0);
    setCameraPosition({
      position: [cx, cy, cz],
      lookAt: [px, cy, pz],
      focusType: "static"
    });
    return () => setCameraPosition(null);
  }, [openInstance.id, idToEntry, height, setCameraPosition]);
}

function calcVerandaGeometry(depth, dachneigung, height) {
  const neigung = dachneigung * Math.PI / 180;
  const hoeheDiff = Math.tan(neigung) * depth;
  return {
    neigung,
    hoeheDiff,
    hoeheHinten: height,
    hoeheVorne: height - hoeheDiff
  };
}
function calcHoeheAnPosition(hoeheVorne, hoeheHinten, depth, offset) {
  if (depth <= 0) return hoeheVorne;
  return hoeheVorne + (hoeheHinten - hoeheVorne) / depth * offset;
}
function createExtrudeGeometry(shape, depth, curveSegments = 1) {
  const geom = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, {
    steps: 1,
    depth,
    curveSegments,
    bevelEnabled: false
  });
  geom.translate(0, 0, -depth / 2);
  return geom;
}

function exprVal(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "expression" in v) {
    return String(v.expression ?? "");
  }
  return String(v ?? "");
}
function numVal(v, fallback = 0) {
  const n = Number(exprVal(v).replace(",", "."));
  return Number.isNaN(n) ? fallback : n;
}
function berechnePositionen(gesamtBreite, anzahl) {
  const n = anzahl != null ? Math.round(Number(exprVal(anzahl))) : 2;
  if (isNaN(n) || n <= 0) return [];
  if (n === 1) return [0];
  const positionen = [];
  const abstand = gesamtBreite / (n - 1);
  for (let i = 0; i < n; i++) {
    positionen.push(-gesamtBreite / 2 + i * abstand);
  }
  return positionen;
}

function calcWandGeometry(wandSeite, breite, hoehe, parentWidth, parentDepth, parentHeight, parentDachneigung, pfostenBreite = 0, pfostenTiefe = 0, sparrenHoehe = 0, pfette = 0, pfettenBreite = 0, dachVorsprung = 0, sparrenAuflage = 0, schwelle = 0, schwelleBreite = 0, schwelleHoehe = 0, segmentIndex = -1, pfostenAnzahlVorne = 2, pfostenAnzahlHinten = 2, isQubus = false, segmentAnzahl, rinnenHoehe = 0.08) {
  const isSide = wandSeite === 0 || wandSeite === 1;
  const isFront = wandSeite === 2;
  const isBack = wandSeite === 3;
  const hasRearPosts = pfostenAnzahlHinten > 0;
  const backObstruction = Math.max(
    Number(pfette) === 1 ? pfettenBreite : 0,
    hasRearPosts ? pfostenTiefe : 0
  );
  let freeDepth;
  let segmentPosZ;
  if (isQubus && isSide) {
    const rB = pfostenTiefe;
    freeDepth = parentDepth - 2 * rB;
    segmentPosZ = 0;
    if (segmentIndex >= 0 && segmentAnzahl && segmentAnzahl > 1) {
      const segLen = freeDepth / segmentAnzahl;
      const startZ = -parentDepth / 2 + rB;
      const z0 = startZ + segmentIndex * segLen;
      const z1 = startZ + (segmentIndex + 1) * segLen;
      freeDepth = segLen;
      segmentPosZ = (z0 + z1) / 2;
    }
  } else {
    freeDepth = parentDepth - dachVorsprung - pfostenTiefe - backObstruction;
    segmentPosZ = (dachVorsprung + pfostenTiefe - backObstruction) / 2;
    if (isSide && segmentIndex >= 0 && segmentAnzahl && segmentAnzahl > 1) {
      const segLen = freeDepth / segmentAnzahl;
      const startZ = -parentDepth / 2 + dachVorsprung + pfostenTiefe;
      const z0 = startZ + segmentIndex * segLen;
      const z1 = startZ + (segmentIndex + 1) * segLen;
      freeDepth = segLen;
      segmentPosZ = (z0 + z1) / 2;
    }
  }
  let freeWidth = parentWidth - 2 * pfostenBreite;
  let segmentPosX = 0;
  if ((isFront || isBack) && segmentIndex >= 0) {
    const anzahl = isFront ? pfostenAnzahlVorne : pfostenAnzahlHinten;
    if (anzahl > 1) {
      const positions = berechnePositionen(parentWidth - pfostenBreite, anzahl);
      if (segmentIndex < positions.length - 1) {
        const x0 = positions[segmentIndex];
        const x1 = positions[segmentIndex + 1];
        freeWidth = x1 - x0 - pfostenBreite;
        segmentPosX = (x0 + x1) / 2;
      }
    }
  }
  const defaultWandBreite = isSide ? freeDepth : freeWidth;
  const wandBreite = breite > 0 ? breite : Math.max(0.01, defaultWandBreite);
  const gWidth = parentWidth - pfostenBreite;
  const posX = isSide ? wandSeite === 0 ? -gWidth / 2 : gWidth / 2 : segmentPosX;
  const rotY = isSide ? wandSeite === 0 ? -Math.PI / 2 : Math.PI / 2 : isBack ? Math.PI : 0;
  const posZ = isSide ? segmentPosZ : isFront ? -parentDepth / 2 + dachVorsprung + pfostenTiefe / 2 : parentDepth / 2 - backObstruction / 2;
  const { hoeheVorne, hoeheHinten } = calcVerandaGeometry(
    parentDepth,
    parentDachneigung,
    parentHeight
  );
  const steigung = parentDepth > 0 ? (hoeheHinten - hoeheVorne) / parentDepth : 0;
  const frontOffset = isFront ? dachVorsprung + pfostenTiefe / 2 : dachVorsprung + pfostenTiefe;
  const hoeheAtWandFront = hoeheVorne + steigung * frontOffset;
  const backOffset = parentDepth - backObstruction;
  const hoeheAtWandBack = hoeheVorne + steigung * backOffset;
  const innenliegend = Number(sparrenAuflage) === 1;
  const usableHoeheVorne = isQubus ? hoeheVorne - schwelleHoehe : innenliegend ? hoeheAtWandFront - sparrenHoehe : hoeheAtWandFront;
  const usableHoeheHinten = isQubus ? hoeheHinten - schwelleHoehe : innenliegend ? hoeheAtWandBack - sparrenHoehe : hoeheAtWandBack;
  const qtVorneRinne = Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const schwelleOK = innenliegend ? hoeheVorne + steigung * qtVorneRinne : hoeheVorne + sparrenHoehe;
  const rinneY = schwelleOK - rinnenHoehe;
  const pfostenTopVorne = isFront ? rinneY : usableHoeheVorne;
  const defaultHoeheVorne = isSide ? usableHoeheVorne : isFront ? pfostenTopVorne : usableHoeheHinten;
  const defaultHoeheHinten = isSide ? usableHoeheHinten : isBack ? usableHoeheHinten : usableHoeheVorne;
  const wandHoeheVorne = hoehe > 0 ? hoehe : defaultHoeheVorne;
  const wandHoeheHinten = hoehe > 0 ? hoehe : defaultHoeheHinten;
  return {
    wandBreite,
    zoneGroupY: 0,
    zoneHoeheVorne: wandHoeheVorne,
    zoneHoeheHinten: wandHoeheHinten,
    keilInnerY: wandHoeheVorne,
    posX,
    posZ,
    rotY
  };
}

function calcWandSlotAnchor(geo, wandSeite, segmentIndex = -1, segmentAnzahl) {
  const g = calcWandGeometry(
    wandSeite,
    0,
    0,
    geo.width,
    geo.depth,
    geo.height,
    geo.dachneigung,
    geo.pfostenBreite,
    geo.pfostenTiefe,
    geo.sparrenHoehe,
    geo.pfette,
    geo.pfettenBreite,
    geo.dachVorsprung,
    geo.sparrenAuflage,
    geo.schwelle,
    geo.schwelleBreite,
    geo.schwelleHoehe,
    segmentIndex,
    geo.pfostenAnzahlVorne,
    geo.pfostenAnzahlHinten,
    geo.isQubus ?? false,
    segmentAnzahl,
    geo.rinnenHoehe ?? 0.08
  );
  return {
    position: [g.posX, g.zoneGroupY, g.posZ],
    rotation: [0, g.rotY, 0],
    size: {
      breite: g.wandBreite,
      hoehe: g.zoneHoeheVorne,
      tiefe: geo.pfostenBreite
    },
    meta: {
      hoeheVorne: g.zoneHoeheVorne,
      hoeheHinten: g.zoneHoeheHinten,
      wandSeite,
      segmentIndex
    }
  };
}
function calcSlotAnchors(geo) {
  const {
    width,
    depth,
    height,
    dachneigung = 0,
    sparrenHoehe = 0,
    sparrenAuflage = 0,
    schwelle = 0,
    schwelleBreite = 0.1,
    pfostenBreite = 0.1,
    pfostenTiefe = 0.1,
    rinnenHoehe = 0.08,
    rinnenBreite = 0.12,
    isQubus = false
  } = geo;
  const { neigung, hoeheVorne, hoeheHinten } = calcVerandaGeometry(
    depth,
    dachneigung,
    height
  );
  const steigung = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  const innenliegend = Number(sparrenAuflage) === 1;
  const qtVorne = Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const schwelleOK = innenliegend ? hoeheVorne + steigung * qtVorne : hoeheVorne + sparrenHoehe;
  const rinneY = schwelleOK - rinnenHoehe;
  const schwelleVorderkante = schwelleBreite >= pfostenTiefe ? -depth / 2 : -depth / 2 + pfostenTiefe - schwelleBreite;
  const rinneZ = innenliegend ? schwelleVorderkante : -depth / 2;
  const rinnenLaenge = isQubus ? width + pfostenBreite : width;
  const rinne = {
    position: isQubus ? [0, height - rinnenHoehe, -depth / 2] : [0, rinneY, rinneZ],
    rotation: [0, Math.PI, 0],
    size: { breite: rinnenLaenge, hoehe: rinnenHoehe, tiefe: rinnenBreite },
    meta: { schwelleOK, innenliegend, isQubus }
  };
  const eindeckungNeigungDeg = geo.eindeckungDachneigung ?? dachneigung;
  const eGeo = calcVerandaGeometry(depth, eindeckungNeigungDeg, height);
  const eindeckung = {
    position: [0, eGeo.hoeheVorne, -depth / 2],
    rotation: [-eGeo.neigung, 0, 0],
    size: {
      breite: width,
      hoehe: eGeo.hoeheHinten - eGeo.hoeheVorne,
      tiefe: depth / Math.cos(eGeo.neigung)
    },
    meta: {
      hoeheVorne: eGeo.hoeheVorne,
      hoeheHinten: eGeo.hoeheHinten,
      neigung: eGeo.neigung,
      dachneigung: eindeckungNeigungDeg,
      isQubus
    }
  };
  const unterdach = {
    position: [0, hoeheVorne, -depth / 2],
    rotation: [0, 0, 0],
    size: { breite: width, hoehe: sparrenHoehe, tiefe: depth },
    meta: { hoeheVorne, hoeheHinten, neigung, sparrenHoehe }
  };
  const wandLinks = calcWandSlotAnchor(geo, 1);
  const wandRechts = calcWandSlotAnchor(geo, 0);
  const wandVorne = calcWandSlotAnchor(geo, 2);
  const wandHinten = calcWandSlotAnchor(geo, 3);
  const pfosten = {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: { breite: width, hoehe: height, tiefe: depth },
    meta: { hoeheVorne, hoeheHinten, pfostenBreite, pfostenTiefe }
  };
  return {
    rinne,
    eindeckung,
    beschattung: unterdach,
    led: unterdach,
    pfosten,
    wandLinks,
    wandRechts,
    wandVorne,
    wandHinten
  };
}

const patchStates = /* @__PURE__ */ new WeakMap();
const NOISE_GLSL = (
  /* glsl */
  `
float ocHash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float ocNoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(mix(ocHash(i + vec3(0,0,0)), ocHash(i + vec3(1,0,0)), f.x),
            mix(ocHash(i + vec3(0,1,0)), ocHash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(ocHash(i + vec3(0,0,1)), ocHash(i + vec3(1,0,1)), f.x),
            mix(ocHash(i + vec3(0,1,1)), ocHash(i + vec3(1,1,1)), f.x), f.y),
        f.z);
}
float ocFbm(vec3 p) {
    float a = 0.5;
    float s = 0.0;
    for (int i = 0; i < 4; i++) {
        s += a * ocNoise(p);
        p *= 2.02;
        a *= 0.5;
    }
    return s;
}
`
);
const VARYINGS_GLSL = (
  /* glsl */
  `
varying vec3 ocWorldPos;
varying vec3 ocWorldNormal;
uniform vec3 ocAxis;
uniform float ocStrength;
`
);
const VERTEX_WORLD_GLSL = (
  /* glsl */
  `
    vec4 ocLocal = vec4(transformed, 1.0);
    vec3 ocLocalN = objectNormal;
    #ifdef USE_INSTANCING
        ocLocal = instanceMatrix * ocLocal;
        ocLocalN = mat3(instanceMatrix) * ocLocalN;
    #endif
    ocWorldPos = (modelMatrix * ocLocal).xyz;
    ocWorldNormal = normalize(mat3(modelMatrix) * ocLocalN);
`
);
const FRAME_GLSL = (
  /* glsl */
  `
    float ocAlong = dot(ocWorldPos, ocAxis);
    vec3 ocPerpVec = ocWorldPos - ocAxis * ocAlong;
    float ocAcross = ocPerpVec.x + ocPerpVec.y + ocPerpVec.z;
    float ocEdge = clamp(length(fwidth(ocWorldNormal)) * 12.0, 0.0, 1.0);
`
);
const CONTACT_GLSL = (
  /* glsl */
  `
    float ocContact = 1.0 - exp(-max(ocWorldPos.y, 0.0) * 14.0);
    diffuseColor.rgb *= mix(1.0, ocContact, 0.30 * ocStrength);
`
);
const ALU_GLSL = (
  /* glsl */
  `
    ${FRAME_GLSL}
    // Gebürstetes Finish: feine Riefen längs der Zugrichtung des Profils.
    float ocBrush = ocNoise(vec3(ocAlong * 2.0, ocAcross * 300.0, 0.0));
    roughnessFactor += (ocBrush - 0.5) * 0.22 * ocStrength;

    // Mikrokratzer: dünn, gerichtet, selten — und GLATTER als die Umgebung,
    // deshalb subtrahiert. Nur Roughness, nie Albedo.
    float ocScr = ocNoise(vec3(ocAlong * 0.9, ocAcross * 1100.0, 3.7));
    roughnessFactor -= smoothstep(0.88, 1.0, ocScr) * 0.30 * ocStrength;

    // Pulverbeschichtung: sehr niederfrequente Welligkeit ("Orangenhaut").
    float ocPeel = ocFbm(ocWorldPos * 42.0);
    roughnessFactor += (ocPeel - 0.5) * 0.10 * ocStrength;

    // Kantenabrieb: an Kanten blank poliert, also metallischer und glatter.
    metalnessFactor = mix(metalnessFactor, min(1.0, metalnessFactor + 0.45), ocEdge * 0.6 * ocStrength);
    roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.55, ocEdge * 0.6 * ocStrength);

    // Wetterung: bodennah minimal stumpfer.
    roughnessFactor += (1.0 - smoothstep(0.0, 1.2, ocWorldPos.y)) * 0.05 * ocStrength;

    roughnessFactor = clamp(roughnessFactor, 0.02, 1.0);
    metalnessFactor = clamp(metalnessFactor, 0.0, 1.0);
    ${CONTACT_GLSL}
`
);
const HOLZ_GLSL = (
  /* glsl */
  `
    ${FRAME_GLSL}
    // Domain Warping erzeugt die unregelmäßigen, "fließenden" Jahresringe.
    float ocWarp = ocFbm(ocWorldPos * 3.5);
    float ocRing = fract((ocAlong * 34.0) + ocWarp * 1.8);
    float ocGrain = smoothstep(0.42, 0.5, ocRing) * (1.0 - smoothstep(0.5, 0.58, ocRing));

    // Weltkoordinaten-basiert: die Planken einer InstancedMesh sehen dadurch
    // NICHT alle identisch aus — genau das ist bei Sichtschutzwänden auffällig.
    float ocFleck = ocFbm(ocWorldPos * vec3(3.0, 18.0, 3.0));

    diffuseColor.rgb *= 1.0 - ocGrain * 0.30 * ocStrength;
    diffuseColor.rgb *= 0.94 + ocFleck * 0.13 * ocStrength;
    roughnessFactor += (ocGrain * 0.22 + (ocFleck - 0.5) * 0.14) * ocStrength;
    roughnessFactor = clamp(roughnessFactor, 0.15, 1.0);
    ${CONTACT_GLSL}
`
);
const STOFF_GLSL = (
  /* glsl */
  `
    ${FRAME_GLSL}
    // Gewebe: gekreuzte Kett- und Schussfäden.
    float ocWeave = sin(ocAlong * 900.0) * sin(ocAcross * 900.0);
    roughnessFactor += ocWeave * 0.10 * ocStrength;

    // Unregelmäßigkeit im Garn, sonst wirkt das Muster gedruckt.
    float ocSlub = ocFbm(ocWorldPos * 60.0);
    roughnessFactor += (ocSlub - 0.5) * 0.10 * ocStrength;
    diffuseColor.rgb *= 0.94 + ocSlub * 0.12 * ocStrength;
    roughnessFactor = clamp(roughnessFactor, 0.3, 1.0);
`
);
const GLAS_GLSL = (
  /* glsl */
  `
    vec3 ocViewDir = normalize(vViewPosition);
    float ocFres = pow(1.0 - clamp(abs(dot(ocViewDir, normal)), 0.0, 1.0), 5.0);

    // Flache Blickwinkel — Dachglas von unten ist genau das — werden
    // reflektiver und damit weniger durchsichtig.
    diffuseColor.a = clamp(diffuseColor.a + ocFres * 0.55 * ocStrength, 0.0, 1.0);

    // Kanten-Grünstich: streifender Blick = längerer Weg durch die Scheibe.
    diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.86, 1.0, 0.92), ocFres * ocStrength);

    // Walzglas-Welligkeit: sehr niederfrequent, sorgt für die typisch leicht
    // "laufende" Reflexion großer Scheiben.
    float ocWave = ocFbm(ocWorldPos * 5.0);
    roughnessFactor += (ocWave - 0.5) * 0.05 * ocStrength;
    roughnessFactor = clamp(roughnessFactor, 0.0, 1.0);
`
);
const PROFILE_GLSL = {
  alu: ALU_GLSL,
  holz: HOLZ_GLSL,
  stoff: STOFF_GLSL,
  glas: GLAS_GLSL
};
const FRAGMENT_ANCHOR = "#include <metalnessmap_fragment>";
const FRAGMENT_ANCHOR_GLAS = "#include <normal_fragment_maps>";
function patchSurface(material, profile, params = {}) {
  const axis = params.axis ?? [0, 1, 0];
  const strength = params.strength ?? 1;
  const existing = patchStates.get(material);
  if (existing) {
    existing.uniforms.ocAxis.value.set(axis[0], axis[1], axis[2]).normalize();
    existing.uniforms.ocStrength.value = strength;
    return;
  }
  const state = {
    profile,
    uniforms: {
      ocAxis: { value: new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(axis[0], axis[1], axis[2]).normalize() },
      ocStrength: { value: strength }
    }
  };
  patchStates.set(material, state);
  const body = PROFILE_GLSL[profile];
  const anchor = profile === "glas" ? FRAGMENT_ANCHOR_GLAS : FRAGMENT_ANCHOR;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.ocAxis = state.uniforms.ocAxis;
    shader.uniforms.ocStrength = state.uniforms.ocStrength;
    shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>
${VARYINGS_GLSL}`).replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
${VERTEX_WORLD_GLSL}`
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>
${VARYINGS_GLSL}
${NOISE_GLSL}`
    ).replace(anchor, `${anchor}
${body}`);
  };
  material.customProgramCacheKey = () => `ocSurface:${profile}`;
  material.needsUpdate = true;
}

const MaterialFallback = ({
  material,
  fallbackColor = DEFAULT_FARBEN.profil,
  children,
  transparent,
  opacity,
  metalness = MATERIAL_DEFAULTS.profil.metalness,
  roughness = MATERIAL_DEFAULTS.profil.roughness,
  clearcoat = MATERIAL_DEFAULTS.profil.clearcoat,
  clearcoatRoughness = MATERIAL_DEFAULTS.profil.clearcoatRoughness,
  side = veranda_mf_2_plugin__loadShare__three__loadShare__.FrontSide,
  depthWrite,
  clippingPlanes,
  materialType = "physical",
  surface,
  surfaceAxis,
  surfaceStrength = 1,
  renderOrder = 0,
  polygonOffset,
  polygonOffsetFactor,
  polygonOffsetUnits
}) => {
  const fallbackRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  if (!fallbackRef.current) {
    if (materialType === "basic") {
      const mat = new veranda_mf_2_plugin__loadShare__three__loadShare__.MeshBasicMaterial({
        color: fallbackColor,
        transparent: transparent ?? false,
        opacity: opacity ?? 1,
        side,
        depthWrite: depthWrite ?? !(transparent ?? false),
        polygonOffset: polygonOffset ?? false,
        polygonOffsetFactor: polygonOffsetFactor ?? 0,
        polygonOffsetUnits: polygonOffsetUnits ?? 0
      });
      mat.renderOrder = renderOrder;
      fallbackRef.current = mat;
    } else {
      const mat = new veranda_mf_2_plugin__loadShare__three__loadShare__.MeshPhysicalMaterial({
        color: fallbackColor,
        transparent: transparent ?? false,
        opacity: opacity ?? 1,
        metalness,
        roughness,
        clearcoat,
        clearcoatRoughness,
        side,
        depthWrite: depthWrite ?? !(transparent ?? false),
        polygonOffset: polygonOffset ?? false,
        polygonOffsetFactor: polygonOffsetFactor ?? 0,
        polygonOffsetUnits: polygonOffsetUnits ?? 0
      });
      mat.renderOrder = renderOrder;
      fallbackRef.current = mat;
    }
  }
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    const mat = fallbackRef.current;
    if (!mat) return;
    mat.color.set(fallbackColor);
    if (transparent !== void 0) mat.transparent = transparent;
    if (opacity !== void 0) mat.opacity = opacity;
    if (mat instanceof veranda_mf_2_plugin__loadShare__three__loadShare__.MeshPhysicalMaterial) {
      mat.metalness = metalness;
      mat.roughness = roughness;
      mat.clearcoat = clearcoat;
      mat.clearcoatRoughness = clearcoatRoughness;
    }
    mat.side = side;
    if (depthWrite !== void 0) mat.depthWrite = depthWrite;
    if (polygonOffset !== void 0) mat.polygonOffset = polygonOffset;
    if (polygonOffsetFactor !== void 0) mat.polygonOffsetFactor = polygonOffsetFactor;
    if (polygonOffsetUnits !== void 0) mat.polygonOffsetUnits = polygonOffsetUnits;
    mat.needsUpdate = true;
  }, [fallbackColor, transparent, opacity, metalness, roughness, clearcoat, clearcoatRoughness, side, depthWrite, polygonOffset, polygonOffsetFactor, polygonOffsetUnits]);
  const clipCloneRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const clipBaseRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const clipShaderKeyRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef("");
  const needsClip = !!clippingPlanes && clippingPlanes.length > 0;
  const needsOwn = needsClip || !!surface;
  const activeMat = React.useMemo(() => {
    const baseMat = material ?? fallbackRef.current;
    if (!needsOwn) return baseMat;
    const existing = clipCloneRef.current;
    if (!existing || clipBaseRef.current !== baseMat) {
      existing?.dispose();
      const cloned = baseMat.clone();
      clipCloneRef.current = cloned;
      clipBaseRef.current = baseMat;
      clipShaderKeyRef.current = "";
    }
    return clipCloneRef.current;
  }, [material, needsOwn]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    const clone = clipCloneRef.current;
    if (!clone || activeMat !== clone) return;
    const baseMat = material ?? fallbackRef.current;
    clone.copy(baseMat);
    clone.clippingPlanes = clippingPlanes ?? null;
    clone.clipShadows = true;
    clipBaseRef.current = baseMat;
    if (surface) {
      patchSurface(clone, surface, { axis: surfaceAxis, strength: surfaceStrength });
    }
    const shaderKey = `${clone.transparent}|${clone.side}|${clone.clippingPlanes?.length ?? 0}|${surface ?? ""}`;
    if (shaderKey !== clipShaderKeyRef.current) {
      clipShaderKeyRef.current = shaderKey;
      clone.needsUpdate = true;
    }
  });
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    clipCloneRef.current?.dispose();
    clipCloneRef.current = null;
    clipBaseRef.current = null;
  }, []);
  if (children) {
    if (material) {
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: activeMat, attach: "material" }, activeMat.uuid);
    }
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children });
  }
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: activeMat, attach: "material" }, activeMat.uuid);
};

class SceneErrorBoundary extends veranda_mf_2_plugin__loadShare__react__loadShare__.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("[oc.veranda] Szenen-Fehler:", error, info.componentStack);
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

const DEFAULT_GEOMETRY = {
  width: 4,
  depth: 3,
  height: 2.5,
  dachneigung: 0,
  dachVorsprung: 0,
  pfostenAnzahlVorne: 2,
  pfostenAnzahlHinten: 2,
  pfostenBreite: 0.1,
  pfostenTiefe: 0.1,
  sparrenAnzahl: 6,
  sparrenBreite: 0.06,
  sparrenHoehe: 0.12,
  sparrenAuflage: 0,
  schwelle: 1,
  schwelleBreite: 0.1,
  schwelleHoehe: 0.06,
  staticTraeger: 0,
  staticTraegerBreite: 0.1,
  staticTraegerHoehe: 0.08,
  pfette: 1,
  pfettenBreite: 0.06,
  pfettenHoehe: 0.08,
  rinnenHoehe: 0.08,
  rinnenBreite: 0.12,
  qubusRahmenBreite: 0,
  qubusRahmenHoehe: 0,
  eindeckungDachneigung: 0,
  isQubus: false,
  attachment: "wall",
  eaves: false,
  eavesWidth: 0,
  eavesHeight: 0,
  gutterCrossBeam: false,
  indentBar: { left: 0, right: 0 },
  isQuer: false,
  coverStrips: false,
  coverStripWidth: 0.04,
  hasLedStripe: false,
  ledColor: "#ffffff",
  hasDynamicBar: false,
  hasWaterproof: false
};
const VerandaGeometryContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT_GEOMETRY);
function useVerandaGeometry() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(VerandaGeometryContext);
}

const WandSeiteContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(0);
const WandSeiteProvider = WandSeiteContext.Provider;
function useWandSeite() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(WandSeiteContext);
}

const DEFAULT = {
  keilAbschnitt: [-1, -1, -1, -1],
  setKeilAbschnitt: () => {
  },
  sichtschutzHoehe: [{}, {}, {}, {}],
  setSichtschutzHoehe: () => {
  },
  minAufbauHoehe: [{}, {}, {}, {}],
  setMinAufbauHoehe: () => {
  },
  pfostenAnzahlVorne: 2,
  setPfostenAnzahlVorne: () => {
  },
  pfostenAnzahlHinten: 0,
  setPfostenAnzahlHinten: () => {
  }
};
const WandInfoContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT);
function useWandInfo() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(WandInfoContext);
}

const MAX_IDLE = 64;
const cache = /* @__PURE__ */ new Map();
const idleOrder = [];
function markActive(key) {
  const i = idleOrder.indexOf(key);
  if (i !== -1) idleOrder.splice(i, 1);
}
function markIdle(key) {
  markActive(key);
  idleOrder.push(key);
  while (idleOrder.length > MAX_IDLE) {
    const oldest = idleOrder.shift();
    if (oldest === void 0) break;
    const entry = cache.get(oldest);
    if (!entry || entry.owners.size > 0) continue;
    entry.geometry.dispose();
    cache.delete(oldest);
  }
}
function acquireGeometry(key, build, owner) {
  let entry = cache.get(key);
  if (entry) ; else {
    entry = { geometry: build(), owners: /* @__PURE__ */ new Set() };
    cache.set(key, entry);
  }
  entry.owners.add(owner);
  markActive(key);
  return entry.geometry;
}
function releaseGeometry(key, owner) {
  const entry = cache.get(key);
  if (!entry) return;
  entry.owners.delete(owner);
  if (entry.owners.size === 0) markIdle(key);
}
function gkey(n) {
  return (Math.round(n * 1e6) / 1e6).toString();
}
function useCachedGeometry(key, build) {
  return useCachedGeometryOrNull(key, build);
}
function useCachedGeometryOrNull(key, build) {
  const ownerRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  if (ownerRef.current === null) ownerRef.current = Symbol("geometryCacheOwner");
  const owner = ownerRef.current;
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => key === null ? null : acquireGeometry(key, build, owner),
    [key, owner]
  );
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    if (key === null) return;
    return () => releaseGeometry(key, owner);
  }, [key, owner]);
  return geometry;
}

const Box = ({
  args,
  position,
  rotation,
  material,
  children
}) => {
  const [w, h, d] = args;
  const gueltig = !isNaN(w) && !isNaN(h) && !isNaN(d) && w > 0 && h > 0 && d > 0;
  const geometry = useCachedGeometryOrNull(
    gueltig ? `box|${gkey(w)}|${gkey(h)}|${gkey(d)}` : null,
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.BoxGeometry(w, h, d)
  );
  if (!geometry) return null;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      geometry,
      position,
      rotation,
      castShadow: true,
      receiveShadow: true,
      children: children ?? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material })
    }
  );
};

const DEFAULT_SCENE_MODE = {
  nightMode: false,
  shadingMode: false,
  alignment: false
};
const SceneModeContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT_SCENE_MODE);
function useSceneMode() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(SceneModeContext);
}

const WAND_KAMERA_OFFSET = 6;
function WandKlickZiel({ wandSeite, anchor, height }) {
  const setCameraPosition = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useSetCameraPosition();
  const openInstance = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useOpenInstance();
  const selectedRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(false);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    if (selectedRef.current) {
      setCameraPosition(null);
      selectedRef.current = false;
    }
  }, [openInstance.id, setCameraPosition]);
  const handleClick = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((e) => {
    e.stopPropagation();
    selectedRef.current = true;
    const [px2, , pz2] = anchor.position;
    const cy = height / 2;
    const cx = px2 + (wandSeite === 0 ? -WAND_KAMERA_OFFSET : wandSeite === 1 ? WAND_KAMERA_OFFSET : 0);
    const cz = pz2 + (wandSeite === 2 ? -WAND_KAMERA_OFFSET : wandSeite === 3 ? WAND_KAMERA_OFFSET : 0);
    setCameraPosition({
      position: [cx, cy, cz],
      lookAt: [px2, cy, pz2],
      focusType: "static"
    });
  }, [anchor, wandSeite, height, setCameraPosition]);
  const [px, , pz] = anchor.position;
  const [, rotY] = anchor.rotation;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "mesh",
    {
      position: [px, height / 2, pz],
      rotation: [0, rotY, 0],
      onClick: handleClick,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("planeGeometry", { args: [anchor.size.breite, height] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshBasicMaterial", { side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, transparent: true, opacity: 0, depthWrite: false })
      ]
    }
  );
}

function QubusBar({ width, depth, height, rahmenBreite, rahmenHoehe, material, hideFront }) {
  const rH = rahmenHoehe;
  const rB = rahmenBreite;
  const yCenter = height - rH / 2;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    !hideFront && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Box, { position: [0, yCenter, -depth / 2 + rB / 2], args: [width, rH, rB], material }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Box, { position: [0, yCenter, depth / 2 - rB / 2], args: [width, rH, rB], material }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Box, { position: [-width / 2 + rB / 2, yCenter, 0], args: [rB, rH, Math.max(1e-3, depth - 2 * rB)], material }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Box, { position: [width / 2 - rB / 2, yCenter, 0], args: [rB, rH, Math.max(1e-3, depth - 2 * rB)], material })
  ] });
}

function useKonstruktionState(pfostenAnzahlVorneInit, pfostenAnzahlHintenInit) {
  const [pfostenAnzahlVorneCtx, setPfostenAnzahlVorneCtxState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(pfostenAnzahlVorneInit);
  const [pfostenAnzahlHintenCtx, setPfostenAnzahlHintenCtxState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(pfostenAnzahlHintenInit);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    setPfostenAnzahlVorneCtxState(pfostenAnzahlVorneInit);
  }, [pfostenAnzahlVorneInit]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    setPfostenAnzahlHintenCtxState(pfostenAnzahlHintenInit);
  }, [pfostenAnzahlHintenInit]);
  const setPfostenAnzahlVorne = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback(
    (val) => setPfostenAnzahlVorneCtxState((v) => Math.abs(v - val) < 1e-3 ? v : val),
    []
  );
  const setPfostenAnzahlHinten = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback(
    (val) => setPfostenAnzahlHintenCtxState((v) => Math.abs(v - val) < 1e-3 ? v : val),
    []
  );
  const [keilAbschnitt, setKeilAbschnittState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState([-1, -1, -1, -1]);
  const setKeilAbschnitt = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((seite, value) => {
    setKeilAbschnittState((prev) => {
      if (Math.abs(prev[seite] - value) < 1e-3) return prev;
      const next = [...prev];
      next[seite] = value;
      return next;
    });
  }, []);
  const [sichtschutzHoehe, setSichtschutzHoeheState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState([{}, {}, {}, {}]);
  const setSichtschutzHoehe = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((seite, segmentIndex, value) => {
    setSichtschutzHoeheState((prev) => {
      const currentVal = prev[seite][segmentIndex] ?? 0;
      if (Math.abs(currentVal - value) < 1e-3) return prev;
      const next = [...prev];
      next[seite] = { ...next[seite], [segmentIndex]: value };
      return next;
    });
  }, []);
  const [minAufbauHoehe, setMinAufbauHoeheState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState([{}, {}, {}, {}]);
  const setMinAufbauHoehe = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((seite, segmentIndex, value) => {
    setMinAufbauHoeheState((prev) => {
      const currentVal = prev[seite][segmentIndex] ?? 0;
      if (Math.abs(currentVal - value) < 1e-3) return prev;
      const next = [...prev];
      next[seite] = { ...next[seite], [segmentIndex]: value };
      return next;
    });
  }, []);
  const [eindeckungInfo, setEindeckungInfoState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState({
    glasDicke: 8e-3,
    glasLeistenHoehe: 0.02,
    wandanschlussAktiv: false,
    wandanschlussTiefe: 0.1,
    sparrenAnzahl: 6,
    qubusOffset: 0
  });
  const {
    glasDicke,
    glasLeistenHoehe,
    wandanschlussAktiv,
    wandanschlussTiefe,
    sparrenAnzahl: eindeckungSparrenAnzahl,
    qubusOffset
  } = eindeckungInfo;
  const setEindeckungInfo = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback(
    (d, lh, wa, wt, sa, qo) => {
      setEindeckungInfoState({ glasDicke: d, glasLeistenHoehe: lh, wandanschlussAktiv: wa, wandanschlussTiefe: wt, sparrenAnzahl: sa, qubusOffset: qo });
    },
    []
  );
  const [unterEindeckungHoehe, setUnterEindeckungHoeheState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(0);
  const setUnterEindeckungHoehe = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((h) => {
    setUnterEindeckungHoeheState(h);
  }, []);
  const [aussensparrenHoehe, setAussensparrenHoeheState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(0);
  const setAussensparrenHoehe = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback(
    (h) => {
      setAussensparrenHoeheState((v) => Math.abs(v - h) < 1e-4 ? v : h);
    },
    []
  );
  const [sparrenAuflage, setSparrenAuflageState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(0);
  const setSparrenAuflage = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback(
    (v) => {
      setSparrenAuflageState((p) => Math.abs(p - v) < 1e-3 ? p : v);
    },
    []
  );
  const [sparrenHoehe, setSparrenHoeheState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(0.12);
  const setSparrenHoehe = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback(
    (h) => {
      setSparrenHoeheState((p) => Math.abs(p - h) < 1e-4 ? p : h);
    },
    []
  );
  const [lamellenLedData, setLamellenLedDataState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(null);
  const setLamellenLedData = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((data) => {
    setLamellenLedDataState(data);
  }, []);
  return {
    pfostenAnzahlVorneCtx,
    pfostenAnzahlHintenCtx,
    setPfostenAnzahlVorne,
    setPfostenAnzahlHinten,
    keilAbschnitt,
    setKeilAbschnitt,
    sichtschutzHoehe,
    setSichtschutzHoehe,
    minAufbauHoehe,
    setMinAufbauHoehe,
    glasDicke,
    glasLeistenHoehe,
    wandanschlussAktiv,
    wandanschlussTiefe,
    eindeckungSparrenAnzahl,
    qubusOffset,
    setEindeckungInfo,
    unterEindeckungHoehe,
    setUnterEindeckungHoehe,
    aussensparrenHoehe,
    setAussensparrenHoehe,
    sparrenAuflage,
    setSparrenAuflage,
    sparrenHoehe,
    setSparrenHoehe,
    lamellenLedData,
    setLamellenLedData
  };
}

const konstruktionPropsSchema = {
  konstruktionstyp: {
    type: "expression",
    label: "Konstruktionstyp (0=Veranda/Pultdach, 1=Qubus/Flachdach)",
    description: "0 = Veranda (Pultdach mit Wandanschluss). 1 = Qubus (freistehendes Flachdach mit umlaufendem Rahmen)."
  },
  // Abmessungen & Position
  width: { type: "expression", label: "Gesamtbreite (m)", group: "Abmessungen & Position", description: "Außenbreite der Konstruktion von links nach rechts." },
  height: { type: "expression", label: "Durchgangshöhe (m)", group: "Abmessungen & Position", description: "Lichte Höhe vorne (Unterkante Dach / Sparren-Oberkante minus Sparrenhöhe)." },
  depth: { type: "expression", label: "Gesamttiefe (m)", group: "Abmessungen & Position", description: "Außentiefe der Konstruktion von vorne nach hinten." },
  posX: { type: "expression", label: "Position X (m)", group: "Abmessungen & Position", description: "Versatz in Metern entlang der X-Achse (links/rechts)." },
  posY: { type: "expression", label: "Position Y (m)", group: "Abmessungen & Position", description: "Versatz in Metern entlang der Y-Achse (hoch/runter)." },
  posZ: { type: "expression", label: "Position Z (m)", group: "Abmessungen & Position", description: "Versatz in Metern entlang der Z-Achse (vor/zurück)." },
  rotX: { type: "expression", label: "Drehung X (°)", group: "Abmessungen & Position", description: "Rotation um die X-Achse in Grad." },
  rotY: { type: "expression", label: "Drehung Y (°)", group: "Abmessungen & Position", description: "Rotation um die Y-Achse in Grad (Grundriss-Drehung)." },
  rotZ: { type: "expression", label: "Drehung Z (°)", group: "Abmessungen & Position", description: "Rotation um die Z-Achse in Grad." },
  // Dach
  dachneigung: { type: "expression", label: "Dachneigung (°)", group: "Dach", description: "Neigungswinkel des Dachs in Grad. 0 = flach (Qubus), typisch 3–15° für Veranda." },
  dachVorsprung: { type: "expression", label: "Dachvorsprung (m)", group: "Dach", description: "Überstand des Dachs über die Vorderfront hinaus." },
  // Qubus-Rahmen
  rahmenBreite: { type: "expression", label: "Rahmen Breite (m)", group: "Qubus-Rahmen", description: "Querschnitt-Breite der umlaufenden Rahmenbalken (nur Qubus). Ersetzt Schwelle und Pfette." },
  rahmenHoehe: { type: "expression", label: "Rahmen Höhe (m)", group: "Qubus-Rahmen", description: "Querschnitt-Höhe der umlaufenden Rahmenbalken (nur Qubus)." },
  // Statik & Pfetten
  staticTraeger: { type: "expression", label: "Staticträger (0=Nein, 1=Ja)", group: "Statik & Pfetten", description: "Horizontaler Querträger über den vorderen Pfosten. 0 = aus, 1 = an (nur Veranda)." },
  staticTraegerBreite: { type: "expression", label: "Staticträger Breite (m)", group: "Statik & Pfetten", description: "Tiefe des Staticträgers (Z-Richtung)." },
  staticTraegerHoehe: { type: "expression", label: "Staticträger Höhe (m)", group: "Statik & Pfetten", description: "Höhe des Staticträgers (Y-Richtung)." },
  pfette: { type: "expression", label: "Wandpfette (0=Nein, 1=Ja)", group: "Statik & Pfetten", description: "Horizontaler Balken an der Hauswand (hinten). 0 = aus, 1 = an (nur Veranda)." },
  pfettenBreite: { type: "expression", label: "Pfette Breite (m)", group: "Statik & Pfetten", description: "Tiefe der Wandpfette (Z-Richtung)." },
  pfettenHoehe: { type: "expression", label: "Pfette Höhe (m)", group: "Statik & Pfetten", description: "Höhe der Wandpfette (Y-Richtung)." },
  // Bodenschwelle
  schwelle: { type: "expression", label: "Bodenschwelle (0=Nein, 1=Ja)", group: "Bodenschwelle", description: "Abschlussbalken vorne auf Bodenhöhe (Fascia). 0 = aus, 1 = an (nur Veranda)." },
  schwelleBreite: { type: "expression", label: "Schwelle Breite (m)", group: "Bodenschwelle", description: "Tiefe der Bodenschwelle (Z-Richtung)." },
  schwelleHoehe: { type: "expression", label: "Schwelle Höhe (m)", group: "Bodenschwelle", description: "Höhe der Bodenschwelle (Y-Richtung)." }
};

function SeitenKameraEffect(props) {
  useSeitenKamera(props.slotAnchors, props.height, props.filledInstanzen);
  return null;
}
class PluginApiInitGuard extends React.Component {
  state = { hasError: false };
  _retryTimer = null;
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    if (!error.message.includes("not initialized")) return;
    this._retryTimer = setTimeout(() => this.setState({ hasError: false }), 50);
  }
  componentWillUnmount() {
    if (this._retryTimer) clearTimeout(this._retryTimer);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
const byInstanceId = (a, b) => {
  const aId = Number(a.modelAction?.anchoringSelection?.instance?.id ?? 0);
  const bId = Number(b.modelAction?.anchoringSelection?.instance?.id ?? 0);
  return aId - bId;
};
const WAND_SEITE_BY_SLOT = {
  wandLinks: 1,
  wandRechts: 0,
  wandVorne: 2,
  wandHinten: 3
};
function KonstruktionModel(props) {
  const {
    konstruktionstyp = "veranda",
    width: propWidth = 4,
    height: propHeight = 2.5,
    depth: propDepth = 3,
    dachneigung: propDachneigung = 0,
    dachVorsprung: propDachVorsprung = 0,
    schwelle: propSchwelle = 1,
    schwelleBreite: propSchwelleBreite = 0.1,
    schwelleHoehe: propSchwelleHoehe = 0.06,
    staticTraeger: propStaticTraeger = 0,
    staticTraegerBreite: propStaticTraegerBreite = 0.1,
    staticTraegerHoehe: propStaticTraegerHoehe = 0.08,
    pfette: propPfette = 1,
    pfettenBreite: propPfettenBreite = 0.06,
    pfettenHoehe: propPfettenHoehe = 0.08,
    rahmenBreite: propRahmenBreite = 0.1,
    rahmenHoehe: propRahmenHoehe = 0.1,
    materials = {},
    scale,
    slots
  } = props;
  const getVal = (v, fallback) => {
    const valStr = exprVal(v);
    const val = Number(valStr);
    if (v === void 0 || v === null || valStr === "" || isNaN(val)) return fallback;
    return val;
  };
  const kTyp = Number(exprVal(konstruktionstyp)) === 1 ? "qubus" : "veranda";
  const width = Math.max(0.01, getVal(propWidth, 4));
  const height = Math.max(0.01, getVal(propHeight, 2.5));
  const depth = Math.max(0.01, getVal(propDepth, 3));
  const dachneigung = getVal(propDachneigung, 0);
  const dachVorsprung = getVal(propDachVorsprung, 0);
  const schwelle = getVal(propSchwelle, 1);
  const schwelleBreite = Math.max(1e-3, getVal(propSchwelleBreite, 0.1));
  const schwelleHoehe = Math.max(1e-3, getVal(propSchwelleHoehe, 0.06));
  const pfette = getVal(propPfette, 1);
  const pfettenBreite = Math.max(1e-3, getVal(propPfettenBreite, 0.06));
  const pfettenHoehe = Math.max(1e-3, getVal(propPfettenHoehe, 0.08));
  const staticTraeger = getVal(propStaticTraeger, 0);
  const staticTraegerBreite = Math.max(1e-3, getVal(propStaticTraegerBreite, 0.1));
  const staticTraegerHoehe = Math.max(1e-3, getVal(propStaticTraegerHoehe, 0.08));
  const rahmenBreite = Math.max(1e-3, getVal(propRahmenBreite, 0.1));
  const rahmenHoehe = Math.max(1e-3, getVal(propRahmenHoehe, 0.1));
  const DEG2RAD = Math.PI / 180;
  const posX = getVal(props.posX, 0);
  const posY = getVal(props.posY, 0);
  const posZ = getVal(props.posZ, 0);
  const rotX = getVal(props.rotX, 0);
  const rotY = getVal(props.rotY, 0);
  const rotZ = getVal(props.rotZ, 0);
  const nightMode = false;
  const shadingMode = false;
  const alignment = false;
  const position = [posX, posY, posZ];
  const rotation = [rotX * DEG2RAD, rotY * DEG2RAD, rotZ * DEG2RAD];
  const profilMaterial = materials.profil;
  if (profilMaterial) profilMaterial.name = "profil";
  const { hoeheHinten, hoeheVorne } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    try {
      return calcVerandaGeometry(depth, dachneigung, height);
    } catch (e) {
      console.warn("Error calculating veranda geometry", e);
      return { hoeheHinten: height, hoeheVorne: height };
    }
  }, [depth, dachneigung, height]);
  const pfostenSlot = slots?.[KONSTRUKTION_SLOTS.pfosten.id];
  const pfostenSlotProps = pfostenSlot?.[0]?.props;
  const pfostenBreiteVal = Math.max(1e-3, getVal(pfostenSlotProps?.pfostenBreite, 0.1));
  const pfostenTiefeVal = Math.max(1e-3, getVal(pfostenSlotProps?.pfostenTiefe, 0.1));
  const pfostenAnzahlVorneVal = Math.max(2, getVal(pfostenSlotProps?.pfostenAnzahlVorne, 2));
  const pfostenAnzahlHintenVal = Math.max(0, getVal(pfostenSlotProps?.pfostenAnzahlHinten, 2));
  const state = useKonstruktionState(pfostenAnzahlVorneVal, pfostenAnzahlHintenVal);
  const {
    pfostenAnzahlVorneCtx,
    pfostenAnzahlHintenCtx,
    setPfostenAnzahlVorne,
    setPfostenAnzahlHinten,
    keilAbschnitt,
    setKeilAbschnitt,
    sichtschutzHoehe,
    setSichtschutzHoehe,
    minAufbauHoehe,
    setMinAufbauHoehe,
    glasDicke,
    glasLeistenHoehe,
    wandanschlussAktiv,
    wandanschlussTiefe,
    eindeckungSparrenAnzahl,
    qubusOffset,
    setEindeckungInfo,
    unterEindeckungHoehe,
    setUnterEindeckungHoehe,
    aussensparrenHoehe,
    setAussensparrenHoehe,
    sparrenAuflage,
    setSparrenAuflage,
    sparrenHoehe,
    setSparrenHoehe,
    lamellenLedData,
    setLamellenLedData
  } = state;
  const eindeckungSlot = slots?.[KONSTRUKTION_SLOTS.eindeckung.id];
  const rinneSlot = slots?.[KONSTRUKTION_SLOTS.rinne.id];
  const someBeschattungSlot = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => (slots?.[KONSTRUKTION_SLOTS.beschattung.id] ?? []).slice().sort(byInstanceId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slots]
  );
  const ledSlot = slots?.[KONSTRUKTION_SLOTS.led.id];
  const wandLinksSlot = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => (slots?.[KONSTRUKTION_SLOTS.wandLinks.id] ?? []).slice().sort(byInstanceId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slots]
  );
  const wandRechtsSlot = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => (slots?.[KONSTRUKTION_SLOTS.wandRechts.id] ?? []).slice().sort(byInstanceId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slots]
  );
  const wandVorneSlot = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => (slots?.[KONSTRUKTION_SLOTS.wandVorne.id] ?? []).slice().sort(byInstanceId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slots]
  );
  const wandHintenSlot = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => (slots?.[KONSTRUKTION_SLOTS.wandHinten.id] ?? []).slice().sort(byInstanceId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slots]
  );
  const rinnenHoehe = getVal(rinneSlot?.[0]?.props?.rinnenHoehe, 0.08);
  const rinnenBreite = getVal(rinneSlot?.[0]?.props?.rinnenBreite, 0.12);
  const parentGeometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => ({
    width,
    depth,
    height,
    dachVorsprung,
    rinnenHoehe,
    rinnenBreite,
    dachneigung: kTyp === "qubus" ? 0 : dachneigung,
    eindeckungDachneigung: kTyp === "qubus" ? dachneigung : void 0,
    pfostenAnzahlVorne: pfostenAnzahlVorneCtx,
    pfostenAnzahlHinten: pfostenAnzahlHintenCtx,
    pfostenBreite: pfostenBreiteVal,
    pfostenTiefe: pfostenTiefeVal,
    sparrenAnzahl: eindeckungSparrenAnzahl,
    sparrenBreite: 0.06,
    sparrenHoehe,
    sparrenAuflage,
    schwelle: kTyp === "qubus" ? 1 : schwelle,
    schwelleBreite: kTyp === "qubus" ? rahmenBreite : schwelleBreite,
    schwelleHoehe: kTyp === "qubus" ? rahmenHoehe : schwelleHoehe,
    pfette: kTyp === "qubus" ? 1 : pfette,
    pfettenBreite: kTyp === "qubus" ? rahmenBreite : pfettenBreite,
    pfettenHoehe: kTyp === "qubus" ? rahmenHoehe : pfettenHoehe,
    staticTraeger: kTyp === "qubus" ? 0 : staticTraeger,
    staticTraegerBreite,
    staticTraegerHoehe,
    isQubus: kTyp === "qubus",
    innerWidth: kTyp === "qubus" ? width - 2 * rahmenBreite : width,
    innerDepth: kTyp === "qubus" ? depth - 2 * rahmenBreite : depth,
    attachment: kTyp === "qubus" ? "free" : "wall",
    qubusRahmenBreite: kTyp === "qubus" ? rahmenBreite : 0,
    qubusRahmenHoehe: kTyp === "qubus" ? rahmenHoehe : 0,
    hasLedStripe: false
  }), [
    width,
    depth,
    height,
    dachVorsprung,
    rinnenHoehe,
    rinnenBreite,
    kTyp,
    dachneigung,
    pfostenAnzahlVorneCtx,
    pfostenAnzahlHintenCtx,
    pfostenBreiteVal,
    pfostenTiefeVal,
    eindeckungSparrenAnzahl,
    sparrenAuflage,
    sparrenHoehe,
    schwelle,
    schwelleBreite,
    schwelleHoehe,
    pfette,
    pfettenBreite,
    pfettenHoehe,
    staticTraeger,
    staticTraegerBreite,
    staticTraegerHoehe,
    rahmenBreite,
    rahmenHoehe
  ]);
  const slotAnchors = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => calcSlotAnchors(parentGeometry), [parentGeometry]);
  const filledInstanzen = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const result = [];
    for (const inst of wandLinksSlot) {
      result.push(...collectSeitenInstanzen(inst, 1, slotAnchors.wandLinks.position));
    }
    for (const inst of wandRechtsSlot) {
      result.push(...collectSeitenInstanzen(inst, 0, slotAnchors.wandRechts.position));
    }
    wandVorneSlot.forEach((inst, i) => {
      const rawSeg = inst.props?.segmentIndex;
      const segStr = rawSeg !== void 0 ? exprVal(rawSeg) : "";
      const segIdx = segStr !== "" ? Number(segStr) : i;
      const anchor = calcWandSlotAnchor(parentGeometry, 2, segIdx, wandVorneSlot.length);
      result.push(...collectSeitenInstanzen(inst, 2, anchor.position));
    });
    wandHintenSlot.forEach((inst, i) => {
      const rawSeg = inst.props?.segmentIndex;
      const segStr = rawSeg !== void 0 ? exprVal(rawSeg) : "";
      const segIdx = segStr !== "" ? Number(segStr) : i;
      const anchor = calcWandSlotAnchor(parentGeometry, 3, segIdx, wandHintenSlot.length);
      result.push(...collectSeitenInstanzen(inst, 3, anchor.position));
    });
    return result;
  }, [wandLinksSlot, wandRechtsSlot, wandVorneSlot, wandHintenSlot, slotAnchors, parentGeometry]);
  const renderSlotInstance = (inst, fallbackKey, forcedSegmentIndex, slotKey) => {
    const Comp = inst.component;
    if (!Comp) return null;
    const {
      posX: posX2,
      posY: posY2,
      posZ: posZ2,
      rotX: rotX2,
      rotY: rotY2,
      rotZ: rotZ2,
      position: position2,
      rotation: rotation2,
      scale: scale2,
      materials: materials2,
      slots: slots2,
      parentGeometry: _pg,
      slotAnchor: _sa,
      autoAnchor,
      ...otherProps
    } = inst.props ?? {};
    const effectiveProps = { ...otherProps };
    const existingSegIdx = otherProps.segmentIndex !== void 0 ? Number(exprVal(otherProps.segmentIndex)) : -1;
    if (forcedSegmentIndex !== void 0 && existingSegIdx === -1) {
      effectiveProps.segmentIndex = forcedSegmentIndex;
    }
    const propsKey = JSON.stringify(effectiveProps);
    const key = `${fallbackKey}|${propsKey}`;
    const ma = inst.modelAction;
    const wandSeite = slotKey ? WAND_SEITE_BY_SLOT[slotKey] : void 0;
    const segAnzStr = exprVal(effectiveProps.segmentAnzahl);
    const segmentAnzahl = segAnzStr !== "" ? Number(segAnzStr) : void 0;
    const segIdx = effectiveProps.segmentIndex !== void 0 ? Number(exprVal(effectiveProps.segmentIndex)) : -1;
    const anchor = wandSeite !== void 0 ? calcWandSlotAnchor(parentGeometry, wandSeite, segIdx, segmentAnzahl) : slotKey ? slotAnchors[slotKey] : void 0;
    const rendered = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "group",
      {
        userData: {
          modelActionUniqueId: ma?.unique,
          anchoringSelection: ma?.anchoringSelection
        },
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Comp,
          {
            ...effectiveProps,
            id: inst.model?.id,
            instanceId: inst.modelAction?.anchoringSelection?.instance?.id,
            modelAction: inst.modelAction,
            slots: inst.slots,
            parentGeometry,
            slotAnchor: anchor,
            wandSeite
          }
        )
      },
      key
    );
    const autoAnchorVal = exprVal(autoAnchor);
    if (anchor && (autoAnchorVal === "1" || autoAnchorVal === "true")) {
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: anchor.position, rotation: anchor.rotation, children: rendered }, key);
    }
    return rendered;
  };
  const auflageTyp = sparrenAuflage === 1 ? "innenliegend" : "aufliegend";
  const steigung = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(SceneErrorBoundary, { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneModeContext.Provider, { value: { nightMode, shadingMode, alignment }, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandInfoContext.Provider, { value: {
      keilAbschnitt,
      setKeilAbschnitt,
      sichtschutzHoehe,
      setSichtschutzHoehe,
      minAufbauHoehe,
      setMinAufbauHoehe,
      pfostenAnzahlVorne: pfostenAnzahlVorneCtx,
      setPfostenAnzahlVorne,
      pfostenAnzahlHinten: pfostenAnzahlHintenCtx,
      setPfostenAnzahlHinten
    }, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(EindeckungInfoContext.Provider, { value: {
      glasDicke,
      glasLeistenHoehe,
      wandanschlussAktiv,
      wandanschlussTiefe,
      sparrenAnzahl: eindeckungSparrenAnzahl,
      qubusOffset,
      unterEindeckungHoehe,
      setUnterEindeckungHoehe,
      aussensparrenHoehe,
      setAussensparrenHoehe,
      sparrenAuflage,
      setSparrenAuflage,
      sparrenHoehe,
      setSparrenHoehe,
      lamellenLedData,
      setEindeckungInfo,
      setLamellenLedData
    }, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(VerandaGeometryContext.Provider, { value: parentGeometry, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position, rotation, scale, userData: { modelId: props.id }, name: props.name, children: [
        pfostenSlot?.map((inst, i) => renderSlotInstance(inst, `pfosten-${i}`, void 0, "pfosten")),
        kTyp === "qubus" && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          QubusBar,
          {
            width,
            depth,
            height,
            rahmenBreite,
            rahmenHoehe,
            material: profilMaterial,
            hideFront: !!rinneSlot?.length
          }
        ),
        kTyp === "veranda" && (() => {
          const postZMid = dachVorsprung + pfostenTiefeVal / 2;
          const sZOff = schwelleBreite >= pfostenTiefeVal ? schwelleBreite / 2 : pfostenTiefeVal - schwelleBreite / 2;
          const stZOff = postZMid;
          const offsetSparren = auflageTyp === "innenliegend" ? sparrenHoehe : 0;
          const sUK = hoeheVorne + steigung * sZOff;
          const stUK = hoeheVorne + steigung * stZOff - offsetSparren;
          const schwelleY = sUK - schwelleHoehe / 2;
          const staticTraegerY = stUK - staticTraegerHoehe / 2;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
            schwelle === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              Box,
              {
                position: [0, schwelleY || 0, -depth / 2 + sZOff],
                args: [width, schwelleHoehe, Math.max(1e-3, schwelleBreite)],
                material: profilMaterial,
                children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: DEFAULT_FARBEN.holz })
              }
            ),
            staticTraeger === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              Box,
              {
                position: [0, staticTraegerY || 0, -depth / 2 + stZOff],
                args: [width, staticTraegerHoehe, Math.max(1e-3, staticTraegerBreite)],
                material: profilMaterial,
                children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: DEFAULT_FARBEN.holz })
              }
            ),
            pfette === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              Box,
              {
                position: [0, (hoeheHinten || 0) - steigung * (pfettenBreite / 2) - pfettenHoehe / 2, depth / 2 - pfettenBreite / 2],
                args: [width, pfettenHoehe, Math.max(1e-3, pfettenBreite)],
                material: profilMaterial,
                children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: DEFAULT_FARBEN.holz })
              }
            )
          ] });
        })(),
        eindeckungSlot?.map((inst, i) => renderSlotInstance(inst, `eindeckung-${i}`, void 0, "eindeckung")),
        ledSlot?.map((inst, i) => renderSlotInstance(inst, `led-${i}-sa${eindeckungSparrenAnzahl}`, void 0, "led")),
        rinneSlot?.map((inst, i) => renderSlotInstance(inst, `rinne-${i}`, void 0, "rinne")),
        someBeschattungSlot.map((inst, i) => renderSlotInstance(inst, `beschattung-${i}`, i, "beschattung")),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(WandSeiteProvider, { value: 1, children: [
          wandLinksSlot?.map((inst, i) => renderSlotInstance(inst, `wand-l-${i}`, i, "wandLinks")),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandKlickZiel, { wandSeite: 1, anchor: slotAnchors.wandLinks, height: parentGeometry.height })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(WandSeiteProvider, { value: 0, children: [
          wandRechtsSlot?.map((inst, i) => renderSlotInstance(inst, `wand-r-${i}`, i, "wandRechts")),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandKlickZiel, { wandSeite: 0, anchor: slotAnchors.wandRechts, height: parentGeometry.height })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 2, children: wandVorneSlot.map((inst, i) => renderSlotInstance(inst, `wand-v-${i}`, i, "wandVorne")) }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 3, children: wandHintenSlot.map((inst, i) => renderSlotInstance(inst, `wand-h-${i}`, i, "wandHinten")) })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(PluginApiInitGuard, { children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SeitenKameraEffect, { slotAnchors, height: parentGeometry.height, filledInstanzen }) })
  ] });
}
const konstruktionDynamicModel = {
  type: "veranda",
  label: "Konstruktion",
  description: "Konstruktion – Veranda (Pultdach) oder Qubus (Flachdach)",
  defaultProps: {
    slotDefinitions: [...Object.values(KONSTRUKTION_SLOTS)],
    konstruktionstyp: { expression: "0" },
    width: { expression: "4" },
    height: { expression: "2.5" },
    depth: { expression: "3" },
    posX: { expression: "0" },
    posY: { expression: "0" },
    posZ: { expression: "0" },
    rotX: { expression: "0" },
    rotY: { expression: "0" },
    rotZ: { expression: "0" },
    dachneigung: { expression: "0" },
    dachVorsprung: { expression: "0" },
    sparrenAuflage: { expression: "0" },
    rahmenBreite: { expression: "0.1" },
    rahmenHoehe: { expression: "0.1" },
    staticTraeger: { expression: "0" },
    staticTraegerBreite: { expression: "0.1" },
    staticTraegerHoehe: { expression: "0.08" },
    pfette: { expression: "1" },
    pfettenBreite: { expression: "0.06" },
    pfettenHoehe: { expression: "0.08" },
    schwelle: { expression: "1" },
    schwelleBreite: { expression: "0.1" },
    schwelleHoehe: { expression: "0.06" }
  },
  propsDialog: konstruktionPropsSchema,
  component: KonstruktionModel,
  materials: ["profil"],
  disabledForAR: false
};

const DEFAULT_TIER = "Basic";
function productToTier(product) {
  if (!product) return DEFAULT_TIER;
  const p = product.toLowerCase();
  if (p.includes("basic")) return "Basic";
  if (p.includes("pro")) return "Pro";
  if (p.includes("enterprise")) return "Enterprise";
  return DEFAULT_TIER;
}
function useLicenseTier() {
  const app = veranda_mf_2_plugin__loadShare__k3_mf_2_plugin_mf_2_api__loadShare__.useApp();
  return productToTier(app?.product);
}

const TIER_ORDER = { Basic: 0, Pro: 1, Enterprise: 2 };
function hasLicense(current, required) {
  return TIER_ORDER[current] >= TIER_ORDER[required];
}

function useDachGeometrie(input) {
  const {
    gesamtTiefe,
    hoeheVorne,
    hoeheHinten,
    sparrenHoehe,
    quertraegerTiefe: qtVorne,
    quertraegerTiefeHinten: qtHinten,
    auflage,
    dachVorsprung,
    eindeckungDicke
  } = input;
  const innenliegend = auflage === "innenliegend";
  const sparrenTiefe = innenliegend ? gesamtTiefe - dachVorsprung - qtVorne - qtHinten : gesamtTiefe;
  const gesamtHoeheDiff = hoeheHinten - hoeheVorne;
  const steigung = gesamtTiefe > 0 ? gesamtHoeheDiff / gesamtTiefe : 0;
  const hoeheVorneEff = innenliegend ? hoeheVorne + steigung * (dachVorsprung + qtVorne) : hoeheVorne;
  const hoeheHintenEff = innenliegend ? hoeheHinten - steigung * qtHinten : hoeheHinten;
  const hoeheDiff = hoeheHintenEff - hoeheVorneEff;
  const sparrenY = innenliegend ? hoeheVorneEff - sparrenHoehe : hoeheVorne;
  const sparrenOKVorne = innenliegend ? hoeheVorneEff : hoeheVorneEff + sparrenHoehe;
  const sparrenOKHinten = innenliegend ? hoeheHintenEff : hoeheHintenEff + sparrenHoehe;
  const sparrenZ = innenliegend ? -gesamtTiefe / 2 + dachVorsprung + qtVorne : -gesamtTiefe / 2;
  const glasHoeheVorne = sparrenOKVorne + eindeckungDicke / 2;
  const glasHoeheHinten = sparrenOKHinten + eindeckungDicke / 2;
  const effektiveTiefeRoh = innenliegend ? gesamtTiefe - dachVorsprung - qtVorne - qtHinten : gesamtTiefe;
  const glasHDiff = glasHoeheHinten - glasHoeheVorne;
  const glasNeig = Math.atan2(glasHDiff, effektiveTiefeRoh);
  const glasSchraegTiefe = effektiveTiefeRoh / Math.cos(glasNeig);
  const glasZOffset = innenliegend ? (dachVorsprung + qtVorne - qtHinten) / 2 : 0;
  const glasVorderkanteZ = innenliegend ? -gesamtTiefe / 2 + dachVorsprung + qtVorne : -gesamtTiefe / 2;
  const glasHinterkanteZ = innenliegend ? gesamtTiefe / 2 - qtHinten : gesamtTiefe / 2;
  return {
    sparrenTiefe,
    sparrenY,
    sparrenZ,
    sparrenOKVorne,
    sparrenOKHinten,
    hoeheDiff,
    effektiveTiefeRoh,
    glasHoeheVorne,
    glasHoeheHinten,
    glasHDiff,
    glasNeig,
    glasSchraegTiefe,
    glasZOffset,
    glasVorderkanteZ,
    glasHinterkanteZ
  };
}

function useSparrenPositionen(querbalkenBreite, sparrenBreite, sparrenAnzahl, sparrenModus) {
  const alle = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (sparrenAnzahl <= 1) return [0];
    const xAussen = querbalkenBreite / 2 - sparrenBreite / 2;
    if (sparrenAnzahl === 2) return [-xAussen, xAussen];
    const innenBreite = 2 * xAussen;
    const abstand = innenBreite / (sparrenAnzahl - 1);
    return Array.from(
      { length: sparrenAnzahl },
      (_, i) => -xAussen + i * abstand
    );
  }, [querbalkenBreite, sparrenBreite, sparrenAnzahl]);
  const gefiltert = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (sparrenModus === "alle") return alle;
    if (sparrenModus === "nurAussen") {
      if (alle.length <= 2) return alle;
      return [alle[0], alle[alle.length - 1]];
    }
    if (sparrenModus === "nurInnen") {
      if (alle.length <= 2) return [];
      return alle.slice(1, -1);
    }
    return alle;
  }, [alle, sparrenModus]);
  return {
    alle,
    gefiltert,
    aussenLinks: alle[0],
    aussenRechts: alle[alle.length - 1]
  };
}

const GLOW_POWER = {
  core: 2.5,
  halo: 0.6
};
function createGlowTexture(options) {
  const size = options.size ?? 64;
  const { power } = options;
  const data = new Uint8Array(size * size * 4);
  const center = (size - 1) / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - center) / center;
      const dy = (y - center) / center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const alpha = Math.pow(Math.max(0, 1 - dist), power);
      const i = (y * size + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = 255;
      data[i + 3] = Math.round(alpha * 255);
    }
  }
  const tex = new veranda_mf_2_plugin__loadShare__three__loadShare__.DataTexture(data, size, size);
  tex.needsUpdate = true;
  return tex;
}
function useGlowTexture(options) {
  const { size = 64, power } = options;
  const tex = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => createGlowTexture({ size, power }), [size, power]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    tex.dispose();
  }, [tex]);
  return tex;
}
function createConeGlowTexture(power = 2.5) {
  const size = 64;
  const data = new Uint8Array(size * 2 * 4);
  for (let y = 0; y < size; y++) {
    const v = y / (size - 1);
    const alpha = Math.pow(Math.max(0, v), power);
    for (let x = 0; x < 2; x++) {
      const i = (y * 2 + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = 255;
      data[i + 3] = Math.round(alpha * 255);
    }
  }
  const tex = new veranda_mf_2_plugin__loadShare__three__loadShare__.DataTexture(data, 2, size);
  tex.wrapS = veranda_mf_2_plugin__loadShare__three__loadShare__.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}
function useConeGlowTexture(power = 2.5) {
  const tex = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => createConeGlowTexture(power), [power]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    tex.dispose();
  }, [tex]);
  return tex;
}

function GlowShell({ geometry, count, color, opacity, glowTexture, ref }) {
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "instancedMesh",
    {
      ref,
      args: [null, null, count],
      count,
      renderOrder: 1,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: geometry, attach: "geometry" }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshBasicMaterial",
          {
            color,
            map: glowTexture,
            transparent: true,
            opacity,
            blending: veranda_mf_2_plugin__loadShare__three__loadShare__.AdditiveBlending,
            depthWrite: false,
            toneMapped: false,
            side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
          }
        )
      ]
    }
  );
}

function BillboardGlow({
  position,
  color,
  size,
  opacity,
  textureType = "halo",
  power
}) {
  const resolvedPower = power ?? GLOW_POWER[textureType];
  const glowTexture = useGlowTexture({ power: resolvedPower });
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.PlaneGeometry(size, size), [size]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.Billboard, { position, follow: true, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { geometry, renderOrder: 1, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "meshBasicMaterial",
    {
      color,
      map: glowTexture,
      transparent: true,
      opacity,
      blending: veranda_mf_2_plugin__loadShare__three__loadShare__.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
    }
  ) }) });
}

const STRIPE_H = 8e-3;
const STRAHLER_ASPECT = 0.35;
const GLOW_PLANE_OFFSET = STRIPE_H * 0.5 + 1e-3;
function createStripeWedgeGeo(topW, botW, height, length, yOffset) {
  const hw = topW / 2, HW = botW / 2, hl = length / 2;
  const y0 = -yOffset;
  const y1 = -(height + yOffset);
  const pos = new Float32Array([
    -hw,
    y0,
    -hl,
    -hw,
    y0,
    hl,
    -HW,
    y1,
    hl,
    -HW,
    y1,
    -hl,
    // linkes Paneel
    hw,
    y0,
    -hl,
    hw,
    y0,
    hl,
    HW,
    y1,
    hl,
    HW,
    y1,
    -hl
    // rechtes Paneel
  ]);
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0]);
  const geo = new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferGeometry();
  geo.setAttribute("position", new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferAttribute(pos, 3));
  geo.setAttribute("uv", new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferAttribute(uvs, 2));
  geo.setIndex([0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6]);
  geo.computeVertexNormals();
  return geo;
}
function createStripeWedgeGeoQuer(topW, botW, height, length, yOffset) {
  const hw = topW / 2, HW = botW / 2, hl = length / 2;
  const y0 = -yOffset;
  const y1 = -(height + yOffset);
  const pos = new Float32Array([
    -hl,
    y0,
    -hw,
    hl,
    y0,
    -hw,
    hl,
    y1,
    -HW,
    -hl,
    y1,
    -HW,
    // vorderes Paneel
    -hl,
    y0,
    hw,
    hl,
    y0,
    hw,
    hl,
    y1,
    HW,
    -hl,
    y1,
    HW
    // hinteres Paneel
  ]);
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0]);
  const geo = new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferGeometry();
  geo.setAttribute("position", new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferAttribute(pos, 3));
  geo.setAttribute("uv", new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferAttribute(uvs, 2));
  geo.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]);
  geo.computeVertexNormals();
  return geo;
}
function DownLight({ position, ...rest }) {
  const lightRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (!lightRef.current) return;
    const [x, y, z] = position;
    lightRef.current.target.position.set(x, y - 2, z);
    lightRef.current.target.updateMatrixWorld();
  });
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("spotLight", { ref: lightRef, position, ...rest });
}
function LedBeleuchtungModel(props) {
  const tier = useLicenseTier();
  if (!hasLicense(tier, "Enterprise")) return null;
  const { materials = {}, scale } = props;
  const parent = useVerandaGeometry();
  const {
    width,
    depth,
    height,
    sparrenBreite,
    sparrenHoehe,
    sparrenAuflage,
    dachneigung,
    eindeckungDachneigung,
    schwelleBreite,
    pfettenBreite,
    pfostenTiefe,
    schwelle,
    pfette,
    isQubus,
    innerWidth,
    qubusRahmenBreite,
    qubusRahmenHoehe
  } = parent;
  const { sparrenAnzahl: eindeckungSparrenAnzahl, qubusOffset, lamellenLedData } = useEindeckungInfo();
  const sparrenAnzahl = eindeckungSparrenAnzahl > 0 ? eindeckungSparrenAnzahl : parent.sparrenAnzahl || 6;
  const isLamellenQuer = lamellenLedData !== null && lamellenLedData.richtung === 0;
  const isLamellenLaengs = lamellenLedData !== null && lamellenLedData.richtung === 1;
  const getVal = (v, fallback) => {
    const val = Number(exprVal(v));
    return isNaN(val) ? fallback : val;
  };
  const LED_TYP_MAP = ["stripes", "strahler", "rahmen"];
  const ledTyp = LED_TYP_MAP[Math.min(2, Math.max(0, Math.round(getVal(props.ledTyp, 0))))] ?? "stripes";
  const ledMat = materials?.led;
  const ledMatColor = ledMat?.color;
  const ledFarbe = ledMatColor ? "#" + ledMatColor.getHexString() : String(exprVal(props.ledFarbe) || "#ffffff");
  const intensitaet = getVal(props.intensitaet, 1.5);
  const strahlerJedenNten = Math.max(1, Math.round(getVal(props.strahlerJedenNten, 1)));
  const anzahlProSparren = Math.max(1, Math.round(getVal(props.anzahlProSparren, 3)));
  const strahlerForm = getVal(props.strahlerForm, 0) >= 1 ? "eckig" : "rund";
  const strahlerDurchmesser = Math.max(0.02, getVal(props.strahlerDurchmesser, 0.08));
  const stripeJedenNten = Math.max(1, Math.round(getVal(props.stripeJedenNten, 1)));
  const stripeLaenge = Math.max(0, getVal(props.stripeLaenge, 0));
  const stripeBreite = Math.max(5e-3, getVal(props.stripeBreite, 0.04));
  const SEITEN_MAP = ["alle", "linksRechts", "vornHinten"];
  const qubusSeiten = SEITEN_MAP[Math.min(2, Math.max(0, Math.round(getVal(props.qubusSeiten, 0))))] ?? "alle";
  const montageTyp = getVal(props.montageTyp, 0) >= 1 ? "eingebaut" : "aufgebaut";
  const eingebaut = montageTyp === "eingebaut";
  const aussenSparrenLed = getVal(props.aussenSparrenLed, 0) >= 1;
  const bloomAn = getVal(props.bloomAn, 1) >= 1;
  const bloomStaerke = Math.max(0, getVal(props.bloomStaerke, 1));
  const kegelHelligkeit = Math.max(0, Math.min(1, getVal(props.kegelHelligkeit, 0.12)));
  const effDachneigung = eindeckungDachneigung ?? dachneigung;
  const effWidth = isQubus ? innerWidth || width : width;
  const gesamtBreite = effWidth;
  const effDepth = isQubus ? parent.innerDepth || depth : depth;
  const { hoeheVorne: baseHV, hoeheHinten: baseHH } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcVerandaGeometry(effDepth, effDachneigung, height),
    [effDepth, effDachneigung, height]
  );
  const hoeheVorne = baseHV - qubusOffset;
  const hoeheHinten = baseHH - qubusOffset;
  const auflageTyp = sparrenAuflage === 1 ? "innenliegend" : "aufliegend";
  const qtVorne = isQubus ? 0 : sparrenAuflage === 1 ? Number(exprVal(schwelle)) === 1 ? Math.max(schwelleBreite || 0, pfostenTiefe || 0) : 0 : 0;
  const qtHinten = isQubus ? 0 : sparrenAuflage === 1 ? Number(exprVal(pfette)) === 1 ? pfettenBreite || 0 : 0 : 0;
  const { sparrenY, sparrenZ, sparrenTiefe, hoeheDiff } = useDachGeometrie({
    gesamtTiefe: effDepth,
    hoeheVorne,
    hoeheHinten,
    sparrenHoehe: sparrenHoehe || 0.12,
    quertraegerTiefe: qtVorne,
    quertraegerTiefeHinten: qtHinten,
    auflage: auflageTyp,
    dachVorsprung: 0,
    eindeckungDicke: 0
  });
  const neigung = Math.atan2(hoeheDiff, Math.max(1e-3, sparrenTiefe));
  const { alle: sparrenXPos } = useSparrenPositionen(
    gesamtBreite,
    sparrenBreite || 0.06,
    sparrenAnzahl,
    "alle"
  );
  const outerXSet = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (sparrenXPos.length < 2) return /* @__PURE__ */ new Set();
    return /* @__PURE__ */ new Set([sparrenXPos[0], sparrenXPos[sparrenXPos.length - 1]]);
  }, [sparrenXPos]);
  const sHRaw = strahlerDurchmesser * STRAHLER_ASPECT;
  const sH = (isLamellenQuer || isLamellenLaengs) && lamellenLedData ? Math.min(sHRaw, lamellenLedData.lamellenDicke - 2e-3) : sHRaw;
  const rotX = lamellenLedData ? isLamellenQuer ? lamellenLedData.winkelRad : -lamellenLedData.neigungRad : 0;
  const rotZ = lamellenLedData ? isLamellenQuer ? 0 : lamellenLedData.winkelRad : 0;
  const lamellenEuler = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!lamellenLedData) return new veranda_mf_2_plugin__loadShare__three__loadShare__.Euler(0, 0, 0, "XYZ");
    if (isLamellenQuer) return new veranda_mf_2_plugin__loadShare__three__loadShare__.Euler(lamellenLedData.winkelRad, 0, 0, "XYZ");
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.Euler(-lamellenLedData.neigungRad, 0, lamellenLedData.winkelRad, "XYZ");
  }, [lamellenLedData, isLamellenQuer]);
  const lamellenClearance = 2e-3;
  const isLamellenMode = isLamellenQuer || isLamellenLaengs;
  const stripeHEffective = isLamellenMode ? 1e-3 : STRIPE_H;
  const stripeMountOffsetVec = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!lamellenLedData) return new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, 0, 0);
    const off = -lamellenLedData.lamellenDicke / 2 - (eingebaut ? 0 : lamellenClearance) + (eingebaut ? stripeHEffective / 2 : -stripeHEffective / 2);
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, off, 0).applyEuler(lamellenEuler);
  }, [lamellenLedData, eingebaut, lamellenClearance, lamellenEuler, stripeHEffective]);
  const strahlerMountOffsetY = lamellenLedData ? -lamellenLedData.lamellenDicke / 2 - (eingebaut ? 0 : lamellenClearance) + (eingebaut ? sH / 2 : -sH / 2) : 0;
  const actualStripeLen = isLamellenQuer || isLamellenLaengs ? lamellenLedData?.lamellenLaenge ?? 0 : stripeLaenge > 0 ? stripeLaenge : sparrenTiefe / Math.max(1e-3, Math.cos(neigung));
  const stripeGroupY = (isLamellenQuer || isLamellenLaengs) && lamellenLedData ? (lamellenLedData.positionen[0]?.y ?? 0) + stripeMountOffsetVec.y : sparrenY + hoeheDiff / 2 + (eingebaut ? STRIPE_H / 2 : -STRIPE_H / 2);
  const stripeRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const stripeGlowCoreRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const stripeGlowHaloRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const strahlerRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const strahlerGlowCoreRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const strahlerGlowHaloRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const dummy = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D(), []);
  const glowTextureCore = useGlowTexture({ power: GLOW_POWER.core });
  const glowTextureCone = useConeGlowTexture(0.7);
  const glowCoreWidthMult = isLamellenQuer || isLamellenLaengs ? 2 : 6;
  const stripeGlowCoreGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const geo = new veranda_mf_2_plugin__loadShare__three__loadShare__.PlaneGeometry(stripeBreite * glowCoreWidthMult, actualStripeLen);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, -GLOW_PLANE_OFFSET, 0);
    return geo;
  }, [stripeBreite, actualStripeLen, glowCoreWidthMult]);
  const stripeGlowHaloGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const h = Math.max(0.3, stripeGroupY);
    const topW = stripeBreite;
    const botW = h * 1.3;
    return createStripeWedgeGeo(topW, botW, h, actualStripeLen, GLOW_PLANE_OFFSET);
  }, [stripeGroupY, stripeBreite, actualStripeLen]);
  const strahlerGlowCoreGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const geo = new veranda_mf_2_plugin__loadShare__three__loadShare__.CircleGeometry(strahlerDurchmesser * 3, 16);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, -(sH * 0.5 + 1e-3), 0);
    return geo;
  }, [strahlerDurchmesser, sH]);
  const stripeGlowCoreGeoQuer = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const geo = new veranda_mf_2_plugin__loadShare__three__loadShare__.PlaneGeometry(actualStripeLen, stripeBreite * glowCoreWidthMult);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, -GLOW_PLANE_OFFSET, 0);
    return geo;
  }, [stripeBreite, actualStripeLen, glowCoreWidthMult]);
  const stripeGlowHaloGeoQuer = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const h = Math.max(0.3, stripeGroupY);
    const topW = stripeBreite;
    const botW = h * 1.3;
    return createStripeWedgeGeoQuer(topW, botW, h, actualStripeLen, GLOW_PLANE_OFFSET);
  }, [stripeGroupY, stripeBreite, actualStripeLen]);
  const strahlerGlowHaloGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const h = Math.max(0.3, sparrenY + hoeheDiff / 2 - sH / 2);
    const topR = strahlerDurchmesser / 2;
    const botR = h * 1.4;
    const geo = new veranda_mf_2_plugin__loadShare__three__loadShare__.CylinderGeometry(topR, botR, h, 48, 4, true);
    geo.translate(0, -(h / 2 + sH / 2 + 1e-3), 0);
    return geo;
  }, [sparrenY, hoeheDiff, sH, strahlerDurchmesser]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    stripeGlowCoreGeo.dispose();
    stripeGlowHaloGeo.dispose();
    strahlerGlowCoreGeo.dispose();
    stripeGlowCoreGeoQuer.dispose();
    stripeGlowHaloGeoQuer.dispose();
    strahlerGlowHaloGeo.dispose();
  }, [stripeGlowCoreGeo, stripeGlowHaloGeo, strahlerGlowCoreGeo, stripeGlowCoreGeoQuer, stripeGlowHaloGeoQuer, strahlerGlowHaloGeo]);
  const filteredStripeX = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => sparrenXPos.filter((x, i) => i % stripeJedenNten === 0 && (aussenSparrenLed || !outerXSet.has(x))), [sparrenXPos, stripeJedenNten, aussenSparrenLed, outerXSet]);
  const filteredStrahlerX = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => sparrenXPos.filter((x, i) => i % strahlerJedenNten === 0 && (aussenSparrenLed || !outerXSet.has(x))), [sparrenXPos, strahlerJedenNten, aussenSparrenLed, outerXSet]);
  const filteredLamellenQuer = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => isLamellenQuer && lamellenLedData ? lamellenLedData.positionen.filter((_, i) => i % stripeJedenNten === 0) : [], [isLamellenQuer, lamellenLedData, stripeJedenNten]);
  const filteredStrahlerQuer = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => isLamellenQuer && lamellenLedData ? lamellenLedData.positionen.filter((_, i) => i % strahlerJedenNten === 0) : [], [isLamellenQuer, lamellenLedData, strahlerJedenNten]);
  const filteredLamellenLaengs = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => isLamellenLaengs && lamellenLedData ? lamellenLedData.positionen.filter((_, i) => i % stripeJedenNten === 0) : [], [isLamellenLaengs, lamellenLedData, stripeJedenNten]);
  const filteredStrahlerLaengs = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => isLamellenLaengs && lamellenLedData ? lamellenLedData.positionen.filter((_, i) => i % strahlerJedenNten === 0) : [], [isLamellenLaengs, lamellenLedData, strahlerJedenNten]);
  const stripeCount = isLamellenQuer ? filteredLamellenQuer.length : isLamellenLaengs ? filteredLamellenLaengs.length : filteredStripeX.length;
  const strahlerPositionen = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const pos = [];
    if (isLamellenQuer && lamellenLedData) {
      const halfLen = lamellenLedData.lamellenLaenge / 2;
      filteredStrahlerQuer.forEach(({ y, z }) => {
        for (let j = 0; j < anzahlProSparren; j++) {
          const t = (j + 0.5) / anzahlProSparren;
          const xLocal = -halfLen + t * lamellenLedData.lamellenLaenge;
          const off = new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(xLocal, strahlerMountOffsetY, 0).applyEuler(lamellenEuler);
          pos.push([off.x, y + off.y, z + off.z]);
        }
      });
    } else if (isLamellenLaengs && lamellenLedData) {
      const halfLen = lamellenLedData.lamellenLaenge / 2;
      filteredStrahlerLaengs.forEach(({ x, y, z }) => {
        for (let j = 0; j < anzahlProSparren; j++) {
          const t = (j + 0.5) / anzahlProSparren;
          const zLocal = -halfLen + t * lamellenLedData.lamellenLaenge;
          const off = new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, strahlerMountOffsetY, zLocal).applyEuler(lamellenEuler);
          pos.push([x + off.x, y + off.y, z + off.z]);
        }
      });
    } else {
      filteredStrahlerX.forEach((xPos) => {
        for (let j = 0; j < anzahlProSparren; j++) {
          const t = (j + 0.5) / anzahlProSparren;
          const zW = sparrenZ + t * sparrenTiefe;
          const yBot = sparrenY + t * hoeheDiff;
          const yCenter = eingebaut ? yBot + sH / 2 : yBot - sH / 2;
          pos.push([xPos, yCenter, zW]);
        }
      });
    }
    return pos;
  }, [isLamellenQuer, isLamellenLaengs, lamellenLedData, filteredStrahlerQuer, filteredStrahlerLaengs, filteredStrahlerX, anzahlProSparren, lamellenEuler, strahlerMountOffsetY, sparrenZ, sparrenTiefe, sparrenY, hoeheDiff, eingebaut, sH]);
  const totalStrahlerCount = strahlerPositionen.length;
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    const refs = [stripeRef, stripeGlowCoreRef, stripeGlowHaloRef].filter((r) => r.current);
    if (refs.length === 0) return;
    if (isLamellenQuer && lamellenLedData) {
      filteredLamellenQuer.forEach(({ y, z }, i) => {
        dummy.position.set(stripeMountOffsetVec.x, y + stripeMountOffsetVec.y, z + stripeMountOffsetVec.z);
        dummy.rotation.set(rotX, 0, rotZ);
        dummy.updateMatrix();
        refs.forEach((r) => {
          r.current.instanceMatrix.setUsage(veranda_mf_2_plugin__loadShare__three__loadShare__.DynamicDrawUsage);
          r.current.setMatrixAt(i, dummy.matrix);
        });
      });
    } else if (isLamellenLaengs && lamellenLedData) {
      filteredLamellenLaengs.forEach(({ x, y, z }, i) => {
        dummy.position.set(x + stripeMountOffsetVec.x, y + stripeMountOffsetVec.y, z + stripeMountOffsetVec.z);
        dummy.rotation.set(rotX, 0, rotZ);
        dummy.updateMatrix();
        refs.forEach((r) => {
          r.current.instanceMatrix.setUsage(veranda_mf_2_plugin__loadShare__three__loadShare__.DynamicDrawUsage);
          r.current.setMatrixAt(i, dummy.matrix);
        });
      });
    } else {
      const sy = sparrenY + hoeheDiff / 2 + (eingebaut ? STRIPE_H / 2 : -STRIPE_H / 2);
      const sz = sparrenZ + sparrenTiefe / 2;
      filteredStripeX.forEach((xPos, i) => {
        dummy.position.set(xPos, sy, sz);
        dummy.rotation.set(-neigung, 0, 0);
        dummy.updateMatrix();
        refs.forEach((r) => {
          r.current.instanceMatrix.setUsage(veranda_mf_2_plugin__loadShare__three__loadShare__.DynamicDrawUsage);
          r.current.setMatrixAt(i, dummy.matrix);
        });
        if (aussenSparrenLed) {
          stripeRef.current?.setColorAt(i, outerXSet.has(xPos) ? outerLedBodyColor : ledBodyColor);
        }
      });
    }
    refs.forEach((r) => {
      r.current.instanceMatrix.needsUpdate = true;
      r.current.computeBoundingSphere();
    });
    if (aussenSparrenLed && stripeRef.current?.instanceColor) {
      stripeRef.current.instanceColor.needsUpdate = true;
    }
  }, [isLamellenQuer, isLamellenLaengs, lamellenLedData, filteredLamellenQuer, filteredLamellenLaengs, filteredStripeX, rotX, rotZ, stripeMountOffsetVec, sparrenY, hoeheDiff, eingebaut, sparrenZ, sparrenTiefe, neigung, dummy, aussenSparrenLed, outerXSet, outerLedBodyColor, ledBodyColor]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    const refs = [strahlerRef, strahlerGlowCoreRef, strahlerGlowHaloRef].filter((r) => r.current);
    if (refs.length === 0) return;
    const rot = isLamellenQuer || isLamellenLaengs ? [rotX, 0, rotZ] : [0, 0, 0];
    const isStdMode = !isLamellenQuer && !isLamellenLaengs;
    strahlerPositionen.forEach(([x, y, z], idx) => {
      dummy.position.set(x, y, z);
      dummy.rotation.set(rot[0], rot[1], rot[2]);
      dummy.updateMatrix();
      refs.forEach((r) => {
        r.current.instanceMatrix.setUsage(veranda_mf_2_plugin__loadShare__three__loadShare__.DynamicDrawUsage);
        r.current.setMatrixAt(idx, dummy.matrix);
      });
      if (aussenSparrenLed && isStdMode) {
        strahlerRef.current?.setColorAt(idx, outerXSet.has(x) ? outerLedBodyColor : ledBodyColor);
      }
    });
    refs.forEach((r) => {
      r.current.instanceMatrix.needsUpdate = true;
      r.current.computeBoundingSphere();
    });
    if (aussenSparrenLed && isStdMode && strahlerRef.current?.instanceColor) {
      strahlerRef.current.instanceColor.needsUpdate = true;
    }
  }, [strahlerPositionen, isLamellenQuer, isLamellenLaengs, rotX, rotZ, dummy, aussenSparrenLed, outerXSet, outerLedBodyColor, ledBodyColor]);
  const ledBodyColor = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.Color(ledFarbe).multiplyScalar(Math.max(1, bloomStaerke * 3)),
    [ledFarbe, bloomStaerke]
  );
  const outerLedBodyColor = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.Color(ledFarbe).multiplyScalar(Math.max(0.5, bloomStaerke * 1.5)),
    [ledFarbe, bloomStaerke]
  );
  const renderMat = () => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "meshBasicMaterial",
    {
      color: ledBodyColor,
      toneMapped: false,
      polygonOffset: isLamellenMode,
      polygonOffsetFactor: isLamellenMode ? 2 : 0,
      polygonOffsetUnits: isLamellenMode ? 4 : 0
    }
  );
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { scale, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { scale: [0, 0, 0], children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("instancedMesh", { args: [void 0, void 0, 1], count: 1, frustumCulled: false, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [0.01, 0.01, 0.01] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshBasicMaterial", { toneMapped: false })
      ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("instancedMesh", { args: [void 0, void 0, 1], count: 1, frustumCulled: false, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [0.01, 0.01, 0.01] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshBasicMaterial",
          {
            map: glowTextureCore,
            transparent: true,
            blending: veranda_mf_2_plugin__loadShare__three__loadShare__.AdditiveBlending,
            depthWrite: false,
            toneMapped: false,
            side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "group",
      {
        position: [0, stripeGroupY - STRIPE_H, sparrenZ + sparrenTiefe / 2],
        rotation: [-neigung, 0, 0],
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "rectAreaLight",
          {
            color: ledFarbe,
            intensity: intensitaet * 3,
            width: gesamtBreite,
            height: actualStripeLen,
            rotation: [-Math.PI / 2, 0, 0]
          }
        )
      }
    ),
    ledTyp === "stripes" && stripeCount > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
        "instancedMesh",
        {
          ref: stripeRef,
          args: [null, null, stripeCount],
          count: stripeCount,
          castShadow: true,
          children: [
            isLamellenQuer ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [actualStripeLen, stripeHEffective, stripeBreite] }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [stripeBreite, stripeHEffective, actualStripeLen] }),
            renderMat()
          ]
        },
        `${isLamellenQuer ? "quer" : "std"}-${stripeCount}`
      ),
      bloomAn && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        GlowShell,
        {
          ref: stripeGlowCoreRef,
          geometry: isLamellenQuer ? stripeGlowCoreGeoQuer : stripeGlowCoreGeo,
          count: stripeCount,
          color: ledFarbe,
          opacity: Math.min(1, 1 * bloomStaerke),
          glowTexture: glowTextureCore
        },
        `${isLamellenQuer ? "quer" : "std"}-${stripeCount}-glow-core`
      ),
      bloomAn && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        GlowShell,
        {
          ref: stripeGlowHaloRef,
          geometry: isLamellenQuer ? stripeGlowHaloGeoQuer : stripeGlowHaloGeo,
          count: stripeCount,
          color: ledFarbe,
          opacity: kegelHelligkeit * bloomStaerke,
          glowTexture: glowTextureCone
        },
        `${isLamellenQuer ? "quer" : "std"}-${stripeCount}-glow-cone`
      )
    ] }),
    ledTyp === "strahler" && totalStrahlerCount > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
        "instancedMesh",
        {
          ref: strahlerRef,
          args: [null, null, totalStrahlerCount],
          count: totalStrahlerCount,
          castShadow: true,
          children: [
            strahlerForm === "rund" ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [strahlerDurchmesser / 2, strahlerDurchmesser / 2, sH, 16] }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [strahlerDurchmesser, sH, strahlerDurchmesser] }),
            renderMat()
          ]
        },
        `${strahlerForm}-${totalStrahlerCount}`
      ),
      bloomAn && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        GlowShell,
        {
          ref: strahlerGlowCoreRef,
          geometry: strahlerGlowCoreGeo,
          count: totalStrahlerCount,
          color: ledFarbe,
          opacity: Math.min(1, 1 * bloomStaerke),
          glowTexture: glowTextureCore
        },
        `${strahlerForm}-${totalStrahlerCount}-glow-core`
      ),
      bloomAn && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        GlowShell,
        {
          ref: strahlerGlowHaloRef,
          geometry: strahlerGlowHaloGeo,
          count: totalStrahlerCount,
          color: ledFarbe,
          opacity: kegelHelligkeit * bloomStaerke,
          glowTexture: glowTextureCone
        },
        `${strahlerForm}-${totalStrahlerCount}-glow-cone`
      ),
      bloomAn && strahlerPositionen.map((pos, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        BillboardGlow,
        {
          position: pos,
          color: ledFarbe,
          size: strahlerDurchmesser * 2.5,
          opacity: Math.min(1, 0.9 * bloomStaerke),
          textureType: "core"
        },
        i
      ))
    ] }),
    ledTyp === "rahmen" && isQubus && (() => {
      const rB = qubusRahmenBreite || 0.1;
      const rH = qubusRahmenHoehe || 0.1;
      const yPos = height - rH - STRIPE_H / 2;
      const innerD = Math.max(0.01, depth - 2 * rB);
      const vnActive = qubusSeiten === "alle" || qubusSeiten === "vornHinten";
      const lrActive = qubusSeiten === "alle" || qubusSeiten === "linksRechts";
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
        vnActive && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, yPos, -(depth / 2 - rB / 2)], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [width, STRIPE_H, stripeBreite] }),
            renderMat()
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, yPos, depth / 2 - rB / 2], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [width, STRIPE_H, stripeBreite] }),
            renderMat()
          ] })
        ] }),
        lrActive && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [-(width / 2 - rB / 2), yPos, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [stripeBreite, STRIPE_H, innerD] }),
            renderMat()
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [width / 2 - rB / 2, yPos, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [stripeBreite, STRIPE_H, innerD] }),
            renderMat()
          ] })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          DownLight,
          {
            color: ledFarbe,
            intensity: intensitaet * 0.5,
            distance: Math.max(width, depth) + 1,
            decay: 2,
            angle: 0.75,
            penumbra: 0.5,
            position: [0, yPos, 0]
          }
        )
      ] });
    })()
  ] });
}
const ledBeleuchtungPropsSchema = {
  // ── Typ ──
  aussenSparrenLed: {
    type: "expression",
    label: "Außensparren LED (0=nein, 1=ja/halbe Helligkeit)",
    description: "(0 = keine LED an Außensparren, 1 = LED an Außensparren mit halber Helligkeit)"
  },
  ledTyp: {
    type: "expression",
    label: "LED Typ (0=Stripe, 1=Strahler, 2=Rahmen)",
    description: "(0 = LED Stripes, 1 = LED Strahler, 2 = LED Stripe im Rahmen)"
  },
  montageTyp: {
    type: "expression",
    label: "Montage (0=unter Sparren, 1=in Sparren)",
    description: "(0 = aufgebaut unter Sparren, 1 = eingebaut in Sparren)"
  },
  // ── Strahler ──
  strahlerJedenNten: {
    type: "expression",
    label: "Jeden n-ten Sparren (1=jeden, 2=jeden 2., 3=jeden 3.)",
    description: "(1 = jeden, 2 = jeden 2., 3 = jeden 3. Sparren)",
    group: "LED Strahler"
  },
  anzahlProSparren: {
    type: "expression",
    label: "Anzahl pro Sparren (Stück)",
    description: "(Strahler pro Sparren, gleichmäßig entlang der Sparrenlänge verteilt)",
    group: "LED Strahler"
  },
  strahlerForm: {
    type: "expression",
    label: "Strahler Form (0=Rund, 1=Eckig)",
    description: "(0 = Rund, 1 = Eckig)",
    group: "LED Strahler"
  },
  strahlerDurchmesser: {
    type: "expression",
    label: "Strahler Durchmesser (m)",
    description: "(Außendurchmesser des Strahlergehäuses in Metern, z.B. 0.08)",
    group: "LED Strahler"
  },
  // ── Stripes ──
  stripeJedenNten: {
    type: "expression",
    label: "Jeden n-ten Sparren (1=jeden, 2=jeden 2., 3=jeden 3.)",
    description: "(1 = jeden, 2 = jeden 2., 3 = jeden 3. Sparren)",
    group: "LED Stripes"
  },
  stripeLaenge: {
    type: "expression",
    label: "Stripe Länge (m)",
    description: "(Länge des Leuchtstreifens in Metern; 0 = automatisch volle Sparrenlänge)",
    group: "LED Stripes"
  },
  stripeBreite: {
    type: "expression",
    label: "Stripe Breite (m)",
    description: "(Breite des LED-Profils in Metern, z.B. 0.04)",
    group: "LED Stripes"
  },
  // ── Rahmen Stripes ──
  qubusSeiten: {
    type: "expression",
    label: "Rahmen Seiten (0=alle, 1=linksRechts, 2=vornHinten)",
    description: "(0 = Alle Seiten, 1 = Links & Rechts, 2 = Vorne & Hinten)",
    group: "Rahmen Stripes"
  },
  // ── Leuchteinstellungen ──
  ledFarbe: {
    type: "basic",
    label: "LED Farbe (Hex, z.B. #ffffff)",
    description: "(Leuchtfarbe als Hex-Wert, z.B. #ffffff)",
    group: "Leuchteinstellungen"
  },
  intensitaet: {
    type: "expression",
    label: "Helligkeit (Multiplikator)",
    description: "(Leuchtkraft der Lichtquellen: 0 = aus, 1.5 = Standard, 5 = maximal)",
    group: "Leuchteinstellungen"
  },
  bloomAn: {
    type: "expression",
    label: "Glow-Effekt (0=Aus, 1=An)",
    description: "(1 = An, 0 = Aus)",
    group: "Leuchteinstellungen"
  },
  bloomStaerke: {
    type: "expression",
    label: "Glow-Stärke (Multiplikator)",
    description: "(Intensität des Leuchtscheins: 0 = kein Glow, 1 = Standard, 2 = maximal)",
    group: "Leuchteinstellungen"
  },
  kegelHelligkeit: {
    type: "expression",
    label: "Kegel-Helligkeit (0–1)",
    description: "(Lichtkegel-Opacity: 0 = unsichtbar, 0.12 = Standard, 1 = maximal)",
    group: "Leuchteinstellungen"
  }
};
const ledStripeDynamicModel = {
  type: "ledBeleuchtung",
  label: "LED-Beleuchtung",
  description: "Beleuchtung – LED Strahler oder Stripes an den Sparren",
  materials: ["led"],
  disabledForAR: true,
  requiredLicense: "Enterprise",
  defaultProps: {
    aussenSparrenLed: { expression: "0" },
    ledTyp: { expression: "0" },
    montageTyp: { expression: "0" },
    ledFarbe: "#ffffff",
    intensitaet: { expression: "1.5" },
    strahlerJedenNten: { expression: "1" },
    anzahlProSparren: { expression: "3" },
    strahlerForm: { expression: "0" },
    strahlerDurchmesser: { expression: "0.08" },
    stripeJedenNten: { expression: "1" },
    stripeLaenge: { expression: "0" },
    stripeBreite: { expression: "0.04" },
    qubusSeiten: { expression: "0" },
    bloomAn: { expression: "1" },
    bloomStaerke: { expression: "1.0" },
    kegelHelligkeit: { expression: "0.12" }
  },
  propsDialog: ledBeleuchtungPropsSchema,
  component: LedBeleuchtungModel
};

let state = { aktiv: false, grad: 85 };
const listeners = /* @__PURE__ */ new Set();
const orbitLimitStore = {
  get: () => state,
  set: (aktiv, grad) => {
    if (state.aktiv === aktiv && state.grad === grad) return;
    state = { aktiv, grad };
    listeners.forEach((l) => l());
  },
  subscribe: (cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }
};
function useOrbitLimit() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useSyncExternalStore(orbitLimitStore.subscribe, orbitLimitStore.get);
}

function normalizeAngleDeg(deg) {
  const m = deg % 360;
  return m < 0 ? m + 360 : m;
}
function berechneTransparenz(angleDeg, beginAngle, endAngle, transition, maxTransparency) {
  if (angleDeg < beginAngle || angleDeg > endAngle) return 0;
  const rampeBreite = Math.max(transition, 0);
  const einblendeEnde = beginAngle + rampeBreite;
  const ausblendeStart = endAngle - rampeBreite;
  if (angleDeg <= einblendeEnde) {
    const progress = rampeBreite > 0 ? (angleDeg - beginAngle) / rampeBreite : 1;
    return Math.min(progress, 1) * maxTransparency;
  }
  if (angleDeg >= ausblendeStart) {
    const progress = rampeBreite > 0 ? (angleDeg - ausblendeStart) / rampeBreite : 1;
    return maxTransparency * (1 - Math.min(progress, 1));
  }
  return maxTransparency;
}
const _center = new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3();
function HouseTransparencyGroup({
  slotInstances,
  enabled,
  beginAngle,
  endAngle,
  transition,
  maxTransparency
}) {
  const groupRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const originalPropsRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(/* @__PURE__ */ new Map());
  const materialsRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef([]);
  const dirtyRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(true);
  const loggedRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(false);
  const instanceKey = (slotInstances ?? []).map((inst, i) => String(inst.model?.id ?? i)).join("|");
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    const originals = originalPropsRef.current;
    for (const mat of materialsRef.current) {
      const orig = originals.get(mat);
      if (!orig) continue;
      mat.transparent = orig.transparent;
      mat.opacity = orig.opacity;
      mat.depthWrite = orig.depthWrite;
    }
    originalPropsRef.current = /* @__PURE__ */ new Map();
    materialsRef.current = [];
    dirtyRef.current = true;
  }, [instanceKey]);
  veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useFrame(({ camera }) => {
    const group = groupRef.current;
    if (!group) return;
    if (dirtyRef.current) {
      const originals2 = originalPropsRef.current;
      const found = [];
      group.traverse((obj) => {
        const mesh = obj;
        if (!mesh.isMesh || !mesh.material) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const mat of mats) {
          if (!originals2.has(mat)) {
            originals2.set(mat, {
              transparent: mat.transparent,
              opacity: mat.opacity,
              depthWrite: mat.depthWrite
            });
          }
          found.push(mat);
        }
      });
      if (found.length > 0) {
        materialsRef.current = found;
        dirtyRef.current = false;
        console.log("[HouseTransparency] Materialien eingesammelt:", found.length, "| enabled:", enabled);
      } else if (!loggedRef.current) {
        console.log("[HouseTransparency] group.children:", group.children.length, "| slotInstances:", slotInstances?.length ?? 0);
        loggedRef.current = true;
      }
    }
    const materials = materialsRef.current;
    if (materials.length === 0) return;
    let transparency = 0;
    if (enabled) {
      group.getWorldPosition(_center);
      const angleRad = Math.atan2(camera.position.x - _center.x, camera.position.z - _center.z);
      const angleDeg = normalizeAngleDeg(angleRad * 180 / Math.PI + 180);
      transparency = berechneTransparenz(angleDeg, beginAngle, endAngle, transition, maxTransparency);
      if (!loggedRef.current) {
        console.log("[HouseTransparency] angleDeg:", angleDeg.toFixed(1), "| transparency:", transparency.toFixed(3), "| range:", beginAngle, "-", endAngle);
        loggedRef.current = true;
      }
    } else if (!loggedRef.current) {
      console.log("[HouseTransparency] enabled=false, materials:", materials.length);
      loggedRef.current = true;
    }
    const originals = originalPropsRef.current;
    for (const mat of materials) {
      const original = originals.get(mat);
      if (!original) continue;
      const shouldBeTransparent = transparency > 1e-3 ? true : original.transparent;
      if (mat.transparent !== shouldBeTransparent) {
        mat.transparent = shouldBeTransparent;
        mat.needsUpdate = true;
      }
      mat.opacity = original.opacity * (1 - transparency);
      mat.depthWrite = transparency >= 0.5 ? false : original.depthWrite;
    }
  });
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { ref: groupRef, children: (slotInstances ?? []).map((inst, i) => {
    const Comp = inst.component;
    if (!Comp) return null;
    const instanceId = inst.model?.id;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneErrorBoundary, { children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react__loadShare__.Suspense, { fallback: null, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Comp,
      {
        ...inst.props,
        id: instanceId,
        modelAction: inst.modelAction,
        slots: inst.slots
      }
    ) }) }, String(instanceId ?? i));
  }) });
}

function SceneSkyBackground() {
  const { isNight, lightPosition, lightColor } = useSceneEnvironment();
  if (isNight) {
    const [lx, ly, lz] = lightPosition;
    const len = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;
    const md = 60;
    const moonPos = [lx / len * md, ly / len * md, lz / len * md];
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { renderOrder: -1, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("sphereGeometry", { args: [75, 16, 16] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshBasicMaterial", { color: 329743, side: 2, depthWrite: false })
      ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.Stars, { radius: 60, depth: 20, count: 5e3, factor: 4, saturation: 0, fade: true }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: moonPos, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("sphereGeometry", { args: [3, 16, 16] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshStandardMaterial",
          {
            color: 0,
            emissive: lightColor,
            emissiveIntensity: 2
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.Sky,
    {
      sunPosition: lightPosition,
      turbidity: 4,
      rayleigh: 3,
      mieCoefficient: 5e-3,
      mieDirectionalG: 0.8,
      distance: 80
    }
  );
}

const PRESETS = {
  1: {
    // Tag
    intensityScale: 1,
    ambientIntensity: 0.5,
    ambientColor: "#ffffff",
    isNight: false
  },
  2: {
    // Nacht
    intensityScale: 0.08,
    ambientIntensity: 0.03,
    ambientColor: "#112233",
    isNight: true
  }
};
function SceneEnvironmentModel(props) {
  const preset = Number(exprVal(props.preset)) || 0;
  const orbitAzimuthAktiv = numVal(props.orbitAzimuthAktiv, 0) > 0;
  const orbitAzimuthGrad = numVal(props.orbitAzimuthGrad, 85);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    orbitLimitStore.set(orbitAzimuthAktiv, orbitAzimuthGrad);
    return () => orbitLimitStore.set(false, 85);
  }, [orbitAzimuthAktiv, orbitAzimuthGrad]);
  const mats = props.materials ?? {};
  const hausTransparenzAktiv = numVal(props.hausTransparenzAktiv, 0) > 0;
  const hausTransparenzBeginWinkel = numVal(props.hausTransparenzBeginWinkel, 88);
  const hausTransparenzEndWinkel = numVal(props.hausTransparenzEndWinkel, 272);
  const hausTransparenzUebergang = numVal(props.hausTransparenzUebergang, 45);
  const hausTransparenzMax = numVal(props.hausTransparenzMax, 0.98);
  const hausSlotInstanzen = props.slots?.[SCENE_SLOTS.haus.id];
  const envValues = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const getNum = (val, fallback) => {
      const v = exprVal(val);
      return v === void 0 || v === null || v === "" ? fallback : Number(v);
    };
    const intensityScale = preset !== 0 && PRESETS[preset] ? PRESETS[preset].intensityScale : 1;
    const intensity = getNum(props.intensity, 2) * intensityScale;
    const lightPosition = [
      getNum(props.lightPosX, 5),
      getNum(props.lightPosY, 30),
      getNum(props.lightPosZ, -10)
    ];
    const shadowBias = getNum(props.shadowBias, -2e-4);
    const isNight = preset === 2;
    const mat = isNight ? mats.mond : mats.sonne;
    const lightColor = mat?.color ? "#" + mat.color.getHexString() : isNight ? "#aabbcc" : "#fff5e0";
    const envIntensity = getNum(props.envIntensity, 0.4);
    if (preset !== 0 && PRESETS[preset]) {
      const p = PRESETS[preset];
      return {
        intensity,
        lightColor,
        lightPosition,
        envIntensity,
        ambientIntensity: p.ambientIntensity ?? 0.5,
        ambientColor: p.ambientColor ?? "#ffffff",
        shadowBias,
        isNight: p.isNight ?? false,
        _provided: true
      };
    }
    return {
      intensity,
      lightColor,
      lightPosition,
      envIntensity,
      ambientIntensity: getNum(props.ambientIntensity, 0.5),
      ambientColor: String(exprVal(props.ambientColor) || "#ffffff"),
      shadowBias,
      isNight: false,
      _provided: true
    };
  }, [props, preset, mats]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(SceneEnvironmentProvider, { value: envValues, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneSkyBackground, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      HouseTransparencyGroup,
      {
        slotInstances: hausSlotInstanzen,
        enabled: hausTransparenzAktiv,
        beginAngle: hausTransparenzBeginWinkel,
        endAngle: hausTransparenzEndWinkel,
        transition: hausTransparenzUebergang,
        maxTransparency: hausTransparenzMax
      }
    )
  ] });
}
const sceneEnvironmentDynamicModel = {
  id: "oc.veranda.sceneEnvironment",
  label: "Szenenumgebung",
  description: "Szene – Beleuchtung, Umgebung und Kameraeinstellungen",
  type: "root",
  component: SceneEnvironmentModel,
  defaultProps: {
    slotDefinitions: [SCENE_SLOTS.haus],
    preset: { expression: "1" },
    intensity: { expression: "2" },
    lightPosX: { expression: "5" },
    lightPosY: { expression: "30" },
    lightPosZ: { expression: "-10" },
    envIntensity: { expression: "0.4" },
    ambientIntensity: { expression: "0.5" },
    shadowBias: { expression: "-0.0002" },
    hausTransparenzAktiv: { expression: "0" },
    hausTransparenzBeginWinkel: { expression: "88" },
    hausTransparenzEndWinkel: { expression: "272" },
    hausTransparenzUebergang: { expression: "45" },
    hausTransparenzMax: { expression: "0.98" },
    orbitAzimuthAktiv: { expression: "0" },
    orbitAzimuthGrad: { expression: "85" }
  },
  propsDialog: {
    preset: {
      label: "Voreinstellung (0=Benutzerdefiniert, 1=Tag, 2=Nacht)",
      type: "radioGroup",
      options: [
        { label: "Benutzerdefiniert", value: "0" },
        { label: "Tag", value: "1" },
        { label: "Nacht", value: "2" }
      ]
    },
    intensity: { label: "Licht-Intensität (Multiplikator)", type: "expression" },
    lightPosX: { label: "Licht Pos X (m)", type: "expression" },
    lightPosY: { label: "Licht Pos Y (m)", type: "expression" },
    lightPosZ: { label: "Licht Pos Z (m)", type: "expression" },
    envIntensity: { label: "Umgebungs-Helligkeit (Multiplikator)", type: "expression" },
    ambientIntensity: { label: "Umgebungslicht-Intensität (Multiplikator)", type: "expression" },
    shadowBias: { label: "Schatten-Bias (z.B. 0.001)", type: "expression" },
    hausTransparenzAktiv: {
      label: "Haus-Transparenz bei Kamerarotation (0=Aus, 1=An)",
      type: "radioGroup",
      options: [
        { label: "Aus", value: "0" },
        { label: "An", value: "1" }
      ]
    },
    hausTransparenzBeginWinkel: { label: "Haus-Transparenz: Start-Winkel (°)", type: "expression" },
    hausTransparenzEndWinkel: { label: "Haus-Transparenz: End-Winkel (°)", type: "expression" },
    hausTransparenzUebergang: { label: "Haus-Transparenz: Übergang (°)", type: "expression" },
    hausTransparenzMax: { label: "Haus-Transparenz: Max. Transparenz (0–1)", type: "expression" },
    orbitAzimuthAktiv: {
      label: "Orbit-Azimuth-Einschränkung (0=Aus, 1=An)",
      type: "radioGroup",
      options: [
        { label: "Aus", value: "0" },
        { label: "An", value: "1" }
      ]
    },
    orbitAzimuthGrad: { label: "Orbit-Azimuth-Bereich (°, halber Winkel)", type: "expression" }
  },
  materials: ["sonne", "mond"],
  disabledForAR: true
};

const orbitControlsLimitSceneComponent = {
  description: "Schränkt Azimuth-Rotation per SceneEnvironment-Prop ein",
  hoc: (Wrapped) => (props) => {
    const { aktiv, grad } = useOrbitLimit();
    const limit = grad * Math.PI / 180;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Wrapped,
      {
        ...props,
        minAzimuthAngle: aktiv ? -limit : -Infinity,
        maxAzimuthAngle: aktiv ? limit : Infinity
      }
    );
  }
};

function useIsARMode() {
  const { gl } = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useThree();
  const [isAR, setIsAR] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(false);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    const xr = gl.xr;
    const onStart = () => {
      const session = xr.getSession();
      setIsAR(session?.environmentBlendMode !== "opaque");
    };
    const onEnd = () => setIsAR(false);
    xr.addEventListener("sessionstart", onStart);
    xr.addEventListener("sessionend", onEnd);
    return () => {
      xr.removeEventListener("sessionstart", onStart);
      xr.removeEventListener("sessionend", onEnd);
    };
  }, [gl.xr]);
  return isAR;
}

const PfostenEckig = ({
  breite,
  tiefe,
  hoehe,
  material,
  position
}) => {
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (isNaN(breite) || isNaN(hoehe) || isNaN(tiefe) || hoehe <= 0) {
      return null;
    }
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.BoxGeometry(breite, hoehe, tiefe);
  }, [breite, hoehe, tiefe]);
  if (!geometry) return null;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { geometry, position, castShadow: true, receiveShadow: true, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material }) });
};

const PfostenRund = ({
  breite,
  tiefe,
  hoehe,
  material,
  position
}) => {
  const radius = Math.min(breite, tiefe) / 2;
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (isNaN(radius) || isNaN(hoehe) || radius <= 0 || hoehe <= 0) {
      return null;
    }
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.CylinderGeometry(radius, radius, hoehe, 32);
  }, [radius, hoehe]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => geometry?.dispose(), [geometry]);
  if (!geometry) return null;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { geometry, position, castShadow: true, receiveShadow: true, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material }) });
};

const EDGE_RADIUS = 0.015;
const PfostenKlassisch = ({
  breite,
  tiefe,
  hoehe,
  material,
  position
}) => {
  const gueltig = !isNaN(breite) && !isNaN(tiefe) && !isNaN(hoehe) && hoehe > 0;
  const geometry = useCachedGeometryOrNull(
    gueltig ? `pfostenKlassisch|${gkey(breite)}|${gkey(tiefe)}|${gkey(hoehe)}` : null,
    () => {
      const halfW = breite / 2;
      const halfD = tiefe / 2;
      const r = EDGE_RADIUS;
      const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
      s.moveTo(-halfW + r, -halfD);
      s.lineTo(halfW - r, -halfD);
      s.quadraticCurveTo(halfW, -halfD, halfW, -halfD + r);
      s.lineTo(halfW, halfD - r);
      s.quadraticCurveTo(halfW, halfD, halfW - r, halfD);
      s.lineTo(-halfW + r, halfD);
      s.quadraticCurveTo(-halfW, halfD, -halfW, halfD - r);
      s.lineTo(-halfW, -halfD + r);
      s.quadraticCurveTo(-halfW, -halfD, -halfW + r, -halfD);
      const geom = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(s, {
        steps: 1,
        depth: hoehe,
        curveSegments: 8,
        bevelEnabled: false
      });
      geom.translate(0, 0, -hoehe / 2);
      return geom;
    }
  );
  if (!geometry) return null;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "mesh",
    {
      position,
      rotation: [-Math.PI / 2, 0, 0],
      castShadow: true,
      receiveShadow: true,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: geometry, attach: "geometry", dispose: null }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, surface: "alu", surfaceAxis: [0, 1, 0] })
      ]
    }
  );
};

const PFOSTEN_TYP = {
  ECKIG: 0,
  RUND: 1,
  KLASSISCH: 2
};
const RINNEN_TYP = {
  KASTEN: 0,
  ECKIG: 1,
  RUND: 2,
  KLASSISCH: 3,
  FANTASY: 4
};
const WAND_TYP = {
  KEIL: 0,
  RAHMENWAND: 1,
  SCHIEBETUER: 2,
  SHUTTERS: 4,
  SICHTSCHUTZWAND: 5,
  SENKRECHTMARKISE: 6
};

const Pfosten = ({
  typ,
  breite,
  tiefe,
  hoehe,
  material,
  position
}) => {
  const numTyp = Number(typ);
  const props = { breite, tiefe, hoehe, material, position };
  switch (numTyp) {
    case PFOSTEN_TYP.RUND:
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(PfostenRund, { ...props });
    case PFOSTEN_TYP.KLASSISCH:
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(PfostenKlassisch, { ...props });
    case PFOSTEN_TYP.ECKIG:
    default:
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(PfostenEckig, { ...props });
  }
};

function createKastenShape(w, h, t) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, 0).lineTo(-w, 0).lineTo(-w, h).lineTo(-w + t, h).lineTo(-w + t, t).lineTo(-t, t).lineTo(-t, h).lineTo(0, h).lineTo(0, 0);
}
function createKastenCapShape(w, h) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, 0).lineTo(-w, 0).lineTo(-w, h).lineTo(0, h - 8e-3).lineTo(0, 0);
}
function createEckigShape(w, h, t) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, 0).lineTo(-w, 0).lineTo(-(w + 0.03), 0.036).lineTo(-w - 0.03, h).lineTo(-w - 0.01, h).lineTo(-w - 0.01, h - t).lineTo(-w - 0.028, h - t).lineTo(-w - 0.028, 0.038).lineTo(-w + t, t).lineTo(0, t);
}
function createEckigCapShape(w, h) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, 0).lineTo(-w, 0).lineTo(-(w + 0.03), 0.036).lineTo(-w - 0.03, h).lineTo(0, h).lineTo(0, 0);
}
function createRundShape(w, h) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, 0).lineTo(-w, 0).quadraticCurveTo(-w - 0.05, 0.05, -w + 0.01, h).lineTo(-w, 0.01).lineTo(0, 0.01);
}
function createRundCapShape(w, h) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, 0).lineTo(-w, 0).quadraticCurveTo(-w - 0.05, 0.05, -w + 0.01, h).quadraticCurveTo(0, h, 0, h - 0.025).quadraticCurveTo(0, 0.03, 3e-3, 0).lineTo(0, 0);
}
function createKlassischShape(w, h) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, 0).lineTo(-w, 0).lineTo(-w - 0.035, h).lineTo(-w - 0.01, h).lineTo(-w - 0.01, h - 2e-3).lineTo(-w - 0.032, h - 2e-3).lineTo(-w + 2e-3, 2e-3).lineTo(0, 2e-3);
}
function createKlassischCapShape(w, h) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, -5e-3).lineTo(-w, -5e-3).lineTo(-w - 0.035, h).lineTo(0, h).quadraticCurveTo(0, 0.05, 0, -5e-3).lineTo(0, -5e-3);
}
function createFantasyShape(w, h, t, _dachneigung) {
  const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  shape.moveTo(-w, h);
  shape.lineTo(-w, 0);
  shape.lineTo(0, 0);
  shape.lineTo(0, h);
  shape.lineTo(-t, h);
  shape.lineTo(-t, t);
  shape.lineTo(-(w - t), t);
  shape.lineTo(-(w - t), h);
  shape.lineTo(-w, h);
  return shape;
}
function createFantasyCapShape(w, h, _dachneigung) {
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(-w, h).lineTo(-w, 0).lineTo(0, 0).lineTo(0, h).lineTo(-w, h);
}

const CAP_DEPTH = 8e-3;
const RegenrinneBase = ({
  bodyShape,
  capShape,
  curveSegments,
  width,
  farbeHex,
  material
}) => {
  const bodySettings = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => ({ curveSegments, steps: 1, depth: width, bevelEnabled: false }),
    [curveSegments, width]
  );
  const capSettings = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => ({ curveSegments, steps: 1, depth: CAP_DEPTH, bevelEnabled: false }),
    [curveSegments]
  );
  const bodyMaterialNode = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "meshPhysicalMaterial",
    {
      color: farbeHex,
      metalness: MATERIAL_DEFAULTS.metall.metalness,
      roughness: MATERIAL_DEFAULTS.metall.roughness + 0.05,
      clearcoat: MATERIAL_DEFAULTS.metall.clearcoat,
      clearcoatRoughness: MATERIAL_DEFAULTS.metall.clearcoatRoughness
    }
  ) });
  const capMaterialNode = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "meshPhysicalMaterial",
    {
      color: farbeHex,
      metalness: MATERIAL_DEFAULTS.metall.metalness,
      roughness: MATERIAL_DEFAULTS.metall.roughness + 0.05,
      clearcoat: MATERIAL_DEFAULTS.metall.clearcoat,
      clearcoatRoughness: MATERIAL_DEFAULTS.metall.clearcoatRoughness,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    }
  ) });
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        rotation: [0, Math.PI / 2, 0],
        position: [-width / 2, 0, 0],
        castShadow: true,
        receiveShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [bodyShape, bodySettings] }),
          bodyMaterialNode
        ]
      }
    ),
    [0, 1].map((i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        rotation: [0, Math.PI / 2, 0],
        position: [-width / 2 * (i ? 1.001 : -0.999), 0, 0],
        castShadow: true,
        receiveShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [capShape, capSettings] }),
          capMaterialNode
        ]
      },
      `cap-${i}`
    ))
  ] });
};

const RegenrinneKasten = ({
  rinnenBreite,
  rinnenHoehe,
  wandStaerke,
  width,
  farbeHex,
  material
}) => {
  const { bodyShape, capShape } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => ({
      bodyShape: createKastenShape(rinnenBreite, rinnenHoehe, wandStaerke),
      capShape: createKastenCapShape(rinnenBreite, rinnenHoehe)
    }),
    [rinnenBreite, rinnenHoehe, wandStaerke]
  );
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    RegenrinneBase,
    {
      bodyShape,
      capShape,
      curveSegments: 1,
      width,
      farbeHex,
      material
    }
  );
};

const RegenrinneEckig = ({
  rinnenBreite,
  rinnenHoehe,
  wandStaerke,
  width,
  farbeHex,
  material
}) => {
  const { bodyShape, capShape } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => ({
      bodyShape: createEckigShape(rinnenBreite, rinnenHoehe, wandStaerke),
      capShape: createEckigCapShape(rinnenBreite, rinnenHoehe)
    }),
    [rinnenBreite, rinnenHoehe, wandStaerke]
  );
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    RegenrinneBase,
    {
      bodyShape,
      capShape,
      curveSegments: 1,
      width,
      farbeHex,
      material
    }
  );
};

const RegenrinneRund = ({
  rinnenBreite,
  rinnenHoehe,
  width,
  farbeHex,
  material
}) => {
  const { bodyShape, capShape } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => ({
      bodyShape: createRundShape(rinnenBreite, rinnenHoehe),
      capShape: createRundCapShape(rinnenBreite, rinnenHoehe)
    }),
    [rinnenBreite, rinnenHoehe]
  );
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    RegenrinneBase,
    {
      bodyShape,
      capShape,
      curveSegments: 16,
      width,
      farbeHex,
      material
    }
  );
};

const RegenrinneKlassisch = ({
  rinnenBreite,
  rinnenHoehe,
  width,
  farbeHex,
  material
}) => {
  const { bodyShape, capShape } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => ({
      bodyShape: createKlassischShape(rinnenBreite, rinnenHoehe),
      capShape: createKlassischCapShape(rinnenBreite, rinnenHoehe)
    }),
    [rinnenBreite, rinnenHoehe]
  );
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    RegenrinneBase,
    {
      bodyShape,
      capShape,
      curveSegments: 8,
      width,
      farbeHex,
      material
    }
  );
};

const RegenrinneFantasy = ({
  rinnenBreite,
  rinnenHoehe,
  wandStaerke,
  width,
  dachneigung,
  farbeHex,
  material
}) => {
  const bodyShape = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => createFantasyShape(rinnenBreite, rinnenHoehe, wandStaerke),
    [rinnenBreite, rinnenHoehe, wandStaerke, dachneigung]
  );
  const capShape = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => createFantasyCapShape(rinnenBreite, rinnenHoehe),
    [rinnenBreite, rinnenHoehe, dachneigung]
  );
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    RegenrinneBase,
    {
      bodyShape,
      capShape,
      curveSegments: 1,
      width,
      farbeHex,
      material
    }
  );
};

const Regenrinne = ({
  typ,
  rinnenBreite,
  rinnenHoehe,
  wandStaerke,
  width,
  dachneigung,
  farbeHex,
  material
}) => {
  const numTyp = Number(typ);
  const commonProps = { rinnenBreite, rinnenHoehe, wandStaerke, width, dachneigung, farbeHex, material };
  switch (numTyp) {
    case RINNEN_TYP.ECKIG:
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(RegenrinneEckig, { ...commonProps });
    case RINNEN_TYP.RUND:
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(RegenrinneRund, { ...commonProps });
    case RINNEN_TYP.KLASSISCH:
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(RegenrinneKlassisch, { ...commonProps });
    case RINNEN_TYP.FANTASY:
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(RegenrinneFantasy, { ...commonProps });
    case RINNEN_TYP.KASTEN:
    default:
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(RegenrinneKasten, { ...commonProps });
  }
};

const Sparren = ({
  breite,
  hoehe,
  tiefe,
  hoeheDiff,
  material,
  position = [0, 0, 0]
}) => {
  const { shape, extrudeSettings } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(0, 0);
    s.lineTo(0, hoehe);
    s.lineTo(tiefe, hoehe + hoeheDiff);
    s.lineTo(tiefe, hoeheDiff);
    s.closePath();
    const settings = {
      curveSegments: 1,
      steps: 1,
      depth: breite,
      bevelEnabled: false
    };
    return { shape: s, extrudeSettings: settings };
  }, [breite, hoehe, tiefe, hoeheDiff]);
  const centeredPosition = [
    position[0] + breite / 2,
    position[1],
    position[2]
  ];
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "mesh",
    {
      position: centeredPosition,
      rotation: [0, -Math.PI / 2, 0],
      castShadow: true,
      receiveShadow: true,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [shape, extrudeSettings] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material })
      ]
    }
  );
};

const SparrenInstanced = ({
  breite,
  hoehe,
  tiefe,
  hoeheDiff,
  material,
  positionY,
  positionZ,
  xPositionen
}) => {
  const geometry = useCachedGeometry(
    `sparren|${gkey(breite)}|${gkey(hoehe)}|${gkey(tiefe)}|${gkey(hoeheDiff)}`,
    () => {
      const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
      s.moveTo(0, 0);
      s.lineTo(0, hoehe);
      s.lineTo(tiefe, hoehe + hoeheDiff);
      s.lineTo(tiefe, hoeheDiff);
      s.closePath();
      return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(s, {
        curveSegments: 1,
        steps: 1,
        depth: breite,
        bevelEnabled: false
      });
    }
  );
  const meshRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const dummy = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D(), []);
  const count = xPositionen.length;
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    dummy.rotation.set(0, -Math.PI / 2, 0);
    for (let i = 0; i < xPositionen.length; i++) {
      dummy.position.set(xPositionen[i] + breite / 2, positionY, positionZ);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [xPositionen, breite, positionY, positionZ, dummy]);
  if (count === 0) return null;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "instancedMesh",
    {
      ref: meshRef,
      args: [void 0, void 0, count],
      count,
      castShadow: true,
      receiveShadow: true,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: geometry, attach: "geometry", dispose: null }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, surface: "alu", surfaceAxis: [1, 0, 0] })
      ]
    },
    count
  );
};

const SHADOW_OPACITY_THRESHOLD$3 = 0.5;
function isGlasEindeckung(typ) {
  return typ === "glas" || typ === "polycarbonat";
}
function calcEindeckungBottomOffset(typ, dicke, amplitude) {
  if (typ === "welle") return dicke / 2 + amplitude / 200;
  if (typ === "trapez") return dicke;
  return 0;
}
const GlasEindeckung = ({
  breite,
  tiefe,
  dicke,
  farbe,
  opacity,
  roughness,
  metalness,
  envMapIntensity,
  position,
  rotation,
  material
}) => {
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position, rotation, castShadow: opacity >= SHADOW_OPACITY_THRESHOLD$3, receiveShadow: false, material, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [breite, dicke, tiefe] }),
    !material && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "meshPhysicalMaterial",
      {
        color: farbe,
        transparent: true,
        opacity,
        roughness,
        metalness,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity,
        ior: 1.52,
        thickness: dicke * 40,
        transmission: Math.max(0, 1 - opacity - 0.15),
        attenuationDistance: 0.5,
        attenuationColor: farbe,
        side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
        depthWrite: false
      }
    )
  ] });
};
const PolycarbonatEindeckung = ({
  breite,
  tiefe,
  dicke,
  farbe,
  opacity,
  roughness,
  metalness,
  envMapIntensity,
  kammerGroesse,
  position,
  rotation,
  material
}) => {
  const WAND_DICKE = Math.max(1e-3, dicke * 0.15);
  const STEG_DICKE = Math.max(8e-4, dicke * 0.1);
  const innenHoehe = dicke - 2 * WAND_DICKE;
  const kammer = Math.max(5e-3, kammerGroesse);
  const anzahlStege = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => Math.max(0, Math.floor(breite / kammer) - 1),
    [breite, kammer]
  );
  const stegePositionen = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => Array.from({ length: anzahlStege }, (_, i) => -breite / 2 + kammer * (i + 1)),
    [anzahlStege, breite, kammer]
  );
  const allStegX = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => [-breite / 2 + STEG_DICKE / 2, breite / 2 - STEG_DICKE / 2, ...stegePositionen],
    [breite, STEG_DICKE, stegePositionen]
  );
  const stegGeometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.BoxGeometry(STEG_DICKE, innenHoehe, tiefe),
    [STEG_DICKE, innenHoehe, tiefe]
  );
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => stegGeometry.dispose(), [stegGeometry]);
  const stegMeshRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const stegDummy = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D(), []);
  const stegCount = allStegX.length;
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    const mesh = stegMeshRef.current;
    if (!mesh) return;
    for (let i = 0; i < allStegX.length; i++) {
      stegDummy.position.set(allStegX[i], 0, 0);
      stegDummy.updateMatrix();
      mesh.setMatrixAt(i, stegDummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [allStegX, stegDummy]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position, rotation, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "poly", position: [0, dicke / 2 - WAND_DICKE / 2, 0], castShadow: opacity >= SHADOW_OPACITY_THRESHOLD$3, receiveShadow: true, material, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [breite, WAND_DICKE, tiefe] }),
      !material && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          transparent: true,
          opacity,
          roughness,
          metalness,
          envMapIntensity
        }
      )
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "poly", position: [0, -(dicke / 2 - WAND_DICKE / 2), 0], castShadow: opacity >= SHADOW_OPACITY_THRESHOLD$3, receiveShadow: true, material, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [breite, WAND_DICKE, tiefe] }),
      !material && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          transparent: true,
          opacity,
          roughness,
          metalness,
          envMapIntensity
        }
      )
    ] }),
    stegCount > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "instancedMesh",
      {
        ref: stegMeshRef,
        name: "polySteg",
        args: [stegGeometry, void 0, stegCount],
        count: stegCount,
        castShadow: opacity >= SHADOW_OPACITY_THRESHOLD$3,
        receiveShadow: true,
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: farbe, roughness })
      },
      stegCount
    )
  ] });
};
const WelleEindeckung = ({
  breite,
  tiefe,
  dicke,
  amplitude,
  frequenz,
  farbe,
  position,
  rotation,
  material
}) => {
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const step = 0.01;
    const amp = amplitude / 200;
    const freq = 1 / (frequenz / 620);
    const halfBreite = breite / 2;
    const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    let x = -halfBreite;
    shape.moveTo(x, dicke / 2 + amp * Math.cos(x * freq));
    while (x < halfBreite) {
      x += step;
      shape.lineTo(x, dicke / 2 + amp * Math.cos(x * freq));
    }
    while (x >= -halfBreite) {
      shape.lineTo(x, -dicke / 2 + amp * Math.cos(x * freq));
      x -= step;
    }
    shape.closePath();
    const geom = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, {
      steps: 2,
      depth: tiefe,
      bevelEnabled: false
    });
    geom.translate(0, 0, -tiefe / 2);
    return geom;
  }, [breite, tiefe, dicke, amplitude, frequenz]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      position,
      rotation,
      geometry,
      castShadow: true,
      receiveShadow: true,
      children: material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          roughness: 0.4,
          metalness: 0.5,
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
        }
      )
    }
  );
};
const TrapezEindeckung = ({
  breite,
  tiefe,
  dicke,
  amplitude,
  frequenz,
  farbe,
  position,
  rotation,
  material
}) => {
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const amp = amplitude / 100;
    const freq = frequenz / 100;
    const topFlatRatio = 0.3;
    const bottomFlatRatio = 0.4;
    const topFlatWidth = freq * topFlatRatio;
    const bottomFlatWidth = freq * bottomFlatRatio;
    const remainingWidthForSlopes = freq - topFlatWidth - bottomFlatWidth;
    const slopeWidth = Math.max(0.01, remainingWidthForSlopes / 2);
    const halfBreite = breite / 2;
    const rightPoints = [];
    rightPoints.push([0, 0]);
    let x = bottomFlatWidth / 2;
    if (x < halfBreite) {
      rightPoints.push([x, 0]);
    } else {
      rightPoints.push([halfBreite, 0]);
    }
    while (x < halfBreite) {
      const x1 = x + slopeWidth;
      if (x1 >= halfBreite) {
        const t = (halfBreite - x) / slopeWidth;
        rightPoints.push([halfBreite, amp * t]);
        break;
      }
      rightPoints.push([x1, amp]);
      const x2 = x1 + topFlatWidth;
      if (x2 >= halfBreite) {
        rightPoints.push([halfBreite, amp]);
        break;
      }
      rightPoints.push([x2, amp]);
      const x3 = x2 + slopeWidth;
      if (x3 >= halfBreite) {
        const t = (halfBreite - x2) / slopeWidth;
        rightPoints.push([halfBreite, amp * (1 - t)]);
        break;
      }
      rightPoints.push([x3, 0]);
      const x4 = x3 + bottomFlatWidth;
      if (x4 >= halfBreite) {
        rightPoints.push([halfBreite, 0]);
        break;
      }
      rightPoints.push([x4, 0]);
      x = x4;
    }
    const leftPoints = [];
    for (let i = rightPoints.length - 1; i > 0; i--) {
      leftPoints.push([-rightPoints[i][0], rightPoints[i][1]]);
    }
    const upperPoints = [...leftPoints, ...rightPoints];
    const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    shape.moveTo(upperPoints[0][0], upperPoints[0][1]);
    for (let i = 1; i < upperPoints.length; i++) {
      shape.lineTo(upperPoints[i][0], upperPoints[i][1]);
    }
    for (let i = upperPoints.length - 1; i >= 0; i--) {
      shape.lineTo(upperPoints[i][0], upperPoints[i][1] - dicke);
    }
    shape.closePath();
    const geom = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, {
      steps: 2,
      depth: tiefe,
      bevelEnabled: false
    });
    geom.translate(0, 0, -tiefe / 2);
    return geom;
  }, [breite, tiefe, dicke, amplitude, frequenz]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      position,
      rotation,
      geometry,
      castShadow: true,
      receiveShadow: true,
      children: material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          roughness: 0.4,
          metalness: 0.5,
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
        }
      )
    }
  );
};
const Eindeckung = ({
  typ,
  breite,
  tiefe,
  dicke = 0.016,
  hoeheVorne,
  hoeheHinten,
  quertraegerTiefe = 0.1,
  quertraegerTiefeHinten,
  innenliegend = false,
  glasFarbe = "#e8f4f8",
  metallFarbe = "#808080",
  opacity = 0.2,
  roughness = 0,
  metalness = 0,
  envMapIntensity = 1,
  kammergroesse = 0.05,
  amplitude = 4,
  frequenz = 10,
  material
}) => {
  if (typ === "ohne") return null;
  const qtHinten = quertraegerTiefeHinten ?? quertraegerTiefe;
  const effektiveTiefeRoh = innenliegend ? tiefe - quertraegerTiefe - qtHinten : tiefe;
  const hoeheDiff = hoeheHinten - hoeheVorne;
  const neigung = Math.atan2(hoeheDiff, effektiveTiefeRoh);
  const bottomOffset = calcEindeckungBottomOffset(typ, dicke, amplitude);
  const yPos = hoeheVorne + bottomOffset;
  const zPos = 0;
  const rotation = [-neigung, 0, 0];
  const position = [0, yPos + hoeheDiff / 2, zPos];
  const effektiveTiefe = effektiveTiefeRoh / Math.cos(neigung);
  const effektiveBreite = breite;
  switch (typ) {
    case "glas":
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        GlasEindeckung,
        {
          breite: effektiveBreite,
          tiefe: effektiveTiefe,
          dicke,
          farbe: glasFarbe,
          opacity,
          roughness,
          metalness,
          envMapIntensity,
          position,
          rotation,
          material
        }
      );
    case "polycarbonat":
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        PolycarbonatEindeckung,
        {
          breite: effektiveBreite,
          tiefe: effektiveTiefe,
          dicke,
          farbe: glasFarbe,
          opacity,
          roughness,
          metalness,
          envMapIntensity,
          kammerGroesse: kammergroesse,
          position,
          rotation,
          material
        }
      );
    case "welle":
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        WelleEindeckung,
        {
          breite: effektiveBreite,
          tiefe: effektiveTiefe,
          dicke,
          amplitude,
          frequenz,
          farbe: metallFarbe,
          position,
          rotation,
          material
        }
      );
    case "trapez":
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        TrapezEindeckung,
        {
          breite: effektiveBreite,
          tiefe: effektiveTiefe,
          dicke,
          amplitude,
          frequenz,
          farbe: metallFarbe,
          position,
          rotation,
          material
        }
      );
    default:
      return null;
  }
};

const Wandanschluss = ({
  wandanschlussHoehe,
  wandanschlussTiefe,
  farbe,
  leistenHoehe,
  glasNeig,
  anschlussBreite,
  zPos,
  yPos,
  material
}) => {
  const wandSchenkelHoehe = wandanschlussHoehe;
  const dachSchenkelLaenge = wandanschlussTiefe;
  const dachDx = Math.cos(glasNeig);
  const dachDy = -Math.sin(glasNeig);
  const perpDx = Math.sin(glasNeig);
  const perpDy = Math.cos(glasNeig);
  const abk45 = ABKANTUNG_LAENGE * Math.cos(Math.PI / 4);
  const geom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const abkPerpX = BLECH_STAERKE * Math.cos(Math.PI / 4);
    const abkPerpY = BLECH_STAERKE * Math.sin(Math.PI / 4);
    const profil = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    profil.moveTo(0, 0);
    profil.lineTo(0, wandSchenkelHoehe);
    profil.lineTo(abk45, wandSchenkelHoehe + abk45);
    profil.lineTo(abk45 - abkPerpX, wandSchenkelHoehe + abk45 - abkPerpY);
    profil.lineTo(BLECH_STAERKE, wandSchenkelHoehe - BLECH_STAERKE);
    profil.lineTo(BLECH_STAERKE, 0);
    profil.lineTo(
      dachDx * dachSchenkelLaenge + perpDx * BLECH_STAERKE,
      dachDy * dachSchenkelLaenge + perpDy * BLECH_STAERKE
    );
    profil.lineTo(dachDx * dachSchenkelLaenge, dachDy * dachSchenkelLaenge);
    profil.closePath();
    const g = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(profil, {
      steps: 1,
      depth: anschlussBreite,
      bevelEnabled: false
    });
    g.translate(0, 0, -anschlussBreite / 2);
    return g;
  }, [
    wandSchenkelHoehe,
    dachSchenkelLaenge,
    dachDx,
    dachDy,
    perpDx,
    perpDy,
    abk45,
    anschlussBreite
  ]);
  const gummiHoehe = leistenHoehe * Math.cos(glasNeig);
  const dachEndeY = dachDy * dachSchenkelLaenge;
  const dachEndeZ = dachDx * dachSchenkelLaenge;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "mesh",
      {
        geometry: geom,
        position: [0, yPos, zPos],
        rotation: [0, Math.PI / 2, 0],
        castShadow: true,
        receiveShadow: true,
        children: material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshPhysicalMaterial",
          {
            color: farbe,
            metalness: MATERIAL_DEFAULTS.metall.metalness,
            roughness: MATERIAL_DEFAULTS.metall.roughness,
            clearcoat: MATERIAL_DEFAULTS.metall.clearcoat,
            clearcoatRoughness: MATERIAL_DEFAULTS.metall.clearcoatRoughness,
            side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1
          }
        )
      }
    ),
    gummiHoehe > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        position: [
          0,
          yPos + dachEndeY - gummiHoehe / 2,
          zPos - dachEndeZ
        ],
        castShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "boxGeometry",
            {
              args: [anschlussBreite, gummiHoehe, GUMMI_DICKE]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "meshPhysicalMaterial",
            {
              color: DEFAULT_FARBEN.gummi,
              roughness: MATERIAL_DEFAULTS.gummi.roughness,
              metalness: MATERIAL_DEFAULTS.gummi.metalness
            }
          )
        ]
      }
    )
  ] });
};

const Winkelprofil = ({
  hoehe,
  tiefe,
  farbe,
  glasNeig,
  breite,
  zPos,
  yPos,
  gummiDicke = GUMMI_DICKE,
  material
}) => {
  const W = BLECH_STAERKE;
  const g = glasNeig;
  const dx = Math.cos(g);
  const dy = -Math.sin(g);
  const px = Math.sin(g);
  const py = Math.cos(g);
  const geom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const profil = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    profil.moveTo(0, 0);
    profil.lineTo(dx * tiefe, dy * tiefe);
    profil.lineTo(dx * tiefe + px * W, dy * tiefe + py * W);
    profil.lineTo(px * W, py * W);
    profil.lineTo(W, 0);
    profil.lineTo(W, -hoehe);
    profil.lineTo(0, -hoehe);
    profil.closePath();
    const g3 = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(profil, {
      steps: 1,
      depth: breite,
      bevelEnabled: false
    });
    g3.translate(0, 0, -breite / 2);
    return g3;
  }, [dx, dy, px, py, tiefe, hoehe, W, breite]);
  const dachEndeY = dy * tiefe;
  const dachEndeZ = dx * tiefe;
  const gH = gummiDicke / Math.cos(g);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "mesh",
      {
        geometry: geom,
        position: [0, yPos, zPos],
        rotation: [0, Math.PI / 2, 0],
        castShadow: true,
        receiveShadow: true,
        children: material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshPhysicalMaterial",
          {
            color: farbe,
            metalness: MATERIAL_DEFAULTS.metall.metalness,
            roughness: MATERIAL_DEFAULTS.metall.roughness,
            clearcoat: MATERIAL_DEFAULTS.metall.clearcoat,
            clearcoatRoughness: MATERIAL_DEFAULTS.metall.clearcoatRoughness,
            side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
          }
        )
      }
    ),
    gummiDicke > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, yPos + dachEndeY - gH / 2, zPos - dachEndeZ], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [breite, gH, GUMMI_DICKE] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: DEFAULT_FARBEN.gummi,
          roughness: MATERIAL_DEFAULTS.gummi.roughness,
          metalness: MATERIAL_DEFAULTS.gummi.metalness
        }
      )
    ] })
  ] });
};

const Stirnblech = ({
  stirnblechHoehe,
  stirnblechTiefe,
  farbe,
  anschlussBreite,
  yPos,
  zPos,
  neigung = 0,
  armNachAußen = false,
  material
}) => {
  const geom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const tanNeig = Math.tan(neigung);
    const xDir = armNachAußen ? -1 : 1;
    const yHinten = stirnblechTiefe * tanNeig * xDir;
    const profil = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    profil.moveTo(-BLECH_STAERKE * xDir, 0);
    profil.lineTo(stirnblechTiefe * xDir, yHinten);
    profil.lineTo(stirnblechTiefe * xDir, yHinten - BLECH_STAERKE);
    profil.lineTo(0, -BLECH_STAERKE);
    profil.lineTo(0, -stirnblechHoehe);
    profil.lineTo(-BLECH_STAERKE * xDir, -stirnblechHoehe);
    profil.closePath();
    const g = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(profil, {
      steps: 1,
      depth: anschlussBreite,
      bevelEnabled: false
    });
    g.translate(0, 0, -anschlussBreite / 2);
    return g;
  }, [stirnblechHoehe, stirnblechTiefe, anschlussBreite, neigung, armNachAußen]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      geometry: geom,
      position: [0, yPos, zPos],
      rotation: [0, -Math.PI / 2, 0],
      castShadow: true,
      receiveShadow: true,
      children: material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          metalness: MATERIAL_DEFAULTS.metall.metalness,
          roughness: MATERIAL_DEFAULTS.metall.roughness,
          clearcoat: MATERIAL_DEFAULTS.metall.clearcoat,
          clearcoatRoughness: MATERIAL_DEFAULTS.metall.clearcoatRoughness,
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1
        }
      )
    }
  );
};

const GummiDichtungen = ({
  sparrenPositionen,
  eindeckungDicke,
  sparrenOKVorne,
  sparrenOKHinten,
  effektiveTiefeRoh,
  glasZOffset,
  leistenZMitte,
  leistenSchraegTiefe
}) => {
  const gummiMat = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.MeshPhysicalMaterial({
    color: DEFAULT_FARBEN.gummi,
    roughness: MATERIAL_DEFAULTS.gummi.roughness,
    metalness: MATERIAL_DEFAULTS.gummi.metalness
  }), []);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    gummiMat.dispose();
  }, [gummiMat]);
  const gummiGeom = useCachedGeometryOrNull(
    eindeckungDicke > 0 ? `gummi|${gkey(eindeckungDicke)}|${gkey(leistenSchraegTiefe)}` : null,
    () => {
      const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
      const hb = GUMMI_BREITE / 2;
      s.moveTo(-hb, 0);
      s.lineTo(-hb, eindeckungDicke);
      s.lineTo(hb, eindeckungDicke);
      s.lineTo(hb, 0);
      s.closePath();
      const geom = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(s, {
        steps: 1,
        depth: leistenSchraegTiefe,
        bevelEnabled: false
      });
      geom.translate(0, 0, -leistenSchraegTiefe / 2);
      return geom;
    }
  );
  const hDiff = sparrenOKHinten - sparrenOKVorne;
  const neig = Math.atan2(hDiff, effektiveTiefeRoh);
  const yKorrektur = effektiveTiefeRoh > 0 ? (leistenZMitte - glasZOffset) * hDiff / effektiveTiefeRoh : 0;
  const yPos = sparrenOKVorne + hDiff / 2 + yKorrektur;
  const count = sparrenPositionen.length;
  const meshRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const dummy = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D(), []);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.instanceMatrix.setUsage(veranda_mf_2_plugin__loadShare__three__loadShare__.DynamicDrawUsage);
    dummy.rotation.set(-neig, 0, 0);
    for (let i = 0; i < count; i++) {
      dummy.position.set(sparrenPositionen[i], yPos, leistenZMitte);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [sparrenPositionen, count, yPos, leistenZMitte, neig, dummy, gummiGeom]);
  if (!gummiGeom || count === 0) return null;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "instancedMesh",
    {
      ref: meshRef,
      args: [void 0, void 0, count],
      count,
      material: gummiMat,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: gummiGeom, attach: "geometry", dispose: null })
    },
    count
  );
};

const Glasleisten = ({
  alleSparrenPositionen,
  aussenLinks,
  aussenRechts,
  leistenGeom,
  leistenGeomLinks,
  leistenGeomRechts,
  leistenGeomLinksAussen,
  leistenGeomRechtsAussen,
  sparrenOKVorne,
  sparrenOKHinten,
  eindeckungDicke,
  effektiveTiefeRoh,
  glasZOffset,
  leistenZMitte,
  leistenZMitteAussen,
  clipZVorne,
  clipZHinten,
  leistenFarbe,
  material
}) => {
  const glasOKVorne = sparrenOKVorne + eindeckungDicke;
  const glasOKHinten = sparrenOKHinten + eindeckungDicke;
  const hDiff = glasOKHinten - glasOKVorne;
  const neig = Math.atan2(hDiff, effektiveTiefeRoh);
  const clipPlanes = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const planes = [];
    if (clipZVorne !== void 0) planes.push(new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, 0, 1), -clipZVorne));
    if (clipZHinten !== void 0) planes.push(new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, 0, -1), clipZHinten));
    return planes.length > 0 ? planes : void 0;
  }, [clipZVorne, clipZHinten]);
  const { innerePositionen, aussenIndizes } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const innen = [];
    const aussen = [];
    alleSparrenPositionen.forEach((xPos, i) => {
      const isLinks = xPos === aussenLinks && alleSparrenPositionen.length > 1;
      const isRechts = xPos === aussenRechts && alleSparrenPositionen.length > 1;
      if (isLinks || isRechts) aussen.push(i);
      else innen.push(xPos);
    });
    return { innerePositionen: innen, aussenIndizes: aussen };
  }, [alleSparrenPositionen, aussenLinks, aussenRechts]);
  const yKorrekturInnen = effektiveTiefeRoh > 0 ? (leistenZMitte - glasZOffset) * hDiff / effektiveTiefeRoh : 0;
  const yInnen = glasOKVorne + hDiff / 2 + yKorrekturInnen;
  const innenCount = innerePositionen.length;
  const innenRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const dummy = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D(), []);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    const mesh = innenRef.current;
    if (!mesh) return;
    mesh.instanceMatrix.setUsage(veranda_mf_2_plugin__loadShare__three__loadShare__.DynamicDrawUsage);
    dummy.rotation.set(-neig, 0, 0);
    for (let i = 0; i < innenCount; i++) {
      dummy.position.set(innerePositionen[i], yInnen, leistenZMitte);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [innerePositionen, innenCount, yInnen, leistenZMitte, neig, dummy, leistenGeom]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    innenCount > 0 && leistenGeom && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "instancedMesh",
      {
        ref: innenRef,
        args: [void 0, void 0, innenCount],
        count: innenCount,
        castShadow: true,
        receiveShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: leistenGeom, attach: "geometry", dispose: null }),
          material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "meshPhysicalMaterial",
            {
              color: leistenFarbe,
              metalness: MATERIAL_DEFAULTS.leiste.metalness,
              roughness: MATERIAL_DEFAULTS.leiste.roughness,
              polygonOffset: true,
              polygonOffsetFactor: -1,
              polygonOffsetUnits: -1
            }
          )
        ]
      },
      innenCount
    ),
    aussenIndizes.map((i) => {
      const xPos = alleSparrenPositionen[i];
      const isLinks = xPos === aussenLinks;
      const geom = isLinks ? leistenGeomLinksAussen ?? leistenGeomLinks : leistenGeomRechtsAussen ?? leistenGeomRechts;
      if (!geom) return null;
      const zMitte = leistenZMitteAussen !== void 0 ? leistenZMitteAussen : leistenZMitte;
      const yKorrektur = effektiveTiefeRoh > 0 ? (zMitte - glasZOffset) * hDiff / effektiveTiefeRoh : 0;
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
        "mesh",
        {
          position: [xPos, glasOKVorne + hDiff / 2 + yKorrektur, zMitte],
          rotation: [-neig, 0, 0],
          castShadow: true,
          receiveShadow: true,
          children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: geom, attach: "geometry", dispose: null }),
            material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              "meshPhysicalMaterial",
              {
                color: leistenFarbe,
                metalness: MATERIAL_DEFAULTS.leiste.metalness,
                roughness: MATERIAL_DEFAULTS.leiste.roughness,
                clippingPlanes: clipPlanes,
                polygonOffset: true,
                polygonOffsetFactor: -1,
                polygonOffsetUnits: -1
              }
            )
          ]
        },
        `leiste-aussen-${i}`
      );
    })
  ] });
};

function leistenProfil(breite, hoehe, rundung) {
  const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  const hb = breite / 2;
  if (rundung <= 0) {
    s.moveTo(-hb, 0);
    s.lineTo(-hb, hoehe);
    s.lineTo(hb, hoehe);
    s.lineTo(hb, 0);
    s.closePath();
    return s;
  }
  const maxRadius = hb;
  const r = Math.min(rundung / 10 * maxRadius, hoehe, maxRadius);
  s.moveTo(-hb, 0);
  s.lineTo(-hb, hoehe - r);
  s.quadraticCurveTo(-hb, hoehe, -hb + r, hoehe);
  if (breite > 2 * r) {
    s.lineTo(hb - r, hoehe);
  }
  s.quadraticCurveTo(hb, hoehe, hb, hoehe - r);
  s.lineTo(hb, 0);
  s.closePath();
  return s;
}
function abschlussLeistenProfil(leistenBreite, leistenHoehe, sparrenBreite, glasDicke, rundung, seite) {
  const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  const hb = leistenBreite / 2;
  const shb = sparrenBreite / 2;
  const maxRadius = hb;
  const r = rundung <= 0 ? 0 : Math.min(rundung / 10 * maxRadius, leistenHoehe, maxRadius);
  const legInner = Math.min(-shb + leistenBreite, hb);
  if (seite === "links") {
    s.moveTo(hb, 0);
    if (r > 0) {
      s.lineTo(hb, leistenHoehe - r);
      s.quadraticCurveTo(hb, leistenHoehe, hb - r, leistenHoehe);
      if (hb - r > -shb + r) {
        s.lineTo(-shb + r, leistenHoehe);
        s.quadraticCurveTo(-shb, leistenHoehe, -shb, leistenHoehe - r);
      } else {
        s.lineTo(-shb, leistenHoehe);
      }
    } else {
      s.lineTo(hb, leistenHoehe);
      s.lineTo(-shb, leistenHoehe);
    }
    s.lineTo(-shb, -glasDicke);
    s.lineTo(legInner, -glasDicke);
    s.lineTo(legInner, 0);
    s.closePath();
  } else {
    const legInnerR = Math.max(shb - leistenBreite, -hb);
    s.moveTo(-hb, 0);
    if (r > 0) {
      s.lineTo(-hb, leistenHoehe - r);
      s.quadraticCurveTo(-hb, leistenHoehe, -hb + r, leistenHoehe);
      if (-hb + r < shb - r) {
        s.lineTo(shb - r, leistenHoehe);
        s.quadraticCurveTo(shb, leistenHoehe, shb, leistenHoehe - r);
      } else {
        s.lineTo(shb, leistenHoehe);
      }
    } else {
      s.lineTo(-hb, leistenHoehe);
      s.lineTo(shb, leistenHoehe);
    }
    s.lineTo(shb, -glasDicke);
    s.lineTo(legInnerR, -glasDicke);
    s.lineTo(legInnerR, 0);
    s.closePath();
  }
  return s;
}
const VORN_BLECH = 2e-3;
function vornAbschlussLeistenProfil(flangeDepth, glasDicke) {
  const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  const b = VORN_BLECH;
  const gd = glasDicke;
  s.moveTo(0, -gd - b);
  s.lineTo(0, b);
  s.lineTo(flangeDepth, b);
  s.lineTo(flangeDepth, 0);
  s.lineTo(b, 0);
  s.lineTo(b, -gd);
  s.lineTo(flangeDepth, -gd);
  s.lineTo(flangeDepth, -gd - b);
  s.closePath();
  return s;
}

const VornAbschlussleiste = ({
  leistenBreite,
  eindeckungDicke,
  querbalkenBreite,
  glasOKVorne,
  glasNeig,
  zPos,
  leistenFarbe,
  material
}) => {
  const geom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (eindeckungDicke <= 0) return null;
    const profil = vornAbschlussLeistenProfil(
      leistenBreite > 0 ? leistenBreite : 0.02,
      eindeckungDicke
    );
    return createExtrudeGeometry(profil, querbalkenBreite);
  }, [leistenBreite, eindeckungDicke, querbalkenBreite]);
  if (!geom) return null;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      geometry: geom,
      position: [0, glasOKVorne, zPos - VORN_BLECH],
      rotation: [-glasNeig, -Math.PI / 2, 0],
      castShadow: true,
      receiveShadow: true,
      children: material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: leistenFarbe,
          metalness: MATERIAL_DEFAULTS.leiste.metalness,
          roughness: MATERIAL_DEFAULTS.leiste.roughness,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1
        }
      )
    }
  );
};

function useLeistenGeometrie(leistenBreite, leistenHoehe, sparrenBreite, eindeckungDicke, leistenRundung, schraegTiefe, schraegTiefeAussen) {
  const aktiv = leistenBreite > 0 && leistenHoehe > 0;
  const basis = `${gkey(leistenBreite)}|${gkey(leistenHoehe)}|${gkey(leistenRundung)}`;
  const abschlussBasis = `${basis}|${gkey(sparrenBreite)}|${gkey(eindeckungDicke)}`;
  const tAussen = schraegTiefeAussen ?? schraegTiefe;
  const normal = useCachedGeometryOrNull(
    aktiv ? `leiste|${basis}|${gkey(schraegTiefe)}` : null,
    () => createExtrudeGeometry(leistenProfil(leistenBreite, leistenHoehe, leistenRundung), schraegTiefe)
  );
  const links = useCachedGeometryOrNull(
    aktiv ? `leisteAbschluss|links|${abschlussBasis}|${gkey(schraegTiefe)}` : null,
    () => createExtrudeGeometry(
      abschlussLeistenProfil(leistenBreite, leistenHoehe, sparrenBreite, eindeckungDicke, leistenRundung, "links"),
      schraegTiefe
    )
  );
  const rechts = useCachedGeometryOrNull(
    aktiv ? `leisteAbschluss|rechts|${abschlussBasis}|${gkey(schraegTiefe)}` : null,
    () => createExtrudeGeometry(
      abschlussLeistenProfil(leistenBreite, leistenHoehe, sparrenBreite, eindeckungDicke, leistenRundung, "rechts"),
      schraegTiefe
    )
  );
  const linksAussen = useCachedGeometryOrNull(
    aktiv && tAussen > 0 ? `leisteAbschluss|links|${abschlussBasis}|${gkey(tAussen)}` : null,
    () => createExtrudeGeometry(
      abschlussLeistenProfil(leistenBreite, leistenHoehe, sparrenBreite, eindeckungDicke, leistenRundung, "links"),
      tAussen
    )
  );
  const rechtsAussen = useCachedGeometryOrNull(
    aktiv && tAussen > 0 ? `leisteAbschluss|rechts|${abschlussBasis}|${gkey(tAussen)}` : null,
    () => createExtrudeGeometry(
      abschlussLeistenProfil(leistenBreite, leistenHoehe, sparrenBreite, eindeckungDicke, leistenRundung, "rechts"),
      tAussen
    )
  );
  return { normal, links, rechts, linksAussen, rechtsAussen };
}

function useGlasPanels(alleSparrenPositionen, sparrenBreite) {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (alleSparrenPositionen.length < 2) return [];
    const luft = GLAS_PANEL_LUFT;
    const sparrenB2 = sparrenBreite / 2;
    const panels = [];
    for (let i = 0; i < alleSparrenPositionen.length - 1; i++) {
      const left = alleSparrenPositionen[i];
      const right = alleSparrenPositionen[i + 1];
      const isFirst = i === 0;
      const isLast = i === alleSparrenPositionen.length - 2;
      const leftEdge = isFirst ? left - sparrenB2 + luft / 2 : left + luft / 2;
      const rightEdge = isLast ? right + sparrenB2 - luft / 2 : right - luft / 2;
      const w = rightEdge - leftEdge;
      if (w > 0) {
        panels.push({
          xCenter: (leftEdge + rightEdge) / 2,
          panelBreite: w
        });
      }
    }
    return panels;
  }, [alleSparrenPositionen, sparrenBreite]);
}

const Dachflaeche = ({
  sparrenAnzahl,
  sparrenBreite,
  sparrenHoehe,
  gesamtBreite,
  querbalkenBreite,
  gesamtTiefe,
  hoeheVorne,
  hoeheHinten,
  quertraegerTiefe,
  quertraegerTiefeHinten,
  auflage = "aufliegend",
  material,
  sparrenModus = "alle",
  eindeckung = "ohne",
  eindeckungDicke = 0.016,
  glasFarbe = "#e8f4f8",
  metallFarbe = "#808080",
  opacity = 0.2,
  roughness = 0,
  metalness = 0,
  envMapIntensity = 1,
  kammergroesse = 0.05,
  amplitude = 38,
  frequenz = 76,
  leistenBreite = 0,
  leistenHoehe = 0,
  leistenFarbe = "#c0c0c0",
  leistenRundung = 0,
  extension = 0,
  wandanschlussHoehe = 0.046,
  wandanschlussTiefe = 0.056,
  wandanschlussFarbe = "#c0c0c0",
  dachVorsprung = 0,
  stirnblech = false,
  stirnblechHoehe = 0.03,
  stirnblechTiefe = 0.04,
  stirnblechFarbe = "#c0c0c0",
  vornAbschlussleiste = false,
  querbalken = false,
  qbalkenHoehe,
  qbalkenTiefe,
  platteMaterial,
  konstruktionMaterial,
  sparrenMaterial,
  leistenMaterial,
  wandanschlussMaterial
}) => {
  const qtHinten = quertraegerTiefeHinten ?? quertraegerTiefe;
  const sparren = useSparrenPositionen(querbalkenBreite, sparrenBreite, sparrenAnzahl, sparrenModus);
  const geo = useDachGeometrie({
    gesamtTiefe,
    hoeheVorne,
    hoeheHinten,
    sparrenHoehe,
    quertraegerTiefe,
    quertraegerTiefeHinten: qtHinten,
    auflage,
    dachVorsprung,
    eindeckungDicke
  });
  const glasPanels = useGlasPanels(sparren.alle, sparrenBreite);
  const slopeKorr = (zTarget) => Math.tan(geo.glasNeig) * (zTarget - geo.glasHinterkanteZ);
  const leistentopYPos = (zTarget) => geo.sparrenOKHinten + eindeckungDicke + leistenHoehe * Math.cos(geo.glasNeig) + slopeKorr(zTarget) + 5e-3;
  const wandanschlussDachSchenkelHoriz = wandanschlussTiefe * Math.cos(geo.glasNeig);
  const leistenHinterkanteZ = extension === 1 ? Math.min(geo.glasHinterkanteZ, gesamtTiefe / 2 - 1e-3 - wandanschlussDachSchenkelHoriz) : geo.glasHinterkanteZ;
  const leistenHorizLen = leistenHinterkanteZ - geo.glasVorderkanteZ;
  const leistenSchraegTiefe = leistenHorizLen > 0 ? leistenHorizLen / Math.cos(geo.glasNeig) : 0;
  const leistenZMitte = (geo.glasVorderkanteZ + leistenHinterkanteZ) / 2;
  const leistenHorizLenAussen = gesamtTiefe / 2 - geo.glasVorderkanteZ;
  const leistenSchraegTiefeAussen = leistenHorizLenAussen > 0 ? leistenHorizLenAussen / Math.cos(geo.glasNeig) : 0;
  const leistenZMitteAussen = (geo.glasVorderkanteZ + gesamtTiefe / 2) / 2;
  const leisten = useLeistenGeometrie(
    leistenBreite,
    leistenHoehe,
    sparrenBreite,
    eindeckungDicke,
    leistenRundung,
    leistenSchraegTiefe,
    leistenSchraegTiefeAussen
  );
  const sparrenMat = sparrenMaterial ?? konstruktionMaterial ?? material;
  const leistenMat = leistenMaterial ?? konstruktionMaterial ?? material;
  const wandMat = wandanschlussMaterial ?? konstruktionMaterial ?? material;
  const istGlas = isGlasEindeckung(eindeckung);
  const eindeckungBaseProps = {
    dicke: eindeckungDicke,
    hoeheVorne: geo.glasHoeheVorne,
    hoeheHinten: geo.glasHoeheHinten,
    innenliegend: false,
    glasFarbe,
    opacity,
    roughness,
    metalness,
    envMapIntensity,
    kammergroesse,
    material: platteMaterial
  };
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { name: "dachflaeche", children: [
    querbalken && (() => {
      const qHoehe = qbalkenHoehe ?? sparrenHoehe;
      const qTiefe = qbalkenTiefe ?? sparrenBreite;
      const qHDiff = geo.sparrenTiefe > 0 ? geo.hoeheDiff * qTiefe / geo.sparrenTiefe : 0;
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        Sparren,
        {
          breite: gesamtBreite,
          hoehe: qHoehe,
          tiefe: qTiefe,
          hoeheDiff: qHDiff,
          material: sparrenMat,
          position: [
            0,
            geo.sparrenY + geo.hoeheDiff / 2 - qHDiff / 2,
            geo.sparrenZ + geo.sparrenTiefe / 2 - qTiefe / 2
          ]
        }
      );
    })(),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SparrenInstanced,
      {
        breite: sparrenBreite,
        hoehe: sparrenHoehe,
        tiefe: geo.sparrenTiefe,
        hoeheDiff: geo.hoeheDiff,
        material: sparrenMat,
        positionY: geo.sparrenY,
        positionZ: geo.sparrenZ,
        xPositionen: sparren.gefiltert
      }
    ),
    istGlas ? glasPanels.map((panel, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [panel.xCenter, 0, geo.glasZOffset], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Eindeckung,
      {
        typ: eindeckung,
        breite: panel.panelBreite,
        tiefe: geo.sparrenTiefe,
        ...eindeckungBaseProps
      }
    ) }, `glas-panel-${i}`)) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Eindeckung,
      {
        typ: eindeckung,
        breite: gesamtBreite,
        tiefe: geo.sparrenTiefe,
        ...eindeckungBaseProps,
        metallFarbe,
        amplitude,
        frequenz
      }
    ),
    istGlas && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      GummiDichtungen,
      {
        sparrenPositionen: sparren.gefiltert,
        eindeckungDicke,
        sparrenOKVorne: geo.sparrenOKVorne,
        sparrenOKHinten: geo.sparrenOKHinten,
        effektiveTiefeRoh: geo.effektiveTiefeRoh,
        glasZOffset: geo.glasZOffset,
        leistenZMitte,
        leistenSchraegTiefe
      }
    ),
    istGlas && leisten.normal && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Glasleisten,
      {
        alleSparrenPositionen: sparren.alle,
        aussenLinks: sparren.aussenLinks,
        aussenRechts: sparren.aussenRechts,
        leistenGeom: leisten.normal,
        leistenGeomLinks: leisten.links,
        leistenGeomRechts: leisten.rechts,
        leistenGeomLinksAussen: leisten.linksAussen,
        leistenGeomRechtsAussen: leisten.rechtsAussen,
        sparrenOKVorne: geo.sparrenOKVorne,
        sparrenOKHinten: geo.sparrenOKHinten,
        eindeckungDicke,
        effektiveTiefeRoh: geo.effektiveTiefeRoh,
        glasZOffset: geo.glasZOffset,
        leistenZMitte,
        leistenZMitteAussen,
        leistenFarbe,
        material: leistenMat
      }
    ),
    extension === 1 && istGlas && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Wandanschluss,
      {
        wandanschlussHoehe,
        wandanschlussTiefe,
        farbe: wandanschlussFarbe,
        leistenHoehe: leistenHoehe + 5e-3 / Math.cos(geo.glasNeig),
        glasNeig: geo.glasNeig,
        anschlussBreite: querbalkenBreite,
        zPos: gesamtTiefe / 2 - 1e-3,
        yPos: leistentopYPos(gesamtTiefe / 2 - 1e-3),
        material: wandMat
      }
    ),
    extension === 2 && istGlas && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Winkelprofil,
      {
        hoehe: leistentopYPos(gesamtTiefe / 2 + BLECH_STAERKE) - (hoeheHinten - 0.02),
        tiefe: wandanschlussTiefe,
        farbe: wandanschlussFarbe,
        glasNeig: geo.glasNeig,
        breite: querbalkenBreite,
        gummiDicke: leistenHoehe * Math.cos(geo.glasNeig) + 5e-3,
        zPos: gesamtTiefe / 2 + BLECH_STAERKE,
        yPos: leistentopYPos(gesamtTiefe / 2 + BLECH_STAERKE),
        material: wandMat
      }
    ),
    stirnblech && istGlas && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Stirnblech,
      {
        stirnblechHoehe,
        stirnblechTiefe,
        farbe: stirnblechFarbe,
        anschlussBreite: querbalkenBreite,
        yPos: geo.sparrenOKVorne + eindeckungDicke + BLECH_STAERKE + 4e-3 - quertraegerTiefe * Math.tan(geo.glasNeig),
        zPos: geo.glasVorderkanteZ - quertraegerTiefe + stirnblechTiefe / 2 + 4e-3,
        neigung: geo.glasNeig,
        material: wandMat
      }
    ),
    vornAbschlussleiste && istGlas && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      VornAbschlussleiste,
      {
        leistenBreite,
        eindeckungDicke,
        querbalkenBreite,
        glasOKVorne: geo.sparrenOKVorne + eindeckungDicke,
        glasNeig: geo.glasNeig,
        zPos: auflage === "innenliegend" ? -gesamtTiefe / 2 + dachVorsprung + quertraegerTiefe : -gesamtTiefe / 2,
        leistenFarbe,
        material: leistenMat
      }
    )
  ] });
};

const CAP_TRIS = [[4, 0, 5], [4, 1, 0], [4, 2, 1], [4, 3, 2]];
const Seitenabschluss = ({
  seitenabschlussHoehe,
  seitenabschlussTiefe,
  farbe,
  material,
  laenge,
  xPos,
  yPos,
  zPos,
  neigung,
  seite,
  zVorne,
  zHinten
}) => {
  const geom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const inDir = seite === "rechts" ? -1 : 1;
    const outDir = seite === "rechts" ? 1 : -1;
    const t = seitenabschlussTiefe;
    const h = seitenabschlussHoehe;
    const s = BLECH_STAERKE;
    if (zVorne !== void 0 && zHinten !== void 0) {
      const cosN = Math.cos(neigung);
      const sinN = Math.sin(neigung);
      const px = [inDir * t, outDir * s, outDir * s, 0, 0, inDir * t];
      const py = [0, 0, -h, -h, -s, -s];
      const N = 6;
      const lzAt = (worldZ, yi) => (worldZ - zPos + yi * sinN) / cosN;
      const verts = new Float32Array(N * 2 * 3);
      for (let i = 0; i < N; i++) {
        const xi = px[i], yi = py[i];
        verts[i * 3 + 0] = xi;
        verts[i * 3 + 1] = yi;
        verts[i * 3 + 2] = lzAt(zVorne, yi);
        verts[(N + i) * 3 + 0] = xi;
        verts[(N + i) * 3 + 1] = yi;
        verts[(N + i) * 3 + 2] = lzAt(zHinten, yi);
      }
      const idx = [];
      for (const [a, b, c] of CAP_TRIS) idx.push(a, b, c);
      for (const [a, b, c] of CAP_TRIS) idx.push(N + a, N + c, N + b);
      for (let i = 0; i < N; i++) {
        const next = (i + 1) % N;
        idx.push(i, N + i, N + next);
        idx.push(i, N + next, next);
      }
      const g2 = new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferGeometry();
      g2.setAttribute("position", new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferAttribute(verts, 3));
      g2.setIndex(idx);
      g2.computeVertexNormals();
      return g2;
    }
    const l = laenge ?? 1;
    const profil = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    profil.moveTo(inDir * t, 0);
    profil.lineTo(outDir * s, 0);
    profil.lineTo(outDir * s, -h);
    profil.lineTo(0, -h);
    profil.lineTo(0, -s);
    profil.lineTo(inDir * t, -s);
    profil.closePath();
    const g = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(profil, {
      steps: 1,
      depth: l,
      bevelEnabled: false
    });
    g.translate(0, 0, -l / 2);
    return g;
  }, [seite, seitenabschlussHoehe, seitenabschlussTiefe, neigung, zPos, zVorne, zHinten, laenge]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      geometry: geom,
      position: [xPos, yPos, zPos],
      rotation: [-neigung, 0, 0],
      castShadow: true,
      receiveShadow: true,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        MaterialFallback,
        {
          material: material ?? void 0,
          fallbackColor: typeof farbe === "string" ? farbe : void 0,
          metalness: MATERIAL_DEFAULTS.metall.metalness,
          roughness: MATERIAL_DEFAULTS.metall.roughness,
          clearcoat: MATERIAL_DEFAULTS.metall.clearcoat,
          clearcoatRoughness: MATERIAL_DEFAULTS.metall.clearcoatRoughness,
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1
        }
      )
    }
  );
};

const Konstruktion = ({
  gesamtBreite,
  gesamtTiefe,
  hoeheVorne,
  hoeheHinten,
  pfostenAnzahlVorne,
  pfostenAnzahlHinten,
  pfostenTyp,
  pfostenBreite,
  pfostenTiefe,
  pfostenBreiteHinten = pfostenBreite,
  pfostenTiefeHinten = pfostenTiefe,
  quertraegerHoehe,
  quertraegerHoeheHinten,
  quertraegerTiefe,
  dachVorsprung = 0,
  material
}) => {
  const effectiveQuertraegerHoeheHinten = quertraegerHoeheHinten ?? quertraegerHoehe;
  const steigung = gesamtTiefe > 0 ? (hoeheHinten - hoeheVorne) / gesamtTiefe : 0;
  const zMitteVorne = dachVorsprung + pfostenTiefe / 2;
  const hoeheAnPfosten = hoeheVorne + steigung * zMitteVorne;
  const pfostenHoeheVorne = hoeheAnPfosten - quertraegerHoehe;
  const pfostenHoeheHinten = hoeheHinten - effectiveQuertraegerHoeheHinten;
  const positionenVorne = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => berechnePositionen(gesamtBreite, pfostenAnzahlVorne),
    [gesamtBreite, pfostenAnzahlVorne]
  );
  const positionenHinten = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => berechnePositionen(gesamtBreite, pfostenAnzahlHinten),
    [gesamtBreite, pfostenAnzahlHinten]
  );
  const zVorne = -gesamtTiefe / 2 + dachVorsprung + pfostenTiefe / 2;
  const zHinten = gesamtTiefe / 2 - pfostenTiefeHinten / 2;
  const quertraegerZVorne = -gesamtTiefe / 2 + dachVorsprung + quertraegerTiefe / 2;
  const quertraegerZHinten = gesamtTiefe / 2 - quertraegerTiefe / 2;
  const quertraegerBreite = gesamtBreite + pfostenBreite;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { name: "konstruktion", castShadow: true, receiveShadow: true, children: [
    positionenVorne.map((xPos, index) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Pfosten,
      {
        typ: pfostenTyp,
        breite: pfostenBreite,
        tiefe: pfostenTiefe,
        hoehe: pfostenHoeheVorne,
        material,
        position: [xPos, pfostenHoeheVorne / 2, zVorne]
      },
      `pfosten-vorne-${index}`
    )),
    positionenHinten.map((xPos, index) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Pfosten,
      {
        typ: pfostenTyp,
        breite: pfostenBreiteHinten,
        tiefe: pfostenTiefeHinten,
        hoehe: pfostenHoeheHinten,
        material,
        position: [xPos, pfostenHoeheHinten / 2, zHinten]
      },
      `pfosten-hinten-${index}`
    )),
    quertraegerHoehe > 0 && quertraegerTiefe > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Box,
      {
        args: [
          quertraegerBreite,
          quertraegerHoehe,
          quertraegerTiefe
        ],
        position: [
          0,
          hoeheAnPfosten - quertraegerHoehe / 2,
          quertraegerZVorne
        ],
        material
      }
    ),
    quertraegerHoehe > 0 && quertraegerTiefe > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Box,
      {
        args: [
          quertraegerBreite,
          quertraegerHoehe,
          quertraegerTiefe
        ],
        position: [
          0,
          hoeheHinten - quertraegerHoehe / 2,
          quertraegerZHinten
        ],
        material
      }
    )
  ] });
};

const GLAS_EINDECKUNG_MAP = {
  0: "glas",
  1: "polycarbonat"
};
function GlasEindeckungModel(props) {
  const {
    // Sparren (eigene Props)
    sparrenAnzahl: sparrenAnzahlProp = 6,
    sparrenBreite: sparrenBreiteProp = 0.06,
    sparrenHoehe: sparrenHoeheProp = 0.12,
    sparrenAuflage: _sparrenAuflageProp = 0,
    sparrenAussen = 0,
    sparrenAussenBreite: sparrenAussenBreiteProp = 0.06,
    sparrenAussenHoehe: sparrenAussenHoeheProp = 0.12,
    // Querträger
    quertraegerTiefe = 0.1,
    // Eindeckung (0=Glas, 1=Polycarbonat)
    eindeckungTyp = 0,
    eindeckungDicke = 0.016,
    opacity = 0.2,
    roughness = 0,
    metalness = 0,
    envMapIntensity = 1,
    kammergroesse = 0.05,
    // Glasleisten
    leistenBreite = 0,
    leistenHoehe = 0,
    leistenRundung = 0,
    extension = 0,
    wandanschlussHoehe = 0.046,
    wandanschlussTiefe = 0.056,
    // Vorn-Abschlussleiste
    vornAbschlussleiste = 0,
    // Stirnblech
    stirnblech = 0,
    stirnblechHoehe = 0.08,
    stirnblechTiefe = 0.04,
    // Separate Slots für Bauteile
    einzelMaterialien = 0,
    querbalken = 0,
    querbalkenHoehe = 0,
    querbalkenBreite = 0,
    // K3 System
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const parent = useVerandaGeometry();
  const width = parent.isQubus ? parent.innerWidth || 0 : parent.width || Number(exprVal(props.width)) || 4;
  const depth = parent.isQubus ? parent.innerDepth || 0 : parent.depth || Number(exprVal(props.depth)) || 3;
  const height = parent.height || 0;
  const dachneigung = parent.eindeckungDachneigung ?? parent.dachneigung;
  const pfostenTiefe = parent.pfostenTiefe || 0.1;
  const gesamtBreite = width;
  const isAR = useIsARMode();
  const pfettenBreite = parent.pfettenBreite;
  const schwelleBreite = parent.schwelleBreite;
  const profilMaterial = materials.profil;
  if (profilMaterial) profilMaterial.name = "profil";
  const sparrenAnzahl = Number(exprVal(sparrenAnzahlProp));
  const sparrenBreite = Number(exprVal(sparrenBreiteProp)) || parent.sparrenBreite;
  const sparrenHoehe = Number(exprVal(sparrenHoeheProp)) || parent.sparrenHoehe;
  const sparrenAussenBreite = Number(exprVal(sparrenAussenBreiteProp)) || sparrenBreite;
  const sparrenAussenHoehe = Number(exprVal(sparrenAussenHoeheProp)) || sparrenHoehe;
  const sparrenAuflage = Number(exprVal(_sparrenAuflageProp));
  const useEinzel = Number(exprVal(einzelMaterialien)) === 1;
  const konstruktionMaterial = useEinzel ? materials.konstruktion ?? profilMaterial : profilMaterial;
  const sparrenMaterial = useEinzel ? materials.sparren ?? profilMaterial : profilMaterial;
  const leistenMaterial = useEinzel ? materials.leisten ?? profilMaterial : profilMaterial;
  const wandanschlussMaterial = useEinzel ? materials.wandanschluss ?? profilMaterial : profilMaterial;
  if (useEinzel) {
    if (materials.konstruktion) materials.konstruktion.name = "konstruktion";
    if (materials.sparren) materials.sparren.name = "sparren";
    if (materials.leisten) materials.leisten.name = "leisten";
    if (materials.wandanschluss) materials.wandanschluss.name = "wandanschluss";
  }
  const eindeckung = GLAS_EINDECKUNG_MAP[Number(eindeckungTyp)] ?? "glas";
  const platteMaterial = eindeckung === "glas" ? materials.glas : materials.poly;
  if (platteMaterial) {
    platteMaterial.name = eindeckung === "glas" ? "glas" : "poly";
  }
  const _eindeckungDicke = Number(exprVal(eindeckungDicke));
  const _leistenHoehe = Number(exprVal(leistenHoehe));
  const _leistenBreite = Number(exprVal(leistenBreite));
  const _leistenRundung = Number(exprVal(leistenRundung));
  const _opacity = Number(exprVal(opacity));
  const _roughness = Number(exprVal(roughness));
  const _metalness = Number(exprVal(metalness));
  const _envMapIntensity = Number(exprVal(envMapIntensity));
  const _kammergroesse = Number(exprVal(kammergroesse));
  const _wandanschlussHoehe = Number(exprVal(wandanschlussHoehe));
  const _wandanschlussTiefe = Number(exprVal(wandanschlussTiefe));
  const _stirnblechHoehe = Number(exprVal(stirnblechHoehe));
  const _stirnblechTiefe = Number(exprVal(stirnblechTiefe));
  const _vornAbschlussleiste = Number(exprVal(vornAbschlussleiste));
  const { hoeheHinten: baseHHinten, hoeheVorne: baseHVorne } = calcVerandaGeometry(
    depth,
    dachneigung,
    height
  );
  const qubusOffset = parent.isQubus ? _eindeckungDicke + _leistenHoehe + (Number(parent.sparrenAuflage) === 0 ? sparrenHoehe : 0) : 0;
  const hoeheVorne = baseHVorne - qubusOffset;
  const hoeheHinten = baseHHinten - qubusOffset;
  const auflageTyp = sparrenAuflage === 1 ? "innenliegend" : "aufliegend";
  const hatAussenSparren = Number(exprVal(sparrenAussen)) === 1;
  const { setEindeckungInfo, setUnterEindeckungHoehe, setAussensparrenHoehe, setSparrenAuflage, setSparrenHoehe: setSparrenHoeheCtx } = useEindeckungInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(
      _eindeckungDicke,
      _leistenHoehe,
      Number(extension) === 1,
      _wandanschlussTiefe,
      sparrenAnzahl,
      qubusOffset
    );
    setUnterEindeckungHoehe((sparrenAuflage === 0 ? sparrenHoehe : 0) + _eindeckungDicke + _leistenHoehe);
    setAussensparrenHoehe(hatAussenSparren ? sparrenAussenHoehe : 0);
    setSparrenAuflage(sparrenAuflage);
    setSparrenHoeheCtx(sparrenHoehe);
    return () => {
      setUnterEindeckungHoehe(0);
      setAussensparrenHoehe(0);
      setSparrenAuflage(0);
      setSparrenHoeheCtx(0.12);
    };
  }, [_eindeckungDicke, _leistenHoehe, sparrenAuflage, sparrenHoehe, extension, _wandanschlussTiefe, sparrenAnzahl, qubusOffset, hatAussenSparren, sparrenAussenHoehe, setEindeckungInfo, setUnterEindeckungHoehe, setAussensparrenHoehe, setSparrenAuflage, setSparrenHoeheCtx]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!platteMaterial) return;
    const mat = platteMaterial;
    if (isAR) {
      mat.transparent = false;
      mat.opacity = 1;
      mat.depthWrite = true;
      mat.roughness = 0.15;
    } else {
      mat.transparent = _opacity < 1;
      mat.opacity = _opacity;
      mat.depthWrite = _opacity >= 1;
      mat.roughness = _roughness;
    }
    mat.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
    mat.needsUpdate = true;
    patchSurface(mat, "glas", { strength: isAR ? 0 : 1 });
  }, [platteMaterial, _opacity, _roughness, isAR]);
  const _querbalken = Number(exprVal(querbalken)) === 1;
  const _querbalkenHoehe = Number(exprVal(querbalkenHoehe)) || sparrenHoehe;
  const _querbalkenBreite = Number(exprVal(querbalkenBreite)) || sparrenBreite;
  const _quertraegerTiefe = Number(exprVal(quertraegerTiefe));
  const qtVorne = parent.isQubus ? 0 : sparrenAuflage === 1 ? Number(exprVal(parent.schwelle)) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0 : _quertraegerTiefe;
  const qtHinten = parent.isQubus ? 0 : sparrenAuflage === 1 ? Number(exprVal(parent.pfette)) === 1 ? pfettenBreite : 0 : 0;
  const glasFarbeHex = "#88bbcc";
  const leistenFarbeHex = "#c0c0c0";
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
        hatAussenSparren && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Dachflaeche,
          {
            sparrenAnzahl,
            sparrenBreite: sparrenAussenBreite,
            sparrenHoehe: sparrenAussenHoehe,
            gesamtBreite,
            querbalkenBreite: gesamtBreite,
            gesamtTiefe: depth,
            hoeheVorne,
            hoeheHinten,
            quertraegerTiefe: qtVorne,
            quertraegerTiefeHinten: qtHinten,
            auflage: auflageTyp,
            sparrenModus: "nurAussen",
            material: sparrenMaterial,
            eindeckung: "ohne",
            dachVorsprung: 0
          }
        ),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Dachflaeche,
          {
            sparrenAnzahl,
            sparrenBreite,
            sparrenHoehe,
            gesamtBreite,
            querbalkenBreite: gesamtBreite,
            gesamtTiefe: depth,
            hoeheVorne,
            hoeheHinten,
            quertraegerTiefe: qtVorne,
            quertraegerTiefeHinten: qtHinten,
            auflage: auflageTyp,
            sparrenModus: "nurInnen",
            material: konstruktionMaterial,
            konstruktionMaterial,
            sparrenMaterial,
            leistenMaterial,
            wandanschlussMaterial,
            platteMaterial,
            eindeckung,
            eindeckungDicke: _eindeckungDicke,
            glasFarbe: glasFarbeHex,
            opacity: _opacity,
            roughness: _roughness,
            metalness: _metalness,
            envMapIntensity: _envMapIntensity,
            kammergroesse: _kammergroesse,
            leistenBreite: _leistenBreite,
            leistenHoehe: _leistenHoehe,
            leistenFarbe: leistenFarbeHex,
            leistenRundung: _leistenRundung,
            extension: Number(extension),
            wandanschlussHoehe: _wandanschlussHoehe,
            wandanschlussTiefe: _wandanschlussTiefe,
            wandanschlussFarbe: leistenFarbeHex,
            dachVorsprung: 0,
            stirnblech: Number(exprVal(stirnblech)) === 1,
            stirnblechHoehe: _stirnblechHoehe,
            stirnblechTiefe: _stirnblechTiefe,
            vornAbschlussleiste: _vornAbschlussleiste === 1,
            querbalken: _querbalken,
            qbalkenHoehe: _querbalkenHoehe,
            qbalkenTiefe: _querbalkenBreite
          }
        )
      ]
    }
  );
}
const glasEindeckungPropsSchema = {
  eindeckungTyp: {
    type: "radioGroup",
    label: "Material (0=Glas, 1=Polycarbonat)",
    options: [
      { value: "0", label: "Glas" },
      { value: "1", label: "Polycarbonat" }
    ]
  },
  eindeckungDicke: { type: "expression", label: "Dicke (m)" },
  // Material Properties
  opacity: { type: "expression", label: "Transparenz (0–1)" },
  roughness: { type: "expression", label: "Rauheit (0–1)" },
  metalness: { type: "expression", label: "Metalness (0–1)" },
  envMapIntensity: { type: "expression", label: "EnvMap-Intensität (Multiplikator)" },
  kammergroesse: { type: "expression", label: "Poly Kammergröße (m)" },
  // Sparren
  sparrenAnzahl: { type: "expression", label: "Sparren Anzahl (Stück)" },
  sparrenBreite: { type: "expression", label: "Sparren Breite (m)" },
  sparrenHoehe: { type: "expression", label: "Sparren Höhe (m)" },
  sparrenAuflage: { type: "radioGroup", label: "Auflage (0=Aufliegend, 1=Innenliegend)", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  sparrenAussen: { type: "expression", label: "Außen-Sparren (0=Nein, 1=Ja)" },
  sparrenAussenBreite: { type: "expression", label: "Außen-Sparren Breite (m)" },
  sparrenAussenHoehe: { type: "expression", label: "Außen-Sparren Höhe (m)" },
  // Glasleisten
  leistenBreite: { type: "expression", label: "Leisten Breite (m)" },
  leistenHoehe: { type: "expression", label: "Leisten Höhe (m)" },
  leistenRundung: { type: "expression", label: "Leisten Rundung (0–10)" },
  // Abschlüsse
  extension: { type: "expression", label: "Anschluss (0=kein, 1=Wandanschluss, 2=Winkelprofil)" },
  wandanschlussHoehe: { type: "expression", label: "Anschluss Höhe (m)" },
  wandanschlussTiefe: { type: "expression", label: "Anschluss Tiefe (m)" },
  stirnblech: { type: "expression", label: "Stirnblech (0=Nein, 1=Ja)" },
  stirnblechHoehe: { type: "expression", label: "Stirnblech Höhe (m)" },
  stirnblechTiefe: { type: "expression", label: "Stirnblech Tiefe (m)" },
  vornAbschlussleiste: { type: "expression", label: "Vorn-Abschlussleiste (0=Nein, 1=Ja)" },
  querbalken: { type: "expression", label: "Querbalken (0=Nein, 1=Ja)" },
  querbalkenHoehe: { type: "expression", label: "Querbalken Höhe (m)" },
  querbalkenBreite: { type: "expression", label: "Querbalken Breite (m)" },
  einzelMaterialien: { type: "radioGroup", label: "Separate Bauteil-Materialien (0=Nein, 1=Ja)", options: [{ value: "0", label: "Nein" }, { value: "1", label: "Ja" }] }
};
const glasEindeckungDynamicModel = {
  type: "veranda-glas-eindeckung",
  label: "Glas-/Poly-Eindeckung",
  description: "Eindeckung – Glas oder Polycarbonat",
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    sparrenAnzahl: { expression: "6" },
    sparrenBreite: { expression: "0.06" },
    sparrenHoehe: { expression: "0.12" },
    sparrenAuflage: { expression: "0" },
    sparrenAussen: { expression: "0" },
    sparrenAussenBreite: { expression: "0.06" },
    sparrenAussenHoehe: { expression: "0.12" },
    quertraegerHoehe: { expression: "0.1" },
    quertraegerTiefe: { expression: "0.1" },
    eindeckungTyp: { expression: "0" },
    eindeckungDicke: { expression: "0.016" },
    opacity: { expression: "0.2" },
    roughness: { expression: "0.0" },
    metalness: { expression: "0.0" },
    envMapIntensity: { expression: "1.0" },
    kammergroesse: { expression: "0.05" },
    leistenBreite: { expression: "0.03" },
    leistenHoehe: { expression: "0.01" },
    leistenRundung: { expression: "0" },
    extension: { expression: "1" },
    wandanschlussHoehe: { expression: "0.046" },
    wandanschlussTiefe: { expression: "0.056" },
    stirnblech: { expression: "0" },
    stirnblechHoehe: { expression: "0.08" },
    stirnblechTiefe: { expression: "0.04" },
    vornAbschlussleiste: { expression: "0" },
    querbalken: { expression: "0" },
    querbalkenHoehe: { expression: "0" },
    querbalkenBreite: { expression: "0" },
    einzelMaterialien: { expression: "0" }
  },
  propsDialog: glasEindeckungPropsSchema,
  component: GlasEindeckungModel,
  materials: ["profil", "konstruktion", "sparren", "leisten", "wandanschluss", "glas", "poly"],
  disabledForAR: false
};

const METALL_EINDECKUNG_MAP = {
  0: "welle",
  1: "trapez"
};
function MetallEindeckungModel(props) {
  const tier = useLicenseTier();
  if (!hasLicense(tier, "Enterprise")) return null;
  const {
    // Querbalken
    balkenAnzahl = 4,
    balkenBreite = 0.06,
    balkenHoehe = 0.08,
    // Eindeckung (0=Welle, 1=Trapez)
    eindeckung = 0,
    eindeckungDicke = 8e-3,
    amplitude = 38,
    frequenz = 76,
    // Anschlüsse
    wandanschluss = 1,
    wandanschlussHoehe = 0.046,
    wandanschlussTiefe = 0.056,
    stirnblech = 1,
    stirnblechHoehe = 0.03,
    stirnblechTiefe = 0.04,
    seitenabschluss = 1,
    seitenabschlussHoehe = 0.03,
    seitenabschlussTiefe = 0.04,
    sparrenAussen = 1,
    sparrenAuflage: _sparrenAuflageProp = 0,
    laengsbalkenBreite = 0.06,
    laengsbalkenHoehe = 0.08,
    // K3 System
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const parent = useVerandaGeometry();
  const width = parent.isQubus ? parent.innerWidth || 0 : parent.width || Number(exprVal(props.width)) || 4;
  const depth = parent.isQubus ? parent.innerDepth || 0 : parent.depth || Number(exprVal(props.depth)) || 3;
  const height = parent.height || 0;
  const dachneigung = parent.eindeckungDachneigung ?? parent.dachneigung;
  const sparrenHoehe = parent.sparrenHoehe || 0.12;
  const profilMaterial = materials.profil;
  const eindeckungMaterial = materials.eindeckung ?? materials.metall;
  const eindeckungProfilMaterial = materials["eindeckung-profil"] ?? eindeckungMaterial;
  if (profilMaterial) profilMaterial.name = "profil";
  if (eindeckungMaterial) eindeckungMaterial.name = "eindeckung";
  if (eindeckungProfilMaterial && eindeckungProfilMaterial !== eindeckungMaterial)
    eindeckungProfilMaterial.name = "eindeckung-profil";
  const _balkenAnzahl = Number(exprVal(balkenAnzahl));
  const _balkenBreite = Number(exprVal(balkenBreite));
  const _balkenHoehe = Number(exprVal(balkenHoehe));
  const _eindeckungDicke = Number(exprVal(eindeckungDicke));
  const _amplitude = Number(exprVal(amplitude));
  const _frequenz = Number(exprVal(frequenz));
  const _wandanschlussHoehe = Number(exprVal(wandanschlussHoehe));
  const _wandanschlussTiefe = Number(exprVal(wandanschlussTiefe));
  const _stirnblechHoehe = Number(exprVal(stirnblechHoehe));
  const _stirnblechTiefe = Number(exprVal(stirnblechTiefe));
  const _seitenabschlussHoehe = Number(exprVal(seitenabschlussHoehe));
  const _seitenabschlussTiefe = Number(exprVal(seitenabschlussTiefe));
  const _laengsbalkenBreite = Number(exprVal(laengsbalkenBreite));
  const _laengsbalkenHoehe = Number(exprVal(laengsbalkenHoehe));
  const hatAussenSparren = Number(exprVal(sparrenAussen)) === 1;
  const sparrenAuflage = Number(exprVal(_sparrenAuflageProp));
  const eindeckungBreite = width;
  const querbalkenBreite = eindeckungBreite;
  const { hoeheHinten: baseHHinten, hoeheVorne: baseHVorne } = calcVerandaGeometry(depth, dachneigung, height);
  const eindeckungTyp = METALL_EINDECKUNG_MAP[Number(exprVal(eindeckung))] ?? "welle";
  const metallPeakOffset = eindeckungTyp === "welle" ? _eindeckungDicke + 2 * (_amplitude / 200) : _eindeckungDicke + _amplitude / 100;
  const talOffset = calcEindeckungBottomOffset(eindeckungTyp, _eindeckungDicke, _amplitude);
  const neigungRad = Math.atan2(baseHHinten - baseHVorne, depth);
  const auflageOffset = talOffset * (1 / Math.cos(neigungRad) - 1) + 1e-3;
  const qubusOffset = parent.isQubus ? metallPeakOffset + auflageOffset + (sparrenAuflage === 0 ? sparrenHoehe : 0) : 0;
  const hoeheVorne = baseHVorne - qubusOffset;
  const hoeheHinten = baseHHinten - qubusOffset;
  const { setEindeckungInfo, setUnterEindeckungHoehe, setAussensparrenHoehe, setSparrenAuflage, setSparrenHoehe: setSparrenHoeheCtx } = useEindeckungInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(
      _eindeckungDicke,
      0,
      Number(wandanschluss) === 1,
      _wandanschlussTiefe,
      hatAussenSparren ? 2 : 0,
      qubusOffset
    );
    setUnterEindeckungHoehe(
      (sparrenAuflage === 0 ? sparrenHoehe : 0) + metallPeakOffset + auflageOffset
    );
    setAussensparrenHoehe(hatAussenSparren ? _laengsbalkenHoehe : 0);
    setSparrenAuflage(sparrenAuflage);
    setSparrenHoeheCtx(sparrenHoehe);
    return () => {
      setUnterEindeckungHoehe(0);
      setAussensparrenHoehe(0);
      setSparrenAuflage(0);
      setSparrenHoeheCtx(0.12);
    };
  }, [
    _eindeckungDicke,
    sparrenAuflage,
    metallPeakOffset,
    auflageOffset,
    sparrenHoehe,
    wandanschluss,
    _wandanschlussTiefe,
    hatAussenSparren,
    _laengsbalkenHoehe,
    qubusOffset,
    setEindeckungInfo,
    setUnterEindeckungHoehe,
    setAussensparrenHoehe,
    setSparrenAuflage,
    setSparrenHoeheCtx
  ]);
  const metallFarbeHex = "#808080";
  const dachVS_m = 0;
  const pfostenTiefe_m = parent.pfostenTiefe;
  const schwEff_m = !parent.isQubus && Number(exprVal(parent.schwelle)) === 1 ? Math.max(parent.schwelleBreite, pfostenTiefe_m) : 0;
  const pfEff_m = !parent.isQubus && Number(exprVal(parent.pfette)) === 1 ? parent.pfettenBreite : 0;
  const zInnenV_m = sparrenAuflage === 1 ? -depth / 2 + dachVS_m + schwEff_m : -depth / 2;
  const zInnenH_m = sparrenAuflage === 1 ? depth / 2 - pfEff_m : depth / 2;
  const innerD_m = Math.max(0.01, zInnenH_m - zInnenV_m);
  const zCenter_m = (zInnenV_m + zInnenH_m) / 2;
  const steig_m = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  const hVorne_m = sparrenAuflage === 1 ? hoeheVorne + steig_m * (dachVS_m + schwEff_m) : hoeheVorne;
  const hHinten_m = sparrenAuflage === 1 ? hoeheHinten - steig_m * pfEff_m : hoeheHinten;
  const sparrenOberkante = sparrenAuflage === 0 ? {
    vorne: hoeheVorne + sparrenHoehe,
    hinten: hoeheHinten + sparrenHoehe
  } : sparrenAuflage === 1 ? { vorne: hVorne_m, hinten: hHinten_m } : { vorne: hoeheVorne, hinten: hoeheHinten };
  const metallOKVorne = sparrenOberkante.vorne + metallPeakOffset + auflageOffset;
  const metallOKHinten = sparrenOberkante.hinten + metallPeakOffset + auflageOffset;
  const hoeheDiff = metallOKHinten - metallOKVorne;
  const glasNeig = Math.atan2(hoeheDiff, innerD_m);
  const slopePerZ_m = innerD_m > 0 ? hoeheDiff / innerD_m : 0;
  const seitenLuft = 2e-3;
  const effSeitenTiefe = _seitenabschlussTiefe;
  const seitenLip = 0.01;
  const effSeitenHoehe = Math.max(
    _seitenabschlussHoehe,
    metallPeakOffset + seitenLip
  );
  const seitenZPos_m = (zInnenV_m + depth / 2) / 2;
  const seitenYPos_m = metallOKVorne + slopePerZ_m * (seitenZPos_m - zInnenV_m) + 1e-3;
  const balkenPositionen = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (_balkenAnzahl <= 0) return [];
    if (_balkenAnzahl === 1) return [zCenter_m];
    return Array.from({ length: _balkenAnzahl }, (_, i) => {
      const t = (i + 1) / (_balkenAnzahl + 1);
      return zInnenV_m + t * innerD_m;
    });
  }, [_balkenAnzahl, zInnenV_m, innerD_m, zCenter_m]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
        balkenPositionen.map((zPos, index) => {
          const t = innerD_m > 0 ? (zPos - zInnenV_m) / innerD_m : 0.5;
          const oberkante = sparrenOberkante.vorne + t * (sparrenOberkante.hinten - sparrenOberkante.vorne);
          const neigung = Math.atan2(
            sparrenOberkante.hinten - sparrenOberkante.vorne,
            innerD_m
          );
          const balkenY = oberkante - _balkenHoehe / (2 * Math.cos(neigung));
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [0, balkenY, zPos],
              rotation: [-neigung, 0, 0],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "boxGeometry",
                  {
                    args: [querbalkenBreite, _balkenHoehe, _balkenBreite / Math.cos(neigung)]
                  }
                ),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
              ]
            },
            `balken-${index}`
          );
        }),
        hatAussenSparren && [-1, 1].map((seite) => {
          const xPos = seite * (eindeckungBreite / 2 - _laengsbalkenBreite / 2);
          const oberkante = (sparrenOberkante.vorne + sparrenOberkante.hinten) / 2;
          const balkenY = oberkante - _laengsbalkenHoehe / 2;
          const neigung = Math.atan2(
            sparrenOberkante.hinten - sparrenOberkante.vorne,
            innerD_m
          );
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [xPos, balkenY, zCenter_m],
              rotation: [-neigung, 0, 0],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "boxGeometry",
                  {
                    args: [
                      _laengsbalkenBreite,
                      _laengsbalkenHoehe,
                      innerD_m / Math.cos(neigung)
                    ]
                  }
                ),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
              ]
            },
            `laengsbalken-${seite}`
          );
        }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, 0, zCenter_m], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Eindeckung,
          {
            typ: eindeckungTyp,
            breite: eindeckungBreite,
            tiefe: innerD_m,
            dicke: _eindeckungDicke,
            hoeheVorne: sparrenOberkante.vorne + auflageOffset,
            hoeheHinten: sparrenOberkante.hinten + auflageOffset,
            innenliegend: false,
            quertraegerTiefe: 0,
            metallFarbe: metallFarbeHex,
            amplitude: _amplitude,
            frequenz: _frequenz,
            material: eindeckungMaterial
          }
        ) }),
        Number(exprVal(wandanschluss)) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Wandanschluss,
          {
            wandanschlussHoehe: _wandanschlussHoehe,
            wandanschlussTiefe: _wandanschlussTiefe,
            farbe: metallFarbeHex,
            leistenHoehe: 0,
            glasNeig,
            anschlussBreite: eindeckungBreite,
            zPos: depth / 2 - 1e-3,
            yPos: metallOKHinten + Math.tan(glasNeig) * (depth / 2 - zInnenH_m) + 1e-3,
            material: eindeckungProfilMaterial
          }
        ),
        Number(exprVal(stirnblech)) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Stirnblech,
          {
            stirnblechHoehe: _stirnblechHoehe,
            stirnblechTiefe: sparrenAuflage !== 1 ? _stirnblechTiefe : parent.schwelleBreite + _stirnblechTiefe,
            farbe: metallFarbeHex,
            anschlussBreite: eindeckungBreite,
            yPos: metallOKVorne + BLECH_STAERKE + 2e-3,
            zPos: sparrenAuflage !== 1 ? zInnenV_m - (BLECH_STAERKE * 2 + 2e-3) : -depth / 2 + pfostenTiefe_m - (parent.schwelleBreite + BLECH_STAERKE * 2 + 2e-3),
            neigung: glasNeig,
            material: eindeckungProfilMaterial
          }
        ),
        Number(exprVal(seitenabschluss)) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            Seitenabschluss,
            {
              seitenabschlussHoehe: effSeitenHoehe,
              seitenabschlussTiefe: effSeitenTiefe,
              farbe: metallFarbeHex,
              material: eindeckungProfilMaterial,
              xPos: -(eindeckungBreite / 2 + seitenLuft),
              yPos: seitenYPos_m,
              zPos: seitenZPos_m,
              neigung: glasNeig,
              seite: "links",
              zVorne: zInnenV_m,
              zHinten: depth / 2
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            Seitenabschluss,
            {
              seitenabschlussHoehe: effSeitenHoehe,
              seitenabschlussTiefe: effSeitenTiefe,
              farbe: metallFarbeHex,
              material: eindeckungProfilMaterial,
              xPos: eindeckungBreite / 2 + seitenLuft,
              yPos: seitenYPos_m,
              zPos: seitenZPos_m,
              neigung: glasNeig,
              seite: "rechts",
              zVorne: zInnenV_m,
              zHinten: depth / 2
            }
          )
        ] })
      ]
    }
  );
}
const metallEindeckungPropsSchema = {
  eindeckung: {
    type: "radioGroup",
    label: "Typ (0=Welle, 1=Trapez)",
    options: [
      { value: "0", label: "Welle" },
      { value: "1", label: "Trapez" }
    ]
  },
  eindeckungDicke: { type: "expression", label: "Dicke (m)" },
  amplitude: { type: "expression", label: "Amplitude (cm)" },
  frequenz: { type: "expression", label: "Frequenz (cm)" },
  sparrenAuflage: {
    type: "radioGroup",
    label: "Sparrenauflage (0=Aufliegend, 1=Innenliegend)",
    options: [
      { value: "0", label: "Aufliegend" },
      { value: "1", label: "Innenliegend" }
    ]
  },
  balkenAnzahl: { type: "expression", label: "Anzahl Querbalken (Stück)" },
  balkenBreite: { type: "expression", label: "Breite (m)" },
  balkenHoehe: { type: "expression", label: "Höhe (m)" },
  sparrenAussen: { type: "expression", label: "Außen-Sparren (0=Nein, 1=Ja)" },
  laengsbalkenBreite: { type: "expression", label: "Längsbalken Breite (m)" },
  laengsbalkenHoehe: { type: "expression", label: "Längsbalken Höhe (m)" },
  wandanschluss: { type: "expression", label: "Wandanschluss (0=Nein, 1=Ja)" },
  wandanschlussHoehe: { type: "expression", label: "Anschluss Höhe (m)" },
  wandanschlussTiefe: { type: "expression", label: "Anschluss Tiefe (m)" },
  stirnblech: { type: "expression", label: "Stirnblech (0=Nein, 1=Ja)" },
  stirnblechHoehe: { type: "expression", label: "Stirnblech Höhe (m)" },
  stirnblechTiefe: { type: "expression", label: "Stirnblech Tiefe (m)" },
  seitenabschluss: { type: "expression", label: "Seitenabschluss (0=Nein, 1=Ja)" },
  seitenabschlussHoehe: { type: "expression", label: "Seiten Höhe (m)" },
  seitenabschlussTiefe: { type: "expression", label: "Seiten Tiefe (m)" }
};
const metallEindeckungDynamicModel = {
  type: "veranda-metall-eindeckung",
  label: "Metall-Eindeckung",
  description: "Eindeckung – Welle oder Trapezblech",
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    balkenAnzahl: { expression: "4" },
    balkenBreite: { expression: "0.06" },
    balkenHoehe: { expression: "0.08" },
    eindeckung: { expression: "0" },
    eindeckungDicke: { expression: "0.008" },
    amplitude: { expression: "4" },
    frequenz: { expression: "10" },
    wandanschluss: { expression: "1" },
    wandanschlussHoehe: { expression: "0.046" },
    wandanschlussTiefe: { expression: "0.056" },
    stirnblech: { expression: "1" },
    stirnblechHoehe: { expression: "0.03" },
    stirnblechTiefe: { expression: "0.04" },
    seitenabschluss: { expression: "1" },
    seitenabschlussHoehe: { expression: "0.03" },
    seitenabschlussTiefe: { expression: "0.04" },
    sparrenAussen: { expression: "1" },
    sparrenAuflage: { expression: "0" },
    laengsbalkenBreite: { expression: "0.06" },
    laengsbalkenHoehe: { expression: "0.08" }
  },
  propsDialog: metallEindeckungPropsSchema,
  component: MetallEindeckungModel,
  materials: ["profil", "eindeckung", "eindeckung-profil"],
  disabledForAR: false,
  requiredLicense: "Enterprise"
};

const SCHIENEN_WANDSTAERKE = 3e-3;
const SCHIENE_BREITE = 0.06;
const SCHIENE_HOEHE = 0.07;
const NUT_TIEFE = 0.018;
const ENDKASTEN_HOEHE = 0.08;
const ENDKASTEN_TIEFE = 0.06;
function LamellenEindeckungModel(props) {
  const tier = useLicenseTier();
  if (!hasLicense(tier, "Enterprise")) return null;
  const {
    lamellenBreite = 0.15,
    lamellenDicke = 0.012,
    lamellenRoughness = 0.25,
    lamellenAnzahl = 0,
    lamellenWinkel = 0,
    lamellenRichtung = 0,
    slatMoveIn = 0,
    extension = 0,
    wandanschlussHoehe = 0.12,
    wandanschlussTiefe = 0.06,
    materials = {}
  } = props;
  const parent = useVerandaGeometry();
  const width = parent.isQubus ? parent.innerWidth ?? (Number(exprVal(props.width)) || 4) : parent.width || Number(exprVal(props.width)) || 4;
  const depth = parent.isQubus ? parent.innerDepth ?? (Number(exprVal(props.depth)) || 3) : parent.depth || Number(exprVal(props.depth)) || 3;
  const height = parent.height || 0;
  const dachneigung = parent.eindeckungDachneigung ?? parent.dachneigung ?? 0;
  const { hoeheHinten: baseHHinten, hoeheVorne: baseHVorne, neigung } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcVerandaGeometry(depth, dachneigung, height),
    [depth, dachneigung, height]
  );
  const qubusOffset = 0;
  const hoeheVorne = baseHVorne - qubusOffset;
  const hoeheHinten = baseHHinten - qubusOffset;
  const { setEindeckungInfo, setLamellenLedData, setSparrenAuflage, setSparrenHoehe: setSparrenHoeheCtx } = useEindeckungInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(0, 0, Number(extension) === 1, Number(wandanschlussTiefe), 0, qubusOffset);
    setSparrenAuflage(1);
    setSparrenHoeheCtx(parent.sparrenHoehe);
    return () => {
      setSparrenAuflage(0);
      setSparrenHoeheCtx(0.12);
    };
  }, [extension, wandanschlussTiefe, qubusOffset, setEindeckungInfo, setSparrenAuflage, setSparrenHoeheCtx, parent.sparrenHoehe]);
  const profilMaterial = materials.profil;
  const lamelleMaterial = materials.lamelle;
  const farbeHex = "#808080";
  const anschlussFarbeHex = "#c0c0c0";
  const pfostenTiefe = parent.pfostenTiefe;
  const schwelleEff = !parent.isQubus && Number(parent.schwelle) === 1 ? Math.max(parent.schwelleBreite, pfostenTiefe) : 0;
  const pfetteEff = !parent.isQubus && Number(parent.pfette) === 1 ? parent.pfettenBreite : 0;
  const dachVS = 0;
  const zInnenvorne = -depth / 2 + dachVS + schwelleEff;
  const zInnenhinten = depth / 2 - pfetteEff;
  const innerDepth = Math.max(0.01, zInnenhinten - zInnenvorne);
  const zCenter = (zInnenvorne + zInnenhinten) / 2;
  const hoeheAtInnenvorne = calcHoeheAnPosition(hoeheVorne, hoeheHinten, depth, dachVS + schwelleEff);
  const hoeheAtInnenhinten = calcHoeheAnPosition(hoeheVorne, hoeheHinten, depth, depth - pfetteEff);
  const sysTopY = { vorne: hoeheAtInnenvorne, hinten: hoeheAtInnenhinten };
  const railCenterY = {
    vorne: hoeheAtInnenvorne - SCHIENE_HOEHE / 2,
    hinten: hoeheAtInnenhinten - SCHIENE_HOEHE / 2
  };
  const isLaengs = Number(lamellenRichtung) === 1;
  const spannendeAchse = isLaengs ? width : innerDepth;
  const aussenBreite = width;
  const aussenTiefe = parent.isQubus ? depth : innerDepth;
  const lamellenLaenge = isLaengs ? aussenTiefe - 2 * SCHIENE_BREITE : aussenBreite - 2 * SCHIENE_BREITE;
  const n = lamellenAnzahl > 0 ? lamellenAnzahl : Math.floor(spannendeAchse / lamellenBreite);
  const effectiveBreite = spannendeAchse / Math.max(1, n);
  const t = Math.min(1, Math.max(0, Number(slatMoveIn) / 100));
  const effectiveWinkel = Number(lamellenWinkel) + t * (90 - Number(lamellenWinkel));
  const winkelRad = effectiveWinkel * Math.PI / 180;
  const neigungRad = neigung;
  const schraegeTiefe = innerDepth / Math.cos(neigungRad);
  const lamellenPos = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => Array.from({ length: Math.max(1, n) }, (_, i) => {
      const dicke = Number(lamellenDicke);
      if (isLaengs) {
        const spreadX = -width / 2 + effectiveBreite / 2 + i * effectiveBreite;
        const packedX = -width / 2 + dicke / 2 + i * dicke;
        const x = spreadX + t * (packedX - spreadX);
        const y = (railCenterY.vorne + railCenterY.hinten) / 2;
        return { x, y, z: zCenter };
      } else {
        const spreadZ = zInnenvorne + effectiveBreite / 2 + i * effectiveBreite;
        const packedZ = zInnenvorne + dicke / 2 + i * dicke;
        const z = spreadZ + t * (packedZ - spreadZ);
        const tPos = (z - zInnenvorne) / innerDepth;
        const y = railCenterY.vorne + tPos * (railCenterY.hinten - railCenterY.vorne);
        return { x: 0, y, z };
      }
    }),
    [n, isLaengs, width, depth, effectiveBreite, t, lamellenDicke, railCenterY.vorne, railCenterY.hinten, zInnenvorne, innerDepth, zCenter]
  );
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setLamellenLedData({
      richtung: isLaengs ? 1 : 0,
      positionen: lamellenPos,
      lamellenLaenge,
      lamellenDicke: Number(lamellenDicke),
      winkelRad,
      neigungRad
    });
    return () => {
      setLamellenLedData(null);
    };
  }, [setLamellenLedData, isLaengs, lamellenPos, lamellenLaenge, lamellenDicke, winkelRad, neigungRad]);
  const schieneXLinks = -(aussenBreite / 2 - SCHIENE_BREITE / 2);
  const schieneXRechts = aussenBreite / 2 - SCHIENE_BREITE / 2;
  const schieneY = (railCenterY.vorne + railCenterY.hinten) / 2;
  const lamellenParts = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const H = Number(lamellenDicke);
    const WAND = 25e-4;
    const R_L = H / 2;
    const R_R = H * 0.375;
    const chord = effectiveBreite + H * 0.08;
    const bodyLen = chord - R_L - R_R;
    const bodyCtr = -chord / 2 + R_L + bodyLen / 2;
    const len = lamellenLaenge;
    return !isLaengs ? [
      // ── QUER: Chord in Z, Länge in X ──────────────────────
      { key: "nase", geometry: "cylinder", args: [R_L, R_L, len, 20], position: [0, 0, -chord / 2 + R_L], rotation: [0, 0, Math.PI / 2], receiveShadow: true },
      { key: "wandOben", geometry: "box", args: [len, WAND, bodyLen], position: [0, H / 2 - WAND / 2, bodyCtr], rotation: [0, 0, 0], receiveShadow: true },
      { key: "wandUnten", geometry: "box", args: [len, WAND, bodyLen], position: [0, -(H / 2 - WAND / 2), bodyCtr], rotation: [0, 0, 0], receiveShadow: true },
      { key: "haken", geometry: "cylinder", args: [R_R, R_R, len, 16], position: [0, 0, chord / 2 - R_R], rotation: [0, 0, Math.PI / 2], receiveShadow: true },
      { key: "lippe", geometry: "box", args: [len, H * 0.32, WAND * 4], position: [0, -(R_R + H * 0.18), chord / 2 - R_R / 2], rotation: [0, 0, 0], receiveShadow: false }
    ] : [
      // ── LÄNGS: Chord in X, Länge in Z ──────────────────────
      { key: "nase", geometry: "cylinder", args: [R_L, R_L, len, 20], position: [-chord / 2 + R_L, 0, 0], rotation: [Math.PI / 2, 0, 0], receiveShadow: true },
      { key: "wandOben", geometry: "box", args: [bodyLen, WAND, len], position: [bodyCtr, H / 2 - WAND / 2, 0], rotation: [0, 0, 0], receiveShadow: true },
      { key: "wandUnten", geometry: "box", args: [bodyLen, WAND, len], position: [bodyCtr, -(H / 2 - WAND / 2), 0], rotation: [0, 0, 0], receiveShadow: true },
      { key: "haken", geometry: "cylinder", args: [R_R, R_R, len, 16], position: [chord / 2 - R_R, 0, 0], rotation: [Math.PI / 2, 0, 0], receiveShadow: true },
      { key: "lippe", geometry: "box", args: [WAND * 4, H * 0.32, len], position: [chord / 2 - R_R / 2, -(R_R + H * 0.18), 0], rotation: [0, 0, 0], receiveShadow: false }
    ];
  }, [isLaengs, lamellenDicke, effectiveBreite, lamellenLaenge]);
  const lamellenGroupRotation = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => isLaengs ? [-neigungRad, 0, winkelRad] : [winkelRad, 0, 0],
    [isLaengs, neigungRad, winkelRad]
  );
  const naseRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const wandObenRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const wandUntenRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const hakenRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const lippeRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const lamellenPartRefs = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => ({
    nase: naseRef,
    wandOben: wandObenRef,
    wandUnten: wandUntenRef,
    haken: hakenRef,
    lippe: lippeRef
  }), []);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    const dummy = new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D();
    const localMatrix = new veranda_mf_2_plugin__loadShare__three__loadShare__.Matrix4();
    lamellenParts.forEach((part) => {
      const ref = lamellenPartRefs[part.key];
      if (!ref.current) return;
      dummy.position.set(...part.position);
      dummy.rotation.set(...part.rotation);
      dummy.updateMatrix();
      localMatrix.copy(dummy.matrix);
      lamellenPos.forEach(({ x, y, z }, i) => {
        dummy.position.set(x, y, z);
        dummy.rotation.set(...lamellenGroupRotation);
        dummy.updateMatrix();
        ref.current.setMatrixAt(i, dummy.matrix.clone().multiply(localMatrix));
      });
      ref.current.instanceMatrix.needsUpdate = true;
      ref.current.computeBoundingSphere();
    });
  }, [lamellenParts, lamellenPos, lamellenGroupRotation, lamellenPartRefs]);
  const lamelleMat = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    MaterialFallback,
    {
      material: lamelleMaterial,
      fallbackColor: farbeHex,
      metalness: 0.6,
      roughness: Number(lamellenRoughness)
    }
  );
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    !isLaengs ? (
      // ── QUER: Schienen links + rechts ──────────────────────────
      [schieneXLinks, schieneXRechts].map((sx, si) => {
        const nutSeite = si === 0 ? 1 : -1;
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
          "group",
          {
            position: [sx, schieneY, zCenter],
            rotation: [-neigungRad, 0, 0],
            children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, SCHIENE_HOEHE / 2, 0], castShadow: true, receiveShadow: true, children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_BREITE, SCHIENEN_WANDSTAERKE, schraegeTiefe] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: anschlussFarbeHex,
                    metalness: 0.6,
                    roughness: 0.3
                  }
                )
              ] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -SCHIENE_HOEHE / 2, 0], castShadow: true, receiveShadow: true, children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_BREITE, SCHIENEN_WANDSTAERKE, schraegeTiefe] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: anschlussFarbeHex,
                    metalness: 0.6,
                    roughness: 0.3
                  }
                )
              ] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                "mesh",
                {
                  position: [-nutSeite * (SCHIENE_BREITE / 2 - SCHIENEN_WANDSTAERKE / 2), 0, 0],
                  castShadow: true,
                  receiveShadow: true,
                  children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENEN_WANDSTAERKE, SCHIENE_HOEHE, schraegeTiefe] }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                      MaterialFallback,
                      {
                        material: profilMaterial,
                        fallbackColor: anschlussFarbeHex,
                        metalness: 0.6,
                        roughness: 0.3
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [nutSeite * (SCHIENE_BREITE / 2 - SCHIENEN_WANDSTAERKE / 2), SCHIENE_HOEHE / 2 - NUT_TIEFE / 2, 0], children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENEN_WANDSTAERKE, NUT_TIEFE, schraegeTiefe] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: anschlussFarbeHex,
                    metalness: 0.6,
                    roughness: 0.3
                  }
                )
              ] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [nutSeite * (SCHIENE_BREITE / 2 - SCHIENEN_WANDSTAERKE / 2), -0.026000000000000002, 0], children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENEN_WANDSTAERKE, NUT_TIEFE, schraegeTiefe] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: anschlussFarbeHex,
                    metalness: 0.6,
                    roughness: 0.3
                  }
                )
              ] }),
              Number(extension) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, schraegeTiefe / 2], castShadow: true, receiveShadow: true, children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_BREITE, SCHIENE_HOEHE, SCHIENEN_WANDSTAERKE] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: anschlussFarbeHex,
                    metalness: 0.6,
                    roughness: 0.3
                  }
                )
              ] })
            ]
          },
          `schiene-${si}`
        );
      })
    ) : (
      // ── LÄNGS: Schienen vorne + hinten + links + rechts ────────
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
        [
          // sy = Unterkante der Schiene → group bei sy + SCHIENE_HOEHE/2 → Oberkante = sysTopY
          { sz: zInnenvorne + SCHIENE_BREITE / 2, sy: sysTopY.vorne - SCHIENE_HOEHE, nutSeite: -1 },
          { sz: zInnenhinten - SCHIENE_BREITE / 2, sy: sysTopY.hinten - SCHIENE_HOEHE, nutSeite: 1 }
        ].map(({ sz, sy, nutSeite }, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
          "group",
          {
            position: [0, sy + SCHIENE_HOEHE / 2, sz],
            children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, SCHIENE_HOEHE / 2, 0], castShadow: true, receiveShadow: true, children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [aussenBreite - 2 * SCHIENE_BREITE, SCHIENEN_WANDSTAERKE, SCHIENE_BREITE] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: anschlussFarbeHex,
                    metalness: 0.6,
                    roughness: 0.3
                  }
                )
              ] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -SCHIENE_HOEHE / 2, 0], castShadow: true, receiveShadow: true, children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [aussenBreite - 2 * SCHIENE_BREITE, SCHIENEN_WANDSTAERKE, SCHIENE_BREITE] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: anschlussFarbeHex,
                    metalness: 0.6,
                    roughness: 0.3
                  }
                )
              ] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, nutSeite * (SCHIENE_BREITE / 2 - SCHIENEN_WANDSTAERKE / 2)], castShadow: true, receiveShadow: true, children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [aussenBreite - 2 * SCHIENE_BREITE, SCHIENE_HOEHE, SCHIENEN_WANDSTAERKE] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: anschlussFarbeHex,
                    metalness: 0.6,
                    roughness: 0.3
                  }
                )
              ] })
            ]
          },
          `schiene-l-${si}`
        )),
        [schieneXLinks, schieneXRechts].map((sx, si) => {
          const nutSeite = si === 0 ? 1 : -1;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "group",
            {
              position: [sx, schieneY, zCenter],
              rotation: [-neigungRad, 0, 0],
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, SCHIENE_HOEHE / 2, 0], castShadow: true, receiveShadow: true, children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_BREITE, SCHIENEN_WANDSTAERKE, schraegeTiefe] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    MaterialFallback,
                    {
                      material: profilMaterial,
                      fallbackColor: anschlussFarbeHex,
                      metalness: 0.6,
                      roughness: 0.3
                    }
                  )
                ] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -SCHIENE_HOEHE / 2, 0], castShadow: true, receiveShadow: true, children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_BREITE, SCHIENEN_WANDSTAERKE, schraegeTiefe] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    MaterialFallback,
                    {
                      material: profilMaterial,
                      fallbackColor: anschlussFarbeHex,
                      metalness: 0.6,
                      roughness: 0.3
                    }
                  )
                ] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                  "mesh",
                  {
                    position: [-nutSeite * (SCHIENE_BREITE / 2 - SCHIENEN_WANDSTAERKE / 2), 0, 0],
                    castShadow: true,
                    receiveShadow: true,
                    children: [
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENEN_WANDSTAERKE, SCHIENE_HOEHE, schraegeTiefe] }),
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                        MaterialFallback,
                        {
                          material: profilMaterial,
                          fallbackColor: anschlussFarbeHex,
                          metalness: 0.6,
                          roughness: 0.3
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [nutSeite * (SCHIENE_BREITE / 2 - SCHIENEN_WANDSTAERKE / 2), SCHIENE_HOEHE / 2 - NUT_TIEFE / 2, 0], children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENEN_WANDSTAERKE, NUT_TIEFE, schraegeTiefe] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    MaterialFallback,
                    {
                      material: profilMaterial,
                      fallbackColor: anschlussFarbeHex,
                      metalness: 0.6,
                      roughness: 0.3
                    }
                  )
                ] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [nutSeite * (SCHIENE_BREITE / 2 - SCHIENEN_WANDSTAERKE / 2), -0.026000000000000002, 0], children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENEN_WANDSTAERKE, NUT_TIEFE, schraegeTiefe] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    MaterialFallback,
                    {
                      material: profilMaterial,
                      fallbackColor: anschlussFarbeHex,
                      metalness: 0.6,
                      roughness: 0.3
                    }
                  )
                ] }),
                Number(extension) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, schraegeTiefe / 2], castShadow: true, receiveShadow: true, children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_BREITE, SCHIENE_HOEHE, SCHIENEN_WANDSTAERKE] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    MaterialFallback,
                    {
                      material: profilMaterial,
                      fallbackColor: anschlussFarbeHex,
                      metalness: 0.6,
                      roughness: 0.3
                    }
                  )
                ] })
              ]
            },
            `schiene-ls-${si}`
          );
        })
      ] })
    ),
    lamellenParts.map((part) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "instancedMesh",
      {
        ref: lamellenPartRefs[part.key],
        args: [null, null, lamellenPos.length],
        castShadow: true,
        receiveShadow: part.receiveShadow,
        children: [
          part.geometry === "cylinder" ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: part.args }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: part.args }),
          lamelleMat
        ]
      },
      `${part.key}-${isLaengs ? "laengs" : "quer"}-${lamellenPos.length}`
    )),
    (() => {
      const gesamtBreite = aussenBreite;
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, sysTopY.vorne, zInnenvorne + ENDKASTEN_TIEFE / 2], children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, SCHIENEN_WANDSTAERKE, ENDKASTEN_TIEFE] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            MaterialFallback,
            {
              material: profilMaterial,
              fallbackColor: anschlussFarbeHex,
              metalness: 0.6,
              roughness: 0.3
            }
          )
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -ENDKASTEN_HOEHE, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, SCHIENEN_WANDSTAERKE, ENDKASTEN_TIEFE] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            MaterialFallback,
            {
              material: profilMaterial,
              fallbackColor: anschlussFarbeHex,
              metalness: 0.6,
              roughness: 0.3
            }
          )
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -ENDKASTEN_HOEHE / 2, -ENDKASTEN_TIEFE / 2], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, ENDKASTEN_HOEHE, SCHIENEN_WANDSTAERKE] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            MaterialFallback,
            {
              material: profilMaterial,
              fallbackColor: anschlussFarbeHex,
              metalness: 0.6,
              roughness: 0.3
            }
          )
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -ENDKASTEN_HOEHE / 2, ENDKASTEN_TIEFE / 2], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, ENDKASTEN_HOEHE, SCHIENEN_WANDSTAERKE] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            MaterialFallback,
            {
              material: profilMaterial,
              fallbackColor: anschlussFarbeHex,
              metalness: 0.6,
              roughness: 0.3
            }
          )
        ] })
      ] });
    })(),
    (() => {
      const gesamtBreite = aussenBreite;
      return (
        // group Z: Mitte = zInnenhinten - ENDKASTEN_TIEFE/2
        // → Außenfläche (+ENDKASTEN_TIEFE/2) liegt bündig an Pfette-Innenfläche
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, sysTopY.hinten, zInnenhinten - ENDKASTEN_TIEFE / 2], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, SCHIENEN_WANDSTAERKE, ENDKASTEN_TIEFE] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              MaterialFallback,
              {
                material: profilMaterial,
                fallbackColor: anschlussFarbeHex,
                metalness: 0.6,
                roughness: 0.3
              }
            )
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -ENDKASTEN_HOEHE, 0], castShadow: true, receiveShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, SCHIENEN_WANDSTAERKE, ENDKASTEN_TIEFE] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              MaterialFallback,
              {
                material: profilMaterial,
                fallbackColor: anschlussFarbeHex,
                metalness: 0.6,
                roughness: 0.3
              }
            )
          ] }),
          Number(extension) !== 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -ENDKASTEN_HOEHE / 2, ENDKASTEN_TIEFE / 2], castShadow: true, receiveShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, ENDKASTEN_HOEHE, SCHIENEN_WANDSTAERKE] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              MaterialFallback,
              {
                material: profilMaterial,
                fallbackColor: anschlussFarbeHex,
                metalness: 0.6,
                roughness: 0.3
              }
            )
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -ENDKASTEN_HOEHE / 2, -ENDKASTEN_TIEFE / 2], castShadow: true, receiveShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, ENDKASTEN_HOEHE, SCHIENEN_WANDSTAERKE] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              MaterialFallback,
              {
                material: profilMaterial,
                fallbackColor: anschlussFarbeHex,
                metalness: 0.6,
                roughness: 0.3
              }
            )
          ] })
        ] })
      );
    })(),
    Number(extension) === 1 && (() => {
      const W = SCHIENEN_WANDSTAERKE;
      const wB = aussenBreite;
      const anschlussY = sysTopY.hinten;
      const wH = Number(wandanschlussHoehe);
      const wT = Number(wandanschlussTiefe);
      const zWand = zInnenhinten;
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, anschlussY + W / 2, zWand - wT / 2], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wB, W, wT] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: anschlussFarbeHex, metalness: 0.6, roughness: 0.3 })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, anschlussY + wH / 2, zWand], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wB, wH, W] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: anschlussFarbeHex, metalness: 0.6, roughness: 0.3 })
        ] })
      ] });
    })(),
    Number(extension) === 2 && (() => {
      const W = SCHIENEN_WANDSTAERKE;
      const wB = aussenBreite;
      const steig = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
      const zWand = zInnenhinten + pfetteEff * 0.5;
      const anschlussY = sysTopY.hinten + steig * pfetteEff * 0.5;
      const wH = 0.02;
      const wT = Number(wandanschlussTiefe);
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, anschlussY + W / 2, zWand - wT / 2], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wB, W, wT] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: anschlussFarbeHex, metalness: 0.6, roughness: 0.3 })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, anschlussY - wH / 2, zWand], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wB, wH, W] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: anschlussFarbeHex, metalness: 0.6, roughness: 0.3 })
        ] })
      ] });
    })()
  ] });
}
const lamellenEindeckungPropsSchema = {
  lamellenRichtung: { type: "radioGroup", label: "Ausrichtung (0=Quer/Bioclimatic, 1=Längs)", options: [{ value: "0", label: "Quer / Bioclimatic" }, { value: "1", label: "Längs" }] },
  lamellenBreite: { type: "expression", label: "Breite (m)" },
  lamellenDicke: { type: "expression", label: "Dicke (m)" },
  lamellenAnzahl: { type: "expression", label: "Anzahl (0=auto)" },
  lamellenWinkel: { type: "expression", label: "Winkel (°)" },
  lamellenRoughness: { type: "expression", label: "Roughness (0–1)" },
  slatMoveIn: { type: "expression", label: "Einfahrtiefe (0–100)" },
  sparrenAuflage: { type: "radioGroup", label: "Auflage (0=Aufliegend, 1=Innenliegend)", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  extension: { type: "expression", label: "Anschluss (0=kein, 1=Wandanschluss, 2=Winkelprofil)" },
  wandanschlussHoehe: { type: "expression", label: "Höhe (m)" },
  wandanschlussTiefe: { type: "expression", label: "Tiefe (m)" }
};
const lamellenEindeckungDynamicModel = {
  type: "veranda-lamellen-eindeckung",
  label: "Lamelleneindeckung",
  description: "Eindeckung – Lamellen mit einstellbarem Neigungswinkel",
  screenshot: "/images/thumbnails/pfosten-rund.png",
  defaultProps: {
    lamellenBreite: { expression: "0.202" },
    lamellenDicke: { expression: "0.04" },
    lamellenRoughness: { expression: "0.3" },
    lamellenAnzahl: { expression: "0" },
    lamellenWinkel: { expression: "0" },
    lamellenRichtung: { expression: "0" },
    slatMoveIn: { expression: "0" },
    sparrenAuflage: { expression: "0" },
    extension: { expression: "0" },
    wandanschlussHoehe: { expression: "0.12" },
    wandanschlussTiefe: { expression: "0.06" }
  },
  propsDialog: lamellenEindeckungPropsSchema,
  component: LamellenEindeckungModel,
  materials: ["profil", "lamelle"],
  disabledForAR: false,
  requiredLicense: "Enterprise"
};

function SolarPanelGitter({ breite, tiefe, rahmenFarbeHex, material, maxZellenBreite = 0.15, maxZellenTiefe = 0.15 }) {
  const zellenX = Math.max(1, Math.round(breite / maxZellenBreite));
  const zellenZ = Math.max(1, Math.round(tiefe / maxZellenTiefe));
  const zellBreite = breite / zellenX;
  const zellTiefe = tiefe / zellenZ;
  const linienDicke = 3e-3;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    Array.from({ length: zellenX - 1 }, (_, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [-breite / 2 + (i + 1) * zellBreite, 0, 0], children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [linienDicke, linienDicke, tiefe] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: rahmenFarbeHex })
    ] }, `v-${i}`)),
    Array.from({ length: zellenZ - 1 }, (_, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, -tiefe / 2 + (i + 1) * zellTiefe], children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [breite, linienDicke, linienDicke] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: rahmenFarbeHex })
    ] }, `h-${i}`))
  ] });
}
function SolarPanel({ panelBreite, panelTiefe, yPos, dachneigungRad, panelFarbeHex, rahmenFarbeHex, glasMaterial, profilMaterial, isAR, maxZellenBreite, maxZellenTiefe }) {
  const glasDicke = 6e-3;
  const zellenDicke = 4e-3;
  const rahmenBreite = 0.02;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, yPos, 0], rotation: [-dachneigungRad, 0, 0], children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, glasDicke / 2, 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelBreite, glasDicke, panelTiefe] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        MaterialFallback,
        {
          material: glasMaterial,
          fallbackColor: "#a8c0d8",
          transparent: !isAR,
          opacity: isAR ? 1 : 0.9,
          metalness: 0.1,
          roughness: isAR ? 0.15 : 0.05
        }
      )
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, glasDicke + zellenDicke / 2, 0], children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelBreite - rahmenBreite * 2, zellenDicke, panelTiefe - rahmenBreite * 2] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        MaterialFallback,
        {
          fallbackColor: panelFarbeHex,
          metalness: 0.2,
          roughness: 0.6
        }
      )
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, glasDicke + zellenDicke + 1e-3, 0], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SolarPanelGitter,
      {
        breite: panelBreite - rahmenBreite * 2,
        tiefe: panelTiefe - rahmenBreite * 2,
        rahmenFarbeHex,
        material: profilMaterial,
        maxZellenBreite,
        maxZellenTiefe
      }
    ) }),
    [
      { pos: [0, glasDicke, -panelTiefe / 2 + rahmenBreite / 2], args: [panelBreite, zellenDicke + glasDicke * 2, rahmenBreite] },
      { pos: [0, glasDicke, panelTiefe / 2 - rahmenBreite / 2], args: [panelBreite, zellenDicke + glasDicke * 2, rahmenBreite] },
      { pos: [-panelBreite / 2 + rahmenBreite / 2, glasDicke, 0], args: [rahmenBreite, zellenDicke + glasDicke * 2, panelTiefe] },
      { pos: [panelBreite / 2 - rahmenBreite / 2, glasDicke, 0], args: [rahmenBreite, zellenDicke + glasDicke * 2, panelTiefe] }
    ].map((r, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: r.pos, castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: r.args }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        MaterialFallback,
        {
          material: profilMaterial,
          fallbackColor: rahmenFarbeHex,
          metalness: 0.5,
          roughness: 0.3
        }
      )
    ] }, i))
  ] });
}
function SolarEindeckungModel(props) {
  const tier = useLicenseTier();
  if (!hasLicense(tier, "Enterprise")) return null;
  const {
    extension = 1,
    wandanschlussHoehe = 0.12,
    wandanschlussTiefe = 0.06,
    stirnblech = 1,
    stirnblechHoehe = 0.08,
    stirnblechTiefe = 0.04,
    seitenabschluss = 0,
    seitenabschlussHoehe = 0.03,
    seitenabschlussTiefe = 0.04,
    leistenBreite = 0.06,
    leistenHoehe = 0.015,
    leistenRundung = 5e-3,
    einzelMaterialien = 0,
    sparrenAuflage: _sparrenAuflage_prop,
    sparrenAussen = 0,
    sparrenAnzahl = 0,
    sparrenBreite = 0,
    sparrenHoehe = 0,
    sparrenAussenBreite = 0,
    sparrenAussenHoehe = 0,
    totalBreite = 0,
    totalTiefe = 0,
    modulBreite = 0,
    modulTiefe = 0,
    modulAnzahlBreite = 0,
    maxZellenBreite = 0,
    maxZellenTiefe = 0,
    materials = {}
  } = props;
  const parent = useVerandaGeometry();
  const _totalBreite = Number(exprVal(totalBreite));
  const _totalTiefe = Number(exprVal(totalTiefe));
  const width = _totalBreite > 0 ? _totalBreite : parent.isQubus ? parent.innerWidth || 0 : parent.width || Number(exprVal(props.width)) || 4;
  const depth = _totalTiefe > 0 ? _totalTiefe : parent.isQubus ? parent.innerDepth || 0 : parent.depth || Number(exprVal(props.depth)) || 3;
  const height = parent.height || 0;
  const { hoeheHinten: baseHHinten, hoeheVorne: baseHVorne, neigung } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcVerandaGeometry(depth, parent.eindeckungDachneigung ?? parent.dachneigung, height),
    [depth, parent.eindeckungDachneigung, parent.dachneigung, height]
  );
  const _leistenHoehe = Number(exprVal(leistenHoehe));
  const solarDicke = 6e-3;
  const _sparrenAuflageStr = exprVal(_sparrenAuflage_prop);
  const _sparrenAuflage = _sparrenAuflageStr === "" || Number.isNaN(Number(_sparrenAuflageStr)) ? Number(parent.sparrenAuflage) || 0 : Number(_sparrenAuflageStr);
  const qubusOffset = parent.isQubus ? solarDicke + _leistenHoehe + (_sparrenAuflage === 0 ? Number(exprVal(sparrenHoehe || parent.sparrenHoehe)) : 0) : 0;
  const hoeheVorne = baseHVorne - qubusOffset;
  const hoeheHinten = baseHHinten - qubusOffset;
  const _sparrenAnzahl = Number(exprVal(sparrenAnzahl));
  const _sparrenBreite = Number(exprVal(sparrenBreite)) > 0 ? Number(exprVal(sparrenBreite)) : parent.sparrenBreite;
  const _sparrenHoehe = Number(exprVal(sparrenHoehe)) > 0 ? Number(exprVal(sparrenHoehe)) : parent.sparrenHoehe;
  const _sparrenAussenBreite = Number(exprVal(sparrenAussenBreite)) > 0 ? Number(exprVal(sparrenAussenBreite)) : _sparrenBreite;
  const _sparrenAussenHoehe = Number(exprVal(sparrenAussenHoehe)) > 0 ? Number(exprVal(sparrenAussenHoehe)) : _sparrenHoehe;
  const hatAussenSparren = Number(exprVal(sparrenAussen)) === 1;
  const eindeckungInfo = useEindeckungInfo();
  const effectiveSparrenAnzahl = Math.max(2, _sparrenAnzahl);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    eindeckungInfo.setEindeckungInfo(
      solarDicke,
      _leistenHoehe,
      Number(extension) === 1,
      Number(exprVal(wandanschlussTiefe)),
      effectiveSparrenAnzahl,
      qubusOffset
    );
    eindeckungInfo.setSparrenAuflage(_sparrenAuflage);
    eindeckungInfo.setSparrenHoehe(_sparrenHoehe);
    return () => {
      eindeckungInfo.setSparrenAuflage(0);
      eindeckungInfo.setSparrenHoehe(0.12);
    };
  }, [solarDicke, _leistenHoehe, extension, wandanschlussTiefe, effectiveSparrenAnzahl, qubusOffset, _sparrenAuflage, _sparrenHoehe, eindeckungInfo.setEindeckungInfo, eindeckungInfo.setSparrenAuflage, eindeckungInfo.setSparrenHoehe]);
  const isAR = useIsARMode();
  const profilMaterial = materials.profil;
  const glasMaterial = materials.glas;
  if (profilMaterial) profilMaterial.name = "profil";
  if (glasMaterial) glasMaterial.name = "glas";
  const useEinzel = Number(exprVal(einzelMaterialien)) === 1;
  const anschlussMaterial = useEinzel ? materials.anschluss ?? profilMaterial : profilMaterial;
  const leistenMaterial = useEinzel ? materials.leisten ?? profilMaterial : profilMaterial;
  const panelFarbeHex = "#1a2a3a";
  const rahmenFarbeHex = "#808080";
  const anschlussFarbeHex = "#c0c0c0";
  const leistenFarbeHex = "#c0c0c0";
  const _leistenBreite = Number(exprVal(leistenBreite));
  const _leistenRundung = Number(exprVal(leistenRundung));
  const _maxZellenBreite = Number(exprVal(maxZellenBreite)) || 0.15;
  const _maxZellenTiefe = Number(exprVal(maxZellenTiefe)) || 0.15;
  const querbalkenBreite = width;
  const sparrenCount = Math.max(2, _sparrenAnzahl);
  const sparrenB2 = _sparrenBreite / 2;
  const sparrenX = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const xAussen = querbalkenBreite / 2 - sparrenB2;
    if (sparrenCount === 2) return [-xAussen, xAussen];
    const abstand = 2 * xAussen / (sparrenCount - 1);
    return Array.from({ length: sparrenCount }, (_, i) => -xAussen + i * abstand);
  }, [sparrenCount, querbalkenBreite, sparrenB2]);
  const solarPanels = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const panels = [];
    for (let i = 0; i < sparrenX.length - 1; i++) {
      const left = sparrenX[i];
      const right = sparrenX[i + 1];
      const isFirst = i === 0;
      const isLast = i === sparrenX.length - 2;
      const leftEdge = isFirst ? left - sparrenB2 : left + 5e-3;
      const rightEdge = isLast ? right + sparrenB2 : right - 5e-3;
      const w = rightEdge - leftEdge;
      if (w > 0) {
        panels.push({ x: (leftEdge + rightEdge) / 2, w });
      }
    }
    return panels;
  }, [sparrenX, sparrenB2]);
  const isInn_s = _sparrenAuflage === 1;
  const isAufdach = _sparrenAuflage === 2;
  const aufdachOffset = isAufdach ? eindeckungInfo.unterEindeckungHoehe > 0 ? eindeckungInfo.unterEindeckungHoehe : _sparrenHoehe : 0;
  const dachVS_s = parent.dachVorsprung ?? 0;
  const pfostTiefe_s = parent.pfostenTiefe;
  const schwEff_s = !parent.isQubus && isInn_s && Number(parent.schwelle) === 1 ? Math.max(parent.schwelleBreite, pfostTiefe_s) : 0;
  const pfEff_s = !parent.isQubus && isInn_s && Number(parent.pfette) === 1 ? parent.pfettenBreite : 0;
  const zInnenV_s = isInn_s ? -depth / 2 + dachVS_s + schwEff_s : -depth / 2;
  const zInnenH_s = isInn_s ? depth / 2 - pfEff_s : depth / 2;
  const innerD_s = Math.max(0.01, zInnenH_s - zInnenV_s);
  const zCenter_s = (zInnenV_s + zInnenH_s) / 2;
  const steig_s = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  const hVorne_s = isInn_s ? hoeheVorne + steig_s * (dachVS_s + schwEff_s) : hoeheVorne;
  const hHinten_s = isInn_s ? hoeheHinten - steig_s * pfEff_s : hoeheHinten;
  const sparrenOKVorne = isInn_s ? hVorne_s : isAufdach ? hoeheVorne + aufdachOffset : hoeheVorne + _sparrenHoehe;
  const sparrenOKHinten = isInn_s ? hHinten_s : isAufdach ? hoeheHinten + aufdachOffset : hoeheHinten + _sparrenHoehe;
  const yMitte = (sparrenOKVorne + sparrenOKHinten) / 2;
  const panelTiefe = isInn_s ? innerD_s : depth;
  const GLAS_DICKE = 6e-3;
  const { glasNeig, schraegeTiefe, panelOKVorne, panelOKHinten } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const okVorne = sparrenOKVorne + GLAS_DICKE;
    const okHinten = sparrenOKHinten + GLAS_DICKE;
    const neig = Math.atan2(okHinten - okVorne, panelTiefe);
    const schraege = panelTiefe / Math.cos(neig);
    return { glasNeig: neig, schraegeTiefe: schraege, panelOKVorne: okVorne, panelOKHinten: okHinten };
  }, [sparrenOKVorne, sparrenOKHinten, panelTiefe]);
  const leistenGeom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (_leistenBreite <= 0 || _leistenHoehe <= 0) return null;
    const profil = leistenProfil(_leistenBreite, _leistenHoehe, _leistenRundung);
    return createExtrudeGeometry(profil, schraegeTiefe);
  }, [_leistenBreite, _leistenHoehe, _leistenRundung, schraegeTiefe]);
  const _modulBreite = numVal(modulBreite);
  const _modulTiefe = numVal(modulTiefe);
  const _modulAnzahlBreite = numVal(modulAnzahlBreite);
  const useModulRaster = _modulBreite > 0 && _modulTiefe > 0;
  const modulBreiteRaw = exprVal(modulBreite);
  const modulTiefeRaw = exprVal(modulTiefe);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    return;
  }, [useModulRaster, modulBreiteRaw, modulTiefeRaw, _modulBreite, _modulTiefe]);
  const { modulRaster, leistenZPositionen } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!useModulRaster) return { modulRaster: [], leistenZPositionen: [] };
    const EPS = 1e-6;
    const maxCols = Math.floor(querbalkenBreite / _modulBreite + EPS);
    const rows = Math.floor(panelTiefe / _modulTiefe + EPS);
    const nCols = _modulAnzahlBreite > 0 ? Math.min(maxCols, _modulAnzahlBreite) : maxCols;
    if (nCols <= 0 || rows <= 0) return { modulRaster: [], leistenZPositionen: [] };
    const modW = Math.max(0.01, _modulBreite - _leistenBreite);
    const modD = Math.max(0.01, _modulTiefe - _leistenBreite);
    const startX = -(nCols * _modulBreite) / 2 + _modulBreite / 2;
    const startZ = zInnenV_s + (panelTiefe - rows * _modulTiefe) / 2 + _modulTiefe / 2;
    const raster = [];
    for (let col = 0; col < nCols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = startX + col * _modulBreite;
        const z = startZ + row * _modulTiefe;
        const yPos = sparrenOKVorne + steig_s * (z + depth / 2);
        raster.push({ x, z, yPos, w: modW, d: modD });
      }
    }
    const zPos = [];
    for (let i = 1; i < rows; i++) {
      zPos.push(startZ - _modulTiefe / 2 + i * _modulTiefe);
    }
    return { modulRaster: raster, leistenZPositionen: zPos };
  }, [useModulRaster, querbalkenBreite, _modulBreite, _modulTiefe, _modulAnzahlBreite, _leistenBreite, panelTiefe, zInnenV_s, sparrenOKVorne, steig_s, depth]);
  const leistenGeomQuer = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!useModulRaster || _leistenBreite <= 0 || _leistenHoehe <= 0) return null;
    const profil = leistenProfil(_leistenBreite, _leistenHoehe, _leistenRundung);
    return createExtrudeGeometry(profil, querbalkenBreite);
  }, [useModulRaster, _leistenBreite, _leistenHoehe, _leistenRundung, querbalkenBreite]);
  const leistenRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (!leistenRef.current || leistenGeom === null) return;
    const dummy = new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D();
    dummy.rotation.set(-glasNeig, 0, 0);
    sparrenX.forEach((xPos, i) => {
      dummy.position.set(xPos, (panelOKVorne + panelOKHinten) / 2, zCenter_s);
      dummy.updateMatrix();
      leistenRef.current.setMatrixAt(i, dummy.matrix);
    });
    leistenRef.current.instanceMatrix.needsUpdate = true;
    leistenRef.current.computeBoundingSphere();
  }, [leistenGeom, sparrenX, panelOKVorne, panelOKHinten, zCenter_s, glasNeig]);
  const leistenQuerRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (!leistenQuerRef.current || leistenGeomQuer === null) return;
    const dummy = new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D();
    dummy.rotation.set(-glasNeig, 0, 0);
    leistenZPositionen.forEach((z, i) => {
      const yPos = sparrenOKVorne + steig_s * (z + depth / 2) + GLAS_DICKE;
      dummy.position.set(-querbalkenBreite / 2, yPos, z);
      dummy.updateMatrix();
      leistenQuerRef.current.setMatrixAt(i, dummy.matrix);
    });
    leistenQuerRef.current.instanceMatrix.needsUpdate = true;
    leistenQuerRef.current.computeBoundingSphere();
  }, [leistenGeomQuer, leistenZPositionen, sparrenOKVorne, steig_s, depth, querbalkenBreite, glasNeig]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    !isAufdach && sparrenX.slice(1, -1).map((xPos, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Sparren,
      {
        breite: _sparrenBreite,
        hoehe: _sparrenHoehe,
        tiefe: panelTiefe,
        hoeheDiff: sparrenOKHinten - sparrenOKVorne,
        material: profilMaterial,
        position: [xPos, isInn_s ? hVorne_s - _sparrenHoehe : hoeheVorne, zInnenV_s]
      },
      `sparren-inn-${i}`
    )),
    !isAufdach && hatAussenSparren && [sparrenX[0], sparrenX[sparrenX.length - 1]].map((xPos, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Sparren,
      {
        breite: _sparrenAussenBreite,
        hoehe: _sparrenAussenHoehe,
        tiefe: panelTiefe,
        hoeheDiff: sparrenOKHinten - sparrenOKVorne,
        material: profilMaterial,
        position: [xPos, isInn_s ? hVorne_s - _sparrenAussenHoehe : hoeheVorne, zInnenV_s]
      },
      `sparren-aus-${i}`
    )),
    leistenGeom !== null && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "instancedMesh",
      {
        ref: leistenRef,
        args: [leistenGeom, void 0, sparrenX.length],
        castShadow: true,
        receiveShadow: true,
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          MaterialFallback,
          {
            material: leistenMaterial,
            fallbackColor: leistenFarbeHex,
            metalness: MATERIAL_DEFAULTS.leiste.metalness,
            roughness: MATERIAL_DEFAULTS.leiste.roughness
          }
        )
      },
      `leisten-${sparrenX.length}`
    ),
    useModulRaster && modulRaster.map((m, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [m.x, 0, m.z], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SolarPanel,
      {
        panelBreite: m.w,
        panelTiefe: m.d,
        yPos: m.yPos,
        dachneigungRad: neigung,
        panelFarbeHex,
        rahmenFarbeHex,
        glasMaterial,
        profilMaterial,
        isAR,
        maxZellenBreite: _maxZellenBreite,
        maxZellenTiefe: _maxZellenTiefe
      }
    ) }, i)),
    !useModulRaster && solarPanels.map((panel, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [panel.x, 0, zCenter_s], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SolarPanel,
      {
        panelBreite: panel.w,
        panelTiefe,
        yPos: yMitte,
        dachneigungRad: neigung,
        panelFarbeHex,
        rahmenFarbeHex,
        glasMaterial,
        profilMaterial,
        isAR,
        maxZellenBreite: _maxZellenBreite,
        maxZellenTiefe: _maxZellenTiefe
      }
    ) }, i)),
    useModulRaster && leistenGeomQuer !== null && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "instancedMesh",
      {
        ref: leistenQuerRef,
        args: [leistenGeomQuer, void 0, leistenZPositionen.length],
        castShadow: true,
        receiveShadow: true,
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          MaterialFallback,
          {
            material: leistenMaterial,
            fallbackColor: leistenFarbeHex,
            metalness: MATERIAL_DEFAULTS.leiste.metalness,
            roughness: MATERIAL_DEFAULTS.leiste.roughness
          }
        )
      },
      `leisten-quer-${leistenZPositionen.length}`
    ),
    Number(extension) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Wandanschluss,
      {
        wandanschlussHoehe: Number(wandanschlussHoehe),
        wandanschlussTiefe: Number(wandanschlussTiefe),
        farbe: anschlussFarbeHex,
        leistenHoehe: _leistenHoehe + 5e-3 / Math.cos(glasNeig),
        glasNeig,
        anschlussBreite: querbalkenBreite,
        zPos: depth / 2 - 1e-3,
        yPos: panelOKHinten + steig_s * pfEff_s + 6e-3,
        material: anschlussMaterial
      }
    ),
    Number(extension) === 2 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Winkelprofil,
      {
        hoehe: panelOKHinten - hoeheHinten + steig_s * pfEff_s * 0.5 + 0.026,
        tiefe: Number(wandanschlussTiefe),
        farbe: anschlussFarbeHex,
        glasNeig,
        breite: querbalkenBreite,
        gummiDicke: _leistenHoehe * Math.cos(glasNeig) + 5e-3,
        zPos: zInnenH_s + pfEff_s * 0.5,
        yPos: panelOKHinten + steig_s * pfEff_s * 0.5 + 6e-3,
        material: anschlussMaterial
      }
    ),
    Boolean(stirnblech) && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Stirnblech,
      {
        stirnblechHoehe: Number(stirnblechHoehe),
        stirnblechTiefe: Number(stirnblechTiefe),
        farbe: anschlussFarbeHex,
        anschlussBreite: querbalkenBreite,
        yPos: panelOKVorne + BLECH_STAERKE + 1e-3,
        zPos: zInnenV_s,
        neigung: glasNeig,
        material: anschlussMaterial
      }
    ),
    Number(seitenabschluss) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        Seitenabschluss,
        {
          seitenabschlussHoehe: Number(seitenabschlussHoehe),
          seitenabschlussTiefe: Number(seitenabschlussTiefe),
          farbe: anschlussFarbeHex,
          laenge: schraegeTiefe,
          xPos: -querbalkenBreite / 2,
          yPos: panelOKVorne + (panelOKHinten - panelOKVorne) / 2,
          zPos: zCenter_s,
          neigung: glasNeig,
          seite: "links"
        }
      ),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        Seitenabschluss,
        {
          seitenabschlussHoehe: Number(seitenabschlussHoehe),
          seitenabschlussTiefe: Number(seitenabschlussTiefe),
          farbe: anschlussFarbeHex,
          laenge: schraegeTiefe,
          xPos: querbalkenBreite / 2,
          yPos: panelOKVorne + (panelOKHinten - panelOKVorne) / 2,
          zPos: zCenter_s,
          neigung: glasNeig,
          seite: "rechts"
        }
      )
    ] })
  ] });
}
const solarEindeckungPropsSchema = {
  // Geometrie
  totalBreite: { type: "expression", label: "Gesamtbreite (m, 0=von Veranda)" },
  totalTiefe: { type: "expression", label: "Gesamttiefe (m, 0=von Veranda)" },
  // Modul-Raster
  modulBreite: { type: "expression", label: "Modul Breite (m, 0=sparren-basiert)" },
  modulTiefe: { type: "expression", label: "Modul Tiefe (m, 0=sparren-basiert)" },
  modulAnzahlBreite: { type: "expression", label: "Modul Anzahl Breite (0=max. passend)" },
  // Sparren
  sparrenAuflage: { type: "radioGroup", label: "Auflage (0=Aufliegend, 1=Innenliegend, 2=Aufdach)", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }, { value: "2", label: "Aufdach" }] },
  sparrenAnzahl: { type: "expression", label: "Sparren Anzahl (0=von Veranda)" },
  sparrenBreite: { type: "expression", label: "Sparren Breite (m, 0=von Veranda)" },
  sparrenHoehe: { type: "expression", label: "Sparren Höhe (m, 0=von Veranda)" },
  sparrenAussen: { type: "expression", label: "Außen-Sparren (0=Nein, 1=Ja)" },
  sparrenAussenBreite: { type: "expression", label: "Außen-Sparren Breite (m, 0=wie Sparren)" },
  sparrenAussenHoehe: { type: "expression", label: "Außen-Sparren Höhe (m, 0=wie Sparren)" },
  // Zellen
  maxZellenBreite: { type: "expression", label: "Max. Zellenbreite (m, 0=0.15)" },
  maxZellenTiefe: { type: "expression", label: "Max. Zellentiefe (m, 0=0.15)" },
  // Leisten zwischen Modulen
  leistenBreite: { type: "expression", label: "Leisten Breite (m, 0=keine)" },
  leistenHoehe: { type: "expression", label: "Leisten Höhe (m)" },
  leistenRundung: { type: "expression", label: "Leisten Rundung (0–10)" },
  // Wandanschluss / Winkelprofil
  extension: { type: "expression", label: "Anschluss (0=kein, 1=Wandanschluss, 2=Winkelprofil)" },
  wandanschlussHoehe: { type: "expression", label: "Anschluss Höhe (m)" },
  wandanschlussTiefe: { type: "expression", label: "Anschluss Tiefe (m)" },
  // Stirnblech (vorne)
  stirnblech: { type: "expression", label: "Stirnblech (0=Nein, 1=Ja)" },
  stirnblechHoehe: { type: "expression", label: "Stirnblech Höhe (m)" },
  stirnblechTiefe: { type: "expression", label: "Stirnblech Tiefe (m)" },
  // Seitenabschluss
  seitenabschluss: { type: "expression", label: "Seitenabschluss (0=Nein, 1=Ja)" },
  seitenabschlussHoehe: { type: "expression", label: "Seitenabschluss Höhe (m)" },
  seitenabschlussTiefe: { type: "expression", label: "Seitenabschluss Tiefe (m)" },
  // Materialien
  einzelMaterialien: { type: "expression", label: "Separate Anschluss-Materialien (0=Nein, 1=Ja)" }
};
const solarEindeckungDynamicModel = {
  type: "veranda-solar-eindeckung",
  label: "Solar-Eindeckung",
  description: "Eindeckung – Photovoltaik-Solarmodule",
  defaultProps: {
    // Geometrie
    totalBreite: { expression: "0" },
    totalTiefe: { expression: "0" },
    // Modul-Raster
    modulBreite: { expression: "0" },
    modulTiefe: { expression: "0" },
    modulAnzahlBreite: { expression: "0" },
    // Sparren
    sparrenAuflage: { expression: "0" },
    sparrenAnzahl: { expression: "0" },
    sparrenBreite: { expression: "0" },
    sparrenHoehe: { expression: "0" },
    sparrenAussen: { expression: "0" },
    sparrenAussenBreite: { expression: "0" },
    sparrenAussenHoehe: { expression: "0" },
    // Zellen
    maxZellenBreite: { expression: "0" },
    maxZellenTiefe: { expression: "0" },
    // Leisten
    leistenBreite: { expression: "0.06" },
    leistenHoehe: { expression: "0.015" },
    leistenRundung: { expression: "0" },
    // Wandanschluss
    extension: { expression: "1" },
    wandanschlussHoehe: { expression: "0.12" },
    wandanschlussTiefe: { expression: "0.06" },
    // Stirnblech
    stirnblech: { expression: "1" },
    stirnblechHoehe: { expression: "0.08" },
    stirnblechTiefe: { expression: "0.04" },
    // Seitenabschluss
    seitenabschluss: { expression: "0" },
    seitenabschlussHoehe: { expression: "0.03" },
    seitenabschlussTiefe: { expression: "0.04" },
    // Materialien
    einzelMaterialien: { expression: "0" }
  },
  propsDialog: solarEindeckungPropsSchema,
  component: SolarEindeckungModel,
  materials: ["profil", "glas", "anschluss", "leisten"],
  disabledForAR: false,
  requiredLicense: "Enterprise"
};

function RegenrinneModel(props) {
  const getVal = (v, fallback) => {
    const valStr = exprVal(v);
    const val = Number(valStr);
    if (v === void 0 || v === null || valStr === "" || isNaN(val))
      return fallback;
    return val;
  };
  const parent = useVerandaGeometry();
  const width = parent.width || Number(exprVal(props.width)) || 4;
  const depth = parent.depth || Number(exprVal(props.depth)) || 3;
  const height = parent.height || 0;
  const rinnenBreite = getVal(props.rinnenBreite, 0.12);
  const rinnenHoehe = getVal(props.rinnenHoehe, 0.08);
  const wandStaerke = getVal(props.wandStaerke, 9e-3);
  const {
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const rinnenTyp = Number(exprVal(props.typ) || "0");
  const dachneigung = parent.dachneigung || 0;
  const farbeHex = "#808080";
  const anchors = calcSlotAnchors({
    ...parent,
    width,
    depth,
    height,
    rinnenBreite,
    rinnenHoehe
  });
  const rinnePosition = anchors.rinne.position;
  const rinnenLaenge = anchors.rinne.size.breite;
  const profilMaterial = materials.profil;
  if (profilMaterial) profilMaterial.name = "profil";
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: rinnePosition, rotation: [0, Math.PI, 0], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Regenrinne,
          {
            typ: rinnenTyp,
            width: rinnenLaenge,
            rinnenBreite,
            rinnenHoehe,
            wandStaerke,
            dachneigung,
            farbeHex,
            material: profilMaterial
          }
        ) })
      ]
    }
  );
}
const regenrinnePropsSchema = {
  typ: { type: "radioGroup", label: "Variante (0=Kasten, 1=Eckig, 2=Rund, 3=Klassisch, 4=Fantasy)", options: [
    { value: "0", label: "Kasten" },
    { value: "1", label: "Eckig" },
    { value: "2", label: "Rund" },
    { value: "3", label: "Klassisch" },
    { value: "4", label: "Fantasy" }
  ] },
  rinnenBreite: { type: "expression", label: "Breite (m)" },
  rinnenHoehe: { type: "expression", label: "Höhe (m)" },
  wandStaerke: { type: "expression", label: "Wandstärke (m)" }
};
const regenrinneDynamicModel = {
  type: "veranda-regenrinne",
  label: "Regenrinne",
  description: "Regenrinne – Kasten, Eckig, Rund, Klassisch oder Fantasy",
  defaultProps: {
    typ: { expression: "0" },
    rinnenBreite: { expression: "0.12" },
    rinnenHoehe: { expression: "0.08" },
    wandStaerke: { expression: "0.009" }
  },
  propsDialog: regenrinnePropsSchema,
  component: RegenrinneModel,
  materials: ["profil"],
  disabledForAR: false
};

function PfostenModel(props) {
  const {
    pfostenAnzahlVorne: propAnzahlVorne,
    pfostenAnzahlHinten: propAnzahlHinten,
    pfostenBreite: propPfostenBreite,
    pfostenTiefe: propPfostenTiefe,
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const getVal = (v, fallback) => {
    const valStr = exprVal(v);
    const val = Number(valStr);
    if (v === void 0 || v === null || valStr === "" || isNaN(val))
      return fallback;
    return val;
  };
  const pfostenTyp = getVal(props.typ, 0);
  const parent = useVerandaGeometry();
  const pfostenAnzahlVorne = getVal(propAnzahlVorne, 2);
  const pfostenAnzahlHinten = getVal(propAnzahlHinten, 2);
  const pfostenBreite = getVal(propPfostenBreite, 0.1);
  const pfostenTiefe = getVal(propPfostenTiefe, 0.1);
  const pfostenBreiteHinten = getVal(props.pfostenBreiteHinten, pfostenBreite);
  const pfostenTiefeHinten = getVal(props.pfostenTiefeHinten, pfostenTiefe);
  const wandInfo = useWandInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    wandInfo.setPfostenAnzahlVorne(pfostenAnzahlVorne);
    wandInfo.setPfostenAnzahlHinten(pfostenAnzahlHinten);
    return () => {
      wandInfo.setPfostenAnzahlVorne(2);
      wandInfo.setPfostenAnzahlHinten(2);
    };
  }, [pfostenAnzahlVorne, pfostenAnzahlHinten]);
  const width = parent.width;
  const depth = parent.depth;
  const height = parent.height;
  const dachneigung = parent.dachneigung;
  const dachVorsprung = parent.dachVorsprung;
  const schwelle = parent.schwelle;
  const schwelleBreite = parent.schwelleBreite;
  const schwelleHoehe = parent.schwelleHoehe;
  const sparrenAuflage = parent.sparrenAuflage;
  const sparrenHoehe = parent.sparrenHoehe;
  const pfette = parent.pfette;
  const pfettenHoehe = parent.pfettenHoehe;
  const staticTraeger = parent.staticTraeger;
  const staticTraegerHoehe = parent.staticTraegerHoehe;
  const rinnenHoehe = parent.rinnenHoehe ?? 0.08;
  const { hoeheVorne, hoeheHinten } = calcVerandaGeometry(depth, dachneigung, height);
  const innenliegend = Number(sparrenAuflage) === 1;
  const steigungPfosten = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  const qtVorne = Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const postZOffset = dachVorsprung + pfostenTiefe / 2;
  const hoeheAnPfosten = hoeheVorne + steigungPfosten * postZOffset;
  let quertraegerHoeheVorne;
  if (parent.isQubus) {
    quertraegerHoeheVorne = parent.qubusRahmenHoehe ?? 0.1;
  } else if (Number(staticTraeger) === 1) {
    quertraegerHoeheVorne = (innenliegend ? sparrenHoehe : 0) + staticTraegerHoehe;
  } else if (dachVorsprung < 1e-3) {
    const schwelleOK = innenliegend ? hoeheVorne + steigungPfosten * qtVorne : hoeheVorne + sparrenHoehe;
    const rinneUK = schwelleOK - rinnenHoehe;
    quertraegerHoeheVorne = hoeheAnPfosten - rinneUK;
  } else if (innenliegend) {
    quertraegerHoeheVorne = sparrenHoehe;
  } else {
    if (Number(schwelle) === 1) {
      const sZOff = schwelleBreite >= pfostenTiefe ? schwelleBreite / 2 : pfostenTiefe - schwelleBreite / 2;
      const schwelleOK = hoeheVorne + steigungPfosten * sZOff;
      quertraegerHoeheVorne = hoeheAnPfosten - (schwelleOK - schwelleHoehe);
    } else {
      quertraegerHoeheVorne = 0;
    }
  }
  const quertraegerHoeheHinten = Number(pfette) === 1 ? pfettenHoehe : 0;
  const profilMaterial = materials.profil;
  if (profilMaterial) profilMaterial.name = "profil";
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Konstruktion,
          {
            gesamtBreite: width - pfostenBreite,
            gesamtTiefe: depth,
            hoeheVorne,
            hoeheHinten,
            pfostenAnzahlVorne,
            pfostenAnzahlHinten,
            pfostenTyp,
            pfostenBreite,
            pfostenTiefe,
            pfostenBreiteHinten,
            pfostenTiefeHinten,
            quertraegerHoehe: quertraegerHoeheVorne,
            quertraegerHoeheHinten,
            quertraegerTiefe: 0,
            dachVorsprung,
            material: profilMaterial
          }
        )
      ]
    }
  );
}
const pfostenPropsSchema = {
  typ: { type: "radioGroup", label: "Profiltyp (0=Eckig, 1=Rund, 2=Klassisch)", options: [
    { value: "0", label: "Eckig" },
    { value: "1", label: "Rund" },
    { value: "2", label: "Klassisch" }
  ] },
  pfostenBreite: { type: "expression", label: "Breite / Durchmesser (m)" },
  pfostenTiefe: { type: "expression", label: "Tiefe (m, nur Eckig/Klassisch)" },
  pfostenBreiteHinten: { type: "expression", label: "Breite hinten (m, leer = wie vorne)" },
  pfostenTiefeHinten: { type: "expression", label: "Tiefe hinten (m, leer = wie vorne)" },
  pfostenAnzahlVorne: { type: "expression", label: "Anzahl vorne (min. 2)" },
  pfostenAnzahlHinten: { type: "expression", label: "Anzahl hinten (0=keine)" }
};
const pfostenDynamicModel = {
  type: "veranda-pfosten",
  label: "Pfosten",
  description: "Pfosten – Eckig, Rund oder Klassisch",
  defaultProps: {
    typ: { expression: "0" },
    pfostenBreite: { expression: "0.1" },
    pfostenTiefe: { expression: "0.1" },
    pfostenBreiteHinten: { expression: "" },
    pfostenTiefeHinten: { expression: "" },
    pfostenAnzahlVorne: { expression: "2" },
    pfostenAnzahlHinten: { expression: "2" }
  },
  propsDialog: pfostenPropsSchema,
  component: PfostenModel,
  materials: ["profil"],
  disabledForAR: false
};

const SICHTSCHUTZWAND_AUFBAU_SLOTS = {
  aufbauLinks: { id: "veranda-slot-aufbau-links", name: "Aufbau Links" },
  aufbauRechts: { id: "veranda-slot-aufbau-rechts", name: "Aufbau Rechts" },
  aufbauVorne: { id: "veranda-slot-aufbau-vorne", name: "Aufbau Vorne" },
  aufbauHinten: { id: "veranda-slot-aufbau-hinten", name: "Aufbau Hinten" }
};
const WAND_BESCHATTUNG_SLOT = {
  id: "veranda-slot-wand-beschattung",
  name: "Beschattung"
};

function BasicWandRenderer({
  wandBreite,
  wandHoehe,
  material,
  farbeHex
}) {
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wandBreite, wandHoehe, 0.01] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
  ] });
}

const WAND_TYPE_MAP = {
  [WAND_TYP.KEIL]: "veranda-wand-keil",
  [WAND_TYP.RAHMENWAND]: "veranda-wand-rahmenwand",
  [WAND_TYP.SCHIEBETUER]: "veranda-wand-schiebetuer",
  [WAND_TYP.SHUTTERS]: "veranda-wand-shutters",
  [WAND_TYP.SICHTSCHUTZWAND]: "veranda-wand-sichtschutzwand",
  [WAND_TYP.SENKRECHTMARKISE]: "veranda-wand-senkrechtmarkise"
};
const KEIL_FRAME_SW$1 = 0.06;
function toExpr(val) {
  if (typeof val === "number") return { expression: String(val) };
  return val;
}
const RADIO_OPTIONS = {
  mitRahmen: [{ value: "0", label: "Ohne Rahmen" }, { value: "1", label: "Mit Rahmen" }],
  griffPosition: [{ value: "0", label: "Links" }, { value: "1", label: "Rechts" }],
  griffSeite: [{ value: "0", label: "Innen" }, { value: "1", label: "Außen" }, { value: "2", label: "Beidseitig" }],
  laufrichtung: [{ value: "0", label: "Rechts" }, { value: "1", label: "Links" }],
  schienenSeite: [{ value: "0", label: "Außen" }, { value: "1", label: "Innen" }],
  schiebend: [{ value: "0", label: "Nein" }, { value: "1", label: "Ja" }],
  aufbauTyp: [{ value: "0", label: "Querbalken" }, { value: "1", label: "Planken vertikal" }],
  querbalken: [{ value: "0", label: "Nein" }, { value: "1", label: "Ja" }]
};
const DIALOG_LABELS = {
  breite: "Breite (0=auto aus Veranda) (m)",
  hoehe: "Höhe (0=auto aus Veranda) (m)",
  glasTyp: "Füllungstyp (0=Glas, 1=Poly, 2=Planken)",
  fuellungTypOben: "Füllung oben (0=Glas, 1=Poly, 2=Planken)",
  fuellungTypUnten: "Füllung unten (0=Glas, 1=Poly, 2=Planken)",
  fuellungTyp: "Füllung (0=Glas, 1=Poly, 2=Planken)",
  opacity: "Transparenz (0–1)",
  roughness: "Rauheit (0–1)",
  metalness: "Metalness (0–1)",
  envMapIntensity: "EnvMap-Intensität (Multiplikator)",
  kammergroesse: "Kammergröße (m)",
  keilAbschnitt: "Keilabschnitt vorne (0=Spitze) (m)",
  keilTeiler: "Zwischenpfosten Anzahl (0=keine)",
  dicke: "Profiltiefe (m)",
  mitMittelbalken: "Mittelbalken (0=Nein, 1=Ja)",
  aufDachneigung: "Oberkante (0=Standard, 1=Volle Höhe)",
  mittelbalkenHoehe: "Mittelbalken-Höhe ab Boden (m)",
  maxScheibenBreite: "Max. Scheibenbreite (0=ohne Limit) (m)",
  mitRahmen: "Variante (0=Ohne Rahmen, 1=Mit Rahmen)",
  tuertypPanels: "Anzahl Elemente (0=auto)",
  festeElemente: "Feste Elemente (Anzahl, 0=alle schiebbar; Seite via Laufrichtung)",
  oeffnung: "Öffnung (0=zu, 1=offen)",
  laufrichtung: "Laufrichtung (0=Rechts, 1=Links)",
  schienenSeite: "Schienen-Seite (0=Außen, 1=Innen)",
  griffTyp: "Grifftyp (0=Rund, 1=Muschel, 2=Stahl, 3=Ohne)",
  griffAnordnung: "Griff-Anordnung (0=Erste Tür, 1=Anf.+Ende, 2=Alle)",
  griffPosition: "Griffposition (0=Links, 1=Rechts)",
  griffSeite: "Griffseite (0=Innen, 1=Außen, 2=Beidseitig)",
  griffHoehe: "Griffhöhe (m)",
  buersten: "Bürsten (0=Nein, 1=Ja)",
  maxPanelBreite: "Max. Panelbreite (0=ohne Limit) (m)",
  glasDicke: "Glasdicke (m)",
  rahmenBreite: "Rahmenbreite (m)",
  lamellenHoehe: "Lamellenhöhe (m)",
  anzahlRahmen: "Anzahl Rahmen (Elemente)",
  schiebend: "Schiebend (0=Nein, 1=Ja)",
  wandHoehe: "Wandhöhe (m)",
  plankenHoehe: "Planken-Höhe (m)",
  plankenTiefe: "Planken-Stärke (m)",
  opacityOben: "Transparenz oben (0–1)",
  opacityUnten: "Transparenz unten (0–1)",
  roughnessOben: "Rauheit oben (0–1)",
  roughnessUnten: "Rauheit unten (0–1)",
  kammergroesseOben: "Kammergröße oben (m)",
  kammergroesseUnten: "Kammergröße unten (m)",
  querbalken: "Abschlussbalken oben (0=Nein, 1=Ja)",
  volleHoehe: "Volle Höhe (0=Nein, 1=Ja)",
  minAufbauHoehe: "Min. Aufbauhöhe (m)",
  metalnessOben: "Metalness oben (0–1)",
  metalnessUnten: "Metalness unten (0–1)",
  envMapIntensityOben: "EnvMap-Intensität oben (Multiplikator)",
  envMapIntensityUnten: "EnvMap-Intensität unten (Multiplikator)",
  oeffnungSchiebe: "Öffnung Schiebe (0=zu, 1=offen)",
  oeffnungLamellen: "Öffnung Lamellen (0=zu, 1=offen)",
  rahmenTiefe: "Rahmen-Tiefe (m)"
};
function buildBaseDialogKeys(wandTyp) {
  if (wandTyp === WAND_TYP.KEIL || wandTyp === WAND_TYP.SCHIEBETUER) {
    const keys = ["breite", "hoehe", "fuellungTyp", "opacity", "roughness", "plankenHoehe", "plankenTiefe"];
    if (wandTyp === WAND_TYP.KEIL) keys.push("glasTyp");
    return keys;
  }
  if (wandTyp === WAND_TYP.RAHMENWAND) {
    return [
      "breite",
      "hoehe",
      "fuellungTypOben",
      "opacityOben",
      "roughnessOben",
      "fuellungTypUnten",
      "opacityUnten",
      "roughnessUnten",
      "plankenHoehe",
      "plankenTiefe"
    ];
  }
  return ["breite", "hoehe"];
}
function buildWandPropsSchema(allDialogKeys) {
  const schema = {};
  for (const key of allDialogKeys) {
    const opts = RADIO_OPTIONS[key];
    const label = DIALOG_LABELS[key] ?? key;
    if (opts) {
      schema[key] = { type: "radioGroup", label, options: opts };
    } else {
      schema[key] = { type: "expression", label };
    }
  }
  return schema;
}

const SCRATCH_PLANE = new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane();
const CAPACITY_BUCKET = 16;
function PlankenFilling({
  areaWidth,
  areaHeight,
  plankenHoehe,
  plankenTiefe,
  material,
  farbeHex,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  getPlankWidthAtY,
  getPlankXOffsetAtY,
  clippingPlanes
}) {
  const meshRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const groupRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const invalidate = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useThree((s) => s.invalidate);
  const [worldPlanes, setWorldPlanes] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(void 0);
  const worldPlanesRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(void 0);
  const localBoundingPlanes = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => [
    new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(1, 0, 0), 0),
    new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(-1, 0, 0), 0),
    new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, 1, 0), 0),
    new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, -1, 0), 0)
  ], []);
  const [posX, posY, posZ] = position;
  const [rotX, rotY, rotZ] = rotation;
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    const updatePlanes = () => {
      const group = groupRef.current;
      if (!group) return;
      group.updateWorldMatrix(true, true);
      const wm = group.matrixWorld;
      localBoundingPlanes[0].constant = 0;
      localBoundingPlanes[1].constant = areaWidth;
      localBoundingPlanes[2].constant = 0;
      localBoundingPlanes[3].constant = areaHeight;
      const localPlanes = clippingPlanes ? [...localBoundingPlanes, ...clippingPlanes] : localBoundingPlanes;
      const current = worldPlanesRef.current;
      if (!current || current.length !== localPlanes.length) {
        const next = localPlanes.map((p) => {
          const wp = new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane().copy(p).applyMatrix4(wm);
          wp.normal.normalize();
          return wp;
        });
        worldPlanesRef.current = next;
        setWorldPlanes(next);
        return;
      }
      let changed = false;
      for (let i = 0; i < localPlanes.length; i++) {
        SCRATCH_PLANE.copy(localPlanes[i]).applyMatrix4(wm);
        SCRATCH_PLANE.normal.normalize();
        const wp = current[i];
        if (Math.abs(SCRATCH_PLANE.constant - wp.constant) > 1e-4 || SCRATCH_PLANE.normal.distanceTo(wp.normal) > 1e-4) {
          wp.copy(SCRATCH_PLANE);
          changed = true;
        }
      }
      if (changed) invalidate();
    };
    updatePlanes();
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      updatePlanes();
      raf2 = requestAnimationFrame(updatePlanes);
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [clippingPlanes, posX, posY, posZ, rotX, rotY, rotZ, areaWidth, areaHeight, localBoundingPlanes, invalidate]);
  const nD = Math.min(5e-3, plankenHoehe / 4);
  const effektivePlankenHoehe = Math.max(1e-3, plankenHoehe - nD);
  const N = isFinite(areaHeight / effektivePlankenHoehe) ? Math.max(1, Math.ceil(areaHeight / effektivePlankenHoehe) + 5) : 1;
  const capacity = Math.max(CAPACITY_BUCKET, Math.ceil(N / CAPACITY_BUCKET) * CAPACITY_BUCKET);
  const dummy = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D(), []);
  const geometry = useCachedGeometry(
    `plank|${gkey(plankenHoehe)}|${gkey(plankenTiefe)}|${gkey(nD)}`,
    () => {
      const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
      const w = plankenHoehe;
      const t = plankenTiefe;
      const nW = Math.max(2e-3, t / 3);
      const f = 15e-4;
      shape.moveTo(-t / 2, f);
      shape.lineTo(-t / 2 + f, 0);
      shape.lineTo(-nW / 2, 0);
      shape.lineTo(-nW / 2, nD);
      shape.lineTo(nW / 2, nD);
      shape.lineTo(nW / 2, 0);
      shape.lineTo(t / 2 - f, 0);
      shape.lineTo(t / 2, f);
      shape.lineTo(t / 2, w - nD - f);
      shape.lineTo(t / 2 - f, w - nD);
      shape.lineTo(nW / 2, w - nD);
      shape.lineTo(nW / 2, w);
      shape.lineTo(-nW / 2, w);
      shape.lineTo(-nW / 2, w - nD);
      shape.lineTo(-t / 2 + f, w - nD);
      shape.lineTo(-t / 2, w - nD - f);
      shape.lineTo(-t / 2, f);
      return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });
    }
  );
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.instanceMatrix.setUsage(veranda_mf_2_plugin__loadShare__three__loadShare__.DynamicDrawUsage);
      for (let i = 0; i < N; i++) {
        let yPos = i * effektivePlankenHoehe;
        const currentWidth = getPlankWidthAtY ? getPlankWidthAtY(yPos) : areaWidth;
        const xOff = getPlankXOffsetAtY ? getPlankXOffsetAtY(yPos) : 0;
        dummy.position.set(xOff, yPos, 0);
        dummy.rotation.set(0, Math.PI / 2, 0);
        dummy.scale.set(1, 1, currentWidth);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.computeBoundingSphere();
    }
  }, [N, areaHeight, areaWidth, plankenHoehe, effektivePlankenHoehe, dummy, getPlankWidthAtY, getPlankXOffsetAtY, plankenTiefe]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { ref: groupRef, position, rotation, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "instancedMesh",
    {
      ref: meshRef,
      args: [null, null, capacity],
      count: N,
      castShadow: true,
      receiveShadow: true,
      onBeforeRender: (gl) => {
        gl.localClippingEnabled = true;
      },
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: geometry, attach: "geometry", dispose: null }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          MaterialFallback,
          {
            material,
            fallbackColor: farbeHex,
            clippingPlanes: worldPlanes,
            surface: "alu",
            surfaceAxis: [1, 0, 0]
          }
        )
      ]
    },
    capacity
  ) });
}
const PlankenFillingMemo = veranda_mf_2_plugin__loadShare__react__loadShare__.memo(PlankenFilling);

const SHADOW_OPACITY_THRESHOLD$2 = 0.5;
function KeilWand({
  length,
  hoeheVorne,
  hoeheHinten,
  keilAbschnitt,
  keilTeiler,
  dicke,
  fuellungTyp,
  material,
  glasMaterial,
  farbeHex,
  glasFarbeHex,
  opacity,
  roughness = 0,
  metalness = 0,
  envMapIntensity = 1,
  kammergroesse = 0.05,
  plankenHoehe = 0.15,
  plankenTiefe = 0.02,
  pfettenBreite = 0,
  pfettenHoehe = 0
}) {
  const SW = 0.06;
  const xF = -length / 2;
  const xB = length / 2;
  const xPfVK = pfettenBreite > 0 ? xB - pfettenBreite : xB;
  const hD = hoeheHinten > hoeheVorne + 1e-3 ? hoeheHinten - hoeheVorne : Math.max(hoeheVorne * 0.25, 0.3);
  const sv = SW / Math.cos(Math.atan2(hD, length));
  const yF = keilAbschnitt;
  const yFTop = yF + SW;
  const innerTopAtX = (x) => yFTop - sv + (x - xF) / length * hD;
  const topShape = React.useMemo(() => {
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    const xEnd = xPfVK;
    const yEndTop = yFTop + (xEnd - xF) / length * hD;
    const yEndTopInner = yFTop - sv + (xEnd - xF) / length * hD;
    s.moveTo(xF, yFTop - sv);
    s.lineTo(xEnd, yEndTopInner);
    s.lineTo(xEnd, yEndTop);
    s.lineTo(xF, yFTop);
    s.closePath();
    return s;
  }, [xF, xPfVK, yFTop, hD, length, sv]);
  const botShape = React.useMemo(() => {
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(xF, 0);
    s.lineTo(xB, 0);
    s.lineTo(xB, SW);
    s.lineTo(xF, SW);
    s.closePath();
    return s;
  }, [xF, xB]);
  const frontPostShape = React.useMemo(() => {
    if (yF < 1e-3) return null;
    const yTopL = yFTop - sv;
    const yTopR = yFTop - sv + SW / length * hD;
    if (yTopL <= SW + 1e-3) return null;
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(xF, SW);
    s.lineTo(xF + SW, SW);
    s.lineTo(xF + SW, yTopR);
    s.lineTo(xF, yTopL);
    s.closePath();
    return s;
  }, [xF, yF, yFTop, SW, sv, length, hD]);
  const backPostShape = React.useMemo(() => {
    const xBeff = xPfVK;
    const yTopAtXB = yFTop + (xBeff - xF) / length * hD;
    const yTopR = yTopAtXB - sv;
    const yTopL = yTopR - SW / length * hD;
    if (yTopR <= SW + 1e-3) return null;
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(xBeff - SW, SW);
    s.lineTo(xBeff, SW);
    s.lineTo(xBeff, yTopAtXB);
    s.lineTo(xBeff - SW, Math.max(SW, yTopL));
    s.closePath();
    return s;
  }, [xF, xPfVK, yFTop, hD, length, SW, sv]);
  const { divShapes, glasShapes, glasPanelBounds } = React.useMemo(() => {
    const numDiv = Math.max(0, Math.floor(keilTeiler));
    const divs = [];
    const glass = [];
    const panels = [];
    const innerXS = xF + (yF > 1e-3 ? SW : 0);
    const innerXE = xPfVK - SW;
    const innerLen = innerXE - innerXS;
    if (innerLen < 0.02)
      return { divShapes: divs, glasShapes: glass, glasPanelBounds: panels };
    const panelW = (innerLen - numDiv * SW) / (numDiv + 1);
    if (panelW < 0.02)
      return { divShapes: divs, glasShapes: glass, glasPanelBounds: panels };
    const _innerTopAtX = (x) => yFTop - sv + (x - xF) / length * hD;
    for (let i = 0; i <= numDiv; i++) {
      const gxS = innerXS + i * (panelW + SW);
      const gxE = gxS + panelW;
      const yTS = _innerTopAtX(gxS);
      const yTE = _innerTopAtX(gxE);
      const yTSc = Math.max(SW, yTS);
      const yTEc = Math.max(SW, yTE);
      if (yTSc > SW || yTEc > SW) {
        const gs = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
        if (yTS < SW && yTE > SW) {
          const xCross = gxS + (SW - yTS) / (yTE - yTS) * (gxE - gxS);
          gs.moveTo(xCross, SW);
          gs.lineTo(gxE, SW);
          gs.lineTo(gxE, yTEc);
          gs.closePath();
        } else {
          gs.moveTo(gxS, SW);
          gs.lineTo(gxE, SW);
          gs.lineTo(gxE, yTEc);
          gs.lineTo(gxS, yTSc);
          gs.closePath();
        }
        glass.push(gs);
        panels.push({ gxS, gxE });
      }
      if (i < numDiv) {
        const dxS = gxE;
        const dxE = dxS + SW;
        const yDS = Math.max(SW, _innerTopAtX(dxS));
        const yDE = Math.max(SW, _innerTopAtX(dxE));
        if (yDS > SW || yDE > SW) {
          const ds = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
          ds.moveTo(dxS, SW);
          ds.lineTo(dxE, SW);
          ds.lineTo(dxE, yDE);
          ds.lineTo(dxS, yDS);
          ds.closePath();
          divs.push(ds);
        }
      }
    }
    return { divShapes: divs, glasShapes: glass, glasPanelBounds: panels };
  }, [xF, xPfVK, yF, yFTop, hD, length, keilTeiler, SW, sv]);
  const sockelShape = React.useMemo(() => {
    if (pfettenBreite < 1e-3 || pfettenHoehe < 1e-3) return null;
    const yAtPfVK = yFTop + (xPfVK - xF) / length * hD;
    const pfBoden = yAtPfVK - pfettenHoehe;
    if (pfBoden <= SW + 1e-3) return null;
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(xPfVK, SW);
    s.lineTo(xB, SW);
    s.lineTo(xB, pfBoden);
    s.lineTo(xPfVK, pfBoden);
    s.closePath();
    return s;
  }, [xF, xPfVK, xB, yFTop, hD, length, pfettenBreite, pfettenHoehe, SW]);
  const extCfg = { depth: dicke, bevelEnabled: false, steps: 1 };
  const glasD = Math.min(dicke * 0.15, 0.016);
  const glsCfg = { depth: glasD, bevelEnabled: false, steps: 1 };
  const glasZ = (dicke - glasD) / 2;
  const polyStegData = React.useMemo(() => {
    if (fuellungTyp !== 1)
      return [];
    const kammer = Math.max(5e-3, kammergroesse);
    return glasPanelBounds.map(({ gxS, gxE }) => {
      const stege = [];
      let sx = gxS + kammer;
      while (sx < gxE - 3e-3) {
        const yTop = Math.max(SW, innerTopAtX(sx));
        if (yTop > SW + 0.01) {
          stege.push({ x: sx, yBot: SW, yTop });
        }
        sx += kammer;
      }
      return stege;
    });
  }, [
    fuellungTyp,
    kammergroesse,
    glasPanelBounds,
    xF,
    yFTop,
    sv,
    length,
    hD,
    SW
  ]);
  React.useMemo(() => {
    if (!glasMaterial) return;
    const mat = glasMaterial;
    mat.transparent = opacity < 1;
    mat.opacity = opacity;
    mat.depthWrite = opacity >= 1;
    mat.roughness = roughness;
    mat.metalness = metalness;
    mat.envMapIntensity = envMapIntensity;
    mat.needsUpdate = true;
  }, [glasMaterial, opacity, roughness, metalness, envMapIntensity]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, 0, -dicke / 2], children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [topShape, extCfg] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [botShape, extCfg] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    frontPostShape && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [frontPostShape, extCfg] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    backPostShape && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [backPostShape, extCfg] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    sockelShape && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [sockelShape, extCfg] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    divShapes.map((s, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, extCfg] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }, i)),
    fuellungTyp === 1 ? (
      // Polycarbonat: zwei dünne Deckplatten + opake Stege
      glasShapes.map((s, i) => {
        const DECK_DICKE = Math.max(1e-3, glasD * 0.15);
        const STEG_DICKE = Math.max(8e-4, glasD * 0.1);
        const deckCfg = {
          depth: DECK_DICKE,
          bevelEnabled: false,
          steps: 1
        };
        const innenD = Math.max(0, glasD - 2 * DECK_DICKE);
        const stege = polyStegData[i] ?? [];
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, 0, glasZ], material: glasMaterial, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
            !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity, roughness, metalness, envMapIntensity })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, 0, glasZ + glasD - DECK_DICKE], material: glasMaterial, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
            !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity, roughness, metalness, envMapIntensity })
          ] }),
          stege.map((steg, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [
                steg.x,
                (steg.yBot + steg.yTop) / 2,
                glasZ + DECK_DICKE + innenD / 2
              ],
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "boxGeometry",
                  {
                    args: [STEG_DICKE, steg.yTop - steg.yBot, innenD]
                  }
                ),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "meshPhysicalMaterial",
                  {
                    color: glasFarbeHex,
                    roughness
                  }
                )
              ]
            },
            si
          ))
        ] }, i);
      })
    ) : fuellungTyp === 2 ? (() => {
      const innerXS = xF + (yF > 1e-3 ? SW : 0);
      const innerXE = xPfVK - SW;
      const totalW = innerXE - innerXS;
      if (totalW < 0.01) return null;
      const hS_total = Math.max(SW, innerTopAtX(innerXS)) - SW;
      const hE_total = Math.max(SW, innerTopAtX(innerXE)) - SW;
      const hMax_total = Math.max(hS_total, hE_total) + 0.5;
      if (Math.max(hS_total, hE_total) <= 1e-3) return null;
      const pos = [innerXS, SW, dicke / 2];
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        KeilPlankenField,
        {
          panelW: totalW,
          hS: hS_total,
          hE: hE_total,
          hMax: hMax_total,
          plankenHoehe,
          plankenTiefe,
          material,
          farbeHex,
          position: pos
        }
      );
    })() : (
      // Glas: einfaches transparentes Extrusions-Panel
      glasShapes.map((s, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, 0, dicke / 2], castShadow: opacity >= SHADOW_OPACITY_THRESHOLD$2, receiveShadow: true, material: glasMaterial, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, glsCfg] }),
        !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity, roughness, metalness, envMapIntensity, clearcoat: 1, clearcoatRoughness: 0.05 })
      ] }, i))
    )
  ] });
}
function KeilPlankenField({
  panelW,
  hS,
  hE,
  hMax,
  plankenHoehe,
  plankenTiefe,
  material,
  farbeHex,
  position
}) {
  const planes = React.useMemo(() => {
    const pBot = new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, 1, 0), 0);
    const pLeft = new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(1, 0, 0), 0);
    const pRight = new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(-1, 0, 0), panelW);
    const normal = new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(hE - hS, -panelW, 0).normalize();
    const pTop = new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane().setFromNormalAndCoplanarPoint(
      normal,
      new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, hS, 0)
    );
    return [pBot, pLeft, pRight, pTop];
  }, [panelW, hS, hE]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    PlankenFillingMemo,
    {
      areaWidth: panelW,
      areaHeight: hMax,
      plankenHoehe,
      plankenTiefe,
      material,
      farbeHex,
      position,
      clippingPlanes: planes
    }
  );
}
const KeilWandMemo = React.memo(KeilWand);

function renderKeil(rc, props) {
  const {
    effectiveSide,
    wandBreite,
    zoneHoeheVorne,
    zoneHoeheHinten,
    ctx,
    material,
    glasMaterial,
    farbeHex,
    hasPfette,
    hasRearPosts,
    isSideWall,
    aussensparrenHoehe
  } = rc;
  const isRightSide = effectiveSide === 1;
  const keilAbschnittVal = Number(
    exprVal(props.keilAbschnitt) ?? exprVal(props.abschnittVorne) ?? 0
  );
  const dickeVal = Number(exprVal(props.dicke) ?? 0.07);
  const keilZOffset = (ctx.pfostenBreite - dickeVal) / 2;
  const isInnenliegend = ctx.sparrenAuflage === 1;
  const effectiveHeightOffset = isInnenliegend ? aussensparrenHoehe > 0 ? ctx.sparrenHoehe - aussensparrenHoehe : 0 : 0;
  const keilEffHoeheVorne = zoneHoeheVorne + effectiveHeightOffset;
  const keilEffHoeheHinten = zoneHoeheHinten + effectiveHeightOffset;
  const keilHasPfette = isSideWall && hasPfette && !hasRearPosts;
  const keilPfettenBreite = keilHasPfette ? ctx.pfettenBreite : 0;
  const keilPfettenRohHoehe = keilHasPfette ? ctx.pfettenHoehe : 0;
  const keilSteigung = wandBreite > 1e-3 ? (keilEffHoeheHinten - keilEffHoeheVorne) / wandBreite : 0;
  const pfetteBoden = keilHasPfette ? zoneHoeheHinten + (isInnenliegend ? ctx.sparrenHoehe : 0) + keilSteigung * keilPfettenBreite / 2 - keilPfettenRohHoehe : keilEffHoeheHinten;
  const keilPfettenHoehe = Math.max(0, keilEffHoeheHinten - pfetteBoden);
  const keilCutoutBreite = keilPfettenHoehe > 1e-3 ? keilPfettenBreite : 0;
  const keilTotalLength = wandBreite + keilPfettenBreite;
  const keilEffHoeheHintenExt = keilEffHoeheVorne + keilSteigung * keilTotalLength;
  const keilXOffset = (isRightSide ? -1 : 1) * keilPfettenBreite / 2;
  return [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "group",
      {
        position: [
          keilXOffset,
          keilEffHoeheVorne - keilAbschnittVal - KEIL_FRAME_SW$1,
          keilZOffset
        ],
        rotation: [0, isRightSide ? Math.PI : 0, 0],
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          KeilWandMemo,
          {
            length: keilTotalLength,
            hoeheVorne: keilEffHoeheVorne,
            hoeheHinten: keilEffHoeheHintenExt,
            keilAbschnitt: keilAbschnittVal,
            keilTeiler: Number(exprVal(props.keilTeiler) ?? 0),
            dicke: Number(exprVal(props.dicke) ?? 0.07),
            fuellungTyp: Number(exprVal(props.fuellungTyp) ?? exprVal(props.glasTyp) ?? 0),
            material,
            glasMaterial,
            farbeHex,
            glasFarbeHex: "#ccddee",
            opacity: Number(exprVal(props.opacity) ?? 0.2),
            roughness: Number(exprVal(props.roughness) ?? 0),
            metalness: Number(exprVal(props.metalness) ?? 0),
            envMapIntensity: Number(exprVal(props.envMapIntensity) ?? 1),
            kammergroesse: Number(exprVal(props.kammergroesse) || 0.05),
            plankenHoehe: Number(exprVal(props.plankenHoehe) ?? 0.15),
            plankenTiefe: Number(exprVal(props.plankenTiefe) ?? 0.02),
            pfettenBreite: keilCutoutBreite,
            pfettenHoehe: keilPfettenHoehe
          }
        )
      }
    ),
    null
  ];
}

const SHADOW_OPACITY_THRESHOLD$1 = 0.5;
function RahmenwandWand({
  wandBreite,
  wandHoeheVorne,
  mitMittelbalken,
  mittelbalkenHoehe,
  maxScheibenBreite,
  fuellungTypOben,
  fuellungTypUnten,
  material,
  glasMaterialOben,
  glasMaterialUnten,
  farbeHex,
  glasFarbeHex,
  opacityOben,
  roughnessOben = 0,
  metalnessOben = 0,
  envMapIntensityOben = 1,
  kammergroesseOben = 0.05,
  opacityUnten,
  roughnessUnten = 0,
  metalnessUnten = 0,
  envMapIntensityUnten = 1,
  kammergroesseUnten = 0.05,
  wandHoeheHinten,
  aufDachneigung = 0,
  plankenHoehe = 0.15,
  plankenTiefe = 0.02
}) {
  const FT = 0.05;
  const glasD = 0.012;
  const POLY_DECK_DICKE = Math.max(1e-3, glasD * 0.15);
  const POLY_STEG_DICKE = Math.max(8e-4, glasD * 0.1);
  const POLY_INNEN_D = Math.max(0, glasD - 2 * POLY_DECK_DICKE);
  const POLY_KAMMER_OBEN = Math.max(5e-3, kammergroesseOben);
  const POLY_KAMMER_UNTEN = Math.max(5e-3, kammergroesseUnten);
  React.useEffect(() => {
    if (glasMaterialOben) {
      const mat = glasMaterialOben;
      mat.transparent = opacityOben < 1;
      mat.opacity = opacityOben;
      mat.depthWrite = opacityOben >= 1;
      mat.roughness = roughnessOben;
      mat.metalness = metalnessOben;
      mat.envMapIntensity = envMapIntensityOben;
      mat.needsUpdate = true;
    }
  }, [glasMaterialOben, opacityOben, roughnessOben, metalnessOben, envMapIntensityOben]);
  React.useEffect(() => {
    if (glasMaterialUnten) {
      const mat = glasMaterialUnten;
      mat.transparent = opacityUnten < 1;
      mat.opacity = opacityUnten;
      mat.depthWrite = opacityUnten >= 1;
      mat.roughness = roughnessUnten;
      mat.metalness = metalnessUnten;
      mat.envMapIntensity = envMapIntensityUnten;
      mat.needsUpdate = true;
    }
  }, [glasMaterialUnten, opacityUnten, roughnessUnten, metalnessUnten, envMapIntensityUnten]);
  const N = maxScheibenBreite > 0 ? Math.max(1, Math.ceil(wandBreite / maxScheibenBreite)) : 1;
  const divCount = N - 1;
  const innerW = Math.max(0.01, wandBreite - 2 * FT);
  const innerH = Math.max(0.01, wandHoeheVorne - 2 * FT);
  const panelW = Math.max(0.01, (innerW - divCount * FT) / N);
  const xS = -wandBreite / 2;
  const innerXS = xS + FT;
  const isSlanted = (aufDachneigung ?? 0) > 0 && wandHoeheHinten !== void 0;
  const hH = wandHoeheHinten ?? wandHoeheVorne;
  const isTyp2 = mitMittelbalken === 1;
  const maxAvailableY = Math.min(wandHoeheVorne, hH) - 3 * FT;
  const barY = isTyp2 ? FT + Math.max(0, Math.min(mittelbalkenHoehe, maxAvailableY)) : 0;
  const slantedShapes = React.useMemo(() => {
    if (!isSlanted) return null;
    const xE = wandBreite / 2;
    const hV = wandHoeheVorne;
    const topAtX = (x) => hV + (x - xS) / wandBreite * (hH - hV);
    const bottomShape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    bottomShape.moveTo(xS, 0);
    bottomShape.lineTo(xE, 0);
    bottomShape.lineTo(xE, FT);
    bottomShape.lineTo(xS, FT);
    bottomShape.closePath();
    const topShape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    topShape.moveTo(xS, topAtX(xS) - FT);
    topShape.lineTo(xE, topAtX(xE) - FT);
    topShape.lineTo(xE, topAtX(xE));
    topShape.lineTo(xS, topAtX(xS));
    topShape.closePath();
    const leftShape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    leftShape.moveTo(xS, FT);
    leftShape.lineTo(xS + FT, FT);
    leftShape.lineTo(xS + FT, topAtX(xS + FT) - FT);
    leftShape.lineTo(xS, topAtX(xS) - FT);
    leftShape.closePath();
    const rightShape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    rightShape.moveTo(xE - FT, FT);
    rightShape.lineTo(xE, FT);
    rightShape.lineTo(xE, topAtX(xE) - FT);
    rightShape.lineTo(xE - FT, topAtX(xE - FT) - FT);
    rightShape.closePath();
    const topPanelShapes = [];
    const botPanelShapes = [];
    const topPanelClipPlanes = [];
    for (let i = 0; i < N; i++) {
      const pxS = innerXS + i * (panelW + FT);
      const pxE = pxS + panelW;
      const yBotPlank = isTyp2 ? barY + FT : FT;
      const dy = topAtX(pxE) - topAtX(pxS);
      const dx = panelW;
      const hStartRel = topAtX(pxS) - yBotPlank;
      const clipNormal = new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(dy, -dx, 0).normalize();
      topPanelClipPlanes.push([new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(clipNormal, -clipNormal.dot(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, hStartRel, 0)))]);
      if (isTyp2 && barY > FT) {
        const bs = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
        bs.moveTo(pxS, FT);
        bs.lineTo(pxE, FT);
        bs.lineTo(pxE, barY);
        bs.lineTo(pxS, barY);
        bs.closePath();
        botPanelShapes.push(bs);
        const ts = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
        ts.moveTo(pxS, barY + FT);
        ts.lineTo(pxE, barY + FT);
        ts.lineTo(pxE, Math.max(barY + FT, topAtX(pxE) - FT));
        ts.lineTo(pxS, Math.max(barY + FT, topAtX(pxS) - FT));
        ts.closePath();
        topPanelShapes.push(ts);
      } else {
        const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
        s.moveTo(pxS, FT);
        s.lineTo(pxE, FT);
        s.lineTo(pxE, Math.max(FT, topAtX(pxE) - FT));
        s.lineTo(pxS, Math.max(FT, topAtX(pxS) - FT));
        s.closePath();
        topPanelShapes.push(s);
      }
    }
    const barShape = isTyp2 && barY > FT ? (() => {
      const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
      s.moveTo(innerXS, barY);
      s.lineTo(xE - FT, barY);
      s.lineTo(xE - FT, barY + FT);
      s.lineTo(innerXS, barY + FT);
      s.closePath();
      return s;
    })() : null;
    const dividerShapes = [];
    for (let i = 0; i < divCount; i++) {
      const dxS = innerXS + (i + 1) * (panelW + FT) - FT;
      const dxE = dxS + FT;
      const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
      s.moveTo(dxS, FT);
      s.lineTo(dxE, FT);
      s.lineTo(dxE, Math.max(FT, topAtX(dxE) - FT));
      s.lineTo(dxS, Math.max(FT, topAtX(dxS) - FT));
      s.closePath();
      dividerShapes.push(s);
    }
    return {
      bottomShape,
      topShape,
      leftShape,
      rightShape,
      topPanelShapes,
      topPanelClipPlanes,
      botPanelShapes,
      barShape,
      dividerShapes,
      topAtX
    };
  }, [isSlanted, wandBreite, wandHoeheVorne, hH, N, panelW, divCount, isTyp2, barY]);
  const polyFlatStegeXPosOben = React.useMemo(() => {
    if (fuellungTypOben !== 1) return [];
    const pos = [];
    let sx = -panelW / 2 + POLY_KAMMER_OBEN;
    while (sx < panelW / 2 - 3e-3) {
      pos.push(sx);
      sx += POLY_KAMMER_OBEN;
    }
    return pos;
  }, [fuellungTypOben, panelW, POLY_KAMMER_OBEN]);
  const polyFlatStegeXPosUnten = React.useMemo(() => {
    if (fuellungTypUnten !== 1) return [];
    const pos = [];
    let sx = -panelW / 2 + POLY_KAMMER_UNTEN;
    while (sx < panelW / 2 - 3e-3) {
      pos.push(sx);
      sx += POLY_KAMMER_UNTEN;
    }
    return pos;
  }, [fuellungTypUnten, panelW, POLY_KAMMER_UNTEN]);
  const polySlantedStegeDataOben = React.useMemo(() => {
    if (!isSlanted || fuellungTypOben !== 1) return [];
    const xS2 = -wandBreite / 2;
    const topAtX = (x) => wandHoeheVorne + (x - xS2) / wandBreite * (hH - wandHoeheVorne);
    const innerXS2 = xS2 + FT;
    const maxAvailableY2 = Math.min(wandHoeheVorne, hH) - 3 * FT;
    const barY2 = isTyp2 ? FT + Math.max(0, Math.min(mittelbalkenHoehe, maxAvailableY2)) : 0;
    const stegeYBot = isTyp2 ? barY2 + FT : FT;
    return Array.from({ length: N }, (_, i) => {
      const pxS = innerXS2 + i * (panelW + FT);
      const pxE = pxS + panelW;
      const stege = [];
      let sx = pxS + POLY_KAMMER_OBEN;
      while (sx < pxE - 3e-3) {
        const yTop = Math.max(stegeYBot, topAtX(sx) - FT);
        if (yTop > stegeYBot + 0.01) stege.push({ x: sx, yBot: stegeYBot, yTop });
        sx += POLY_KAMMER_OBEN;
      }
      return stege;
    });
  }, [isSlanted, fuellungTypOben, wandBreite, wandHoeheVorne, hH, N, panelW, isTyp2, mittelbalkenHoehe, POLY_KAMMER_OBEN]);
  const polySlantedStegeDataUnten = React.useMemo(() => {
    if (!isSlanted || fuellungTypUnten !== 1 || !isTyp2) return [];
    const maxAvailableY2 = Math.min(wandHoeheVorne, hH) - 3 * FT;
    const barY2 = isTyp2 ? FT + Math.max(0, Math.min(mittelbalkenHoehe, maxAvailableY2)) : 0;
    const innerXS2 = -wandBreite / 2 + FT;
    return Array.from({ length: N }, (_, i) => {
      const pxS = innerXS2 + i * (panelW + FT);
      const pxE = pxS + panelW;
      const stege = [];
      let sx = pxS + POLY_KAMMER_UNTEN;
      while (sx < pxE - 3e-3) {
        stege.push({ x: sx, yBot: FT, yTop: barY2 });
        sx += POLY_KAMMER_UNTEN;
      }
      return stege;
    });
  }, [isSlanted, fuellungTypUnten, wandBreite, wandHoeheVorne, N, panelW, isTyp2, mittelbalkenHoehe, POLY_KAMMER_UNTEN]);
  const yInnerBot = -wandHoeheVorne / 2 + FT;
  const maxAvailableH = Math.min(wandHoeheVorne, hH) - 3 * FT;
  const barH = isTyp2 ? Math.max(0, Math.min(mittelbalkenHoehe, maxAvailableH)) : 0;
  const botGlassH = barH;
  const topGlassH = innerH - barH - (isTyp2 ? FT : 0);
  const barCenterY = yInnerBot + barH + FT / 2;
  const botGlassCenterY = yInnerBot + barH / 2;
  const topGlassCenterY = yInnerBot + barH + (isTyp2 ? FT : 0) + topGlassH / 2;
  if (isSlanted && slantedShapes) {
    const {
      bottomShape,
      topShape,
      leftShape,
      rightShape,
      topPanelShapes,
      topPanelClipPlanes,
      botPanelShapes,
      barShape,
      dividerShapes
    } = slantedShapes;
    const extCfg = { depth: FT, bevelEnabled: false, steps: 1 };
    const glasExtCfg = { depth: glasD, bevelEnabled: false, steps: 1 };
    const glasZ = (FT - glasD) / 2;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, 0, -FT / 2], children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [bottomShape, extCfg] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [topShape, extCfg] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [leftShape, extCfg] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [rightShape, extCfg] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }),
      barShape && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [barShape, extCfg] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }),
      topPanelShapes.map((s, i) => {
        if (fuellungTypOben === 1) {
          const deckCfg = { depth: POLY_DECK_DICKE, bevelEnabled: false, steps: 1 };
          const stege = polySlantedStegeDataOben[i] ?? [];
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
              !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
            ] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ + glasD - POLY_DECK_DICKE], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
              !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
            ] }),
            stege.map((steg, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [steg.x, (steg.yBot + steg.yTop) / 2, glasZ + POLY_DECK_DICKE + POLY_INNEN_D / 2], children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, steg.yTop - steg.yBot, POLY_INNEN_D] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: roughnessOben })
            ] }, si))
          ] }, `top-${i}`);
        }
        if (fuellungTypOben === 2) {
          const pxS = innerXS + i * (panelW + FT);
          const yBot = isTyp2 ? barY + FT : FT;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            PlankenFillingMemo,
            {
              areaWidth: panelW,
              areaHeight: hH,
              plankenHoehe,
              plankenTiefe,
              farbeHex,
              material,
              position: [pxS, yBot, FT / 2],
              clippingPlanes: topPanelClipPlanes[i]
            }
          ) }, `top-${i}`);
        }
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, glasExtCfg] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] }, `top-${i}`);
      }),
      botPanelShapes.map((s, i) => {
        if (fuellungTypUnten === 1) {
          const deckCfg = { depth: POLY_DECK_DICKE, bevelEnabled: false, steps: 1 };
          const stege = polySlantedStegeDataUnten[i] ?? [];
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasZ], castShadow: opacityUnten >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialUnten, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
              !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten })
            ] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasZ + glasD - POLY_DECK_DICKE], castShadow: opacityUnten >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialUnten, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
              !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten })
            ] }),
            stege.map((steg, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [steg.x, (steg.yBot + steg.yTop) / 2, glasZ + POLY_DECK_DICKE + POLY_INNEN_D / 2], children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, steg.yTop - steg.yBot, POLY_INNEN_D] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: roughnessUnten })
            ] }, si))
          ] }, `bot-${i}`);
        }
        if (fuellungTypUnten === 2) {
          const pxS = innerXS + i * (panelW + FT);
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            PlankenFillingMemo,
            {
              areaWidth: panelW,
              areaHeight: barY - FT,
              plankenHoehe,
              plankenTiefe,
              farbeHex,
              material,
              position: [pxS, FT, FT / 2]
            }
          ) }, `bot-${i}`);
        }
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasZ], castShadow: opacityUnten >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialUnten, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, glasExtCfg] }),
          !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] }, `bot-${i}`);
      }),
      dividerShapes.map((s, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, extCfg] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }, i))
    ] });
  }
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        position: [0, wandHoeheVorne / 2 - FT / 2, 0],
        castShadow: true,
        receiveShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wandBreite, FT, FT] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ]
      }
    ),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        position: [0, -wandHoeheVorne / 2 + FT / 2, 0],
        castShadow: true,
        receiveShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wandBreite, FT, FT] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ]
      }
    ),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        position: [-wandBreite / 2 + FT / 2, 0, 0],
        castShadow: true,
        receiveShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FT, wandHoeheVorne, FT] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ]
      }
    ),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [wandBreite / 2 - FT / 2, 0, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FT, wandHoeheVorne, FT] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    isTyp2 && barH > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, barCenterY, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [innerW, FT, FT] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    Array.from({ length: N }, (_, i) => {
      const panelCenterX = -innerW / 2 + i * (panelW + FT) + panelW / 2;
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(React.Fragment, { children: isTyp2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
        botGlassH > 1e-3 && (fuellungTypUnten === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [panelCenterX, botGlassCenterY, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: opacityUnten >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialUnten, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, POLY_DECK_DICKE] }),
            !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: opacityUnten >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialUnten, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, POLY_DECK_DICKE] }),
            !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten })
          ] }),
          polyFlatStegeXPosUnten.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, botGlassH, POLY_INNEN_D] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: roughnessUnten })
          ] }, si))
        ] }) : fuellungTypUnten === 2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          PlankenFillingMemo,
          {
            areaWidth: panelW,
            areaHeight: botGlassH,
            plankenHoehe,
            plankenTiefe,
            material,
            farbeHex,
            position: [panelCenterX - panelW / 2, -wandHoeheVorne / 2 + FT, 0]
          }
        ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [panelCenterX, botGlassCenterY, 0], castShadow: opacityUnten >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialUnten, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, glasD] }),
          !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] })),
        topGlassH > 1e-3 && (fuellungTypOben === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [panelCenterX, topGlassCenterY, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, POLY_DECK_DICKE] }),
            !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, POLY_DECK_DICKE] }),
            !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
          ] }),
          polyFlatStegeXPosOben.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, topGlassH, POLY_INNEN_D] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: roughnessOben })
          ] }, si))
        ] }) : fuellungTypOben === 2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          PlankenFillingMemo,
          {
            areaWidth: panelW,
            areaHeight: topGlassH,
            plankenHoehe,
            plankenTiefe,
            material,
            farbeHex,
            position: [panelCenterX - panelW / 2, isTyp2 ? barY - wandHoeheVorne / 2 + FT : -wandHoeheVorne / 2 + FT, 0]
          }
        ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [panelCenterX, topGlassCenterY, 0], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, glasD] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] }))
      ] }) : fuellungTypOben === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [panelCenterX, 0, 0], children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, innerH, POLY_DECK_DICKE] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, innerH, POLY_DECK_DICKE] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
        ] }),
        polyFlatStegeXPosOben.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, innerH, POLY_INNEN_D] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: roughnessOben })
        ] }, si))
      ] }) : fuellungTypOben === 2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        PlankenFillingMemo,
        {
          areaWidth: panelW,
          areaHeight: innerH,
          plankenHoehe,
          plankenTiefe,
          material,
          farbeHex,
          position: [panelCenterX - panelW / 2, -wandHoeheVorne / 2 + FT, 0]
        }
      ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [panelCenterX, 0, 0], castShadow: opacityOben >= SHADOW_OPACITY_THRESHOLD$1, receiveShadow: true, material: glasMaterialOben, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, innerH, glasD] }),
        !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben, clearcoat: 1, clearcoatRoughness: 0.05 })
      ] }) }, i);
    }),
    Array.from({ length: divCount }, (_, i) => {
      const divCenterX = -innerW / 2 + (i + 1) * (panelW + FT) - FT / 2;
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [divCenterX, 0, 0], castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FT, innerH, FT] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }, i);
    })
  ] });
}
const RahmenwandWandMemo = React.memo(RahmenwandWand);

function renderRahmenwand(rc, props) {
  const {
    effectiveSide,
    wandBreite,
    zoneHoeheVorne,
    zoneHoeheHinten,
    keilReductionAuto,
    ssReduction,
    aufDachneigungVal,
    ctx,
    material,
    materials,
    farbeHex,
    glasFarbeHex
  } = rc;
  const isSide = effectiveSide === 0 || effectiveSide === 1;
  const isRightSide = effectiveSide === 1;
  const frameThickness = 0.05;
  const isSlantedWand = aufDachneigungVal > 0 && isSide && keilReductionAuto <= 0;
  const rwHoehe = zoneHoeheVorne - keilReductionAuto - ssReduction;
  const rwY = isSlantedWand ? ssReduction : rwHoehe / 2 + ssReduction;
  const sHoeheVorne = (isRightSide ? zoneHoeheHinten : zoneHoeheVorne) - keilReductionAuto - ssReduction;
  const sHoeheHinten = (isRightSide ? zoneHoeheVorne : zoneHoeheHinten) - keilReductionAuto - ssReduction;
  const rwZ = isSide ? (ctx.pfostenBreite - frameThickness) / 2 : -(ctx.pfostenTiefe - frameThickness) / 2;
  const glasMaterialOben = materials.glasOben;
  const glasMaterialUnten = materials.glasUnten;
  return [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, rwY, rwZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      RahmenwandWandMemo,
      {
        wandBreite,
        wandHoeheVorne: isSlantedWand ? sHoeheVorne : rwHoehe,
        mitMittelbalken: Number(exprVal(props.mitMittelbalken) ?? 0),
        mittelbalkenHoehe: Number(exprVal(props.mittelbalkenHoehe) ?? 0.5),
        maxScheibenBreite: Number(exprVal(props.maxScheibenBreite) ?? 0),
        fuellungTypOben: Number(exprVal(props.fuellungTypOben) ?? exprVal(props.glasTypOben) ?? 0),
        fuellungTypUnten: Number(exprVal(props.fuellungTypUnten) ?? exprVal(props.glasTypUnten) ?? 0),
        material,
        glasMaterialOben,
        glasMaterialUnten,
        farbeHex,
        glasFarbeHex,
        opacityOben: Number(exprVal(props.opacityOben) ?? 0.2),
        roughnessOben: Number(exprVal(props.roughnessOben) ?? 0),
        metalnessOben: Number(exprVal(props.metalnessOben) ?? 0),
        envMapIntensityOben: Number(exprVal(props.envMapIntensityOben) ?? 1),
        kammergroesseOben: Number(exprVal(props.kammergroesseOben) || 0.05),
        opacityUnten: Number(exprVal(props.opacityUnten) ?? 0.2),
        roughnessUnten: Number(exprVal(props.roughnessUnten) ?? 0),
        metalnessUnten: Number(exprVal(props.metalnessUnten) ?? 0),
        envMapIntensityUnten: Number(exprVal(props.envMapIntensityUnten) ?? 1),
        kammergroesseUnten: Number(exprVal(props.kammergroesseUnten) || 0.05),
        wandHoeheHinten: isSlantedWand ? sHoeheHinten : void 0,
        aufDachneigung: isSlantedWand ? 1 : 0,
        plankenHoehe: Number(exprVal(props.plankenHoehe) ?? 0.15),
        plankenTiefe: Number(exprVal(props.plankenTiefe) ?? 0.02)
      }
    ) }),
    null
  ];
}

const GRIFF_LOCH_RADIUS = 0.02;
const SHADOW_OPACITY_THRESHOLD = 0.5;
function useGlasShapeWithHoles(w, h, holes) {
  return React.useMemo(() => {
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(-w / 2, -h / 2);
    s.lineTo(w / 2, -h / 2);
    s.lineTo(w / 2, h / 2);
    s.lineTo(-w / 2, h / 2);
    s.closePath();
    for (const hole of holes) {
      const holePath = new veranda_mf_2_plugin__loadShare__three__loadShare__.Path();
      holePath.absarc(hole.x, hole.y, GRIFF_LOCH_RADIUS, 0, Math.PI * 2, false);
      s.holes.push(holePath);
    }
    return s;
  }, [w, h, holes]);
}
function MuschelEinsatz({ position, glasDicke }) {
  const shape = React.useMemo(() => {
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.absarc(0, 0, GRIFF_LOCH_RADIUS, 0, Math.PI * 2, false);
    const inner = new veranda_mf_2_plugin__loadShare__three__loadShare__.Path();
    inner.absarc(0, 0, GRIFF_LOCH_RADIUS - 5e-3, 0, Math.PI * 2, true);
    s.holes.push(inner);
    return s;
  }, []);
  const extCfg = React.useMemo(() => ({
    depth: glasDicke,
    bevelEnabled: false,
    steps: 1
  }), [glasDicke]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position, castShadow: true, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [shape, extCfg] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "#d0d0d0", metalness: 0.9, roughness: 0.2, anisotropy: 0.8 })
  ] });
}
function StahlGriffMitSchloss({ position, rotation = [0, 0, 0], hoehe = 0.25 }) {
  const HANDLE_RADIUS = 0.015;
  const HANDLE_OFFSET_Z = 0.035;
  const LOCK_HOUSING_H = 0.04;
  const LOCK_HOUSING_W = 0.025;
  const LOCK_HOUSING_D = 0.01;
  const KEYHOLE_RADIUS = 7e-3;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position, rotation, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -0.02, LOCK_HOUSING_D / 2], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [LOCK_HOUSING_W, LOCK_HOUSING_H, LOCK_HOUSING_D] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "#cccccc", metalness: 0.7, roughness: 0.5, anisotropy: 0.8 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, HANDLE_OFFSET_Z], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS, HANDLE_RADIUS, hoehe, 32] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3, anisotropy: 0.8 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -0.02, LOCK_HOUSING_D + 1e-3], rotation: [Math.PI / 2, 0, 0], children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [KEYHOLE_RADIUS, KEYHOLE_RADIUS, 2e-3, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "black", metalness: 0.1, roughness: 0.8 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, hoehe / 2 - 0.05, HANDLE_OFFSET_Z / 2], rotation: [Math.PI / 2, 0, 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS * 0.8, HANDLE_RADIUS * 0.8, HANDLE_OFFSET_Z, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3, anisotropy: 0.8 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -hoehe / 2 + 0.05, HANDLE_OFFSET_Z / 2], rotation: [Math.PI / 2, 0, 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS * 0.8, HANDLE_RADIUS * 0.8, HANDLE_OFFSET_Z, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3, anisotropy: 0.8 })
    ] })
  ] });
}
function SchiebetuerGriff({ griffSeite, mountingDepth, xPos, yPos }) {
  const renderHandle = (side) => {
    const zOffset = side === "aussen" ? mountingDepth / 2 : -mountingDepth / 2;
    const rotY = side === "aussen" ? 0 : Math.PI;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(StahlGriffMitSchloss, { position: [xPos, yPos, zOffset], rotation: [0, rotY, 0], hoehe: 0.25 });
  };
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    (griffSeite === 0 || griffSeite === 2) && renderHandle("innen"),
    (griffSeite === 1 || griffSeite === 2) && renderHandle("aussen")
  ] });
}
function GlasPanel({
  glasW,
  glasH,
  glasD,
  innerH,
  showHandle,
  griffTyp,
  griffXRelGlas,
  griffYRelGlas,
  glasMaterial,
  glasFarbeHex,
  effectiveOpacity,
  roughness = 0,
  metalness = 0,
  envMapIntensity = 1
}) {
  const needsHole = showHandle && (griffTyp === 0 || griffTyp === 1);
  const holes = React.useMemo(() => needsHole ? [{ x: griffXRelGlas, y: griffYRelGlas }] : [], [needsHole, griffXRelGlas, griffYRelGlas]);
  const glasShape = useGlasShapeWithHoles(glasW, glasH, holes);
  const extCfg = React.useMemo(() => ({ depth: glasD, bevelEnabled: false, steps: 1 }), [glasD]);
  if (needsHole) {
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, innerH / 2, -glasD / 2], castShadow: effectiveOpacity >= SHADOW_OPACITY_THRESHOLD, receiveShadow: true, material: glasMaterial, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [glasShape, extCfg] }),
      !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: effectiveOpacity, roughness, metalness, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity, side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, depthWrite: false })
    ] });
  }
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, innerH / 2, 0], castShadow: effectiveOpacity >= SHADOW_OPACITY_THRESHOLD, receiveShadow: true, material: glasMaterial, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [glasW, glasH, glasD] }),
    !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: effectiveOpacity, roughness, metalness, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity, side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, depthWrite: false })
  ] });
}
function SchiebetuerWand({
  wandBreite,
  wandHoeheVorne,
  mitRahmen,
  tuertypPanels,
  maxPanelBreite,
  festeElemente,
  oeffnung,
  laufrichtung,
  schienenSeite,
  buersten,
  griffTyp,
  griffAnordnung,
  griffPosition,
  griffSeite,
  griffHoehe,
  fuellungTyp,
  glasDicke,
  rahmenBreite,
  material,
  farbeHex,
  glasMaterial,
  glasFarbeHex,
  opacity,
  roughness = 0,
  metalness = 0,
  envMapIntensity = 1,
  kammergroesse = 0.05,
  plankenHoehe = 0.15,
  plankenTiefe = 0.02,
  zShiftDir = 1
}) {
  const glasD = Math.max(4e-3, glasDicke);
  const FW = rahmenBreite;
  const FD = glasD + 5e-3;
  const hasFrame = mitRahmen === 1;
  const effectiveOpacity = opacity;
  React.useEffect(() => {
    if (!glasMaterial) return;
    const mat = glasMaterial;
    mat.transparent = true;
    mat.opacity = effectiveOpacity;
    mat.depthWrite = false;
    mat.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
    if (fuellungTyp === 1) {
      mat.roughness = roughness;
      mat.metalness = metalness;
      mat.envMapIntensity = envMapIntensity;
      mat.clearcoat = 0.4;
      mat.clearcoatRoughness = 0.1;
    } else {
      mat.roughness = roughness;
      mat.metalness = metalness;
      mat.envMapIntensity = envMapIntensity;
      mat.clearcoat = 1;
      mat.clearcoatRoughness = 0.05;
    }
    mat.needsUpdate = true;
  }, [glasMaterial, effectiveOpacity, fuellungTyp, roughness, metalness, envMapIntensity]);
  React.useLayoutEffect(() => {
    if (!material) return;
    material.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
    material.needsUpdate = true;
  }, [material]);
  const OVERLAP = 0.02;
  const innerBreite = wandBreite - 2 * FW;
  const minPanels = 2;
  const autoCount = maxPanelBreite > 0 ? Math.max(minPanels, Math.ceil(innerBreite / maxPanelBreite)) : minPanels;
  const panelCount = tuertypPanels > 0 ? Math.max(minPanels, tuertypPanels) : autoCount;
  const fixedCount = Math.max(0, Math.min(festeElemente, panelCount - 1));
  const allSliding = fixedCount === 0;
  const panelWidth = hasFrame && fixedCount > 0 ? innerBreite / panelCount : innerBreite / panelCount + (panelCount - 1) * OVERLAP / panelCount;
  const innerH = wandHoeheVorne - FW;
  const GLAS_LOG_H = 0.05;
  const glasBotY = GLAS_LOG_H;
  const glasTopY = innerH - GLAS_LOG_H;
  const glasH = glasTopY - glasBotY;
  const glasYOffset = 0;
  const trackSpacing = FD + 5e-3;
  const slideRight = laufrichtung === 0;
  const fixedIndices = [];
  if (slideRight) {
    for (let i = 0; i < fixedCount; i++) fixedIndices.push(i);
  } else {
    for (let i = 0; i < fixedCount; i++) fixedIndices.push(panelCount - 1 - i);
  }
  const slidingIndices = [];
  for (let i = 0; i < panelCount; i++) {
    if (!fixedIndices.includes(i)) slidingIndices.push(i);
  }
  const calcTrackZ = (index) => {
    if (allSliding) {
      const sortedByOpening2 = slideRight ? [...slidingIndices].sort((a, b) => calcPanelX(a) - calcPanelX(b)) : [...slidingIndices].sort((a, b) => calcPanelX(b) - calcPanelX(a));
      const stackIdx2 = sortedByOpening2.indexOf(index);
      const centeredIdx = stackIdx2 - (panelCount - 1) / 2;
      const sideSign = schienenSeite === 1 ? -1 : 1;
      return sideSign * (-centeredIdx * trackSpacing);
    }
    const slidingZ = schienenSeite === 1 ? -FD / 2 : FD / 2;
    const fixedZ = schienenSeite === 1 ? FD / 2 : -FD / 2;
    if (fixedIndices.includes(index)) return fixedZ;
    const sortedByOpening = slideRight ? [...slidingIndices].sort((a, b) => calcPanelX(a) - calcPanelX(b)) : [...slidingIndices].sort((a, b) => calcPanelX(b) - calcPanelX(a));
    const stackIdx = sortedByOpening.indexOf(index);
    return slidingZ + stackIdx * trackSpacing;
  };
  const maxGroupSize = slidingIndices.length;
  const totalTrackDepth = allSliding ? trackSpacing * panelCount + FD : FD * 2 + (maxGroupSize - 1) * trackSpacing;
  const calcPanelX = (i) => {
    if (hasFrame && fixedCount > 0) return innerBreite / 2 - panelWidth / 2 - i * panelWidth;
    const step = panelWidth - OVERLAP;
    return -innerBreite / 2 + panelWidth / 2 + i * step;
  };
  const openFactor = Math.max(0, Math.min(1, oeffnung));
  const calcOpenOffset = (index, isSliding) => {
    if (!isSliding || openFactor === 0) return 0;
    const closedX = calcPanelX(index);
    const slidingIdx = slidingIndices.indexOf(index);
    if (slidingIdx < 0) return 0;
    const stackTarget = slideRight ? innerBreite / 2 - panelWidth / 2 : -innerBreite / 2 + panelWidth / 2;
    const stackOffset = slidingIdx * OVERLAP;
    const targetX = slideRight ? stackTarget - slidingIdx * stackOffset : stackTarget + slidingIdx * stackOffset;
    return (targetX - closedX) * openFactor;
  };
  const renderPanel = (index, zTrack, isSliding) => {
    const xPos = calcPanelX(index) + calcOpenOffset(index, isSliding);
    const isLeftEdge = hasFrame ? index === panelCount - 1 : index === 0;
    const isRightEdge = hasFrame ? index === 0 : index === panelCount - 1;
    const glasW = hasFrame ? panelWidth - FW * 2 + (!isLeftEdge ? 0.018 : 0) + (!isRightEdge ? 0.018 : 0) : panelWidth + (!isLeftEdge ? 0.015 : 0) + (!isRightEdge ? 0.015 : 0);
    const gurtW = panelWidth + (!isLeftEdge ? 0.018 : 0) + (!isRightEdge ? 0.018 : 0);
    const sortedByX = [...slidingIndices].sort((a, b) => calcPanelX(a) - calcPanelX(b));
    let leadingIndices = [];
    let trailingIndices = [];
    const leftmostIdx = sortedByX[0];
    const rightmostIdx = sortedByX[sortedByX.length - 1];
    if (slideRight) {
      leadingIndices = [leftmostIdx];
      trailingIndices = [rightmostIdx];
    } else {
      leadingIndices = [rightmostIdx];
      trailingIndices = [leftmostIdx];
    }
    const isLeading = isSliding && leadingIndices.includes(index);
    const isTrailing = isSliding && trailingIndices.includes(index);
    const showHandle = isSliding && griffTyp !== 3 && (griffAnordnung === 0 && isLeading || griffAnordnung === 1 && (isLeading || isTrailing) || griffAnordnung === 2);
    const clampedGriffH = Math.min(griffHoehe, innerH - 0.3);
    const griffYRelGlas = clampedGriffH - rahmenBreite - innerH / 2;
    const griffRandAbstand = GRIFF_LOCH_RADIUS + 0.015;
    const griffXDir_base = slideRight ? -1 : 1;
    let griffXDir = griffXDir_base;
    if (griffAnordnung === 1 && isTrailing && !isLeading) {
      griffXDir *= -1;
    }
    const griffEdge = panelWidth / 2 - griffRandAbstand - (allSliding ? OVERLAP : 0);
    const griffXInPanel = hasFrame ? griffXDir * (panelWidth / 2 - FW / 2) : griffPosition === 1 ? -griffXDir * griffEdge : griffXDir * griffEdge;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [xPos, FW, zTrack], children: [
      hasFrame && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
        [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [side * (panelWidth / 2 - FW / 2 + 9e-3), innerH / 2, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FW, glasH, FD] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] }, `vert-${side}`)),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, innerH - GLAS_LOG_H / 2, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gurtW, GLAS_LOG_H, FD] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, GLAS_LOG_H / 2, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gurtW, GLAS_LOG_H, FD] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] })
      ] }),
      !hasFrame && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, innerH - GLAS_LOG_H / 2, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gurtW, GLAS_LOG_H, FD] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, GLAS_LOG_H / 2, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gurtW, GLAS_LOG_H, FD] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] })
      ] }),
      fuellungTyp === 1 ? (() => {
        const DECK_DICKE = Math.max(1e-3, glasD * 0.15);
        const STEG_DICKE = Math.max(8e-4, glasD * 0.1);
        const innenD = Math.max(0, glasD - 2 * DECK_DICKE);
        const kammerGroesse = Math.max(5e-3, kammergroesse);
        const stege = [];
        let sx = -glasW / 2 + kammerGroesse;
        while (sx < glasW / 2 - 3e-3) {
          stege.push(sx);
          sx += kammerGroesse;
        }
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, innerH / 2 + glasYOffset, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, -glasD / 2 + DECK_DICKE / 2], castShadow: effectiveOpacity >= SHADOW_OPACITY_THRESHOLD, receiveShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [glasW, glasH, DECK_DICKE] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: effectiveOpacity, roughness, metalness, clearcoat: 0.4, clearcoatRoughness: 0.1, envMapIntensity, side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, depthWrite: false })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, glasD / 2 - DECK_DICKE / 2], castShadow: effectiveOpacity >= SHADOW_OPACITY_THRESHOLD, receiveShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [glasW, glasH, DECK_DICKE] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: effectiveOpacity, roughness, metalness, clearcoat: 0.4, clearcoatRoughness: 0.1, envMapIntensity, side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, depthWrite: false })
          ] }),
          stege.map((stegX, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [stegX, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, glasH, innenD] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness, metalness, envMapIntensity })
          ] }, si))
        ] });
      })() : fuellungTyp === 2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        PlankenFillingMemo,
        {
          areaWidth: glasW,
          areaHeight: glasH,
          plankenHoehe,
          plankenTiefe,
          material,
          farbeHex,
          position: [-glasW / 2, GLAS_LOG_H, 0]
        }
      ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, glasYOffset, 0], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        GlasPanel,
        {
          glasW,
          glasH,
          glasD,
          innerH,
          showHandle,
          griffTyp,
          griffXRelGlas: griffXInPanel,
          griffYRelGlas,
          glasMaterial,
          glasFarbeHex,
          effectiveOpacity,
          roughness,
          metalness,
          envMapIntensity
        }
      ) }),
      showHandle && griffTyp === 1 && fuellungTyp === 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MuschelEinsatz, { position: [griffXInPanel, innerH / 2 + griffYRelGlas + glasYOffset, -glasD / 2], glasDicke: glasD }),
      buersten === 1 && index < panelCount - 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [panelWidth / 2, innerH / 2, -trackSpacing / 2], children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [3e-3, innerH - GLAS_LOG_H * 2, trackSpacing] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#333333", roughness: 1 })
      ] }),
      showHandle && griffTyp === 2 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SchiebetuerGriff, { griffSeite, mountingDepth: hasFrame ? FD : glasD, xPos: griffXInPanel, yPos: clampedGriffH - FW })
    ] }, `panel-${index}`);
  };
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, 0, zShiftDir * (-totalTrackDepth / 2)], children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, FW / 2, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wandBreite, FW, totalTrackDepth] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, wandHoeheVorne - FW / 2, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wandBreite, FW, totalTrackDepth] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [-wandBreite / 2 + FW / 2, wandHoeheVorne / 2, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FW, wandHoeheVorne - FW, totalTrackDepth] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [wandBreite / 2 - FW / 2, wandHoeheVorne / 2, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FW, wandHoeheVorne - FW, totalTrackDepth] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    allSliding ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, FW + 4e-3, 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [innerBreite, 835e-5, totalTrackDepth] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "silver", metalness: 0.9, roughness: 0.2, anisotropy: 0.8 })
    ] }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, FW + 4e-3, FD / 2], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [innerBreite, 835e-5, FD] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "silver", metalness: 0.9, roughness: 0.2, anisotropy: 0.8 })
    ] }),
    Array.from({ length: panelCount }, (_, i) => renderPanel(i, calcTrackZ(i), !fixedIndices.includes(i)))
  ] });
}
const SchiebetuerWandMemo = React.memo(SchiebetuerWand);

function renderSchiebetuer(rc, props) {
  const {
    isSideWall,
    wandBreite,
    zoneHoeheVorne,
    keilReductionAuto,
    ssReduction,
    ctx,
    material,
    glasMaterial,
    farbeHex,
    glasFarbeHex
  } = rc;
  const spGlasDicke = Number(exprVal(props.glasDicke) ?? 8e-3);
  const stHoehe = zoneHoeheVorne - keilReductionAuto - ssReduction;
  const stZ = isSideWall ? ctx.pfostenBreite / 2 : -ctx.pfostenTiefe / 2;
  return [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, ssReduction, stZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SchiebetuerWandMemo,
      {
        wandBreite,
        wandHoeheVorne: stHoehe,
        mitRahmen: Number(exprVal(props.mitRahmen) ?? 0),
        tuertypPanels: Number(exprVal(props.tuertypPanels) ?? 0),
        maxPanelBreite: Number(exprVal(props.maxPanelBreite) ?? 0.8),
        festeElemente: Number(exprVal(props.festeElemente) ?? 0),
        oeffnung: Number(exprVal(props.oeffnung) ?? 0),
        laufrichtung: Number(exprVal(props.laufrichtung) ?? 0),
        schienenSeite: Number(exprVal(props.schienenSeite) ?? 0),
        buersten: Number(exprVal(props.buersten) ?? 1),
        griffTyp: Number(exprVal(props.griffTyp) ?? 0),
        griffAnordnung: Number(exprVal(props.griffAnordnung) ?? 0),
        griffPosition: Number(exprVal(props.griffPosition) ?? 0),
        griffSeite: Number(exprVal(props.griffSeite) ?? 2),
        griffHoehe: Number(exprVal(props.griffHoehe) ?? 1),
        fuellungTyp: Number(exprVal(props.fuellungTyp) ?? exprVal(props.glasTyp) ?? 0),
        glasDicke: spGlasDicke,
        rahmenBreite: Number(exprVal(props.rahmenBreite) ?? 0.04),
        material,
        glasMaterial,
        farbeHex,
        glasFarbeHex,
        opacity: Number(exprVal(props.opacity) ?? 0.2),
        roughness: Number(exprVal(props.roughness) ?? 0),
        metalness: Number(exprVal(props.metalness) ?? 0),
        envMapIntensity: Number(exprVal(props.envMapIntensity) ?? 1),
        kammergroesse: Number(exprVal(props.kammergroesse) || 0.05),
        zShiftDir: isSideWall ? 1 : -1,
        plankenHoehe: Number(exprVal(props.plankenHoehe) ?? 0.15),
        plankenTiefe: Number(exprVal(props.plankenTiefe) ?? 0.02)
      }
    ) }),
    null
  ];
}

function ShuttersWand({
  wandBreite,
  wandHoeheVorne,
  lamellenHoehe,
  lamellenFarbeHex,
  schiebend = 0,
  anzahlRahmen = 1,
  oeffnungSchiebe = 0,
  oeffnungLamellen = 0,
  rahmenBreite = 0.04,
  rahmenTiefe = 0.04,
  zShiftDir = 1,
  material,
  farbeHex = "#808080"
}) {
  const nFrames = Math.max(1, Math.round(anzahlRahmen));
  const isSliding = schiebend === 1 && nFrames > 1;
  const OVERLAP = 0.02;
  const staticGap = 0;
  const frameW = isSliding ? wandBreite / nFrames + (nFrames - 1) * OVERLAP / nFrames : nFrames > 1 ? (wandBreite - staticGap * (nFrames - 1)) / nFrames : wandBreite;
  const trackSpacing = rahmenTiefe + 0.01;
  const totalTrackDepth = isSliding ? trackSpacing * nFrames : rahmenTiefe;
  const innerW = Math.max(0.01, frameW - 2 * rahmenBreite);
  const innerH = Math.max(0.01, wandHoeheVorne - 2 * rahmenBreite);
  const effLamellenHoehe = Math.max(0.02, lamellenHoehe);
  const lamCount = Math.max(1, Math.ceil(innerH / effLamellenHoehe));
  const spacingY = innerH / lamCount;
  const lamH = spacingY * 1.05;
  const lamD = 8e-3;
  const lamRotX = oeffnungLamellen * (Math.PI / 2);
  const calcClosedX = (fi) => {
    if (isSliding) {
      const step = frameW - OVERLAP;
      return -wandBreite / 2 + frameW / 2 + fi * step;
    } else {
      const step = frameW + staticGap;
      return -wandBreite / 2 + frameW / 2 + fi * step;
    }
  };
  const stackTargetX = wandBreite / 2 - frameW / 2;
  const calcOpenOffset = (index) => {
    if (!isSliding || oeffnungSchiebe === 0) return 0;
    const closedX = calcClosedX(index);
    const stackX = stackTargetX - index * OVERLAP;
    return (stackX - closedX) * oeffnungSchiebe;
  };
  const calcTrackZ = (index) => {
    if (!isSliding) return 0;
    return (index - (nFrames - 1) / 2) * trackSpacing;
  };
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, 0, zShiftDir * (-totalTrackDepth / 2)], children: [
    isSliding && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, wandHoeheVorne - rahmenBreite / 2, 0], castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wandBreite, rahmenBreite, totalTrackDepth] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, rahmenBreite / 2, 0], castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wandBreite, rahmenBreite, totalTrackDepth] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [-wandBreite / 2 + rahmenBreite / 2, wandHoeheVorne / 2, 0], castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [rahmenBreite, wandHoeheVorne, totalTrackDepth] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [wandBreite / 2 - rahmenBreite / 2, wandHoeheVorne / 2, 0], castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [rahmenBreite, wandHoeheVorne, totalTrackDepth] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
      ] })
    ] }),
    Array.from({ length: nFrames }, (_, fi) => {
      const xPos = calcClosedX(fi) + calcOpenOffset(fi);
      const zPos = calcTrackZ(fi);
      const frameHeight = isSliding ? wandHoeheVorne - 2 * rahmenBreite : wandHoeheVorne;
      const frameY = isSliding ? wandHoeheVorne / 2 : wandHoeheVorne / 2;
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [xPos, frameY, zPos], children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, frameHeight / 2 - rahmenBreite / 2, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [frameW, rahmenBreite, rahmenTiefe] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -frameHeight / 2 + rahmenBreite / 2, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [frameW, rahmenBreite, rahmenTiefe] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [-frameW / 2 + rahmenBreite / 2, 0, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [rahmenBreite, frameHeight - 2 * rahmenBreite, rahmenTiefe] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [frameW / 2 - rahmenBreite / 2, 0, 0], castShadow: true, receiveShadow: true, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [rahmenBreite, frameHeight - 2 * rahmenBreite, rahmenTiefe] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, -frameHeight / 2 + rahmenBreite, 0], children: Array.from({ length: lamCount }, (_2, li) => {
          const lamY = li * spacingY + spacingY / 2;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [0, lamY, 0],
              rotation: [lamRotX, 0, 0],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [innerW - 5e-3, lamH, lamD] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: lamellenFarbeHex })
              ]
            },
            li
          );
        }) })
      ] }, fi);
    })
  ] });
}
const ShuttersWandMemo = veranda_mf_2_plugin__loadShare__react__loadShare__.memo(ShuttersWand);

function renderShutters(rc, props) {
  const {
    isSideWall,
    wandBreite,
    zoneHoeheVorne,
    keilReductionAuto,
    ssReduction,
    ctx,
    material,
    farbeHex
  } = rc;
  const lamH = Number(exprVal(props.lamellenHoehe) ?? 0.08);
  const isSchiebend = Number(exprVal(props.schiebend) ?? 0) === 1;
  const rTiefe = Number(exprVal(props.rahmenTiefe) ?? 0.04);
  const anzahlFrames = Math.max(1, Math.round(Number(exprVal(props.anzahlRahmen) ?? 1)));
  const shutHoehe = zoneHoeheVorne - keilReductionAuto - ssReduction;
  const shutZ = isSideWall ? ctx.pfostenBreite / 2 : -ctx.pfostenTiefe / 2;
  return [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, ssReduction, shutZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      ShuttersWandMemo,
      {
        wandBreite,
        wandHoeheVorne: shutHoehe,
        lamellenHoehe: lamH,
        lamellenFarbeHex: "#808080",
        schiebend: isSchiebend ? 1 : 0,
        anzahlRahmen: anzahlFrames,
        oeffnungSchiebe: Number(exprVal(props.oeffnungSchiebe) ?? 0),
        oeffnungLamellen: Number(exprVal(props.oeffnungLamellen) ?? 0),
        rahmenBreite: Number(exprVal(props.rahmenBreite) ?? 0.04),
        rahmenTiefe: rTiefe,
        zShiftDir: isSideWall ? 1 : -1,
        material,
        farbeHex
      }
    ) }),
    null
  ];
}

function SichtschutzwandPlanken({
  wandBreite,
  wandHoehe,
  wandHoeheHinten,
  plankenHoehe,
  plankenTiefe,
  material,
  farbeHex,
  topBeamHeight = 0.06,
  hasTopBeam = true
}) {
  const meshRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const groupRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const [worldPlanes, setWorldPlanes] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(void 0);
  const RahmenBreite = 0.04;
  const isSlant = wandHoeheHinten !== void 0 && Math.abs(wandHoeheHinten - wandHoehe) > 1e-3;
  const hoeheR = isSlant ? wandHoeheHinten : wandHoehe;
  const plankLength = Math.max(0.01, wandBreite - RahmenBreite * 2);
  const plankTopL = wandHoehe - (hasTopBeam ? topBeamHeight : 0);
  const plankTopR = hoeheR - (hasTopBeam ? topBeamHeight : 0);
  const plankenAreaHeight = isSlant ? Math.max(plankTopL, plankTopR) : Math.max(0, plankTopL);
  const nD = Math.min(5e-3, plankenHoehe / 4);
  const effektivePlankenHoehe = plankenHoehe - nD;
  const N = Math.max(1, Math.ceil(plankenAreaHeight / effektivePlankenHoehe) + (isSlant ? 3 : 0));
  const dummy = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D(), []);
  const plankShape = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    const w = plankenHoehe;
    const t = plankenTiefe;
    const nW = t / 3;
    const f = 15e-4;
    shape.moveTo(-t / 2, f);
    shape.lineTo(-t / 2 + f, 0);
    shape.lineTo(-nW / 2, 0);
    shape.lineTo(-nW / 2, nD);
    shape.lineTo(nW / 2, nD);
    shape.lineTo(nW / 2, 0);
    shape.lineTo(t / 2 - f, 0);
    shape.lineTo(t / 2, f);
    shape.lineTo(t / 2, w - nD - f);
    shape.lineTo(t / 2 - f, w - nD);
    shape.lineTo(nW / 2, w - nD);
    shape.lineTo(nW / 2, w);
    shape.lineTo(-nW / 2, w);
    shape.lineTo(-nW / 2, w - nD);
    shape.lineTo(-t / 2 + f, w - nD);
    shape.lineTo(-t / 2, w - nD - f);
    shape.lineTo(-t / 2, f);
    return shape;
  }, [plankenHoehe, plankenTiefe, nD]);
  const extSettings = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => ({
    depth: plankLength,
    bevelEnabled: false
  }), [plankLength]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (!isSlant || !groupRef.current) {
      if (worldPlanes !== void 0) setWorldPlanes(void 0);
      return;
    }
    const update = () => {
      if (!groupRef.current) return;
      groupRef.current.updateWorldMatrix(true, false);
      const wm = groupRef.current.matrixWorld;
      const Δh = plankTopR - plankTopL;
      const rawNormal = new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(Δh / wandBreite, -1, 0).normalize();
      const localPlane = new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane().setFromNormalAndCoplanarPoint(
        rawNormal,
        new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(-wandBreite / 2, plankTopL, 0)
      );
      const worldPlane = localPlane.clone().applyMatrix4(wm);
      worldPlane.normal.normalize();
      setWorldPlanes([worldPlane]);
    };
    update();
    const t1 = setTimeout(update, 50);
    const t2 = setTimeout(update, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isSlant, plankTopL, plankTopR, plankLength]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < N; i++) {
        let currentPlankHeight = plankenHoehe;
        const yPos = i * effektivePlankenHoehe;
        if (!isSlant && i === N - 1) {
          const extra = yPos + plankenHoehe - plankenAreaHeight;
          if (extra > 0) currentPlankHeight = Math.max(1e-3, plankenHoehe - extra);
        }
        dummy.position.set(plankLength / 2, yPos, 0);
        dummy.rotation.set(0, -Math.PI / 2, 0);
        dummy.scale.set(1, currentPlankHeight / plankenHoehe, 1);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [N, plankenAreaHeight, plankenHoehe, effektivePlankenHoehe, dummy, plankLength, isSlant]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { ref: groupRef, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "instancedMesh",
    {
      ref: meshRef,
      args: [void 0, void 0, N],
      castShadow: true,
      receiveShadow: true,
      onBeforeRender: (gl) => {
        if (isSlant) gl.localClippingEnabled = true;
      },
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [plankShape, extSettings] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          MaterialFallback,
          {
            material,
            fallbackColor: farbeHex,
            clippingPlanes: isSlant ? worldPlanes : void 0,
            surface: "alu",
            surfaceAxis: [1, 0, 0]
          }
        )
      ]
    }
  ) });
}
const SichtschutzwandPlankenMemo = veranda_mf_2_plugin__loadShare__react__loadShare__.memo(SichtschutzwandPlanken);

const SICHTSCHUTZWAND_FUELLUNG_SLOT_ID = "35abe01f-0247-4eb2-ae2a-d62104227bd4";

function renderAufbauInstance(inst, key, wandBreite, wandHoehe) {
  const Comp = inst.component;
  if (!Comp) return null;
  const {
    posX,
    posY,
    posZ,
    rotX,
    rotY,
    rotZ,
    position,
    rotation,
    scale,
    materials,
    slots,
    // SDK-Props nicht in den Remount-Key
    parentGeometry: _pg,
    slotAnchor: _sa,
    autoAnchor: _aa,
    ...otherProps
  } = inst.props ?? {};
  const propsKey = JSON.stringify(otherProps);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    Comp,
    {
      ...otherProps,
      id: inst.model?.id,
      modelAction: inst.modelAction,
      slots: inst.slots,
      wandBreite,
      aufbauBasis: wandHoehe
    },
    `${key}|${propsKey}`
  );
}
function SichtschutzwandWand({
  wandBreite,
  wandHoehe,
  wandHoeheHinten,
  plankenHoehe,
  plankenTiefe,
  querbalken = 1,
  material,
  farbeHex,
  slots
}) {
  const isSlant = wandHoeheHinten !== void 0 && Math.abs(wandHoeheHinten - wandHoehe) > 1e-3;
  const hoeheR = isSlant ? wandHoeheHinten : wandHoehe;
  const RahmenBreite = 0.04;
  const topBeamHeight = 0.06;
  const beamDepth = Math.max(RahmenBreite, (plankenTiefe ?? 0.02) + 0.02);
  const hasTopBeam = querbalken === 1;
  const topBeamShapeSlant = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!isSlant || !hasTopBeam) return null;
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    const x0 = -wandBreite / 2;
    const x1 = wandBreite / 2;
    s.moveTo(x0, wandHoehe - topBeamHeight);
    s.lineTo(x1, hoeheR - topBeamHeight);
    s.lineTo(x1, hoeheR);
    s.lineTo(x0, wandHoehe);
    s.closePath();
    return s;
  }, [isSlant, hasTopBeam, wandBreite, wandHoehe, hoeheR, topBeamHeight]);
  const topBeamExtrudeSettings = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => ({ depth: beamDepth, bevelEnabled: false }),
    [beamDepth]
  );
  const fuellungInstance = slots?.[SICHTSCHUTZWAND_FUELLUNG_SLOT_ID]?.[0];
  const FuellungComponent = fuellungInstance?.component;
  const aufbauSlotIds = new Set(Object.values(SICHTSCHUTZWAND_AUFBAU_SLOTS).map((s) => s.id));
  const aufbauInstances = Object.entries(slots ?? {}).filter(([k]) => aufbauSlotIds.has(k)).flatMap(([, v]) => v);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [-wandBreite / 2 + RahmenBreite / 2, wandHoehe / 2, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [RahmenBreite, wandHoehe, RahmenBreite] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [wandBreite / 2 - RahmenBreite / 2, hoeheR / 2, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [RahmenBreite, hoeheR, RahmenBreite] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    hasTopBeam && !isSlant && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, wandHoehe - topBeamHeight / 2, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [wandBreite, topBeamHeight, beamDepth] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }),
    hasTopBeam && isSlant && topBeamShapeSlant && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, 0, -beamDepth / 2], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [topBeamShapeSlant, topBeamExtrudeSettings] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }) }),
    FuellungComponent ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      FuellungComponent,
      {
        ...fuellungInstance.props,
        wandBreite,
        wandHoehe,
        wandHoeheHinten,
        material,
        farbeHex,
        topBeamHeight,
        hasTopBeam
      }
    ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SichtschutzwandPlankenMemo,
      {
        wandBreite,
        wandHoehe,
        wandHoeheHinten,
        plankenHoehe: plankenHoehe ?? 0.15,
        plankenTiefe: plankenTiefe ?? 0.02,
        material,
        farbeHex,
        topBeamHeight,
        hasTopBeam
      }
    ),
    aufbauInstances?.map((inst, i) => renderAufbauInstance(inst, `aufbau-${i}`, wandBreite, wandHoehe))
  ] });
}
const SichtschutzwandWandMemo = veranda_mf_2_plugin__loadShare__react__loadShare__.memo(SichtschutzwandWand);

function renderSichtschutzwand(rc, props) {
  const {
    effectiveSide,
    isSideWall,
    wandBreite,
    zoneHoeheVorne,
    keilReductionAuto,
    vHoehe,
    realSichtschutzHoehe,
    minAH,
    geoMax,
    ctx,
    geo,
    material,
    farbeHex,
    effectiveSegmentIndex,
    modelSlots
  } = rc;
  const plHoeheStr = exprVal(props.plankenHoehe);
  const plHoehe = plHoeheStr !== "" ? Number(plHoeheStr) : 0.15;
  const plTiefeStr = exprVal(props.plankenTiefe);
  const plTiefe = plTiefeStr !== "" ? Number(plTiefeStr) : 0.02;
  const qbStr = exprVal(props.querbalken);
  const qb = qbStr !== "" ? Number(qbStr) : 1;
  const maxThickness = Math.max(0.04, plTiefe + 0.02);
  const ssZ = isSideWall ? (ctx.pfostenBreite - maxThickness) / 2 : -(ctx.pfostenTiefe - maxThickness) / 2;
  const isRightSide = effectiveSide === 1;
  const reduction = keilReductionAuto;
  const sHoeheHinten = vHoehe === 1 && isSideWall && reduction <= 0 ? geoMax.zoneHoeheHinten - reduction - minAH : void 0;
  const [ssWandHoehe, ssWandHoeheHinten] = sHoeheHinten !== void 0 ? isRightSide ? [sHoeheHinten, realSichtschutzHoehe] : [realSichtschutzHoehe, sHoeheHinten] : [realSichtschutzHoehe, void 0];
  const aufbauSlotIds = new Set(Object.values(SICHTSCHUTZWAND_AUFBAU_SLOTS).map((s) => s.id));
  const aufbauInstances = Object.entries(modelSlots ?? {}).filter(([k]) => aufbauSlotIds.has(k)).flatMap(([, v]) => v);
  const slotsOhneAufbau = modelSlots ? Object.fromEntries(Object.entries(modelSlots).filter(([k]) => !aufbauSlotIds.has(k))) : void 0;
  let aufbauTopLevel = null;
  if (aufbauInstances.length) {
    const traegerAnchor = {
      position: [geo.posX, geo.zoneGroupY, geo.posZ],
      rotation: [0, geo.rotY, 0],
      size: { breite: wandBreite, hoehe: geo.zoneHoeheVorne, tiefe: ctx.pfostenBreite },
      meta: {
        hoeheVorne: geo.zoneHoeheVorne,
        hoeheHinten: geo.zoneHoeheHinten,
        wandSeite: effectiveSide,
        aufbauBasis: realSichtschutzHoehe
      }
    };
    aufbauTopLevel = aufbauInstances.map((inst, i) => {
      const Comp = inst.component;
      if (!Comp) return null;
      const {
        posX: _px,
        posY: _py,
        posZ: _pz,
        rotX: _rx,
        rotY: _ry,
        rotZ: _rz,
        position: _pos,
        rotation: _rot,
        scale: _sc,
        materials: _mat,
        slots: _sl,
        parentGeometry: _pg,
        slotAnchor: _sa,
        autoAnchor,
        ...otherProps
      } = inst.props ?? {};
      const effectiveProps = { ...otherProps };
      if (otherProps.segmentIndex === void 0 || Number(exprVal(otherProps.segmentIndex)) === -1) {
        effectiveProps.segmentIndex = effectiveSegmentIndex;
      }
      const key = `sw-aufbau-${i}|${JSON.stringify(effectiveProps)}`;
      const rendered = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        Comp,
        {
          ...effectiveProps,
          id: inst.model?.id,
          modelAction: inst.modelAction,
          slots: inst.slots,
          parentGeometry: ctx,
          slotAnchor: traegerAnchor,
          wandSeite: effectiveSide,
          aufbauBasis: realSichtschutzHoehe,
          aufbauMaxHoehe: Math.max(0, zoneHoeheVorne - reduction - realSichtschutzHoehe),
          wandBreite
        },
        key
      );
      const autoAnchorVal = exprVal(autoAnchor);
      if (autoAnchorVal === "1" || autoAnchorVal === "true") {
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "group",
          {
            position: [geo.posX, realSichtschutzHoehe, geo.posZ],
            rotation: [0, geo.rotY, 0],
            children: rendered
          },
          key
        );
      }
      return rendered;
    });
  }
  return [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, 0, ssZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SichtschutzwandWandMemo,
      {
        wandBreite,
        wandHoehe: ssWandHoehe,
        wandHoeheHinten: ssWandHoeheHinten,
        plankenHoehe: plHoehe,
        plankenTiefe: plTiefe,
        querbalken: qb,
        material,
        farbeHex,
        slots: slotsOhneAufbau
      }
    ) }),
    aufbauTopLevel
  ];
}

function useWandGeometry(wandSeite, breite, _tiefe, hoehe, segmentIndex = -1, segmentAnzahl) {
  const p = useVerandaGeometry();
  return calcWandGeometry(
    wandSeite,
    breite,
    hoehe,
    p.width,
    p.depth,
    p.height,
    p.dachneigung,
    p.pfostenBreite,
    p.pfostenTiefe,
    p.sparrenHoehe,
    p.pfette,
    p.pfettenBreite,
    p.dachVorsprung,
    p.sparrenAuflage,
    p.schwelle,
    p.schwelleBreite,
    p.schwelleHoehe,
    segmentIndex,
    p.pfostenAnzahlVorne,
    p.pfostenAnzahlHinten,
    p.isQubus,
    segmentAnzahl,
    p.rinnenHoehe ?? 0.08
  );
}
function createWandModel(wandTyp, label, extraDefaultProps, materialSlots, requiredLicense) {
  const slots = materialSlots ?? ["profil", "glas"];
  function WandModel(props) {
    const tier = useLicenseTier();
    if (!hasLicense(tier, requiredLicense)) return null;
    const {
      breite = 0,
      hoehe = 0,
      aufDachneigung = 0,
      materials = {},
      slots: modelSlots
    } = props;
    const material = materials.profil;
    const glasMaterial = materials.glas;
    const farbeHex = "#a0a0a0";
    const glasFarbeHex = "#ccddee";
    const aufDachneigungVal = Number(exprVal(aufDachneigung)) || 0;
    const keilInfo = useWandInfo();
    const eindeckungInfo = useEindeckungInfo();
    const effectiveSide = useWandSeite();
    const isSichtschutz = wandTyp === WAND_TYP.SICHTSCHUTZWAND;
    const effectiveBreite = Number(exprVal(breite)) || 0;
    const manualHoehe = Number(exprVal(hoehe)) || 0;
    const segIdxStr = exprVal(props.segmentIndex);
    const effectiveSegmentIndex = segIdxStr !== "" ? Number(segIdxStr) : -1;
    const ctxSegmentIndex = Math.max(0, effectiveSegmentIndex);
    const segAnzStr = exprVal(props.segmentAnzahl);
    const effectiveSegmentAnzahl = segAnzStr !== "" ? Number(segAnzStr) : 0;
    const ctx = useVerandaGeometry();
    const geoMax = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => calcWandGeometry(
      effectiveSide,
      effectiveBreite,
      0,
      ctx.width,
      ctx.depth,
      ctx.height,
      ctx.dachneigung,
      ctx.pfostenBreite,
      ctx.pfostenTiefe,
      ctx.sparrenHoehe,
      ctx.pfette,
      ctx.pfettenBreite,
      ctx.dachVorsprung,
      ctx.sparrenAuflage,
      ctx.schwelle,
      ctx.schwelleBreite,
      ctx.schwelleHoehe,
      effectiveSegmentIndex,
      ctx.pfostenAnzahlVorne,
      ctx.pfostenAnzahlHinten,
      ctx.isQubus,
      effectiveSegmentAnzahl,
      ctx.rinnenHoehe ?? 0.08
    ), [
      effectiveSide,
      effectiveBreite,
      ctx.width,
      ctx.depth,
      ctx.height,
      ctx.dachneigung,
      ctx.pfostenBreite,
      ctx.pfostenTiefe,
      ctx.sparrenHoehe,
      ctx.pfette,
      ctx.pfettenBreite,
      ctx.dachVorsprung,
      ctx.sparrenAuflage,
      ctx.schwelle,
      ctx.schwelleBreite,
      ctx.schwelleHoehe,
      effectiveSegmentIndex,
      ctx.pfostenAnzahlVorne,
      ctx.pfostenAnzahlHinten,
      ctx.isQubus,
      effectiveSegmentAnzahl,
      ctx.rinnenHoehe
    ]);
    const isSideWall = effectiveSide === 0 || effectiveSide === 1;
    const keilAbschnittFromCtx = effectiveSide >= 0 && effectiveSide < 4 && keilInfo?.keilAbschnitt ? keilInfo.keilAbschnitt[effectiveSide] ?? -1 : -1;
    const keilReductionAuto = keilAbschnittFromCtx >= 0 && isSideWall ? keilAbschnittFromCtx + KEIL_FRAME_SW$1 : 0;
    const vHoeheStr = exprVal(props.volleHoehe);
    const vHoehe = vHoeheStr !== "" ? Number(vHoeheStr) : isSichtschutz ? 1 : 0;
    const effectiveHoehe = vHoehe === 1 ? 0 : manualHoehe;
    const geo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => vHoehe === 1 || manualHoehe === 0 ? geoMax : calcWandGeometry(
      effectiveSide,
      effectiveBreite,
      effectiveHoehe,
      ctx.width,
      ctx.depth,
      ctx.height,
      ctx.dachneigung,
      ctx.pfostenBreite,
      ctx.pfostenTiefe,
      ctx.sparrenHoehe,
      ctx.pfette,
      ctx.pfettenBreite,
      ctx.dachVorsprung,
      ctx.sparrenAuflage,
      ctx.schwelle,
      ctx.schwelleBreite,
      ctx.schwelleHoehe,
      effectiveSegmentIndex,
      ctx.pfostenAnzahlVorne,
      ctx.pfostenAnzahlHinten,
      ctx.isQubus,
      effectiveSegmentAnzahl,
      ctx.rinnenHoehe ?? 0.08
    ), [
      vHoehe,
      manualHoehe,
      geoMax,
      effectiveSide,
      effectiveBreite,
      effectiveHoehe,
      ctx.width,
      ctx.depth,
      ctx.height,
      ctx.dachneigung,
      ctx.pfostenBreite,
      ctx.pfostenTiefe,
      ctx.sparrenHoehe,
      ctx.pfette,
      ctx.pfettenBreite,
      ctx.dachVorsprung,
      ctx.sparrenAuflage,
      ctx.schwelle,
      ctx.schwelleBreite,
      ctx.schwelleHoehe,
      effectiveSegmentIndex,
      ctx.pfostenAnzahlVorne,
      ctx.pfostenAnzahlHinten,
      ctx.isQubus,
      effectiveSegmentAnzahl,
      ctx.rinnenHoehe
    ]);
    const wandBreite = geo.wandBreite;
    const zoneHoeheVorne = geo.zoneHoeheVorne;
    const zoneHoeheHinten = geo.zoneHoeheHinten;
    const ssp = props;
    const minAH = Number(exprVal(ssp.minAufbauHoehe) ?? 0.2);
    const keilAbschnittForContext = wandTyp === WAND_TYP.KEIL ? Number(
      exprVal(props.keilAbschnitt) ?? exprVal(props.abschnittVorne) ?? 0
    ) : -1;
    const reduction = keilReductionAuto;
    const fullMaxHoehe = geoMax.zoneHoeheVorne - reduction;
    const hasRearPosts = ctx.pfostenAnzahlHinten > 0;
    let frameThickness = 0.05;
    switch (wandTyp) {
      case WAND_TYP.KEIL:
        frameThickness = Number(exprVal(props.dicke) ?? 0.07);
        break;
      case WAND_TYP.SCHIEBETUER: {
        const sp = props;
        const spGlasDicke = Number(exprVal(sp.glasDicke) ?? 8e-3);
        const anzahlPanels = Number(exprVal(sp.tuertypPanels) ?? 4);
        const nTracks = Math.min(anzahlPanels || 4, 5);
        frameThickness = nTracks * (spGlasDicke + 5e-3);
        break;
      }
      case WAND_TYP.SHUTTERS: {
        const sp = props;
        const isSchiebend = Number(exprVal(sp.schiebend) ?? 0) === 1;
        const rTiefe = Number(exprVal(sp.rahmenTiefe) ?? 0.04);
        const anzahlFrames = Number(exprVal(sp.anzahlRahmen) ?? 1);
        const trackSpacing = rTiefe + 0.01;
        frameThickness = isSchiebend ? trackSpacing * anzahlFrames : rTiefe;
        break;
      }
      case WAND_TYP.SICHTSCHUTZWAND: {
        const sp = props;
        const plankenTiefe = Number(exprVal(sp.plankenTiefe) ?? 0.02);
        frameThickness = Math.max(0.04, plankenTiefe + 0.02);
        break;
      }
    }
    const userHoeheVal = effectiveHoehe;
    const sichtschutzBasisHoehe = userHoeheVal > 0 ? userHoeheVal : fullMaxHoehe;
    const sichtschutzMax = fullMaxHoehe - minAH;
    const realSichtschutzHoehe = vHoehe === 1 ? sichtschutzMax : Math.min(sichtschutzBasisHoehe, fullMaxHoehe);
    const isUnmountingRef = React.useRef(false);
    React.useLayoutEffect(() => {
      return () => {
        isUnmountingRef.current = true;
      };
    }, []);
    React.useLayoutEffect(() => {
      if (effectiveSide < 0 || effectiveSide > 3) return;
      if (wandTyp === WAND_TYP.KEIL && keilInfo?.setKeilAbschnitt) {
        keilInfo.setKeilAbschnitt(effectiveSide, keilAbschnittForContext);
      }
      if (wandTyp === WAND_TYP.SICHTSCHUTZWAND) {
        if (keilInfo?.setSichtschutzHoehe) keilInfo.setSichtschutzHoehe(effectiveSide, ctxSegmentIndex, realSichtschutzHoehe);
        if (keilInfo?.setMinAufbauHoehe) keilInfo.setMinAufbauHoehe(effectiveSide, ctxSegmentIndex, minAH);
      }
      return () => {
        if (effectiveSide < 0 || effectiveSide > 3) return;
        if (isUnmountingRef.current) {
          if (wandTyp === WAND_TYP.KEIL && keilInfo?.setKeilAbschnitt) {
            keilInfo.setKeilAbschnitt(effectiveSide, -1);
          }
          if (wandTyp === WAND_TYP.SICHTSCHUTZWAND) {
            if (keilInfo?.setSichtschutzHoehe) keilInfo.setSichtschutzHoehe(effectiveSide, ctxSegmentIndex, 0);
            if (keilInfo?.setMinAufbauHoehe) keilInfo.setMinAufbauHoehe(effectiveSide, ctxSegmentIndex, 0);
          }
        }
      };
    }, [keilAbschnittForContext, effectiveSide, ctxSegmentIndex, realSichtschutzHoehe, minAH, wandTyp, keilInfo]);
    const isFrontBack = effectiveSide === 2 || effectiveSide === 3;
    const ssHoeheFromCtx = (() => {
      if (effectiveSide < 0 || effectiveSide > 3 || !keilInfo?.sichtschutzHoehe) return 0;
      if (isFrontBack) return keilInfo.sichtschutzHoehe[effectiveSide][ctxSegmentIndex] ?? 0;
      const vals = Object.values(keilInfo.sichtschutzHoehe[effectiveSide]);
      return vals.length > 0 ? Math.max(0, ...vals) : 0;
    })();
    const minAHFromCtx = (() => {
      if (effectiveSide < 0 || effectiveSide > 3 || !keilInfo?.minAufbauHoehe) return 0;
      if (isFrontBack) return keilInfo.minAufbauHoehe[effectiveSide][ctxSegmentIndex] ?? 0;
      const vals = Object.values(keilInfo.minAufbauHoehe[effectiveSide]);
      return vals.length > 0 ? Math.max(0, ...vals) : 0;
    })();
    const isAufbauWand = !isSichtschutz && wandTyp !== WAND_TYP.KEIL && ssHoeheFromCtx > 0.01;
    const currentSsReduction = isAufbauWand ? ssHoeheFromCtx : 0;
    const availableSpaceForAufbau = zoneHoeheVorne - reduction - currentSsReduction;
    const isTooSmall = isAufbauWand && availableSpaceForAufbau < minAHFromCtx - 1e-3;
    const ssReduction = currentSsReduction;
    const hasPfette = Number(ctx.pfette) === 1;
    const beamX = (effectiveSide === 0 ? 1 : -1) * (wandBreite / 2 + ctx.pfettenBreite / 2);
    const beamZ = (ctx.pfostenBreite - frameThickness) / 2;
    let beamHeight = 0;
    let beamBottomY = 0;
    if (isSideWall && hasPfette && !hasRearPosts) {
      switch (wandTyp) {
        case WAND_TYP.KEIL:
          beamHeight = 0;
          break;
        case WAND_TYP.SICHTSCHUTZWAND:
          beamHeight = Math.max(0, vHoehe === 1 ? zoneHoeheHinten : realSichtschutzHoehe);
          beamBottomY = 0;
          break;
        default:
          beamHeight = Math.max(0, zoneHoeheHinten - ssReduction);
          beamBottomY = ssReduction;
          break;
      }
    }
    const beschattungInstances = wandTyp === WAND_TYP.RAHMENWAND || wandTyp === WAND_TYP.SCHIEBETUER ? Object.entries(modelSlots ?? {}).filter(([k]) => k === WAND_BESCHATTUNG_SLOT.id).flatMap(([, v]) => v) : [];
    const beschattungNode = beschattungInstances.length > 0 ? beschattungInstances.map((inst, i) => {
      const Comp = inst.component;
      if (!Comp) return null;
      const {
        posX: _px,
        posY: _py,
        posZ: _pz,
        rotX: _rx,
        rotY: _ry,
        rotZ: _rz,
        position: _pos,
        rotation: _rot,
        scale: _sc,
        materials: instMat,
        slots: _sl,
        parentGeometry: _pg,
        slotAnchor: _sa,
        segmentIndex: _ownSi,
        wandSeite: _ownWs,
        ...otherProps
      } = inst.props ?? {};
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        Comp,
        {
          ...otherProps,
          segmentIndex: effectiveSegmentIndex,
          id: inst.model?.id,
          modelAction: inst.modelAction,
          parentGeometry: ctx,
          materials: instMat
        },
        `beschattung-${i}`
      );
    }) : null;
    const rc = {
      geo,
      geoMax,
      wandBreite,
      zoneHoeheVorne,
      zoneHoeheHinten,
      effectiveSide,
      isSideWall,
      keilReductionAuto,
      ssReduction,
      vHoehe,
      realSichtschutzHoehe,
      minAH,
      hasPfette,
      hasRearPosts,
      ctx,
      material,
      glasMaterial,
      materials,
      farbeHex,
      glasFarbeHex,
      aufDachneigungVal,
      aussensparrenHoehe: eindeckungInfo.aussensparrenHoehe,
      effectiveSegmentIndex,
      modelSlots
    };
    let innerContent;
    let aufbauTopLevel = null;
    switch (wandTyp) {
      case WAND_TYP.KEIL:
        [innerContent, aufbauTopLevel] = renderKeil(rc, props);
        break;
      case WAND_TYP.RAHMENWAND:
        [innerContent, aufbauTopLevel] = renderRahmenwand(rc, props);
        break;
      case WAND_TYP.SCHIEBETUER:
        [innerContent, aufbauTopLevel] = renderSchiebetuer(rc, props);
        break;
      case WAND_TYP.SHUTTERS:
        [innerContent, aufbauTopLevel] = renderShutters(rc, props);
        break;
      case WAND_TYP.SICHTSCHUTZWAND:
        [innerContent, aufbauTopLevel] = renderSichtschutzwand(rc, props);
        break;
      default: {
        const defaultHoehe = zoneHoeheVorne - keilReductionAuto - ssReduction;
        innerContent = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "group",
          {
            position: [0, defaultHoehe / 2 + ssReduction, (ctx.pfostenBreite - 0.01) / 2],
            children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              BasicWandRenderer,
              {
                wandBreite,
                wandHoehe: defaultHoehe,
                material,
                farbeHex
              }
            )
          }
        );
      }
    }
    if (isTooSmall) return null;
    const wallGroup = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "group",
      {
        position: [geo.posX, geo.zoneGroupY, geo.posZ],
        rotation: [0, geo.rotY, 0],
        userData: { modelId: props.id },
        name: props.name,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
          innerContent,
          isSideWall && hasPfette && beamHeight > 0.01 && !hasRearPosts && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [beamX, beamBottomY + beamHeight / 2, beamZ],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [ctx.pfettenBreite, beamHeight, frameThickness] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material,
                    fallbackColor: farbeHex
                  }
                )
              ]
            }
          )
        ]
      }
    );
    if (aufbauTopLevel || beschattungNode) {
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
        wallGroup,
        beschattungNode,
        aufbauTopLevel
      ] });
    }
    return wallGroup;
  }
  const baseDefaultProps = {
    breite: { expression: "0" },
    hoehe: { expression: "0" }
  };
  if (wandTyp === WAND_TYP.KEIL || wandTyp === WAND_TYP.SCHIEBETUER) {
    baseDefaultProps.fuellungTyp = { expression: "0" };
    baseDefaultProps.glasTyp = { expression: "0" };
    baseDefaultProps.opacity = { expression: "0.2" };
    baseDefaultProps.roughness = { expression: "0" };
  } else if (wandTyp === WAND_TYP.RAHMENWAND) {
    baseDefaultProps.fuellungTypOben = { expression: "0" };
    baseDefaultProps.opacityOben = { expression: "0.2" };
    baseDefaultProps.roughnessOben = { expression: "0" };
    baseDefaultProps.fuellungTypUnten = { expression: "0" };
    baseDefaultProps.opacityUnten = { expression: "0.2" };
    baseDefaultProps.roughnessUnten = { expression: "0" };
  }
  const convertedExtra = extraDefaultProps ? Object.fromEntries(
    Object.entries(extraDefaultProps).map(([k, v]) => [k, toExpr(v)])
  ) : {};
  const baseDialogKeys = buildBaseDialogKeys(wandTyp);
  const extraKeys = Object.keys(convertedExtra);
  const allDialogKeys = [
    ...baseDialogKeys,
    ...extraKeys.filter((k) => !baseDialogKeys.includes(k))
  ];
  const wandPropsSchema = buildWandPropsSchema(allDialogKeys);
  const hasBeschattungSlot = wandTyp === WAND_TYP.RAHMENWAND || wandTyp === WAND_TYP.SCHIEBETUER;
  return {
    type: WAND_TYPE_MAP[wandTyp] ?? `veranda-wand-typ${wandTyp}`,
    label,
    description: `Wand – ${label}`,
    defaultProps: {
      ...baseDefaultProps,
      ...convertedExtra,
      ...hasBeschattungSlot && {
        slotDefinitions: [WAND_BESCHATTUNG_SLOT]
      }
    },
    propsDialog: wandPropsSchema,
    component: WandModel,
    materials: slots,
    disabledForAR: false,
    requiredLicense
  };
}

const keilDynamicModel = createWandModel(WAND_TYP.KEIL, "Keil", {
  metalness: { expression: "0" },
  envMapIntensity: { expression: "1.0" },
  kammergroesse: { expression: "0.05" },
  plankenHoehe: { expression: "0.15" },
  plankenTiefe: { expression: "0.02" },
  keilAbschnitt: { expression: "0" },
  keilTeiler: { expression: "0" },
  dicke: { expression: "0.07" }
}, void 0, "Pro");

const rahmenwandDynamicModel = createWandModel(
  WAND_TYP.RAHMENWAND,
  "Rahmenwand",
  {
    metalnessOben: { expression: "0" },
    envMapIntensityOben: { expression: "1.0" },
    kammergroesseOben: { expression: "0.05" },
    metalnessUnten: { expression: "0" },
    envMapIntensityUnten: { expression: "1.0" },
    kammergroesseUnten: { expression: "0.05" },
    plankenHoehe: { expression: "0.15" },
    plankenTiefe: { expression: "0.02" },
    mitMittelbalken: { expression: "1" },
    mittelbalkenHoehe: { expression: "1.0" },
    maxScheibenBreite: { expression: "1.2" },
    aufDachneigung: 0
  },
  ["profil", "glasOben", "glasUnten"],
  "Pro"
);

const schiebetuerDynamicModel = createWandModel(WAND_TYP.SCHIEBETUER, "Schiebetür", {
  metalness: { expression: "0" },
  envMapIntensity: { expression: "1.0" },
  kammergroesse: { expression: "0.05" },
  plankenHoehe: { expression: "0.15" },
  plankenTiefe: { expression: "0.02" },
  mitRahmen: 0,
  tuertypPanels: { expression: "0" },
  maxPanelBreite: { expression: "0.8" },
  festeElemente: { expression: "0" },
  oeffnung: { expression: "0" },
  laufrichtung: 0,
  schienenSeite: 0,
  buersten: 1,
  griffTyp: { expression: "0" },
  griffAnordnung: { expression: "0" },
  griffPosition: 0,
  griffSeite: 2,
  griffHoehe: { expression: "1.0" },
  glasDicke: { expression: "0.008" },
  rahmenBreite: { expression: "0.04" }
}, void 0, "Pro");

const shuttersDynamicModel = createWandModel(WAND_TYP.SHUTTERS, "Shutters", {
  lamellenHoehe: 0.08,
  schiebend: 0,
  anzahlRahmen: 1,
  oeffnungSchiebe: 0,
  oeffnungLamellen: 0,
  rahmenBreite: 0.04,
  rahmenTiefe: 0.04
}, void 0, "Pro");

const _base = createWandModel(
  WAND_TYP.SICHTSCHUTZWAND,
  "Sichtschutzwand",
  {
    // Basis
    hoehe: 0,
    volleHoehe: 1,
    minAufbauHoehe: 0,
    // Planken
    plankenHoehe: 0.15,
    plankenTiefe: 0.02,
    querbalken: 1
  },
  ["profil"],
  "Pro"
);
const sichtschutzwandDynamicModel = {
  ..._base,
  defaultProps: {
    ..._base.defaultProps,
    slotDefinitions: [
      {
        id: SICHTSCHUTZWAND_FUELLUNG_SLOT_ID,
        name: "Füllung"
        // Kein defaultModelId mehr: K3s Auto-Populate für diesen Slot löst einen
        // Plattform-Bug aus (Kamera-Fokus bleibt nach Instanz-Schließen dauerhaft
        // hängen). Der Standard-Planken-Look wird stattdessen direkt in
        // SichtschutzwandWand gerendert, solange kein externes Plugin per
        // Regelwerk explizit ein Modell in diesen Slot legt.
      },
      ...Object.values(SICHTSCHUTZWAND_AUFBAU_SLOTS)
    ]
  }
};

function calcSparrenPositions(width, sparrenAnzahl, sparrenBreite) {
  if (sparrenAnzahl <= 1) return [0];
  const xAussen = width / 2 - sparrenBreite / 2;
  if (sparrenAnzahl === 2) return [-xAussen, xAussen];
  const innenBreite = 2 * xAussen;
  const abstand = innenBreite / (sparrenAnzahl - 1);
  return Array.from(
    { length: sparrenAnzahl },
    (_, i) => -xAussen + i * abstand
  );
}
function calcMarkiseSegmente(sparrenPositions, panelGaps, sparrenBreite, maxBreite) {
  if (sparrenPositions.length < 2 || panelGaps.length === 0) {
    return [
      {
        centerX: 0,
        width: sparrenPositions.length >= 2 ? sparrenPositions[sparrenPositions.length - 1] - sparrenPositions[0] + sparrenBreite : 0,
        panelGaps,
        sparrenPositions
      }
    ];
  }
  const totalWidth = sparrenPositions[sparrenPositions.length - 1] - sparrenPositions[0] + sparrenBreite;
  if (maxBreite <= 0 || totalWidth <= maxBreite) {
    return [
      {
        centerX: (sparrenPositions[0] + sparrenPositions[sparrenPositions.length - 1]) / 2,
        width: totalWidth,
        panelGaps,
        sparrenPositions
      }
    ];
  }
  const segments = [];
  let start = 0;
  while (start < sparrenPositions.length - 1) {
    let end = start + 1;
    while (end < sparrenPositions.length - 1) {
      const candidateWidth = sparrenPositions[end + 1] - sparrenPositions[start] + sparrenBreite;
      if (candidateWidth > maxBreite) break;
      end++;
    }
    const absCenterX = (sparrenPositions[start] + sparrenPositions[end]) / 2;
    const segWidth = sparrenPositions[end] - sparrenPositions[start] + sparrenBreite;
    const segSparren = sparrenPositions.slice(start, end + 1).map((x) => x - absCenterX);
    const segGaps = panelGaps.slice(start, end).map((g) => ({ ...g, centerX: g.centerX - absCenterX }));
    segments.push({
      centerX: absCenterX,
      width: segWidth,
      panelGaps: segGaps,
      sparrenPositions: segSparren
    });
    start = end;
  }
  return segments;
}
function createMarkiseStoffShape(laenge, durchhang, stoffDicke, segmente = 12) {
  const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  s.moveTo(0, 0);
  for (let i = 1; i <= segmente; i++) {
    const t = i / segmente;
    const x = t * laenge;
    const y = -durchhang * 4 * t * (1 - t);
    s.lineTo(x, y);
  }
  s.lineTo(laenge, stoffDicke);
  for (let i = segmente - 1; i >= 0; i--) {
    const t = i / segmente;
    const x = t * laenge;
    const y = -durchhang * 4 * t * (1 - t) + stoffDicke;
    s.lineTo(x, y);
  }
  s.closePath();
  return s;
}
const BESCHATTUNG_DIMS = {
  schienenBreite: 0.015,
  gestellProfilH: 0.025,
  gestellProfilT: 0.015
};

const { gestellProfilH, gestellProfilT } = BESCHATTUNG_DIMS;
const Gestell = ({
  width: _width,
  tiefe,
  sparrenPositions,
  sparrenBreite,
  kassetteHex,
  dachneigungRad,
  material,
  hideLaengsprofile
}) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { rotation: [-dachneigungRad, 0, 0], children: !hideLaengsprofile && sparrenPositions.map((xPos, idx) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
  "mesh",
  {
    position: [xPos, -gestellProfilH * 0.35, 0],
    castShadow: true,
    children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "boxGeometry",
        {
          args: [
            sparrenBreite * 0.8,
            gestellProfilH * 0.7,
            tiefe + gestellProfilT
          ]
        }
      ),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: kassetteHex,
          roughness: 0.25,
          metalness: 0.7,
          clearcoat: 0.3
        }
      ) })
    ]
  },
  `gestell-laengs-${idx}`
)) });

const UNTERDACH_OFFSET = 0;
function useBeschattungGeometry(props) {
  const ctx = useVerandaGeometry();
  const eindeckungInfo = useEindeckungInfo();
  const width = ctx.innerWidth ?? ctx.width ?? props?.width;
  const depth = ctx.innerDepth ?? ctx.depth ?? props?.depth;
  const height = ctx.height ?? props?.height;
  const dachneigung = ctx.eindeckungDachneigung ?? ctx.dachneigung ?? props?.dachneigung;
  const dachVorsprung = ctx.dachVorsprung ?? props?.dachVorsprung;
  const sparrenAnzahl = eindeckungInfo.sparrenAnzahl > 0 ? eindeckungInfo.sparrenAnzahl : ctx.sparrenAnzahl ?? 6;
  const sparrenBreite = ctx.sparrenBreite;
  const sparrenHoehe = ctx.sparrenHoehe;
  const pfostenTiefe = ctx.pfostenTiefe;
  const schwelle = ctx.schwelle;
  const schwelleBreite = ctx.schwelleBreite;
  const pfette = ctx.pfette;
  const pfettenBreite = ctx.pfettenBreite;
  const sparrenAuflage = ctx.sparrenAuflage;
  const isQubus = ctx.isQubus ?? false;
  const innenliegend = sparrenAuflage !== void 0 && Number(sparrenAuflage) === 1;
  const { hoeheVorne: hRawVorne, hoeheHinten: hRawHinten } = calcVerandaGeometry(depth, dachneigung, height);
  const quertraegerTiefeVorne = isQubus ? 0 : Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const quertraegerTiefeHinten = isQubus ? 0 : Number(pfette) === 1 ? Math.max(pfettenBreite, pfostenTiefe) : 0;
  const steigung = depth > 0 ? (hRawHinten - hRawVorne) / depth : 0;
  let zVorne;
  let zHinten;
  if (innenliegend) {
    zVorne = -depth / 2 + dachVorsprung + quertraegerTiefeVorne;
    zHinten = depth / 2 - quertraegerTiefeHinten;
  } else {
    zVorne = -depth / 2;
    zHinten = depth / 2;
  }
  const sparrenTiefe = zHinten - zVorne;
  let hoeheVorne;
  let hoeheHinten;
  if (innenliegend) {
    hoeheVorne = hRawVorne + steigung * (dachVorsprung + quertraegerTiefeVorne);
    hoeheHinten = hRawHinten - steigung * quertraegerTiefeHinten;
  } else {
    hoeheVorne = hRawVorne;
    hoeheHinten = hRawHinten;
  }
  const qubusVerticalOffset = eindeckungInfo.qubusOffset;
  hoeheVorne -= qubusVerticalOffset;
  hoeheHinten -= qubusVerticalOffset;
  const sparrenTopVorne = innenliegend ? hoeheVorne : hoeheVorne + sparrenHoehe;
  const sparrenTopHinten = innenliegend ? hoeheHinten : hoeheHinten + sparrenHoehe;
  const sparrenBodenVorne = innenliegend ? hoeheVorne - sparrenHoehe : hoeheVorne;
  const sparrenBodenHinten = innenliegend ? hoeheHinten - sparrenHoehe : hoeheHinten;
  const yUnterdachVorne = sparrenBodenVorne - UNTERDACH_OFFSET;
  const yUnterdachHinten = sparrenBodenHinten - UNTERDACH_OFFSET;
  const aufdachExtra = eindeckungInfo.glasDicke + eindeckungInfo.glasLeistenHoehe;
  const yAufdachVorne = sparrenTopVorne + aufdachExtra;
  const yAufdachHinten = sparrenTopHinten + aufdachExtra;
  const yLeistenOKVorne = sparrenTopVorne + eindeckungInfo.glasLeistenHoehe;
  const yLeistenOKHinten = sparrenTopHinten + eindeckungInfo.glasLeistenHoehe;
  const neigungRad = dachneigung * Math.PI / 180;
  const wandHorizTiefe = eindeckungInfo.wandanschlussAktiv ? eindeckungInfo.wandanschlussTiefe * Math.cos(neigungRad) : 0;
  const zHintenAufdach = depth / 2 - wandHorizTiefe;
  const zVorneAufdach = -depth / 2 + quertraegerTiefeVorne;
  const zVorneUnterdach = -depth / 2 + dachVorsprung + quertraegerTiefeVorne;
  const zHintenUnterdach = depth / 2 - (isQubus ? 0 : Number(pfette) === 1 ? pfettenBreite : 0);
  const sparrenTiefeUnterdach = zHintenUnterdach - zVorneUnterdach;
  const querbalkenBreite = width;
  const sparrenPositions = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcSparrenPositions(
      querbalkenBreite,
      sparrenAnzahl,
      sparrenBreite
    ),
    [querbalkenBreite, sparrenAnzahl, sparrenBreite]
  );
  const panelGaps = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (sparrenPositions.length === 0) {
      return [];
    }
    if (sparrenPositions.length === 1) {
      return [
        {
          centerX: 0,
          panelWidth: querbalkenBreite - sparrenBreite * 2
        }
      ];
    }
    const gaps = [];
    for (let i = 0; i < sparrenPositions.length - 1; i++) {
      const left = sparrenPositions[i];
      const right = sparrenPositions[i + 1];
      const gap = right - left - sparrenBreite;
      gaps.push({
        centerX: (left + right) / 2,
        panelWidth: Math.max(0.05, gap)
      });
    }
    return gaps;
  }, [sparrenPositions, sparrenBreite, querbalkenBreite]);
  return {
    hoeheVorne,
    hoeheHinten,
    querbalkenBreite,
    zVorne,
    zVorneAufdach,
    zHinten,
    sparrenTiefe,
    yUnterdachVorne,
    yUnterdachHinten,
    ySparrenUKVorne: sparrenBodenVorne,
    ySparrenUKHinten: sparrenBodenHinten,
    yAufdachVorne,
    yAufdachHinten,
    yLeistenOKVorne,
    yLeistenOKHinten,
    sparrenPositions,
    panelGaps,
    zHintenAufdach,
    zHintenUnterdach,
    sparrenTiefeUnterdach,
    neigungRad
  };
}

const KASSETTE_R$1 = 0.065;
const SCHIENE_W$1 = 0.025;
const SCHIENE_H$1 = 0.05;
const SCHIENE_BOTTOM_H$1 = 0.02;
const FUEHRUNG_T$1 = 5e-3;
const HALTER_KLEMME_W$1 = 0.02;
const HALTER_KLEMME_H$1 = 8e-3;
const HALTER_KLEMME_T$1 = 0.05;
const HALTER_STAB_W$1 = 0.01;
const WINKEL_W = 0.02;
const WINKEL_L = 0.02;
const WINKEL_T = 5e-3;
const AUSLAUF_H$1 = 0.012;
const AUSLAUF_T$1 = 0.05;
const AUSLAUF_RUND_R$1 = 6e-3;
const KASSETTE_INT_W = 0.12;
const KASS_FLANSCH_DICKE = 0.01;
const KASS_STEG_BREITE = 6e-3;
const StoffMesh$1 = ({ stoffBreite, yCenter, stoffStartZ, stoffSchraeg, effektiveTiefe, material }) => {
  const geo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const durchhang = Math.min(0.025, effektiveTiefe * 8e-3);
    const shape = createMarkiseStoffShape(stoffSchraeg, durchhang, 3e-3);
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, { depth: stoffBreite, bevelEnabled: false });
  }, [stoffSchraeg, effektiveTiefe, stoffBreite]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      position: [-stoffBreite / 2, yCenter, stoffStartZ],
      rotation: [0, Math.PI / 2, 0],
      geometry: geo,
      receiveShadow: true,
      castShadow: true,
      name: "stoff",
      renderOrder: 1,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, materialType: "physical", side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, opacity: 1, depthWrite: true })
    }
  );
};
function MarkiseModel(props) {
  const tier = useLicenseTier();
  if (!hasLicense(tier, "Pro")) return null;
  const {
    markiseTyp: _mt = 0,
    tiefe = 0,
    maxBreite = 0,
    oeffnungsgrad = 1,
    kastenArt = 0,
    schienenAbstand = 0,
    halterungen = 1,
    kassettenDurchmesser = 0,
    kastenBreite = 0,
    kastenHoehe = 0,
    winkel = 0,
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const markiseTyp = Number(_mt);
  const kastenArtN = Number(kastenArt);
  const halterungenN = Number(halterungen);
  const winkelN = Number(winkel);
  const isAufdach = markiseTyp === 0;
  const isUnterdach = markiseTyp === 1;
  const isKassette = markiseTyp === 3;
  const ctx = useVerandaGeometry();
  const bgeo = useBeschattungGeometry();
  const { shadingMode } = useSceneMode();
  const oeffnung = shadingMode ? 1 : Math.max(0, Math.min(1, oeffnungsgrad));
  const profilMaterial = materials.profil;
  const stoffMaterial = materials.stoff;
  if (profilMaterial) profilMaterial.name = "profil";
  if (stoffMaterial) stoffMaterial.name = "stoff";
  veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (profilMaterial) {
      profilMaterial.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
      profilMaterial.needsUpdate = true;
    }
  }, [profilMaterial]);
  const segments = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcMarkiseSegmente(bgeo.sparrenPositions, bgeo.panelGaps, ctx.sparrenBreite, maxBreite),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bgeo.sparrenPositions, bgeo.panelGaps, ctx.sparrenBreite, maxBreite]
  );
  const _tiefeLimit = isAufdach || isKassette ? bgeo.zHintenAufdach - bgeo.zVorneAufdach : bgeo.sparrenTiefeUnterdach + (ctx.depth / 2 - bgeo.zHintenUnterdach);
  const _gesamtTiefe = tiefe > 0 ? Math.min(tiefe, _tiefeLimit) : _tiefeLimit;
  const _schraegeTiefe = _gesamtTiefe / Math.cos(bgeo.neigungRad);
  const kBoxH = isKassette ? kastenHoehe > 0 ? kastenHoehe : KASSETTE_INT_W : KASSETTE_INT_W;
  const kBoxD = isKassette ? kastenBreite > 0 ? kastenBreite : KASSETTE_INT_W : KASSETTE_INT_W;
  const geoKassetteRails = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!isKassette) return null;
    const py = kBoxH;
    const px = ctx.sparrenBreite;
    const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    shape.moveTo(0, py).lineTo(px, py).lineTo(px, py - KASS_FLANSCH_DICKE).lineTo(px / 2 + KASS_STEG_BREITE / 2, py - KASS_FLANSCH_DICKE).lineTo(px / 2 + KASS_STEG_BREITE / 2, 0).lineTo(px / 2 - KASS_STEG_BREITE / 2, 0).lineTo(px / 2 - KASS_STEG_BREITE / 2, py - KASS_FLANSCH_DICKE).lineTo(0, py - KASS_FLANSCH_DICKE).lineTo(0, py);
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, { curveSegments: 1, steps: 1, depth: _schraegeTiefe, bevelEnabled: false });
  }, [isKassette, ctx.sparrenBreite, _schraegeTiefe, kBoxH]);
  const geoKassetteHolder = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!isKassette) return null;
    const py = kBoxH;
    const px = ctx.sparrenBreite;
    const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    shape.moveTo(px + 1e-3, py - 0.01).lineTo(px + 1e-3, py).lineTo(-1e-3, py).lineTo(-1e-3, py - 0.01).lineTo(0.01, py - 0.01);
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, { curveSegments: 1, steps: 1, depth: 0.05, bevelEnabled: false });
  }, [isKassette, ctx.sparrenBreite, kBoxH]);
  const geoKassetteCap = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!isKassette) return null;
    const py = kBoxH;
    const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    shape.moveTo(0.015, -0.05).lineTo(0.015, py + 0.02).lineTo(-kBoxD, py).lineTo(-kBoxD, -0.01).lineTo(0.015, -0.05);
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, { curveSegments: 1, steps: 1, depth: ctx.sparrenBreite, bevelEnabled: false });
  }, [isKassette, ctx.sparrenBreite, kBoxH, kBoxD]);
  const railLift = schienenAbstand > 0 ? Number(schienenAbstand) : 0;
  const showHalter = halterungenN === 1;
  const showWinkel = winkelN === 1;
  const unterdachZHinten = ctx.depth / 2;
  const tiefeLimit = isAufdach || isKassette ? bgeo.zHintenAufdach - bgeo.zVorneAufdach : bgeo.sparrenTiefeUnterdach + (ctx.depth / 2 - bgeo.zHintenUnterdach);
  const gesamtTiefe = tiefe > 0 ? Math.min(tiefe, tiefeLimit) : tiefeLimit;
  const effektiveTiefe = gesamtTiefe * oeffnung;
  const neigungRad = bgeo.neigungRad;
  const schraegeTiefe = gesamtTiefe / Math.cos(neigungRad);
  const startZ = isAufdach || isKassette ? bgeo.zHintenAufdach : unterdachZHinten;
  const zCenter = startZ - gesamtTiefe / 2;
  const yRefFront = isAufdach || isKassette ? bgeo.yAufdachVorne : bgeo.ySparrenUKVorne;
  const yRefBack = isAufdach || isKassette ? bgeo.yAufdachHinten : bgeo.ySparrenUKHinten;
  const zRel = bgeo.sparrenTiefe > 0 ? (zCenter - bgeo.zVorne) / bgeo.sparrenTiefe : 0;
  const yMitte = yRefFront + (yRefBack - yRefFront) * zRel + 1e-3;
  const halfZ = schraegeTiefe / 2;
  const kassetteR = isKassette ? kBoxD / 2 : kassettenDurchmesser > 0 ? kassettenDurchmesser / 2 : KASSETTE_R$1;
  const kassetteZ = halfZ - (isKassette ? kBoxD / 2 : kassetteR);
  const kassetteD = isKassette ? kBoxD : kassetteR * 2;
  const stoffStartZ = halfZ - kassetteD;
  const stoffSchraeg = Math.max(
    0,
    effektiveTiefe / Math.cos(neigungRad) - kassetteD
  );
  const auslaufZ = stoffStartZ - stoffSchraeg;
  const railLength = Math.max(0, schraegeTiefe - kassetteR - SCHIENE_W$1);
  const railCenterZ = -(kassetteR + SCHIENE_W$1) / 2;
  const backHz = halfZ - kassetteD - 0.02;
  const frontHz = -halfZ + 0.04;
  const halterZPositions = [backHz, frontHz];
  const winkelBackHz = halfZ - kassetteD;
  const winkelZPositions = [winkelBackHz, (winkelBackHz + frontHz) / 2, frontHz];
  const effectiveRailDrop = railLift;
  const railCenterY = -(effectiveRailDrop + SCHIENE_H$1 / 2);
  const railBottomCenterY = -SCHIENE_BOTTOM_H$1 / 2;
  const kastenW = kastenBreite > 0 ? kastenBreite : kassetteR * 2;
  const kastenH = kastenHoehe > 0 ? kastenHoehe : kassetteR * 2;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, yMitte, zCenter], rotation: [-neigungRad, 0, 0], children: segments.map((seg, si) => {
          const segW = seg.width;
          const railInner = isUnterdach && showWinkel ? ctx.sparrenBreite : 0;
          const schieneOuterX = segW / 2 - railInner;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [seg.centerX, 0, 0], children: [
            isKassette ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [0, kBoxH / 2 + 0.02, kassetteZ],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [segW, kBoxH, kBoxD] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              }
            ) : kastenArtN === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: isUnterdach ? [0, -(effectiveRailDrop + kassetteR), kassetteZ] : [0, kastenH / 2, kassetteZ],
                castShadow: true,
                receiveShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "boxGeometry",
                    {
                      args: isUnterdach ? [segW, kassetteR * 2, kassetteR * 2] : [segW, kastenH, kastenW]
                    }
                  ),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              }
            ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                "mesh",
                {
                  position: isUnterdach ? [0, -(effectiveRailDrop + kassetteR), kassetteZ] : [0, kassetteR, kassetteZ],
                  rotation: [0, 0, Math.PI / 2],
                  castShadow: true,
                  receiveShadow: true,
                  children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [kassetteR, kassetteR, segW, 32] }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                  ]
                }
              ),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                "mesh",
                {
                  position: isUnterdach ? [0, -(effectiveRailDrop + kassetteR / 2), kassetteZ] : [0, kassetteR / 2, kassetteZ],
                  castShadow: true,
                  receiveShadow: true,
                  children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [segW, kassetteR, kassetteR * 2] }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                  ]
                }
              )
            ] }),
            !isKassette && [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [
                  side * (schieneOuterX - SCHIENE_W$1 / 2),
                  isUnterdach ? railCenterY : railLift + SCHIENE_H$1 / 2,
                  railCenterZ
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W$1, SCHIENE_H$1, railLength] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              },
              `rail-${side}`
            )),
            !isKassette && [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [
                  side * (schieneOuterX - SCHIENE_W$1 / 2),
                  isUnterdach ? railBottomCenterY : SCHIENE_BOTTOM_H$1 / 2,
                  railCenterZ
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W$1, SCHIENE_BOTTOM_H$1, railLength] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              },
              `rail-bot-${side}`
            )),
            isKassette && geoKassetteRails && (() => {
              const segLeft = seg.centerX - segW / 2;
              const segRight = seg.centerX + segW / 2;
              const railsWorldX = bgeo.sparrenPositions.filter(
                (x) => x >= segLeft - ctx.sparrenBreite / 2 && x <= segRight + ctx.sparrenBreite / 2
              );
              const railLocalX = railsWorldX.length >= 2 ? railsWorldX.map((x) => x - seg.centerX) : [-(segW / 2 - ctx.sparrenBreite / 2), +(segW / 2 - ctx.sparrenBreite / 2)];
              const Nrails = railLocalX.length;
              const effTiefeSch = effektiveTiefe / Math.cos(neigungRad);
              const fabZKass = halfZ - effTiefeSch;
              const stoffEnd = halfZ - 0.01;
              const stoffEffT = Math.max(0.01, stoffEnd - fabZKass);
              const stoffZP = fabZKass + stoffEffT / 2;
              const cordLen = Math.max(0, halfZ - fabZKass);
              const cordCenterZ = fabZKass + cordLen / 2;
              return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
                railLocalX.map((lx, ri) => {
                  const railX = lx - ctx.sparrenBreite / 2;
                  const isFirstRail = ri === 0 && si === 0;
                  const isLastRail = ri === Nrails - 1 && si === segments.length - 1;
                  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [railX, 0, -halfZ], geometry: geoKassetteRails, castShadow: true, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial }) }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                      veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.RoundedBox,
                      {
                        args: [ctx.sparrenBreite, 0.02, 0.02],
                        radius: isFirstRail || isLastRail ? 75e-4 : 25e-4,
                        position: [lx, kBoxH / 2, -halfZ + 9e-3],
                        rotation: [isFirstRail || isLastRail ? -Math.PI / 2 : 0, 0, 0],
                        castShadow: true,
                        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                      }
                    ),
                    oeffnung > 0 && effTiefeSch > 0.05 && geoKassetteHolder && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [railX, 2e-3, fabZKass - 0.025], geometry: geoKassetteHolder, castShadow: true, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "silver", roughness: 0.3, metalness: 0.8 }) }),
                    (isFirstRail || isLastRail) && cordLen > 0.02 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [lx, kBoxH + 3e-3, cordCenterZ], castShadow: true, children: [
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [2e-3, 2e-3, cordLen] }),
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "silver", roughness: 0.3, metalness: 0.8 })
                    ] })
                  ] }, `kass-rail-${ri}`);
                }),
                Nrails > 1 && geoKassetteCap && [0, Nrails - 1].map((idx) => {
                  const lx = railLocalX[idx];
                  const capX = idx === 0 ? lx - ctx.sparrenBreite / 2 - 3e-3 : lx - ctx.sparrenBreite / 2 + 25e-4;
                  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "mesh",
                    {
                      position: [capX, 0.01, halfZ - kBoxD],
                      rotation: [0, Math.PI / 2, 0],
                      geometry: geoKassetteCap,
                      castShadow: true,
                      receiveShadow: true,
                      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                    },
                    `kass-cap-${idx}`
                  );
                }),
                oeffnung > 0 && stoffEffT > 0.01 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, kBoxH + 2e-3, stoffZP], castShadow: true, receiveShadow: true, name: "stoff", renderOrder: 1, children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [segW - 0.02, 5e-3, stoffEffT] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: stoffMaterial, materialType: "basic", depthWrite: false, side: veranda_mf_2_plugin__loadShare__three__loadShare__.FrontSide })
                ] }),
                oeffnung > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.RoundedBox, { args: [segW, 0.015, 0.05], radius: 25e-4, position: [0, kBoxH + 0.01, fabZKass], castShadow: true, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial }) })
              ] });
            })(),
            !isKassette && [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [
                  side * (schieneOuterX - SCHIENE_W$1 - FUEHRUNG_T$1 / 2),
                  isUnterdach ? railCenterY : railLift + SCHIENE_H$1 / 2,
                  railCenterZ
                ],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "boxGeometry",
                    {
                      args: [FUEHRUNG_T$1, SCHIENE_W$1, oeffnung > 0 ? railLength : 0.01]
                    }
                  ),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              },
              `guide-${side}`
            )),
            !isKassette && [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [
                  side * (schieneOuterX - SCHIENE_W$1 / 2),
                  isUnterdach ? railCenterY : railLift + SCHIENE_H$1 / 2,
                  railCenterZ - railLength / 2
                ],
                rotation: [0, 0, Math.PI / 2],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "cylinderGeometry",
                    {
                      args: [SCHIENE_H$1 / 2, SCHIENE_H$1 / 2, SCHIENE_W$1 - 5e-3, 32]
                    }
                  ),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              },
              `cap-${side}`
            )),
            !isKassette && showHalter && [-1, 1].map(
              (side) => halterZPositions.map((hz, hi) => {
                const stabLen = isUnterdach ? effectiveRailDrop - HALTER_KLEMME_H$1 : railLift - HALTER_KLEMME_H$1;
                return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                  "group",
                  {
                    position: [side * (schieneOuterX - SCHIENE_W$1 / 2), 0, hz],
                    children: [
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                        "mesh",
                        {
                          position: [0, isUnterdach ? -HALTER_KLEMME_H$1 / 2 : railLift, 0],
                          castShadow: true,
                          children: [
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W$1, HALTER_KLEMME_H$1, HALTER_KLEMME_T$1] }),
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                          ]
                        }
                      ),
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                        "mesh",
                        {
                          position: [0, isUnterdach ? -(effectiveRailDrop + SCHIENE_H$1 / 2) : HALTER_KLEMME_H$1 / 2, 0],
                          castShadow: true,
                          children: [
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W$1, HALTER_KLEMME_H$1, HALTER_KLEMME_T$1] }),
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                          ]
                        }
                      ),
                      stabLen > 1e-3 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                        "mesh",
                        {
                          position: [0, isUnterdach ? -(HALTER_KLEMME_H$1 / 2 + stabLen / 2) : (railLift + HALTER_KLEMME_H$1) / 2, 0],
                          castShadow: true,
                          children: [
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_STAB_W$1, stabLen, HALTER_STAB_W$1] }),
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                          ]
                        }
                      )
                    ]
                  },
                  `hld-${side}-${hi}`
                );
              })
            ),
            isUnterdach && showWinkel && [-1, 1].map(
              (side) => winkelZPositions.map((wz, wi) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                "group",
                {
                  position: [side * (segW / 2 - ctx.sparrenBreite), 0, wz],
                  children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                      "mesh",
                      {
                        position: [side * (ctx.sparrenBreite / 2), -WINKEL_T / 2, 0],
                        castShadow: true,
                        children: [
                          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [ctx.sparrenBreite, WINKEL_T, WINKEL_L] }),
                          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                        ]
                      }
                    ),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                      "mesh",
                      {
                        position: [-side * (SCHIENE_W$1 / 2), -0.015, 0],
                        castShadow: true,
                        children: [
                          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [WINKEL_T, WINKEL_W, WINKEL_L] }),
                          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                        ]
                      }
                    )
                  ]
                },
                `wkl-${side}-${wi}`
              ))
            ),
            !isKassette && oeffnung > 0 && stoffSchraeg > 0.01 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              StoffMesh$1,
              {
                stoffBreite: isUnterdach ? segW - 2 * railInner - SCHIENE_W$1 * 2 - 0.02 : segW - SCHIENE_W$1 * 2 - 0.02,
                yCenter: isUnterdach ? -(effectiveRailDrop + SCHIENE_H$1 / 2) : railLift + SCHIENE_H$1 / 2,
                stoffStartZ,
                stoffSchraeg,
                effektiveTiefe,
                material: stoffMaterial
              },
              `stoff-${si}`
            ),
            !isKassette && oeffnung > 0 && stoffSchraeg > 0.01 && (() => {
              const auslaufBreite = segW - (isUnterdach ? 2 * railInner : 0) - SCHIENE_W$1 * 2;
              return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                "group",
                {
                  position: [
                    0,
                    isUnterdach ? railCenterY : railLift + SCHIENE_H$1 / 2,
                    auslaufZ + AUSLAUF_T$1 / 2
                  ],
                  children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, children: [
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                        "boxGeometry",
                        {
                          args: [auslaufBreite, AUSLAUF_H$1, AUSLAUF_T$1]
                        }
                      ),
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                    ] }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                      "mesh",
                      {
                        position: [0, 0, -AUSLAUF_T$1 / 2],
                        rotation: [0, 0, Math.PI / 2],
                        castShadow: true,
                        children: [
                          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                            "cylinderGeometry",
                            {
                              args: [AUSLAUF_RUND_R$1, AUSLAUF_RUND_R$1, auslaufBreite, 16]
                            }
                          ),
                          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                        ]
                      }
                    )
                  ]
                }
              );
            })()
          ] }, si);
        }) })
      ]
    }
  );
}
const markisePropsSchema = {
  markiseTyp: { type: "radioGroup", label: "Typ (0=Aufdach, 1=Unterdach, 3=Kassette)", options: [
    { value: "0", label: "Aufdach" },
    { value: "1", label: "Unterdach" },
    { value: "3", label: "Kassette (Integriert)" }
  ] },
  tiefe: { type: "expression", label: "Ausfahrlänge / Fallhöhe (m, 0=auto)" },
  oeffnungsgrad: { type: "expression", label: "Öffnungsgrad (0–1)" },
  maxBreite: { type: "expression", label: "Max. Segmentbreite – Auf/Unterdach (m, 0=kein Limit)" },
  kastenArt: { type: "radioGroup", label: "Kastenart (0=Rund, 1=Eckig, 2=Ohne)", options: [
    { value: "0", label: "Rund" },
    { value: "1", label: "Eckig" },
    { value: "2", label: "Ohne" }
  ] },
  halterungen: { type: "radioGroup", label: "Halterungen (0=Nein, 1=Ja)", options: [
    { value: "0", label: "Nein" },
    { value: "1", label: "Ja" }
  ] },
  schienenAbstand: { type: "expression", label: "Schienenabstand / Wandabstand (m, 0=Standard)" },
  winkel: { type: "expression", label: "Winkelkonsolen – Unterdach (0=Nein, 1=Ja)" },
  kassettenDurchmesser: { type: "expression", label: "Kassettendurchmesser – Aufdach (m, 0=Std)" },
  kastenBreite: { type: "expression", label: "Kastenbreite – Aufdach (m, 0=Std)" },
  kastenHoehe: { type: "expression", label: "Kastenhoehe – Aufdach (m, 0=Std)" }
};
const markiseDynamicModel = {
  type: "veranda-markise",
  label: "Markise",
  description: "Beschattung – Auf-/Unterdach-/Senkrecht-/Kassettenmarkise",
  defaultProps: {
    markiseTyp: { expression: "0" },
    tiefe: { expression: "0" },
    maxBreite: { expression: "0" },
    oeffnungsgrad: { expression: "1" },
    kastenArt: { expression: "0" },
    schienenAbstand: { expression: "0" },
    halterungen: { expression: "1" },
    kassettenDurchmesser: { expression: "0" },
    kastenBreite: { expression: "0" },
    kastenHoehe: { expression: "0" },
    winkel: { expression: "0" }
  },
  propsDialog: markisePropsSchema,
  component: MarkiseModel,
  materials: ["profil", "stoff"],
  disabledForAR: false,
  requiredLicense: "Pro"
};

const KASSETTE_R = 0.065;
const SCHIENE_W = 0.025;
const SCHIENE_H = 0.05;
const SCHIENE_BOTTOM_H = 0.02;
const FUEHRUNG_T = 5e-3;
const HALTER_KLEMME_W = 0.02;
const HALTER_KLEMME_H = 8e-3;
const HALTER_KLEMME_T = 0.05;
const HALTER_STAB_W = 0.01;
const AUSLAUF_H = 0.012;
const AUSLAUF_T = 0.05;
const AUSLAUF_RUND_R = 6e-3;
const KEIL_FRAME_SW = 0.06;
const StoffMesh = ({ stoffBreite, yCenter, stoffStartZ, stoffSchraeg, effektiveTiefe, stoffDicke, material }) => {
  const geo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const durchhang = Math.min(0.025, effektiveTiefe * 8e-3);
    const shape = createMarkiseStoffShape(stoffSchraeg, durchhang, stoffDicke);
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, { depth: stoffBreite, bevelEnabled: false });
  }, [stoffSchraeg, effektiveTiefe, stoffBreite, stoffDicke]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      position: [-stoffBreite / 2, yCenter, stoffStartZ],
      rotation: [0, Math.PI / 2, 0],
      geometry: geo,
      receiveShadow: true,
      castShadow: true,
      name: "stoff",
      renderOrder: 1,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, materialType: "physical", side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, opacity: 1, depthWrite: true })
    }
  );
};
function SenkrechtMarkiseModel(props) {
  const tier = useLicenseTier();
  if (!hasLicense(tier, "Pro")) return null;
  const {
    tiefe = 0,
    oeffnungsgrad = 1,
    kastenArt = 0,
    schienenAbstand = 0,
    halterungen = 1,
    kassettenDurchmesser = 0,
    kastenBreite = 0,
    kastenHoehe = 0,
    anbringung = 2,
    mitKeil = 1,
    wandSeite: _ws,
    segmentIndex: _si = 0,
    segmentAnzahl: _sa = 0,
    stoffDicke = 0,
    schienenBreite = 0,
    schienentiefe = 0,
    materials = {}
  } = props;
  const wsStr = exprVal(_ws);
  const siStr = exprVal(_si);
  const saStr = exprVal(_sa);
  const segmentAnzahl = saStr !== "" ? Number(saStr) : 0;
  const segmentIndex = siStr !== "" ? Number(siStr) : 0;
  const kastenArtN = Number(kastenArt);
  const halterungenN = Number(halterungen);
  const anbringungN = Number(anbringung);
  const stoffDicke_sk = Number(stoffDicke) > 0 ? Number(stoffDicke) : 3e-3;
  const schienenBreite_sk = Number(schienenBreite) > 0 ? Number(schienenBreite) : SCHIENE_W;
  const schienentiefe_sk = Number(schienentiefe) > 0 ? Number(schienentiefe) : SCHIENE_H;
  const ctx = useVerandaGeometry();
  const bgeo = useBeschattungGeometry();
  const { shadingMode } = useSceneMode();
  const wandSeiteFromCtx = useWandSeite();
  const wandInfo = useWandInfo();
  const wandSeiteCtx = wsStr !== "" ? Number(wsStr) : wandSeiteFromCtx;
  const oeffnung = shadingMode ? 1 : Math.max(0, Math.min(1, oeffnungsgrad));
  const profilMaterial = materials.profil;
  const stoffMaterial = materials.stoff;
  const wandGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcWandGeometry(
      wandSeiteCtx,
      0,
      0,
      ctx.width,
      ctx.depth,
      ctx.height,
      ctx.dachneigung,
      ctx.pfostenBreite,
      ctx.pfostenTiefe,
      ctx.sparrenHoehe,
      ctx.pfette,
      ctx.pfettenBreite,
      ctx.dachVorsprung,
      ctx.sparrenAuflage,
      ctx.schwelle,
      ctx.schwelleBreite,
      ctx.schwelleHoehe,
      segmentIndex,
      ctx.pfostenAnzahlVorne,
      ctx.pfostenAnzahlHinten,
      ctx.isQubus,
      segmentAnzahl,
      ctx.rinnenHoehe ?? 0.08
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      wandSeiteCtx,
      ctx.width,
      ctx.depth,
      ctx.height,
      ctx.dachneigung,
      ctx.pfostenBreite,
      ctx.pfostenTiefe,
      ctx.sparrenHoehe,
      ctx.pfette,
      ctx.pfettenBreite,
      ctx.dachVorsprung,
      ctx.sparrenAuflage,
      ctx.schwelle,
      ctx.schwelleBreite,
      ctx.schwelleHoehe,
      segmentIndex,
      ctx.pfostenAnzahlVorne,
      ctx.pfostenAnzahlHinten,
      ctx.isQubus,
      segmentAnzahl,
      ctx.rinnenHoehe
    ]
  );
  const keilAbschnittCtx = wandInfo.keilAbschnitt[wandSeiteCtx] ?? 0;
  const isSideCtx = wandSeiteCtx === 0 || wandSeiteCtx === 1;
  const keilReduction = Number(mitKeil) === 1 && keilAbschnittCtx > 0 && isSideCtx ? keilAbschnittCtx + KEIL_FRAME_SW : 0;
  const ssHoeheFromCtx = wandInfo.sichtschutzHoehe[wandSeiteCtx]?.[segmentIndex] ?? 0;
  const isSide = wandSeiteCtx === 0 || wandSeiteCtx === 1;
  const isFront = wandSeiteCtx === 2;
  const isBack = wandSeiteCtx === 3;
  const freeWidth = wandGeo.wandBreite;
  const markiseWidth = freeWidth;
  const hasPfette = Number(ctx.pfette) === 1;
  const postHalfDepth = isSide ? ctx.pfostenBreite / 2 : isBack && hasPfette ? ctx.pfettenBreite / 2 : ctx.pfostenTiefe / 2;
  let wallSurfaceZ = 0;
  if (anbringungN === 1) {
    wallSurfaceZ = isSide ? postHalfDepth : -postHalfDepth;
  } else if (anbringungN === 2) {
    wallSurfaceZ = isSide ? postHalfDepth : -postHalfDepth;
  }
  const effectivePosZ = wandGeo.posZ;
  const railSign = -1;
  const railAbstand = Number(schienenAbstand);
  const yFlip = anbringungN === 1 ? -1 : 1;
  const ySign = (isSide ? -railSign : railSign) * yFlip;
  const kassetteR_sk = kassettenDurchmesser > 0 ? kassettenDurchmesser / 2 : KASSETTE_R;
  const baseHeight = isFront ? wandGeo.zoneHoeheVorne : isBack ? bgeo.ySparrenUKHinten : ctx.isQubus ? wandGeo.zoneHoeheVorne : bgeo.ySparrenUKVorne;
  const kassetteTopY = baseHeight - keilReduction;
  const maxFall = Math.max(0, wandGeo.zoneHoeheVorne - keilReduction - ssHoeheFromCtx);
  const gesamtFall = tiefe > 0 ? Math.min(tiefe, maxFall) : maxFall;
  const effFall = gesamtFall * oeffnung;
  const kastenW_sk = kastenBreite > 0 ? kastenBreite : kassetteR_sk * 2;
  const kastenH_sk = Math.min(kastenHoehe > 0 ? kastenHoehe : kassetteR_sk * 2, gesamtFall);
  const halfZ_sk = gesamtFall / 2;
  const kassetteZ_sk = halfZ_sk - kassetteR_sk;
  const kassetteZ_eck_sk = halfZ_sk - kastenH_sk / 2;
  const rollR_sk = kastenArtN === 2 ? kassetteR_sk * (0.3 + 0.7 * (1 - oeffnung)) : kassetteR_sk;
  const stoffStartZ_sk = kastenArtN === 1 ? halfZ_sk - kastenH_sk : halfZ_sk - kassetteR_sk - rollR_sk;
  const stoffSchraeg_sk = kastenArtN === 1 ? Math.max(0, effFall - kastenH_sk) : Math.max(0, effFall - kassetteR_sk - rollR_sk);
  const auslaufZ_sk = stoffStartZ_sk - stoffSchraeg_sk;
  const railLength_sk = kastenArtN === 1 ? Math.max(0, gesamtFall - kastenH_sk - SCHIENE_W) : gesamtFall - kassetteR_sk - SCHIENE_W;
  const railCenterZ_sk = kastenArtN === 1 ? (SCHIENE_W - kastenH_sk) / 2 : -(kassetteR_sk + SCHIENE_W) / 2;
  const groupY_sk = kassetteTopY - halfZ_sk;
  const isZwischen = anbringungN === 0;
  const isInnen = anbringungN === 2;
  const railLift_sk = isZwischen || isInnen ? 0 : railAbstand;
  const railY_sk = isZwischen || isInnen ? 0 : ySign * (railLift_sk + schienentiefe_sk / 2);
  const railBotY_sk = isZwischen || isInnen ? 0 : ySign * (SCHIENE_BOTTOM_H / 2);
  const kassetteY_sk = isZwischen ? isSide ? kassetteR_sk - postHalfDepth : 0 : isInnen ? 0 : ySign * kassetteR_sk;
  const kassetteYEc_sk = isZwischen ? isSide ? kastenW_sk / 2 - postHalfDepth : 0 : isInnen ? 0 : ySign * (kastenW_sk / 2);
  const klemmeWandY_sk = ySign * (railLift_sk + HALTER_KLEMME_H / 2);
  const klemmeSchY_sk = ySign * (HALTER_KLEMME_H / 2);
  const stabLen_sk = railLift_sk - HALTER_KLEMME_H;
  const stabY_sk = ySign * ((railLift_sk + HALTER_KLEMME_H) / 2);
  const showHalterSk = halterungenN === 1 && anbringungN === 1;
  const schieneOuterX = markiseWidth / 2;
  const stoffBr_sk = markiseWidth - schienenBreite_sk * 2 - 5e-3;
  const backHz_sk = halfZ_sk - kassetteR_sk * 2 - 0.02;
  const frontHz_sk = -halfZ_sk + 0.04;
  const halterZsSk = [backHz_sk, frontHz_sk];
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "group",
    {
      position: [wandGeo.posX, 0, effectivePosZ],
      rotation: [0, wandGeo.rotY, 0],
      userData: { modelId: props.id },
      name: props.name,
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, groupY_sk, wallSurfaceZ], rotation: [-Math.PI / 2, 0, 0], children: [
          kastenArtN === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, kassetteYEc_sk, kassetteZ_eck_sk], castShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [markiseWidth, kastenW_sk, kastenH_sk] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
          ] }),
          kastenArtN !== 1 && kastenArtN !== 2 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, kassetteY_sk, kassetteZ_sk], rotation: [0, 0, Math.PI / 2], castShadow: true, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [kassetteR_sk, kassetteR_sk, markiseWidth, 32] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
            ] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, kassetteY_sk / 2, kassetteZ_sk], castShadow: true, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [markiseWidth, kassetteR_sk, kassetteR_sk * 2] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
            ] })
          ] }),
          kastenArtN === 2 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, kassetteY_sk, kassetteZ_sk], rotation: [0, 0, Math.PI / 2], castShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [rollR_sk, rollR_sk, markiseWidth, 32] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: stoffMaterial })
          ] }),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [side * (schieneOuterX - schienenBreite_sk / 2), railY_sk, railCenterZ_sk],
              castShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [schienenBreite_sk, schienentiefe_sk, railLength_sk] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
              ]
            },
            `rail-${side}`
          )),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [side * (schieneOuterX - schienenBreite_sk / 2), railBotY_sk, railCenterZ_sk],
              castShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [schienenBreite_sk, SCHIENE_BOTTOM_H, railLength_sk] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
              ]
            },
            `rail-bot-${side}`
          )),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [side * (schieneOuterX - schienenBreite_sk - FUEHRUNG_T / 2), railY_sk, railCenterZ_sk],
              castShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FUEHRUNG_T, schienenBreite_sk, oeffnung > 0 ? railLength_sk : 0.01] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
              ]
            },
            `guide-${side}`
          )),
          showHalterSk && [-1, 1].map(
            (side) => halterZsSk.map((hz, hi) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "group",
              {
                position: [side * (schieneOuterX - SCHIENE_W / 2), 0, hz],
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, klemmeWandY_sk, 0], castShadow: true, children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W, HALTER_KLEMME_H, HALTER_KLEMME_T] }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                  ] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, klemmeSchY_sk, 0], castShadow: true, children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W, HALTER_KLEMME_H, HALTER_KLEMME_T] }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                  ] }),
                  stabLen_sk > 1e-3 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, stabY_sk, 0], castShadow: true, children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_STAB_W, stabLen_sk, HALTER_STAB_W] }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                  ] })
                ]
              },
              `hld-${side}-${hi}`
            ))
          ),
          oeffnung > 0 && stoffSchraeg_sk > 0.01 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            StoffMesh,
            {
              stoffBreite: stoffBr_sk,
              yCenter: railY_sk,
              stoffStartZ: stoffStartZ_sk,
              stoffSchraeg: stoffSchraeg_sk,
              effektiveTiefe: effFall,
              stoffDicke: stoffDicke_sk,
              material: stoffMaterial
            }
          ),
          oeffnung > 0 && stoffSchraeg_sk > 0.01 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, railY_sk, auslaufZ_sk + AUSLAUF_T / 2], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [stoffBr_sk, AUSLAUF_H, AUSLAUF_T] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
            ] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, -AUSLAUF_T / 2], rotation: [0, 0, Math.PI / 2], castShadow: true, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [AUSLAUF_RUND_R, AUSLAUF_RUND_R, stoffBr_sk, 16] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
            ] })
          ] })
        ] })
      ]
    }
  );
}
const senkrechtMarkisePropsSchema = {
  tiefe: { type: "expression", label: "Fallhöhe (m, 0=auto)" },
  oeffnungsgrad: { type: "expression", label: "Öffnungsgrad (0–1)" },
  kastenArt: { type: "radioGroup", label: "Kastenart (0=Rund, 1=Eckig, 2=Ohne)", options: [
    { value: "0", label: "Rund" },
    { value: "1", label: "Eckig" },
    { value: "2", label: "Ohne" }
  ] },
  schienenAbstand: { type: "expression", label: "Wandabstand Schienen (m, 0=Standard)" },
  halterungen: { type: "radioGroup", label: "Halterungen (0=Nein, 1=Ja)", options: [
    { value: "0", label: "Nein" },
    { value: "1", label: "Ja" }
  ] },
  kassettenDurchmesser: { type: "expression", label: "Kassettendurchmesser (m, 0=Std)" },
  kastenBreite: { type: "expression", label: "Kastenbreite (m, 0=Std)" },
  kastenHoehe: { type: "expression", label: "Kastenhoehe (m, 0=Std)" },
  anbringung: { type: "radioGroup", label: "Anbringung (0=Zwischen, 1=Außen, 2=Innen)", options: [
    { value: "0", label: "Zwischen" },
    { value: "1", label: "Außen" },
    { value: "2", label: "Innen" }
  ] },
  mitKeil: { type: "expression", label: "Keil berücksichtigen (0=Nein, 1=Ja)" },
  stoffDicke: { type: "expression", label: "Stoff-Dicke (m, 0=Std 0.003)" },
  schienenBreite: { type: "expression", label: "Schienen-Breite (m, 0=Std 0.025)" },
  schienentiefe: { type: "expression", label: "Schienen-Tiefe (m, 0=Std 0.05)" }
};
const senkrechtMarkiseDynamicModel = {
  type: "veranda-senkrecht-markise",
  label: "Senkrecht-Markise",
  description: "Senkrecht-Markise – als Kind-Slot eines Wand-Modells (veranda-slot-senkrecht-markise)",
  defaultProps: {
    tiefe: { expression: "0" },
    oeffnungsgrad: { expression: "1" },
    kastenArt: { expression: "0" },
    schienenAbstand: { expression: "0" },
    halterungen: { expression: "1" },
    kassettenDurchmesser: { expression: "0" },
    kastenBreite: { expression: "0" },
    kastenHoehe: { expression: "0" },
    anbringung: { expression: "2" },
    mitKeil: { expression: "1" },
    stoffDicke: { expression: "0" },
    schienenBreite: { expression: "0" },
    schienentiefe: { expression: "0" }
  },
  propsDialog: senkrechtMarkisePropsSchema,
  component: SenkrechtMarkiseModel,
  materials: ["profil", "stoff"],
  disabledForAR: false,
  requiredLicense: "Pro"
};

function createBeschattungUnterdachModel(config) {
  const { VariantContent } = config;
  function BeschattungModel(props) {
    const tier = useLicenseTier();
    if (config.requiredLicense && !hasLicense(tier, config.requiredLicense)) return null;
    const tiefe = Number(exprVal(props.tiefe) || 2);
    const opacity = Number(exprVal(props.opacity) || 0.8);
    const oeffnungsgrad = Number(exprVal(props.oeffnungsgrad) || 1);
    const {
      materials = {},
      position,
      rotation,
      scale
    } = props;
    const parent = useVerandaGeometry();
    const sparrenBreite = parent.sparrenBreite;
    const farbeHex = config.fallbackStoffFarbe ?? "#f5f0e6";
    const kassetteHex = "#808080";
    const { shadingMode } = useSceneMode();
    const oeffnung = shadingMode ? 1 : Math.max(0, Math.min(1, oeffnungsgrad));
    const gestellMaterial = materials.profil;
    const stoffMaterial = materials.stoff;
    if (gestellMaterial) gestellMaterial.name = "profil";
    if (stoffMaterial) stoffMaterial.name = "stoff";
    const geo = useBeschattungGeometry();
    const stoffDicke = Math.max(
      1e-3,
      Number(exprVal(props.stoffDicke) || 3e-3)
    );
    const maxBreite = Math.max(
      0,
      Number(exprVal(props.maxBreite) || 0)
    );
    const isOver = config.placement === "over";
    const beschattungTiefe = Math.min(
      tiefe,
      isOver ? geo.zHintenAufdach - geo.zVorne : geo.sparrenTiefeUnterdach
    );
    const effektiveTiefe = beschattungTiefe * oeffnung;
    let pivotY;
    let pivotZ;
    if (isOver) {
      const distFromFront = geo.zHintenAufdach - geo.zVorne;
      const tanAlpha = (geo.yAufdachHinten - geo.yAufdachVorne) / geo.sparrenTiefe;
      pivotY = geo.yAufdachVorne + distFromFront * tanAlpha;
      pivotZ = geo.zHintenAufdach;
    } else {
      pivotY = geo.sparrenTiefe > 0 ? geo.yUnterdachVorne + (geo.yUnterdachHinten - geo.yUnterdachVorne) * (geo.sparrenTiefeUnterdach / geo.sparrenTiefe) : geo.yUnterdachHinten;
      pivotZ = geo.zHintenUnterdach;
    }
    const neigungRad = geo.neigungRad;
    const montage = Number(exprVal(props.montage) || -1);
    const hideLaengsprofile = montage >= 0;
    const ctx = {
      geo,
      beschattungTiefe,
      effektiveTiefe,
      oeffnung,
      farbeHex,
      kassetteHex,
      opacity,
      sparrenBreite,
      stoffDicke,
      maxBreite,
      gestellMaterial,
      stoffMaterial,
      shadingMode
    };
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "group",
      {
        position,
        rotation,
        scale,
        userData: { modelId: props.id },
        name: props.name,
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "group",
          {
            position: [0, pivotY, pivotZ],
            rotation: [-neigungRad, 0, 0],
            children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, 0, -beschattungTiefe / 2], children: [
              !config.hideGestell && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                Gestell,
                {
                  width: geo.querbalkenBreite,
                  tiefe: beschattungTiefe,
                  sparrenPositions: geo.sparrenPositions,
                  sparrenBreite,
                  kassetteHex,
                  dachneigungRad: 0,
                  material: gestellMaterial,
                  hideLaengsprofile
                }
              ),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                VariantContent,
                {
                  ctx,
                  allProps: props
                }
              )
            ] })
          }
        )
      }
    );
  }
  return {
    type: config.type,
    label: config.label,
    description: config.description,
    defaultProps: {
      width: { expression: "1" },
      height: { expression: "1" },
      depth: { expression: "1" },
      ...config.defaultProps
    },
    propsDialog: { _base: { type: "basic" }, ...config.propsDialog },
    component: BeschattungModel,
    materials: ["profil", "stoff"],
    disabledForAR: false,
    requiredLicense: config.requiredLicense
  };
}

function createPlisseeStoffGeo(effektiveTiefe, innerWidth, segs, faltHoehe) {
  const segLen = effektiveTiefe / segs;
  const positions = [];
  const uvs = [];
  const indices = [];
  const profile = [];
  profile.push({ z: 0, y: 0 });
  for (let i = 0; i < segs; i++) {
    const yPeak = i % 2 === 0 ? faltHoehe : -faltHoehe;
    profile.push({ z: (i + 0.5) * segLen, y: yPeak });
    profile.push({ z: (i + 1) * segLen, y: 0 });
  }
  for (let pi = 0; pi < profile.length; pi++) {
    const { z, y } = profile[pi];
    const uvZ = z / effektiveTiefe;
    positions.push(0, y, -z);
    uvs.push(0, uvZ);
    positions.push(innerWidth, y, -z);
    uvs.push(1, uvZ);
  }
  for (let pi = 0; pi < profile.length - 1; pi++) {
    const b = pi * 2;
    indices.push(b, b + 1, b + 2);
    indices.push(b + 1, b + 3, b + 2);
  }
  const geo = new veranda_mf_2_plugin__loadShare__three__loadShare__.BufferGeometry();
  geo.setAttribute("position", new veranda_mf_2_plugin__loadShare__three__loadShare__.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new veranda_mf_2_plugin__loadShare__three__loadShare__.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}
function PlisseeContent({ ctx, allProps }) {
  const {
    geo,
    beschattungTiefe,
    effektiveTiefe,
    oeffnung,
    farbeHex,
    kassetteHex,
    opacity,
    gestellMaterial,
    stoffMaterial
  } = ctx;
  const { sparrenHoehe } = useVerandaGeometry();
  const yOffset = sparrenHoehe / 2;
  const plisseeSegmente = allProps.plisseeSegmente ?? 20;
  const anzahlFelder = Math.max(0, Math.floor(Number(allProps.anzahlFelder ?? 0)));
  const effectivePanelGaps = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (anzahlFelder === 0) {
      return geo.panelGaps;
    }
    const feldBreite = geo.querbalkenBreite / anzahlFelder;
    return Array.from({ length: anzahlFelder }, (_, i) => ({
      centerX: -geo.querbalkenBreite / 2 + feldBreite * (i + 0.5),
      panelWidth: feldBreite * 0.95
      // 5% Abstand zwischen Feldern
    }));
  }, [anzahlFelder, geo.panelGaps, geo.querbalkenBreite]);
  const plisseeGeometries = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (oeffnung <= 0) return [];
    const segs = Math.max(4, Math.round(plisseeSegmente));
    const segLen = effektiveTiefe / segs;
    const halfFoldLen = beschattungTiefe / (2 * segs);
    const halfSegLen = segLen / 2;
    const faltHoehe = Math.min(0.03, Math.sqrt(Math.max(0, halfFoldLen ** 2 - halfSegLen ** 2)));
    return effectivePanelGaps.map((gap) => {
      const innerWidth = gap.panelWidth;
      return createPlisseeStoffGeo(effektiveTiefe, innerWidth, segs, faltHoehe);
    });
  }, [plisseeSegmente, effektiveTiefe, beschattungTiefe, oeffnung, effectivePanelGaps]);
  const drahtPositionen = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => effectivePanelGaps.flatMap((gap) => [-1, 0, 1].map((side) => [
      gap.centerX + side * (gap.panelWidth * 0.33),
      yOffset,
      0
    ])),
    [effectivePanelGaps, yOffset]
  );
  const drahtRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (!drahtRef.current) return;
    const dummy = new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D();
    dummy.rotation.set(Math.PI / 2, 0, 0);
    drahtPositionen.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      drahtRef.current.setMatrixAt(i, dummy.matrix);
    });
    drahtRef.current.instanceMatrix.needsUpdate = true;
    drahtRef.current.computeBoundingSphere();
  }, [drahtPositionen]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    effectivePanelGaps.map((gap, gIdx) => {
      const innerW = gap.panelWidth;
      const geoMesh = plisseeGeometries[gIdx];
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
        "group",
        {
          position: [gap.centerX, yOffset, 0],
          children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [
                  0,
                  0,
                  beschattungTiefe / 2 - 0.03
                ],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "boxGeometry",
                    {
                      args: [gap.panelWidth, 0.04, 0.06]
                    }
                  ),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: gestellMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "meshPhysicalMaterial",
                    {
                      color: kassetteHex,
                      roughness: 0.25,
                      metalness: 0.6,
                      clearcoat: 0.3
                    }
                  ) })
                ]
              }
            ),
            oeffnung > 0 && geoMesh && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              "mesh",
              {
                position: [
                  -innerW / 2,
                  0,
                  beschattungTiefe / 2
                ],
                geometry: geoMesh,
                receiveShadow: true,
                castShadow: true,
                name: "stoff",
                material: stoffMaterial,
                children: !stoffMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "meshPhysicalMaterial",
                  {
                    color: farbeHex,
                    transparent: opacity < 1,
                    opacity,
                    roughness: 0.85,
                    metalness: 0.03,
                    side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
                  }
                )
              }
            ),
            oeffnung > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.RoundedBox,
              {
                args: [gap.panelWidth - 2e-3, 6e-3, 0.012],
                radius: 15e-4,
                smoothness: 3,
                position: [
                  0,
                  0,
                  beschattungTiefe / 2 - effektiveTiefe
                ],
                castShadow: true,
                children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: gestellMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "meshPhysicalMaterial",
                  {
                    color: kassetteHex,
                    roughness: 0.12,
                    metalness: 0.75,
                    clearcoat: 0.9,
                    clearcoatRoughness: 0.05
                  }
                ) })
              }
            )
          ]
        },
        `plissee-panel-${gIdx}`
      );
    }),
    drahtPositionen.length > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "instancedMesh",
      {
        ref: drahtRef,
        args: [null, null, drahtPositionen.length],
        castShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "cylinderGeometry",
            {
              args: [7e-4, 7e-4, beschattungTiefe, 6]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "meshPhysicalMaterial",
            {
              color: "#b8b8b8",
              roughness: 0.1,
              metalness: 0.95
            }
          )
        ]
      },
      `draht-pli-${drahtPositionen.length}`
    )
  ] });
}
const plisseePropsSchema = {
  tiefe: { type: "expression", label: "Tiefe (m)" },
  oeffnungsgrad: { type: "expression", label: "Öffnungsgrad (0–1)" },
  plisseeSegmente: { type: "expression", label: "Falt-Segmente (Anzahl, min. 4)" },
  anzahlFelder: { type: "expression", label: "Anzahl Felder (0=auto)" },
  stoffDicke: { type: "expression", label: "Stoffdicke (m)" },
  opacity: { type: "expression", label: "Transparenz (0–1)" }
};
const plisseeDynamicModel = createBeschattungUnterdachModel({
  type: "veranda-plissee",
  label: "Plissee",
  description: "Beschattung – Faltstore mit parametrischen Faltsegmenten",
  defaultProps: {
    tiefe: { expression: "2" },
    opacity: { expression: "0.8" },
    oeffnungsgrad: { expression: "1" },
    plisseeSegmente: { expression: "20" },
    anzahlFelder: { expression: "0" },
    stoffDicke: { expression: "0.003" },
    montage: { expression: "0" }
  },
  hideGestell: true,
  VariantContent: PlisseeContent,
  propsDialog: plisseePropsSchema,
  requiredLicense: "Pro"
});

const { schienenBreite } = BESCHATTUNG_DIMS;
const FUEHRUNGS_W = 0.02;
const QUER_H_PROF = 0.018;
const QUER_Y_POS = -0.03 / 2 - QUER_H_PROF / 2;
function createFabricSegmentGeometry(segmentWidth, fabricHeight, numSegments, extrudeWidth, stoffDicke) {
  const segmentOverlap = segmentWidth * 2e-3;
  const curveDepth = fabricHeight * numSegments;
  const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(
    0,
    -curveDepth,
    -(segmentWidth - segmentOverlap),
    0
  );
  shape.lineTo(-(segmentWidth - segmentOverlap), stoffDicke);
  shape.quadraticCurveTo(
    0,
    -curveDepth + stoffDicke,
    0,
    stoffDicke
  );
  shape.closePath();
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, {
    steps: 1,
    depth: extrudeWidth,
    bevelEnabled: false
  });
}
function createFuehrungsschieneGeo(tiefe) {
  const W = FUEHRUNGS_W;
  const r = 4e-3;
  const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  shape.moveTo(-W / 2, -0.03);
  shape.lineTo(W / 2, -0.03);
  shape.lineTo(W / 2, -r);
  shape.quadraticCurveTo(W / 2, 0, W / 2 - r, 0);
  shape.lineTo(-6e-3, 0);
  shape.quadraticCurveTo(-W / 2, 0, -W / 2, -r);
  shape.lineTo(-W / 2, -0.03);
  shape.closePath();
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, {
    depth: tiefe,
    bevelEnabled: false
  });
}
function createQuerprofilGeo() {
  const H = QUER_H_PROF;
  const D = 0.022;
  const fW = 5e-3;
  const fH = 5e-3;
  const shape = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  shape.moveTo(-D / 2 - fW, 0);
  shape.lineTo(D / 2 + fW, 0);
  shape.lineTo(D / 2 + fW, fH);
  shape.lineTo(D / 2, fH);
  shape.lineTo(D / 2, H);
  shape.lineTo(-D / 2, H);
  shape.lineTo(-D / 2, fH);
  shape.lineTo(-D / 2 - fW, fH);
  shape.closePath();
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(shape, {
    depth: 1,
    // wird beim Mesh per scale.x gesetzt
    bevelEnabled: false
  });
}
const QUER_GEO = createQuerprofilGeo();
const StoffPanel = ({
  innerW,
  beschattungTiefe,
  singleWidth,
  numSegments,
  fabricHeight,
  stoffDicke,
  farbeHex,
  kassetteHex,
  opacity,
  gestellMaterial,
  stoffMaterial
}) => {
  const segGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => createFabricSegmentGeometry(
      singleWidth,
      fabricHeight,
      numSegments,
      Math.max(0.01, innerW),
      stoffDicke
    ),
    [singleWidth, fabricHeight, numSegments, innerW, stoffDicke]
  );
  const profilMat = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: gestellMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "meshPhysicalMaterial",
    {
      color: kassetteHex,
      roughness: 0.25,
      metalness: 0.7,
      clearcoat: 0.3
    }
  ) });
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "mesh",
      {
        position: [-innerW / 2, QUER_Y_POS, beschattungTiefe / 2],
        scale: [1, 1, innerW],
        rotation: [0, Math.PI / 2, 0],
        geometry: QUER_GEO,
        castShadow: true,
        children: profilMat
      }
    ),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "mesh",
      {
        position: [
          -innerW / 2,
          QUER_Y_POS,
          beschattungTiefe / 2 - singleWidth * numSegments
        ],
        scale: [1, 1, innerW],
        rotation: [0, Math.PI / 2, 0],
        geometry: QUER_GEO,
        castShadow: true,
        children: profilMat
      }
    ),
    Array.from({ length: numSegments }).map((_, idx) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "mesh",
      {
        position: [
          -innerW / 2,
          0,
          beschattungTiefe / 2 - singleWidth * (idx + 1)
        ],
        rotation: [0, Math.PI / 2, 0],
        geometry: segGeo,
        renderOrder: idx + 1,
        receiveShadow: true,
        castShadow: true,
        name: "stoff",
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: stoffMaterial, surface: "stoff", children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshBasicMaterial",
          {
            color: farbeHex,
            transparent: opacity < 1,
            opacity,
            depthWrite: false,
            side: veranda_mf_2_plugin__loadShare__three__loadShare__.FrontSide
          }
        ) })
      },
      `seg-${idx}`
    ))
  ] });
};
function StoffContent({ ctx, allProps }) {
  const {
    geo,
    beschattungTiefe,
    oeffnung,
    farbeHex,
    kassetteHex,
    opacity,
    stoffDicke,
    gestellMaterial,
    stoffMaterial
  } = ctx;
  const montage = Number(allProps.montage ?? 0);
  const zwischensparren = montage === 0;
  const parent = useVerandaGeometry();
  const sparrenHoehe = parent.sparrenHoehe;
  const sparrenBreite = parent.sparrenBreite;
  const innenliegend = Number(parent.sparrenAuflage) === 1;
  const yOffset = zwischensparren && innenliegend ? sparrenHoehe / 2 : 0;
  const anzahlFelder = Math.max(0, Math.floor(Number(allProps.anzahlFelder ?? 0)));
  const effectivePanelGaps = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (anzahlFelder === 0) {
      return geo.panelGaps;
    }
    const feldBreite = geo.querbalkenBreite / anzahlFelder;
    return Array.from({ length: anzahlFelder }, (_, i) => ({
      centerX: -geo.querbalkenBreite / 2 + feldBreite * (i + 0.5),
      panelWidth: feldBreite * 0.95
      // 5% Abstand zwischen Feldern
    }));
  }, [anzahlFelder, geo.panelGaps, geo.querbalkenBreite]);
  const segments = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => zwischensparren ? [] : calcMarkiseSegmente(
      geo.sparrenPositions,
      geo.panelGaps,
      sparrenBreite,
      0
    ),
    [zwischensparren, geo.sparrenPositions, geo.panelGaps, sparrenBreite]
  );
  const segmentLaenge = Math.max(0.01, Number(allProps.segmentLaenge ?? 0.1) || 0.1);
  const numSegments = beschattungTiefe > 0 ? Math.max(2, Math.ceil(beschattungTiefe / segmentLaenge)) : 2;
  const durchhang = Math.max(0, Math.min(1, Number(allProps.durchhang ?? 1)));
  const fabricHeight = (7e-3 - 62e-4 * oeffnung) * durchhang;
  const retractedSingleWidth = 0.03;
  const extendedSingleWidth = beschattungTiefe / numSegments;
  const singleWidth = retractedSingleWidth + (extendedSingleWidth - retractedSingleWidth) * oeffnung;
  const fuehrungsGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => createFuehrungsschieneGeo(beschattungTiefe + 0.012),
    [beschattungTiefe]
  );
  const panelProps = {
    beschattungTiefe,
    singleWidth,
    numSegments,
    fabricHeight,
    stoffDicke,
    farbeHex,
    kassetteHex,
    opacity,
    gestellMaterial,
    stoffMaterial
  };
  const panelPositions = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => zwischensparren ? effectivePanelGaps.map((gap) => ({ x: gap.centerX, innerW: gap.panelWidth - schienenBreite * 2 })) : segments.map((seg) => ({ x: seg.centerX, innerW: seg.width })),
    [zwischensparren, effectivePanelGaps, segments]
  );
  const railPositions = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => panelPositions.flatMap(({ x, innerW }) => [-1, 1].map((side) => [
      x + side * (innerW / 2 + FUEHRUNGS_W / 2),
      yOffset,
      -beschattungTiefe / 2 - 6e-3
    ])),
    [panelPositions, yOffset, beschattungTiefe]
  );
  const railRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (!railRef.current) return;
    const dummy = new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D();
    railPositions.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      railRef.current.setMatrixAt(i, dummy.matrix);
    });
    railRef.current.instanceMatrix.needsUpdate = true;
    railRef.current.computeBoundingSphere();
  }, [railPositions]);
  const panels = zwischensparren ? effectivePanelGaps.map((gap, gIdx) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [gap.centerX, yOffset, 0], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    StoffPanel,
    {
      ...panelProps,
      innerW: gap.panelWidth - schienenBreite * 2
    }
  ) }, `zw-${gIdx}`)) : segments.map((seg, sIdx) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [seg.centerX, yOffset, 0], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    StoffPanel,
    {
      ...panelProps,
      innerW: seg.width
    }
  ) }, `seg-${sIdx}`));
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    panels,
    railPositions.length > 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "instancedMesh",
      {
        ref: railRef,
        args: [fuehrungsGeo, void 0, railPositions.length],
        castShadow: true,
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: gestellMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshPhysicalMaterial",
          {
            color: kassetteHex,
            roughness: 0.25,
            metalness: 0.7,
            clearcoat: 0.3
          }
        ) })
      },
      `stoff-schiene-${railPositions.length}`
    )
  ] });
}
const stoffPropsSchema = {
  tiefe: { type: "expression", label: "Tiefe (m)" },
  oeffnungsgrad: { type: "expression", label: "Öffnungsgrad (0–1)" },
  montage: { type: "expression", label: "Montage (0=Zwischen, 1=Unter)" },
  anzahlFelder: { type: "expression", label: "Anzahl Felder (0=auto)" },
  segmentLaenge: { type: "expression", label: "Segmentlänge (m)" },
  durchhang: { type: "expression", label: "Durchhang (0–1)" },
  stoffDicke: { type: "expression", label: "Stoffdicke (m)" },
  opacity: { type: "expression", label: "Transparenz (0–1)" }
};
const stoffDynamicModel = createBeschattungUnterdachModel({
  type: "veranda-stoff",
  label: "Faltmarkise",
  description: "Beschattung – Faltmarkise mit hängenden Stoffsegmenten",
  defaultProps: {
    tiefe: { expression: "2" },
    opacity: { expression: "1" },
    oeffnungsgrad: { expression: "1" },
    montage: { expression: "0" },
    anzahlFelder: { expression: "0" },
    segmentLaenge: { expression: "0.1" },
    durchhang: { expression: "1" },
    stoffDicke: { expression: "0.003" }
  },
  VariantContent: StoffContent,
  propsDialog: stoffPropsSchema,
  requiredLicense: "Pro"
});

function HighlightPlane(props) {
  const breite = Number(exprVal(props.breite)) || 0;
  const hoehe = Number(exprVal(props.hoehe)) || 0;
  const iconSize = Number(exprVal(props.iconSize)) || 0.15;
  const showIcon = Number(exprVal(props.showIcon) ?? "1") !== 0;
  const segmentIndex = Number(exprVal(props.segmentIndex) ?? "-1");
  const wandSeite = useWandSeite();
  const geo = useWandGeometry(wandSeite, breite, 0, hoehe, segmentIndex);
  const width = geo.wandBreite;
  const hV = geo.zoneHoeheVorne;
  const hH = geo.zoneHoeheHinten;
  const isSide = wandSeite === 0 || wandSeite === 1;
  const isLeft = wandSeite === 0;
  const planGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(-width / 2, 0);
    s.lineTo(width / 2, 0);
    s.lineTo(width / 2, isSide ? isLeft ? hH : hV : Math.min(hV, hH));
    s.lineTo(-width / 2, isSide ? isLeft ? hV : hH : Math.min(hV, hH));
    s.closePath();
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.ShapeGeometry(s);
  }, [width, hV, hH, isSide, isLeft]);
  const iconGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.PlaneGeometry(iconSize, iconSize), [iconSize]);
  const iconTex = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillRect(12, 28, 40, 8);
    ctx.fillRect(28, 12, 8, 40);
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.CanvasTexture(c);
  }, []);
  const iconMat = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.MeshBasicMaterial({
      map: iconTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      toneMapped: false,
      side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
    }),
    [iconTex]
  );
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    planGeo.dispose();
    iconGeo.dispose();
    iconTex.dispose();
    iconMat.dispose();
  }, [planGeo, iconGeo, iconTex, iconMat]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "group",
    {
      position: [geo.posX, geo.zoneGroupY, geo.posZ],
      rotation: [0, geo.rotY, 0],
      userData: { modelId: props.id },
      name: props.name,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { geometry: planGeo, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshBasicMaterial", { side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, transparent: true, opacity: 0, depthWrite: false }) }),
        showIcon && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { geometry: iconGeo, material: iconMat, position: [0, hV / 2, 1e-3] })
      ] })
    }
  );
}
const highlightPlaneDynamicModel = {
  type: "veranda-highlight-plane",
  label: "Highlight Plane",
  description: "Dynamische Highlight-Fläche mit zentriertem + Icon (Wand-Slot)",
  materials: [],
  disabledForAR: true,
  component: HighlightPlane,
  propsDialog: {
    breite: { type: "expression", label: "Breite (0=auto) (m)" },
    hoehe: { type: "expression", label: "Höhe (0=auto) (m)" },
    iconSize: { type: "expression", label: "Icon-Größe (m)" },
    showIcon: { type: "expression", label: "Icon anzeigen (1=Ja, 0=Nein)" }
  },
  defaultProps: {
    breite: { expression: "0" },
    hoehe: { expression: "0" },
    iconSize: { expression: "0.15" },
    showIcon: { expression: "1" }
  }
};

const mountedWhenLoadedHOC = (Original) => (props) => {
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    console.info("[oc.veranda] Plugin geladen");
  }, []);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Original, { ...props });
};

const SlotLayoutContext = React.createContext(null);
let _idCounter = 0;
function useSlotSpace(reg) {
  const ctx = React.useContext(SlotLayoutContext);
  const idRef = React.useRef(null);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  if (idRef.current === null) {
    idRef.current = `slot-space-${++_idCounter}`;
  }
  const id = idRef.current;
  const regRef = React.useRef(reg);
  const hasChanged = regRef.current.priority !== reg.priority || regRef.current.mode !== reg.mode || regRef.current.desiredHeight !== reg.desiredHeight || regRef.current.minHeight !== reg.minHeight || regRef.current.desiredHeightH !== reg.desiredHeightH || regRef.current.minHeightH !== reg.minHeightH;
  if (hasChanged) {
    regRef.current = reg;
  }
  React.useLayoutEffect(() => {
    if (!ctx) return;
    ctx.register({ ...regRef.current, id });
    forceUpdate();
    return () => ctx.unregister(id);
  }, [ctx, id, reg.priority, reg.mode, reg.desiredHeight, reg.minHeight, reg.desiredHeightH, reg.minHeightH]);
  if (!ctx) return null;
  return ctx.getAllocation(id);
}

const VERANDA_SDK_VERSION = "1";
function registerVerandaSdk() {
  if (typeof window === "undefined") return;
  const sdk = {
    version: VERANDA_SDK_VERSION,
    VerandaGeometryContext,
    useVerandaGeometry,
    calcVerandaGeometry,
    calcSlotAnchors,
    calcWandSlotAnchor,
    WandSeiteContext,
    useWandSeite,
    WandInfoContext,
    useWandInfo,
    SlotLayoutContext,
    useSlotSpace,
    SICHTSCHUTZWAND_AUFBAU_SLOTS,
    SICHTSCHUTZWAND_FUELLUNG_SLOT_ID,
    KONSTRUKTION_SLOTS
  };
  window.__VERANDA_SDK__ = sdk;
}

registerVerandaSdk();
const Plugin = {
  id: "oc.veranda.plugin",
  version: "1.0.2",
  viewer: {
    sceneComponents: {
      // "oc.veranda.shadowLighting": shadowLightingSceneComponent,
      OrbitControls: orbitControlsLimitSceneComponent
      // Bounds: seitenteilKameraSceneComponent,
    },
    models: [
      // Root
      sceneEnvironmentDynamicModel,
      konstruktionDynamicModel,
      // Pfosten
      pfostenDynamicModel,
      // Regenrinne
      regenrinneDynamicModel,
      // Eindeckung
      glasEindeckungDynamicModel,
      metallEindeckungDynamicModel,
      lamellenEindeckungDynamicModel,
      solarEindeckungDynamicModel,
      // Beschattung
      markiseDynamicModel,
      plisseeDynamicModel,
      stoffDynamicModel,
      // Wand
      keilDynamicModel,
      rahmenwandDynamicModel,
      schiebetuerDynamicModel,
      shuttersDynamicModel,
      senkrechtMarkiseDynamicModel,
      sichtschutzwandDynamicModel,
      // Highlight
      highlightPlaneDynamicModel,
      //Zubehör
      ledStripeDynamicModel
    ]
  },
  ui: {
    layout: {
      mountedWhenLoaded: {
        hoc: mountedWhenLoadedHOC,
        description: "Veranda Plugin: Init-Log nach vollständigem Laden"
      }
    }
  },
  logic: {
    config: {
      onSaveEvent: {
        description: "Veranda Plugin: Post-Save-Event (Analytics/Webhook)",
        fn: (payload) => {
          console.info("[oc.veranda] save event:", payload.action);
          return payload;
        }
      }
    },
    camera: {
      onSetScreenshotCameras: {
        description: "Veranda Plugin: Screenshot-Kameras filtern",
        fn: (cameras) => cameras
      },
      getScreenshotDimensions: {
        description: "Veranda Plugin: Screenshot-Auflösung",
        fn: (dim) => ({ ...dim, width: 1920, height: 1080 })
      }
    }
  }
};

export { Plugin as default };
