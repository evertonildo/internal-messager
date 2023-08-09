import { _registerComponent as t, registerVersion as e, _getProvider as n, getApp as r, _removeServiceInstance as s, SDK_VERSION as i } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

const o = function (t) {
    const e = [];
    let n = 0;
    for (let r = 0;
        r < t.length;
        r++) {
            let s = t.charCodeAt(r);
        s < 128 ? e[n++] = s : s < 2048 ? (e[n++] = s >> 6 | 192, e[n++] = 63 & s | 128) : 55296 == (64512 & s) && r + 1 < t.length && 56320 == (64512 & t.charCodeAt(r + 1)) ? (s = 65536 + ((1023 & s) << 10) + (1023 & t.charCodeAt(++r)), e[n++] = s >> 18 | 240, e[n++] = s >> 12 & 63 | 128, e[n++] = s >> 6 & 63 | 128, e[n++] = 63 & s | 128) : (e[n++] = s >> 12 | 224, e[n++] = s >> 6 & 63 | 128, e[n++] = 63 & s | 128)
    } return e
}, a = {
    byteToCharMap_: null, charToByteMap_: null, byteToCharMapWebSafe_: null, charToByteMapWebSafe_: null, ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", get ENCODED_VALS() { return this.ENCODED_VALS_BASE + "+/=" }, get ENCODED_VALS_WEBSAFE() { return this.ENCODED_VALS_BASE + "-_." }, HAS_NATIVE_SUPPORT: "function" == typeof atob, encodeByteArray(t, e) {
        if (!Array.isArray(t)) throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, r = [];
        for (let e = 0;
            e < t.length;
            e += 3) {
                const s = t[e], i = e + 1 < t.length, o = i ? t[e + 1] : 0, a = e + 2 < t.length, c = a ? t[e + 2] : 0, u = s >> 2, l = (3 & s) << 4 | o >> 4;
            let h = (15 & o) << 2 | c >> 6, d = 63 & c;
            a || (d = 64, i || (h = 64)), r.push(n[u], n[l], n[h], n[d])
        } return r.join("")
    }, encodeString(t, e) { return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(o(t), e) }, decodeString(t, e) {
        return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : function (t) {
            const e = [];
            let n = 0, r = 0;
            for (;
                n < t.length;
            ) {
                const s = t[n++];
                if (s < 128) e[r++] = String.fromCharCode(s);
                else if (s > 191 && s < 224) {
                    const i = t[n++];
                    e[r++] = String.fromCharCode((31 & s) << 6 | 63 & i)
                } else if (s > 239 && s < 365) {
                    const i = ((7 & s) << 18 | (63 & t[n++]) << 12 | (63 & t[n++]) << 6 | 63 & t[n++]) - 65536;
                    e[r++] = String.fromCharCode(55296 + (i >> 10)), e[r++] = String.fromCharCode(56320 + (1023 & i))
                } else {
                    const i = t[n++], o = t[n++];
                    e[r++] = String.fromCharCode((15 & s) << 12 | (63 & i) << 6 | 63 & o)
                }
            } return e.join("")
        }(this.decodeStringToByteArray(t, e))
    }, decodeStringToByteArray(t, e) {
        this.init_();
        const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_, r = [];
        for (let e = 0;
            e < t.length;
        ) {
            const s = n[t.charAt(e++)], i = e < t.length ? n[t.charAt(e)] : 0;
            ++e;
            const o = e < t.length ? n[t.charAt(e)] : 64;
            ++e;
            const a = e < t.length ? n[t.charAt(e)] : 64;
            if (++e, null == s || null == i || null == o || null == a) throw new c;
            const u = s << 2 | i >> 4;
            if (r.push(u), 64 !== o) {
                const t = i << 4 & 240 | o >> 2;
                if (r.push(t), 64 !== a) {
                    const t = o << 6 & 192 | a;
                    r.push(t)
                }
            }
        } return r
    }, init_() {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
            for (let t = 0;
                t < this.ENCODED_VALS.length;
                t++)this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t), this.charToByteMap_[this.byteToCharMap_[t]] = t, this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t, t >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t)
        }
    }
};
class c extends Error { constructor() { super(...arguments), this.name = "DecodeBase64StringError" } } const u = function (t) {
    return function (t) {
        const e = o(t);
        return a.encodeByteArray(e, !0)
    }(t).replace(/\./g, "")
};
const l = () => function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw new Error("Unable to locate global object.")
}().__FIREBASE_DEFAULTS__, h = () => {
    if ("undefined" == typeof document) return;
    let t;
    try { t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^; 
]+) /) } catch (t) { return } const e = t && function (t) { try { return a.decodeString(t, !0) } catch (t) { console.error("base64Decode failed: ", t) } return null }(t[1]); 
return e && JSON.parse(e) }, d = () => {
    try {
        return l() || (() => {
            if ("undefined" == typeof process || void 0 === process.env) return;
            const t = process.env.__FIREBASE_DEFAULTS__;
            return t ? JSON.parse(t) : void 0
        })() || h()
    } catch (t) { return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`) }
}, f = t => {
    const e = (t => {
        var e, n;
        return null === (n = null === (e = d()) || void 0 === e ? void 0 : e.emulatorHosts) || void 0 === n ? void 0 : n[t]
    })(t);
    if (!e) return;
    const n = e.lastIndexOf(":");
    if (n <= 0 || n + 1 === e.length) throw new Error(`Invalid host ${e} with no separate hostname and port!`);
    const r = parseInt(e.substring(n + 1), 10);
    return "[" === e[0] ? [e.substring(1, n - 1), r] : [e.substring(0, n), r]
};
function g() { return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : "" } function m() {
    return !function () {
        var t;
        const e = null === (t = d()) || void 0 === t ? void 0 : t.forceEnvironment;
        if ("node" === e) return !0;
        if ("browser" === e) return !1;
        try { return "[object process]" === Object.prototype.toString.call(global.process) } catch (t) { return !1 }
    }() && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")
} class p extends Error { constructor(t, e, n) { super(e), this.code = t, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, p.prototype), Error.captureStackTrace && Error.captureStackTrace(this, y.prototype.create) } } class y {
    constructor(t, e, n) { this.service = t, this.serviceName = e, this.errors = n } create(t, ...e) {
        const n = e[0] || {}, r = `${this.service}/${t}`, s = this.errors[t], i = s ? function (t, e) {
            return t.replace(w, ((t, n) => {
                const r = e[n];
                return null != r ? String(r) : `<${n}?>`
            }))
        }(s, n) : "Error", o = `${this.serviceName}: ${i} (${r}).`;
        return new p(r, o, n)
    }
} const w = /\{\$([^}]+)}/g;
function v(t, e) {
    if (t === e) return !0;
    const n = Object.keys(t), r = Object.keys(e);
    for (const s of n) {
        if (!r.includes(s)) return !1;
        const n = t[s], i = e[s];
        if (b(n) && b(i)) { if (!v(n, i)) return !1 } else if (n !== i) return !1
    } for (const t of r) if (!n.includes(t)) return !1;
    return !0
} function b(t) { return null !== t && "object" == typeof t } function I(t) { return t && t._delegate ? t._delegate : t } class E { constructor(t, e, n) { this.name = t, this.instanceFactory = e, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null } setInstantiationMode(t) { return this.instantiationMode = t, this } setMultipleInstances(t) { return this.multipleInstances = t, this } setServiceProps(t) { return this.serviceProps = t, this } setInstanceCreatedCallback(t) { return this.onInstanceCreated = t, this } } var T;
!function (t) { t[t.DEBUG = 0] = "DEBUG", t[t.VERBOSE = 1] = "VERBOSE", t[t.INFO = 2] = "INFO", t[t.WARN = 3] = "WARN", t[t.ERROR = 4] = "ERROR", t[t.SILENT = 5] = "SILENT" }(T || (T = {}));
const S = { debug: T.DEBUG, verbose: T.VERBOSE, info: T.INFO, warn: T.WARN, error: T.ERROR, silent: T.SILENT }, _ = T.INFO, x = { [T.DEBUG]: "log", [T.VERBOSE]: "log", [T.INFO]: "info", [T.WARN]: "warn", [T.ERROR]: "error" }, C = (t, e, ...n) => {
    if (e < t.logLevel) return;
    const r = (new Date).toISOString(), s = x[e];
    if (!s) throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
    console[s](`[${r}]  ${t.name}:`, ...n)
};
var D, A = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, N = N || {}, k = A || self;
function R(t) {
    var e = typeof t;
    return "array" == (e = "object" != e ? e : t ? Array.isArray(t) ? "array" : e : "null") || "object" == e && "number" == typeof t.length
} function M(t) {
    var e = typeof t;
    return "object" == e && null != t || "function" == e
} var F = "closure_uid_" + (1e9 * Math.random() >>> 0), O = 0;
function L(t, e, n) { return t.call.apply(t.bind, arguments) } function P(t, e, n) {
    if (!t) throw Error();
    if (2 < arguments.length) {
        var r = Array.prototype.slice.call(arguments, 2);
        return function () {
            var n = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(n, r), t.apply(e, n)
        }
    } return function () { return t.apply(e, arguments) }
} function V(t, e, n) { return (V = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? L : P).apply(null, arguments) } function B(t, e) {
    var n = Array.prototype.slice.call(arguments, 1);
    return function () {
        var e = n.slice();
        return e.push.apply(e, arguments), t.apply(this, e)
    }
} function q(t, e) {
    function n() { } n.prototype = e.prototype, t.$ = e.prototype, t.prototype = new n, t.prototype.constructor = t, t.ac = function (t, n, r) {
        for (var s = Array(arguments.length - 2), i = 2;
            i < arguments.length;
            i++)s[i - 2] = arguments[i];
        return e.prototype[n].apply(t, s)
    }
} function U() { this.s = this.s, this.o = this.o } U.prototype.s = !1, U.prototype.sa = function () {
    var t;
    !this.s && (this.s = !0, this.N(), 0) && (t = this, Object.prototype.hasOwnProperty.call(t, F) && t[F] || (t[F] = ++O))
}, U.prototype.N = function () {
    if (this.o) for (;
        this.o.length;
    )this.o.shift()()
};
const j = Array.prototype.indexOf ? function (t, e) { return Array.prototype.indexOf.call(t, e, void 0) } : function (t, e) {
    if ("string" == typeof t) return "string" != typeof e || 1 != e.length ? -1 : t.indexOf(e, 0);
    for (let n = 0;
        n < t.length;
        n++)if (n in t && t[n] === e) return n;
    return -1
};
function z(t) {
    const e = t.length;
    if (0 < e) {
        const n = Array(e);
        for (let r = 0;
            r < e;
            r++)n[r] = t[r];
        return n
    } return []
} function G(t, e) {
    for (let e = 1;
        e < arguments.length;
        e++) {
            const n = arguments[e];
        if (R(n)) {
            const e = t.length || 0, r = n.length || 0;
            t.length = e + r;
            for (let s = 0;
                s < r;
                s++)t[e + s] = n[s]
        } else t.push(n)
    }
} function K(t, e) { this.type = t, this.g = this.target = e, this.defaultPrevented = !1 } K.prototype.h = function () { this.defaultPrevented = !0 };
var $ = function () {
    if (!k.addEventListener || !Object.defineProperty) return !1;
    var t = !1, e = Object.defineProperty({}, "passive", { get: function () { t = !0 } });
    try { k.addEventListener("test", (() => { }), e), k.removeEventListener("test", (() => { }), e) } catch (t) { } return t
}();
function Q(t) { return /^[\s\xa0]*$/.test(t) } function H() {
    var t = k.navigator;
    return t && (t = t.userAgent) ? t : ""
} function W(t) { return -1 != H().indexOf(t) } function X(t) { return X[" "](t), t } X[" "] = function () { };
var Y, J, Z, tt = W("Opera"), et = W("Trident") || W("MSIE"), nt = W("Edge"), rt = nt || et, st = W("Gecko") && !(-1 != H().toLowerCase().indexOf("webkit") && !W("Edge")) && !(W("Trident") || W("MSIE")) && !W("Edge"), it = -1 != H().toLowerCase().indexOf("webkit") && !W("Edge");
function ot() {
    var t = k.document;
    return t ? t.documentMode : void 0
} t: {
    var at = "", ct = (J = H(), st ? /rv:([^\); 
]+) (\)|; 
) /.exec(J) : nt ? /Edge\/([\d\.]+)/.exec(J) : et ? /\b(?:MSIE|rv)[: ]([^\); 
]+) (\)|; 
) /.exec(J) : it ? /WebKit\/(\S+)/.exec(J) : tt ? /(?:Version)[ \/]?(\S+)/.exec(J) : void 0);
    if (ct && (at = ct ? ct[1] : ""), et) {
        var ut = ot();
        if (null != ut && ut > parseFloat(at)) {
            Y = String(ut);
            break t
        }
    } Y = at
} if (k.document && et) {
    var lt = ot();
    Z = lt || (parseInt(Y, 10) || void 0)
} else Z = void 0;
var ht = Z;
function dt(t, e) {
    if (K.call(this, t ? t.type : ""), this.relatedTarget = this.g = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.state = null, this.pointerId = 0, this.pointerType = "", this.i = null, t) {
        var n = this.type = t.type, r = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : null;
        if (this.target = t.target || t.srcElement, this.g = e, e = t.relatedTarget) {
            if (st) {
                t: {
                    try {
                        X(e.nodeName);
                        var s = !0;
                        break t
                    } catch (t) { } s = !1
                } s || (e = null)
            }
        } else "mouseover" == n ? e = t.fromElement : "mouseout" == n && (e = t.toElement);
        this.relatedTarget = e, r ? (this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX, this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY, this.screenX = r.screenX || 0, this.screenY = r.screenY || 0) : (this.clientX = void 0 !== t.clientX ? t.clientX : t.pageX, this.clientY = void 0 !== t.clientY ? t.clientY : t.pageY, this.screenX = t.screenX || 0, this.screenY = t.screenY || 0), this.button = t.button, this.key = t.key || "", this.ctrlKey = t.ctrlKey, this.altKey = t.altKey, this.shiftKey = t.shiftKey, this.metaKey = t.metaKey, this.pointerId = t.pointerId || 0, this.pointerType = "string" == typeof t.pointerType ? t.pointerType : ft[t.pointerType] || "", this.state = t.state, this.i = t, t.defaultPrevented && dt.$.h.call(this)
    }
} q(dt, K);
var ft = { 2: "touch", 3: "pen", 4: "mouse" };
dt.prototype.h = function () {
    dt.$.h.call(this);
    var t = this.i;
    t.preventDefault ? t.preventDefault() : t.returnValue = !1
};
var gt = "closure_listenable_" + (1e6 * Math.random() | 0), mt = 0;
function pt(t, e, n, r, s) { this.listener = t, this.proxy = null, this.src = e, this.type = n, this.capture = !!r, this.la = s, this.key = ++mt, this.fa = this.ia = !1 } function yt(t) { t.fa = !0, t.listener = null, t.proxy = null, t.src = null, t.la = null } function wt(t, e, n) { for (const r in t) e.call(n, t[r], r, t) } function vt(t) {
    const e = {};
    for (const n in t) e[n] = t[n];
    return e
} const bt = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function It(t, e) {
    let n, r;
    for (let e = 1;
        e < arguments.length;
        e++) {
            for (n in r = arguments[e], r) t[n] = r[n];
        for (let e = 0;
            e < bt.length;
            e++)n = bt[e], Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    }
} function Et(t) { this.src = t, this.g = {}, this.h = 0 } function Tt(t, e) {
    var n = e.type;
    if (n in t.g) {
        var r, s = t.g[n], i = j(s, e);
        (r = 0 <= i) && Array.prototype.splice.call(s, i, 1), r && (yt(e), 0 == t.g[n].length && (delete t.g[n], t.h--))
    }
} function St(t, e, n, r) {
    for (var s = 0;
        s < t.length;
        ++s) {
            var i = t[s];
        if (!i.fa && i.listener == e && i.capture == !!n && i.la == r) return s
    } return -1
} Et.prototype.add = function (t, e, n, r, s) {
    var i = t.toString();
    (t = this.g[i]) || (t = this.g[i] = [], this.h++);
    var o = St(t, e, r, s);
    return -1 < o ? (e = t[o], n || (e.ia = !1)) : ((e = new pt(e, this.src, i, !!r, s)).ia = n, t.push(e)), e
};
var _t = "closure_lm_" + (1e6 * Math.random() | 0), xt = {};
function Ct(t, e, n, r, s) {
    if (r && r.once) return At(t, e, n, r, s);
    if (Array.isArray(e)) {
        for (var i = 0;
            i < e.length;
            i++)Ct(t, e[i], n, r, s);
        return null
    } return n = Lt(n), t && t[gt] ? t.O(e, n, M(r) ? !!r.capture : !!r, s) : Dt(t, e, n, !1, r, s)
} function Dt(t, e, n, r, s, i) {
    if (!e) throw Error("Invalid event type");
    var o = M(s) ? !!s.capture : !!s, a = Ft(t);
    if (a || (t[_t] = a = new Et(t)), (n = a.add(e, n, r, o, i)).proxy) return n;
    if (r = function () {
        function t(n) { return e.call(t.src, t.listener, n) } const e = Mt;
        return t
    }(), n.proxy = r, r.src = t, r.listener = n, t.addEventListener) $ || (s = o), void 0 === s && (s = !1), t.addEventListener(e.toString(), r, s);
    else if (t.attachEvent) t.attachEvent(Rt(e.toString()), r);
    else {
        if (!t.addListener || !t.removeListener) throw Error("addEventListener and attachEvent are unavailable.");
        t.addListener(r)
    } return n
} function At(t, e, n, r, s) {
    if (Array.isArray(e)) {
        for (var i = 0;
            i < e.length;
            i++)At(t, e[i], n, r, s);
        return null
    } return n = Lt(n), t && t[gt] ? t.P(e, n, M(r) ? !!r.capture : !!r, s) : Dt(t, e, n, !0, r, s)
} function Nt(t, e, n, r, s) {
    if (Array.isArray(e)) for (var i = 0;
        i < e.length;
        i++)Nt(t, e[i], n, r, s);
    else r = M(r) ? !!r.capture : !!r, n = Lt(n), t && t[gt] ? (t = t.i, (e = String(e).toString()) in t.g && (-1 < (n = St(i = t.g[e], n, r, s)) && (yt(i[n]), Array.prototype.splice.call(i, n, 1), 0 == i.length && (delete t.g[e], t.h--)))) : t && (t = Ft(t)) && (e = t.g[e.toString()], t = -1, e && (t = St(e, n, r, s)), (n = -1 < t ? e[t] : null) && kt(n))
} function kt(t) {
    if ("number" != typeof t && t && !t.fa) {
        var e = t.src;
        if (e && e[gt]) Tt(e.i, t);
        else {
            var n = t.type, r = t.proxy;
            e.removeEventListener ? e.removeEventListener(n, r, t.capture) : e.detachEvent ? e.detachEvent(Rt(n), r) : e.addListener && e.removeListener && e.removeListener(r), (n = Ft(e)) ? (Tt(n, t), 0 == n.h && (n.src = null, e[_t] = null)) : yt(t)
        }
    }
} function Rt(t) { return t in xt ? xt[t] : xt[t] = "on" + t } function Mt(t, e) {
    if (t.fa) t = !0;
    else {
        e = new dt(e, this);
        var n = t.listener, r = t.la || t.src;
        t.ia && kt(t), t = n.call(r, e)
    } return t
} function Ft(t) { return (t = t[_t]) instanceof Et ? t : null } var Ot = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
function Lt(t) { return "function" == typeof t ? t : (t[Ot] || (t[Ot] = function (e) { return t.handleEvent(e) }), t[Ot]) } function Pt() { U.call(this), this.i = new Et(this), this.S = this, this.J = null } function Vt(t, e) {
    var n, r = t.J;
    if (r) for (n = [];
        r;
        r = r.J)n.push(r);
    if (t = t.S, r = e.type || e, "string" == typeof e) e = new K(e, t);
    else if (e instanceof K) e.target = e.target || t;
    else {
        var s = e;
        It(e = new K(r, t), s)
    } if (s = !0, n) for (var i = n.length - 1;
        0 <= i;
        i--) {
            var o = e.g = n[i];
        s = Bt(o, r, !0, e) && s
    } if (s = Bt(o = e.g = t, r, !0, e) && s, s = Bt(o, r, !1, e) && s, n) for (i = 0;
        i < n.length;
        i++)s = Bt(o = e.g = n[i], r, !1, e) && s
} function Bt(t, e, n, r) {
    if (!(e = t.i.g[String(e)])) return !0;
    e = e.concat();
    for (var s = !0, i = 0;
        i < e.length;
        ++i) {
            var o = e[i];
        if (o && !o.fa && o.capture == n) {
            var a = o.listener, c = o.la || o.src;
            o.ia && Tt(t.i, o), s = !1 !== a.call(c, r) && s
        }
    } return s && !r.defaultPrevented
} q(Pt, U), Pt.prototype[gt] = !0, Pt.prototype.removeEventListener = function (t, e, n, r) { Nt(this, t, e, n, r) }, Pt.prototype.N = function () {
    if (Pt.$.N.call(this), this.i) {
        var t, e = this.i;
        for (t in e.g) {
            for (var n = e.g[t], r = 0;
                r < n.length;
                r++)yt(n[r]);
            delete e.g[t], e.h--
        }
    } this.J = null
}, Pt.prototype.O = function (t, e, n, r) { return this.i.add(String(t), e, !1, n, r) }, Pt.prototype.P = function (t, e, n, r) { return this.i.add(String(t), e, !0, n, r) };
var qt = k.JSON.stringify;
function Ut() {
    var t = Ht;
    let e = null;
    return t.g && (e = t.g, t.g = t.g.next, t.g || (t.h = null), e.next = null), e
} var jt = new class {
    constructor(t, e) { this.i = t, this.j = e, this.h = 0, this.g = null } get() {
        let t;
        return 0 < this.h ? (this.h--, t = this.g, this.g = t.next, t.next = null) : t = this.i(), t
    }
}((() => new zt), (t => t.reset()));
class zt { constructor() { this.next = this.g = this.h = null } set(t, e) { this.h = t, this.g = e, this.next = null } reset() { this.next = this.g = this.h = null } } function Gt(t) {
    var e = 1;
    t = t.split(":");
    const n = [];
    for (;
        0 < e && t.length;
    )n.push(t.shift()), e--;
    return t.length && n.push(t.join(":")), n
} function Kt(t) { k.setTimeout((() => { throw t }), 0) } let $t, Qt = !1, Ht = new class {
    constructor() { this.h = this.g = null } add(t, e) {
        const n = jt.get();
        n.set(t, e), this.h ? this.h.next = n : this.g = n, this.h = n
    }
}, Wt = () => {
    const t = k.Promise.resolve(void 0);
    $t = () => { t.then(Xt) }
};
var Xt = () => {
    for (var t;
        t = Ut();
    ) {
        try { t.h.call(t.g) } catch (t) { Kt(t) } var e = jt;
        e.j(t), 100 > e.h && (e.h++, t.next = e.g, e.g = t)
    } Qt = !1
};
function Yt(t, e) { Pt.call(this), this.h = t || 1, this.g = e || k, this.j = V(this.qb, this), this.l = Date.now() } function Jt(t) { t.ga = !1, t.T && (t.g.clearTimeout(t.T), t.T = null) } function Zt(t, e, n) {
    if ("function" == typeof t) n && (t = V(t, n));
    else {
        if (!t || "function" != typeof t.handleEvent) throw Error("Invalid listener argument");
        t = V(t.handleEvent, t)
    } return 2147483647 < Number(e) ? -1 : k.setTimeout(t, e || 0)
} function te(t) {
    t.g = Zt((() => { t.g = null, t.i && (t.i = !1, te(t)) }), t.j);
    const e = t.h;
    t.h = null, t.m.apply(null, e)
} q(Yt, Pt), (D = Yt.prototype).ga = !1, D.T = null, D.qb = function () {
    if (this.ga) {
        var t = Date.now() - this.l;
        0 < t && t < .8 * this.h ? this.T = this.g.setTimeout(this.j, this.h - t) : (this.T && (this.g.clearTimeout(this.T), this.T = null), Vt(this, "tick"), this.ga && (Jt(this), this.start()))
    }
}, D.start = function () { this.ga = !0, this.T || (this.T = this.g.setTimeout(this.j, this.h), this.l = Date.now()) }, D.N = function () { Yt.$.N.call(this), Jt(this), delete this.g };
class ee extends U { constructor(t, e) { super(), this.m = t, this.j = e, this.h = null, this.i = !1, this.g = null } l(t) { this.h = arguments, this.g ? this.i = !0 : te(this) } N() { super.N(), this.g && (k.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null) } } function ne(t) { U.call(this), this.h = t, this.g = {} } q(ne, U);
var re = [];
function se(t, e, n, r) {
    Array.isArray(n) || (n && (re[0] = n.toString()), n = re);
    for (var s = 0;
        s < n.length;
        s++) {
            var i = Ct(e, n[s], r || t.handleEvent, !1, t.h || t);
        if (!i) break;
        t.g[i.key] = i
    }
} function ie(t) { wt(t.g, (function (t, e) { this.g.hasOwnProperty(e) && kt(t) }), t), t.g = {} } function oe() { this.g = !0 } function ae(t, e, n, r) {
    t.info((function () {
        return "XMLHTTP TEXT (" + e + "): " + function (t, e) {
            if (!t.g) return e;
            if (!e) return null;
            try {
                var n = JSON.parse(e);
                if (n) for (t = 0;
                    t < n.length;
                    t++)if (Array.isArray(n[t])) {
                        var r = n[t];
                        if (!(2 > r.length)) {
                            var s = r[1];
                            if (Array.isArray(s) && !(1 > s.length)) {
                                var i = s[0];
                                if ("noop" != i && "stop" != i && "close" != i) for (var o = 1;
                                    o < s.length;
                                    o++)s[o] = ""
                            }
                        }
                    } return qt(n)
            } catch (t) { return e }
        }(t, n) + (r ? " " + r : "")
    }))
} ne.prototype.N = function () { ne.$.N.call(this), ie(this) }, ne.prototype.handleEvent = function () { throw Error("EventHandler.handleEvent not implemented") }, oe.prototype.Ea = function () { this.g = !1 }, oe.prototype.info = function () { };
var ce = {}, ue = null;
function le() { return ue = ue || new Pt } function he(t) { K.call(this, ce.Ta, t) } function de(t) {
    const e = le();
    Vt(e, new he(e))
} function fe(t, e) { K.call(this, ce.STAT_EVENT, t), this.stat = e } function ge(t) {
    const e = le();
    Vt(e, new fe(e, t))
} function me(t, e) { K.call(this, ce.Ua, t), this.size = e } function pe(t, e) {
    if ("function" != typeof t) throw Error("Fn must not be null and must be a function");
    return k.setTimeout((function () { t() }), e)
} ce.Ta = "serverreachability", q(he, K), ce.STAT_EVENT = "statevent", q(fe, K), ce.Ua = "timingevent", q(me, K);
var ye = { NO_ERROR: 0, rb: 1, Eb: 2, Db: 3, yb: 4, Cb: 5, Fb: 6, Qa: 7, TIMEOUT: 8, Ib: 9 }, we = { wb: "complete", Sb: "success", Ra: "error", Qa: "abort", Kb: "ready", Lb: "readystatechange", TIMEOUT: "timeout", Gb: "incrementaldata", Jb: "progress", zb: "downloadprogress", $b: "uploadprogress" };
function ve() { } function be(t) { return t.h || (t.h = t.i()) } function Ie() { } ve.prototype.h = null;
var Ee, Te = { OPEN: "a", vb: "b", Ra: "c", Hb: "d" };
function Se() { K.call(this, "d") } function _e() { K.call(this, "c") } function xe() { } function Ce(t, e, n, r) { this.l = t, this.j = e, this.m = n, this.W = r || 1, this.U = new ne(this), this.P = Ae, t = rt ? 125 : void 0, this.V = new Yt(t), this.I = null, this.i = !1, this.s = this.A = this.v = this.L = this.G = this.Y = this.B = null, this.F = [], this.g = null, this.C = 0, this.o = this.u = null, this.ca = -1, this.J = !1, this.O = 0, this.M = null, this.ba = this.K = this.aa = this.S = !1, this.h = new De } function De() { this.i = null, this.g = "", this.h = !1 } q(Se, K), q(_e, K), q(xe, ve), xe.prototype.g = function () { return new XMLHttpRequest }, xe.prototype.i = function () { return {} }, Ee = new xe;
var Ae = 45e3, Ne = {}, ke = {};
function Re(t, e, n) { t.L = 1, t.v = Ye($e(e)), t.s = n, t.S = !0, Me(t, null) } function Me(t, e) {
    t.G = Date.now(), Pe(t), t.A = $e(t.v);
    var n = t.A, r = t.W;
    Array.isArray(r) || (r = [String(r)]), hn(n.i, "t", r), t.C = 0, n = t.l.J, t.h = new De, t.g = ur(t.l, n ? e : null, !t.s), 0 < t.O && (t.M = new ee(V(t.Pa, t, t.g), t.O)), se(t.U, t.g, "readystatechange", t.nb), e = t.I ? vt(t.I) : {}, t.s ? (t.u || (t.u = "POST"), e["Content-Type"] = "application/x-www-form-urlencoded", t.g.ha(t.A, t.u, t.s, e)) : (t.u = "GET", t.g.ha(t.A, t.u, null, e)), de(), function (t, e, n, r, s, i) {
        t.info((function () {
            if (t.g) if (i) for (var o = "", a = i.split("&"), c = 0;
                c < a.length;
                c++) {
                    var u = a[c].split("=");
                if (1 < u.length) {
                    var l = u[0];
                    u = u[1];
                    var h = l.split("_");
                    o = 2 <= h.length && "type" == h[1] ? o + (l + "=") + u + "&" : o + (l + "=redacted&")
                }
            } else o = null;
            else o = i;
            return "XMLHTTP REQ (" + r + ") [attempt " + s + "]: " + e + "\n" + n + "\n" + o
        }))
    }(t.j, t.u, t.A, t.m, t.W, t.s)
} function Fe(t) { return !!t.g && ("GET" == t.u && 2 != t.L && t.l.Ha) } function Oe(t, e, n) {
    let r, s = !0;
    for (;
        !t.J && t.C < n.length;
    ) {
        if (r = Le(t, n), r == ke) {
            4 == e && (t.o = 4, ge(14), s = !1), ae(t.j, t.m, null, "[Incomplete Response]");
            break
        } if (r == Ne) {
            t.o = 4, ge(15), ae(t.j, t.m, n, "[Invalid Chunk]"), s = !1;
            break
        } ae(t.j, t.m, r, null), je(t, r)
    } Fe(t) && r != ke && r != Ne && (t.h.g = "", t.C = 0), 4 != e || 0 != n.length || t.h.h || (t.o = 1, ge(16), s = !1), t.i = t.i && s, s ? 0 < n.length && !t.ba && (t.ba = !0, (e = t.l).g == t && e.ca && !e.M && (e.l.info("Great, no buffering proxy detected. Bytes received: " + n.length), er(e), e.M = !0, ge(11))) : (ae(t.j, t.m, n, "[Invalid Chunked Response]"), Ue(t), qe(t))
} function Le(t, e) {
    var n = t.C, r = e.indexOf("\n", n);
    return -1 == r ? ke : (n = Number(e.substring(n, r)), isNaN(n) ? Ne : (r += 1) + n > e.length ? ke : (e = e.slice(r, r + n), t.C = r + n, e))
} function Pe(t) { t.Y = Date.now() + t.P, Ve(t, t.P) } function Ve(t, e) {
    if (null != t.B) throw Error("WatchDog timer not null");
    t.B = pe(V(t.lb, t), e)
} function Be(t) { t.B && (k.clearTimeout(t.B), t.B = null) } function qe(t) { 0 == t.l.H || t.J || sr(t.l, t) } function Ue(t) {
    Be(t);
    var e = t.M;
    e && "function" == typeof e.sa && e.sa(), t.M = null, Jt(t.V), ie(t.U), t.g && (e = t.g, t.g = null, e.abort(), e.sa())
} function je(t, e) {
    try {
        var n = t.l;
        if (0 != n.H && (n.g == t || yn(n.i, t))) if (!t.K && yn(n.i, t) && 3 == n.H) {
            try { var r = n.Ja.g.parse(e) } catch (t) { r = null } if (Array.isArray(r) && 3 == r.length) {
                var s = r;
                if (0 == s[0]) {
                    t: if (!n.u) {
                        if (n.g) {
                            if (!(n.g.G + 3e3 < t.G)) break t;
                            rr(n), Qn(n)
                        } tr(n), ge(18)
                    }
                } else n.Fa = s[1], 0 < n.Fa - n.V && 37500 > s[2] && n.G && 0 == n.A && !n.v && (n.v = pe(V(n.ib, n), 6e3));
                if (1 >= pn(n.i) && n.oa) { try { n.oa() } catch (t) { } n.oa = void 0 }
            } else or(n, 11)
        } else if ((t.K || n.g == t) && rr(n), !Q(e)) for (s = n.Ja.g.parse(e), e = 0;
            e < s.length;
            e++) {
                let u = s[e];
            if (n.V = u[0], u = u[1], 2 == n.H) if ("c" == u[0]) {
                n.K = u[1], n.pa = u[2];
                const e = u[3];
                null != e && (n.ra = e, n.l.info("VER=" + n.ra));
                const s = u[4];
                null != s && (n.Ga = s, n.l.info("SVER=" + n.Ga));
                const l = u[5];
                null != l && "number" == typeof l && 0 < l && (r = 1.5 * l, n.L = r, n.l.info("backChannelRequestTimeoutMs_=" + r)), r = n;
                const h = t.g;
                if (h) {
                    const t = h.g ? h.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                    if (t) {
                        var i = r.i;
                        i.g || -1 == t.indexOf("spdy") && -1 == t.indexOf("quic") && -1 == t.indexOf("h2") || (i.j = i.l, i.g = new Set, i.h && (wn(i, i.h), i.h = null))
                    } if (r.F) {
                        const t = h.g ? h.g.getResponseHeader("X-HTTP-Session-Id") : null;
                        t && (r.Da = t, Xe(r.I, r.F, t))
                    }
                } n.H = 3, n.h && n.h.Ba(), n.ca && (n.S = Date.now() - t.G, n.l.info("Handshake RTT: " + n.S + "ms"));
                var o = t;
                if ((r = n).wa = cr(r, r.J ? r.pa : null, r.Y), o.K) {
                    vn(r.i, o);
                    var a = o, c = r.L;
                    c && a.setTimeout(c), a.B && (Be(a), Pe(a)), r.g = o
                } else Zn(r);
                0 < n.j.length && Wn(n)
            } else "stop" != u[0] && "close" != u[0] || or(n, 7);
            else 3 == n.H && ("stop" == u[0] || "close" == u[0] ? "stop" == u[0] ? or(n, 7) : $n(n) : "noop" != u[0] && n.h && n.h.Aa(u), n.A = 0)
        } de()
    } catch (t) { }
} function ze(t, e) {
    if (t.forEach && "function" == typeof t.forEach) t.forEach(e, void 0);
    else if (R(t) || "string" == typeof t) Array.prototype.forEach.call(t, e, void 0);
    else for (var n = function (t) {
        if (t.ta && "function" == typeof t.ta) return t.ta();
        if (!t.Z || "function" != typeof t.Z) {
            if ("undefined" != typeof Map && t instanceof Map) return Array.from(t.keys());
            if (!("undefined" != typeof Set && t instanceof Set)) {
                if (R(t) || "string" == typeof t) {
                    var e = [];
                    t = t.length;
                    for (var n = 0;
                        n < t;
                        n++)e.push(n);
                    return e
                } e = [], n = 0;
                for (const r in t) e[n++] = r;
                return e
            }
        }
    }(t), r = function (t) {
        if (t.Z && "function" == typeof t.Z) return t.Z();
        if ("undefined" != typeof Map && t instanceof Map || "undefined" != typeof Set && t instanceof Set) return Array.from(t.values());
        if ("string" == typeof t) return t.split("");
        if (R(t)) {
            for (var e = [], n = t.length, r = 0;
                r < n;
                r++)e.push(t[r]);
            return e
        } for (r in e = [], n = 0, t) e[n++] = t[r];
        return e
    }(t), s = r.length, i = 0;
        i < s;
        i++)e.call(void 0, r[i], n && n[i], t)
} (D = Ce.prototype).setTimeout = function (t) { this.P = t }, D.nb = function (t) {
    t = t.target;
    const e = this.M;
    e && 3 == qn(t) ? e.l() : this.Pa(t)
}, D.Pa = function (t) {
    try {
        if (t == this.g) t: {
            const l = qn(this.g);
            var e = this.g.Ia();
            this.g.da();
            if (!(3 > l) && (3 != l || rt || this.g && (this.h.h || this.g.ja() || Un(this.g)))) {
                this.J || 4 != l || 7 == e || de(), Be(this);
                var n = this.g.da();
                this.ca = n;
                e: if (Fe(this)) {
                    var r = Un(this.g);
                    t = "";
                    var s = r.length, i = 4 == qn(this.g);
                    if (!this.h.i) {
                        if ("undefined" == typeof TextDecoder) {
                            Ue(this), qe(this);
                            var o = "";
                            break e
                        } this.h.i = new k.TextDecoder
                    } for (e = 0;
                        e < s;
                        e++)this.h.h = !0, t += this.h.i.decode(r[e], { stream: i && e == s - 1 });
                    r.splice(0, s), this.h.g += t, this.C = 0, o = this.h.g
                } else o = this.g.ja();
                if (this.i = 200 == n, function (t, e, n, r, s, i, o) { t.info((function () { return "XMLHTTP RESP (" + r + ") [ attempt " + s + "]: " + e + "\n" + n + "\n" + i + " " + o })) }(this.j, this.u, this.A, this.m, this.W, l, n), this.i) {
                    if (this.aa && !this.K) {
                        e: {
                            if (this.g) {
                                var a, c = this.g;
                                if ((a = c.g ? c.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !Q(a)) {
                                    var u = a;
                                    break e
                                }
                            } u = null
                        } if (!(n = u)) {
                            this.i = !1, this.o = 3, ge(12), Ue(this), qe(this);
                            break t
                        } ae(this.j, this.m, n, "Initial handshake response via X-HTTP-Initial-Response"), this.K = !0, je(this, n)
                    } this.S ? (Oe(this, l, o), rt && this.i && 3 == l && (se(this.U, this.V, "tick", this.mb), this.V.start())) : (ae(this.j, this.m, o, null), je(this, o)), 4 == l && Ue(this), this.i && !this.J && (4 == l ? sr(this.l, this) : (this.i = !1, Pe(this)))
                } else (function (t) {
                    const e = {};
                    t = (t.g && 2 <= qn(t) && t.g.getAllResponseHeaders() || "").split("\r\n");
                    for (let r = 0;
                        r < t.length;
                        r++) {
                            if (Q(t[r])) continue;
                        var n = Gt(t[r]);
                        const s = n[0];
                        if ("string" != typeof (n = n[1])) continue;
                        n = n.trim();
                        const i = e[s] || [];
                        e[s] = i, i.push(n)
                    } !function (t, e) { for (const n in t) e.call(void 0, t[n], n, t) }(e, (function (t) { return t.join(", ") }))
                })(this.g), 400 == n && 0 < o.indexOf("Unknown SID") ? (this.o = 3, ge(12)) : (this.o = 0, ge(13)), Ue(this), qe(this)
            }
        }
    } catch (t) { }
}, D.mb = function () {
    if (this.g) {
        var t = qn(this.g), e = this.g.ja();
        this.C < e.length && (Be(this), Oe(this, t, e), this.i && 4 != t && Pe(this))
    }
}, D.cancel = function () { this.J = !0, Ue(this) }, D.lb = function () {
    this.B = null;
    const t = Date.now();
    0 <= t - this.Y ? (function (t, e) { t.info((function () { return "TIMEOUT: " + e })) }(this.j, this.A), 2 != this.L && (de(), ge(17)), Ue(this), this.o = 2, qe(this)) : Ve(this, this.Y - t)
};
var Ge = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
function Ke(t) {
    if (this.g = this.s = this.j = "", this.m = null, this.o = this.l = "", this.h = !1, t instanceof Ke) {
        this.h = t.h, Qe(this, t.j), this.s = t.s, this.g = t.g, He(this, t.m), this.l = t.l;
        var e = t.i, n = new an;
        n.i = e.i, e.g && (n.g = new Map(e.g), n.h = e.h), We(this, n), this.o = t.o
    } else t && (e = String(t).match(Ge)) ? (this.h = !1, Qe(this, e[1] || "", !0), this.s = Je(e[2] || ""), this.g = Je(e[3] || "", !0), He(this, e[4]), this.l = Je(e[5] || "", !0), We(this, e[6] || "", !0), this.o = Je(e[7] || "")) : (this.h = !1, this.i = new an(null, this.h))
} function $e(t) { return new Ke(t) } function Qe(t, e, n) { t.j = n ? Je(e, !0) : e, t.j && (t.j = t.j.replace(/:$/, "")) } function He(t, e) {
    if (e) {
        if (e = Number(e), isNaN(e) || 0 > e) throw Error("Bad port number " + e);
        t.m = e
    } else t.m = null
} function We(t, e, n) {
    e instanceof an ? (t.i = e, function (t, e) {
        e && !t.j && (cn(t), t.i = null, t.g.forEach((function (t, e) {
            var n = e.toLowerCase();
            e != n && (un(this, e), hn(this, n, t))
        }), t)), t.j = e
    }(t.i, t.h)) : (n || (e = Ze(e, sn)), t.i = new an(e, t.h))
} function Xe(t, e, n) { t.i.set(e, n) } function Ye(t) { return Xe(t, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)), t } function Je(t, e) { return t ? e ? decodeURI(t.replace(/%25/g, "%2525")) : decodeURIComponent(t) : "" } function Ze(t, e, n) { return "string" == typeof t ? (t = encodeURI(t).replace(e, tn), n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), t) : null } function tn(t) { return "%" + ((t = t.charCodeAt(0)) >> 4 & 15).toString(16) + (15 & t).toString(16) } Ke.prototype.toString = function () {
    var t = [], e = this.j;
    e && t.push(Ze(e, en, !0), ":");
    var n = this.g;
    return (n || "file" == e) && (t.push("//"), (e = this.s) && t.push(Ze(e, en, !0), "@"), t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), null != (n = this.m) && t.push(":", String(n))), (n = this.l) && (this.g && "/" != n.charAt(0) && t.push("/"), t.push(Ze(n, "/" == n.charAt(0) ? rn : nn, !0))), (n = this.i.toString()) && t.push("?", n), (n = this.o) && t.push("#", Ze(n, on)), t.join("")
};
var en = /[#\/\?@]/g, nn = /[#\?:]/g, rn = /[#\?]/g, sn = /[#\?@]/g, on = /#/g;
function an(t, e) { this.h = this.g = null, this.i = t || null, this.j = !!e } function cn(t) {
    t.g || (t.g = new Map, t.h = 0, t.i && function (t, e) {
        if (t) {
            t = t.split("&");
            for (var n = 0;
                n < t.length;
                n++) {
                    var r = t[n].indexOf("="), s = null;
                if (0 <= r) {
                    var i = t[n].substring(0, r);
                    s = t[n].substring(r + 1)
                } else i = t[n];
                e(i, s ? decodeURIComponent(s.replace(/\+/g, " ")) : "")
            }
        }
    }(t.i, (function (e, n) { t.add(decodeURIComponent(e.replace(/\+/g, " ")), n) })))
} function un(t, e) { cn(t), e = dn(t, e), t.g.has(e) && (t.i = null, t.h -= t.g.get(e).length, t.g.delete(e)) } function ln(t, e) { return cn(t), e = dn(t, e), t.g.has(e) } function hn(t, e, n) { un(t, e), 0 < n.length && (t.i = null, t.g.set(dn(t, e), z(n)), t.h += n.length) } function dn(t, e) { return e = String(e), t.j && (e = e.toLowerCase()), e } (D = an.prototype).add = function (t, e) {
    cn(this), this.i = null, t = dn(this, t);
    var n = this.g.get(t);
    return n || this.g.set(t, n = []), n.push(e), this.h += 1, this
}, D.forEach = function (t, e) { cn(this), this.g.forEach((function (n, r) { n.forEach((function (n) { t.call(e, n, r, this) }), this) }), this) }, D.ta = function () {
    cn(this);
    const t = Array.from(this.g.values()), e = Array.from(this.g.keys()), n = [];
    for (let r = 0;
        r < e.length;
        r++) {
            const s = t[r];
        for (let t = 0;
            t < s.length;
            t++)n.push(e[r])
    } return n
}, D.Z = function (t) {
    cn(this);
    let e = [];
    if ("string" == typeof t) ln(this, t) && (e = e.concat(this.g.get(dn(this, t))));
    else {
        t = Array.from(this.g.values());
        for (let n = 0;
            n < t.length;
            n++)e = e.concat(t[n])
    } return e
}, D.set = function (t, e) { return cn(this), this.i = null, ln(this, t = dn(this, t)) && (this.h -= this.g.get(t).length), this.g.set(t, [e]), this.h += 1, this }, D.get = function (t, e) { return t && 0 < (t = this.Z(t)).length ? String(t[0]) : e }, D.toString = function () {
    if (this.i) return this.i;
    if (!this.g) return "";
    const t = [], e = Array.from(this.g.keys());
    for (var n = 0;
        n < e.length;
        n++) {
            var r = e[n];
        const i = encodeURIComponent(String(r)), o = this.Z(r);
        for (r = 0;
            r < o.length;
            r++) {
                var s = i;
            "" !== o[r] && (s += "=" + encodeURIComponent(String(o[r]))), t.push(s)
        }
    } return this.i = t.join("&")
};
function fn(t) { this.l = t || gn, k.PerformanceNavigationTiming ? t = 0 < (t = k.performance.getEntriesByType("navigation")).length && ("hq" == t[0].nextHopProtocol || "h2" == t[0].nextHopProtocol) : t = !!(k.g && k.g.Ka && k.g.Ka() && k.g.Ka().ec), this.j = t ? this.l : 1, this.g = null, 1 < this.j && (this.g = new Set), this.h = null, this.i = [] } var gn = 10;
function mn(t) { return !!t.h || !!t.g && t.g.size >= t.j } function pn(t) { return t.h ? 1 : t.g ? t.g.size : 0 } function yn(t, e) { return t.h ? t.h == e : !!t.g && t.g.has(e) } function wn(t, e) { t.g ? t.g.add(e) : t.h = e } function vn(t, e) { t.h && t.h == e ? t.h = null : t.g && t.g.has(e) && t.g.delete(e) } function bn(t) {
    if (null != t.h) return t.i.concat(t.h.F);
    if (null != t.g && 0 !== t.g.size) {
        let e = t.i;
        for (const n of t.g.values()) e = e.concat(n.F);
        return e
    } return z(t.i)
} fn.prototype.cancel = function () {
    if (this.i = bn(this), this.h) this.h.cancel(), this.h = null;
    else if (this.g && 0 !== this.g.size) {
        for (const t of this.g.values()) t.cancel();
        this.g.clear()
    }
};
function In() { this.g = new class { stringify(t) { return k.JSON.stringify(t, void 0) } parse(t) { return k.JSON.parse(t, void 0) } } } function En(t, e, n) {
    const r = n || "";
    try {
        ze(t, (function (t, n) {
            let s = t;
            M(t) && (s = qt(t)), e.push(r + n + "=" + encodeURIComponent(s))
        }))
    } catch (t) { throw e.push(r + "type=" + encodeURIComponent("_badmap")), t }
} function Tn(t, e, n, r, s) { try { e.onload = null, e.onerror = null, e.onabort = null, e.ontimeout = null, s(r) } catch (t) { } } function Sn(t) { this.l = t.fc || null, this.j = t.ob || !1 } function _n(t, e) { Pt.call(this), this.F = t, this.u = e, this.m = void 0, this.readyState = xn, this.status = 0, this.responseType = this.responseText = this.response = this.statusText = "", this.onreadystatechange = null, this.v = new Headers, this.h = null, this.C = "GET", this.B = "", this.g = !1, this.A = this.j = this.l = null } q(Sn, ve), Sn.prototype.g = function () { return new _n(this.l, this.j) }, Sn.prototype.i = function (t) { return function () { return t } }({}), q(_n, Pt);
var xn = 0;
function Cn(t) { t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t)) } function Dn(t) { t.readyState = 4, t.l = null, t.j = null, t.A = null, An(t) } function An(t) { t.onreadystatechange && t.onreadystatechange.call(t) } (D = _n.prototype).open = function (t, e) {
    if (this.readyState != xn) throw this.abort(), Error("Error reopening a connection");
    this.C = t, this.B = e, this.readyState = 1, An(this)
}, D.send = function (t) {
    if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
    this.g = !0;
    const e = { headers: this.v, method: this.C, credentials: this.m, cache: void 0 };
    t && (e.body = t), (this.F || k).fetch(new Request(this.B, e)).then(this.$a.bind(this), this.ka.bind(this))
}, D.abort = function () { this.response = this.responseText = "", this.v = new Headers, this.status = 0, this.j && this.j.cancel("Request was aborted.").catch((() => { })), 1 <= this.readyState && this.g && 4 != this.readyState && (this.g = !1, Dn(this)), this.readyState = xn }, D.$a = function (t) {
    if (this.g && (this.l = t, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = t.headers, this.readyState = 2, An(this)), this.g && (this.readyState = 3, An(this), this.g))) if ("arraybuffer" === this.responseType) t.arrayBuffer().then(this.Ya.bind(this), this.ka.bind(this));
    else if (void 0 !== k.ReadableStream && "body" in t) {
        if (this.j = t.body.getReader(), this.u) {
            if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
            this.response = []
        } else this.response = this.responseText = "", this.A = new TextDecoder;
        Cn(this)
    } else t.text().then(this.Za.bind(this), this.ka.bind(this))
}, D.Xa = function (t) {
    if (this.g) {
        if (this.u && t.value) this.response.push(t.value);
        else if (!this.u) {
            var e = t.value ? t.value : new Uint8Array(0);
            (e = this.A.decode(e, { stream: !t.done })) && (this.response = this.responseText += e)
        } t.done ? Dn(this) : An(this), 3 == this.readyState && Cn(this)
    }
}, D.Za = function (t) { this.g && (this.response = this.responseText = t, Dn(this)) }, D.Ya = function (t) { this.g && (this.response = t, Dn(this)) }, D.ka = function () { this.g && Dn(this) }, D.setRequestHeader = function (t, e) { this.v.append(t, e) }, D.getResponseHeader = function (t) { return this.h && this.h.get(t.toLowerCase()) || "" }, D.getAllResponseHeaders = function () {
    if (!this.h) return "";
    const t = [], e = this.h.entries();
    for (var n = e.next();
        !n.done;
    )n = n.value, t.push(n[0] + ": " + n[1]), n = e.next();
    return t.join("\r\n")
}, Object.defineProperty(_n.prototype, "withCredentials", { get: function () { return "include" === this.m }, set: function (t) { this.m = t ? "include" : "same-origin" } });
var Nn = k.JSON.parse;
function kn(t) { Pt.call(this), this.headers = new Map, this.u = t || null, this.h = !1, this.C = this.g = null, this.I = "", this.m = 0, this.j = "", this.l = this.G = this.v = this.F = !1, this.B = 0, this.A = null, this.K = Rn, this.L = this.M = !1 } q(kn, Pt);
var Rn = "", Mn = /^https?$/i, Fn = ["POST", "PUT"];
function On(t, e) { t.h = !1, t.g && (t.l = !0, t.g.abort(), t.l = !1), t.j = e, t.m = 5, Ln(t), Vn(t) } function Ln(t) { t.F || (t.F = !0, Vt(t, "complete"), Vt(t, "error")) } function Pn(t) {
    if (t.h && void 0 !== N && (!t.C[1] || 4 != qn(t) || 2 != t.da())) if (t.v && 4 == qn(t)) Zt(t.La, 0, t);
    else if (Vt(t, "readystatechange"), 4 == qn(t)) {
        t.h = !1;
        try {
            const o = t.da();
            t: switch (o) {
                case 200: case 201: case 202: case 204: case 206: case 304: case 1223: var e = !0;
                    break t;
                default: e = !1
            }var n;
            if (!(n = e)) {
                var r;
                if (r = 0 === o) {
                    var s = String(t.I).match(Ge)[1] || null;
                    !s && k.self && k.self.location && (s = k.self.location.protocol.slice(0, -1)), r = !Mn.test(s ? s.toLowerCase() : "")
                } n = r
            } if (n) Vt(t, "complete"), Vt(t, "success");
            else {
                t.m = 6;
                try { var i = 2 < qn(t) ? t.g.statusText : "" } catch (t) { i = "" } t.j = i + " [" + t.da() + "]", Ln(t)
            }
        } finally { Vn(t) }
    }
} function Vn(t, e) {
    if (t.g) {
        Bn(t);
        const n = t.g, r = t.C[0] ? () => { } : null;
        t.g = null, t.C = null, e || Vt(t, "ready");
        try { n.onreadystatechange = r } catch (t) { }
    }
} function Bn(t) { t.g && t.L && (t.g.ontimeout = null), t.A && (k.clearTimeout(t.A), t.A = null) } function qn(t) { return t.g ? t.g.readyState : 0 } function Un(t) {
    try {
        if (!t.g) return null;
        if ("response" in t.g) return t.g.response;
        switch (t.K) {
            case Rn: case "text": return t.g.responseText;
            case "arraybuffer": if ("mozResponseArrayBuffer" in t.g) return t.g.mozResponseArrayBuffer
        }return null
    } catch (t) { return null }
} function jn(t) {
    let e = "";
    return wt(t, (function (t, n) { e += n, e += ":", e += t, e += "\r\n" })), e
} function zn(t, e, n) {
    t: {
        for (r in n) {
            var r = !1;
            break t
        } r = !0
    } r || (n = jn(n), "string" == typeof t ? null != n && encodeURIComponent(String(n)) : Xe(t, e, n))
} function Gn(t, e, n) { return n && n.internalChannelParams && n.internalChannelParams[t] || e } function Kn(t) { this.Ga = 0, this.j = [], this.l = new oe, this.pa = this.wa = this.I = this.Y = this.g = this.Da = this.F = this.na = this.o = this.U = this.s = null, this.fb = this.W = 0, this.cb = Gn("failFast", !1, t), this.G = this.v = this.u = this.m = this.h = null, this.aa = !0, this.Fa = this.V = -1, this.ba = this.A = this.C = 0, this.ab = Gn("baseRetryDelayMs", 5e3, t), this.hb = Gn("retryDelaySeedMs", 1e4, t), this.eb = Gn("forwardChannelMaxRetries", 2, t), this.xa = Gn("forwardChannelRequestTimeoutMs", 2e4, t), this.va = t && t.xmlHttpFactory || void 0, this.Ha = t && t.dc || !1, this.L = void 0, this.J = t && t.supportsCrossDomainXhr || !1, this.K = "", this.i = new fn(t && t.concurrentRequestLimit), this.Ja = new In, this.P = t && t.fastHandshake || !1, this.O = t && t.encodeInitMessageHeaders || !1, this.P && this.O && (this.O = !1), this.bb = t && t.bc || !1, t && t.Ea && this.l.Ea(), t && t.forceLongPolling && (this.aa = !1), this.ca = !this.P && this.aa && t && t.detectBufferingProxy || !1, this.qa = void 0, t && t.longPollingTimeout && 0 < t.longPollingTimeout && (this.qa = t.longPollingTimeout), this.oa = void 0, this.S = 0, this.M = !1, this.ma = this.B = null } function $n(t) {
    if (Hn(t), 3 == t.H) {
        var e = t.W++, n = $e(t.I);
        if (Xe(n, "SID", t.K), Xe(n, "RID", e), Xe(n, "TYPE", "terminate"), Yn(t, n), (e = new Ce(t, t.l, e)).L = 2, e.v = Ye($e(n)), n = !1, k.navigator && k.navigator.sendBeacon) try { n = k.navigator.sendBeacon(e.v.toString(), "") } catch (t) { } !n && k.Image && ((new Image).src = e.v, n = !0), n || (e.g = ur(e.l, null), e.g.ha(e.v)), e.G = Date.now(), Pe(e)
    } ar(t)
} function Qn(t) { t.g && (er(t), t.g.cancel(), t.g = null) } function Hn(t) { Qn(t), t.u && (k.clearTimeout(t.u), t.u = null), rr(t), t.i.cancel(), t.m && ("number" == typeof t.m && k.clearTimeout(t.m), t.m = null) } function Wn(t) {
    if (!mn(t.i) && !t.m) {
        t.m = !0;
        var e = t.Na;
        $t || Wt(), Qt || ($t(), Qt = !0), Ht.add(e, t), t.C = 0
    }
} function Xn(t, e) {
    var n;
    n = e ? e.m : t.W++;
    const r = $e(t.I);
    Xe(r, "SID", t.K), Xe(r, "RID", n), Xe(r, "AID", t.V), Yn(t, r), t.o && t.s && zn(r, t.o, t.s), n = new Ce(t, t.l, n, t.C + 1), null === t.o && (n.I = t.s), e && (t.j = e.F.concat(t.j)), e = Jn(t, n, 1e3), n.setTimeout(Math.round(.5 * t.xa) + Math.round(.5 * t.xa * Math.random())), wn(t.i, n), Re(n, r, e)
} function Yn(t, e) { t.na && wt(t.na, (function (t, n) { Xe(e, n, t) })), t.h && ze({}, (function (t, n) { Xe(e, n, t) })) } function Jn(t, e, n) {
    n = Math.min(t.j.length, n);
    var r = t.h ? V(t.h.Va, t.h, t) : null;
    t: {
        var s = t.j;
        let e = -1;
        for (;
            ;
        ) {
            const t = ["count=" + n];
            -1 == e ? 0 < n ? (e = s[0].g, t.push("ofs=" + e)) : e = 0 : t.push("ofs=" + e);
            let i = !0;
            for (let o = 0;
                o < n;
                o++) {
                    let n = s[o].g;
                const a = s[o].map;
                if (n -= e, 0 > n) e = Math.max(0, s[o].g - 100), i = !1;
                else try { En(a, t, "req" + n + "_") } catch (t) { r && r(a) }
            } if (i) {
                r = t.join("&");
                break t
            }
        }
    } return t = t.j.splice(0, n), e.F = t, r
} function Zn(t) {
    if (!t.g && !t.u) {
        t.ba = 1;
        var e = t.Ma;
        $t || Wt(), Qt || ($t(), Qt = !0), Ht.add(e, t), t.A = 0
    }
} function tr(t) { return !(t.g || t.u || 3 <= t.A) && (t.ba++, t.u = pe(V(t.Ma, t), ir(t, t.A)), t.A++, !0) } function er(t) { null != t.B && (k.clearTimeout(t.B), t.B = null) } function nr(t) {
    t.g = new Ce(t, t.l, "rpc", t.ba), null === t.o && (t.g.I = t.s), t.g.O = 0;
    var e = $e(t.wa);
    Xe(e, "RID", "rpc"), Xe(e, "SID", t.K), Xe(e, "AID", t.V), Xe(e, "CI", t.G ? "0" : "1"), !t.G && t.qa && Xe(e, "TO", t.qa), Xe(e, "TYPE", "xmlhttp"), Yn(t, e), t.o && t.s && zn(e, t.o, t.s), t.L && t.g.setTimeout(t.L);
    var n = t.g;
    t = t.pa, n.L = 1, n.v = Ye($e(e)), n.s = null, n.S = !0, Me(n, t)
} function rr(t) { null != t.v && (k.clearTimeout(t.v), t.v = null) } function sr(t, e) {
    var n = null;
    if (t.g == e) {
        rr(t), er(t), t.g = null;
        var r = 2
    } else {
        if (!yn(t.i, e)) return;
        n = e.F, vn(t.i, e), r = 1
    } if (0 != t.H) if (e.i) if (1 == r) {
        n = e.s ? e.s.length : 0, e = Date.now() - e.G;
        var s = t.C;
        Vt(r = le(), new me(r, n)), Wn(t)
    } else Zn(t);
    else if (3 == (s = e.o) || 0 == s && 0 < e.ca || !(1 == r && function (t, e) { return !(pn(t.i) >= t.i.j - (t.m ? 1 : 0) || (t.m ? (t.j = e.F.concat(t.j), 0) : 1 == t.H || 2 == t.H || t.C >= (t.cb ? 0 : t.eb) || (t.m = pe(V(t.Na, t, e), ir(t, t.C)), t.C++, 0))) }(t, e) || 2 == r && tr(t))) switch (n && 0 < n.length && (e = t.i, e.i = e.i.concat(n)), s) {
        case 1: or(t, 5);
            break;
        case 4: or(t, 10);
            break;
        case 3: or(t, 6);
            break;
        default: or(t, 2)
    }
} function ir(t, e) {
    let n = t.ab + Math.floor(Math.random() * t.hb);
    return t.isActive() || (n *= 2), n * e
} function or(t, e) {
    if (t.l.info("Error code " + e), 2 == e) {
        var n = null;
        t.h && (n = null);
        var r = V(t.pb, t);
        n || (n = new Ke("//www.google.com/images/cleardot.gif"), k.location && "http" == k.location.protocol || Qe(n, "https"), Ye(n)), function (t, e) {
            const n = new oe;
            if (k.Image) {
                const r = new Image;
                r.onload = B(Tn, n, r, "TestLoadImage: loaded", !0, e), r.onerror = B(Tn, n, r, "TestLoadImage: error", !1, e), r.onabort = B(Tn, n, r, "TestLoadImage: abort", !1, e), r.ontimeout = B(Tn, n, r, "TestLoadImage: timeout", !1, e), k.setTimeout((function () { r.ontimeout && r.ontimeout() }), 1e4), r.src = t
            } else e(!1)
        }(n.toString(), r)
    } else ge(2);
    t.H = 0, t.h && t.h.za(e), ar(t), Hn(t)
} function ar(t) {
    if (t.H = 0, t.ma = [], t.h) {
        const e = bn(t.i);
        0 == e.length && 0 == t.j.length || (G(t.ma, e), G(t.ma, t.j), t.i.i.length = 0, z(t.j), t.j.length = 0), t.h.ya()
    }
} function cr(t, e, n) {
    var r = n instanceof Ke ? $e(n) : new Ke(n);
    if ("" != r.g) e && (r.g = e + "." + r.g), He(r, r.m);
    else {
        var s = k.location;
        r = s.protocol, e = e ? e + "." + s.hostname : s.hostname, s = +s.port;
        var i = new Ke(null);
        r && Qe(i, r), e && (i.g = e), s && He(i, s), n && (i.l = n), r = i
    } return n = t.F, e = t.Da, n && e && Xe(r, n, e), Xe(r, "VER", t.ra), Yn(t, r), r
} function ur(t, e, n) {
    if (e && !t.J) throw Error("Can't create secondary domain capable XhrIo object.");
    return (e = n && t.Ha && !t.va ? new kn(new Sn({ ob: !0 })) : new kn(t.va)).Oa(t.J), e
} function lr() { } function hr() { if (et && !(10 <= Number(ht))) throw Error("Environmental error: no available transport.") } function dr(t, e) { Pt.call(this), this.g = new Kn(e), this.l = t, this.h = e && e.messageUrlParams || null, t = e && e.messageHeaders || null, e && e.clientProtocolHeaderRequired && (t ? t["X-Client-Protocol"] = "webchannel" : t = { "X-Client-Protocol": "webchannel" }), this.g.s = t, t = e && e.initMessageHeaders || null, e && e.messageContentType && (t ? t["X-WebChannel-Content-Type"] = e.messageContentType : t = { "X-WebChannel-Content-Type": e.messageContentType }), e && e.Ca && (t ? t["X-WebChannel-Client-Profile"] = e.Ca : t = { "X-WebChannel-Client-Profile": e.Ca }), this.g.U = t, (t = e && e.cc) && !Q(t) && (this.g.o = t), this.A = e && e.supportsCrossDomainXhr || !1, this.v = e && e.sendRawJson || !1, (e = e && e.httpSessionIdParam) && !Q(e) && (this.g.F = e, null !== (t = this.h) && e in t && (e in (t = this.h) && delete t[e])), this.j = new mr(this) } function fr(t) {
    Se.call(this), t.__headers__ && (this.headers = t.__headers__, this.statusCode = t.__status__, delete t.__headers__, delete t.__status__);
    var e = t.__sm__;
    if (e) {
        t: {
            for (const n in e) {
                t = n;
                break t
            } t = void 0
        } (this.i = t) && (t = this.i, e = null !== e && t in e ? e[t] : void 0), this.data = e
    } else this.data = t
} function gr() { _e.call(this), this.status = 1 } function mr(t) { this.g = t } function pr() { this.blockSize = -1, this.blockSize = 64, this.g = Array(4), this.m = Array(this.blockSize), this.i = this.h = 0, this.reset() } function yr(t, e, n) {
    n || (n = 0);
    var r = Array(16);
    if ("string" == typeof e) for (var s = 0;
        16 > s;
        ++s)r[s] = e.charCodeAt(n++) | e.charCodeAt(n++) << 8 | e.charCodeAt(n++) << 16 | e.charCodeAt(n++) << 24;
    else for (s = 0;
        16 > s;
        ++s)r[s] = e[n++] | e[n++] << 8 | e[n++] << 16 | e[n++] << 24;
    e = t.g[0], n = t.g[1], s = t.g[2];
    var i = t.g[3], o = e + (i ^ n & (s ^ i)) + r[0] + 3614090360 & 4294967295;
    o = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = (n = (s = (i = (e = n + (o << 7 & 4294967295 | o >>> 25)) + ((o = i + (s ^ e & (n ^ s)) + r[1] + 3905402710 & 4294967295) << 12 & 4294967295 | o >>> 20)) + ((o = s + (n ^ i & (e ^ n)) + r[2] + 606105819 & 4294967295) << 17 & 4294967295 | o >>> 15)) + ((o = n + (e ^ s & (i ^ e)) + r[3] + 3250441966 & 4294967295) << 22 & 4294967295 | o >>> 10)) + ((o = e + (i ^ n & (s ^ i)) + r[4] + 4118548399 & 4294967295) << 7 & 4294967295 | o >>> 25)) + ((o = i + (s ^ e & (n ^ s)) + r[5] + 1200080426 & 4294967295) << 12 & 4294967295 | o >>> 20)) + ((o = s + (n ^ i & (e ^ n)) + r[6] + 2821735955 & 4294967295) << 17 & 4294967295 | o >>> 15)) + ((o = n + (e ^ s & (i ^ e)) + r[7] + 4249261313 & 4294967295) << 22 & 4294967295 | o >>> 10)) + ((o = e + (i ^ n & (s ^ i)) + r[8] + 1770035416 & 4294967295) << 7 & 4294967295 | o >>> 25)) + ((o = i + (s ^ e & (n ^ s)) + r[9] + 2336552879 & 4294967295) << 12 & 4294967295 | o >>> 20)) + ((o = s + (n ^ i & (e ^ n)) + r[10] + 4294925233 & 4294967295) << 17 & 4294967295 | o >>> 15)) + ((o = n + (e ^ s & (i ^ e)) + r[11] + 2304563134 & 4294967295) << 22 & 4294967295 | o >>> 10)) + ((o = e + (i ^ n & (s ^ i)) + r[12] + 1804603682 & 4294967295) << 7 & 4294967295 | o >>> 25)) + ((o = i + (s ^ e & (n ^ s)) + r[13] + 4254626195 & 4294967295) << 12 & 4294967295 | o >>> 20)) + ((o = s + (n ^ i & (e ^ n)) + r[14] + 2792965006 & 4294967295) << 17 & 4294967295 | o >>> 15)) + ((o = n + (e ^ s & (i ^ e)) + r[15] + 1236535329 & 4294967295) << 22 & 4294967295 | o >>> 10)) + ((o = e + (s ^ i & (n ^ s)) + r[1] + 4129170786 & 4294967295) << 5 & 4294967295 | o >>> 27)) + ((o = i + (n ^ s & (e ^ n)) + r[6] + 3225465664 & 4294967295) << 9 & 4294967295 | o >>> 23)) + ((o = s + (e ^ n & (i ^ e)) + r[11] + 643717713 & 4294967295) << 14 & 4294967295 | o >>> 18)) + ((o = n + (i ^ e & (s ^ i)) + r[0] + 3921069994 & 4294967295) << 20 & 4294967295 | o >>> 12)) + ((o = e + (s ^ i & (n ^ s)) + r[5] + 3593408605 & 4294967295) << 5 & 4294967295 | o >>> 27)) + ((o = i + (n ^ s & (e ^ n)) + r[10] + 38016083 & 4294967295) << 9 & 4294967295 | o >>> 23)) + ((o = s + (e ^ n & (i ^ e)) + r[15] + 3634488961 & 4294967295) << 14 & 4294967295 | o >>> 18)) + ((o = n + (i ^ e & (s ^ i)) + r[4] + 3889429448 & 4294967295) << 20 & 4294967295 | o >>> 12)) + ((o = e + (s ^ i & (n ^ s)) + r[9] + 568446438 & 4294967295) << 5 & 4294967295 | o >>> 27)) + ((o = i + (n ^ s & (e ^ n)) + r[14] + 3275163606 & 4294967295) << 9 & 4294967295 | o >>> 23)) + ((o = s + (e ^ n & (i ^ e)) + r[3] + 4107603335 & 4294967295) << 14 & 4294967295 | o >>> 18)) + ((o = n + (i ^ e & (s ^ i)) + r[8] + 1163531501 & 4294967295) << 20 & 4294967295 | o >>> 12)) + ((o = e + (s ^ i & (n ^ s)) + r[13] + 2850285829 & 4294967295) << 5 & 4294967295 | o >>> 27)) + ((o = i + (n ^ s & (e ^ n)) + r[2] + 4243563512 & 4294967295) << 9 & 4294967295 | o >>> 23)) + ((o = s + (e ^ n & (i ^ e)) + r[7] + 1735328473 & 4294967295) << 14 & 4294967295 | o >>> 18)) + ((o = n + (i ^ e & (s ^ i)) + r[12] + 2368359562 & 4294967295) << 20 & 4294967295 | o >>> 12)) + ((o = e + (n ^ s ^ i) + r[5] + 4294588738 & 4294967295) << 4 & 4294967295 | o >>> 28)) + ((o = i + (e ^ n ^ s) + r[8] + 2272392833 & 4294967295) << 11 & 4294967295 | o >>> 21)) + ((o = s + (i ^ e ^ n) + r[11] + 1839030562 & 4294967295) << 16 & 4294967295 | o >>> 16)) + ((o = n + (s ^ i ^ e) + r[14] + 4259657740 & 4294967295) << 23 & 4294967295 | o >>> 9)) + ((o = e + (n ^ s ^ i) + r[1] + 2763975236 & 4294967295) << 4 & 4294967295 | o >>> 28)) + ((o = i + (e ^ n ^ s) + r[4] + 1272893353 & 4294967295) << 11 & 4294967295 | o >>> 21)) + ((o = s + (i ^ e ^ n) + r[7] + 4139469664 & 4294967295) << 16 & 4294967295 | o >>> 16)) + ((o = n + (s ^ i ^ e) + r[10] + 3200236656 & 4294967295) << 23 & 4294967295 | o >>> 9)) + ((o = e + (n ^ s ^ i) + r[13] + 681279174 & 4294967295) << 4 & 4294967295 | o >>> 28)) + ((o = i + (e ^ n ^ s) + r[0] + 3936430074 & 4294967295) << 11 & 4294967295 | o >>> 21)) + ((o = s + (i ^ e ^ n) + r[3] + 3572445317 & 4294967295) << 16 & 4294967295 | o >>> 16)) + ((o = n + (s ^ i ^ e) + r[6] + 76029189 & 4294967295) << 23 & 4294967295 | o >>> 9)) + ((o = e + (n ^ s ^ i) + r[9] + 3654602809 & 4294967295) << 4 & 4294967295 | o >>> 28)) + ((o = i + (e ^ n ^ s) + r[12] + 3873151461 & 4294967295) << 11 & 4294967295 | o >>> 21)) + ((o = s + (i ^ e ^ n) + r[15] + 530742520 & 4294967295) << 16 & 4294967295 | o >>> 16)) + ((o = n + (s ^ i ^ e) + r[2] + 3299628645 & 4294967295) << 23 & 4294967295 | o >>> 9)) + ((o = e + (s ^ (n | ~i)) + r[0] + 4096336452 & 4294967295) << 6 & 4294967295 | o >>> 26)) + ((o = i + (n ^ (e | ~s)) + r[7] + 1126891415 & 4294967295) << 10 & 4294967295 | o >>> 22)) + ((o = s + (e ^ (i | ~n)) + r[14] + 2878612391 & 4294967295) << 15 & 4294967295 | o >>> 17)) + ((o = n + (i ^ (s | ~e)) + r[5] + 4237533241 & 4294967295) << 21 & 4294967295 | o >>> 11)) + ((o = e + (s ^ (n | ~i)) + r[12] + 1700485571 & 4294967295) << 6 & 4294967295 | o >>> 26)) + ((o = i + (n ^ (e | ~s)) + r[3] + 2399980690 & 4294967295) << 10 & 4294967295 | o >>> 22)) + ((o = s + (e ^ (i | ~n)) + r[10] + 4293915773 & 4294967295) << 15 & 4294967295 | o >>> 17)) + ((o = n + (i ^ (s | ~e)) + r[1] + 2240044497 & 4294967295) << 21 & 4294967295 | o >>> 11)) + ((o = e + (s ^ (n | ~i)) + r[8] + 1873313359 & 4294967295) << 6 & 4294967295 | o >>> 26)) + ((o = i + (n ^ (e | ~s)) + r[15] + 4264355552 & 4294967295) << 10 & 4294967295 | o >>> 22)) + ((o = s + (e ^ (i | ~n)) + r[6] + 2734768916 & 4294967295) << 15 & 4294967295 | o >>> 17)) + ((o = n + (i ^ (s | ~e)) + r[13] + 1309151649 & 4294967295) << 21 & 4294967295 | o >>> 11)) + ((i = (e = n + ((o = e + (s ^ (n | ~i)) + r[4] + 4149444226 & 4294967295) << 6 & 4294967295 | o >>> 26)) + ((o = i + (n ^ (e | ~s)) + r[11] + 3174756917 & 4294967295) << 10 & 4294967295 | o >>> 22)) ^ ((s = i + ((o = s + (e ^ (i | ~n)) + r[2] + 718787259 & 4294967295) << 15 & 4294967295 | o >>> 17)) | ~e)) + r[9] + 3951481745 & 4294967295, t.g[0] = t.g[0] + e & 4294967295, t.g[1] = t.g[1] + (s + (o << 21 & 4294967295 | o >>> 11)) & 4294967295, t.g[2] = t.g[2] + s & 4294967295, t.g[3] = t.g[3] + i & 4294967295
} function wr(t, e) {
    this.h = e;
    for (var n = [], r = !0, s = t.length - 1;
        0 <= s;
        s--) {
            var i = 0 | t[s];
        r && i == e || (n[s] = i, r = !1)
    } this.g = n
} (D = kn.prototype).Oa = function (t) { this.M = t }, D.ha = function (t, e, n, r) {
    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.I + "; 
 newUri = " + t); 
 e = e ? e.toUpperCase() : "GET", this.I = t, this.j = "", this.m = 0, this.F = !1, this.h = !0, this.g = this.u ? this.u.g() : Ee.g(), this.C = this.u ? be(this.u) : be(Ee), this.g.onreadystatechange = V(this.La, this);
    try { this.G = !0, this.g.open(e, String(t), !0), this.G = !1 } catch (t) { return void On(this, t) } if (t = n || "", n = new Map(this.headers), r) if (Object.getPrototypeOf(r) === Object.prototype) for (var s in r) n.set(s, r[s]);
    else {
        if ("function" != typeof r.keys || "function" != typeof r.get) throw Error("Unknown input type for opt_headers: " + String(r));
        for (const t of r.keys()) n.set(t, r.get(t))
    } r = Array.from(n.keys()).find((t => "content-type" == t.toLowerCase())), s = k.FormData && t instanceof k.FormData, !(0 <= j(Fn, e)) || r || s || n.set("Content-Type", "application/x-www-form-urlencoded; 
charset = utf - 8"); 
 for (const [t, e] of n) this.g.setRequestHeader(t, e);
    this.K && (this.g.responseType = this.K), "withCredentials" in this.g && this.g.withCredentials !== this.M && (this.g.withCredentials = this.M);
    try { Bn(this), 0 < this.B && ((this.L = function (t) { return et && "number" == typeof t.timeout && void 0 !== t.ontimeout }(this.g)) ? (this.g.timeout = this.B, this.g.ontimeout = V(this.ua, this)) : this.A = Zt(this.ua, this.B, this)), this.v = !0, this.g.send(t), this.v = !1 } catch (t) { On(this, t) }
}, D.ua = function () { void 0 !== N && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, Vt(this, "timeout"), this.abort(8)) }, D.abort = function (t) { this.g && this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1, this.m = t || 7, Vt(this, "complete"), Vt(this, "abort"), Vn(this)) }, D.N = function () { this.g && (this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1), Vn(this, !0)), kn.$.N.call(this) }, D.La = function () { this.s || (this.G || this.v || this.l ? Pn(this) : this.kb()) }, D.kb = function () { Pn(this) }, D.isActive = function () { return !!this.g }, D.da = function () { try { return 2 < qn(this) ? this.g.status : -1 } catch (t) { return -1 } }, D.ja = function () { try { return this.g ? this.g.responseText : "" } catch (t) { return "" } }, D.Wa = function (t) {
    if (this.g) {
        var e = this.g.responseText;
        return t && 0 == e.indexOf(t) && (e = e.substring(t.length)), Nn(e)
    }
}, D.Ia = function () { return this.m }, D.Sa = function () { return "string" == typeof this.j ? this.j : String(this.j) }, (D = Kn.prototype).ra = 8, D.H = 1, D.Na = function (t) {
    if (this.m) if (this.m = null, 1 == this.H) {
        if (!t) {
            this.W = Math.floor(1e5 * Math.random()), t = this.W++;
            const s = new Ce(this, this.l, t);
            let i = this.s;
            if (this.U && (i ? (i = vt(i), It(i, this.U)) : i = this.U), null !== this.o || this.O || (s.I = i, i = null), this.P) t: {
                for (var e = 0, n = 0;
                    n < this.j.length;
                    n++) {
                        var r = this.j[n];
                    if (void 0 === (r = "__data__" in r.map && "string" == typeof (r = r.map.__data__) ? r.length : void 0)) break;
                    if (4096 < (e += r)) {
                        e = n;
                        break t
                    } if (4096 === e || n === this.j.length - 1) {
                        e = n + 1;
                        break t
                    }
                } e = 1e3
            } else e = 1e3;
            e = Jn(this, s, e), Xe(n = $e(this.I), "RID", t), Xe(n, "CVER", 22), this.F && Xe(n, "X-HTTP-Session-Id", this.F), Yn(this, n), i && (this.O ? e = "headers=" + encodeURIComponent(String(jn(i))) + "&" + e : this.o && zn(n, this.o, i)), wn(this.i, s), this.bb && Xe(n, "TYPE", "init"), this.P ? (Xe(n, "$req", e), Xe(n, "SID", "null"), s.aa = !0, Re(s, n, null)) : Re(s, n, e), this.H = 2
        }
    } else 3 == this.H && (t ? Xn(this, t) : 0 == this.j.length || mn(this.i) || Xn(this))
}, D.Ma = function () {
    if (this.u = null, nr(this), this.ca && !(this.M || null == this.g || 0 >= this.S)) {
        var t = 2 * this.S;
        this.l.info("BP detection timer enabled: " + t), this.B = pe(V(this.jb, this), t)
    }
}, D.jb = function () { this.B && (this.B = null, this.l.info("BP detection timeout reached."), this.l.info("Buffering proxy detected and switch to long-polling!"), this.G = !1, this.M = !0, ge(10), Qn(this), nr(this)) }, D.ib = function () { null != this.v && (this.v = null, Qn(this), tr(this), ge(19)) }, D.pb = function (t) { t ? (this.l.info("Successfully pinged google.com"), ge(2)) : (this.l.info("Failed to ping google.com"), ge(1)) }, D.isActive = function () { return !!this.h && this.h.isActive(this) }, (D = lr.prototype).Ba = function () { }, D.Aa = function () { }, D.za = function () { }, D.ya = function () { }, D.isActive = function () { return !0 }, D.Va = function () { }, hr.prototype.g = function (t, e) { return new dr(t, e) }, q(dr, Pt), dr.prototype.m = function () {
    this.g.h = this.j, this.A && (this.g.J = !0);
    var t = this.g, e = this.l, n = this.h || void 0;
    ge(0), t.Y = e, t.na = n || {}, t.G = t.aa, t.I = cr(t, null, t.Y), Wn(t)
}, dr.prototype.close = function () { $n(this.g) }, dr.prototype.u = function (t) {
    var e = this.g;
    if ("string" == typeof t) {
        var n = {};
        n.__data__ = t, t = n
    } else this.v && ((n = {}).__data__ = qt(t), t = n);
    e.j.push(new class { constructor(t, e) { this.g = t, this.map = e } }(e.fb++, t)), 3 == e.H && Wn(e)
}, dr.prototype.N = function () { this.g.h = null, delete this.j, $n(this.g), delete this.g, dr.$.N.call(this) }, q(fr, Se), q(gr, _e), q(mr, lr), mr.prototype.Ba = function () { Vt(this.g, "a") }, mr.prototype.Aa = function (t) { Vt(this.g, new fr(t)) }, mr.prototype.za = function (t) { Vt(this.g, new gr) }, mr.prototype.ya = function () { Vt(this.g, "b") }, q(pr, (function () { this.blockSize = -1 })), pr.prototype.reset = function () { this.g[0] = 1732584193, this.g[1] = 4023233417, this.g[2] = 2562383102, this.g[3] = 271733878, this.i = this.h = 0 }, pr.prototype.j = function (t, e) {
    void 0 === e && (e = t.length);
    for (var n = e - this.blockSize, r = this.m, s = this.h, i = 0;
        i < e;
    ) {
        if (0 == s) for (;
            i <= n;
        )yr(this, t, i), i += this.blockSize;
        if ("string" == typeof t) {
            for (;
                i < e;
            )if (r[s++] = t.charCodeAt(i++), s == this.blockSize) {
                yr(this, r), s = 0;
                break
            }
        } else for (;
            i < e;
        )if (r[s++] = t[i++], s == this.blockSize) {
            yr(this, r), s = 0;
            break
        }
    } this.h = s, this.i += e
}, pr.prototype.l = function () {
    var t = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
    t[0] = 128;
    for (var e = 1;
        e < t.length - 8;
        ++e)t[e] = 0;
    var n = 8 * this.i;
    for (e = t.length - 8;
        e < t.length;
        ++e)t[e] = 255 & n, n /= 256;
    for (this.j(t), t = Array(16), e = n = 0;
        4 > e;
        ++e)for (var r = 0;
            32 > r;
            r += 8)t[n++] = this.g[e] >>> r & 255;
    return t
};
var vr = {};
function br(t) {
    return -128 <= t && 128 > t ? function (t, e) {
        var n = vr;
        return Object.prototype.hasOwnProperty.call(n, t) ? n[t] : n[t] = e(t)
    }(t, (function (t) { return new wr([0 | t], 0 > t ? -1 : 0) })) : new wr([0 | t], 0 > t ? -1 : 0)
} function Ir(t) {
    if (isNaN(t) || !isFinite(t)) return Tr;
    if (0 > t) return Dr(Ir(-t));
    for (var e = [], n = 1, r = 0;
        t >= n;
        r++)e[r] = t / n | 0, n *= Er;
    return new wr(e, 0)
} var Er = 4294967296, Tr = br(0), Sr = br(1), _r = br(16777216);
function xr(t) {
    if (0 != t.h) return !1;
    for (var e = 0;
        e < t.g.length;
        e++)if (0 != t.g[e]) return !1;
    return !0
} function Cr(t) { return -1 == t.h } function Dr(t) {
    for (var e = t.g.length, n = [], r = 0;
        r < e;
        r++)n[r] = ~t.g[r];
    return new wr(n, ~t.h).add(Sr)
} function Ar(t, e) { return t.add(Dr(e)) } function Nr(t, e) {
    for (;
        (65535 & t[e]) != t[e];
    )t[e + 1] += t[e] >>> 16, t[e] &= 65535, e++
} function kr(t, e) { this.g = t, this.h = e } function Rr(t, e) {
    if (xr(e)) throw Error("division by zero");
    if (xr(t)) return new kr(Tr, Tr);
    if (Cr(t)) return e = Rr(Dr(t), e), new kr(Dr(e.g), Dr(e.h));
    if (Cr(e)) return e = Rr(t, Dr(e)), new kr(Dr(e.g), e.h);
    if (30 < t.g.length) {
        if (Cr(t) || Cr(e)) throw Error("slowDivide_ only works with positive integers.");
        for (var n = Sr, r = e;
            0 >= r.X(t);
        )n = Mr(n), r = Mr(r);
        var s = Fr(n, 1), i = Fr(r, 1);
        for (r = Fr(r, 2), n = Fr(n, 2);
            !xr(r);
        ) {
            var o = i.add(r);
            0 >= o.X(t) && (s = s.add(n), i = o), r = Fr(r, 1), n = Fr(n, 1)
        } return e = Ar(t, s.R(e)), new kr(s, e)
    } for (s = Tr;
        0 <= t.X(e);
    ) {
        for (n = Math.max(1, Math.floor(t.ea() / e.ea())), r = 48 >= (r = Math.ceil(Math.log(n) / Math.LN2)) ? 1 : Math.pow(2, r - 48), o = (i = Ir(n)).R(e);
            Cr(o) || 0 < o.X(t);
        )o = (i = Ir(n -= r)).R(e);
        xr(i) && (i = Sr), s = s.add(i), t = Ar(t, o)
    } return new kr(s, t)
} function Mr(t) {
    for (var e = t.g.length + 1, n = [], r = 0;
        r < e;
        r++)n[r] = t.D(r) << 1 | t.D(r - 1) >>> 31;
    return new wr(n, t.h)
} function Fr(t, e) {
    var n = e >> 5;
    e %= 32;
    for (var r = t.g.length - n, s = [], i = 0;
        i < r;
        i++)s[i] = 0 < e ? t.D(i + n) >>> e | t.D(i + n + 1) << 32 - e : t.D(i + n);
    return new wr(s, t.h)
} (D = wr.prototype).ea = function () {
    if (Cr(this)) return -Dr(this).ea();
    for (var t = 0, e = 1, n = 0;
        n < this.g.length;
        n++) {
            var r = this.D(n);
        t += (0 <= r ? r : Er + r) * e, e *= Er
    } return t
}, D.toString = function (t) {
    if (2 > (t = t || 10) || 36 < t) throw Error("radix out of range: " + t);
    if (xr(this)) return "0";
    if (Cr(this)) return "-" + Dr(this).toString(t);
    for (var e = Ir(Math.pow(t, 6)), n = this, r = "";
        ;
    ) {
        var s = Rr(n, e).g, i = ((0 < (n = Ar(n, s.R(e))).g.length ? n.g[0] : n.h) >>> 0).toString(t);
        if (xr(n = s)) return i + r;
        for (;
            6 > i.length;
        )i = "0" + i;
        r = i + r
    }
}, D.D = function (t) { return 0 > t ? 0 : t < this.g.length ? this.g[t] : this.h }, D.X = function (t) { return Cr(t = Ar(this, t)) ? -1 : xr(t) ? 0 : 1 }, D.abs = function () { return Cr(this) ? Dr(this) : this }, D.add = function (t) {
    for (var e = Math.max(this.g.length, t.g.length), n = [], r = 0, s = 0;
        s <= e;
        s++) {
            var i = r + (65535 & this.D(s)) + (65535 & t.D(s)), o = (i >>> 16) + (this.D(s) >>> 16) + (t.D(s) >>> 16);
        r = o >>> 16, i &= 65535, o &= 65535, n[s] = o << 16 | i
    } return new wr(n, -2147483648 & n[n.length - 1] ? -1 : 0)
}, D.R = function (t) {
    if (xr(this) || xr(t)) return Tr;
    if (Cr(this)) return Cr(t) ? Dr(this).R(Dr(t)) : Dr(Dr(this).R(t));
    if (Cr(t)) return Dr(this.R(Dr(t)));
    if (0 > this.X(_r) && 0 > t.X(_r)) return Ir(this.ea() * t.ea());
    for (var e = this.g.length + t.g.length, n = [], r = 0;
        r < 2 * e;
        r++)n[r] = 0;
    for (r = 0;
        r < this.g.length;
        r++)for (var s = 0;
            s < t.g.length;
            s++) {
                var i = this.D(r) >>> 16, o = 65535 & this.D(r), a = t.D(s) >>> 16, c = 65535 & t.D(s);
            n[2 * r + 2 * s] += o * c, Nr(n, 2 * r + 2 * s), n[2 * r + 2 * s + 1] += i * c, Nr(n, 2 * r + 2 * s + 1), n[2 * r + 2 * s + 1] += o * a, Nr(n, 2 * r + 2 * s + 1), n[2 * r + 2 * s + 2] += i * a, Nr(n, 2 * r + 2 * s + 2)
        } for (r = 0;
        r < e;
        r++)n[r] = n[2 * r + 1] << 16 | n[2 * r];
    for (r = e;
        r < 2 * e;
        r++)n[r] = 0;
    return new wr(n, 0)
}, D.gb = function (t) { return Rr(this, t).h }, D.and = function (t) {
    for (var e = Math.max(this.g.length, t.g.length), n = [], r = 0;
        r < e;
        r++)n[r] = this.D(r) & t.D(r);
    return new wr(n, this.h & t.h)
}, D.or = function (t) {
    for (var e = Math.max(this.g.length, t.g.length), n = [], r = 0;
        r < e;
        r++)n[r] = this.D(r) | t.D(r);
    return new wr(n, this.h | t.h)
}, D.xor = function (t) {
    for (var e = Math.max(this.g.length, t.g.length), n = [], r = 0;
        r < e;
        r++)n[r] = this.D(r) ^ t.D(r);
    return new wr(n, this.h ^ t.h)
}, hr.prototype.createWebChannel = hr.prototype.g, dr.prototype.send = dr.prototype.u, dr.prototype.open = dr.prototype.m, dr.prototype.close = dr.prototype.close, ye.NO_ERROR = 0, ye.TIMEOUT = 8, ye.HTTP_ERROR = 6, we.COMPLETE = "complete", Ie.EventType = Te, Te.OPEN = "a", Te.CLOSE = "b", Te.ERROR = "c", Te.MESSAGE = "d", Pt.prototype.listen = Pt.prototype.O, kn.prototype.listenOnce = kn.prototype.P, kn.prototype.getLastError = kn.prototype.Sa, kn.prototype.getLastErrorCode = kn.prototype.Ia, kn.prototype.getStatus = kn.prototype.da, kn.prototype.getResponseJson = kn.prototype.Wa, kn.prototype.getResponseText = kn.prototype.ja, kn.prototype.send = kn.prototype.ha, kn.prototype.setWithCredentials = kn.prototype.Oa, pr.prototype.digest = pr.prototype.l, pr.prototype.reset = pr.prototype.reset, pr.prototype.update = pr.prototype.j, wr.prototype.add = wr.prototype.add, wr.prototype.multiply = wr.prototype.R, wr.prototype.modulo = wr.prototype.gb, wr.prototype.compare = wr.prototype.X, wr.prototype.toNumber = wr.prototype.ea, wr.prototype.toString = wr.prototype.toString, wr.prototype.getBits = wr.prototype.D, wr.fromNumber = Ir, wr.fromString = function t(e, n) {
    if (0 == e.length) throw Error("number format error: empty string");
    if (2 > (n = n || 10) || 36 < n) throw Error("radix out of range: " + n);
    if ("-" == e.charAt(0)) return Dr(t(e.substring(1), n));
    if (0 <= e.indexOf("-")) throw Error('number format error: interior "-" character');
    for (var r = Ir(Math.pow(n, 8)), s = Tr, i = 0;
        i < e.length;
        i += 8) {
            var o = Math.min(8, e.length - i), a = parseInt(e.substring(i, i + o), n);
        8 > o ? (o = Ir(Math.pow(n, o)), s = s.R(o).add(Ir(a))) : s = (s = s.R(r)).add(Ir(a))
    } return s
};
var Or = ye, Lr = we, Pr = ce, Vr = 10, Br = 11, qr = Sn, Ur = Ie, jr = kn, zr = pr, Gr = wr;
const Kr = "@firebase/firestore";
class $r { constructor(t) { this.uid = t } isAuthenticated() { return null != this.uid } toKey() { return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user" } isEqual(t) { return t.uid === this.uid } } $r.UNAUTHENTICATED = new $r(null), $r.GOOGLE_CREDENTIALS = new $r("google-credentials-uid"), $r.FIRST_PARTY = new $r("first-party-uid"), $r.MOCK_USER = new $r("mock-user");
let Qr = "9.22.2";
const Hr = new class {
    constructor(t) { this.name = t, this._logLevel = _, this._logHandler = C, this._userLogHandler = null } get logLevel() { return this._logLevel } set logLevel(t) {
        if (!(t in T)) throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
        this._logLevel = t
    } setLogLevel(t) { this._logLevel = "string" == typeof t ? S[t] : t } get logHandler() { return this._logHandler } set logHandler(t) {
        if ("function" != typeof t) throw new TypeError("Value assigned to `logHandler` must be a function");
        this._logHandler = t
    } get userLogHandler() { return this._userLogHandler } set userLogHandler(t) { this._userLogHandler = t } debug(...t) { this._userLogHandler && this._userLogHandler(this, T.DEBUG, ...t), this._logHandler(this, T.DEBUG, ...t) } log(...t) { this._userLogHandler && this._userLogHandler(this, T.VERBOSE, ...t), this._logHandler(this, T.VERBOSE, ...t) } info(...t) { this._userLogHandler && this._userLogHandler(this, T.INFO, ...t), this._logHandler(this, T.INFO, ...t) } warn(...t) { this._userLogHandler && this._userLogHandler(this, T.WARN, ...t), this._logHandler(this, T.WARN, ...t) } error(...t) { this._userLogHandler && this._userLogHandler(this, T.ERROR, ...t), this._logHandler(this, T.ERROR, ...t) }
}("@firebase/firestore");
function Wr() { return Hr.logLevel } function Xr(t) { Hr.setLogLevel(t) } function Yr(t, ...e) {
    if (Hr.logLevel <= T.DEBUG) {
        const n = e.map(ts);
        Hr.debug(`Firestore (${Qr}): ${t}`, ...n)
    }
} function Jr(t, ...e) {
    if (Hr.logLevel <= T.ERROR) {
        const n = e.map(ts);
        Hr.error(`Firestore (${Qr}): ${t}`, ...n)
    }
} function Zr(t, ...e) {
    if (Hr.logLevel <= T.WARN) {
        const n = e.map(ts);
        Hr.warn(`Firestore (${Qr}): ${t}`, ...n)
    }
} function ts(t) {
    if ("string" == typeof t) return t;
    try { return e = t, JSON.stringify(e) } catch (e) { return t } var e
} function es(t = "Unexpected state") {
    const e = `FIRESTORE (${Qr}) INTERNAL ASSERTION FAILED: ` + t;
    throw Jr(e), new Error(e)
} function ns(t, e) { t || es() } function rs(t, e) { t || es() } function ss(t, e) { return t } const is = { OK: "ok", CANCELLED: "cancelled", UNKNOWN: "unknown", INVALID_ARGUMENT: "invalid-argument", DEADLINE_EXCEEDED: "deadline-exceeded", NOT_FOUND: "not-found", ALREADY_EXISTS: "already-exists", PERMISSION_DENIED: "permission-denied", UNAUTHENTICATED: "unauthenticated", RESOURCE_EXHAUSTED: "resource-exhausted", FAILED_PRECONDITION: "failed-precondition", ABORTED: "aborted", OUT_OF_RANGE: "out-of-range", UNIMPLEMENTED: "unimplemented", INTERNAL: "internal", UNAVAILABLE: "unavailable", DATA_LOSS: "data-loss" };
class os extends p { constructor(t, e) { super(t, e), this.code = t, this.message = e, this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}` } } class as { constructor() { this.promise = new Promise(((t, e) => { this.resolve = t, this.reject = e })) } } class cs { constructor(t, e) { this.user = e, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", `Bearer ${t}`) } } class us { getToken() { return Promise.resolve(null) } invalidateToken() { } start(t, e) { t.enqueueRetryable((() => e($r.UNAUTHENTICATED))) } shutdown() { } } class ls { constructor(t) { this.token = t, this.changeListener = null } getToken() { return Promise.resolve(this.token) } invalidateToken() { } start(t, e) { this.changeListener = e, t.enqueueRetryable((() => e(this.token.user))) } shutdown() { this.changeListener = null } } class hs {
    constructor(t) { this.t = t, this.currentUser = $r.UNAUTHENTICATED, this.i = 0, this.forceRefresh = !1, this.auth = null } start(t, e) {
        let n = this.i;
        const r = t => this.i !== n ? (n = this.i, e(t)) : Promise.resolve();
        let s = new as;
        this.o = () => { this.i++, this.currentUser = this.u(), s.resolve(), s = new as, t.enqueueRetryable((() => r(this.currentUser))) };
        const i = () => {
            const e = s;
            t.enqueueRetryable((async () => { await e.promise, await r(this.currentUser) }))
        }, o = t => { Yr("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = t, this.auth.addAuthTokenListener(this.o), i() };
        this.t.onInit((t => o(t))), setTimeout((() => {
            if (!this.auth) {
                const t = this.t.getImmediate({ optional: !0 });
                t ? o(t) : (Yr("FirebaseAuthCredentialsProvider", "Auth not yet detected"), s.resolve(), s = new as)
            }
        }), 0), i()
    } getToken() {
        const t = this.i, e = this.forceRefresh;
        return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then((e => this.i !== t ? (Yr("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : e ? (ns("string" == typeof e.accessToken), new cs(e.accessToken, this.currentUser)) : null)) : Promise.resolve(null)
    } invalidateToken() { this.forceRefresh = !0 } shutdown() { this.auth && this.auth.removeAuthTokenListener(this.o) } u() {
        const t = this.auth && this.auth.getUid();
        return ns(null === t || "string" == typeof t), new $r(t)
    }
} class ds {
    constructor(t, e, n) { this.h = t, this.l = e, this.m = n, this.type = "FirstParty", this.user = $r.FIRST_PARTY, this.g = new Map } p() { return this.m ? this.m() : null } get headers() {
        this.g.set("X-Goog-AuthUser", this.h);
        const t = this.p();
        return t && this.g.set("Authorization", t), this.l && this.g.set("X-Goog-Iam-Authorization-Token", this.l), this.g
    }
} class fs { constructor(t, e, n) { this.h = t, this.l = e, this.m = n } getToken() { return Promise.resolve(new ds(this.h, this.l, this.m)) } start(t, e) { t.enqueueRetryable((() => e($r.FIRST_PARTY))) } shutdown() { } invalidateToken() { } } class gs { constructor(t) { this.value = t, this.type = "AppCheck", this.headers = new Map, t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value) } } class ms {
    constructor(t) { this.I = t, this.forceRefresh = !1, this.appCheck = null, this.T = null } start(t, e) {
        const n = t => {
            null != t.error && Yr("FirebaseAppCheckTokenProvider", `Error getting App Check token; 
 using placeholder token instead. Error: ${t.error.message}`);
            const n = t.token !== this.T;
            return this.T = t.token, Yr("FirebaseAppCheckTokenProvider", `Received ${n ? "new" : "existing"} token.`), n ? e(t.token) : Promise.resolve()
        };
        this.o = e => { t.enqueueRetryable((() => n(e))) };
        const r = t => { Yr("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = t, this.appCheck.addTokenListener(this.o) };
        this.I.onInit((t => r(t))), setTimeout((() => {
            if (!this.appCheck) {
                const t = this.I.getImmediate({ optional: !0 });
                t ? r(t) : Yr("FirebaseAppCheckTokenProvider", "AppCheck not yet detected")
            }
        }), 0)
    } getToken() {
        const t = this.forceRefresh;
        return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(t).then((t => t ? (ns("string" == typeof t.token), this.T = t.token, new gs(t.token)) : null)) : Promise.resolve(null)
    } invalidateToken() { this.forceRefresh = !0 } shutdown() { this.appCheck && this.appCheck.removeTokenListener(this.o) }
} class ps { getToken() { return Promise.resolve(new gs("")) } invalidateToken() { } start(t, e) { } shutdown() { } } function ys(t) {
    const e = "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
    if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n);
    else for (let e = 0;
        e < t;
        e++)n[e] = Math.floor(256 * Math.random());
    return n
} class ws {
    static A() {
        const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length;
        let n = "";
        for (;
            n.length < 20;
        ) {
            const r = ys(40);
            for (let s = 0;
                s < r.length;
                ++s)n.length < 20 && r[s] < e && (n += t.charAt(r[s] % t.length))
        } return n
    }
} function vs(t, e) { return t < e ? -1 : t > e ? 1 : 0 } function bs(t, e, n) { return t.length === e.length && t.every(((t, r) => n(t, e[r]))) } function Is(t) { return t + "\0" } class Es {
    constructor(t, e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new os(is.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new os(is.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new os(is.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        if (t >= 253402300800) throw new os(is.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t)
    } static now() { return Es.fromMillis(Date.now()) } static fromDate(t) { return Es.fromMillis(t.getTime()) } static fromMillis(t) {
        const e = Math.floor(t / 1e3), n = Math.floor(1e6 * (t - 1e3 * e));
        return new Es(e, n)
    } toDate() { return new Date(this.toMillis()) } toMillis() { return 1e3 * this.seconds + this.nanoseconds / 1e6 } _compareTo(t) { return this.seconds === t.seconds ? vs(this.nanoseconds, t.nanoseconds) : vs(this.seconds, t.seconds) } isEqual(t) { return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds } toString() { return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")" } toJSON() { return { seconds: this.seconds, nanoseconds: this.nanoseconds } } valueOf() {
        const t = this.seconds - -62135596800;
        return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0")
    }
} class Ts { constructor(t) { this.timestamp = t } static fromTimestamp(t) { return new Ts(t) } static min() { return new Ts(new Es(0, 0)) } static max() { return new Ts(new Es(253402300799, 999999999)) } compareTo(t) { return this.timestamp._compareTo(t.timestamp) } isEqual(t) { return this.timestamp.isEqual(t.timestamp) } toMicroseconds() { return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3 } toString() { return "SnapshotVersion(" + this.timestamp.toString() + ")" } toTimestamp() { return this.timestamp } } class Ss {
    constructor(t, e, n) { void 0 === e ? e = 0 : e > t.length && es(), void 0 === n ? n = t.length - e : n > t.length - e && es(), this.segments = t, this.offset = e, this.len = n } get length() { return this.len } isEqual(t) { return 0 === Ss.comparator(this, t) } child(t) {
        const e = this.segments.slice(this.offset, this.limit());
        return t instanceof Ss ? t.forEach((t => { e.push(t) })) : e.push(t), this.construct(e)
    } limit() { return this.offset + this.length } popFirst(t) { return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t) } popLast() { return this.construct(this.segments, this.offset, this.length - 1) } firstSegment() { return this.segments[this.offset] } lastSegment() { return this.get(this.length - 1) } get(t) { return this.segments[this.offset + t] } isEmpty() { return 0 === this.length } isPrefixOf(t) {
        if (t.length < this.length) return !1;
        for (let e = 0;
            e < this.length;
            e++)if (this.get(e) !== t.get(e)) return !1;
        return !0
    } isImmediateParentOf(t) {
        if (this.length + 1 !== t.length) return !1;
        for (let e = 0;
            e < this.length;
            e++)if (this.get(e) !== t.get(e)) return !1;
        return !0
    } forEach(t) {
        for (let e = this.offset, n = this.limit();
            e < n;
            e++)t(this.segments[e])
    } toArray() { return this.segments.slice(this.offset, this.limit()) } static comparator(t, e) {
        const n = Math.min(t.length, e.length);
        for (let r = 0;
            r < n;
            r++) {
                const n = t.get(r), s = e.get(r);
            if (n < s) return -1;
            if (n > s) return 1
        } return t.length < e.length ? -1 : t.length > e.length ? 1 : 0
    }
} class _s extends Ss {
    construct(t, e, n) { return new _s(t, e, n) } canonicalString() { return this.toArray().join("/") } toString() { return this.canonicalString() } static fromString(...t) {
        const e = [];
        for (const n of t) {
            if (n.indexOf("//") >= 0) throw new os(is.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
            e.push(...n.split("/").filter((t => t.length > 0)))
        } return new _s(e)
    } static emptyPath() { return new _s([]) }
} const xs = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class Cs extends Ss {
    construct(t, e, n) { return new Cs(t, e, n) } static isValidIdentifier(t) { return xs.test(t) } canonicalString() { return this.toArray().map((t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), Cs.isValidIdentifier(t) || (t = "`" + t + "`"), t))).join(".") } toString() { return this.canonicalString() } isKeyField() { return 1 === this.length && "__name__" === this.get(0) } static keyField() { return new Cs(["__name__"]) } static fromServerFormat(t) {
        const e = [];
        let n = "", r = 0;
        const s = () => {
            if (0 === n.length) throw new os(is.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
            e.push(n), n = ""
        };
        let i = !1;
        for (;
            r < t.length;
        ) {
            const e = t[r];
            if ("\\" === e) {
                if (r + 1 === t.length) throw new os(is.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                const e = t[r + 1];
                if ("\\" !== e && "." !== e && "`" !== e) throw new os(is.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                n += e, r += 2
            } else "`" === e ? (i = !i, r++) : "." !== e || i ? (n += e, r++) : (s(), r++)
        } if (s(), i) throw new os(is.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new Cs(e)
    } static emptyPath() { return new Cs([]) }
} class Ds { constructor(t) { this.path = t } static fromPath(t) { return new Ds(_s.fromString(t)) } static fromName(t) { return new Ds(_s.fromString(t).popFirst(5)) } static empty() { return new Ds(_s.emptyPath()) } get collectionGroup() { return this.path.popLast().lastSegment() } hasCollectionId(t) { return this.path.length >= 2 && this.path.get(this.path.length - 2) === t } getCollectionGroup() { return this.path.get(this.path.length - 2) } getCollectionPath() { return this.path.popLast() } isEqual(t) { return null !== t && 0 === _s.comparator(this.path, t.path) } toString() { return this.path.toString() } static comparator(t, e) { return _s.comparator(t.path, e.path) } static isDocumentKey(t) { return t.length % 2 == 0 } static fromSegments(t) { return new Ds(new _s(t.slice())) } } class As { constructor(t, e, n, r) { this.indexId = t, this.collectionGroup = e, this.fields = n, this.indexState = r } } function Ns(t) { return t.fields.find((t => 2 === t.kind)) } function ks(t) { return t.fields.filter((t => 2 !== t.kind)) } function Rs(t, e) {
    let n = vs(t.collectionGroup, e.collectionGroup);
    if (0 !== n) return n;
    for (let r = 0;
        r < Math.min(t.fields.length, e.fields.length);
        ++r)if (n = Fs(t.fields[r], e.fields[r]), 0 !== n) return n;
    return vs(t.fields.length, e.fields.length)
} As.UNKNOWN_ID = -1;
class Ms { constructor(t, e) { this.fieldPath = t, this.kind = e } } function Fs(t, e) {
    const n = Cs.comparator(t.fieldPath, e.fieldPath);
    return 0 !== n ? n : vs(t.kind, e.kind)
} class Os { constructor(t, e) { this.sequenceNumber = t, this.offset = e } static empty() { return new Os(0, Vs.min()) } } function Ls(t, e) {
    const n = t.toTimestamp().seconds, r = t.toTimestamp().nanoseconds + 1, s = Ts.fromTimestamp(1e9 === r ? new Es(n + 1, 0) : new Es(n, r));
    return new Vs(s, Ds.empty(), e)
} function Ps(t) { return new Vs(t.readTime, t.key, -1) } class Vs { constructor(t, e, n) { this.readTime = t, this.documentKey = e, this.largestBatchId = n } static min() { return new Vs(Ts.min(), Ds.empty(), -1) } static max() { return new Vs(Ts.max(), Ds.empty(), -1) } } function Bs(t, e) {
    let n = t.readTime.compareTo(e.readTime);
    return 0 !== n ? n : (n = Ds.comparator(t.documentKey, e.documentKey), 0 !== n ? n : vs(t.largestBatchId, e.largestBatchId))
} const qs = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
class Us { constructor() { this.onCommittedListeners = [] } addOnCommittedListener(t) { this.onCommittedListeners.push(t) } raiseOnCommittedEvent() { this.onCommittedListeners.forEach((t => t())) } } async function js(t) {
    if (t.code !== is.FAILED_PRECONDITION || t.message !== qs) throw t;
    Yr("LocalStore", "Unexpectedly lost primary lease")
} class zs {
    constructor(t) { this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = !1, this.callbackAttached = !1, t((t => { this.isDone = !0, this.result = t, this.nextCallback && this.nextCallback(t) }), (t => { this.isDone = !0, this.error = t, this.catchCallback && this.catchCallback(t) })) } catch(t) { return this.next(void 0, t) } next(t, e) { return this.callbackAttached && es(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(e, this.error) : this.wrapSuccess(t, this.result) : new zs(((n, r) => { this.nextCallback = e => { this.wrapSuccess(t, e).next(n, r) }, this.catchCallback = t => { this.wrapFailure(e, t).next(n, r) } })) } toPromise() { return new Promise(((t, e) => { this.next(t, e) })) } wrapUserFunction(t) {
        try {
            const e = t();
            return e instanceof zs ? e : zs.resolve(e)
        } catch (t) { return zs.reject(t) }
    } wrapSuccess(t, e) { return t ? this.wrapUserFunction((() => t(e))) : zs.resolve(e) } wrapFailure(t, e) { return t ? this.wrapUserFunction((() => t(e))) : zs.reject(e) } static resolve(t) { return new zs(((e, n) => { e(t) })) } static reject(t) { return new zs(((e, n) => { n(t) })) } static waitFor(t) {
        return new zs(((e, n) => {
            let r = 0, s = 0, i = !1;
            t.forEach((t => { ++r, t.next((() => { ++s, i && s === r && e() }), (t => n(t))) })), i = !0, s === r && e()
        }))
    } static or(t) {
        let e = zs.resolve(!1);
        for (const n of t) e = e.next((t => t ? zs.resolve(t) : n()));
        return e
    } static forEach(t, e) {
        const n = [];
        return t.forEach(((t, r) => { n.push(e.call(this, t, r)) })), this.waitFor(n)
    } static mapArray(t, e) {
        return new zs(((n, r) => {
            const s = t.length, i = new Array(s);
            let o = 0;
            for (let a = 0;
                a < s;
                a++) {
                    const c = a;
                e(t[c]).next((t => { i[c] = t, ++o, o === s && n(i) }), (t => r(t)))
            }
        }))
    } static doWhile(t, e) {
        return new zs(((n, r) => {
            const s = () => { !0 === t() ? e().next((() => { s() }), r) : n() };
            s()
        }))
    }
} class Gs {
    constructor(t, e) {
        this.action = t, this.transaction = e, this.aborted = !1, this.v = new as, this.transaction.oncomplete = () => { this.v.resolve() }, this.transaction.onabort = () => { e.error ? this.v.reject(new Qs(t, e.error)) : this.v.resolve() }, this.transaction.onerror = e => {
            const n = Js(e.target.error);
            this.v.reject(new Qs(t, n))
        }
    } static open(t, e, n, r) { try { return new Gs(e, t.transaction(r, n)) } catch (t) { throw new Qs(e, t) } } get R() { return this.v.promise } abort(t) { t && this.v.reject(t), this.aborted || (Yr("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), this.aborted = !0, this.transaction.abort()) } P() {
        const t = this.transaction;
        this.aborted || "function" != typeof t.commit || t.commit()
    } store(t) {
        const e = this.transaction.objectStore(t);
        return new Ws(e)
    }
} class Ks {
    constructor(t, e, n) { this.name = t, this.version = e, this.V = n, 12.2 === Ks.S(g()) && Jr("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.") } static delete(t) { return Yr("SimpleDb", "Removing database:", t), Xs(window.indexedDB.deleteDatabase(t)).toPromise() } static D() {
        if (!function () { try { return "object" == typeof indexedDB } catch (t) { return !1 } }()) return !1;
        if (Ks.C()) return !0;
        const t = g(), e = Ks.S(t), n = 0 < e && e < 10, r = Ks.N(t), s = 0 < r && r < 4.5;
        return !(t.indexOf("MSIE ") > 0 || t.indexOf("Trident/") > 0 || t.indexOf("Edge/") > 0 || n || s)
    } static C() {
        var t;
        return "undefined" != typeof process && "YES" === (null === (t = process.env) || void 0 === t ? void 0 : t.k)
    } static M(t, e) { return t.store(e) } static S(t) {
        const e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n)
    } static N(t) {
        const e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n)
    } async $(t) {
        return this.db || (Yr("SimpleDb", "Opening database:", this.name), this.db = await new Promise(((e, n) => {
            const r = indexedDB.open(this.name, this.version);
            r.onsuccess = t => {
                const n = t.target.result;
                e(n)
            }, r.onblocked = () => { n(new Qs(t, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed.")) }, r.onerror = e => {
                const r = e.target.error;
                "VersionError" === r.name ? n(new os(is.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : "InvalidStateError" === r.name ? n(new os(is.FAILED_PRECONDITION, "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " + r)) : n(new Qs(t, r))
            }, r.onupgradeneeded = t => {
                Yr("SimpleDb", 'Database "' + this.name + '" requires upgrade from version:', t.oldVersion);
                const e = t.target.result;
                this.V.O(e, r.transaction, t.oldVersion, this.version).next((() => { Yr("SimpleDb", "Database upgrade to version " + this.version + " complete") }))
            }
        }))), this.F && (this.db.onversionchange = t => this.F(t)), this.db
    } B(t) { this.F = t, this.db && (this.db.onversionchange = e => t(e)) } async runTransaction(t, e, n, r) {
        const s = "readonly" === e;
        let i = 0;
        for (;
            ;
        ) {
            ++i;
            try {
                this.db = await this.$(t);
                const e = Gs.open(this.db, t, s ? "readonly" : "readwrite", n), i = r(e).next((t => (e.P(), t))).catch((t => (e.abort(t), zs.reject(t)))).toPromise();
                return i.catch((() => { })), await e.R, i
            } catch (t) {
                const e = t, n = "FirebaseError" !== e.name && i < 3;
                if (Yr("SimpleDb", "Transaction failed with error:", e.message, "Retrying:", n), this.close(), !n) return Promise.reject(e)
            }
        }
    } close() { this.db && this.db.close(), this.db = void 0 }
} class $s { constructor(t) { this.L = t, this.q = !1, this.U = null } get isDone() { return this.q } get K() { return this.U } set cursor(t) { this.L = t } done() { this.q = !0 } G(t) { this.U = t } delete() { return Xs(this.L.delete()) } } class Qs extends os { constructor(t, e) { super(is.UNAVAILABLE, `IndexedDB transaction '${t}' failed: ${e}`), this.name = "IndexedDbTransactionError" } } function Hs(t) { return "IndexedDbTransactionError" === t.name } class Ws {
    constructor(t) { this.store = t } put(t, e) {
        let n;
        return void 0 !== e ? (Yr("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (Yr("SimpleDb", "PUT", this.store.name, "<auto-key>", t), n = this.store.put(t)), Xs(n)
    } add(t) { return Yr("SimpleDb", "ADD", this.store.name, t, t), Xs(this.store.add(t)) } get(t) { return Xs(this.store.get(t)).next((e => (void 0 === e && (e = null), Yr("SimpleDb", "GET", this.store.name, t, e), e))) } delete(t) { return Yr("SimpleDb", "DELETE", this.store.name, t), Xs(this.store.delete(t)) } count() { return Yr("SimpleDb", "COUNT", this.store.name), Xs(this.store.count()) } j(t, e) {
        const n = this.options(t, e);
        if (n.index || "function" != typeof this.store.getAll) {
            const t = this.cursor(n), e = [];
            return this.W(t, ((t, n) => { e.push(n) })).next((() => e))
        } {
            const t = this.store.getAll(n.range);
            return new zs(((e, n) => { t.onerror = t => { n(t.target.error) }, t.onsuccess = t => { e(t.target.result) } }))
        }
    } H(t, e) {
        const n = this.store.getAll(t, null === e ? void 0 : e);
        return new zs(((t, e) => { n.onerror = t => { e(t.target.error) }, n.onsuccess = e => { t(e.target.result) } }))
    } J(t, e) {
        Yr("SimpleDb", "DELETE ALL", this.store.name);
        const n = this.options(t, e);
        n.Y = !1;
        const r = this.cursor(n);
        return this.W(r, ((t, e, n) => n.delete()))
    } X(t, e) {
        let n;
        e ? n = t : (n = {}, e = t);
        const r = this.cursor(n);
        return this.W(r, e)
    } Z(t) {
        const e = this.cursor({});
        return new zs(((n, r) => {
            e.onerror = t => {
                const e = Js(t.target.error);
                r(e)
            }, e.onsuccess = e => {
                const r = e.target.result;
                r ? t(r.primaryKey, r.value).next((t => { t ? r.continue() : n() })) : n()
            }
        }))
    } W(t, e) {
        const n = [];
        return new zs(((r, s) => {
            t.onerror = t => { s(t.target.error) }, t.onsuccess = t => {
                const s = t.target.result;
                if (!s) return void r();
                const i = new $s(s), o = e(s.primaryKey, s.value, i);
                if (o instanceof zs) {
                    const t = o.catch((t => (i.done(), zs.reject(t))));
                    n.push(t)
                } i.isDone ? r() : null === i.K ? s.continue() : s.continue(i.K)
            }
        })).next((() => zs.waitFor(n)))
    } options(t, e) {
        let n;
        return void 0 !== t && ("string" == typeof t ? n = t : e = t), { index: n, range: e }
    } cursor(t) {
        let e = "next";
        if (t.reverse && (e = "prev"), t.index) {
            const n = this.store.index(t.index);
            return t.Y ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e)
        } return this.store.openCursor(t.range, e)
    }
} function Xs(t) {
    return new zs(((e, n) => {
        t.onsuccess = t => {
            const n = t.target.result;
            e(n)
        }, t.onerror = t => {
            const e = Js(t.target.error);
            n(e)
        }
    }))
} let Ys = !1;
function Js(t) {
    const e = Ks.S(g());
    if (e >= 12.2 && e < 13) {
        const e = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(e) >= 0) {
            const t = new os("internal", `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);
            return Ys || (Ys = !0, setTimeout((() => { throw t }), 0)), t
        }
    } return t
} class Zs {
    constructor(t, e) { this.asyncQueue = t, this.tt = e, this.task = null } start() { this.et(15e3) } stop() { this.task && (this.task.cancel(), this.task = null) } get started() { return null !== this.task } et(t) {
        Yr("IndexBackiller", `Scheduled in ${t}ms`), this.task = this.asyncQueue.enqueueAfterDelay("index_backfill", t, (async () => {
            this.task = null;
            try { Yr("IndexBackiller", `Documents written: ${await this.tt.nt()}`) } catch (t) { Hs(t) ? Yr("IndexBackiller", "Ignoring IndexedDB error during index backfill: ", t) : await js(t) } await this.et(6e4)
        }))
    }
} class ti {
    constructor(t, e) { this.localStore = t, this.persistence = e } async nt(t = 50) { return this.persistence.runTransaction("Backfill Indexes", "readwrite-primary", (e => this.st(e, t))) } st(t, e) {
        const n = new Set;
        let r = e, s = !0;
        return zs.doWhile((() => !0 === s && r > 0), (() => this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next((e => {
            if (null !== e && !n.has(e)) return Yr("IndexBackiller", `Processing collection: ${e}`), this.it(t, e, r).next((t => { r -= t, n.add(e) }));
            s = !1
        })))).next((() => e - r))
    } it(t, e, n) {
        return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t, e).next((r => this.localStore.localDocuments.getNextDocuments(t, e, r, n).next((n => {
            const s = n.changes;
            return this.localStore.indexManager.updateIndexEntries(t, s).next((() => this.rt(r, n))).next((n => (Yr("IndexBackiller", `Updating offset: ${n}`), this.localStore.indexManager.updateCollectionGroup(t, e, n)))).next((() => s.size))
        }))))
    } rt(t, e) {
        let n = t;
        return e.changes.forEach(((t, e) => {
            const r = Ps(e);
            Bs(r, n) > 0 && (n = r)
        })), new Vs(n.readTime, n.documentKey, Math.max(e.batchId, t.largestBatchId))
    }
} class ei {
    constructor(t, e) { this.previousValue = t, e && (e.sequenceNumberHandler = t => this.ot(t), this.ut = t => e.writeSequenceNumber(t)) } ot(t) { return this.previousValue = Math.max(t, this.previousValue), this.previousValue } next() {
        const t = ++this.previousValue;
        return this.ut && this.ut(t), t
    }
} function ni(t) { return null == t } function ri(t) { return 0 === t && 1 / t == -1 / 0 } function si(t) { return "number" == typeof t && Number.isInteger(t) && !ri(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER } function ii(t) {
    let e = "";
    for (let n = 0;
        n < t.length;
        n++)e.length > 0 && (e = ai(e)), e = oi(t.get(n), e);
    return ai(e)
} function oi(t, e) {
    let n = e;
    const r = t.length;
    for (let e = 0;
        e < r;
        e++) {
            const r = t.charAt(e);
        switch (r) {
            case "\0": n += "";
                break;
            case "": n += "";
                break;
            default: n += r
        }
    } return n
} function ai(t) { return t + "" } function ci(t) {
    const e = t.length;
    if (ns(e >= 2), 2 === e) return ns("" === t.charAt(0) && "" === t.charAt(1)), _s.emptyPath();
    const n = e - 2, r = [];
    let s = "";
    for (let i = 0;
        i < e;
    ) {
        const e = t.indexOf("", i);
        switch ((e < 0 || e > n) && es(), t.charAt(e + 1)) {
            case "": const n = t.substring(i, e);
                let o;
                0 === s.length ? o = n : (s += n, o = s, s = ""), r.push(o);
                break;
            case "": s += t.substring(i, e), s += "\0";
                break;
            case "": s += t.substring(i, e + 1);
                break;
            default: es()
        }i = e + 2
    } return new _s(r)
} ei.ct = -1;
const ui = ["userId", "batchId"];
function li(t, e) { return [t, ii(e)] } function hi(t, e, n) { return [t, ii(e), n] } const di = {}, fi = ["prefixPath", "collectionGroup", "readTime", "documentId"], gi = ["prefixPath", "collectionGroup", "documentId"], mi = ["collectionGroup", "readTime", "prefixPath", "documentId"], pi = ["canonicalId", "targetId"], yi = ["targetId", "path"], wi = ["path", "targetId"], vi = ["collectionId", "parent"], bi = ["indexId", "uid"], Ii = ["uid", "sequenceNumber"], Ei = ["indexId", "uid", "arrayValue", "directionalValue", "orderedDocumentKey", "documentKey"], Ti = ["indexId", "uid", "orderedDocumentKey"], Si = ["userId", "collectionPath", "documentId"], _i = ["userId", "collectionPath", "largestBatchId"], xi = ["userId", "collectionGroup", "largestBatchId"], Ci = ["mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries"], Di = [...Ci, "documentOverlays"], Ai = ["mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays"], Ni = Ai, ki = [...Ni, "indexConfiguration", "indexState", "indexEntries"];
class Ri extends Us { constructor(t, e) { super(), this.ht = t, this.currentSequenceNumber = e } } function Mi(t, e) {
    const n = ss(t);
    return Ks.M(n.ht, e)
} function Fi(t) {
    let e = 0;
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e
} function Oi(t, e) { for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]) } function Li(t) {
    for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0
} class Pi {
    constructor(t, e) { this.comparator = t, this.root = e || Bi.EMPTY } insert(t, e) { return new Pi(this.comparator, this.root.insert(t, e, this.comparator).copy(null, null, Bi.BLACK, null, null)) } remove(t) { return new Pi(this.comparator, this.root.remove(t, this.comparator).copy(null, null, Bi.BLACK, null, null)) } get(t) {
        let e = this.root;
        for (;
            !e.isEmpty();
        ) {
            const n = this.comparator(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? e = e.left : n > 0 && (e = e.right)
        } return null
    } indexOf(t) {
        let e = 0, n = this.root;
        for (;
            !n.isEmpty();
        ) {
            const r = this.comparator(t, n.key);
            if (0 === r) return e + n.left.size;
            r < 0 ? n = n.left : (e += n.left.size + 1, n = n.right)
        } return -1
    } isEmpty() { return this.root.isEmpty() } get size() { return this.root.size } minKey() { return this.root.minKey() } maxKey() { return this.root.maxKey() } inorderTraversal(t) { return this.root.inorderTraversal(t) } forEach(t) { this.inorderTraversal(((e, n) => (t(e, n), !1))) } toString() {
        const t = [];
        return this.inorderTraversal(((e, n) => (t.push(`${e}:${n}`), !1))), `{${t.join(", ")}}`
    } reverseTraversal(t) { return this.root.reverseTraversal(t) } getIterator() { return new Vi(this.root, null, this.comparator, !1) } getIteratorFrom(t) { return new Vi(this.root, t, this.comparator, !1) } getReverseIterator() { return new Vi(this.root, null, this.comparator, !0) } getReverseIteratorFrom(t) { return new Vi(this.root, t, this.comparator, !0) }
} class Vi {
    constructor(t, e, n, r) {
        this.isReverse = r, this.nodeStack = [];
        let s = 1;
        for (;
            !t.isEmpty();
        )if (s = e ? n(t.key, e) : 1, e && r && (s *= -1), s < 0) t = this.isReverse ? t.left : t.right;
            else {
                if (0 === s) {
                    this.nodeStack.push(t);
                    break
                } this.nodeStack.push(t), t = this.isReverse ? t.right : t.left
            }
    } getNext() {
        let t = this.nodeStack.pop();
        const e = { key: t.key, value: t.value };
        if (this.isReverse) for (t = t.left;
            !t.isEmpty();
        )this.nodeStack.push(t), t = t.right;
        else for (t = t.right;
            !t.isEmpty();
        )this.nodeStack.push(t), t = t.left;
        return e
    } hasNext() { return this.nodeStack.length > 0 } peek() {
        if (0 === this.nodeStack.length) return null;
        const t = this.nodeStack[this.nodeStack.length - 1];
        return { key: t.key, value: t.value }
    }
} class Bi {
    constructor(t, e, n, r, s) { this.key = t, this.value = e, this.color = null != n ? n : Bi.RED, this.left = null != r ? r : Bi.EMPTY, this.right = null != s ? s : Bi.EMPTY, this.size = this.left.size + 1 + this.right.size } copy(t, e, n, r, s) { return new Bi(null != t ? t : this.key, null != e ? e : this.value, null != n ? n : this.color, null != r ? r : this.left, null != s ? s : this.right) } isEmpty() { return !1 } inorderTraversal(t) { return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t) } reverseTraversal(t) { return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t) } min() { return this.left.isEmpty() ? this : this.left.min() } minKey() { return this.min().key } maxKey() { return this.right.isEmpty() ? this.key : this.right.maxKey() } insert(t, e, n) {
        let r = this;
        const s = n(t, r.key);
        return r = s < 0 ? r.copy(null, null, null, r.left.insert(t, e, n), null) : 0 === s ? r.copy(null, e, null, null, null) : r.copy(null, null, null, null, r.right.insert(t, e, n)), r.fixUp()
    } removeMin() {
        if (this.left.isEmpty()) return Bi.EMPTY;
        let t = this;
        return t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()), t = t.copy(null, null, null, t.left.removeMin(), null), t.fixUp()
    } remove(t, e) {
        let n, r = this;
        if (e(t, r.key) < 0) r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()), r = r.copy(null, null, null, r.left.remove(t, e), null);
        else {
            if (r.left.isRed() && (r = r.rotateRight()), r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()), 0 === e(t, r.key)) {
                if (r.right.isEmpty()) return Bi.EMPTY;
                n = r.right.min(), r = r.copy(n.key, n.value, null, null, r.right.removeMin())
            } r = r.copy(null, null, null, null, r.right.remove(t, e))
        } return r.fixUp()
    } isRed() { return this.color } fixUp() {
        let t = this;
        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t
    } moveRedLeft() {
        let t = this.colorFlip();
        return t.right.left.isRed() && (t = t.copy(null, null, null, null, t.right.rotateRight()), t = t.rotateLeft(), t = t.colorFlip()), t
    } moveRedRight() {
        let t = this.colorFlip();
        return t.left.left.isRed() && (t = t.rotateRight(), t = t.colorFlip()), t
    } rotateLeft() {
        const t = this.copy(null, null, Bi.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, t, null)
    } rotateRight() {
        const t = this.copy(null, null, Bi.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, t)
    } colorFlip() {
        const t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e)
    } checkMaxDepth() {
        const t = this.check();
        return Math.pow(2, t) <= this.size + 1
    } check() {
        if (this.isRed() && this.left.isRed()) throw es();
        if (this.right.isRed()) throw es();
        const t = this.left.check();
        if (t !== this.right.check()) throw es();
        return t + (this.isRed() ? 0 : 1)
    }
} Bi.EMPTY = null, Bi.RED = !0, Bi.BLACK = !1, Bi.EMPTY = new class { constructor() { this.size = 0 } get key() { throw es() } get value() { throw es() } get color() { throw es() } get left() { throw es() } get right() { throw es() } copy(t, e, n, r, s) { return this } insert(t, e, n) { return new Bi(t, e) } remove(t, e) { return this } isEmpty() { return !0 } inorderTraversal(t) { return !1 } reverseTraversal(t) { return !1 } minKey() { return null } maxKey() { return null } isRed() { return !1 } checkMaxDepth() { return !0 } check() { return 0 } };
class qi {
    constructor(t) { this.comparator = t, this.data = new Pi(this.comparator) } has(t) { return null !== this.data.get(t) } first() { return this.data.minKey() } last() { return this.data.maxKey() } get size() { return this.data.size } indexOf(t) { return this.data.indexOf(t) } forEach(t) { this.data.inorderTraversal(((e, n) => (t(e), !1))) } forEachInRange(t, e) {
        const n = this.data.getIteratorFrom(t[0]);
        for (;
            n.hasNext();
        ) {
            const r = n.getNext();
            if (this.comparator(r.key, t[1]) >= 0) return;
            e(r.key)
        }
    } forEachWhile(t, e) {
        let n;
        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator();
            n.hasNext();
        )if (!t(n.getNext().key)) return
    } firstAfterOrEqual(t) {
        const e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null
    } getIterator() { return new Ui(this.data.getIterator()) } getIteratorFrom(t) { return new Ui(this.data.getIteratorFrom(t)) } add(t) { return this.copy(this.data.remove(t).insert(t, !0)) } delete(t) { return this.has(t) ? this.copy(this.data.remove(t)) : this } isEmpty() { return this.data.isEmpty() } unionWith(t) {
        let e = this;
        return e.size < t.size && (e = t, t = this), t.forEach((t => { e = e.add(t) })), e
    } isEqual(t) {
        if (!(t instanceof qi)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.data.getIterator(), n = t.data.getIterator();
        for (;
            e.hasNext();
        ) {
            const t = e.getNext().key, r = n.getNext().key;
            if (0 !== this.comparator(t, r)) return !1
        } return !0
    } toArray() {
        const t = [];
        return this.forEach((e => { t.push(e) })), t
    } toString() {
        const t = [];
        return this.forEach((e => t.push(e))), "SortedSet(" + t.toString() + ")"
    } copy(t) {
        const e = new qi(this.comparator);
        return e.data = t, e
    }
} class Ui { constructor(t) { this.iter = t } getNext() { return this.iter.getNext().key } hasNext() { return this.iter.hasNext() } } function ji(t) { return t.hasNext() ? t.getNext() : void 0 } class zi {
    constructor(t) { this.fields = t, t.sort(Cs.comparator) } static empty() { return new zi([]) } unionWith(t) {
        let e = new qi(Cs.comparator);
        for (const t of this.fields) e = e.add(t);
        for (const n of t) e = e.add(n);
        return new zi(e.toArray())
    } covers(t) {
        for (const e of this.fields) if (e.isPrefixOf(t)) return !0;
        return !1
    } isEqual(t) { return bs(this.fields, t.fields, ((t, e) => t.isEqual(e))) }
} class Gi extends Error { constructor() { super(...arguments), this.name = "Base64DecodeError" } } function Ki() { return "undefined" != typeof atob } class $i {
    constructor(t) { this.binaryString = t } static fromBase64String(t) {
        const e = function (t) { try { return atob(t) } catch (t) { throw "undefined" != typeof DOMException && t instanceof DOMException ? new Gi("Invalid base64 string: " + t) : t } }(t);
        return new $i(e)
    } static fromUint8Array(t) {
        const e = function (t) {
            let e = "";
            for (let n = 0;
                n < t.length;
                ++n)e += String.fromCharCode(t[n]);
            return e
        }(t);
        return new $i(e)
    } [Symbol.iterator]() {
        let t = 0;
        return { next: () => t < this.binaryString.length ? { value: this.binaryString.charCodeAt(t++), done: !1 } : { value: void 0, done: !0 } }
    } toBase64() {
        return t = this.binaryString, btoa(t);
        var t
    } toUint8Array() {
        return function (t) {
            const e = new Uint8Array(t.length);
            for (let n = 0;
                n < t.length;
                n++)e[n] = t.charCodeAt(n);
            return e
        }(this.binaryString)
    } approximateByteSize() { return 2 * this.binaryString.length } compareTo(t) { return vs(this.binaryString, t.binaryString) } isEqual(t) { return this.binaryString === t.binaryString }
} $i.EMPTY_BYTE_STRING = new $i("");
const Qi = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function Hi(t) {
    if (ns(!!t), "string" == typeof t) {
        let e = 0;
        const n = Qi.exec(t);
        if (ns(!!n), n[1]) {
            let t = n[1];
            t = (t + "000000000").substr(0, 9), e = Number(t)
        } const r = new Date(t);
        return { seconds: Math.floor(r.getTime() / 1e3), nanos: e }
    } return { seconds: Wi(t.seconds), nanos: Wi(t.nanos) }
} function Wi(t) { return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0 } function Xi(t) { return "string" == typeof t ? $i.fromBase64String(t) : $i.fromUint8Array(t) } function Yi(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue)
} function Ji(t) {
    const e = t.mapValue.fields.__previous_value__;
    return Yi(e) ? Ji(e) : e
} function Zi(t) {
    const e = Hi(t.mapValue.fields.__local_write_time__.timestampValue);
    return new Es(e.seconds, e.nanos)
} class to { constructor(t, e, n, r, s, i, o, a, c) { this.databaseId = t, this.appId = e, this.persistenceKey = n, this.host = r, this.ssl = s, this.forceLongPolling = i, this.autoDetectLongPolling = o, this.longPollingOptions = a, this.useFetchStreams = c } } class eo { constructor(t, e) { this.projectId = t, this.database = e || "(default)" } static empty() { return new eo("", "") } get isDefaultDatabase() { return "(default)" === this.database } isEqual(t) { return t instanceof eo && t.projectId === this.projectId && t.database === this.database } } const no = { mapValue: { fields: { __type__: { stringValue: "__max__" } } } }, ro = { nullValue: "NULL_VALUE" };
function so(t) { return "nullValue" in t ? 0 : "booleanValue" in t ? 1 : "integerValue" in t || "doubleValue" in t ? 2 : "timestampValue" in t ? 3 : "stringValue" in t ? 5 : "bytesValue" in t ? 6 : "referenceValue" in t ? 7 : "geoPointValue" in t ? 8 : "arrayValue" in t ? 9 : "mapValue" in t ? Yi(t) ? 4 : bo(t) ? 9007199254740991 : 10 : es() } function io(t, e) {
    if (t === e) return !0;
    const n = so(t);
    if (n !== so(e)) return !1;
    switch (n) {
        case 0: case 9007199254740991: return !0;
        case 1: return t.booleanValue === e.booleanValue;
        case 4: return Zi(t).isEqual(Zi(e));
        case 3: return function (t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) return t.timestampValue === e.timestampValue;
            const n = Hi(t.timestampValue), r = Hi(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos
        }(t, e);
        case 5: return t.stringValue === e.stringValue;
        case 6: return function (t, e) { return Xi(t.bytesValue).isEqual(Xi(e.bytesValue)) }(t, e);
        case 7: return t.referenceValue === e.referenceValue;
        case 8: return function (t, e) { return Wi(t.geoPointValue.latitude) === Wi(e.geoPointValue.latitude) && Wi(t.geoPointValue.longitude) === Wi(e.geoPointValue.longitude) }(t, e);
        case 2: return function (t, e) {
            if ("integerValue" in t && "integerValue" in e) return Wi(t.integerValue) === Wi(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                const n = Wi(t.doubleValue), r = Wi(e.doubleValue);
                return n === r ? ri(n) === ri(r) : isNaN(n) && isNaN(r)
            } return !1
        }(t, e);
        case 9: return bs(t.arrayValue.values || [], e.arrayValue.values || [], io);
        case 10: return function (t, e) {
            const n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (Fi(n) !== Fi(r)) return !1;
            for (const t in n) if (n.hasOwnProperty(t) && (void 0 === r[t] || !io(n[t], r[t]))) return !1;
            return !0
        }(t, e);
        default: return es()
    }
} function oo(t, e) { return void 0 !== (t.values || []).find((t => io(t, e))) } function ao(t, e) {
    if (t === e) return 0;
    const n = so(t), r = so(e);
    if (n !== r) return vs(n, r);
    switch (n) {
        case 0: case 9007199254740991: return 0;
        case 1: return vs(t.booleanValue, e.booleanValue);
        case 2: return function (t, e) {
            const n = Wi(t.integerValue || t.doubleValue), r = Wi(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : isNaN(n) ? isNaN(r) ? 0 : -1 : 1
        }(t, e);
        case 3: return co(t.timestampValue, e.timestampValue);
        case 4: return co(Zi(t), Zi(e));
        case 5: return vs(t.stringValue, e.stringValue);
        case 6: return function (t, e) {
            const n = Xi(t), r = Xi(e);
            return n.compareTo(r)
        }(t.bytesValue, e.bytesValue);
        case 7: return function (t, e) {
            const n = t.split("/"), r = e.split("/");
            for (let t = 0;
                t < n.length && t < r.length;
                t++) {
                    const e = vs(n[t], r[t]);
                if (0 !== e) return e
            } return vs(n.length, r.length)
        }(t.referenceValue, e.referenceValue);
        case 8: return function (t, e) {
            const n = vs(Wi(t.latitude), Wi(e.latitude));
            return 0 !== n ? n : vs(Wi(t.longitude), Wi(e.longitude))
        }(t.geoPointValue, e.geoPointValue);
        case 9: return function (t, e) {
            const n = t.values || [], r = e.values || [];
            for (let t = 0;
                t < n.length && t < r.length;
                ++t) {
                    const e = ao(n[t], r[t]);
                if (e) return e
            } return vs(n.length, r.length)
        }(t.arrayValue, e.arrayValue);
        case 10: return function (t, e) {
            if (t === no.mapValue && e === no.mapValue) return 0;
            if (t === no.mapValue) return 1;
            if (e === no.mapValue) return -1;
            const n = t.fields || {}, r = Object.keys(n), s = e.fields || {}, i = Object.keys(s);
            r.sort(), i.sort();
            for (let t = 0;
                t < r.length && t < i.length;
                ++t) {
                    const e = vs(r[t], i[t]);
                if (0 !== e) return e;
                const o = ao(n[r[t]], s[i[t]]);
                if (0 !== o) return o
            } return vs(r.length, i.length)
        }(t.mapValue, e.mapValue);
        default: throw es()
    }
} function co(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return vs(t, e);
    const n = Hi(t), r = Hi(e), s = vs(n.seconds, r.seconds);
    return 0 !== s ? s : vs(n.nanos, r.nanos)
} function uo(t) { return lo(t) } function lo(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function (t) {
        const e = Hi(t);
        return `time(${e.seconds},${e.nanos})`
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? Xi(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, Ds.fromName(n).toString()) : "geoPointValue" in t ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t ? function (t) {
        let e = "[", n = !0;
        for (const r of t.values || []) n ? n = !1 : e += ",", e += lo(r);
        return e + "]"
    }(t.arrayValue) : "mapValue" in t ? function (t) {
        const e = Object.keys(t.fields || {}).sort();
        let n = "{", r = !0;
        for (const s of e) r ? r = !1 : n += ",", n += `${s}:${lo(t.fields[s])}`;
        return n + "}"
    }(t.mapValue) : es();
    var e, n
} function ho(t) {
    switch (so(t)) {
        case 0: case 1: return 4;
        case 2: return 8;
        case 3: case 8: return 16;
        case 4: const e = Ji(t);
            return e ? 16 + ho(e) : 16;
        case 5: return 2 * t.stringValue.length;
        case 6: return Xi(t.bytesValue).approximateByteSize();
        case 7: return t.referenceValue.length;
        case 9: return (t.arrayValue.values || []).reduce(((t, e) => t + ho(e)), 0);
        case 10: return function (t) {
            let e = 0;
            return Oi(t.fields, ((t, n) => { e += t.length + ho(n) })), e
        }(t.mapValue);
        default: throw es()
    }
} function fo(t, e) { return { referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}` } } function go(t) { return !!t && "integerValue" in t } function mo(t) { return !!t && "arrayValue" in t } function po(t) { return !!t && "nullValue" in t } function yo(t) { return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue)) } function wo(t) { return !!t && "mapValue" in t } function vo(t) {
    if (t.geoPointValue) return { geoPointValue: Object.assign({}, t.geoPointValue) };
    if (t.timestampValue && "object" == typeof t.timestampValue) return { timestampValue: Object.assign({}, t.timestampValue) };
    if (t.mapValue) {
        const e = { mapValue: { fields: {} } };
        return Oi(t.mapValue.fields, ((t, n) => e.mapValue.fields[t] = vo(n))), e
    } if (t.arrayValue) {
        const e = { arrayValue: { values: [] } };
        for (let n = 0;
            n < (t.arrayValue.values || []).length;
            ++n)e.arrayValue.values[n] = vo(t.arrayValue.values[n]);
        return e
    } return Object.assign({}, t)
} function bo(t) { return "__max__" === (((t.mapValue || {}).fields || {}).__type__ || {}).stringValue } function Io(t) { return "nullValue" in t ? ro : "booleanValue" in t ? { booleanValue: !1 } : "integerValue" in t || "doubleValue" in t ? { doubleValue: NaN } : "timestampValue" in t ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } } : "stringValue" in t ? { stringValue: "" } : "bytesValue" in t ? { bytesValue: "" } : "referenceValue" in t ? fo(eo.empty(), Ds.empty()) : "geoPointValue" in t ? { geoPointValue: { latitude: -90, longitude: -180 } } : "arrayValue" in t ? { arrayValue: {} } : "mapValue" in t ? { mapValue: {} } : es() } function Eo(t) { return "nullValue" in t ? { booleanValue: !1 } : "booleanValue" in t ? { doubleValue: NaN } : "integerValue" in t || "doubleValue" in t ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } } : "timestampValue" in t ? { stringValue: "" } : "stringValue" in t ? { bytesValue: "" } : "bytesValue" in t ? fo(eo.empty(), Ds.empty()) : "referenceValue" in t ? { geoPointValue: { latitude: -90, longitude: -180 } } : "geoPointValue" in t ? { arrayValue: {} } : "arrayValue" in t ? { mapValue: {} } : "mapValue" in t ? no : es() } function To(t, e) {
    const n = ao(t.value, e.value);
    return 0 !== n ? n : t.inclusive && !e.inclusive ? -1 : !t.inclusive && e.inclusive ? 1 : 0
} function So(t, e) {
    const n = ao(t.value, e.value);
    return 0 !== n ? n : t.inclusive && !e.inclusive ? 1 : !t.inclusive && e.inclusive ? -1 : 0
} class _o {
    constructor(t) { this.value = t } static empty() { return new _o({ mapValue: {} }) } field(t) {
        if (t.isEmpty()) return this.value;
        {
            let e = this.value;
            for (let n = 0;
                n < t.length - 1;
                ++n)if (e = (e.mapValue.fields || {})[t.get(n)], !wo(e)) return null;
            return e = (e.mapValue.fields || {})[t.lastSegment()], e || null
        }
    } set(t, e) { this.getFieldsMap(t.popLast())[t.lastSegment()] = vo(e) } setAll(t) {
        let e = Cs.emptyPath(), n = {}, r = [];
        t.forEach(((t, s) => {
            if (!e.isImmediateParentOf(s)) {
                const t = this.getFieldsMap(e);
                this.applyChanges(t, n, r), n = {}, r = [], e = s.popLast()
            } t ? n[s.lastSegment()] = vo(t) : r.push(s.lastSegment())
        }));
        const s = this.getFieldsMap(e);
        this.applyChanges(s, n, r)
    } delete(t) {
        const e = this.field(t.popLast());
        wo(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()]
    } isEqual(t) { return io(this.value, t.value) } getFieldsMap(t) {
        let e = this.value;
        e.mapValue.fields || (e.mapValue = { fields: {} });
        for (let n = 0;
            n < t.length;
            ++n) {
                let r = e.mapValue.fields[t.get(n)];
            wo(r) && r.mapValue.fields || (r = { mapValue: { fields: {} } }, e.mapValue.fields[t.get(n)] = r), e = r
        } return e.mapValue.fields
    } applyChanges(t, e, n) {
        Oi(e, ((e, n) => t[e] = n));
        for (const e of n) delete t[e]
    } clone() { return new _o(vo(this.value)) }
} function xo(t) {
    const e = [];
    return Oi(t.fields, ((t, n) => {
        const r = new Cs([t]);
        if (wo(n)) {
            const t = xo(n.mapValue).fields;
            if (0 === t.length) e.push(r);
            else for (const n of t) e.push(r.child(n))
        } else e.push(r)
    })), new zi(e)
} class Co { constructor(t, e, n, r, s, i, o) { this.key = t, this.documentType = e, this.version = n, this.readTime = r, this.createTime = s, this.data = i, this.documentState = o } static newInvalidDocument(t) { return new Co(t, 0, Ts.min(), Ts.min(), Ts.min(), _o.empty(), 0) } static newFoundDocument(t, e, n, r) { return new Co(t, 1, e, Ts.min(), n, r, 0) } static newNoDocument(t, e) { return new Co(t, 2, e, Ts.min(), Ts.min(), _o.empty(), 0) } static newUnknownDocument(t, e) { return new Co(t, 3, e, Ts.min(), Ts.min(), _o.empty(), 2) } convertToFoundDocument(t, e) { return !this.createTime.isEqual(Ts.min()) || 2 !== this.documentType && 0 !== this.documentType || (this.createTime = t), this.version = t, this.documentType = 1, this.data = e, this.documentState = 0, this } convertToNoDocument(t) { return this.version = t, this.documentType = 2, this.data = _o.empty(), this.documentState = 0, this } convertToUnknownDocument(t) { return this.version = t, this.documentType = 3, this.data = _o.empty(), this.documentState = 2, this } setHasCommittedMutations() { return this.documentState = 2, this } setHasLocalMutations() { return this.documentState = 1, this.version = Ts.min(), this } setReadTime(t) { return this.readTime = t, this } get hasLocalMutations() { return 1 === this.documentState } get hasCommittedMutations() { return 2 === this.documentState } get hasPendingWrites() { return this.hasLocalMutations || this.hasCommittedMutations } isValidDocument() { return 0 !== this.documentType } isFoundDocument() { return 1 === this.documentType } isNoDocument() { return 2 === this.documentType } isUnknownDocument() { return 3 === this.documentType } isEqual(t) { return t instanceof Co && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.documentType === t.documentType && this.documentState === t.documentState && this.data.isEqual(t.data) } mutableCopy() { return new Co(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState) } toString() { return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})` } } class Do { constructor(t, e) { this.position = t, this.inclusive = e } } function Ao(t, e, n) {
    let r = 0;
    for (let s = 0;
        s < t.position.length;
        s++) {
            const i = e[s], o = t.position[s];
        if (r = i.field.isKeyField() ? Ds.comparator(Ds.fromName(o.referenceValue), n.key) : ao(o, n.data.field(i.field)), "desc" === i.dir && (r *= -1), 0 !== r) break
    } return r
} function No(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.inclusive !== e.inclusive || t.position.length !== e.position.length) return !1;
    for (let n = 0;
        n < t.position.length;
        n++)if (!io(t.position[n], e.position[n])) return !1;
    return !0
} class ko { constructor(t, e = "asc") { this.field = t, this.dir = e } } function Ro(t, e) { return t.dir === e.dir && t.field.isEqual(e.field) } class Mo { } class Fo extends Mo {
    constructor(t, e, n) { super(), this.field = t, this.op = e, this.value = n } static create(t, e, n) { return t.isKeyField() ? "in" === e || "not-in" === e ? this.createKeyFieldInFilter(t, e, n) : new Go(t, e, n) : "array-contains" === e ? new Ho(t, n) : "in" === e ? new Wo(t, n) : "not-in" === e ? new Xo(t, n) : "array-contains-any" === e ? new Yo(t, n) : new Fo(t, e, n) } static createKeyFieldInFilter(t, e, n) { return "in" === e ? new Ko(t, n) : new $o(t, n) } matches(t) {
        const e = t.data.field(this.field);
        return "!=" === this.op ? null !== e && this.matchesComparison(ao(e, this.value)) : null !== e && so(this.value) === so(e) && this.matchesComparison(ao(e, this.value))
    } matchesComparison(t) {
        switch (this.op) {
            case "<": return t < 0;
            case "<=": return t <= 0;
            case "==": return 0 === t;
            case "!=": return 0 !== t;
            case ">": return t > 0;
            case ">=": return t >= 0;
            default: return es()
        }
    } isInequality() { return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0 } getFlattenedFilters() { return [this] } getFilters() { return [this] } getFirstInequalityField() { return this.isInequality() ? this.field : null }
} class Oo extends Mo {
    constructor(t, e) { super(), this.filters = t, this.op = e, this.lt = null } static create(t, e) { return new Oo(t, e) } matches(t) { return Lo(this) ? void 0 === this.filters.find((e => !e.matches(t))) : void 0 !== this.filters.find((e => e.matches(t))) } getFlattenedFilters() { return null !== this.lt || (this.lt = this.filters.reduce(((t, e) => t.concat(e.getFlattenedFilters())), [])), this.lt } getFilters() { return Object.assign([], this.filters) } getFirstInequalityField() {
        const t = this.ft((t => t.isInequality()));
        return null !== t ? t.field : null
    } ft(t) {
        for (const e of this.getFlattenedFilters()) if (t(e)) return e;
        return null
    }
} function Lo(t) { return "and" === t.op } function Po(t) { return "or" === t.op } function Vo(t) { return Bo(t) && Lo(t) } function Bo(t) {
    for (const e of t.filters) if (e instanceof Oo) return !1;
    return !0
} function qo(t) {
    if (t instanceof Fo) return t.field.canonicalString() + t.op.toString() + uo(t.value);
    if (Vo(t)) return t.filters.map((t => qo(t))).join(",");
    {
        const e = t.filters.map((t => qo(t))).join(",");
        return `${t.op}(${e})`
    }
} function Uo(t, e) { return t instanceof Fo ? function (t, e) { return e instanceof Fo && t.op === e.op && t.field.isEqual(e.field) && io(t.value, e.value) }(t, e) : t instanceof Oo ? function (t, e) { return e instanceof Oo && t.op === e.op && t.filters.length === e.filters.length && t.filters.reduce(((t, n, r) => t && Uo(n, e.filters[r])), !0) }(t, e) : void es() } function jo(t, e) {
    const n = t.filters.concat(e);
    return Oo.create(n, t.op)
} function zo(t) { return t instanceof Fo ? function (t) { return `${t.field.canonicalString()} ${t.op} ${uo(t.value)}` }(t) : t instanceof Oo ? function (t) { return t.op.toString() + " {" + t.getFilters().map(zo).join(" ,") + "}" }(t) : "Filter" } class Go extends Fo {
    constructor(t, e, n) { super(t, e, n), this.key = Ds.fromName(n.referenceValue) } matches(t) {
        const e = Ds.comparator(t.key, this.key);
        return this.matchesComparison(e)
    }
} class Ko extends Fo { constructor(t, e) { super(t, "in", e), this.keys = Qo("in", e) } matches(t) { return this.keys.some((e => e.isEqual(t.key))) } } class $o extends Fo { constructor(t, e) { super(t, "not-in", e), this.keys = Qo("not-in", e) } matches(t) { return !this.keys.some((e => e.isEqual(t.key))) } } function Qo(t, e) {
    var n;
    return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((t => Ds.fromName(t.referenceValue)))
} class Ho extends Fo {
    constructor(t, e) { super(t, "array-contains", e) } matches(t) {
        const e = t.data.field(this.field);
        return mo(e) && oo(e.arrayValue, this.value)
    }
} class Wo extends Fo {
    constructor(t, e) { super(t, "in", e) } matches(t) {
        const e = t.data.field(this.field);
        return null !== e && oo(this.value.arrayValue, e)
    }
} class Xo extends Fo {
    constructor(t, e) { super(t, "not-in", e) } matches(t) {
        if (oo(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
        const e = t.data.field(this.field);
        return null !== e && !oo(this.value.arrayValue, e)
    }
} class Yo extends Fo {
    constructor(t, e) { super(t, "array-contains-any", e) } matches(t) {
        const e = t.data.field(this.field);
        return !(!mo(e) || !e.arrayValue.values) && e.arrayValue.values.some((t => oo(this.value.arrayValue, t)))
    }
} class Jo { constructor(t, e = null, n = [], r = [], s = null, i = null, o = null) { this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = r, this.limit = s, this.startAt = i, this.endAt = o, this.dt = null } } function Zo(t, e = null, n = [], r = [], s = null, i = null, o = null) { return new Jo(t, e, n, r, s, i, o) } function ta(t) {
    const e = ss(t);
    if (null === e.dt) {
        let t = e.path.canonicalString();
        null !== e.collectionGroup && (t += "|cg:" + e.collectionGroup), t += "|f:", t += e.filters.map((t => qo(t))).join(","), t += "|ob:", t += e.orderBy.map((t => function (t) { return t.field.canonicalString() + t.dir }(t))).join(","), ni(e.limit) || (t += "|l:", t += e.limit), e.startAt && (t += "|lb:", t += e.startAt.inclusive ? "b:" : "a:", t += e.startAt.position.map((t => uo(t))).join(",")), e.endAt && (t += "|ub:", t += e.endAt.inclusive ? "a:" : "b:", t += e.endAt.position.map((t => uo(t))).join(",")), e.dt = t
    } return e.dt
} function ea(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (let n = 0;
        n < t.orderBy.length;
        n++)if (!Ro(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (let n = 0;
        n < t.filters.length;
        n++)if (!Uo(t.filters[n], e.filters[n])) return !1;
    return t.collectionGroup === e.collectionGroup && !!t.path.isEqual(e.path) && !!No(t.startAt, e.startAt) && No(t.endAt, e.endAt)
} function na(t) { return Ds.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length } function ra(t, e) { return t.filters.filter((t => t instanceof Fo && t.field.isEqual(e))) } function sa(t, e, n) {
    let r = ro, s = !0;
    for (const n of ra(t, e)) {
        let t = ro, e = !0;
        switch (n.op) {
            case "<": case "<=": t = Io(n.value);
                break;
            case "==": case "in": case ">=": t = n.value;
                break;
            case ">": t = n.value, e = !1;
                break;
            case "!=": case "not-in": t = ro
        }To({ value: r, inclusive: s }, { value: t, inclusive: e }) < 0 && (r = t, s = e)
    } if (null !== n) for (let i = 0;
        i < t.orderBy.length;
        ++i)if (t.orderBy[i].field.isEqual(e)) {
            const t = n.position[i];
            To({ value: r, inclusive: s }, { value: t, inclusive: n.inclusive }) < 0 && (r = t, s = n.inclusive);
            break
        } return { value: r, inclusive: s }
} function ia(t, e, n) {
    let r = no, s = !0;
    for (const n of ra(t, e)) {
        let t = no, e = !0;
        switch (n.op) {
            case ">=": case ">": t = Eo(n.value), e = !1;
                break;
            case "==": case "in": case "<=": t = n.value;
                break;
            case "<": t = n.value, e = !1;
                break;
            case "!=": case "not-in": t = no
        }So({ value: r, inclusive: s }, { value: t, inclusive: e }) > 0 && (r = t, s = e)
    } if (null !== n) for (let i = 0;
        i < t.orderBy.length;
        ++i)if (t.orderBy[i].field.isEqual(e)) {
            const t = n.position[i];
            So({ value: r, inclusive: s }, { value: t, inclusive: n.inclusive }) > 0 && (r = t, s = n.inclusive);
            break
        } return { value: r, inclusive: s }
} class oa { constructor(t, e = null, n = [], r = [], s = null, i = "F", o = null, a = null) { this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = r, this.limit = s, this.limitType = i, this.startAt = o, this.endAt = a, this.wt = null, this._t = null, this.startAt, this.endAt } } function aa(t, e, n, r, s, i, o, a) { return new oa(t, e, n, r, s, i, o, a) } function ca(t) { return new oa(t) } function ua(t) { return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.explicitOrderBy.length || 1 === t.explicitOrderBy.length && t.explicitOrderBy[0].field.isKeyField()) } function la(t) { return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null } function ha(t) {
    for (const e of t.filters) {
        const t = e.getFirstInequalityField();
        if (null !== t) return t
    } return null
} function da(t) { return null !== t.collectionGroup } function fa(t) {
    const e = ss(t);
    if (null === e.wt) {
        e.wt = [];
        const t = ha(e), n = la(e);
        if (null !== t && null === n) t.isKeyField() || e.wt.push(new ko(t)), e.wt.push(new ko(Cs.keyField(), "asc"));
        else {
            let t = !1;
            for (const n of e.explicitOrderBy) e.wt.push(n), n.field.isKeyField() && (t = !0);
            if (!t) {
                const t = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc";
                e.wt.push(new ko(Cs.keyField(), t))
            }
        }
    } return e.wt
} function ga(t) {
    const e = ss(t);
    if (!e._t) if ("F" === e.limitType) e._t = Zo(e.path, e.collectionGroup, fa(e), e.filters, e.limit, e.startAt, e.endAt);
    else {
        const t = [];
        for (const n of fa(e)) {
            const e = "desc" === n.dir ? "asc" : "desc";
            t.push(new ko(n.field, e))
        } const n = e.endAt ? new Do(e.endAt.position, e.endAt.inclusive) : null, r = e.startAt ? new Do(e.startAt.position, e.startAt.inclusive) : null;
        e._t = Zo(e.path, e.collectionGroup, t, e.filters, e.limit, n, r)
    } return e._t
} function ma(t, e) {
    e.getFirstInequalityField(), ha(t);
    const n = t.filters.concat([e]);
    return new oa(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt)
} function pa(t, e, n) { return new oa(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt) } function ya(t, e) { return ea(ga(t), ga(e)) && t.limitType === e.limitType } function wa(t) { return `${ta(ga(t))}|lt:${t.limitType}` } function va(t) {
    return `Query(target=${function (t) {
        let e = t.path.canonicalString();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), t.filters.length > 0 && (e += `, filters: [${t.filters.map((t => zo(t))).join(", ")}]`), ni(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += `, orderBy: [${t.orderBy.map((t => function (t) { return `${t.field.canonicalString()} (${t.dir})` }(t))).join(", ")}]`), t.startAt && (e += ", startAt: ", e += t.startAt.inclusive ? "b:" : "a:", e += t.startAt.position.map((t => uo(t))).join(",")), t.endAt && (e += ", endAt: ", e += t.endAt.inclusive ? "a:" : "b:", e += t.endAt.position.map((t => uo(t))).join(",")), `Target(${e})`
    }(ga(t))}; 
 limitType=${t.limitType})`
} function ba(t, e) {
    return e.isFoundDocument() && function (t, e) {
        const n = e.key.path;
        return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : Ds.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n)
    }(t, e) && function (t, e) {
        for (const n of fa(t)) if (!n.field.isKeyField() && null === e.data.field(n.field)) return !1;
        return !0
    }(t, e) && function (t, e) {
        for (const n of t.filters) if (!n.matches(e)) return !1;
        return !0
    }(t, e) && function (t, e) {
        return !(t.startAt && !function (t, e, n) {
            const r = Ao(t, e, n);
            return t.inclusive ? r <= 0 : r < 0
        }(t.startAt, fa(t), e)) && !(t.endAt && !function (t, e, n) {
            const r = Ao(t, e, n);
            return t.inclusive ? r >= 0 : r > 0
        }(t.endAt, fa(t), e))
    }(t, e)
} function Ia(t) { return t.collectionGroup || (t.path.length % 2 == 1 ? t.path.lastSegment() : t.path.get(t.path.length - 2)) } function Ea(t) {
    return (e, n) => {
        let r = !1;
        for (const s of fa(t)) {
            const t = Ta(s, e, n);
            if (0 !== t) return t;
            r = r || s.field.isKeyField()
        } return 0
    }
} function Ta(t, e, n) {
    const r = t.field.isKeyField() ? Ds.comparator(e.key, n.key) : function (t, e, n) {
        const r = e.data.field(t), s = n.data.field(t);
        return null !== r && null !== s ? ao(r, s) : es()
    }(t.field, e, n);
    switch (t.dir) {
        case "asc": return r;
        case "desc": return -1 * r;
        default: return es()
    }
} class Sa {
    constructor(t, e) { this.mapKeyFn = t, this.equalsFn = e, this.inner = {}, this.innerSize = 0 } get(t) {
        const e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 !== n) for (const [e, r] of n) if (this.equalsFn(e, t)) return r
    } has(t) { return void 0 !== this.get(t) } set(t, e) {
        const n = this.mapKeyFn(t), r = this.inner[n];
        if (void 0 === r) return this.inner[n] = [[t, e]], void this.innerSize++;
        for (let n = 0;
            n < r.length;
            n++)if (this.equalsFn(r[n][0], t)) return void (r[n] = [t, e]);
        r.push([t, e]), this.innerSize++
    } delete(t) {
        const e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 === n) return !1;
        for (let r = 0;
            r < n.length;
            r++)if (this.equalsFn(n[r][0], t)) return 1 === n.length ? delete this.inner[e] : n.splice(r, 1), this.innerSize--, !0;
        return !1
    } forEach(t) { Oi(this.inner, ((e, n) => { for (const [e, r] of n) t(e, r) })) } isEmpty() { return Li(this.inner) } size() { return this.innerSize }
} const _a = new Pi(Ds.comparator);
function xa() { return _a } const Ca = new Pi(Ds.comparator);
function Da(...t) {
    let e = Ca;
    for (const n of t) e = e.insert(n.key, n);
    return e
} function Aa(t) {
    let e = Ca;
    return t.forEach(((t, n) => e = e.insert(t, n.overlayedDocument))), e
} function Na() { return Ra() } function ka() { return Ra() } function Ra() { return new Sa((t => t.toString()), ((t, e) => t.isEqual(e))) } const Ma = new Pi(Ds.comparator), Fa = new qi(Ds.comparator);
function Oa(...t) {
    let e = Fa;
    for (const n of t) e = e.add(n);
    return e
} const La = new qi(vs);
function Pa() { return La } function Va(t, e) {
    if (t.useProto3Json) {
        if (isNaN(e)) return { doubleValue: "NaN" };
        if (e === 1 / 0) return { doubleValue: "Infinity" };
        if (e === -1 / 0) return { doubleValue: "-Infinity" }
    } return { doubleValue: ri(e) ? "-0" : e }
} function Ba(t) { return { integerValue: "" + t } } function qa(t, e) { return si(e) ? Ba(e) : Va(t, e) } class Ua { constructor() { this._ = void 0 } } function ja(t, e, n) {
    return t instanceof Ka ? function (t, e) {
        const n = { fields: { __type__: { stringValue: "server_timestamp" }, __local_write_time__: { timestampValue: { seconds: t.seconds, nanos: t.nanoseconds } } } };
        return e && Yi(e) && (e = Ji(e)), e && (n.fields.__previous_value__ = e), { mapValue: n }
    }(n, e) : t instanceof $a ? Qa(t, e) : t instanceof Ha ? Wa(t, e) : function (t, e) {
        const n = Ga(t, e), r = Ya(n) + Ya(t.gt);
        return go(n) && go(t.gt) ? Ba(r) : Va(t.serializer, r)
    }(t, e)
} function za(t, e, n) { return t instanceof $a ? Qa(t, e) : t instanceof Ha ? Wa(t, e) : n } function Ga(t, e) {
    return t instanceof Xa ? go(n = e) || function (t) { return !!t && "doubleValue" in t }(n) ? e : { integerValue: 0 } : null;
    var n
} class Ka extends Ua { } class $a extends Ua { constructor(t) { super(), this.elements = t } } function Qa(t, e) {
    const n = Ja(e);
    for (const e of t.elements) n.some((t => io(t, e))) || n.push(e);
    return { arrayValue: { values: n } }
} class Ha extends Ua { constructor(t) { super(), this.elements = t } } function Wa(t, e) {
    let n = Ja(e);
    for (const e of t.elements) n = n.filter((t => !io(t, e)));
    return { arrayValue: { values: n } }
} class Xa extends Ua { constructor(t, e) { super(), this.serializer = t, this.gt = e } } function Ya(t) { return Wi(t.integerValue || t.doubleValue) } function Ja(t) { return mo(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [] } class Za { constructor(t, e) { this.field = t, this.transform = e } } class tc { constructor(t, e) { this.version = t, this.transformResults = e } } class ec { constructor(t, e) { this.updateTime = t, this.exists = e } static none() { return new ec } static exists(t) { return new ec(void 0, t) } static updateTime(t) { return new ec(t) } get isNone() { return void 0 === this.updateTime && void 0 === this.exists } isEqual(t) { return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime) } } function nc(t, e) { return void 0 !== t.updateTime ? e.isFoundDocument() && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e.isFoundDocument() } class rc { } function sc(t, e) {
    if (!t.hasLocalMutations || e && 0 === e.fields.length) return null;
    if (null === e) return t.isNoDocument() ? new gc(t.key, ec.none()) : new uc(t.key, t.data, ec.none());
    {
        const n = t.data, r = _o.empty();
        let s = new qi(Cs.comparator);
        for (let t of e.fields) if (!s.has(t)) {
            let e = n.field(t);
            null === e && t.length > 1 && (t = t.popLast(), e = n.field(t)), null === e ? r.delete(t) : r.set(t, e), s = s.add(t)
        } return new lc(t.key, r, new zi(s.toArray()), ec.none())
    }
} function ic(t, e, n) {
    t instanceof uc ? function (t, e, n) {
        const r = t.value.clone(), s = dc(t.fieldTransforms, e, n.transformResults);
        r.setAll(s), e.convertToFoundDocument(n.version, r).setHasCommittedMutations()
    }(t, e, n) : t instanceof lc ? function (t, e, n) {
        if (!nc(t.precondition, e)) return void e.convertToUnknownDocument(n.version);
        const r = dc(t.fieldTransforms, e, n.transformResults), s = e.data;
        s.setAll(hc(t)), s.setAll(r), e.convertToFoundDocument(n.version, s).setHasCommittedMutations()
    }(t, e, n) : function (t, e, n) { e.convertToNoDocument(n.version).setHasCommittedMutations() }(0, e, n)
} function oc(t, e, n, r) {
    return t instanceof uc ? function (t, e, n, r) {
        if (!nc(t.precondition, e)) return n;
        const s = t.value.clone(), i = fc(t.fieldTransforms, r, e);
        return s.setAll(i), e.convertToFoundDocument(e.version, s).setHasLocalMutations(), null
    }(t, e, n, r) : t instanceof lc ? function (t, e, n, r) {
        if (!nc(t.precondition, e)) return n;
        const s = fc(t.fieldTransforms, r, e), i = e.data;
        return i.setAll(hc(t)), i.setAll(s), e.convertToFoundDocument(e.version, i).setHasLocalMutations(), null === n ? null : n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map((t => t.field)))
    }(t, e, n, r) : function (t, e, n) { return nc(t.precondition, e) ? (e.convertToNoDocument(e.version).setHasLocalMutations(), null) : n }(t, e, n)
} function ac(t, e) {
    let n = null;
    for (const r of t.fieldTransforms) {
        const t = e.data.field(r.field), s = Ga(r.transform, t || null);
        null != s && (null === n && (n = _o.empty()), n.set(r.field, s))
    } return n || null
} function cc(t, e) { return t.type === e.type && !!t.key.isEqual(e.key) && !!t.precondition.isEqual(e.precondition) && !!function (t, e) { return void 0 === t && void 0 === e || !(!t || !e) && bs(t, e, ((t, e) => function (t, e) { return t.field.isEqual(e.field) && function (t, e) { return t instanceof $a && e instanceof $a || t instanceof Ha && e instanceof Ha ? bs(t.elements, e.elements, io) : t instanceof Xa && e instanceof Xa ? io(t.gt, e.gt) : t instanceof Ka && e instanceof Ka }(t.transform, e.transform) }(t, e))) }(t.fieldTransforms, e.fieldTransforms) && (0 === t.type ? t.value.isEqual(e.value) : 1 !== t.type || t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask)) } class uc extends rc { constructor(t, e, n, r = []) { super(), this.key = t, this.value = e, this.precondition = n, this.fieldTransforms = r, this.type = 0 } getFieldMask() { return null } } class lc extends rc { constructor(t, e, n, r, s = []) { super(), this.key = t, this.data = e, this.fieldMask = n, this.precondition = r, this.fieldTransforms = s, this.type = 1 } getFieldMask() { return this.fieldMask } } function hc(t) {
    const e = new Map;
    return t.fieldMask.fields.forEach((n => {
        if (!n.isEmpty()) {
            const r = t.data.field(n);
            e.set(n, r)
        }
    })), e
} function dc(t, e, n) {
    const r = new Map;
    ns(t.length === n.length);
    for (let s = 0;
        s < n.length;
        s++) {
            const i = t[s], o = i.transform, a = e.data.field(i.field);
        r.set(i.field, za(o, a, n[s]))
    } return r
} function fc(t, e, n) {
    const r = new Map;
    for (const s of t) {
        const t = s.transform, i = n.data.field(s.field);
        r.set(s.field, ja(t, i, e))
    } return r
} class gc extends rc { constructor(t, e) { super(), this.key = t, this.precondition = e, this.type = 2, this.fieldTransforms = [] } getFieldMask() { return null } } class mc extends rc { constructor(t, e) { super(), this.key = t, this.precondition = e, this.type = 3, this.fieldTransforms = [] } getFieldMask() { return null } } class pc {
    constructor(t, e, n, r) { this.batchId = t, this.localWriteTime = e, this.baseMutations = n, this.mutations = r } applyToRemoteDocument(t, e) {
        const n = e.mutationResults;
        for (let e = 0;
            e < this.mutations.length;
            e++) {
                const r = this.mutations[e];
            r.key.isEqual(t.key) && ic(r, t, n[e])
        }
    } applyToLocalView(t, e) {
        for (const n of this.baseMutations) n.key.isEqual(t.key) && (e = oc(n, t, e, this.localWriteTime));
        for (const n of this.mutations) n.key.isEqual(t.key) && (e = oc(n, t, e, this.localWriteTime));
        return e
    } applyToLocalDocumentSet(t, e) {
        const n = ka();
        return this.mutations.forEach((r => {
            const s = t.get(r.key), i = s.overlayedDocument;
            let o = this.applyToLocalView(i, s.mutatedFields);
            o = e.has(r.key) ? null : o;
            const a = sc(i, o);
            null !== a && n.set(r.key, a), i.isValidDocument() || i.convertToNoDocument(Ts.min())
        })), n
    } keys() { return this.mutations.reduce(((t, e) => t.add(e.key)), Oa()) } isEqual(t) { return this.batchId === t.batchId && bs(this.mutations, t.mutations, ((t, e) => cc(t, e))) && bs(this.baseMutations, t.baseMutations, ((t, e) => cc(t, e))) }
} class yc {
    constructor(t, e, n, r) { this.batch = t, this.commitVersion = e, this.mutationResults = n, this.docVersions = r } static from(t, e, n) {
        ns(t.mutations.length === n.length);
        let r = Ma;
        const s = t.mutations;
        for (let t = 0;
            t < s.length;
            t++)r = r.insert(s[t].key, n[t].version);
        return new yc(t, e, n, r)
    }
} class wc { constructor(t, e) { this.largestBatchId = t, this.mutation = e } getKey() { return this.mutation.key } isEqual(t) { return null !== t && this.mutation === t.mutation } toString() { return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }` } } class vc { constructor(t, e, n) { this.alias = t, this.yt = e, this.fieldPath = n } } class bc { constructor(t, e) { this.count = t, this.unchangedNames = e } } var Ic, Ec;
function Tc(t) {
    switch (t) {
        default: return es();
        case is.CANCELLED: case is.UNKNOWN: case is.DEADLINE_EXCEEDED: case is.RESOURCE_EXHAUSTED: case is.INTERNAL: case is.UNAVAILABLE: case is.UNAUTHENTICATED: return !1;
        case is.INVALID_ARGUMENT: case is.NOT_FOUND: case is.ALREADY_EXISTS: case is.PERMISSION_DENIED: case is.FAILED_PRECONDITION: case is.ABORTED: case is.OUT_OF_RANGE: case is.UNIMPLEMENTED: case is.DATA_LOSS: return !0
    }
} function Sc(t) {
    if (void 0 === t) return Jr("GRPC error has no .code"), is.UNKNOWN;
    switch (t) {
        case Ic.OK: return is.OK;
        case Ic.CANCELLED: return is.CANCELLED;
        case Ic.UNKNOWN: return is.UNKNOWN;
        case Ic.DEADLINE_EXCEEDED: return is.DEADLINE_EXCEEDED;
        case Ic.RESOURCE_EXHAUSTED: return is.RESOURCE_EXHAUSTED;
        case Ic.INTERNAL: return is.INTERNAL;
        case Ic.UNAVAILABLE: return is.UNAVAILABLE;
        case Ic.UNAUTHENTICATED: return is.UNAUTHENTICATED;
        case Ic.INVALID_ARGUMENT: return is.INVALID_ARGUMENT;
        case Ic.NOT_FOUND: return is.NOT_FOUND;
        case Ic.ALREADY_EXISTS: return is.ALREADY_EXISTS;
        case Ic.PERMISSION_DENIED: return is.PERMISSION_DENIED;
        case Ic.FAILED_PRECONDITION: return is.FAILED_PRECONDITION;
        case Ic.ABORTED: return is.ABORTED;
        case Ic.OUT_OF_RANGE: return is.OUT_OF_RANGE;
        case Ic.UNIMPLEMENTED: return is.UNIMPLEMENTED;
        case Ic.DATA_LOSS: return is.DATA_LOSS;
        default: return es()
    }
} (Ec = Ic || (Ic = {}))[Ec.OK = 0] = "OK", Ec[Ec.CANCELLED = 1] = "CANCELLED", Ec[Ec.UNKNOWN = 2] = "UNKNOWN", Ec[Ec.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", Ec[Ec.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Ec[Ec.NOT_FOUND = 5] = "NOT_FOUND", Ec[Ec.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Ec[Ec.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", Ec[Ec.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Ec[Ec.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", Ec[Ec.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Ec[Ec.ABORTED = 10] = "ABORTED", Ec[Ec.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Ec[Ec.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", Ec[Ec.INTERNAL = 13] = "INTERNAL", Ec[Ec.UNAVAILABLE = 14] = "UNAVAILABLE", Ec[Ec.DATA_LOSS = 15] = "DATA_LOSS";
class _c {
    constructor() { this.onExistenceFilterMismatchCallbacks = new Map } static get instance() { return xc } static getOrCreateInstance() { return null === xc && (xc = new _c), xc } onExistenceFilterMismatch(t) {
        const e = Symbol();
        return this.onExistenceFilterMismatchCallbacks.set(e, t), () => this.onExistenceFilterMismatchCallbacks.delete(e)
    } notifyOnExistenceFilterMismatch(t) { this.onExistenceFilterMismatchCallbacks.forEach((e => e(t))) }
} let xc = null;
function Cc() { return new TextEncoder } const Dc = new Gr([4294967295, 4294967295], 0);
function Ac(t) {
    const e = Cc().encode(t), n = new zr;
    return n.update(e), new Uint8Array(n.digest())
} function Nc(t) {
    const e = new DataView(t.buffer), n = e.getUint32(0, !0), r = e.getUint32(4, !0), s = e.getUint32(8, !0), i = e.getUint32(12, !0);
    return [new Gr([n, r], 0), new Gr([s, i], 0)]
} class kc {
    constructor(t, e, n) {
        if (this.bitmap = t, this.padding = e, this.hashCount = n, e < 0 || e >= 8) throw new Rc(`Invalid padding: ${e}`);
        if (n < 0) throw new Rc(`Invalid hash count: ${n}`);
        if (t.length > 0 && 0 === this.hashCount) throw new Rc(`Invalid hash count: ${n}`);
        if (0 === t.length && 0 !== e) throw new Rc(`Invalid padding when bitmap length is 0: ${e}`);
        this.It = 8 * t.length - e, this.Tt = Gr.fromNumber(this.It)
    } Et(t, e, n) {
        let r = t.add(e.multiply(Gr.fromNumber(n)));
        return 1 === r.compare(Dc) && (r = new Gr([r.getBits(0), r.getBits(1)], 0)), r.modulo(this.Tt).toNumber()
    } At(t) { return 0 != (this.bitmap[Math.floor(t / 8)] & 1 << t % 8) } vt(t) {
        if (0 === this.It) return !1;
        const e = Ac(t), [n, r] = Nc(e);
        for (let t = 0;
            t < this.hashCount;
            t++) {
                const e = this.Et(n, r, t);
            if (!this.At(e)) return !1
        } return !0
    } static create(t, e, n) {
        const r = t % 8 == 0 ? 0 : 8 - t % 8, s = new Uint8Array(Math.ceil(t / 8)), i = new kc(s, r, e);
        return n.forEach((t => i.insert(t))), i
    } insert(t) {
        if (0 === this.It) return;
        const e = Ac(t), [n, r] = Nc(e);
        for (let t = 0;
            t < this.hashCount;
            t++) {
                const e = this.Et(n, r, t);
            this.Rt(e)
        }
    } Rt(t) {
        const e = Math.floor(t / 8), n = t % 8;
        this.bitmap[e] |= 1 << n
    }
} class Rc extends Error { constructor() { super(...arguments), this.name = "BloomFilterError" } } class Mc {
    constructor(t, e, n, r, s) { this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = s } static createSynthesizedRemoteEventForCurrentChange(t, e, n) {
        const r = new Map;
        return r.set(t, Fc.createSynthesizedTargetChangeForCurrentChange(t, e, n)), new Mc(Ts.min(), r, new Pi(vs), xa(), Oa())
    }
} class Fc { constructor(t, e, n, r, s) { this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = s } static createSynthesizedTargetChangeForCurrentChange(t, e, n) { return new Fc(n, e, Oa(), Oa(), Oa()) } } class Oc { constructor(t, e, n, r) { this.Pt = t, this.removedTargetIds = e, this.key = n, this.bt = r } } class Lc { constructor(t, e) { this.targetId = t, this.Vt = e } } class Pc { constructor(t, e, n = $i.EMPTY_BYTE_STRING, r = null) { this.state = t, this.targetIds = e, this.resumeToken = n, this.cause = r } } class Vc {
    constructor() { this.St = 0, this.Dt = Uc(), this.Ct = $i.EMPTY_BYTE_STRING, this.xt = !1, this.Nt = !0 } get current() { return this.xt } get resumeToken() { return this.Ct } get kt() { return 0 !== this.St } get Mt() { return this.Nt } $t(t) { t.approximateByteSize() > 0 && (this.Nt = !0, this.Ct = t) } Ot() {
        let t = Oa(), e = Oa(), n = Oa();
        return this.Dt.forEach(((r, s) => {
            switch (s) {
                case 0: t = t.add(r);
                    break;
                case 2: e = e.add(r);
                    break;
                case 1: n = n.add(r);
                    break;
                default: es()
            }
        })), new Fc(this.Ct, this.xt, t, e, n)
    } Ft() { this.Nt = !1, this.Dt = Uc() } Bt(t, e) { this.Nt = !0, this.Dt = this.Dt.insert(t, e) } Lt(t) { this.Nt = !0, this.Dt = this.Dt.remove(t) } qt() { this.St += 1 } Ut() { this.St -= 1 } Kt() { this.Nt = !0, this.xt = !0 }
} class Bc {
    constructor(t) { this.Gt = t, this.Qt = new Map, this.jt = xa(), this.zt = qc(), this.Wt = new Pi(vs) } Ht(t) {
        for (const e of t.Pt) t.bt && t.bt.isFoundDocument() ? this.Jt(e, t.bt) : this.Yt(e, t.key, t.bt);
        for (const e of t.removedTargetIds) this.Yt(e, t.key, t.bt)
    } Xt(t) {
        this.forEachTarget(t, (e => {
            const n = this.Zt(e);
            switch (t.state) {
                case 0: this.te(e) && n.$t(t.resumeToken);
                    break;
                case 1: n.Ut(), n.kt || n.Ft(), n.$t(t.resumeToken);
                    break;
                case 2: n.Ut(), n.kt || this.removeTarget(e);
                    break;
                case 3: this.te(e) && (n.Kt(), n.$t(t.resumeToken));
                    break;
                case 4: this.te(e) && (this.ee(e), n.$t(t.resumeToken));
                    break;
                default: es()
            }
        }))
    } forEachTarget(t, e) { t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.Qt.forEach(((t, n) => { this.te(n) && e(n) })) } ne(t) {
        var e;
        const n = t.targetId, r = t.Vt.count, s = this.se(n);
        if (s) {
            const i = s.target;
            if (na(i)) if (0 === r) {
                const t = new Ds(i.path);
                this.Yt(n, t, Co.newNoDocument(t, Ts.min()))
            } else ns(1 === r);
            else {
                const s = this.ie(n);
                if (s !== r) {
                    const r = this.re(t, s);
                    if (0 !== r) {
                        this.ee(n);
                        const t = 2 === r ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
                        this.Wt = this.Wt.insert(n, t)
                    } null === (e = _c.instance) || void 0 === e || e.notifyOnExistenceFilterMismatch(function (t, e, n) {
                        var r, s, i, o, a, c;
                        const u = { localCacheCount: e, existenceFilterCount: n.count }, l = n.unchangedNames;
                        return l && (u.bloomFilter = { applied: 0 === t, hashCount: null !== (r = null == l ? void 0 : l.hashCount) && void 0 !== r ? r : 0, bitmapLength: null !== (o = null === (i = null === (s = null == l ? void 0 : l.bits) || void 0 === s ? void 0 : s.bitmap) || void 0 === i ? void 0 : i.length) && void 0 !== o ? o : 0, padding: null !== (c = null === (a = null == l ? void 0 : l.bits) || void 0 === a ? void 0 : a.padding) && void 0 !== c ? c : 0 }), u
                    }(r, s, t.Vt))
                }
            }
        }
    } re(t, e) {
        const { unchangedNames: n, count: r } = t.Vt;
        if (!n || !n.bits) return 1;
        const { bits: { bitmap: s = "", padding: i = 0 }, hashCount: o = 0 } = n;
        let a, c;
        try { a = Xi(s).toUint8Array() } catch (t) {
            if (t instanceof Gi) return Zr("Decoding the base64 bloom filter in existence filter failed (" + t.message + "); 
 ignoring the bloom filter and falling back to full re - query."), 1; 
 throw t
        } try { c = new kc(a, i, o) } catch (t) { return Zr(t instanceof Rc ? "BloomFilter error: " : "Applying bloom filter failed: ", t), 1 } return 0 === c.It ? 1 : r !== e - this.oe(t.targetId, c) ? 2 : 0
    } oe(t, e) {
        const n = this.Gt.getRemoteKeysForTarget(t);
        let r = 0;
        return n.forEach((n => {
            const s = this.Gt.ue(), i = `projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;
            e.vt(i) || (this.Yt(t, n, null), r++)
        })), r
    } ce(t) {
        const e = new Map;
        this.Qt.forEach(((n, r) => {
            const s = this.se(r);
            if (s) {
                if (n.current && na(s.target)) {
                    const e = new Ds(s.target.path);
                    null !== this.jt.get(e) || this.ae(r, e) || this.Yt(r, e, Co.newNoDocument(e, t))
                } n.Mt && (e.set(r, n.Ot()), n.Ft())
            }
        }));
        let n = Oa();
        this.zt.forEach(((t, e) => {
            let r = !0;
            e.forEachWhile((t => {
                const e = this.se(t);
                return !e || "TargetPurposeLimboResolution" === e.purpose || (r = !1, !1)
            })), r && (n = n.add(t))
        })), this.jt.forEach(((e, n) => n.setReadTime(t)));
        const r = new Mc(t, e, this.Wt, this.jt, n);
        return this.jt = xa(), this.zt = qc(), this.Wt = new Pi(vs), r
    } Jt(t, e) {
        if (!this.te(t)) return;
        const n = this.ae(t, e.key) ? 2 : 0;
        this.Zt(t).Bt(e.key, n), this.jt = this.jt.insert(e.key, e), this.zt = this.zt.insert(e.key, this.he(e.key).add(t))
    } Yt(t, e, n) {
        if (!this.te(t)) return;
        const r = this.Zt(t);
        this.ae(t, e) ? r.Bt(e, 1) : r.Lt(e), this.zt = this.zt.insert(e, this.he(e).delete(t)), n && (this.jt = this.jt.insert(e, n))
    } removeTarget(t) { this.Qt.delete(t) } ie(t) {
        const e = this.Zt(t).Ot();
        return this.Gt.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size
    } qt(t) { this.Zt(t).qt() } Zt(t) {
        let e = this.Qt.get(t);
        return e || (e = new Vc, this.Qt.set(t, e)), e
    } he(t) {
        let e = this.zt.get(t);
        return e || (e = new qi(vs), this.zt = this.zt.insert(t, e)), e
    } te(t) {
        const e = null !== this.se(t);
        return e || Yr("WatchChangeAggregator", "Detected inactive target", t), e
    } se(t) {
        const e = this.Qt.get(t);
        return e && e.kt ? null : this.Gt.le(t)
    } ee(t) { this.Qt.set(t, new Vc), this.Gt.getRemoteKeysForTarget(t).forEach((e => { this.Yt(t, e, null) })) } ae(t, e) { return this.Gt.getRemoteKeysForTarget(t).has(e) }
} function qc() { return new Pi(Ds.comparator) } function Uc() { return new Pi(Ds.comparator) } const jc = { asc: "ASCENDING", desc: "DESCENDING" }, zc = { "<": "LESS_THAN", "<=": "LESS_THAN_OR_EQUAL", ">": "GREATER_THAN", ">=": "GREATER_THAN_OR_EQUAL", "==": "EQUAL", "!=": "NOT_EQUAL", "array-contains": "ARRAY_CONTAINS", in: "IN", "not-in": "NOT_IN", "array-contains-any": "ARRAY_CONTAINS_ANY" }, Gc = { and: "AND", or: "OR" };
class Kc { constructor(t, e) { this.databaseId = t, this.useProto3Json = e } } function $c(t, e) { return t.useProto3Json || ni(e) ? e : { value: e } } function Qc(t, e) { return t.useProto3Json ? `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z` : { seconds: "" + e.seconds, nanos: e.nanoseconds } } function Hc(t, e) { return t.useProto3Json ? e.toBase64() : e.toUint8Array() } function Wc(t, e) { return Qc(t, e.toTimestamp()) } function Xc(t) {
    return ns(!!t), Ts.fromTimestamp(function (t) {
        const e = Hi(t);
        return new Es(e.seconds, e.nanos)
    }(t))
} function Yc(t, e) { return function (t) { return new _s(["projects", t.projectId, "databases", t.database]) }(t).child("documents").child(e).canonicalString() } function Jc(t) {
    const e = _s.fromString(t);
    return ns(bu(e)), e
} function Zc(t, e) { return Yc(t.databaseId, e.path) } function tu(t, e) {
    const n = Jc(e);
    if (n.get(1) !== t.databaseId.projectId) throw new os(is.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
    if (n.get(3) !== t.databaseId.database) throw new os(is.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
    return new Ds(su(n))
} function eu(t, e) { return Yc(t.databaseId, e) } function nu(t) {
    const e = Jc(t);
    return 4 === e.length ? _s.emptyPath() : su(e)
} function ru(t) { return new _s(["projects", t.databaseId.projectId, "databases", t.databaseId.database]).canonicalString() } function su(t) { return ns(t.length > 4 && "documents" === t.get(4)), t.popFirst(5) } function iu(t, e, n) { return { name: Zc(t, e), fields: n.value.mapValue.fields } } function ou(t, e, n) {
    const r = tu(t, e.name), s = Xc(e.updateTime), i = e.createTime ? Xc(e.createTime) : Ts.min(), o = new _o({ mapValue: { fields: e.fields } }), a = Co.newFoundDocument(r, s, i, o);
    return n && a.setHasCommittedMutations(), n ? a.setHasCommittedMutations() : a
} function au(t, e) {
    let n;
    if (e instanceof uc) n = { update: iu(t, e.key, e.value) };
    else if (e instanceof gc) n = { delete: Zc(t, e.key) };
    else if (e instanceof lc) n = { update: iu(t, e.key, e.data), updateMask: vu(e.fieldMask) };
    else {
        if (!(e instanceof mc)) return es();
        n = { verify: Zc(t, e.key) }
    } return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((t => function (t, e) {
        const n = e.transform;
        if (n instanceof Ka) return { fieldPath: e.field.canonicalString(), setToServerValue: "REQUEST_TIME" };
        if (n instanceof $a) return { fieldPath: e.field.canonicalString(), appendMissingElements: { values: n.elements } };
        if (n instanceof Ha) return { fieldPath: e.field.canonicalString(), removeAllFromArray: { values: n.elements } };
        if (n instanceof Xa) return { fieldPath: e.field.canonicalString(), increment: n.gt };
        throw es()
    }(0, t)))), e.precondition.isNone || (n.currentDocument = function (t, e) { return void 0 !== e.updateTime ? { updateTime: Wc(t, e.updateTime) } : void 0 !== e.exists ? { exists: e.exists } : es() }(t, e.precondition)), n
} function cu(t, e) {
    const n = e.currentDocument ? function (t) { return void 0 !== t.updateTime ? ec.updateTime(Xc(t.updateTime)) : void 0 !== t.exists ? ec.exists(t.exists) : ec.none() }(e.currentDocument) : ec.none(), r = e.updateTransforms ? e.updateTransforms.map((e => function (t, e) {
        let n = null;
        if ("setToServerValue" in e) ns("REQUEST_TIME" === e.setToServerValue), n = new Ka;
        else if ("appendMissingElements" in e) {
            const t = e.appendMissingElements.values || [];
            n = new $a(t)
        } else if ("removeAllFromArray" in e) {
            const t = e.removeAllFromArray.values || [];
            n = new Ha(t)
        } else "increment" in e ? n = new Xa(t, e.increment) : es();
        const r = Cs.fromServerFormat(e.fieldPath);
        return new Za(r, n)
    }(t, e))) : [];
    if (e.update) {
        e.update.name;
        const s = tu(t, e.update.name), i = new _o({ mapValue: { fields: e.update.fields } });
        if (e.updateMask) {
            const t = function (t) {
                const e = t.fieldPaths || [];
                return new zi(e.map((t => Cs.fromServerFormat(t))))
            }(e.updateMask);
            return new lc(s, i, t, n, r)
        } return new uc(s, i, n, r)
    } if (e.delete) {
        const r = tu(t, e.delete);
        return new gc(r, n)
    } if (e.verify) {
        const r = tu(t, e.verify);
        return new mc(r, n)
    } return es()
} function uu(t, e) { return { documents: [eu(t, e.path)] } } function lu(t, e) {
    const n = { structuredQuery: {} }, r = e.path;
    null !== e.collectionGroup ? (n.parent = eu(t, r), n.structuredQuery.from = [{ collectionId: e.collectionGroup, allDescendants: !0 }]) : (n.parent = eu(t, r.popLast()), n.structuredQuery.from = [{ collectionId: r.lastSegment() }]);
    const s = function (t) { if (0 !== t.length) return wu(Oo.create(t, "and")) }(e.filters);
    s && (n.structuredQuery.where = s);
    const i = function (t) { if (0 !== t.length) return t.map((t => function (t) { return { field: pu(t.field), direction: fu(t.dir) } }(t))) }(e.orderBy);
    i && (n.structuredQuery.orderBy = i);
    const o = $c(t, e.limit);
    var a;
    return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = { before: (a = e.startAt).inclusive, values: a.position }), e.endAt && (n.structuredQuery.endAt = function (t) { return { before: !t.inclusive, values: t.position } }(e.endAt)), n
} function hu(t) {
    let e = nu(t.parent);
    const n = t.structuredQuery, r = n.from ? n.from.length : 0;
    let s = null;
    if (r > 0) {
        ns(1 === r);
        const t = n.from[0];
        t.allDescendants ? s = t.collectionId : e = e.child(t.collectionId)
    } let i = [];
    n.where && (i = function (t) {
        const e = du(t);
        return e instanceof Oo && Vo(e) ? e.getFilters() : [e]
    }(n.where));
    let o = [];
    n.orderBy && (o = n.orderBy.map((t => function (t) {
        return new ko(yu(t.field), function (t) {
            switch (t) {
                case "ASCENDING": return "asc";
                case "DESCENDING": return "desc";
                default: return
            }
        }(t.direction))
    }(t))));
    let a = null;
    n.limit && (a = function (t) {
        let e;
        return e = "object" == typeof t ? t.value : t, ni(e) ? null : e
    }(n.limit));
    let c = null;
    n.startAt && (c = function (t) {
        const e = !!t.before, n = t.values || [];
        return new Do(n, e)
    }(n.startAt));
    let u = null;
    return n.endAt && (u = function (t) {
        const e = !t.before, n = t.values || [];
        return new Do(n, e)
    }(n.endAt)), aa(e, s, o, i, a, "F", c, u)
} function du(t) {
    return void 0 !== t.unaryFilter ? function (t) {
        switch (t.unaryFilter.op) {
            case "IS_NAN": const e = yu(t.unaryFilter.field);
                return Fo.create(e, "==", { doubleValue: NaN });
            case "IS_NULL": const n = yu(t.unaryFilter.field);
                return Fo.create(n, "==", { nullValue: "NULL_VALUE" });
            case "IS_NOT_NAN": const r = yu(t.unaryFilter.field);
                return Fo.create(r, "!=", { doubleValue: NaN });
            case "IS_NOT_NULL": const s = yu(t.unaryFilter.field);
                return Fo.create(s, "!=", { nullValue: "NULL_VALUE" });
            default: return es()
        }
    }(t) : void 0 !== t.fieldFilter ? function (t) {
        return Fo.create(yu(t.fieldFilter.field), function (t) {
            switch (t) {
                case "EQUAL": return "==";
                case "NOT_EQUAL": return "!=";
                case "GREATER_THAN": return ">";
                case "GREATER_THAN_OR_EQUAL": return ">=";
                case "LESS_THAN": return "<";
                case "LESS_THAN_OR_EQUAL": return "<=";
                case "ARRAY_CONTAINS": return "array-contains";
                case "IN": return "in";
                case "NOT_IN": return "not-in";
                case "ARRAY_CONTAINS_ANY": return "array-contains-any";
                default: return es()
            }
        }(t.fieldFilter.op), t.fieldFilter.value)
    }(t) : void 0 !== t.compositeFilter ? function (t) {
        return Oo.create(t.compositeFilter.filters.map((t => du(t))), function (t) {
            switch (t) {
                case "AND": return "and";
                case "OR": return "or";
                default: return es()
            }
        }(t.compositeFilter.op))
    }(t) : es()
} function fu(t) { return jc[t] } function gu(t) { return zc[t] } function mu(t) { return Gc[t] } function pu(t) { return { fieldPath: t.canonicalString() } } function yu(t) { return Cs.fromServerFormat(t.fieldPath) } function wu(t) {
    return t instanceof Fo ? function (t) {
        if ("==" === t.op) {
            if (yo(t.value)) return { unaryFilter: { field: pu(t.field), op: "IS_NAN" } };
            if (po(t.value)) return { unaryFilter: { field: pu(t.field), op: "IS_NULL" } }
        } else if ("!=" === t.op) {
            if (yo(t.value)) return { unaryFilter: { field: pu(t.field), op: "IS_NOT_NAN" } };
            if (po(t.value)) return { unaryFilter: { field: pu(t.field), op: "IS_NOT_NULL" } }
        } return { fieldFilter: { field: pu(t.field), op: gu(t.op), value: t.value } }
    }(t) : t instanceof Oo ? function (t) {
        const e = t.getFilters().map((t => wu(t)));
        return 1 === e.length ? e[0] : { compositeFilter: { op: mu(t.op), filters: e } }
    }(t) : es()
} function vu(t) {
    const e = [];
    return t.fields.forEach((t => e.push(t.canonicalString()))), { fieldPaths: e }
} function bu(t) { return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2) } class Iu { constructor(t, e, n, r, s = Ts.min(), i = Ts.min(), o = $i.EMPTY_BYTE_STRING, a = null) { this.target = t, this.targetId = e, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = s, this.lastLimboFreeSnapshotVersion = i, this.resumeToken = o, this.expectedCount = a } withSequenceNumber(t) { return new Iu(this.target, this.targetId, this.purpose, t, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount) } withResumeToken(t, e) { return new Iu(this.target, this.targetId, this.purpose, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t, null) } withExpectedCount(t) { return new Iu(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, t) } withLastLimboFreeSnapshotVersion(t) { return new Iu(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, t, this.resumeToken, this.expectedCount) } } class Eu { constructor(t) { this.fe = t } } function Tu(t, e) {
    const n = e.key, r = { prefixPath: n.getCollectionPath().popLast().toArray(), collectionGroup: n.collectionGroup, documentId: n.path.lastSegment(), readTime: Su(e.readTime), hasCommittedMutations: e.hasCommittedMutations };
    if (e.isFoundDocument()) r.document = function (t, e) { return { name: Zc(t, e.key), fields: e.data.value.mapValue.fields, updateTime: Qc(t, e.version.toTimestamp()), createTime: Qc(t, e.createTime.toTimestamp()) } }(t.fe, e);
    else if (e.isNoDocument()) r.noDocument = { path: n.path.toArray(), readTime: _u(e.version) };
    else {
        if (!e.isUnknownDocument()) return es();
        r.unknownDocument = { path: n.path.toArray(), version: _u(e.version) }
    } return r
} function Su(t) {
    const e = t.toTimestamp();
    return [e.seconds, e.nanoseconds]
} function _u(t) {
    const e = t.toTimestamp();
    return { seconds: e.seconds, nanoseconds: e.nanoseconds }
} function xu(t) {
    const e = new Es(t.seconds, t.nanoseconds);
    return Ts.fromTimestamp(e)
} function Cu(t, e) {
    const n = (e.baseMutations || []).map((e => cu(t.fe, e)));
    for (let t = 0;
        t < e.mutations.length - 1;
        ++t) {
            const n = e.mutations[t];
        if (t + 1 < e.mutations.length && void 0 !== e.mutations[t + 1].transform) {
            const r = e.mutations[t + 1];
            n.updateTransforms = r.transform.fieldTransforms, e.mutations.splice(t + 1, 1), ++t
        }
    } const r = e.mutations.map((e => cu(t.fe, e))), s = Es.fromMillis(e.localWriteTimeMs);
    return new pc(e.batchId, s, n, r)
} function Du(t) {
    const e = xu(t.readTime), n = void 0 !== t.lastLimboFreeSnapshotVersion ? xu(t.lastLimboFreeSnapshotVersion) : Ts.min();
    let r;
    var s;
    return void 0 !== t.query.documents ? (ns(1 === (s = t.query).documents.length), r = ga(ca(nu(s.documents[0])))) : r = function (t) { return ga(hu(t)) }(t.query), new Iu(r, t.targetId, "TargetPurposeListen", t.lastListenSequenceNumber, e, n, $i.fromBase64String(t.resumeToken))
} function Au(t, e) {
    const n = _u(e.snapshotVersion), r = _u(e.lastLimboFreeSnapshotVersion);
    let s;
    s = na(e.target) ? uu(t.fe, e.target) : lu(t.fe, e.target);
    const i = e.resumeToken.toBase64();
    return { targetId: e.targetId, canonicalId: ta(e.target), readTime: n, resumeToken: i, lastListenSequenceNumber: e.sequenceNumber, lastLimboFreeSnapshotVersion: r, query: s }
} function Nu(t) {
    const e = hu({ parent: t.parent, structuredQuery: t.structuredQuery });
    return "LAST" === t.limitType ? pa(e, e.limit, "L") : e
} function ku(t, e) { return new wc(e.largestBatchId, cu(t.fe, e.overlayMutation)) } function Ru(t, e) {
    const n = e.path.lastSegment();
    return [t, ii(e.path.popLast()), n]
} function Mu(t, e, n, r) { return { indexId: t, uid: e.uid || "", sequenceNumber: n, readTime: _u(r.readTime), documentKey: ii(r.documentKey.path), largestBatchId: r.largestBatchId } } class Fu {
    getBundleMetadata(t, e) {
        return Ou(t).get(e).next((t => {
            if (t) return { id: (e = t).bundleId, createTime: xu(e.createTime), version: e.version };
            var e
        }))
    } saveBundleMetadata(t, e) {
        return Ou(t).put({ bundleId: (n = e).id, createTime: _u(Xc(n.createTime)), version: n.version });
        var n
    } getNamedQuery(t, e) {
        return Lu(t).get(e).next((t => {
            if (t) return { name: (e = t).name, query: Nu(e.bundledQuery), readTime: xu(e.readTime) };
            var e
        }))
    } saveNamedQuery(t, e) { return Lu(t).put(function (t) { return { name: t.name, readTime: _u(Xc(t.readTime)), bundledQuery: t.bundledQuery } }(e)) }
} function Ou(t) { return Mi(t, "bundles") } function Lu(t) { return Mi(t, "namedQueries") } class Pu {
    constructor(t, e) { this.serializer = t, this.userId = e } static de(t, e) {
        const n = e.uid || "";
        return new Pu(t, n)
    } getOverlay(t, e) { return Vu(t).get(Ru(this.userId, e)).next((t => t ? ku(this.serializer, t) : null)) } getOverlays(t, e) {
        const n = Na();
        return zs.forEach(e, (e => this.getOverlay(t, e).next((t => { null !== t && n.set(e, t) })))).next((() => n))
    } saveOverlays(t, e, n) {
        const r = [];
        return n.forEach(((n, s) => {
            const i = new wc(e, s);
            r.push(this.we(t, i))
        })), zs.waitFor(r)
    } removeOverlaysForBatchId(t, e, n) {
        const r = new Set;
        e.forEach((t => r.add(ii(t.getCollectionPath()))));
        const s = [];
        return r.forEach((e => {
            const r = IDBKeyRange.bound([this.userId, e, n], [this.userId, e, n + 1], !1, !0);
            s.push(Vu(t).J("collectionPathOverlayIndex", r))
        })), zs.waitFor(s)
    } getOverlaysForCollection(t, e, n) {
        const r = Na(), s = ii(e), i = IDBKeyRange.bound([this.userId, s, n], [this.userId, s, Number.POSITIVE_INFINITY], !0);
        return Vu(t).j("collectionPathOverlayIndex", i).next((t => {
            for (const e of t) {
                const t = ku(this.serializer, e);
                r.set(t.getKey(), t)
            } return r
        }))
    } getOverlaysForCollectionGroup(t, e, n, r) {
        const s = Na();
        let i;
        const o = IDBKeyRange.bound([this.userId, e, n], [this.userId, e, Number.POSITIVE_INFINITY], !0);
        return Vu(t).X({ index: "collectionGroupOverlayIndex", range: o }, ((t, e, n) => {
            const o = ku(this.serializer, e);
            s.size() < r || o.largestBatchId === i ? (s.set(o.getKey(), o), i = o.largestBatchId) : n.done()
        })).next((() => s))
    } we(t, e) {
        return Vu(t).put(function (t, e, n) {
            const [r, s, i] = Ru(e, n.mutation.key);
            return { userId: e, collectionPath: s, documentId: i, collectionGroup: n.mutation.key.getCollectionGroup(), largestBatchId: n.largestBatchId, overlayMutation: au(t.fe, n.mutation) }
        }(this.serializer, this.userId, e))
    }
} function Vu(t) { return Mi(t, "documentOverlays") } class Bu {
    constructor() { } _e(t, e) { this.me(t, e), e.ge() } me(t, e) {
        if ("nullValue" in t) this.ye(e, 5);
        else if ("booleanValue" in t) this.ye(e, 10), e.pe(t.booleanValue ? 1 : 0);
        else if ("integerValue" in t) this.ye(e, 15), e.pe(Wi(t.integerValue));
        else if ("doubleValue" in t) {
            const n = Wi(t.doubleValue);
            isNaN(n) ? this.ye(e, 13) : (this.ye(e, 15), ri(n) ? e.pe(0) : e.pe(n))
        } else if ("timestampValue" in t) {
            const n = t.timestampValue;
            this.ye(e, 20), "string" == typeof n ? e.Ie(n) : (e.Ie(`${n.seconds || ""}`), e.pe(n.nanos || 0))
        } else if ("stringValue" in t) this.Te(t.stringValue, e), this.Ee(e);
        else if ("bytesValue" in t) this.ye(e, 30), e.Ae(Xi(t.bytesValue)), this.Ee(e);
        else if ("referenceValue" in t) this.ve(t.referenceValue, e);
        else if ("geoPointValue" in t) {
            const n = t.geoPointValue;
            this.ye(e, 45), e.pe(n.latitude || 0), e.pe(n.longitude || 0)
        } else "mapValue" in t ? bo(t) ? this.ye(e, Number.MAX_SAFE_INTEGER) : (this.Re(t.mapValue, e), this.Ee(e)) : "arrayValue" in t ? (this.Pe(t.arrayValue, e), this.Ee(e)) : es()
    } Te(t, e) { this.ye(e, 25), this.be(t, e) } be(t, e) { e.Ie(t) } Re(t, e) {
        const n = t.fields || {};
        this.ye(e, 55);
        for (const t of Object.keys(n)) this.Te(t, e), this.me(n[t], e)
    } Pe(t, e) {
        const n = t.values || [];
        this.ye(e, 50);
        for (const t of n) this.me(t, e)
    } ve(t, e) { this.ye(e, 37), Ds.fromName(t).path.forEach((t => { this.ye(e, 60), this.be(t, e) })) } ye(t, e) { t.pe(e) } Ee(t) { t.pe(2) }
} function qu(t) {
    if (0 === t) return 8;
    let e = 0;
    return t >> 4 == 0 && (e += 4, t <<= 4), t >> 6 == 0 && (e += 2, t <<= 2), t >> 7 == 0 && (e += 1), e
} function Uu(t) {
    const e = 64 - function (t) {
        let e = 0;
        for (let n = 0;
            n < 8;
            ++n) {
                const r = qu(255 & t[n]);
            if (e += r, 8 !== r) break
        } return e
    }(t);
    return Math.ceil(e / 8)
} Bu.Ve = new Bu;
class ju {
    constructor() { this.buffer = new Uint8Array(1024), this.position = 0 } Se(t) {
        const e = t[Symbol.iterator]();
        let n = e.next();
        for (;
            !n.done;
        )this.De(n.value), n = e.next();
        this.Ce()
    } xe(t) {
        const e = t[Symbol.iterator]();
        let n = e.next();
        for (;
            !n.done;
        )this.Ne(n.value), n = e.next();
        this.ke()
    } Me(t) {
        for (const e of t) {
            const t = e.charCodeAt(0);
            if (t < 128) this.De(t);
            else if (t < 2048) this.De(960 | t >>> 6), this.De(128 | 63 & t);
            else if (e < "\ud800" || "\udbff" < e) this.De(480 | t >>> 12), this.De(128 | 63 & t >>> 6), this.De(128 | 63 & t);
            else {
                const t = e.codePointAt(0);
                this.De(240 | t >>> 18), this.De(128 | 63 & t >>> 12), this.De(128 | 63 & t >>> 6), this.De(128 | 63 & t)
            }
        } this.Ce()
    } $e(t) {
        for (const e of t) {
            const t = e.charCodeAt(0);
            if (t < 128) this.Ne(t);
            else if (t < 2048) this.Ne(960 | t >>> 6), this.Ne(128 | 63 & t);
            else if (e < "\ud800" || "\udbff" < e) this.Ne(480 | t >>> 12), this.Ne(128 | 63 & t >>> 6), this.Ne(128 | 63 & t);
            else {
                const t = e.codePointAt(0);
                this.Ne(240 | t >>> 18), this.Ne(128 | 63 & t >>> 12), this.Ne(128 | 63 & t >>> 6), this.Ne(128 | 63 & t)
            }
        } this.ke()
    } Oe(t) {
        const e = this.Fe(t), n = Uu(e);
        this.Be(1 + n), this.buffer[this.position++] = 255 & n;
        for (let t = e.length - n;
            t < e.length;
            ++t)this.buffer[this.position++] = 255 & e[t]
    } Le(t) {
        const e = this.Fe(t), n = Uu(e);
        this.Be(1 + n), this.buffer[this.position++] = ~(255 & n);
        for (let t = e.length - n;
            t < e.length;
            ++t)this.buffer[this.position++] = ~(255 & e[t])
    } qe() { this.Ue(255), this.Ue(255) } Ke() { this.Ge(255), this.Ge(255) } reset() { this.position = 0 } seed(t) { this.Be(t.length), this.buffer.set(t, this.position), this.position += t.length } Qe() { return this.buffer.slice(0, this.position) } Fe(t) {
        const e = function (t) {
            const e = new DataView(new ArrayBuffer(8));
            return e.setFloat64(0, t, !1), new Uint8Array(e.buffer)
        }(t), n = 0 != (128 & e[0]);
        e[0] ^= n ? 255 : 128;
        for (let t = 1;
            t < e.length;
            ++t)e[t] ^= n ? 255 : 0;
        return e
    } De(t) {
        const e = 255 & t;
        0 === e ? (this.Ue(0), this.Ue(255)) : 255 === e ? (this.Ue(255), this.Ue(0)) : this.Ue(e)
    } Ne(t) {
        const e = 255 & t;
        0 === e ? (this.Ge(0), this.Ge(255)) : 255 === e ? (this.Ge(255), this.Ge(0)) : this.Ge(t)
    } Ce() { this.Ue(0), this.Ue(1) } ke() { this.Ge(0), this.Ge(1) } Ue(t) { this.Be(1), this.buffer[this.position++] = t } Ge(t) { this.Be(1), this.buffer[this.position++] = ~t } Be(t) {
        const e = t + this.position;
        if (e <= this.buffer.length) return;
        let n = 2 * this.buffer.length;
        n < e && (n = e);
        const r = new Uint8Array(n);
        r.set(this.buffer), this.buffer = r
    }
} class zu { constructor(t) { this.je = t } Ae(t) { this.je.Se(t) } Ie(t) { this.je.Me(t) } pe(t) { this.je.Oe(t) } ge() { this.je.qe() } } class Gu { constructor(t) { this.je = t } Ae(t) { this.je.xe(t) } Ie(t) { this.je.$e(t) } pe(t) { this.je.Le(t) } ge() { this.je.Ke() } } class Ku { constructor() { this.je = new ju, this.ze = new zu(this.je), this.We = new Gu(this.je) } seed(t) { this.je.seed(t) } He(t) { return 0 === t ? this.ze : this.We } Qe() { return this.je.Qe() } reset() { this.je.reset() } } class $u {
    constructor(t, e, n, r) { this.indexId = t, this.documentKey = e, this.arrayValue = n, this.directionalValue = r } Je() {
        const t = this.directionalValue.length, e = 0 === t || 255 === this.directionalValue[t - 1] ? t + 1 : t, n = new Uint8Array(e);
        return n.set(this.directionalValue, 0), e !== t ? n.set([0], this.directionalValue.length) : ++n[n.length - 1], new $u(this.indexId, this.documentKey, this.arrayValue, n)
    }
} function Qu(t, e) {
    let n = t.indexId - e.indexId;
    return 0 !== n ? n : (n = Hu(t.arrayValue, e.arrayValue), 0 !== n ? n : (n = Hu(t.directionalValue, e.directionalValue), 0 !== n ? n : Ds.comparator(t.documentKey, e.documentKey)))
} function Hu(t, e) {
    for (let n = 0;
        n < t.length && n < e.length;
        ++n) {
            const r = t[n] - e[n];
        if (0 !== r) return r
    } return t.length - e.length
} class Wu {
    constructor(t) {
        this.collectionId = null != t.collectionGroup ? t.collectionGroup : t.path.lastSegment(), this.Ye = t.orderBy, this.Xe = [];
        for (const e of t.filters) {
            const t = e;
            t.isInequality() ? this.Ze = t : this.Xe.push(t)
        }
    } tn(t) {
        ns(t.collectionGroup === this.collectionId);
        const e = Ns(t);
        if (void 0 !== e && !this.en(e)) return !1;
        const n = ks(t);
        let r = new Set, s = 0, i = 0;
        for (;
            s < n.length && this.en(n[s]);
            ++s)r = r.add(n[s].fieldPath.canonicalString());
        if (s === n.length) return !0;
        if (void 0 !== this.Ze) {
            if (!r.has(this.Ze.field.canonicalString())) {
                const t = n[s];
                if (!this.nn(this.Ze, t) || !this.sn(this.Ye[i++], t)) return !1
            } ++s
        } for (;
            s < n.length;
            ++s) {
                const t = n[s];
            if (i >= this.Ye.length || !this.sn(this.Ye[i++], t)) return !1
        } return !0
    } en(t) {
        for (const e of this.Xe) if (this.nn(e, t)) return !0;
        return !1
    } nn(t, e) {
        if (void 0 === t || !t.field.isEqual(e.fieldPath)) return !1;
        const n = "array-contains" === t.op || "array-contains-any" === t.op;
        return 2 === e.kind === n
    } sn(t, e) { return !!t.field.isEqual(e.fieldPath) && (0 === e.kind && "asc" === t.dir || 1 === e.kind && "desc" === t.dir) }
} function Xu(t) {
    var e, n;
    if (ns(t instanceof Fo || t instanceof Oo), t instanceof Fo) {
        if (t instanceof Wo) {
            const r = (null === (n = null === (e = t.value.arrayValue) || void 0 === e ? void 0 : e.values) || void 0 === n ? void 0 : n.map((e => Fo.create(t.field, "==", e)))) || [];
            return Oo.create(r, "or")
        } return t
    } const r = t.filters.map((t => Xu(t)));
    return Oo.create(r, t.op)
} function Yu(t) {
    if (0 === t.getFilters().length) return [];
    const e = el(Xu(t));
    return ns(tl(e)), Ju(e) || Zu(e) ? [e] : e.getFilters()
} function Ju(t) { return t instanceof Fo } function Zu(t) { return t instanceof Oo && Vo(t) } function tl(t) {
    return Ju(t) || Zu(t) || function (t) {
        if (t instanceof Oo && Po(t)) {
            for (const e of t.getFilters()) if (!Ju(e) && !Zu(e)) return !1;
            return !0
        } return !1
    }(t)
} function el(t) {
    if (ns(t instanceof Fo || t instanceof Oo), t instanceof Fo) return t;
    if (1 === t.filters.length) return el(t.filters[0]);
    const e = t.filters.map((t => el(t)));
    let n = Oo.create(e, t.op);
    return n = sl(n), tl(n) ? n : (ns(n instanceof Oo), ns(Lo(n)), ns(n.filters.length > 1), n.filters.reduce(((t, e) => nl(t, e))))
} function nl(t, e) {
    let n;
    return ns(t instanceof Fo || t instanceof Oo), ns(e instanceof Fo || e instanceof Oo), n = t instanceof Fo ? e instanceof Fo ? function (t, e) { return Oo.create([t, e], "and") }(t, e) : rl(t, e) : e instanceof Fo ? rl(e, t) : function (t, e) {
        if (ns(t.filters.length > 0 && e.filters.length > 0), Lo(t) && Lo(e)) return jo(t, e.getFilters());
        const n = Po(t) ? t : e, r = Po(t) ? e : t, s = n.filters.map((t => nl(t, r)));
        return Oo.create(s, "or")
    }(t, e), sl(n)
} function rl(t, e) {
    if (Lo(e)) return jo(e, t.getFilters());
    {
        const n = e.filters.map((e => nl(t, e)));
        return Oo.create(n, "or")
    }
} function sl(t) {
    if (ns(t instanceof Fo || t instanceof Oo), t instanceof Fo) return t;
    const e = t.getFilters();
    if (1 === e.length) return sl(e[0]);
    if (Bo(t)) return t;
    const n = e.map((t => sl(t))), r = [];
    return n.forEach((e => { e instanceof Fo ? r.push(e) : e instanceof Oo && (e.op === t.op ? r.push(...e.filters) : r.push(e)) })), 1 === r.length ? r[0] : Oo.create(r, t.op)
} class il { constructor() { this.rn = new ol } addToCollectionParentIndex(t, e) { return this.rn.add(e), zs.resolve() } getCollectionParents(t, e) { return zs.resolve(this.rn.getEntries(e)) } addFieldIndex(t, e) { return zs.resolve() } deleteFieldIndex(t, e) { return zs.resolve() } getDocumentsMatchingTarget(t, e) { return zs.resolve(null) } getIndexType(t, e) { return zs.resolve(0) } getFieldIndexes(t, e) { return zs.resolve([]) } getNextCollectionGroupToUpdate(t) { return zs.resolve(null) } getMinOffset(t, e) { return zs.resolve(Vs.min()) } getMinOffsetFromCollectionGroup(t, e) { return zs.resolve(Vs.min()) } updateCollectionGroup(t, e, n) { return zs.resolve() } updateIndexEntries(t, e) { return zs.resolve() } } class ol {
    constructor() { this.index = {} } add(t) {
        const e = t.lastSegment(), n = t.popLast(), r = this.index[e] || new qi(_s.comparator), s = !r.has(n);
        return this.index[e] = r.add(n), s
    } has(t) {
        const e = t.lastSegment(), n = t.popLast(), r = this.index[e];
        return r && r.has(n)
    } getEntries(t) { return (this.index[t] || new qi(_s.comparator)).toArray() }
} const al = new Uint8Array(0);
class cl {
    constructor(t, e) { this.user = t, this.databaseId = e, this.on = new ol, this.un = new Sa((t => ta(t)), ((t, e) => ea(t, e))), this.uid = t.uid || "" } addToCollectionParentIndex(t, e) {
        if (!this.on.has(e)) {
            const n = e.lastSegment(), r = e.popLast();
            t.addOnCommittedListener((() => { this.on.add(e) }));
            const s = { collectionId: n, parent: ii(r) };
            return ul(t).put(s)
        } return zs.resolve()
    } getCollectionParents(t, e) {
        const n = [], r = IDBKeyRange.bound([e, ""], [Is(e), ""], !1, !0);
        return ul(t).j(r).next((t => {
            for (const r of t) {
                if (r.collectionId !== e) break;
                n.push(ci(r.parent))
            } return n
        }))
    } addFieldIndex(t, e) {
        const n = hl(t), r = function (t) { return { indexId: t.indexId, collectionGroup: t.collectionGroup, fields: t.fields.map((t => [t.fieldPath.canonicalString(), t.kind])) } }(e);
        delete r.indexId;
        const s = n.add(r);
        if (e.indexState) {
            const n = dl(t);
            return s.next((t => { n.put(Mu(t, this.user, e.indexState.sequenceNumber, e.indexState.offset)) }))
        } return s.next()
    } deleteFieldIndex(t, e) {
        const n = hl(t), r = dl(t), s = ll(t);
        return n.delete(e.indexId).next((() => r.delete(IDBKeyRange.bound([e.indexId], [e.indexId + 1], !1, !0)))).next((() => s.delete(IDBKeyRange.bound([e.indexId], [e.indexId + 1], !1, !0))))
    } getDocumentsMatchingTarget(t, e) {
        const n = ll(t);
        let r = !0;
        const s = new Map;
        return zs.forEach(this.cn(e), (e => this.an(t, e).next((t => { r && (r = !!t), s.set(e, t) })))).next((() => {
            if (r) {
                let t = Oa();
                const r = [];
                return zs.forEach(s, ((s, i) => {
                    var o;
                    Yr("IndexedDbIndexManager", `Using index ${o = s, `id=${o.indexId}|cg=${o.collectionGroup}|f=${o.fields.map((t => `${t.fieldPath}:${t.kind}`)).join(",")}`} to execute ${ta(e)}`);
                    const a = function (t, e) {
                        const n = Ns(e);
                        if (void 0 === n) return null;
                        for (const e of ra(t, n.fieldPath)) switch (e.op) {
                            case "array-contains-any": return e.value.arrayValue.values || [];
                            case "array-contains": return [e.value]
                        }return null
                    }(i, s), c = function (t, e) {
                        const n = new Map;
                        for (const r of ks(e)) for (const e of ra(t, r.fieldPath)) switch (e.op) {
                            case "==": case "in": n.set(r.fieldPath.canonicalString(), e.value);
                                break;
                            case "not-in": case "!=": return n.set(r.fieldPath.canonicalString(), e.value), Array.from(n.values())
                        }return null
                    }(i, s), u = function (t, e) {
                        const n = [];
                        let r = !0;
                        for (const s of ks(e)) {
                            const e = 0 === s.kind ? sa(t, s.fieldPath, t.startAt) : ia(t, s.fieldPath, t.startAt);
                            n.push(e.value), r && (r = e.inclusive)
                        } return new Do(n, r)
                    }(i, s), l = function (t, e) {
                        const n = [];
                        let r = !0;
                        for (const s of ks(e)) {
                            const e = 0 === s.kind ? ia(t, s.fieldPath, t.endAt) : sa(t, s.fieldPath, t.endAt);
                            n.push(e.value), r && (r = e.inclusive)
                        } return new Do(n, r)
                    }(i, s), h = this.hn(s, i, u), d = this.hn(s, i, l), f = this.ln(s, i, c), g = this.fn(s.indexId, a, h, u.inclusive, d, l.inclusive, f);
                    return zs.forEach(g, (s => n.H(s, e.limit).next((e => {
                        e.forEach((e => {
                            const n = Ds.fromSegments(e.documentKey);
                            t.has(n) || (t = t.add(n), r.push(n))
                        }))
                    }))))
                })).next((() => r))
            } return zs.resolve(null)
        }))
    } cn(t) {
        let e = this.un.get(t);
        return e || (e = 0 === t.filters.length ? [t] : Yu(Oo.create(t.filters, "and")).map((e => Zo(t.path, t.collectionGroup, t.orderBy, e.getFilters(), t.limit, t.startAt, t.endAt))), this.un.set(t, e), e)
    } fn(t, e, n, r, s, i, o) {
        const a = (null != e ? e.length : 1) * Math.max(n.length, s.length), c = a / (null != e ? e.length : 1), u = [];
        for (let l = 0;
            l < a;
            ++l) {
                const a = e ? this.dn(e[l / c]) : al, h = this.wn(t, a, n[l % c], r), d = this._n(t, a, s[l % c], i), f = o.map((e => this.wn(t, a, e, !0)));
            u.push(...this.createRange(h, d, f))
        } return u
    } wn(t, e, n, r) {
        const s = new $u(t, Ds.empty(), e, n);
        return r ? s : s.Je()
    } _n(t, e, n, r) {
        const s = new $u(t, Ds.empty(), e, n);
        return r ? s.Je() : s
    } an(t, e) {
        const n = new Wu(e), r = null != e.collectionGroup ? e.collectionGroup : e.path.lastSegment();
        return this.getFieldIndexes(t, r).next((t => {
            let e = null;
            for (const r of t) n.tn(r) && (!e || r.fields.length > e.fields.length) && (e = r);
            return e
        }))
    } getIndexType(t, e) {
        let n = 2;
        const r = this.cn(e);
        return zs.forEach(r, (e => this.an(t, e).next((t => {
            t ? 0 !== n && t.fields.length < function (t) {
                let e = new qi(Cs.comparator), n = !1;
                for (const r of t.filters) for (const t of r.getFlattenedFilters()) t.field.isKeyField() || ("array-contains" === t.op || "array-contains-any" === t.op ? n = !0 : e = e.add(t.field));
                for (const n of t.orderBy) n.field.isKeyField() || (e = e.add(n.field));
                return e.size + (n ? 1 : 0)
            }(e) && (n = 1) : n = 0
        })))).next((() => function (t) { return null !== t.limit }(e) && r.length > 1 && 2 === n ? 1 : n))
    } mn(t, e) {
        const n = new Ku;
        for (const r of ks(t)) {
            const t = e.data.field(r.fieldPath);
            if (null == t) return null;
            const s = n.He(r.kind);
            Bu.Ve._e(t, s)
        } return n.Qe()
    } dn(t) {
        const e = new Ku;
        return Bu.Ve._e(t, e.He(0)), e.Qe()
    } gn(t, e) {
        const n = new Ku;
        return Bu.Ve._e(fo(this.databaseId, e), n.He(function (t) {
            const e = ks(t);
            return 0 === e.length ? 0 : e[e.length - 1].kind
        }(t))), n.Qe()
    } ln(t, e, n) {
        if (null === n) return [];
        let r = [];
        r.push(new Ku);
        let s = 0;
        for (const i of ks(t)) {
            const t = n[s++];
            for (const n of r) if (this.yn(e, i.fieldPath) && mo(t)) r = this.pn(r, i, t);
            else {
                const e = n.He(i.kind);
                Bu.Ve._e(t, e)
            }
        } return this.In(r)
    } hn(t, e, n) { return this.ln(t, e, n.position) } In(t) {
        const e = [];
        for (let n = 0;
            n < t.length;
            ++n)e[n] = t[n].Qe();
        return e
    } pn(t, e, n) {
        const r = [...t], s = [];
        for (const t of n.arrayValue.values || []) for (const n of r) {
            const r = new Ku;
            r.seed(n.Qe()), Bu.Ve._e(t, r.He(e.kind)), s.push(r)
        } return s
    } yn(t, e) { return !!t.filters.find((t => t instanceof Fo && t.field.isEqual(e) && ("in" === t.op || "not-in" === t.op))) } getFieldIndexes(t, e) {
        const n = hl(t), r = dl(t);
        return (e ? n.j("collectionGroupIndex", IDBKeyRange.bound(e, e)) : n.j()).next((t => {
            const e = [];
            return zs.forEach(t, (t => r.get([t.indexId, this.uid]).next((n => {
                e.push(function (t, e) {
                    const n = e ? new Os(e.sequenceNumber, new Vs(xu(e.readTime), new Ds(ci(e.documentKey)), e.largestBatchId)) : Os.empty(), r = t.fields.map((([t, e]) => new Ms(Cs.fromServerFormat(t), e)));
                    return new As(t.indexId, t.collectionGroup, r, n)
                }(t, n))
            })))).next((() => e))
        }))
    } getNextCollectionGroupToUpdate(t) {
        return this.getFieldIndexes(t).next((t => 0 === t.length ? null : (t.sort(((t, e) => {
            const n = t.indexState.sequenceNumber - e.indexState.sequenceNumber;
            return 0 !== n ? n : vs(t.collectionGroup, e.collectionGroup)
        })), t[0].collectionGroup)))
    } updateCollectionGroup(t, e, n) {
        const r = hl(t), s = dl(t);
        return this.Tn(t).next((t => r.j("collectionGroupIndex", IDBKeyRange.bound(e, e)).next((e => zs.forEach(e, (e => s.put(Mu(e.indexId, this.user, t, n))))))))
    } updateIndexEntries(t, e) {
        const n = new Map;
        return zs.forEach(e, ((e, r) => {
            const s = n.get(e.collectionGroup);
            return (s ? zs.resolve(s) : this.getFieldIndexes(t, e.collectionGroup)).next((s => (n.set(e.collectionGroup, s), zs.forEach(s, (n => this.En(t, e, n).next((e => {
                const s = this.An(r, n);
                return e.isEqual(s) ? zs.resolve() : this.vn(t, r, n, e, s)
            })))))))
        }))
    } Rn(t, e, n, r) { return ll(t).put({ indexId: r.indexId, uid: this.uid, arrayValue: r.arrayValue, directionalValue: r.directionalValue, orderedDocumentKey: this.gn(n, e.key), documentKey: e.key.path.toArray() }) } Pn(t, e, n, r) { return ll(t).delete([r.indexId, this.uid, r.arrayValue, r.directionalValue, this.gn(n, e.key), e.key.path.toArray()]) } En(t, e, n) {
        const r = ll(t);
        let s = new qi(Qu);
        return r.X({ index: "documentKeyIndex", range: IDBKeyRange.only([n.indexId, this.uid, this.gn(n, e)]) }, ((t, r) => { s = s.add(new $u(n.indexId, e, r.arrayValue, r.directionalValue)) })).next((() => s))
    } An(t, e) {
        let n = new qi(Qu);
        const r = this.mn(e, t);
        if (null == r) return n;
        const s = Ns(e);
        if (null != s) {
            const i = t.data.field(s.fieldPath);
            if (mo(i)) for (const s of i.arrayValue.values || []) n = n.add(new $u(e.indexId, t.key, this.dn(s), r))
        } else n = n.add(new $u(e.indexId, t.key, al, r));
        return n
    } vn(t, e, n, r, s) {
        Yr("IndexedDbIndexManager", "Updating index entries for document '%s'", e.key);
        const i = [];
        return function (t, e, n, r, s) {
            const i = t.getIterator(), o = e.getIterator();
            let a = ji(i), c = ji(o);
            for (;
                a || c;
            ) {
                let t = !1, e = !1;
                if (a && c) {
                    const r = n(a, c);
                    r < 0 ? e = !0 : r > 0 && (t = !0)
                } else null != a ? e = !0 : t = !0;
                t ? (r(c), c = ji(o)) : e ? (s(a), a = ji(i)) : (a = ji(i), c = ji(o))
            }
        }(r, s, Qu, (r => { i.push(this.Rn(t, e, n, r)) }), (r => { i.push(this.Pn(t, e, n, r)) })), zs.waitFor(i)
    } Tn(t) {
        let e = 1;
        return dl(t).X({ index: "sequenceNumberIndex", reverse: !0, range: IDBKeyRange.upperBound([this.uid, Number.MAX_SAFE_INTEGER]) }, ((t, n, r) => { r.done(), e = n.sequenceNumber + 1 })).next((() => e))
    } createRange(t, e, n) {
        n = n.sort(((t, e) => Qu(t, e))).filter(((t, e, n) => !e || 0 !== Qu(t, n[e - 1])));
        const r = [];
        r.push(t);
        for (const s of n) {
            const n = Qu(s, t), i = Qu(s, e);
            if (0 === n) r[0] = t.Je();
            else if (n > 0 && i < 0) r.push(s), r.push(s.Je());
            else if (i > 0) break
        } r.push(e);
        const s = [];
        for (let t = 0;
            t < r.length;
            t += 2) {
                if (this.bn(r[t], r[t + 1])) return [];
            const e = [r[t].indexId, this.uid, r[t].arrayValue, r[t].directionalValue, al, []], n = [r[t + 1].indexId, this.uid, r[t + 1].arrayValue, r[t + 1].directionalValue, al, []];
            s.push(IDBKeyRange.bound(e, n))
        } return s
    } bn(t, e) { return Qu(t, e) > 0 } getMinOffsetFromCollectionGroup(t, e) { return this.getFieldIndexes(t, e).next(fl) } getMinOffset(t, e) { return zs.mapArray(this.cn(e), (e => this.an(t, e).next((t => t || es())))).next(fl) }
} function ul(t) { return Mi(t, "collectionParents") } function ll(t) { return Mi(t, "indexEntries") } function hl(t) { return Mi(t, "indexConfiguration") } function dl(t) { return Mi(t, "indexState") } function fl(t) {
    ns(0 !== t.length);
    let e = t[0].indexState.offset, n = e.largestBatchId;
    for (let r = 1;
        r < t.length;
        r++) {
            const s = t[r].indexState.offset;
        Bs(s, e) < 0 && (e = s), n < s.largestBatchId && (n = s.largestBatchId)
    } return new Vs(e.readTime, e.documentKey, n)
} const gl = { didRun: !1, sequenceNumbersCollected: 0, targetsRemoved: 0, documentsRemoved: 0 };
class ml { constructor(t, e, n) { this.cacheSizeCollectionThreshold = t, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n } static withCacheSize(t) { return new ml(t, ml.DEFAULT_COLLECTION_PERCENTILE, ml.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT) } } function pl(t, e, n) {
    const r = t.store("mutations"), s = t.store("documentMutations"), i = [], o = IDBKeyRange.only(n.batchId);
    let a = 0;
    const c = r.X({ range: o }, ((t, e, n) => (a++, n.delete())));
    i.push(c.next((() => { ns(1 === a) })));
    const u = [];
    for (const t of n.mutations) {
        const r = hi(e, t.key.path, n.batchId);
        i.push(s.delete(r)), u.push(t.key)
    } return zs.waitFor(i).next((() => u))
} function yl(t) {
    if (!t) return 0;
    let e;
    if (t.document) e = t.document;
    else if (t.unknownDocument) e = t.unknownDocument;
    else {
        if (!t.noDocument) throw es();
        e = t.noDocument
    } return JSON.stringify(e).length
} ml.DEFAULT_COLLECTION_PERCENTILE = 10, ml.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, ml.DEFAULT = new ml(41943040, ml.DEFAULT_COLLECTION_PERCENTILE, ml.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), ml.DISABLED = new ml(-1, 0, 0);
class wl {
    constructor(t, e, n, r) { this.userId = t, this.serializer = e, this.indexManager = n, this.referenceDelegate = r, this.Vn = {} } static de(t, e, n, r) {
        ns("" !== t.uid);
        const s = t.isAuthenticated() ? t.uid : "";
        return new wl(s, e, n, r)
    } checkEmpty(t) {
        let e = !0;
        const n = IDBKeyRange.bound([this.userId, Number.NEGATIVE_INFINITY], [this.userId, Number.POSITIVE_INFINITY]);
        return bl(t).X({ index: "userMutationsIndex", range: n }, ((t, n, r) => { e = !1, r.done() })).next((() => e))
    } addMutationBatch(t, e, n, r) {
        const s = Il(t), i = bl(t);
        return i.add({}).next((o => {
            ns("number" == typeof o);
            const a = new pc(o, e, n, r), c = function (t, e, n) {
                const r = n.baseMutations.map((e => au(t.fe, e))), s = n.mutations.map((e => au(t.fe, e)));
                return { userId: e, batchId: n.batchId, localWriteTimeMs: n.localWriteTime.toMillis(), baseMutations: r, mutations: s }
            }(this.serializer, this.userId, a), u = [];
            let l = new qi(((t, e) => vs(t.canonicalString(), e.canonicalString())));
            for (const t of r) {
                const e = hi(this.userId, t.key.path, o);
                l = l.add(t.key.path.popLast()), u.push(i.put(c)), u.push(s.put(e, di))
            } return l.forEach((e => { u.push(this.indexManager.addToCollectionParentIndex(t, e)) })), t.addOnCommittedListener((() => { this.Vn[o] = a.keys() })), zs.waitFor(u).next((() => a))
        }))
    } lookupMutationBatch(t, e) { return bl(t).get(e).next((t => t ? (ns(t.userId === this.userId), Cu(this.serializer, t)) : null)) } Sn(t, e) {
        return this.Vn[e] ? zs.resolve(this.Vn[e]) : this.lookupMutationBatch(t, e).next((t => {
            if (t) {
                const n = t.keys();
                return this.Vn[e] = n, n
            } return null
        }))
    } getNextMutationBatchAfterBatchId(t, e) {
        const n = e + 1, r = IDBKeyRange.lowerBound([this.userId, n]);
        let s = null;
        return bl(t).X({ index: "userMutationsIndex", range: r }, ((t, e, r) => { e.userId === this.userId && (ns(e.batchId >= n), s = Cu(this.serializer, e)), r.done() })).next((() => s))
    } getHighestUnacknowledgedBatchId(t) {
        const e = IDBKeyRange.upperBound([this.userId, Number.POSITIVE_INFINITY]);
        let n = -1;
        return bl(t).X({ index: "userMutationsIndex", range: e, reverse: !0 }, ((t, e, r) => { n = e.batchId, r.done() })).next((() => n))
    } getAllMutationBatches(t) {
        const e = IDBKeyRange.bound([this.userId, -1], [this.userId, Number.POSITIVE_INFINITY]);
        return bl(t).j("userMutationsIndex", e).next((t => t.map((t => Cu(this.serializer, t)))))
    } getAllMutationBatchesAffectingDocumentKey(t, e) {
        const n = li(this.userId, e.path), r = IDBKeyRange.lowerBound(n), s = [];
        return Il(t).X({ range: r }, ((n, r, i) => {
            const [o, a, c] = n, u = ci(a);
            if (o === this.userId && e.path.isEqual(u)) return bl(t).get(c).next((t => {
                if (!t) throw es();
                ns(t.userId === this.userId), s.push(Cu(this.serializer, t))
            }));
            i.done()
        })).next((() => s))
    } getAllMutationBatchesAffectingDocumentKeys(t, e) {
        let n = new qi(vs);
        const r = [];
        return e.forEach((e => {
            const s = li(this.userId, e.path), i = IDBKeyRange.lowerBound(s), o = Il(t).X({ range: i }, ((t, r, s) => {
                const [i, o, a] = t, c = ci(o);
                i === this.userId && e.path.isEqual(c) ? n = n.add(a) : s.done()
            }));
            r.push(o)
        })), zs.waitFor(r).next((() => this.Dn(t, n)))
    } getAllMutationBatchesAffectingQuery(t, e) {
        const n = e.path, r = n.length + 1, s = li(this.userId, n), i = IDBKeyRange.lowerBound(s);
        let o = new qi(vs);
        return Il(t).X({ range: i }, ((t, e, s) => {
            const [i, a, c] = t, u = ci(a);
            i === this.userId && n.isPrefixOf(u) ? u.length === r && (o = o.add(c)) : s.done()
        })).next((() => this.Dn(t, o)))
    } Dn(t, e) {
        const n = [], r = [];
        return e.forEach((e => {
            r.push(bl(t).get(e).next((t => {
                if (null === t) throw es();
                ns(t.userId === this.userId), n.push(Cu(this.serializer, t))
            })))
        })), zs.waitFor(r).next((() => n))
    } removeMutationBatch(t, e) { return pl(t.ht, this.userId, e).next((n => (t.addOnCommittedListener((() => { this.Cn(e.batchId) })), zs.forEach(n, (e => this.referenceDelegate.markPotentiallyOrphaned(t, e)))))) } Cn(t) { delete this.Vn[t] } performConsistencyCheck(t) {
        return this.checkEmpty(t).next((e => {
            if (!e) return zs.resolve();
            const n = IDBKeyRange.lowerBound([this.userId]), r = [];
            return Il(t).X({ range: n }, ((t, e, n) => {
                if (t[0] === this.userId) {
                    const e = ci(t[1]);
                    r.push(e)
                } else n.done()
            })).next((() => { ns(0 === r.length) }))
        }))
    } containsKey(t, e) { return vl(t, this.userId, e) } xn(t) { return El(t).get(this.userId).next((t => t || { userId: this.userId, lastAcknowledgedBatchId: -1, lastStreamToken: "" })) }
} function vl(t, e, n) {
    const r = li(e, n.path), s = r[1], i = IDBKeyRange.lowerBound(r);
    let o = !1;
    return Il(t).X({ range: i, Y: !0 }, ((t, n, r) => {
        const [i, a, c] = t;
        i === e && a === s && (o = !0), r.done()
    })).next((() => o))
} function bl(t) { return Mi(t, "mutations") } function Il(t) { return Mi(t, "documentMutations") } function El(t) { return Mi(t, "mutationQueues") } class Tl { constructor(t) { this.Nn = t } next() { return this.Nn += 2, this.Nn } static kn() { return new Tl(0) } static Mn() { return new Tl(-1) } } class Sl {
    constructor(t, e) { this.referenceDelegate = t, this.serializer = e } allocateTargetId(t) {
        return this.$n(t).next((e => {
            const n = new Tl(e.highestTargetId);
            return e.highestTargetId = n.next(), this.On(t, e).next((() => e.highestTargetId))
        }))
    } getLastRemoteSnapshotVersion(t) { return this.$n(t).next((t => Ts.fromTimestamp(new Es(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds)))) } getHighestSequenceNumber(t) { return this.$n(t).next((t => t.highestListenSequenceNumber)) } setTargetsMetadata(t, e, n) { return this.$n(t).next((r => (r.highestListenSequenceNumber = e, n && (r.lastRemoteSnapshotVersion = n.toTimestamp()), e > r.highestListenSequenceNumber && (r.highestListenSequenceNumber = e), this.On(t, r)))) } addTargetData(t, e) { return this.Fn(t, e).next((() => this.$n(t).next((n => (n.targetCount += 1, this.Bn(e, n), this.On(t, n)))))) } updateTargetData(t, e) { return this.Fn(t, e) } removeTargetData(t, e) { return this.removeMatchingKeysForTargetId(t, e.targetId).next((() => _l(t).delete(e.targetId))).next((() => this.$n(t))).next((e => (ns(e.targetCount > 0), e.targetCount -= 1, this.On(t, e)))) } removeTargets(t, e, n) {
        let r = 0;
        const s = [];
        return _l(t).X(((i, o) => {
            const a = Du(o);
            a.sequenceNumber <= e && null === n.get(a.targetId) && (r++, s.push(this.removeTargetData(t, a)))
        })).next((() => zs.waitFor(s))).next((() => r))
    } forEachTarget(t, e) {
        return _l(t).X(((t, n) => {
            const r = Du(n);
            e(r)
        }))
    } $n(t) { return xl(t).get("targetGlobalKey").next((t => (ns(null !== t), t))) } On(t, e) { return xl(t).put("targetGlobalKey", e) } Fn(t, e) { return _l(t).put(Au(this.serializer, e)) } Bn(t, e) {
        let n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, n = !0), n
    } getTargetCount(t) { return this.$n(t).next((t => t.targetCount)) } getTargetData(t, e) {
        const n = ta(e), r = IDBKeyRange.bound([n, Number.NEGATIVE_INFINITY], [n, Number.POSITIVE_INFINITY]);
        let s = null;
        return _l(t).X({ range: r, index: "queryTargetsIndex" }, ((t, n, r) => {
            const i = Du(n);
            ea(e, i.target) && (s = i, r.done())
        })).next((() => s))
    } addMatchingKeys(t, e, n) {
        const r = [], s = Cl(t);
        return e.forEach((e => {
            const i = ii(e.path);
            r.push(s.put({ targetId: n, path: i })), r.push(this.referenceDelegate.addReference(t, n, e))
        })), zs.waitFor(r)
    } removeMatchingKeys(t, e, n) {
        const r = Cl(t);
        return zs.forEach(e, (e => {
            const s = ii(e.path);
            return zs.waitFor([r.delete([n, s]), this.referenceDelegate.removeReference(t, n, e)])
        }))
    } removeMatchingKeysForTargetId(t, e) {
        const n = Cl(t), r = IDBKeyRange.bound([e], [e + 1], !1, !0);
        return n.delete(r)
    } getMatchingKeysForTargetId(t, e) {
        const n = IDBKeyRange.bound([e], [e + 1], !1, !0), r = Cl(t);
        let s = Oa();
        return r.X({ range: n, Y: !0 }, ((t, e, n) => {
            const r = ci(t[1]), i = new Ds(r);
            s = s.add(i)
        })).next((() => s))
    } containsKey(t, e) {
        const n = ii(e.path), r = IDBKeyRange.bound([n], [Is(n)], !1, !0);
        let s = 0;
        return Cl(t).X({ index: "documentTargetsIndex", Y: !0, range: r }, (([t, e], n, r) => { 0 !== t && (s++, r.done()) })).next((() => s > 0))
    } le(t, e) { return _l(t).get(e).next((t => t ? Du(t) : null)) }
} function _l(t) { return Mi(t, "targets") } function xl(t) { return Mi(t, "targetGlobal") } function Cl(t) { return Mi(t, "targetDocuments") } function Dl([t, e], [n, r]) {
    const s = vs(t, n);
    return 0 === s ? vs(e, r) : s
} class Al {
    constructor(t) { this.Ln = t, this.buffer = new qi(Dl), this.qn = 0 } Un() { return ++this.qn } Kn(t) {
        const e = [t, this.Un()];
        if (this.buffer.size < this.Ln) this.buffer = this.buffer.add(e);
        else {
            const t = this.buffer.last();
            Dl(e, t) < 0 && (this.buffer = this.buffer.delete(t).add(e))
        }
    } get maxValue() { return this.buffer.last()[0] }
} class Nl {
    constructor(t, e, n) { this.garbageCollector = t, this.asyncQueue = e, this.localStore = n, this.Gn = null } start() { -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.Qn(6e4) } stop() { this.Gn && (this.Gn.cancel(), this.Gn = null) } get started() { return null !== this.Gn } Qn(t) {
        Yr("LruGarbageCollector", `Garbage collection scheduled in ${t}ms`), this.Gn = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection", t, (async () => {
            this.Gn = null;
            try { await this.localStore.collectGarbage(this.garbageCollector) } catch (t) { Hs(t) ? Yr("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", t) : await js(t) } await this.Qn(3e5)
        }))
    }
} class kl {
    constructor(t, e) { this.jn = t, this.params = e } calculateTargetCount(t, e) { return this.jn.zn(t).next((t => Math.floor(e / 100 * t))) } nthSequenceNumber(t, e) {
        if (0 === e) return zs.resolve(ei.ct);
        const n = new Al(e);
        return this.jn.forEachTarget(t, (t => n.Kn(t.sequenceNumber))).next((() => this.jn.Wn(t, (t => n.Kn(t))))).next((() => n.maxValue))
    } removeTargets(t, e, n) { return this.jn.removeTargets(t, e, n) } removeOrphanedDocuments(t, e) { return this.jn.removeOrphanedDocuments(t, e) } collect(t, e) {
        return -1 === this.params.cacheSizeCollectionThreshold ? (Yr("LruGarbageCollector", "Garbage collection skipped; 
 disabled"), zs.resolve(gl)) : this.getCacheSize(t).next((n => n < this.params.cacheSizeCollectionThreshold ? (Yr("LruGarbageCollector", `Garbage collection skipped; 
 Cache size ${ n } is lower than threshold ${ this.params.cacheSizeCollectionThreshold }`), gl) : this.Hn(t, e))) } getCacheSize(t) { return this.jn.getCacheSize(t) } Hn(t, e) { let n, r, s, i, o, a, c; 
 const u = Date.now(); 
 return this.calculateTargetCount(t, this.params.percentileToCollect).next((e => (e > this.params.maximumSequenceNumbersToCollect ? (Yr("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${ this.params.maximumSequenceNumbersToCollect } from ${ e }`), r = this.params.maximumSequenceNumbersToCollect) : r = e, i = Date.now(), this.nthSequenceNumber(t, r)))).next((r => (n = r, o = Date.now(), this.removeTargets(t, n, e)))).next((e => (s = e, a = Date.now(), this.removeOrphanedDocuments(t, n)))).next((t => (c = Date.now(), Wr() <= T.DEBUG && Yr("LruGarbageCollector", `LRU Garbage Collection\n\tCounted targets in ${ i - u} ms\n\tDetermined least recently used ${ r } in ` + (o - i) + "ms\n" + `\tRemoved ${ s } targets in ` + (a - o) + "ms\n" + `\tRemoved ${ t } documents in ` + (c - a) + "ms\n" + `Total Duration: ${ c - u } ms`), zs.resolve({ didRun: !0, sequenceNumbersCollected: r, targetsRemoved: s, documentsRemoved: t })))) } } function Rl(t, e) { return new kl(t, e) } class Ml { constructor(t, e) { this.db = t, this.garbageCollector = Rl(this, e) } zn(t) { const e = this.Jn(t); 
 return this.db.getTargetCache().getTargetCount(t).next((t => e.next((e => t + e)))) } Jn(t) { let e = 0; 
 return this.Wn(t, (t => { e++ })).next((() => e)) } forEachTarget(t, e) { return this.db.getTargetCache().forEachTarget(t, e) } Wn(t, e) { return this.Yn(t, ((t, n) => e(n))) } addReference(t, e, n) { return Fl(t, n) } removeReference(t, e, n) { return Fl(t, n) } removeTargets(t, e, n) { return this.db.getTargetCache().removeTargets(t, e, n) } markPotentiallyOrphaned(t, e) { return Fl(t, e) } Xn(t, e) { return function (t, e) { let n = !1; 
 return El(t).Z((r => vl(t, r, e).next((t => (t && (n = !0), zs.resolve(!t)))))).next((() => n)) }(t, e) } removeOrphanedDocuments(t, e) { const n = this.db.getRemoteDocumentCache().newChangeBuffer(), r = []; 
 let s = 0; 
 return this.Yn(t, ((i, o) => { if (o <= e) { const e = this.Xn(t, i).next((e => { if (!e) return s++, n.getEntry(t, i).next((() => (n.removeEntry(i, Ts.min()), Cl(t).delete([0, ii(i.path)])))) })); 
 r.push(e) } })).next((() => zs.waitFor(r))).next((() => n.apply(t))).next((() => s)) } removeTarget(t, e) { const n = e.withSequenceNumber(t.currentSequenceNumber); 
 return this.db.getTargetCache().updateTargetData(t, n) } updateLimboDocument(t, e) { return Fl(t, e) } Yn(t, e) { const n = Cl(t); 
 let r, s = ei.ct; 
 return n.X({ index: "documentTargetsIndex" }, (([t, n], { path: i, sequenceNumber: o }) => { 0 === t ? (s !== ei.ct && e(new Ds(ci(r)), s), s = o, r = i) : s = ei.ct })).next((() => { s !== ei.ct && e(new Ds(ci(r)), s) })) } getCacheSize(t) { return this.db.getRemoteDocumentCache().getSize(t) } } function Fl(t, e) { return Cl(t).put(function (t, e) { return { targetId: 0, path: ii(t.path), sequenceNumber: e } }(e, t.currentSequenceNumber)) } class Ol { constructor() { this.changes = new Sa((t => t.toString()), ((t, e) => t.isEqual(e))), this.changesApplied = !1 } addEntry(t) { this.assertNotApplied(), this.changes.set(t.key, t) } removeEntry(t, e) { this.assertNotApplied(), this.changes.set(t, Co.newInvalidDocument(t).setReadTime(e)) } getEntry(t, e) { this.assertNotApplied(); 
 const n = this.changes.get(e); 
 return void 0 !== n ? zs.resolve(n) : this.getFromCache(t, e) } getEntries(t, e) { return this.getAllFromCache(t, e) } apply(t) { return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(t) } assertNotApplied() { } } class Ll { constructor(t) { this.serializer = t } setIndexManager(t) { this.indexManager = t } addEntry(t, e, n) { return ql(t).put(n) } removeEntry(t, e, n) { return ql(t).delete(function (t, e) { const n = t.path.toArray(); 
 return [n.slice(0, n.length - 2), n[n.length - 2], Su(e), n[n.length - 1]] }(e, n)) } updateMetadata(t, e) { return this.getMetadata(t).next((n => (n.byteSize += e, this.Zn(t, n)))) } getEntry(t, e) { let n = Co.newInvalidDocument(e); 
 return ql(t).X({ index: "documentKeyIndex", range: IDBKeyRange.only(Ul(e)) }, ((t, r) => { n = this.ts(e, r) })).next((() => n)) } es(t, e) { let n = { size: 0, document: Co.newInvalidDocument(e) }; 
 return ql(t).X({ index: "documentKeyIndex", range: IDBKeyRange.only(Ul(e)) }, ((t, r) => { n = { document: this.ts(e, r), size: yl(r) } })).next((() => n)) } getEntries(t, e) { let n = xa(); 
 return this.ns(t, e, ((t, e) => { const r = this.ts(t, e); 
 n = n.insert(t, r) })).next((() => n)) } ss(t, e) { let n = xa(), r = new Pi(Ds.comparator); 
 return this.ns(t, e, ((t, e) => { const s = this.ts(t, e); 
 n = n.insert(t, s), r = r.insert(t, yl(e)) })).next((() => ({ documents: n, rs: r }))) } ns(t, e, n) { if (e.isEmpty()) return zs.resolve(); 
 let r = new qi(zl); 
 e.forEach((t => r = r.add(t))); 
 const s = IDBKeyRange.bound(Ul(r.first()), Ul(r.last())), i = r.getIterator(); 
 let o = i.getNext(); 
 return ql(t).X({ index: "documentKeyIndex", range: s }, ((t, e, r) => { const s = Ds.fromSegments([...e.prefixPath, e.collectionGroup, e.documentId]); 
 for (; 
 o && zl(o, s) < 0; 
)n(o, null), o = i.getNext(); 
 o && o.isEqual(s) && (n(o, e), o = i.hasNext() ? i.getNext() : null), o ? r.G(Ul(o)) : r.done() })).next((() => { for (; 
 o; 
)n(o, null), o = i.hasNext() ? i.getNext() : null })) } getDocumentsMatchingQuery(t, e, n, r) { const s = e.path, i = [s.popLast().toArray(), s.lastSegment(), Su(n.readTime), n.documentKey.path.isEmpty() ? "" : n.documentKey.path.lastSegment()], o = [s.popLast().toArray(), s.lastSegment(), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], ""]; 
 return ql(t).j(IDBKeyRange.bound(i, o, !0)).next((t => { let n = xa(); 
 for (const s of t) { const t = this.ts(Ds.fromSegments(s.prefixPath.concat(s.collectionGroup, s.documentId)), s); 
 t.isFoundDocument() && (ba(e, t) || r.has(t.key)) && (n = n.insert(t.key, t)) } return n })) } getAllFromCollectionGroup(t, e, n, r) { let s = xa(); 
 const i = jl(e, n), o = jl(e, Vs.max()); 
 return ql(t).X({ index: "collectionGroupIndex", range: IDBKeyRange.bound(i, o, !0) }, ((t, e, n) => { const i = this.ts(Ds.fromSegments(e.prefixPath.concat(e.collectionGroup, e.documentId)), e); 
 s = s.insert(i.key, i), s.size === r && n.done() })).next((() => s)) } newChangeBuffer(t) { return new Vl(this, !!t && t.trackRemovals) } getSize(t) { return this.getMetadata(t).next((t => t.byteSize)) } getMetadata(t) { return Bl(t).get("remoteDocumentGlobalKey").next((t => (ns(!!t), t))) } Zn(t, e) { return Bl(t).put("remoteDocumentGlobalKey", e) } ts(t, e) { if (e) { const t = function (t, e) { let n; 
 if (e.document) n = ou(t.fe, e.document, !!e.hasCommittedMutations); 
 else if (e.noDocument) { const t = Ds.fromSegments(e.noDocument.path), r = xu(e.noDocument.readTime); 
 n = Co.newNoDocument(t, r), e.hasCommittedMutations && n.setHasCommittedMutations() } else { if (!e.unknownDocument) return es(); 
 { const t = Ds.fromSegments(e.unknownDocument.path), r = xu(e.unknownDocument.version); 
 n = Co.newUnknownDocument(t, r) } } return e.readTime && n.setReadTime(function (t) { const e = new Es(t[0], t[1]); 
 return Ts.fromTimestamp(e) }(e.readTime)), n }(this.serializer, e); 
 if (!t.isNoDocument() || !t.version.isEqual(Ts.min())) return t } return Co.newInvalidDocument(t) } } function Pl(t) { return new Ll(t) } class Vl extends Ol { constructor(t, e) { super(), this.os = t, this.trackRemovals = e, this.us = new Sa((t => t.toString()), ((t, e) => t.isEqual(e))) } applyChanges(t) { const e = []; 
 let n = 0, r = new qi(((t, e) => vs(t.canonicalString(), e.canonicalString()))); 
 return this.changes.forEach(((s, i) => { const o = this.us.get(s); 
 if (e.push(this.os.removeEntry(t, s, o.readTime)), i.isValidDocument()) { const a = Tu(this.os.serializer, i); 
 r = r.add(s.path.popLast()); 
 const c = yl(a); 
 n += c - o.size, e.push(this.os.addEntry(t, s, a)) } else if (n -= o.size, this.trackRemovals) { const n = Tu(this.os.serializer, i.convertToNoDocument(Ts.min())); 
 e.push(this.os.addEntry(t, s, n)) } })), r.forEach((n => { e.push(this.os.indexManager.addToCollectionParentIndex(t, n)) })), e.push(this.os.updateMetadata(t, n)), zs.waitFor(e) } getFromCache(t, e) { return this.os.es(t, e).next((t => (this.us.set(e, { size: t.size, readTime: t.document.readTime }), t.document))) } getAllFromCache(t, e) { return this.os.ss(t, e).next((({ documents: t, rs: e }) => (e.forEach(((e, n) => { this.us.set(e, { size: n, readTime: t.get(e).readTime }) })), t))) } } function Bl(t) { return Mi(t, "remoteDocumentGlobal") } function ql(t) { return Mi(t, "remoteDocumentsV14") } function Ul(t) { const e = t.path.toArray(); 
 return [e.slice(0, e.length - 2), e[e.length - 2], e[e.length - 1]] } function jl(t, e) { const n = e.documentKey.path.toArray(); 
 return [t, Su(e.readTime), n.slice(0, n.length - 2), n.length > 0 ? n[n.length - 1] : ""] } function zl(t, e) { const n = t.path.toArray(), r = e.path.toArray(); 
 let s = 0; 
 for (let t = 0; 
 t < n.length - 2 && t < r.length - 2; 
 ++t)if (s = vs(n[t], r[t]), s) return s; 
 return s = vs(n.length, r.length), s || (s = vs(n[n.length - 2], r[r.length - 2]), s || vs(n[n.length - 1], r[r.length - 1])) } class Gl { constructor(t, e) { this.overlayedDocument = t, this.mutatedFields = e } } class Kl { constructor(t, e, n, r) { this.remoteDocumentCache = t, this.mutationQueue = e, this.documentOverlayCache = n, this.indexManager = r } getDocument(t, e) { let n = null; 
 return this.documentOverlayCache.getOverlay(t, e).next((r => (n = r, this.remoteDocumentCache.getEntry(t, e)))).next((t => (null !== n && oc(n.mutation, t, zi.empty(), Es.now()), t))) } getDocuments(t, e) { return this.remoteDocumentCache.getEntries(t, e).next((e => this.getLocalViewOfDocuments(t, e, Oa()).next((() => e)))) } getLocalViewOfDocuments(t, e, n = Oa()) { const r = Na(); 
 return this.populateOverlays(t, r, e).next((() => this.computeViews(t, e, r, n).next((t => { let e = Da(); 
 return t.forEach(((t, n) => { e = e.insert(t, n.overlayedDocument) })), e })))) } getOverlayedDocuments(t, e) { const n = Na(); 
 return this.populateOverlays(t, n, e).next((() => this.computeViews(t, e, n, Oa()))) } populateOverlays(t, e, n) { const r = []; 
 return n.forEach((t => { e.has(t) || r.push(t) })), this.documentOverlayCache.getOverlays(t, r).next((t => { t.forEach(((t, n) => { e.set(t, n) })) })) } computeViews(t, e, n, r) { let s = xa(); 
 const i = Ra(), o = Ra(); 
 return e.forEach(((t, e) => { const o = n.get(e.key); 
 r.has(e.key) && (void 0 === o || o.mutation instanceof lc) ? s = s.insert(e.key, e) : void 0 !== o ? (i.set(e.key, o.mutation.getFieldMask()), oc(o.mutation, e, o.mutation.getFieldMask(), Es.now())) : i.set(e.key, zi.empty()) })), this.recalculateAndSaveOverlays(t, s).next((t => (t.forEach(((t, e) => i.set(t, e))), e.forEach(((t, e) => { var n; 
 return o.set(t, new Gl(e, null !== (n = i.get(t)) && void 0 !== n ? n : null)) })), o))) } recalculateAndSaveOverlays(t, e) { const n = Ra(); 
 let r = new Pi(((t, e) => t - e)), s = Oa(); 
 return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t, e).next((t => { for (const s of t) s.keys().forEach((t => { const i = e.get(t); 
 if (null === i) return; 
 let o = n.get(t) || zi.empty(); 
 o = s.applyToLocalView(i, o), n.set(t, o); 
 const a = (r.get(s.batchId) || Oa()).add(t); 
 r = r.insert(s.batchId, a) })) })).next((() => { const i = [], o = r.getReverseIterator(); 
 for (; 
 o.hasNext(); 
) { const r = o.getNext(), a = r.key, c = r.value, u = ka(); 
 c.forEach((t => { if (!s.has(t)) { const r = sc(e.get(t), n.get(t)); 
 null !== r && u.set(t, r), s = s.add(t) } })), i.push(this.documentOverlayCache.saveOverlays(t, a, u)) } return zs.waitFor(i) })).next((() => n)) } recalculateAndSaveOverlaysForDocumentKeys(t, e) { return this.remoteDocumentCache.getEntries(t, e).next((e => this.recalculateAndSaveOverlays(t, e))) } getDocumentsMatchingQuery(t, e, n) { return function (t) { return Ds.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length }(e) ? this.getDocumentsMatchingDocumentQuery(t, e.path) : da(e) ? this.getDocumentsMatchingCollectionGroupQuery(t, e, n) : this.getDocumentsMatchingCollectionQuery(t, e, n) } getNextDocuments(t, e, n, r) { return this.remoteDocumentCache.getAllFromCollectionGroup(t, e, n, r).next((s => { const i = r - s.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(t, e, n.largestBatchId, r - s.size) : zs.resolve(Na()); 
 let o = -1, a = s; 
 return i.next((e => zs.forEach(e, ((e, n) => (o < n.largestBatchId && (o = n.largestBatchId), s.get(e) ? zs.resolve() : this.remoteDocumentCache.getEntry(t, e).next((t => { a = a.insert(e, t) }))))).next((() => this.populateOverlays(t, e, s))).next((() => this.computeViews(t, a, e, Oa()))).next((t => ({ batchId: o, changes: Aa(t) }))))) })) } getDocumentsMatchingDocumentQuery(t, e) { return this.getDocument(t, new Ds(e)).next((t => { let e = Da(); 
 return t.isFoundDocument() && (e = e.insert(t.key, t)), e })) } getDocumentsMatchingCollectionGroupQuery(t, e, n) { const r = e.collectionGroup; 
 let s = Da(); 
 return this.indexManager.getCollectionParents(t, r).next((i => zs.forEach(i, (i => { const o = function (t, e) { return new oa(e, null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt) }(e, i.child(r)); 
 return this.getDocumentsMatchingCollectionQuery(t, o, n).next((t => { t.forEach(((t, e) => { s = s.insert(t, e) })) })) })).next((() => s)))) } getDocumentsMatchingCollectionQuery(t, e, n) { let r; 
 return this.documentOverlayCache.getOverlaysForCollection(t, e.path, n.largestBatchId).next((s => (r = s, this.remoteDocumentCache.getDocumentsMatchingQuery(t, e, n, r)))).next((t => { r.forEach(((e, n) => { const r = n.getKey(); 
 null === t.get(r) && (t = t.insert(r, Co.newInvalidDocument(r))) })); 
 let n = Da(); 
 return t.forEach(((t, s) => { const i = r.get(t); 
 void 0 !== i && oc(i.mutation, s, zi.empty(), Es.now()), ba(e, s) && (n = n.insert(t, s)) })), n })) } } class $l { constructor(t) { this.serializer = t, this.cs = new Map, this.hs = new Map } getBundleMetadata(t, e) { return zs.resolve(this.cs.get(e)) } saveBundleMetadata(t, e) { var n; 
 return this.cs.set(e.id, { id: (n = e).id, version: n.version, createTime: Xc(n.createTime) }), zs.resolve() } getNamedQuery(t, e) { return zs.resolve(this.hs.get(e)) } saveNamedQuery(t, e) { return this.hs.set(e.name, function (t) { return { name: t.name, query: Nu(t.bundledQuery), readTime: Xc(t.readTime) } }(e)), zs.resolve() } } class Ql { constructor() { this.overlays = new Pi(Ds.comparator), this.ls = new Map } getOverlay(t, e) { return zs.resolve(this.overlays.get(e)) } getOverlays(t, e) { const n = Na(); 
 return zs.forEach(e, (e => this.getOverlay(t, e).next((t => { null !== t && n.set(e, t) })))).next((() => n)) } saveOverlays(t, e, n) { return n.forEach(((n, r) => { this.we(t, e, r) })), zs.resolve() } removeOverlaysForBatchId(t, e, n) { const r = this.ls.get(n); 
 return void 0 !== r && (r.forEach((t => this.overlays = this.overlays.remove(t))), this.ls.delete(n)), zs.resolve() } getOverlaysForCollection(t, e, n) { const r = Na(), s = e.length + 1, i = new Ds(e.child("")), o = this.overlays.getIteratorFrom(i); 
 for (; 
 o.hasNext(); 
) { const t = o.getNext().value, i = t.getKey(); 
 if (!e.isPrefixOf(i.path)) break; 
 i.path.length === s && t.largestBatchId > n && r.set(t.getKey(), t) } return zs.resolve(r) } getOverlaysForCollectionGroup(t, e, n, r) { let s = new Pi(((t, e) => t - e)); 
 const i = this.overlays.getIterator(); 
 for (; 
 i.hasNext(); 
) { const t = i.getNext().value; 
 if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) { let e = s.get(t.largestBatchId); 
 null === e && (e = Na(), s = s.insert(t.largestBatchId, e)), e.set(t.getKey(), t) } } const o = Na(), a = s.getIterator(); 
 for (; 
 a.hasNext() && (a.getNext().value.forEach(((t, e) => o.set(t, e))), !(o.size() >= r)); 
); 
 return zs.resolve(o) } we(t, e, n) { const r = this.overlays.get(n.key); 
 if (null !== r) { const t = this.ls.get(r.largestBatchId).delete(n.key); 
 this.ls.set(r.largestBatchId, t) } this.overlays = this.overlays.insert(n.key, new wc(e, n)); 
 let s = this.ls.get(e); 
 void 0 === s && (s = Oa(), this.ls.set(e, s)), this.ls.set(e, s.add(n.key)) } } class Hl { constructor() { this.fs = new qi(Wl.ds), this.ws = new qi(Wl._s) } isEmpty() { return this.fs.isEmpty() } addReference(t, e) { const n = new Wl(t, e); 
 this.fs = this.fs.add(n), this.ws = this.ws.add(n) } gs(t, e) { t.forEach((t => this.addReference(t, e))) } removeReference(t, e) { this.ys(new Wl(t, e)) } ps(t, e) { t.forEach((t => this.removeReference(t, e))) } Is(t) { const e = new Ds(new _s([])), n = new Wl(e, t), r = new Wl(e, t + 1), s = []; 
 return this.ws.forEachInRange([n, r], (t => { this.ys(t), s.push(t.key) })), s } Ts() { this.fs.forEach((t => this.ys(t))) } ys(t) { this.fs = this.fs.delete(t), this.ws = this.ws.delete(t) } Es(t) { const e = new Ds(new _s([])), n = new Wl(e, t), r = new Wl(e, t + 1); 
 let s = Oa(); 
 return this.ws.forEachInRange([n, r], (t => { s = s.add(t.key) })), s } containsKey(t) { const e = new Wl(t, 0), n = this.fs.firstAfterOrEqual(e); 
 return null !== n && t.isEqual(n.key) } } class Wl { constructor(t, e) { this.key = t, this.As = e } static ds(t, e) { return Ds.comparator(t.key, e.key) || vs(t.As, e.As) } static _s(t, e) { return vs(t.As, e.As) || Ds.comparator(t.key, e.key) } } class Xl { constructor(t, e) { this.indexManager = t, this.referenceDelegate = e, this.mutationQueue = [], this.vs = 1, this.Rs = new qi(Wl.ds) } checkEmpty(t) { return zs.resolve(0 === this.mutationQueue.length) } addMutationBatch(t, e, n, r) { const s = this.vs; 
 this.vs++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1]; 
 const i = new pc(s, e, n, r); 
 this.mutationQueue.push(i); 
 for (const e of r) this.Rs = this.Rs.add(new Wl(e.key, s)), this.indexManager.addToCollectionParentIndex(t, e.key.path.popLast()); 
 return zs.resolve(i) } lookupMutationBatch(t, e) { return zs.resolve(this.Ps(e)) } getNextMutationBatchAfterBatchId(t, e) { const n = e + 1, r = this.bs(n), s = r < 0 ? 0 : r; 
 return zs.resolve(this.mutationQueue.length > s ? this.mutationQueue[s] : null) } getHighestUnacknowledgedBatchId() { return zs.resolve(0 === this.mutationQueue.length ? -1 : this.vs - 1) } getAllMutationBatches(t) { return zs.resolve(this.mutationQueue.slice()) } getAllMutationBatchesAffectingDocumentKey(t, e) { const n = new Wl(e, 0), r = new Wl(e, Number.POSITIVE_INFINITY), s = []; 
 return this.Rs.forEachInRange([n, r], (t => { const e = this.Ps(t.As); 
 s.push(e) })), zs.resolve(s) } getAllMutationBatchesAffectingDocumentKeys(t, e) { let n = new qi(vs); 
 return e.forEach((t => { const e = new Wl(t, 0), r = new Wl(t, Number.POSITIVE_INFINITY); 
 this.Rs.forEachInRange([e, r], (t => { n = n.add(t.As) })) })), zs.resolve(this.Vs(n)) } getAllMutationBatchesAffectingQuery(t, e) { const n = e.path, r = n.length + 1; 
 let s = n; 
 Ds.isDocumentKey(s) || (s = s.child("")); 
 const i = new Wl(new Ds(s), 0); 
 let o = new qi(vs); 
 return this.Rs.forEachWhile((t => { const e = t.key.path; 
 return !!n.isPrefixOf(e) && (e.length === r && (o = o.add(t.As)), !0) }), i), zs.resolve(this.Vs(o)) } Vs(t) { const e = []; 
 return t.forEach((t => { const n = this.Ps(t); 
 null !== n && e.push(n) })), e } removeMutationBatch(t, e) { ns(0 === this.Ss(e.batchId, "removed")), this.mutationQueue.shift(); 
 let n = this.Rs; 
 return zs.forEach(e.mutations, (r => { const s = new Wl(r.key, e.batchId); 
 return n = n.delete(s), this.referenceDelegate.markPotentiallyOrphaned(t, r.key) })).next((() => { this.Rs = n })) } Cn(t) { } containsKey(t, e) { const n = new Wl(e, 0), r = this.Rs.firstAfterOrEqual(n); 
 return zs.resolve(e.isEqual(r && r.key)) } performConsistencyCheck(t) { return this.mutationQueue.length, zs.resolve() } Ss(t, e) { return this.bs(t) } bs(t) { return 0 === this.mutationQueue.length ? 0 : t - this.mutationQueue[0].batchId } Ps(t) { const e = this.bs(t); 
 return e < 0 || e >= this.mutationQueue.length ? null : this.mutationQueue[e] } } class Yl { constructor(t) { this.Ds = t, this.docs = new Pi(Ds.comparator), this.size = 0 } setIndexManager(t) { this.indexManager = t } addEntry(t, e) { const n = e.key, r = this.docs.get(n), s = r ? r.size : 0, i = this.Ds(e); 
 return this.docs = this.docs.insert(n, { document: e.mutableCopy(), size: i }), this.size += i - s, this.indexManager.addToCollectionParentIndex(t, n.path.popLast()) } removeEntry(t) { const e = this.docs.get(t); 
 e && (this.docs = this.docs.remove(t), this.size -= e.size) } getEntry(t, e) { const n = this.docs.get(e); 
 return zs.resolve(n ? n.document.mutableCopy() : Co.newInvalidDocument(e)) } getEntries(t, e) { let n = xa(); 
 return e.forEach((t => { const e = this.docs.get(t); 
 n = n.insert(t, e ? e.document.mutableCopy() : Co.newInvalidDocument(t)) })), zs.resolve(n) } getDocumentsMatchingQuery(t, e, n, r) { let s = xa(); 
 const i = e.path, o = new Ds(i.child("")), a = this.docs.getIteratorFrom(o); 
 for (; 
 a.hasNext(); 
) { const { key: t, value: { document: o } } = a.getNext(); 
 if (!i.isPrefixOf(t.path)) break; 
 t.path.length > i.length + 1 || Bs(Ps(o), n) <= 0 || (r.has(o.key) || ba(e, o)) && (s = s.insert(o.key, o.mutableCopy())) } return zs.resolve(s) } getAllFromCollectionGroup(t, e, n, r) { es() } Cs(t, e) { return zs.forEach(this.docs, (t => e(t))) } newChangeBuffer(t) { return new Jl(this) } getSize(t) { return zs.resolve(this.size) } } class Jl extends Ol { constructor(t) { super(), this.os = t } applyChanges(t) { const e = []; 
 return this.changes.forEach(((n, r) => { r.isValidDocument() ? e.push(this.os.addEntry(t, r)) : this.os.removeEntry(n) })), zs.waitFor(e) } getFromCache(t, e) { return this.os.getEntry(t, e) } getAllFromCache(t, e) { return this.os.getEntries(t, e) } } class Zl { constructor(t) { this.persistence = t, this.xs = new Sa((t => ta(t)), ea), this.lastRemoteSnapshotVersion = Ts.min(), this.highestTargetId = 0, this.Ns = 0, this.ks = new Hl, this.targetCount = 0, this.Ms = Tl.kn() } forEachTarget(t, e) { return this.xs.forEach(((t, n) => e(n))), zs.resolve() } getLastRemoteSnapshotVersion(t) { return zs.resolve(this.lastRemoteSnapshotVersion) } getHighestSequenceNumber(t) { return zs.resolve(this.Ns) } allocateTargetId(t) { return this.highestTargetId = this.Ms.next(), zs.resolve(this.highestTargetId) } setTargetsMetadata(t, e, n) { return n && (this.lastRemoteSnapshotVersion = n), e > this.Ns && (this.Ns = e), zs.resolve() } Fn(t) { this.xs.set(t.target, t); 
 const e = t.targetId; 
 e > this.highestTargetId && (this.Ms = new Tl(e), this.highestTargetId = e), t.sequenceNumber > this.Ns && (this.Ns = t.sequenceNumber) } addTargetData(t, e) { return this.Fn(e), this.targetCount += 1, zs.resolve() } updateTargetData(t, e) { return this.Fn(e), zs.resolve() } removeTargetData(t, e) { return this.xs.delete(e.target), this.ks.Is(e.targetId), this.targetCount -= 1, zs.resolve() } removeTargets(t, e, n) { let r = 0; 
 const s = []; 
 return this.xs.forEach(((i, o) => { o.sequenceNumber <= e && null === n.get(o.targetId) && (this.xs.delete(i), s.push(this.removeMatchingKeysForTargetId(t, o.targetId)), r++) })), zs.waitFor(s).next((() => r)) } getTargetCount(t) { return zs.resolve(this.targetCount) } getTargetData(t, e) { const n = this.xs.get(e) || null; 
 return zs.resolve(n) } addMatchingKeys(t, e, n) { return this.ks.gs(e, n), zs.resolve() } removeMatchingKeys(t, e, n) { this.ks.ps(e, n); 
 const r = this.persistence.referenceDelegate, s = []; 
 return r && e.forEach((e => { s.push(r.markPotentiallyOrphaned(t, e)) })), zs.waitFor(s) } removeMatchingKeysForTargetId(t, e) { return this.ks.Is(e), zs.resolve() } getMatchingKeysForTargetId(t, e) { const n = this.ks.Es(e); 
 return zs.resolve(n) } containsKey(t, e) { return zs.resolve(this.ks.containsKey(e)) } } class th { constructor(t, e) { this.$s = {}, this.overlays = {}, this.Os = new ei(0), this.Fs = !1, this.Fs = !0, this.referenceDelegate = t(this), this.Bs = new Zl(this), this.indexManager = new il, this.remoteDocumentCache = function (t) { return new Yl(t) }((t => this.referenceDelegate.Ls(t))), this.serializer = new Eu(e), this.qs = new $l(this.serializer) } start() { return Promise.resolve() } shutdown() { return this.Fs = !1, Promise.resolve() } get started() { return this.Fs } setDatabaseDeletedListener() { } setNetworkEnabled() { } getIndexManager(t) { return this.indexManager } getDocumentOverlayCache(t) { let e = this.overlays[t.toKey()]; 
 return e || (e = new Ql, this.overlays[t.toKey()] = e), e } getMutationQueue(t, e) { let n = this.$s[t.toKey()]; 
 return n || (n = new Xl(e, this.referenceDelegate), this.$s[t.toKey()] = n), n } getTargetCache() { return this.Bs } getRemoteDocumentCache() { return this.remoteDocumentCache } getBundleCache() { return this.qs } runTransaction(t, e, n) { Yr("MemoryPersistence", "Starting transaction:", t); 
 const r = new eh(this.Os.next()); 
 return this.referenceDelegate.Us(), n(r).next((t => this.referenceDelegate.Ks(r).next((() => t)))).toPromise().then((t => (r.raiseOnCommittedEvent(), t))) } Gs(t, e) { return zs.or(Object.values(this.$s).map((n => () => n.containsKey(t, e)))) } } class eh extends Us { constructor(t) { super(), this.currentSequenceNumber = t } } class nh { constructor(t) { this.persistence = t, this.Qs = new Hl, this.js = null } static zs(t) { return new nh(t) } get Ws() { if (this.js) return this.js; 
 throw es() } addReference(t, e, n) { return this.Qs.addReference(n, e), this.Ws.delete(n.toString()), zs.resolve() } removeReference(t, e, n) { return this.Qs.removeReference(n, e), this.Ws.add(n.toString()), zs.resolve() } markPotentiallyOrphaned(t, e) { return this.Ws.add(e.toString()), zs.resolve() } removeTarget(t, e) { this.Qs.Is(e.targetId).forEach((t => this.Ws.add(t.toString()))); 
 const n = this.persistence.getTargetCache(); 
 return n.getMatchingKeysForTargetId(t, e.targetId).next((t => { t.forEach((t => this.Ws.add(t.toString()))) })).next((() => n.removeTargetData(t, e))) } Us() { this.js = new Set } Ks(t) { const e = this.persistence.getRemoteDocumentCache().newChangeBuffer(); 
 return zs.forEach(this.Ws, (n => { const r = Ds.fromPath(n); 
 return this.Hs(t, r).next((t => { t || e.removeEntry(r, Ts.min()) })) })).next((() => (this.js = null, e.apply(t)))) } updateLimboDocument(t, e) { return this.Hs(t, e).next((t => { t ? this.Ws.delete(e.toString()) : this.Ws.add(e.toString()) })) } Ls(t) { return 0 } Hs(t, e) { return zs.or([() => zs.resolve(this.Qs.containsKey(e)), () => this.persistence.getTargetCache().containsKey(t, e), () => this.persistence.Gs(t, e)]) } } class rh { constructor(t, e) { this.persistence = t, this.Js = new Sa((t => ii(t.path)), ((t, e) => t.isEqual(e))), this.garbageCollector = Rl(this, e) } static zs(t, e) { return new rh(t, e) } Us() { } Ks(t) { return zs.resolve() } forEachTarget(t, e) { return this.persistence.getTargetCache().forEachTarget(t, e) } zn(t) { const e = this.Jn(t); 
 return this.persistence.getTargetCache().getTargetCount(t).next((t => e.next((e => t + e)))) } Jn(t) { let e = 0; 
 return this.Wn(t, (t => { e++ })).next((() => e)) } Wn(t, e) { return zs.forEach(this.Js, ((n, r) => this.Xn(t, n, r).next((t => t ? zs.resolve() : e(r))))) } removeTargets(t, e, n) { return this.persistence.getTargetCache().removeTargets(t, e, n) } removeOrphanedDocuments(t, e) { let n = 0; 
 const r = this.persistence.getRemoteDocumentCache(), s = r.newChangeBuffer(); 
 return r.Cs(t, (r => this.Xn(t, r, e).next((t => { t || (n++, s.removeEntry(r, Ts.min())) })))).next((() => s.apply(t))).next((() => n)) } markPotentiallyOrphaned(t, e) { return this.Js.set(e, t.currentSequenceNumber), zs.resolve() } removeTarget(t, e) { const n = e.withSequenceNumber(t.currentSequenceNumber); 
 return this.persistence.getTargetCache().updateTargetData(t, n) } addReference(t, e, n) { return this.Js.set(n, t.currentSequenceNumber), zs.resolve() } removeReference(t, e, n) { return this.Js.set(n, t.currentSequenceNumber), zs.resolve() } updateLimboDocument(t, e) { return this.Js.set(e, t.currentSequenceNumber), zs.resolve() } Ls(t) { let e = t.key.toString().length; 
 return t.isFoundDocument() && (e += ho(t.data.value)), e } Xn(t, e, n) { return zs.or([() => this.persistence.Gs(t, e), () => this.persistence.getTargetCache().containsKey(t, e), () => { const t = this.Js.get(e); 
 return zs.resolve(void 0 !== t && t > n) }]) } getCacheSize(t) { return this.persistence.getRemoteDocumentCache().getSize(t) } } class sh { constructor(t) { this.serializer = t } O(t, e, n, r) { const s = new Gs("createOrUpgrade", e); 
 n < 1 && r >= 1 && (function (t) { t.createObjectStore("owner") }(t), function (t) { t.createObjectStore("mutationQueues", { keyPath: "userId" }), t.createObjectStore("mutations", { keyPath: "batchId", autoIncrement: !0 }).createIndex("userMutationsIndex", ui, { unique: !0 }), t.createObjectStore("documentMutations") }(t), ih(t), function (t) { t.createObjectStore("remoteDocuments") }(t)); 
 let i = zs.resolve(); 
 return n < 3 && r >= 3 && (0 !== n && (function (t) { t.deleteObjectStore("targetDocuments"), t.deleteObjectStore("targets"), t.deleteObjectStore("targetGlobal") }(t), ih(t)), i = i.next((() => function (t) { const e = t.store("targetGlobal"), n = { highestTargetId: 0, highestListenSequenceNumber: 0, lastRemoteSnapshotVersion: Ts.min().toTimestamp(), targetCount: 0 }; 
 return e.put("targetGlobalKey", n) }(s)))), n < 4 && r >= 4 && (0 !== n && (i = i.next((() => function (t, e) { return e.store("mutations").j().next((n => { t.deleteObjectStore("mutations"), t.createObjectStore("mutations", { keyPath: "batchId", autoIncrement: !0 }).createIndex("userMutationsIndex", ui, { unique: !0 }); 
 const r = e.store("mutations"), s = n.map((t => r.put(t))); 
 return zs.waitFor(s) })) }(t, s)))), i = i.next((() => { !function (t) { t.createObjectStore("clientMetadata", { keyPath: "clientId" }) }(t) }))), n < 5 && r >= 5 && (i = i.next((() => this.Ys(s)))), n < 6 && r >= 6 && (i = i.next((() => (function (t) { t.createObjectStore("remoteDocumentGlobal") }(t), this.Xs(s))))), n < 7 && r >= 7 && (i = i.next((() => this.Zs(s)))), n < 8 && r >= 8 && (i = i.next((() => this.ti(t, s)))), n < 9 && r >= 9 && (i = i.next((() => { !function (t) { t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges") }(t) }))), n < 10 && r >= 10 && (i = i.next((() => this.ei(s)))), n < 11 && r >= 11 && (i = i.next((() => { !function (t) { t.createObjectStore("bundles", { keyPath: "bundleId" }) }(t), function (t) { t.createObjectStore("namedQueries", { keyPath: "name" }) }(t) }))), n < 12 && r >= 12 && (i = i.next((() => { !function (t) { const e = t.createObjectStore("documentOverlays", { keyPath: Si }); 
 e.createIndex("collectionPathOverlayIndex", _i, { unique: !1 }), e.createIndex("collectionGroupOverlayIndex", xi, { unique: !1 }) }(t) }))), n < 13 && r >= 13 && (i = i.next((() => function (t) { const e = t.createObjectStore("remoteDocumentsV14", { keyPath: fi }); 
 e.createIndex("documentKeyIndex", gi), e.createIndex("collectionGroupIndex", mi) }(t))).next((() => this.ni(t, s))).next((() => t.deleteObjectStore("remoteDocuments")))), n < 14 && r >= 14 && (i = i.next((() => this.si(t, s)))), n < 15 && r >= 15 && (i = i.next((() => function (t) { t.createObjectStore("indexConfiguration", { keyPath: "indexId", autoIncrement: !0 }).createIndex("collectionGroupIndex", "collectionGroup", { unique: !1 }), t.createObjectStore("indexState", { keyPath: bi }).createIndex("sequenceNumberIndex", Ii, { unique: !1 }), t.createObjectStore("indexEntries", { keyPath: Ei }).createIndex("documentKeyIndex", Ti, { unique: !1 }) }(t)))), i } Xs(t) { let e = 0; 
 return t.store("remoteDocuments").X(((t, n) => { e += yl(n) })).next((() => { const n = { byteSize: e }; 
 return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey", n) })) } Ys(t) { const e = t.store("mutationQueues"), n = t.store("mutations"); 
 return e.j().next((e => zs.forEach(e, (e => { const r = IDBKeyRange.bound([e.userId, -1], [e.userId, e.lastAcknowledgedBatchId]); 
 return n.j("userMutationsIndex", r).next((n => zs.forEach(n, (n => { ns(n.userId === e.userId); 
 const r = Cu(this.serializer, n); 
 return pl(t, e.userId, r).next((() => { })) })))) })))) } Zs(t) { const e = t.store("targetDocuments"), n = t.store("remoteDocuments"); 
 return t.store("targetGlobal").get("targetGlobalKey").next((t => { const r = []; 
 return n.X(((n, s) => { const i = new _s(n), o = function (t) { return [0, ii(t)] }(i); 
 r.push(e.get(o).next((n => n ? zs.resolve() : (n => e.put({ targetId: 0, path: ii(n), sequenceNumber: t.highestListenSequenceNumber }))(i)))) })).next((() => zs.waitFor(r))) })) } ti(t, e) { t.createObjectStore("collectionParents", { keyPath: vi }); 
 const n = e.store("collectionParents"), r = new ol, s = t => { if (r.add(t)) { const e = t.lastSegment(), r = t.popLast(); 
 return n.put({ collectionId: e, parent: ii(r) }) } }; 
 return e.store("remoteDocuments").X({ Y: !0 }, ((t, e) => { const n = new _s(t); 
 return s(n.popLast()) })).next((() => e.store("documentMutations").X({ Y: !0 }, (([t, e, n], r) => { const i = ci(e); 
 return s(i.popLast()) })))) } ei(t) { const e = t.store("targets"); 
 return e.X(((t, n) => { const r = Du(n), s = Au(this.serializer, r); 
 return e.put(s) })) } ni(t, e) { const n = e.store("remoteDocuments"), r = []; 
 return n.X(((t, n) => { const s = e.store("remoteDocumentsV14"), i = (o = n, o.document ? new Ds(_s.fromString(o.document.name).popFirst(5)) : o.noDocument ? Ds.fromSegments(o.noDocument.path) : o.unknownDocument ? Ds.fromSegments(o.unknownDocument.path) : es()).path.toArray(); 
 var o; 
 const a = { prefixPath: i.slice(0, i.length - 2), collectionGroup: i[i.length - 2], documentId: i[i.length - 1], readTime: n.readTime || [0, 0], unknownDocument: n.unknownDocument, noDocument: n.noDocument, document: n.document, hasCommittedMutations: !!n.hasCommittedMutations }; 
 r.push(s.put(a)) })).next((() => zs.waitFor(r))) } si(t, e) { const n = e.store("mutations"), r = Pl(this.serializer), s = new th(nh.zs, this.serializer.fe); 
 return n.j().next((t => { const n = new Map; 
 return t.forEach((t => { var e; 
 let r = null !== (e = n.get(t.userId)) && void 0 !== e ? e : Oa(); 
 Cu(this.serializer, t).keys().forEach((t => r = r.add(t))), n.set(t.userId, r) })), zs.forEach(n, ((t, n) => { const i = new $r(n), o = Pu.de(this.serializer, i), a = s.getIndexManager(i), c = wl.de(i, this.serializer, a, s.referenceDelegate); 
 return new Kl(r, c, o, a).recalculateAndSaveOverlaysForDocumentKeys(new Ri(e, ei.ct), t).next() })) })) } } function ih(t) { t.createObjectStore("targetDocuments", { keyPath: yi }).createIndex("documentTargetsIndex", wi, { unique: !0 }), t.createObjectStore("targets", { keyPath: "targetId" }).createIndex("queryTargetsIndex", pi, { unique: !0 }), t.createObjectStore("targetGlobal") } const oh = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab: true`, make sure that only one tab has persistence enabled at any given time."; 
 class ah { constructor(t, e, n, r, s, i, o, a, c, u, l = 15) { if (this.allowTabSynchronization = t, this.persistenceKey = e, this.clientId = n, this.ii = s, this.window = i, this.document = o, this.ri = c, this.oi = u, this.ui = l, this.Os = null, this.Fs = !1, this.isPrimary = !1, this.networkEnabled = !0, this.ci = null, this.inForeground = !1, this.ai = null, this.hi = null, this.li = Number.NEGATIVE_INFINITY, this.fi = t => Promise.resolve(), !ah.D()) throw new os(is.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled."); 
 this.referenceDelegate = new Ml(this, r), this.di = e + "main", this.serializer = new Eu(a), this.wi = new Ks(this.di, this.ui, new sh(this.serializer)), this.Bs = new Sl(this.referenceDelegate, this.serializer), this.remoteDocumentCache = Pl(this.serializer), this.qs = new Fu, this.window && this.window.localStorage ? this._i = this.window.localStorage : (this._i = null, !1 === u && Jr("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page.")) } start() { return this.mi().then((() => { if (!this.isPrimary && !this.allowTabSynchronization) throw new os(is.FAILED_PRECONDITION, oh); 
 return this.gi(), this.yi(), this.pi(), this.runTransaction("getHighestListenSequenceNumber", "readonly", (t => this.Bs.getHighestSequenceNumber(t))) })).then((t => { this.Os = new ei(t, this.ri) })).then((() => { this.Fs = !0 })).catch((t => (this.wi && this.wi.close(), Promise.reject(t)))) } Ii(t) { return this.fi = async e => { if (this.started) return t(e) }, t(this.isPrimary) } setDatabaseDeletedListener(t) { this.wi.B((async e => { null === e.newVersion && await t() })) } setNetworkEnabled(t) { this.networkEnabled !== t && (this.networkEnabled = t, this.ii.enqueueAndForget((async () => { this.started && await this.mi() }))) } mi() { return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (t => uh(t).put({ clientId: this.clientId, updateTimeMs: Date.now(), networkEnabled: this.networkEnabled, inForeground: this.inForeground }).next((() => { if (this.isPrimary) return this.Ti(t).next((t => { t || (this.isPrimary = !1, this.ii.enqueueRetryable((() => this.fi(!1)))) })) })).next((() => this.Ei(t))).next((e => this.isPrimary && !e ? this.Ai(t).next((() => !1)) : !!e && this.vi(t).next((() => !0)))))).catch((t => { if (Hs(t)) return Yr("IndexedDbPersistence", "Failed to extend owner lease: ", t), this.isPrimary; 
 if (!this.allowTabSynchronization) throw t; 
 return Yr("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", t), !1 })).then((t => { this.isPrimary !== t && this.ii.enqueueRetryable((() => this.fi(t))), this.isPrimary = t })) } Ti(t) { return ch(t).get("owner").next((t => zs.resolve(this.Ri(t)))) } Pi(t) { return uh(t).delete(this.clientId) } async bi() { if (this.isPrimary && !this.Vi(this.li, 18e5)) { this.li = Date.now(); 
 const t = await this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (t => { const e = Mi(t, "clientMetadata"); 
 return e.j().next((t => { const n = this.Si(t, 18e5), r = t.filter((t => -1 === n.indexOf(t))); 
 return zs.forEach(r, (t => e.delete(t.clientId))).next((() => r)) })) })).catch((() => [])); 
 if (this._i) for (const e of t) this._i.removeItem(this.Di(e.clientId)) } } pi() { this.hi = this.ii.enqueueAfterDelay("client_metadata_refresh", 4e3, (() => this.mi().then((() => this.bi())).then((() => this.pi())))) } Ri(t) { return !!t && t.ownerId === this.clientId } Ei(t) { return this.oi ? zs.resolve(!0) : ch(t).get("owner").next((e => { if (null !== e && this.Vi(e.leaseTimestampMs, 5e3) && !this.Ci(e.ownerId)) { if (this.Ri(e) && this.networkEnabled) return !0; 
 if (!this.Ri(e)) { if (!e.allowTabSynchronization) throw new os(is.FAILED_PRECONDITION, oh); 
 return !1 } } return !(!this.networkEnabled || !this.inForeground) || uh(t).j().next((t => void 0 === this.Si(t, 5e3).find((t => { if (this.clientId !== t.clientId) { const e = !this.networkEnabled && t.networkEnabled, n = !this.inForeground && t.inForeground, r = this.networkEnabled === t.networkEnabled; 
 if (e || n && r) return !0 } return !1 })))) })).next((t => (this.isPrimary !== t && Yr("IndexedDbPersistence", `Client ${ t ? "is" : "is not" } eligible for a primary lease.`), t))) } async shutdown() { this.Fs = !1, this.xi(), this.hi && (this.hi.cancel(), this.hi = null), this.Ni(), this.ki(), await this.wi.runTransaction("shutdown", "readwrite", ["owner", "clientMetadata"], (t => { const e = new Ri(t, ei.ct); 
 return this.Ai(e).next((() => this.Pi(e))) })), this.wi.close(), this.Mi() } Si(t, e) { return t.filter((t => this.Vi(t.updateTimeMs, e) && !this.Ci(t.clientId))) } $i() { return this.runTransaction("getActiveClients", "readonly", (t => uh(t).j().next((t => this.Si(t, 18e5).map((t => t.clientId)))))) } get started() { return this.Fs } getMutationQueue(t, e) { return wl.de(t, this.serializer, e, this.referenceDelegate) } getTargetCache() { return this.Bs } getRemoteDocumentCache() { return this.remoteDocumentCache } getIndexManager(t) { return new cl(t, this.serializer.fe.databaseId) } getDocumentOverlayCache(t) { return Pu.de(this.serializer, t) } getBundleCache() { return this.qs } runTransaction(t, e, n) { Yr("IndexedDbPersistence", "Starting transaction:", t); 
 const r = "readonly" === e ? "readonly" : "readwrite", s = 15 === (i = this.ui) ? ki : 14 === i ? Ni : 13 === i ? Ai : 12 === i ? Di : 11 === i ? Ci : void es(); 
 var i; 
 let o; 
 return this.wi.runTransaction(t, r, s, (r => (o = new Ri(r, this.Os ? this.Os.next() : ei.ct), "readwrite-primary" === e ? this.Ti(o).next((t => !!t || this.Ei(o))).next((e => { if (!e) throw Jr(`Failed to obtain primary lease for action '${t}'.`), this.isPrimary = !1, this.ii.enqueueRetryable((() => this.fi(!1))), new os(is.FAILED_PRECONDITION, qs); 
 return n(o) })).next((t => this.vi(o).next((() => t)))) : this.Oi(o).next((() => n(o)))))).then((t => (o.raiseOnCommittedEvent(), t))) } Oi(t) { return ch(t).get("owner").next((t => { if (null !== t && this.Vi(t.leaseTimestampMs, 5e3) && !this.Ci(t.ownerId) && !this.Ri(t) && !(this.oi || this.allowTabSynchronization && t.allowTabSynchronization)) throw new os(is.FAILED_PRECONDITION, oh) })) } vi(t) { const e = { ownerId: this.clientId, allowTabSynchronization: this.allowTabSynchronization, leaseTimestampMs: Date.now() }; 
 return ch(t).put("owner", e) } static D() { return Ks.D() } Ai(t) { const e = ch(t); 
 return e.get("owner").next((t => this.Ri(t) ? (Yr("IndexedDbPersistence", "Releasing primary lease."), e.delete("owner")) : zs.resolve())) } Vi(t, e) { const n = Date.now(); 
 return !(t < n - e || t > n && (Jr(`Detected an update time that is in the future: ${ t } > ${ n } `), 1)) } gi() { null !== this.document && "function" == typeof this.document.addEventListener && (this.ai = () => { this.ii.enqueueAndForget((() => (this.inForeground = "visible" === this.document.visibilityState, this.mi()))) }, this.document.addEventListener("visibilitychange", this.ai), this.inForeground = "visible" === this.document.visibilityState) } Ni() { this.ai && (this.document.removeEventListener("visibilitychange", this.ai), this.ai = null) } yi() { var t; 
 "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.ci = () => { this.xi(); 
 const t = /(?:Version|Mobile)\/1[456]/; 
 m() && (navigator.appVersion.match(t) || navigator.userAgent.match(t)) && this.ii.enterRestrictedMode(!0), this.ii.enqueueAndForget((() => this.shutdown())) }, this.window.addEventListener("pagehide", this.ci)) } ki() { this.ci && (this.window.removeEventListener("pagehide", this.ci), this.ci = null) } Ci(t) { var e; 
 try { const n = null !== (null === (e = this._i) || void 0 === e ? void 0 : e.getItem(this.Di(t))); 
 return Yr("IndexedDbPersistence", `Client '${t}' ${ n ? "is" : "is not" } zombied in LocalStorage`), n } catch (t) { return Jr("IndexedDbPersistence", "Failed to get zombied client id.", t), !1 } } xi() { if (this._i) try { this._i.setItem(this.Di(this.clientId), String(Date.now())) } catch (t) { Jr("Failed to set zombie client id.", t) } } Mi() { if (this._i) try { this._i.removeItem(this.Di(this.clientId)) } catch (t) { } } Di(t) { return `firestore_zombie_${ this.persistenceKey }_${ t } ` } } function ch(t) { return Mi(t, "owner") } function uh(t) { return Mi(t, "clientMetadata") } function lh(t, e) { let n = t.projectId; 
 return t.isDefaultDatabase || (n += "." + t.database), "firestore/" + e + "/" + n + "/" } class hh { constructor(t, e, n, r) { this.targetId = t, this.fromCache = e, this.Fi = n, this.Bi = r } static Li(t, e) { let n = Oa(), r = Oa(); 
 for (const t of e.docChanges) switch (t.type) { case 0: n = n.add(t.doc.key); 
 break; 
 case 1: r = r.add(t.doc.key) }return new hh(t, e.fromCache, n, r) } } class dh { constructor() { this.qi = !1 } initialize(t, e) { this.Ui = t, this.indexManager = e, this.qi = !0 } getDocumentsMatchingQuery(t, e, n, r) { return this.Ki(t, e).next((s => s || this.Gi(t, e, r, n))).next((n => n || this.Qi(t, e))) } Ki(t, e) { if (ua(e)) return zs.resolve(null); 
 let n = ga(e); 
 return this.indexManager.getIndexType(t, n).next((r => 0 === r ? null : (null !== e.limit && 1 === r && (e = pa(e, null, "F"), n = ga(e)), this.indexManager.getDocumentsMatchingTarget(t, n).next((r => { const s = Oa(...r); 
 return this.Ui.getDocuments(t, s).next((r => this.indexManager.getMinOffset(t, n).next((n => { const i = this.ji(e, r); 
 return this.zi(e, i, s, n.readTime) ? this.Ki(t, pa(e, null, "F")) : this.Wi(t, i, e, n) })))) }))))) } Gi(t, e, n, r) { return ua(e) || r.isEqual(Ts.min()) ? this.Qi(t, e) : this.Ui.getDocuments(t, n).next((s => { const i = this.ji(e, s); 
 return this.zi(e, i, n, r) ? this.Qi(t, e) : (Wr() <= T.DEBUG && Yr("QueryEngine", "Re-using previous result from %s to execute query: %s", r.toString(), va(e)), this.Wi(t, i, e, Ls(r, -1))) })) } ji(t, e) { let n = new qi(Ea(t)); 
 return e.forEach(((e, r) => { ba(t, r) && (n = n.add(r)) })), n } zi(t, e, n, r) { if (null === t.limit) return !1; 
 if (n.size !== e.size) return !0; 
 const s = "F" === t.limitType ? e.last() : e.first(); 
 return !!s && (s.hasPendingWrites || s.version.compareTo(r) > 0) } Qi(t, e) { return Wr() <= T.DEBUG && Yr("QueryEngine", "Using full collection scan to execute query:", va(e)), this.Ui.getDocumentsMatchingQuery(t, e, Vs.min()) } Wi(t, e, n, r) { return this.Ui.getDocumentsMatchingQuery(t, n, r).next((t => (e.forEach((e => { t = t.insert(e.key, e) })), t))) } } class fh { constructor(t, e, n, r) { this.persistence = t, this.Hi = e, this.serializer = r, this.Ji = new Pi(vs), this.Yi = new Sa((t => ta(t)), ea), this.Xi = new Map, this.Zi = t.getRemoteDocumentCache(), this.Bs = t.getTargetCache(), this.qs = t.getBundleCache(), this.tr(n) } tr(t) { this.documentOverlayCache = this.persistence.getDocumentOverlayCache(t), this.indexManager = this.persistence.getIndexManager(t), this.mutationQueue = this.persistence.getMutationQueue(t, this.indexManager), this.localDocuments = new Kl(this.Zi, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.Zi.setIndexManager(this.indexManager), this.Hi.initialize(this.localDocuments, this.indexManager) } collectGarbage(t) { return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (e => t.collect(e, this.Ji))) } } function gh(t, e, n, r) { return new fh(t, e, n, r) } async function mh(t, e) { const n = ss(t); 
 return await n.persistence.runTransaction("Handle user change", "readonly", (t => { let r; 
 return n.mutationQueue.getAllMutationBatches(t).next((s => (r = s, n.tr(e), n.mutationQueue.getAllMutationBatches(t)))).next((e => { const s = [], i = []; 
 let o = Oa(); 
 for (const t of r) { s.push(t.batchId); 
 for (const e of t.mutations) o = o.add(e.key) } for (const t of e) { i.push(t.batchId); 
 for (const e of t.mutations) o = o.add(e.key) } return n.localDocuments.getDocuments(t, o).next((t => ({ er: t, removedBatchIds: s, addedBatchIds: i }))) })) })) } function ph(t) { const e = ss(t); 
 return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t => e.Bs.getLastRemoteSnapshotVersion(t))) } function yh(t, e, n) { let r = Oa(), s = Oa(); 
 return n.forEach((t => r = r.add(t))), e.getEntries(t, r).next((t => { let r = xa(); 
 return n.forEach(((n, i) => { const o = t.get(n); 
 i.isFoundDocument() !== o.isFoundDocument() && (s = s.add(n)), i.isNoDocument() && i.version.isEqual(Ts.min()) ? (e.removeEntry(n, i.readTime), r = r.insert(n, i)) : !o.isValidDocument() || i.version.compareTo(o.version) > 0 || 0 === i.version.compareTo(o.version) && o.hasPendingWrites ? (e.addEntry(i), r = r.insert(n, i)) : Yr("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", o.version, " Watch version:", i.version) })), { nr: r, sr: s } })) } function wh(t, e) { const n = ss(t); 
 return n.persistence.runTransaction("Get next mutation batch", "readonly", (t => (void 0 === e && (e = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(t, e)))) } function vh(t, e) { const n = ss(t); 
 return n.persistence.runTransaction("Allocate target", "readwrite", (t => { let r; 
 return n.Bs.getTargetData(t, e).next((s => s ? (r = s, zs.resolve(r)) : n.Bs.allocateTargetId(t).next((s => (r = new Iu(e, s, "TargetPurposeListen", t.currentSequenceNumber), n.Bs.addTargetData(t, r).next((() => r))))))) })).then((t => { const r = n.Ji.get(t.targetId); 
 return (null === r || t.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.Ji = n.Ji.insert(t.targetId, t), n.Yi.set(e, t.targetId)), t })) } async function bh(t, e, n) { const r = ss(t), s = r.Ji.get(e), i = n ? "readwrite" : "readwrite-primary"; 
 try { n || await r.persistence.runTransaction("Release target", i, (t => r.persistence.referenceDelegate.removeTarget(t, s))) } catch (t) { if (!Hs(t)) throw t; 
 Yr("LocalStore", `Failed to update sequence numbers for target ${ e }: ${ t } `) } r.Ji = r.Ji.remove(e), r.Yi.delete(s.target) } function Ih(t, e, n) { const r = ss(t); 
 let s = Ts.min(), i = Oa(); 
 return r.persistence.runTransaction("Execute query", "readonly", (t => function (t, e, n) { const r = ss(t), s = r.Yi.get(n); 
 return void 0 !== s ? zs.resolve(r.Ji.get(s)) : r.Bs.getTargetData(e, n) }(r, t, ga(e)).next((e => { if (e) return s = e.lastLimboFreeSnapshotVersion, r.Bs.getMatchingKeysForTargetId(t, e.targetId).next((t => { i = t })) })).next((() => r.Hi.getDocumentsMatchingQuery(t, e, n ? s : Ts.min(), n ? i : Oa()))).next((t => (Sh(r, Ia(e), t), { documents: t, ir: i }))))) } function Eh(t, e) { const n = ss(t), r = ss(n.Bs), s = n.Ji.get(e); 
 return s ? Promise.resolve(s.target) : n.persistence.runTransaction("Get target data", "readonly", (t => r.le(t, e).next((t => t ? t.target : null)))) } function Th(t, e) { const n = ss(t), r = n.Xi.get(e) || Ts.min(); 
 return n.persistence.runTransaction("Get new document changes", "readonly", (t => n.Zi.getAllFromCollectionGroup(t, e, Ls(r, -1), Number.MAX_SAFE_INTEGER))).then((t => (Sh(n, e, t), t))) } function Sh(t, e, n) { let r = t.Xi.get(e) || Ts.min(); 
 n.forEach(((t, e) => { e.readTime.compareTo(r) > 0 && (r = e.readTime) })), t.Xi.set(e, r) } async function _h(t, e, n = Oa()) { const r = await vh(t, ga(Nu(e.bundledQuery))), s = ss(t); 
 return s.persistence.runTransaction("Save named query", "readwrite", (t => { const i = Xc(e.readTime); 
 if (r.snapshotVersion.compareTo(i) >= 0) return s.qs.saveNamedQuery(t, e); 
 const o = r.withResumeToken($i.EMPTY_BYTE_STRING, i); 
 return s.Ji = s.Ji.insert(o.targetId, o), s.Bs.updateTargetData(t, o).next((() => s.Bs.removeMatchingKeysForTargetId(t, r.targetId))).next((() => s.Bs.addMatchingKeys(t, n, r.targetId))).next((() => s.qs.saveNamedQuery(t, e))) })) } function xh(t, e) { return `firestore_clients_${ t }_${ e } ` } function Ch(t, e, n) { let r = `firestore_mutations_${ t }_${ n } `; 
 return e.isAuthenticated() && (r += `_${ e.uid } `), r } function Dh(t, e) { return `firestore_targets_${ t }_${ e } ` } class Ah { constructor(t, e, n, r) { this.user = t, this.batchId = e, this.state = n, this.error = r } static ar(t, e, n) { const r = JSON.parse(n); 
 let s, i = "object" == typeof r && -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) && (void 0 === r.error || "object" == typeof r.error); 
 return i && r.error && (i = "string" == typeof r.error.message && "string" == typeof r.error.code, i && (s = new os(r.error.code, r.error.message))), i ? new Ah(t, e, r.state, s) : (Jr("SharedClientState", `Failed to parse mutation state for ID '${e}': ${ n } `), null) } hr() { const t = { state: this.state, updateTimeMs: Date.now() }; 
 return this.error && (t.error = { code: this.error.code, message: this.error.message }), JSON.stringify(t) } } class Nh { constructor(t, e, n) { this.targetId = t, this.state = e, this.error = n } static ar(t, e) { const n = JSON.parse(e); 
 let r, s = "object" == typeof n && -1 !== ["not-current", "current", "rejected"].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error); 
 return s && n.error && (s = "string" == typeof n.error.message && "string" == typeof n.error.code, s && (r = new os(n.error.code, n.error.message))), s ? new Nh(t, n.state, r) : (Jr("SharedClientState", `Failed to parse target state for ID '${t}': ${ e } `), null) } hr() { const t = { state: this.state, updateTimeMs: Date.now() }; 
 return this.error && (t.error = { code: this.error.code, message: this.error.message }), JSON.stringify(t) } } class kh { constructor(t, e) { this.clientId = t, this.activeTargetIds = e } static ar(t, e) { const n = JSON.parse(e); 
 let r = "object" == typeof n && n.activeTargetIds instanceof Array, s = Pa(); 
 for (let t = 0; 
 r && t < n.activeTargetIds.length; 
 ++t)r = si(n.activeTargetIds[t]), s = s.add(n.activeTargetIds[t]); 
 return r ? new kh(t, s) : (Jr("SharedClientState", `Failed to parse client data for instance '${t}': ${ e } `), null) } } class Rh { constructor(t, e) { this.clientId = t, this.onlineState = e } static ar(t) { const e = JSON.parse(t); 
 return "object" == typeof e && -1 !== ["Unknown", "Online", "Offline"].indexOf(e.onlineState) && "string" == typeof e.clientId ? new Rh(e.clientId, e.onlineState) : (Jr("SharedClientState", `Failed to parse online state: ${ t } `), null) } } class Mh { constructor() { this.activeTargetIds = Pa() } lr(t) { this.activeTargetIds = this.activeTargetIds.add(t) } dr(t) { this.activeTargetIds = this.activeTargetIds.delete(t) } hr() { const t = { activeTargetIds: this.activeTargetIds.toArray(), updateTimeMs: Date.now() }; 
 return JSON.stringify(t) } } class Fh { constructor(t, e, n, r, s) { this.window = t, this.ii = e, this.persistenceKey = n, this.wr = r, this.syncEngine = null, this.onlineStateHandler = null, this.sequenceNumberHandler = null, this._r = this.mr.bind(this), this.gr = new Pi(vs), this.started = !1, this.yr = []; 
 const i = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
 this.storage = this.window.localStorage, this.currentUser = s, this.pr = xh(this.persistenceKey, this.wr), this.Ir = function (t) { return `firestore_sequence_number_${ t } ` }(this.persistenceKey), this.gr = this.gr.insert(this.wr, new Mh), this.Tr = new RegExp(` ^ firestore_clients_${ i } _([^ _] *)$`), this.Er = new RegExp(` ^ firestore_mutations_${ i } _(\\d +)(?: _(.*)) ? $`), this.Ar = new RegExp(` ^ firestore_targets_${ i } _(\\d +)$`), this.vr = function (t) { return `firestore_online_state_${ t } ` }(this.persistenceKey), this.Rr = function (t) { return `firestore_bundle_loaded_v2_${ t } ` }(this.persistenceKey), this.window.addEventListener("storage", this._r) } static D(t) { return !(!t || !t.localStorage) } async start() { const t = await this.syncEngine.$i(); 
 for (const e of t) { if (e === this.wr) continue; 
 const t = this.getItem(xh(this.persistenceKey, e)); 
 if (t) { const n = kh.ar(e, t); 
 n && (this.gr = this.gr.insert(n.clientId, n)) } } this.Pr(); 
 const e = this.storage.getItem(this.vr); 
 if (e) { const t = this.br(e); 
 t && this.Vr(t) } for (const t of this.yr) this.mr(t); 
 this.yr = [], this.window.addEventListener("pagehide", (() => this.shutdown())), this.started = !0 } writeSequenceNumber(t) { this.setItem(this.Ir, JSON.stringify(t)) } getAllActiveQueryTargets() { return this.Sr(this.gr) } isActiveQueryTarget(t) { let e = !1; 
 return this.gr.forEach(((n, r) => { r.activeTargetIds.has(t) && (e = !0) })), e } addPendingMutation(t) { this.Dr(t, "pending") } updateMutationState(t, e, n) { this.Dr(t, e, n), this.Cr(t) } addLocalQueryTarget(t) { let e = "not-current"; 
 if (this.isActiveQueryTarget(t)) { const n = this.storage.getItem(Dh(this.persistenceKey, t)); 
 if (n) { const r = Nh.ar(t, n); 
 r && (e = r.state) } } return this.Nr.lr(t), this.Pr(), e } removeLocalQueryTarget(t) { this.Nr.dr(t), this.Pr() } isLocalQueryTarget(t) { return this.Nr.activeTargetIds.has(t) } clearQueryState(t) { this.removeItem(Dh(this.persistenceKey, t)) } updateQueryState(t, e, n) { this.kr(t, e, n) } handleUserChange(t, e, n) { e.forEach((t => { this.Cr(t) })), this.currentUser = t, n.forEach((t => { this.addPendingMutation(t) })) } setOnlineState(t) { this.Mr(t) } notifyBundleLoaded(t) { this.$r(t) } shutdown() { this.started && (this.window.removeEventListener("storage", this._r), this.removeItem(this.pr), this.started = !1) } getItem(t) { const e = this.storage.getItem(t); 
 return Yr("SharedClientState", "READ", t, e), e } setItem(t, e) { Yr("SharedClientState", "SET", t, e), this.storage.setItem(t, e) } removeItem(t) { Yr("SharedClientState", "REMOVE", t), this.storage.removeItem(t) } mr(t) { const e = t; 
 if (e.storageArea === this.storage) { if (Yr("SharedClientState", "EVENT", e.key, e.newValue), e.key === this.pr) return void Jr("Received WebStorage notification for local change. Another client might have garbage-collected our state"); 
 this.ii.enqueueRetryable((async () => { if (this.started) { if (null !== e.key) if (this.Tr.test(e.key)) { if (null == e.newValue) { const t = this.Or(e.key); 
 return this.Fr(t, null) } { const t = this.Br(e.key, e.newValue); 
 if (t) return this.Fr(t.clientId, t) } } else if (this.Er.test(e.key)) { if (null !== e.newValue) { const t = this.Lr(e.key, e.newValue); 
 if (t) return this.qr(t) } } else if (this.Ar.test(e.key)) { if (null !== e.newValue) { const t = this.Ur(e.key, e.newValue); 
 if (t) return this.Kr(t) } } else if (e.key === this.vr) { if (null !== e.newValue) { const t = this.br(e.newValue); 
 if (t) return this.Vr(t) } } else if (e.key === this.Ir) { const t = function (t) { let e = ei.ct; 
 if (null != t) try { const n = JSON.parse(t); 
 ns("number" == typeof n), e = n } catch (t) { Jr("SharedClientState", "Failed to read sequence number from WebStorage", t) } return e }(e.newValue); 
 t !== ei.ct && this.sequenceNumberHandler(t) } else if (e.key === this.Rr) { const t = this.Gr(e.newValue); 
 await Promise.all(t.map((t => this.syncEngine.Qr(t)))) } } else this.yr.push(e) })) } } get Nr() { return this.gr.get(this.wr) } Pr() { this.setItem(this.pr, this.Nr.hr()) } Dr(t, e, n) { const r = new Ah(this.currentUser, t, e, n), s = Ch(this.persistenceKey, this.currentUser, t); 
 this.setItem(s, r.hr()) } Cr(t) { const e = Ch(this.persistenceKey, this.currentUser, t); 
 this.removeItem(e) } Mr(t) { const e = { clientId: this.wr, onlineState: t }; 
 this.storage.setItem(this.vr, JSON.stringify(e)) } kr(t, e, n) { const r = Dh(this.persistenceKey, t), s = new Nh(t, e, n); 
 this.setItem(r, s.hr()) } $r(t) { const e = JSON.stringify(Array.from(t)); 
 this.setItem(this.Rr, e) } Or(t) { const e = this.Tr.exec(t); 
 return e ? e[1] : null } Br(t, e) { const n = this.Or(t); 
 return kh.ar(n, e) } Lr(t, e) { const n = this.Er.exec(t), r = Number(n[1]), s = void 0 !== n[2] ? n[2] : null; 
 return Ah.ar(new $r(s), r, e) } Ur(t, e) { const n = this.Ar.exec(t), r = Number(n[1]); 
 return Nh.ar(r, e) } br(t) { return Rh.ar(t) } Gr(t) { return JSON.parse(t) } async qr(t) { if (t.user.uid === this.currentUser.uid) return this.syncEngine.jr(t.batchId, t.state, t.error); 
 Yr("SharedClientState", `Ignoring mutation for non - active user ${ t.user.uid } `) } Kr(t) { return this.syncEngine.zr(t.targetId, t.state, t.error) } Fr(t, e) { const n = e ? this.gr.insert(t, e) : this.gr.remove(t), r = this.Sr(this.gr), s = this.Sr(n), i = [], o = []; 
 return s.forEach((t => { r.has(t) || i.push(t) })), r.forEach((t => { s.has(t) || o.push(t) })), this.syncEngine.Wr(i, o).then((() => { this.gr = n })) } Vr(t) { this.gr.get(t.clientId) && this.onlineStateHandler(t.onlineState) } Sr(t) { let e = Pa(); 
 return t.forEach(((t, n) => { e = e.unionWith(n.activeTargetIds) })), e } } class Oh { constructor() { this.Hr = new Mh, this.Jr = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null } addPendingMutation(t) { } updateMutationState(t, e, n) { } addLocalQueryTarget(t) { return this.Hr.lr(t), this.Jr[t] || "not-current" } updateQueryState(t, e, n) { this.Jr[t] = e } removeLocalQueryTarget(t) { this.Hr.dr(t) } isLocalQueryTarget(t) { return this.Hr.activeTargetIds.has(t) } clearQueryState(t) { delete this.Jr[t] } getAllActiveQueryTargets() { return this.Hr.activeTargetIds } isActiveQueryTarget(t) { return this.Hr.activeTargetIds.has(t) } start() { return this.Hr = new Mh, Promise.resolve() } handleUserChange(t, e, n) { } setOnlineState(t) { } shutdown() { } writeSequenceNumber(t) { } notifyBundleLoaded(t) { } } class Lh { Yr(t) { } shutdown() { } } class Ph { constructor() { this.Xr = () => this.Zr(), this.eo = () => this.no(), this.so = [], this.io() } Yr(t) { this.so.push(t) } shutdown() { window.removeEventListener("online", this.Xr), window.removeEventListener("offline", this.eo) } io() { window.addEventListener("online", this.Xr), window.addEventListener("offline", this.eo) } Zr() { Yr("ConnectivityMonitor", "Network connectivity changed: AVAILABLE"); 
 for (const t of this.so) t(0) } no() { Yr("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE"); 
 for (const t of this.so) t(1) } static D() { return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener } } let Vh = null; 
 function Bh() { return null === Vh ? Vh = 268435456 + Math.round(2147483648 * Math.random()) : Vh++, "0x" + Vh.toString(16) } const qh = { BatchGetDocuments: "batchGet", Commit: "commit", RunQuery: "runQuery", RunAggregationQuery: "runAggregationQuery" }; 
 class Uh { constructor(t) { this.ro = t.ro, this.oo = t.oo } uo(t) { this.co = t } ao(t) { this.ho = t } onMessage(t) { this.lo = t } close() { this.oo() } send(t) { this.ro(t) } fo() { this.co() } wo(t) { this.ho(t) } _o(t) { this.lo(t) } } const jh = "WebChannelConnection"; 
 class zh extends class { constructor(t) { this.databaseInfo = t, this.databaseId = t.databaseId; 
 const e = t.ssl ? "https" : "http"; 
 this.mo = e + "://" + t.host, this.yo = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents" } get po() { return !1 } Io(t, e, n, r, s) { const i = Bh(), o = this.To(t, e); 
 Yr("RestConnection", `Sending RPC '${t}' ${ i }: `, o, n); 
 const a = {}; 
 return this.Eo(a, r, s), this.Ao(t, o, a, n).then((e => (Yr("RestConnection", `Received RPC '${t}' ${ i }: `, e), e)), (e => { throw Zr("RestConnection", `RPC '${t}' ${ i } failed with error: `, e, "url: ", o, "request:", n), e })) } vo(t, e, n, r, s, i) { return this.Io(t, e, n, r, s) } Eo(t, e, n) { t["X-Goog-Api-Client"] = "gl-js/ fire/" + Qr, t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), e && e.headers.forEach(((e, n) => t[n] = e)), n && n.headers.forEach(((e, n) => t[n] = e)) } To(t, e) { const n = qh[t]; 
 return `${ this.mo } /v1/${ e }:${ n } ` } }{ constructor(t) { super(t), this.forceLongPolling = t.forceLongPolling, this.autoDetectLongPolling = t.autoDetectLongPolling, this.useFetchStreams = t.useFetchStreams, this.longPollingOptions = t.longPollingOptions } Ao(t, e, n, r) { const s = Bh(); 
 return new Promise(((i, o) => { const a = new jr; 
 a.setWithCredentials(!0), a.listenOnce(Lr.COMPLETE, (() => { try { switch (a.getLastErrorCode()) { case Or.NO_ERROR: const e = a.getResponseJson(); 
 Yr(jh, `XHR for RPC '${t}' ${ s } received: `, JSON.stringify(e)), i(e); 
 break; 
 case Or.TIMEOUT: Yr(jh, `RPC '${t}' ${ s } timed out`), o(new os(is.DEADLINE_EXCEEDED, "Request time out")); 
 break; 
 case Or.HTTP_ERROR: const n = a.getStatus(); 
 if (Yr(jh, `RPC '${t}' ${ s } failed with status: `, n, "response text:", a.getResponseText()), n > 0) { let t = a.getResponseJson(); 
 Array.isArray(t) && (t = t[0]); 
 const e = null == t ? void 0 : t.error; 
 if (e && e.status && e.message) { const t = function (t) { const e = t.toLowerCase().replace(/_/g, "-"); 
 return Object.values(is).indexOf(e) >= 0 ? e : is.UNKNOWN }(e.status); 
 o(new os(t, e.message)) } else o(new os(is.UNKNOWN, "Server responded with status " + a.getStatus())) } else o(new os(is.UNAVAILABLE, "Connection failed.")); 
 break; 
 default: es() } } finally { Yr(jh, `RPC '${t}' ${ s } completed.`) } })); 
 const c = JSON.stringify(r); 
 Yr(jh, `RPC '${t}' ${ s } sending request: `, r), a.send(e, "POST", c, n, 15) })) } Ro(t, e, n) { const r = Bh(), s = [this.mo, "/", "google.firestore.v1.Firestore", "/", t, "/channel"], i = new hr, o = le(), a = { httpSessionIdParam: "gsessionid", initMessageHeaders: {}, messageUrlParams: { database: `projects / ${ this.databaseId.projectId } /databases/${ this.databaseId.database } ` }, sendRawJson: !0, supportsCrossDomainXhr: !0, internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 }, forceLongPolling: this.forceLongPolling, detectBufferingProxy: this.autoDetectLongPolling }, c = this.longPollingOptions.timeoutSeconds; 
 void 0 !== c && (a.longPollingTimeout = Math.round(1e3 * c)), this.useFetchStreams && (a.xmlHttpFactory = new qr({})), this.Eo(a.initMessageHeaders, e, n), a.encodeInitMessageHeaders = !0; 
 const u = s.join(""); 
 Yr(jh, `Creating RPC '${t}' stream ${ r }: ${ u } `, a); 
 const l = i.createWebChannel(u, a); 
 let h = !1, d = !1; 
 const f = new Uh({ ro: e => { d ? Yr(jh, `Not sending because RPC '${t}' stream ${ r } is closed: `, e) : (h || (Yr(jh, `Opening RPC '${t}' stream ${ r } transport.`), l.open(), h = !0), Yr(jh, `RPC '${t}' stream ${ r } sending: `, e), l.send(e)) }, oo: () => l.close() }), g = (t, e, n) => { t.listen(e, (t => { try { n(t) } catch (t) { setTimeout((() => { throw t }), 0) } })) }; 
 return g(l, Ur.EventType.OPEN, (() => { d || Yr(jh, `RPC '${t}' stream ${ r } transport opened.`) })), g(l, Ur.EventType.CLOSE, (() => { d || (d = !0, Yr(jh, `RPC '${t}' stream ${ r } transport closed`), f.wo()) })), g(l, Ur.EventType.ERROR, (e => { d || (d = !0, Zr(jh, `RPC '${t}' stream ${ r } transport errored: `, e), f.wo(new os(is.UNAVAILABLE, "The operation could not be completed"))) })), g(l, Ur.EventType.MESSAGE, (e => { var n; 
 if (!d) { const s = e.data[0]; 
 ns(!!s); 
 const i = s, o = i.error || (null === (n = i[0]) || void 0 === n ? void 0 : n.error); 
 if (o) { Yr(jh, `RPC '${t}' stream ${ r } received error: `, o); 
 const e = o.status; 
 let n = function (t) { const e = Ic[t]; 
 if (void 0 !== e) return Sc(e) }(e), s = o.message; 
 void 0 === n && (n = is.INTERNAL, s = "Unknown error status: " + e + " with message " + o.message), d = !0, f.wo(new os(n, s)), l.close() } else Yr(jh, `RPC '${t}' stream ${ r } received: `, s), f._o(s) } })), g(o, Pr.STAT_EVENT, (e => { e.stat === Vr ? Yr(jh, `RPC '${t}' stream ${ r } detected buffering proxy`) : e.stat === Br && Yr(jh, `RPC '${t}' stream ${ r } detected no buffering proxy`) })), setTimeout((() => { f.fo() }), 0), f } } function Gh() { return "undefined" != typeof window ? window : null } function Kh() { return "undefined" != typeof document ? document : null } function $h(t) { return new Kc(t, !0) } class Qh { constructor(t, e, n = 1e3, r = 1.5, s = 6e4) { this.ii = t, this.timerId = e, this.Po = n, this.bo = r, this.Vo = s, this.So = 0, this.Do = null, this.Co = Date.now(), this.reset() } reset() { this.So = 0 } xo() { this.So = this.Vo } No(t) { this.cancel(); 
 const e = Math.floor(this.So + this.ko()), n = Math.max(0, Date.now() - this.Co), r = Math.max(0, e - n); 
 r > 0 && Yr("ExponentialBackoff", `Backing off for ${ r } ms(base delay: ${ this.So } ms, delay with jitter: ${ e } ms, last attempt: ${ n } ms ago)`), this.Do = this.ii.enqueueAfterDelay(this.timerId, r, (() => (this.Co = Date.now(), t()))), this.So *= this.bo, this.So < this.Po && (this.So = this.Po), this.So > this.Vo && (this.So = this.Vo) } Mo() { null !== this.Do && (this.Do.skipDelay(), this.Do = null) } cancel() { null !== this.Do && (this.Do.cancel(), this.Do = null) } ko() { return (Math.random() - .5) * this.So } } class Hh { constructor(t, e, n, r, s, i, o, a) { this.ii = t, this.$o = n, this.Oo = r, this.connection = s, this.authCredentialsProvider = i, this.appCheckCredentialsProvider = o, this.listener = a, this.state = 0, this.Fo = 0, this.Bo = null, this.Lo = null, this.stream = null, this.qo = new Qh(t, e) } Uo() { return 1 === this.state || 5 === this.state || this.Ko() } Ko() { return 2 === this.state || 3 === this.state } start() { 4 !== this.state ? this.auth() : this.Go() } async stop() { this.Uo() && await this.close(0) } Qo() { this.state = 0, this.qo.reset() } jo() { this.Ko() && null === this.Bo && (this.Bo = this.ii.enqueueAfterDelay(this.$o, 6e4, (() => this.zo()))) } Wo(t) { this.Ho(), this.stream.send(t) } async zo() { if (this.Ko()) return this.close(0) } Ho() { this.Bo && (this.Bo.cancel(), this.Bo = null) } Jo() { this.Lo && (this.Lo.cancel(), this.Lo = null) } async close(t, e) { this.Ho(), this.Jo(), this.qo.cancel(), this.Fo++, 4 !== t ? this.qo.reset() : e && e.code === is.RESOURCE_EXHAUSTED ? (Jr(e.toString()), Jr("Using maximum backoff delay to prevent overloading the backend."), this.qo.xo()) : e && e.code === is.UNAUTHENTICATED && 3 !== this.state && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), null !== this.stream && (this.Yo(), this.stream.close(), this.stream = null), this.state = t, await this.listener.ao(e) } Yo() { } auth() { this.state = 1; 
 const t = this.Xo(this.Fo), e = this.Fo; 
 Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then((([t, n]) => { this.Fo === e && this.Zo(t, n) }), (e => { t((() => { const t = new os(is.UNKNOWN, "Fetching auth token failed: " + e.message); 
 return this.tu(t) })) })) } Zo(t, e) { const n = this.Xo(this.Fo); 
 this.stream = this.eu(t, e), this.stream.uo((() => { n((() => (this.state = 2, this.Lo = this.ii.enqueueAfterDelay(this.Oo, 1e4, (() => (this.Ko() && (this.state = 3), Promise.resolve()))), this.listener.uo()))) })), this.stream.ao((t => { n((() => this.tu(t))) })), this.stream.onMessage((t => { n((() => this.onMessage(t))) })) } Go() { this.state = 5, this.qo.No((async () => { this.state = 0, this.start() })) } tu(t) { return Yr("PersistentStream", `close with error: ${ t } `), this.stream = null, this.close(4, t) } Xo(t) { return e => { this.ii.enqueueAndForget((() => this.Fo === t ? e() : (Yr("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve()))) } } } class Wh extends Hh { constructor(t, e, n, r, s, i) { super(t, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", e, n, r, i), this.serializer = s } eu(t, e) { return this.connection.Ro("Listen", t, e) } onMessage(t) { this.qo.reset(); 
 const e = function (t, e) { let n; 
 if ("targetChange" in e) { e.targetChange; 
 const r = function (t) { return "NO_CHANGE" === t ? 0 : "ADD" === t ? 1 : "REMOVE" === t ? 2 : "CURRENT" === t ? 3 : "RESET" === t ? 4 : es() }(e.targetChange.targetChangeType || "NO_CHANGE"), s = e.targetChange.targetIds || [], i = function (t, e) { return t.useProto3Json ? (ns(void 0 === e || "string" == typeof e), $i.fromBase64String(e || "")) : (ns(void 0 === e || e instanceof Uint8Array), $i.fromUint8Array(e || new Uint8Array)) }(t, e.targetChange.resumeToken), o = e.targetChange.cause, a = o && function (t) { const e = void 0 === t.code ? is.UNKNOWN : Sc(t.code); 
 return new os(e, t.message || "") }(o); 
 n = new Pc(r, s, i, a || null) } else if ("documentChange" in e) { e.documentChange; 
 const r = e.documentChange; 
 r.document, r.document.name, r.document.updateTime; 
 const s = tu(t, r.document.name), i = Xc(r.document.updateTime), o = r.document.createTime ? Xc(r.document.createTime) : Ts.min(), a = new _o({ mapValue: { fields: r.document.fields } }), c = Co.newFoundDocument(s, i, o, a), u = r.targetIds || [], l = r.removedTargetIds || []; 
 n = new Oc(u, l, c.key, c) } else if ("documentDelete" in e) { e.documentDelete; 
 const r = e.documentDelete; 
 r.document; 
 const s = tu(t, r.document), i = r.readTime ? Xc(r.readTime) : Ts.min(), o = Co.newNoDocument(s, i), a = r.removedTargetIds || []; 
 n = new Oc([], a, o.key, o) } else if ("documentRemove" in e) { e.documentRemove; 
 const r = e.documentRemove; 
 r.document; 
 const s = tu(t, r.document), i = r.removedTargetIds || []; 
 n = new Oc([], i, s, null) } else { if (!("filter" in e)) return es(); 
 { e.filter; 
 const t = e.filter; 
 t.targetId; 
 const { count: r = 0, unchangedNames: s } = t, i = new bc(r, s), o = t.targetId; 
 n = new Lc(o, i) } } return n }(this.serializer, t), n = function (t) { if (!("targetChange" in t)) return Ts.min(); 
 const e = t.targetChange; 
 return e.targetIds && e.targetIds.length ? Ts.min() : e.readTime ? Xc(e.readTime) : Ts.min() }(t); 
 return this.listener.nu(e, n) } su(t) { const e = {}; 
 e.database = ru(this.serializer), e.addTarget = function (t, e) { let n; 
 const r = e.target; 
 if (n = na(r) ? { documents: uu(t, r) } : { query: lu(t, r) }, n.targetId = e.targetId, e.resumeToken.approximateByteSize() > 0) { n.resumeToken = Hc(t, e.resumeToken); 
 const r = $c(t, e.expectedCount); 
 null !== r && (n.expectedCount = r) } else if (e.snapshotVersion.compareTo(Ts.min()) > 0) { n.readTime = Qc(t, e.snapshotVersion.toTimestamp()); 
 const r = $c(t, e.expectedCount); 
 null !== r && (n.expectedCount = r) } return n }(this.serializer, t); 
 const n = function (t, e) { const n = function (t) { switch (t) { case "TargetPurposeListen": return null; 
 case "TargetPurposeExistenceFilterMismatch": return "existence-filter-mismatch"; 
 case "TargetPurposeExistenceFilterMismatchBloom": return "existence-filter-mismatch-bloom"; 
 case "TargetPurposeLimboResolution": return "limbo-document"; 
 default: return es() } }(e.purpose); 
 return null == n ? null : { "goog-listen-tags": n } }(this.serializer, t); 
 n && (e.labels = n), this.Wo(e) } iu(t) { const e = {}; 
 e.database = ru(this.serializer), e.removeTarget = t, this.Wo(e) } } class Xh extends Hh { constructor(t, e, n, r, s, i) { super(t, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", e, n, r, i), this.serializer = s, this.ru = !1 } get ou() { return this.ru } start() { this.ru = !1, this.lastStreamToken = void 0, super.start() } Yo() { this.ru && this.uu([]) } eu(t, e) { return this.connection.Ro("Write", t, e) } onMessage(t) { if (ns(!!t.streamToken), this.lastStreamToken = t.streamToken, this.ru) { this.qo.reset(); 
 const e = function (t, e) { return t && t.length > 0 ? (ns(void 0 !== e), t.map((t => function (t, e) { let n = t.updateTime ? Xc(t.updateTime) : Xc(e); 
 return n.isEqual(Ts.min()) && (n = Xc(e)), new tc(n, t.transformResults || []) }(t, e)))) : [] }(t.writeResults, t.commitTime), n = Xc(t.commitTime); 
 return this.listener.cu(n, e) } return ns(!t.writeResults || 0 === t.writeResults.length), this.ru = !0, this.listener.au() } hu() { const t = {}; 
 t.database = ru(this.serializer), this.Wo(t) } uu(t) { const e = { streamToken: this.lastStreamToken, writes: t.map((t => au(this.serializer, t))) }; 
 this.Wo(e) } } class Yh extends class { }{ constructor(t, e, n, r) { super(), this.authCredentials = t, this.appCheckCredentials = e, this.connection = n, this.serializer = r, this.lu = !1 } fu() { if (this.lu) throw new os(is.FAILED_PRECONDITION, "The client has already been terminated.") } Io(t, e, n) { return this.fu(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((([r, s]) => this.connection.Io(t, e, n, r, s))).catch((t => { throw "FirebaseError" === t.name ? (t.code === is.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t) : new os(is.UNKNOWN, t.toString()) })) } vo(t, e, n, r) { return this.fu(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((([s, i]) => this.connection.vo(t, e, n, s, i, r))).catch((t => { throw "FirebaseError" === t.name ? (t.code === is.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t) : new os(is.UNKNOWN, t.toString()) })) } terminate() { this.lu = !0 } } class Jh { constructor(t, e) { this.asyncQueue = t, this.onlineStateHandler = e, this.state = "Unknown", this.wu = 0, this._u = null, this.mu = !0 } gu() { 0 === this.wu && (this.yu("Unknown"), this._u = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, (() => (this._u = null, this.pu("Backend didn't respond within 10 seconds."), this.yu("Offline"), Promise.resolve())))) } Iu(t) { "Online" === this.state ? this.yu("Unknown") : (this.wu++, this.wu >= 1 && (this.Tu(), this.pu(`Connection failed 1 times.Most recent error: ${ t.toString() } `), this.yu("Offline"))) } set(t) { this.Tu(), this.wu = 0, "Online" === t && (this.mu = !1), this.yu(t) } yu(t) { t !== this.state && (this.state = t, this.onlineStateHandler(t)) } pu(t) { const e = `Could not reach Cloud Firestore backend.${ t } \nThis typically indicates that your device does not have a healthy Internet connection at the moment.The client will operate in offline mode until it is able to successfully connect to the backend.`; 
 this.mu ? (Jr(e), this.mu = !1) : Yr("OnlineStateTracker", e) } Tu() { null !== this._u && (this._u.cancel(), this._u = null) } } class Zh { constructor(t, e, n, r, s) { this.localStore = t, this.datastore = e, this.asyncQueue = n, this.remoteSyncer = {}, this.Eu = [], this.Au = new Map, this.vu = new Set, this.Ru = [], this.Pu = s, this.Pu.Yr((t => { n.enqueueAndForget((async () => { cd(this) && (Yr("RemoteStore", "Restarting streams for network reachability change."), await async function (t) { const e = ss(t); 
 e.vu.add(4), await ed(e), e.bu.set("Unknown"), e.vu.delete(4), await td(e) }(this)) })) })), this.bu = new Jh(n, r) } } async function td(t) { if (cd(t)) for (const e of t.Ru) await e(!0) } async function ed(t) { for (const e of t.Ru) await e(!1) } function nd(t, e) { const n = ss(t); 
 n.Au.has(e.targetId) || (n.Au.set(e.targetId, e), ad(n) ? od(n) : xd(n).Ko() && sd(n, e)) } function rd(t, e) { const n = ss(t), r = xd(n); 
 n.Au.delete(e), r.Ko() && id(n, e), 0 === n.Au.size && (r.Ko() ? r.jo() : cd(n) && n.bu.set("Unknown")) } function sd(t, e) { if (t.Vu.qt(e.targetId), e.resumeToken.approximateByteSize() > 0 || e.snapshotVersion.compareTo(Ts.min()) > 0) { const n = t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size; 
 e = e.withExpectedCount(n) } xd(t).su(e) } function id(t, e) { t.Vu.qt(e), xd(t).iu(e) } function od(t) { t.Vu = new Bc({ getRemoteKeysForTarget: e => t.remoteSyncer.getRemoteKeysForTarget(e), le: e => t.Au.get(e) || null, ue: () => t.datastore.serializer.databaseId }), xd(t).start(), t.bu.gu() } function ad(t) { return cd(t) && !xd(t).Uo() && t.Au.size > 0 } function cd(t) { return 0 === ss(t).vu.size } function ud(t) { t.Vu = void 0 } async function ld(t) { t.Au.forEach(((e, n) => { sd(t, e) })) } async function hd(t, e) { ud(t), ad(t) ? (t.bu.Iu(e), od(t)) : t.bu.set("Unknown") } async function dd(t, e, n) { if (t.bu.set("Online"), e instanceof Pc && 2 === e.state && e.cause) try { await async function (t, e) { const n = e.cause; 
 for (const r of e.targetIds) t.Au.has(r) && (await t.remoteSyncer.rejectListen(r, n), t.Au.delete(r), t.Vu.removeTarget(r)) }(t, e) } catch (n) { Yr("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n), await fd(t, n) } else if (e instanceof Oc ? t.Vu.Ht(e) : e instanceof Lc ? t.Vu.ne(e) : t.Vu.Xt(e), !n.isEqual(Ts.min())) try { const e = await ph(t.localStore); 
 n.compareTo(e) >= 0 && await function (t, e) { const n = t.Vu.ce(e); 
 return n.targetChanges.forEach(((n, r) => { if (n.resumeToken.approximateByteSize() > 0) { const s = t.Au.get(r); 
 s && t.Au.set(r, s.withResumeToken(n.resumeToken, e)) } })), n.targetMismatches.forEach(((e, n) => { const r = t.Au.get(e); 
 if (!r) return; 
 t.Au.set(e, r.withResumeToken($i.EMPTY_BYTE_STRING, r.snapshotVersion)), id(t, e); 
 const s = new Iu(r.target, e, n, r.sequenceNumber); 
 sd(t, s) })), t.remoteSyncer.applyRemoteEvent(n) }(t, n) } catch (e) { Yr("RemoteStore", "Failed to raise snapshot:", e), await fd(t, e) } } async function fd(t, e, n) { if (!Hs(e)) throw e; 
 t.vu.add(1), await ed(t), t.bu.set("Offline"), n || (n = () => ph(t.localStore)), t.asyncQueue.enqueueRetryable((async () => { Yr("RemoteStore", "Retrying IndexedDB access"), await n(), t.vu.delete(1), await td(t) })) } function gd(t, e) { return e().catch((n => fd(t, n, e))) } async function md(t) { const e = ss(t), n = Cd(e); 
 let r = e.Eu.length > 0 ? e.Eu[e.Eu.length - 1].batchId : -1; 
 for (; 
 pd(e); 
)try { const t = await wh(e.localStore, r); 
 if (null === t) { 0 === e.Eu.length && n.jo(); 
 break } r = t.batchId, yd(e, t) } catch (t) { await fd(e, t) } wd(e) && vd(e) } function pd(t) { return cd(t) && t.Eu.length < 10 } function yd(t, e) { t.Eu.push(e); 
 const n = Cd(t); 
 n.Ko() && n.ou && n.uu(e.mutations) } function wd(t) { return cd(t) && !Cd(t).Uo() && t.Eu.length > 0 } function vd(t) { Cd(t).start() } async function bd(t) { Cd(t).hu() } async function Id(t) { const e = Cd(t); 
 for (const n of t.Eu) e.uu(n.mutations) } async function Ed(t, e, n) { const r = t.Eu.shift(), s = yc.from(r, e, n); 
 await gd(t, (() => t.remoteSyncer.applySuccessfulWrite(s))), await md(t) } async function Td(t, e) { e && Cd(t).ou && await async function (t, e) { if (Tc(n = e.code) && n !== is.ABORTED) { const n = t.Eu.shift(); 
 Cd(t).Qo(), await gd(t, (() => t.remoteSyncer.rejectFailedWrite(n.batchId, e))), await md(t) } var n }(t, e), wd(t) && vd(t) } async function Sd(t, e) { const n = ss(t); 
 n.asyncQueue.verifyOperationInProgress(), Yr("RemoteStore", "RemoteStore received new credentials"); 
 const r = cd(n); 
 n.vu.add(3), await ed(n), r && n.bu.set("Unknown"), await n.remoteSyncer.handleCredentialChange(e), n.vu.delete(3), await td(n) } async function _d(t, e) { const n = ss(t); 
 e ? (n.vu.delete(2), await td(n)) : e || (n.vu.add(2), await ed(n), n.bu.set("Unknown")) } function xd(t) { return t.Su || (t.Su = function (t, e, n) { const r = ss(t); 
 return r.fu(), new Wh(e, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n) }(t.datastore, t.asyncQueue, { uo: ld.bind(null, t), ao: hd.bind(null, t), nu: dd.bind(null, t) }), t.Ru.push((async e => { e ? (t.Su.Qo(), ad(t) ? od(t) : t.bu.set("Unknown")) : (await t.Su.stop(), ud(t)) }))), t.Su } function Cd(t) { return t.Du || (t.Du = function (t, e, n) { const r = ss(t); 
 return r.fu(), new Xh(e, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n) }(t.datastore, t.asyncQueue, { uo: bd.bind(null, t), ao: Td.bind(null, t), au: Id.bind(null, t), cu: Ed.bind(null, t) }), t.Ru.push((async e => { e ? (t.Du.Qo(), await md(t)) : (await t.Du.stop(), t.Eu.length > 0 && (Yr("RemoteStore", `Stopping write stream with ${ t.Eu.length } pending writes`), t.Eu = [])) }))), t.Du } class Dd { constructor(t, e, n, r, s) { this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = s, this.deferred = new as, this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch((t => { })) } static createAndSchedule(t, e, n, r, s) { const i = Date.now() + n, o = new Dd(t, e, i, r, s); 
 return o.start(n), o } start(t) { this.timerHandle = setTimeout((() => this.handleDelayElapsed()), t) } skipDelay() { return this.handleDelayElapsed() } cancel(t) { null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new os(is.CANCELLED, "Operation cancelled" + (t ? ": " + t : "")))) } handleDelayElapsed() { this.asyncQueue.enqueueAndForget((() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then((t => this.deferred.resolve(t)))) : Promise.resolve())) } clearTimeout() { null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null) } } function Ad(t, e) { if (Jr("AsyncQueue", `${ e }: ${ t } `), Hs(t)) return new os(is.UNAVAILABLE, `${ e }: ${ t } `); 
 throw t } class Nd { constructor(t) { this.comparator = t ? (e, n) => t(e, n) || Ds.comparator(e.key, n.key) : (t, e) => Ds.comparator(t.key, e.key), this.keyedMap = Da(), this.sortedSet = new Pi(this.comparator) } static emptySet(t) { return new Nd(t.comparator) } has(t) { return null != this.keyedMap.get(t) } get(t) { return this.keyedMap.get(t) } first() { return this.sortedSet.minKey() } last() { return this.sortedSet.maxKey() } isEmpty() { return this.sortedSet.isEmpty() } indexOf(t) { const e = this.keyedMap.get(t); 
 return e ? this.sortedSet.indexOf(e) : -1 } get size() { return this.sortedSet.size } forEach(t) { this.sortedSet.inorderTraversal(((e, n) => (t(e), !1))) } add(t) { const e = this.delete(t.key); 
 return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null)) } delete(t) { const e = this.get(t); 
 return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this } isEqual(t) { if (!(t instanceof Nd)) return !1; 
 if (this.size !== t.size) return !1; 
 const e = this.sortedSet.getIterator(), n = t.sortedSet.getIterator(); 
 for (; 
 e.hasNext(); 
) { const t = e.getNext().key, r = n.getNext().key; 
 if (!t.isEqual(r)) return !1 } return !0 } toString() { const t = []; 
 return this.forEach((e => { t.push(e.toString()) })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)" } copy(t, e) { const n = new Nd; 
 return n.comparator = this.comparator, n.keyedMap = t, n.sortedSet = e, n } } class kd { constructor() { this.Cu = new Pi(Ds.comparator) } track(t) { const e = t.doc.key, n = this.Cu.get(e); 
 n ? 0 !== t.type && 3 === n.type ? this.Cu = this.Cu.insert(e, t) : 3 === t.type && 1 !== n.type ? this.Cu = this.Cu.insert(e, { type: n.type, doc: t.doc }) : 2 === t.type && 2 === n.type ? this.Cu = this.Cu.insert(e, { type: 2, doc: t.doc }) : 2 === t.type && 0 === n.type ? this.Cu = this.Cu.insert(e, { type: 0, doc: t.doc }) : 1 === t.type && 0 === n.type ? this.Cu = this.Cu.remove(e) : 1 === t.type && 2 === n.type ? this.Cu = this.Cu.insert(e, { type: 1, doc: n.doc }) : 0 === t.type && 1 === n.type ? this.Cu = this.Cu.insert(e, { type: 2, doc: t.doc }) : es() : this.Cu = this.Cu.insert(e, t) } xu() { const t = []; 
 return this.Cu.inorderTraversal(((e, n) => { t.push(n) })), t } } class Rd { constructor(t, e, n, r, s, i, o, a, c) { this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = s, this.fromCache = i, this.syncStateChanged = o, this.excludesMetadataChanges = a, this.hasCachedResults = c } static fromInitialDocuments(t, e, n, r, s) { const i = []; 
 return e.forEach((t => { i.push({ type: 0, doc: t }) })), new Rd(t, e, Nd.emptySet(e), i, n, r, !0, !1, s) } get hasPendingWrites() { return !this.mutatedKeys.isEmpty() } isEqual(t) { if (!(this.fromCache === t.fromCache && this.hasCachedResults === t.hasCachedResults && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && ya(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1; 
 const e = this.docChanges, n = t.docChanges; 
 if (e.length !== n.length) return !1; 
 for (let t = 0; 
 t < e.length; 
 t++)if (e[t].type !== n[t].type || !e[t].doc.isEqual(n[t].doc)) return !1; 
 return !0 } } class Md { constructor() { this.Nu = void 0, this.listeners = [] } } class Fd { constructor() { this.queries = new Sa((t => wa(t)), ya), this.onlineState = "Unknown", this.ku = new Set } } async function Od(t, e) { const n = ss(t), r = e.query; 
 let s = !1, i = n.queries.get(r); 
 if (i || (s = !0, i = new Md), s) try { i.Nu = await n.onListen(r) } catch (t) { const n = Ad(t, `Initialization of query '${va(e.query)}' failed`); 
 return void e.onError(n) } n.queries.set(r, i), i.listeners.push(e), e.Mu(n.onlineState), i.Nu && e.$u(i.Nu) && Bd(n) } async function Ld(t, e) { const n = ss(t), r = e.query; 
 let s = !1; 
 const i = n.queries.get(r); 
 if (i) { const t = i.listeners.indexOf(e); 
 t >= 0 && (i.listeners.splice(t, 1), s = 0 === i.listeners.length) } if (s) return n.queries.delete(r), n.onUnlisten(r) } function Pd(t, e) { const n = ss(t); 
 let r = !1; 
 for (const t of e) { const e = t.query, s = n.queries.get(e); 
 if (s) { for (const e of s.listeners) e.$u(t) && (r = !0); 
 s.Nu = t } } r && Bd(n) } function Vd(t, e, n) { const r = ss(t), s = r.queries.get(e); 
 if (s) for (const t of s.listeners) t.onError(n); 
 r.queries.delete(e) } function Bd(t) { t.ku.forEach((t => { t.next() })) } class qd { constructor(t, e, n) { this.query = t, this.Ou = e, this.Fu = !1, this.Bu = null, this.onlineState = "Unknown", this.options = n || {} } $u(t) { if (!this.options.includeMetadataChanges) { const e = []; 
 for (const n of t.docChanges) 3 !== n.type && e.push(n); 
 t = new Rd(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, !0, t.hasCachedResults) } let e = !1; 
 return this.Fu ? this.Lu(t) && (this.Ou.next(t), e = !0) : this.qu(t, this.onlineState) && (this.Uu(t), e = !0), this.Bu = t, e } onError(t) { this.Ou.error(t) } Mu(t) { this.onlineState = t; 
 let e = !1; 
 return this.Bu && !this.Fu && this.qu(this.Bu, t) && (this.Uu(this.Bu), e = !0), e } qu(t, e) { if (!t.fromCache) return !0; 
 const n = "Offline" !== e; 
 return (!this.options.Ku || !n) && (!t.docs.isEmpty() || t.hasCachedResults || "Offline" === e) } Lu(t) { if (t.docChanges.length > 0) return !0; 
 const e = this.Bu && this.Bu.hasPendingWrites !== t.hasPendingWrites; 
 return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges } Uu(t) { t = Rd.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache, t.hasCachedResults), this.Fu = !0, this.Ou.next(t) } } class Ud { constructor(t, e) { this.Gu = t, this.byteLength = e } Qu() { return "metadata" in this.Gu } } class jd { constructor(t) { this.serializer = t } rr(t) { return tu(this.serializer, t) } ur(t) { return t.metadata.exists ? ou(this.serializer, t.document, !1) : Co.newNoDocument(this.rr(t.metadata.name), this.cr(t.metadata.readTime)) } cr(t) { return Xc(t) } } class zd { constructor(t, e, n) { this.ju = t, this.localStore = e, this.serializer = n, this.queries = [], this.documents = [], this.collectionGroups = new Set, this.progress = Gd(t) } zu(t) { this.progress.bytesLoaded += t.byteLength; 
 let e = this.progress.documentsLoaded; 
 if (t.Gu.namedQuery) this.queries.push(t.Gu.namedQuery); 
 else if (t.Gu.documentMetadata) { this.documents.push({ metadata: t.Gu.documentMetadata }), t.Gu.documentMetadata.exists || ++e; 
 const n = _s.fromString(t.Gu.documentMetadata.name); 
 this.collectionGroups.add(n.get(n.length - 2)) } else t.Gu.document && (this.documents[this.documents.length - 1].document = t.Gu.document, ++e); 
 return e !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = e, Object.assign({}, this.progress)) : null } Wu(t) { const e = new Map, n = new jd(this.serializer); 
 for (const r of t) if (r.metadata.queries) { const t = n.rr(r.metadata.name); 
 for (const n of r.metadata.queries) { const r = (e.get(n) || Oa()).add(t); 
 e.set(n, r) } } return e } async complete() { const t = await async function (t, e, n, r) { const s = ss(t); 
 let i = Oa(), o = xa(); 
 for (const t of n) { const n = e.rr(t.metadata.name); 
 t.document && (i = i.add(n)); 
 const r = e.ur(t); 
 r.setReadTime(e.cr(t.metadata.readTime)), o = o.insert(n, r) } const a = s.Zi.newChangeBuffer({ trackRemovals: !0 }), c = await vh(s, function (t) { return ga(ca(_s.fromString(`__bundle__ / docs / ${ t } `))) }(r)); 
 return s.persistence.runTransaction("Apply bundle documents", "readwrite", (t => yh(t, a, o).next((e => (a.apply(t), e))).next((e => s.Bs.removeMatchingKeysForTargetId(t, c.targetId).next((() => s.Bs.addMatchingKeys(t, i, c.targetId))).next((() => s.localDocuments.getLocalViewOfDocuments(t, e.nr, e.sr))).next((() => e.nr)))))) }(this.localStore, new jd(this.serializer), this.documents, this.ju.id), e = this.Wu(this.documents); 
 for (const t of this.queries) await _h(this.localStore, t, e.get(t.name)); 
 return this.progress.taskState = "Success", { progress: this.progress, Hu: this.collectionGroups, Ju: t } } } function Gd(t) { return { taskState: "Running", documentsLoaded: 0, bytesLoaded: 0, totalDocuments: t.totalDocuments, totalBytes: t.totalBytes } } class Kd { constructor(t) { this.key = t } } class $d { constructor(t) { this.key = t } } class Qd { constructor(t, e) { this.query = t, this.Yu = e, this.Xu = null, this.hasCachedResults = !1, this.current = !1, this.Zu = Oa(), this.mutatedKeys = Oa(), this.tc = Ea(t), this.ec = new Nd(this.tc) } get nc() { return this.Yu } sc(t, e) { const n = e ? e.ic : new kd, r = e ? e.ec : this.ec; 
 let s = e ? e.mutatedKeys : this.mutatedKeys, i = r, o = !1; 
 const a = "F" === this.query.limitType && r.size === this.query.limit ? r.last() : null, c = "L" === this.query.limitType && r.size === this.query.limit ? r.first() : null; 
 if (t.inorderTraversal(((t, e) => { const u = r.get(t), l = ba(this.query, e) ? e : null, h = !!u && this.mutatedKeys.has(u.key), d = !!l && (l.hasLocalMutations || this.mutatedKeys.has(l.key) && l.hasCommittedMutations); 
 let f = !1; 
 u && l ? u.data.isEqual(l.data) ? h !== d && (n.track({ type: 3, doc: l }), f = !0) : this.rc(u, l) || (n.track({ type: 2, doc: l }), f = !0, (a && this.tc(l, a) > 0 || c && this.tc(l, c) < 0) && (o = !0)) : !u && l ? (n.track({ type: 0, doc: l }), f = !0) : u && !l && (n.track({ type: 1, doc: u }), f = !0, (a || c) && (o = !0)), f && (l ? (i = i.add(l), s = d ? s.add(t) : s.delete(t)) : (i = i.delete(t), s = s.delete(t))) })), null !== this.query.limit) for (; 
 i.size > this.query.limit; 
) { const t = "F" === this.query.limitType ? i.last() : i.first(); 
 i = i.delete(t.key), s = s.delete(t.key), n.track({ type: 1, doc: t }) } return { ec: i, ic: n, zi: o, mutatedKeys: s } } rc(t, e) { return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations } applyChanges(t, e, n) { const r = this.ec; 
 this.ec = t.ec, this.mutatedKeys = t.mutatedKeys; 
 const s = t.ic.xu(); 
 s.sort(((t, e) => function (t, e) { const n = t => { switch (t) { case 0: return 1; 
 case 2: case 3: return 2; 
 case 1: return 0; 
 default: return es() } }; 
 return n(t) - n(e) }(t.type, e.type) || this.tc(t.doc, e.doc))), this.oc(n); 
 const i = e ? this.uc() : [], o = 0 === this.Zu.size && this.current ? 1 : 0, a = o !== this.Xu; 
 return this.Xu = o, 0 !== s.length || a ? { snapshot: new Rd(this.query, t.ec, r, s, t.mutatedKeys, 0 === o, a, !1, !!n && n.resumeToken.approximateByteSize() > 0), cc: i } : { cc: i } } Mu(t) { return this.current && "Offline" === t ? (this.current = !1, this.applyChanges({ ec: this.ec, ic: new kd, mutatedKeys: this.mutatedKeys, zi: !1 }, !1)) : { cc: [] } } ac(t) { return !this.Yu.has(t) && !!this.ec.has(t) && !this.ec.get(t).hasLocalMutations } oc(t) { t && (t.addedDocuments.forEach((t => this.Yu = this.Yu.add(t))), t.modifiedDocuments.forEach((t => { })), t.removedDocuments.forEach((t => this.Yu = this.Yu.delete(t))), this.current = t.current) } uc() { if (!this.current) return []; 
 const t = this.Zu; 
 this.Zu = Oa(), this.ec.forEach((t => { this.ac(t.key) && (this.Zu = this.Zu.add(t.key)) })); 
 const e = []; 
 return t.forEach((t => { this.Zu.has(t) || e.push(new $d(t)) })), this.Zu.forEach((n => { t.has(n) || e.push(new Kd(n)) })), e } hc(t) { this.Yu = t.ir, this.Zu = Oa(); 
 const e = this.sc(t.documents); 
 return this.applyChanges(e, !0) } lc() { return Rd.fromInitialDocuments(this.query, this.ec, this.mutatedKeys, 0 === this.Xu, this.hasCachedResults) } } class Hd { constructor(t, e, n) { this.query = t, this.targetId = e, this.view = n } } class Wd { constructor(t) { this.key = t, this.fc = !1 } } class Xd { constructor(t, e, n, r, s, i) { this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = r, this.currentUser = s, this.maxConcurrentLimboResolutions = i, this.dc = {}, this.wc = new Sa((t => wa(t)), ya), this._c = new Map, this.mc = new Set, this.gc = new Pi(Ds.comparator), this.yc = new Map, this.Ic = new Hl, this.Tc = {}, this.Ec = new Map, this.Ac = Tl.Mn(), this.onlineState = "Unknown", this.vc = void 0 } get isPrimaryClient() { return !0 === this.vc } } async function Yd(t, e) { const n = Sf(t); 
 let r, s; 
 const i = n.wc.get(e); 
 if (i) r = i.targetId, n.sharedClientState.addLocalQueryTarget(r), s = i.view.lc(); 
 else { const t = await vh(n.localStore, ga(e)), i = n.sharedClientState.addLocalQueryTarget(t.targetId); 
 r = t.targetId, s = await Jd(n, e, r, "current" === i, t.resumeToken), n.isPrimaryClient && nd(n.remoteStore, t) } return s } async function Jd(t, e, n, r, s) { t.Rc = (e, n, r) => async function (t, e, n, r) { let s = e.view.sc(n); 
 s.zi && (s = await Ih(t.localStore, e.query, !1).then((({ documents: t }) => e.view.sc(t, s)))); 
 const i = r && r.targetChanges.get(e.targetId), o = e.view.applyChanges(s, t.isPrimaryClient, i); 
 return lf(t, e.targetId, o.cc), o.snapshot }(t, e, n, r); 
 const i = await Ih(t.localStore, e, !0), o = new Qd(e, i.ir), a = o.sc(i.documents), c = Fc.createSynthesizedTargetChangeForCurrentChange(n, r && "Offline" !== t.onlineState, s), u = o.applyChanges(a, t.isPrimaryClient, c); 
 lf(t, n, u.cc); 
 const l = new Hd(e, n, o); 
 return t.wc.set(e, l), t._c.has(n) ? t._c.get(n).push(e) : t._c.set(n, [e]), u.snapshot } async function Zd(t, e) { const n = ss(t), r = n.wc.get(e), s = n._c.get(r.targetId); 
 if (s.length > 1) return n._c.set(r.targetId, s.filter((t => !ya(t, e)))), void n.wc.delete(e); 
 n.isPrimaryClient ? (n.sharedClientState.removeLocalQueryTarget(r.targetId), n.sharedClientState.isActiveQueryTarget(r.targetId) || await bh(n.localStore, r.targetId, !1).then((() => { n.sharedClientState.clearQueryState(r.targetId), rd(n.remoteStore, r.targetId), cf(n, r.targetId) })).catch(js)) : (cf(n, r.targetId), await bh(n.localStore, r.targetId, !0)) } async function tf(t, e) { const n = ss(t); 
 try { const t = await function (t, e) { const n = ss(t), r = e.snapshotVersion; 
 let s = n.Ji; 
 return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (t => { const i = n.Zi.newChangeBuffer({ trackRemovals: !0 }); 
 s = n.Ji; 
 const o = []; 
 e.targetChanges.forEach(((i, a) => { const c = s.get(a); 
 if (!c) return; 
 o.push(n.Bs.removeMatchingKeys(t, i.removedDocuments, a).next((() => n.Bs.addMatchingKeys(t, i.addedDocuments, a)))); 
 let u = c.withSequenceNumber(t.currentSequenceNumber); 
 null !== e.targetMismatches.get(a) ? u = u.withResumeToken($i.EMPTY_BYTE_STRING, Ts.min()).withLastLimboFreeSnapshotVersion(Ts.min()) : i.resumeToken.approximateByteSize() > 0 && (u = u.withResumeToken(i.resumeToken, r)), s = s.insert(a, u), function (t, e, n) { return 0 === t.resumeToken.approximateByteSize() || e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= 3e8 || n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0 }(c, u, i) && o.push(n.Bs.updateTargetData(t, u)) })); 
 let a = xa(), c = Oa(); 
 if (e.documentUpdates.forEach((r => { e.resolvedLimboDocuments.has(r) && o.push(n.persistence.referenceDelegate.updateLimboDocument(t, r)) })), o.push(yh(t, i, e.documentUpdates).next((t => { a = t.nr, c = t.sr }))), !r.isEqual(Ts.min())) { const e = n.Bs.getLastRemoteSnapshotVersion(t).next((e => n.Bs.setTargetsMetadata(t, t.currentSequenceNumber, r))); 
 o.push(e) } return zs.waitFor(o).next((() => i.apply(t))).next((() => n.localDocuments.getLocalViewOfDocuments(t, a, c))).next((() => a)) })).then((t => (n.Ji = s, t))) }(n.localStore, e); 
 e.targetChanges.forEach(((t, e) => { const r = n.yc.get(e); 
 r && (ns(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), t.addedDocuments.size > 0 ? r.fc = !0 : t.modifiedDocuments.size > 0 ? ns(r.fc) : t.removedDocuments.size > 0 && (ns(r.fc), r.fc = !1)) })), await ff(n, t, e) } catch (t) { await js(t) } } function ef(t, e, n) { const r = ss(t); 
 if (r.isPrimaryClient && 0 === n || !r.isPrimaryClient && 1 === n) { const t = []; 
 r.wc.forEach(((n, r) => { const s = r.view.Mu(e); 
 s.snapshot && t.push(s.snapshot) })), function (t, e) { const n = ss(t); 
 n.onlineState = e; 
 let r = !1; 
 n.queries.forEach(((t, n) => { for (const t of n.listeners) t.Mu(e) && (r = !0) })), r && Bd(n) }(r.eventManager, e), t.length && r.dc.nu(t), r.onlineState = e, r.isPrimaryClient && r.sharedClientState.setOnlineState(e) } } async function nf(t, e, n) { const r = ss(t); 
 r.sharedClientState.updateQueryState(e, "rejected", n); 
 const s = r.yc.get(e), i = s && s.key; 
 if (i) { let t = new Pi(Ds.comparator); 
 t = t.insert(i, Co.newNoDocument(i, Ts.min())); 
 const n = Oa().add(i), s = new Mc(Ts.min(), new Map, new Pi(vs), t, n); 
 await tf(r, s), r.gc = r.gc.remove(i), r.yc.delete(e), df(r) } else await bh(r.localStore, e, !1).then((() => cf(r, e, n))).catch(js) } async function rf(t, e) { const n = ss(t), r = e.batch.batchId; 
 try { const t = await function (t, e) { const n = ss(t); 
 return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (t => { const r = e.batch.keys(), s = n.Zi.newChangeBuffer({ trackRemovals: !0 }); 
 return function (t, e, n, r) { const s = n.batch, i = s.keys(); 
 let o = zs.resolve(); 
 return i.forEach((t => { o = o.next((() => r.getEntry(e, t))).next((e => { const i = n.docVersions.get(t); 
 ns(null !== i), e.version.compareTo(i) < 0 && (s.applyToRemoteDocument(e, n), e.isValidDocument() && (e.setReadTime(n.commitVersion), r.addEntry(e))) })) })), o.next((() => t.mutationQueue.removeMutationBatch(e, s))) }(n, t, e, s).next((() => s.apply(t))).next((() => n.mutationQueue.performConsistencyCheck(t))).next((() => n.documentOverlayCache.removeOverlaysForBatchId(t, r, e.batch.batchId))).next((() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t, function (t) { let e = Oa(); 
 for (let n = 0; 
 n < t.mutationResults.length; 
 ++n)t.mutationResults[n].transformResults.length > 0 && (e = e.add(t.batch.mutations[n].key)); 
 return e }(e)))).next((() => n.localDocuments.getDocuments(t, r))) })) }(n.localStore, e); 
 af(n, r, null), of(n, r), n.sharedClientState.updateMutationState(r, "acknowledged"), await ff(n, t) } catch (t) { await js(t) } } async function sf(t, e, n) { const r = ss(t); 
 try { const t = await function (t, e) { const n = ss(t); 
 return n.persistence.runTransaction("Reject batch", "readwrite-primary", (t => { let r; 
 return n.mutationQueue.lookupMutationBatch(t, e).next((e => (ns(null !== e), r = e.keys(), n.mutationQueue.removeMutationBatch(t, e)))).next((() => n.mutationQueue.performConsistencyCheck(t))).next((() => n.documentOverlayCache.removeOverlaysForBatchId(t, r, e))).next((() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t, r))).next((() => n.localDocuments.getDocuments(t, r))) })) }(r.localStore, e); 
 af(r, e, n), of(r, e), r.sharedClientState.updateMutationState(e, "rejected", n), await ff(r, t) } catch (n) { await js(n) } } function of(t, e) { (t.Ec.get(e) || []).forEach((t => { t.resolve() })), t.Ec.delete(e) } function af(t, e, n) { const r = ss(t); 
 let s = r.Tc[r.currentUser.toKey()]; 
 if (s) { const t = s.get(e); 
 t && (n ? t.reject(n) : t.resolve(), s = s.remove(e)), r.Tc[r.currentUser.toKey()] = s } } function cf(t, e, n = null) { t.sharedClientState.removeLocalQueryTarget(e); 
 for (const r of t._c.get(e)) t.wc.delete(r), n && t.dc.Pc(r, n); 
 t._c.delete(e), t.isPrimaryClient && t.Ic.Is(e).forEach((e => { t.Ic.containsKey(e) || uf(t, e) })) } function uf(t, e) { t.mc.delete(e.path.canonicalString()); 
 const n = t.gc.get(e); 
 null !== n && (rd(t.remoteStore, n), t.gc = t.gc.remove(e), t.yc.delete(n), df(t)) } function lf(t, e, n) { for (const r of n) r instanceof Kd ? (t.Ic.addReference(r.key, e), hf(t, r)) : r instanceof $d ? (Yr("SyncEngine", "Document no longer in limbo: " + r.key), t.Ic.removeReference(r.key, e), t.Ic.containsKey(r.key) || uf(t, r.key)) : es() } function hf(t, e) { const n = e.key, r = n.path.canonicalString(); 
 t.gc.get(n) || t.mc.has(r) || (Yr("SyncEngine", "New document in limbo: " + n), t.mc.add(r), df(t)) } function df(t) { for (; 
 t.mc.size > 0 && t.gc.size < t.maxConcurrentLimboResolutions; 
) { const e = t.mc.values().next().value; 
 t.mc.delete(e); 
 const n = new Ds(_s.fromString(e)), r = t.Ac.next(); 
 t.yc.set(r, new Wd(n)), t.gc = t.gc.insert(n, r), nd(t.remoteStore, new Iu(ga(ca(n.path)), r, "TargetPurposeLimboResolution", ei.ct)) } } async function ff(t, e, n) { const r = ss(t), s = [], i = [], o = []; 
 r.wc.isEmpty() || (r.wc.forEach(((t, a) => { o.push(r.Rc(a, e, n).then((t => { if ((t || n) && r.isPrimaryClient && r.sharedClientState.updateQueryState(a.targetId, (null == t ? void 0 : t.fromCache) ? "not-current" : "current"), t) { s.push(t); 
 const e = hh.Li(a.targetId, t); 
 i.push(e) } }))) })), await Promise.all(o), r.dc.nu(s), await async function (t, e) { const n = ss(t); 
 try { await n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (t => zs.forEach(e, (e => zs.forEach(e.Fi, (r => n.persistence.referenceDelegate.addReference(t, e.targetId, r))).next((() => zs.forEach(e.Bi, (r => n.persistence.referenceDelegate.removeReference(t, e.targetId, r))))))))) } catch (t) { if (!Hs(t)) throw t; 
 Yr("LocalStore", "Failed to update sequence numbers: " + t) } for (const t of e) { const e = t.targetId; 
 if (!t.fromCache) { const t = n.Ji.get(e), r = t.snapshotVersion, s = t.withLastLimboFreeSnapshotVersion(r); 
 n.Ji = n.Ji.insert(e, s) } } }(r.localStore, i)) } async function gf(t, e) { const n = ss(t); 
 if (!n.currentUser.isEqual(e)) { Yr("SyncEngine", "User change. New user:", e.toKey()); 
 const t = await mh(n.localStore, e); 
 n.currentUser = e, function (t, e) { t.Ec.forEach((t => { t.forEach((t => { t.reject(new os(is.CANCELLED, "'waitForPendingWrites' promise is rejected due to a user change.")) })) })), t.Ec.clear() }(n), n.sharedClientState.handleUserChange(e, t.removedBatchIds, t.addedBatchIds), await ff(n, t.er) } } function mf(t, e) { const n = ss(t), r = n.yc.get(e); 
 if (r && r.fc) return Oa().add(r.key); 
 { let t = Oa(); 
 const r = n._c.get(e); 
 if (!r) return t; 
 for (const e of r) { const r = n.wc.get(e); 
 t = t.unionWith(r.view.nc) } return t } } async function pf(t, e) { const n = ss(t), r = await Ih(n.localStore, e.query, !0), s = e.view.hc(r); 
 return n.isPrimaryClient && lf(n, e.targetId, s.cc), s } async function yf(t, e) { const n = ss(t); 
 return Th(n.localStore, e).then((t => ff(n, t))) } async function wf(t, e, n, r) { const s = ss(t), i = await function (t, e) { const n = ss(t), r = ss(n.mutationQueue); 
 return n.persistence.runTransaction("Lookup mutation documents", "readonly", (t => r.Sn(t, e).next((e => e ? n.localDocuments.getDocuments(t, e) : zs.resolve(null))))) }(s.localStore, e); 
 null !== i ? ("pending" === n ? await md(s.remoteStore) : "acknowledged" === n || "rejected" === n ? (af(s, e, r || null), of(s, e), function (t, e) { ss(ss(t).mutationQueue).Cn(e) }(s.localStore, e)) : es(), await ff(s, i)) : Yr("SyncEngine", "Cannot apply mutation batch with id: " + e) } async function vf(t, e, n) { const r = ss(t), s = [], i = []; 
 for (const t of e) { let e; 
 const n = r._c.get(t); 
 if (n && 0 !== n.length) { e = await vh(r.localStore, ga(n[0])); 
 for (const t of n) { const e = r.wc.get(t), n = await pf(r, e); 
 n.snapshot && i.push(n.snapshot) } } else { const n = await Eh(r.localStore, t); 
 e = await vh(r.localStore, n), await Jd(r, bf(n), t, !1, e.resumeToken) } s.push(e) } return r.dc.nu(i), s } function bf(t) { return aa(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F", t.startAt, t.endAt) } function If(t) { const e = ss(t); 
 return ss(ss(e.localStore).persistence).$i() } async function Ef(t, e, n, r) { const s = ss(t); 
 if (s.vc) return void Yr("SyncEngine", "Ignoring unexpected query state notification."); 
 const i = s._c.get(e); 
 if (i && i.length > 0) switch (n) { case "current": case "not-current": { const t = await Th(s.localStore, Ia(i[0])), r = Mc.createSynthesizedRemoteEventForCurrentChange(e, "current" === n, $i.EMPTY_BYTE_STRING); 
 await ff(s, t, r); 
 break } case "rejected": await bh(s.localStore, e, !0), cf(s, e, r); 
 break; 
 default: es() } } async function Tf(t, e, n) { const r = Sf(t); 
 if (r.vc) { for (const t of e) { if (r._c.has(t)) { Yr("SyncEngine", "Adding an already active target " + t); 
 continue } const e = await Eh(r.localStore, t), n = await vh(r.localStore, e); 
 await Jd(r, bf(e), n.targetId, !1, n.resumeToken), nd(r.remoteStore, n) } for (const t of n) r._c.has(t) && await bh(r.localStore, t, !1).then((() => { rd(r.remoteStore, t), cf(r, t) })).catch(js) } } function Sf(t) { const e = ss(t); 
 return e.remoteStore.remoteSyncer.applyRemoteEvent = tf.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = mf.bind(null, e), e.remoteStore.remoteSyncer.rejectListen = nf.bind(null, e), e.dc.nu = Pd.bind(null, e.eventManager), e.dc.Pc = Vd.bind(null, e.eventManager), e } function _f(t) { const e = ss(t); 
 return e.remoteStore.remoteSyncer.applySuccessfulWrite = rf.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = sf.bind(null, e), e } class xf { constructor() { this.synchronizeTabs = !1 } async initialize(t) { this.serializer = $h(t.databaseInfo.databaseId), this.sharedClientState = this.createSharedClientState(t), this.persistence = this.createPersistence(t), await this.persistence.start(), this.localStore = this.createLocalStore(t), this.gcScheduler = this.createGarbageCollectionScheduler(t, this.localStore), this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(t, this.localStore) } createGarbageCollectionScheduler(t, e) { return null } createIndexBackfillerScheduler(t, e) { return null } createLocalStore(t) { return gh(this.persistence, new dh, t.initialUser, this.serializer) } createPersistence(t) { return new th(nh.zs, this.serializer) } createSharedClientState(t) { return new Oh } async terminate() { this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), await this.persistence.shutdown() } } class Cf extends xf { constructor(t) { super(), this.cacheSizeBytes = t } createGarbageCollectionScheduler(t, e) { ns(this.persistence.referenceDelegate instanceof rh); 
 const n = this.persistence.referenceDelegate.garbageCollector; 
 return new Nl(n, t.asyncQueue, e) } createPersistence(t) { const e = void 0 !== this.cacheSizeBytes ? ml.withCacheSize(this.cacheSizeBytes) : ml.DEFAULT; 
 return new th((t => rh.zs(t, e)), this.serializer) } } class Df extends xf { constructor(t, e, n) { super(), this.Vc = t, this.cacheSizeBytes = e, this.forceOwnership = n, this.synchronizeTabs = !1 } async initialize(t) { await super.initialize(t), await this.Vc.initialize(this, t), await _f(this.Vc.syncEngine), await md(this.Vc.remoteStore), await this.persistence.Ii((() => (this.gcScheduler && !this.gcScheduler.started && this.gcScheduler.start(), this.indexBackfillerScheduler && !this.indexBackfillerScheduler.started && this.indexBackfillerScheduler.start(), Promise.resolve()))) } createLocalStore(t) { return gh(this.persistence, new dh, t.initialUser, this.serializer) } createGarbageCollectionScheduler(t, e) { const n = this.persistence.referenceDelegate.garbageCollector; 
 return new Nl(n, t.asyncQueue, e) } createIndexBackfillerScheduler(t, e) { const n = new ti(e, this.persistence); 
 return new Zs(t.asyncQueue, n) } createPersistence(t) { const e = lh(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey), n = void 0 !== this.cacheSizeBytes ? ml.withCacheSize(this.cacheSizeBytes) : ml.DEFAULT; 
 return new ah(this.synchronizeTabs, e, t.clientId, n, t.asyncQueue, Gh(), Kh(), this.serializer, this.sharedClientState, !!this.forceOwnership) } createSharedClientState(t) { return new Oh } } class Af extends Df { constructor(t, e) { super(t, e, !1), this.Vc = t, this.cacheSizeBytes = e, this.synchronizeTabs = !0 } async initialize(t) { await super.initialize(t); 
 const e = this.Vc.syncEngine; 
 this.sharedClientState instanceof Fh && (this.sharedClientState.syncEngine = { jr: wf.bind(null, e), zr: Ef.bind(null, e), Wr: Tf.bind(null, e), $i: If.bind(null, e), Qr: yf.bind(null, e) }, await this.sharedClientState.start()), await this.persistence.Ii((async t => { await async function (t, e) { const n = ss(t); 
 if (Sf(n), _f(n), !0 === e && !0 !== n.vc) { const t = n.sharedClientState.getAllActiveQueryTargets(), e = await vf(n, t.toArray()); 
 n.vc = !0, await _d(n.remoteStore, !0); 
 for (const t of e) nd(n.remoteStore, t) } else if (!1 === e && !1 !== n.vc) { const t = []; 
 let e = Promise.resolve(); 
 n._c.forEach(((r, s) => { n.sharedClientState.isLocalQueryTarget(s) ? t.push(s) : e = e.then((() => (cf(n, s), bh(n.localStore, s, !0)))), rd(n.remoteStore, s) })), await e, await vf(n, t), function (t) { const e = ss(t); 
 e.yc.forEach(((t, n) => { rd(e.remoteStore, n) })), e.Ic.Ts(), e.yc = new Map, e.gc = new Pi(Ds.comparator) }(n), n.vc = !1, await _d(n.remoteStore, !1) } }(this.Vc.syncEngine, t), this.gcScheduler && (t && !this.gcScheduler.started ? this.gcScheduler.start() : t || this.gcScheduler.stop()), this.indexBackfillerScheduler && (t && !this.indexBackfillerScheduler.started ? this.indexBackfillerScheduler.start() : t || this.indexBackfillerScheduler.stop()) })) } createSharedClientState(t) { const e = Gh(); 
 if (!Fh.D(e)) throw new os(is.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage."); 
 const n = lh(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey); 
 return new Fh(e, t.asyncQueue, n, t.clientId, t.initialUser) } } class Nf { async initialize(t, e) { this.localStore || (this.localStore = t.localStore, this.sharedClientState = t.sharedClientState, this.datastore = this.createDatastore(e), this.remoteStore = this.createRemoteStore(e), this.eventManager = this.createEventManager(e), this.syncEngine = this.createSyncEngine(e, !t.synchronizeTabs), this.sharedClientState.onlineStateHandler = t => ef(this.syncEngine, t, 1), this.remoteStore.remoteSyncer.handleCredentialChange = gf.bind(null, this.syncEngine), await _d(this.remoteStore, this.syncEngine.isPrimaryClient)) } createEventManager(t) { return new Fd } createDatastore(t) { const e = $h(t.databaseInfo.databaseId), n = (r = t.databaseInfo, new zh(r)); 
 var r; 
 return function (t, e, n, r) { return new Yh(t, e, n, r) }(t.authCredentials, t.appCheckCredentials, n, e) } createRemoteStore(t) { return e = this.localStore, n = this.datastore, r = t.asyncQueue, s = t => ef(this.syncEngine, t, 0), i = Ph.D() ? new Ph : new Lh, new Zh(e, n, r, s, i); 
 var e, n, r, s, i } createSyncEngine(t, e) { return function (t, e, n, r, s, i, o) { const a = new Xd(t, e, n, r, s, i); 
 return o && (a.vc = !0), a }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e) } terminate() { return async function (t) { const e = ss(t); 
 Yr("RemoteStore", "RemoteStore shutting down."), e.vu.add(5), await ed(e), e.Pu.shutdown(), e.bu.set("Unknown") }(this.remoteStore) } } function kf(t, e = 10240) { let n = 0; 
 return { async read() { if (n < t.byteLength) { const r = { value: t.slice(n, n + e), done: !1 }; 
 return n += e, r } return { done: !0 } }, async cancel() { }, releaseLock() { }, closed: Promise.resolve() } } class Rf { constructor(t) { this.observer = t, this.muted = !1 } next(t) { this.observer.next && this.Sc(this.observer.next, t) } error(t) { this.observer.error ? this.Sc(this.observer.error, t) : Jr("Uncaught Error in snapshot listener:", t.toString()) } Dc() { this.muted = !0 } Sc(t, e) { this.muted || setTimeout((() => { this.muted || t(e) }), 0) } } class Mf { constructor(t, e) { this.Cc = t, this.serializer = e, this.metadata = new as, this.buffer = new Uint8Array, this.xc = new TextDecoder("utf-8"), this.Nc().then((t => { t && t.Qu() ? this.metadata.resolve(t.Gu.metadata) : this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${ JSON.stringify(null == t ? void 0 : t.Gu) } `)) }), (t => this.metadata.reject(t))) } close() { return this.Cc.cancel() } async getMetadata() { return this.metadata.promise } async bc() { return await this.getMetadata(), this.Nc() } async Nc() { const t = await this.kc(); 
 if (null === t) return null; 
 const e = this.xc.decode(t), n = Number(e); 
 isNaN(n) && this.Mc(`length string(${ e }) is not valid number`); 
 const r = await this.$c(n); 
 return new Ud(JSON.parse(r), t.length + n) } Oc() { return this.buffer.findIndex((t => t === "{".charCodeAt(0))) } async kc() { for (; 
 this.Oc() < 0 && !await this.Fc(); 
); 
 if (0 === this.buffer.length) return null; 
 const t = this.Oc(); 
 t < 0 && this.Mc("Reached the end of bundle when a length string is expected."); 
 const e = this.buffer.slice(0, t); 
 return this.buffer = this.buffer.slice(t), e } async $c(t) { for (; 
 this.buffer.length < t; 
)await this.Fc() && this.Mc("Reached the end of bundle when more is expected."); 
 const e = this.xc.decode(this.buffer.slice(0, t)); 
 return this.buffer = this.buffer.slice(t), e } Mc(t) { throw this.Cc.cancel(), new Error(`Invalid bundle format: ${ t } `) } async Fc() { const t = await this.Cc.read(); 
 if (!t.done) { const e = new Uint8Array(this.buffer.length + t.value.length); 
 e.set(this.buffer), e.set(t.value, this.buffer.length), this.buffer = e } return t.done } } class Ff { constructor(t) { this.datastore = t, this.readVersions = new Map, this.mutations = [], this.committed = !1, this.lastWriteError = null, this.writtenDocs = new Set } async lookup(t) { if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new os(is.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes."); 
 const e = await async function (t, e) { const n = ss(t), r = ru(n.serializer) + "/documents", s = { documents: e.map((t => Zc(n.serializer, t))) }, i = await n.vo("BatchGetDocuments", r, s, e.length), o = new Map; 
 i.forEach((t => { const e = function (t, e) { return "found" in e ? function (t, e) { ns(!!e.found), e.found.name, e.found.updateTime; 
 const n = tu(t, e.found.name), r = Xc(e.found.updateTime), s = e.found.createTime ? Xc(e.found.createTime) : Ts.min(), i = new _o({ mapValue: { fields: e.found.fields } }); 
 return Co.newFoundDocument(n, r, s, i) }(t, e) : "missing" in e ? function (t, e) { ns(!!e.missing), ns(!!e.readTime); 
 const n = tu(t, e.missing), r = Xc(e.readTime); 
 return Co.newNoDocument(n, r) }(t, e) : es() }(n.serializer, t); 
 o.set(e.key.toString(), e) })); 
 const a = []; 
 return e.forEach((t => { const e = o.get(t.toString()); 
 ns(!!e), a.push(e) })), a }(this.datastore, t); 
 return e.forEach((t => this.recordVersion(t))), e } set(t, e) { this.write(e.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString()) } update(t, e) { try { this.write(e.toMutation(t, this.preconditionForUpdate(t))) } catch (t) { this.lastWriteError = t } this.writtenDocs.add(t.toString()) } delete(t) { this.write(new gc(t, this.precondition(t))), this.writtenDocs.add(t.toString()) } async commit() { if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError; 
 const t = this.readVersions; 
 this.mutations.forEach((e => { t.delete(e.key.toString()) })), t.forEach(((t, e) => { const n = Ds.fromPath(e); 
 this.mutations.push(new mc(n, this.precondition(n))) })), await async function (t, e) { const n = ss(t), r = ru(n.serializer) + "/documents", s = { writes: e.map((t => au(n.serializer, t))) }; 
 await n.Io("Commit", r, s) }(this.datastore, this.mutations), this.committed = !0 } recordVersion(t) { let e; 
 if (t.isFoundDocument()) e = t.version; 
 else { if (!t.isNoDocument()) throw es(); 
 e = Ts.min() } const n = this.readVersions.get(t.key.toString()); 
 if (n) { if (!e.isEqual(n)) throw new os(is.ABORTED, "Document version changed between two reads.") } else this.readVersions.set(t.key.toString(), e) } precondition(t) { const e = this.readVersions.get(t.toString()); 
 return !this.writtenDocs.has(t.toString()) && e ? e.isEqual(Ts.min()) ? ec.exists(!1) : ec.updateTime(e) : ec.none() } preconditionForUpdate(t) { const e = this.readVersions.get(t.toString()); 
 if (!this.writtenDocs.has(t.toString()) && e) { if (e.isEqual(Ts.min())) throw new os(is.INVALID_ARGUMENT, "Can't update a document that doesn't exist."); 
 return ec.updateTime(e) } return ec.exists(!0) } write(t) { this.ensureCommitNotCalled(), this.mutations.push(t) } ensureCommitNotCalled() { } } class Of { constructor(t, e, n, r, s) { this.asyncQueue = t, this.datastore = e, this.options = n, this.updateFunction = r, this.deferred = s, this.Bc = n.maxAttempts, this.qo = new Qh(this.asyncQueue, "transaction_retry") } run() { this.Bc -= 1, this.Lc() } Lc() { this.qo.No((async () => { const t = new Ff(this.datastore), e = this.qc(t); 
 e && e.then((e => { this.asyncQueue.enqueueAndForget((() => t.commit().then((() => { this.deferred.resolve(e) })).catch((t => { this.Uc(t) })))) })).catch((t => { this.Uc(t) })) })) } qc(t) { try { const e = this.updateFunction(t); 
 return !ni(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), null) } catch (t) { return this.deferred.reject(t), null } } Uc(t) { this.Bc > 0 && this.Kc(t) ? (this.Bc -= 1, this.asyncQueue.enqueueAndForget((() => (this.Lc(), Promise.resolve())))) : this.deferred.reject(t) } Kc(t) { if ("FirebaseError" === t.name) { const e = t.code; 
 return "aborted" === e || "failed-precondition" === e || "already-exists" === e || !Tc(e) } return !1 } } class Lf { constructor(t, e, n, r) { this.authCredentials = t, this.appCheckCredentials = e, this.asyncQueue = n, this.databaseInfo = r, this.user = $r.UNAUTHENTICATED, this.clientId = ws.A(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, (async t => { Yr("FirestoreClient", "Received user=", t.uid), await this.authCredentialListener(t), this.user = t })), this.appCheckCredentials.start(n, (t => (Yr("FirestoreClient", "Received new app check token=", t), this.appCheckCredentialListener(t, this.user)))) } async getConfiguration() { return { asyncQueue: this.asyncQueue, databaseInfo: this.databaseInfo, clientId: this.clientId, authCredentials: this.authCredentials, appCheckCredentials: this.appCheckCredentials, initialUser: this.user, maxConcurrentLimboResolutions: 100 } } setCredentialChangeListener(t) { this.authCredentialListener = t } setAppCheckTokenChangeListener(t) { this.appCheckCredentialListener = t } verifyNotTerminated() { if (this.asyncQueue.isShuttingDown) throw new os(is.FAILED_PRECONDITION, "The client has already been terminated.") } terminate() { this.asyncQueue.enterRestrictedMode(); 
 const t = new as; 
 return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async () => { try { this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), t.resolve() } catch (e) { const n = Ad(e, "Failed to shutdown persistence"); 
 t.reject(n) } })), t.promise } } async function Pf(t, e) { t.asyncQueue.verifyOperationInProgress(), Yr("FirestoreClient", "Initializing OfflineComponentProvider"); 
 const n = await t.getConfiguration(); 
 await e.initialize(n); 
 let r = n.initialUser; 
 t.setCredentialChangeListener((async t => { r.isEqual(t) || (await mh(e.localStore, t), r = t) })), e.persistence.setDatabaseDeletedListener((() => t.terminate())), t._offlineComponents = e } async function Vf(t, e) { t.asyncQueue.verifyOperationInProgress(); 
 const n = await qf(t); 
 Yr("FirestoreClient", "Initializing OnlineComponentProvider"); 
 const r = await t.getConfiguration(); 
 await e.initialize(n, r), t.setCredentialChangeListener((t => Sd(e.remoteStore, t))), t.setAppCheckTokenChangeListener(((t, n) => Sd(e.remoteStore, n))), t._onlineComponents = e } function Bf(t) { return "FirebaseError" === t.name ? t.code === is.FAILED_PRECONDITION || t.code === is.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || 22 === t.code || 20 === t.code || 11 === t.code } async function qf(t) { if (!t._offlineComponents) if (t._uninitializedComponentsProvider) { Yr("FirestoreClient", "Using user provided OfflineComponentProvider"); 
 try { await Pf(t, t._uninitializedComponentsProvider._offline) } catch (e) { const n = e; 
 if (!Bf(n)) throw n; 
 Zr("Error using user provided cache. Falling back to memory cache: " + n), await Pf(t, new xf) } } else Yr("FirestoreClient", "Using default OfflineComponentProvider"), await Pf(t, new xf); 
 return t._offlineComponents } async function Uf(t) { return t._onlineComponents || (t._uninitializedComponentsProvider ? (Yr("FirestoreClient", "Using user provided OnlineComponentProvider"), await Vf(t, t._uninitializedComponentsProvider._online)) : (Yr("FirestoreClient", "Using default OnlineComponentProvider"), await Vf(t, new Nf))), t._onlineComponents } function jf(t) { return qf(t).then((t => t.persistence)) } function zf(t) { return qf(t).then((t => t.localStore)) } function Gf(t) { return Uf(t).then((t => t.remoteStore)) } function Kf(t) { return Uf(t).then((t => t.syncEngine)) } function $f(t) { return Uf(t).then((t => t.datastore)) } async function Qf(t) { const e = await Uf(t), n = e.eventManager; 
 return n.onListen = Yd.bind(null, e.syncEngine), n.onUnlisten = Zd.bind(null, e.syncEngine), n } function Hf(t, e, n = {}) { const r = new as; 
 return t.asyncQueue.enqueueAndForget((async () => function (t, e, n, r, s) { const i = new Rf({ next: i => { e.enqueueAndForget((() => Ld(t, o))); 
 const a = i.docs.has(n); 
 !a && i.fromCache ? s.reject(new os(is.UNAVAILABLE, "Failed to get document because the client is offline.")) : a && i.fromCache && r && "server" === r.source ? s.reject(new os(is.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : s.resolve(i) }, error: t => s.reject(t) }), o = new qd(ca(n.path), i, { includeMetadataChanges: !0, Ku: !0 }); 
 return Od(t, o) }(await Qf(t), t.asyncQueue, e, n, r))), r.promise } function Wf(t, e, n = {}) { const r = new as; 
 return t.asyncQueue.enqueueAndForget((async () => function (t, e, n, r, s) { const i = new Rf({ next: n => { e.enqueueAndForget((() => Ld(t, o))), n.fromCache && "server" === r.source ? s.reject(new os(is.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : s.resolve(n) }, error: t => s.reject(t) }), o = new qd(n, i, { includeMetadataChanges: !0, Ku: !0 }); 
 return Od(t, o) }(await Qf(t), t.asyncQueue, e, n, r))), r.promise } function Xf(t, e, n, r) { const s = function (t, e) { let n; 
 return n = "string" == typeof t ? Cc().encode(t) : t, function (t, e) { return new Mf(t, e) }(function (t, e) { if (t instanceof Uint8Array) return kf(t, e); 
 if (t instanceof ArrayBuffer) return kf(new Uint8Array(t), e); 
 if (t instanceof ReadableStream) return t.getReader(); 
 throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream") }(n), e) }(n, $h(e)); 
 t.asyncQueue.enqueueAndForget((async () => { !function (t, e, n) { const r = ss(t); 
 (async function (t, e, n) { try { const r = await e.getMetadata(); 
 if (await function (t, e) { const n = ss(t), r = Xc(e.createTime); 
 return n.persistence.runTransaction("hasNewerBundle", "readonly", (t => n.qs.getBundleMetadata(t, e.id))).then((t => !!t && t.createTime.compareTo(r) >= 0)) }(t.localStore, r)) return await e.close(), n._completeWith(function (t) { return { taskState: "Success", documentsLoaded: t.totalDocuments, bytesLoaded: t.totalBytes, totalDocuments: t.totalDocuments, totalBytes: t.totalBytes } }(r)), Promise.resolve(new Set); 
 n._updateProgress(Gd(r)); 
 const s = new zd(r, t.localStore, e.serializer); 
 let i = await e.bc(); 
 for (; 
 i; 
) { const t = await s.zu(i); 
 t && n._updateProgress(t), i = await e.bc() } const o = await s.complete(); 
 return await ff(t, o.Ju, void 0), await function (t, e) { const n = ss(t); 
 return n.persistence.runTransaction("Save bundle", "readwrite", (t => n.qs.saveBundleMetadata(t, e))) }(t.localStore, r), n._completeWith(o.progress), Promise.resolve(o.Hu) } catch (t) { return Zr("SyncEngine", `Loading bundle failed with ${ t } `), n._failWith(t), Promise.resolve(new Set) } })(r, e, n).then((t => { r.sharedClientState.notifyBundleLoaded(t) })) }(await Kf(t), s, r) })) } function Yf(t) { const e = {}; 
 return void 0 !== t.timeoutSeconds && (e.timeoutSeconds = t.timeoutSeconds), e } const Jf = new Map; 
 function Zf(t, e, n) { if (!n) throw new os(is.INVALID_ARGUMENT, `Function ${ t } () cannot be called with an empty ${ e }.`) } function tg(t, e, n, r) { if (!0 === e && !0 === r) throw new os(is.INVALID_ARGUMENT, `${ t } and ${ n } cannot be used together.`) } function eg(t) { if (!Ds.isDocumentKey(t)) throw new os(is.INVALID_ARGUMENT, `Invalid document reference.Document references must have an even number of segments, but ${ t } has ${ t.length }.`) } function ng(t) { if (Ds.isDocumentKey(t)) throw new os(is.INVALID_ARGUMENT, `Invalid collection reference.Collection references must have an odd number of segments, but ${ t } has ${ t.length }.`) } function rg(t) { if (void 0 === t) return "undefined"; 
 if (null === t) return "null"; 
 if ("string" == typeof t) return t.length > 20 && (t = `${ t.substring(0, 20) }...`), JSON.stringify(t); 
 if ("number" == typeof t || "boolean" == typeof t) return "" + t; 
 if ("object" == typeof t) { if (t instanceof Array) return "an array"; 
 { const e = function (t) { return t.constructor ? t.constructor.name : null }(t); 
 return e ? `a custom ${ e } object` : "an object" } } return "function" == typeof t ? "a function" : es() } function sg(t, e) { if ("_delegate" in t && (t = t._delegate), !(t instanceof e)) { if (e.name === t.constructor.name) throw new os(is.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?"); 
 { const n = rg(t); 
 throw new os(is.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${ n } `) } } return t } function ig(t, e) { if (e <= 0) throw new os(is.INVALID_ARGUMENT, `Function ${ t } () requires a positive number, but it was: ${ e }.`) } class og { constructor(t) { var e, n; 
 if (void 0 === t.host) { if (void 0 !== t.ssl) throw new os(is.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set"); 
 this.host = "firestore.googleapis.com", this.ssl = !0 } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e; 
 if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, this.cache = t.localCache, void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; 
 else { if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new os(is.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576"); 
 this.cacheSizeBytes = t.cacheSizeBytes } tg("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : void 0 === t.experimentalAutoDetectLongPolling ? this.experimentalAutoDetectLongPolling = !0 : this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, this.experimentalLongPollingOptions = Yf(null !== (n = t.experimentalLongPollingOptions) && void 0 !== n ? n : {}), function (t) { if (void 0 !== t.timeoutSeconds) { if (isNaN(t.timeoutSeconds)) throw new os(is.INVALID_ARGUMENT, `invalid long polling timeout: ${ t.timeoutSeconds } (must not be NaN)`); 
 if (t.timeoutSeconds < 5) throw new os(is.INVALID_ARGUMENT, `invalid long polling timeout: ${ t.timeoutSeconds } (minimum allowed value is 5)`); 
 if (t.timeoutSeconds > 30) throw new os(is.INVALID_ARGUMENT, `invalid long polling timeout: ${ t.timeoutSeconds } (maximum allowed value is 30)`) } }(this.experimentalLongPollingOptions), this.useFetchStreams = !!t.useFetchStreams } isEqual(t) { return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && (e = this.experimentalLongPollingOptions, n = t.experimentalLongPollingOptions, e.timeoutSeconds === n.timeoutSeconds) && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams; 
 var e, n } } class ag { constructor(t, e, n, r) { this._authCredentials = t, this._appCheckCredentials = e, this._databaseId = n, this._app = r, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new og({}), this._settingsFrozen = !1 } get app() { if (!this._app) throw new os(is.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available"); 
 return this._app } get _initialized() { return this._settingsFrozen } get _terminated() { return void 0 !== this._terminateTask } _setSettings(t) { if (this._settingsFrozen) throw new os(is.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object."); 
 this._settings = new og(t), void 0 !== t.credentials && (this._authCredentials = function (t) { if (!t) return new us; 
 switch (t.type) { case "firstParty": return new fs(t.sessionIndex || "0", t.iamToken || null, t.authTokenFactory || null); 
 case "provider": return t.client; 
 default: throw new os(is.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type") } }(t.credentials)) } _getSettings() { return this._settings } _freezeSettings() { return this._settingsFrozen = !0, this._settings } _delete() { return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask } toJSON() { return { app: this._app, databaseId: this._databaseId, settings: this._settings } } _terminate() { return function (t) { const e = Jf.get(t); 
 e && (Yr("ComponentProvider", "Removing Datastore"), Jf.delete(t), e.terminate()) }(this), Promise.resolve() } } function cg(t, e, n, r = {}) { var s; 
 const i = (t = sg(t, ag))._getSettings(), o = `${ e }:${ n } `; 
 if ("firestore.googleapis.com" !== i.host && i.host !== o && Zr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."), t._setSettings(Object.assign(Object.assign({}, i), { host: o, ssl: !1 })), r.mockUserToken) { let e, n; 
 if ("string" == typeof r.mockUserToken) e = r.mockUserToken, n = $r.MOCK_USER; 
 else { e = function (t, e) { if (t.uid) throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'); 
 const n = e || "demo-project", r = t.iat || 0, s = t.sub || t.user_id; 
 if (!s) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!"); 
 const i = Object.assign({ iss: `https://securetoken.google.com/${n}`, aud: n, iat: r, exp: r + 3600, auth_time: r, sub: s, user_id: s, firebase: { sign_in_provider: "custom", identities: {} } }, t); 
return [u(JSON.stringify({ alg: "none", type: "JWT" })), u(JSON.stringify(i)), ""].join(".") }(r.mockUserToken, null === (s = t._app) || void 0 === s ? void 0 : s.options.projectId);
const i = r.mockUserToken.sub || r.mockUserToken.user_id;
if (!i) throw new os(is.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
n = new $r(i) } t._authCredentials = new ls(new cs(e, n)) } } class ug { constructor(t, e, n) { this.converter = e, this._key = n, this.type = "document", this.firestore = t } get _path() { return this._key.path } get id() { return this._key.path.lastSegment() } get path() { return this._key.path.canonicalString() } get parent() { return new hg(this.firestore, this.converter, this._key.path.popLast()) } withConverter(t) { return new ug(this.firestore, t, this._key) } } class lg { constructor(t, e, n) { this.converter = e, this._query = n, this.type = "query", this.firestore = t } withConverter(t) { return new lg(this.firestore, t, this._query) } } class hg extends lg {
    constructor(t, e, n) { super(t, e, ca(n)), this._path = n, this.type = "collection" } get id() { return this._query.path.lastSegment() } get path() { return this._query.path.canonicalString() } get parent() {
        const t = this._path.popLast();
        return t.isEmpty() ? null : new ug(this.firestore, null, new Ds(t))
    } withConverter(t) { return new hg(this.firestore, t, this._path) }
} function dg(t, e, ...n) {
    if (t = I(t), Zf("collection", "path", e), t instanceof ag) {
        const r = _s.fromString(e, ...n);
        return ng(r), new hg(t, null, r)
    } {
        if (!(t instanceof ug || t instanceof hg)) throw new os(is.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
        const r = t._path.child(_s.fromString(e, ...n));
        return ng(r), new hg(t.firestore, null, r)
    }
} function fg(t, e) {
    if (t = sg(t, ag), Zf("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new os(is.INVALID_ARGUMENT, `Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
    return new lg(t, null, function (t) { return new oa(_s.emptyPath(), t) }(e))
} function gg(t, e, ...n) {
    if (t = I(t), 1 === arguments.length && (e = ws.A()), Zf("doc", "path", e), t instanceof ag) {
        const r = _s.fromString(e, ...n);
        return eg(r), new ug(t, null, new Ds(r))
    } {
        if (!(t instanceof ug || t instanceof hg)) throw new os(is.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
        const r = t._path.child(_s.fromString(e, ...n));
        return eg(r), new ug(t.firestore, t instanceof hg ? t.converter : null, new Ds(r))
    }
} function mg(t, e) { return t = I(t), e = I(e), (t instanceof ug || t instanceof hg) && (e instanceof ug || e instanceof hg) && t.firestore === e.firestore && t.path === e.path && t.converter === e.converter } function pg(t, e) { return t = I(t), e = I(e), t instanceof lg && e instanceof lg && t.firestore === e.firestore && ya(t._query, e._query) && t.converter === e.converter } class yg {
    constructor() {
        this.Gc = Promise.resolve(), this.Qc = [], this.jc = !1, this.zc = [], this.Wc = null, this.Hc = !1, this.Jc = !1, this.Yc = [], this.qo = new Qh(this, "async_queue_retry"), this.Xc = () => {
            const t = Kh();
            t && Yr("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.qo.Mo()
        };
        const t = Kh();
        t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.Xc)
    } get isShuttingDown() { return this.jc } enqueueAndForget(t) { this.enqueue(t) } enqueueAndForgetEvenWhileRestricted(t) { this.Zc(), this.ta(t) } enterRestrictedMode(t) {
        if (!this.jc) {
            this.jc = !0, this.Jc = t || !1;
            const e = Kh();
            e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.Xc)
        }
    } enqueue(t) {
        if (this.Zc(), this.jc) return new Promise((() => { }));
        const e = new as;
        return this.ta((() => this.jc && this.Jc ? Promise.resolve() : (t().then(e.resolve, e.reject), e.promise))).then((() => e.promise))
    } enqueueRetryable(t) { this.enqueueAndForget((() => (this.Qc.push(t), this.ea()))) } async ea() {
        if (0 !== this.Qc.length) {
            try { await this.Qc[0](), this.Qc.shift(), this.qo.reset() } catch (t) {
                if (!Hs(t)) throw t;
                Yr("AsyncQueue", "Operation failed with retryable error: " + t)
            } this.Qc.length > 0 && this.qo.No((() => this.ea()))
        }
    } ta(t) {
        const e = this.Gc.then((() => (this.Hc = !0, t().catch((t => {
            this.Wc = t, this.Hc = !1;
            const e = function (t) {
                let e = t.message || "";
                return t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack), e
            }(t);
            throw Jr("INTERNAL UNHANDLED ERROR: ", e), t
        })).then((t => (this.Hc = !1, t))))));
        return this.Gc = e, e
    } enqueueAfterDelay(t, e, n) {
        this.Zc(), this.Yc.indexOf(t) > -1 && (e = 0);
        const r = Dd.createAndSchedule(this, t, e, n, (t => this.na(t)));
        return this.zc.push(r), r
    } Zc() { this.Wc && es() } verifyOperationInProgress() { } async sa() {
        let t;
        do { t = this.Gc, await t } while (t !== this.Gc)
    } ia(t) {
        for (const e of this.zc) if (e.timerId === t) return !0;
        return !1
    } ra(t) {
        return this.sa().then((() => {
            this.zc.sort(((t, e) => t.targetTimeMs - e.targetTimeMs));
            for (const e of this.zc) if (e.skipDelay(), "all" !== t && e.timerId === t) break;
            return this.sa()
        }))
    } oa(t) { this.Yc.push(t) } na(t) {
        const e = this.zc.indexOf(t);
        this.zc.splice(e, 1)
    }
} function wg(t) {
    return function (t, e) {
        if ("object" != typeof t || null === t) return !1;
        const n = t;
        for (const t of ["next", "error", "complete"]) if (t in n && "function" == typeof n[t]) return !0;
        return !1
    }(t)
} class vg { constructor() { this._progressObserver = {}, this._taskCompletionResolver = new as, this._lastProgress = { taskState: "Running", totalBytes: 0, totalDocuments: 0, bytesLoaded: 0, documentsLoaded: 0 } } onProgress(t, e, n) { this._progressObserver = { next: t, error: e, complete: n } } catch(t) { return this._taskCompletionResolver.promise.catch(t) } then(t, e) { return this._taskCompletionResolver.promise.then(t, e) } _completeWith(t) { this._updateProgress(t), this._progressObserver.complete && this._progressObserver.complete(), this._taskCompletionResolver.resolve(t) } _failWith(t) { this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), this._progressObserver.error && this._progressObserver.error(t), this._taskCompletionResolver.reject(t) } _updateProgress(t) { this._lastProgress = t, this._progressObserver.next && this._progressObserver.next(t) } } const bg = -1;
class Ig extends ag { constructor(t, e, n, r) { super(t, e, n, r), this.type = "firestore", this._queue = new yg, this._persistenceKey = (null == r ? void 0 : r.name) || "[DEFAULT]" } _terminate() { return this._firestoreClient || _g(this), this._firestoreClient.terminate() } } function Eg(t, e, r) {
    r || (r = "(default)");
    const s = n(t, "firestore");
    if (s.isInitialized(r)) {
        const t = s.getImmediate({ identifier: r });
        if (v(s.getOptions(r), e)) return t;
        throw new os(is.FAILED_PRECONDITION, "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")
    } if (void 0 !== e.cacheSizeBytes && void 0 !== e.localCache) throw new os(is.INVALID_ARGUMENT, "cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");
    if (void 0 !== e.cacheSizeBytes && -1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new os(is.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
    return s.initialize({ options: e, instanceIdentifier: r })
} function Tg(t, e) {
    const s = "object" == typeof t ? t : r(), i = "string" == typeof t ? t : e || "(default)", o = n(s, "firestore").getImmediate({ identifier: i });
    if (!o._initialized) {
        const t = f("firestore");
        t && cg(o, ...t)
    } return o
} function Sg(t) { return t._firestoreClient || _g(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient } function _g(t) {
    var e, n, r;
    const s = t._freezeSettings(), i = function (t, e, n, r) { return new to(t, e, n, r.host, r.ssl, r.experimentalForceLongPolling, r.experimentalAutoDetectLongPolling, Yf(r.experimentalLongPollingOptions), r.useFetchStreams) }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, s);
    t._firestoreClient = new Lf(t._authCredentials, t._appCheckCredentials, t._queue, i), (null === (n = s.cache) || void 0 === n ? void 0 : n._offlineComponentProvider) && (null === (r = s.cache) || void 0 === r ? void 0 : r._onlineComponentProvider) && (t._firestoreClient._uninitializedComponentsProvider = { _offlineKind: s.cache.kind, _offline: s.cache._offlineComponentProvider, _online: s.cache._onlineComponentProvider })
} function xg(t, e) {
    Lg(t = sg(t, Ig));
    const n = Sg(t);
    if (n._uninitializedComponentsProvider) throw new os(is.FAILED_PRECONDITION, "SDK cache is already specified.");
    Zr("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
    const r = t._freezeSettings(), s = new Nf;
    return Dg(n, s, new Df(s, r.cacheSizeBytes, null == e ? void 0 : e.forceOwnership))
} function Cg(t) {
    Lg(t = sg(t, Ig));
    const e = Sg(t);
    if (e._uninitializedComponentsProvider) throw new os(is.FAILED_PRECONDITION, "SDK cache is already specified.");
    Zr("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
    const n = t._freezeSettings(), r = new Nf;
    return Dg(e, r, new Af(r, n.cacheSizeBytes))
} function Dg(t, e, n) {
    const r = new as;
    return t.asyncQueue.enqueue((async () => {
        try { await Pf(t, n), await Vf(t, e), r.resolve() } catch (t) {
            const e = t;
            if (!Bf(e)) throw e;
            Zr("Error enabling indexeddb cache. Falling back to memory cache: " + e), r.reject(e)
        }
    })).then((() => r.promise))
} function Ag(t) {
    if (t._initialized && !t._terminated) throw new os(is.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
    const e = new as;
    return t._queue.enqueueAndForgetEvenWhileRestricted((async () => {
        try {
            await async function (t) {
                if (!Ks.D()) return Promise.resolve();
                const e = t + "main";
                await Ks.delete(e)
            }(lh(t._databaseId, t._persistenceKey)), e.resolve()
        } catch (t) { e.reject(t) }
    })), e.promise
} function Ng(t) {
    return function (t) {
        const e = new as;
        return t.asyncQueue.enqueueAndForget((async () => async function (t, e) {
            const n = ss(t);
            cd(n.remoteStore) || Yr("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
            try {
                const t = await function (t) {
                    const e = ss(t);
                    return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (t => e.mutationQueue.getHighestUnacknowledgedBatchId(t)))
                }(n.localStore);
                if (-1 === t) return void e.resolve();
                const r = n.Ec.get(t) || [];
                r.push(e), n.Ec.set(t, r)
            } catch (t) {
                const n = Ad(t, "Initialization of waitForPendingWrites() operation failed");
                e.reject(n)
            }
        }(await Kf(t), e))), e.promise
    }(Sg(t = sg(t, Ig)))
} function kg(t) {
    return function (t) {
        return t.asyncQueue.enqueue((async () => {
            const e = await jf(t), n = await Gf(t);
            return e.setNetworkEnabled(!0), function (t) {
                const e = ss(t);
                return e.vu.delete(0), td(e)
            }(n)
        }))
    }(Sg(t = sg(t, Ig)))
} function Rg(t) {
    return function (t) {
        return t.asyncQueue.enqueue((async () => {
            const e = await jf(t), n = await Gf(t);
            return e.setNetworkEnabled(!1), async function (t) {
                const e = ss(t);
                e.vu.add(0), await ed(e), e.bu.set("Offline")
            }(n)
        }))
    }(Sg(t = sg(t, Ig)))
} function Mg(t) { return s(t.app, "firestore", t._databaseId.database), t._delete() } function Fg(t, e) {
    const n = Sg(t = sg(t, Ig)), r = new vg;
    return Xf(n, t._databaseId, e, r), r
} function Og(t, e) {
    return function (t, e) {
        return t.asyncQueue.enqueue((async () => function (t, e) {
            const n = ss(t);
            return n.persistence.runTransaction("Get named query", "readonly", (t => n.qs.getNamedQuery(t, e)))
        }(await zf(t), e)))
    }(Sg(t = sg(t, Ig)), e).then((e => e ? new lg(t, null, e.query) : null))
} function Lg(t) { if (t._initialized || t._terminated) throw new os(is.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.") } class Pg { constructor(t = "count", e) { this._aggregateType = t, this._internalFieldPath = e, this.type = "AggregateField" } } class Vg { constructor(t, e, n) { this._userDataWriter = e, this._data = n, this.type = "AggregateQuerySnapshot", this.query = t } data() { return this._userDataWriter.convertObjectMap(this._data) } } class Bg { constructor(t) { this._byteString = t } static fromBase64String(t) { try { return new Bg($i.fromBase64String(t)) } catch (t) { throw new os(is.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t) } } static fromUint8Array(t) { return new Bg($i.fromUint8Array(t)) } toBase64() { return this._byteString.toBase64() } toUint8Array() { return this._byteString.toUint8Array() } toString() { return "Bytes(base64: " + this.toBase64() + ")" } isEqual(t) { return this._byteString.isEqual(t._byteString) } } class qg {
    constructor(...t) {
        for (let e = 0;
            e < t.length;
            ++e)if (0 === t[e].length) throw new os(is.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new Cs(t)
    } isEqual(t) { return this._internalPath.isEqual(t._internalPath) }
} function Ug() { return new qg("__name__") } class jg { constructor(t) { this._methodName = t } } class zg {
    constructor(t, e) {
        if (!isFinite(t) || t < -90 || t > 90) throw new os(is.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new os(is.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t, this._long = e
    } get latitude() { return this._lat } get longitude() { return this._long } isEqual(t) { return this._lat === t._lat && this._long === t._long } toJSON() { return { latitude: this._lat, longitude: this._long } } _compareTo(t) { return vs(this._lat, t._lat) || vs(this._long, t._long) }
} const Gg = /^__.*__$/;
class Kg { constructor(t, e, n) { this.data = t, this.fieldMask = e, this.fieldTransforms = n } toMutation(t, e) { return null !== this.fieldMask ? new lc(t, this.data, this.fieldMask, e, this.fieldTransforms) : new uc(t, this.data, e, this.fieldTransforms) } } class $g { constructor(t, e, n) { this.data = t, this.fieldMask = e, this.fieldTransforms = n } toMutation(t, e) { return new lc(t, this.data, this.fieldMask, e, this.fieldTransforms) } } function Qg(t) {
    switch (t) {
        case 0: case 2: case 1: return !0;
        case 3: case 4: return !1;
        default: throw es()
    }
} class Hg {
    constructor(t, e, n, r, s, i) { this.settings = t, this.databaseId = e, this.serializer = n, this.ignoreUndefinedProperties = r, void 0 === s && this.ua(), this.fieldTransforms = s || [], this.fieldMask = i || [] } get path() { return this.settings.path } get ca() { return this.settings.ca } aa(t) { return new Hg(Object.assign(Object.assign({}, this.settings), t), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask) } ha(t) {
        var e;
        const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.aa({ path: n, la: !1 });
        return r.fa(t), r
    } da(t) {
        var e;
        const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.aa({ path: n, la: !1 });
        return r.ua(), r
    } wa(t) { return this.aa({ path: void 0, la: !0 }) } _a(t) { return gm(t, this.settings.methodName, this.settings.ma || !1, this.path, this.settings.ga) } contains(t) { return void 0 !== this.fieldMask.find((e => t.isPrefixOf(e))) || void 0 !== this.fieldTransforms.find((e => t.isPrefixOf(e.field))) } ua() {
        if (this.path) for (let t = 0;
            t < this.path.length;
            t++)this.fa(this.path.get(t))
    } fa(t) {
        if (0 === t.length) throw this._a("Document fields must not be empty");
        if (Qg(this.ca) && Gg.test(t)) throw this._a('Document fields cannot begin and end with "__"')
    }
} class Wg { constructor(t, e, n) { this.databaseId = t, this.ignoreUndefinedProperties = e, this.serializer = n || $h(t) } ya(t, e, n, r = !1) { return new Hg({ ca: t, methodName: e, ga: n, path: Cs.emptyPath(), la: !1, ma: r }, this.databaseId, this.serializer, this.ignoreUndefinedProperties) } } function Xg(t) {
    const e = t._freezeSettings(), n = $h(t._databaseId);
    return new Wg(t._databaseId, !!e.ignoreUndefinedProperties, n)
} function Yg(t, e, n, r, s, i = {}) {
    const o = t.ya(i.merge || i.mergeFields ? 2 : 0, e, n, s);
    lm("Data must be an object, but it was:", o, r);
    const a = cm(r, o);
    let c, u;
    if (i.merge) c = new zi(o.fieldMask), u = o.fieldTransforms;
    else if (i.mergeFields) {
        const t = [];
        for (const r of i.mergeFields) {
            const s = hm(e, r, n);
            if (!o.contains(s)) throw new os(is.INVALID_ARGUMENT, `Field '${s}' is specified in your field mask but missing from your input data.`);
            mm(t, s) || t.push(s)
        } c = new zi(t), u = o.fieldTransforms.filter((t => c.covers(t.field)))
    } else c = null, u = o.fieldTransforms;
    return new Kg(new _o(a), c, u)
} class Jg extends jg {
    _toFieldTransform(t) {
        if (2 !== t.ca) throw 1 === t.ca ? t._a(`${this._methodName}() can only appear at the top level of your update data`) : t._a(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
        return t.fieldMask.push(t.path), null
    } isEqual(t) { return t instanceof Jg }
} function Zg(t, e, n) { return new Hg({ ca: 3, ga: e.settings.ga, methodName: t._methodName, la: n }, e.databaseId, e.serializer, e.ignoreUndefinedProperties) } class tm extends jg { _toFieldTransform(t) { return new Za(t.path, new Ka) } isEqual(t) { return t instanceof tm } } class em extends jg {
    constructor(t, e) { super(t), this.pa = e } _toFieldTransform(t) {
        const e = Zg(this, t, !0), n = this.pa.map((t => am(t, e))), r = new $a(n);
        return new Za(t.path, r)
    } isEqual(t) { return this === t }
} class nm extends jg {
    constructor(t, e) { super(t), this.pa = e } _toFieldTransform(t) {
        const e = Zg(this, t, !0), n = this.pa.map((t => am(t, e))), r = new Ha(n);
        return new Za(t.path, r)
    } isEqual(t) { return this === t }
} class rm extends jg {
    constructor(t, e) { super(t), this.Ia = e } _toFieldTransform(t) {
        const e = new Xa(t.serializer, qa(t.serializer, this.Ia));
        return new Za(t.path, e)
    } isEqual(t) { return this === t }
} function sm(t, e, n, r) {
    const s = t.ya(1, e, n);
    lm("Data must be an object, but it was:", s, r);
    const i = [], o = _o.empty();
    Oi(r, ((t, r) => {
        const a = fm(e, t, n);
        r = I(r);
        const c = s.da(a);
        if (r instanceof Jg) i.push(a);
        else {
            const t = am(r, c);
            null != t && (i.push(a), o.set(a, t))
        }
    }));
    const a = new zi(i);
    return new $g(o, a, s.fieldTransforms)
} function im(t, e, n, r, s, i) {
    const o = t.ya(1, e, n), a = [hm(e, r, n)], c = [s];
    if (i.length % 2 != 0) throw new os(is.INVALID_ARGUMENT, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);
    for (let t = 0;
        t < i.length;
        t += 2)a.push(hm(e, i[t])), c.push(i[t + 1]);
    const u = [], l = _o.empty();
    for (let t = a.length - 1;
        t >= 0;
        --t)if (!mm(u, a[t])) {
            const e = a[t];
            let n = c[t];
            n = I(n);
            const r = o.da(e);
            if (n instanceof Jg) u.push(e);
            else {
                const t = am(n, r);
                null != t && (u.push(e), l.set(e, t))
            }
        } const h = new zi(u);
    return new $g(l, h, o.fieldTransforms)
} function om(t, e, n, r = !1) { return am(n, t.ya(r ? 4 : 3, e)) } function am(t, e) {
    if (um(t = I(t))) return lm("Unsupported field value:", e, t), cm(t, e);
    if (t instanceof jg) return function (t, e) {
        if (!Qg(e.ca)) throw e._a(`${t._methodName}() can only be used with update() and set()`);
        if (!e.path) throw e._a(`${t._methodName}() is not currently supported inside arrays`);
        const n = t._toFieldTransform(e);
        n && e.fieldTransforms.push(n)
    }(t, e), null;
    if (void 0 === t && e.ignoreUndefinedProperties) return null;
    if (e.path && e.fieldMask.push(e.path), t instanceof Array) {
        if (e.settings.la && 4 !== e.ca) throw e._a("Nested arrays are not supported");
        return function (t, e) {
            const n = [];
            let r = 0;
            for (const s of t) {
                let t = am(s, e.wa(r));
                null == t && (t = { nullValue: "NULL_VALUE" }), n.push(t), r++
            } return { arrayValue: { values: n } }
        }(t, e)
    } return function (t, e) {
        if (null === (t = I(t))) return { nullValue: "NULL_VALUE" };
        if ("number" == typeof t) return qa(e.serializer, t);
        if ("boolean" == typeof t) return { booleanValue: t };
        if ("string" == typeof t) return { stringValue: t };
        if (t instanceof Date) {
            const n = Es.fromDate(t);
            return { timestampValue: Qc(e.serializer, n) }
        } if (t instanceof Es) {
            const n = new Es(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return { timestampValue: Qc(e.serializer, n) }
        } if (t instanceof zg) return { geoPointValue: { latitude: t.latitude, longitude: t.longitude } };
        if (t instanceof Bg) return { bytesValue: Hc(e.serializer, t._byteString) };
        if (t instanceof ug) {
            const n = e.databaseId, r = t.firestore._databaseId;
            if (!r.isEqual(n)) throw e._a(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);
            return { referenceValue: Yc(t.firestore._databaseId || e.databaseId, t._key.path) }
        } throw e._a(`Unsupported field value: ${rg(t)}`)
    }(t, e)
} function cm(t, e) {
    const n = {};
    return Li(t) ? e.path && e.path.length > 0 && e.fieldMask.push(e.path) : Oi(t, ((t, r) => {
        const s = am(r, e.ha(t));
        null != s && (n[t] = s)
    })), { mapValue: { fields: n } }
} function um(t) { return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof Es || t instanceof zg || t instanceof Bg || t instanceof ug || t instanceof jg) } function lm(t, e, n) {
    if (!um(n) || !function (t) { return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t)) }(n)) {
        const r = rg(n);
        throw "an object" === r ? e._a(t + " a custom object") : e._a(t + " " + r)
    }
} function hm(t, e, n) {
    if ((e = I(e)) instanceof qg) return e._internalPath;
    if ("string" == typeof e) return fm(t, e);
    throw gm("Field path arguments must be of type string or ", t, !1, void 0, n)
} const dm = new RegExp("[~\\*/\\[\\]]");
function fm(t, e, n) {
    if (e.search(dm) >= 0) throw gm(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`, t, !1, void 0, n);
    try { return new qg(...e.split("."))._internalPath } catch (r) { throw gm(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, !1, void 0, n) }
} function gm(t, e, n, r, s) {
    const i = r && !r.isEmpty(), o = void 0 !== s;
    let a = `Function ${e}() called with invalid data`;
    n && (a += " (via `toFirestore()`)"), a += ". ";
    let c = "";
    return (i || o) && (c += " (found", i && (c += ` in field ${r}`), o && (c += ` in document ${s}`), c += ")"), new os(is.INVALID_ARGUMENT, a + t + c)
} function mm(t, e) { return t.some((t => t.isEqual(e))) } class pm {
    constructor(t, e, n, r, s) { this._firestore = t, this._userDataWriter = e, this._key = n, this._document = r, this._converter = s } get id() { return this._key.path.lastSegment() } get ref() { return new ug(this._firestore, this._converter, this._key) } exists() { return null !== this._document } data() {
        if (this._document) {
            if (this._converter) {
                const t = new ym(this._firestore, this._userDataWriter, this._key, this._document, null);
                return this._converter.fromFirestore(t)
            } return this._userDataWriter.convertValue(this._document.data.value)
        }
    } get(t) {
        if (this._document) {
            const e = this._document.data.field(wm("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e)
        }
    }
} class ym extends pm { data() { return super.data() } } function wm(t, e) { return "string" == typeof e ? fm(t, e) : e instanceof qg ? e._internalPath : e._delegate._internalPath } function vm(t) { if ("L" === t.limitType && 0 === t.explicitOrderBy.length) throw new os(is.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause") } class bm { } class Im extends bm { } function Em(t, e, ...n) {
    let r = [];
    e instanceof bm && r.push(e), r = r.concat(n), function (t) {
        const e = t.filter((t => t instanceof _m)).length, n = t.filter((t => t instanceof Tm)).length;
        if (e > 1 || e > 0 && n > 0) throw new os(is.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")
    }(r);
    for (const e of r) t = e._apply(t);
    return t
} class Tm extends Im {
    constructor(t, e, n) { super(), this._field = t, this._op = e, this._value = n, this.type = "where" } static _create(t, e, n) { return new Tm(t, e, n) } _apply(t) {
        const e = this._parse(t);
        return jm(t._query, e), new lg(t.firestore, t.converter, ma(t._query, e))
    } _parse(t) {
        const e = Xg(t.firestore), n = function (t, e, n, r, s, i, o) {
            let a;
            if (s.isKeyField()) {
                if ("array-contains" === i || "array-contains-any" === i) throw new os(is.INVALID_ARGUMENT, `Invalid Query. You can't perform '${i}' queries on documentId().`);
                if ("in" === i || "not-in" === i) {
                    Um(o, i);
                    const e = [];
                    for (const n of o) e.push(qm(r, t, n));
                    a = { arrayValue: { values: e } }
                } else a = qm(r, t, o)
            } else "in" !== i && "not-in" !== i && "array-contains-any" !== i || Um(o, i), a = om(n, "where", o, "in" === i || "not-in" === i);
            return Fo.create(s, i, a)
        }(t._query, 0, e, t.firestore._databaseId, this._field, this._op, this._value);
        return n
    }
} function Sm(t, e, n) {
    const r = e, s = wm("where", t);
    return Tm._create(s, r, n)
} class _m extends bm {
    constructor(t, e) { super(), this.type = t, this._queryConstraints = e } static _create(t, e) { return new _m(t, e) } _parse(t) {
        const e = this._queryConstraints.map((e => e._parse(t))).filter((t => t.getFilters().length > 0));
        return 1 === e.length ? e[0] : Oo.create(e, this._getOperator())
    } _apply(t) {
        const e = this._parse(t);
        return 0 === e.getFilters().length ? t : (function (t, e) {
            let n = t;
            const r = e.getFlattenedFilters();
            for (const t of r) jm(n, t), n = ma(n, t)
        }(t._query, e), new lg(t.firestore, t.converter, ma(t._query, e)))
    } _getQueryConstraints() { return this._queryConstraints } _getOperator() { return "and" === this.type ? "and" : "or" }
} function xm(...t) { return t.forEach((t => Gm("or", t))), _m._create("or", t) } function Cm(...t) { return t.forEach((t => Gm("and", t))), _m._create("and", t) } class Dm extends Im {
    constructor(t, e) { super(), this._field = t, this._direction = e, this.type = "orderBy" } static _create(t, e) { return new Dm(t, e) } _apply(t) {
        const e = function (t, e, n) {
            if (null !== t.startAt) throw new os(is.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== t.endAt) throw new os(is.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            const r = new ko(e, n);
            return function (t, e) {
                if (null === la(t)) {
                    const n = ha(t);
                    null !== n && zm(t, n, e.field)
                }
            }(t, r), r
        }(t._query, this._field, this._direction);
        return new lg(t.firestore, t.converter, function (t, e) {
            const n = t.explicitOrderBy.concat([e]);
            return new oa(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt)
        }(t._query, e))
    }
} function Am(t, e = "asc") {
    const n = e, r = wm("orderBy", t);
    return Dm._create(r, n)
} class Nm extends Im { constructor(t, e, n) { super(), this.type = t, this._limit = e, this._limitType = n } static _create(t, e, n) { return new Nm(t, e, n) } _apply(t) { return new lg(t.firestore, t.converter, pa(t._query, this._limit, this._limitType)) } } function km(t) { return ig("limit", t), Nm._create("limit", t, "F") } function Rm(t) { return ig("limitToLast", t), Nm._create("limitToLast", t, "L") } class Mm extends Im {
    constructor(t, e, n) { super(), this.type = t, this._docOrFields = e, this._inclusive = n } static _create(t, e, n) { return new Mm(t, e, n) } _apply(t) {
        const e = Bm(t, this.type, this._docOrFields, this._inclusive);
        return new lg(t.firestore, t.converter, function (t, e) { return new oa(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt) }(t._query, e))
    }
} function Fm(...t) { return Mm._create("startAt", t, !0) } function Om(...t) { return Mm._create("startAfter", t, !1) } class Lm extends Im {
    constructor(t, e, n) { super(), this.type = t, this._docOrFields = e, this._inclusive = n } static _create(t, e, n) { return new Lm(t, e, n) } _apply(t) {
        const e = Bm(t, this.type, this._docOrFields, this._inclusive);
        return new lg(t.firestore, t.converter, function (t, e) { return new oa(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e) }(t._query, e))
    }
} function Pm(...t) { return Lm._create("endBefore", t, !1) } function Vm(...t) { return Lm._create("endAt", t, !0) } function Bm(t, e, n, r) {
    if (n[0] = I(n[0]), n[0] instanceof pm) return function (t, e, n, r, s) {
        if (!r) throw new os(is.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${n}().`);
        const i = [];
        for (const n of fa(t)) if (n.field.isKeyField()) i.push(fo(e, r.key));
        else {
            const t = r.data.field(n.field);
            if (Yi(t)) throw new os(is.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
            if (null === t) {
                const t = n.field.canonicalString();
                throw new os(is.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`)
            } i.push(t)
        } return new Do(i, s)
    }(t._query, t.firestore._databaseId, e, n[0]._document, r);
    {
        const s = Xg(t.firestore);
        return function (t, e, n, r, s, i) {
            const o = t.explicitOrderBy;
            if (s.length > o.length) throw new os(is.INVALID_ARGUMENT, `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
            const a = [];
            for (let i = 0;
                i < s.length;
                i++) {
                    const c = s[i];
                if (o[i].field.isKeyField()) {
                    if ("string" != typeof c) throw new os(is.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);
                    if (!da(t) && -1 !== c.indexOf("/")) throw new os(is.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);
                    const n = t.path.child(_s.fromString(c));
                    if (!Ds.isDocumentKey(n)) throw new os(is.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
                    const s = new Ds(n);
                    a.push(fo(e, s))
                } else {
                    const t = om(n, r, c);
                    a.push(t)
                }
            } return new Do(a, i)
        }(t._query, t.firestore._databaseId, s, e, n, r)
    }
} function qm(t, e, n) {
    if ("string" == typeof (n = I(n))) {
        if ("" === n) throw new os(is.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!da(e) && -1 !== n.indexOf("/")) throw new os(is.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
        const r = e.path.child(_s.fromString(n));
        if (!Ds.isDocumentKey(r)) throw new os(is.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
        return fo(t, new Ds(r))
    } if (n instanceof ug) return fo(t, n._key);
    throw new os(is.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${rg(n)}.`)
} function Um(t, e) { if (!Array.isArray(t) || 0 === t.length) throw new os(is.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`) } function jm(t, e) {
    if (e.isInequality()) {
        const n = ha(t), r = e.field;
        if (null !== n && !n.isEqual(r)) throw new os(is.INVALID_ARGUMENT, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${r.toString()}'`);
        const s = la(t);
        null !== s && zm(t, r, s)
    } const n = function (t, e) {
        for (const n of t) for (const t of n.getFlattenedFilters()) if (e.indexOf(t.op) >= 0) return t.op;
        return null
    }(t.filters, function (t) {
        switch (t) {
            case "!=": return ["!=", "not-in"];
            case "array-contains-any": case "in": return ["not-in"];
            case "not-in": return ["array-contains-any", "in", "not-in", "!="];
            default: return []
        }
    }(e.op));
    if (null !== n) throw n === e.op ? new os(is.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new os(is.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)
} function zm(t, e, n) { if (!n.isEqual(e)) throw new os(is.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`) } function Gm(t, e) { if (!(e instanceof Tm || e instanceof _m)) throw new os(is.INVALID_ARGUMENT, `Function ${t}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`) } class Km {
    convertValue(t, e = "none") {
        switch (so(t)) {
            case 0: return null;
            case 1: return t.booleanValue;
            case 2: return Wi(t.integerValue || t.doubleValue);
            case 3: return this.convertTimestamp(t.timestampValue);
            case 4: return this.convertServerTimestamp(t, e);
            case 5: return t.stringValue;
            case 6: return this.convertBytes(Xi(t.bytesValue));
            case 7: return this.convertReference(t.referenceValue);
            case 8: return this.convertGeoPoint(t.geoPointValue);
            case 9: return this.convertArray(t.arrayValue, e);
            case 10: return this.convertObject(t.mapValue, e);
            default: throw es()
        }
    } convertObject(t, e) { return this.convertObjectMap(t.fields, e) } convertObjectMap(t, e = "none") {
        const n = {};
        return Oi(t, ((t, r) => { n[t] = this.convertValue(r, e) })), n
    } convertGeoPoint(t) { return new zg(Wi(t.latitude), Wi(t.longitude)) } convertArray(t, e) { return (t.values || []).map((t => this.convertValue(t, e))) } convertServerTimestamp(t, e) {
        switch (e) {
            case "previous": const n = Ji(t);
                return null == n ? null : this.convertValue(n, e);
            case "estimate": return this.convertTimestamp(Zi(t));
            default: return null
        }
    } convertTimestamp(t) {
        const e = Hi(t);
        return new Es(e.seconds, e.nanos)
    } convertDocumentKey(t, e) {
        const n = _s.fromString(t);
        ns(bu(n));
        const r = new eo(n.get(1), n.get(3)), s = new Ds(n.popFirst(5));
        return r.isEqual(e) || Jr(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`), s
    }
} function $m(t, e, n) {
    let r;
    return r = t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e, r
} class Qm extends Km {
    constructor(t) { super(), this.firestore = t } convertBytes(t) { return new Bg(t) } convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new ug(this.firestore, null, e)
    }
} function Hm(t) { return new Pg("sum", hm("sum", t)) } function Wm(t) { return new Pg("avg", hm("average", t)) } function Xm() { return new Pg("count") } function Ym(t, e) {
    var n, r;
    return t instanceof Pg && e instanceof Pg && t._aggregateType === e._aggregateType && (null === (n = t._internalFieldPath) || void 0 === n ? void 0 : n.canonicalString()) === (null === (r = e._internalFieldPath) || void 0 === r ? void 0 : r.canonicalString())
} function Jm(t, e) { return pg(t.query, e.query) && v(t.data(), e.data()) } class Zm { constructor(t, e) { this.hasPendingWrites = t, this.fromCache = e } isEqual(t) { return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache } } class tp extends pm {
    constructor(t, e, n, r, s, i) { super(t, e, n, r, i), this._firestore = t, this._firestoreImpl = t, this.metadata = s } exists() { return super.exists() } data(t = {}) {
        if (this._document) {
            if (this._converter) {
                const e = new ep(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
                return this._converter.fromFirestore(e, t)
            } return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps)
        }
    } get(t, e = {}) {
        if (this._document) {
            const n = this._document.data.field(wm("DocumentSnapshot.get", t));
            if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps)
        }
    }
} class ep extends tp { data(t = {}) { return super.data(t) } } class np {
    constructor(t, e, n, r) { this._firestore = t, this._userDataWriter = e, this._snapshot = r, this.metadata = new Zm(r.hasPendingWrites, r.fromCache), this.query = n } get docs() {
        const t = [];
        return this.forEach((e => t.push(e))), t
    } get size() { return this._snapshot.docs.size } get empty() { return 0 === this.size } forEach(t, e) { this._snapshot.docs.forEach((n => { t.call(e, new ep(this._firestore, this._userDataWriter, n.key, n, new Zm(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter)) })) } docChanges(t = {}) {
        const e = !!t.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges) throw new os(is.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = function (t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
                let e = 0;
                return t._snapshot.docChanges.map((n => {
                    const r = new ep(t._firestore, t._userDataWriter, n.doc.key, n.doc, new Zm(t._snapshot.mutatedKeys.has(n.doc.key), t._snapshot.fromCache), t.query.converter);
                    return n.doc, { type: "added", doc: r, oldIndex: -1, newIndex: e++ }
                }))
            } {
                let n = t._snapshot.oldDocs;
                return t._snapshot.docChanges.filter((t => e || 3 !== t.type)).map((e => {
                    const r = new ep(t._firestore, t._userDataWriter, e.doc.key, e.doc, new Zm(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter);
                    let s = -1, i = -1;
                    return 0 !== e.type && (s = n.indexOf(e.doc.key), n = n.delete(e.doc.key)), 1 !== e.type && (n = n.add(e.doc), i = n.indexOf(e.doc.key)), { type: rp(e.type), doc: r, oldIndex: s, newIndex: i }
                }))
            }
        }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges
    }
} function rp(t) {
    switch (t) {
        case 0: return "added";
        case 2: case 3: return "modified";
        case 1: return "removed";
        default: return es()
    }
} function sp(t, e) { return t instanceof tp && e instanceof tp ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof np && e instanceof np && t._firestore === e._firestore && pg(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot) } function ip(t) {
    t = sg(t, ug);
    const e = sg(t.firestore, Ig);
    return Hf(Sg(e), t._key).then((n => vp(e, t, n)))
} class op extends Km {
    constructor(t) { super(), this.firestore = t } convertBytes(t) { return new Bg(t) } convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new ug(this.firestore, null, e)
    }
} function ap(t) {
    t = sg(t, ug);
    const e = sg(t.firestore, Ig), n = Sg(e), r = new op(e);
    return function (t, e) {
        const n = new as;
        return t.asyncQueue.enqueueAndForget((async () => async function (t, e, n) {
            try {
                const r = await function (t, e) {
                    const n = ss(t);
                    return n.persistence.runTransaction("read document", "readonly", (t => n.localDocuments.getDocument(t, e)))
                }(t, e);
                r.isFoundDocument() ? n.resolve(r) : r.isNoDocument() ? n.resolve(null) : n.reject(new os(is.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))
            } catch (t) {
                const r = Ad(t, `Failed to get document '${e} from cache`);
                n.reject(r)
            }
        }(await zf(t), e, n))), n.promise
    }(n, t._key).then((n => new tp(e, r, t._key, n, new Zm(null !== n && n.hasLocalMutations, !0), t.converter)))
} function cp(t) {
    t = sg(t, ug);
    const e = sg(t.firestore, Ig);
    return Hf(Sg(e), t._key, { source: "server" }).then((n => vp(e, t, n)))
} function up(t) {
    t = sg(t, lg);
    const e = sg(t.firestore, Ig), n = Sg(e), r = new op(e);
    return vm(t._query), Wf(n, t._query).then((n => new np(e, r, t, n)))
} function lp(t) {
    t = sg(t, lg);
    const e = sg(t.firestore, Ig), n = Sg(e), r = new op(e);
    return function (t, e) {
        const n = new as;
        return t.asyncQueue.enqueueAndForget((async () => async function (t, e, n) {
            try {
                const r = await Ih(t, e, !0), s = new Qd(e, r.ir), i = s.sc(r.documents), o = s.applyChanges(i, !1);
                n.resolve(o.snapshot)
            } catch (t) {
                const r = Ad(t, `Failed to execute query '${e} against cache`);
                n.reject(r)
            }
        }(await zf(t), e, n))), n.promise
    }(n, t._query).then((n => new np(e, r, t, n)))
} function hp(t) {
    t = sg(t, lg);
    const e = sg(t.firestore, Ig), n = Sg(e), r = new op(e);
    return Wf(n, t._query, { source: "server" }).then((n => new np(e, r, t, n)))
} function dp(t, e, n) {
    t = sg(t, ug);
    const r = sg(t.firestore, Ig), s = $m(t.converter, e, n);
    return wp(r, [Yg(Xg(r), "setDoc", t._key, s, null !== t.converter, n).toMutation(t._key, ec.none())])
} function fp(t, e, n, ...r) {
    t = sg(t, ug);
    const s = sg(t.firestore, Ig), i = Xg(s);
    let o;
    return o = "string" == typeof (e = I(e)) || e instanceof qg ? im(i, "updateDoc", t._key, e, n, r) : sm(i, "updateDoc", t._key, e), wp(s, [o.toMutation(t._key, ec.exists(!0))])
} function gp(t) { return wp(sg(t.firestore, Ig), [new gc(t._key, ec.none())]) } function mp(t, e) {
    const n = sg(t.firestore, Ig), r = gg(t), s = $m(t.converter, e);
    return wp(n, [Yg(Xg(t.firestore), "addDoc", r._key, s, null !== t.converter, {}).toMutation(r._key, ec.exists(!1))]).then((() => r))
} function pp(t, ...e) {
    var n, r, s;
    t = I(t);
    let i = { includeMetadataChanges: !1 }, o = 0;
    "object" != typeof e[o] || wg(e[o]) || (i = e[o], o++);
    const a = { includeMetadataChanges: i.includeMetadataChanges };
    if (wg(e[o])) {
        const t = e[o];
        e[o] = null === (n = t.next) || void 0 === n ? void 0 : n.bind(t), e[o + 1] = null === (r = t.error) || void 0 === r ? void 0 : r.bind(t), e[o + 2] = null === (s = t.complete) || void 0 === s ? void 0 : s.bind(t)
    } let c, u, l;
    if (t instanceof ug) u = sg(t.firestore, Ig), l = ca(t._key.path), c = { next: n => { e[o] && e[o](vp(u, t, n)) }, error: e[o + 1], complete: e[o + 2] };
    else {
        const n = sg(t, lg);
        u = sg(n.firestore, Ig), l = n._query;
        const r = new op(u);
        c = { next: t => { e[o] && e[o](new np(u, r, n, t)) }, error: e[o + 1], complete: e[o + 2] }, vm(t._query)
    } return function (t, e, n, r) {
        const s = new Rf(r), i = new qd(e, s, n);
        return t.asyncQueue.enqueueAndForget((async () => Od(await Qf(t), i))), () => { s.Dc(), t.asyncQueue.enqueueAndForget((async () => Ld(await Qf(t), i))) }
    }(Sg(u), l, a, c)
} function yp(t, e) {
    return function (t, e) {
        const n = new Rf(e);
        return t.asyncQueue.enqueueAndForget((async () => function (t, e) { ss(t).ku.add(e), e.next() }(await Qf(t), n))), () => { n.Dc(), t.asyncQueue.enqueueAndForget((async () => function (t, e) { ss(t).ku.delete(e) }(await Qf(t), n))) }
    }(Sg(t = sg(t, Ig)), wg(e) ? e : { next: e })
} function wp(t, e) {
    return function (t, e) {
        const n = new as;
        return t.asyncQueue.enqueueAndForget((async () => async function (t, e, n) {
            const r = _f(t);
            try {
                const t = await function (t, e) {
                    const n = ss(t), r = Es.now(), s = e.reduce(((t, e) => t.add(e.key)), Oa());
                    let i, o;
                    return n.persistence.runTransaction("Locally write mutations", "readwrite", (t => {
                        let a = xa(), c = Oa();
                        return n.Zi.getEntries(t, s).next((t => { a = t, a.forEach(((t, e) => { e.isValidDocument() || (c = c.add(t)) })) })).next((() => n.localDocuments.getOverlayedDocuments(t, a))).next((s => {
                            i = s;
                            const o = [];
                            for (const t of e) {
                                const e = ac(t, i.get(t.key).overlayedDocument);
                                null != e && o.push(new lc(t.key, e, xo(e.value.mapValue), ec.exists(!0)))
                            } return n.mutationQueue.addMutationBatch(t, r, o, e)
                        })).next((e => {
                            o = e;
                            const r = e.applyToLocalDocumentSet(i, c);
                            return n.documentOverlayCache.saveOverlays(t, e.batchId, r)
                        }))
                    })).then((() => ({ batchId: o.batchId, changes: Aa(i) })))
                }(r.localStore, e);
                r.sharedClientState.addPendingMutation(t.batchId), function (t, e, n) {
                    let r = t.Tc[t.currentUser.toKey()];
                    r || (r = new Pi(vs)), r = r.insert(e, n), t.Tc[t.currentUser.toKey()] = r
                }(r, t.batchId, n), await ff(r, t.changes), await md(r.remoteStore)
            } catch (t) {
                const e = Ad(t, "Failed to persist write");
                n.reject(e)
            }
        }(await Kf(t), e, n))), n.promise
    }(Sg(t), e)
} function vp(t, e, n) {
    const r = n.docs.get(e._key), s = new op(t);
    return new tp(t, s, e._key, r, new Zm(n.hasPendingWrites, n.fromCache), e.converter)
} function bp(t) { return Ip(t, { count: Xm() }) } function Ip(t, e) {
    const n = sg(t.firestore, Ig), r = Sg(n), s = function (t, e) {
        const n = [];
        for (const r in t) Object.prototype.hasOwnProperty.call(t, r) && n.push(e(t[r], r));
        return n
    }(e, ((t, e) => new vc(e, t._aggregateType, t._internalFieldPath)));
    return function (t, e, n) {
        const r = new as;
        return t.asyncQueue.enqueueAndForget((async () => {
            try {
                const s = await $f(t);
                r.resolve(async function (t, e, n) {
                    var r;
                    const s = ss(t), { request: i, du: o } = function (t, e, n) {
                        const r = lu(t, e), s = {}, i = [];
                        let o = 0;
                        return n.forEach((t => {
                            const e = "aggregate_" + o++;
                            s[e] = t.alias, "count" === t.yt ? i.push({ alias: e, count: {} }) : "avg" === t.yt ? i.push({ alias: e, avg: { field: pu(t.fieldPath) } }) : "sum" === t.yt && i.push({ alias: e, sum: { field: pu(t.fieldPath) } })
                        })), { request: { structuredAggregationQuery: { aggregations: i, structuredQuery: r.structuredQuery }, parent: r.parent }, du: s }
                    }(s.serializer, ga(e), n), a = i.parent;
                    s.connection.po || delete i.parent;
                    const c = (await s.vo("RunAggregationQuery", a, i, 1)).filter((t => !!t.result));
                    ns(1 === c.length);
                    const u = null === (r = c[0].result) || void 0 === r ? void 0 : r.aggregateFields;
                    return Object.keys(u).reduce(((t, e) => (t[o[e]] = u[e], t)), {})
                }(s, e, n))
            } catch (t) { r.reject(t) }
        })), r.promise
    }(r, t._query, s).then((e => function (t, e, n) {
        const r = new op(t);
        return new Vg(e, r, n)
    }(n, t, e)))
} class Ep { constructor(t) { this.kind = "memory", this._onlineComponentProvider = new Nf, (null == t ? void 0 : t.garbageCollector) ? this._offlineComponentProvider = t.garbageCollector._offlineComponentProvider : this._offlineComponentProvider = new xf } toJSON() { return { kind: this.kind } } } class Tp {
    constructor(t) {
        let e;
        this.kind = "persistent", (null == t ? void 0 : t.tabManager) ? (t.tabManager._initialize(t), e = t.tabManager) : (e = Rp(void 0), e._initialize(t)), this._onlineComponentProvider = e._onlineComponentProvider, this._offlineComponentProvider = e._offlineComponentProvider
    } toJSON() { return { kind: this.kind } }
} class Sp { constructor() { this.kind = "memoryEager", this._offlineComponentProvider = new xf } toJSON() { return { kind: this.kind } } } class _p { constructor(t) { this.kind = "memoryLru", this._offlineComponentProvider = new Cf(t) } toJSON() { return { kind: this.kind } } } function xp() { return new Sp } function Cp(t) { return new _p(null == t ? void 0 : t.cacheSizeBytes) } function Dp(t) { return new Ep(t) } function Ap(t) { return new Tp(t) } class Np { constructor(t) { this.forceOwnership = t, this.kind = "persistentSingleTab" } toJSON() { return { kind: this.kind } } _initialize(t) { this._onlineComponentProvider = new Nf, this._offlineComponentProvider = new Df(this._onlineComponentProvider, null == t ? void 0 : t.cacheSizeBytes, this.forceOwnership) } } class kp { constructor() { this.kind = "PersistentMultipleTab" } toJSON() { return { kind: this.kind } } _initialize(t) { this._onlineComponentProvider = new Nf, this._offlineComponentProvider = new Af(this._onlineComponentProvider, null == t ? void 0 : t.cacheSizeBytes) } } function Rp(t) { return new Np(null == t ? void 0 : t.forceOwnership) } function Mp() { return new kp } const Fp = { maxAttempts: 5 };
class Op {
    constructor(t, e) { this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, this._dataReader = Xg(t) } set(t, e, n) {
        this._verifyNotCommitted();
        const r = Lp(t, this._firestore), s = $m(r.converter, e, n), i = Yg(this._dataReader, "WriteBatch.set", r._key, s, null !== r.converter, n);
        return this._mutations.push(i.toMutation(r._key, ec.none())), this
    } update(t, e, n, ...r) {
        this._verifyNotCommitted();
        const s = Lp(t, this._firestore);
        let i;
        return i = "string" == typeof (e = I(e)) || e instanceof qg ? im(this._dataReader, "WriteBatch.update", s._key, e, n, r) : sm(this._dataReader, "WriteBatch.update", s._key, e), this._mutations.push(i.toMutation(s._key, ec.exists(!0))), this
    } delete(t) {
        this._verifyNotCommitted();
        const e = Lp(t, this._firestore);
        return this._mutations = this._mutations.concat(new gc(e._key, ec.none())), this
    } commit() { return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve() } _verifyNotCommitted() { if (this._committed) throw new os(is.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.") }
} function Lp(t, e) {
    if ((t = I(t)).firestore !== e) throw new os(is.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
    return t
} class Pp extends class {
    constructor(t, e) { this._firestore = t, this._transaction = e, this._dataReader = Xg(t) } get(t) {
        const e = Lp(t, this._firestore), n = new Qm(this._firestore);
        return this._transaction.lookup([e._key]).then((t => {
            if (!t || 1 !== t.length) return es();
            const r = t[0];
            if (r.isFoundDocument()) return new pm(this._firestore, n, r.key, r, e.converter);
            if (r.isNoDocument()) return new pm(this._firestore, n, e._key, null, e.converter);
            throw es()
        }))
    } set(t, e, n) {
        const r = Lp(t, this._firestore), s = $m(r.converter, e, n), i = Yg(this._dataReader, "Transaction.set", r._key, s, null !== r.converter, n);
        return this._transaction.set(r._key, i), this
    } update(t, e, n, ...r) {
        const s = Lp(t, this._firestore);
        let i;
        return i = "string" == typeof (e = I(e)) || e instanceof qg ? im(this._dataReader, "Transaction.update", s._key, e, n, r) : sm(this._dataReader, "Transaction.update", s._key, e), this._transaction.update(s._key, i), this
    } delete(t) {
        const e = Lp(t, this._firestore);
        return this._transaction.delete(e._key), this
    }
}{
        constructor(t, e) { super(t, e), this._firestore = t } get(t) {
            const e = Lp(t, this._firestore), n = new op(this._firestore);
            return super.get(t).then((t => new tp(this._firestore, n, e._key, t._document, new Zm(!1, !1), e.converter)))
        }
} function Vp(t, e, n) {
    t = sg(t, Ig);
    const r = Object.assign(Object.assign({}, Fp), n);
    return function (t) { if (t.maxAttempts < 1) throw new os(is.INVALID_ARGUMENT, "Max attempts must be at least 1") }(r), function (t, e, n) {
        const r = new as;
        return t.asyncQueue.enqueueAndForget((async () => {
            const s = await $f(t);
            new Of(t.asyncQueue, s, n, e, r).run()
        })), r.promise
    }(Sg(t), (n => e(new Pp(t, n))), r)
} function Bp() { return new Jg("deleteField") } function qp() { return new tm("serverTimestamp") } function Up(...t) { return new em("arrayUnion", t) } function jp(...t) { return new nm("arrayRemove", t) } function zp(t) { return new rm("increment", t) } function Gp(t) { return Sg(t = sg(t, Ig)), new Op(t, (e => wp(t, e))) } function Kp(t, e) {
    var n;
    const r = Sg(t = sg(t, Ig));
    if (!r._uninitializedComponentsProvider || "memory" === (null === (n = r._uninitializedComponentsProvider) || void 0 === n ? void 0 : n._offlineKind)) return Zr("Cannot enable indexes when persistence is disabled"), Promise.resolve();
    const s = function (t) {
        const e = "string" == typeof t ? function (t) { try { return JSON.parse(t) } catch (t) { throw new os(is.INVALID_ARGUMENT, "Failed to parse JSON: " + (null == t ? void 0 : t.message)) } }(t) : t, n = [];
        if (Array.isArray(e.indexes)) for (const t of e.indexes) {
            const e = $p(t, "collectionGroup"), r = [];
            if (Array.isArray(t.fields)) for (const e of t.fields) {
                const t = fm("setIndexConfiguration", $p(e, "fieldPath"));
                "CONTAINS" === e.arrayConfig ? r.push(new Ms(t, 2)) : "ASCENDING" === e.order ? r.push(new Ms(t, 0)) : "DESCENDING" === e.order && r.push(new Ms(t, 1))
            } n.push(new As(As.UNKNOWN_ID, e, r, Os.empty()))
        } return n
    }(e);
    return function (t, e) {
        return t.asyncQueue.enqueue((async () => async function (t, e) {
            const n = ss(t), r = n.indexManager, s = [];
            return n.persistence.runTransaction("Configure indexes", "readwrite", (t => r.getFieldIndexes(t).next((n => function (t, e, n, r, s) {
                t = [...t], e = [...e], t.sort(n), e.sort(n);
                const i = t.length, o = e.length;
                let a = 0, c = 0;
                for (;
                    a < o && c < i;
                ) {
                    const i = n(t[c], e[a]);
                    i < 0 ? s(t[c++]) : i > 0 ? r(e[a++]) : (a++, c++)
                } for (;
                    a < o;
                )r(e[a++]);
                for (;
                    c < i;
                )s(t[c++])
            }(n, e, Rs, (e => { s.push(r.addFieldIndex(t, e)) }), (e => { s.push(r.deleteFieldIndex(t, e)) })))).next((() => zs.waitFor(s)))))
        }(await zf(t), e)))
    }(r, s)
} function $p(t, e) {
    if ("string" != typeof t[e]) throw new os(is.INVALID_ARGUMENT, "Missing string value for: " + e);
    return t[e]
} !function (n, r = !0) {
    Qr = i, t(new E("firestore", ((t, { instanceIdentifier: e, options: n }) => {
        const s = t.getProvider("app").getImmediate(), i = new Ig(new hs(t.getProvider("auth-internal")), new ms(t.getProvider("app-check-internal")), function (t, e) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, ["projectId"])) throw new os(is.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
            return new eo(t.options.projectId, e)
        }(s, e), s);
        return n = Object.assign({ useFetchStreams: r }, n), i._setSettings(n), i
    }), "PUBLIC").setMultipleInstances(!0)), e(Kr, "3.12.2", n), e(Kr, "3.12.2", "esm2017")
}();
export { Km as AbstractUserDataWriter, Pg as AggregateField, Vg as AggregateQuerySnapshot, Bg as Bytes, 
    bg as CACHE_SIZE_UNLIMITED, hg as CollectionReference, ug as DocumentReference, tp as DocumentSnapshot,
     qg as FieldPath, jg as FieldValue, Ig as Firestore, os as FirestoreError, zg as GeoPoint, 
     vg as LoadBundleTask, lg as Query, _m as QueryCompositeFilterConstraint, Im as QueryConstraint, 
     ep as QueryDocumentSnapshot, Lm as QueryEndAtConstraint, Tm as QueryFieldFilterConstraint, 
     Nm as QueryLimitConstraint, Dm as QueryOrderByConstraint, np as QuerySnapshot, 
     Mm as QueryStartAtConstraint, Zm as SnapshotMetadata, Es as Timestamp, Pp as Transaction, Op as WriteBatch,
      eo as _DatabaseId, Ds as _DocumentKey, ps as _EmptyAppCheckTokenProvider, 
      us as _EmptyAuthCredentialsProvider, Cs as _FieldPath, _c as _TestingHooks, sg as _cast, 
      rs as _debugAssert, Ki as _isBase64Available, Zr as _logWarn, tg as _validateIsNotUsedTogether, 
      mp as addDoc, Ym as aggregateFieldEqual, Jm as aggregateQuerySnapshotEqual, Cm as and, jp as arrayRemove, 
      Up as arrayUnion, Wm as average, Ag as clearIndexedDbPersistence, dg as collection, fg as collectionGroup, 
      cg as connectFirestoreEmulator, Xm as count, gp as deleteDoc, Bp as deleteField, Rg as disableNetwork, 
      gg as doc, Ug as documentId, xg as enableIndexedDbPersistence, Cg as enableMultiTabIndexedDbPersistence, 
      kg as enableNetwork, Vm as endAt, Pm as endBefore, Sg as ensureFirestoreConfigured, wp as executeWrite, 
      Ip as getAggregateFromServer, bp as getCountFromServer, ip as getDoc, ap as getDocFromCache, 
      cp as getDocFromServer, up as getDocs, lp as getDocsFromCache, hp as getDocsFromServer, 
      Tg as getFirestore, zp as increment, Eg as initializeFirestore, km as limit, Rm as limitToLast, 
      Fg as loadBundle, xp as memoryEagerGarbageCollector, Dp as memoryLocalCache, 
      Cp as memoryLruGarbageCollector, Og as namedQuery, pp as onSnapshot, yp as onSnapshotsInSync, xm as or, 
      Am as orderBy, Ap as persistentLocalCache, Mp as persistentMultipleTabManager, 
      Rp as persistentSingleTabManager, Em as query, pg as queryEqual, mg as refEqual, 
      Vp as runTransaction, qp as serverTimestamp, dp as setDoc, Kp as setIndexConfiguration, Xr as setLogLevel, 
      sp as snapshotEqual, Om as startAfter, Fm as startAt, Hm as sum, Mg as terminate, fp as updateDoc,
       Ng as waitForPendingWrites, Sm as where, Gp as writeBatch };


//# sourceMappingURL=firebase-firestore.js.map