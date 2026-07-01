import { v as veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__, a as index_cjs } from './veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__-YRia8a0_.js';
import { v as veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__ } from './veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__-YXVZxRVS.js';
import { v as veranda_mf_2_plugin__loadShare__react__loadShare__, R as React } from './veranda_mf_2_plugin__loadShare__react__loadShare__-BxvQ6I45.js';
import { v as veranda_mf_2_plugin__loadShare__three__loadShare__ } from './veranda_mf_2_plugin__loadShare__three__loadShare__-DDzdASzq.js';
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
    defaultModelId: "veranda-markise"
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
  },
  led: {
    id: "veranda-slot-led",
    name: "LED Beleuchtung"
  }
};
const QUBUS_SLOTS = {
  stuetzstruktur: {
    id: "qubus-slot-stuetzstruktur"},
  ueberdachung: {
    id: "qubus-slot-ueberdachung"},
  beschattung: {
    id: "qubus-slot-beschattung"},
  wandLinks: {
    id: "qubus-slot-wand-links"},
  wandRechts: {
    id: "qubus-slot-wand-rechts"},
  wandVorne: {
    id: "qubus-slot-wand-vorne"},
  wandHinten: {
    id: "qubus-slot-wand-hinten"},
  led: {
    id: "qubus-slot-led"}
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
  depthWrite,
  clippingPlanes,
  materialType = "physical",
  renderOrder = 0
}) => {
  const fallbackRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  if (!fallbackRef.current) {
    if (materialType === "basic") {
      const mat = new veranda_mf_2_plugin__loadShare__three__loadShare__.MeshBasicMaterial({
        color: fallbackColor,
        transparent: transparent ?? false,
        opacity: opacity ?? 1,
        side,
        depthWrite: depthWrite ?? !(transparent ?? false)
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
        side,
        depthWrite: depthWrite ?? !(transparent ?? false)
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
    }
    mat.side = side;
    if (depthWrite !== void 0) mat.depthWrite = depthWrite;
    mat.needsUpdate = true;
  }, [fallbackColor, transparent, opacity, metalness, roughness, side, depthWrite]);
  const activeMat = React.useMemo(() => {
    const baseMat = material ?? fallbackRef.current;
    if (clippingPlanes && clippingPlanes.length > 0) {
      const cloned = baseMat.clone();
      cloned.clippingPlanes = clippingPlanes;
      cloned.clipShadows = true;
      cloned.needsUpdate = true;
      return cloned;
    }
    return baseMat;
  }, [material, clippingPlanes, fallbackColor, transparent, opacity, metalness, roughness, side, depthWrite]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    return () => {
      if (activeMat !== material && activeMat !== fallbackRef.current) {
        activeMat.dispose();
      }
    };
  }, [activeMat, material]);
  if (children) {
    if (material) {
      return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: activeMat, attach: "material" }, activeMat.uuid);
    }
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children });
  }
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("primitive", { object: activeMat, attach: "material" }, activeMat.uuid);
};

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
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (isNaN(breite) || isNaN(tiefe) || isNaN(hoehe) || hoehe <= 0) {
      return null;
    }
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
  if (!geometry) return null;
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
          envMapIntensity
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
          envMapIntensity
        }
      )
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "polySteg", position: [-breite / 2 + STEG_DICKE / 2, 0, 0], castShadow: false, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, innenHoehe, tiefe] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: farbe, roughness })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "polySteg", position: [breite / 2 - STEG_DICKE / 2, 0, 0], castShadow: false, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, innenHoehe, tiefe] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: farbe, roughness })
    ] }),
    stegePositionen.map((x, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "polySteg", position: [x, 0, 0], castShadow: false, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, innenHoehe, tiefe] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: farbe, roughness })
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
  const glasPanels = useGlasPanels(sparren.alle, sparrenBreite);
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
    opacity,
    roughness,
    metalness,
    envMapIntensity,
    kammergroesse,
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
  const geometry = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    const [w, h, d] = args;
    if (isNaN(w) || isNaN(h) || isNaN(d) || w <= 0 || h <= 0 || d <= 0) {
      return null;
    }
    return new veranda_mf_2_plugin__loadShare__three__loadShare__.BoxGeometry(w, h, d);
  }, [args[0], args[1], args[2]]);
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

function exprVal(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "expression" in v) {
    return String(v.expression ?? "");
  }
  return String(v ?? "");
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
  qubusOffset: 0,
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

const DEFAULT_ENVIRONMENT = {
  intensity: 2,
  lightColor: "#ffffff",
  envIntensity: 0.4,
  lightPosition: [5, 30, -10],
  hdrUrl: "https://oc-k3.s3.eu-central-1.amazonaws.com/libs/3d/environments/city.hdr",
  ambientIntensity: 0.5,
  ambientColor: "#ffffff",
  shadowBias: -1e-3,
  isNight: false
};
const SceneEnvironmentContext = veranda_mf_2_plugin__loadShare__react__loadShare__.createContext(DEFAULT_ENVIRONMENT);
const useSceneEnvironment = () => veranda_mf_2_plugin__loadShare__react__loadShare__.useContext(SceneEnvironmentContext);
const SceneEnvironmentProvider = ({ value, children }) => {
  const contextValue = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => ({
    ...DEFAULT_ENVIRONMENT,
    ...value
  }), [value]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneEnvironmentContext.Provider, { value: contextValue, children });
};

const LIGHT_USER_DATA_KEY = "oc.veranda.shadowLight.v1";
function SceneShadowLight() {
  const { gl, scene, invalidate } = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useThree();
  const { intensity, lightColor, lightPosition, shadowBias, ambientIntensity, ambientColor } = useSceneEnvironment();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    gl.shadowMap.enabled = true;
    gl.localClippingEnabled = true;
    gl.shadowMap.type = veranda_mf_2_plugin__loadShare__three__loadShare__.PCFSoftShadowMap;
    gl.shadowMap.needsUpdate = true;
    let light = scene.children.find((c) => c.userData[LIGHT_USER_DATA_KEY]);
    let ambient = scene.children.find((c) => c.userData[LIGHT_USER_DATA_KEY + ".ambient"]);
    if (!light) {
      light = new veranda_mf_2_plugin__loadShare__three__loadShare__.DirectionalLight(lightColor, intensity);
      light.castShadow = true;
      light.userData[LIGHT_USER_DATA_KEY] = true;
      scene.add(light);
      scene.add(light.target);
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
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;
    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    light.shadow.camera.updateProjectionMatrix();
    light.intensity = intensity;
    light.color.set(new veranda_mf_2_plugin__loadShare__three__loadShare__.Color(lightColor));
    light.position.set(...lightPosition);
    light.shadow.bias = shadowBias;
    if (!ambient) {
      ambient = new veranda_mf_2_plugin__loadShare__three__loadShare__.AmbientLight(ambientColor, ambientIntensity);
      ambient.userData[LIGHT_USER_DATA_KEY + ".ambient"] = true;
      scene.add(ambient);
    }
    ambient.intensity = ambientIntensity;
    ambient.color.set(new veranda_mf_2_plugin__loadShare__three__loadShare__.Color(ambientColor));
    invalidate();
  }, [gl, scene, invalidate, intensity, lightColor, lightPosition, shadowBias, ambientIntensity, ambientColor]);
  return null;
}
const shadowLightingSceneComponent = {
  hoc: (Original) => (props) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Original, { ...props }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {})
  ] }),
  description: "Schattenlicht für Veranda-Szene (DirectionalLight + PCFSoftShadowMap)"
};

function QubusBar({ width, depth, height, rahmenBreite, rahmenHoehe, material }) {
  const rH = rahmenHoehe;
  const rB = rahmenBreite;
  const yCenter = height - rH / 2;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Box, { position: [0, yCenter, -depth / 2 + rB / 2], args: [width, rH, rB], material }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Box, { position: [0, yCenter, depth / 2 - rB / 2], args: [width, rH, rB], material }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Box, { position: [-width / 2 + rB / 2, yCenter, 0], args: [rB, rH, Math.max(1e-3, depth - 2 * rB)], material }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(Box, { position: [width / 2 - rB / 2, yCenter, 0], args: [rB, rH, Math.max(1e-3, depth - 2 * rB)], material })
  ] });
}
function KonstruktionModel(props) {
  const {
    konstruktionstyp = "veranda",
    width: propWidth = 4,
    height: propHeight = 2.5,
    depth: propDepth = 3,
    dachneigung: propDachneigung = 0,
    dachVorsprung: propDachVorsprung = 0,
    sparrenAnzahl: propSparrenAnzahl = 6,
    sparrenAuflage: propSparrenAuflage = 0,
    sparrenBreite: propSparrenBreite = 0.06,
    sparrenHoehe: propSparrenHoehe = 0.12,
    balkenAussenBreite: propBalkenAussenBreite = 0.06,
    balkenAussenHoehe: propBalkenAussenHoehe = 0.12,
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
  const kTyp = String(exprVal(konstruktionstyp)) || "veranda";
  const width = Math.max(0.01, getVal(propWidth, 4));
  const height = Math.max(0.01, getVal(propHeight, 2.5));
  const depth = Math.max(0.01, getVal(propDepth, 3));
  const dachneigung = getVal(propDachneigung, 0);
  const dachVorsprung = getVal(propDachVorsprung, 0);
  const sparrenAnzahl = Math.max(2, getVal(propSparrenAnzahl, 6));
  const sparrenBreite = Math.max(1e-3, getVal(propSparrenBreite, 0.06));
  const sparrenHoehe = Math.max(1e-3, getVal(propSparrenHoehe, 0.12));
  const sparrenAuflage = getVal(propSparrenAuflage, 0);
  const balkenAussenBreite = Math.max(1e-3, getVal(propBalkenAussenBreite, 0.06));
  const balkenAussenHoehe = Math.max(1e-3, getVal(propBalkenAussenHoehe, 0.12));
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
  const pfostenSlot = slots?.[VERANDA_SLOTS.pfosten.id] || slots?.[QUBUS_SLOTS.stuetzstruktur.id];
  const pfostenSlotProps = pfostenSlot?.[0]?.props;
  const pfostenBreiteVal = Math.max(1e-3, getVal(pfostenSlotProps?.pfostenBreite, 0.1));
  const pfostenTiefeVal = Math.max(1e-3, getVal(pfostenSlotProps?.pfostenTiefe, 0.1));
  const pfostenAnzahlVorneVal = Math.max(2, getVal(pfostenSlotProps?.pfostenAnzahlVorne, 2));
  const pfostenAnzahlHintenVal = Math.max(0, getVal(pfostenSlotProps?.pfostenAnzahlHinten, 2));
  const [pfostenAnzahlVorneCtx, setPfostenAnzahlVorneCtxState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(pfostenAnzahlVorneVal);
  const [pfostenAnzahlHintenCtx, setPfostenAnzahlHintenCtxState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(pfostenAnzahlHintenVal);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    setPfostenAnzahlVorneCtxState(pfostenAnzahlVorneVal);
  }, [pfostenAnzahlVorneVal]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    setPfostenAnzahlHintenCtxState(pfostenAnzahlHintenVal);
  }, [pfostenAnzahlHintenVal]);
  const setPfostenAnzahlVorne = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((val) => setPfostenAnzahlVorneCtxState((v) => Math.abs(v - val) < 1e-3 ? v : val), []);
  const setPfostenAnzahlHinten = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((val) => setPfostenAnzahlHintenCtxState((v) => Math.abs(v - val) < 1e-3 ? v : val), []);
  const eindeckungSlot = slots?.[VERANDA_SLOTS.eindeckung.id] || slots?.[QUBUS_SLOTS.ueberdachung.id];
  const rinneSlot = slots?.[VERANDA_SLOTS.rinne.id];
  const someBeschattungSlot = slots?.[VERANDA_SLOTS.beschattung.id] || slots?.[QUBUS_SLOTS.beschattung.id];
  const ledSlot = slots?.[VERANDA_SLOTS.led.id] || slots?.[QUBUS_SLOTS.led.id];
  const wandLinksSlot = slots?.[VERANDA_SLOTS.wandLinks.id] || slots?.[QUBUS_SLOTS.wandLinks.id];
  const wandRechtsSlot = slots?.[VERANDA_SLOTS.wandRechts.id] || slots?.[QUBUS_SLOTS.wandRechts.id];
  const wandVorneSlot = slots?.[VERANDA_SLOTS.wandVorne.id] || slots?.[QUBUS_SLOTS.wandVorne.id];
  const wandHintenSlot = slots?.[VERANDA_SLOTS.wandHinten.id] || slots?.[QUBUS_SLOTS.wandHinten.id];
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
  const [eindeckungInfo, setEindeckungInfoState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState({ glasDicke: 8e-3, glasLeistenHoehe: 0.02, wandanschlussAktiv: false, wandanschlussTiefe: 0.1, sparrenAnzahl: 6, qubusOffset: 0 });
  const { glasDicke, glasLeistenHoehe, wandanschlussAktiv, wandanschlussTiefe, sparrenAnzahl: eindeckungSparrenAnzahl, qubusOffset } = eindeckungInfo;
  const setEindeckungInfo = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((d, lh, wa, wt, sa, qo) => {
    setEindeckungInfoState({ glasDicke: d, glasLeistenHoehe: lh, wandanschlussAktiv: wa, wandanschlussTiefe: wt, sparrenAnzahl: sa, qubusOffset: qo });
  }, []);
  const [lamellenLedData, setLamellenLedDataState] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(null);
  const setLamellenLedData = veranda_mf_2_plugin__loadShare__react__loadShare__.useCallback((data) => {
    setLamellenLedDataState(data);
  }, []);
  const rinnenHoehe = getVal(rinneSlot?.[0]?.props?.rinnenHoehe, 0.08);
  const rinnenBreite = getVal(rinneSlot?.[0]?.props?.rinnenBreite, 0.12);
  const parentGeometry = {
    width,
    depth,
    height,
    dachVorsprung,
    rinnenHoehe,
    rinnenBreite,
    // Qubus: Rahmenbalken immer 0° → dachneigung=0 für Pfosten.
    // Eindeckung bekommt die echte Neigung.
    dachneigung: kTyp === "qubus" ? 0 : dachneigung,
    eindeckungDachneigung: kTyp === "qubus" ? dachneigung : void 0,
    pfostenAnzahlVorne: pfostenAnzahlVorneCtx,
    pfostenAnzahlHinten: pfostenAnzahlHintenCtx,
    pfostenBreite: pfostenBreiteVal,
    pfostenTiefe: pfostenTiefeVal,
    sparrenAnzahl,
    sparrenBreite,
    sparrenHoehe,
    sparrenAuflage,
    // Qubus hat keine Schwelle/Pfette/Staticträger – durch Rahmenbalken ersetzt
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
  };
  const renderSlotInstance = (inst, fallbackKey, forcedSegmentIndex) => {
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
      ...otherProps
    } = inst.props ?? {};
    const effectiveProps = { ...otherProps };
    if (forcedSegmentIndex !== void 0 && (otherProps.segmentIndex === void 0 || Number(exprVal(otherProps.segmentIndex)) === -1)) {
      effectiveProps.segmentIndex = forcedSegmentIndex;
    }
    const propsKey = JSON.stringify(effectiveProps);
    const key = `${fallbackKey}|${propsKey}`;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      Comp,
      {
        ...effectiveProps,
        id: inst.model?.id,
        modelAction: inst.modelAction,
        slots: inst.slots
      },
      key
    );
  };
  const auflageTyp = sparrenAuflage === 1 ? "innenliegend" : "aufliegend";
  const steigung = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandInfoContext.Provider, { value: {
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
  }, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(EindeckungInfoContext.Provider, { value: { glasDicke, glasLeistenHoehe, wandanschlussAktiv, wandanschlussTiefe, sparrenAnzahl: eindeckungSparrenAnzahl, qubusOffset, lamellenLedData, setEindeckungInfo, setLamellenLedData }, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(VerandaGeometryContext.Provider, { value: parentGeometry, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position, rotation, scale, userData: { modelId: props.id }, name: props.name, children: [
      pfostenSlot?.map((inst, i) => renderSlotInstance(inst, `pfosten-${i}`)),
      kTyp === "qubus" && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        QubusBar,
        {
          width,
          depth,
          height,
          rahmenBreite,
          rahmenHoehe,
          material: profilMaterial
        }
      ),
      kTyp === "veranda" && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        Dachflaeche,
        {
          sparrenAnzahl,
          sparrenBreite: balkenAussenBreite,
          sparrenHoehe: balkenAussenHoehe,
          gesamtBreite: width + pfostenBreiteVal,
          querbalkenBreite: width + pfostenBreiteVal,
          gesamtTiefe: depth,
          hoeheVorne,
          hoeheHinten,
          quertraegerHoehe: 0,
          quertraegerTiefe: schwelle === 1 ? schwelleBreite : 0,
          quertraegerTiefeHinten: pfette === 1 ? pfettenBreite : 0,
          auflage: auflageTyp,
          material: profilMaterial,
          sparrenModus: "nurAussen",
          eindeckung: "ohne",
          dachVorsprung
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
              args: [width + pfostenBreiteVal, schwelleHoehe, Math.max(1e-3, schwelleBreite)],
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: DEFAULT_FARBEN.holz })
            }
          ),
          staticTraeger === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            Box,
            {
              position: [0, staticTraegerY || 0, -depth / 2 + stZOff],
              args: [width + pfostenBreiteVal, staticTraegerHoehe, Math.max(1e-3, staticTraegerBreite)],
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: DEFAULT_FARBEN.holz })
            }
          ),
          pfette === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            Box,
            {
              position: [0, (hoeheHinten || 0) - steigung * (pfettenBreite / 2) - pfettenHoehe / 2, depth / 2 - pfettenBreite / 2],
              args: [width + pfostenBreiteVal, pfettenHoehe, Math.max(1e-3, pfettenBreite)],
              material: profilMaterial,
              children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial, fallbackColor: DEFAULT_FARBEN.holz })
            }
          )
        ] });
      })(),
      eindeckungSlot?.map((inst, i) => renderSlotInstance(inst, `eindeckung-${i}`)),
      ledSlot?.map((inst, i) => renderSlotInstance(inst, `led-${i}-sa${sparrenAnzahl}-esa${eindeckungSparrenAnzahl}`)),
      rinneSlot?.map((inst, i) => renderSlotInstance(inst, `rinne-${i}`)),
      someBeschattungSlot?.map((inst, i) => renderSlotInstance(inst, `beschattung-${i}`, i)),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 1, children: wandLinksSlot?.map((inst, i) => renderSlotInstance(inst, `wand-l-${i}`, i)) }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 0, children: wandRechtsSlot?.map((inst, i) => renderSlotInstance(inst, `wand-r-${i}`, i)) }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 2, children: wandVorneSlot?.map((inst, i) => renderSlotInstance(inst, `wand-v-${i}`, i)) }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(WandSeiteProvider, { value: 3, children: wandHintenSlot?.map((inst, i) => renderSlotInstance(inst, `wand-h-${i}`, i)) })
    ] })
  ] }) }) });
}
const konstruktionPropsSchema = {
  // Basis-Konfiguration
  konstruktionstyp: {
    type: "radioGroup",
    label: "Konstruktionstyp",
    options: [
      { value: "veranda", label: "Veranda (Pultdach)" },
      { value: "qubus", label: "Qubus (Flachdach)" }
    ]
  },
  // Abmessungen
  width: { type: "expression", label: "Gesamtbreite (m)", group: "Basis-Maße" },
  height: { type: "expression", label: "Durchgangshöhe (m)", group: "Basis-Maße" },
  depth: { type: "expression", label: "Gesamttiefe (m)", group: "Basis-Maße" },
  dachneigung: { type: "expression", label: "Dachneigung (°)", group: "Basis-Maße" },
  dachVorsprung: { type: "expression", label: "Dachvorsprung (m)", group: "Basis-Maße" },
  // Sparren-Konfiguration
  sparrenAuflage: {
    type: "radioGroup",
    label: "Sparrenauflage",
    options: [
      { value: "0", label: "Aufliegend" },
      { value: "1", label: "Innenliegend" }
    ],
    group: "Dach-Struktur"
  },
  sparrenBreite: { type: "expression", label: "Sparren Breite (m)", group: "Dach-Struktur" },
  sparrenHoehe: { type: "expression", label: "Sparren Höhe (m)", group: "Dach-Struktur" },
  // Rahmen / Balken
  balkenAussenBreite: { type: "expression", label: "Randbalken Breite (m)", group: "Dach-Struktur" },
  balkenAussenHoehe: { type: "expression", label: "Randbalken Höhe (m)", group: "Dach-Struktur" },
  rahmenBreite: { type: "expression", label: "Qubus Rahmen Breite (m)", group: "Qubus-Profile" },
  rahmenHoehe: { type: "expression", label: "Qubus Rahmen Höhe (m)", group: "Qubus-Profile" },
  // Querträger (Veranda)
  staticTraeger: { type: "expression", label: "Staticträger (0=Nein, 1=Ja)", group: "Statik & Pfetten" },
  staticTraegerBreite: { type: "expression", label: "Staticträger Breite (m)", group: "Statik & Pfetten" },
  staticTraegerHoehe: { type: "expression", label: "Staticträger Höhe (m)", group: "Statik & Pfetten" },
  pfette: { type: "expression", label: "Wandpfette (0=Nein, 1=Ja)", group: "Statik & Pfetten" },
  pfettenBreite: { type: "expression", label: "Pfette Breite (m)", group: "Statik & Pfetten" },
  pfettenHoehe: { type: "expression", label: "Pfette Höhe (m)", group: "Statik & Pfetten" },
  // Boden-Abschluss
  schwelle: { type: "expression", label: "Bodenschwelle (0=Nein, 1=Ja)", group: "Boden-Abschluss" },
  schwelleBreite: { type: "expression", label: "Schwelle Breite (m)", group: "Boden-Abschluss" },
  schwelleHoehe: { type: "expression", label: "Schwelle Höhe (m)", group: "Boden-Abschluss" },
  // Positionierung (Standard-Props)
  posX: { type: "expression", label: "Position X", group: "Layout" },
  posY: { type: "expression", label: "Position Y", group: "Layout" },
  posZ: { type: "expression", label: "Position Z", group: "Layout" },
  rotX: { type: "expression", label: "Drehung X", group: "Layout" },
  rotY: { type: "expression", label: "Drehung Y", group: "Layout" },
  rotZ: { type: "expression", label: "Drehung Z", group: "Layout" }
};
const konstruktionDynamicModel = {
  type: "veranda",
  label: "Konstruktion",
  description: "Modell für Veranda und Qubus",
  defaultProps: {
    slotDefinitions: Object.values(VERANDA_SLOTS),
    konstruktionstyp: "veranda",
    posX: { expression: "0" },
    posY: { expression: "0" },
    posZ: { expression: "0" },
    rotX: { expression: "0" },
    rotY: { expression: "0" },
    rotZ: { expression: "0" },
    width: { expression: "4" },
    height: { expression: "2.5" },
    depth: { expression: "3" },
    dachneigung: { expression: "0" },
    dachVorsprung: { expression: "0" },
    sparrenAnzahl: { expression: "6" },
    sparrenBreite: { expression: "0.06" },
    sparrenHoehe: { expression: "0.12" },
    sparrenAuflage: "0",
    balkenAussenBreite: { expression: "0.06" },
    balkenAussenHoehe: { expression: "0.12" },
    schwelle: { expression: "1" },
    schwelleBreite: { expression: "0.1" },
    schwelleHoehe: { expression: "0.06" },
    staticTraeger: { expression: "0" },
    staticTraegerBreite: { expression: "0.1" },
    staticTraegerHoehe: { expression: "0.08" },
    pfette: { expression: "1" },
    pfettenBreite: { expression: "0.06" },
    pfettenHoehe: { expression: "0.08" },
    rahmenBreite: { expression: "0.1" },
    rahmenHoehe: { expression: "0.1" }
  },
  propsDialog: konstruktionPropsSchema,
  component: KonstruktionModel,
  materials: ["profil"],
  disabledForAR: false
};

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
    pfostenBreite,
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
  const ledTyp = String(exprVal(props.ledTyp) || "stripes");
  const ledMat = materials?.led;
  const ledMatColor = ledMat?.color;
  const ledFarbe = ledMatColor ? "#" + ledMatColor.getHexString() : String(exprVal(props.ledFarbe) || "#ffffff");
  const intensitaet = getVal(props.intensitaet, 1.5);
  const strahlerJedenNten = Math.max(1, Math.round(getVal(props.strahlerJedenNten, 1)));
  const anzahlProSparren = Math.max(1, Math.round(getVal(props.anzahlProSparren, 3)));
  const strahlerForm = String(exprVal(props.strahlerForm) || "rund");
  const strahlerDurchmesser = Math.max(0.02, getVal(props.strahlerDurchmesser, 0.08));
  const stripeJedenNten = Math.max(1, Math.round(getVal(props.stripeJedenNten, 1)));
  const stripeLaenge = Math.max(0, getVal(props.stripeLaenge, 0));
  const stripeBreite = Math.max(5e-3, getVal(props.stripeBreite, 0.04));
  const qubusSeiten = String(exprVal(props.qubusSeiten) || "alle");
  const montageTyp = String(exprVal(props.montageTyp) || "aufgebaut");
  const eingebaut = montageTyp === "eingebaut";
  const bloomAn = getVal(props.bloomAn, 1) >= 1;
  const bloomStaerke = Math.max(0, getVal(props.bloomStaerke, 1));
  const kegelHelligkeit = Math.max(0, Math.min(1, getVal(props.kegelHelligkeit, 0.12)));
  const effDachneigung = eindeckungDachneigung ?? dachneigung;
  const effWidth = isQubus ? innerWidth || width : width;
  const gesamtBreite = isQubus ? effWidth : effWidth + (pfostenBreite || 0);
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
  const filteredStripeX = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => sparrenXPos.filter((_, i) => i % stripeJedenNten === 0), [sparrenXPos, stripeJedenNten]);
  const filteredStrahlerX = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => sparrenXPos.filter((_, i) => i % strahlerJedenNten === 0), [sparrenXPos, strahlerJedenNten]);
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
      });
    }
    refs.forEach((r) => {
      r.current.instanceMatrix.needsUpdate = true;
      r.current.computeBoundingSphere();
    });
  }, [isLamellenQuer, isLamellenLaengs, lamellenLedData, filteredLamellenQuer, filteredLamellenLaengs, filteredStripeX, rotX, rotZ, stripeMountOffsetVec, sparrenY, hoeheDiff, eingebaut, sparrenZ, sparrenTiefe, neigung, dummy]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    const refs = [strahlerRef, strahlerGlowCoreRef, strahlerGlowHaloRef].filter((r) => r.current);
    if (refs.length === 0) return;
    const rot = isLamellenQuer || isLamellenLaengs ? [rotX, 0, rotZ] : [0, 0, 0];
    strahlerPositionen.forEach(([x, y, z], idx) => {
      dummy.position.set(x, y, z);
      dummy.rotation.set(rot[0], rot[1], rot[2]);
      dummy.updateMatrix();
      refs.forEach((r) => {
        r.current.instanceMatrix.setUsage(veranda_mf_2_plugin__loadShare__three__loadShare__.DynamicDrawUsage);
        r.current.setMatrixAt(idx, dummy.matrix);
      });
    });
    refs.forEach((r) => {
      r.current.instanceMatrix.needsUpdate = true;
      r.current.computeBoundingSphere();
    });
  }, [strahlerPositionen, isLamellenQuer, isLamellenLaengs, rotX, rotZ, dummy]);
  const ledBodyColor = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => new veranda_mf_2_plugin__loadShare__three__loadShare__.Color(ledFarbe).multiplyScalar(Math.max(1, bloomStaerke * 3)),
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
  ledTyp: {
    type: "radioGroup",
    label: "LED Typ",
    options: [
      { value: "stripes", label: "LED Stripes" },
      { value: "strahler", label: "LED Strahler" },
      { value: "rahmen", label: "LED Stripe im Rahmen" }
    ]
  },
  montageTyp: {
    type: "radioGroup",
    label: "Montage",
    options: [
      { value: "aufgebaut", label: "Aufgebaut (unter Sparren)" },
      { value: "eingebaut", label: "Eingebaut (in Sparren)" }
    ]
  },
  // ── Strahler ──
  strahlerJedenNten: {
    type: "expression",
    label: "Jeden n-ten Sparren",
    description: "(1 = jeden, 2 = jeden 2., 3 = jeden 3. Sparren)",
    group: "LED Strahler"
  },
  anzahlProSparren: {
    type: "expression",
    label: "Anzahl pro Sparren",
    description: "(Strahler pro Sparren, gleichmäßig entlang der Sparrenlänge verteilt)",
    group: "LED Strahler"
  },
  strahlerForm: {
    type: "radioGroup",
    label: "Strahler Form",
    options: [
      { value: "rund", label: "Rund" },
      { value: "eckig", label: "Eckig" }
    ],
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
    label: "Jeden n-ten Sparren",
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
    type: "radioGroup",
    label: "Rahmen Seiten",
    options: [
      { value: "alle", label: "Alle Seiten" },
      { value: "linksRechts", label: "Links & Rechts" },
      { value: "vornHinten", label: "Vorne & Hinten" }
    ],
    group: "Rahmen Stripes"
  },
  // ── Leuchteinstellungen ──
  ledFarbe: {
    type: "basic",
    label: "LED Farbe",
    description: "(Leuchtfarbe als Hex-Wert, z.B. #ffffff)",
    group: "Leuchteinstellungen"
  },
  intensitaet: {
    type: "expression",
    label: "Helligkeit",
    description: "(Leuchtkraft der Lichtquellen: 0 = aus, 1.5 = Standard, 5 = maximal)",
    group: "Leuchteinstellungen"
  },
  bloomAn: {
    type: "expression",
    label: "Glow-Effekt",
    description: "(1 = An, 0 = Aus)",
    group: "Leuchteinstellungen"
  },
  bloomStaerke: {
    type: "expression",
    label: "Glow-Stärke",
    description: "(Intensität des Leuchtscheins: 0 = kein Glow, 1 = Standard, 2 = maximal)",
    group: "Leuchteinstellungen"
  },
  kegelHelligkeit: {
    type: "expression",
    label: "Kegel-Helligkeit",
    description: "(Lichtkegel-Opacity: 0 = unsichtbar, 0.12 = Standard, 1 = maximal)",
    group: "Leuchteinstellungen"
  }
};
const ledStripeDynamicModel = {
  type: "ledBeleuchtung",
  label: "LED Beleuchtung",
  description: "LED Strahler oder Stripes, automatisch an den Sparren montiert",
  materials: ["led"],
  disabledForAR: false,
  defaultProps: {
    ledTyp: "stripes",
    montageTyp: "aufgebaut",
    ledFarbe: "#ffffff",
    intensitaet: { expression: "1.5" },
    strahlerJedenNten: { expression: "1" },
    anzahlProSparren: { expression: "3" },
    strahlerForm: "rund",
    strahlerDurchmesser: { expression: "0.08" },
    stripeJedenNten: { expression: "1" },
    stripeLaenge: { expression: "0" },
    stripeBreite: { expression: "0.04" },
    qubusSeiten: "alle",
    bloomAn: { expression: "1" },
    bloomStaerke: { expression: "1.0" },
    kegelHelligkeit: { expression: "0.12" }
  },
  propsDialog: ledBeleuchtungPropsSchema,
  component: LedBeleuchtungModel
};

function GlasEnvMapLoader({ hdrUrl, envIntensity }) {
  const { scene } = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useThree();
  const envMap = veranda_mf_2_plugin__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.useEnvironment({ files: hdrUrl });
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => {
    if (!envMap) return;
    scene.environment = envMap;
    scene.environmentIntensity = envIntensity;
  }, [envMap, scene, envIntensity]);
  return null;
}
function GlasEnvMap() {
  const { hdrUrl, envIntensity } = useSceneEnvironment();
  if (!hdrUrl || !/\.(hdr|exr)(\?.*)?$/i.test(hdrUrl)) return null;
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(GlasEnvMapLoader, { hdrUrl, envIntensity });
}

function SceneSkyBackground() {
  const { isNight, lightPosition, intensity, lightColor } = useSceneEnvironment();
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
            emissiveIntensity: intensity
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

const DEFAULT_HDR_URL = "https://oc-k3.s3.eu-central-1.amazonaws.com/libs/3d/environments/city.hdr";
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
    hdrUrl: "https://oc-k3.s3.eu-central-1.amazonaws.com/libs/3d/environments/night.hdr",
    ambientIntensity: 0.03,
    ambientColor: "#112233",
    isNight: true
  }
};
function SceneEnvironmentModel(props) {
  const preset = Number(exprVal(props.preset)) || 0;
  const mats = props.materials ?? {};
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
    const shadowBias = getNum(props.shadowBias, -1e-3);
    const isNight = preset === 2;
    const mat = isNight ? mats.mond : mats.sonne;
    const lightColor = mat?.color ? "#" + mat.color.getHexString() : isNight ? "#aabbcc" : "#fff5e0";
    const rawUrl = String(exprVal(props.hdrUrl) ?? "").trim();
    const presetHdr = preset !== 0 && PRESETS[preset]?.hdrUrl ? PRESETS[preset].hdrUrl : DEFAULT_HDR_URL;
    const hdrUrl = rawUrl.startsWith("http") ? rawUrl : presetHdr;
    const envIntensity = getNum(props.envIntensity, 0.4);
    if (preset !== 0 && PRESETS[preset]) {
      const p = PRESETS[preset];
      return {
        intensity,
        lightColor,
        lightPosition,
        hdrUrl,
        envIntensity,
        ambientIntensity: p.ambientIntensity ?? 0.5,
        ambientColor: p.ambientColor ?? "#ffffff",
        shadowBias,
        isNight: p.isNight ?? false
      };
    }
    return {
      intensity,
      lightColor,
      lightPosition,
      hdrUrl,
      envIntensity,
      ambientIntensity: getNum(props.ambientIntensity, 0.5),
      ambientColor: String(exprVal(props.ambientColor) || "#ffffff"),
      shadowBias,
      isNight: false
    };
  }, [props, preset, mats]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(SceneEnvironmentProvider, { value: envValues, children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(GlasEnvMap, {}),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneSkyBackground, {})
  ] });
}
const sceneEnvironmentDynamicModel = {
  id: "oc.veranda.sceneEnvironment",
  label: "Scene Environment",
  type: "root",
  component: SceneEnvironmentModel,
  defaultProps: {
    preset: { expression: "1" },
    intensity: { expression: "2" },
    lightPosX: { expression: "5" },
    lightPosY: { expression: "30" },
    lightPosZ: { expression: "-10" },
    hdrUrl: { expression: `"https://oc-k3.s3.eu-central-1.amazonaws.com/libs/3d/environments/city.hdr"` },
    envIntensity: { expression: "0.4" },
    ambientIntensity: { expression: "0.5" },
    shadowBias: { expression: "-0.001" }
  },
  propsDialog: {
    preset: {
      label: "Voreinstellung",
      type: "radioGroup",
      options: [
        { label: "Benutzerdefiniert", value: "0" },
        { label: "Tag", value: "1" },
        { label: "Nacht", value: "2" }
      ]
    },
    intensity: { label: "Licht-Intensität", type: "expression" },
    lightPosX: { label: "Licht Pos X", type: "expression" },
    lightPosY: { label: "Licht Pos Y", type: "expression" },
    lightPosZ: { label: "Licht Pos Z", type: "expression" },
    hdrUrl: { label: "HDR URL", type: "expression" },
    envIntensity: { label: "Umgebungs-Helligkeit", type: "expression" },
    ambientIntensity: { label: "Umgebungslicht-Intensität", type: "expression" },
    shadowBias: { label: "Schatten-Bias", type: "expression" }
  },
  materials: ["sonne", "mond"],
  disabledForAR: false
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
    // Querträger
    quertraegerHoehe = 0.1,
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
    wandanschluss = 0,
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
  const pfostenBreite = parent.pfostenBreite || 0.1;
  const pfostenTiefe = parent.pfostenTiefe || 0.1;
  const gesamtBreite = parent.isQubus ? width : width + pfostenBreite;
  const pfettenBreite = parent.pfettenBreite;
  const schwelleBreite = parent.schwelleBreite;
  const profilMaterial = materials.profil;
  if (profilMaterial) profilMaterial.name = "profil";
  const sparrenAnzahl = Number(exprVal(sparrenAnzahlProp));
  const sparrenBreite = parent.sparrenBreite || Number(exprVal(sparrenBreiteProp));
  const sparrenHoehe = parent.sparrenHoehe || Number(exprVal(sparrenHoeheProp));
  const sparrenAuflage = Number(exprVal(parent.sparrenAuflage));
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
  const platteMaterial = (eindeckung === "glas" ? materials.glas : materials.poly) ?? materials.glasPlatte;
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
  const sparrenModus = Number(exprVal(sparrenAussen)) === 1 ? "alle" : "nurInnen";
  const { setEindeckungInfo } = useEindeckungInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(
      _eindeckungDicke,
      _leistenHoehe,
      Number(wandanschluss) === 1,
      _wandanschlussTiefe,
      sparrenAnzahl,
      qubusOffset
    );
  }, [_eindeckungDicke, _leistenHoehe, wandanschluss, _wandanschlussTiefe, sparrenAnzahl, qubusOffset, setEindeckungInfo]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
    if (!platteMaterial) return;
    const mat = platteMaterial;
    mat.transparent = _opacity < 1;
    mat.opacity = _opacity;
    mat.depthWrite = _opacity >= 1;
    mat.roughness = _roughness;
    mat.side = veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide;
    mat.needsUpdate = true;
  }, [platteMaterial, _opacity, _roughness]);
  const _quertraegerHoehe = Number(exprVal(quertraegerHoehe));
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
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(veranda_mf_2_plugin__loadShare__react__loadShare__.Suspense, { fallback: null, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(GlasEnvMap, {}) }),
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
            opacity: _opacity,
            roughness: _roughness,
            metalness: _metalness,
            envMapIntensity: _envMapIntensity,
            kammergroesse: _kammergroesse,
            leistenBreite: _leistenBreite,
            leistenHoehe: _leistenHoehe,
            leistenFarbe: leistenFarbeHex,
            leistenRundung: _leistenRundung,
            wandanschluss: Number(wandanschluss) === 1,
            wandanschlussHoehe: _wandanschlussHoehe,
            wandanschlussTiefe: _wandanschlussTiefe,
            wandanschlussFarbe: leistenFarbeHex,
            dachVorsprung: 0,
            stirnblech: Number(exprVal(stirnblech)) === 1,
            stirnblechHoehe: _stirnblechHoehe,
            stirnblechTiefe: _stirnblechTiefe,
            vornAbschlussleiste: _vornAbschlussleiste === 1
          }
        )
      ]
    }
  );
}
const glasEindeckungPropsSchema = {
  eindeckungTyp: {
    type: "radioGroup",
    label: "Material",
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
  envMapIntensity: { type: "expression", label: "EnvMap-Intensität" },
  kammergroesse: { type: "expression", label: "Poly Kammergröße (m)" },
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
  stirnblech: { type: "expression", label: "Stirnblech (0/1)" },
  stirnblechHoehe: { type: "expression", label: "Stirnblech Höhe (m)" },
  stirnblechTiefe: { type: "expression", label: "Stirnblech Tiefe (m)" },
  vornAbschlussleiste: { type: "expression", label: "Vorn-Abschlussleiste (0/1)" },
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
    sparrenAuflage: { expression: "0" },
    sparrenAussen: { expression: "0" },
    quertraegerHoehe: { expression: "0.1" },
    quertraegerTiefe: { expression: "0.1" },
    eindeckungTyp: "0",
    eindeckungDicke: { expression: "0.016" },
    opacity: { expression: "0.2" },
    roughness: { expression: "0.0" },
    metalness: { expression: "0.0" },
    envMapIntensity: { expression: "1.0" },
    kammergroesse: { expression: "0.05" },
    leistenBreite: { expression: "0.03" },
    leistenHoehe: { expression: "0.01" },
    leistenRundung: { expression: "0" },
    wandanschluss: { expression: "1" },
    wandanschlussHoehe: { expression: "0.046" },
    wandanschlussTiefe: { expression: "0.056" },
    stirnblech: { expression: "0" },
    stirnblechHoehe: { expression: "0.08" },
    stirnblechTiefe: { expression: "0.04" },
    vornAbschlussleiste: { expression: "0" },
    einzelMaterialien: "0"
  },
  propsDialog: glasEindeckungPropsSchema,
  component: GlasEindeckungModel,
  materials: ["profil", "konstruktion", "sparren", "leisten", "wandanschluss", "glasPlatte", "glas", "poly"],
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
  const metallMaterial = materials.metall;
  const anschlussMaterial = materials.anschluss ?? profilMaterial;
  if (profilMaterial) profilMaterial.name = "profil";
  if (metallMaterial) metallMaterial.name = "metall";
  if (anschlussMaterial && anschlussMaterial !== profilMaterial)
    anschlussMaterial.name = "anschluss";
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
  const sparrenAuflage = Number(exprVal(parent.sparrenAuflage));
  const eindeckungBreite = parent.isQubus ? width : width + parent.pfostenBreite;
  const querbalkenBreite = eindeckungBreite;
  const { hoeheHinten: baseHHinten, hoeheVorne: baseHVorne } = calcVerandaGeometry(depth, dachneigung, height);
  const eindeckungTyp = METALL_EINDECKUNG_MAP[Number(exprVal(eindeckung))] ?? "welle";
  const metallPeakOffset = eindeckungTyp === "welle" ? _eindeckungDicke + 2 * (_amplitude / 200) : _eindeckungDicke + _amplitude / 100;
  const qubusOffset = parent.isQubus ? metallPeakOffset + (sparrenAuflage === 0 ? sparrenHoehe : 0) : 0;
  const hoeheVorne = baseHVorne - qubusOffset;
  const hoeheHinten = baseHHinten - qubusOffset;
  const { setEindeckungInfo } = useEindeckungInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(
      _eindeckungDicke,
      0,
      Number(wandanschluss) === 1,
      _wandanschlussTiefe,
      hatAussenSparren ? 2 : 0,
      qubusOffset
    );
  }, [
    _eindeckungDicke,
    wandanschluss,
    _wandanschlussTiefe,
    hatAussenSparren,
    qubusOffset,
    setEindeckungInfo
  ]);
  const metallFarbeHex = "#808080";
  const anschlussFarbeHex = "#c0c0c0";
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
  } : { vorne: hVorne_m, hinten: hHinten_m };
  const metallOKVorne = sparrenOberkante.vorne + metallPeakOffset;
  const metallOKHinten = sparrenOberkante.hinten + metallPeakOffset;
  const hoeheDiff = metallOKHinten - metallOKVorne;
  const glasNeig = Math.atan2(hoeheDiff, innerD_m);
  const schraegeTiefe = innerD_m / Math.cos(glasNeig);
  const effSeitenTiefe = _seitenabschlussTiefe;
  const seitenLip = 0.01;
  const effSeitenHoehe = Math.max(
    _seitenabschlussHoehe,
    metallPeakOffset + seitenLip
  );
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
          const balkenY = oberkante - _balkenHoehe / 2;
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
                    args: [querbalkenBreite, _balkenHoehe, _balkenBreite]
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
            hoeheVorne: sparrenOberkante.vorne,
            hoeheHinten: sparrenOberkante.hinten,
            innenliegend: false,
            quertraegerTiefe: 0,
            metallFarbe: metallFarbeHex,
            amplitude: _amplitude,
            frequenz: _frequenz,
            material: metallMaterial
          }
        ) }),
        Number(exprVal(wandanschluss)) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Wandanschluss,
          {
            wandanschlussHoehe: _wandanschlussHoehe,
            wandanschlussTiefe: _wandanschlussTiefe,
            farbe: anschlussFarbeHex,
            leistenHoehe: 0,
            glasNeig,
            anschlussBreite: eindeckungBreite,
            zPos: zInnenH_m - 1e-3,
            yPos: metallOKHinten + 1e-3,
            material: anschlussMaterial
          }
        ),
        Number(exprVal(stirnblech)) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          Stirnblech,
          {
            stirnblechHoehe: _stirnblechHoehe,
            stirnblechTiefe: parent.schwelleBreite + _stirnblechTiefe,
            farbe: anschlussFarbeHex,
            anschlussBreite: eindeckungBreite,
            yPos: metallOKVorne + BLECH_STAERKE + 1e-3,
            zPos: -depth / 2 + pfostenTiefe_m - (parent.schwelleBreite + BLECH_STAERKE * 2 + 1e-4),
            neigung: glasNeig,
            material: anschlussMaterial
          }
        ),
        Number(exprVal(seitenabschluss)) === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.Fragment, { children: [
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
  eindeckung: {
    type: "radioGroup",
    label: "Typ",
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
    label: "Sparrenauflage",
    options: [
      { value: "0", label: "Aufliegend" },
      { value: "1", label: "Innenliegend" }
    ]
  },
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
  const { setEindeckungInfo, setLamellenLedData } = useEindeckungInfo();
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(0, 0, Number(wandanschluss) === 1, Number(wandanschlussTiefe), 0, qubusOffset);
  }, [wandanschluss, wandanschlussTiefe, qubusOffset, setEindeckungInfo]);
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
  const aussenBreite = parent.isQubus ? width : width + (parent.pfostenBreite || 0.1);
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
function SolarPanel({ panelBreite, panelTiefe, yPos, dachneigungRad, panelFarbeHex, rahmenFarbeHex, opacity, roughness, metalness, glasMaterial, profilMaterial }) {
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
          transparent: opacity < 1,
          opacity,
          metalness,
          roughness
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
    opacity = 0.9,
    roughness = 0.05,
    metalness = 0.1,
    wandanschluss = 1,
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
    sparrenAuflage: _sparrenAuflage_prop = 0,
    sparrenAnzahl = 0,
    sparrenBreite = 0,
    sparrenHoehe = 0,
    materials = {}
  } = props;
  const parent = useVerandaGeometry();
  const width = parent.isQubus ? parent.innerWidth || 0 : parent.width || Number(exprVal(props.width)) || 4;
  const depth = parent.isQubus ? parent.innerDepth || 0 : parent.depth || Number(exprVal(props.depth)) || 3;
  const height = parent.height || 0;
  const { hoeheHinten: baseHHinten, hoeheVorne: baseHVorne, neigung } = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(
    () => calcVerandaGeometry(depth, parent.eindeckungDachneigung ?? parent.dachneigung, height),
    [depth, parent.eindeckungDachneigung, parent.dachneigung, height]
  );
  const _leistenHoehe = Number(exprVal(leistenHoehe));
  const solarDicke = 6e-3;
  const _sparrenAuflage_v = Number(exprVal(_sparrenAuflage_prop || parent.sparrenAuflage));
  const qubusOffset = parent.isQubus ? solarDicke + _leistenHoehe + (_sparrenAuflage_v === 0 ? Number(exprVal(sparrenHoehe || parent.sparrenHoehe)) : 0) : 0;
  const hoeheVorne = baseHVorne - qubusOffset;
  const hoeheHinten = baseHHinten - qubusOffset;
  const _sparrenAnzahl = Number(exprVal(sparrenAnzahl));
  const _sparrenBreite = Number(exprVal(sparrenBreite)) > 0 ? Number(exprVal(sparrenBreite)) : parent.sparrenBreite;
  const _sparrenHoehe = Number(exprVal(sparrenHoehe)) > 0 ? Number(exprVal(sparrenHoehe)) : parent.sparrenHoehe;
  const { setEindeckungInfo } = useEindeckungInfo();
  const effectiveSparrenAnzahl = Math.max(2, _sparrenAnzahl);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    setEindeckungInfo(
      solarDicke,
      _leistenHoehe,
      Number(wandanschluss) === 1,
      Number(exprVal(wandanschlussTiefe)),
      effectiveSparrenAnzahl,
      qubusOffset
    );
  }, [solarDicke, _leistenHoehe, wandanschluss, wandanschlussTiefe, effectiveSparrenAnzahl, qubusOffset, setEindeckungInfo]);
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
  const _opacity = Number(exprVal(opacity));
  const _roughness = Number(exprVal(roughness));
  const _metalness = Number(exprVal(metalness));
  const querbalkenBreite = parent.isQubus ? width : width + parent.pfostenBreite;
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
  const _sparrenAuflage = Number(parent.sparrenAuflage);
  const isInn_s = _sparrenAuflage === 1;
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
  const sparrenOKVorne = isInn_s ? hVorne_s : hoeheVorne + _sparrenHoehe;
  const sparrenOKHinten = isInn_s ? hHinten_s : hoeheHinten + _sparrenHoehe;
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
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
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
    solarPanels.map((panel, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [panel.x, 0, zCenter_s], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
      SolarPanel,
      {
        panelBreite: panel.w,
        panelTiefe,
        yPos: yMitte,
        dachneigungRad: neigung,
        panelFarbeHex,
        rahmenFarbeHex,
        opacity: _opacity,
        roughness: _roughness,
        metalness: _metalness,
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
        anschlussBreite: querbalkenBreite,
        zPos: depth / 2 - 1e-3,
        yPos: panelOKHinten + 1e-3,
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
  sparrenAuflage: { type: "radioGroup", label: "Auflage", options: [{ value: "0", label: "Aufliegend" }, { value: "1", label: "Innenliegend" }] },
  sparrenAnzahl: { type: "expression", label: "Anzahl (0=von Veranda)" },
  sparrenBreite: { type: "expression", label: "Breite (m)" },
  sparrenHoehe: { type: "expression", label: "Höhe (m)" },
  leistenBreite: { type: "expression", label: "Breite (m, 0=keine)" },
  leistenHoehe: { type: "expression", label: "Höhe (m)" },
  leistenRundung: { type: "expression", label: "Rundung (0–10)" },
  opacity: { type: "expression", label: "Vorderglas Transparenz (0–1)" },
  roughness: { type: "expression", label: "Vorderglas Rauheit (0–1)" },
  metalness: { type: "expression", label: "Vorderglas Metalness (0–1)" },
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
    opacity: { expression: "0.9" },
    roughness: { expression: "0.05" },
    metalness: { expression: "0.1" },
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
  const wandStaerke = getVal(props.wandStaerke, 3e-3);
  const {
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const rinnenTyp = Number(exprVal(props.typ) || "0");
  const dachneigung = parent.dachneigung || 0;
  const sparrenHoehe = parent.sparrenHoehe || 0;
  const sparrenAuflage = parent.sparrenAuflage || 0;
  const schwelle = parent.schwelle || 0;
  const schwelleBreite = parent.schwelleBreite || 0.1;
  const pfostenBreite = parent.pfostenBreite || 0.1;
  const pfostenTiefe = parent.pfostenTiefe || 0.1;
  const farbeHex = "#808080";
  const { hoeheVorne, hoeheHinten } = calcVerandaGeometry(depth, dachneigung, height);
  const rinnenLaenge = width + pfostenBreite;
  const steigung = depth > 0 ? (hoeheHinten - hoeheVorne) / depth : 0;
  const innenliegend = Number(exprVal(sparrenAuflage)) === 1;
  const qtVorne = Number(exprVal(schwelle)) === 1 ? Math.max(schwelleBreite, pfostenTiefe) : 0;
  const schwelleOK = innenliegend ? hoeheVorne + steigung * qtVorne : hoeheVorne + sparrenHoehe;
  const rinneY = schwelleOK - rinnenHoehe;
  const schwelleVorderkante = schwelleBreite >= pfostenTiefe ? -depth / 2 : -depth / 2 + pfostenTiefe - schwelleBreite;
  const rinneZ = schwelleVorderkante;
  const rinnePosition = [0, rinneY, rinneZ];
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
    quertraegerHoeheVorne = 0;
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
            gesamtBreite: parent.isQubus ? width - pfostenBreite : width,
            gesamtTiefe: depth,
            hoeheVorne,
            hoeheHinten,
            pfostenAnzahlVorne,
            pfostenAnzahlHinten,
            pfostenTyp,
            pfostenBreite,
            pfostenTiefe,
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
  const [worldPlanes, setWorldPlanes] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(void 0);
  const posKey = JSON.stringify(position);
  const rotKey = JSON.stringify(rotation);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useLayoutEffect(() => {
    const updatePlanes = () => {
      if (groupRef.current) {
        groupRef.current.updateWorldMatrix(true, true);
        const wm = groupRef.current.matrixWorld;
        const localPlanes = [
          new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(1, 0, 0), 0),
          new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(-1, 0, 0), areaWidth),
          new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, 1, 0), 0),
          new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, -1, 0), areaHeight)
        ];
        const allLocalPlanes = clippingPlanes ? [...localPlanes, ...clippingPlanes] : localPlanes;
        const nextWorldPlanes = allLocalPlanes.map((p) => {
          const p2 = p.clone();
          p2.applyMatrix4(wm);
          p2.normal.normalize();
          return p2;
        });
        setWorldPlanes((prev) => {
          if (!prev || prev.length !== nextWorldPlanes.length) return nextWorldPlanes;
          const changed = nextWorldPlanes.some((p, idx) => {
            const op = prev[idx];
            return !op || Math.abs(p.constant - op.constant) > 1e-3 || p.normal.distanceTo(op.normal) > 1e-3;
          });
          return changed ? nextWorldPlanes : prev;
        });
      }
    };
    updatePlanes();
    const t1 = setTimeout(updatePlanes, 50);
    const t2 = setTimeout(updatePlanes, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [clippingPlanes, posKey, rotKey, areaWidth, areaHeight]);
  const nD = Math.min(5e-3, plankenHoehe / 4);
  const effektivePlankenHoehe = Math.max(1e-3, plankenHoehe - nD);
  const N = isFinite(areaHeight / effektivePlankenHoehe) ? Math.max(1, Math.ceil(areaHeight / effektivePlankenHoehe) + 5) : 1;
  const dummy = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.Object3D(), []);
  const plankShape = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => {
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
    return shape;
  }, [plankenHoehe, plankenTiefe, nD]);
  const extSettings = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => ({
    depth: 1,
    bevelEnabled: false
  }), []);
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
      args: [null, null, N],
      count: N,
      castShadow: true,
      receiveShadow: true,
      onBeforeRender: (gl) => {
        gl.localClippingEnabled = true;
      },
      children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [plankShape, extSettings] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex, clippingPlanes: worldPlanes })
      ]
    },
    N
  ) });
}

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
  plankenTiefe = 0.02
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
      const innerXE = xB - SW;
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
      glasShapes.map((s, i) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, 0, dicke / 2], castShadow: true, receiveShadow: true, material: glasMaterial, children: [
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
    PlankenFilling,
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
  React.useMemo(() => {
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
  React.useMemo(() => {
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
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
              !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
            ] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ + glasD - POLY_DECK_DICKE], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
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
            PlankenFilling,
            {
              areaWidth: panelW,
              areaHeight: hH,
              plankenHoehe,
              plankenTiefe,
              farbeHex,
              material,
              position: [pxS, yBot, FT / 2],
              clippingPlanes: (() => {
                if (!slantedShapes) return [];
                const dy = slantedShapes.topAtX(pxS + panelW) - slantedShapes.topAtX(pxS);
                const dx = panelW;
                const h_start_rel = slantedShapes.topAtX(pxS) - yBot;
                const normal = new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(dy, -dx, 0).normalize();
                return [new veranda_mf_2_plugin__loadShare__three__loadShare__.Plane(normal, -normal.dot(new veranda_mf_2_plugin__loadShare__three__loadShare__.Vector3(0, h_start_rel, 0)))];
              })()
            }
          ) }, `top-${i}`);
        }
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasZ], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, glasExtCfg] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] }, `top-${i}`);
      }),
      botPanelShapes.map((s, i) => {
        if (fuellungTypUnten === 1) {
          const deckCfg = { depth: POLY_DECK_DICKE, bevelEnabled: false, steps: 1 };
          const stege = polySlantedStegeDataUnten[i] ?? [];
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasZ], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [s, deckCfg] }),
              !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten })
            ] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasZ + glasD - POLY_DECK_DICKE], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
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
            PlankenFilling,
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
        return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasZ], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
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
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, POLY_DECK_DICKE] }),
            !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, POLY_DECK_DICKE] }),
            !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten })
          ] }),
          polyFlatStegeXPosUnten.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, botGlassH, POLY_INNEN_D] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: roughnessUnten })
          ] }, si))
        ] }) : fuellungTypUnten === 2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          PlankenFilling,
          {
            areaWidth: panelW,
            areaHeight: botGlassH,
            plankenHoehe,
            plankenTiefe,
            material,
            farbeHex,
            position: [panelCenterX - panelW / 2, -wandHoeheVorne / 2 + FT, 0]
          }
        ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasUnten", position: [panelCenterX, botGlassCenterY, 0], castShadow: true, receiveShadow: true, material: glasMaterialUnten, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, botGlassH, glasD] }),
          !glasMaterialUnten && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityUnten, roughness: roughnessUnten, metalness: metalnessUnten, envMapIntensity: envMapIntensityUnten, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] })),
        topGlassH > 1e-3 && (fuellungTypOben === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [panelCenterX, topGlassCenterY, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, POLY_DECK_DICKE] }),
            !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, POLY_DECK_DICKE] }),
            !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
          ] }),
          polyFlatStegeXPosOben.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, topGlassH, POLY_INNEN_D] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: roughnessOben })
          ] }, si))
        ] }) : fuellungTypOben === 2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
          PlankenFilling,
          {
            areaWidth: panelW,
            areaHeight: topGlassH,
            plankenHoehe,
            plankenTiefe,
            material,
            farbeHex,
            position: [panelCenterX - panelW / 2, isTyp2 ? barY - wandHoeheVorne / 2 + FT : -wandHoeheVorne / 2 + FT, 0]
          }
        ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [panelCenterX, topGlassCenterY, 0], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, topGlassH, glasD] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben, clearcoat: 1, clearcoatRoughness: 0.05 })
        ] }))
      ] }) : fuellungTypOben === 1 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [panelCenterX, 0, 0], children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, -glasD / 2 + POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, innerH, POLY_DECK_DICKE] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
        ] }),
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [0, 0, glasD / 2 - POLY_DECK_DICKE / 2], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [panelW, innerH, POLY_DECK_DICKE] }),
          !glasMaterialOben && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: opacityOben, roughness: roughnessOben, metalness: metalnessOben, envMapIntensity: envMapIntensityOben })
        ] }),
        polyFlatStegeXPosOben.map((sx, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [sx, 0, 0], children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [POLY_STEG_DICKE, innerH, POLY_INNEN_D] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness: roughnessOben })
        ] }, si))
      ] }) : fuellungTypOben === 2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        PlankenFilling,
        {
          areaWidth: panelW,
          areaHeight: innerH,
          plankenHoehe,
          plankenTiefe,
          material,
          farbeHex,
          position: [panelCenterX - panelW / 2, -wandHoeheVorne / 2 + FT, 0]
        }
      ) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glasOben", position: [panelCenterX, 0, 0], castShadow: true, receiveShadow: true, material: glasMaterialOben, children: [
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
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#d0d0d0", metalness: 0.9, roughness: 0.2 })
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
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#cccccc", metalness: 0.7, roughness: 0.5 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, HANDLE_OFFSET_Z], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS, HANDLE_RADIUS, hoehe, 32] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -0.02, LOCK_HOUSING_D + 1e-3], rotation: [Math.PI / 2, 0, 0], children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [KEYHOLE_RADIUS, KEYHOLE_RADIUS, 2e-3, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "black", metalness: 0.1, roughness: 0.8 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, hoehe / 2 - 0.05, HANDLE_OFFSET_Z / 2], rotation: [Math.PI / 2, 0, 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS * 0.8, HANDLE_RADIUS * 0.8, HANDLE_OFFSET_Z, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3 })
    ] }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, -hoehe / 2 + 0.05, HANDLE_OFFSET_Z / 2], rotation: [Math.PI / 2, 0, 0], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("cylinderGeometry", { args: [HANDLE_RADIUS * 0.8, HANDLE_RADIUS * 0.8, HANDLE_OFFSET_Z, 16] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "#cccccc", metalness: 0.9, roughness: 0.3 })
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
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, innerH / 2, -glasD / 2], castShadow: true, receiveShadow: true, material: glasMaterial, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [glasShape, extCfg] }),
      !glasMaterial && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: effectiveOpacity, roughness, metalness, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity, side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, depthWrite: false })
    ] });
  }
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { name: "glas", position: [0, innerH / 2, 0], castShadow: true, receiveShadow: true, material: glasMaterial, children: [
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
  React.useMemo(() => {
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
  const isBiparting = !allSliding && fixedCount >= 2;
  const fixedLeftCount = Math.ceil(fixedCount / 2);
  const fixedRightCount = Math.floor(fixedCount / 2);
  const fixedIndices = [];
  for (let i = 0; i < fixedLeftCount; i++) fixedIndices.push(i);
  for (let i = 0; i < fixedRightCount; i++) fixedIndices.push(panelCount - 1 - i);
  const slidingIndices = [];
  for (let i = 0; i < panelCount; i++) {
    if (!fixedIndices.includes(i)) slidingIndices.push(i);
  }
  const calcTrackZ = (index) => {
    if (allSliding) {
      const sortedByOpening = slideRight ? [...slidingIndices].sort((a, b) => calcPanelX(a) - calcPanelX(b)) : [...slidingIndices].sort((a, b) => calcPanelX(b) - calcPanelX(a));
      const stackIdx = sortedByOpening.indexOf(index);
      const centeredIdx = stackIdx - (panelCount - 1) / 2;
      return -centeredIdx * trackSpacing;
    }
    const slidingZ = schienenSeite === 1 ? -FD / 2 : FD / 2;
    const fixedZ = schienenSeite === 1 ? FD / 2 : -FD / 2;
    if (fixedIndices.includes(index)) return fixedZ;
    if (!isBiparting) return slidingZ;
    const slidingIdx = slidingIndices.indexOf(index);
    const halfCount = Math.ceil(slidingIndices.length / 2);
    const groupRank = slidingIdx < halfCount ? slidingIdx : slidingIndices.length - 1 - slidingIdx;
    return slidingZ + groupRank * trackSpacing;
  };
  const maxGroupSize = isBiparting ? Math.ceil(slidingIndices.length / 2) : 1;
  const totalTrackDepth = allSliding ? trackSpacing * panelCount + FD : FD * 2 + (maxGroupSize - 1) * trackSpacing;
  const calcPanelX = (i) => {
    if (hasFrame && fixedCount > 0) return innerBreite / 2 - panelWidth / 2 - i * panelWidth;
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
    const sortedByX = [...slidingIndices].sort((a, b) => calcPanelX(a) - calcPanelX(b));
    let leadingIndices = [];
    let trailingIndices = [];
    if (isBiparting) {
      const half = Math.ceil(sortedByX.length / 2);
      const leftGroup = sortedByX.slice(0, half);
      const rightGroup = sortedByX.slice(half);
      if (leftGroup.length > 0) {
        leadingIndices.push(leftGroup[leftGroup.length - 1]);
        trailingIndices.push(leftGroup[0]);
      }
      if (rightGroup.length > 0) {
        leadingIndices.push(rightGroup[0]);
        trailingIndices.push(rightGroup[rightGroup.length - 1]);
      }
    } else {
      const leftmostIdx = sortedByX[0];
      const rightmostIdx = sortedByX[sortedByX.length - 1];
      if (slideRight) {
        leadingIndices = [leftmostIdx];
        trailingIndices = [rightmostIdx];
      } else {
        leadingIndices = [rightmostIdx];
        trailingIndices = [leftmostIdx];
      }
    }
    const isLeading = isSliding && leadingIndices.includes(index);
    const isTrailing = isSliding && trailingIndices.includes(index);
    const showHandle = isSliding && griffTyp !== 3 && (griffAnordnung === 0 && isLeading || griffAnordnung === 1 && (isLeading || isTrailing) || griffAnordnung === 2);
    const clampedGriffH = Math.min(griffHoehe, innerH - 0.3);
    const griffYRelGlas = clampedGriffH - rahmenBreite - innerH / 2;
    const griffRandAbstand = GRIFF_LOCH_RADIUS + 0.015;
    const panelSlidingIdx = slidingIndices.indexOf(index);
    let griffXDir;
    if (isBiparting && isSliding) {
      const bipHalfCount = Math.ceil(slidingIndices.length / 2);
      griffXDir = panelSlidingIdx < bipHalfCount ? -1 : 1;
    } else {
      griffXDir = slideRight ? -1 : 1;
    }
    if (griffAnordnung === 1 && isTrailing && !isLeading) {
      griffXDir *= -1;
    }
    const griffXInPanel = hasFrame ? griffXDir * (panelWidth / 2 - FW / 2) : griffPosition === 1 ? 0 : griffXDir * (panelWidth / 2 - griffRandAbstand - (allSliding ? OVERLAP : 0));
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
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, -glasD / 2 + DECK_DICKE / 2], castShadow: true, receiveShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [glasW, glasH, DECK_DICKE] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: effectiveOpacity, roughness, metalness, clearcoat: 0.4, clearcoatRoughness: 0.1, envMapIntensity, side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, depthWrite: false })
          ] }),
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, 0, glasD / 2 - DECK_DICKE / 2], castShadow: true, receiveShadow: true, children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [glasW, glasH, DECK_DICKE] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, transparent: true, opacity: effectiveOpacity, roughness, metalness, clearcoat: 0.4, clearcoatRoughness: 0.1, envMapIntensity, side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, depthWrite: false })
          ] }),
          stege.map((stegX, si) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [stegX, 0, 0], children: [
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [STEG_DICKE, glasH, innenD] }),
            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshPhysicalMaterial", { color: glasFarbeHex, roughness, metalness, envMapIntensity })
          ] }, si))
        ] });
      })() : fuellungTyp === 2 ? /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
        PlankenFilling,
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
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "silver", metalness: 0.9, roughness: 0.2 })
    ] }) : /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, FW + 4e-3, FD / 2], castShadow: true, children: [
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [innerBreite, 835e-5, FD] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshStandardMaterial", { color: "silver", metalness: 0.9, roughness: 0.2 })
    ] }),
    Array.from({ length: panelCount }, (_, i) => renderPanel(i, calcTrackZ(i), !fixedIndices.includes(i)))
  ] });
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
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, 0, schiebend === 1 ? -totalTrackDepth / 2 : 0], children: [
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

function SichtschutzwandWand({
  wandBreite,
  wandHoehe,
  wandHoeheHinten,
  plankenHoehe,
  plankenTiefe,
  querbalken = 1,
  material,
  farbeHex
}) {
  const meshRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const groupRef = veranda_mf_2_plugin__loadShare__react__loadShare__.useRef(null);
  const [worldPlanes, setWorldPlanes] = veranda_mf_2_plugin__loadShare__react__loadShare__.useState(void 0);
  const isSlant = wandHoeheHinten !== void 0 && Math.abs(wandHoeheHinten - wandHoehe) > 1e-3;
  const hoeheR = isSlant ? wandHoeheHinten : wandHoehe;
  const RahmenBreite = 0.04;
  const topBeamHeight = 0.06;
  const beamDepth = Math.max(RahmenBreite, plankenTiefe + 0.02);
  const hasTopBeam = querbalken === 1;
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
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { ref: groupRef, children: [
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
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("extrudeGeometry", { args: [topBeamShapeSlant, { depth: beamDepth, bevelEnabled: false }] }),
      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, fallbackColor: farbeHex })
    ] }) }),
    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
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
              clippingPlanes: isSlant ? worldPlanes : void 0
            }
          )
        ]
      }
    ) })
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
function calcWandGeometry(wandSeite, breite, hoehe, parentWidth, parentDepth, parentHeight, parentDachneigung, pfostenBreite = 0, pfostenTiefe = 0, sparrenHoehe = 0, pfette = 0, pfettenBreite = 0, dachVorsprung = 0, sparrenAuflage = 0, schwelle = 0, schwelleBreite = 0, schwelleHoehe = 0, segmentIndex = -1, pfostenAnzahlVorne = 2, pfostenAnzahlHinten = 2, isQubus = false, segmentAnzahl) {
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
  let freeWidth = parentWidth - (isQubus ? 2 * pfostenBreite : pfostenBreite);
  let segmentPosX = 0;
  if ((isFront || isBack) && segmentIndex >= 0) {
    const anzahl = isFront ? pfostenAnzahlVorne : pfostenAnzahlHinten;
    if (anzahl > 1) {
      const positions = berechnePositionen(isQubus ? parentWidth - pfostenBreite : parentWidth, anzahl);
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
  const gWidth = isQubus ? parentWidth - pfostenBreite : parentWidth;
  const posX = isSide ? wandSeite === 0 ? -gWidth / 2 : gWidth / 2 : segmentPosX;
  const rotY = isSide ? wandSeite === 0 ? -Math.PI / 2 : Math.PI / 2 : isBack ? Math.PI : 0;
  const posZ = isSide ? segmentPosZ : isFront ? -parentDepth / 2 + dachVorsprung + pfostenTiefe / 2 : parentDepth / 2 - backObstruction / 2;
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
  const usableHoeheVorne = isQubus ? hoeheVorne - schwelleHoehe : hoeheAtWandFront - sparrenHoehe;
  const usableHoeheHinten = isQubus ? hoeheHinten - schwelleHoehe : hoeheAtWandBack - sparrenHoehe;
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
    segmentAnzahl
  );
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
function createWandModel(wandTyp, label, extraDefaultProps, materialSlots) {
  const slots = materialSlots ?? ["profil", "glas"];
  function WandModel(props) {
    const {
      breite = 0,
      hoehe = 0,
      aufDachneigung = 0,
      materials = {}
    } = props;
    const material = materials.profil;
    const glasMaterial = materials.glas;
    const farbeHex = "#a0a0a0";
    const glasFarbeHex = "#ccddee";
    const aufDachneigungVal = Number(exprVal(aufDachneigung)) || 0;
    const keilInfo = useWandInfo();
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
    const geoMax = calcWandGeometry(
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
      effectiveSegmentAnzahl
    );
    const isSideWall = effectiveSide === 0 || effectiveSide === 1;
    const keilAbschnittFromCtx = effectiveSide >= 0 && effectiveSide < 4 && keilInfo?.keilAbschnitt ? keilInfo.keilAbschnitt[effectiveSide] ?? -1 : -1;
    const keilReductionAuto = keilAbschnittFromCtx >= 0 && isSideWall ? keilAbschnittFromCtx + KEIL_FRAME_SW$1 : 0;
    const vHoeheStr = exprVal(props.volleHoehe);
    const vHoehe = vHoeheStr !== "" ? Number(vHoeheStr) : isSichtschutz ? 1 : 0;
    const effectiveHoehe = vHoehe === 1 ? 0 : manualHoehe;
    const geo = vHoehe === 1 || manualHoehe === 0 ? geoMax : calcWandGeometry(
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
      effectiveSegmentAnzahl
    );
    const wandBreite = geo.wandBreite;
    const zoneHoeheVorne = geo.zoneHoeheVorne;
    const zoneHoeheHinten = geo.zoneHoeheHinten;
    const keilInnerY = geo.keilInnerY;
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
      case WAND_TYP.RAHMENWAND:
        frameThickness = 0.05;
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
        const ssp2 = props;
        const isSchiebend = Number(exprVal(ssp2.schiebend) ?? 0) === 1;
        const rTiefe = Number(exprVal(ssp2.rahmenTiefe) ?? 0.04);
        const anzahlFrames = Number(exprVal(ssp2.anzahlRahmen) ?? 1);
        const trackSpacing = rTiefe + 0.01;
        frameThickness = isSchiebend ? trackSpacing * anzahlFrames : rTiefe;
        break;
      }
      case WAND_TYP.SICHTSCHUTZWAND: {
        const ssp2 = props;
        const plankenTiefe = Number(exprVal(ssp2.plankenTiefe) ?? 0.02);
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
    const ssHoeheFromCtx = (() => {
      if (effectiveSide < 0 || effectiveSide > 3 || !keilInfo?.sichtschutzHoehe) return 0;
      const vals = Object.values(keilInfo.sichtschutzHoehe[effectiveSide]);
      return vals.length > 0 ? Math.max(0, ...vals) : 0;
    })();
    const minAHFromCtx = (() => {
      if (effectiveSide < 0 || effectiveSide > 3 || !keilInfo?.minAufbauHoehe) return 0;
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
        case WAND_TYP.KEIL: {
          const kAbschnitt = Number(
            exprVal(props.keilAbschnitt) ?? exprVal(props.abschnittVorne) ?? 0
          );
          const hD = zoneHoeheHinten - zoneHoeheVorne;
          beamHeight = Math.max(0, kAbschnitt + hD + KEIL_FRAME_SW$1);
          beamBottomY = keilInnerY - kAbschnitt - KEIL_FRAME_SW$1;
          break;
        }
        case WAND_TYP.SICHTSCHUTZWAND: {
          beamHeight = Math.max(0, vHoehe === 1 ? zoneHoeheHinten : realSichtschutzHoehe);
          beamBottomY = 0;
          break;
        }
        case WAND_TYP.RAHMENWAND:
        default: {
          beamHeight = Math.max(0, zoneHoeheHinten - ssReduction);
          beamBottomY = ssReduction;
          break;
        }
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
                  fuellungTyp: Number(exprVal(kp.fuellungTyp) ?? exprVal(kp.glasTyp) ?? 0),
                  material,
                  glasMaterial,
                  farbeHex,
                  glasFarbeHex: "#ccddee",
                  opacity: Number(exprVal(kp.opacity) ?? 0.2),
                  roughness: Number(exprVal(kp.roughness) ?? 0),
                  metalness: Number(exprVal(kp.metalness) ?? 0),
                  envMapIntensity: Number(exprVal(kp.envMapIntensity) ?? 1),
                  kammergroesse: Number(exprVal(kp.kammergroesse) || 0.05),
                  plankenHoehe: Number(exprVal(kp.plankenHoehe) ?? 0.15),
                  plankenTiefe: Number(exprVal(kp.plankenTiefe) ?? 0.02)
                }
              )
            }
          );
        }
        case WAND_TYP.RAHMENWAND: {
          const rp = props;
          const isSide = effectiveSide === 0 || effectiveSide === 1;
          const isRightSide = effectiveSide === 1;
          const frameThickness2 = 0.05;
          const rwKeilReduction = keilReductionAuto;
          const isSlantedWand = aufDachneigungVal > 0 && isSide && rwKeilReduction <= 0;
          const effectiveKeilReduction = rwKeilReduction;
          const rwHoehe = zoneHoeheVorne - effectiveKeilReduction - ssReduction;
          const rwY = isSlantedWand ? ssReduction : rwHoehe / 2 + ssReduction;
          const sHoeheVorne = (isRightSide ? zoneHoeheHinten : zoneHoeheVorne) - effectiveKeilReduction - ssReduction;
          const sHoeheHinten = (isRightSide ? zoneHoeheVorne : zoneHoeheHinten) - effectiveKeilReduction - ssReduction;
          const rwZ = isSide ? (ctx.pfostenBreite - frameThickness2) / 2 : -(ctx.pfostenTiefe - frameThickness2) / 2;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, rwY, rwZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            RahmenwandWand,
            {
              wandBreite,
              wandHoeheVorne: isSlantedWand ? sHoeheVorne : rwHoehe,
              mitMittelbalken: Number(exprVal(rp.mitMittelbalken) ?? 0),
              mittelbalkenHoehe: Number(exprVal(rp.mittelbalkenHoehe) ?? 0.5),
              maxScheibenBreite: Number(exprVal(rp.maxScheibenBreite) ?? 0),
              fuellungTypOben: Number(exprVal(rp.fuellungTypOben) ?? exprVal(rp.glasTypOben) ?? 0),
              fuellungTypUnten: Number(exprVal(rp.fuellungTypUnten) ?? exprVal(rp.glasTypUnten) ?? 0),
              material,
              glasMaterialOben: materials.glasOben,
              glasMaterialUnten: materials.glasUnten,
              farbeHex,
              glasFarbeHex,
              opacityOben: Number(exprVal(rp.opacityOben) ?? 0.2),
              roughnessOben: Number(exprVal(rp.roughnessOben) ?? 0),
              metalnessOben: Number(exprVal(rp.metalnessOben) ?? 0),
              envMapIntensityOben: Number(exprVal(rp.envMapIntensityOben) ?? 1),
              kammergroesseOben: Number(exprVal(rp.kammergroesseOben) || 0.05),
              opacityUnten: Number(exprVal(rp.opacityUnten) ?? 0.2),
              roughnessUnten: Number(exprVal(rp.roughnessUnten) ?? 0),
              metalnessUnten: Number(exprVal(rp.metalnessUnten) ?? 0),
              envMapIntensityUnten: Number(exprVal(rp.envMapIntensityUnten) ?? 1),
              kammergroesseUnten: Number(exprVal(rp.kammergroesseUnten) || 0.05),
              wandHoeheHinten: isSlantedWand ? sHoeheHinten : void 0,
              aufDachneigung: isSlantedWand ? 1 : 0,
              plankenHoehe: Number(exprVal(rp.plankenHoehe) ?? 0.15),
              plankenTiefe: Number(exprVal(rp.plankenTiefe) ?? 0.02)
            }
          ) });
        }
        case WAND_TYP.SCHIEBETUER: {
          const sp = props;
          const isSide = effectiveSide === 0 || effectiveSide === 1;
          const spGlasDicke = Number(exprVal(sp.glasDicke) ?? 8e-3);
          const keilReduction = keilReductionAuto;
          const stHoehe = zoneHoeheVorne - keilReduction - ssReduction;
          const stZ = isSide ? ctx.pfostenBreite / 2 : -ctx.pfostenTiefe / 2;
          const stWandBreite = wandBreite;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, ssReduction, stZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
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
              fuellungTyp: Number(exprVal(sp.fuellungTyp) ?? exprVal(sp.glasTyp) ?? 0),
              glasDicke: spGlasDicke,
              rahmenBreite: Number(exprVal(sp.rahmenBreite) ?? 0.04),
              material,
              glasMaterial,
              farbeHex,
              glasFarbeHex,
              opacity: Number(exprVal(sp.opacity) ?? 0.2),
              roughness: Number(exprVal(sp.roughness) ?? 0),
              metalness: Number(exprVal(sp.metalness) ?? 0),
              envMapIntensity: Number(exprVal(sp.envMapIntensity) ?? 1),
              kammergroesse: Number(exprVal(sp.kammergroesse) || 0.05),
              zShiftDir: isSide ? 1 : -1,
              plankenHoehe: Number(exprVal(sp.plankenHoehe) ?? 0.15),
              plankenTiefe: Number(exprVal(sp.plankenTiefe) ?? 0.02)
            }
          ) });
        }
        case WAND_TYP.SHUTTERS: {
          const sh = props;
          const lamH = Number(exprVal(sh.lamellenHoehe) ?? 0.08);
          const isSchiebend = Number(exprVal(sh.schiebend) ?? 0) === 1;
          const rTiefe = Number(exprVal(sh.rahmenTiefe) ?? 0.04);
          const anzahlFrames = Math.max(1, Math.round(Number(exprVal(sh.anzahlRahmen) ?? 1)));
          const trackSpacing = rTiefe + 0.01;
          const shutDepth = isSchiebend ? trackSpacing * anzahlFrames : rTiefe;
          const shutHoehe = zoneHoeheVorne - keilReductionAuto - ssReduction;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, ssReduction, (ctx.pfostenBreite - shutDepth) / 2], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            ShuttersWand,
            {
              wandBreite,
              wandHoeheVorne: shutHoehe,
              lamellenHoehe: lamH,
              lamellenFarbeHex: "#808080",
              schiebend: isSchiebend ? 1 : 0,
              anzahlRahmen: anzahlFrames,
              oeffnungSchiebe: Number(exprVal(sh.oeffnungSchiebe) ?? 0),
              oeffnungLamellen: Number(exprVal(sh.oeffnungLamellen) ?? 0),
              rahmenBreite: Number(exprVal(sh.rahmenBreite) ?? 0.04),
              rahmenTiefe: rTiefe,
              material,
              farbeHex
            }
          ) });
        }
        case WAND_TYP.SICHTSCHUTZWAND: {
          const ssp2 = props;
          const plTiefeStr = exprVal(ssp2.plankenTiefe);
          const plTiefe = plTiefeStr !== "" ? Number(plTiefeStr) : 0.02;
          const plHoeheStr = exprVal(ssp2.plankenHoehe);
          const plHoehe = plHoeheStr !== "" ? Number(plHoeheStr) : 0.15;
          const qbStr = exprVal(ssp2.querbalken);
          const qb = qbStr !== "" ? Number(qbStr) : 1;
          const maxThickness = Math.max(0.04, plTiefe + 0.02);
          const ssZ = isSideWall ? (ctx.pfostenBreite - maxThickness) / 2 : -(ctx.pfostenTiefe - maxThickness) / 2;
          const isRightSide = effectiveSide === 1;
          const sHoeheHinten = vHoehe === 1 && isSideWall && reduction <= 0 ? geoMax.zoneHoeheHinten - reduction - minAH : void 0;
          const [ssWandHoehe, ssWandHoeheHinten] = sHoeheHinten !== void 0 ? isRightSide ? [sHoeheHinten, realSichtschutzHoehe] : [realSichtschutzHoehe, sHoeheHinten] : [realSichtschutzHoehe, void 0];
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("group", { position: [0, 0, ssZ], children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
            SichtschutzwandWand,
            {
              wandBreite,
              wandHoehe: ssWandHoehe,
              wandHoeheHinten: ssWandHoeheHinten,
              plankenHoehe: plHoehe,
              plankenTiefe: plTiefe,
              querbalken: qb,
              material,
              farbeHex
            }
          ) });
        }
        default: {
          const defaultHoehe = zoneHoeheVorne - keilReductionAuto - ssReduction;
          return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
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
    };
    if (isTooSmall) return null;
    return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
      "group",
      {
        position: [geo.posX, geo.zoneGroupY, geo.posZ],
        rotation: [0, geo.rotY, 0],
        userData: { modelId: props.id },
        name: props.name,
        children: [
          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(SceneShadowLight, {}),
          renderContent(),
          isSideWall && hasPfette && beamHeight > 0.01 && !hasRearPosts && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
            "mesh",
            {
              position: [beamX, beamBottomY + beamHeight / 2, beamZ],
              castShadow: true,
              receiveShadow: true,
              children: [
                /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [ctx.pfettenBreite, beamHeight, frameThickness] }),
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
    segmentIndex: { expression: "-1" }
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
  const convertedExtra = extraDefaultProps ? Object.fromEntries(
    Object.entries(extraDefaultProps).map(([k, v]) => [k, toExpr(v)])
  ) : {};
  const DIALOG_LABELS = {
    breite: "Breite (0=auto aus Veranda) (m)",
    hoehe: "Höhe (0=auto aus Veranda) (m)",
    segmentIndex: "Feld-Index (0=1. Feld, 1=2. Feld, … | -1=volle Breite)",
    glasTyp: "Füllungstyp (0=Glas,1=Poly,2=Planken)",
    fuellungTypOben: "Füllung oben (0=Glas, 1=Poly, 2=Planken)",
    fuellungTypUnten: "Füllung unten (0=Glas, 1=Poly, 2=Planken)",
    fuellungTyp: "Füllung (0=Glas, 1=Poly, 2=Planken)",
    opacity: "Transparenz (0–1)",
    roughness: "Rauheit (0–1)",
    metalness: "Metalness (0–1)",
    envMapIntensity: "EnvMap-Intensität",
    kammergroesse: "Kammergröße (m)",
    keilAbschnitt: "Keilabschnitt vorne (0=Spitze) (m)",
    keilTeiler: "Zwischenpfosten Anzahl",
    dicke: "Profiltiefe (m)",
    mitMittelbalken: "Mittelbalken (0=Nein, 1=Ja)",
    aufDachneigung: "Oberkante (0=Standard, 1=Volle Höhe)",
    mittelbalkenHoehe: "Mittelbalken-Höhe ab Boden (m)",
    maxScheibenBreite: "Max. Scheibenbreite (0=ohne Limit) (m)",
    mitRahmen: "Variante",
    tuertypPanels: "Anzahl Elemente (0=auto)",
    festeElemente: "Feste Elemente (0=alle schiebbar)",
    oeffnung: "Öffnung (0-1)",
    laufrichtung: "Laufrichtung",
    schienenSeite: "Schienen-Seite",
    griffTyp: "Grifftyp (0=Rund, 1=Muschel, 2=Stahl, 3=Ohne)",
    griffAnordnung: "Griff-Anordnung (0=Erste Tür, 1=Anf.+Ende, 2=Alle)",
    griffPosition: "Griffposition",
    griffSeite: "Griffseite",
    griffHoehe: "Griffhöhe (m)",
    buersten: "Bürsten",
    maxPanelBreite: "Max. Panelbreite (0=ohne Limit) (m)",
    glasDicke: "Glasdicke (m)",
    rahmenBreite: "Rahmenbreite (m)",
    lamellenHoehe: "Lamellenhöhe (m)",
    anzahlRahmen: "Anzahl Rahmen",
    schiebend: "Schiebend",
    wandHoehe: "Wandhöhe (m)",
    plankenHoehe: "Planken-Höhe (m)",
    plankenTiefe: "Planken-Stärke (m)",
    opacityOben: "Transparenz oben (0–1)",
    opacityUnten: "Transparenz unten (0–1)",
    roughnessOben: "Rauheit oben (0–1)",
    roughnessUnten: "Rauheit unten (0–1)",
    kammergroesseOben: "Kammergröße oben (m)",
    kammergroesseUnten: "Kammergröße unten (m)",
    querbalken: "Abschlussbalken oben",
    volleHoehe: "Volle Höhe (1=Ja, 0=Nein)"
  };
  let baseDialogKeys = ["breite", "hoehe", "segmentIndex"];
  if (wandTyp === WAND_TYP.KEIL || wandTyp === WAND_TYP.SCHIEBETUER) {
    baseDialogKeys = ["breite", "hoehe", "segmentIndex", "fuellungTyp", "opacity", "roughness", "plankenHoehe", "plankenTiefe"];
    if (wandTyp === WAND_TYP.KEIL) {
      baseDialogKeys.push("glasTyp");
    }
  } else if (wandTyp === WAND_TYP.RAHMENWAND) {
    baseDialogKeys = [
      "breite",
      "hoehe",
      "segmentIndex",
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
  const extraKeys = Object.keys(convertedExtra);
  const allDialogKeys = [
    ...baseDialogKeys,
    ...extraKeys.filter((k) => !baseDialogKeys.includes(k))
  ];
  const wandPropsSchema = {};
  for (const key of allDialogKeys) {
    const opts = RADIO_OPTIONS[key];
    const label2 = DIALOG_LABELS[key] ?? key;
    if (opts) {
      wandPropsSchema[key] = { type: "radioGroup", label: label2, options: opts };
    } else {
      wandPropsSchema[key] = { type: "expression", label: label2 };
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
  metalness: { expression: "0" },
  envMapIntensity: { expression: "1.0" },
  kammergroesse: { expression: "0.05" },
  plankenHoehe: { expression: "0.15" },
  plankenTiefe: { expression: "0.02" },
  keilAbschnitt: { expression: "0" },
  keilTeiler: { expression: "0" },
  dicke: { expression: "0.07" }
});

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
  ["profil", "glasOben", "glasUnten"]
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
});

const shuttersDynamicModel = createWandModel(WAND_TYP.SHUTTERS, "Shutters", {
  lamellenHoehe: 0.08,
  schiebend: 0,
  anzahlRahmen: 1,
  oeffnungSchiebe: 0,
  oeffnungLamellen: 0,
  segmentIndex: { expression: "-1" },
  rahmenBreite: 0.04,
  rahmenTiefe: 0.04
});

const sichtschutzwandDynamicModel = createWandModel(WAND_TYP.SICHTSCHUTZWAND, "Sichtschutzwand", {
  // Basis
  hoehe: 0,
  volleHoehe: 1,
  minAufbauHoehe: 0,
  segmentIndex: { expression: "-1" },
  // Planken
  plankenHoehe: 0.15,
  plankenTiefe: 0.02,
  querbalken: 1
}, ["profil"]);

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
  const width = ctx.innerWidth ?? ctx.width ?? props?.width;
  const depth = ctx.innerDepth ?? ctx.depth ?? props?.depth;
  const height = ctx.height ?? props?.height;
  const dachneigung = ctx.eindeckungDachneigung ?? ctx.dachneigung ?? props?.dachneigung;
  const dachVorsprung = ctx.dachVorsprung ?? props?.dachVorsprung;
  const sparrenAnzahl = eindeckungInfo.sparrenAnzahl > 0 ? eindeckungInfo.sparrenAnzahl : ctx.sparrenAnzahl ?? 6;
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
  const zHintenUnterdach = depth / 2 - (Number(pfette) === 1 ? pfettenBreite : 0);
  const sparrenTiefeUnterdach = zHintenUnterdach - zVorneUnterdach;
  const querbalkenBreite = ctx.isQubus ? width : width + pfostenBreite;
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
const KASSETTE_INT_W = 0.12;
const KASS_FLANSCH_DICKE = 0.01;
const KASS_STEG_BREITE = 6e-3;
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
      renderOrder: 1,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material, materialType: "physical", side: veranda_mf_2_plugin__loadShare__three__loadShare__.DoubleSide, opacity: 1, depthWrite: true })
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
    segmentIndex: _si = -1,
    segmentAnzahl: _sa = 0,
    materials = {},
    position,
    rotation,
    scale
  } = props;
  const siStr = exprVal(_si);
  const segmentIndex = siStr !== "" ? Number(siStr) : -1;
  const saStr = exprVal(_sa);
  const segmentAnzahl = saStr !== "" ? Number(saStr) : 0;
  const markiseTyp = Number(_mt);
  const kastenArtN = Number(kastenArt);
  const halterungenN = Number(halterungen);
  const anbringungN = Number(anbringung);
  const winkelN = Number(winkel);
  const isAufdach = markiseTyp === 0;
  const isUnterdach = markiseTyp === 1;
  const isSenkrecht = markiseTyp === 2;
  const isKassette = markiseTyp === 3;
  const ctx = useVerandaGeometry();
  const bgeo = useBeschattungGeometry();
  const { shadingMode } = useSceneMode();
  const wandSeiteCtx = useWandSeite();
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
      segmentAnzahl
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
      segmentAnzahl
    ]
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
  const wandInfo = useWandInfo();
  const effectiveSideCtx = wandSeiteCtx;
  const keilAbschnittCtx = wandInfo.keilAbschnitt[effectiveSideCtx] ?? 0;
  const isSideCtx = wandSeiteCtx === 0 || wandSeiteCtx === 1;
  const keilReduction = Number(mitKeil) === 1 && keilAbschnittCtx > 0 && isSideCtx ? keilAbschnittCtx + KEIL_FRAME_SW : 0;
  const ssHoeheFromCtx = wandInfo.sichtschutzHoehe[effectiveSideCtx]?.[segmentIndex] ?? 0;
  if (isSenkrecht) {
    const isSide = wandSeiteCtx === 0 || wandSeiteCtx === 1;
    const isFront = wandSeiteCtx === 2;
    const isBack = wandSeiteCtx === 3;
    const freeWidth = wandGeo.wandBreite;
    const fullWidth = isSide ? ctx.depth - ctx.dachVorsprung : ctx.isQubus ? ctx.width : ctx.width + ctx.pfostenBreite;
    const markiseWidth = anbringungN === 1 ? fullWidth : freeWidth;
    const hasPfette = Number(ctx.pfette) === 1;
    const postHalfDepth = isSide ? ctx.pfostenBreite / 2 : isBack && hasPfette ? ctx.pfettenBreite / 2 : ctx.pfostenTiefe / 2;
    let wallSurfaceZ = 0;
    if (anbringungN === 1) {
      wallSurfaceZ = isSide ? postHalfDepth : -postHalfDepth;
    } else if (anbringungN === 2) {
      wallSurfaceZ = isSide ? -postHalfDepth : postHalfDepth;
    }
    const effectivePosZ = isSide && anbringungN === 1 ? ctx.dachVorsprung / 2 : wandGeo.posZ;
    const railSign = anbringungN === 2 ? -1 : 1;
    const railAbstand = Number(schienenAbstand);
    const ySign = isSide ? -railSign : railSign;
    const kassetteR_sk = kassettenDurchmesser > 0 ? kassettenDurchmesser / 2 : KASSETTE_R;
    const kastenW_sk = kastenBreite > 0 ? kastenBreite : kassetteR_sk * 2;
    const kastenH_sk = kastenHoehe > 0 ? kastenHoehe : kassetteR_sk * 2;
    const baseHeight = isFront ? wandGeo.zoneHoeheVorne : isBack ? bgeo.ySparrenUKHinten : bgeo.ySparrenUKVorne;
    const kassetteTopY = baseHeight - keilReduction;
    const maxFall = Math.max(0, wandGeo.zoneHoeheVorne - keilReduction - ssHoeheFromCtx);
    const gesamtFall = tiefe > 0 ? Math.min(tiefe, maxFall) : maxFall;
    const effFall = gesamtFall * oeffnung;
    const halfZ_sk = gesamtFall / 2;
    const kassetteZ_sk = halfZ_sk - kassetteR_sk;
    const rollR_sk = kastenArtN === 2 ? kassetteR_sk * (0.3 + 0.7 * (1 - oeffnung)) : kassetteR_sk;
    const stoffStartZ_sk = halfZ_sk - kassetteR_sk - rollR_sk;
    const stoffSchraeg_sk = Math.max(0, effFall - kassetteR_sk - rollR_sk);
    const auslaufZ_sk = stoffStartZ_sk - stoffSchraeg_sk;
    const railLength_sk = gesamtFall - kassetteR_sk - SCHIENE_W;
    const railCenterZ_sk = -(kassetteR_sk + SCHIENE_W) / 2;
    const groupY_sk = kassetteTopY - halfZ_sk;
    const isZwischen = anbringungN === 0;
    const railLift_sk = isZwischen ? 0 : railAbstand;
    const railY_sk = isZwischen ? 0 : ySign * (railLift_sk + SCHIENE_H / 2);
    const railBotY_sk = isZwischen ? 0 : ySign * (SCHIENE_BOTTOM_H / 2);
    const kassetteY_sk = isZwischen ? 0 : ySign * kassetteR_sk;
    const kassetteYEc_sk = isZwischen ? 0 : ySign * (kastenH_sk / 2);
    const klemmeWandY_sk = ySign * railLift_sk;
    const klemmeSchY_sk = ySign * (HALTER_KLEMME_H / 2);
    const stabLen_sk = railLift_sk - HALTER_KLEMME_H;
    const stabY_sk = ySign * ((railLift_sk + HALTER_KLEMME_H) / 2);
    const showHalterSk = halterungenN === 1 && !isZwischen;
    const schieneOuterX = markiseWidth / 2;
    const stoffBr_sk = markiseWidth - SCHIENE_W * 2 - 5e-3;
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
            kastenArtN === 1 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { position: [0, kassetteYEc_sk, kassetteZ_sk], castShadow: true, children: [
              /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [markiseWidth, kastenH_sk, kastenW_sk] }),
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
                position: [side * (schieneOuterX - SCHIENE_W / 2), railY_sk, railCenterZ_sk],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W, SCHIENE_H, railLength_sk] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              },
              `rail-${side}`
            )),
            [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [side * (schieneOuterX - SCHIENE_W / 2), railBotY_sk, railCenterZ_sk],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W, SCHIENE_BOTTOM_H, railLength_sk] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              },
              `rail-bot-${side}`
            )),
            [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [side * (schieneOuterX - SCHIENE_W - FUEHRUNG_T / 2), railY_sk, railCenterZ_sk],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [FUEHRUNG_T, SCHIENE_W, oeffnung > 0 ? railLength_sk : 0.01] }),
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
  const kassetteR = isKassette ? kBoxD / 2 : kassettenDurchmesser > 0 ? kassettenDurchmesser / 2 : KASSETTE_R;
  const kassetteZ = halfZ - (isKassette ? kBoxD / 2 : kassetteR);
  const kassetteD = isKassette ? kBoxD : kassetteR * 2;
  const stoffStartZ = halfZ - kassetteD;
  const stoffSchraeg = Math.max(
    0,
    effektiveTiefe / Math.cos(neigungRad) - kassetteD
  );
  const auslaufZ = stoffStartZ - stoffSchraeg;
  const railLength = Math.max(0, schraegeTiefe - kassetteR - SCHIENE_W);
  const railCenterZ = -(kassetteR + SCHIENE_W) / 2;
  const backHz = halfZ - kassetteD - 0.02;
  const frontHz = -halfZ + 0.04;
  const halterZPositions = [backHz, frontHz];
  const winkelBackHz = halfZ - kassetteD;
  const winkelZPositions = [winkelBackHz, (winkelBackHz + frontHz) / 2, frontHz];
  const effectiveRailDrop = railLift;
  const railCenterY = -(effectiveRailDrop + SCHIENE_H / 2);
  const railBottomCenterY = -SCHIENE_BOTTOM_H / 2;
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
                  side * (schieneOuterX - SCHIENE_W / 2),
                  isUnterdach ? railCenterY : railLift + SCHIENE_H / 2,
                  railCenterZ
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W, SCHIENE_H, railLength] }),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              },
              `rail-${side}`
            )),
            !isKassette && [-1, 1].map((side) => /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
              "mesh",
              {
                position: [
                  side * (schieneOuterX - SCHIENE_W / 2),
                  isUnterdach ? railBottomCenterY : SCHIENE_BOTTOM_H / 2,
                  railCenterZ
                ],
                castShadow: true,
                receiveShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [SCHIENE_W, SCHIENE_BOTTOM_H, railLength] }),
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
                  side * (schieneOuterX - SCHIENE_W - FUEHRUNG_T / 2),
                  isUnterdach ? railCenterY : railLift + SCHIENE_H / 2,
                  railCenterZ
                ],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "boxGeometry",
                    {
                      args: [FUEHRUNG_T, SCHIENE_W, oeffnung > 0 ? railLength : 0.01]
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
                  side * (schieneOuterX - SCHIENE_W / 2),
                  isUnterdach ? railCenterY : railLift + SCHIENE_H / 2,
                  railCenterZ - railLength / 2
                ],
                rotation: [0, 0, Math.PI / 2],
                castShadow: true,
                children: [
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                    "cylinderGeometry",
                    {
                      args: [SCHIENE_H / 2, SCHIENE_H / 2, SCHIENE_W - 5e-3, 32]
                    }
                  ),
                  /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                ]
              },
              `cap-${side}`
            )),
            !isKassette && showHalter && [-1, 1].map(
              (side) => halterZPositions.map((hz, hi) => {
                const stabLen = isUnterdach ? effectiveRailDrop - HALTER_KLEMME_H : railLift - HALTER_KLEMME_H;
                return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                  "group",
                  {
                    position: [side * (schieneOuterX - SCHIENE_W / 2), 0, hz],
                    children: [
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                        "mesh",
                        {
                          position: [0, isUnterdach ? -HALTER_KLEMME_H / 2 : railLift, 0],
                          castShadow: true,
                          children: [
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W, HALTER_KLEMME_H, HALTER_KLEMME_T] }),
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                          ]
                        }
                      ),
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                        "mesh",
                        {
                          position: [0, isUnterdach ? -(effectiveRailDrop + SCHIENE_H / 2) : HALTER_KLEMME_H / 2, 0],
                          castShadow: true,
                          children: [
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_KLEMME_W, HALTER_KLEMME_H, HALTER_KLEMME_T] }),
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                          ]
                        }
                      ),
                      stabLen > 1e-3 && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                        "mesh",
                        {
                          position: [0, isUnterdach ? -(HALTER_KLEMME_H / 2 + stabLen / 2) : (railLift + HALTER_KLEMME_H) / 2, 0],
                          castShadow: true,
                          children: [
                            /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("boxGeometry", { args: [HALTER_STAB_W, stabLen, HALTER_STAB_W] }),
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
                        position: [-side * (SCHIENE_W / 2), -0.015, 0],
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
            !isKassette && oeffnung > 0 && stoffSchraeg > 0.01 && (() => {
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
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("mesh", { castShadow: true, children: [
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                        "boxGeometry",
                        {
                          args: [auslaufBreite, AUSLAUF_H, AUSLAUF_T]
                        }
                      ),
                      /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: profilMaterial })
                    ] }),
                    /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs(
                      "mesh",
                      {
                        position: [0, 0, -AUSLAUF_T / 2],
                        rotation: [0, 0, Math.PI / 2],
                        castShadow: true,
                        children: [
                          /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
                            "cylinderGeometry",
                            {
                              args: [AUSLAUF_RUND_R, AUSLAUF_RUND_R, auslaufBreite, 16]
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
  markiseTyp: { type: "radioGroup", label: "Typ", options: [
    { value: "0", label: "Aufdach" },
    { value: "1", label: "Unterdach" },
    { value: "2", label: "Senkrecht" },
    { value: "3", label: "Kassette (Integriert)" }
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
  mitKeil: { type: "expression", label: "Keil berücksichtigen – Senkrecht (0=nein, 1=ja)" },
  segmentIndex: { type: "expression", label: "Segment-Index (0=links-außen, -1=auto/voll)" }
};
const markiseDynamicModel = {
  type: "veranda-markise",
  label: "Markise",
  description: "Auf-/Unterdach-/Senkrecht-/Kassettenmarkise (markiseTyp wählbar). Senkrecht: im Wand-Slot platzieren.",
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
    winkel: { expression: "0" },
    segmentIndex: { expression: "-1" }
  },
  propsDialog: markisePropsSchema,
  component: MarkiseModel,
  materials: ["profil", "stoff"],
  disabledForAR: false
};

function createBeschattungUnterdachModel(config) {
  const { VariantContent } = config;
  function BeschattungModel(props) {
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
    disabledForAR: false
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
        renderOrder: idx + 1,
        receiveShadow: true,
        castShadow: true,
        name: "stoff",
        children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(MaterialFallback, { material: stoffMaterial, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
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
    opacity: { expression: "1" },
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

function HighlightPlane(props) {
  const breite = Number(exprVal(props.breite)) || 0;
  const hoehe = Number(exprVal(props.hoehe)) || 0;
  const iconSize = Number(exprVal(props.iconSize)) || 0.15;
  const showIcon = Number(exprVal(props.showIcon) ?? "1") !== 0;
  const wandSeite = useWandSeite();
  const geo = useWandGeometry(wandSeite, breite, 0, hoehe);
  const width = geo.wandBreite;
  const height = geo.zoneHoeheVorne;
  const planGeo = veranda_mf_2_plugin__loadShare__react__loadShare__.useMemo(() => new veranda_mf_2_plugin__loadShare__three__loadShare__.PlaneGeometry(width, height), [width, height]);
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
  }, [planGeo]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    iconGeo.dispose();
  }, [iconGeo]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    iconTex.dispose();
  }, [iconTex]);
  veranda_mf_2_plugin__loadShare__react__loadShare__.useEffect(() => () => {
    iconMat.dispose();
  }, [iconMat]);
  return /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx(
    "group",
    {
      position: [geo.posX, geo.zoneGroupY, geo.posZ],
      rotation: [0, geo.rotY, 0],
      userData: { modelId: props.id },
      name: props.name,
      children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsxs("group", { position: [0, height / 2, 0], children: [
        /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { geometry: planGeo, children: /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("meshBasicMaterial", { transparent: true, opacity: 0, depthWrite: false }) }),
        showIcon && /* @__PURE__ */ veranda_mf_2_plugin__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.jsx("mesh", { geometry: iconGeo, material: iconMat, position: [0, 0, 1e-3] })
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

const Plugin = {
  id: "oc.veranda.plugin",
  version: "0.1.5",
  viewer: {
    sceneComponents: {
      "oc.veranda.shadowLighting": shadowLightingSceneComponent
    },
    models: [
      // Root
      konstruktionDynamicModel,
      ledStripeDynamicModel,
      sceneEnvironmentDynamicModel,
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
      shuttersDynamicModel,
      sichtschutzwandDynamicModel,
      // Beschattung
      markiseDynamicModel,
      plisseeDynamicModel,
      stoffDynamicModel,
      // Highlight
      highlightPlaneDynamicModel
    ]
  }
};

export { Plugin as default };
