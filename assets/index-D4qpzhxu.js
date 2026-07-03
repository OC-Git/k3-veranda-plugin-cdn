//#region index.ts
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
	if (!_getSettings) throw new Error("k3-plugin-api not initialized. Make sure K3 calls init() before using getSettings().");
	return _getSettings(pluginId);
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
	if (!_usePluginSettings) throw new Error("k3-plugin-api not initialized. Make sure K3 calls init() before using useK3PluginSettings().");
	return _usePluginSettings(pluginId);
}
/**
* Reactive hook – returns all current configuration variables as a key-value map.
* Keys are the variable's stable `key` string. Values are resolved (labels, not raw IDs).
* Re-renders whenever any selection changes.
*
* @example
* ```typescript
* const variables = useConfigurationVariables();
* const color = variables["color"] as K3SimplifiedValue;
* ```
*/
function useConfigurationVariables() {
	if (!_useSelections) throw new Error("k3-plugin-api not initialized. Make sure K3 calls init() before using useConfigurationVariables().");
	return _useSelections();
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
	if (!_useSelectionByVariableKey) throw new Error("k3-plugin-api not initialized. Make sure K3 calls init() before using useConfigurationVariable().");
	return _useSelectionByVariableKey(variableKey);
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
	if (!_useBOM) throw new Error("k3-plugin-api not initialized. Make sure K3 calls init() before using useBOM().");
	return _useBOM();
}
/**
* Reactive hook – returns the current total price as a raw number.
* Re-renders whenever the price changes.
*/
function useTotalPrice() {
	if (!_useTotalPrice) throw new Error("k3-plugin-api not initialized. Make sure K3 calls init() before using useTotalPrice().");
	return _useTotalPrice();
}
/**
* Reactive hook – returns the current total price formatted as a locale string
* (e.g. `"1.299,00 €"`), ready for display.
* Re-renders whenever the price changes.
*/
function useFormattedTotalPrice() {
	if (!_useFormattedTotalPrice) throw new Error("k3-plugin-api not initialized. Make sure K3 calls init() before using useFormattedTotalPrice().");
	return _useFormattedTotalPrice();
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
	if (!_useApp) throw new Error("k3-plugin-api not initialized. Make sure K3 calls init() before using useApp().");
	return _useApp();
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
}
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

export { VariableType, getSettings, init, useApp, useBOM, useConfigurationVariable, useConfigurationVariables, useFormattedTotalPrice, useK3PluginSettings, useTotalPrice };
