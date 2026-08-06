import { v as veranda_mf_2_plugin__loadShare__react__loadShare__, R as React } from './veranda_mf_2_plugin__loadShare__react__loadShare__-BxvQ6I45.js';
import './_commonjsHelpers-B85MJLTf.js';
import './veranda_mf_2_plugin__mf_v__runtimeInit__mf_v__-YRia8a0_.js';

//#region src/component-state.ts
/** @internal */
let _useComponentMap = null;
/** @internal */
let _Providers = null;
/** @internal */
function setComponentApi(useComponentMap, Providers) {
	_useComponentMap = useComponentMap;
	_Providers = Providers;
}
/** @internal */
function getComponentMapHook() {
	return _useComponentMap;
}
/** @internal */
function getProviders() {
	return _Providers;
}
//#endregion
//#region src/runtime.ts
/**
* Internal getter function injected by K3 at runtime.
*/
let _getSettings = null;
/**
* Internal reactive hook injected by K3 at runtime.
*/
let _usePluginSettings = null;
/** @internal */
let _useSelections = null;
/** @internal */
let _useSelectionByVariableKey = null;
/** @internal */
let _useBOM = null;
/** @internal */
let _useTotalPrice = null;
/** @internal */
let _useFormattedTotalPrice = null;
/** @internal */
let _useApp = null;
/** @internal */
let _useSetConfigurationVariable = null;
/** @internal */
let _useAcceptConfigurationConflict = null;
/** @internal */
let _useRejectConfigurationConflict = null;
/** @internal */
let _useConfigurationInstances = null;
/** @internal */
let _useAddConfigurationInstance = null;
/** @internal */
let _useRemoveConfigurationInstance = null;
/** @internal */
let _useSetCameraPosition = null;
/** @internal */
let _useOpenInstance = null;
/**
* Returns `fn` if K3 injected it via {@link init}, otherwise throws a uniform
* "not initialized" error naming the API entry point.
* @internal
*/
function requireInit(fn, name) {
	if (!fn) throw new Error(`k3-plugin-api not initialized. Make sure K3 calls init() before using ${name}().`);
	return fn;
}
/**
* Get plugin-specific settings from the K3 store.
* Returns a snapshot of the current settings - not reactive.
* Use this in plugin components that need access to settings configured in the admin.
*
* @param pluginId - The unique plugin ID (e.g. "acme.my-plugin")
* @returns The settings object for this plugin, or `{}` if none are configured
*
* @example
* ```typescript
* const settings = getSettings("acme.my-plugin") as { apiKey?: string };
* if (settings.apiKey) {
*   // Use API key
* }
* ```
*/
function getSettings(pluginId) {
	return requireInit(_getSettings, "getSettings")(pluginId);
}
/**
* Get plugin-specific settings from the K3 store as a reactive hook.
* Re-renders the component whenever the settings change.
* Use this in plugin React components.
*
* @param pluginId - The unique plugin ID (e.g. "acme.my-plugin")
* @returns The settings object for this plugin, or `{}` if none are configured
*
* @example
* ```typescript
* const settings = useK3PluginSettings("acme.my-plugin") as { apiKey?: string };
* ```
*/
function useK3PluginSettings(pluginId) {
	return requireInit(_usePluginSettings, "useK3PluginSettings")(pluginId);
}
/**
* Reactive hook – returns all current configuration variables as a key-value map.
* Keys are the variable's stable `key` string. Values are resolved (labels, not raw IDs).
* Re-renders whenever any selection changes.
*
* @param includeUnkeyed - When `true`, also include variables that have no
*   stable `key`, keyed by their numeric id as a string. Defaults to `false`
*   (only keyed variables).
*
* @example
* ```typescript
* const variables = useConfigurationVariables();
* const color = variables["color"] as K3SimplifiedValue;
*
* // Get every variable, including ones without a key:
* const everything = useConfigurationVariables(true);
* ```
*/
function useConfigurationVariables(includeUnkeyed) {
	return requireInit(_useSelections, "useConfigurationVariables")(includeUnkeyed);
}
/**
* Reactive hook – returns the resolved value for a specific variable by its key,
* or `undefined` if the variable has no active selection.
*
* @param variableKey - The stable key of the variable (as defined in the admin)
*
* @example
* ```typescript
* const width = useConfigurationVariable("width") as number;
* const material = useConfigurationVariable("material") as K3SimplifiedValue;
* ```
*/
function useConfigurationVariable(variableKey) {
	return requireInit(_useSelectionByVariableKey, "useConfigurationVariable")(variableKey);
}
/**
* Reactive hook – returns the current Bill of Materials (Stückliste).
* Re-renders whenever the BOM changes (i.e. on any selection change).
*
* @example
* ```typescript
* const bom = useBOM() as K3BomEntry[];
* const total = bom.reduce((sum, e) => sum + e.price.price * e.qty, 0);
* ```
*/
function useBOM() {
	return requireInit(_useBOM, "useBOM")();
}
/**
* Reactive hook – returns the current total price as a raw number.
* Re-renders whenever the price changes.
*/
function useTotalPrice() {
	return requireInit(_useTotalPrice, "useTotalPrice")();
}
/**
* Reactive hook – returns the current total price formatted as a locale string
* (e.g. `"1.299,00 €"`), ready for display.
* Re-renders whenever the price changes.
*/
function useFormattedTotalPrice() {
	return requireInit(_useFormattedTotalPrice, "useFormattedTotalPrice")();
}
/**
* Reactive hook – returns the current K3 app metadata, including the booked
* product identifier. Returns `null` while the app has not yet loaded.
*
* @example
* ```typescript
* const app = useApp() as K3AppInfo | null;
* if (app?.product === "k3-pro") {
*   // enable pro-only features
* }
* ```
*/
function useApp() {
	return requireInit(_useApp, "useApp")();
}
/**
* Hook – returns a setter that changes a configuration variable, identified by
* its stable `key` (string) or numeric `id`.
*
* `value` is the target value's id. For number variables pass the raw number –
* snapping happens internally. For text variables pass the value id together
* with `{ inputText }`; for list/color/boolean just pass the value id.
*
* The setter resolves to a {@link K3SetVariableResult}. On a conflict the change
* is **not** applied (`result.conflict === true`); inspect `result.changes`,
* then call the accept/reject setter from {@link useAcceptConfigurationConflict}
* / {@link useRejectConfigurationConflict}.
*
* @example
* ```typescript
* const setVariable = useSetConfigurationVariable();
* const acceptConflict = useAcceptConfigurationConflict();
* // ...
* const res = await setVariable("color", redValue.id);
* if (res.conflict) {
*   console.log("would also change:", res.changes);
*   acceptConflict();
* }
* await setVariable("width", 120); // number: raw value, snapped internally
* ```
*/
function useSetConfigurationVariable() {
	return requireInit(_useSetConfigurationVariable, "useSetConfigurationVariable")();
}
/**
* Hook – returns a function that accepts the pending configuration conflict
* raised by the last {@link useSetConfigurationVariable} setter call, applying
* the alternative state.
*/
function useAcceptConfigurationConflict() {
	return requireInit(_useAcceptConfigurationConflict, "useAcceptConfigurationConflict")();
}
/**
* Hook – returns a function that rejects the pending configuration conflict
* raised by the last {@link useSetConfigurationVariable} setter call, discarding
* the alternative state.
*/
function useRejectConfigurationConflict() {
	return requireInit(_useRejectConfigurationConflict, "useRejectConfigurationConflict")();
}
/**
* Reactive hook – lists the instances of a component variable (by `key` or
* numeric `id`). Re-renders when the instances change. Each instance carries
* its selection `id` – pass it to the remover from
* {@link useRemoveConfigurationInstance}.
*
* @example
* ```typescript
* const doors = useConfigurationInstances("doors");
* const removeInstance = useRemoveConfigurationInstance();
* // removeInstance(doors[0].id)
* ```
*/
function useConfigurationInstances(variableKeyOrId) {
	return requireInit(_useConfigurationInstances, "useConfigurationInstances")(variableKeyOrId);
}
/**
* Hook – returns a function that adds an instance to a component variable,
* identified by the value's `key` or numeric `id`. The function resolves to a
* {@link K3SetVariableResult} (conflict-aware, same as the setter from
* {@link useSetConfigurationVariable}).
*
* `parentInstanceId` is the `id` of the parent instance to nest under – take it
* from {@link useConfigurationInstances}. Omit it for a top-level component
* variable; it then defaults to the currently open instance. Pass it explicitly
* when the same nested component can live under several parents, to stay
* deterministic.
*
* @example
* ```typescript
* const addInstance = useAddConfigurationInstance();
* await addInstance("cabinet"); // top-level
*
* const cabinets = useConfigurationInstances("cabinets");
* await addInstance("shelf", cabinets[0].id); // nested
* ```
*/
function useAddConfigurationInstance() {
	return requireInit(_useAddConfigurationInstance, "useAddConfigurationInstance")();
}
/**
* Hook – returns a function that removes a component instance by its selection
* `id` (see {@link useConfigurationInstances}). The function resolves to a
* {@link K3SetVariableResult} (conflict-aware).
*/
function useRemoveConfigurationInstance() {
	return requireInit(_useRemoveConfigurationInstance, "useRemoveConfigurationInstance")();
}
/**
* Hook – returns a setter that moves the live viewer camera, so a plugin can look
* at part of the model square-on (e.g. straight onto a veranda side panel). Pass
* `null` to release the camera back to K3's own camera system.
*
* Use this instead of writing `camera.position` from `useThree()`: K3's camera
* system and OrbitControls both drive the camera every frame, so a direct write is
* overwritten on the next frame.
*
* @example Look perpendicularly at the sidewall the user just opened
* ```typescript
* const setCameraPosition = useSetCameraPosition();
* const openInstance = useOpenInstance();
*
* useEffect(() => {
*   if (openInstance.id !== sidewallId) return;
*   // Step 1 m out along the wall's normal, then look back at it.
*   setCameraPosition({
*     position: [wall.x + normal.x, wall.y, wall.z + normal.z],
*     lookAt: [wall.x, wall.y, wall.z],
*     objectNames: [wallObjectName], // reframe to fit this wall
*   });
*   return () => setCameraPosition(null); // hand the camera back
* }, [openInstance.id, sidewallId, setCameraPosition]);
* ```
*/
function useSetCameraPosition() {
	return requireInit(_useSetCameraPosition, "useSetCameraPosition")();
}
/**
* Reactive hook – returns the component instance the user currently has open in
* the sidebar, i.e. which one of several identical sub-configurations is being
* edited. Re-renders when the user navigates in or out of an instance.
*
* At the top level nothing is open and `isRoot` is `true`.
*
* @example
* ```typescript
* const openInstance = useOpenInstance();
* if (openInstance.isRoot) {
*   // whole-product view
* } else {
*   // editing one instance — openInstance.id matches a K3ConfigurationInstance.id
* }
* ```
*/
function useOpenInstance() {
	return requireInit(_useOpenInstance, "useOpenInstance")();
}
/**
* Called by K3 when the plugin is loaded to inject runtime API functions.
* @internal This function is called by K3 automatically - plugins should not call it directly.
*/
function init(api) {
	_getSettings = api.getSettings;
	_usePluginSettings = api.usePluginSettings;
	_useSelections = api.useConfigurationVariables;
	_useSelectionByVariableKey = api.useConfigurationVariable;
	_useBOM = api.useBOM;
	_useTotalPrice = api.useTotalPrice;
	_useFormattedTotalPrice = api.useFormattedTotalPrice;
	_useApp = api.useApp;
	_useSetConfigurationVariable = api.useSetConfigurationVariable;
	_useAcceptConfigurationConflict = api.useAcceptConfigurationConflict;
	_useRejectConfigurationConflict = api.useRejectConfigurationConflict;
	_useConfigurationInstances = api.useConfigurationInstances;
	_useAddConfigurationInstance = api.useAddConfigurationInstance;
	_useRemoveConfigurationInstance = api.useRemoveConfigurationInstance;
	_useSetCameraPosition = api.useSetCameraPosition ?? null;
	_useOpenInstance = api.useOpenInstance ?? null;
	setComponentApi(api.useComponentMap ?? null, api.Providers ?? null);
}
//#endregion
//#region src/components.ts
/**
* Reactive hook – returns the live map of all K3 configurator components
* (name → component), exactly as used by K3's own layout renderer. Includes
* entries not statically exported from this package (e.g. MUI wrappers and
* aligned-box layout helpers).
*
* Returns `{}` until the K3 configurator has mounted its layout.
*
* @example
* ```tsx
* const { Typography } = useK3ComponentMap();
* ```
*/
function useK3ComponentMap() {
	const useComponentMap = getComponentMapHook();
	if (!useComponentMap) throw new Error("k3-plugin-api not initialized or host K3 version does not expose components. Make sure K3 calls init() before using useK3ComponentMap().");
	return useComponentMap();
}
/**
* Gives children rendered in a plugin-owned React root (e.g. via
* `createRoot`) access to the K3 host context. Inside K3 slots
* (customLayoutComponents, HOCs, variable visualisations) it is
* unnecessary: context is already present.
*
* While the configurator is mounted, children are rendered FROM WITHIN the
* live K3 tree (reverse portal) and see every real context: Redux, router,
* the rule-engine worker (number-variable validity), instance contexts
* (component variables), the resolved app theme, and snackbars. Before the
* configurator mounts, a static replica of the host provider stack is used
* instead — without router and worker contexts.
*
* Renders children without context (plus a console warning) if the host
* has not injected providers yet.
*
* @example
* ```tsx
* createRoot(el).render(<K3Providers><MyWidget /></K3Providers>);
* ```
*/
const K3Providers = (props) => {
	const Providers = getProviders();
	if (!Providers) {
		console.warn("k3-plugin-api: K3Providers rendered before the host injected them — K3 components will not work here.");
		return veranda_mf_2_plugin__loadShare__react__loadShare__.createElement(React.Fragment, null, props.children);
	}
	return veranda_mf_2_plugin__loadShare__react__loadShare__.createElement(Providers, null, props.children);
};
/**
* Names of all K3 components statically exported by this package.
* Kept in sync with the host's component map (verified by a host-side test).
*/
const K3_COMPONENT_NAMES = [
	"SceneView",
	"StandaloneGroupWrapper",
	"GroupsNavigation",
	"GroupsView",
	"CustomLayoutComponent",
	"CustomData",
	"StandaloneVariable",
	"ComponentBreadcrumbs",
	"EditScene",
	"PlaceholderInfo",
	"SwitchState",
	"SwitchStateOn",
	"SwitchStateOff",
	"SwitchButton",
	"TranslatableText",
	"HoverContent",
	"UndoRedoControls",
	"AnimationButton",
	"Price",
	"PriceData",
	"PriceDataFromVariable",
	"PriceTable",
	"ActionOverview",
	"ExitButtons",
	"ValuesLoading",
	"Logo",
	"SocialShareButtons",
	"SceneButtons",
	"FullScreenButton",
	"ARButton",
	"NavigationButtons",
	"OcBranding",
	"OcFormularBranding",
	"LabelActionsDisplay",
	"SidebarExpandToggle",
	"Header",
	"Sidebar",
	"Content",
	"VariablesNavigation",
	"ValuesView"
];
/**
* Creates a proxy that resolves the real host component from the live map at
* render time. Renders `null` while the host map is empty (e.g. before the
* configurator layout mounted) instead of crashing.
* @internal
*/
const k3Component = (name) => {
	const Proxy = (props) => {
		const Component = useK3ComponentMap()[name];
		if (!Component) return null;
		return veranda_mf_2_plugin__loadShare__react__loadShare__.createElement(Component, props);
	};
	Proxy.displayName = `K3.${name}`;
	return Proxy;
};
/**
* The main content / 3D scene view.
* @remarks Layout-slot only — mounts the live configurator scene.
*/
const SceneView = k3Component("SceneView");
/** Wrapper that renders a single group standalone. */
const StandaloneGroupWrapper = k3Component("StandaloneGroupWrapper");
/** The groups navigation bar (prev/next group tabs). */
const GroupsNavigation = k3Component("GroupsNavigation");
/** The sidebar groups + variables view. */
const GroupsView = k3Component("GroupsView");
/** Named plugin slot host (`<CustomLayoutComponent name="…" />`). */
const CustomLayoutComponent = k3Component("CustomLayoutComponent");
/** Renders a custom data entry from the app configuration. */
const CustomData = k3Component("CustomData");
/** Renders a single variable input standalone by variable reference. */
const StandaloneVariable = k3Component("StandaloneVariable");
/** Breadcrumb navigation for component-type variables. */
const ComponentBreadcrumbs = k3Component("ComponentBreadcrumbs");
/**
* Scene editor overlay.
* @remarks Layout-slot only — requires the live 3D scene.
*/
const EditScene = k3Component("EditScene");
/** Placeholder/info block used in layout templates. */
const PlaceholderInfo = k3Component("PlaceholderInfo");
/** Conditional wrapper toggled by a switch state. */
const SwitchState = k3Component("SwitchState");
/** Renders children only while the switch state is ON. */
const SwitchStateOn = k3Component("SwitchStateOn");
/** Renders children only while the switch state is OFF. */
const SwitchStateOff = k3Component("SwitchStateOff");
/** Toggle button controlling a named switch state. */
const SwitchButton = k3Component("SwitchButton");
/** Renders a text translated via the K3 translation system. */
const TranslatableText = k3Component("TranslatableText");
/** Shows content on hover of its children. */
const HoverContent = k3Component("HoverContent");
/** Undo/redo buttons bound to the configuration history. */
const UndoRedoControls = k3Component("UndoRedoControls");
/** Plays a named scene animation. */
const AnimationButton = k3Component("AnimationButton");
/** The current total price, formatted, live. */
const Price = k3Component("Price");
/** Price display bound to explicitly passed data. */
const PriceData = k3Component("PriceData");
/** Price display bound to a variable's value. */
const PriceDataFromVariable = k3Component("PriceDataFromVariable");
/** The order summary price table. */
const PriceTable = k3Component("PriceTable");
/** Overview of configured save/order actions. */
const ActionOverview = k3Component("ActionOverview");
/** Exit / close configurator buttons. */
const ExitButtons = k3Component("ExitButtons");
/** Progress bar while configuration values are computed. */
const ValuesLoading = k3Component("ValuesLoading");
/** The app logo. */
const Logo = k3Component("Logo");
/** Social share button row. */
const SocialShareButtons = k3Component("SocialShareButtons");
/**
* Button group overlaying the 3D scene.
* @remarks Positioned relative to the scene view — most useful in layout slots.
*/
const SceneButtons = k3Component("SceneButtons");
/** Fullscreen toggle for the configurator. */
const FullScreenButton = k3Component("FullScreenButton");
/** Launches the AR view of the current scene. */
const ARButton = k3Component("ARButton");
/** Previous/next group navigation buttons. */
const NavigationButtons = k3Component("NavigationButtons");
/** ObjectCode branding slot (renders nothing by default). */
const OcBranding = k3Component("OcBranding");
/** Inline ObjectCode form branding. */
const OcFormularBranding = k3Component("OcFormularBranding");
/** Label/hotspot action display overlay. */
const LabelActionsDisplay = k3Component("LabelActionsDisplay");
/** Toggle to expand/collapse the sidebar. */
const SidebarExpandToggle = k3Component("SidebarExpandToggle");
/** @deprecated Use {@link GroupsNavigation}. */
const Header = k3Component("Header");
/** @deprecated Use {@link GroupsView}. */
const Sidebar = k3Component("Sidebar");
/** @deprecated Use {@link SceneView}. Layout-slot only. */
const Content = k3Component("Content");
/** @deprecated Legacy variables navigation. */
const VariablesNavigation = k3Component("VariablesNavigation");
/** @deprecated Legacy values view. */
const ValuesView = k3Component("ValuesView");
//#endregion
//#region src/models.ts
/** All variable type string literals. */
const VariableType = {
	List: "list",
	Color: "color",
	Number: "number",
	Text: "text",
	MultiSelect: "multiSelect",
	Boolean: "boolean",
	Image: "image",
	Upload: "upload",
	Components: "components",
	Information: "information"
};

export { ARButton, ActionOverview, AnimationButton, ComponentBreadcrumbs, Content, CustomData, CustomLayoutComponent, EditScene, ExitButtons, FullScreenButton, GroupsNavigation, GroupsView, Header, HoverContent, K3Providers, K3_COMPONENT_NAMES, LabelActionsDisplay, Logo, NavigationButtons, OcBranding, OcFormularBranding, PlaceholderInfo, Price, PriceData, PriceDataFromVariable, PriceTable, SceneButtons, SceneView, Sidebar, SidebarExpandToggle, SocialShareButtons, StandaloneGroupWrapper, StandaloneVariable, SwitchButton, SwitchState, SwitchStateOff, SwitchStateOn, TranslatableText, UndoRedoControls, ValuesLoading, ValuesView, VariableType, VariablesNavigation, getSettings, init, useAcceptConfigurationConflict, useAddConfigurationInstance, useApp, useBOM, useConfigurationInstances, useConfigurationVariable, useConfigurationVariables, useFormattedTotalPrice, useK3ComponentMap, useK3PluginSettings, useOpenInstance, useRejectConfigurationConflict, useRemoveConfigurationInstance, useSetCameraPosition, useSetConfigurationVariable, useTotalPrice };
