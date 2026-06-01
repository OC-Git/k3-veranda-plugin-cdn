/**
 * Build-Zeit-Stub für @k3/core.
 *
 * Zur Laufzeit wird window.__k3core durch die init()-Injection in remoteEntry.js
 * mit K3's echter @k3/core Implementierung befüllt. Jede exportierte Funktion
 * hier ist ein Proxy, der zur Laufzeit K3's Version aufruft.
 *
 * Falls window.__k3core noch nicht gesetzt ist (Build oder SS), wird null
 * zurückgegeben.
 */

function makeProxy(name) {
    return function Proxy(props) {
        var core = typeof window !== "undefined" && window.__k3core;
        if (core && typeof core[name] === "function") {
            return core[name](props);
        }
        return null;
    };
}

function makeHookProxy(name) {
    return function () {
        var core = typeof window !== "undefined" && window.__k3core;
        if (core && typeof core[name] === "function") {
            return core[name].apply(core, arguments);
        }
        return {};
    };
}

var SecondaryTitle = makeProxy("SecondaryTitle");
var ExpressionInput = makeProxy("ExpressionInput");
var VariableSelector = makeProxy("VariableSelector");
var ModelSelector = makeProxy("ModelSelector");

/**
 * SlotModelRenderer: Wird von unserem Plugin NICHT mehr direkt verwendet,
 * da VerandaModel instance.component nun direkt als JSX rendert.
 * Diese Implementierung dient nur noch als Fallback für lokale Dev-Umgebung.
 */
var SlotModelRenderer = function SlotModelRenderer(props) {
    // Fallback: direkt aus der Instanz rendern
    var instance = props && props.instance;
    if (!instance) return null;
    var Comp = instance.component;
    if (typeof Comp !== "function") return null;
    return Comp({
        ...instance.props,
        id: instance.model && instance.model.id,
        modelAction: instance.modelAction,
        slots: instance.slots,
    });
};

/**
 * BasicDynamicModelEditor: Wrapper der die extraFields direkt rendert.
 * K3 v3 hat ein anderes Interface – wir überschreiben mit eigener Impl.
 */
var BasicDynamicModelEditor = function BasicDynamicModelEditor(props) {
    var core = typeof window !== "undefined" && window.__k3core;
    if (core && typeof core["BasicDynamicModelEditor"] === "function") {
        return core["BasicDynamicModelEditor"](props);
    }
    // Fallback: extraFields direkt zurückgeben
    return (props && props.extraFields != null) ? props.extraFields : null;
};

var useModels = makeHookProxy("useModels");

export { BasicDynamicModelEditor, ExpressionInput, ModelSelector, SecondaryTitle, SlotModelRenderer, VariableSelector, useModels };
