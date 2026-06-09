import { v as veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__, a as index_cjs } from './veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__-YRia8a0_.js';
import { v as veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__ } from './veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__-C_orOWt-.js';
import { v as veranda_mf_2_plugin__loadShare__react__loadShare__, R as React } from './veranda_mf_2_plugin__loadShare__react__loadShare__-CVrN7QH5.js';
import { v as veranda_mf_2_plugin__loadShare__three__loadShare__ } from './veranda_mf_2_plugin__loadShare__three__loadShare__-DpQQB08m.js';
import { v as veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__ } from './veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__-DN29SLAj.js';
import './_commonjsHelpers-B85MJLTf.js';

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
const VERANDA_SLOTS = {
  pfosten: {
    id: "veranda-slot-pfosten",
    name: "Stützstruktur",
    defaultModelId: "veranda-pfosten-eckig"
  },
  eindeckung: {
    id: "veranda-slot-eindeckung",
    name: "Überdachung",
    defaultModelId: "veranda-glas-eindeckung"
  },
  rinne: {
    id: "veranda-slot-rinne",
    name: "Regenrinne",
    defaultModelId: "veranda-regenrinne-kasten"
  },
  beschattung: {
    id: "veranda-slot-beschattung",
    name: "Beschattung",
    defaultModelId: "veranda-unterdachmarkise"
  },
  wandLinks: {
    id: "veranda-slot-wand-links",
    name: "Wand Links",
    defaultModelId: "veranda-wand-keil"
  },
  wandRechts: {
    id: "veranda-slot-wand-rechts",
    name: "Wand Rechts",
    defaultModelId: "veranda-wand-keil"
  },
  wandVorne: {
    id: "veranda-slot-wand-vorne",
    name: "Wand Vorne",
    defaultModelId: "veranda-wand-rahmenwand"
  },
  wandHinten: {
    id: "veranda-slot-wand-hinten",
    name: "Wand Hinten",
    defaultModelId: "veranda-wand-rahmenwand"
  }
};
const QUBUS_SLOTS = {
  stuetzstruktur: {
    id: "qubus-slot-stuetzstruktur",
    name: "Stützstruktur",
    defaultModelId: "veranda-pfosten-eckig"
  },
  ueberdachung: {
    id: "qubus-slot-ueberdachung",
    name: "Überdachung",
    defaultModelId: "veranda-glas-eindeckung"
  },
  beschattung: {
    id: "qubus-slot-beschattung",
    name: "Beschattung",
    defaultModelId: "veranda-plissee"
  },
  wandLinks: {
    id: "qubus-slot-wand-links",
    name: "Wand Links",
    defaultModelId: "veranda-wand-keil"
  },
  wandRechts: {
    id: "qubus-slot-wand-rechts",
    name: "Wand Rechts",
    defaultModelId: "veranda-wand-keil"
  },
  wandVorne: {
    id: "qubus-slot-wand-vorne",
    name: "Wand Vorne",
    defaultModelId: "veranda-wand-rahmenwand"
  },
  wandHinten: {
    id: "qubus-slot-wand-hinten",
    name: "Wand Hinten",
    defaultModelId: "veranda-wand-rahmenwand"
  }
};
const CARPORT_SLOTS = {
  stuetzstruktur: {
    id: "carport-slot-stuetzstruktur",
    name: "Stützstruktur",
    defaultModelId: "veranda-pfosten-eckig"
  },
  ueberdachung: {
    id: "carport-slot-ueberdachung",
    name: "Überdachung",
    defaultModelId: "veranda-glas-eindeckung"
  },
  traeger: {
    id: "carport-slot-traeger",
    name: "Träger (Seite V→H)",
    defaultModelId: "veranda-traeger-eckig"
  },
  beschattung: {
    id: "carport-slot-beschattung",
    name: "Beschattung",
    defaultModelId: "veranda-unterdachmarkise"
  },
  wandLinks: {
    id: "carport-slot-wand-links",
    name: "Wand Links",
    defaultModelId: "veranda-wand-keil"
  },
  wandRechts: {
    id: "carport-slot-wand-rechts",
    name: "Wand Rechts",
    defaultModelId: "veranda-wand-keil"
  },
  wandVorne: {
    id: "carport-slot-wand-vorne",
    name: "Wand Vorne",
    defaultModelId: "veranda-wand-rahmenwand"
  },
  wandHinten: {
    id: "carport-slot-wand-hinten",
    name: "Wand Hinten",
    defaultModelId: "veranda-wand-rahmenwand"
  }
};
const MATERIAL_DEFAULTS = {
  /**
   * Profil-Material (Pfosten, Sparren, Querträger, Regenrinne etc.)
   * Entspricht dem Standard-Material in k3.veranda (MeshPhysicalMaterial).
   */
  profil: { metalness: 0, roughness: 1 },
  /** Metallische Oberfläche (Leisten, Blech) */
  metall: { metalness: 0.6, roughness: 0.25 },
  /** Leisten-Oberfläche */
  leiste: { metalness: 0.5, roughness: 0.3 },
  /** Gummi-Oberfläche */
  gummi: { roughness: 0.9, metalness: 0 }};

const MaterialFallback = ({
  material,
  fallbackColor = DEFAULT_FARBEN.profil,
  children,
  transparent,
  opacity,
  metalness = MATERIAL_DEFAULTS.profil.metalness,
  roughness = MATERIAL_DEFAULTS.profil.roughness,
  side = veranda_mf_2_plugin__loadShare__three__loadShare__.FrontSide,
  depthWrite
}) => {
  const fallbackRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  if (!fallbackRef.current) {
    fallbackRef.current = new veranda_mf_2_plugin__loadShare__three__loadShare__.MeshPhysicalMaterial({
      color: fallbackColor,
      transparent: transparent ?? false,
      opacity: opacity ?? 1,
      metalness,
      roughness,
      side,
      depthWrite: depthWrite ?? true
    });
  }
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    const mat = fallbackRef.current;
    if (!mat) return;
    mat.color.set(fallbackColor);
    if (transparent !== void 0) mat.transparent = transparent;
    if (opacity !== void 0) mat.opacity = opacity;
    mat.metalness = metalness;
    mat.roughness = roughness;
    mat.side = side;
    if (depthWrite !== void 0) mat.depthWrite = depthWrite;
    mat.needsUpdate = true;
  }, [fallbackColor, transparent, opacity, metalness, roughness, side, depthWrite]);
  if (children) {
    if (material) {
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }, material.uuid);
    }
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children });
  }
  const activeMat = material ?? fallbackRef.current;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: activeMat, attach: "material" }, activeMat.uuid);
};

const PfostenEckig = ({
  breite,
  tiefe,
  hoehe,
  material,
  position
}) => {
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.BoxGeometry(breite, hoehe, tiefe),
    [breite, hoehe, tiefe]
  );
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
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.CylinderGeometry(radius, radius, hoehe, 32),
    [radius, hoehe]
  );
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
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
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
  }, [breite, tiefe, hoehe]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      geometry,
      position,
      rotation: [-Math.PI / 2, 0, 0],
      castShadow: true,
      receiveShadow: true,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material })
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
  FLANKENWAND: 5,
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
function createFantasyShape(w, h, t, dachneigung) {
  const angleRad = dachneigung * Math.PI / 180;
  const slantOffset = w * Math.tan(angleRad);
  return new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape().moveTo(0, 0).lineTo(-w, 0).lineTo(-w + slantOffset, h).lineTo(-w + t + slantOffset, h - t).lineTo(-w + t, t).lineTo(-t, t).lineTo(-t, h - t).lineTo(0, h - t).lineTo(0, 0);
}

const CAP_DEPTH = 5e-3;
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
  const materialNode = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "meshPhysicalMaterial",
    {
      color: farbeHex,
      metalness: MATERIAL_DEFAULTS.metall.metalness,
      roughness: MATERIAL_DEFAULTS.metall.roughness + 0.05
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
          materialNode
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
          materialNode
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
      curveSegments: 32,
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
      curveSegments: 32,
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
  const shape = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => createFantasyShape(rinnenBreite, rinnenHoehe, wandStaerke, dachneigung),
    [rinnenBreite, rinnenHoehe, wandStaerke, dachneigung]
  );
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    RegenrinneBase,
    {
      bodyShape: shape,
      capShape: shape,
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

function isGlasEindeckung(typ) {
  return typ === "glas" || typ === "polycarbonat";
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
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasPlatte", position, rotation, castShadow: false, receiveShadow: false, material, children: [
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
        side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
        depthWrite: true
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
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position, rotation, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasPlatte", position: [0, dicke / 2 - WAND_DICKE / 2, 0], castShadow: false, receiveShadow: true, material, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [breite, WAND_DICKE, tiefe] }),
      !material && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          transparent: true,
          opacity,
          roughness,
          metalness,
          clearcoat: 0.4,
          clearcoatRoughness: 0.1,
          envMapIntensity,
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
          depthWrite: true
        }
      )
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasPlatte", position: [0, -(dicke / 2 - WAND_DICKE / 2), 0], castShadow: false, receiveShadow: true, material, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [breite, WAND_DICKE, tiefe] }),
      !material && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          transparent: true,
          opacity,
          roughness,
          metalness,
          clearcoat: 0.4,
          clearcoatRoughness: 0.1,
          envMapIntensity,
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
          depthWrite: true
        }
      )
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasPlatte", position: [-breite / 2 + STEG_DICKE / 2, 0, 0], castShadow: false, material, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, innenHoehe, tiefe] }),
      !material && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          roughness,
          metalness,
          envMapIntensity
        }
      )
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasPlatte", position: [breite / 2 - STEG_DICKE / 2, 0, 0], castShadow: false, material, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, innenHoehe, tiefe] }),
      !material && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          roughness,
          metalness,
          envMapIntensity
        }
      )
    ] }),
    stegePositionen.map((x, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasPlatte", position: [x, 0, 0], castShadow: false, material, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, innenHoehe, tiefe] }),
      !material && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          roughness,
          metalness,
          envMapIntensity
        }
      )
    ] }, i))
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
  glasOpacity = 0.2,
  glasRoughness = 0,
  glasMetalness = 0,
  glasEnvMapIntensity = 1,
  polyOpacity = 0.65,
  polyRoughness = 0.3,
  polyMetalness = 0,
  polyEnvMapIntensity = 1,
  polyKammergroesse = 0.05,
  amplitude = 4,
  frequenz = 10,
  material
}) => {
  if (typ === "ohne") return null;
  const qtHinten = quertraegerTiefeHinten ?? quertraegerTiefe;
  const effektiveTiefeRoh = innenliegend ? tiefe - quertraegerTiefe - qtHinten : tiefe;
  const hoeheDiff = hoeheHinten - hoeheVorne;
  const neigung = Math.atan2(hoeheDiff, effektiveTiefeRoh);
  let bottomOffset = 0;
  if (typ === "welle") {
    const amp = amplitude / 200;
    bottomOffset = dicke / 2 + amp;
  } else if (typ === "trapez") {
    bottomOffset = dicke;
  }
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
          opacity: glasOpacity,
          roughness: glasRoughness,
          metalness: glasMetalness,
          envMapIntensity: glasEnvMapIntensity,
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
          opacity: polyOpacity,
          roughness: polyRoughness,
          metalness: polyMetalness,
          envMapIntensity: polyEnvMapIntensity,
          kammerGroesse: polyKammergroesse,
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
  const gummiHoehe = leistenHoehe;
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
            side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
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

const Stirnblech = ({
  stirnblechHoehe,
  stirnblechTiefe,
  farbe,
  anschlussBreite,
  yPos,
  zPos,
  neigung = 0,
  material
}) => {
  const geom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const tanNeig = Math.tan(neigung);
    const yHinten = stirnblechTiefe * tanNeig;
    const profil = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    profil.moveTo(-BLECH_STAERKE, 0);
    profil.lineTo(stirnblechTiefe, yHinten);
    profil.lineTo(stirnblechTiefe, yHinten - BLECH_STAERKE);
    profil.lineTo(0, -BLECH_STAERKE);
    profil.lineTo(0, -stirnblechHoehe);
    profil.lineTo(-BLECH_STAERKE, -stirnblechHoehe);
    profil.closePath();
    const g = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(profil, {
      steps: 1,
      depth: anschlussBreite,
      bevelEnabled: false
    });
    g.translate(0, 0, -anschlussBreite / 2);
    return g;
  }, [stirnblechHoehe, stirnblechTiefe, anschlussBreite, neigung]);
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
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
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
  const gummiGeom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (eindeckungDicke <= 0) return null;
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
  }, [eindeckungDicke, leistenSchraegTiefe]);
  if (!gummiGeom) return null;
  const hDiff = sparrenOKHinten - sparrenOKVorne;
  const neig = Math.atan2(hDiff, effektiveTiefeRoh);
  const yKorrektur = effektiveTiefeRoh > 0 ? (leistenZMitte - glasZOffset) * hDiff / effektiveTiefeRoh : 0;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: sparrenPositionen.map((xPos, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      geometry: gummiGeom,
      position: [
        xPos,
        sparrenOKVorne + hDiff / 2 + yKorrektur,
        leistenZMitte
      ],
      rotation: [-neig, 0, 0],
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: DEFAULT_FARBEN.gummi,
          roughness: MATERIAL_DEFAULTS.gummi.roughness,
          metalness: MATERIAL_DEFAULTS.gummi.metalness
        }
      )
    },
    `gummi-${i}`
  )) });
};

const Glasleisten = ({
  alleSparrenPositionen,
  aussenLinks,
  aussenRechts,
  leistenGeom,
  leistenGeomLinks,
  leistenGeomRechts,
  sparrenOKVorne,
  sparrenOKHinten,
  eindeckungDicke,
  effektiveTiefeRoh,
  glasZOffset,
  leistenZMitte,
  leistenFarbe,
  material
}) => {
  const glasOKVorne = sparrenOKVorne + eindeckungDicke;
  const glasOKHinten = sparrenOKHinten + eindeckungDicke;
  const hDiff = glasOKHinten - glasOKVorne;
  const neig = Math.atan2(hDiff, effektiveTiefeRoh);
  const yKorrektur = effektiveTiefeRoh > 0 ? (leistenZMitte - glasZOffset) * hDiff / effektiveTiefeRoh : 0;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: alleSparrenPositionen.map((xPos, i) => {
    const isLinks = xPos === aussenLinks && alleSparrenPositionen.length > 1;
    const isRechts = xPos === aussenRechts && alleSparrenPositionen.length > 1;
    const geom = isLinks ? leistenGeomLinks : isRechts ? leistenGeomRechts : leistenGeom;
    if (!geom) return null;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "mesh",
      {
        geometry: geom,
        position: [
          xPos,
          glasOKVorne + hDiff / 2 + yKorrektur,
          leistenZMitte
        ],
        rotation: [-neig, 0, 0],
        castShadow: true,
        receiveShadow: true,
        children: material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshPhysicalMaterial",
          {
            color: leistenFarbe,
            metalness: MATERIAL_DEFAULTS.leiste.metalness,
            roughness: MATERIAL_DEFAULTS.leiste.roughness
          }
        )
      },
      `leiste-${i}`
    );
  }) });
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
          roughness: MATERIAL_DEFAULTS.leiste.roughness
        }
      )
    }
  );
};

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

function useLeistenGeometrie(leistenBreite, leistenHoehe, sparrenBreite, eindeckungDicke, leistenRundung, schraegTiefe) {
  const normal = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (leistenBreite <= 0 || leistenHoehe <= 0) return null;
    const profil = leistenProfil(leistenBreite, leistenHoehe, leistenRundung);
    return createExtrudeGeometry(profil, schraegTiefe);
  }, [leistenBreite, leistenHoehe, leistenRundung, schraegTiefe]);
  const links = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (leistenBreite <= 0 || leistenHoehe <= 0) return null;
    const profil = abschlussLeistenProfil(
      leistenBreite,
      leistenHoehe,
      sparrenBreite,
      eindeckungDicke,
      leistenRundung,
      "links"
    );
    return createExtrudeGeometry(profil, schraegTiefe);
  }, [leistenBreite, leistenHoehe, sparrenBreite, eindeckungDicke, leistenRundung, schraegTiefe]);
  const rechts = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (leistenBreite <= 0 || leistenHoehe <= 0) return null;
    const profil = abschlussLeistenProfil(
      leistenBreite,
      leistenHoehe,
      sparrenBreite,
      eindeckungDicke,
      leistenRundung,
      "rechts"
    );
    return createExtrudeGeometry(profil, schraegTiefe);
  }, [leistenBreite, leistenHoehe, sparrenBreite, eindeckungDicke, leistenRundung, schraegTiefe]);
  return { normal, links, rechts };
}

function useGlasPanels(alleSparrenPositionen) {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (alleSparrenPositionen.length < 2) return [];
    const luft = GLAS_PANEL_LUFT;
    const panels = [];
    for (let i = 0; i < alleSparrenPositionen.length - 1; i++) {
      const left = alleSparrenPositionen[i];
      const right = alleSparrenPositionen[i + 1];
      const isFirst = i === 0;
      const isLast = i === alleSparrenPositionen.length - 2;
      const leftEdge = isFirst ? left : left + luft / 2;
      const rightEdge = isLast ? right : right - luft / 2;
      const w = rightEdge - leftEdge;
      if (w > 0) {
        panels.push({ xCenter: (leftEdge + rightEdge) / 2, panelBreite: w });
      }
    }
    return panels;
  }, [alleSparrenPositionen]);
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
  glasOpacity = 0.2,
  glasRoughness = 0,
  glasMetalness = 0,
  glasEnvMapIntensity = 1,
  polyOpacity = 0.65,
  polyRoughness = 0.3,
  polyMetalness = 0,
  polyEnvMapIntensity = 1,
  polyKammergroesse = 0.05,
  amplitude = 38,
  frequenz = 76,
  leistenBreite = 0,
  leistenHoehe = 0,
  leistenFarbe = "#c0c0c0",
  leistenRundung = 0,
  wandanschluss = false,
  wandanschlussHoehe = 0.046,
  wandanschlussTiefe = 0.056,
  wandanschlussFarbe = "#c0c0c0",
  dachVorsprung = 0,
  stirnblech = false,
  stirnblechHoehe = 0.03,
  stirnblechTiefe = 0.04,
  stirnblechFarbe = "#c0c0c0",
  vornAbschlussleiste = false,
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
  const glasPanels = useGlasPanels(sparren.alle);
  const wandanschlussDachSchenkelHoriz = wandanschlussTiefe * Math.cos(geo.glasNeig);
  const leistenHinterkanteZ = wandanschluss ? Math.min(geo.glasHinterkanteZ, gesamtTiefe / 2 - 1e-3 - wandanschlussDachSchenkelHoriz) : geo.glasHinterkanteZ;
  const leistenHorizLen = leistenHinterkanteZ - geo.glasVorderkanteZ;
  const leistenSchraegTiefe = leistenHorizLen > 0 ? leistenHorizLen / Math.cos(geo.glasNeig) : 0;
  const leistenZMitte = (geo.glasVorderkanteZ + leistenHinterkanteZ) / 2;
  const leisten = useLeistenGeometrie(
    leistenBreite,
    leistenHoehe,
    sparrenBreite,
    eindeckungDicke,
    leistenRundung,
    leistenSchraegTiefe
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
    glasOpacity,
    glasRoughness,
    glasMetalness,
    glasEnvMapIntensity,
    polyOpacity,
    polyRoughness,
    polyMetalness,
    polyEnvMapIntensity,
    polyKammergroesse,
    material: platteMaterial
  };
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { name: "dachflaeche", children: [
    sparren.gefiltert.map((xPos, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Sparren,
      {
        breite: sparrenBreite,
        hoehe: sparrenHoehe,
        tiefe: geo.sparrenTiefe,
        hoeheDiff: geo.hoeheDiff,
        material: sparrenMat,
        position: [xPos, geo.sparrenY, geo.sparrenZ]
      },
      `sparren-${i}`
    )),
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
        sparrenOKVorne: geo.sparrenOKVorne,
        sparrenOKHinten: geo.sparrenOKHinten,
        eindeckungDicke,
        effektiveTiefeRoh: geo.effektiveTiefeRoh,
        glasZOffset: geo.glasZOffset,
        leistenZMitte,
        leistenFarbe,
        material: leistenMat
      }
    ),
    wandanschluss && istGlas && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Wandanschluss,
      {
        wandanschlussHoehe,
        wandanschlussTiefe,
        farbe: wandanschlussFarbe,
        leistenHoehe,
        glasNeig: geo.glasNeig,
        anschlussBreite: querbalkenBreite,
        zPos: gesamtTiefe / 2 - 1e-3,
        yPos: geo.sparrenOKHinten + eindeckungDicke + leistenHoehe,
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

const Seitenabschluss = ({
  seitenabschlussHoehe,
  seitenabschlussTiefe,
  farbe,
  laenge,
  xPos,
  yPos,
  zPos,
  neigung,
  seite
}) => {
  const geom = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const inDir = seite === "rechts" ? -1 : 1;
    const outDir = seite === "rechts" ? 1 : -1;
    const t = seitenabschlussTiefe;
    const h = seitenabschlussHoehe;
    const s = BLECH_STAERKE;
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
      depth: laenge,
      bevelEnabled: false
    });
    g.translate(0, 0, -laenge / 2);
    return g;
  }, [seitenabschlussHoehe, seitenabschlussTiefe, laenge, seite]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "mesh",
    {
      geometry: geom,
      position: [xPos, yPos, zPos],
      rotation: [-neigung, 0, 0],
      castShadow: true,
      receiveShadow: true,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: farbe,
          metalness: MATERIAL_DEFAULTS.metall.metalness,
          roughness: MATERIAL_DEFAULTS.metall.roughness,
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
        }
      )
    }
  );
};

const Box = ({
  args,
  position,
  rotation,
  material,
  children
}) => {
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.BoxGeometry(...args),
    [args[0], args[1], args[2]]
  );
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

function exprVal(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "expression" in v) {
    return String(v.expression ?? "");
  }
  return String(v ?? "");
}
function berechnePositionen(gesamtBreite, anzahl) {
  const n = anzahl != null ? Math.round(Number(anzahl)) : 2;
  if (n <= 0) return [];
  if (n === 1) return [0];
  const positionen = [];
  const abstand = gesamtBreite / (n - 1);
  for (let i = 0; i < n; i++) {
    positionen.push(-gesamtBreite / 2 + i * abstand);
  }
  return positionen;
}

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
  quertraegerHoehe,
  quertraegerHoeheHinten,
  quertraegerTiefe,
  dachVorsprung = 0,
  material
}) => {
  const effectiveQuertraegerHoeheHinten = quertraegerHoeheHinten ?? quertraegerHoehe;
  const steigung = gesamtTiefe > 0 ? (hoeheHinten - hoeheVorne) / gesamtTiefe : 0;
  const hoeheAnPfosten = hoeheVorne + steigung * dachVorsprung;
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
  const zHinten = gesamtTiefe / 2 - pfostenTiefe / 2;
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
        breite: pfostenBreite,
        tiefe: pfostenTiefe,
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

const DEFAULT$1 = {
  glasDicke: 0,
  glasLeistenHoehe: 0,
  wandanschlussAktiv: false,
  wandanschlussTiefe: 0,
  sparrenAnzahl: 0,
  setEindeckungInfo: () => {
  }
};
const EindeckungInfoContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT$1);
function useEindeckungInfo() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(EindeckungInfoContext);
}

const DEFAULT_GEOMETRY = {
  width: 4,
  depth: 3,
  height: 2.5,
  dachneigung: 0,
  dachVorsprung: 0,
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
  keilAbschnitt: [0, 0, 0, 0],
  setKeilAbschnitt: () => {
  }
};
const KeilInfoContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT);
function useKeilInfo() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(KeilInfoContext);
}

const LIGHT_USER_DATA_KEY = "oc.veranda.shadowLight.v1";
function SceneShadowLight() {
  const { gl, scene, invalidate } = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useThree();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    if (scene.children.some((c) => c.userData[LIGHT_USER_DATA_KEY])) {
      return;
    }
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = veranda_mf_2_plugin__loadShare__three__loadShare__.PCFSoftShadowMap;
    const light = new veranda_mf_2_plugin__loadShare__three__loadShare__.DirectionalLight(16777215, 2);
    light.position.set(5, 30, -10);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 80;
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;
    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    light.shadow.bias = -1e-3;
    light.userData[LIGHT_USER_DATA_KEY] = true;
    scene.add(light);
    scene.add(light.target);
    invalidate();
    return () => {
      scene.remove(light);
      scene.remove(light.target);
      light.shadow.map?.dispose();
      light.dispose();
    };
  }, [gl, scene, invalidate]);
  return null;
}
const shadowLightingSceneComponent = {
  hoc: (Original) => (props) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Original, { ...props }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {})
  ] }),
  description: "Schattenlicht für Veranda-Szene (DirectionalLight + PCFSoftShadowMap)"
};

function VerandaModel(props) {
  const {
    // Position (skalare Props)
    posX = 0,
    posY = 0,
    posZ = 0,
    // Rotation (skalare Props, Grad)
    rotX = 0,
    rotY = 0,
    rotZ = 0,
    // Grundmaße (in Metern)
    width = 4,
    height = 2.5,
    // Höhe HINTEN (an der Wand)
    depth = 3,
    // Pfosten-Querschnitt (für Schwelle/Pfette/Dach-Berechnungen)
    pfostenBreite = 0.1,
    pfostenTiefe = 0.1,
    // Dach / Sparren
    dachneigung = 0,
    dachVorsprung = 0,
    sparrenAnzahl = 6,
    sparrenAuflage = 0,
    sparrenBreite = 0.06,
    sparrenHoehe = 0.12,
    // Balken aussen (links + rechts, unabhängig von Eindeckungs-Sparren)
    balkenAussenBreite = 0.06,
    balkenAussenHoehe = 0.12,
    // Schwelle (vorne)
    schwelle = 1,
    schwelleBreite = 0.1,
    schwelleHoehe = 0.06,
    // Staticträger (auf Pfosten, tragend)
    staticTraeger = 0,
    staticTraegerBreite = 0.1,
    staticTraegerHoehe = 0.08,
    // Pfette (hinten)
    pfette = 1,
    pfettenBreite = 0.06,
    pfettenHoehe = 0.08,
    // K3 System
    materials = {},
    scale,
    slots
  } = props;
  const DEG2RAD = Math.PI / 180;
  const position = [
    Number(posX),
    Number(posY),
    Number(posZ)
  ];
  const rotation = [
    Number(rotX) * DEG2RAD,
    Number(rotY) * DEG2RAD,
    Number(rotZ) * DEG2RAD
  ];
  const profilMaterial = materials.profil;
  const { hoeheHinten, hoeheVorne } = calcVerandaGeometry(
    depth,
    dachneigung,
    height
  );
  const auflageTyp = Number(sparrenAuflage) === 1 ? "innenliegend" : "aufliegend";
  const pfostenSlot = slots?.[VERANDA_SLOTS.pfosten.id];
  const eindeckungSlot = slots?.[VERANDA_SLOTS.eindeckung.id];
  const rinneSlot = slots?.[VERANDA_SLOTS.rinne.id];
  const beschattungSlot = slots?.[VERANDA_SLOTS.beschattung.id];
  const wandLinksSlot = slots?.[VERANDA_SLOTS.wandLinks.id];
  const wandRechtsSlot = slots?.[VERANDA_SLOTS.wandRechts.id];
  const wandVorneSlot = slots?.[VERANDA_SLOTS.wandVorne.id];
  const wandHintenSlot = slots?.[VERANDA_SLOTS.wandHinten.id];
  const rinnenHoeheFromSlot = Number(rinneSlot?.[0]?.props?.rinnenHoehe) || 0.08;
  const quertraegerTiefeVorne = Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const quertraegerTiefeHinten = Number(pfette) === 1 ? pfettenBreite : 0;
  const steigung = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  const schwelleOK = auflageTyp === "innenliegend" ? hoeheVorne + steigung * quertraegerTiefeVorne : hoeheVorne + balkenAussenHoehe;
  const schwelleY = schwelleOK - schwelleHoehe / 2;
  let staticTraegerOK;
  if (dachVorsprung < 1e-3) {
    staticTraegerOK = schwelleOK - rinnenHoeheFromSlot;
  } else if (auflageTyp === "innenliegend") {
    staticTraegerOK = hoeheVorne + steigung * dachVorsprung - sparrenHoehe;
  } else {
    staticTraegerOK = hoeheVorne + steigung * dachVorsprung;
  }
  const staticTraegerY = staticTraegerOK - Number(staticTraegerHoehe) / 2;
  const parentGeometry = {
    // Grundmaße
    width,
    depth,
    height,
    dachneigung,
    dachVorsprung,
    // Pfosten
    pfostenBreite,
    pfostenTiefe,
    // Sparren
    sparrenAnzahl,
    sparrenBreite,
    sparrenHoehe,
    sparrenAuflage,
    // Schwelle / Pfette
    schwelle,
    schwelleBreite,
    schwelleHoehe,
    // Staticträger
    staticTraeger,
    staticTraegerBreite,
    staticTraegerHoehe,
    pfette,
    pfettenBreite,
    pfettenHoehe,
    rinnenHoehe: rinnenHoeheFromSlot
  };
  const renderSlotInstance = (instance, fallbackKey) => {
    const Comp = instance.component;
    if (!Comp) return null;
    const p = instance.props ?? {};
    const propsKey = JSON.stringify(
      p,
      (k, v) => k === "materials" || k === "slots" ? void 0 : v
    );
    const key = `${fallbackKey}|${propsKey}`;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Comp,
      {
        ...p,
        id: instance.model?.id,
        modelAction: instance.modelAction,
        slots: instance.slots
      },
      key
    );
  };
  const [glasDicke, setGlasDicke] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(0);
  const [glasLeistenHoehe, setGlasLeistenHoehe] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(0);
  const [wandanschlussAktiv, setWandanschlussAktiv] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(false);
  const [wandanschlussTiefe, setWandanschlussTiefe] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(0);
  const [eindeckungSparrenAnzahl, setEindeckungSparrenAnzahl] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(0);
  const setEindeckungInfo = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((d, lh, wa, wt, sa) => {
    setGlasDicke(d);
    setGlasLeistenHoehe(lh);
    setWandanschlussAktiv(wa);
    setWandanschlussTiefe(wt);
    setEindeckungSparrenAnzahl(sa);
  }, []);
  const [keilAbschnitt, setKeilAbschnittState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState([0, 0, 0, 0]);
  const setKeilAbschnitt = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((seite, value) => {
    setKeilAbschnittState((prev) => {
      if (prev[seite] === value) return prev;
      const next = [...prev];
      next[seite] = value;
      return next;
    });
  }, []);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(KeilInfoContext.Provider, { value: { keilAbschnitt, setKeilAbschnitt }, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(EindeckungInfoContext.Provider, { value: { glasDicke, glasLeistenHoehe, wandanschlussAktiv, wandanschlussTiefe, sparrenAnzahl: eindeckungSparrenAnzahl, setEindeckungInfo }, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(VerandaGeometryContext.Provider, { value: parentGeometry, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "group",
      {
        position,
        rotation,
        scale,
        userData: { modelId: props.id },
        name: props.name,
        children: [
          pfostenSlot?.map(
            (instance, idx) => renderSlotInstance(instance, `pfosten-${idx}`)
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            Dachflaeche,
            {
              sparrenAnzahl,
              sparrenBreite: balkenAussenBreite,
              sparrenHoehe: balkenAussenHoehe,
              gesamtBreite: width,
              querbalkenBreite: width + pfostenBreite,
              gesamtTiefe: depth,
              hoeheVorne,
              hoeheHinten,
              quertraegerHoehe: 0,
              quertraegerTiefe: quertraegerTiefeVorne,
              quertraegerTiefeHinten,
              auflage: auflageTyp,
              material: profilMaterial,
              sparrenModus: "nurAussen",
              eindeckung: "ohne",
              dachVorsprung: 0
            }
          ),
          Number(schwelle) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [
                0,
                schwelleY,
                schwelleBreite >= pfostenTiefe ? -depth / 2 + schwelleBreite / 2 : -depth / 2 + pfostenTiefe - schwelleBreite / 2
              ],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "boxGeometry",
                  {
                    args: [
                      width + pfostenBreite,
                      schwelleHoehe,
                      schwelleBreite
                    ]
                  }
                ),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: DEFAULT_FARBEN.holz
                  }
                )
              ]
            }
          ),
          Number(staticTraeger) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [
                0,
                staticTraegerY,
                Number(staticTraegerBreite) >= pfostenTiefe ? -depth / 2 + dachVorsprung + Number(staticTraegerBreite) / 2 : -depth / 2 + dachVorsprung + pfostenTiefe - Number(staticTraegerBreite) / 2
              ],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "boxGeometry",
                  {
                    args: [
                      width + pfostenBreite,
                      Number(staticTraegerHoehe),
                      Number(staticTraegerBreite)
                    ]
                  }
                ),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  MaterialFallback,
                  {
                    material: profilMaterial,
                    fallbackColor: DEFAULT_FARBEN.holz
                  }
                )
              ]
            }
          ),
          Number(pfette) === 1 && (() => {
            const neigungsKorrektur = steigung * pfettenBreite;
            return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [
                  0,
                  hoeheHinten - neigungsKorrektur - pfettenHoehe / 2,
                  depth / 2 - pfettenBreite / 2
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "boxGeometry",
                    {
                      args: [
                        width + pfostenBreite,
                        pfettenHoehe,
                        pfettenBreite
                      ]
                    }
                  ),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    MaterialFallback,
                    {
                      material: profilMaterial,
                      fallbackColor: DEFAULT_FARBEN.holz
                    }
                  )
                ]
              }
            );
          })(),
          eindeckungSlot?.map(
            (instance, idx) => renderSlotInstance(instance, `eindeckung-${idx}`)
          ),
          rinneSlot?.map(
            (instance, idx) => renderSlotInstance(instance, `rinne-${idx}`)
          ),
          beschattungSlot?.map(
            (instance, idx) => renderSlotInstance(instance, `beschattung-${idx}`)
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 1, children: wandLinksSlot?.map(
            (inst, i) => renderSlotInstance(inst, `wand-links-${i}`)
          ) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 0, children: wandRechtsSlot?.map(
            (inst, i) => renderSlotInstance(inst, `wand-rechts-${i}`)
          ) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 2, children: wandVorneSlot?.map(
            (inst, i) => renderSlotInstance(inst, `wand-vorne-${i}`)
          ) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 3, children: wandHintenSlot?.map(
            (inst, i) => renderSlotInstance(inst, `wand-hinten-${i}`)
          ) }),
          "            "
        ]
      }
    )
  ] }) }) });
}
const verandaPropsSchema = {
  // Position & Drehung
  posX: { type: "expression", label: "X (m)" },
  posY: { type: "expression", label: "Y (m)" },
  posZ: { type: "expression", label: "Z (m)" },
  rotX: { type: "expression", label: "Rot X (°)" },
  rotY: { type: "expression", label: "Rot Y (°)" },
  rotZ: { type: "expression", label: "Rot Z (°)" },
  // Abmessungen
  width: { type: "expression", label: "Breite (m)" },
  height: { type: "expression", label: "Höhe hinten (m)" },
  depth: { type: "expression", label: "Tiefe (m)" },
  dachneigung: { type: "expression", label: "Dachneigung (°)" },
  dachVorsprung: { type: "expression", label: "Dachvorsprung (m)" },
  // Sparren
  sparrenAuflage: { type: "radioGroup", label: "Sparrenauflage", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  // Balken außen
  balkenAussenBreite: { type: "expression", label: "Balken außen Breite (m)" },
  balkenAussenHoehe: { type: "expression", label: "Balken außen Höhe (m)" },
  // Schwelle
  schwelle: { type: "expression", label: "Schwelle aktiv (0/1)" },
  schwelleBreite: { type: "expression", label: "Schwelle Breite (m)" },
  schwelleHoehe: { type: "expression", label: "Schwelle Höhe (m)" },
  // Staticträger
  staticTraeger: { type: "expression", label: "Staticträger aktiv (0/1)" },
  staticTraegerBreite: { type: "expression", label: "Staticträger Breite (m)" },
  staticTraegerHoehe: { type: "expression", label: "Staticträger Höhe (m)" },
  // Pfette
  pfette: { type: "expression", label: "Pfette aktiv (0/1)" },
  pfettenBreite: { type: "expression", label: "Pfette Breite (m)" },
  pfettenHoehe: { type: "expression", label: "Pfette Höhe (m)" }
};
const verandaDynamicModel = {
  type: "veranda",
  label: "Veranda",
  description: "Parametrische Veranda mit Slots für Pfosten, Eindeckung, Rinne und Beschattung",
  defaultProps: {
    slotDefinitions: Object.values(VERANDA_SLOTS),
    // Position (skalare Props)
    posX: { expression: "0" },
    posY: { expression: "0" },
    posZ: { expression: "0" },
    // Rotation (Grad)
    rotX: { expression: "0" },
    rotY: { expression: "0" },
    rotZ: { expression: "0" },
    // Grundmaße (in Metern)
    width: { expression: "4" },
    height: { expression: "2.5" },
    depth: { expression: "3" },
    dachneigung: { expression: "0" },
    dachVorsprung: { expression: "0" },
    // Pfosten-Querschnitt
    pfostenBreite: { expression: "0.1" },
    pfostenTiefe: { expression: "0.1" },
    // Dach / Sparren
    sparrenAnzahl: { expression: "6" },
    sparrenBreite: { expression: "0.06" },
    sparrenHoehe: { expression: "0.12" },
    sparrenAuflage: "0",
    // Balken aussen
    balkenAussenBreite: { expression: "0.06" },
    balkenAussenHoehe: { expression: "0.12" },
    // Schwelle
    schwelle: { expression: "1" },
    schwelleBreite: { expression: "0.1" },
    schwelleHoehe: { expression: "0.06" },
    // Staticträger
    staticTraeger: { expression: "0" },
    staticTraegerBreite: { expression: "0.1" },
    staticTraegerHoehe: { expression: "0.08" },
    // Pfette
    pfette: { expression: "1" },
    pfettenBreite: { expression: "0.06" },
    pfettenHoehe: { expression: "0.08" }
  },
  propsDialog: verandaPropsSchema,
  component: VerandaModel,
  materials: ["profil"],
  disabledForAR: false
};

function QubusBar({
  width,
  depth,
  hoeheVorne,
  hoeheHinten,
  rahmenBreite,
  rahmenHoehe,
  material
}) {
  const lengthX = width + rahmenBreite;
  const lengthZ = depth;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, hoeheVorne - rahmenHoehe / 2, -depth / 2], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [lengthX, rahmenHoehe, rahmenBreite] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: DEFAULT_FARBEN.profil })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, hoeheHinten - rahmenHoehe / 2, depth / 2], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [lengthX, rahmenHoehe, rahmenBreite] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: DEFAULT_FARBEN.profil })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [
      -width / 2 - rahmenBreite / 2 + rahmenBreite / 2,
      (hoeheVorne + hoeheHinten) / 2 - rahmenHoehe / 2,
      0
    ], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [rahmenBreite, rahmenHoehe, lengthZ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: DEFAULT_FARBEN.profil })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [
      width / 2 + rahmenBreite / 2 - rahmenBreite / 2,
      (hoeheVorne + hoeheHinten) / 2 - rahmenHoehe / 2,
      0
    ], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [rahmenBreite, rahmenHoehe, lengthZ] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: DEFAULT_FARBEN.profil })
    ] })
  ] });
}
function QubusModel(props) {
  const {
    posX = 0,
    posY = 0,
    posZ = 0,
    rotX = 0,
    rotY = 0,
    rotZ = 0,
    width = 4,
    height = 2.5,
    depth = 3,
    rahmenBreite = 0.1,
    rahmenHoehe = 0.1,
    pfostenBreite = 0.1,
    pfostenTiefe = 0.1,
    dachneigung = 0,
    sparrenAnzahl = 4,
    sparrenBreite = 0.05,
    sparrenHoehe = 0.05,
    sparrenAuflage = 0,
    ledStripe = 0,
    materials = {},
    scale,
    slots
  } = props;
  const DEG2RAD = Math.PI / 180;
  const position = [Number(posX), Number(posY), Number(posZ)];
  const rotation = [
    Number(rotX) * DEG2RAD,
    Number(rotY) * DEG2RAD,
    Number(rotZ) * DEG2RAD
  ];
  const profilMaterial = materials.profil;
  const { hoeheHinten, hoeheVorne } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcVerandaGeometry(depth, dachneigung, height),
    [depth, dachneigung, height]
  );
  const stuetzstrukturSlot = slots?.[QUBUS_SLOTS.stuetzstruktur.id];
  const ueberdachungSlot = slots?.[QUBUS_SLOTS.ueberdachung.id];
  const beschattungSlot = slots?.[QUBUS_SLOTS.beschattung.id];
  const wandLinksSlot = slots?.[QUBUS_SLOTS.wandLinks.id];
  const wandRechtsSlot = slots?.[QUBUS_SLOTS.wandRechts.id];
  const wandVorneSlot = slots?.[QUBUS_SLOTS.wandVorne.id];
  const wandHintenSlot = slots?.[QUBUS_SLOTS.wandHinten.id];
  const parentGeometry = {
    width,
    depth,
    height,
    dachneigung,
    dachVorsprung: 0,
    pfostenBreite,
    pfostenTiefe,
    sparrenAnzahl,
    sparrenBreite,
    sparrenHoehe,
    sparrenAuflage,
    schwelle: 0,
    schwelleBreite: 0,
    schwelleHoehe: 0,
    pfette: 0,
    pfettenBreite: 0,
    pfettenHoehe: 0,
    isQubus: true,
    attachment: "wall",
    hasLedStripe: Boolean(ledStripe),
    ledColor: "#ffeeaa"
  };
  const renderSlot = (inst, key) => {
    const Comp = inst.component;
    if (!Comp) return null;
    const k = inst.modelAction?.id ?? inst.modelAction?.unique ?? key;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Comp,
      {
        ...inst.props ?? {},
        id: inst.model?.id,
        modelAction: inst.modelAction,
        slots: inst.slots
      },
      k
    );
  };
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(VerandaGeometryContext.Provider, { value: parentGeometry, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "group",
      {
        position,
        rotation,
        scale,
        userData: { modelId: props.id },
        name: props.name,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            QubusBar,
            {
              width,
              depth,
              hoeheVorne,
              hoeheHinten,
              rahmenBreite,
              rahmenHoehe,
              material: profilMaterial
            }
          ),
          stuetzstrukturSlot?.map((inst, i) => renderSlot(inst, `stuetz-${i}`)),
          ueberdachungSlot?.map((inst, i) => renderSlot(inst, `ueberdach-${i}`)),
          beschattungSlot?.map((inst, i) => renderSlot(inst, `beschat-${i}`)),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 1, children: wandLinksSlot?.map((inst, i) => renderSlot(inst, `wand-l-${i}`)) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 0, children: wandRechtsSlot?.map((inst, i) => renderSlot(inst, `wand-r-${i}`)) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 2, children: wandVorneSlot?.map((inst, i) => renderSlot(inst, `wand-v-${i}`)) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 3, children: wandHintenSlot?.map((inst, i) => renderSlot(inst, `wand-h-${i}`)) })
        ]
      }
    )
  ] });
}
const qubusPropsSchema = {
  posX: { type: "expression", label: "X (m)" },
  posY: { type: "expression", label: "Y (m)" },
  posZ: { type: "expression", label: "Z (m)" },
  rotX: { type: "expression", label: "Rot X (°)" },
  rotY: { type: "expression", label: "Rot Y (°)" },
  rotZ: { type: "expression", label: "Rot Z (°)" },
  width: { type: "expression", label: "Breite (m)" },
  height: { type: "expression", label: "Höhe (m)" },
  depth: { type: "expression", label: "Tiefe (m)" },
  dachneigung: { type: "expression", label: "Dachneigung (°)" },
  rahmenBreite: { type: "expression", label: "Rahmen Breite (m)" },
  rahmenHoehe: { type: "expression", label: "Rahmen Höhe (m)" },
  pfostenBreite: { type: "expression", label: "Pfosten Breite (m)" },
  pfostenTiefe: { type: "expression", label: "Pfosten Tiefe (m)" },
  sparrenAnzahl: { type: "expression", label: "Sparren Anzahl" },
  sparrenBreite: { type: "expression", label: "Sparren Breite (m)" },
  sparrenHoehe: { type: "expression", label: "Sparren Höhe (m)" },
  sparrenAuflage: { type: "radioGroup", label: "Auflage", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  ledStripe: { type: "radioGroup", label: "LED-Stripe aktiv", options: [{ value: "0", label: "Nein" }, { value: "1", label: "Ja" }] }
};
const qubusDynamicModel = {
  type: "qubus",
  label: "Qubus",
  description: "Parametrisches Qubus-Modell mit Rahmen, Sparren und Eindeckung",
  defaultProps: {
    slotDefinitions: Object.values(QUBUS_SLOTS),
    posX: { expression: "0" },
    posY: { expression: "0" },
    posZ: { expression: "0" },
    rotX: { expression: "0" },
    rotY: { expression: "0" },
    rotZ: { expression: "0" },
    width: { expression: "4" },
    height: { expression: "2.5" },
    depth: { expression: "3" },
    rahmenBreite: { expression: "0.1" },
    rahmenHoehe: { expression: "0.1" },
    pfostenBreite: { expression: "0.1" },
    pfostenTiefe: { expression: "0.1" },
    dachneigung: { expression: "0" },
    sparrenAnzahl: { expression: "4" },
    sparrenBreite: { expression: "0.05" },
    sparrenHoehe: { expression: "0.05" },
    sparrenAuflage: "0",
    ledStripe: "0"
  },
  propsDialog: qubusPropsSchema,
  component: QubusModel,
  materials: ["profil"],
  disabledForAR: false
};

function CarportModel(props) {
  const {
    posX = 0,
    posY = 0,
    posZ = 0,
    rotX = 0,
    rotY = 0,
    rotZ = 0,
    width = 5,
    height = 2.4,
    depth = 5,
    pfostenBreite = 0.1,
    pfostenTiefe = 0.1,
    dachneigung = 3,
    dachVorsprung = 0.2,
    sparrenAnzahl = 8,
    sparrenBreite = 0.06,
    sparrenHoehe = 0.12,
    sparrenAuflage = 0,
    schwelle = 0,
    schwelleBreite = 0.1,
    schwelleHoehe = 0.06,
    pfette = 1,
    pfettenBreite = 0.06,
    pfettenHoehe = 0.08,
    traegerAnzahl = 2,
    traegerBreite = 0.1,
    traegerHoehe = 0.12,
    materials = {},
    scale,
    slots
  } = props;
  const DEG2RAD = Math.PI / 180;
  const position = [Number(posX), Number(posY), Number(posZ)];
  const rotation = [
    Number(rotX) * DEG2RAD,
    Number(rotY) * DEG2RAD,
    Number(rotZ) * DEG2RAD
  ];
  const profilMaterial = materials.profil;
  const { hoeheHinten, hoeheVorne } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcVerandaGeometry(depth, dachneigung, height),
    [depth, dachneigung, height]
  );
  const hoeheAnPfosten = calcHoeheAnPosition(hoeheVorne, hoeheHinten, depth, dachVorsprung);
  const auflageTyp = sparrenAuflage === 1 ? "innenliegend" : "aufliegend";
  const stuetzstrukturSlot = slots?.[CARPORT_SLOTS.stuetzstruktur.id];
  const ueberdachungSlot = slots?.[CARPORT_SLOTS.ueberdachung.id];
  const traegerSlot = slots?.[CARPORT_SLOTS.traeger.id];
  const beschattungSlot = slots?.[CARPORT_SLOTS.beschattung.id];
  const wandLinksSlot = slots?.[CARPORT_SLOTS.wandLinks.id];
  const wandRechtsSlot = slots?.[CARPORT_SLOTS.wandRechts.id];
  const wandVorneSlot = slots?.[CARPORT_SLOTS.wandVorne.id];
  const wandHintenSlot = slots?.[CARPORT_SLOTS.wandHinten.id];
  const parentGeometry = {
    width,
    depth,
    height,
    dachneigung,
    dachVorsprung,
    pfostenBreite,
    pfostenTiefe,
    sparrenAnzahl,
    sparrenBreite,
    sparrenHoehe,
    sparrenAuflage,
    schwelle,
    schwelleBreite,
    schwelleHoehe,
    pfette,
    pfettenBreite,
    pfettenHoehe,
    isQubus: false,
    attachment: "free"
  };
  const renderSlot = (inst, key) => {
    const Comp = inst.component;
    if (!Comp) return null;
    const k = inst.modelAction?.id ?? inst.modelAction?.unique ?? key;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Comp,
      {
        ...inst.props ?? {},
        id: inst.model?.id,
        modelAction: inst.modelAction,
        slots: inst.slots
      },
      k
    );
  };
  const traegerPositionen = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const n = Number(traegerAnzahl);
    if (n <= 0) return [];
    if (n === 1) return [0];
    const abstand = width / (n - 1);
    return Array.from({ length: n }, (_, i) => -width / 2 + i * abstand);
  }, [traegerAnzahl, width]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(VerandaGeometryContext.Provider, { value: parentGeometry, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "group",
      {
        position,
        rotation,
        scale,
        userData: { modelId: props.id },
        name: props.name,
        children: [
          stuetzstrukturSlot?.map((inst, i) => renderSlot(inst, `stuetz-${i}`)),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            Dachflaeche,
            {
              sparrenAnzahl,
              sparrenBreite,
              sparrenHoehe,
              gesamtBreite: width,
              querbalkenBreite: width + pfostenBreite,
              gesamtTiefe: depth,
              hoeheVorne,
              hoeheHinten,
              quertraegerHoehe: 0,
              quertraegerTiefe: 0,
              quertraegerTiefeHinten: Number(pfette) === 1 ? Math.max(pfettenBreite, pfostenTiefe) : 0,
              auflage: auflageTyp,
              material: profilMaterial,
              sparrenModus: "nurAussen",
              eindeckung: "ohne",
              dachVorsprung
            }
          ),
          traegerSlot?.map((inst, i) => renderSlot(inst, `traeger-${i}`)),
          !traegerSlot?.length && traegerPositionen.map((xPos, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [xPos, hoeheAnPfosten - traegerHoehe / 2, 0],
              castShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [traegerBreite, traegerHoehe, depth] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: DEFAULT_FARBEN.profil })
              ]
            },
            `traeger-${i}`
          )),
          Number(pfette) === 1 && (() => {
            const steigung = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
            return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, hoeheHinten - steigung * pfettenBreite - pfettenHoehe / 2, depth / 2 - pfettenBreite / 2], castShadow: true, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [width + pfostenBreite, pfettenHoehe, pfettenBreite] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: DEFAULT_FARBEN.holz })
            ] });
          })(),
          ueberdachungSlot?.map((inst, i) => renderSlot(inst, `ueberdach-${i}`)),
          beschattungSlot?.map((inst, i) => renderSlot(inst, `beschat-${i}`)),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 1, children: wandLinksSlot?.map((inst, i) => renderSlot(inst, `wand-l-${i}`)) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 0, children: wandRechtsSlot?.map((inst, i) => renderSlot(inst, `wand-r-${i}`)) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 2, children: wandVorneSlot?.map((inst, i) => renderSlot(inst, `wand-v-${i}`)) }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 3, children: wandHintenSlot?.map((inst, i) => renderSlot(inst, `wand-h-${i}`)) })
        ]
      }
    )
  ] });
}
const carportPropsSchema = {
  posX: { type: "expression", label: "X (m)" },
  posY: { type: "expression", label: "Y (m)" },
  posZ: { type: "expression", label: "Z (m)" },
  rotX: { type: "expression", label: "Rot X (°)" },
  rotY: { type: "expression", label: "Rot Y (°)" },
  rotZ: { type: "expression", label: "Rot Z (°)" },
  width: { type: "expression", label: "Breite (m)" },
  height: { type: "expression", label: "Höhe (m)" },
  depth: { type: "expression", label: "Tiefe (m)" },
  dachneigung: { type: "expression", label: "Dachneigung (°)" },
  dachVorsprung: { type: "expression", label: "Dachvorsprung (m)" },
  traegerAnzahl: { type: "expression", label: "Träger Anzahl" },
  traegerBreite: { type: "expression", label: "Träger Breite (m)" },
  traegerHoehe: { type: "expression", label: "Träger Höhe (m)" },
  sparrenAnzahl: { type: "expression", label: "Sparren Anzahl" },
  sparrenBreite: { type: "expression", label: "Sparren Breite (m)" },
  sparrenHoehe: { type: "expression", label: "Sparren Höhe (m)" },
  sparrenAuflage: { type: "radioGroup", label: "Auflage", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  pfette: { type: "expression", label: "Pfette aktiv (0/1)" },
  pfettenBreite: { type: "expression", label: "Pfette Breite (m)" },
  pfettenHoehe: { type: "expression", label: "Pfette Höhe (m)" }
};
const carportDynamicModel = {
  type: "carport",
  label: "Carport",
  description: "Parametrisches Carport-Modell mit Pfosten, Trägern und Eindeckung",
  defaultProps: {
    slotDefinitions: Object.values(CARPORT_SLOTS),
    posX: { expression: "0" },
    posY: { expression: "0" },
    posZ: { expression: "0" },
    rotX: { expression: "0" },
    rotY: { expression: "0" },
    rotZ: { expression: "0" },
    width: { expression: "5" },
    height: { expression: "2.4" },
    depth: { expression: "5" },
    pfostenBreite: { expression: "0.1" },
    pfostenTiefe: { expression: "0.1" },
    dachneigung: { expression: "3" },
    dachVorsprung: { expression: "0.2" },
    sparrenAnzahl: { expression: "8" },
    sparrenBreite: { expression: "0.06" },
    sparrenHoehe: { expression: "0.12" },
    sparrenAuflage: "0",
    schwelle: { expression: "0" },
    schwelleBreite: { expression: "0.1" },
    schwelleHoehe: { expression: "0.06" },
    pfette: { expression: "1" },
    pfettenBreite: { expression: "0.06" },
    pfettenHoehe: { expression: "0.08" },
    traegerAnzahl: { expression: "2" },
    traegerBreite: { expression: "0.1" },
    traegerHoehe: { expression: "0.12" }
  },
  propsDialog: carportPropsSchema,
  component: CarportModel,
  materials: ["profil"],
  disabledForAR: false
};

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("@react-three/drei", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "*"
    }}}));
    const exportModule = await res.then(factory => factory());
    var veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__ = exportModule;

const HDR_URL = "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/kloppenheim_06_1k.hdr";
function GlasEnvMap() {
  const { scene } = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useThree();
  const envMap = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.useEnvironment({ files: HDR_URL });
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    if (!envMap) return;
    scene.environment = envMap;
  }, [envMap, scene]);
  return null;
}

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
    // Querträger
    quertraegerHoehe = 0.1,
    quertraegerTiefe = 0.1,
    // Eindeckung (0=Glas, 1=Polycarbonat)
    eindeckungTyp = 0,
    eindeckungDicke = 0.016,
    glasOpacity = 0.2,
    glasRoughness = 0,
    glasMetalness = 0,
    glasEnvMapIntensity = 1,
    polyOpacity = 0.65,
    polyRoughness = 0.3,
    polyMetalness = 0,
    polyEnvMapIntensity = 1,
    polyKammergroesse = 0.05,
    // Glasleisten
    leistenBreite = 0,
    leistenHoehe = 0,
    leistenRundung = 0,
    wandanschluss = 0,
    wandanschlussHoehe = 0.046,
    wandanschlussTiefe = 0.056,
    // Vorn-Abschlussleiste
    vornAbschlussleiste = 0,
    // Separate Slots für Bauteile
    einzelMaterialien = 0,
    // K3 System
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const parent = useVerandaGeometry();
  const width = parent.width;
  const depth = parent.depth;
  const height = parent.height;
  const dachneigung = parent.dachneigung;
  const pfostenBreite = parent.pfostenBreite;
  const pfostenTiefe = parent.pfostenTiefe;
  const pfettenBreite = parent.pfettenBreite;
  const schwelleBreite = parent.schwelleBreite;
  const profilMaterial = materials.profil;
  const sparrenAnzahl = Number(sparrenAnzahlProp);
  const sparrenBreite = Number(sparrenBreiteProp);
  const sparrenHoehe = parent.sparrenHoehe || Number(sparrenHoeheProp);
  const sparrenAuflage = Number(parent.sparrenAuflage);
  const useEinzel = Number(einzelMaterialien) === 1;
  const konstruktionMaterial = useEinzel ? materials.konstruktion ?? profilMaterial : profilMaterial;
  const sparrenMaterial = useEinzel ? materials.sparren ?? profilMaterial : profilMaterial;
  const leistenMaterial = useEinzel ? materials.leisten ?? profilMaterial : profilMaterial;
  const wandanschlussMaterial = useEinzel ? materials.wandanschluss ?? profilMaterial : profilMaterial;
  const platteMaterial = materials.glasPlatte;
  const { hoeheHinten, hoeheVorne } = calcVerandaGeometry(
    depth,
    dachneigung,
    height
  );
  const auflageTyp = sparrenAuflage === 1 ? "innenliegend" : "aufliegend";
  const eindeckung = GLAS_EINDECKUNG_MAP[Number(eindeckungTyp)] ?? "glas";
  const sparrenModus = Number(sparrenAussen) === 1 ? "alle" : "nurInnen";
  const _eindeckungDicke = Number(eindeckungDicke);
  const _glasOpacity = Number(glasOpacity);
  const _glasRoughness = Number(glasRoughness);
  const _glasMetalness = Number(glasMetalness);
  const _glasEnvMapIntensity = Number(glasEnvMapIntensity);
  const _polyOpacity = Number(polyOpacity);
  const _polyRoughness = Number(polyRoughness);
  const _polyMetalness = Number(polyMetalness);
  const _polyEnvMapIntensity = Number(polyEnvMapIntensity);
  const _polyKammergroesse = Number(polyKammergroesse);
  const _leistenBreite = Number(leistenBreite);
  const _leistenHoehe = Number(leistenHoehe);
  const _leistenRundung = Number(leistenRundung);
  const _wandanschlussHoehe = Number(wandanschlussHoehe);
  const _wandanschlussTiefe = Number(wandanschlussTiefe);
  const { setEindeckungInfo } = useEindeckungInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(
      _eindeckungDicke,
      _leistenHoehe,
      Number(wandanschluss) === 1,
      _wandanschlussTiefe,
      sparrenAnzahl
    );
  }, [_eindeckungDicke, _leistenHoehe, wandanschluss, _wandanschlussTiefe, sparrenAnzahl, setEindeckungInfo]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!platteMaterial) return;
    const mat = platteMaterial;
    const isPoly = eindeckung === "polycarbonat";
    mat.transparent = true;
    mat.opacity = isPoly ? _polyOpacity : _glasOpacity;
    mat.roughness = isPoly ? _polyRoughness : _glasRoughness;
    mat.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
    mat.depthWrite = true;
    mat.needsUpdate = true;
  }, [platteMaterial, eindeckung, _glasOpacity, _polyOpacity, _glasRoughness, _polyRoughness]);
  const _quertraegerHoehe = Number(quertraegerHoehe);
  const _quertraegerTiefe = Number(quertraegerTiefe);
  const qtVorne = sparrenAuflage === 1 ? Number(parent.schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0 : _quertraegerTiefe;
  const qtHinten = sparrenAuflage === 1 ? Number(parent.pfette) === 1 ? pfettenBreite : 0 : 0;
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
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react__loadShare__.Suspense, { fallback: null, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(GlasEnvMap, {}) }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Dachflaeche,
          {
            sparrenAnzahl,
            sparrenBreite,
            sparrenHoehe,
            gesamtBreite: width,
            querbalkenBreite: width + pfostenBreite,
            gesamtTiefe: depth,
            hoeheVorne,
            hoeheHinten,
            quertraegerHoehe: _quertraegerHoehe,
            quertraegerTiefe: qtVorne,
            quertraegerTiefeHinten: qtHinten,
            auflage: auflageTyp,
            sparrenModus,
            material: konstruktionMaterial,
            konstruktionMaterial,
            sparrenMaterial,
            leistenMaterial,
            wandanschlussMaterial,
            platteMaterial,
            eindeckung,
            eindeckungDicke: _eindeckungDicke,
            glasFarbe: glasFarbeHex,
            glasOpacity: _glasOpacity,
            glasRoughness: _glasRoughness,
            glasMetalness: _glasMetalness,
            glasEnvMapIntensity: _glasEnvMapIntensity,
            polyOpacity: _polyOpacity,
            polyRoughness: _polyRoughness,
            polyMetalness: _polyMetalness,
            polyEnvMapIntensity: _polyEnvMapIntensity,
            polyKammergroesse: _polyKammergroesse,
            leistenBreite: _leistenBreite,
            leistenHoehe: _leistenHoehe,
            leistenFarbe: leistenFarbeHex,
            leistenRundung: _leistenRundung,
            wandanschluss: Number(wandanschluss) === 1,
            wandanschlussHoehe: _wandanschlussHoehe,
            wandanschlussTiefe: _wandanschlussTiefe,
            wandanschlussFarbe: leistenFarbeHex,
            dachVorsprung: 0,
            vornAbschlussleiste: Number(vornAbschlussleiste) === 1
          }
        )
      ]
    }
  );
}
const glasEindeckungPropsSchema = {
  eindeckungTyp: { type: "radioGroup", label: "Material", options: [{ value: "0", label: "Glas" }, { value: "1", label: "Polycarbonat" }] },
  eindeckungDicke: { type: "expression", label: "Dicke (m)" },
  // Glas
  glasOpacity: { type: "expression", label: "Glas Transparenz (0–1)" },
  glasRoughness: { type: "expression", label: "Glas Rauheit (0–1)" },
  glasMetalness: { type: "expression", label: "Glas Metalness (0–1)" },
  glasEnvMapIntensity: { type: "expression", label: "Glas EnvMap-Intensität" },
  // Poly
  polyKammergroesse: { type: "expression", label: "Poly Kammergröße (m)" },
  polyOpacity: { type: "expression", label: "Poly Transparenz (0–1)" },
  polyRoughness: { type: "expression", label: "Poly Rauheit (0–1)" },
  polyMetalness: { type: "expression", label: "Poly Metalness (0–1)" },
  polyEnvMapIntensity: { type: "expression", label: "Poly EnvMap-Intensität" },
  // Sparren
  sparrenAnzahl: { type: "expression", label: "Sparren Anzahl" },
  sparrenBreite: { type: "expression", label: "Sparren Breite (m)" },
  sparrenHoehe: { type: "expression", label: "Sparren Höhe (m)" },
  sparrenAuflage: { type: "radioGroup", label: "Auflage", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  sparrenAussen: { type: "expression", label: "Außen-Sparren (0/1)" },
  // Glasleisten
  leistenBreite: { type: "expression", label: "Leisten Breite (m)" },
  leistenHoehe: { type: "expression", label: "Leisten Höhe (m)" },
  leistenRundung: { type: "expression", label: "Leisten Rundung (0–10)" },
  // Abschlüsse
  wandanschluss: { type: "expression", label: "Wandanschluss (0/1)" },
  wandanschlussHoehe: { type: "expression", label: "Anschluss Höhe (m)" },
  wandanschlussTiefe: { type: "expression", label: "Anschluss Tiefe (m)" },
  vornAbschlussleiste: { type: "radioGroup", label: "Vorn-Abschlussleiste", options: [{ value: "0", label: "Nein" }, { value: "1", label: "Ja" }] },
  einzelMaterialien: { type: "radioGroup", label: "Separate Bauteil-Materialien", options: [{ value: "0", label: "Nein" }, { value: "1", label: "Ja" }] }
};
const glasEindeckungDynamicModel = {
  type: "veranda-glas-eindeckung",
  label: "Veranda Glas/Poly Eindeckung",
  description: "Glas- oder Polycarbonat-Eindeckung für Veranda und Qubus",
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    sparrenAnzahl: { expression: "6" },
    sparrenBreite: { expression: "0.06" },
    sparrenHoehe: { expression: "0.12" },
    sparrenAuflage: "0",
    sparrenAussen: { expression: "0" },
    quertraegerHoehe: { expression: "0.1" },
    quertraegerTiefe: { expression: "0.1" },
    eindeckungTyp: "0",
    eindeckungDicke: { expression: "0.016" },
    glasOpacity: { expression: "0.2" },
    glasRoughness: { expression: "0.0" },
    glasMetalness: { expression: "0.0" },
    glasEnvMapIntensity: { expression: "1.0" },
    polyOpacity: { expression: "0.65" },
    polyRoughness: { expression: "0.3" },
    polyMetalness: { expression: "0.0" },
    polyEnvMapIntensity: { expression: "1.0" },
    polyKammergroesse: { expression: "0.05" },
    leistenBreite: { expression: "0.03" },
    leistenHoehe: { expression: "0.01" },
    leistenRundung: { expression: "0" },
    wandanschluss: { expression: "1" },
    wandanschlussHoehe: { expression: "0.046" },
    wandanschlussTiefe: { expression: "0.056" },
    vornAbschlussleiste: "0",
    einzelMaterialien: "0"
  },
  propsDialog: glasEindeckungPropsSchema,
  component: GlasEindeckungModel,
  materials: ["profil", "konstruktion", "sparren", "leisten", "wandanschluss", "glasPlatte"],
  disabledForAR: false
};

const METALL_EINDECKUNG_MAP = {
  0: "welle",
  1: "trapez"
};
function MetallEindeckungModel(props) {
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
    stirnblechTiefe: _stirnblechTiefe = 0.04,
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
  const width = parent.width;
  const depth = parent.depth;
  const height = parent.height;
  const dachneigung = parent.dachneigung;
  const sparrenHoehe = parent.sparrenHoehe;
  const profilMaterial = materials.profil;
  const metallMaterial = materials.metall;
  const anschlussMaterial = materials.anschluss ?? profilMaterial;
  const hatAussenSparren = Number(exprVal(sparrenAussen)) === 1;
  const sparrenAuflage = Number(parent.sparrenAuflage);
  const eindeckungBreite = width + parent.pfostenBreite;
  const querbalkenBreite = hatAussenSparren ? width : eindeckungBreite;
  const { hoeheHinten, hoeheVorne } = calcVerandaGeometry(
    depth,
    dachneigung,
    height
  );
  const eindeckungTyp = METALL_EINDECKUNG_MAP[eindeckung] ?? "welle";
  const metallFarbeHex = "#808080";
  const anschlussFarbeHex = "#c0c0c0";
  const dachVS_m = 0;
  const pfostenTiefe_m = parent.pfostenTiefe;
  const schwEff_m = Number(parent.schwelle) === 1 ? Math.max(parent.schwelleBreite, pfostenTiefe_m) : 0;
  const pfEff_m = Number(parent.pfette) === 1 ? parent.pfettenBreite : 0;
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
  } : { vorne: hVorne_m, hinten: hHinten_m };
  const metallPeakOffset = eindeckungTyp === "welle" ? eindeckungDicke + 2 * (amplitude / 200) : eindeckungDicke + amplitude / 100;
  const metallOKVorne = sparrenOberkante.vorne + metallPeakOffset;
  const metallOKHinten = sparrenOberkante.hinten + metallPeakOffset;
  const hoeheDiff = metallOKHinten - metallOKVorne;
  const glasNeig = Math.atan2(hoeheDiff, innerD_m);
  const schraegeTiefe = innerD_m / Math.cos(glasNeig);
  const effSeitenTiefe = seitenabschlussTiefe;
  const seitenLip = 0.01;
  const effSeitenHoehe = Math.max(
    seitenabschlussHoehe,
    metallPeakOffset + seitenLip
  );
  const balkenPositionen = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (balkenAnzahl <= 0) return [];
    if (balkenAnzahl === 1) return [zCenter_m];
    return Array.from({ length: balkenAnzahl }, (_, i) => {
      const t = (i + 1) / (balkenAnzahl + 1);
      return zInnenV_m + t * innerD_m;
    });
  }, [balkenAnzahl, zInnenV_m, innerD_m, zCenter_m]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: [
        balkenPositionen.map((zPos, index) => {
          const t = innerD_m > 0 ? (zPos - zInnenV_m) / innerD_m : 0.5;
          const oberkante = sparrenOberkante.vorne + t * (sparrenOberkante.hinten - sparrenOberkante.vorne);
          const balkenY = oberkante - balkenHoehe / 2;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [0, balkenY, zPos],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "boxGeometry",
                  {
                    args: [querbalkenBreite, balkenHoehe, balkenBreite]
                  }
                ),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
              ]
            },
            `balken-${index}`
          );
        }),
        hatAussenSparren && [-1, 1].map((seite) => {
          const xPos = seite * (eindeckungBreite / 2 - Number(laengsbalkenBreite) / 2);
          const oberkante = (sparrenOberkante.vorne + sparrenOberkante.hinten) / 2;
          const balkenY = oberkante - Number(laengsbalkenHoehe) / 2;
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
                    args: [Number(laengsbalkenBreite), Number(laengsbalkenHoehe), innerD_m / Math.cos(neigung)]
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
            dicke: eindeckungDicke,
            hoeheVorne: sparrenOberkante.vorne,
            hoeheHinten: sparrenOberkante.hinten,
            innenliegend: false,
            quertraegerTiefe: 0,
            metallFarbe: metallFarbeHex,
            amplitude,
            frequenz,
            material: metallMaterial
          }
        ) }),
        Number(wandanschluss) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Wandanschluss,
          {
            wandanschlussHoehe,
            wandanschlussTiefe,
            farbe: anschlussFarbeHex,
            leistenHoehe: 0,
            glasNeig,
            anschlussBreite: width + parent.pfostenBreite,
            zPos: zInnenH_m - 1e-3,
            yPos: metallOKHinten,
            material: anschlussMaterial
          }
        ),
        Number(stirnblech) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Stirnblech,
          {
            stirnblechHoehe,
            stirnblechTiefe: parent.schwelleBreite,
            farbe: anschlussFarbeHex,
            anschlussBreite: width + parent.pfostenBreite,
            yPos: metallOKVorne,
            zPos: zInnenV_m,
            neigung: glasNeig,
            material: anschlussMaterial
          }
        ),
        Number(seitenabschluss) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            Seitenabschluss,
            {
              seitenabschlussHoehe: effSeitenHoehe,
              seitenabschlussTiefe: effSeitenTiefe,
              farbe: anschlussFarbeHex,
              laenge: schraegeTiefe,
              xPos: -eindeckungBreite / 2,
              yPos: metallOKVorne + hoeheDiff / 2 + 1e-3,
              zPos: zCenter_m,
              neigung: glasNeig,
              seite: "links"
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            Seitenabschluss,
            {
              seitenabschlussHoehe: effSeitenHoehe,
              seitenabschlussTiefe: effSeitenTiefe,
              farbe: anschlussFarbeHex,
              laenge: schraegeTiefe,
              xPos: eindeckungBreite / 2,
              yPos: metallOKVorne + hoeheDiff / 2 + 1e-3,
              zPos: zCenter_m,
              neigung: glasNeig,
              seite: "rechts"
            }
          )
        ] })
      ]
    }
  );
}
const metallEindeckungPropsSchema = {
  eindeckung: { type: "radioGroup", label: "Typ", options: [{ value: "0", label: "Welle" }, { value: "1", label: "Trapez" }] },
  eindeckungDicke: { type: "expression", label: "Dicke (m)" },
  amplitude: { type: "expression", label: "Amplitude (cm)" },
  frequenz: { type: "expression", label: "Frequenz (cm)" },
  sparrenAuflage: { type: "radioGroup", label: "Sparrenauflage", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  balkenAnzahl: { type: "expression", label: "Anzahl" },
  balkenBreite: { type: "expression", label: "Breite (m)" },
  balkenHoehe: { type: "expression", label: "Höhe (m)" },
  sparrenAussen: { type: "expression", label: "Außen-Sparren (0/1)" },
  laengsbalkenBreite: { type: "expression", label: "Längsbalken Breite (m)" },
  laengsbalkenHoehe: { type: "expression", label: "Längsbalken Höhe (m)" },
  wandanschluss: { type: "expression", label: "Wandanschluss (0/1)" },
  wandanschlussHoehe: { type: "expression", label: "Anschluss Höhe (m)" },
  wandanschlussTiefe: { type: "expression", label: "Anschluss Tiefe (m)" },
  stirnblech: { type: "expression", label: "Stirnblech (0/1)" },
  stirnblechHoehe: { type: "expression", label: "Stirnblech Höhe (m)" },
  stirnblechTiefe: { type: "expression", label: "Stirnblech Tiefe (m)" },
  seitenabschluss: { type: "expression", label: "Seitenabschluss (0/1)" },
  seitenabschlussHoehe: { type: "expression", label: "Seiten Höhe (m)" },
  seitenabschlussTiefe: { type: "expression", label: "Seiten Tiefe (m)" }
};
const metallEindeckungDynamicModel = {
  type: "veranda-metall-eindeckung",
  label: "Veranda Welle/Trapez Eindeckung",
  description: "Metall-Eindeckung mit Wellen- oder Trapezblechprofil",
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    balkenAnzahl: { expression: "4" },
    balkenBreite: { expression: "0.06" },
    balkenHoehe: { expression: "0.08" },
    eindeckung: "0",
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
    sparrenAuflage: "0",
    laengsbalkenBreite: { expression: "0.06" },
    laengsbalkenHoehe: { expression: "0.08" }
  },
  propsDialog: metallEindeckungPropsSchema,
  component: MetallEindeckungModel,
  materials: ["profil", "metall", "anschluss"],
  disabledForAR: false
};

const SCHIENEN_WANDSTAERKE = 3e-3;
const SCHIENE_BREITE = 0.06;
const SCHIENE_HOEHE = 0.07;
const NUT_TIEFE = 0.018;
const ENDKASTEN_HOEHE = 0.08;
const ENDKASTEN_TIEFE = 0.06;
function LamellenEindeckungModel(props) {
  const {
    lamellenBreite = 0.15,
    lamellenDicke = 0.012,
    lamellenRoughness = 0.25,
    lamellenAnzahl = 0,
    lamellenWinkel = 0,
    lamellenRichtung = 0,
    slatMoveIn = 0,
    wandanschluss = 0,
    wandanschlussHoehe = 0.12,
    wandanschlussTiefe = 0.06,
    materials = {}
  } = props;
  const parent = useVerandaGeometry();
  const { hoeheHinten, hoeheVorne, neigung } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcVerandaGeometry(parent.depth, parent.dachneigung, parent.height),
    [parent.depth, parent.dachneigung, parent.height]
  );
  const { setEindeckungInfo } = useEindeckungInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(0, 0, Number(wandanschluss) === 1, Number(wandanschlussTiefe));
  }, [wandanschluss, wandanschlussTiefe, setEindeckungInfo]);
  const profilMaterial = materials.profil;
  const lamelleMaterial = materials.lamelle;
  const farbeHex = "#808080";
  const anschlussFarbeHex = "#c0c0c0";
  const pfostenTiefe = parent.pfostenTiefe;
  const schwelleEff = Number(parent.schwelle) === 1 ? Math.max(parent.schwelleBreite, pfostenTiefe) : 0;
  const pfetteEff = Number(parent.pfette) === 1 ? parent.pfettenBreite : 0;
  const dachVS = 0;
  const zInnenvorne = -parent.depth / 2 + dachVS + schwelleEff;
  const zInnenhinten = parent.depth / 2 - pfetteEff;
  const innerDepth = Math.max(0.01, zInnenhinten - zInnenvorne);
  const zCenter = (zInnenvorne + zInnenhinten) / 2;
  const hoeheAtInnenvorne = calcHoeheAnPosition(hoeheVorne, hoeheHinten, parent.depth, dachVS + schwelleEff);
  const hoeheAtInnenhinten = calcHoeheAnPosition(hoeheVorne, hoeheHinten, parent.depth, parent.depth - pfetteEff);
  const sysTopY = { vorne: hoeheAtInnenvorne, hinten: hoeheAtInnenhinten };
  const railCenterY = {
    vorne: hoeheAtInnenvorne - SCHIENE_HOEHE / 2,
    hinten: hoeheAtInnenhinten - SCHIENE_HOEHE / 2
  };
  const isLaengs = Number(lamellenRichtung) === 1;
  const spannendeAchse = isLaengs ? parent.width : innerDepth;
  const aussenBreite = parent.width + parent.pfostenBreite;
  const aussenTiefe = innerDepth;
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
        const spreadX = -parent.width / 2 + effectiveBreite / 2 + i * effectiveBreite;
        const packedX = -parent.width / 2 + dicke / 2 + i * dicke;
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
    [n, isLaengs, parent.width, parent.depth, effectiveBreite, t, lamellenDicke, railCenterY.vorne, railCenterY.hinten, zInnenvorne, innerDepth]
  );
  const schieneXLinks = -(aussenBreite / 2 - SCHIENE_BREITE / 2);
  const schieneXRechts = aussenBreite / 2 - SCHIENE_BREITE / 2;
  const schieneY = (railCenterY.vorne + railCenterY.hinten) / 2;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
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
              Boolean(wandanschluss) && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, schraegeTiefe / 2], castShadow: true, receiveShadow: true, children: [
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
                Boolean(wandanschluss) && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, schraegeTiefe / 2], castShadow: true, receiveShadow: true, children: [
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
    lamellenPos.map(({ x, y, z }, i) => {
      const H = Number(lamellenDicke);
      const WAND = 25e-4;
      const R_L = H / 2;
      const R_R = H * 0.375;
      const chord = effectiveBreite + H * 0.08;
      const bodyLen = chord - R_L - R_R;
      const bodyCtr = -chord / 2 + R_L + bodyLen / 2;
      const len = lamellenLaenge;
      const mat = /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        MaterialFallback,
        {
          material: lamelleMaterial,
          fallbackColor: farbeHex,
          metalness: 0.6,
          roughness: Number(lamellenRoughness)
        }
      );
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [x, y, z], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { rotation: isLaengs ? [-neigungRad, 0, winkelRad] : [winkelRad, 0, 0], children: !isLaengs ? (
        // ── QUER: Chord in Z, Länge in X ──────────────────────
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [0, 0, -chord / 2 + R_L],
              rotation: [0, 0, Math.PI / 2],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [R_L, R_L, len, 20] }),
                mat
              ]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [0, H / 2 - WAND / 2, bodyCtr],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [len, WAND, bodyLen] }),
                mat
              ]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [0, -(H / 2 - WAND / 2), bodyCtr],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [len, WAND, bodyLen] }),
                mat
              ]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [0, 0, chord / 2 - R_R],
              rotation: [0, 0, Math.PI / 2],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [R_R, R_R, len, 16] }),
                mat
              ]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [0, -(R_R + H * 0.18), chord / 2 - R_R / 2],
              castShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [len, H * 0.32, WAND * 4] }),
                mat
              ]
            }
          )
        ] })
      ) : (
        // ── LÄNGS: Chord in X, Länge in Z ──────────────────────
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [-chord / 2 + R_L, 0, 0],
              rotation: [Math.PI / 2, 0, 0],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [R_L, R_L, len, 20] }),
                mat
              ]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [bodyCtr, H / 2 - WAND / 2, 0],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [bodyLen, WAND, len] }),
                mat
              ]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [bodyCtr, -(H / 2 - WAND / 2), 0],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [bodyLen, WAND, len] }),
                mat
              ]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [chord / 2 - R_R, 0, 0],
              rotation: [Math.PI / 2, 0, 0],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [R_R, R_R, len, 16] }),
                mat
              ]
            }
          ),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [chord / 2 - R_R / 2, -(R_R + H * 0.18), 0],
              castShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [WAND * 4, H * 0.32, len] }),
                mat
              ]
            }
          )
        ] })
      ) }) }, `lamelle-${i}`);
    }),
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
          !Boolean(wandanschluss) && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -ENDKASTEN_HOEHE / 2, ENDKASTEN_TIEFE / 2], castShadow: true, receiveShadow: true, children: [
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
    Boolean(wandanschluss) && (() => {
      const W = SCHIENEN_WANDSTAERKE;
      const gesamtBreite = aussenBreite;
      const anschlussY = sysTopY.hinten;
      const wH = Number(wandanschlussHoehe);
      const wT = Number(wandanschlussTiefe);
      const zWand = zInnenhinten;
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
          "mesh",
          {
            position: [0, anschlussY + W / 2, zWand - wT / 2],
            castShadow: true,
            receiveShadow: true,
            children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, W, wT] }),
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
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
          "mesh",
          {
            position: [0, anschlussY + wH / 2, zWand],
            castShadow: true,
            receiveShadow: true,
            children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [gesamtBreite, wH, W] }),
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
        )
      ] });
    })()
  ] });
}
const lamellenEindeckungPropsSchema = {
  lamellenRichtung: { type: "radioGroup", label: "Ausrichtung", options: [{ value: "0", label: "Quer / Bioclimatic" }, { value: "1", label: "Längs" }] },
  lamellenBreite: { type: "expression", label: "Breite (m)" },
  lamellenDicke: { type: "expression", label: "Dicke (m)" },
  lamellenAnzahl: { type: "expression", label: "Anzahl (0=auto)" },
  lamellenWinkel: { type: "expression", label: "Winkel (°)" },
  lamellenRoughness: { type: "expression", label: "Roughness (0–1)" },
  slatMoveIn: { type: "expression", label: "Einfahrtiefe (0–100)" },
  sparrenAuflage: { type: "radioGroup", label: "Auflage", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  wandanschluss: { type: "expression", label: "Wandanschluss (0/1)" },
  wandanschlussHoehe: { type: "expression", label: "Höhe (m)" },
  wandanschlussTiefe: { type: "expression", label: "Tiefe (m)" }
};
const lamellenEindeckungDynamicModel = {
  type: "veranda-lamellen-eindeckung",
  label: "Lamelleneindeckung (Dach)",
  description: "Lamellen-Eindeckung für das Dach mit einstellbarem Winkel",
  screenshot: "/images/thumbnails/pfosten-rund.png",
  defaultProps: {
    lamellenBreite: { expression: "0.202" },
    lamellenDicke: { expression: "0.04" },
    lamellenRoughness: { expression: "0.3" },
    lamellenAnzahl: { expression: "0" },
    lamellenWinkel: { expression: "0" },
    lamellenRichtung: "0",
    slatMoveIn: { expression: "0" },
    sparrenAuflage: "0",
    wandanschluss: { expression: "0" },
    wandanschlussHoehe: { expression: "0.12" },
    wandanschlussTiefe: { expression: "0.06" }
  },
  propsDialog: lamellenEindeckungPropsSchema,
  component: LamellenEindeckungModel,
  materials: ["profil", "lamelle"],
  disabledForAR: false
};

function SolarPanelGitter({ breite, tiefe, rahmenFarbeHex, material }) {
  const zellenX = Math.max(1, Math.round(breite / 0.15));
  const zellenZ = Math.max(1, Math.round(tiefe / 0.15));
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
function SolarPanel({ panelBreite, panelTiefe, yPos, dachneigungRad, panelFarbeHex, rahmenFarbeHex, glasOpacity, glasRoughness, glasMetalness, glasMaterial, profilMaterial }) {
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
          transparent: glasOpacity < 1,
          opacity: glasOpacity,
          metalness: glasMetalness,
          roughness: glasRoughness
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
        material: profilMaterial
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
  const {
    glasOpacity = 0.9,
    glasRoughness = 0.05,
    glasMetalness = 0.1,
    wandanschluss = 1,
    wandanschlussHoehe = 0.12,
    wandanschlussTiefe = 0.06,
    stirnblech = 1,
    stirnblechHoehe = 0.08,
    stirnblechTiefe = 0.04,
    seitenabschluss = 0,
    seitenabschlussHoehe = 0.03,
    seitenabschlussTiefe = 0.04,
    leistenBreite = 0,
    leistenHoehe = 0,
    leistenRundung = 0,
    einzelMaterialien = 0,
    sparrenAuflage: _sparrenAuflage_prop = 0,
    sparrenAnzahl = 0,
    sparrenBreite = 0,
    sparrenHoehe = 0,
    materials = {}
  } = props;
  const parent = useVerandaGeometry();
  const { hoeheHinten, hoeheVorne, neigung } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcVerandaGeometry(parent.depth, parent.dachneigung, parent.height),
    [parent.depth, parent.dachneigung, parent.height]
  );
  const profilMaterial = materials.profil;
  const glasMaterial = materials.glas;
  const useEinzel = Number(einzelMaterialien) === 1;
  const anschlussMaterial = useEinzel ? materials.anschluss ?? profilMaterial : profilMaterial;
  const leistenMaterial = useEinzel ? materials.leisten ?? profilMaterial : profilMaterial;
  const panelFarbeHex = "#1a2a3a";
  const rahmenFarbeHex = "#808080";
  const anschlussFarbeHex = "#c0c0c0";
  const leistenFarbeHex = "#c0c0c0";
  const _leistenBreite = Number(leistenBreite);
  const _leistenHoehe = Number(leistenHoehe);
  const _leistenRundung = Number(leistenRundung);
  const _glasOpacity = Number(glasOpacity);
  const _glasRoughness = Number(glasRoughness);
  const _glasMetalness = Number(glasMetalness);
  const _sparrenAnzahl = Number(sparrenAnzahl) > 0 ? Number(sparrenAnzahl) : parent.sparrenAnzahl;
  const _sparrenBreite = Number(sparrenBreite) > 0 ? Number(sparrenBreite) : parent.sparrenBreite;
  const _sparrenHoehe = Number(sparrenHoehe) > 0 ? Number(sparrenHoehe) : parent.sparrenHoehe;
  const querbalkenBreite = parent.width + parent.pfostenBreite;
  const sparrenCount = Math.max(2, _sparrenAnzahl);
  const sparrenX = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const xAussen = querbalkenBreite / 2 - _sparrenBreite / 2;
    if (sparrenCount === 2) return [-xAussen, xAussen];
    const abstand = 2 * xAussen / (sparrenCount - 1);
    return Array.from({ length: sparrenCount }, (_, i) => -xAussen + i * abstand);
  }, [sparrenCount, querbalkenBreite, _sparrenBreite]);
  const _sparrenAuflage = Number(parent.sparrenAuflage);
  const isInn_s = _sparrenAuflage === 1;
  const dachVS_s = parent.dachVorsprung ?? 0;
  const pfostTiefe_s = parent.pfostenTiefe;
  const schwEff_s = isInn_s && Number(parent.schwelle) === 1 ? Math.max(parent.schwelleBreite, pfostTiefe_s) : 0;
  const pfEff_s = isInn_s && Number(parent.pfette) === 1 ? parent.pfettenBreite : 0;
  const zInnenV_s = isInn_s ? -parent.depth / 2 + dachVS_s + schwEff_s : -parent.depth / 2;
  const zInnenH_s = isInn_s ? parent.depth / 2 - pfEff_s : parent.depth / 2;
  const innerD_s = Math.max(0.01, zInnenH_s - zInnenV_s);
  const zCenter_s = (zInnenV_s + zInnenH_s) / 2;
  const steig_s = parent.depth > 0 ? (hoeheHinten - hoeheVorne) / parent.depth : 0;
  const hVorne_s = isInn_s ? hoeheVorne + steig_s * (dachVS_s + schwEff_s) : hoeheVorne;
  const hHinten_s = isInn_s ? hoeheHinten - steig_s * pfEff_s : hoeheHinten;
  const sparrenOKVorne = isInn_s ? hVorne_s : hoeheVorne + _sparrenHoehe;
  const sparrenOKHinten = isInn_s ? hHinten_s : hoeheHinten + _sparrenHoehe;
  const yMitte = (sparrenOKVorne + sparrenOKHinten) / 2;
  const panelTiefe = isInn_s ? innerD_s : parent.depth;
  const panels = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (sparrenX.length < 2) return [];
    return sparrenX.slice(0, -1).map((left, i) => ({
      xCenter: (left + sparrenX[i + 1]) / 2,
      panelBreite: sparrenX[i + 1] - left
    }));
  }, [sparrenX]);
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
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react__loadShare__.Suspense, { fallback: null, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(GlasEnvMap, {}) }),
    sparrenX.map((xPos, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Sparren,
      {
        breite: _sparrenBreite,
        hoehe: _sparrenHoehe,
        tiefe: panelTiefe,
        hoeheDiff: sparrenOKHinten - sparrenOKVorne,
        material: profilMaterial,
        position: [xPos, isInn_s ? hVorne_s - _sparrenHoehe : hoeheVorne, zInnenV_s]
      },
      `sparren-${i}`
    )),
    leistenGeom !== null && sparrenX.map((xPos, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "mesh",
      {
        geometry: leistenGeom,
        position: [xPos, (panelOKVorne + panelOKHinten) / 2, zCenter_s],
        rotation: [-glasNeig, 0, 0],
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
      `leiste-${i}`
    )),
    panels.map((panel, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [panel.xCenter, 0, zCenter_s], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SolarPanel,
      {
        panelBreite: panel.panelBreite,
        panelTiefe,
        yPos: yMitte,
        dachneigungRad: neigung,
        panelFarbeHex,
        rahmenFarbeHex,
        glasOpacity: _glasOpacity,
        glasRoughness: _glasRoughness,
        glasMetalness: _glasMetalness,
        glasMaterial,
        profilMaterial
      }
    ) }, i)),
    Boolean(wandanschluss) && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Wandanschluss,
      {
        wandanschlussHoehe: Number(wandanschlussHoehe),
        wandanschlussTiefe: Number(wandanschlussTiefe),
        farbe: anschlussFarbeHex,
        leistenHoehe: _leistenHoehe,
        glasNeig,
        anschlussBreite: parent.width + parent.pfostenBreite,
        zPos: parent.depth / 2 - 1e-3,
        yPos: panelOKHinten,
        material: anschlussMaterial
      }
    ),
    Boolean(stirnblech) && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Stirnblech,
      {
        stirnblechHoehe: Number(stirnblechHoehe),
        stirnblechTiefe: Number(stirnblechTiefe),
        farbe: anschlussFarbeHex,
        anschlussBreite: parent.width + parent.pfostenBreite,
        yPos: panelOKVorne,
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
          xPos: -(parent.width + parent.pfostenBreite) / 2,
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
          xPos: (parent.width + parent.pfostenBreite) / 2,
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
  sparrenAuflage: { type: "radioGroup", label: "Auflage", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  sparrenAnzahl: { type: "expression", label: "Anzahl (0=von Veranda)" },
  sparrenBreite: { type: "expression", label: "Breite (m)" },
  sparrenHoehe: { type: "expression", label: "Höhe (m)" },
  leistenBreite: { type: "expression", label: "Breite (m, 0=keine)" },
  leistenHoehe: { type: "expression", label: "Höhe (m)" },
  leistenRundung: { type: "expression", label: "Rundung (0–10)" },
  glasOpacity: { type: "expression", label: "Vorderglas Transparenz (0–1)" },
  glasRoughness: { type: "expression", label: "Vorderglas Rauheit (0–1)" },
  glasMetalness: { type: "expression", label: "Vorderglas Metalness (0–1)" },
  wandanschluss: { type: "expression", label: "Wandanschluss (0/1)" },
  wandanschlussHoehe: { type: "expression", label: "Anschluss Höhe (m)" },
  wandanschlussTiefe: { type: "expression", label: "Anschluss Tiefe (m)" },
  stirnblech: { type: "expression", label: "Stirnblech (0/1)" },
  stirnblechHoehe: { type: "expression", label: "Stirnblech Höhe (m)" },
  stirnblechTiefe: { type: "expression", label: "Stirnblech Tiefe (m)" },
  seitenabschluss: { type: "expression", label: "Seitenabschluss (0/1)" },
  seitenabschlussHoehe: { type: "expression", label: "Seiten Höhe (m)" },
  seitenabschlussTiefe: { type: "expression", label: "Seiten Tiefe (m)" },
  einzelMaterialien: { type: "expression", label: "Separate Anschluss-Materialien (0/1)" }
};
const solarEindeckungDynamicModel = {
  type: "veranda-solar-eindeckung",
  label: "Solareindeckung",
  description: "Solarpanel-Eindeckung für Veranda-Dachflächen",
  defaultProps: {
    glasOpacity: { expression: "0.9" },
    glasRoughness: { expression: "0.05" },
    glasMetalness: { expression: "0.1" },
    wandanschluss: { expression: "1" },
    wandanschlussHoehe: { expression: "0.12" },
    wandanschlussTiefe: { expression: "0.06" },
    stirnblech: { expression: "1" },
    stirnblechHoehe: { expression: "0.08" },
    stirnblechTiefe: { expression: "0.04" },
    seitenabschluss: { expression: "0" },
    seitenabschlussHoehe: { expression: "0.03" },
    seitenabschlussTiefe: { expression: "0.04" },
    leistenBreite: { expression: "0" },
    leistenHoehe: { expression: "0" },
    leistenRundung: { expression: "0" },
    einzelMaterialien: { expression: "0" },
    sparrenAuflage: "0",
    sparrenAnzahl: { expression: "0" },
    sparrenBreite: { expression: "0" },
    sparrenHoehe: { expression: "0" }
  },
  propsDialog: solarEindeckungPropsSchema,
  component: SolarEindeckungModel,
  materials: ["profil", "glas", "anschluss", "leisten"],
  disabledForAR: false
};

function RegenrinneModel(props) {
  const {
    rinnenBreite = 0.12,
    rinnenHoehe = 0.08,
    wandStaerke = 3e-3,
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const rinnenTyp = Number(exprVal(props.typ) || "0");
  const parent = useVerandaGeometry();
  const width = parent.width;
  const depth = parent.depth;
  const height = parent.height;
  const dachneigung = parent.dachneigung;
  const sparrenHoehe = parent.sparrenHoehe;
  const sparrenAuflage = parent.sparrenAuflage;
  const schwelle = parent.schwelle;
  const schwelleBreite = parent.schwelleBreite;
  const pfostenBreite = parent.pfostenBreite;
  const pfostenTiefe = parent.pfostenTiefe;
  parent.dachVorsprung;
  const farbeHex = "#808080";
  const { hoeheVorne, hoeheHinten } = calcVerandaGeometry(depth, dachneigung, height);
  const rinnenLaenge = width + pfostenBreite;
  const steigung = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  const innenliegend = Number(sparrenAuflage) === 1;
  const qtVorne = Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const schwelleOK = innenliegend ? hoeheVorne + steigung * qtVorne : hoeheVorne + sparrenHoehe;
  const rinneY = schwelleOK - rinnenHoehe;
  const schwelleVorderkante = schwelleBreite >= pfostenTiefe ? -depth / 2 : -depth / 2 + pfostenTiefe - schwelleBreite;
  const rinneZ = schwelleVorderkante;
  const rinnePosition = [0, rinneY, rinneZ];
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: rinnePosition, rotation: [0, Math.PI, 0], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        Regenrinne,
        {
          typ: rinnenTyp,
          width: rinnenLaenge,
          rinnenBreite,
          rinnenHoehe,
          wandStaerke,
          dachneigung,
          farbeHex,
          material: materials.profil
        }
      ) })
    }
  );
}
const regenrinnePropsSchema = {
  typ: { type: "radioGroup", label: "Variante", options: [
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
    typ: "0",
    rinnenBreite: { expression: "0.12" },
    rinnenHoehe: { expression: "0.08" },
    wandStaerke: { expression: "0.003" }
  },
  propsDialog: regenrinnePropsSchema,
  component: RegenrinneModel,
  materials: ["profil"],
  disabledForAR: false
};

function PfostenModel(props) {
  const {
    pfostenAnzahlVorne = 2,
    pfostenAnzahlHinten = 2,
    pfostenBreite: propPfostenBreite = 0.1,
    pfostenTiefe: propPfostenTiefe = 0.1,
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const pfostenTyp = Number(exprVal(props.typ) || "0");
  const parent = useVerandaGeometry();
  const width = parent.width;
  const depth = parent.depth;
  const height = parent.height;
  const dachneigung = parent.dachneigung;
  const dachVorsprung = parent.dachVorsprung;
  const schwelle = parent.schwelle;
  parent.schwelleHoehe;
  const schwelleBreite = parent.schwelleBreite;
  const sparrenAuflage = parent.sparrenAuflage;
  const sparrenHoehe = parent.sparrenHoehe;
  const pfette = parent.pfette;
  const pfettenHoehe = parent.pfettenHoehe;
  const staticTraeger = parent.staticTraeger;
  const staticTraegerHoehe = parent.staticTraegerHoehe;
  const rinnenHoehe = parent.rinnenHoehe;
  const pfostenTiefe = parent.pfostenTiefe;
  const { hoeheVorne, hoeheHinten } = calcVerandaGeometry(depth, dachneigung, height);
  const innenliegend = Number(sparrenAuflage) === 1;
  const steigungPfosten = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  const qtVorne = Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const hoeheAnPfosten = hoeheVorne + steigungPfosten * dachVorsprung;
  let quertraegerHoeheVorne;
  if (dachVorsprung < 1e-3) {
    const schwelleOK = innenliegend ? hoeheVorne + steigungPfosten * qtVorne : hoeheVorne + sparrenHoehe;
    const rinneUK = schwelleOK - rinnenHoehe;
    if (Number(staticTraeger) === 1) {
      quertraegerHoeheVorne = hoeheAnPfosten - (rinneUK - staticTraegerHoehe);
    } else {
      quertraegerHoeheVorne = hoeheAnPfosten - rinneUK;
    }
  } else if (Number(staticTraeger) === 1) {
    quertraegerHoeheVorne = innenliegend ? sparrenHoehe + staticTraegerHoehe : staticTraegerHoehe;
  } else if (innenliegend) {
    quertraegerHoeheVorne = sparrenHoehe;
  } else {
    quertraegerHoeheVorne = 0;
  }
  const quertraegerHoeheHinten = Number(pfette) === 1 ? pfettenHoehe : 0;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        Konstruktion,
        {
          gesamtBreite: width,
          gesamtTiefe: depth,
          hoeheVorne,
          hoeheHinten,
          pfostenAnzahlVorne,
          pfostenAnzahlHinten,
          pfostenTyp,
          pfostenBreite: propPfostenBreite,
          pfostenTiefe: propPfostenTiefe,
          quertraegerHoehe: quertraegerHoeheVorne,
          quertraegerHoeheHinten,
          quertraegerTiefe: 0,
          dachVorsprung,
          material: materials.profil
        }
      )
    }
  );
}
const pfostenPropsSchema = {
  typ: { type: "radioGroup", label: "Profiltyp", options: [
    { value: "0", label: "Eckig" },
    { value: "1", label: "Rund" },
    { value: "2", label: "Klassisch" }
  ] },
  pfostenBreite: { type: "expression", label: "Breite / Durchmesser (m)" },
  pfostenTiefe: { type: "expression", label: "Tiefe (m, nur Eckig/Klassisch)" },
  pfostenAnzahlVorne: { type: "expression", label: "Anzahl vorne" },
  pfostenAnzahlHinten: { type: "expression", label: "Anzahl hinten" }
};
const pfostenDynamicModel = {
  type: "veranda-pfosten",
  label: "Pfosten",
  description: "Pfosten – Eckig, Rund oder Klassisch",
  defaultProps: {
    typ: "0",
    pfostenBreite: { expression: "0.1" },
    pfostenTiefe: { expression: "0.1" },
    pfostenAnzahlVorne: { expression: "2" },
    pfostenAnzahlHinten: { expression: "2" }
  },
  propsDialog: pfostenPropsSchema,
  component: PfostenModel,
  materials: ["profil"],
  disabledForAR: false
};

const WAND_TYPE_MAP = {
  [WAND_TYP.KEIL]: "veranda-wand-keil",
  [WAND_TYP.RAHMENWAND]: "veranda-wand-rahmenwand",
  [WAND_TYP.SCHIEBETUER]: "veranda-wand-schiebetuer",
  [WAND_TYP.SHUTTERS]: "veranda-wand-shutters",
  [WAND_TYP.FLANKENWAND]: "veranda-wand-flankenwand",
  [WAND_TYP.SENKRECHTMARKISE]: "veranda-wand-senkrechtmarkise"
};
const KEIL_FRAME_SW$1 = 0.06;
function calcWandGeometry(wandSeite, breite, hoehe, parentWidth, parentDepth, parentHeight, parentDachneigung, pfostenBreite = 0, pfostenTiefe = 0, sparrenHoehe = 0, pfette = 0, pfettenBreite = 0, dachVorsprung = 0, sparrenAuflage = 0, schwelle = 0, schwelleBreite = 0, schwelleHoehe = 0) {
  const isSide = wandSeite === 0 || wandSeite === 1;
  const isFront = wandSeite === 2;
  const isBack = wandSeite === 3;
  const backObstruction = Number(pfette) === 1 ? pfettenBreite : pfostenTiefe;
  const freeDepth = parentDepth - dachVorsprung - pfostenTiefe - backObstruction;
  const freeWidth = parentWidth - pfostenBreite;
  const defaultWandBreite = isSide ? freeDepth : freeWidth;
  const wandBreite = breite > 0 ? breite : Math.max(0.01, defaultWandBreite);
  const posX = isSide ? wandSeite === 0 ? -parentWidth / 2 : parentWidth / 2 : 0;
  const rotY = isSide ? wandSeite === 0 ? -Math.PI / 2 : Math.PI / 2 : isBack ? Math.PI : 0;
  const posZ = isSide ? (dachVorsprung + pfostenTiefe - backObstruction) / 2 : isFront ? -parentDepth / 2 + dachVorsprung + pfostenTiefe / 2 : parentDepth / 2 - backObstruction / 2;
  const { hoeheVorne, hoeheHinten } = calcVerandaGeometry(
    parentDepth,
    parentDachneigung,
    parentHeight
  );
  const steigung = parentDepth > 0 ? (hoeheHinten - hoeheVorne) / parentDepth : 0;
  const frontOffset = dachVorsprung + pfostenTiefe;
  const hoeheAtWandFront = hoeheVorne + steigung * frontOffset;
  const backOffset = parentDepth - backObstruction;
  const hoeheAtWandBack = hoeheVorne + steigung * backOffset;
  const usableHoeheVorne = hoeheAtWandFront - sparrenHoehe;
  const usableHoeheHinten = hoeheAtWandBack - sparrenHoehe;
  const innenliegend = Number(sparrenAuflage) === 1;
  const qtVorne = Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : pfostenTiefe;
  const pfostenTopVorne = innenliegend ? hoeheVorne + steigung * (dachVorsprung + qtVorne) - schwelleHoehe : usableHoeheVorne;
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
function KeilWand({
  length,
  hoeheVorne,
  hoeheHinten,
  keilAbschnitt,
  keilTeiler,
  dicke,
  glasTyp,
  material,
  glasMaterial,
  farbeHex,
  glasFarbeHex,
  glasOpacity,
  glasRoughness = 0,
  glasMetalness = 0,
  glasEnvMapIntensity = 1,
  polyOpacity = 0.65,
  polyRoughness = 0.3,
  polyMetalness = 0,
  polyEnvMapIntensity = 1,
  polyKammergroesse = 0.05
}) {
  const SW = 0.06;
  const xF = -length / 2;
  const xB = length / 2;
  const hD = hoeheHinten > hoeheVorne + 1e-3 ? hoeheHinten - hoeheVorne : Math.max(hoeheVorne * 0.25, 0.3);
  const sv = SW / Math.cos(Math.atan2(hD, length));
  const yF = keilAbschnitt;
  const yB = keilAbschnitt + hD;
  const yFTop = yF + SW;
  const yBTop = yB + SW;
  const innerTopAtX = (x) => yFTop - sv + (x - xF) / length * hD;
  const topShape = React.useMemo(() => {
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(xF, yFTop - sv);
    s.lineTo(xB, yBTop - sv);
    s.lineTo(xB, yBTop);
    s.lineTo(xF, yFTop);
    s.closePath();
    return s;
  }, [xF, xB, yFTop, yBTop, sv]);
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
    const yTopR = yBTop - sv;
    const yTopL = yBTop - sv - SW / length * hD;
    if (yTopR <= SW + 1e-3) return null;
    const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
    s.moveTo(xB - SW, SW);
    s.lineTo(xB, SW);
    s.lineTo(xB, yTopR);
    s.lineTo(xB - SW, Math.max(SW, yTopL));
    s.closePath();
    return s;
  }, [xB, yBTop, SW, sv, length, hD]);
  const { divShapes, glasShapes, glasPanelBounds } = React.useMemo(() => {
    const numDiv = Math.max(0, Math.floor(keilTeiler));
    const divs = [];
    const glass = [];
    const panels = [];
    const innerXS = xF + (yF > 1e-3 ? SW : 0);
    const innerXE = xB - SW;
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
  }, [xF, xB, yF, yFTop, hD, length, keilTeiler, SW, sv]);
  const extCfg = { depth: dicke, bevelEnabled: false, steps: 1 };
  const glasD = Math.min(dicke * 0.15, 0.016);
  const glsCfg = { depth: glasD, bevelEnabled: false, steps: 1 };
  const glasZ = (dicke - glasD) / 2;
  const glsOp = glasTyp === 1 ? Math.max(glasOpacity, 0.65) : glasOpacity;
  const polyStegData = React.useMemo(() => {
    if (glasTyp !== 1)
      return [];
    const kammer = Math.max(5e-3, polyKammergroesse);
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
    glasTyp,
    polyKammergroesse,
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
    mat.transparent = true;
    if (glasTyp === 1) {
      mat.opacity = polyOpacity;
      mat.roughness = polyRoughness;
      mat.metalness = polyMetalness;
      mat.envMapIntensity = polyEnvMapIntensity;
    } else {
      mat.opacity = glsOp;
      mat.roughness = glasRoughness;
      mat.metalness = glasMetalness;
      mat.envMapIntensity = glasEnvMapIntensity;
    }
    mat.needsUpdate = true;
  }, [glasMaterial, glsOp, glasTyp, glasRoughness, glasMetalness, glasEnvMapIntensity, polyOpacity, polyRoughness, polyMetalness, polyEnvMapIntensity]);
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
    divShapes.map((s, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, extCfg] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }, i)),
    glasTyp === 1 ? (
      // Polycarbonat: zwei dünne Deckplatten + opake Stege (wie PolycarbonatEindeckung)
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
            !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, 0, glasZ + glasD - DECK_DICKE], material: glasMaterial, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
            !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
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
                    roughness: polyRoughness
                  }
                )
              ]
            },
            si
          ))
        ] }, i);
      })
    ) : (
      // Glas: einfaches transparentes Extrusions-Panel
      glasShapes.map((s, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, 0, glasZ], castShadow: true, receiveShadow: true, material: glasMaterial, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, glsCfg] }),
        !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: glsOp, roughness: glasRoughness, metalness: glasMetalness, envMapIntensity: glasEnvMapIntensity, clearcoat: 1, clearcoatRoughness: 0.05 })
      ] }, i))
    )
  ] });
}
function RahmenwandWand({
  wandBreite,
  wandHoeheVorne,
  rahmenTyp,
  rahmenHoehe,
  maxScheibenBreite,
  glasTyp,
  material,
  glasMaterialOben,
  glasMaterialUnten,
  farbeHex,
  glasFarbeHex,
  glasOpacity,
  glasRoughness = 0,
  glasMetalness = 0,
  glasEnvMapIntensity = 1,
  polyOpacity = 0.65,
  polyRoughness = 0.3,
  polyMetalness = 0,
  polyEnvMapIntensity = 1,
  polyKammergroesse = 0.05,
  wandHoeheHinten,
  aufDachneigung = 0
}) {
  const FT = 0.05;
  const glasD = 0.012;
  const POLY_DECK_DICKE = Math.max(1e-3, glasD * 0.15);
  const POLY_STEG_DICKE = Math.max(8e-4, glasD * 0.1);
  const POLY_INNEN_D = Math.max(0, glasD - 2 * POLY_DECK_DICKE);
  const POLY_KAMMER = Math.max(5e-3, polyKammergroesse);
  const glsOp = glasTyp === 1 ? polyOpacity : glasOpacity;
  React.useMemo(() => {
    if (glasMaterialOben) {
      const mat = glasMaterialOben;
      mat.transparent = true;
      if (glasTyp === 1) {
        mat.opacity = polyOpacity;
        mat.roughness = polyRoughness;
        mat.metalness = polyMetalness;
        mat.envMapIntensity = polyEnvMapIntensity;
      } else {
        mat.opacity = glsOp;
        mat.roughness = glasRoughness;
        mat.metalness = glasMetalness;
        mat.envMapIntensity = glasEnvMapIntensity;
      }
      mat.needsUpdate = true;
    }
  }, [glasMaterialOben, glsOp, glasTyp, glasRoughness, glasMetalness, glasEnvMapIntensity, polyOpacity, polyRoughness, polyMetalness, polyEnvMapIntensity]);
  React.useMemo(() => {
    if (glasMaterialUnten) {
      const mat = glasMaterialUnten;
      mat.transparent = true;
      if (glasTyp === 1) {
        mat.opacity = polyOpacity;
        mat.roughness = polyRoughness;
        mat.metalness = polyMetalness;
        mat.envMapIntensity = polyEnvMapIntensity;
      } else {
        mat.opacity = glsOp;
        mat.roughness = glasRoughness;
        mat.metalness = glasMetalness;
        mat.envMapIntensity = glasEnvMapIntensity;
      }
      mat.needsUpdate = true;
    }
  }, [glasMaterialUnten, glsOp, glasTyp, glasRoughness, glasMetalness, glasEnvMapIntensity, polyOpacity, polyRoughness, polyMetalness, polyEnvMapIntensity]);
  const N = maxScheibenBreite > 0 ? Math.max(1, Math.ceil(wandBreite / maxScheibenBreite)) : 1;
  const divCount = N - 1;
  const innerW = Math.max(0.01, wandBreite - 2 * FT);
  const innerH = Math.max(0.01, wandHoeheVorne - 2 * FT);
  const panelW = Math.max(0.01, (innerW - divCount * FT) / N);
  const isSlanted = (aufDachneigung ?? 0) > 0 && wandHoeheHinten !== void 0;
  const hH = wandHoeheHinten ?? wandHoeheVorne;
  const isTyp2 = rahmenTyp === 2;
  const slantedShapes = React.useMemo(() => {
    if (!isSlanted) return null;
    const xS = -wandBreite / 2;
    const xE = wandBreite / 2;
    const hV = wandHoeheVorne;
    const topAtX = (x) => hV + (x - xS) / wandBreite * (hH - hV);
    const innerXS = xS + FT;
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
    const barY = isTyp2 ? FT + Math.max(0, Math.min(rahmenHoehe, wandHoeheVorne - 3 * FT)) : 0;
    for (let i = 0; i < N; i++) {
      const pxS = innerXS + i * (panelW + FT);
      const pxE = pxS + panelW;
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
      botPanelShapes,
      barShape,
      dividerShapes
    };
  }, [isSlanted, wandBreite, wandHoeheVorne, hH, N, panelW, divCount, isTyp2, rahmenHoehe]);
  const polyFlatStegeXPos = React.useMemo(() => {
    if (glasTyp !== 1) return [];
    const pos = [];
    let sx = -panelW / 2 + POLY_KAMMER;
    while (sx < panelW / 2 - 3e-3) {
      pos.push(sx);
      sx += POLY_KAMMER;
    }
    return pos;
  }, [glasTyp, panelW]);
  const polySlantedStegeData = React.useMemo(() => {
    if (!isSlanted || glasTyp !== 1) return [];
    const xS = -wandBreite / 2;
    const topAtX = (x) => wandHoeheVorne + (x - xS) / wandBreite * (hH - wandHoeheVorne);
    const innerXS = xS + FT;
    const barY = isTyp2 ? FT + Math.max(0, Math.min(rahmenHoehe, wandHoeheVorne - 3 * FT)) : 0;
    const stegeYBot = isTyp2 ? barY + FT : FT;
    return Array.from({ length: N }, (_, i) => {
      const pxS = innerXS + i * (panelW + FT);
      const pxE = pxS + panelW;
      const stege = [];
      let sx = pxS + POLY_KAMMER;
      while (sx < pxE - 3e-3) {
        const yTop = Math.max(stegeYBot, topAtX(sx) - FT);
        if (yTop > stegeYBot + 0.01) stege.push({ x: sx, yBot: stegeYBot, yTop });
        sx += POLY_KAMMER;
      }
      return stege;
    });
  }, [isSlanted, glasTyp, wandBreite, wandHoeheVorne, hH, N, panelW, isTyp2, rahmenHoehe]);
  const yInnerBot = -wandHoeheVorne / 2 + FT;
  const barH = isTyp2 ? Math.max(0, Math.min(rahmenHoehe, innerH - FT - 1e-3)) : 0;
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
        if (glasTyp === 1) {
          const deckCfg = { depth: POLY_DECK_DICKE, bevelEnabled: false, steps: 1 };
          const stege = polySlantedStegeData[i] ?? [];
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
              !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
            ] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ + glasD - POLY_DECK_DICKE], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
              !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
            ] }),
            stege.map((steg, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [steg.x, (steg.yBot + steg.yTop) / 2, glasZ + POLY_DECK_DICKE + POLY_INNEN_D / 2], children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, steg.yTop - steg.yBot, POLY_INNEN_D] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: polyRoughness })
            ] }, si))
          ] }, `top-${i}`);
        }
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, glasExtCfg] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: glsOp, roughness: glasRoughness, metalness: glasMetalness, envMapIntensity: glasEnvMapIntensity, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] }, `top-${i}`);
      }),
      botPanelShapes.map((s, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasZ], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, glasExtCfg] }),
        !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: glsOp, roughness: glasRoughness, metalness: glasMetalness, envMapIntensity: glasEnvMapIntensity, clearcoat: 1, clearcoatRoughness: 0.05 })
      ] }, `bot-${i}`)),
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
        botGlassH > 1e-3 && (glasTyp === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [panelCenterX, botGlassCenterY, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, POLY_DECK_DICKE] }),
            !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, POLY_DECK_DICKE] }),
            !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
          ] }),
          polyFlatStegeXPos.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, botGlassH, POLY_INNEN_D] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: polyRoughness })
          ] }, si))
        ] }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [panelCenterX, botGlassCenterY, 0], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, glasD] }),
          !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: glsOp, roughness: glasRoughness, metalness: glasMetalness, envMapIntensity: glasEnvMapIntensity, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] })),
        topGlassH > 1e-3 && (glasTyp === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [panelCenterX, topGlassCenterY, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, POLY_DECK_DICKE] }),
            !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, POLY_DECK_DICKE] }),
            !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
          ] }),
          polyFlatStegeXPos.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, topGlassH, POLY_INNEN_D] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: polyRoughness })
          ] }, si))
        ] }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [panelCenterX, topGlassCenterY, 0], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, glasD] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: glsOp, roughness: glasRoughness, metalness: glasMetalness, envMapIntensity: glasEnvMapIntensity, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] }))
      ] }) : glasTyp === 1 ? (
        /* Typ 1 Polycarbonat: zwei Deckplatten + Stege */
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [panelCenterX, 0, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, innerH, POLY_DECK_DICKE] }),
            !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, innerH, POLY_DECK_DICKE] }),
            !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: polyOpacity, roughness: polyRoughness, metalness: polyMetalness, envMapIntensity: polyEnvMapIntensity })
          ] }),
          polyFlatStegeXPos.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, innerH, POLY_INNEN_D] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: polyRoughness })
          ] }, si))
        ] })
      ) : (
        /* Typ 1 Glas: einfaches Glasfeld über volle Innenhöhe – Material: glasOben */
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [panelCenterX, 0, 0], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, innerH, glasD] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: glsOp, roughness: glasRoughness, metalness: glasMetalness, envMapIntensity: glasEnvMapIntensity, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] })
      ) }, i);
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
const GRIFF_LOCH_RADIUS = 0.02;
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
function MuschelEinsatz({
  position,
  glasDicke
}) {
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
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "meshStandardMaterial",
      {
        color: "#d0d0d0",
        metalness: 0.9,
        roughness: 0.2
      }
    )
  ] });
}
function StahlGriffMitSchloss({
  position,
  rotation = [0, 0, 0],
  hoehe = 0.25
}) {
  const HANDLE_RADIUS = 0.015;
  const HANDLE_OFFSET_Z = 0.03;
  const LOCK_HOUSING_H = 0.02;
  const LOCK_HOUSING_D = 0.01;
  const KEYHOLE_RADIUS = 7e-3;
  const KEYHOLE_DEPTH = 0.025;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position, rotation, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -hoehe + 0.05 + LOCK_HOUSING_H, LOCK_HOUSING_D], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [0.01, LOCK_HOUSING_H, LOCK_HOUSING_D] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#cccccc", metalness: 0.7, roughness: 0.5 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, HANDLE_RADIUS + HANDLE_OFFSET_Z], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS, HANDLE_RADIUS, hoehe, 32] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -0.02, LOCK_HOUSING_D / 2 - KEYHOLE_DEPTH / 2 + 1e-3], rotation: [Math.PI / 2, 0, 0], children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [KEYHOLE_RADIUS, KEYHOLE_RADIUS, KEYHOLE_DEPTH, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "black", metalness: 0.1, roughness: 0.8 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, hoehe / 2 - 0.05, LOCK_HOUSING_D / 2 + HANDLE_OFFSET_Z - LOCK_HOUSING_D], rotation: [Math.PI / 2, 0, 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS * 1.2, HANDLE_RADIUS * 1.2, HANDLE_OFFSET_Z, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -hoehe / 2 + 0.05, LOCK_HOUSING_D / 2 + HANDLE_OFFSET_Z - LOCK_HOUSING_D], rotation: [Math.PI / 2, 0, 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS * 1.2, HANDLE_RADIUS * 1.2, HANDLE_OFFSET_Z, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3 })
    ] })
  ] });
}
function SchiebetuerGriff({
  griffSeite,
  panelTiefe,
  xPos,
  yPos
}) {
  const renderHandle = (side) => {
    const zOffset = side === "aussen" ? panelTiefe / 2 + 5e-3 : -(panelTiefe / 2 + 5e-3);
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
  glasRoughness = 0,
  glasMetalness = 0,
  glasEnvMapIntensity = 1
}) {
  const needsHole = showHandle && (griffTyp === 0 || griffTyp === 1);
  const holes = React.useMemo(
    () => needsHole ? [{ x: griffXRelGlas, y: griffYRelGlas }] : [],
    [needsHole, griffXRelGlas, griffYRelGlas]
  );
  const glasShape = useGlasShapeWithHoles(glasW, glasH, holes);
  const extCfg = React.useMemo(() => ({
    depth: glasD,
    bevelEnabled: false,
    steps: 1
  }), [glasD]);
  if (needsHole) {
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, innerH / 2, -glasD / 2], castShadow: true, receiveShadow: true, material: glasMaterial, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [glasShape, extCfg] }),
      !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "meshPhysicalMaterial",
        {
          color: glasFarbeHex,
          transparent: true,
          opacity: effectiveOpacity,
          roughness: glasRoughness,
          metalness: glasMetalness,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          envMapIntensity: glasEnvMapIntensity,
          side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
          depthWrite: false
        }
      )
    ] });
  }
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, innerH / 2, 0], castShadow: true, receiveShadow: true, material: glasMaterial, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [glasW, glasH, glasD] }),
    !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "meshPhysicalMaterial",
      {
        color: glasFarbeHex,
        transparent: true,
        opacity: effectiveOpacity,
        roughness: glasRoughness,
        metalness: glasMetalness,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: glasEnvMapIntensity,
        side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
        depthWrite: false
      }
    )
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
  // griffPosition wird nicht mehr genutzt – Griff-X wird automatisch aus laufrichtung berechnet
  griffSeite,
  griffHoehe,
  glasTyp,
  glasDicke,
  rahmenBreite,
  material,
  farbeHex,
  glasMaterial,
  glasFarbeHex,
  glasOpacity,
  glasRoughness = 0,
  glasMetalness = 0,
  glasEnvMapIntensity = 1,
  polyOpacity = 0.65,
  polyRoughness = 0.3,
  polyMetalness = 0,
  polyEnvMapIntensity = 1,
  polyKammergroesse = 0.05,
  /** 1 = Seitenwand (Außenfläche bei +Z, wächst in -Z-Richtung),
   * -1 = Vorder-/Rückwand (Außenfläche bei -Z, wächst in +Z-Richtung) */
  zShiftDir = 1
}) {
  const glasD = Math.max(4e-3, glasDicke);
  const FW = rahmenBreite;
  const FD = glasD + 5e-3;
  const hasFrame = mitRahmen === 1;
  const effectiveOpacity = glasTyp === 1 ? polyOpacity : glasOpacity;
  React.useMemo(() => {
    if (!glasMaterial) return;
    const mat = glasMaterial;
    mat.transparent = true;
    mat.opacity = effectiveOpacity;
    mat.depthWrite = false;
    mat.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
    if (glasTyp === 1) {
      mat.roughness = polyRoughness;
      mat.metalness = polyMetalness;
      mat.envMapIntensity = polyEnvMapIntensity;
      mat.clearcoat = 0.4;
      mat.clearcoatRoughness = 0.1;
    } else {
      mat.roughness = glasRoughness;
      mat.metalness = glasMetalness;
      mat.envMapIntensity = glasEnvMapIntensity;
      mat.clearcoat = 1;
      mat.clearcoatRoughness = 0.05;
    }
    mat.needsUpdate = true;
  }, [glasMaterial, effectiveOpacity, glasTyp, glasRoughness, glasMetalness, glasEnvMapIntensity, polyRoughness, polyMetalness, polyEnvMapIntensity]);
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
  const isBiparting = !allSliding && fixedCount >= 2;
  const calcTrackZ = (index) => {
    if (allSliding) {
      const dir = schienenSeite === 1 ? -1 : 1;
      return (index - (panelCount - 1) / 2) * trackSpacing * dir;
    }
    const slidingZ = schienenSeite === 1 ? -FD / 2 : FD / 2;
    const fixedZ = schienenSeite === 1 ? FD / 2 : -FD / 2;
    if (fixedIndices.includes(index)) return fixedZ;
    if (!isBiparting) return slidingZ;
    const slidingIdx = slidingIndices.indexOf(index);
    const halfCount = Math.ceil(slidingIndices.length / 2);
    const groupRank = slidingIdx < halfCount ? slidingIdx : slidingIndices.length - 1 - slidingIdx;
    const trackDir = schienenSeite === 1 ? -1 : 1;
    return slidingZ + trackDir * groupRank * trackSpacing;
  };
  const fixedLeftCount = Math.ceil(fixedCount / 2);
  const fixedRightCount = Math.floor(fixedCount / 2);
  const fixedIndices = [];
  for (let i = 0; i < fixedLeftCount; i++) fixedIndices.push(i);
  for (let i = 0; i < fixedRightCount; i++) fixedIndices.push(panelCount - 1 - i);
  const slidingIndices = [];
  for (let i = 0; i < panelCount; i++) {
    if (!fixedIndices.includes(i)) slidingIndices.push(i);
  }
  const maxGroupSize = isBiparting ? Math.ceil(slidingIndices.length / 2) : 1;
  const totalTrackDepth = allSliding ? trackSpacing * panelCount + FD : FD * 2 + (maxGroupSize - 1) * trackSpacing;
  const calcPanelX = (i) => {
    if (hasFrame && fixedCount > 0) {
      return innerBreite / 2 - panelWidth / 2 - i * panelWidth;
    }
    const step = panelWidth - OVERLAP;
    return -innerBreite / 2 + panelWidth / 2 + i * step;
  };
  const openFactor = Math.max(0, Math.min(1, oeffnung));
  const slideRight = laufrichtung === 0;
  const calcOpenOffset = (index, isSliding) => {
    if (!isSliding || openFactor === 0) return 0;
    const closedX = calcPanelX(index);
    const slidingIdx = slidingIndices.indexOf(index);
    if (slidingIdx < 0) return 0;
    if (isBiparting) {
      const halfCount = Math.ceil(slidingIndices.length / 2);
      const targetX2 = slidingIdx < halfCount ? calcPanelX(0) : calcPanelX(panelCount - 1);
      return (targetX2 - closedX) * openFactor;
    }
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
    const outerSlidingIdx = allSliding && slidingIndices.length > 0 ? schienenSeite === 0 ? slidingIndices[slidingIndices.length - 1] : slidingIndices[0] : slidingIndices[0];
    const innerSlidingIdx = allSliding && slidingIndices.length > 0 ? schienenSeite === 0 ? slidingIndices[0] : slidingIndices[slidingIndices.length - 1] : slidingIndices[slidingIndices.length - 1];
    const isFirstSliding = isSliding && slidingIndices.length > 0 && index === outerSlidingIdx;
    const isLastSliding = isSliding && slidingIndices.length > 0 && index === innerSlidingIdx;
    const showHandle = isSliding && griffTyp !== 3 && (griffAnordnung === 0 && isFirstSliding || griffAnordnung === 1 && (isFirstSliding || isLastSliding) || griffAnordnung === 2);
    const clampedGriffH = Math.min(griffHoehe, innerH - 0.3);
    const griffYRelGlas = clampedGriffH - innerH / 2;
    const griffRandAbstand = GRIFF_LOCH_RADIUS + 0.015;
    const panelSlidingIdx = slidingIndices.indexOf(index);
    let griffXDir;
    if (isBiparting && isSliding) {
      const bipHalfCount = Math.ceil(slidingIndices.length / 2);
      griffXDir = panelSlidingIdx < bipHalfCount ? -1 : 1;
    } else {
      griffXDir = slideRight ? 1 : -1;
    }
    const griffXInPanel = griffXDir * (panelWidth / 2 - griffRandAbstand - (allSliding ? OVERLAP : 0));
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [xPos, FW, zTrack], children: [
      hasFrame && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
        [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
          "mesh",
          {
            position: [side * (panelWidth / 2 - FW / 2 + 9e-3), innerH / 2, 0],
            castShadow: true,
            receiveShadow: true,
            children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FW, glasH, FD] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
            ]
          },
          `vert-${side}`
        )),
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
      glasTyp === 1 ? (
        // Polycarbonat: Stegplatte (zwei Deckplatten + opake Stege)
        (() => {
          const DECK_DICKE = Math.max(1e-3, glasD * 0.15);
          const STEG_DICKE = Math.max(8e-4, glasD * 0.1);
          const innenD = Math.max(0, glasD - 2 * DECK_DICKE);
          const kammerGroesse = Math.max(5e-3, polyKammergroesse);
          const stege = [];
          let sx = -glasW / 2 + kammerGroesse;
          while (sx < glasW / 2 - 3e-3) {
            stege.push(sx);
            sx += kammerGroesse;
          }
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, innerH / 2 + glasYOffset, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, -glasD / 2 + DECK_DICKE / 2], castShadow: true, receiveShadow: true, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [glasW, glasH, DECK_DICKE] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                "meshPhysicalMaterial",
                {
                  color: glasFarbeHex,
                  transparent: true,
                  opacity: effectiveOpacity,
                  roughness: polyRoughness,
                  metalness: polyMetalness,
                  clearcoat: 0.4,
                  clearcoatRoughness: 0.1,
                  envMapIntensity: polyEnvMapIntensity,
                  side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
                  depthWrite: false
                }
              )
            ] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, glasD / 2 - DECK_DICKE / 2], castShadow: true, receiveShadow: true, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [glasW, glasH, DECK_DICKE] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                "meshPhysicalMaterial",
                {
                  color: glasFarbeHex,
                  transparent: true,
                  opacity: effectiveOpacity,
                  roughness: polyRoughness,
                  metalness: polyMetalness,
                  clearcoat: 0.4,
                  clearcoatRoughness: 0.1,
                  envMapIntensity: polyEnvMapIntensity,
                  side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide,
                  depthWrite: false
                }
              )
            ] }),
            stege.map((stegX, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [stegX, 0, 0], children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, glasH, innenD] }),
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                "meshPhysicalMaterial",
                {
                  color: glasFarbeHex,
                  roughness: polyRoughness,
                  metalness: polyMetalness,
                  envMapIntensity: polyEnvMapIntensity
                }
              )
            ] }, si))
          ] });
        })()
      ) : (
        // Glas: Shape mit Loch bei griffTyp 0 oder 1
        // glasYOffset: verschiebt Glas-Mitte an tatsächlichen Gurt-Slot-Mittelpunkt
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, glasYOffset, 0], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
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
            glasRoughness,
            glasMetalness,
            glasEnvMapIntensity
          }
        ) })
      ),
      showHandle && griffTyp === 1 && glasTyp === 0 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        MuschelEinsatz,
        {
          position: [griffXInPanel, innerH / 2 + griffYRelGlas + glasYOffset, -glasD / 2],
          glasDicke: glasD
        }
      ),
      buersten === 1 && index < panelCount - 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [panelWidth / 2, innerH / 2, -trackSpacing / 2], children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [3e-3, innerH - GLAS_LOG_H * 2, trackSpacing] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#333333", roughness: 1 })
      ] }),
      showHandle && griffTyp === 2 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        SchiebetuerGriff,
        {
          griffSeite,
          panelTiefe: FD,
          xPos: griffXInPanel,
          yPos: clampedGriffH - FW
        }
      )
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
    allSliding ? (
      // Alle schiebbar: eine breite Laufschiene über alle Tracks
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, FW + 4e-3, 0], castShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [innerBreite, 835e-5, totalTrackDepth] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "silver", metalness: 0.9, roughness: 0.2 })
      ] })
    ) : (
      // Mit festen Elementen: Laufschiene nur am Sliding-Track
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, FW + 4e-3, FD / 2], castShadow: true, children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [innerBreite, 835e-5, FD] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "silver", metalness: 0.9, roughness: 0.2 })
      ] })
    ),
    Array.from({ length: panelCount }, (_, i) => {
      const isSliding = !fixedIndices.includes(i);
      return renderPanel(i, calcTrackZ(i), isSliding);
    })
  ] });
}
function ShuttersWand({
  wandBreite,
  wandHoeheVorne,
  lamellenHoehe,
  lamellenFarbeHex,
  schiebend = 0,
  anzahlRahmen = 1,
  material
}) {
  const FRAME_GAP = 0.04;
  const nFrames = Math.max(1, Math.round(anzahlRahmen));
  const frameW = nFrames > 1 ? (wandBreite - FRAME_GAP * (nFrames - 1)) / nFrames : wandBreite;
  const lamCount = Math.ceil(wandHoeheVorne / lamellenHoehe);
  const lamDepth = schiebend === 1 ? 0.05 : 0.025;
  const lamRotX = schiebend === 1 ? Math.PI / 4 : 0;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { children: Array.from({ length: nFrames }, (_, fi) => {
    const frameOffsetX = nFrames > 1 ? fi * (frameW + FRAME_GAP) - (wandBreite - frameW) / 2 : 0;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [frameOffsetX, 0, 0], children: Array.from({ length: lamCount }, (_2, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        position: [0, i * lamellenHoehe + lamellenHoehe / 2, 0],
        rotation: [lamRotX, 0, 0],
        castShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [frameW, lamellenHoehe * 0.9, lamDepth] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            MaterialFallback,
            {
              material,
              fallbackColor: lamellenFarbeHex
            }
          )
        ]
      },
      i
    )) }, fi);
  }) });
}
function FlankenwandWand({
  wandBreite,
  wandHoehe,
  querbalkenAnzahl,
  querbalkenStaerke,
  aufbauTyp = 0,
  material,
  farbeHex
}) {
  if (aufbauTyp === 1) {
    const N = Math.max(1, querbalkenAnzahl);
    const plankenBreite = Math.max(0.02, querbalkenStaerke);
    const spacing = wandBreite / N;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { children: Array.from({ length: N }, (_, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        position: [
          i * spacing - wandBreite / 2 + spacing / 2,
          wandHoehe / 2,
          0
        ],
        castShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [plankenBreite * 0.85, wandHoehe, plankenBreite] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ]
      },
      i
    )) });
  }
  const abstand = querbalkenAnzahl > 1 ? wandHoehe / (querbalkenAnzahl + 1) : wandHoehe / 2;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        position: [-wandBreite / 2 + querbalkenStaerke / 2, wandHoehe / 2, 0],
        castShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [querbalkenStaerke, wandHoehe, querbalkenStaerke] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ]
      }
    ),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "mesh",
      {
        position: [wandBreite / 2 - querbalkenStaerke / 2, wandHoehe / 2, 0],
        castShadow: true,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [querbalkenStaerke, wandHoehe, querbalkenStaerke] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
        ]
      }
    ),
    Array.from({ length: querbalkenAnzahl }, (_, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, abstand * (i + 1), 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        "boxGeometry",
        {
          args: [wandBreite, querbalkenStaerke, querbalkenStaerke]
        }
      ),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }, i))
  ] });
}
function createWandModel(wandTyp, label, extraDefaultProps, materialSlots) {
  const slots = materialSlots ?? ["profil", "glas"];
  function WandModel(props) {
    const {
      breite = 0,
      hoehe = 0,
      glasOpacity = 0.3,
      aufDachneigung = 0,
      keil = 0,
      materials = {}
    } = props;
    const material = materials.profil;
    const glasMaterial = materials.glas;
    const farbeHex = "#a0a0a0";
    const glasFarbeHex = "#ccddee";
    const aufDachneigungVal = Number(exprVal(aufDachneigung)) || 0;
    const keilPropVal = Number(exprVal(keil)) || 0;
    const effectiveSide = useWandSeite();
    const effectiveBreite = Number(exprVal(breite)) || 0;
    const effectiveHoehe = Number(exprVal(hoehe)) || 0;
    const ctx = useVerandaGeometry();
    const geo = calcWandGeometry(
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
      ctx.schwelleHoehe
    );
    const wandBreite = geo.wandBreite;
    const zoneHoeheVorne = geo.zoneHoeheVorne;
    const zoneHoeheHinten = geo.zoneHoeheHinten;
    const keilInnerY = geo.keilInnerY;
    const keilInfo = useKeilInfo();
    const keilAbschnittForContext = wandTyp === WAND_TYP.KEIL ? Number(
      exprVal(props.keilAbschnitt) ?? exprVal(props.abschnittVorne) ?? 0
    ) : -1;
    React.useLayoutEffect(() => {
      if (wandTyp === WAND_TYP.KEIL) {
        keilInfo.setKeilAbschnitt(effectiveSide, keilAbschnittForContext);
      }
      return () => {
        if (wandTyp === WAND_TYP.KEIL) {
          keilInfo.setKeilAbschnitt(effectiveSide, 0);
        }
      };
    }, [keilAbschnittForContext, effectiveSide]);
    const isSideWall = effectiveSide === 0 || effectiveSide === 1;
    const keilAbschnittFromCtx = keilInfo.keilAbschnitt[effectiveSide] ?? 0;
    const keilReductionAuto = keilAbschnittFromCtx > 0 && isSideWall ? keilAbschnittFromCtx + KEIL_FRAME_SW$1 : 0;
    const hasPfette = Number(ctx.pfette) === 1;
    const BEAM_DEPTH = 0.05;
    const beamX = (effectiveSide === 0 ? 1 : -1) * (wandBreite / 2 + ctx.pfettenBreite / 2);
    const beamZ = (ctx.pfostenBreite - BEAM_DEPTH) / 2;
    let beamHeight = 0;
    let beamBottomY = 0;
    if (isSideWall && hasPfette) {
      switch (wandTyp) {
        case WAND_TYP.KEIL: {
          const kAbschnitt = Number(
            exprVal(props.keilAbschnitt) ?? exprVal(props.abschnittVorne) ?? 0
          );
          const hD = zoneHoeheHinten - zoneHoeheVorne;
          beamHeight = kAbschnitt + hD + KEIL_FRAME_SW$1;
          beamBottomY = keilInnerY - kAbschnitt - KEIL_FRAME_SW$1;
          break;
        }
        case WAND_TYP.RAHMENWAND: {
          const rBeamKeilReduction = aufDachneigungVal > 0 ? 0 : keilPropVal > 0 ? keilReductionAuto : 0;
          beamHeight = (aufDachneigungVal > 0 ? zoneHoeheHinten : zoneHoeheVorne) - rBeamKeilReduction;
          beamBottomY = 0;
          break;
        }
        default:
          beamHeight = zoneHoeheVorne - keilReductionAuto;
          beamBottomY = 0;
          break;
      }
    }
    const renderContent = () => {
      switch (wandTyp) {
        case WAND_TYP.KEIL: {
          const kp = props;
          const isRightSide = effectiveSide === 1;
          const keilAbschnittVal = Number(
            exprVal(kp.keilAbschnitt) ?? exprVal(kp.abschnittVorne) ?? 0
          );
          const dickeVal = Number(exprVal(kp.dicke) ?? 0.07);
          const keilZOffset = (ctx.pfostenBreite - dickeVal) / 2;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "group",
            {
              position: [
                0,
                keilInnerY - keilAbschnittVal - KEIL_FRAME_SW$1,
                keilZOffset
              ],
              rotation: [0, isRightSide ? Math.PI : 0, 0],
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                KeilWand,
                {
                  length: wandBreite,
                  hoeheVorne: zoneHoeheVorne,
                  hoeheHinten: zoneHoeheHinten,
                  keilAbschnitt: keilAbschnittVal,
                  keilTeiler: Number(exprVal(kp.keilTeiler) ?? 0),
                  dicke: Number(exprVal(kp.dicke) ?? 0.07),
                  glasTyp: Number(exprVal(kp.glasTyp) ?? 0),
                  material,
                  glasMaterial,
                  farbeHex,
                  glasFarbeHex: "#ccddee",
                  glasOpacity: Number(exprVal(glasOpacity) || 0.2),
                  glasRoughness: Number(exprVal(kp.glasRoughness) ?? 0),
                  glasMetalness: Number(exprVal(kp.glasMetalness) ?? 0),
                  glasEnvMapIntensity: Number(exprVal(kp.glasEnvMapIntensity) ?? 1),
                  polyOpacity: Number(exprVal(kp.polyOpacity) ?? 0.65),
                  polyRoughness: Number(exprVal(kp.polyRoughness) ?? 0.3),
                  polyMetalness: Number(exprVal(kp.polyMetalness) ?? 0),
                  polyEnvMapIntensity: Number(exprVal(kp.polyEnvMapIntensity) ?? 1),
                  polyKammergroesse: Number(exprVal(kp.polyKammergroesse) || 0.05)
                }
              )
            }
          );
        }
        case WAND_TYP.RAHMENWAND: {
          const rp = props;
          const isSide = effectiveSide === 0 || effectiveSide === 1;
          const isRightSide = effectiveSide === 1;
          const frameThickness = 0.05;
          const rwKeilReduction = keilPropVal > 0 ? keilReductionAuto : 0;
          const isSlantedWand = aufDachneigungVal > 0 && isSide;
          const effectiveKeilReduction = isSlantedWand ? 0 : rwKeilReduction;
          const rwHoehe = zoneHoeheVorne - effectiveKeilReduction;
          const rwY = isSlantedWand ? 0 : rwHoehe / 2;
          const sHoeheVorne = (isRightSide ? zoneHoeheHinten : zoneHoeheVorne) - effectiveKeilReduction;
          const sHoeheHinten = (isRightSide ? zoneHoeheVorne : zoneHoeheHinten) - effectiveKeilReduction;
          const rwZ = isSide ? (ctx.pfostenBreite - frameThickness) / 2 : -(ctx.pfostenTiefe - frameThickness) / 2;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, rwY, rwZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            RahmenwandWand,
            {
              wandBreite,
              wandHoeheVorne: isSlantedWand ? sHoeheVorne : rwHoehe,
              rahmenTyp: Number(exprVal(rp.rahmenTyp) ?? 1),
              rahmenHoehe: Number(exprVal(rp.rahmenHoehe) ?? 0.5),
              maxScheibenBreite: Number(exprVal(rp.maxScheibenBreite) ?? 0),
              glasTyp: Number(exprVal(rp.glasTyp) ?? 0),
              material,
              glasMaterialOben: materials.glasOben,
              glasMaterialUnten: materials.glasUnten,
              farbeHex,
              glasFarbeHex,
              glasOpacity: Number(exprVal(glasOpacity) || 0.2),
              glasRoughness: Number(exprVal(rp.glasRoughness) ?? 0),
              glasMetalness: Number(exprVal(rp.glasMetalness) ?? 0),
              glasEnvMapIntensity: Number(exprVal(rp.glasEnvMapIntensity) ?? 1),
              polyOpacity: Number(exprVal(rp.polyOpacity) ?? 0.65),
              polyRoughness: Number(exprVal(rp.polyRoughness) ?? 0.3),
              polyMetalness: Number(exprVal(rp.polyMetalness) ?? 0),
              polyEnvMapIntensity: Number(exprVal(rp.polyEnvMapIntensity) ?? 1),
              polyKammergroesse: Number(exprVal(rp.polyKammergroesse) || 0.05),
              wandHoeheHinten: isSlantedWand ? sHoeheHinten : void 0,
              aufDachneigung: isSlantedWand ? 1 : 0
            }
          ) });
        }
        case WAND_TYP.SCHIEBETUER: {
          const sp = props;
          const isSide = effectiveSide === 0 || effectiveSide === 1;
          const spGlasDicke = Number(exprVal(sp.glasDicke) ?? 8e-3);
          const keilReduction = keilPropVal > 0 ? keilReductionAuto : 0;
          const stHoehe = zoneHoeheVorne - keilReduction;
          const stZ = isSide ? ctx.pfostenBreite / 2 : -ctx.pfostenTiefe / 2;
          const stWandBreite = wandBreite;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, 0, stZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            SchiebetuerWand,
            {
              wandBreite: stWandBreite,
              wandHoeheVorne: stHoehe,
              mitRahmen: Number(exprVal(sp.mitRahmen) ?? 0),
              tuertypPanels: Number(exprVal(sp.tuertypPanels) ?? 0),
              maxPanelBreite: Number(exprVal(sp.maxPanelBreite) ?? 0.8),
              festeElemente: Number(exprVal(sp.festeElemente) ?? 0),
              oeffnung: Number(exprVal(sp.oeffnung) ?? 0),
              laufrichtung: Number(exprVal(sp.laufrichtung) ?? 0),
              schienenSeite: Number(exprVal(sp.schienenSeite) ?? 0),
              buersten: Number(exprVal(sp.buersten) ?? 1),
              griffTyp: Number(exprVal(sp.griffTyp) ?? 0),
              griffAnordnung: Number(exprVal(sp.griffAnordnung) ?? 0),
              griffPosition: Number(exprVal(sp.griffPosition) ?? 0),
              griffSeite: Number(exprVal(sp.griffSeite) ?? 2),
              griffHoehe: Number(exprVal(sp.griffHoehe) ?? 1),
              glasTyp: Number(exprVal(sp.glasTyp) ?? 0),
              glasDicke: spGlasDicke,
              rahmenBreite: Number(exprVal(sp.rahmenBreite) ?? 0.04),
              material,
              glasMaterial,
              farbeHex,
              glasFarbeHex,
              glasOpacity: Number(exprVal(glasOpacity) || 0.2),
              glasRoughness: Number(exprVal(sp.glasRoughness) ?? 0),
              glasMetalness: Number(exprVal(sp.glasMetalness) ?? 0),
              glasEnvMapIntensity: Number(exprVal(sp.glasEnvMapIntensity) ?? 1),
              polyOpacity: Number(exprVal(sp.polyOpacity) ?? 0.65),
              polyRoughness: Number(exprVal(sp.polyRoughness) ?? 0.3),
              polyMetalness: Number(exprVal(sp.polyMetalness) ?? 0),
              polyEnvMapIntensity: Number(exprVal(sp.polyEnvMapIntensity) ?? 1),
              polyKammergroesse: Number(exprVal(sp.polyKammergroesse) || 0.05),
              zShiftDir: isSide ? 1 : -1
            }
          ) });
        }
        case WAND_TYP.SHUTTERS: {
          const sh = props;
          const lamH = Number(exprVal(sh.lamellenHoehe) ?? 0.08);
          const shutDepth = Number(exprVal(sh.schiebend) ?? 0) === 1 ? 0.05 : 0.025;
          const shutHoehe = zoneHoeheVorne - keilReductionAuto;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, 0, (ctx.pfostenBreite - shutDepth) / 2], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            ShuttersWand,
            {
              wandBreite,
              wandHoeheVorne: shutHoehe,
              lamellenHoehe: lamH,
              lamellenFarbeHex: "#808080",
              schiebend: Number(exprVal(sh.schiebend) ?? 0),
              anzahlRahmen: Math.max(1, Math.round(Number(exprVal(sh.anzahlRahmen) ?? 1))),
              material
            }
          ) });
        }
        case WAND_TYP.FLANKENWAND: {
          const fp = props;
          const qbStaerke = Number(exprVal(fp.querbalkenStaerke) ?? 0.06);
          const flankenMaxHoehe = zoneHoeheVorne - keilReductionAuto;
          const flankenHoehe = Math.min(Number(exprVal(fp.wandHoehe) ?? flankenMaxHoehe), flankenMaxHoehe);
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, 0, (ctx.pfostenBreite - qbStaerke) / 2], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            FlankenwandWand,
            {
              wandBreite,
              wandHoehe: flankenHoehe,
              querbalkenAnzahl: Math.max(1, Math.round(Number(exprVal(fp.querbalkenAnzahl) ?? 3))),
              querbalkenStaerke: qbStaerke,
              aufbauTyp: Math.round(Number(exprVal(fp.aufbauTyp) ?? 0)),
              material,
              farbeHex
            }
          ) });
        }
        default: {
          const defaultHoehe = zoneHoeheVorne - keilReductionAuto;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "group",
            {
              position: [0, defaultHoehe / 2, (ctx.pfostenBreite - 0.01) / 2],
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
    };
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "group",
      {
        position: [geo.posX, geo.zoneGroupY, geo.posZ],
        rotation: [0, geo.rotY, 0],
        userData: { modelId: props.id },
        name: props.name,
        children: [
          renderContent(),
          isSideWall && hasPfette && beamHeight > 0.01 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [beamX, beamBottomY + beamHeight / 2, beamZ],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [ctx.pfettenBreite, beamHeight, BEAM_DEPTH] }),
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
              ]
            }
          )
        ]
      }
    );
  }
  function toExpr(val) {
    if (typeof val === "number") return { expression: String(val) };
    return val;
  }
  const baseDefaultProps = {
    breite: { expression: "0" },
    hoehe: { expression: "0" },
    glasOpacity: { expression: "0.3" }
  };
  const RADIO_OPTIONS = {
    rahmenTyp: [{ value: "1", label: "Standard" }, { value: "2", label: "Mit Mittelbalken" }],
    glasTyp: [{ value: "0", label: "Glas" }, { value: "1", label: "Polycarbonat" }],
    mitRahmen: [{ value: "0", label: "Ohne Rahmen" }, { value: "1", label: "Mit Rahmen" }],
    griffTyp: [{ value: "0", label: "Rund (Loch)" }, { value: "1", label: "Muschel" }, { value: "2", label: "Stahl" }, { value: "3", label: "Ohne" }],
    griffAnordnung: [{ value: "0", label: "Erste Tür" }, { value: "1", label: "Anfang + Ende" }, { value: "2", label: "Alle Türen" }],
    griffPosition: [{ value: "0", label: "Links" }, { value: "1", label: "Rechts" }],
    griffSeite: [{ value: "0", label: "Innen" }, { value: "1", label: "Außen" }, { value: "2", label: "Beidseitig" }],
    laufrichtung: [{ value: "0", label: "Rechts" }, { value: "1", label: "Links" }],
    schienenSeite: [{ value: "0", label: "Außen" }, { value: "1", label: "Innen" }],
    schiebend: [{ value: "0", label: "Nein" }, { value: "1", label: "Ja" }],
    aufbauTyp: [{ value: "0", label: "Querbalken" }, { value: "1", label: "Planken vertikal" }]
  };
  const convertedExtra = extraDefaultProps ? Object.fromEntries(
    Object.entries(extraDefaultProps).map(([k, v]) => [k, RADIO_OPTIONS[k] ? String(v) : toExpr(v)])
  ) : {};
  const DIALOG_LABELS = {
    breite: "Breite (0=auto aus Veranda) (m)",
    hoehe: "Höhe (0=auto aus Veranda) (m)",
    glasTyp: "Glas-Typ",
    glasOpacity: "Glas Transparenz (0–1)",
    glasRoughness: "Glas Rauheit (0–1)",
    glasMetalness: "Glas Metalness (0–1)",
    glasEnvMapIntensity: "Glas EnvMap-Intensität",
    polyOpacity: "Poly Transparenz (0–1)",
    polyRoughness: "Poly Rauheit (0–1)",
    polyMetalness: "Poly Metalness (0–1)",
    polyEnvMapIntensity: "Poly EnvMap-Intensität",
    polyKammergroesse: "Poly Kammergröße (m)",
    keilAbschnitt: "Keilabschnitt vorne (0=Spitze) (m)",
    keilTeiler: "Zwischenpfosten Anzahl",
    dicke: "Profiltiefe (m)",
    rahmenTyp: "Typ",
    aufDachneigung: "Oberkante (0=Standard, 1=Volle Höhe)",
    rahmenHoehe: "Mittelbalken-Höhe ab Boden (m)",
    maxScheibenBreite: "Max. Scheibenbreite (0=ohne Limit) (m)",
    mitRahmen: "Variante",
    tuertypPanels: "Anzahl Elemente (0=auto)",
    festeElemente: "Feste Elemente (0=alle schiebbar)",
    oeffnung: "Öffnung (0-1)",
    laufrichtung: "Laufrichtung",
    schienenSeite: "Schienen-Seite",
    griffTyp: "Grifftyp",
    griffAnordnung: "Griff-Anordnung",
    griffPosition: "Griffposition",
    griffSeite: "Griffseite",
    griffHoehe: "Griffhöhe (m)",
    buersten: "Bürsten",
    maxPanelBreite: "Max. Panelbreite (0=ohne Limit) (m)",
    glasDicke: "Glasdicke (m)",
    rahmenBreite: "Rahmenbreite (m)",
    keil: "Mit Keil",
    lamellenHoehe: "Lamellenhöhe (m)",
    anzahlRahmen: "Anzahl Rahmen",
    schiebend: "Schiebend",
    wandHoehe: "Wandhöhe (m)",
    querbalkenAnzahl: "Querbalken Anzahl",
    querbalkenStaerke: "Querbalken Stärke (m)",
    aufbauTyp: "Wandaufbau-Typ"
  };
  const extraKeys = Object.keys(convertedExtra);
  const baseDialogKeys = ["breite", "hoehe", "glasOpacity"];
  const allDialogKeys = [
    ...baseDialogKeys,
    ...extraKeys.filter((k) => !baseDialogKeys.includes(k))
  ];
  const wandPropsSchema = {};
  for (const key of allDialogKeys) {
    const opts = RADIO_OPTIONS[key];
    if (opts) {
      wandPropsSchema[key] = { type: "radioGroup", label: DIALOG_LABELS[key] ?? key, options: opts };
    } else {
      wandPropsSchema[key] = { type: "expression", label: DIALOG_LABELS[key] ?? key };
    }
  }
  return {
    type: WAND_TYPE_MAP[wandTyp] ?? `veranda-wand-typ${wandTyp}`,
    label,
    description: `Wand – ${label}`,
    defaultProps: {
      ...baseDefaultProps,
      ...convertedExtra
    },
    propsDialog: wandPropsSchema,
    component: WandModel,
    materials: slots,
    disabledForAR: false
  };
}

const keilDynamicModel = createWandModel(WAND_TYP.KEIL, "Keil", {
  glasTyp: 0,
  glasOpacity: 0.2,
  glasRoughness: 0,
  glasMetalness: 0,
  glasEnvMapIntensity: 1,
  polyOpacity: 0.65,
  polyRoughness: 0.3,
  polyMetalness: 0,
  polyEnvMapIntensity: 1,
  polyKammergroesse: 0.05,
  keilAbschnitt: 0,
  keilTeiler: 0,
  dicke: 0.07
});

const rahmenwandDynamicModel = createWandModel(
  WAND_TYP.RAHMENWAND,
  "Rahmenwand",
  {
    glasTyp: 0,
    glasOpacity: 0.2,
    glasRoughness: 0,
    glasMetalness: 0,
    glasEnvMapIntensity: 1,
    polyOpacity: 0.65,
    polyRoughness: 0.3,
    polyMetalness: 0,
    polyEnvMapIntensity: 1,
    polyKammergroesse: 0.05,
    rahmenTyp: 1,
    rahmenHoehe: 0.5,
    maxScheibenBreite: 1.2,
    aufDachneigung: 0,
    keil: 0
  },
  ["profil", "glasOben", "glasUnten"]
);

const schiebetuerDynamicModel = createWandModel(WAND_TYP.SCHIEBETUER, "Schiebetür", {
  glasTyp: 0,
  glasOpacity: 0.2,
  glasRoughness: 0,
  glasMetalness: 0,
  glasEnvMapIntensity: 1,
  polyOpacity: 0.65,
  polyRoughness: 0.3,
  polyMetalness: 0,
  polyEnvMapIntensity: 1,
  polyKammergroesse: 0.05,
  mitRahmen: 0,
  tuertypPanels: 0,
  maxPanelBreite: 0.8,
  festeElemente: 0,
  oeffnung: 0,
  laufrichtung: 0,
  schienenSeite: 0,
  buersten: 1,
  griffTyp: 0,
  griffAnordnung: 0,
  griffPosition: 0,
  griffSeite: 2,
  griffHoehe: 1,
  keil: 0,
  glasDicke: 8e-3,
  rahmenBreite: 0.04
});

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

const UNTERDACH_OFFSET = 5e-3;
function useBeschattungGeometry(props) {
  const ctx = useVerandaGeometry();
  const eindeckungInfo = useEindeckungInfo();
  const width = ctx.width;
  const depth = ctx.depth;
  const height = ctx.height;
  const dachneigung = ctx.dachneigung;
  const dachVorsprung = ctx.dachVorsprung;
  const sparrenAnzahl = eindeckungInfo.sparrenAnzahl > 0 ? eindeckungInfo.sparrenAnzahl : ctx.sparrenAnzahl;
  const sparrenBreite = ctx.sparrenBreite;
  const sparrenHoehe = ctx.sparrenHoehe;
  const pfostenBreite = ctx.pfostenBreite;
  const pfostenTiefe = ctx.pfostenTiefe;
  const schwelle = ctx.schwelle;
  const schwelleBreite = ctx.schwelleBreite;
  const pfette = ctx.pfette;
  const pfettenBreite = ctx.pfettenBreite;
  const sparrenAuflage = ctx.sparrenAuflage;
  const innenliegend = sparrenAuflage !== void 0 && Number(sparrenAuflage) === 1;
  const { hoeheVorne: hRawVorne, hoeheHinten: hRawHinten } = calcVerandaGeometry(depth, dachneigung, height);
  const quertraegerTiefeVorne = Number(schwelle) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const quertraegerTiefeHinten = Number(pfette) === 1 ? Math.max(pfettenBreite, pfostenTiefe) : 0;
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
  const sparrenTopVorne = innenliegend ? hoeheVorne : hoeheVorne + sparrenHoehe;
  const sparrenTopHinten = innenliegend ? hoeheHinten : hoeheHinten + sparrenHoehe;
  const sparrenBodenVorne = innenliegend ? hoeheVorne - sparrenHoehe : hoeheVorne;
  const sparrenBodenHinten = innenliegend ? hoeheHinten - sparrenHoehe : hoeheHinten;
  const yUnterdachVorne = sparrenBodenVorne - UNTERDACH_OFFSET;
  const yUnterdachHinten = sparrenBodenHinten - UNTERDACH_OFFSET;
  const aufdachExtra = eindeckungInfo.glasDicke + eindeckungInfo.glasLeistenHoehe;
  const yAufdachVorne = sparrenTopVorne + aufdachExtra;
  const yAufdachHinten = sparrenTopHinten + aufdachExtra;
  const neigungRad = Math.atan2(hRawHinten - hRawVorne, depth);
  const wandHorizTiefe = eindeckungInfo.wandanschlussAktiv ? eindeckungInfo.wandanschlussTiefe * Math.cos(neigungRad) : 0;
  const zHintenAufdach = Math.max(zHinten, depth / 2 - wandHorizTiefe);
  const zVorneUnterdach = -depth / 2 + dachVorsprung + quertraegerTiefeVorne;
  const zHintenUnterdach = depth / 2 - quertraegerTiefeHinten;
  const sparrenTiefeUnterdach = zHintenUnterdach - zVorneUnterdach;
  const querbalkenBreite = width + pfostenBreite;
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
    zHinten,
    sparrenTiefe,
    yUnterdachVorne,
    yUnterdachHinten,
    ySparrenUKVorne: sparrenBodenVorne,
    ySparrenUKHinten: sparrenBodenHinten,
    yAufdachVorne,
    yAufdachHinten,
    sparrenPositions,
    panelGaps,
    zHintenAufdach,
    zHintenUnterdach,
    sparrenTiefeUnterdach
  };
}

const DEFAULT_SCENE_MODE = {
  nightMode: false,
  shadingMode: false,
  alignment: false
};
const SceneModeContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT_SCENE_MODE);
function useSceneMode() {
  return veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(SceneModeContext);
}

const KASSETTE_R = 0.065;
const SCHIENE_W = 0.025;
const SCHIENE_H = 0.05;
const SCHIENE_BOTTOM_H = 0.02;
const FUEHRUNG_T = 5e-3;
const HALTER_KLEMME_W = 0.02;
const HALTER_KLEMME_H = 8e-3;
const HALTER_KLEMME_T = 0.05;
const HALTER_STAB_W = 0.01;
const WINKEL_W = 0.02;
const WINKEL_L = 0.02;
const WINKEL_T = 5e-3;
const AUSLAUF_H = 0.012;
const AUSLAUF_T = 0.05;
const AUSLAUF_RUND_R = 6e-3;
const KEIL_FRAME_SW = 0.06;
const StoffMesh = ({ stoffBreite, yCenter, stoffStartZ, stoffSchraeg, effektiveTiefe, material }) => {
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
      children: material ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: material, attach: "material" }, material.uuid) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: "#f5f0e6", transparent: true, opacity: 0.9, metalness: 0, roughness: 0.8, side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide })
    }
  );
};
function MarkiseModel(props) {
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
    anbringung = 2,
    mitKeil = 1,
    winkel = 0,
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const markiseTyp = Number(_mt);
  const kastenArtN = Number(kastenArt);
  const halterungenN = Number(halterungen);
  const mitKeilN = Number(mitKeil);
  const anbringungN = Number(anbringung);
  const winkelN = Number(winkel);
  const isAufdach = markiseTyp === 0;
  const isUnterdach = markiseTyp === 1;
  const isSenkrecht = markiseTyp === 2;
  const ctx = useVerandaGeometry();
  const bgeo = useBeschattungGeometry();
  const { shadingMode } = useSceneMode();
  const wandSeiteCtx = useWandSeite();
  const oeffnung = shadingMode ? 1 : Math.max(0, Math.min(1, oeffnungsgrad));
  const profilMaterial = materials.profil;
  const stoffMaterial = materials.stoff;
  veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (profilMaterial) {
      profilMaterial.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
      profilMaterial.needsUpdate = true;
    }
  }, [profilMaterial]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!stoffMaterial) return;
    stoffMaterial.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
    if (isUnterdach) stoffMaterial.depthWrite = false;
    stoffMaterial.needsUpdate = true;
  }, [stoffMaterial, isUnterdach]);
  const segments = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcMarkiseSegmente(bgeo.sparrenPositions, bgeo.panelGaps, ctx.sparrenBreite, maxBreite),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bgeo.sparrenPositions, bgeo.panelGaps, ctx.sparrenBreite, maxBreite]
  );
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
      ctx.schwelleHoehe
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
      ctx.schwelleHoehe
    ]
  );
  const keilInfo = useKeilInfo();
  const effectiveSideCtx = wandSeiteCtx;
  const keilAbschnittCtx = keilInfo.keilAbschnitt[effectiveSideCtx] ?? 0;
  const isSideCtx = wandSeiteCtx === 0 || wandSeiteCtx === 1;
  const keilReduction = keilAbschnittCtx > 0 && isSideCtx && mitKeilN === 1 ? keilAbschnittCtx + KEIL_FRAME_SW : 0;
  if (isSenkrecht) {
    const isSide = wandSeiteCtx === 0 || wandSeiteCtx === 1;
    const isBack = wandSeiteCtx === 3;
    const freeWidth = wandGeo.wandBreite;
    const fullWidth = isSide ? ctx.depth : ctx.width;
    const markiseWidth = anbringungN === 1 ? fullWidth : freeWidth;
    const hasPfette = Number(ctx.pfette) === 1;
    const postHalfDepth = isSide ? ctx.pfostenBreite / 2 : isBack && hasPfette ? ctx.pfettenBreite / 2 : ctx.pfostenTiefe / 2;
    const wallSurfaceZ = anbringungN === 2 ? -postHalfDepth : postHalfDepth;
    const railSign = anbringungN === 0 || anbringungN === 2 ? -1 : 1;
    const railAbstand = Number(schienenAbstand);
    const ySign = -railSign;
    const kassetteR_sk = kassettenDurchmesser > 0 ? kassettenDurchmesser / 2 : KASSETTE_R;
    const kastenW_sk = kastenBreite > 0 ? kastenBreite : kassetteR_sk * 2;
    const kastenH_sk = kastenHoehe > 0 ? kastenHoehe : kassetteR_sk * 2;
    const baseHeight = isBack ? bgeo.ySparrenUKHinten : bgeo.ySparrenUKVorne;
    const kassetteTopY = baseHeight - keilReduction;
    const maxFall = wandGeo.zoneHoeheVorne - keilReduction;
    const gesamtFall = tiefe > 0 ? Math.min(tiefe, maxFall) : maxFall;
    const effFall = gesamtFall * oeffnung;
    const halfZ_sk = gesamtFall / 2;
    const kassetteZ_sk = halfZ_sk - kassetteR_sk;
    const stoffStartZ_sk = halfZ_sk - kassetteR_sk * 2;
    const stoffSchraeg_sk = Math.max(0, effFall - kassetteR_sk * 2);
    const auslaufZ_sk = stoffStartZ_sk - stoffSchraeg_sk;
    const railLength_sk = gesamtFall - kassetteR_sk - SCHIENE_W;
    const railCenterZ_sk = -(kassetteR_sk + SCHIENE_W) / 2;
    const groupY_sk = kassetteTopY - halfZ_sk;
    const railLift_sk = railAbstand;
    const railY_sk = ySign * (railLift_sk + SCHIENE_H / 2);
    const railBotY_sk = ySign * (SCHIENE_BOTTOM_H / 2);
    const kassetteY_sk = ySign * kassetteR_sk;
    const kassetteYEc_sk = ySign * (kastenH_sk / 2);
    const klemmeWandY_sk = ySign * railLift_sk;
    const klemmeSchY_sk = ySign * (HALTER_KLEMME_H / 2);
    const stabLen_sk = railLift_sk - HALTER_KLEMME_H;
    const stabY_sk = ySign * ((railLift_sk + HALTER_KLEMME_H) / 2);
    const showHalterSk = halterungenN === 1;
    const schieneOuterX = markiseWidth / 2;
    const stoffBr_sk = markiseWidth - SCHIENE_W * 2 - 0.02;
    const backHz_sk = halfZ_sk - kassetteR_sk * 2 - 0.02;
    const frontHz_sk = -halfZ_sk + 0.04;
    const halterZsSk = [backHz_sk, frontHz_sk];
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "group",
      {
        position: [wandGeo.posX, 0, wandGeo.posZ],
        rotation: [0, wandGeo.rotY, 0],
        userData: { modelId: props.id },
        name: props.name,
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, groupY_sk, wallSurfaceZ], rotation: [-Math.PI / 2, 0, 0], children: [
          kastenArtN === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [0, kassetteYEc_sk, kassetteZ_sk], castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [markiseWidth, kastenH_sk, kastenW_sk] }) }),
          kastenArtN !== 1 && kastenArtN !== 2 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [0, kassetteY_sk, kassetteZ_sk], rotation: [0, 0, Math.PI / 2], castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [kassetteR_sk, kassetteR_sk, markiseWidth, 32] }) }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [0, kassetteY_sk / 2, kassetteZ_sk], castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [markiseWidth, kassetteR_sk, kassetteR_sk * 2] }) })
          ] }),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "mesh",
            {
              position: [side * (schieneOuterX - SCHIENE_W / 2), railY_sk, railCenterZ_sk],
              castShadow: true,
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W, SCHIENE_H, railLength_sk] })
            },
            `rail-${side}`
          )),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "mesh",
            {
              position: [side * (schieneOuterX - SCHIENE_W / 2), railBotY_sk, railCenterZ_sk],
              castShadow: true,
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W, SCHIENE_BOTTOM_H, railLength_sk] })
            },
            `rail-bot-${side}`
          )),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "mesh",
            {
              position: [side * (schieneOuterX - SCHIENE_W - FUEHRUNG_T / 2), railY_sk, railCenterZ_sk],
              castShadow: true,
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FUEHRUNG_T, SCHIENE_W, oeffnung > 0 ? railLength_sk : 0.01] })
            },
            `guide-${side}`
          )),
          showHalterSk && [-1, 1].map(
            (side) => halterZsSk.map((hz, hi) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "group",
              {
                position: [side * (schieneOuterX - SCHIENE_W / 2), 0, hz],
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [0, klemmeWandY_sk, 0], castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W, HALTER_KLEMME_H, HALTER_KLEMME_T] }) }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [0, klemmeSchY_sk, 0], castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W, HALTER_KLEMME_H, HALTER_KLEMME_T] }) }),
                  stabLen_sk > 1e-3 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [0, stabY_sk, 0], castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_STAB_W, stabLen_sk, HALTER_STAB_W] }) })
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
              material: stoffMaterial
            }
          ),
          oeffnung > 0 && stoffSchraeg_sk > 0.01 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, railY_sk, auslaufZ_sk + AUSLAUF_T / 2], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [stoffBr_sk, AUSLAUF_H, AUSLAUF_T] }) }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { position: [0, 0, -AUSLAUF_T / 2], rotation: [0, 0, Math.PI / 2], castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [AUSLAUF_RUND_R, AUSLAUF_RUND_R, stoffBr_sk, 16] }) })
          ] })
        ] })
      }
    );
  }
  const railLift = schienenAbstand > 0 ? Number(schienenAbstand) : 0;
  const showHalter = halterungenN === 1;
  const showWinkel = winkelN === 1;
  const kassetteR = kassettenDurchmesser > 0 ? kassettenDurchmesser / 2 : KASSETTE_R;
  const kastenW = kastenBreite > 0 ? kastenBreite : kassetteR * 2;
  const kastenH = kastenHoehe > 0 ? kastenHoehe : kassetteR * 2;
  const unterdachZHinten = ctx.depth / 2;
  const tiefeLimit = isAufdach ? bgeo.zHintenAufdach - bgeo.zVorne : bgeo.sparrenTiefeUnterdach + (ctx.depth / 2 - bgeo.zHintenUnterdach);
  const gesamtTiefe = tiefe > 0 ? Math.min(tiefe, tiefeLimit) : tiefeLimit;
  const effektiveTiefe = gesamtTiefe * oeffnung;
  const neigungRad = isAufdach ? gesamtTiefe > 0 ? Math.atan2(bgeo.yAufdachHinten - bgeo.yAufdachVorne, gesamtTiefe) : 0 : ctx.dachneigung * Math.PI / 180;
  const schraegeTiefe = gesamtTiefe / Math.cos(neigungRad);
  const zCenter = isAufdach ? (bgeo.zVorne + bgeo.zHintenAufdach) / 2 : unterdachZHinten - gesamtTiefe / 2;
  const yMitte = isAufdach ? bgeo.yAufdachVorne + (bgeo.yAufdachHinten - bgeo.yAufdachVorne) / 2 : bgeo.ySparrenUKVorne + Math.tan(neigungRad) * (zCenter - bgeo.zVorne) + 1e-3;
  const halfZ = schraegeTiefe / 2;
  const kassetteZ = halfZ - kassetteR;
  const kassetteD = kassetteR * 2;
  const stoffStartZ = halfZ - kassetteD;
  const stoffSchraeg = Math.max(0, effektiveTiefe / Math.cos(neigungRad) - kassetteD);
  const auslaufZ = stoffStartZ - stoffSchraeg;
  const railLength = schraegeTiefe - kassetteR - SCHIENE_W;
  const railCenterZ = -(kassetteR + SCHIENE_W) / 2;
  const backHz = halfZ - kassetteD - 0.02;
  const frontHz = -halfZ + 0.04;
  const halterZPositions = [backHz, frontHz];
  const winkelBackHz = halfZ - kassetteD;
  const winkelZPositions = [winkelBackHz, (winkelBackHz + frontHz) / 2, frontHz];
  const effectiveRailDrop = railLift;
  const railCenterY = -(effectiveRailDrop + SCHIENE_H / 2);
  const railBottomCenterY = -SCHIENE_BOTTOM_H / 2;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: props.id },
      name: props.name,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, yMitte, zCenter], rotation: [-neigungRad, 0, 0], children: segments.map((seg, si) => {
        const segW = seg.width;
        const railInner = isUnterdach && showWinkel ? ctx.sparrenBreite : 0;
        const schieneOuterX = segW / 2 - railInner;
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [seg.centerX, 0, 0], children: [
          kastenArtN === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "mesh",
            {
              position: isUnterdach ? [0, -(effectiveRailDrop + kassetteR), kassetteZ] : [0, kastenH / 2, kassetteZ],
              castShadow: true,
              receiveShadow: true,
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                "boxGeometry",
                {
                  args: isUnterdach ? [segW, kassetteR * 2, kassetteR * 2] : [segW, kastenH, kastenW]
                }
              )
            }
          ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              "mesh",
              {
                position: isUnterdach ? [0, -(effectiveRailDrop + kassetteR), kassetteZ] : [0, kassetteR, kassetteZ],
                rotation: [0, 0, Math.PI / 2],
                castShadow: true,
                receiveShadow: true,
                material: profilMaterial,
                children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [kassetteR, kassetteR, segW, 32] })
              }
            ),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              "mesh",
              {
                position: isUnterdach ? [0, -(effectiveRailDrop + kassetteR / 2), kassetteZ] : [0, kassetteR / 2, kassetteZ],
                castShadow: true,
                receiveShadow: true,
                material: profilMaterial,
                children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [segW, kassetteR, kassetteR * 2] })
              }
            )
          ] }),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "mesh",
            {
              position: [
                side * (schieneOuterX - SCHIENE_W / 2),
                isUnterdach ? railCenterY : railLift + SCHIENE_H / 2,
                railCenterZ
              ],
              castShadow: true,
              receiveShadow: true,
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W, SCHIENE_H, railLength] })
            },
            `rail-${side}`
          )),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "mesh",
            {
              position: [
                side * (schieneOuterX - SCHIENE_W / 2),
                isUnterdach ? railBottomCenterY : SCHIENE_BOTTOM_H / 2,
                railCenterZ
              ],
              castShadow: true,
              receiveShadow: true,
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W, SCHIENE_BOTTOM_H, railLength] })
            },
            `rail-bot-${side}`
          )),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "mesh",
            {
              position: [
                side * (schieneOuterX - SCHIENE_W - FUEHRUNG_T / 2),
                isUnterdach ? railCenterY : railLift + SCHIENE_H / 2,
                railCenterZ
              ],
              castShadow: true,
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                "boxGeometry",
                {
                  args: [FUEHRUNG_T, SCHIENE_W, oeffnung > 0 ? railLength : 0.01]
                }
              )
            },
            `guide-${side}`
          )),
          [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            "mesh",
            {
              position: [
                side * (schieneOuterX - SCHIENE_W / 2),
                isUnterdach ? railCenterY : railLift + SCHIENE_H / 2,
                railCenterZ - railLength / 2
              ],
              rotation: [0, 0, Math.PI / 2],
              castShadow: true,
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                "cylinderGeometry",
                {
                  args: [SCHIENE_H / 2, SCHIENE_H / 2, SCHIENE_W - 5e-3, 32]
                }
              )
            },
            `cap-${side}`
          )),
          showHalter && [-1, 1].map(
            (side) => halterZPositions.map((hz, hi) => {
              const stabLen = isUnterdach ? effectiveRailDrop - HALTER_KLEMME_H : railLift - HALTER_KLEMME_H;
              return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                "group",
                {
                  position: [side * (schieneOuterX - SCHIENE_W / 2), 0, hz],
                  children: [
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                      "mesh",
                      {
                        position: [0, isUnterdach ? -HALTER_KLEMME_H / 2 : railLift, 0],
                        castShadow: true,
                        material: profilMaterial,
                        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W, HALTER_KLEMME_H, HALTER_KLEMME_T] })
                      }
                    ),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                      "mesh",
                      {
                        position: [0, isUnterdach ? -(effectiveRailDrop + SCHIENE_H / 2) : HALTER_KLEMME_H / 2, 0],
                        castShadow: true,
                        material: profilMaterial,
                        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W, HALTER_KLEMME_H, HALTER_KLEMME_T] })
                      }
                    ),
                    stabLen > 1e-3 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                      "mesh",
                      {
                        position: [0, isUnterdach ? -(HALTER_KLEMME_H / 2 + stabLen / 2) : (railLift + HALTER_KLEMME_H) / 2, 0],
                        castShadow: true,
                        material: profilMaterial,
                        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_STAB_W, stabLen, HALTER_STAB_W] })
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
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "mesh",
                    {
                      position: [side * (ctx.sparrenBreite / 2), -WINKEL_T / 2, 0],
                      castShadow: true,
                      material: profilMaterial,
                      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [ctx.sparrenBreite, WINKEL_T, WINKEL_L] })
                    }
                  ),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "mesh",
                    {
                      position: [-side * (SCHIENE_W / 2), -0.015, 0],
                      castShadow: true,
                      material: profilMaterial,
                      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [WINKEL_T, WINKEL_W, WINKEL_L] })
                    }
                  )
                ]
              },
              `wkl-${side}-${wi}`
            ))
          ),
          oeffnung > 0 && stoffSchraeg > 0.01 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            StoffMesh,
            {
              stoffBreite: isUnterdach ? segW - 2 * railInner - SCHIENE_W * 2 - 0.02 : segW - SCHIENE_W * 2 - 0.02,
              yCenter: isUnterdach ? -(effectiveRailDrop + SCHIENE_H / 2) : railLift + SCHIENE_H / 2,
              stoffStartZ,
              stoffSchraeg,
              effektiveTiefe,
              material: stoffMaterial
            },
            `stoff-${si}`
          ),
          oeffnung > 0 && stoffSchraeg > 0.01 && (() => {
            const auslaufBreite = segW - (isUnterdach ? 2 * railInner : 0) - SCHIENE_W * 2;
            return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "group",
              {
                position: [
                  0,
                  isUnterdach ? railCenterY : railLift + SCHIENE_H / 2,
                  auslaufZ + AUSLAUF_T / 2
                ],
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { castShadow: true, material: profilMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "boxGeometry",
                    {
                      args: [auslaufBreite, AUSLAUF_H, AUSLAUF_T]
                    }
                  ) }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "mesh",
                    {
                      position: [0, 0, -AUSLAUF_T / 2],
                      rotation: [0, 0, Math.PI / 2],
                      castShadow: true,
                      material: profilMaterial,
                      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                        "cylinderGeometry",
                        {
                          args: [AUSLAUF_RUND_R, AUSLAUF_RUND_R, auslaufBreite, 16]
                        }
                      )
                    }
                  )
                ]
              }
            );
          })()
        ] }, si);
      }) })
    }
  );
}
const markisePropsSchema = {
  markiseTyp: { type: "radioGroup", label: "Typ", options: [
    { value: "0", label: "Aufdach" },
    { value: "1", label: "Unterdach" },
    { value: "2", label: "Senkrecht" }
  ] },
  tiefe: { type: "expression", label: "Ausfahrlänge / Fallhöhe (m, 0=auto)" },
  oeffnungsgrad: { type: "expression", label: "Öffnungsgrad (0–1)" },
  maxBreite: { type: "expression", label: "Max. Segmentbreite – Auf/Unterdach (m, 0=kein Limit)" },
  kastenArt: { type: "radioGroup", label: "Kastenart", options: [
    { value: "0", label: "Rund" },
    { value: "1", label: "Eckig" },
    { value: "2", label: "Ohne" }
  ] },
  halterungen: { type: "radioGroup", label: "Halterungen", options: [
    { value: "0", label: "Nein" },
    { value: "1", label: "Ja" }
  ] },
  schienenAbstand: { type: "expression", label: "Schienenabstand / Wandabstand (m, 0=Standard)" },
  winkel: { type: "expression", label: "Winkelkonsolen – Unterdach (0=nein, 1=ja)" },
  kassettenDurchmesser: { type: "expression", label: "Kassettendurchmesser – Aufdach (m, 0=Std)" },
  kastenBreite: { type: "expression", label: "Kastenbreite – Aufdach (m, 0=Std)" },
  kastenHoehe: { type: "expression", label: "Kastenhoehe – Aufdach (m, 0=Std)" },
  anbringung: { type: "radioGroup", label: "Anbringung – Senkrecht", options: [
    { value: "0", label: "Zwischen" },
    { value: "1", label: "Außen" },
    { value: "2", label: "Innen" }
  ] },
  mitKeil: { type: "expression", label: "Keil berücksichtigen – Senkrecht (0=nein, 1=ja)" }
};
const markiseDynamicModel = {
  type: "veranda-markise",
  label: "Markise",
  description: "Auf-/Unterdach-/Senkrechtmarkise (über markiseTyp wählbar). Senkrecht: im Wand-Slot platzieren.",
  defaultProps: {
    markiseTyp: "0",
    tiefe: { expression: "0" },
    maxBreite: { expression: "0" },
    oeffnungsgrad: { expression: "1" },
    kastenArt: "0",
    schienenAbstand: { expression: "0" },
    halterungen: "1",
    kassettenDurchmesser: { expression: "0" },
    kastenBreite: { expression: "0" },
    kastenHoehe: { expression: "0" },
    anbringung: "2",
    mitKeil: { expression: "1" },
    winkel: { expression: "0" }
  },
  propsDialog: markisePropsSchema,
  component: MarkiseModel,
  materials: ["profil", "stoff"],
  disabledForAR: false
};

function createBeschattungUnterdachModel(config) {
  const { VariantContent } = config;
  function BeschattungModel(props) {
    const {
      tiefe = 2,
      opacity = 0.8,
      oeffnungsgrad = 1,
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
    veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
      if (stoffMaterial) {
        stoffMaterial.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
        stoffMaterial.needsUpdate = true;
      }
    }, [stoffMaterial]);
    const geo = useBeschattungGeometry();
    const stoffDicke = Math.max(
      1e-3,
      Number(props.stoffDicke ?? 3e-3)
    );
    const maxBreite = Math.max(
      0,
      Number(props.maxBreite ?? 0) || 0
    );
    const beschattungTiefe = Math.min(
      tiefe,
      geo.sparrenTiefeUnterdach
    );
    const effektiveTiefe = beschattungTiefe * oeffnung;
    const pivotY = geo.sparrenTiefe > 0 ? geo.yUnterdachVorne + (geo.yUnterdachHinten - geo.yUnterdachVorne) * (geo.sparrenTiefeUnterdach / geo.sparrenTiefe) : geo.yUnterdachHinten;
    const pivotZ = geo.zHintenUnterdach;
    const neigungRad = geo.sparrenTiefe > 0 ? Math.atan2(
      geo.yUnterdachHinten - geo.yUnterdachVorne,
      geo.sparrenTiefe
    ) : 0;
    const montage = Number(props.montage ?? -1);
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
    disabledForAR: false
  };
}

function createLamellenProfil(breite, dicke) {
  const s = new veranda_mf_2_plugin__loadShare__three__loadShare__.Shape();
  const halbB = breite / 2;
  const woelbung = dicke * 1.5;
  s.moveTo(-halbB, 0);
  s.lineTo(halbB, 0);
  s.quadraticCurveTo(halbB * 0.5, woelbung, 0, woelbung * 1.2);
  s.quadraticCurveTo(-halbB * 0.5, woelbung, -halbB, 0);
  s.closePath();
  return s;
}
function LamellenContent({ ctx, allProps }) {
  const { geo, beschattungTiefe, farbeHex, stoffMaterial, stoffDicke, shadingMode } = ctx;
  const lamellenAnzahl = allProps.lamellenAnzahl ?? 10;
  const lamellenWinkel = allProps.lamellenWinkel ?? 45;
  const oeffnungsgrad = allProps.oeffnungsgrad;
  const effektiverWinkel = shadingMode ? 0 : oeffnungsgrad !== void 0 && oeffnungsgrad !== null ? oeffnungsgrad * 90 : lamellenWinkel;
  const lamellenWinkelRad = effektiverWinkel * Math.PI / 180;
  const lamelleDicke = stoffDicke;
  const lamelleBreiteZ = beschattungTiefe / Math.max(lamellenAnzahl, 1);
  const lamellenZPositions = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (lamellenAnzahl <= 0) return [];
    const count = Math.max(1, Math.round(lamellenAnzahl));
    const spacing = beschattungTiefe / count;
    return Array.from(
      { length: count },
      (_, i) => -beschattungTiefe / 2 + spacing * (i + 0.5)
    );
  }, [lamellenAnzahl, beschattungTiefe]);
  const lamellenGeos = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    return geo.panelGaps.map((gap) => {
      const profil = createLamellenProfil(
        lamelleBreiteZ * 0.92,
        lamelleDicke
      );
      const geoObj = new veranda_mf_2_plugin__loadShare__three__loadShare__.ExtrudeGeometry(profil, {
        depth: gap.panelWidth,
        bevelEnabled: false
      });
      geoObj.translate(0, 0, -gap.panelWidth / 2);
      return geoObj;
    });
  }, [geo.panelGaps, lamelleBreiteZ, lamelleDicke]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: geo.panelGaps.map((gap, gIdx) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "group",
    {
      position: [gap.centerX, 0, 0],
      children: lamellenZPositions.map((zPos, lIdx) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
        "group",
        {
          position: [0, -lamelleDicke, zPos],
          rotation: [lamellenWinkelRad, 0, 0],
          children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
              "mesh",
              {
                rotation: [0, Math.PI / 2, 0],
                geometry: lamellenGeos[gIdx],
                receiveShadow: true,
                castShadow: true,
                name: "stoff",
                material: stoffMaterial,
                children: !stoffMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                  "meshPhysicalMaterial",
                  {
                    color: farbeHex,
                    metalness: 0.5,
                    roughness: 0.28,
                    clearcoat: 0.4,
                    clearcoatRoughness: 0.15
                  }
                )
              }
            ),
            [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [
                  side * (gap.panelWidth / 2 + 1e-3),
                  lamelleDicke / 2,
                  0
                ],
                rotation: [0, 0, Math.PI / 2],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "cylinderGeometry",
                    {
                      args: [2e-3, 2e-3, 8e-3, 8]
                    }
                  ),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: stoffMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "meshPhysicalMaterial",
                    {
                      color: "#808080",
                      roughness: 0.3,
                      metalness: 0.7
                    }
                  ) })
                ]
              },
              `achse-${side}`
            ))
          ]
        },
        `lamelle-${gIdx}-${lIdx}`
      ))
    },
    `lamellen-panel-${gIdx}`
  )) });
}
const lamellenPropsSchema = {
  lamellenAnzahl: { type: "expression", label: "Anzahl" },
  lamellenWinkel: { type: "expression", label: "Winkel (°)" },
  stoffDicke: { type: "expression", label: "Dicke (m)" },
  tiefe: { type: "expression", label: "Tiefe (m)" },
  oeffnungsgrad: { type: "expression", label: "Öffnungsgrad (0–1)" }
};
const lamellenDynamicModel = createBeschattungUnterdachModel({
  type: "veranda-lamellen",
  label: "Lamellen",
  description: "Parametrische Lamellen-Beschattung mit schwenkbaren Lamellen",
  defaultProps: {
    tiefe: { expression: "2" },
    lamellenAnzahl: { expression: "10" },
    lamellenWinkel: { expression: "45" },
    stoffDicke: { expression: "0.003" }
  },
  VariantContent: LamellenContent,
  fallbackStoffFarbe: "#c0c0c0",
  propsDialog: lamellenPropsSchema
});

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
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: effectivePanelGaps.map((gap, gIdx) => {
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
          ),
          [-1, 0, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [side * (innerW * 0.33), 0, 0],
              rotation: [Math.PI / 2, 0, 0],
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
            `draht-pli-${side}`
          ))
        ]
      },
      `plissee-panel-${gIdx}`
    );
  }) });
}
const plisseePropsSchema = {
  tiefe: { type: "expression", label: "Tiefe (m)" },
  oeffnungsgrad: { type: "expression", label: "Öffnungsgrad (0–1)" },
  plisseeSegmente: { type: "expression", label: "Falt-Segmente" },
  anzahlFelder: { type: "expression", label: "Anzahl Felder (0=auto)" },
  stoffDicke: { type: "expression", label: "Stoffdicke (m)" },
  opacity: { type: "expression", label: "Transparenz (0–1)" }
};
const plisseeDynamicModel = createBeschattungUnterdachModel({
  type: "veranda-plissee",
  label: "Plissee (Faltstore)",
  description: "Faltstoren-Beschattung mit parametrischen Faltsegmenten",
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
  propsDialog: plisseePropsSchema
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
  fuehrungsGeo,
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
    [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "mesh",
      {
        position: [
          side * (innerW / 2 + FUEHRUNGS_W / 2),
          0,
          -beschattungTiefe / 2 - 6e-3
        ],
        geometry: fuehrungsGeo,
        castShadow: true,
        children: profilMat
      },
      `schiene-${side}`
    )),
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
        renderOrder: idx,
        receiveShadow: true,
        castShadow: true,
        name: "stoff",
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: stoffMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          "meshPhysicalMaterial",
          {
            color: farbeHex,
            roughness: 0.9,
            metalness: 0,
            sheen: 0.7,
            sheenRoughness: 0.5,
            sheenColor: farbeHex,
            envMapIntensity: 0.15,
            transparent: opacity < 1,
            opacity,
            side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide
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
    fuehrungsGeo,
    farbeHex,
    kassetteHex,
    opacity,
    gestellMaterial,
    stoffMaterial
  };
  if (zwischensparren) {
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: effectivePanelGaps.map((gap, gIdx) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      "group",
      {
        position: [gap.centerX, yOffset, 0],
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          StoffPanel,
          {
            ...panelProps,
            innerW: gap.panelWidth - schienenBreite * 2
          }
        )
      },
      `zw-${gIdx}`
    )) });
  }
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: segments.map((seg, sIdx) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [seg.centerX, yOffset, 0], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    StoffPanel,
    {
      ...panelProps,
      innerW: seg.width
    }
  ) }, `seg-${sIdx}`)) });
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
  label: "Stoff (Faltmarkise)",
  description: "Faltmarkise mit hängenden Stoffsegmenten",
  defaultProps: {
    tiefe: { expression: "2" },
    opacity: { expression: "0.8" },
    oeffnungsgrad: { expression: "1" },
    montage: { expression: "0" },
    anzahlFelder: { expression: "0" },
    segmentLaenge: { expression: "0.1" },
    durchhang: { expression: "1" },
    stoffDicke: { expression: "0.003" }
  },
  VariantContent: StoffContent,
  propsDialog: stoffPropsSchema
});

const Plugin = {
  id: "oc.veranda.plugin",
  version: "1.0.0",
  viewer: {
    sceneComponents: {
      "oc.veranda.shadowLighting": shadowLightingSceneComponent
    },
    models: [
      // Root
      verandaDynamicModel,
      qubusDynamicModel,
      carportDynamicModel,
      // Eindeckung
      glasEindeckungDynamicModel,
      metallEindeckungDynamicModel,
      lamellenEindeckungDynamicModel,
      solarEindeckungDynamicModel,
      // Regenrinne
      regenrinneDynamicModel,
      // Pfosten
      pfostenDynamicModel,
      // Wand
      keilDynamicModel,
      rahmenwandDynamicModel,
      schiebetuerDynamicModel,
      // shuttersDynamicModel, // TODO: re-enable nach Fehlerbehebung
      // flankenwandDynamicModel, // TODO: re-enable nach Fehlerbehebung
      // Beschattung
      markiseDynamicModel,
      lamellenDynamicModel,
      plisseeDynamicModel,
      stoffDynamicModel
      // kassettenmarkiseDynamicModel, // TODO: re-enable nach Fehlerbehebung
    ]
  }
};

export { Plugin as default };
