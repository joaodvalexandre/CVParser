import { i as __toESM } from "./rolldown-runtime-31hsvWHs.js";
import { i as init_defineProperty, r as _defineProperty } from "./objectSpread2-DuxqTrfZ.js";
import { Ac as Injector, Al as ɵɵdefineInjector, Bc as PLATFORM_ID, Bl as require_cjs, E as annotateForHydration, F as createPlatformFactory, Fn as Injectable, Jc as TransferState, Kc as RuntimeError, Ki as setDocument, Mn as IS_HYDRATION_DOM_REUSE_ENABLED, Nl as ɵɵinject, Oc as INTERNAL_APPLICATION_ERROR_HANDLER, Pn as Inject, Vc as PLATFORM_INITIALIZER, Wi as setClassMetadata, Xc as Version, _c as DOCUMENT, cr as SSR_CONTENT_INTEGRITY_MARKER, dc as _asyncToGenerator, gl as makeEnvironmentProviders, hc as CSP_NONCE, ht as stopMeasuring, ir as Renderer2, kc as InjectionToken, kl as ɵɵdefineInjectable, mr as TESTABILITY, mt as startMeasuring, ot as platformCore, pc as APP_ID, qn as NgModule, ro as ɵɵdefineNgModule, tn as ApplicationRef, ul as inject, yr as Testability } from "./core-Dj-lCDLc.js";
import { Ht as PlatformLocation, Ut as getDOM, Wt as setRootDomAdapter, i as NullViewportScroller, l as ViewportScroller, o as PLATFORM_SERVER_ID, v as XhrFactory } from "./common-DLvuWdDG.js";
import { f as EVENT_MANAGER_PLUGINS, m as EventManagerPlugin, r as BrowserModule, t as BrowserDomAdapter } from "./_browser-chunk-BQRQvtEj.js";
import { v as HTTP_FETCH_MAX_RESPONSE_SIZE, y as HTTP_ROOT_INTERCEPTOR_FNS } from "./platform-browser-C8T4CzVk.js";
import { t as index } from "./bundled-domino-B7TevqeY.js";
//#region node_modules/@angular/platform-server/fesm2022/_server-chunk.mjs
/**
* @license Angular v22.1.6
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var import_cjs = require_cjs();
init_defineProperty();
var _PlatformState;
var _ServerXhr;
var _ServerPlatformLocation;
var _ServerEventManagerPlugin;
var _ServerModule;
function setDomTypes() {
	Object.assign(globalThis, index.impl);
	globalThis["KeyboardEvent"] = index.impl.Event;
}
function parseDocument(html, url = "/") {
	return index.createWindow(html, url).document;
}
function serializeDocument(doc) {
	return doc.serialize();
}
var DominoAdapter = class DominoAdapter extends BrowserDomAdapter {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "supportsDOMEvents", false);
	}
	static makeCurrent() {
		setDomTypes();
		setRootDomAdapter(new DominoAdapter());
	}
	createHtmlDocument() {
		return parseDocument("<html><head><title>fakeTitle</title></head><body></body></html>");
	}
	getDefaultDocument() {
		if (!DominoAdapter.defaultDoc) DominoAdapter.defaultDoc = index.createDocument();
		return DominoAdapter.defaultDoc;
	}
	isElementNode(node) {
		return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
	}
	isShadowRoot(node) {
		return node.shadowRoot == node;
	}
	getGlobalEventTarget(doc, target) {
		if (target === "window") return doc.defaultView;
		if (target === "document") return doc;
		if (target === "body") return doc.body;
		return null;
	}
	getBaseHref(doc) {
		const length = doc.head.children.length;
		for (let i = 0; i < length; i++) {
			const child = doc.head.children[i];
			if (child.tagName === "BASE") return child.getAttribute("href") || "";
		}
		return "";
	}
	dispatchEvent(el, evt) {
		el.dispatchEvent(evt);
		const win = (el.ownerDocument || el).defaultView;
		if (win) win.dispatchEvent(evt);
	}
	getUserAgent() {
		return "Fake user agent";
	}
	getCookie(name) {
		throw new RuntimeError(5700, (typeof ngDevMode === "undefined" || ngDevMode) && "getCookie has not been implemented");
	}
};
_defineProperty(DominoAdapter, "defaultDoc", void 0);
var INITIAL_CONFIG = new InjectionToken("Server.INITIAL_CONFIG");
var BEFORE_APP_SERIALIZED = new InjectionToken("Server.RENDER_MODULE_HOOK");
var ENABLE_DOM_EMULATION = new InjectionToken("ENABLE_DOM_EMULATION");
var PlatformState = class {
	constructor(_doc) {
		_defineProperty(this, "_doc", void 0);
		_defineProperty(this, "_enableDomEmulation", enableDomEmulation(inject(Injector)));
		this._doc = _doc;
	}
	renderToString() {
		var _window;
		if (ngDevMode && !this._enableDomEmulation && !((_window = window) === null || _window === void 0 ? void 0 : _window.document)) throw new RuntimeError(5704, (typeof ngDevMode === "undefined" || ngDevMode) && "Disabled DOM emulation should only run in browser environments");
		const measuringLabel = "renderToString";
		startMeasuring(measuringLabel);
		const rendered = this._enableDomEmulation ? serializeDocument(this._doc) : this._doc.documentElement.outerHTML;
		stopMeasuring(measuringLabel);
		return rendered;
	}
	getDocument() {
		return this._doc;
	}
};
_PlatformState = PlatformState;
_defineProperty(PlatformState, "ɵfac", function PlatformState_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _PlatformState)(ɵɵinject(DOCUMENT));
});
_defineProperty(PlatformState, "ɵprov", /* @__PURE__ */ ɵɵdefineInjectable({
	token: _PlatformState,
	factory: _PlatformState.ɵfac
}));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformState, [{ type: Injectable }], () => [{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	}], null);
})();
function enableDomEmulation(injector) {
	return injector.get(ENABLE_DOM_EMULATION, true);
}
var HTTP_OR_HTTPS_PROTOCOL_REGEXP = /^https?:/i;
var HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP = /^https?:(?![/\\]{2})/i;
function resolveUrl(urlStr, origin, options = {}) {
	const originUrl = typeof origin === "string" ? new URL("/", origin) : origin;
	if (!urlStr) return originUrl || null;
	let resolved;
	if (!originUrl || !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(urlStr)) try {
		resolved = new URL(urlStr);
	} catch (_unused) {}
	const { allowProtocolRelative = false, allowOriginChange = true } = options;
	if (resolved) {
		if (originUrl && !isSafeOriginChange(resolved, originUrl, urlStr, allowOriginChange)) throwSuspiciousUrlError(urlStr);
		return resolved;
	}
	if (!URL.canParse(urlStr, "http://fake")) throw new RuntimeError(5701, typeof ngDevMode === "undefined" || ngDevMode ? `Invalid URL: ${urlStr}` : urlStr);
	if (!originUrl) return null;
	if (urlStr.startsWith("//")) {
		if (!allowProtocolRelative) throw new RuntimeError(5702, typeof ngDevMode === "undefined" || ngDevMode ? `Protocol relative URLs are not allowed in this context. URL: ${urlStr}` : urlStr);
		return new URL(urlStr, origin);
	}
	resolved = new URL(urlStr, origin);
	if (!isSafeOriginChange(resolved, originUrl, urlStr, allowOriginChange)) throwSuspiciousUrlError(urlStr);
	return resolved;
}
function throwSuspiciousUrlError(urlStr) {
	throw new RuntimeError(-5703, typeof ngDevMode === "undefined" || ngDevMode ? `URL ${urlStr} changed origin unexpectedly. This is suspicious and may indicate a security bypass attempt.` : urlStr);
}
function isSafeOriginChange(resolved, origin, urlStr, allowOriginChange) {
	if (origin.origin === resolved.origin) return true;
	if (!allowOriginChange) return false;
	return HTTP_OR_HTTPS_PROTOCOL_REGEXP.test(urlStr) && !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(urlStr);
}
var ServerXhr = class {
	constructor() {
		_defineProperty(this, "xhrImpl", void 0);
	}
	ɵloadImpl() {
		var _this = this;
		return _asyncToGenerator(function* () {
			if (!_this.xhrImpl) {
				if (typeof ngDevMode === "undefined" || ngDevMode) console.warn("XHR support in `@angular/platform-server` is deprecated and will be removed in Angular 23. It has known security and performance issues in server environments, such as forwarding `Authorization` headers on cross-origin redirects and susceptibility to denial-of-service (DoS) via redirect loops. Please use the HttpClient fetch backend instead, which is the default since Angular 22.");
				const { default: xhr } = yield import("./xhr2-SLZU__oO.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
				_this.xhrImpl = xhr;
			}
		})();
	}
	build() {
		const impl = this.xhrImpl;
		if (!impl) throw new RuntimeError(5705, (typeof ngDevMode === "undefined" || ngDevMode) && "Unexpected state in ServerXhr: XHR implementation is not loaded.");
		return new impl.XMLHttpRequest();
	}
};
_ServerXhr = ServerXhr;
_defineProperty(ServerXhr, "ɵfac", function ServerXhr_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ServerXhr)();
});
_defineProperty(ServerXhr, "ɵprov", /* @__PURE__ */ ɵɵdefineInjectable({
	token: _ServerXhr,
	factory: _ServerXhr.ɵfac
}));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerXhr, [{ type: Injectable }], null, null);
})();
var URL_SCHEMA_REGEXP = /^(?:[a-zA-Z][a-zA-Z0-9+\-.]*:)/;
function relativeUrlsTransformerInterceptorFn(request, next) {
	const trimmedUrl = request.url.trim();
	if (URL_SCHEMA_REGEXP.test(trimmedUrl) && !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(trimmedUrl)) return next(request);
	const platformLocation = inject(PlatformLocation);
	const { href, protocol, hostname, port } = platformLocation;
	if (!protocol.startsWith("http")) return next(request);
	let urlPrefix = `${protocol}//${hostname}`;
	if (port) urlPrefix += `:${port}`;
	const baseHref = platformLocation.getBaseHrefFromDOM() || href;
	const baseUrl = new URL(baseHref, urlPrefix);
	const parsedUrl = resolveUrl(request.url, baseUrl, { allowProtocolRelative: true });
	return next(request.clone({ url: parsedUrl.toString() }));
}
var SERVER_HTTP_PROVIDERS = [{
	provide: XhrFactory,
	useClass: ServerXhr
}, {
	provide: HTTP_ROOT_INTERCEPTOR_FNS,
	useValue: relativeUrlsTransformerInterceptorFn,
	multi: true
}];
var ServerPlatformLocation = class {
	constructor() {
		_defineProperty(this, "href", "/");
		_defineProperty(this, "hostname", "/");
		_defineProperty(this, "protocol", "/");
		_defineProperty(this, "port", "/");
		_defineProperty(this, "pathname", "/");
		_defineProperty(this, "search", "");
		_defineProperty(this, "hash", "");
		_defineProperty(this, "_hashUpdate", new import_cjs.Subject());
		_defineProperty(this, "_doc", inject(DOCUMENT));
		_defineProperty(this, "origin", this._doc.location.origin);
		const config = inject(INITIAL_CONFIG, { optional: true });
		if (!config) return;
		if (config.url) {
			const { protocol, hostname, port, pathname, search, hash, href, origin } = resolveUrl(config.url, this.origin);
			this.protocol = protocol;
			this.hostname = hostname;
			this.port = port;
			this.pathname = pathname;
			this.search = search;
			this.hash = hash;
			this.href = href;
			this.origin = origin;
		}
	}
	getBaseHrefFromDOM() {
		return getDOM().getBaseHref(this._doc);
	}
	onPopState(fn) {
		return () => {};
	}
	onHashChange(fn) {
		const subscription = this._hashUpdate.subscribe(fn);
		return () => subscription.unsubscribe();
	}
	get url() {
		return `${this.pathname}${this.search}${this.hash}`;
	}
	setHash(value, oldUrl) {
		if (this.hash === value) return;
		this.hash = value;
		const newUrl = this.url;
		queueMicrotask(() => this._hashUpdate.next({
			type: "hashchange",
			state: null,
			oldUrl,
			newUrl
		}));
	}
	replaceState(state, title, newUrl) {
		const oldUrl = this.url;
		const { pathname, search, hash, href, protocol } = resolveUrl(newUrl, this.origin, { allowOriginChange: false });
		const writableThis = this;
		writableThis.pathname = pathname;
		writableThis.search = search;
		writableThis.href = href;
		writableThis.protocol = protocol;
		this.setHash(hash, oldUrl);
	}
	pushState(state, title, newUrl) {
		this.replaceState(state, title, newUrl);
	}
	forward() {
		throw new Error("Not implemented");
	}
	back() {
		throw new Error("Not implemented");
	}
	getState() {}
};
_ServerPlatformLocation = ServerPlatformLocation;
_defineProperty(ServerPlatformLocation, "ɵfac", function ServerPlatformLocation_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ServerPlatformLocation)();
});
_defineProperty(ServerPlatformLocation, "ɵprov", /* @__PURE__ */ ɵɵdefineInjectable({
	token: _ServerPlatformLocation,
	factory: _ServerPlatformLocation.ɵfac
}));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerPlatformLocation, [{ type: Injectable }], () => [], null);
})();
var ServerEventManagerPlugin = class extends EventManagerPlugin {
	constructor(doc) {
		super(doc);
		_defineProperty(this, "doc", void 0);
		this.doc = doc;
	}
	supports(eventName) {
		return true;
	}
	addEventListener(element, eventName, handler, options) {
		return getDOM().onAndCancel(element, eventName, handler, options);
	}
};
_ServerEventManagerPlugin = ServerEventManagerPlugin;
_defineProperty(ServerEventManagerPlugin, "ɵfac", function ServerEventManagerPlugin_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ServerEventManagerPlugin)(ɵɵinject(DOCUMENT));
});
_defineProperty(ServerEventManagerPlugin, "ɵprov", /* @__PURE__ */ ɵɵdefineInjectable({
	token: _ServerEventManagerPlugin,
	factory: _ServerEventManagerPlugin.ɵfac
}));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerEventManagerPlugin, [{ type: Injectable }], () => [{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	}], null);
})();
var TRANSFER_STATE_STATUS = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "TRANSFER_STATE_STATUS" : "", { factory: () => ({ serialized: false }) });
var TRANSFER_STATE_SERIALIZATION_PROVIDERS = [{
	provide: BEFORE_APP_SERIALIZED,
	useFactory: serializeTransferStateFactory,
	multi: true
}];
function createScript(doc, textContent, nonce) {
	const script = doc.createElement("script");
	script.textContent = textContent;
	if (nonce) script.setAttribute("nonce", nonce);
	return script;
}
function warnIfStateTransferHappened(injector) {
	const transferStateStatus = injector.get(TRANSFER_STATE_STATUS);
	if (transferStateStatus.serialized) console.warn("Angular detected an incompatible configuration, which causes duplicate serialization of the server-side application state.\n\nThis can happen if the server providers have been provided more than once using different mechanisms. For example:\n\n  imports: [ServerModule], // Registers server providers\n  providers: [provideServerRendering()] // Also registers server providers\n\nTo fix this, ensure that the `provideServerRendering()` function is the only provider used and remove the other(s).");
	transferStateStatus.serialized = true;
}
function serializeTransferStateFactory() {
	const doc = inject(DOCUMENT);
	const appId = inject(APP_ID);
	const transferStore = inject(TransferState);
	const injector = inject(Injector);
	return () => {
		const measuringLabel = "serializeTransferStateFactory";
		startMeasuring(measuringLabel);
		const content = transferStore.toJson();
		if (transferStore.isEmpty) return;
		if (typeof ngDevMode !== "undefined" && ngDevMode) warnIfStateTransferHappened(injector);
		const script = createScript(doc, content, null);
		script.id = appId + "-state";
		script.setAttribute("type", "application/json");
		doc.body.appendChild(script);
		stopMeasuring(measuringLabel);
	};
}
var INTERNAL_SERVER_PLATFORM_PROVIDERS = [
	{
		provide: DOCUMENT,
		useFactory: _document
	},
	{
		provide: PLATFORM_ID,
		useValue: PLATFORM_SERVER_ID
	},
	{
		provide: PLATFORM_INITIALIZER,
		useFactory: initDominoAdapter,
		multi: true
	},
	{
		provide: PlatformLocation,
		useClass: ServerPlatformLocation,
		deps: []
	},
	{
		provide: PlatformState,
		deps: [DOCUMENT]
	}
];
function initDominoAdapter() {
	const _enableDomEmulation = enableDomEmulation(inject(Injector));
	return () => {
		if (_enableDomEmulation) DominoAdapter.makeCurrent();
		else BrowserDomAdapter.makeCurrent();
	};
}
var SERVER_RENDER_PROVIDERS = [{
	provide: EVENT_MANAGER_PLUGINS,
	multi: true,
	useClass: ServerEventManagerPlugin
}];
var PLATFORM_SERVER_PROVIDERS = [
	TRANSFER_STATE_SERIALIZATION_PROVIDERS,
	SERVER_RENDER_PROVIDERS,
	SERVER_HTTP_PROVIDERS,
	{
		provide: Testability,
		useValue: null
	},
	{
		provide: TESTABILITY,
		useValue: null
	},
	{
		provide: ViewportScroller,
		useClass: NullViewportScroller
	}
];
var ServerModule = class {};
_ServerModule = ServerModule;
_defineProperty(ServerModule, "ɵfac", function ServerModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ServerModule)();
});
_defineProperty(ServerModule, "ɵmod", /* @__PURE__ */ ɵɵdefineNgModule({
	type: _ServerModule,
	exports: [BrowserModule]
}));
_defineProperty(ServerModule, "ɵinj", /* @__PURE__ */ ɵɵdefineInjector({
	providers: PLATFORM_SERVER_PROVIDERS,
	imports: [BrowserModule]
}));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerModule, [{
		type: NgModule,
		args: [{
			exports: [BrowserModule],
			providers: PLATFORM_SERVER_PROVIDERS
		}]
	}], null, null);
})();
function _document() {
	const injector = inject(Injector);
	const config = injector.get(INITIAL_CONFIG, null);
	const _enableDomEmulation = enableDomEmulation(injector);
	let document;
	if (config && config.document) document = typeof config.document === "string" ? _enableDomEmulation ? parseDocument(config.document, config.url !== void 0 ? resolveUrl(config.url, "http://localhost").href : void 0) : window.document : config.document;
	else document = getDOM().createHtmlDocument();
	setDocument(document);
	return document;
}
function platformServer(extraProviders) {
	return createPlatformFactory(platformCore, "server", INTERNAL_SERVER_PLATFORM_PROVIDERS)(extraProviders);
}
//#endregion
//#region node_modules/@angular/platform-server/fesm2022/platform-server.mjs
/**
* @license Angular v22.1.6
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function provideServerRendering(options) {
	const providers = [...PLATFORM_SERVER_PROVIDERS];
	if (options === null || options === void 0 ? void 0 : options.maxResponseBodySize) providers.push({
		provide: HTTP_FETCH_MAX_RESPONSE_SIZE,
		useValue: options.maxResponseBodySize
	});
	return makeEnvironmentProviders(providers);
}
var EVENT_DISPATCH_SCRIPT_ID = "ng-event-dispatch-contract";
function createServerPlatform(options) {
	var _options$platformProv;
	const extraProviders = (_options$platformProv = options.platformProviders) !== null && _options$platformProv !== void 0 ? _options$platformProv : [];
	const measuringLabel = "createServerPlatform";
	startMeasuring(measuringLabel);
	const { document, url } = options;
	const platform = platformServer([{
		provide: INITIAL_CONFIG,
		useValue: {
			document,
			url
		}
	}, extraProviders]);
	stopMeasuring(measuringLabel);
	return platform;
}
function findEventDispatchScript(doc) {
	return doc.getElementById(EVENT_DISPATCH_SCRIPT_ID);
}
function removeEventDispatchScript(doc) {
	var _findEventDispatchScr;
	(_findEventDispatchScr = findEventDispatchScript(doc)) === null || _findEventDispatchScr === void 0 || _findEventDispatchScr.remove();
}
function prepareForHydration(platformState, applicationRef) {
	const measuringLabel = "prepareForHydration";
	startMeasuring(measuringLabel);
	const environmentInjector = applicationRef.injector;
	const doc = platformState.getDocument();
	if (!environmentInjector.get(IS_HYDRATION_DOM_REUSE_ENABLED, false)) {
		removeEventDispatchScript(doc);
		return;
	}
	appendSsrContentIntegrityMarker(doc);
	const eventTypesToReplay = annotateForHydration(applicationRef, doc);
	if (eventTypesToReplay.regular.size || eventTypesToReplay.capture.size) insertEventRecordScript(environmentInjector.get(APP_ID), doc, eventTypesToReplay, environmentInjector.get(CSP_NONCE, null));
	else removeEventDispatchScript(doc);
	stopMeasuring(measuringLabel);
}
function appendSsrContentIntegrityMarker(doc) {
	const comment = doc.createComment(SSR_CONTENT_INTEGRITY_MARKER);
	doc.body.firstChild ? doc.body.insertBefore(comment, doc.body.firstChild) : doc.body.append(comment);
}
function appendServerContextInfo(applicationRef) {
	const injector = applicationRef.injector;
	let serverContext = sanitizeServerContext(injector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
	applicationRef.components.forEach((componentRef) => {
		const renderer = componentRef.injector.get(Renderer2);
		const element = componentRef.location.nativeElement;
		if (element) renderer.setAttribute(element, "ng-server-context", serverContext);
	});
}
function insertEventRecordScript(appId, doc, eventTypesToReplay, nonce) {
	const measuringLabel = "insertEventRecordScript";
	startMeasuring(measuringLabel);
	const { regular, capture } = eventTypesToReplay;
	const eventDispatchScript = findEventDispatchScript(doc);
	if (eventDispatchScript) {
		const replayScript = createScript(doc, `window.__jsaction_bootstrap(document.body,"${appId}",${JSON.stringify(Array.from(regular))},${JSON.stringify(Array.from(capture))});`, nonce);
		eventDispatchScript.after(replayScript);
	}
	stopMeasuring(measuringLabel);
}
function renderInternal(_x, _x2) {
	return _renderInternal.apply(this, arguments);
}
function _renderInternal() {
	_renderInternal = _asyncToGenerator(function* (platformRef, applicationRef) {
		const platformState = platformRef.injector.get(PlatformState);
		prepareForHydration(platformState, applicationRef);
		appendServerContextInfo(applicationRef);
		const environmentInjector = applicationRef.injector;
		const errorHandler = environmentInjector.get(INTERNAL_APPLICATION_ERROR_HANDLER);
		const callbacks = environmentInjector.get(BEFORE_APP_SERIALIZED, null);
		if (callbacks) {
			const asyncCallbacks = [];
			for (const callback of callbacks) try {
				const callbackResult = callback();
				if (callbackResult) asyncCallbacks.push(callbackResult);
			} catch (e) {
				errorHandler(e);
			}
			if (asyncCallbacks.length) {
				for (const result of yield Promise.allSettled(asyncCallbacks)) if (result.status === "rejected") errorHandler(result.reason);
			}
		}
		return platformState.renderToString();
	});
	return _renderInternal.apply(this, arguments);
}
function asyncDestroyPlatform(platformRef) {
	return new Promise((resolve) => {
		setTimeout(() => {
			platformRef.destroy();
			resolve();
		}, 0);
	});
}
var DEFAULT_SERVER_CONTEXT = "other";
var SERVER_CONTEXT = new InjectionToken("SERVER_CONTEXT");
function sanitizeServerContext(serverContext) {
	const context = serverContext.replace(/[^a-zA-Z0-9\-]/g, "");
	return context.length > 0 ? context : DEFAULT_SERVER_CONTEXT;
}
function renderModule(_x3, _x4) {
	return _renderModule.apply(this, arguments);
}
function _renderModule() {
	_renderModule = _asyncToGenerator(function* (moduleType, options) {
		const { document, url, extraProviders: platformProviders, allowedHosts } = options;
		validateAllowedHosts(url, allowedHosts);
		const platformRef = createServerPlatform({
			document,
			url,
			platformProviders
		});
		try {
			const applicationRef = (yield platformRef.bootstrapModule(moduleType)).injector.get(ApplicationRef);
			const measuringLabel = "whenStable";
			startMeasuring(measuringLabel);
			yield applicationRef.whenStable();
			stopMeasuring(measuringLabel);
			return yield renderInternal(platformRef, applicationRef);
		} finally {
			yield asyncDestroyPlatform(platformRef);
		}
	});
	return _renderModule.apply(this, arguments);
}
function renderApplication(_x5, _x6) {
	return _renderApplication.apply(this, arguments);
}
function _renderApplication() {
	_renderApplication = _asyncToGenerator(function* (bootstrap, options) {
		const renderAppLabel = "renderApplication";
		const bootstrapLabel = "bootstrap";
		const _renderLabel = "_render";
		const { url, allowedHosts } = options;
		validateAllowedHosts(url, allowedHosts);
		startMeasuring(renderAppLabel);
		const platformRef = createServerPlatform(options);
		try {
			startMeasuring(bootstrapLabel);
			const applicationRef = yield bootstrap({ platformRef });
			stopMeasuring(bootstrapLabel);
			startMeasuring(_renderLabel);
			const measuringLabel = "whenStable";
			startMeasuring(measuringLabel);
			yield applicationRef.whenStable();
			stopMeasuring(measuringLabel);
			const rendered = yield renderInternal(platformRef, applicationRef);
			stopMeasuring(_renderLabel);
			return rendered;
		} finally {
			yield asyncDestroyPlatform(platformRef);
			stopMeasuring(renderAppLabel);
		}
	});
	return _renderApplication.apply(this, arguments);
}
function validateAllowedHosts(url, allowedHosts) {
	if (typeof url === "string") {
		const parsedUrl = resolveUrl(url);
		if (parsedUrl !== null) {
			const hostname = parsedUrl.hostname;
			if (!isHostAllowed(hostname, new Set(allowedHosts))) throw new RuntimeError(5706, typeof ngDevMode === "undefined" || ngDevMode ? `Host ${url} is not allowed. You can configure \`allowedHosts\` option.` : url);
		}
	}
}
function isHostAllowed(hostname, allowedHosts) {
	if (allowedHosts.has("*") || allowedHosts.has(hostname)) return true;
	for (const allowedHost of allowedHosts) {
		if (!allowedHost.startsWith("*.")) continue;
		const domain = allowedHost.slice(1);
		if (hostname.endsWith(domain)) return true;
	}
	return false;
}
var VERSION = /* @__PURE__ */ new Version("22.1.6");
//#endregion
export { renderApplication as a, BEFORE_APP_SERIALIZED as c, INITIAL_CONFIG as d, INTERNAL_SERVER_PLATFORM_PROVIDERS as f, platformServer as g, ServerModule as h, provideServerRendering as i, DominoAdapter as l, SERVER_RENDER_PROVIDERS as m, VERSION as n, renderInternal as o, PlatformState as p, isHostAllowed as r, renderModule as s, SERVER_CONTEXT as t, ENABLE_DOM_EMULATION as u };
