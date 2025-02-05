#!/usr/bin/env node
"use strict";
var exports = void 0;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub extends Object {
        data = [];
        static get [Symbol.species]() {
            return Array;
        }
        sub_from = 0;
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        reap() { }
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        fresh() { }
        complete() { }
        get incompleted() {
            return false;
        }
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant);
            }
        }
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: val => val[$.$mol_dev_format_body],
        body: val => val[$.$mol_dev_format_body](),
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    function $mol_dev_format_span(style, ...content) {
        return $mol_dev_format_element('span', {
            ...style,
        }, ...content);
    }
    $.$mol_dev_format_span = $mol_dev_format_span;
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0;
        cursor = $mol_wire_cursor.stale;
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.final;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        [Symbol.toStringTag];
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '<>';
        }
        constructor(id, task, host, args) {
            super();
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
            this[Symbol.toStringTag] = id;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_auto({
                    [$mol_dev_format_head]: () => $mol_dev_format_shade(cursor),
                    [$mol_dev_format_body]: () => $mol_dev_format_native(this),
                })
                : $mol_dev_format_shade($mol_dev_format_native(this), cursor), $mol_dev_format_auto(this.cache));
        }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        wrappers.set(result, result = Object.assign(result.finally(() => {
                            if (this.cache === result)
                                this.absorb();
                        }), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            if ($mol_owning_check(this, this.cache)) {
                this.cache.destructor();
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && left.stack === right.stack;
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, left.byteOffset, left.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_log3_area_lazy(event) {
        const self = this;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
        }
        static unknown = $mol_span.begin('?');
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(type, value, kids, span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(this.struct(type, []).insert(value, ...path.slice(1)));
                }
                return this.clone(sub);
            }
            else if (typeof type === 'number') {
                const sub = this.kids.slice();
                sub[type] = (sub[type] || this.list([]))
                    .insert(value, ...path.slice(1));
                return this.clone(sub.filter(Boolean));
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .map(item => item.insert(value, ...path.slice(1)))
                    .filter(Boolean);
                return this.clone(kids);
            }
        }
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
        }
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            return $mol_tree2.data(String.fromCharCode(...buf), [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (json.toString !== Object.prototype.toString) {
            return $mol_tree2.data(json.toString(), [], span);
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { time: new Date().toISOString(), ...event };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host)
                        break reuse;
                    if (existen.task !== task)
                        break reuse;
                    if (!$mol_compare_deep(existen.args, args))
                        break reuse;
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Non idempotency`,
                        sub,
                        pubs: [...sub?.pub_list ?? [], existen],
                        next,
                        hint: 'Ignore it',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                if (typeof val !== 'function')
                    return val;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_rest_code;
    (function ($mol_rest_code) {
        $mol_rest_code[$mol_rest_code["Continue"] = 100] = "Continue";
        $mol_rest_code[$mol_rest_code["Switching_Protocols"] = 101] = "Switching_Protocols";
        $mol_rest_code[$mol_rest_code["Processing"] = 102] = "Processing";
        $mol_rest_code[$mol_rest_code["OK"] = 200] = "OK";
        $mol_rest_code[$mol_rest_code["Created"] = 201] = "Created";
        $mol_rest_code[$mol_rest_code["Accepted"] = 202] = "Accepted";
        $mol_rest_code[$mol_rest_code["Non_Authoritative_Information"] = 203] = "Non_Authoritative_Information";
        $mol_rest_code[$mol_rest_code["No_Content"] = 204] = "No_Content";
        $mol_rest_code[$mol_rest_code["Reset_Content"] = 205] = "Reset_Content";
        $mol_rest_code[$mol_rest_code["Partial_Content"] = 206] = "Partial_Content";
        $mol_rest_code[$mol_rest_code["Multi_Status"] = 207] = "Multi_Status";
        $mol_rest_code[$mol_rest_code["Already_Reported"] = 208] = "Already_Reported";
        $mol_rest_code[$mol_rest_code["IM_Used"] = 226] = "IM_Used";
        $mol_rest_code[$mol_rest_code["Multiple_Choices"] = 300] = "Multiple_Choices";
        $mol_rest_code[$mol_rest_code["Moved_Permanently"] = 301] = "Moved_Permanently";
        $mol_rest_code[$mol_rest_code["Found"] = 302] = "Found";
        $mol_rest_code[$mol_rest_code["See_Other"] = 303] = "See_Other";
        $mol_rest_code[$mol_rest_code["Not_Modified"] = 304] = "Not_Modified";
        $mol_rest_code[$mol_rest_code["Use_Proxy"] = 305] = "Use_Proxy";
        $mol_rest_code[$mol_rest_code["Temporary_Redirect"] = 307] = "Temporary_Redirect";
        $mol_rest_code[$mol_rest_code["Bad_Request"] = 400] = "Bad_Request";
        $mol_rest_code[$mol_rest_code["Unauthorized"] = 401] = "Unauthorized";
        $mol_rest_code[$mol_rest_code["Payment_Required"] = 402] = "Payment_Required";
        $mol_rest_code[$mol_rest_code["Forbidden"] = 403] = "Forbidden";
        $mol_rest_code[$mol_rest_code["Not_Found"] = 404] = "Not_Found";
        $mol_rest_code[$mol_rest_code["Method_Not_Allowed"] = 405] = "Method_Not_Allowed";
        $mol_rest_code[$mol_rest_code["Not_Acceptable"] = 406] = "Not_Acceptable";
        $mol_rest_code[$mol_rest_code["Proxy_Authentication_Required"] = 407] = "Proxy_Authentication_Required";
        $mol_rest_code[$mol_rest_code["Request_Timeout"] = 408] = "Request_Timeout";
        $mol_rest_code[$mol_rest_code["Conflict"] = 409] = "Conflict";
        $mol_rest_code[$mol_rest_code["Gone"] = 410] = "Gone";
        $mol_rest_code[$mol_rest_code["Length_Required"] = 411] = "Length_Required";
        $mol_rest_code[$mol_rest_code["Precondition_Failed"] = 412] = "Precondition_Failed";
        $mol_rest_code[$mol_rest_code["Request_Entity_Too_Large"] = 413] = "Request_Entity_Too_Large";
        $mol_rest_code[$mol_rest_code["Request_URI_Too_Long"] = 414] = "Request_URI_Too_Long";
        $mol_rest_code[$mol_rest_code["Unsupported_Media_Type"] = 415] = "Unsupported_Media_Type";
        $mol_rest_code[$mol_rest_code["Requested_Range_Not_Satisfiable"] = 416] = "Requested_Range_Not_Satisfiable";
        $mol_rest_code[$mol_rest_code["Expectation_Failed"] = 417] = "Expectation_Failed";
        $mol_rest_code[$mol_rest_code["Teapot"] = 418] = "Teapot";
        $mol_rest_code[$mol_rest_code["Unprocessable_Entity"] = 422] = "Unprocessable_Entity";
        $mol_rest_code[$mol_rest_code["Locked"] = 423] = "Locked";
        $mol_rest_code[$mol_rest_code["Failed_Dependency"] = 424] = "Failed_Dependency";
        $mol_rest_code[$mol_rest_code["Upgrade_Required"] = 426] = "Upgrade_Required";
        $mol_rest_code[$mol_rest_code["Precondition_Required"] = 428] = "Precondition_Required";
        $mol_rest_code[$mol_rest_code["Too_Many_Requests"] = 429] = "Too_Many_Requests";
        $mol_rest_code[$mol_rest_code["Request_Header_Fields_Too_Large"] = 431] = "Request_Header_Fields_Too_Large";
        $mol_rest_code[$mol_rest_code["Unavailable_For_Legal_Reasons"] = 451] = "Unavailable_For_Legal_Reasons";
        $mol_rest_code[$mol_rest_code["Internal_Server_Error"] = 500] = "Internal_Server_Error";
        $mol_rest_code[$mol_rest_code["Not_Implemented"] = 501] = "Not_Implemented";
        $mol_rest_code[$mol_rest_code["Bad_Gateway"] = 502] = "Bad_Gateway";
        $mol_rest_code[$mol_rest_code["Service_Unavailable"] = 503] = "Service_Unavailable";
        $mol_rest_code[$mol_rest_code["Gateway_Timeout"] = 504] = "Gateway_Timeout";
        $mol_rest_code[$mol_rest_code["HTTP_Version_Not_Supported"] = 505] = "HTTP_Version_Not_Supported";
        $mol_rest_code[$mol_rest_code["Insufficient_Storage"] = 507] = "Insufficient_Storage";
        $mol_rest_code[$mol_rest_code["Loop_Detected"] = 508] = "Loop_Detected";
        $mol_rest_code[$mol_rest_code["Not_Extended"] = 510] = "Not_Extended";
        $mol_rest_code[$mol_rest_code["Network_Authentication_Required"] = 511] = "Network_Authentication_Required";
        $mol_rest_code[$mol_rest_code["Network_Read_Timeout_Error"] = 598] = "Network_Read_Timeout_Error";
        $mol_rest_code[$mol_rest_code["Network_Connect_Timeout_Error"] = 599] = "Network_Connect_Timeout_Error";
    })($mol_rest_code = $.$mol_rest_code || ($.$mol_rest_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const catched = new WeakMap();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.get(error))
            return false;
        catched.set(error, true);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        console.error(error);
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        if (name.startsWith('node:'))
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        const mod = target.require('module');
        if (mod.builtinModules.indexOf(name) >= 0)
            return target.require(name);
        try {
            target.require.resolve(name);
        }
        catch {
            const $$ = $;
            $$.$mol_exec('.', 'npm', 'install', '--omit=dev', name);
            try {
                $$.$mol_exec('.', 'npm', 'install', '--omit=dev', '@types/' + name);
            }
            catch (e) {
                if ($$.$mol_fail_catch(e)) {
                    $$.$mol_fail_log(e);
                }
            }
        }
        try {
            return target.require(name);
        }
        catch (error) {
            if ($.$mol_fail_catch(error) && error.code === 'ERR_REQUIRE_ESM') {
                const module = cache.get(name);
                if (module)
                    return module;
                throw import(name).then(module => cache.set(name, module));
            }
            $.$mol_fail_log(error);
            return null;
        }
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
const cache = new Map();
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        e.stack,
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_run_error extends $mol_error_mix {
    }
    $.$mol_run_error = $mol_run_error;
    $.$mol_run_spawn = (...args) => $node['child_process'].spawn(...args);
    $.$mol_run_spawn_sync = (...args) => $node['child_process'].spawnSync(...args);
    class $mol_run extends $mol_object {
        static async_enabled() {
            return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC']);
        }
        static spawn(options) {
            const sync = !this.async_enabled() || !Boolean($mol_wire_auto());
            const env = options.env ?? this.$.$mol_env();
            return $mol_wire_sync(this).spawn_async({ ...options, sync, env });
        }
        static spawn_async({ dir, sync, timeout, command, env }) {
            const args_raw = typeof command === 'string' ? command.split(' ') : command;
            const [app, ...args] = args_raw;
            const opts = { shell: true, cwd: dir, env };
            const log_object = {
                place: `${this}.spawn()`,
                message: 'Run',
                command: args_raw.join(' '),
                dir: $node.path.relative('', dir),
            };
            if (sync) {
                this.$.$mol_log3_come({
                    hint: 'Run inside fiber',
                    ...log_object
                });
                let error;
                let res;
                try {
                    res = this.$.$mol_run_spawn_sync(app, args, opts);
                    error = res.error;
                }
                catch (err) {
                    error = err;
                }
                if (!res || error || res.status) {
                    throw new $mol_run_error(this.error_message(res), { ...log_object, status: res?.status, signal: res?.signal }, ...(error ? [error] : []));
                }
                return res;
            }
            let sub;
            try {
                sub = this.$.$mol_run_spawn(app, args, {
                    ...opts,
                    stdio: ['pipe', 'inherit', 'inherit'],
                });
            }
            catch (error) {
                throw new $mol_run_error(this.error_message(undefined), log_object, error);
            }
            const pid = sub.pid ?? 0;
            this.$.$mol_log3_come({
                ...log_object,
                pid,
            });
            let timeout_kill = false;
            let timer;
            const std_data = [];
            const error_data = [];
            const add = (std_chunk, error_chunk) => {
                if (std_chunk)
                    std_data.push(std_chunk);
                if (error_chunk)
                    error_data.push(error_chunk);
                if (!timeout)
                    return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM';
                    timeout_kill = true;
                    add();
                    sub.kill(signal);
                }, timeout);
            };
            add();
            sub.stdout?.on('data', data => add(data));
            sub.stderr?.on('data', data => add(undefined, data));
            const result_promise = new Promise((done, fail) => {
                const close = (error, status = null, signal = null) => {
                    if (!timer && timeout)
                        return;
                    clearTimeout(timer);
                    timer = undefined;
                    const res = {
                        pid,
                        signal,
                        get stdout() { return Buffer.concat(std_data); },
                        get stderr() { return Buffer.concat(error_data); }
                    };
                    if (error || status || timeout_kill)
                        return fail(new $mol_run_error(this.error_message(res) + (timeout_kill ? ', timeout' : ''), { ...log_object, pid, status, signal, timeout_kill }, ...error ? [error] : []));
                    this.$.$mol_log3_done({
                        ...log_object,
                        pid,
                    });
                    done(res);
                };
                sub.on('disconnect', () => close(new Error('Disconnected')));
                sub.on('error', err => close(err));
                sub.on('exit', (status, signal) => close(null, status, signal));
            });
            return Object.assign(result_promise, { destructor: () => {
                    clearTimeout(timer);
                    sub.kill('SIGKILL');
                } });
        }
        static error_message(res) {
            return res?.stderr.toString() || res?.stdout.toString() || 'Run error';
        }
    }
    $.$mol_run = $mol_run;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_exec(dir, command, ...args) {
        return this.$mol_run.spawn({ command: [command, ...args], dir });
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const TextEncoder = globalThis.TextEncoder ?? $node.util.TextEncoder;
    const encoder = new TextEncoder();
    function $mol_charset_encode(value) {
        return encoder.encode(value);
    }
    $.$mol_charset_encode = $mol_charset_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_serialize(node) {
        const serializer = new $mol_dom_context.XMLSerializer;
        return serializer.serializeToString(node);
    }
    $.$mol_dom_serialize = $mol_dom_serialize;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port extends $mol_object {
        send_code(code) { }
        send_type(mime) { }
        send_data(data) {
            if (data === null)
                return this.send_nil();
            if (typeof data === 'string')
                return this.send_text(data);
            if (data instanceof Uint8Array)
                return this.send_bin(data);
            if (data instanceof $mol_dom_context.Element)
                return this.send_dom(data);
            return this.send_json(data);
        }
        send_nil() {
            this.send_code(204);
        }
        send_bin(data) {
            this.send_code(200);
            this.send_type('application/octet-stream');
        }
        send_text(data) {
            this.send_code(200);
            this.send_type('text/plain;charset=utf-8');
            this.send_bin($mol_charset_encode(data));
        }
        send_json(data) {
            this.send_code(200);
            this.send_type('application/json');
            this.send_text(JSON.stringify(data));
        }
        send_dom(data) {
            this.send_code(200);
            this.send_type('text/html;charset=utf-8');
            this.send_text($mol_dom_serialize(data));
        }
        static make(config) {
            return super.make(config);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_data", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_nil", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_text", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_json", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_dom", null);
    __decorate([
        ($mol_action)
    ], $mol_rest_port, "make", null);
    $.$mol_rest_port = $mol_rest_port;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_key_store = new WeakMap();
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    function $mol_key(value) {
        if (typeof value === 'bigint')
            return value.toString() + 'n';
        if (typeof value === 'symbol')
            return value.description;
        if (!value)
            return JSON.stringify(value);
        if (typeof value !== 'object' && typeof value !== 'function')
            return JSON.stringify(value);
        return JSON.stringify(value, (field, value) => {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return value.description;
            if (!value)
                return value;
            if (typeof value !== 'object' && typeof value !== 'function')
                return value;
            if (Array.isArray(value))
                return value;
            const proto = Reflect.getPrototypeOf(value);
            if (!proto)
                return value;
            if (Reflect.getPrototypeOf(proto) === null)
                return value;
            if ('toJSON' in value)
                return value;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof TypedArray)
                return [...value];
            let key = $.$mol_key_store.get(value);
            if (key)
                return key;
            key = $mol_guid();
            $.$mol_key_store.set(value, key);
            return key;
        });
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '<>';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + field);
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '<>';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        resync(args) {
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                ;
                (this.host ?? this.task)[this.field()].delete($mol_key(this.args[0]));
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem = $mol_wire_solo;
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_message extends $mol_object {
        port;
        method() {
            return 'POST';
        }
        uri() {
            return new URL(`rest://localhost/`);
        }
        type() {
            return 'application/octet-stream';
        }
        data() {
            return null;
        }
        bin() {
            let data = this.data();
            if (data instanceof Uint8Array)
                return data;
            if (data instanceof $mol_dom_context.Element)
                data = $mol_dom_serialize(data);
            if (typeof data !== 'string')
                data = JSON.stringify(data);
            return $mol_charset_encode(data);
        }
        text() {
            const data = this.data();
            if (typeof data === 'string')
                return data;
            if (data instanceof Uint8Array)
                return $mol_charset_decode(data);
            if (data instanceof $mol_dom_context.Element)
                return $mol_dom_serialize(data);
            return JSON.stringify(data);
        }
        reply(data, meta) {
            if (meta?.code)
                this.port.send_code(meta.code);
            if (meta?.type)
                this.port.send_type(meta.type);
            this.port.send_data(data);
        }
        route(uri) {
            return $mol_rest_message.make({
                port: this.port,
                method: () => this.method(),
                uri: $mol_const(uri),
                type: () => this.type(),
                data: () => this.data(),
            });
        }
        derive(method, data) {
            return $mol_rest_message.make({
                port: this.port,
                method: $mol_const(method),
                uri: () => this.uri(),
                data: $mol_const(data),
            });
        }
        static make(config) {
            return super.make(config);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "method", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "uri", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "data", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "bin", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_rest_message.prototype, "route", null);
    __decorate([
        $mol_action
    ], $mol_rest_message.prototype, "derive", null);
    __decorate([
        ($mol_action)
    ], $mol_rest_message, "make", null);
    $.$mol_rest_message = $mol_rest_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_webrtc extends $mol_rest_port {
        channel;
        send_bin(data) {
            if (this.channel.readyState !== "open")
                return;
            this.channel.send(data);
        }
        send_text(data) {
            if (this.channel.readyState !== "open")
                return;
            this.channel.send(data);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port_webrtc.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_webrtc.prototype, "send_text", null);
    $.$mol_rest_port_webrtc = $mol_rest_port_webrtc;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $mol_state_arg extends $mol_object {
        prefix;
        static prolog = '';
        static separator = ' ';
        static href(next) {
            return next || process.argv.slice(2).join(' ');
        }
        static href_normal() {
            return this.link({});
        }
        static dict(next) {
            if (next !== void 0)
                this.href(this.make_link(next));
            var href = this.href();
            var chunks = href.split(' ');
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static value(key, next) {
            if (next === void 0)
                return this.dict()[key] ?? null;
            this.href(this.link({ [key]: next }));
            return next;
        }
        static link(next) {
            const params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make_link(params);
        }
        static make_link(next) {
            const chunks = [];
            for (const key in next) {
                if (next[key] !== null) {
                    chunks.push([key, next[key]].map(encodeURIComponent).join('='));
                }
            }
            return chunks.join(' ');
        }
        static go(next) {
            this.href(this.link(next));
        }
        static commit() { }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            const prefix = this.prefix;
            const dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const makeURL = $mol_wire_sync((url, base) => new URL(url, base));
    class $mol_rest_resource extends $mol_object {
        REQUEST(msg) {
            const [path, nest, tail] = /^\/([a-zA-Z][^/]*)(.*)$/.exec(msg.uri().pathname) ?? [];
            const field = nest?.toLowerCase();
            if (field && field in this && !(field in $mol_rest_resource.prototype)) {
                const uri2 = makeURL(msg.uri().toString());
                uri2.pathname = tail ?? msg.uri().pathname;
                const msg2 = msg.route(uri2);
                return this[field]().REQUEST(msg2);
            }
            return $mol_wire_sync(this)[msg.method()](msg);
        }
        async OPTIONS(msg) {
            if (msg.type() !== 'application/sdp')
                return msg.reply(null);
            const { RTCPeerConnection } = await import('node-datachannel/polyfill');
            const connection = new RTCPeerConnection;
            const channel = connection.createDataChannel(msg.uri().toString(), { negotiated: true, id: 0 });
            const port = $mol_rest_port_webrtc.make({ channel });
            $mol_wire_sync(this.$).$mol_log3_come({
                place: this,
                message: 'OPEN',
                url: msg.uri(),
                port: $mol_key(port),
            });
            $mol_wire_sync(this).REQUEST(msg.derive('OPEN', null));
            channel.onmessage = event => {
                const message = msg.derive('POST', event.data);
                message.port = port;
                this.$.$mol_log3_rise({
                    place: this,
                    message: message.method(),
                    url: message.uri(),
                    port: $mol_key(port),
                });
                $mol_wire_async(this).POST(message);
            };
            channel.onclose = () => {
                this.$.$mol_log3_done({
                    place: this,
                    message: 'CLOSE',
                    url: msg.uri(),
                    port: $mol_key(port),
                });
                $mol_wire_sync(this).REQUEST(msg.derive('CLOSE', null));
            };
            const sdp = await $mol_wire_async(msg).text();
            await connection.setRemoteDescription({ sdp, type: 'offer' });
            connection.setLocalDescription({ type: 'answer' });
            await new Promise(done => connection.onicecandidate = ({ candidate }) => done(candidate));
            msg.port.send_type('application/sdp');
            msg.port.send_text(connection.localDescription.sdp);
        }
        OPEN(msg) { }
        CLOSE(msg) { }
        HEAD(msg) { }
        GET(msg) { }
        PUT(msg) { }
        PATCH(msg) { }
        POST(msg) { }
        DELETE(msg) { }
        _auto() { }
        static port(port) {
            const server = $mol_rest_server.make({
                port: () => port,
            });
            server.root(this.make({}));
            server.start();
            new $mol_wire_atom(`${server.root()}._auto<>`, () => {
                try {
                    server.root()._auto();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }).fresh();
            return server;
        }
        static serve() {
            const port = Number(this.$.$mol_state_arg.value('port'));
            return port ? this.port(port) : null;
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_resource.prototype, "REQUEST", null);
    __decorate([
        $mol_mem_key
    ], $mol_rest_resource, "port", null);
    $.$mol_rest_resource = $mol_rest_resource;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this))
                    return store.get(this);
                const val = task.call(this, next) ?? next;
                store.set(this, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            return 0;
        }
        read() {
            return new Uint8Array();
        }
        truncate(size) { }
        close() { }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let file_modes;
    (function (file_modes) {
        file_modes[file_modes["create"] = $node.fs.constants.O_CREAT] = "create";
        file_modes[file_modes["exists_truncate"] = $node.fs.constants.O_TRUNC] = "exists_truncate";
        file_modes[file_modes["exists_fail"] = $node.fs.constants.O_EXCL] = "exists_fail";
        file_modes[file_modes["read_only"] = $node.fs.constants.O_RDONLY] = "read_only";
        file_modes[file_modes["write_only"] = $node.fs.constants.O_WRONLY] = "write_only";
        file_modes[file_modes["read_write"] = $node.fs.constants.O_RDWR] = "read_write";
        file_modes[file_modes["append"] = $node.fs.constants.O_APPEND] = "append";
    })(file_modes || (file_modes = {}));
    function mode_mask(modes) {
        return modes.reduce((res, mode) => res | file_modes[mode], 0);
    }
    class $mol_file_transaction_node extends $mol_file_transaction {
        descr() {
            $mol_wire_solid();
            return $node.fs.openSync(this.path(), mode_mask(this.modes()));
        }
        write({ buffer, offset = 0, length, position = null }) {
            if (Array.isArray(buffer)) {
                return $node.fs.writevSync(this.descr(), buffer, position ?? undefined);
            }
            if (typeof buffer === 'string') {
                return $node.fs.writeSync(this.descr(), buffer, position);
            }
            length = length ?? buffer.byteLength;
            return $node.fs.writeSync(this.descr(), buffer, offset, length, position);
        }
        truncate(size) {
            $node.fs.ftruncateSync(this.descr());
        }
        read() {
            return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()));
        }
        close() {
            $node.fs.closeSync(this.descr());
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_transaction_node.prototype, "descr", null);
    $.$mol_file_transaction_node = $mol_file_transaction_node;
    $.$mol_file_transaction = $mol_file_transaction_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            if (!this.root()) {
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            this.changed.add(file);
            if (!this.watching)
                return;
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        static watch_debounce() { return 500; }
        static flush() {
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            this.flush();
            this.watching = false;
            this.changed.add(this.absolute(path));
        }
        static unwatched(side_effect, affected_dir) {
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        buffer(next) {
            let readed = new Uint8Array();
            if (next === undefined) {
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        watcher() {
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function $mol_file_node_buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    $.$mol_file_node_buffer_normalize = $mol_file_node_buffer_normalize;
    class $mol_file_node extends $mol_file {
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher(reset) {
            const path = this.path();
            const root = this.root();
            if (!root && !this.exists())
                return super.watcher();
            let watcher;
            try {
                watcher = $node.fs.watch(path);
            }
            catch (error) {
                if (!(error instanceof Error))
                    error = new Error('Unknown watch error', { cause: error });
                error.message += '\n' + path;
                if (root || error.code !== 'ENOENT') {
                    this.$.$mol_fail_log(error);
                }
                return super.watcher();
            }
            watcher.on('change', (type, name) => {
                if (!name)
                    return;
                const path = $node.path.join(this.path(), name.toString());
                this.constructor.changed_add(type, path);
            });
            watcher.on('error', e => this.$.$mol_fail_log(e));
            let destructed = false;
            watcher.on('close', () => {
                if (!destructed)
                    setTimeout(() => $mol_wire_async(this).watcher(null), 500);
            });
            return {
                destructor() {
                    destructed = true;
                    watcher.close();
                }
            };
        }
        info(path) {
            try {
                return stat_convert($node.fs.statSync(path));
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    if (error.code === 'ENOENT')
                        return null;
                    error.message += '\n' + path;
                    this.$.$mol_fail_hidden(error);
                }
            }
            return null;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path, { recursive: true });
                return null;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'EEXIST')
                        return null;
                    e.message += '\n' + path;
                    this.$.$mol_fail_hidden(e);
                }
            }
        }
        copy(to) {
            $node.fs.copyFileSync(this.path(), to);
        }
        drop() {
            $node.fs.unlinkSync(this.path());
        }
        read() {
            const path = this.path();
            try {
                return $mol_file_node_buffer_normalize($node.fs.readFileSync(path));
            }
            catch (error) {
                if (!$mol_promise_like(error)) {
                    error.message += '\n' + path;
                }
                $mol_fail_hidden(error);
            }
        }
        write(buffer) {
            const path = this.path();
            try {
                $node.fs.writeFileSync(path, buffer);
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    error.message += '\n' + path;
                }
                return this.$.$mol_fail_hidden(error);
            }
        }
        kids() {
            const path = this.path();
            try {
                const kids = $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
                return kids;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'ENOENT')
                        return [];
                    e.message += '\n' + path;
                }
                $mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor
                .relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        readable(opts) {
            const { Readable } = $node['node:stream'];
            const stream = $node.fs.createReadStream(this.path(), {
                flags: 'r',
                autoClose: true,
                start: opts?.start,
                end: opts?.end,
                encoding: 'binary',
            });
            return Readable.toWeb(stream);
        }
        writable(opts) {
            const { Writable } = $node['node:stream'];
            const stream = $node.fs.createWriteStream(this.path(), {
                flags: 'w+',
                autoClose: true,
                start: opts?.start,
                encoding: 'binary',
            });
            return Writable.toWeb(stream);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "info", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "copy", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "drop", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "read", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "write", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node.prototype, "readable", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "writable", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_file_extensions = {
        'css': 'text/css;charset=utf-8',
        'csv': 'text/csv;charset=utf-8',
        'htm': 'text/html;charset=utf-8',
        'html': 'text/html;charset=utf-8',
        'ics': 'text/calendar;charset=utf-8',
        'js': 'text/javascript;charset=utf-8',
        'jsx': 'text/javascript;charset=utf-8',
        'md': 'text/plain;charset=utf-8',
        'mjs': 'text/javascript;charset=utf-8',
        'ts': 'text/typescript;charset=utf-8',
        'tsx': 'text/typescript;charset=utf-8',
        'txt': 'text/plain;charset=utf-8',
        'aac': 'audio/aac',
        'mid': 'audio/midi',
        'midi': 'audio/midi',
        'mp3': 'audio/mpeg',
        'oga': 'audio/ogg',
        'opus': 'audio/opus',
        'wav': 'audio/wav',
        'weba': 'audio/webm',
        'apng': 'image/apng',
        'avif': 'image/avif',
        'bmp': 'image/bmp',
        'gif': 'image/gif',
        'ico': 'image/vnd.microsoft.icon',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'svg': 'image/svg+xml',
        'tiff': 'image/tiff',
        'tif': 'image/tiff',
        'webp': 'image/webp',
        'avi': 'video/x-msvideo',
        'mpeg': 'video/mpeg',
        'mp4': 'video/mp4',
        'ogv': 'video/ogg',
        'webm': 'video/webm',
        '3gp': 'video/3gpp',
        '3g2': 'video/3gpp2',
        'otf': 'font/otf',
        'ttf': 'font/ttf',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'abw': 'application/x-abiword',
        'arc': 'application/x-freearc',
        'azw': 'application/vnd.amazon.ebook',
        'bin': 'application/octet-stream',
        'bz': 'application/x-bzip',
        'bz2': 'application/x-bzip2',
        'cda': 'application/x-cdf',
        'crus': 'application/x-crus',
        'csh': 'application/x-csh',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'eot': 'application/vnd.ms-fontobject',
        'epub': 'application/epub+zip',
        'gz': 'application/gzip',
        'jar': 'application/java-archive',
        'json': 'application/json',
        'jsonld': 'application/ld+json',
        'map': 'application/json',
        'mpkg': 'application/vnd.apple.installer+xml',
        'odp': 'application/vnd.oasis.opendocument.presentation',
        'ods': 'application/vnd.oasis.opendocument.spreadsheet',
        'odt': 'application/vnd.oasis.opendocument.text',
        'ogx': 'application/ogg',
        'pdf': 'application/pdf',
        'php': 'application/x-httpd-php',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'rar': 'application/vnd.rar',
        'rtf': 'application/rtf',
        'sh': 'application/x-sh',
        'tar': 'application/x-tar',
        'tree': 'application/x-tree',
        'vsd': 'application/vnd.visio',
        'xhtml': 'application/xhtml+xml',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xml': 'application/xml',
        'xul': 'application/vnd.mozilla.xul+xml',
        'zip': 'application/zip',
        '7z': 'application/x-7z-compressed',
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_http extends $mol_rest_port {
        output;
        send_code(code) {
            if (this.output.writableEnded)
                return;
            if (this.output.statusCode !== 400)
                return;
            this.output.statusCode = code;
        }
        send_type(mime) {
            if (this.output.writableEnded)
                return;
            if (this.output.getHeader('content-type'))
                return;
            this.output.setHeader('content-type', mime);
        }
        send_bin(data) {
            if (this.output.writableEnded)
                return;
            super.send_bin(data);
            this.output.write(data);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port_http.prototype, "send_code", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_http.prototype, "send_type", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_http.prototype, "send_bin", null);
    $.$mol_rest_port_http = $mol_rest_port_http;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_message_http extends $mol_rest_message {
        input;
        method() {
            return this.input.method ?? super.method();
        }
        uri() {
            const addr = this.input.socket?.localAddress ?? '::1';
            const port = this.input.socket?.localPort ?? '80';
            return new URL(this.input.url, `http://[${addr}]:${port}/`);
        }
        type() {
            return (this.input.headers['content-type'] ?? 'application/octet-stream');
        }
        data() {
            const consume = $mol_wire_sync($node['stream/consumers']);
            if (this.type().startsWith('text/')) {
                const text = consume.text(this.input);
                if (this.type() === 'text/html') {
                    return $mol_dom_parse(text, 'application/xhtml+xml').documentElement;
                }
                return text;
            }
            else {
                if (this.type() === 'application/json') {
                    return consume.json(this.input);
                }
                else {
                    return new Uint8Array(consume.arrayBuffer(this.input));
                }
            }
        }
        route(uri) {
            return $mol_rest_message_http.make({
                port: this.port,
                input: this.input,
                uri: $mol_const(uri),
                data: () => this.data(),
            });
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "method", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "uri", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "data", null);
    __decorate([
        $mol_action
    ], $mol_rest_message_http.prototype, "route", null);
    $.$mol_rest_message_http = $mol_rest_message_http;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_ws extends $mol_rest_port {
    }
    $.$mol_rest_port_ws = $mol_rest_port_ws;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_encode(src) {
        throw new Error('Not implemented');
    }
    $.$mol_base64_encode = $mol_base64_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_encode_node(str) {
        if (!str)
            return '';
        if (Buffer.isBuffer(str))
            return str.toString('base64');
        return Buffer.from(str).toString('base64');
    }
    $.$mol_base64_encode_node = $mol_base64_encode_node;
    $.$mol_base64_encode = $mol_base64_encode_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_decode(base64) {
        throw new Error('Not implemented');
    }
    $.$mol_base64_decode = $mol_base64_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_decode_node(base64Str) {
        base64Str = base64Str.replace(/-/g, '+').replace(/_/g, '/');
        const buffer = Buffer.from(base64Str, 'base64');
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    $.$mol_base64_decode_node = $mol_base64_decode_node;
    $.$mol_base64_decode = $mol_base64_decode_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_ae_encode(buffer) {
        return $mol_base64_encode(buffer).replace(/\+/g, 'æ').replace(/\//g, 'Æ').replace(/=/g, '');
    }
    $.$mol_base64_ae_encode = $mol_base64_ae_encode;
    function $mol_base64_ae_decode(str) {
        return $mol_base64_decode(str.replace(/æ/g, '+').replace(/Æ/g, '/'));
    }
    $.$mol_base64_ae_decode = $mol_base64_ae_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_buffer extends DataView {
        static from(array) {
            if (typeof array === 'number')
                array = new Uint8Array(array);
            if (typeof array === 'string')
                array = $mol_base64_ae_decode(array);
            return new this(array.buffer, array.byteOffset, array.byteLength);
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        getUint48(offset, LE = false) {
            if (offset % 4) {
                return this.getUint16(offset, LE) + this.getUint32(offset + 2, LE) * 2 ** 16;
            }
            else {
                return this.getUint32(offset, LE) + this.getUint16(offset + 4, LE) * 2 ** 32;
            }
        }
        setUint48(offset, value, LE = false) {
            if (offset % 4) {
                this.setUint16(offset, value & ((1 << 16) - 1), LE);
                this.setUint32(offset + 2, (value / 2 ** 16) | 0, LE);
            }
            else {
                this.setUint32(offset, value | 0, LE);
                this.setUint16(offset + 4, (value / 2 ** 32) | 0, LE);
            }
        }
        int8(offset, next) {
            if (next === undefined)
                return this.getInt8(offset);
            if (next >= -(2 ** 7) && next < 2 ** 7)
                return this.setInt8(offset, next), next;
            $mol_fail(new Error(`Wrong int8 value ${next}`));
        }
        uint8(offset, next) {
            if (next === undefined)
                return this.getUint8(offset);
            if (next >= 0 && next < 2 ** 8)
                return this.setUint8(offset, next), next;
            $mol_fail(new Error(`Wrong uint8 value ${next}`));
        }
        int16(offset, next) {
            if (next === undefined)
                return this.getInt16(offset, true);
            if (next >= -(2 ** 15) && next < 2 ** 15)
                return this.setInt16(offset, next, true), next;
            $mol_fail(new Error(`Wrong int16 value ${next}`));
        }
        uint16(offset, next) {
            if (next === undefined)
                return this.getUint16(offset, true);
            if (next >= 0 && next < 2 ** 16)
                return this.setUint16(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint16 value ${next}`));
        }
        int32(offset, next) {
            if (next === undefined)
                return this.getInt32(offset, true);
            if (next >= -(2 ** 31) && next < 2 ** 31)
                return this.setInt32(offset, next, true), next;
            $mol_fail(new Error(`Wrong int32 value ${next}`));
        }
        uint32(offset, next) {
            if (next === undefined)
                return this.getUint32(offset, true);
            if (next >= 0 && next < 2 ** 32)
                return this.setUint32(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint32 value ${next}`));
        }
        uint48(offset, next) {
            if (next === undefined)
                return this.getUint48(offset, true);
            if (next >= 0 && next < 2 ** 48)
                return this.setUint48(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint48 value ${next}`));
        }
        int64(offset, next) {
            if (next === undefined)
                return this.getBigInt64(offset, true);
            if (next >= -(2 ** 63) && next < 2 ** 63)
                return this.setBigInt64(offset, next, true), next;
            $mol_fail(new Error(`Wrong int64 value ${next}`));
        }
        uint64(offset, next) {
            if (next === undefined)
                return this.getBigUint64(offset, true);
            if (next >= 0 && next < 2 ** 64)
                return this.setBigUint64(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint64 value ${next}`));
        }
        float32(offset, next) {
            if (next !== undefined)
                this.setFloat32(offset, next, true);
            return this.getFloat32(offset, true);
        }
        float64(offset, next) {
            if (next !== undefined)
                this.setFloat64(offset, next, true);
            return this.getFloat64(offset, true);
        }
        asArray() {
            return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
        }
        toString() {
            return $mol_base64_ae_encode(this.asArray());
        }
    }
    $.$mol_buffer = $mol_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_websocket_frame_op;
    (function ($mol_websocket_frame_op) {
        $mol_websocket_frame_op[$mol_websocket_frame_op["con"] = 0] = "con";
        $mol_websocket_frame_op[$mol_websocket_frame_op["txt"] = 1] = "txt";
        $mol_websocket_frame_op[$mol_websocket_frame_op["bin"] = 2] = "bin";
        $mol_websocket_frame_op[$mol_websocket_frame_op["stop"] = 8] = "stop";
        $mol_websocket_frame_op[$mol_websocket_frame_op["ping"] = 9] = "ping";
        $mol_websocket_frame_op[$mol_websocket_frame_op["pong"] = 10] = "pong";
    })($mol_websocket_frame_op = $.$mol_websocket_frame_op || ($.$mol_websocket_frame_op = {}));
    class $mol_websocket_frame extends $mol_buffer {
        kind(next) {
            if (next) {
                this.setUint8(0, Number(next.fin) << 7 | $mol_websocket_frame_op[next.op]);
                return next;
            }
            else {
                const state = this.getUint8(0);
                const fin = state >> 7;
                const op = $mol_websocket_frame_op[state & 0b1111];
                if (op === undefined)
                    $mol_fail(new Error(`Wrong op (${state.toString(2)})`));
                return { op, fin };
            }
        }
        data(next) {
            if (next === undefined) {
                const state = this.getUint8(1);
                const mask = state >> 7;
                let size = state & 0b0111_1111;
                if (size === 126)
                    size = this.getUint16(2);
                else if (size === 127)
                    size = this.getUint32(6);
                return { size, mask };
            }
            else {
                if (next.size >= 2 ** 16) {
                    this.setUint8(1, 127 | Number(next.mask) << 7);
                    this.setUint32(6, next.size);
                }
                else if (next.size >= 126) {
                    this.setUint8(1, 126 | Number(next.mask) << 7);
                    this.setUint16(2, next.size);
                }
                else {
                    this.setUint8(1, next.size | Number(next.mask) << 7);
                }
                return next;
            }
        }
        size() {
            const short = this.getUint8(1) & 0b0111_1111;
            const mask = this.getUint8(1) >> 7;
            return (short === 127 ? 10 : short === 126 ? 4 : 2) + (mask ? 4 : 0);
        }
        mask() {
            return new Uint8Array(this.buffer, this.byteOffset + this.size() - 4, 4);
        }
        toString() {
            const { op, fin } = this.kind();
            const { size, mask } = this.data();
            return `${op}${fin ? '!' : '+'}${size}${mask ? '@' : '#'}`;
        }
        static make(op, size = 0, mask = false, fin = true) {
            const head = (size >= 2 ** 16 ? 10 : size >= 126 ? 4 : 2) + (mask ? 4 : 0);
            const frame = $mol_websocket_frame.from(head);
            frame.kind({ op, fin });
            frame.data({ size, mask });
            return frame;
        }
    }
    $.$mol_websocket_frame = $mol_websocket_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_ws_std extends $mol_rest_port_ws {
        socket;
        send_nil() {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            this.socket.send('');
        }
        send_bin(data) {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            this.socket.send(data);
        }
        send_text(data) {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            const bin = $mol_charset_encode(data);
            this.socket.send(bin);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_nil", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_text", null);
    $.$mol_rest_port_ws_std = $mol_rest_port_ws_std;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_ws_node extends $mol_rest_port_ws {
        socket;
        send_nil() {
            if (this.socket.writableEnded)
                return;
            this.socket.write($mol_websocket_frame.make('pong', 0).asArray());
        }
        send_bin(data) {
            if (this.socket.writableEnded)
                return;
            this.socket.write($mol_websocket_frame.make('bin', data.byteLength).asArray());
            this.socket.write(data);
        }
        send_text(data) {
            if (this.socket.writableEnded)
                return;
            const bin = $mol_charset_encode(data);
            this.socket.write($mol_websocket_frame.make('txt', bin.byteLength).asArray());
            this.socket.write(bin);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_node.prototype, "send_nil", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_node.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_node.prototype, "send_text", null);
    $.$mol_rest_port_ws_node = $mol_rest_port_ws_node;
    $.$mol_rest_port_ws = $mol_rest_port_ws_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let sponge = new Uint32Array(80);
    function $mol_crypto_hash(input) {
        const data = input instanceof Uint8Array
            ? input
            : new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
        const bits = data.byteLength << 3;
        const kbits = bits >> 5;
        const kword = 0x80 << (24 - bits & 0b11111);
        const bytes = 16 + (bits + 64 >>> 9 << 4);
        const klens = bytes - 1;
        const words = new Int32Array(data.buffer, data.byteOffset, data.byteLength >> 2);
        let tail = 0;
        for (let i = words.length * 4; i < data.length; ++i) {
            tail |= data[i] << (i << 3 & 0b11000);
        }
        const hash = new Int32Array([1732584193, -271733879, -1732584194, 271733878, -1009589776]);
        for (let i = 0; i < bytes; i += 16) {
            let h0 = hash[0];
            let h1 = hash[1];
            let h2 = hash[2];
            let h3 = hash[3];
            let h4 = hash[4];
            for (let j = 0; j < 16; ++j) {
                const k = i + j;
                if (k === klens) {
                    sponge[j] = bits;
                }
                else {
                    let word = k === words.length ? tail :
                        k > words.length ? 0 :
                            words[k];
                    word = word << 24 | word << 8 & 0xFF0000 | word >>> 8 & 0xFF00 | word >>> 24 & 0xFF;
                    if (k === kbits)
                        word |= kword;
                    sponge[j] = word;
                }
                const next = ((h1 & h2 | ~h1 & h3) + 1518500249 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 16; j < 20; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 & h2 | ~h1 & h3) + 1518500249 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 20; j < 40; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 ^ h2 ^ h3) + 1859775393 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 40; j < 60; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 & h2 | h1 & h3 | h2 & h3) - 1894007588 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 60; j < 80; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 ^ h2 ^ h3) - 899497514 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            hash[0] += h0;
            hash[1] += h1;
            hash[2] += h2;
            hash[3] += h3;
            hash[4] += h4;
        }
        for (let i = 0; i < 20; ++i) {
            const word = hash[i];
            hash[i] = word << 24 | word << 8 & 0xFF0000 | word >>> 8 & 0xFF00 | word >>> 24 & 0xFF;
        }
        return new Uint8Array(hash.buffer);
    }
    $.$mol_crypto_hash = $mol_crypto_hash;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_server extends $mol_object {
        port() {
            return 0;
        }
        start() {
            this.http_server();
        }
        http_server() {
            const server = $node.http.createServer((req, res) => {
                res.statusCode = 400;
                $mol_wire_async(this).http_income(req, res);
            });
            server.on('upgrade', (req, sock, head) => $mol_wire_async(this).ws_upgrade(req, sock, head));
            server.listen(this.port(), () => {
                const ifaces = Object.entries($node.os.networkInterfaces())
                    .flatMap(([type, ifaces]) => ifaces?.map(iface => iface.family === 'IPv6' ? `[${iface.address}]` : iface.address) ?? []);
                this.$.$mol_log3_done({
                    place: this,
                    message: 'HTTP Server Started',
                    links: ifaces.map(iface => `http://${iface}:${this.port()}/`),
                });
            });
            return server;
        }
        http_income(req, res) {
            const port = $mol_rest_port_http.make({ output: res });
            const msg = $mol_rest_message_http.make({ port, input: req });
            $mol_wire_sync(this.$).$mol_log3_rise({
                place: this,
                message: msg.method(),
                url: msg.uri(),
                remote: req.socket.remoteAddress + ':' + req.socket.remotePort
            });
            $mol_wire_sync(res).setHeader('Access-Control-Allow-Origin', '*');
            $mol_wire_sync(res).setHeader('Access-Control-Allow-Methods', '*');
            $mol_wire_sync(res).setHeader('Access-Control-Allow-Headers', '*');
            try {
                $mol_wire_sync(this.root()).REQUEST(msg);
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_wire_sync($$).$mol_log3_fail({
                    place: this,
                    message: error.message ?? '',
                    stack: error.stack,
                });
                $mol_wire_sync(res).writeHead(500, error.name || 'Server Error');
            }
            res.end();
        }
        ws_upgrade(req, socket, head) {
            const port = $mol_rest_port_ws_node.make({ socket });
            const upgrade = $mol_rest_message_http.make({ port, input: req });
            try {
                $mol_wire_sync(this.root()).REQUEST(upgrade.derive('OPEN', null));
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_wire_sync($$).$mol_log3_fail({
                    place: this,
                    message: error.message ?? '',
                    stack: error.stack,
                });
                socket.end();
                return;
            }
            const onclose = $mol_wire_async(() => {
                $mol_wire_sync(this.$).$mol_log3_done({
                    place: this,
                    message: 'CLOSE',
                    url: upgrade.uri(),
                    port: $mol_key(port),
                });
                try {
                    $mol_wire_sync(this.root()).REQUEST(upgrade.derive('CLOSE', null));
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    $mol_wire_sync($$).$mol_log3_fail({
                        place: this,
                        message: error.message ?? '',
                        stack: error.stack,
                    });
                    return;
                }
            });
            socket.on('end', onclose);
            socket.on('error', onclose);
            socket.on('data', (chunk) => this.ws_income(chunk, upgrade, socket));
            const key_in = req.headers["sec-websocket-key"];
            const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
            const key_out = $mol_base64_encode($mol_crypto_hash($mol_charset_encode(key_in + magic)));
            socket.write('HTTP/1.1 101 WS Handshaked\r\n' +
                'Upgrade: WebSocket\r\n' +
                'Connection: Upgrade\r\n' +
                `Sec-WebSocket-Accept: ${key_out}\r\n` +
                '\r\n');
            $mol_wire_sync(this.$).$mol_log3_come({
                place: this,
                message: 'OPEN',
                url: upgrade.uri(),
                port: $mol_key(port),
            });
        }
        _ws_income_chunks = new WeakMap;
        _ws_income_frames = new WeakMap;
        async ws_income(chunk, upgrade, sock) {
            sock.pause();
            try {
                let chunks = this._ws_income_chunks.get(sock);
                if (!chunks)
                    this._ws_income_chunks.set(sock, chunks = []);
                chunks.push(chunk);
                const patial_size = chunks.reduce((sum, buf) => sum + buf.byteLength, 0);
                let frame = $mol_websocket_frame.from(chunks[0]);
                const msg_size = frame.size() + frame.data().size;
                if (msg_size > patial_size) {
                    setTimeout(() => sock.resume());
                    return;
                }
                chunk = Buffer.alloc(patial_size);
                let offset = 0;
                for (const buf of chunks.splice(0)) {
                    chunk.set(buf, offset);
                    offset += buf.byteLength;
                }
                frame = $mol_websocket_frame.from(chunk);
                if (msg_size < chunk.byteLength) {
                    const tail = new Uint8Array(chunk.buffer, chunk.byteOffset + msg_size);
                    sock.unshift(tail);
                }
                let data = new Uint8Array(chunk.buffer, chunk.byteOffset + frame.size(), frame.data().size);
                if (frame.data().mask) {
                    const mask = frame.mask();
                    for (let i = 0; i < data.length; ++i) {
                        data[i] ^= mask[i % 4];
                    }
                }
                const op = frame.kind().op;
                if (op === 'txt')
                    data = $mol_charset_decode(data);
                let frames = this._ws_income_frames.get(sock);
                if (!frames)
                    this._ws_income_frames.set(sock, frames = []);
                if (!frame.kind().fin) {
                    frames.push(data);
                    setTimeout(() => sock.resume());
                    return;
                }
                if (frames.length) {
                    frames.push(data);
                    if (typeof frames[0] === 'string') {
                        data = frames.join('');
                    }
                    else {
                        const size = frames.reduce((s, f) => s + f.byteLength, 0);
                        data = new Uint8Array(size);
                        let offset = 0;
                        for (const frame of frames) {
                            data.set(frame, offset);
                            offset += frame.byteLength;
                        }
                    }
                    frames.length = 0;
                }
                if (op !== 'txt' && op !== 'bin' && op !== 'con') {
                    setTimeout(() => sock.resume());
                    return;
                }
                const message = upgrade.derive('POST', data);
                if (data.length !== 0) {
                    this.$.$mol_log3_rise({
                        place: this,
                        message: message.method(),
                        port: $mol_key(message.port),
                        url: message.uri(),
                        frame: frame.toString(),
                    });
                    await $mol_wire_async(this.root()).REQUEST(message);
                }
                setTimeout(() => sock.resume());
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $$.$mol_log3_fail({
                    place: this,
                    message: error.message ?? '',
                    stack: error.stack,
                });
                sock.end();
            }
        }
        root(resource) {
            $mol_wire_solid();
            return resource ?? $mol_rest_resource.make({});
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rest_server.prototype, "port", null);
    __decorate([
        $mol_mem
    ], $mol_rest_server.prototype, "start", null);
    __decorate([
        $mol_mem
    ], $mol_rest_server.prototype, "http_server", null);
    __decorate([
        $mol_action
    ], $mol_rest_server.prototype, "http_income", null);
    __decorate([
        $mol_action
    ], $mol_rest_server.prototype, "ws_upgrade", null);
    __decorate([
        $mol_mem
    ], $mol_rest_server.prototype, "root", null);
    $.$mol_rest_server = $mol_rest_server;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_resource_fs extends $mol_rest_resource {
        _root() { return $mol_file.relative(__dirname); }
        GET(msg) {
            const root = this._root();
            const file = root.resolve(msg.uri().pathname);
            if (!file.exists())
                return msg.reply(null, { code: 404 });
            switch (file.type()) {
                case 'file': {
                    return msg.reply(file.buffer(), {
                        type: $mol_file_extensions[file.ext().replace(/^.*\./, '')],
                    });
                }
                case 'dir': {
                    const index = file.resolve('./index.html');
                    if (index.exists())
                        return msg.reply(index.buffer(), { type: 'text/html' });
                    const resources = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
                    return msg.reply($mol_jsx("body", null,
                        $mol_jsx("style", null, `
							body { background: black; font: 1rem/1.5rem monospace }
							a { color: royalblue; text-decoration: none }
							a:hover { color: skyblue }
						`),
                        resources.map(res => {
                            if (res === 'constructor')
                                return null;
                            if (!/^[a-z][a-z_-]*$/.test(res))
                                return null;
                            const uri = root.resolve(res);
                            return $mol_jsx("a", { href: uri.relate(file) + '/' },
                                "/",
                                res,
                                "/",
                                $mol_jsx("br", null));
                        }),
                        $mol_jsx("a", { href: "../" },
                            "../",
                            $mol_jsx("br", null)),
                        file.sub().map(kid => {
                            const uri = kid.name() + (kid.type() === 'dir' ? '/' : '');
                            return $mol_jsx("a", { href: uri },
                                uri,
                                $mol_jsx("br", null));
                        })));
                }
            }
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_rest_resource_fs.prototype, "_root", null);
    $.$mol_rest_resource_fs = $mol_rest_resource_fs;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wire_set extends Set {
        pub = new $mol_wire_pub;
        has(value) {
            this.pub.promote();
            return super.has(value);
        }
        entries() {
            this.pub.promote();
            return super.entries();
        }
        keys() {
            this.pub.promote();
            return super.keys();
        }
        values() {
            this.pub.promote();
            return super.values();
        }
        forEach(task, self) {
            this.pub.promote();
            super.forEach(task, self);
        }
        [Symbol.iterator]() {
            this.pub.promote();
            return super[Symbol.iterator]();
        }
        get size() {
            this.pub.promote();
            return super.size;
        }
        add(value) {
            if (super.has(value))
                return this;
            super.add(value);
            this.pub.emit();
            return this;
        }
        delete(value) {
            const res = super.delete(value);
            if (res)
                this.pub.emit();
            return res;
        }
        clear() {
            if (!super.size)
                return;
            super.clear();
            this.pub.emit();
        }
        item(val, next) {
            if (next === undefined)
                return this.has(val);
            if (next)
                this.add(val);
            else
                this.delete(val);
            return next;
        }
    }
    $.$mol_wire_set = $mol_wire_set;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_data_tagged(config) {
        return config;
    }
    $.$mol_data_tagged = $mol_data_tagged;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$hyoo_crus_ref = $mol_data_tagged({ $hyoo_crus_ref: (val) => {
            if (typeof val === 'string')
                val = Symbol.for(val.replace(/_+$/, ''));
            if (/^(([a-zæA-ZÆ0-9]{8})?_){0,3}([a-zæA-ZÆ0-9]{8})?$/.test(val.description))
                return val;
            $mol_fail(new Error(`Wrong ref (${val.description})`));
        } }).$hyoo_crus_ref;
    function $hyoo_crus_ref_check(val) {
        try {
            $.$hyoo_crus_ref(val);
            return val;
        }
        catch {
            return '';
        }
    }
    $.$hyoo_crus_ref_check = $hyoo_crus_ref_check;
    function $hyoo_crus_ref_lord(ref) {
        return $.$hyoo_crus_ref(ref.description.split('_').slice(0, 2).join('_'));
    }
    $.$hyoo_crus_ref_lord = $hyoo_crus_ref_lord;
    function $hyoo_crus_ref_land(ref) {
        return $.$hyoo_crus_ref(ref.description.split('_').slice(0, 3).join('_').replace(/_$/, ''));
    }
    $.$hyoo_crus_ref_land = $hyoo_crus_ref_land;
    function $hyoo_crus_ref_peer(ref) {
        return ref.description.split('_')[0] ?? '';
    }
    $.$hyoo_crus_ref_peer = $hyoo_crus_ref_peer;
    function $hyoo_crus_ref_area(ref) {
        return ref.description.split('_')[2] ?? '';
    }
    $.$hyoo_crus_ref_area = $hyoo_crus_ref_area;
    function $hyoo_crus_ref_head(ref) {
        return ref.description.split('_')[3] ?? '';
    }
    $.$hyoo_crus_ref_head = $hyoo_crus_ref_head;
    function $hyoo_crus_ref_encode(ref) {
        return $mol_base64_ae_decode((ref.description || '_')
            .split('_')
            .map(numb => numb || 'AAAAAAAA')
            .join(''));
    }
    $.$hyoo_crus_ref_encode = $hyoo_crus_ref_encode;
    function $hyoo_crus_ref_decode(bin) {
        return $.$hyoo_crus_ref([...$mol_base64_ae_encode(bin).match(/(.{8})/g) ?? []]
            .map(numb => numb === 'AAAAAAAA' ? '' : numb)
            .join('_').replace(/_+$/, ''));
    }
    $.$hyoo_crus_ref_decode = $hyoo_crus_ref_decode;
    function $hyoo_crus_ref_relate(base, ref) {
        base = $hyoo_crus_ref_land(base);
        if ($hyoo_crus_ref_land(ref) !== base)
            return ref;
        const head = $hyoo_crus_ref_head(ref);
        return $.$hyoo_crus_ref(head ? '___' + head : '');
    }
    $.$hyoo_crus_ref_relate = $hyoo_crus_ref_relate;
    function $hyoo_crus_ref_resolve(base, ref) {
        if (!ref.description)
            return $hyoo_crus_ref_land(base);
        if (!ref.description.startsWith('___'))
            return ref;
        const parts = base.description.split('_').slice(0, 3);
        while (parts.length < 3)
            parts.push('');
        parts.push(ref.description.slice(3));
        return $.$hyoo_crus_ref(parts.join('_'));
    }
    $.$hyoo_crus_ref_resolve = $hyoo_crus_ref_resolve;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_time_base {
        static patterns = {};
        static formatter(pattern) {
            if (this.patterns[pattern])
                return this.patterns[pattern];
            var tokens = Object.keys(this.patterns)
                .sort()
                .reverse()
                .map((token) => token.replace(/([-+*.\[\]()\^])/g, '\\$1'));
            var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
            var funcs = [];
            pattern.replace(lexer, (str, text, token) => {
                if (text)
                    funcs.push(() => text);
                if (token)
                    funcs.push(this.patterns[token]);
                return str;
            });
            return this.patterns[pattern] = (arg) => {
                return funcs.reduce((res, func) => res + func(arg), '');
            };
        }
        toString(pattern) {
            const Base = this.constructor;
            const formatter = Base.formatter(pattern);
            return formatter(this);
        }
    }
    $.$mol_time_base = $mol_time_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_time_duration extends $mol_time_base {
        constructor(config = 0) {
            super();
            if (typeof config === 'number') {
                if (!Number.isFinite(config))
                    throw new RangeError(`Wrong ms count`);
                this.second = config / 1000;
                return;
            }
            if (typeof config === 'string') {
                if (config === 'Z') {
                    this.hour = 0;
                    this.minute = 0;
                    return;
                }
                duration: {
                    const parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                    const found = parser.exec(config);
                    if (!found)
                        break duration;
                    if (found[1])
                        this.year = Number(found[1]);
                    if (found[2])
                        this.month = Number(found[2]);
                    if (found[3])
                        this.day = Number(found[3]);
                    if (found[4])
                        this.hour = Number(found[4]);
                    if (found[5])
                        this.minute = Number(found[5]);
                    if (found[6])
                        this.second = Number(found[6]);
                    return;
                }
                offset: {
                    var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                    var found = parser.exec(config);
                    if (!found)
                        break offset;
                    if (found[1])
                        this.hour = Number(found[1]);
                    if (found[2])
                        this.minute = Number(found[2]);
                    return;
                }
                throw new Error(`Can not parse time duration (${config})`);
            }
            this.year = config.year || 0;
            this.month = config.month || 0;
            this.day = config.day || 0;
            this.hour = config.hour || 0;
            this.minute = config.minute || 0;
            this.second = config.second || 0;
        }
        year = 0;
        month = 0;
        day = 0;
        hour = 0;
        minute = 0;
        second = 0;
        get normal() {
            let second = this.second ?? 0;
            let minute = this.minute ?? 0;
            let hour = this.hour ?? 0;
            let day = this.day ?? 0;
            minute += Math.floor(second / 60);
            second = second % 60;
            hour += Math.floor(minute / 60);
            minute = minute % 60;
            day += Math.floor(hour / 24);
            hour = hour % 24;
            return new $mol_time_duration({
                year: this.year,
                month: this.month,
                day: day,
                hour: hour,
                minute: minute,
                second: second,
            });
        }
        summ(config) {
            const duration = new $mol_time_duration(config);
            return new $mol_time_duration({
                year: this.year + duration.year,
                month: this.month + duration.month,
                day: this.day + duration.day,
                hour: this.hour + duration.hour,
                minute: this.minute + duration.minute,
                second: this.second + duration.second,
            });
        }
        mult(numb) {
            return new $mol_time_duration({
                year: this.year && this.year * numb,
                month: this.month && this.month * numb,
                day: this.day && this.day * numb,
                hour: this.hour && this.hour * numb,
                minute: this.minute && this.minute * numb,
                second: this.second && this.second * numb,
            });
        }
        count(config) {
            const duration = new $mol_time_duration(config);
            return this.valueOf() / duration.valueOf();
        }
        valueOf() {
            var day = this.year * 365 + this.month * 30.4 + this.day;
            var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
            return second * 1000;
        }
        toJSON() { return this.toString(); }
        toString(pattern = 'P#Y#M#DT#h#m#s') {
            return super.toString(pattern);
        }
        [Symbol.toPrimitive](mode) {
            return mode === 'number' ? this.valueOf() : this.toString();
        }
        static patterns = {
            '#Y': (duration) => {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': (duration) => {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': (duration) => {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': (duration) => {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': (duration) => {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': (duration) => {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
            'hh': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(100 + moment.hour).slice(1);
            },
            'h': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return ':' + $mol_time_moment.patterns['mm'](moment);
            },
            'mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(100 + moment.minute).slice(1);
            },
            'm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': (moment) => {
                if (moment.second == null)
                    return '';
                return ':' + $mol_time_moment.patterns['ss'](moment);
            },
            'ss': (moment) => {
                if (moment.second == null)
                    return '';
                return String(100 + moment.second | 0).slice(1);
            },
            's': (moment) => {
                if (moment.second == null)
                    return '';
                return String(moment.second | 0);
            },
            '.sss': (moment) => {
                if (moment.second == null)
                    return '';
                return '.' + $mol_time_moment.patterns['sss'](moment);
            },
            'sss': (moment) => {
                if (moment.second == null)
                    return '';
                const millisecond = (moment.second - Math.trunc(moment.second)).toFixed(3);
                return millisecond.slice(2);
            },
        };
    }
    $.$mol_time_duration = $mol_time_duration;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_time_moment_weekdays;
    (function ($mol_time_moment_weekdays) {
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["monday"] = 0] = "monday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["tuesday"] = 1] = "tuesday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["wednesday"] = 2] = "wednesday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["thursday"] = 3] = "thursday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["friday"] = 4] = "friday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["saturday"] = 5] = "saturday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["sunday"] = 6] = "sunday";
    })($mol_time_moment_weekdays = $.$mol_time_moment_weekdays || ($.$mol_time_moment_weekdays = {}));
    function numb(str, max) {
        const numb = Number(str);
        if (numb < max)
            return numb;
        $mol_fail(new Error(`Wrong time component ${str}`));
    }
    class $mol_time_moment extends $mol_time_base {
        constructor(config = new Date) {
            super();
            if (typeof config === 'number') {
                config = new Date(config);
                if (Number.isNaN(config.valueOf()))
                    throw new RangeError(`Wrong ms count`);
            }
            if (typeof config === 'string') {
                const parsed = /^(?:(\d\d?\d?\d?)(?:-?(\d\d?)(?:-?(\d\d?))?)?)?(?:[T ](?:(\d\d?)(?::?(\d\d?)(?::?(\d\d?(?:\.\d+)?))?)?)?(Z|[\+\-]\d\d?(?::?(?:\d\d?)?)?)?)?$/.exec(config);
                if (!parsed)
                    throw new Error(`Can not parse time moment (${config})`);
                if (parsed[1])
                    this.year = numb(parsed[1], 9999);
                if (parsed[2])
                    this.month = numb(parsed[2], 13) - 1;
                if (parsed[3])
                    this.day = numb(parsed[3], 32) - 1;
                if (parsed[4])
                    this.hour = numb(parsed[4], 60);
                if (parsed[5])
                    this.minute = numb(parsed[5], 60);
                if (parsed[6])
                    this.second = numb(parsed[6], 60);
                if (parsed[7])
                    this.offset = new $mol_time_duration(parsed[7]);
                return;
            }
            if (config instanceof Date) {
                this.year = config.getFullYear();
                this.month = config.getMonth();
                this.day = config.getDate() - 1;
                this.hour = config.getHours();
                this.minute = config.getMinutes();
                this.second = config.getSeconds() + config.getMilliseconds() / 1000;
                const offset = -config.getTimezoneOffset();
                this.offset = new $mol_time_duration({
                    hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                    minute: offset % 60
                });
                return;
            }
            this.year = config.year;
            this.month = config.month;
            this.day = config.day;
            this.hour = config.hour;
            this.minute = config.minute;
            this.second = config.second;
            this.offset = config.offset == null ? config.offset : new $mol_time_duration(config.offset);
        }
        year;
        month;
        day;
        hour;
        minute;
        second;
        offset;
        get weekday() {
            return (this.native.getDay() + 6) % 7;
        }
        _native;
        get native() {
            if (this._native)
                return this._native;
            const second = Math.floor(this.second ?? 0);
            const native = new Date(this.year ?? 0, this.month ?? 0, (this.day ?? 0) + 1, this.hour ?? 0, this.minute ?? 0, second, Math.floor(((this.second ?? 0) - second) * 1000));
            const offset = -native.getTimezoneOffset();
            shift: if (this.offset) {
                const target = this.offset.count('PT1m');
                if (target === offset)
                    break shift;
                native.setMinutes(native.getMinutes() + offset - target);
            }
            return this._native = native;
        }
        _normal;
        get normal() {
            if (this._normal)
                return this._normal;
            const moment = new $mol_time_moment(this.native).toOffset(this.offset);
            return this._normal = new $mol_time_moment({
                year: this.year === undefined ? undefined : moment.year,
                month: this.month === undefined ? undefined : moment.month,
                day: this.day === undefined ? undefined : moment.day,
                hour: this.hour === undefined ? undefined : moment.hour,
                minute: this.minute === undefined ? undefined : moment.minute,
                second: this.second === undefined ? undefined : moment.second,
                offset: this.offset === undefined ? undefined : moment.offset,
            });
        }
        merge(config) {
            const moment = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: moment.year === undefined ? this.year : moment.year,
                month: moment.month === undefined ? this.month : moment.month,
                day: moment.day === undefined ? this.day : moment.day,
                hour: moment.hour === undefined ? this.hour : moment.hour,
                minute: moment.minute === undefined ? this.minute : moment.minute,
                second: moment.second === undefined ? this.second : moment.second,
                offset: moment.offset === undefined ? this.offset : moment.offset,
            });
        }
        shift(config) {
            const duration = new $mol_time_duration(config);
            const moment = new $mol_time_moment().merge({
                year: this.year ?? 0,
                month: this.month ?? 0,
                day: this.day ?? 0,
                hour: this.hour ?? 0,
                minute: this.minute ?? 0,
                second: this.second ?? 0,
                offset: this.offset ?? 0
            });
            const second = moment.second + (duration.second ?? 0);
            const native = new Date(moment.year + (duration.year ?? 0), moment.month + (duration.month ?? 0), moment.day + 1 + (duration.day ?? 0), moment.hour + (duration.hour ?? 0), moment.minute + (duration.minute ?? 0), Math.floor(second), (second - Math.floor(second)) * 1000);
            if (isNaN(native.valueOf()))
                throw new Error('Wrong time');
            return new $mol_time_moment({
                year: this.year === undefined ? undefined : native.getFullYear(),
                month: this.month === undefined ? undefined : native.getMonth(),
                day: this.day === undefined ? undefined : native.getDate() - 1,
                hour: this.hour === undefined ? undefined : native.getHours(),
                minute: this.minute === undefined ? undefined : native.getMinutes(),
                second: this.second === undefined ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
                offset: this.offset,
            });
        }
        mask(config) {
            const mask = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: mask.year === undefined ? undefined : this.year,
                month: mask.month === undefined ? undefined : this.month,
                day: mask.day === undefined ? undefined : this.day,
                hour: mask.hour === undefined ? undefined : this.hour,
                minute: mask.minute === undefined ? undefined : this.minute,
                second: mask.second === undefined ? undefined : this.second,
                offset: mask.offset === undefined ? undefined : this.offset,
            });
        }
        toOffset(config = new $mol_time_moment().offset) {
            const duration = new $mol_time_duration(config);
            const offset = this.offset || new $mol_time_moment().offset;
            let with_time = new $mol_time_moment('0001-01-01T00:00:00').merge(this);
            const moment = with_time.shift(duration.summ(offset.mult(-1)));
            return moment.merge({ offset: duration });
        }
        valueOf() { return this.native.getTime(); }
        toJSON() { return this.toString(); }
        toString(pattern = 'YYYY-MM-DDThh:mm:ss.sssZ') {
            return super.toString(pattern);
        }
        [Symbol.toPrimitive](mode) {
            return mode === 'number' ? this.valueOf() : this.toString();
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_accent(this.toString('YYYY-MM-DD hh:mm:ss.sss Z')));
        }
        static patterns = {
            'YYYY': (moment) => {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': (moment) => {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': (moment) => {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': (pattern => (moment) => {
                if (moment.month == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { month: 'long' })),
            'DD Month': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['DD'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Month'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'long' })),
            'D Month': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['D'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Month'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' })),
            'Mon': (pattern => (moment) => {
                if (moment.month == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { month: 'short' })),
            'DD Mon': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['DD'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Mon'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short' })),
            'D Mon': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['D'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Mon'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' })),
            '-MM': (moment) => {
                if (moment.month == null)
                    return '';
                return '-' + $mol_time_moment.patterns['MM'](moment);
            },
            'MM': (moment) => {
                if (moment.month == null)
                    return '';
                return String(100 + moment.month + 1).slice(1);
            },
            'M': (moment) => {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': (pattern => (moment) => {
                if (moment.day == null)
                    return '';
                if (moment.month == null)
                    return '';
                if (moment.year == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { weekday: 'long' })),
            'WD': (pattern => (moment) => {
                if (moment.day == null)
                    return '';
                if (moment.month == null)
                    return '';
                if (moment.year == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { weekday: 'short' })),
            '-DD': (moment) => {
                if (moment.day == null)
                    return '';
                return '-' + $mol_time_moment.patterns['DD'](moment);
            },
            'DD': (moment) => {
                if (moment.day == null)
                    return '';
                return String(100 + moment.day + 1).slice(1);
            },
            'D': (moment) => {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': (moment) => {
                if (moment.hour == null)
                    return '';
                return 'T' + $mol_time_moment.patterns['hh'](moment);
            },
            'hh': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(100 + moment.hour).slice(1);
            },
            'h': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return ':' + $mol_time_moment.patterns['mm'](moment);
            },
            'mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(100 + moment.minute).slice(1);
            },
            'm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': (moment) => {
                if (moment.second == null)
                    return '';
                return ':' + $mol_time_moment.patterns['ss'](moment);
            },
            'ss': (moment) => {
                if (moment.second == null)
                    return '';
                return String(100 + moment.second | 0).slice(1);
            },
            's': (moment) => {
                if (moment.second == null)
                    return '';
                return String(moment.second | 0);
            },
            '.sss': (moment) => {
                if (moment.second == null)
                    return '';
                if (moment.second === (moment.second | 0))
                    return '';
                return '.' + $mol_time_moment.patterns['sss'](moment);
            },
            'sss': (moment) => {
                if (moment.second == null)
                    return '';
                const millisecond = (moment.second - Math.trunc(moment.second)).toFixed(3);
                return millisecond.slice(2);
            },
            'Z': (moment) => {
                const offset = moment.offset;
                if (!offset)
                    return '';
                let hour = offset.hour;
                let sign = '+';
                if (hour < 0) {
                    sign = '-';
                    hour = -hour;
                }
                return sign + String(100 + hour).slice(1) + ':' + String(100 + offset.minute).slice(1);
            }
        };
    }
    $.$mol_time_moment = $mol_time_moment;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $hyoo_crus_time_moment(time) {
        const stamp = Math.floor(time / 65536) * 1000;
        return new $mol_time_moment(stamp);
    }
    $.$hyoo_crus_time_moment = $hyoo_crus_time_moment;
    function $hyoo_crus_time_tick(time) {
        return time % 65536;
    }
    $.$hyoo_crus_time_tick = $hyoo_crus_time_tick;
    function $hyoo_crus_time_dump(time) {
        return $hyoo_crus_time_moment(time).toString('YYYY-MM-DD hh:mm:ss')
            + ' @' + $hyoo_crus_time_tick(time);
    }
    $.$hyoo_crus_time_dump = $hyoo_crus_time_dump;
    function $hyoo_crus_time_now() {
        return now || Math.floor(Date.now() / 1000) * 65536;
    }
    $.$hyoo_crus_time_now = $hyoo_crus_time_now;
    let now = 0;
    function $hyoo_crus_time_freeze(task) {
        if (now)
            return task();
        now = $hyoo_crus_time_now();
        try {
            return task();
        }
        finally {
            now = 0;
        }
    }
    $.$hyoo_crus_time_freeze = $hyoo_crus_time_freeze;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_face_map extends Map {
        last_time = 0;
        total = 0;
        constructor(entries) {
            super();
            if (entries)
                this.sync(entries);
        }
        sync(right) {
            if (right instanceof $hyoo_crus_face_map)
                this.total = right.total;
            for (const [peer, time] of right)
                this.time_max(peer, time);
        }
        time_max(peer, time) {
            if (this.last_time < time)
                this.last_time = time;
            let prev = this.get(peer) ?? 0;
            if (prev < time)
                this.set(peer, time);
        }
        tick() {
            return this.last_time = Math.max(this.last_time + 1, $hyoo_crus_time_now());
        }
        last_moment() {
            return $hyoo_crus_time_moment(this.last_time);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), $mol_dev_format_shade(' ', $hyoo_crus_time_dump(this.last_time)), $mol_dev_format_shade(' #', this.total));
        }
    }
    __decorate([
        $mol_action
    ], $hyoo_crus_face_map.prototype, "tick", null);
    $.$hyoo_crus_face_map = $hyoo_crus_face_map;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $hyoo_crus_part;
    (function ($hyoo_crus_part) {
        $hyoo_crus_part[$hyoo_crus_part["land"] = 3] = "land";
        $hyoo_crus_part[$hyoo_crus_part["face"] = 11] = "face";
        $hyoo_crus_part[$hyoo_crus_part["pass"] = 255] = "pass";
        $hyoo_crus_part[$hyoo_crus_part["gift"] = 247] = "gift";
        $hyoo_crus_part[$hyoo_crus_part["sand"] = 8] = "sand";
        $hyoo_crus_part[$hyoo_crus_part["rock"] = 5] = "rock";
        $hyoo_crus_part[$hyoo_crus_part["root"] = 1] = "root";
        $hyoo_crus_part[$hyoo_crus_part["buck"] = 9] = "buck";
    })($hyoo_crus_part = $.$hyoo_crus_part || ($.$hyoo_crus_part = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_data_setup(value, config) {
        return Object.assign(value, {
            config,
            Value: null
        });
    }
    $.$mol_data_setup = $mol_data_setup;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_func_is_class(func) {
        return Object.getOwnPropertyDescriptor(func, 'prototype')?.writable === false;
    }
    $.$mol_func_is_class = $mol_func_is_class;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_data_pipe(...funcs) {
        return $mol_data_setup(function (input) {
            let value = input;
            for (const func of funcs)
                value = $mol_func_is_class(func) ? new func(value) : func.call(this, value);
            return value;
        }, { funcs });
    }
    $.$mol_data_pipe = $mol_data_pipe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_data_error extends $mol_error_mix {
    }
    $.$mol_data_error = $mol_data_error;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_data_number = (val) => {
        if (typeof val === 'number')
            return val;
        return $mol_fail(new $mol_data_error(`${val} is not a number`));
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_data_integer(val) {
        const val2 = $mol_data_number(val);
        if (Math.floor(val2) === val2)
            return val2;
        return $mol_fail(new $mol_data_error(`${val} is not an integer`));
    }
    $.$mol_data_integer = $mol_data_integer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$hyoo_crus_rank = $mol_data_tagged({
        $hyoo_crus_rank: $mol_data_pipe($mol_data_integer, (rank) => {
            if (rank >= $.$hyoo_crus_rank_deny && rank <= $.$hyoo_crus_rank_rule)
                return rank;
            $mol_fail(new $mol_data_error(`${rank} is out of Ran range`));
        }),
    }).$hyoo_crus_rank;
    function $hyoo_crus_rank_make(tier, fame) {
        return ($hyoo_crus_rank_tier[tier] | $hyoo_crus_rank_rate[fame]);
    }
    $.$hyoo_crus_rank_make = $hyoo_crus_rank_make;
    let $hyoo_crus_rank_tier;
    (function ($hyoo_crus_rank_tier) {
        $hyoo_crus_rank_tier[$hyoo_crus_rank_tier["deny"] = 0] = "deny";
        $hyoo_crus_rank_tier[$hyoo_crus_rank_tier["read"] = 16] = "read";
        $hyoo_crus_rank_tier[$hyoo_crus_rank_tier["join"] = 48] = "join";
        $hyoo_crus_rank_tier[$hyoo_crus_rank_tier["post"] = 112] = "post";
        $hyoo_crus_rank_tier[$hyoo_crus_rank_tier["rule"] = 240] = "rule";
    })($hyoo_crus_rank_tier = $.$hyoo_crus_rank_tier || ($.$hyoo_crus_rank_tier = {}));
    let $hyoo_crus_rank_rate;
    (function ($hyoo_crus_rank_rate) {
        $hyoo_crus_rank_rate[$hyoo_crus_rank_rate["late"] = 0] = "late";
        $hyoo_crus_rank_rate[$hyoo_crus_rank_rate["long"] = 3] = "long";
        $hyoo_crus_rank_rate[$hyoo_crus_rank_rate["slow"] = 7] = "slow";
        $hyoo_crus_rank_rate[$hyoo_crus_rank_rate["fast"] = 11] = "fast";
        $hyoo_crus_rank_rate[$hyoo_crus_rank_rate["just"] = 15] = "just";
    })($hyoo_crus_rank_rate = $.$hyoo_crus_rank_rate || ($.$hyoo_crus_rank_rate = {}));
    $.$hyoo_crus_rank_deny = $hyoo_crus_rank_make('deny', 'late');
    $.$hyoo_crus_rank_read = $hyoo_crus_rank_make('read', 'late');
    $.$hyoo_crus_rank_rule = $hyoo_crus_rank_make('rule', 'just');
    function $hyoo_crus_rank_join(rate) {
        return $hyoo_crus_rank_make('join', rate);
    }
    $.$hyoo_crus_rank_join = $hyoo_crus_rank_join;
    function $hyoo_crus_rank_post(rate) {
        return $hyoo_crus_rank_make('post', rate);
    }
    $.$hyoo_crus_rank_post = $hyoo_crus_rank_post;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_url_encode(buffer) {
        return $mol_base64_encode(buffer).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
    $.$mol_base64_url_encode = $mol_base64_url_encode;
    function $mol_base64_url_decode(str) {
        return $mol_base64_decode(str.replace(/-/g, '+').replace(/_/g, '/'));
    }
    $.$mol_base64_url_decode = $mol_base64_url_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_crypto_native = $node.crypto.webcrypto;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const ecdsa = {
        name: 'ECDSA',
        hash: 'SHA-1',
        namedCurve: "P-256",
    };
    const ecdh = { name: "ECDH", namedCurve: "P-256" };
    const jwk = { crv: 'P-256', ext: true, kty: 'EC' };
    class $mol_crypto_key extends $mol_buffer {
        static from(serial) {
            if (typeof serial === 'string') {
                serial = new Uint8Array([
                    ...$mol_base64_url_decode(serial.slice(0, 43)),
                    ...$mol_base64_url_decode(serial.slice(43, 86)),
                    ...$mol_base64_url_decode(serial.slice(86, 129)),
                ]);
            }
            return super.from(serial);
        }
        toString() {
            const arr = this.asArray();
            return $mol_base64_url_encode(arr.subarray(0, 32))
                + $mol_base64_url_encode(arr.subarray(32, 64))
                + $mol_base64_url_encode(arr.subarray(64));
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto_key.prototype, "toString", null);
    $.$mol_crypto_key = $mol_crypto_key;
    class $mol_crypto_key_public extends $mol_crypto_key {
        static size_str = 86;
        static size_bin = 64;
        async native() {
            const str = this.toString();
            return $mol_crypto_native.subtle.importKey('jwk', {
                crv: "P-256",
                ext: true,
                key_ops: ['verify'],
                kty: "EC",
                x: str.slice(0, 43),
                y: str.slice(43, 86),
            }, ecdsa, Boolean('extractable'), ['verify']);
        }
        async native_derive() {
            const serial = this.toString();
            return await $mol_crypto_native.subtle.importKey('jwk', {
                ...jwk,
                key_ops: [],
                x: serial.slice(0, 43),
                y: serial.slice(43, 86),
            }, ecdh, true, []);
        }
        async verify(data, sign) {
            return await $mol_crypto_native.subtle.verify(ecdsa, await this.native(), sign, data);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto_key_public.prototype, "native", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto_key_public.prototype, "native_derive", null);
    $.$mol_crypto_key_public = $mol_crypto_key_public;
    class $mol_crypto_key_private extends $mol_crypto_key {
        static size_str = 129;
        static size_bin = 96;
        static size_sign = 64;
        static async generate() {
            const pair = await $mol_crypto_native.subtle.generateKey(ecdsa, Boolean('extractable'), ['sign', 'verify']);
            const { x, y, d } = await $mol_crypto_native.subtle.exportKey('jwk', pair.privateKey);
            return this.from(x + y + d);
        }
        async native() {
            const str = this.toString();
            return await $mol_crypto_native.subtle.importKey('jwk', {
                crv: "P-256",
                ext: true,
                key_ops: ['sign'],
                kty: "EC",
                x: str.slice(0, 43),
                y: str.slice(43, 86),
                d: str.slice(86, 129),
            }, ecdsa, Boolean('extractable'), ['sign']);
        }
        async native_derive() {
            const serial = this.toString();
            return $mol_crypto_native.subtle.importKey('jwk', {
                ...jwk,
                key_ops: ['deriveKey', 'deriveBits'],
                x: serial.slice(0, 43),
                y: serial.slice(43, 86),
                d: serial.slice(86, 129),
            }, ecdh, Boolean('extractable'), ['deriveKey', 'deriveBits']);
        }
        public() {
            return new $mol_crypto_key_public(this.buffer, this.byteOffset, this.byteOffset + 64);
        }
        async sign(data) {
            return new Uint8Array(await $mol_crypto_native.subtle.sign(ecdsa, await this.native(), data));
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto_key_private.prototype, "native", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto_key_private.prototype, "native_derive", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto_key_private.prototype, "public", null);
    $.$mol_crypto_key_private = $mol_crypto_key_private;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        static native() {
            return this.$.$mol_dom_context.navigator.storage ?? {
                persisted: async () => false,
                persist: async () => false,
                estimate: async () => ({}),
                getDirectory: async () => null,
            };
        }
        static persisted(next, cache) {
            $mol_mem_persist();
            if (cache)
                return Boolean(next);
            const native = this.native();
            if (next && !$mol_mem_cached(() => this.persisted())) {
                native.persist().then(actual => {
                    setTimeout(() => this.persisted(actual, 'cache'), 5000);
                    if (actual)
                        this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` });
                    else
                        this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` });
                });
            }
            return next ?? $mol_wire_sync(native).persisted();
        }
        static estimate() {
            return $mol_wire_sync(this.native() ?? {}).estimate();
        }
        static dir() {
            return $mol_wire_sync(this.native()).getDirectory();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage, "persisted", null);
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local_node extends $mol_state_local {
        static dir() {
            const base = process.env.XDG_DATA_HOME || ($node.os.homedir() + '/.local/share');
            return $mol_file.absolute(base).resolve('./mol_state_local');
        }
        static value(key, next) {
            const file = this.dir().resolve(encodeURIComponent(key) + '.json');
            if (next === null) {
                file.exists(false);
                return null;
            }
            const arg = next === undefined ? undefined : JSON.stringify(next);
            return JSON.parse(file.text(arg) || 'null');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local_node, "dir", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local_node, "value", null);
    $.$mol_state_local_node = $mol_state_local_node;
    $.$mol_state_local = $mol_state_local_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_crypto_salt() {
        return $mol_crypto_native.getRandomValues(new Uint8Array(16));
    }
    $.$mol_crypto_salt = $mol_crypto_salt;
    $.$mol_crypto_salt_once = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_crypto_sacred extends $mol_buffer {
        static size = 16;
        static make() {
            return this.from($mol_crypto_salt());
        }
        static from(serial) {
            if (typeof serial === 'string') {
                serial = new Uint8Array([
                    ...$mol_base64_url_decode(serial),
                ]);
            }
            if (!(serial instanceof Uint8Array)) {
                serial = new Uint8Array(serial.buffer, serial.byteOffset, serial.byteLength);
            }
            ;
            serial[0] = 0;
            const sacred = super.from(serial);
            return sacred;
        }
        static async from_native(native) {
            const buf = await $mol_crypto_native.subtle.exportKey('raw', native);
            const sacred = this.from(new Uint8Array(buf));
            sacred._native = native;
            return sacred;
        }
        constructor(buffer, byteOffset, byteLength) {
            super(buffer, byteOffset, byteLength);
            if (this.getUint8(0) !== 0)
                $mol_fail(new Error('Buffer should starts with 0 byte'));
        }
        toString() {
            return $mol_base64_url_encode(this.asArray());
        }
        _native;
        async native() {
            return this._native ?? (this._native = await $mol_crypto_native.subtle.importKey('raw', this, {
                name: 'AES-CBC',
                length: 128,
            }, true, ['encrypt', 'decrypt']));
        }
        async encrypt(open, salt) {
            return new Uint8Array(await $mol_crypto_native.subtle.encrypt({
                name: 'AES-CBC',
                length: 128,
                tagLength: 32,
                iv: salt,
            }, await this.native(), open));
        }
        async decrypt(closed, salt) {
            return new Uint8Array(await $mol_crypto_native.subtle.decrypt({
                name: 'AES-CBC',
                length: 128,
                tagLength: 32,
                iv: salt,
            }, await this.native(), closed));
        }
        async close(sacred, salt) {
            const buf = new Uint8Array(this.buffer, this.byteOffset + 1, this.byteLength - 1);
            return sacred.encrypt(buf, salt);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto_sacred.prototype, "toString", null);
    $.$mol_crypto_sacred = $mol_crypto_sacred;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const algorithm = {
        name: 'AES-CBC',
        length: 128,
        tagLength: 32,
    };
    class $mol_crypto_secret extends Object {
        native;
        static size = 16;
        constructor(native) {
            super();
            this.native = native;
        }
        static async generate() {
            return new this(await $mol_crypto_native.subtle.generateKey(algorithm, true, ['encrypt', 'decrypt']));
        }
        static async from(serial) {
            return new this(await $mol_crypto_native.subtle.importKey('raw', serial, algorithm, true, ['encrypt', 'decrypt']));
        }
        static async pass(pass, salt) {
            return new this(await $mol_crypto_native.subtle.deriveKey({
                name: "PBKDF2",
                salt,
                iterations: 10_000,
                hash: "SHA-256",
            }, await $mol_crypto_native.subtle.importKey("raw", $mol_charset_encode(pass), "PBKDF2", false, ["deriveKey"]), algorithm, true, ['encrypt', 'decrypt']));
        }
        static async derive(private_serial, public_serial) {
            const ecdh = { name: "ECDH", namedCurve: "P-256" };
            const jwk = { crv: 'P-256', ext: true, kty: 'EC' };
            const private_key = await $mol_crypto_native.subtle.importKey('jwk', {
                ...jwk,
                key_ops: ['deriveKey'],
                x: private_serial.slice(0, 43),
                y: private_serial.slice(43, 86),
                d: private_serial.slice(86, 129),
            }, ecdh, true, ['deriveKey']);
            const public_key = await $mol_crypto_native.subtle.importKey('jwk', {
                ...jwk,
                key_ops: [],
                x: public_serial.slice(0, 43),
                y: public_serial.slice(43, 86),
            }, ecdh, true, []);
            const secret = await $mol_crypto_native.subtle.deriveKey({
                name: "ECDH",
                public: public_key,
            }, private_key, algorithm, true, ["encrypt", "decrypt"]);
            return new this(secret);
        }
        async serial() {
            return new Uint8Array(await $mol_crypto_native.subtle.exportKey('raw', this.native));
        }
        async encrypt(open, salt) {
            return new Uint8Array(await $mol_crypto_native.subtle.encrypt({
                ...algorithm,
                iv: salt,
            }, this.native, open));
        }
        async decrypt(closed, salt) {
            return new Uint8Array(await $mol_crypto_native.subtle.decrypt({
                ...algorithm,
                iv: salt,
            }, this.native, closed));
        }
    }
    $.$mol_crypto_secret = $mol_crypto_secret;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_auth extends $mol_crypto_key_private {
        static current(next) {
            $mol_wire_solid();
            if (next === undefined) {
                const key = String($mol_state_local.value('$hyoo_crus_auth') ?? '');
                if (key)
                    return $hyoo_crus_auth.from(key);
            }
            if (!next)
                next = this.grab();
            $mol_state_local.value('$hyoo_crus_auth', next.toString());
            return next;
        }
        static embryos = [];
        static grab() {
            if (this.embryos.length)
                return this.from(this.embryos.pop());
            return $mol_wire_sync(this).generate();
        }
        static async generate() {
            for (let i = 0; i < 4096; ++i) {
                const auth = await super.generate();
                if (auth.uint8(0) !== $hyoo_crus_unit_kind.pass)
                    continue;
                return this.from(auth);
            }
            $mol_fail(new Error(`Too long key generation`));
        }
        lord() {
            return $hyoo_crus_ref_decode(new Uint8Array(this.buffer, 2, 12));
        }
        peer() {
            return $mol_base64_ae_encode(new Uint8Array(this.buffer, 2, 6));
        }
        secret_mutual(pub) {
            return $mol_wire_sync($mol_crypto_secret).derive(this.toString(), pub.toString());
        }
    }
    __decorate([
        $mol_memo.method
    ], $hyoo_crus_auth.prototype, "lord", null);
    __decorate([
        $mol_memo.method
    ], $hyoo_crus_auth.prototype, "peer", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_auth.prototype, "secret_mutual", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_auth, "current", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_auth, "grab", null);
    $.$hyoo_crus_auth = $hyoo_crus_auth;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wire_dict extends Map {
        pub = new $mol_wire_pub;
        has(key) {
            this.pub.promote();
            return super.has(key);
        }
        get(key) {
            this.pub.promote();
            return super.get(key);
        }
        entries() {
            this.pub.promote();
            return super.entries();
        }
        keys() {
            this.pub.promote();
            return super.keys();
        }
        values() {
            this.pub.promote();
            return super.values();
        }
        forEach(task, self) {
            this.pub.promote();
            super.forEach(task, self);
        }
        [Symbol.iterator]() {
            this.pub.promote();
            return super[Symbol.iterator]();
        }
        get size() {
            this.pub.promote();
            return super.size;
        }
        set(key, value) {
            if (super.get(key) === value)
                return this;
            super.set(key, value);
            this.pub?.emit();
            return this;
        }
        delete(key) {
            const res = super.delete(key);
            if (res)
                this.pub.emit();
            return res;
        }
        clear() {
            if (!super.size)
                return;
            super.clear();
            this.pub.emit();
        }
        item(key, next) {
            if (next === undefined)
                return this.get(key) ?? null;
            if (next === null)
                this.delete(key);
            else
                this.set(key, next);
            return next;
        }
    }
    $.$mol_wire_dict = $mol_wire_dict;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_node extends $mol_object {
        static tag = 'vals';
        land() {
            return null;
        }
        head() {
            return '';
        }
        land_ref() {
            return this.land()?.ref() ?? this.$.$hyoo_crus_auth.current().lord();
        }
        ref() {
            return $hyoo_crus_ref_resolve(this.land_ref(), $hyoo_crus_ref('___' + this.head()));
        }
        toJSON() {
            return this.ref().description;
        }
        cast(Node) {
            return this.land().Node(Node).Item(this.head());
        }
        nodes(Node) {
            const land = this.land();
            const map = {
                term: () => land.Node(Node || $hyoo_crus_atom_vary),
                solo: () => land.Node(Node || $hyoo_crus_atom_vary),
                vals: () => land.Node(Node || $hyoo_crus_list_vary),
                keys: () => land.Node(Node || $hyoo_crus_dict),
            };
            return this.units().map(unit => map[unit.tag()]().Item(unit.self()));
        }
        units() {
            return this.units_of('');
        }
        units_of(peer) {
            return this.land().sand_ordered({ head: this.head(), peer }).filter(unit => unit.tip() !== 'nil');
        }
        filled() {
            return this.units().length > 0;
        }
        can_change() {
            return this.land().lord_rank(this.land().auth().lord()) >= $hyoo_crus_rank_tier.join;
        }
        last_change() {
            const land = this.land();
            let last = 0;
            const visit = (sand) => {
                if (sand.time() > last)
                    last = sand.time();
                if (sand.tag() === 'term')
                    return;
                land.Node($hyoo_crus_node).Item(sand.self()).units().forEach(visit);
            };
            this.units().forEach(visit);
            return last ? $hyoo_crus_time_moment(last) : null;
        }
        author_peers() {
            const land = this.land();
            const peers = new Set();
            const visit = (sand) => {
                peers.add(sand.peer());
                if (sand.tag() === 'term')
                    return;
                land.Node($hyoo_crus_node).Item(sand.self()).units_of(null).forEach(visit);
            };
            this.units_of(null).forEach(visit);
            return [...peers];
        }
        author_lords() {
            const land = this.land();
            return this.author_peers()
                .map(peer => land.pass.get(peer)?.lord())
                .filter($mol_guard_defined);
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head());
        }
    }
    __decorate([
        $mol_memo.method
    ], $hyoo_crus_node.prototype, "ref", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_node.prototype, "cast", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_node.prototype, "nodes", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_node.prototype, "units_of", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_node.prototype, "last_change", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_node.prototype, "author_peers", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_node.prototype, "author_lords", null);
    $.$hyoo_crus_node = $hyoo_crus_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_fund extends $mol_object {
        item_make;
        constructor(item_make) {
            super();
            this.item_make = item_make;
        }
        Item(head) {
            return this.item_make(head);
        }
    }
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_fund.prototype, "Item", null);
    $.$hyoo_crus_fund = $hyoo_crus_fund;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_graph {
        nodes = new Set();
        edges_out = new Map();
        edges_in = new Map();
        link(from, to, edge) {
            this.link_out(from, to, edge);
            this.link_in(to, from, edge);
        }
        unlink(from, to) {
            this.edges_in.get(to)?.delete(from);
            this.edges_out.get(from)?.delete(to);
        }
        link_out(from, to, edge) {
            let pair = this.edges_out.get(from);
            if (!pair) {
                pair = new Map();
                this.edges_out.set(from, pair);
                this.nodes.add(from);
            }
            pair.set(to, edge);
            this.nodes.add(to);
        }
        link_in(to, from, edge) {
            let pair = this.edges_in.get(to);
            if (!pair) {
                pair = new Map();
                this.edges_in.set(to, pair);
                this.nodes.add(to);
            }
            pair.set(from, edge);
            this.nodes.add(to);
        }
        edge(from, to) {
            return this.edge_out(from, to) ?? this.edge_in(to, from);
        }
        edge_out(from, to) {
            return this.edges_out.get(from)?.get(to) ?? null;
        }
        edge_in(to, from) {
            return this.edges_in.get(to)?.get(from) ?? null;
        }
        acyclic(get_weight) {
            const checked = [];
            for (const start of this.nodes) {
                const path = [];
                const visit = (from) => {
                    if (checked.includes(from))
                        return Number.MAX_SAFE_INTEGER;
                    const index = path.lastIndexOf(from);
                    if (index > -1) {
                        const cycle = path.slice(index);
                        return cycle.reduce((weight, node, index) => Math.min(weight, get_weight(this.edge_out(node, cycle[(index + 1) % cycle.length]))), Number.MAX_SAFE_INTEGER);
                    }
                    path.push(from);
                    dive: try {
                        const deps = this.edges_out.get(from);
                        if (!deps)
                            break dive;
                        for (const [to, edge] of deps) {
                            if (to === from) {
                                this.unlink(from, to);
                                continue;
                            }
                            const weight_out = get_weight(edge);
                            const min = visit(to);
                            if (weight_out > min)
                                return min;
                            if (weight_out === min) {
                                this.unlink(from, to);
                                if (path.length > 1) {
                                    const enter = path[path.length - 2];
                                    this.link(enter, to, edge);
                                }
                            }
                        }
                    }
                    finally {
                        path.pop();
                    }
                    checked.push(from);
                    return Number.MAX_SAFE_INTEGER;
                };
                visit(start);
            }
        }
        get sorted() {
            const sorted = new Set();
            const visit = (node) => {
                if (sorted.has(node))
                    return;
                const deps = this.edges_out.get(node);
                if (deps) {
                    for (const [dep] of deps)
                        visit(dep);
                }
                sorted.add(node);
            };
            for (const node of this.nodes) {
                visit(node);
            }
            return sorted;
        }
        get roots() {
            const roots = [];
            for (const node of this.nodes) {
                if (this.edges_in.get(node)?.size)
                    continue;
                roots.push(node);
            }
            return roots;
        }
        nodes_depth(select) {
            const stat = new Map();
            const visit = (node, depth = 0) => {
                if (stat.has(node))
                    stat.set(node, select(depth, stat.get(node)));
                else
                    stat.set(node, depth);
                for (const kid of this.edges_out.get(node)?.keys() ?? [])
                    visit(kid, depth + 1);
            };
            for (const root of this.roots)
                visit(root);
            return stat;
        }
        depth_nodes(select) {
            const groups = [];
            for (const [node, depth] of this.nodes_depth(select).entries()) {
                if (groups[depth])
                    groups[depth].push(node);
                else
                    groups[depth] = [node];
            }
            return groups;
        }
    }
    $.$mol_graph = $mol_graph;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_time_interval extends $mol_time_base {
        constructor(config) {
            super();
            if (typeof config === 'string') {
                var chunks = config.split('/');
                if (chunks[0]) {
                    if (chunks[0][0].toUpperCase() === 'P') {
                        this._duration = new $mol_time_duration(chunks[0]);
                    }
                    else {
                        this._start = new $mol_time_moment(chunks[0]);
                    }
                }
                else {
                    this._start = new $mol_time_moment();
                }
                if (chunks[1]) {
                    if (chunks[1][0].toUpperCase() === 'P') {
                        this._duration = new $mol_time_duration(chunks[1]);
                    }
                    else {
                        this._end = new $mol_time_moment(chunks[1]);
                    }
                }
                else {
                    this._end = new $mol_time_moment();
                }
                return;
            }
            if (config.start !== undefined)
                this._start = new $mol_time_moment(config.start);
            if (config.end !== undefined)
                this._end = new $mol_time_moment(config.end);
            if (config.duration !== undefined)
                this._duration = new $mol_time_duration(config.duration);
        }
        _start;
        get start() {
            if (this._start)
                return this._start;
            return this._start = this._end.shift(this._duration.mult(-1));
        }
        _end;
        get end() {
            if (this._end)
                return this._end;
            return this._end = this._start.shift(this._duration);
        }
        _duration;
        get duration() {
            if (this._duration)
                return this._duration;
            return this._duration = new $mol_time_duration(this._end.valueOf() - this._start.valueOf());
        }
        toJSON() { return this.toString(); }
        toString() {
            return (this._start || this._duration || '').toString() + '/' + (this._end || this._duration || '').toString();
        }
        [Symbol.toPrimitive](mode) {
            return this.toString();
        }
    }
    $.$mol_time_interval = $mol_time_interval;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$hyoo_crus_vary_mapping = {
        nil: null,
        bin: Uint8Array,
        bool: Boolean,
        int: BigInt,
        real: Number,
        ints: BigInt64Array,
        reals: Float64Array,
        ref: Symbol,
        str: String,
        time: $mol_time_moment,
        dur: $mol_time_duration,
        range: $mol_time_interval,
        json: Object,
        jsan: Array,
        dom: $mol_dom_context.Element,
        tree: $mol_tree2,
    };
    let $hyoo_crus_vary_tip;
    (function ($hyoo_crus_vary_tip) {
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["nil"] = 1] = "nil";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["bin"] = 2] = "bin";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["bool"] = 3] = "bool";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["int"] = 4] = "int";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["real"] = 5] = "real";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["ints"] = 6] = "ints";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["reals"] = 7] = "reals";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["ref"] = 8] = "ref";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["str"] = 16] = "str";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["time"] = 17] = "time";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["dur"] = 18] = "dur";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["range"] = 19] = "range";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["json"] = 20] = "json";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["jsan"] = 21] = "jsan";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["dom"] = 22] = "dom";
        $hyoo_crus_vary_tip[$hyoo_crus_vary_tip["tree"] = 23] = "tree";
    })($hyoo_crus_vary_tip = $.$hyoo_crus_vary_tip || ($.$hyoo_crus_vary_tip = {}));
    function $hyoo_crus_vary_switch(vary, ways) {
        if (vary === null)
            return ways.nil(vary);
        switch (typeof vary) {
            case "boolean": return ways.bool(vary);
            case "bigint": return ways.int(vary);
            case "number": return ways.real(vary);
            case "string": return ways.str(vary);
            case 'symbol': return ways.ref(vary);
        }
        switch (Reflect.getPrototypeOf(vary)) {
            case Object.prototype: return ways.json(vary);
            case Array.prototype: return ways.jsan(vary);
            case Uint8Array.prototype: return ways.bin(vary);
            case BigInt64Array.prototype: return ways.ints(vary);
            case Float64Array.prototype: return ways.reals(vary);
            case $mol_time_moment.prototype: return ways.time(vary);
            case $mol_time_duration.prototype: return ways.dur(vary);
            case $mol_time_interval.prototype: return ways.range(vary);
            case $mol_tree2.prototype: return ways.tree(vary);
        }
        if (vary instanceof $mol_dom_context.Element)
            return ways.dom(vary);
        return $mol_fail(new TypeError(`Unsupported vary type`));
    }
    $.$hyoo_crus_vary_switch = $hyoo_crus_vary_switch;
    function $hyoo_crus_vary_encode(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => ({ tip: 'nil', bin: new Uint8Array([]) }),
            bin: vary => ({ tip: 'bin', bin: vary }),
            bool: vary => ({ tip: 'bool', bin: new Uint8Array([Number(vary)]) }),
            int: vary => ({ tip: 'int', bin: new Uint8Array(new BigInt64Array([vary]).buffer) }),
            ints: vary => ({ tip: 'ints', bin: new Uint8Array(vary.buffer, vary.byteLength, vary.byteLength) }),
            real: vary => ({ tip: 'real', bin: new Uint8Array(new Float64Array([vary]).buffer) }),
            reals: vary => ({ tip: 'reals', bin: new Uint8Array(vary.buffer, vary.byteLength, vary.byteLength) }),
            ref: vary => ({ tip: 'ref', bin: $hyoo_crus_ref_encode(vary) }),
            str: vary => ({ tip: 'str', bin: $mol_charset_encode(vary) }),
            time: vary => ({ tip: 'time', bin: $mol_charset_encode(String(vary)) }),
            dur: vary => ({ tip: 'dur', bin: $mol_charset_encode(String(vary)) }),
            range: vary => ({ tip: 'range', bin: $mol_charset_encode(String(vary)) }),
            json: vary => ({ tip: 'json', bin: $mol_charset_encode(JSON.stringify(vary)) }),
            jsan: vary => ({ tip: 'jsan', bin: $mol_charset_encode(JSON.stringify(vary)) }),
            dom: vary => ({ tip: 'dom', bin: $mol_charset_encode($mol_dom_serialize(vary)) }),
            tree: vary => ({ tip: 'tree', bin: $mol_charset_encode(String(vary)) }),
        });
    }
    $.$hyoo_crus_vary_encode = $hyoo_crus_vary_encode;
    function $hyoo_crus_vary_decode({ tip, bin }) {
        switch (tip) {
            case 'nil': return null;
            case 'bin': return bin;
            case 'bool': return Boolean(bin[0]);
            case 'int': return new BigInt64Array(bin.buffer, bin.byteOffset, bin.byteLength / 8)[0];
            case 'ints': return new BigInt64Array(bin.buffer, bin.byteOffset, bin.byteLength / 8);
            case 'real': return new Float64Array(bin.buffer, bin.byteOffset, bin.byteLength / 8)[0];
            case 'reals': return new Float64Array(bin.buffer, bin.byteOffset, bin.byteLength / 8);
            case 'ref': return $hyoo_crus_ref_decode(bin);
            case 'str': return $mol_charset_decode(bin);
            case 'time': return new $mol_time_moment($mol_charset_decode(bin));
            case 'dur': return new $mol_time_duration($mol_charset_decode(bin));
            case 'range': return new $mol_time_interval($mol_charset_decode(bin));
            case 'json': return JSON.parse($mol_charset_decode(bin));
            case 'jsan': return JSON.parse($mol_charset_decode(bin));
            case 'dom': return $mol_dom_parse($mol_charset_decode(bin)).documentElement;
            case 'tree': return $$.$mol_tree2_from_string($mol_charset_decode(bin));
        }
    }
    $.$hyoo_crus_vary_decode = $hyoo_crus_vary_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_bin_to_bytes(tree) {
        return Uint8Array.from(tree.kids, kid => parseInt(kid.value, 16));
    }
    $.$mol_tree2_bin_to_bytes = $mol_tree2_bin_to_bytes;
    function $mol_tree2_bin_from_bytes(bytes, span = $mol_span.unknown) {
        return $mol_tree2.list(Array.from(bytes, code => {
            return $mol_tree2.data(code.toString(16).padStart(2, '0'), [], span);
        }), span);
    }
    $.$mol_tree2_bin_from_bytes = $mol_tree2_bin_from_bytes;
    function $mol_tree2_bin_from_string(str, span = $mol_span.unknown) {
        return $mol_tree2_bin_from_bytes([...new TextEncoder().encode(str)], span);
    }
    $.$mol_tree2_bin_from_string = $mol_tree2_bin_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_xml_from_dom(dom) {
        switch (dom.nodeType) {
            case dom.DOCUMENT_NODE: {
                let kids = [];
                for (const kid of dom.childNodes) {
                    kids.push($mol_tree2_xml_from_dom(kid));
                }
                return $mol_tree2.list(kids);
            }
            case dom.PROCESSING_INSTRUCTION_NODE: {
                return $mol_tree2.struct('?', [
                    $mol_tree2.struct(dom.nodeName, dom.nodeValue.split(' ').map(chunk => {
                        const [, name, value] = /^(.*?)(?:="(.*?)")?$/.exec(chunk);
                        const kids = value ? [$mol_tree2.data(value)] : [];
                        return $mol_tree2.struct(name, kids);
                    }))
                ]);
            }
            case dom.DOCUMENT_TYPE_NODE: {
                const dom2 = dom;
                return $mol_tree2.struct('!', [
                    $mol_tree2.struct('DOCTYPE', [
                        $mol_tree2.struct(dom2.name)
                    ])
                ]);
            }
            case dom.ELEMENT_NODE: {
                let kids = [];
                for (const attr of dom.attributes) {
                    kids.push($mol_tree2.struct('@', [
                        $mol_tree2.struct(attr.nodeName, [
                            $mol_tree2.data(attr.nodeValue)
                        ])
                    ]));
                }
                for (const kid of dom.childNodes) {
                    const k = $mol_tree2_xml_from_dom(kid);
                    if (k.type || k.value)
                        kids.push(k);
                }
                return $mol_tree2.struct(dom.nodeName, kids);
            }
            case dom.COMMENT_NODE: {
                return $mol_tree2.struct('--', [
                    $mol_tree2.data(dom.nodeValue)
                ]);
            }
            case dom.TEXT_NODE: {
                if (!dom.nodeValue.trim())
                    return $mol_tree2.list([]);
                return $mol_tree2.data(dom.nodeValue.replace(/\s+/g, ' '));
            }
        }
        return $mol_fail(new Error(`Unsupported node ${dom.nodeName}`));
    }
    $.$mol_tree2_xml_from_dom = $mol_tree2_xml_from_dom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $hyoo_crus_vary_cast_bin(vary) {
        return vary === null || vary === '' ? null : $hyoo_crus_vary_encode(vary).bin;
    }
    $.$hyoo_crus_vary_cast_bin = $hyoo_crus_vary_cast_bin;
    function $hyoo_crus_vary_cast_bool(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => Boolean(vary.length),
            bool: vary => vary,
            int: vary => Boolean(vary),
            real: vary => Boolean(vary),
            ints: vary => Boolean(vary.length),
            reals: vary => Boolean(vary.length),
            ref: vary => Boolean(vary.description),
            str: vary => Boolean(vary),
            time: vary => Boolean(vary.valueOf()),
            dur: vary => Boolean(vary.valueOf()),
            range: vary => Boolean(vary.duration.valueOf()),
            json: vary => Boolean(Reflect.ownKeys(vary).length),
            jsan: vary => Boolean(vary.length),
            dom: vary => Boolean(vary.attributes.length + vary.childNodes.length),
            tree: vary => Boolean(vary.value || vary.kids.length),
        });
    }
    $.$hyoo_crus_vary_cast_bool = $hyoo_crus_vary_cast_bool;
    function $hyoo_crus_vary_cast_int(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => BigInt(vary.length),
            bool: vary => BigInt(vary),
            int: vary => vary,
            real: vary => Number.isFinite(vary) ? BigInt(Math.trunc(vary)) : null,
            ints: vary => BigInt(vary.length),
            reals: vary => BigInt(vary.length),
            ref: vary => null,
            str: vary => {
                try {
                    return vary ? BigInt(vary) : null;
                }
                catch {
                    return null;
                }
            },
            time: vary => BigInt(vary.valueOf()),
            dur: vary => BigInt(vary.valueOf()),
            range: vary => BigInt(vary.duration.valueOf()),
            json: vary => BigInt(Reflect.ownKeys(vary).length),
            jsan: vary => BigInt(vary.length),
            dom: vary => BigInt(vary.attributes.length + vary.childNodes.length),
            tree: vary => {
                try {
                    return BigInt(vary.value);
                }
                catch {
                    return BigInt(vary.kids.length);
                }
            },
        });
    }
    $.$hyoo_crus_vary_cast_int = $hyoo_crus_vary_cast_int;
    function $hyoo_crus_vary_cast_real(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => vary.length,
            bool: vary => Number(vary),
            int: vary => Number(vary),
            real: vary => vary,
            ints: vary => vary.length,
            reals: vary => vary.length,
            ref: vary => null,
            str: vary => vary ? Number(vary) : null,
            time: vary => vary.valueOf(),
            dur: vary => vary.valueOf(),
            range: vary => vary.duration.valueOf(),
            json: vary => Reflect.ownKeys(vary).length,
            jsan: vary => vary.length,
            dom: vary => Number(vary.attributes.length + vary.childNodes.length),
            tree: vary => Number(vary.value || vary.kids.length),
        });
    }
    $.$hyoo_crus_vary_cast_real = $hyoo_crus_vary_cast_real;
    function $hyoo_crus_vary_cast_ints(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => new BigInt64Array([...vary].map(BigInt)),
            bool: vary => vary ? new BigInt64Array([1n]) : null,
            int: vary => new BigInt64Array([vary]),
            real: vary => Number.isFinite(vary) ? new BigInt64Array([BigInt(vary)]) : null,
            ints: vary => vary,
            reals: vary => new BigInt64Array([...vary].map(BigInt)),
            ref: vary => null,
            str: vary => {
                if (!vary)
                    return null;
                return new BigInt64Array(vary.split(',').map(v => BigInt(v) || 0n));
            },
            time: vary => new BigInt64Array([BigInt(vary.valueOf())]),
            dur: vary => new BigInt64Array([BigInt(vary.valueOf())]),
            range: vary => null,
            json: vary => null,
            jsan: vary => null,
            dom: vary => null,
            tree: vary => null,
        });
    }
    $.$hyoo_crus_vary_cast_ints = $hyoo_crus_vary_cast_ints;
    function $hyoo_crus_vary_cast_reals(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => new Float64Array([...vary]),
            bool: vary => vary ? new Float64Array([1]) : null,
            int: vary => new Float64Array([Number(vary)]),
            real: vary => (vary && Number.isFinite(vary)) ? new Float64Array([vary]) : null,
            ints: vary => new Float64Array([...vary].map(Number)),
            reals: vary => vary,
            ref: vary => null,
            str: vary => {
                if (!vary)
                    return null;
                return new Float64Array(vary.split(',').map(v => Number(v) || 0));
            },
            time: vary => new Float64Array([vary.valueOf()]),
            dur: vary => new Float64Array([vary.valueOf()]),
            range: vary => null,
            json: vary => null,
            jsan: vary => null,
            dom: vary => null,
            tree: vary => null,
        });
    }
    $.$hyoo_crus_vary_cast_reals = $hyoo_crus_vary_cast_reals;
    function $hyoo_crus_vary_cast_ref(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => (!vary.length || vary.length % 6) ? null : $hyoo_crus_ref_decode(vary),
            bool: vary => null,
            int: vary => null,
            real: vary => null,
            ints: vary => null,
            reals: vary => null,
            ref: vary => vary,
            str: vary => {
                try {
                    return $hyoo_crus_ref(vary);
                }
                catch {
                    return null;
                }
            },
            time: vary => null,
            dur: vary => null,
            range: vary => null,
            json: vary => null,
            jsan: vary => null,
            dom: vary => null,
            tree: vary => {
                try {
                    return $hyoo_crus_ref(vary.type);
                }
                catch {
                    return null;
                }
            },
        });
    }
    $.$hyoo_crus_vary_cast_ref = $hyoo_crus_vary_cast_ref;
    function $hyoo_crus_vary_cast_str(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => [...vary].map(n => n.toString(16).padStart(2, '0')).join(''),
            bool: vary => String(vary),
            int: vary => String(vary),
            real: vary => String(vary),
            ints: vary => vary.join(','),
            reals: vary => vary.join(','),
            ref: vary => vary.description,
            str: vary => vary,
            time: vary => String(vary),
            dur: vary => String(vary),
            range: vary => String(vary),
            json: vary => JSON.stringify(vary),
            jsan: vary => JSON.stringify(vary),
            dom: vary => $mol_dom_serialize(vary),
            tree: vary => String(vary),
        });
    }
    $.$hyoo_crus_vary_cast_str = $hyoo_crus_vary_cast_str;
    function $hyoo_crus_vary_cast_time(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => null,
            bool: vary => null,
            int: vary => new $mol_time_moment(Number(vary & 0xffffffffffffn)),
            real: vary => {
                try {
                    return new $mol_time_moment(vary);
                }
                catch {
                    return null;
                }
            },
            ints: vary => null,
            reals: vary => null,
            ref: vary => null,
            str: vary => {
                try {
                    return vary ? new $mol_time_moment(vary) : null;
                }
                catch {
                    return null;
                }
            },
            time: vary => vary,
            dur: vary => null,
            range: vary => null,
            json: vary => {
                try {
                    return new $mol_time_moment(vary);
                }
                catch {
                    return null;
                }
            },
            jsan: vary => null,
            dom: vary => null,
            tree: vary => null,
        });
    }
    $.$hyoo_crus_vary_cast_time = $hyoo_crus_vary_cast_time;
    function $hyoo_crus_vary_cast_dur(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => null,
            bool: vary => null,
            int: vary => new $mol_time_duration(Number(vary & 0xffffffffffffn)),
            real: vary => {
                try {
                    return new $mol_time_duration(vary);
                }
                catch {
                    return null;
                }
            },
            ints: vary => null,
            reals: vary => null,
            ref: vary => null,
            str: vary => {
                try {
                    return new $mol_time_duration(vary);
                }
                catch {
                    return null;
                }
            },
            time: vary => null,
            dur: vary => vary,
            range: vary => null,
            json: vary => new $mol_time_duration(vary),
            jsan: vary => null,
            dom: vary => null,
            tree: vary => null,
        });
    }
    $.$hyoo_crus_vary_cast_dur = $hyoo_crus_vary_cast_dur;
    function $hyoo_crus_vary_cast_range(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => null,
            bool: vary => null,
            int: vary => null,
            real: vary => null,
            ints: vary => null,
            reals: vary => null,
            ref: vary => null,
            str: vary => {
                try {
                    return vary ? new $mol_time_interval(vary) : null;
                }
                catch {
                    return null;
                }
            },
            time: vary => new $mol_time_interval({ start: vary, duration: 0 }),
            dur: vary => null,
            range: vary => vary,
            json: vary => {
                try {
                    return new $mol_time_interval(vary);
                }
                catch {
                    return null;
                }
            },
            jsan: vary => null,
            dom: vary => null,
            tree: vary => null,
        });
    }
    $.$hyoo_crus_vary_cast_range = $hyoo_crus_vary_cast_range;
    function $hyoo_crus_vary_cast_json(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => null,
            bool: vary => null,
            int: vary => null,
            real: vary => null,
            ints: vary => null,
            reals: vary => null,
            ref: vary => null,
            str: vary => {
                if (!vary)
                    return null;
                try {
                    const res = JSON.parse(vary);
                    if (typeof res === 'object')
                        return res;
                    return null;
                }
                catch {
                    return null;
                }
            },
            time: vary => ({ ...vary }),
            dur: vary => ({ ...vary }),
            range: vary => ({ ...vary }),
            json: vary => vary,
            jsan: vary => Object(vary[0]),
            dom: vary => null,
            tree: vary => null,
        });
    }
    $.$hyoo_crus_vary_cast_json = $hyoo_crus_vary_cast_json;
    function $hyoo_crus_vary_cast_jsan(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => [...vary],
            bool: vary => [vary],
            int: vary => [vary.toString()],
            real: vary => Number.isFinite(vary) ? [vary] : null,
            ints: vary => [...vary].map(v => Number(v)),
            reals: vary => [...vary],
            ref: vary => [vary.description],
            str: vary => {
                if (!vary)
                    return null;
                try {
                    return [].concat(JSON.parse(vary));
                }
                catch {
                    return [vary];
                }
            },
            time: vary => [vary.toJSON()],
            dur: vary => [vary.toJSON()],
            range: vary => [vary.toJSON()],
            json: vary => [vary],
            jsan: vary => vary,
            dom: vary => [$mol_dom_serialize(vary)],
            tree: vary => [vary.toString()],
        });
    }
    $.$hyoo_crus_vary_cast_jsan = $hyoo_crus_vary_cast_jsan;
    function $hyoo_crus_vary_cast_dom(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => $mol_jsx("body", null, vary && $mol_base64_ae_encode(vary)),
            bool: vary => $mol_jsx("body", null, vary),
            int: vary => $mol_jsx("body", null, vary),
            real: vary => $mol_jsx("body", null, vary),
            ints: vary => $mol_jsx("body", null, vary.join(',')),
            reals: vary => $mol_jsx("body", null, vary.join(',')),
            ref: vary => $mol_jsx("body", null, vary.description),
            str: vary => {
                if (!vary)
                    return null;
                try {
                    return vary ? $mol_dom_parse(vary, 'application/xhtml+xml').documentElement : null;
                }
                catch {
                    return $mol_jsx("body", null, vary);
                }
            },
            time: vary => $mol_jsx("body", null, vary),
            dur: vary => $mol_jsx("body", null, vary),
            range: vary => $mol_jsx("body", null, vary),
            json: vary => $mol_jsx("body", null, JSON.stringify(vary)),
            jsan: vary => $mol_jsx("body", null, JSON.stringify(vary)),
            dom: vary => vary,
            tree: vary => $mol_jsx("body", null, vary),
        });
    }
    $.$hyoo_crus_vary_cast_dom = $hyoo_crus_vary_cast_dom;
    function $hyoo_crus_vary_cast_tree(vary) {
        return $hyoo_crus_vary_switch(vary, {
            nil: vary => null,
            bin: vary => $mol_tree2_bin_from_bytes(vary),
            bool: vary => $mol_tree2.struct(vary.toString()),
            int: vary => $mol_tree2.struct(vary.toString()),
            real: vary => $mol_tree2.struct(vary.toString()),
            ints: vary => $mol_tree2.list([...vary].map(v => $mol_tree2.struct(v.toString()))),
            reals: vary => $mol_tree2.list([...vary].map(v => $mol_tree2.struct(v.toString()))),
            ref: vary => $mol_tree2.struct(vary.description),
            str: vary => {
                if (!vary)
                    return null;
                try {
                    return $$.$mol_tree2_from_string(vary);
                }
                catch {
                    return $$.$mol_tree2.data(vary);
                }
            },
            time: vary => $mol_tree2.struct(vary.toString()),
            dur: vary => $mol_tree2.struct(vary.toString()),
            range: vary => $mol_tree2.struct(vary.toString()),
            json: vary => $$.$mol_tree2_from_json(vary),
            jsan: vary => $$.$mol_tree2_from_json(vary),
            dom: vary => $$.$mol_tree2_xml_from_dom(vary),
            tree: vary => vary,
        });
    }
    $.$hyoo_crus_vary_cast_tree = $hyoo_crus_vary_cast_tree;
    $.$hyoo_crus_vary_cast_funcs = {
        nil: () => null,
        bin: $hyoo_crus_vary_cast_bin,
        bool: $hyoo_crus_vary_cast_bool,
        int: $hyoo_crus_vary_cast_int,
        real: $hyoo_crus_vary_cast_real,
        ints: $hyoo_crus_vary_cast_ints,
        reals: $hyoo_crus_vary_cast_reals,
        ref: $hyoo_crus_vary_cast_ref,
        str: $hyoo_crus_vary_cast_str,
        time: $hyoo_crus_vary_cast_time,
        dur: $hyoo_crus_vary_cast_dur,
        range: $hyoo_crus_vary_cast_range,
        json: $hyoo_crus_vary_cast_json,
        jsan: $hyoo_crus_vary_cast_jsan,
        dom: $hyoo_crus_vary_cast_dom,
        tree: $hyoo_crus_vary_cast_tree,
    };
    function $hyoo_crus_vary_cast(tip, vary) {
        return $.$hyoo_crus_vary_cast_funcs[tip](vary);
    }
    $.$hyoo_crus_vary_cast = $hyoo_crus_vary_cast;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_bus extends $mol_object {
        name;
        handle;
        channel;
        constructor(name, handle) {
            super();
            this.name = name;
            this.handle = handle;
            const channel = new BroadcastChannel(name);
            channel.onmessage = (event) => this.handle(event.data);
            this.channel = channel;
        }
        destructor() {
            this.channel.close();
        }
        send(data) {
            this.channel.postMessage(data);
        }
    }
    $.$mol_bus = $mol_bus;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $hyoo_crus_log() {
        return this.$mol_state_arg.value('hyoo_crus_log') !== null;
    }
    $.$hyoo_crus_log = $hyoo_crus_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_race(...tasks) {
        const results = tasks.map(task => {
            try {
                return task();
            }
            catch (error) {
                return error;
            }
        });
        const promises = results.filter(res => $mol_promise_like(res));
        if (promises.length)
            $mol_fail(Promise.race(promises));
        const error = results.find(res => res instanceof Error);
        if (error)
            $mol_fail(error);
        return results;
    }
    $.$mol_wire_race = $mol_wire_race;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $hyoo_crus_land_root;
    (function ($hyoo_crus_land_root) {
        $hyoo_crus_land_root["data"] = "";
        $hyoo_crus_land_root["tine"] = "AQAAAAAA";
    })($hyoo_crus_land_root = $.$hyoo_crus_land_root || ($.$hyoo_crus_land_root = {}));
    class $hyoo_crus_land extends $mol_object {
        ref() {
            return this.auth().lord();
        }
        auth() {
            return this.$.$hyoo_crus_auth.current();
        }
        faces = new $hyoo_crus_face_map;
        pass = new $mol_wire_dict();
        gift = new $mol_wire_dict();
        sand = new $mol_wire_dict();
        self_all = new $mol_wire_dict();
        self_make(idea = Math.floor(Math.random() * 2 ** 48)) {
            const auth = this.auth();
            const rank = this.lord_rank(auth.lord());
            if (rank < $hyoo_crus_rank_tier.post)
                $mol_fail(new Error(`Rank too low (${rank})`));
            for (let i = 0; i < 4096; ++i) {
                idea = (idea + 1) % 2 ** 48;
                if (!idea)
                    continue;
                const idea_str = $mol_base64_ae_encode(new Uint8Array(new BigUint64Array([BigInt(idea)]).buffer, 0, 6));
                if (this.self_all.has(idea_str))
                    continue;
                this.self_all.set(idea_str, null);
                return idea_str;
            }
            $mol_fail(new Error(`Too long self generation`));
        }
        home() {
            return this.Data($hyoo_crus_home);
        }
        area_make(idea = Math.floor(Math.random() * 2 ** 48)) {
            this.loading();
            const id = $mol_base64_ae_encode(new Uint8Array(new BigUint64Array([BigInt(idea)]).buffer, 0, 6));
            const ref = $hyoo_crus_ref($hyoo_crus_ref_lord(this.ref()).description + '_' + id);
            const area = this.$.$hyoo_crus_glob.Land(ref);
            const units = this.unit_sort([...this.pass.values(), ...this.gift.values()]).map(unit => {
                const clone = $hyoo_crus_unit.from(unit).narrow();
                clone._land = area;
                $hyoo_crus_unit_trusted.add(clone);
                return clone;
            });
            const errors = area.apply_unit(units, 'skip_check').filter(Boolean);
            for (const error of errors)
                this.$.$mol_log3_warn({
                    place: `${this}.area_make()`,
                    message: error,
                    hint: 'Send it to developer',
                });
            area.bus();
            area.sync_mine();
            area.sync_yard();
            return area;
        }
        Data(Node) {
            return this.Node(Node).Item($hyoo_crus_land_root.data);
        }
        Tine() {
            return this.Node($hyoo_crus_list_ref).Item($hyoo_crus_land_root.tine);
        }
        Node(Node) {
            return new $hyoo_crus_fund((head) => {
                if (head === 'AAAAAAAA')
                    return this.Node(Node).Item($hyoo_crus_land_root.data);
                return Node.make({
                    land: () => this.sync(),
                    head: $mol_const(head),
                });
            });
        }
        total() {
            let total = this.pass.size + this.gift.size;
            for (const peers of this.sand.values()) {
                for (const units of peers.values()) {
                    total += units.size;
                }
            }
            return total;
        }
        joined_list() {
            return [...this.pass.values()].map(unit => unit.lord());
        }
        key() {
            const pass = this.pass.get($hyoo_crus_ref_peer(this.ref()));
            if (!pass)
                return null;
            return $hyoo_crus_auth.from(pass.auth());
        }
        lord_rank(lord, next) {
            if (lord === $hyoo_crus_ref_lord(this.ref()))
                return $hyoo_crus_rank_rule;
            const prev = this.gift.get(lord)?.rank()
                ?? this.gift.get($hyoo_crus_ref(''))?.rank()
                ?? (this.encrypted() ? $hyoo_crus_rank_deny : $hyoo_crus_rank_read);
            if (next === undefined)
                return prev;
            if (next === prev)
                return prev;
            this.give(lord, next);
            return next;
        }
        peer_rank(peer) {
            const auth = this.pass.get(peer);
            if (auth)
                return this.lord_rank(auth.lord());
            return this.encrypted() ? $hyoo_crus_rank_deny : $hyoo_crus_rank_read;
        }
        unit_sort(units) {
            const dict = new Map();
            for (const unit of units)
                dict.set(unit.key(), unit);
            const lord = $hyoo_crus_ref_lord(this.ref());
            const graph = new $mol_graph();
            for (const unit of units) {
                unit.choose({
                    pass: pass => {
                        if (pass.lord() === lord)
                            return;
                        graph.link(pass.key(), 'gift:');
                    },
                    gift: gift => {
                        graph.link('pass:' + $hyoo_crus_ref_peer(gift.dest()), gift.key());
                        graph.link(gift.key(), 'pass:' + gift.peer());
                    },
                    sand: sand => {
                        graph.link(sand.key(), 'pass:' + sand.peer());
                    },
                });
            }
            graph.acyclic(() => 1);
            return [...graph.sorted].map(key => dict.get(key)).filter(Boolean);
        }
        delta_unit(face = new $hyoo_crus_face_map) {
            this.loading();
            const delta = [];
            const passed = new Set();
            const auth = (peer) => {
                if (passed.has(peer))
                    return;
                if (face.get(peer))
                    return;
                const pass = this.pass.get(peer);
                if (!pass)
                    $mol_fail(new Error(`No pass for Peer (${peer})`));
                delta.push(pass);
                passed.add(peer);
            };
            for (const [lord, unit] of this.gift) {
                const time = face.get(unit.peer()) ?? 0;
                if (time >= unit.time())
                    continue;
                auth(unit.peer());
                delta.push(unit);
            }
            for (const kids of this.sand.values()) {
                for (const peers of kids.values()) {
                    for (const unit of peers.values()) {
                        const time = face.get(unit.peer()) ?? 0;
                        if (time >= unit.time())
                            continue;
                        auth(unit.peer());
                        delta.push(unit);
                    }
                }
            }
            for (const [peer, unit] of this.pass) {
                if (passed.has(peer))
                    continue;
                if (face.has(unit.peer()))
                    continue;
                delta.push(unit);
                passed.add(peer);
            }
            if (delta.length || this.faces.total <= this.faces.total)
                return delta;
            this.$.$mol_log3_warn({
                place: this,
                message: 'Unit Absent',
                hint: 'Relax, Delta contains all Units to restore',
                face,
            });
            return this.delta_unit();
        }
        delta_pack(face = new $hyoo_crus_face_map) {
            const parts = this.delta_parts(face);
            if (!parts)
                return null;
            const pack = $hyoo_crus_pack.make(parts);
            return pack;
        }
        delta_parts(face = new $hyoo_crus_face_map) {
            const units = this.delta_unit(face);
            if (!units.length)
                return null;
            const rocks = [];
            for (let unit of units) {
                if (unit.kind() !== 'sand')
                    continue;
                const sand = unit.narrow();
                if (sand.size() <= 32)
                    continue;
                const rock = this.$.$hyoo_crus_mine.rock(sand.hash()) ?? null;
                rocks.push([sand.hash(), rock]);
            }
            return {
                lands: {
                    [this.ref()]: {
                        faces: new $hyoo_crus_face_map,
                        units,
                    },
                },
                rocks,
            };
        }
        faces_pack() {
            const pack = $hyoo_crus_pack.make({
                lands: {
                    [this.ref()]: { faces: this.faces, units: [] },
                },
                rocks: [],
            });
            return pack;
        }
        apply_unit(delta, skip_check) {
            if (!delta.length)
                return [];
            if (!skip_check)
                this.loading();
            const doubt = delta.filter(unit => !$hyoo_crus_unit_trusted.has(unit));
            if (doubt.length) {
                const errors = $mol_wire_sync(this).units_verify(doubt);
                if (errors.some(v => v))
                    return errors;
            }
            const errors = this.apply_unit_trust(delta, skip_check);
            for (const unit of doubt)
                $hyoo_crus_unit_trusted.add(unit);
            return errors;
        }
        async units_verify(units) {
            const passes = units.filter(unit => unit.kind() === 'pass');
            const auth = new Map(passes.map((unit) => [
                unit.peer(),
                $mol_crypto_key_public.from(unit.auth()),
            ]));
            const mixin = $hyoo_crus_ref_encode(this.ref());
            const mixin_lord = $hyoo_crus_ref_encode($hyoo_crus_ref_lord(this.ref()));
            return await Promise.all(units.map(async (unit) => {
                let key_public = this.key_public(unit.peer());
                if (!key_public)
                    key_public = auth.get(unit.peer()) ?? null;
                if (!key_public)
                    return `No public key for peer (${unit.peer()})`;
                const sign = unit.sign();
                let sens = unit.sens().slice();
                for (let i = 0; i < mixin.length; ++i)
                    sens[i + 2] ^= mixin[i];
                if (await key_public.verify(sens, sign))
                    return '';
                sens = unit.sens().slice();
                for (let i = 0; i < mixin_lord.length; ++i)
                    sens[i + 2] ^= mixin_lord[i];
                if (await key_public.verify(sens, sign))
                    return '';
                return `Wrong unit sign`;
            }));
        }
        apply_unit_trust(delta, skip_check) {
            return delta.map(unit => {
                let need_recheck = false;
                const res = unit.choose({
                    pass: next => {
                        const lord = next.lord();
                        const peer = next.peer();
                        if (!skip_check && this.lord_rank(lord) < next.rank_min())
                            return 'Need reg rank to join';
                        const exists = this.pass.get(peer);
                        if (exists)
                            return '';
                        this.pass.set(peer, next);
                        this.faces.time_max(peer, 0);
                        this.faces.total++;
                    },
                    gift: next => {
                        const peer = next.peer();
                        const dest = next.dest();
                        if (!skip_check && this.peer_rank(peer) < next.rank_min())
                            return 'Need law rank to change rank';
                        const prev = this.gift.get(dest);
                        if (prev && $hyoo_crus_gift.compare(prev, next) <= 0)
                            return '';
                        this.gift.set(dest, next);
                        this.faces.time_max(peer, next.time());
                        if (!prev)
                            this.faces.total++;
                        if ((prev?.rank() ?? $hyoo_crus_rank_deny) > next.rank())
                            need_recheck = true;
                    },
                    sand: next => {
                        const head = next.head();
                        const peer = next.peer();
                        const self = next.self();
                        if (!skip_check && this.peer_rank(peer) < next.rank_min())
                            return 'Need mod rank to post data';
                        let peers = this.sand.get(head);
                        if (!peers)
                            this.sand.set(head, peers = new $mol_wire_dict);
                        let units = peers.get(peer);
                        if (!units)
                            peers.set(peer, units = new $mol_wire_dict);
                        const prev = units.get(self);
                        if (prev && $hyoo_crus_sand.compare(prev, next) <= 0)
                            return '';
                        units.set(self, next);
                        this.self_all.set(self, next);
                        this.faces.time_max(peer, next.time());
                        if (!prev)
                            this.faces.total++;
                    },
                });
                if (need_recheck)
                    this.recheck();
                return res ?? '';
            });
        }
        apply_land(land) {
            return this.apply_unit(land.delta_unit());
        }
        recheck() {
            for (const [peer, pass] of this.pass) {
                if (this.lord_rank(pass.lord()) >= pass.rank_min())
                    continue;
                this.pass.delete(peer);
                this.faces.total--;
            }
            for (const [lord, gift] of this.gift) {
                if (this.peer_rank(gift.peer()) >= gift.rank_min())
                    continue;
                this.gift.delete(lord);
                this.faces.total--;
            }
            for (const [head, peers] of this.sand) {
                for (const [peer, sands] of peers) {
                    const rank = this.peer_rank(peer);
                    for (const [self, sand] of sands) {
                        if (rank >= sand.rank_min())
                            continue;
                        sands.delete(self);
                        this.faces.total--;
                    }
                }
            }
        }
        fork(preset = { '': $hyoo_crus_rank_read }) {
            const land = this.$.$hyoo_crus_glob.land_grab(preset);
            land.Tine().items_vary([this.ref()]);
            return land;
        }
        sand_ordered({ head, peer }) {
            this.sync();
            const queue = peer
                ? [...this.sand.get(head)?.get(peer)?.values() ?? []]
                : [...this.sand.get(head)?.values() ?? []].flatMap(units => [...units.values()]);
            const slices = new Map;
            for (const sand of queue)
                slices.set(sand, 0);
            merge: if (head !== $hyoo_crus_land_root.tine) {
                const tines = (this.Tine()?.items_vary().slice().reverse() ?? [])
                    .map($hyoo_crus_vary_cast_ref)
                    .filter($mol_guard_defined);
                if (!tines.length)
                    break merge;
                const exists = new Set(queue.map(sand => sand.self()));
                const glob = this.$.$hyoo_crus_glob;
                let slice = 0;
                for (const ref of tines) {
                    ++slice;
                    const land = glob.Land(ref);
                    for (const sand of land.sand_ordered({ head, peer })) {
                        if (exists.has(sand.self()))
                            continue;
                        queue.push(sand);
                        exists.add(sand.self());
                        slices.set(sand, slice);
                    }
                }
            }
            if (queue.length < 2)
                return queue;
            const compare = (left, right) => {
                return (slices.get(left) - slices.get(right)) || $hyoo_crus_sand.compare(left, right);
            };
            queue.sort(compare);
            let entry = {
                sand: null,
                next: '',
                prev: '',
            };
            const key = peer === null ? (sand) => sand.key() : (sand) => sand.self();
            const by_key = new Map([['', entry]]);
            const by_self = new Map([['', entry]]);
            while (queue.length) {
                const last = queue.pop();
                by_key.get(entry.prev).next = key(last);
                const item = { sand: last, next: '', prev: entry.prev };
                by_key.set(key(last), item);
                const exists = by_self.get(last.self());
                if (!exists || compare(exists.sand, last) < 0) {
                    by_self.set(last.self(), item);
                }
                entry.prev = key(last);
                for (let cursor = queue.length - 1; cursor >= 0; --cursor) {
                    const kid = queue[cursor];
                    let lead = by_self.get(kid.lead());
                    if (!lead)
                        continue;
                    while (lead.next && (compare(by_key.get(lead.next).sand, kid) < 0))
                        lead = by_key.get(lead.next);
                    const exists1 = by_key.get(key(kid));
                    if (exists1) {
                        if ((lead.sand ? key(lead.sand) : '') === exists1.prev) {
                            exists1.sand = kid;
                            if (cursor === queue.length - 1)
                                queue.pop();
                            continue;
                        }
                        by_key.get(exists1.prev).next = exists1.next;
                        by_key.get(exists1.next).prev = exists1.prev;
                    }
                    const follower = by_key.get(lead.next);
                    follower.prev = key(kid);
                    const item = { sand: kid, next: lead.next, prev: lead.sand ? key(lead.sand) : '' };
                    by_key.set(key(kid), item);
                    const exists2 = by_self.get(kid.self());
                    if (!exists2 || compare(exists2.sand, kid) < 0) {
                        by_self.set(kid.self(), item);
                    }
                    lead.next = key(kid);
                    if (cursor === queue.length - 1)
                        queue.pop();
                    cursor = queue.length;
                }
            }
            const res = [];
            while (entry.next) {
                entry = by_key.get(entry.next);
                res.push(entry.sand);
            }
            return res;
        }
        join() {
            const auth = this.auth();
            const prev = this.pass.get(auth.peer());
            if (prev)
                return prev;
            const next = new $hyoo_crus_pass;
            $hyoo_crus_unit_trusted.add(next);
            next.auth(auth.public().asArray());
            next._land = this;
            const error = this.apply_unit([next])[0];
            if (error)
                $mol_fail(new Error(error));
            this.broadcast();
            return next;
        }
        give(dest, rank) {
            this.join();
            const auth = this.auth();
            const unit = new $hyoo_crus_gift;
            $hyoo_crus_unit_trusted.add(unit);
            unit.rank(rank);
            unit.time(this.faces.tick());
            unit.peer(auth.peer());
            unit.dest(dest ? dest instanceof $hyoo_crus_auth ? dest.lord() : dest : $hyoo_crus_ref(''));
            unit._land = this;
            if (rank >= $hyoo_crus_rank_read) {
                const secret_land = this.secret();
                if (secret_land) {
                    if (!dest)
                        $mol_fail(new Error(`Encrypted land can't be shared to everyone`));
                    const prev = this.gift.get(dest instanceof $hyoo_crus_auth ? dest.lord() : dest);
                    if (prev && prev.rank() >= $hyoo_crus_rank_read) {
                        unit.bill().set(prev.bill());
                    }
                    else {
                        if (typeof dest === 'symbol') {
                            $mol_fail(new Error(`No pub key for lord (${dest.description})`));
                        }
                        const secret_mutual = this.secret_mutual(dest.toString());
                        if (secret_mutual) {
                            const secret_bin = $mol_wire_sync(secret_land).serial();
                            const bill = $mol_wire_sync(secret_mutual).encrypt(secret_bin, unit.salt());
                            unit.bill().set(bill);
                        }
                    }
                }
            }
            const error = this.apply_unit([unit])[0];
            if (error)
                $mol_fail(new Error(error));
            this.broadcast();
            return unit;
        }
        post(lead, head, self, vary, tag = 'term') {
            if (typeof vary === 'symbol')
                vary = $hyoo_crus_ref_relate(this.ref(), vary);
            this.join();
            const auth = this.auth();
            const unit = new $hyoo_crus_sand;
            $hyoo_crus_unit_trusted.add(unit);
            unit.time(this.faces.tick());
            unit.peer(auth.peer());
            unit.lead(lead);
            unit.head(head);
            unit._vary = vary;
            unit._land = this;
            let { tip, bin } = $hyoo_crus_vary_encode(vary);
            unit._open = bin;
            if (vary !== null && this.encrypted()) {
                unit.hash($mol_crypto_hash(bin), tip, tag);
            }
            else {
                if (bin.byteLength > 32)
                    unit.hash(this.$.$hyoo_crus_mine.hash(bin), tip, tag);
                else
                    unit.data(bin, tip, tag);
            }
            unit.self(self || this.self_make(unit.idea()));
            const error = this.apply_unit([unit])[0];
            if (error)
                $mol_fail(new Error(error));
            this.broadcast();
            return unit;
        }
        sand_move(sand, head, seat, peer = '') {
            if (sand.tip() === 'nil')
                $mol_fail(new RangeError(`Can't move wiped sand`));
            const units = this.sand_ordered({ head, peer }).filter(unit => unit.tip() !== 'nil');
            if (seat > units.length)
                $mol_fail(new RangeError(`Seat (${seat}) out of units length (${units.length})`));
            const lead = seat ? units[seat - 1].self() : '';
            const vary = this.sand_decode(sand);
            if (sand.head() === head) {
                const seat_prev = units.indexOf(sand);
                if (seat === seat_prev)
                    return;
                if (seat === seat_prev + 1)
                    return;
                const prev = seat_prev ? units[seat_prev - 1].self() : '';
                const next = units[seat_prev + 1];
                if (next)
                    this.post(prev, head, next.self(), this.sand_decode(next), next.tag());
            }
            else {
                this.sand_wipe(sand);
            }
            return this.post(lead, head, sand.self(), vary, sand.tag());
        }
        sand_wipe(sand, peer = '') {
            const head = sand.head();
            const units = this.sand_ordered({ head, peer }).filter(unit => unit.tip() !== 'nil');
            const seat = units.indexOf(sand);
            if (seat < 0)
                return sand;
            return this.post(seat ? units[seat - 1].self() : '', head, sand.self(), null, 'term');
        }
        broadcast() {
            this.$.$hyoo_crus_glob.yard().lands_news.add(this.ref());
        }
        sync() {
            this.loading();
            this.bus();
            this.sync_mine();
            this.sync_yard();
            return this;
        }
        destructor() {
            this.$.$hyoo_crus_glob.yard().forget_land(this);
        }
        sync_mine() {
            return new $mol_wire_atom('', () => this.saving()).fresh();
        }
        sync_yard() {
            return new $mol_wire_atom('', () => this.$.$hyoo_crus_glob.yard().sync_land(this.ref())).fresh();
        }
        bus() {
            return new this.$.$mol_bus(`$hyoo_crus_land:${this.ref().description}`, $mol_wire_async(bins => {
                this.apply_unit(bins.map(bin => {
                    const unit = new $hyoo_crus_unit(bin).narrow();
                    $hyoo_crus_unit_trusted.add(unit);
                    this.$.$hyoo_crus_mine.units_persisted.add(unit);
                    return unit;
                }));
            }));
        }
        loading() {
            let units = this.unit_sort(this.$.$hyoo_crus_mine.units(this.ref()) ?? []);
            if (this.$.$hyoo_crus_log())
                $mol_wire_sync(this.$).$mol_log3_rise({
                    place: this,
                    message: 'Load Unit',
                    units: units.length,
                });
            const errors = this.apply_unit(units, 'skip_check').filter(Boolean);
            if (errors.length)
                this.$.$mol_log3_fail({
                    place: this,
                    message: errors.join('\n'),
                });
        }
        saving() {
            const mine = this.$.$hyoo_crus_mine;
            if (!mine)
                return;
            this.loading();
            const encoding = [];
            const signing = [];
            const persisting = [];
            for (const pass of this.pass.values()) {
                if (!pass.signed())
                    signing.push(pass);
                if (!mine.units_persisted.has(pass))
                    persisting.push(pass);
            }
            for (const gift of this.gift.values()) {
                if (!gift.signed())
                    signing.push(gift);
                if (!mine.units_persisted.has(gift))
                    persisting.push(gift);
            }
            for (const kids of this.sand.values()) {
                for (const units of kids.values()) {
                    for (const sand of units.values()) {
                        if (!sand.signed()) {
                            encoding.push(sand);
                            signing.push(sand);
                        }
                        if (!mine.units_persisted.has(sand))
                            persisting.push(sand);
                    }
                }
            }
            $mol_wire_race(...encoding.map(unit => () => this.sand_encode(unit)));
            $mol_wire_race(...signing.map(unit => () => this.unit_sign(unit)));
            if (persisting.length) {
                this.bus().send(persisting.map(unit => unit.buffer));
                mine.units(this.ref(), persisting);
                if (this.$.$hyoo_crus_log())
                    $mol_wire_sync(this.$).$mol_log3_done({
                        place: this,
                        message: 'Saved Units',
                        units: persisting.length,
                    });
            }
        }
        unit_sign(unit) {
            if (unit.signed())
                return;
            const key = $mol_wire_sync(unit._land.auth());
            const mixin = $hyoo_crus_ref_encode(unit._land.ref());
            const sens = unit.sens().slice();
            for (let i = 0; i < mixin.length; ++i)
                sens[i + 2] ^= mixin[i];
            while (true) {
                const sign = key.sign(sens);
                unit.sign(sign.slice(0, 2));
                const rank = unit instanceof $hyoo_crus_pass
                    ? this.lord_rank(unit.lord())
                    : this.peer_rank(unit.peer());
                if (rank >= unit.rank_min()) {
                    unit.sign(sign);
                    return;
                }
                else {
                    unit.sign(new Uint8Array([0, 0]));
                }
            }
        }
        sand_encode(sand) {
            if (sand._open === null)
                return sand;
            if (sand.tip() === 'nil')
                return sand;
            let bin = sand._open;
            const secret = sand._land.secret();
            if (secret)
                bin = $mol_wire_sync(secret).encrypt(bin, sand.salt());
            if (bin.byteLength > 32)
                sand.hash(this.$.$hyoo_crus_mine.rock_save(bin), sand.tip(), sand.tag());
            else
                sand.data(bin, sand.tip(), sand.tag());
            return sand;
        }
        sand_decode(sand) {
            try {
                let vary = this.sand_decode_raw(sand);
                if (typeof vary === 'symbol')
                    vary = $hyoo_crus_ref_resolve(this.ref(), vary);
                return vary;
            }
            catch (error) {
                if (error instanceof Promise)
                    return $mol_fail_hidden(error);
                this.$.$mol_fail_log(error);
                return null;
            }
        }
        sand_decode_raw(sand) {
            if (this.sand.get(sand.head())?.get(sand.peer())?.get(sand.self()) !== sand) {
                for (const id of this.Tine().items_vary() ?? []) {
                    const vary = this.$.$hyoo_crus_glob.Land($hyoo_crus_vary_cast_ref(id)).sand_decode_raw(sand);
                    if (vary !== undefined)
                        return vary;
                }
                return undefined;
            }
            const secret = this.secret();
            if (sand._vary !== undefined)
                return sand._vary;
            if (sand._open !== null)
                return sand._vary = $hyoo_crus_vary_decode({ tip: sand.tip(), bin: sand._open });
            let bin = sand.size() > 32 ? this.$.$hyoo_crus_mine.rock(sand.hash()) : sand.data();
            if (secret && bin && sand.tip() !== 'nil') {
                try {
                    bin = $mol_wire_sync(secret).decrypt(bin, sand.salt());
                }
                catch (error) {
                    if ($mol_fail_catch(error)) {
                        if (error.message)
                            $mol_fail_hidden(error);
                        else
                            $mol_fail_hidden(new Error(`Can't decrypt`, { cause: error }));
                    }
                }
            }
            sand._open = bin;
            return sand._vary = (bin ? $hyoo_crus_vary_decode({ tip: sand.tip(), bin }) : null);
        }
        key_public(peer) {
            const key = this.pass.get(peer)?.auth();
            return key ? $mol_crypto_key_public.from(key) : null;
        }
        secret_mutual(key_public) {
            return $mol_wire_sync($mol_crypto_secret).derive(this.auth().toString(), key_public);
        }
        encryptable() {
            return !this.sand.size;
        }
        encrypted(next) {
            const gift = this.gift.get(this.ref());
            const prev = gift?.bill().some(b => b) ?? false;
            if (next === undefined)
                return prev;
            if (prev === next)
                return prev;
            if (!this.encryptable())
                $mol_fail(new Error(`Non empty Land never encrypted`));
            this.join();
            const auth = this.auth();
            const secret = $mol_wire_sync($mol_crypto_secret).generate();
            const secret_land = $mol_wire_sync(secret).serial();
            const secret_mutual = auth.secret_mutual(auth.public().toString());
            const unit = new $hyoo_crus_gift;
            $hyoo_crus_unit_trusted.add(unit);
            unit.rank($hyoo_crus_rank_rule);
            unit.time(this.faces.tick());
            unit.peer(auth.peer());
            unit.dest(auth.lord());
            unit._land = this;
            const secret_closed = $mol_wire_sync(secret_mutual).encrypt(secret_land, unit.salt());
            unit.bill().set(secret_closed);
            const error = this.apply_unit([unit])[0];
            if (error)
                $mol_fail(new Error(error));
            return next;
        }
        secret() {
            if (!this.encrypted())
                return null;
            const auth = this.auth();
            const gift = this.gift.get(auth.lord());
            if (!gift)
                return $mol_fail(new Error(`Access denied`));
            const bill = gift.bill();
            if (!bill.some(b => b))
                return $mol_fail(new Error(`No key to decrypt`));
            const secret_mutual = auth.secret_mutual(this.key_public(gift.peer()).toString());
            if (!secret_mutual)
                return $mol_fail(new Error(`Can't decrypt secret`));
            const secret_land = $mol_wire_sync(secret_mutual).decrypt(bill, gift.salt());
            return $mol_wire_sync($mol_crypto_secret).from(secret_land);
        }
        dump() {
            this.saving();
            const units = [];
            const rocks = [];
            for (const pass of this.pass.values())
                units.push(pass);
            for (const gift of this.gift.values())
                units.push(gift);
            for (const heads of this.sand.values()) {
                for (const sands of heads.values()) {
                    for (const sand of sands.values()) {
                        units.push(sand);
                        if (sand.size() <= 32)
                            continue;
                        const rock = this.$.$hyoo_crus_mine.rock(sand.hash());
                        if (!rock)
                            continue;
                        rocks.push([sand.hash(), rock]);
                    }
                }
            }
            return {
                land: this.ref(),
                units, rocks,
            };
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_auto(this.faces.total));
        }
    }
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "self_make", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "area_make", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "Data", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "Tine", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "Node", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "total", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "joined_list", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "key", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "lord_rank", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "faces_pack", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "apply_unit", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "apply_unit_trust", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "fork", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "sand_ordered", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "join", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "give", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "post", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "sand_move", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_land.prototype, "sand_wipe", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "sync", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "sync_mine", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "sync_yard", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "bus", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "loading", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "saving", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "unit_sign", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "sand_encode", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "sand_decode", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "sand_decode_raw", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "key_public", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_land.prototype, "secret_mutual", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "encryptable", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "encrypted", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_land.prototype, "secret", null);
    $.$hyoo_crus_land = $hyoo_crus_land;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $hyoo_crus_unit_kind;
    (function ($hyoo_crus_unit_kind) {
        $hyoo_crus_unit_kind[$hyoo_crus_unit_kind["pass"] = $hyoo_crus_part.pass] = "pass";
        $hyoo_crus_unit_kind[$hyoo_crus_unit_kind["gift"] = $hyoo_crus_part.gift] = "gift";
        $hyoo_crus_unit_kind[$hyoo_crus_unit_kind["sand"] = $hyoo_crus_part.sand] = "sand";
    })($hyoo_crus_unit_kind = $.$hyoo_crus_unit_kind || ($.$hyoo_crus_unit_kind = {}));
    $.$hyoo_crus_unit_trusted = new WeakSet();
    class $hyoo_crus_unit extends $mol_buffer {
        static size = 128;
        constructor(buffer = new ArrayBuffer($hyoo_crus_unit.size), byteOffset = 0, byteLength = buffer.byteLength) {
            super(buffer, byteOffset, byteLength);
        }
        kind() {
            const val = this.uint8(0);
            if (!val)
                $mol_fail(new Error(`Empty unit`));
            if ((val & 1) === 0)
                return 'sand';
            const kind = $hyoo_crus_unit_kind[val];
            if (kind)
                return kind;
            $mol_fail(new Error(`Unknown unit kind (${val})`));
        }
        choose(ways) {
            const way = this.kind();
            const Unit = {
                pass: $hyoo_crus_pass,
                gift: $hyoo_crus_gift,
                sand: $hyoo_crus_sand,
            }[way];
            if (this instanceof Unit)
                return ways[way](this);
            const unit = new Unit(this.buffer, this.byteOffset, this.byteLength);
            return ways[way](unit);
        }
        narrow() {
            return this.choose({
                sand: unit => unit,
                pass: unit => unit,
                gift: unit => unit,
            });
        }
        key() {
            return this.narrow().key();
        }
        id6(offset, next) {
            if (next === undefined) {
                const str = $mol_base64_ae_encode(new Uint8Array(this.buffer, this.byteOffset + offset, 6));
                return str === 'AAAAAAAA' ? '' : str;
            }
            else {
                this.asArray().set($mol_base64_ae_decode(next || 'AAAAAAAA'), this.byteOffset + offset);
                return next;
            }
        }
        id12(offset, next) {
            if (next === undefined) {
                return $hyoo_crus_ref_decode(new Uint8Array(this.buffer, this.byteOffset + offset, 12));
            }
            else {
                this.asArray().set($hyoo_crus_ref_encode(next), this.byteOffset + offset);
                return next;
            }
        }
        _peer;
        peer(next) {
            if (next === undefined && this._peer !== undefined)
                return this._peer;
            else
                return this._peer = this.id6(2, next);
        }
        salt() {
            return new Uint8Array(this.buffer, this.byteOffset + 2, 16);
        }
        sens(next) {
            const prev = new Uint8Array(this.buffer, this.byteOffset, 64);
            if (next)
                prev.set(next);
            return prev;
        }
        mix(mixin) {
            for (let i = 0; i < mixin.length; ++i) {
                this.uint8(2 + i, this.uint8(2 + i) ^ mixin[i]);
            }
        }
        sign(next) {
            const prev = new Uint8Array(this.buffer, this.byteOffset + 64, 64);
            if (next)
                prev.set(next);
            return prev;
        }
        signed() {
            return this.sign().some(b => b);
        }
        work() {
            if (!this.signed()) {
                return $hyoo_crus_rank_rate.just;
            }
            const sign = this.sign();
            let int = sign[0] | (sign[1] << 8);
            let count = 0;
            while (int & 1) {
                int >>>= 1;
                ++count;
            }
            return count;
        }
        rank_min() {
            return $hyoo_crus_rank_rule;
        }
        _land = null;
        dump() {
            return {};
        }
    }
    $.$hyoo_crus_unit = $hyoo_crus_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_pass extends $hyoo_crus_unit {
        _lord;
        lord(next) {
            if (next === undefined && this._lord !== undefined)
                return this._lord;
            else
                return this._lord = this.id12(2, next);
        }
        key() {
            return `pass:${this.id6(2)}`;
        }
        auth(next) {
            const prev = new Uint8Array(this.buffer, this.byteOffset, 64);
            if (next)
                prev.set(next);
            return prev;
        }
        dump() {
            return {
                kind: this.kind(),
                lord: this.lord().description,
            };
        }
        rank_min() {
            return $hyoo_crus_rank($hyoo_crus_rank_tier.join | ($hyoo_crus_rank_rate.just - this.work()));
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.peer(), ' 🔑 ', $mol_dev_format_span({}, this.lord().description));
        }
    }
    $.$hyoo_crus_pass = $hyoo_crus_pass;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_gift extends $hyoo_crus_unit {
        rank(next) {
            if (next !== undefined)
                this.uint8(0, $hyoo_crus_unit_kind.gift);
            const res = this.uint8(1, next);
            if (res < $hyoo_crus_rank_deny || res > $hyoo_crus_rank_rule) {
                $mol_fail(new RangeError(`Wrong rank ${res}`));
            }
            return res;
        }
        time(next) {
            return this.uint48(8, next);
        }
        free() {
            return new Uint8Array(this.buffer, this.byteOffset + 26, 6);
        }
        _dest;
        dest(next) {
            if (next === undefined && this._dest !== undefined)
                return this._dest;
            else
                return this._dest = this.id12(14, next);
        }
        key() {
            return `gift:${this.dest().description}`;
        }
        bill() {
            return new Uint8Array(this.buffer, this.byteOffset + 32, 32);
        }
        static compare(left, right) {
            return (right.time() - left.time()) || (right.peer() > left.peer() ? 1 : right.peer() < left.peer() ? -1 : 0);
        }
        dump() {
            return {
                kind: this.kind(),
                peer: this.peer(),
                dest: this.dest().description,
                tier: $hyoo_crus_rank_tier[this.rank() & ~$hyoo_crus_rank_rate.just],
                work: this.work(),
                time: $hyoo_crus_time_dump(this.time()),
            };
        }
        rank_min() {
            return $hyoo_crus_rank($hyoo_crus_rank_rule | ($hyoo_crus_rank_rate.just - this.work()));
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.peer(), ' 🏅 ', $mol_dev_format_span({}, this.dest().description || '_'), this.bill().some(v => v) ? ' 🔐' : ' 👀', $hyoo_crus_rank_tier[this.rank() & ~$hyoo_crus_rank_rate.just], ':', this.rank() & $hyoo_crus_rank_rate.just, ' ', $mol_dev_format_shade($hyoo_crus_time_dump(this.time())));
        }
    }
    $.$hyoo_crus_gift = $hyoo_crus_gift;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $hyoo_crus_sand_tag;
    (function ($hyoo_crus_sand_tag) {
        $hyoo_crus_sand_tag[$hyoo_crus_sand_tag["term"] = 0] = "term";
        $hyoo_crus_sand_tag[$hyoo_crus_sand_tag["solo"] = 1] = "solo";
        $hyoo_crus_sand_tag[$hyoo_crus_sand_tag["vals"] = 2] = "vals";
        $hyoo_crus_sand_tag[$hyoo_crus_sand_tag["keys"] = 3] = "keys";
    })($hyoo_crus_sand_tag = $.$hyoo_crus_sand_tag || ($.$hyoo_crus_sand_tag = {}));
    class $hyoo_crus_sand extends $hyoo_crus_unit {
        _vary = undefined;
        _open = null;
        hint(tip = 'nil', tag = 'term') {
            this.uint8(0, ($hyoo_crus_sand_tag[tag] << 1) | ($hyoo_crus_vary_tip[tip] << 3));
        }
        tag() {
            return $hyoo_crus_sand_tag[(this.uint8(0) >> 1) & 0b11];
        }
        tip() {
            const tip = $hyoo_crus_vary_tip[this.uint8(0) >> 3] || $hyoo_crus_vary_tip.nil;
            return tip;
        }
        utf() {
            return Boolean(this.uint8(0) & 0b10000000);
        }
        size(next) {
            return this.uint8(1, next);
        }
        time(next) {
            return this.uint48(8, next);
        }
        _head;
        head(next) {
            if (next === undefined && this._head !== undefined)
                return this._head;
            else
                return this._head = this.id6(14, next);
        }
        _self;
        self(next) {
            if (next === undefined && this._self !== undefined)
                return this._self;
            else
                return this._self = this.id6(20, next);
        }
        key() {
            return `sand:${this.head()}/${this.peer()}/${this.self()}`;
        }
        _lead;
        lead(next) {
            if (next === undefined && this._lead !== undefined)
                return this._lead;
            else
                return this._lead = this.id6(26, next);
        }
        hash(next, tip = 'nil', tag = 'term') {
            const bin = new Uint8Array(this.buffer, this.byteOffset + 32, 20);
            if (next !== undefined) {
                this.hint(tip, tag);
                this.size(255);
                bin.set(next);
            }
            if (this.size() > 32)
                return bin;
            $mol_fail(new Error('No stored hash'));
        }
        meta() {
            return new Uint8Array(this.buffer, this.byteOffset + 42, 12);
        }
        data(next, tip = 'nil', tag = 'term') {
            if (next === undefined) {
                const size = this.size();
                if (size > 32)
                    $mol_fail(new Error('Too long data'));
                return new Uint8Array(this.buffer, this.byteOffset + 32, size);
            }
            else {
                this.hint(tip, tag);
                if (next.byteLength > 32)
                    $mol_fail(new Error('Too long data'));
                this.uint8(1, next.byteLength);
                const bin = new Uint8Array(this.buffer, this.byteOffset + 32, next.byteLength);
                bin.set(next);
                new Uint8Array(this.buffer, this.byteOffset + 32 + next.length, 32 - next.length).fill(0);
                return bin;
            }
        }
        idea() {
            const bin = new Uint8Array(this.buffer, this.byteOffset + 20, 44);
            const hash = $mol_crypto_hash(bin);
            const buf = new $mol_buffer(hash.buffer);
            return buf.uint48(0);
        }
        static compare(left, right) {
            return (Math.floor(right.time() / 65536) - Math.floor(left.time() / 65536))
                || (right.peer() > left.peer() ? 1 : right.peer() < left.peer() ? -1 : 0)
                || (right.time() - left.time());
        }
        dump() {
            return {
                kind: this.kind(),
                peer: this.peer(),
                lead: this.lead(),
                head: this.head(),
                self: this.self(),
                tip: this.tip(),
                tag: this.tag(),
                size: this.size(),
                time: $hyoo_crus_time_dump(this.time()),
            };
        }
        rank_min() {
            return $hyoo_crus_rank($hyoo_crus_rank_tier.post | ($hyoo_crus_rank_rate.just - this.work()));
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.peer(), ' ', this.lead() || 'AAAAAAAA', $mol_dev_format_shade('\\'), $mol_dev_format_accent(this.head() || 'AAAAAAAA'), $mol_dev_format_shade('/'), this.self() || 'AAAAAAAA', ' ', $mol_dev_format_shade($hyoo_crus_time_dump(this.time())), ' ', {
                term: '💼',
                solo: '1️⃣',
                vals: '🎹',
                keys: '🔑',
            }[this.tag()], this.tip(), ' ', $mol_dev_format_native(this._vary));
        }
    }
    $.$hyoo_crus_sand = $hyoo_crus_sand;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_reconcile({ prev, from, to, next, equal, drop, insert, update, replace, }) {
        if (!update)
            update = (next, prev, lead) => prev;
        if (!replace)
            replace = (next, prev, lead) => insert(next, drop(prev, lead));
        if (to > prev.length)
            to = prev.length;
        if (from > to)
            from = to;
        let p = from;
        let n = 0;
        let lead = p ? prev[p - 1] : null;
        while (p < to || n < next.length) {
            if (p < to && n < next.length && equal(next[n], prev[p])) {
                lead = update(next[n], prev[p], lead);
                ++p;
                ++n;
            }
            else if (next.length - n > to - p) {
                lead = insert(next[n], lead);
                ++n;
            }
            else if (next.length - n < to - p) {
                lead = drop(prev[p], lead);
                ++p;
            }
            else {
                lead = replace(next[n], prev[p], lead);
                ++p;
                ++n;
            }
        }
    }
    $.$mol_reconcile = $mol_reconcile;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_list_vary extends $hyoo_crus_node {
        static tag = $hyoo_crus_sand_tag[$hyoo_crus_sand_tag.vals];
        items_vary(next, tag = 'term') {
            const units = this.units();
            if (next === undefined)
                return units.map(unit => this.land().sand_decode(unit));
            this.splice(next, 0, units.length, tag);
            return this.items_vary();
        }
        splice(next, from = this.units().length, to = from, tag = 'term') {
            const land = this.land();
            $mol_reconcile({
                prev: this.units(),
                from,
                to,
                next,
                equal: (next, prev) => $mol_compare_deep(this.land().sand_decode(prev), next),
                drop: (prev, lead) => this.land().post(lead?.self() ?? '', prev.head(), prev.self(), null),
                insert: (next, lead) => this.land().post(lead?.self() ?? '', this.head(), land.self_make(), next, tag),
                replace: (next, prev, lead) => this.land().post(lead?.self() ?? '', prev.head(), prev.self(), next, prev.tag()),
            });
        }
        find(vary) {
            for (const unit of this.units()) {
                if ($mol_compare_deep(this.land().sand_decode(unit), vary))
                    return unit;
            }
            return null;
        }
        has(vary, next, tag = 'term') {
            if (next === undefined)
                return Boolean(this.find(vary));
            if (next)
                this.add(vary, tag);
            else
                this.cut(vary);
            return next;
        }
        add(vary, tag = 'term') {
            if (this.has(vary))
                return;
            this.land().post('', this.head(), '', vary, tag);
        }
        cut(vary) {
            const units = [...this.units()];
            for (let i = 0; i < units.length; ++i) {
                if (!$mol_compare_deep(this.land().sand_decode(units[i]), vary))
                    continue;
                this.land().post(units[i - 1]?.self() ?? 0, units[i].head(), units[i].self(), null);
                units.splice(i, 1);
                --i;
            }
        }
        move(from, to) {
            this.land().sand_move(this.units()[from], this.head(), to);
        }
        wipe(seat) {
            this.land().sand_wipe(this.units()[seat]);
        }
        node_make(Node, vary, tag = 'term') {
            this.splice([vary], undefined, undefined, tag);
            return this.land().Node(Node).Item(this.units().at(-1).self());
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(this.items_vary()));
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_list_vary.prototype, "items_vary", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_list_vary.prototype, "splice", null);
    $.$hyoo_crus_list_vary = $hyoo_crus_list_vary;
    function $hyoo_crus_list(parse) {
        class $hyoo_crus_list extends $hyoo_crus_list_vary {
            static parse = parse;
            items(next) {
                return this.items_vary(next?.map(parse)).map(parse);
            }
            static toString() {
                return this === $hyoo_crus_list ? '$hyoo_crus_list<' + this.$.$mol_func_name(parse) + '>' : super.toString();
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_crus_list.prototype, "items", null);
        return $hyoo_crus_list;
    }
    $.$hyoo_crus_list = $hyoo_crus_list;
    class $hyoo_crus_list_bin extends $hyoo_crus_list($hyoo_crus_vary_cast_bin) {
    }
    $.$hyoo_crus_list_bin = $hyoo_crus_list_bin;
    class $hyoo_crus_list_bool extends $hyoo_crus_list($hyoo_crus_vary_cast_bool) {
    }
    $.$hyoo_crus_list_bool = $hyoo_crus_list_bool;
    class $hyoo_crus_list_int extends $hyoo_crus_list($hyoo_crus_vary_cast_int) {
    }
    $.$hyoo_crus_list_int = $hyoo_crus_list_int;
    class $hyoo_crus_list_real extends $hyoo_crus_list($hyoo_crus_vary_cast_real) {
    }
    $.$hyoo_crus_list_real = $hyoo_crus_list_real;
    class $hyoo_crus_list_ints extends $hyoo_crus_list($hyoo_crus_vary_cast_ints) {
    }
    $.$hyoo_crus_list_ints = $hyoo_crus_list_ints;
    class $hyoo_crus_list_reals extends $hyoo_crus_list($hyoo_crus_vary_cast_reals) {
    }
    $.$hyoo_crus_list_reals = $hyoo_crus_list_reals;
    class $hyoo_crus_list_ref extends $hyoo_crus_list($hyoo_crus_vary_cast_ref) {
    }
    $.$hyoo_crus_list_ref = $hyoo_crus_list_ref;
    class $hyoo_crus_list_str extends $hyoo_crus_list($hyoo_crus_vary_cast_str) {
    }
    $.$hyoo_crus_list_str = $hyoo_crus_list_str;
    class $hyoo_crus_list_time extends $hyoo_crus_list($hyoo_crus_vary_cast_time) {
    }
    $.$hyoo_crus_list_time = $hyoo_crus_list_time;
    class $hyoo_crus_list_dur extends $hyoo_crus_list($hyoo_crus_vary_cast_dur) {
    }
    $.$hyoo_crus_list_dur = $hyoo_crus_list_dur;
    class $hyoo_crus_list_range extends $hyoo_crus_list($hyoo_crus_vary_cast_range) {
    }
    $.$hyoo_crus_list_range = $hyoo_crus_list_range;
    class $hyoo_crus_list_json extends $hyoo_crus_list($hyoo_crus_vary_cast_json) {
    }
    $.$hyoo_crus_list_json = $hyoo_crus_list_json;
    class $hyoo_crus_list_jsan extends $hyoo_crus_list($hyoo_crus_vary_cast_jsan) {
    }
    $.$hyoo_crus_list_jsan = $hyoo_crus_list_jsan;
    class $hyoo_crus_list_dom extends $hyoo_crus_list($hyoo_crus_vary_cast_dom) {
    }
    $.$hyoo_crus_list_dom = $hyoo_crus_list_dom;
    class $hyoo_crus_list_tree extends $hyoo_crus_list($hyoo_crus_vary_cast_tree) {
    }
    $.$hyoo_crus_list_tree = $hyoo_crus_list_tree;
    class $hyoo_crus_list_ref_base extends $hyoo_crus_list_ref {
    }
    $.$hyoo_crus_list_ref_base = $hyoo_crus_list_ref_base;
    function $hyoo_crus_list_ref_to(Value) {
        class $hyoo_crus_list_ref_to extends $hyoo_crus_list_ref_base {
            static Value = $mol_memo.func(Value);
            static toString() {
                return this === $hyoo_crus_list_ref_to ? '$hyoo_crus_list_ref_to<' + Value() + '>' : super.toString();
            }
            remote_list(next) {
                const glob = this.$.$hyoo_crus_glob;
                const Node = Value();
                return this.items_vary(next?.map(item => item.ref()))
                    .map($hyoo_crus_vary_cast_ref)
                    .filter($mol_guard_defined)
                    .map(ref => glob.Node(ref, Node));
            }
            remote_add(item) {
                this.add(item.ref());
            }
            make(config) {
                if (config === null || typeof config === 'number') {
                    const self = this.land().self_make(config || undefined);
                    const node = this.land().Node(Value()).Item(self);
                    this.splice([node.ref()]);
                    return node;
                }
                else if (config instanceof $hyoo_crus_land) {
                    const land = config.area_make();
                    this.splice([land.ref()]);
                    return land.Node(Value()).Item('');
                }
                else if (config) {
                    const land = this.$.$hyoo_crus_glob.land_grab(config);
                    this.splice([land.ref()]);
                    return land.Node(Value()).Item('');
                }
            }
            remote_make(config) {
                return this.make(config);
            }
            local_make(idea) {
                const self = this.land().self_make(idea);
                const node = this.land().Node(Value()).Item(self);
                this.splice([node.ref()]);
                return node;
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_crus_list_ref_to.prototype, "remote_list", null);
        __decorate([
            $mol_action
        ], $hyoo_crus_list_ref_to.prototype, "remote_add", null);
        __decorate([
            $mol_action
        ], $hyoo_crus_list_ref_to.prototype, "make", null);
        __decorate([
            $mol_action
        ], $hyoo_crus_list_ref_to.prototype, "local_make", null);
        return $hyoo_crus_list_ref_to;
    }
    $.$hyoo_crus_list_ref_to = $hyoo_crus_list_ref_to;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_dict extends $hyoo_crus_list_vary {
        static tag = $hyoo_crus_sand_tag[$hyoo_crus_sand_tag.keys];
        keys() {
            return this.items_vary();
        }
        dive(key, Node, auto) {
            if (this.can_change() && auto !== undefined)
                this.has(key, true, Node.tag);
            const unit = this.find(key);
            return unit ? this.land().Node(Node).Item(unit.self()) : null;
        }
        static schema = {};
        static with(schema) {
            const $hyoo_crus_dict_with = class $hyoo_crus_dict_with extends this {
                static toString() {
                    if (this !== $hyoo_crus_dict_with)
                        return super.toString();
                    const params = Object.entries(schema).map(([name, type]) => `${name}: ${type}`);
                    return '$hyoo_crus_dict.with<{' + params.join(', ') + '}>';
                }
            };
            for (const Field in schema) {
                Object.defineProperty($hyoo_crus_dict_with.prototype, Field, {
                    value: function (auto) {
                        return this.dive(Field, schema[Field], auto);
                    }
                });
            }
            return Object.assign($hyoo_crus_dict_with, { schema: { ...this.schema, ...schema } });
        }
        ;
        [$mol_dev_format_head]() {
            const keys = $mol_wire_probe(() => this.keys());
            const nodes = $mol_wire_probe(() => this.nodes(null)) ?? [];
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(keys?.map((key, index) => new Pair(key, nodes[index]))));
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_dict.prototype, "keys", null);
    $.$hyoo_crus_dict = $hyoo_crus_dict;
    class Pair {
        key;
        val;
        constructor(key, val) {
            this.key = key;
            this.val = val;
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_tr({}, $mol_dev_format_td({}, $mol_dev_format_auto(this.key)), $mol_dev_format_td({}, ': '), $mol_dev_format_td({}, $mol_dev_format_auto(this.val)));
        }
    }
    function $hyoo_crus_dict_to(Value) {
        return class $hyoo_crus_dict_to extends $hyoo_crus_dict {
            Value = Value;
            key(key, auto) {
                return this.dive(key, this.Value, auto);
            }
            static toString() {
                return this === $hyoo_crus_dict_to ? '$hyoo_crus_dict_to<' + Value + '>' : super.toString();
            }
        };
    }
    $.$hyoo_crus_dict_to = $hyoo_crus_dict_to;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_hash_string(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed;
        let h2 = 0x41c6ce57 ^ seed;
        for (let i = 0; i < str.length; i++) {
            const ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (((1 << 16) - 1) & h2) + (h1 >>> 0);
    }
    $.$mol_hash_string = $mol_hash_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_atom_vary extends $hyoo_crus_node {
        static tag = $hyoo_crus_sand_tag[$hyoo_crus_sand_tag.solo];
        pick_unit(peer) {
            return this.units_of(peer).at(0);
        }
        vary(next) {
            return this.vary_of('', next);
        }
        vary_of(peer, next) {
            let unit_prev = this.pick_unit(peer);
            let prev = unit_prev ? this.land().sand_decode(unit_prev) : null;
            if (next === undefined)
                return prev;
            if ($mol_compare_deep(prev, next))
                return next;
            this.land().post('', unit_prev?.head() ?? this.head(), unit_prev?.self() ?? '', next);
            return this.vary_of(peer);
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(this.vary()));
        }
    }
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_atom_vary.prototype, "vary_of", null);
    $.$hyoo_crus_atom_vary = $hyoo_crus_atom_vary;
    class $hyoo_crus_atom_enum_base extends $hyoo_crus_atom_vary {
        static options = [];
    }
    $.$hyoo_crus_atom_enum_base = $hyoo_crus_atom_enum_base;
    function $hyoo_crus_atom_enum(options) {
        class $hyoo_crus_atom_enum extends $hyoo_crus_atom_enum_base {
            static options = options;
            static toString() {
                return this === $hyoo_crus_atom_enum ? '$hyoo_crus_atom_enum<' + options.map($hyoo_crus_vary_cast_str) + '>' : super.toString();
            }
            val(next) {
                return this.val_of('', next);
            }
            val_of(peer, next) {
                validate: if (next !== undefined) {
                    for (const option of options) {
                        if ($mol_compare_deep(option, next))
                            break validate;
                    }
                    $mol_fail(new Error(`Wrong value (${$hyoo_crus_vary_cast_str(next)})`));
                }
                const val = this.vary_of(peer, next);
                for (const option of options) {
                    if ($mol_compare_deep(option, val))
                        return val;
                }
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $hyoo_crus_atom_enum.prototype, "val_of", null);
        return $hyoo_crus_atom_enum;
    }
    $.$hyoo_crus_atom_enum = $hyoo_crus_atom_enum;
    function $hyoo_crus_atom(parse) {
        class $hyoo_crus_atom extends $hyoo_crus_atom_vary {
            static parse = parse;
            val(next) {
                return this.val_of('', next);
            }
            val_of(peer, next) {
                if (next !== undefined)
                    parse(next);
                const res = this.vary_of(peer, next);
                try {
                    return parse(res);
                }
                catch {
                    return null;
                }
            }
            static toString() {
                return this === $hyoo_crus_atom ? '$hyoo_crus_atom<' + this.$.$mol_func_name(parse) + '>' : super.toString();
            }
        }
        return $hyoo_crus_atom;
    }
    $.$hyoo_crus_atom = $hyoo_crus_atom;
    class $hyoo_crus_atom_bin extends $hyoo_crus_atom($hyoo_crus_vary_cast_bin) {
    }
    $.$hyoo_crus_atom_bin = $hyoo_crus_atom_bin;
    class $hyoo_crus_atom_bool extends $hyoo_crus_atom($hyoo_crus_vary_cast_bool) {
    }
    $.$hyoo_crus_atom_bool = $hyoo_crus_atom_bool;
    class $hyoo_crus_atom_int extends $hyoo_crus_atom($hyoo_crus_vary_cast_int) {
    }
    $.$hyoo_crus_atom_int = $hyoo_crus_atom_int;
    class $hyoo_crus_atom_real extends $hyoo_crus_atom($hyoo_crus_vary_cast_real) {
    }
    $.$hyoo_crus_atom_real = $hyoo_crus_atom_real;
    class $hyoo_crus_atom_ints extends $hyoo_crus_atom($hyoo_crus_vary_cast_ints) {
    }
    $.$hyoo_crus_atom_ints = $hyoo_crus_atom_ints;
    class $hyoo_crus_atom_reals extends $hyoo_crus_atom($hyoo_crus_vary_cast_reals) {
    }
    $.$hyoo_crus_atom_reals = $hyoo_crus_atom_reals;
    class $hyoo_crus_atom_ref extends $hyoo_crus_atom($hyoo_crus_vary_cast_ref) {
    }
    $.$hyoo_crus_atom_ref = $hyoo_crus_atom_ref;
    class $hyoo_crus_atom_str extends $hyoo_crus_atom($hyoo_crus_vary_cast_str) {
    }
    $.$hyoo_crus_atom_str = $hyoo_crus_atom_str;
    class $hyoo_crus_atom_time extends $hyoo_crus_atom($hyoo_crus_vary_cast_time) {
    }
    $.$hyoo_crus_atom_time = $hyoo_crus_atom_time;
    class $hyoo_crus_atom_dur extends $hyoo_crus_atom($hyoo_crus_vary_cast_dur) {
    }
    $.$hyoo_crus_atom_dur = $hyoo_crus_atom_dur;
    class $hyoo_crus_atom_range extends $hyoo_crus_atom($hyoo_crus_vary_cast_range) {
    }
    $.$hyoo_crus_atom_range = $hyoo_crus_atom_range;
    class $hyoo_crus_atom_json extends $hyoo_crus_atom($hyoo_crus_vary_cast_json) {
    }
    $.$hyoo_crus_atom_json = $hyoo_crus_atom_json;
    class $hyoo_crus_atom_jsan extends $hyoo_crus_atom($hyoo_crus_vary_cast_jsan) {
    }
    $.$hyoo_crus_atom_jsan = $hyoo_crus_atom_jsan;
    class $hyoo_crus_atom_dom extends $hyoo_crus_atom($hyoo_crus_vary_cast_dom) {
    }
    $.$hyoo_crus_atom_dom = $hyoo_crus_atom_dom;
    class $hyoo_crus_atom_tree extends $hyoo_crus_atom($hyoo_crus_vary_cast_tree) {
    }
    $.$hyoo_crus_atom_tree = $hyoo_crus_atom_tree;
    class $hyoo_crus_atom_ref_base extends $hyoo_crus_atom_ref {
        static Value = $hyoo_crus_dict;
    }
    $.$hyoo_crus_atom_ref_base = $hyoo_crus_atom_ref_base;
    function $hyoo_crus_atom_ref_to(Value) {
        class $hyoo_crus_atom_ref_to extends $hyoo_crus_atom_ref_base {
            Value = $mol_memo.func(Value);
            static toString() {
                return this === $hyoo_crus_atom_ref_to ? '$hyoo_crus_atom_ref_to<' + Value() + '>' : super.toString();
            }
            remote(next) {
                return this.remote_of('', next);
            }
            remote_of(peer, next) {
                let ref = next?.ref() ?? next;
                ref = $hyoo_crus_vary_cast_ref(this.vary_of(peer, ref));
                if (!ref)
                    return null;
                return this.$.$hyoo_crus_glob.Node(ref, Value());
            }
            ensure(config) {
                return this.ensure_of('', config);
            }
            ensure_of(peer, config) {
                if (!this.val_of(peer)) {
                    if (config === null)
                        this.ensure_here(peer);
                    else if (config instanceof $hyoo_crus_land)
                        this.ensure_area(peer, config);
                    else if (config)
                        this.ensure_lord(peer, config);
                    else
                        return null;
                }
                return this.remote_of(peer);
            }
            ensure_here(peer) {
                const idea = $mol_hash_string(this.ref().description);
                const head = this.land().self_make(idea);
                const node = this.land().Node(Value()).Item(head);
                this.remote_of(peer, node);
            }
            ensure_area(peer, land) {
                const idea = $mol_hash_string(this.ref().description);
                const area = land.area_make(idea);
                this.val_of(peer, area.ref());
            }
            ensure_lord(peer, preset) {
                const land = this.$.$hyoo_crus_glob.land_grab(preset);
                this.val_of(peer, land.ref());
            }
            remote_ensure(preset) {
                return this.ensure(preset);
            }
            local_ensure() {
                return this.ensure(null);
            }
        }
        __decorate([
            $mol_mem_key
        ], $hyoo_crus_atom_ref_to.prototype, "remote_of", null);
        __decorate([
            $mol_action
        ], $hyoo_crus_atom_ref_to.prototype, "ensure_here", null);
        __decorate([
            $mol_action
        ], $hyoo_crus_atom_ref_to.prototype, "ensure_area", null);
        __decorate([
            $mol_action
        ], $hyoo_crus_atom_ref_to.prototype, "ensure_lord", null);
        return $hyoo_crus_atom_ref_to;
    }
    $.$hyoo_crus_atom_ref_to = $hyoo_crus_atom_ref_to;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_entity extends $hyoo_crus_dict.with({
        Title: $hyoo_crus_atom_str,
    }) {
        title(next) {
            return this.Title(next)?.val(next) ?? '';
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_entity.prototype, "title", null);
    $.$hyoo_crus_entity = $hyoo_crus_entity;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_home extends $hyoo_crus_entity.with({
        Selection: $hyoo_crus_atom_str,
        Hall: $hyoo_crus_atom_ref_to(() => $hyoo_crus_dict),
    }) {
        hall_by(Node, preset) {
            return this.Hall(null)?.ensure(preset)?.cast(Node) ?? null;
        }
    }
    $.$hyoo_crus_home = $hyoo_crus_home;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_mine extends $mol_object {
        static unit_updates = 0;
        static unit_appends = 0;
        static rock_writes = 0;
        static hash(blob) {
            return $mol_crypto_hash(blob);
        }
        static rock(hash, next) {
            $mol_wire_solid();
            return next ?? null;
        }
        static rock_save(blob) {
            const hash = this.hash(blob);
            this.rock(hash, blob);
            this.rock(hash);
            return hash;
        }
        static units_persisted = new WeakSet();
        static units(land, next) {
            if (next)
                return $mol_wire_sync(this).units_save(land, next), next;
            else
                return $mol_wire_sync(this).units_load(land);
        }
        static async units_load(land) {
            return [];
        }
        static async units_save(land, units) {
        }
    }
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_mine, "hash", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_mine, "rock", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_mine, "rock_save", null);
    $.$hyoo_crus_mine = $hyoo_crus_mine;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_mine_pg extends $hyoo_crus_mine {
        static urn() {
            return $mol_state_arg.value('db');
        }
        static url() {
            return new URL(this.urn());
        }
        static rock(hash, next) {
            if (next) {
                $mol_wire_sync(this).db_sync()?.query(`
						INSERT INTO Rock( hash, rock )
						VALUES( $1::bytea, $2::bytea )
						ON CONFLICT( hash ) DO NOTHING
					`, [hash, next]);
                return next;
            }
            return $mol_wire_sync(this).rock_load(hash);
        }
        static async rock_load(hash) {
            const db = await this.db();
            if (!db)
                return null;
            const res = await db.query(`SELECT rock FROM Rock WHERE hash = $1::bytea`, [hash]);
            return res.rows[0]?.rock ?? null;
        }
        static async units_save(land, units) {
            $hyoo_crus_land;
            const db = await this.db();
            if (!db)
                return;
            const tasks = units.map(unit => {
                const ref = land.description;
                const buf = Buffer.from(unit.buffer, unit.byteOffset, unit.byteLength);
                return db.query(`
						INSERT INTO Land( land, path, unit )
						VALUES( $1::varchar(17), $2::varchar(17), $3::bytea )
						ON CONFLICT( land, path ) DO UPDATE SET unit = $3::bytea;
					`, [ref, unit.key(), buf]);
            });
            await Promise.all(tasks);
            for (const unit of units)
                this.units_persisted.add(unit);
        }
        static async units_load(land) {
            const db = await this.db();
            if (!db)
                return [];
            const res = await db.query(`SELECT unit FROM Land WHERE land = $1::varchar(17)`, [land.description]);
            const units = res.rows.map(row => {
                const unit = new $hyoo_crus_unit(row.unit.buffer, row.unit.byteOffset, row.unit.byteLength).narrow();
                this.units_persisted.add(unit);
                $hyoo_crus_unit_trusted.add(unit);
                return unit;
            });
            return units;
        }
        static db_sync() {
            $mol_wire_solid();
            return $mol_wire_sync(this).db();
        }
        static async db() {
            const urn = this.urn();
            if (!urn)
                return null;
            const db = new $node.pg.Pool({
                connectionString: urn,
                ssl: { rejectUnauthorized: false },
            });
            db.on('error', error => {
                this.$.$mol_log3_fail({
                    place: this,
                    message: error?.message,
                });
            });
            await db.query(`
				CREATE TABLE IF NOT EXISTS Land (
					land varchar(17) NOT NULL,
					path varchar(17) NOT NULL,
					unit bytea NOT NULL,
					primary key( land, path )
				);
			`);
            await db.query(`
				CREATE TABLE IF NOT EXISTS Rock (
					hash bytea NOT NULL,
					rock bytea NOT NULL,
					primary key( hash )
				);
			`);
            this.$.$mol_log3_rise({
                place: this,
                message: 'Data Base Ready',
                type: this.url().protocol,
                host: this.url().host,
                name: this.url().pathname,
            });
            return db;
        }
    }
    __decorate([
        $mol_memo.method
    ], $hyoo_crus_mine_pg, "urn", null);
    __decorate([
        $mol_memo.method
    ], $hyoo_crus_mine_pg, "url", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_mine_pg, "rock", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_mine_pg, "units_load", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_mine_pg, "db_sync", null);
    __decorate([
        $mol_memo.method
    ], $hyoo_crus_mine_pg, "db", null);
    $.$hyoo_crus_mine_pg = $hyoo_crus_mine_pg;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_mine_fs extends $hyoo_crus_mine {
        static root() {
            const root = this.$.$mol_file.relative('.crus');
            this.$.$mol_log3_rise({
                place: this,
                message: 'File Storage Ready',
                path: root.path()
            });
            return root;
        }
        static rock_file(hash) {
            const id = $mol_base64_ae_encode(hash);
            return this.root().resolve(`rock/${id.slice(0, 2)}/${id}.blob`);
        }
        static rock(hash, next) {
            const buf = this.rock_file(hash).buffer(next);
            if (next)
                return buf;
            if ($mol_compare_deep(hash, this.hash(buf)))
                return buf;
            return null;
        }
        static units_file(land) {
            $hyoo_crus_land;
            const id = land.description;
            const dir = this.root().resolve(`unit/${id.slice(0, 2)}`);
            dir.exists(true);
            return dir.resolve(`${id}.crus`);
        }
        static units_offsets(land) {
            $mol_wire_solid();
            return new Map();
        }
        static units_sizes = new Map();
        static units_save(land, units) {
            const descr = this.units_file(land).open('create', 'read_write');
            try {
                const offsets = this.units_offsets(land);
                const append = [];
                for (const unit of units) {
                    const off = offsets.get(unit.key());
                    if (off === undefined) {
                        append.push(unit);
                    }
                    else {
                        descr.write({ buffer: unit, position: off });
                        this.units_persisted.add(unit);
                    }
                }
                if (!append.length)
                    return;
                let size = this.units_sizes.get(land) ?? 0;
                let offset = size;
                size += append.length * $hyoo_crus_unit.size;
                descr.truncate(size);
                this.units_sizes.set(land, size);
                for (const unit of append) {
                    descr.write({ buffer: unit, position: offset });
                    offsets.set(unit.key(), offset);
                    this.units_persisted.add(unit);
                    offset += unit.byteLength;
                }
            }
            finally {
                descr.close();
            }
            return undefined;
        }
        static async units_load(land) {
            const descr = this.units_file(land).open('create', 'read_write');
            try {
                const buf = descr.read();
                if (!buf.length)
                    return [];
                this.units_sizes.set(land, buf.length);
                const pack = $hyoo_crus_pack.from(buf);
                const { lands, rocks } = pack.parts(land);
                const units = lands[land]?.units ?? [];
                const offsets = this.units_offsets(land);
                for (let i = 0; i < units.length; ++i) {
                    offsets.set(units[i].key(), i * $hyoo_crus_unit.size);
                    this.units_persisted.add(units[i]);
                }
                return units;
            }
            finally {
                descr.close();
            }
        }
    }
    __decorate([
        $mol_memo.method
    ], $hyoo_crus_mine_fs, "root", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_mine_fs, "rock_file", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_mine_fs, "rock", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_mine_fs, "units_file", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_mine_fs, "units_offsets", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_mine_fs, "units_load", null);
    $.$hyoo_crus_mine_fs = $hyoo_crus_mine_fs;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$hyoo_crus_mine = $hyoo_crus_mine_pg.urn() ? $hyoo_crus_mine_pg : $hyoo_crus_mine_fs;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_pack extends $mol_buffer {
        toBlob() {
            return new Blob([this], { type: 'application/vnd.hyoo_crus_pack' });
        }
        parts(land = null) {
            const lands = {};
            if (land)
                lands[land] = { faces: new $hyoo_crus_face_map, units: [] };
            let total = 0;
            const rocks = [];
            const buf = this.asArray();
            for (let offset = 0; offset < this.byteLength;) {
                const kind = this.uint8(offset);
                if (!kind)
                    break;
                if (kind % 2) {
                    switch (kind) {
                        case $hyoo_crus_part.land: {
                            const faces = new $hyoo_crus_face_map;
                            faces.total = this.uint32(offset) >> 8;
                            offset += 4;
                            land = $hyoo_crus_ref_decode(new Uint8Array(buf.buffer, buf.byteOffset + offset, 18));
                            offset += 20;
                            lands[land] = { faces, units: [] };
                            continue;
                        }
                        case $hyoo_crus_part.face: {
                            if (!land)
                                $mol_fail(new Error('Land is undefined'));
                            const count = this.uint32(offset) >> 8;
                            offset += 4;
                            const faces = lands[land].faces;
                            for (let i = 0; i < count; ++i) {
                                const peer = $mol_base64_ae_encode(new Uint8Array(buf.buffer, buf.byteOffset + offset, 6));
                                const time = this.uint48(offset + 6);
                                faces.time_max(peer, time);
                                offset += 12;
                            }
                            offset = Math.ceil(offset / 8) * 8;
                            continue;
                        }
                        case $hyoo_crus_part.pass: {
                            if (!land)
                                $mol_fail(new Error('Land is undefined'));
                            const unit = new $hyoo_crus_pass(buf.slice(offset, offset += $hyoo_crus_unit.size).buffer);
                            lands[land].units ||= [];
                            lands[land].units.push(unit);
                            continue;
                        }
                        case $hyoo_crus_part.gift: {
                            if (!land)
                                $mol_fail(new Error('Land is undefined'));
                            const unit = new $hyoo_crus_gift(buf.slice(offset, offset += $hyoo_crus_unit.size).buffer);
                            lands[land].units ||= [];
                            lands[land].units.push(unit);
                            continue;
                        }
                        case $hyoo_crus_part.rock: {
                            const size = this.uint32(offset) >> 8;
                            if (size === 0) {
                                const hash = buf.slice(offset + 4, offset + 4 + 24);
                                rocks.push([hash, null]);
                                offset += 4 + 24;
                            }
                            else {
                                const rock = buf.slice(offset + 4, offset + 4 + size);
                                const hash = $mol_crypto_hash(rock);
                                rocks.push([hash, rock]);
                                offset += Math.ceil(size / 8 + .5) * 8;
                            }
                            continue;
                        }
                        case $hyoo_crus_part.root:
                        case $hyoo_crus_part.buck: {
                            offset += 128;
                            continue;
                        }
                        default: $mol_fail(new Error(`Unknown CRUS Pack Part (${kind.toString(2)}) at (${offset.toString(16)})`));
                    }
                }
                else {
                    if (!land)
                        $mol_fail(new Error('Land is undefined'));
                    const unit = $hyoo_crus_sand.from(buf.slice(offset, offset += $hyoo_crus_unit.size));
                    lands[land].units ||= [];
                    lands[land].units.push(unit);
                    continue;
                }
            }
            return { lands, rocks };
        }
        static make({ lands, rocks }) {
            let size = 0;
            for (const land of Reflect.ownKeys(lands)) {
                size += 24;
                size += Math.ceil(lands[land].faces.size * 12 / 8 + .5) * 8;
                size += lands[land].units.length * $hyoo_crus_unit.size;
            }
            for (const [hash, rock] of rocks) {
                size += rock ? Math.ceil(rock.length / 8 + .5) * 8 : 24;
            }
            if (size === 0)
                return null;
            const buff = new Uint8Array(size);
            const pack = new $hyoo_crus_pack(buff.buffer);
            let offset = 0;
            for (const land of Reflect.ownKeys(lands)) {
                const faces = lands[land].faces;
                pack.uint32(offset, $hyoo_crus_part.land | (faces.total << 8));
                buff.set($hyoo_crus_ref_encode(land), offset + 4);
                offset += 24;
                pack.uint32(offset, $hyoo_crus_part.face | (faces.size << 8));
                offset += 4;
                for (const [peer, time] of faces) {
                    buff.set($mol_base64_ae_decode(peer), offset);
                    pack.uint48(offset + 6, time);
                    offset += 12;
                }
                offset = Math.ceil(offset / 8) * 8;
                for (const unit of lands[land].units) {
                    buff.set(unit.asArray(), offset);
                    offset += unit.byteLength;
                }
            }
            for (const [hash, rock] of rocks) {
                const len = rock?.length ?? 0;
                pack.uint32(offset, $hyoo_crus_part.rock | (len << 8));
                if (rock)
                    buff.set(rock, offset + 4);
                else
                    buff.set(hash, offset + 4);
                offset += rock ? Math.ceil(len / 8 + .5) * 8 : 24;
            }
            return pack;
        }
    }
    $.$hyoo_crus_pack = $hyoo_crus_pack;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const Passives = new WeakMap();
    class $hyoo_crus_yard extends $mol_object {
        glob() {
            return null;
        }
        lands_news = new $mol_wire_set();
        static masters = [];
        master_cursor(next = 0) {
            return next;
        }
        master_current() {
            return this.$.$hyoo_crus_yard.masters[this.master_cursor()];
        }
        master_next() {
            this.master_cursor((this.master_cursor() + 1) % this.$.$hyoo_crus_yard.masters.length);
        }
        reconnects(reset) {
            return ($mol_wire_probe(() => this.reconnects()) ?? 0) + 1;
        }
        master() {
            this.reconnects();
            const link = this.master_current();
            if (!link)
                return null;
            const socket = new $mol_dom_context.WebSocket(link.replace(/^http/, 'ws'));
            socket.binaryType = 'arraybuffer';
            const port = $mol_rest_port_ws_std.make({ socket });
            socket.onmessage = async (event) => {
                if (event.data instanceof ArrayBuffer) {
                    if (!event.data.byteLength)
                        return;
                    await $mol_wire_async(this).port_income(port, new Uint8Array(event.data));
                }
                else {
                    this.$.$mol_log3_fail({
                        place: this,
                        message: 'Wrong data',
                        data: event.data
                    });
                }
            };
            let interval;
            socket.onclose = () => {
                clearInterval(interval);
                setTimeout(() => this.reconnects(null), 1000);
            };
            Object.assign(socket, {
                destructor: () => {
                    socket.onclose = () => { };
                    clearInterval(interval);
                    socket.close();
                }
            });
            return new Promise((done, fail) => {
                socket.onopen = () => {
                    this.$.$mol_log3_come({
                        place: this,
                        message: 'Connected',
                        port: $mol_key(port),
                        server: link,
                    });
                    interval = setInterval(() => socket.send(new Uint8Array), 30000);
                    done(port);
                };
                socket.onerror = () => {
                    socket.onclose = event => {
                        fail(new Error(`Master (${link}) is unavailable (${event.code})`));
                        clearInterval(interval);
                        interval = setTimeout(() => {
                            this.master_next();
                            this.reconnects(null);
                        }, 1000);
                    };
                };
            });
        }
        slaves = new $mol_wire_set();
        sync() {
            this.sync_news();
            this.sync_port();
        }
        sync_news() {
            const glob = this.$.$hyoo_crus_glob;
            const lands = [...this.lands_news].map(ref => glob.Land(ref));
            try {
                for (const port of this.masters()) {
                    for (const land of lands) {
                        this.sync_port_land([port, land.ref()]);
                    }
                }
                for (const land of lands)
                    land.saving();
                this.lands_news.clear();
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        sync_port() {
            for (const port of this.ports())
                this.sync_port_lands(port);
        }
        sync_port_lands(port) {
            for (const land of this.port_lands_active(port)) {
                this.sync_port_land([port, land]);
            }
        }
        ports() {
            return [...this.masters(), ...this.slaves];
        }
        masters() {
            try {
                return [this.master()].filter($mol_guard_defined);
            }
            catch (error) {
                $mol_fail_log(error);
                return [];
            }
        }
        port_lands_active(port) {
            return new $mol_wire_set();
        }
        port_lands_passive(port) {
            let passives = Passives.get(port);
            if (!passives)
                Passives.set(port, passives = new Set);
            return passives;
        }
        port_income(port, msg) {
            const pack = $mol_wire_sync($hyoo_crus_pack).from(msg);
            const parts = $mol_wire_sync(pack).parts();
            if (this.$.$hyoo_crus_log())
                $mol_wire_sync(this.$).$mol_log3_rise({
                    place: this,
                    message: 'Gain Pack',
                    port: $mol_key(port),
                    lands: parts.lands,
                    rocks: parts.rocks.length,
                });
            forget: {
                if (parts.rocks.length)
                    break forget;
                const lands = Object.getOwnPropertySymbols(parts.lands);
                for (const land of lands) {
                    if (parts.lands[land].units.length)
                        break forget;
                    if (parts.lands[land].faces.size)
                        break forget;
                    if (!this.port_lands_active(port).has(land))
                        break forget;
                    this.port_lands_active(port).delete(land);
                    return;
                }
            }
            this.face_port_sync(port, parts.lands);
            this.$.$hyoo_crus_glob.apply_parts(parts.lands, parts.rocks);
        }
        face_port_sync(port, income) {
            const actives = this.port_lands_active(port);
            const passives = this.port_lands_passive(port);
            for (const land of Reflect.ownKeys(income)) {
                if (!passives.has(land))
                    actives.add(land);
                const faces = income[land].faces;
                let port_faces = this.face_port_land([port, land]);
                if (!port_faces)
                    this.face_port_land([port, land], port_faces = $mol_mem_cached(() => this.face_port_land([port, land]))
                        || new $hyoo_crus_face_map);
                port_faces.sync(faces);
                const units = income[land].units;
                for (let unit of units) {
                    const unit2 = unit.narrow();
                    if (unit2 instanceof $hyoo_crus_pass)
                        continue;
                    port_faces.time_max(unit2.peer(), unit2.time());
                }
            }
        }
        sync_land(land) {
            for (const port of this.masters()) {
                this.port_lands_passive(port).add(land);
                this.sync_port_land([port, land]);
            }
            this.sync();
        }
        forget_land(land) {
            const faces = new $hyoo_crus_face_map;
            faces.total = land.faces.total;
            const pack = $hyoo_crus_pack.make({
                lands: { [land.ref()]: { faces, units: [] } },
                rocks: [],
            }).asArray();
            for (const port of this.ports()) {
                if (!this.port_lands_passive(port).has(land.ref()))
                    continue;
                this.port_lands_passive(port).delete(land.ref());
                if (this.$.$hyoo_crus_log())
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Forget Land',
                        port: $mol_key(port),
                        land: land.ref(),
                    });
                port.send_bin(pack);
            }
        }
        sync_port_land([port, land]) {
            try {
                this.init_port_land([port, land]);
                const faces = this.face_port_land([port, land]);
                if (!faces)
                    return;
                const Land = this.$.$hyoo_crus_glob.Land(land);
                Land.saving();
                const parts = Land.delta_parts(faces);
                if (!parts)
                    return;
                if (this.$.$hyoo_crus_log())
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Send Unit',
                        port: $mol_key(port),
                        lands: parts.lands,
                        rocks: parts.rocks.length,
                    });
                port.send_bin($hyoo_crus_pack.make(parts).asArray());
                faces.sync(Land.faces);
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        init_port_land([port, land]) {
            const Land = this.$.$hyoo_crus_glob.Land(land);
            Land.loading();
            if (this.$.$hyoo_crus_log())
                this.$.$mol_log3_rise({
                    place: this,
                    message: 'Send Face',
                    port: $mol_key(port),
                    land: land,
                    faces: Land.faces,
                });
            port.send_bin(Land.faces_pack().asArray());
        }
        face_port_land([port, land], next = null) {
            $mol_wire_solid();
            return next;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "glob", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "master_cursor", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "master_current", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_yard.prototype, "master_next", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "reconnects", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "master", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "sync", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "sync_news", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "sync_port", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_yard.prototype, "sync_port_lands", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "ports", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_yard.prototype, "masters", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_yard.prototype, "port_lands_active", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_yard.prototype, "port_income", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_yard.prototype, "face_port_sync", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_yard.prototype, "sync_land", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_yard.prototype, "forget_land", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_yard.prototype, "sync_port_land", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_yard.prototype, "init_port_land", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_yard.prototype, "face_port_land", null);
    $.$hyoo_crus_yard = $hyoo_crus_yard;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_glob extends $mol_object {
        static lands_touched = new $mol_wire_set();
        lands_touched = this.constructor.lands_touched;
        static yard() {
            return new this.$.$hyoo_crus_yard;
        }
        yard() {
            return this.$.$hyoo_crus_glob.yard();
        }
        static home(Node) {
            return this.Land(this.$.$hyoo_crus_auth.current().lord()).Data(Node ?? $hyoo_crus_home);
        }
        home() {
            return this.$.$hyoo_crus_glob.home();
        }
        static king_grab(preset = { '': $hyoo_crus_rank_read }) {
            const king = this.$.$hyoo_crus_auth.grab();
            const colony = $mol_wire_sync($hyoo_crus_land).make({ $: this.$ });
            colony.auth = $mol_const(king);
            if ((preset[''] ?? $hyoo_crus_rank_deny) === $hyoo_crus_rank_deny) {
                colony.encrypted(true);
            }
            const self = this.$.$hyoo_crus_auth.current();
            colony.give(self, $hyoo_crus_rank_rule);
            for (const key in preset)
                colony.give(key ? $hyoo_crus_auth.from(key) : null, preset[key]);
            this.Land(colony.ref()).apply_unit(colony.delta_unit());
            return king;
        }
        king_grab(preset = { '': $hyoo_crus_rank_read }) {
            return this.$.$hyoo_crus_glob.king_grab(preset);
        }
        static land_grab(preset = { '': $hyoo_crus_rank_read }) {
            return this.Land(this.king_grab(preset).lord());
        }
        land_grab(preset = { '': $hyoo_crus_rank_read }) {
            return this.$.$hyoo_crus_glob.land_grab(preset);
        }
        static Land(ref) {
            this.lands_touched.add(ref);
            return $hyoo_crus_land.make({
                ref: $mol_const(ref),
            });
        }
        Land(ref) {
            return this.$.$hyoo_crus_glob.Land(ref);
        }
        static Node(ref, Node) {
            const land = this.Land($hyoo_crus_ref_land(ref));
            return land.Node(Node).Item($hyoo_crus_ref_head(ref));
        }
        Node(ref, Node) {
            return this.$.$hyoo_crus_glob.Node(ref, Node);
        }
        static apply_pack(pack) {
            const { lands, rocks } = pack.parts();
            return this.apply_parts(lands, rocks);
        }
        apply_pack(pack) {
            return this.$.$hyoo_crus_glob.apply_pack(pack);
        }
        static apply_parts(lands, rocks) {
            for (const land of Reflect.ownKeys(lands)) {
                const errors = this.Land(land).apply_unit(lands[land].units).filter(Boolean);
                for (const error of errors)
                    this.$.$mol_log3_warn({
                        place: `${this}.apply_pack()`,
                        message: error,
                        hint: 'Send it to developer',
                    });
            }
            for (const [hash, rock] of rocks) {
                if (!rock)
                    continue;
                this.$.$hyoo_crus_mine.rock_save(rock);
            }
        }
        apply_parts(lands, rocks) {
            return this.$.$hyoo_crus_glob.apply_parts(lands, rocks);
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_glob, "yard", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_glob, "king_grab", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_glob, "land_grab", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_crus_glob, "Land", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_glob, "apply_pack", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_glob, "apply_parts", null);
    $.$hyoo_crus_glob = $hyoo_crus_glob;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_stat_series extends $hyoo_crus_dict_to($hyoo_crus_atom_real) {
        tick(key, val) {
            this.key(key, null).val(this.initial() + val);
        }
        _initial;
        initial() {
            return this._initial
                ?? (this._initial = this.max());
        }
        max() {
            return Math.max(...this.values());
        }
        values() {
            return this.nodes($hyoo_crus_atom_real).map(key => key.val());
        }
    }
    __decorate([
        $mol_action
    ], $hyoo_crus_stat_series.prototype, "tick", null);
    __decorate([
        $mol_action
    ], $hyoo_crus_stat_series.prototype, "initial", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_stat_series.prototype, "max", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_stat_series.prototype, "values", null);
    $.$hyoo_crus_stat_series = $hyoo_crus_stat_series;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_stat_ranges extends $hyoo_crus_dict.with({
        Seconds: $hyoo_crus_stat_series,
        Minutes: $hyoo_crus_stat_series,
        Hours: $hyoo_crus_stat_series,
        Days: $hyoo_crus_stat_series,
        Years: $hyoo_crus_stat_series,
    }) {
        _last_instant = 0;
        tick_instant(val) {
            this.tick_integral(this._last_instant += val);
        }
        tick_integral(val) {
            let now = new $mol_time_moment;
            const second = BigInt(Math.floor(now.second));
            const minute = BigInt(now.minute);
            const hour = BigInt(now.hour);
            const from_ny = new $mol_time_interval({ start: { year: now.year, month: 0, day: 0 }, end: now });
            const day = BigInt(Math.floor(from_ny.duration.count('P1D')));
            const year = BigInt(now.year);
            this.Seconds(null).tick(second, val);
            this.Minutes(null).tick(minute, val);
            this.Hours(null).tick(hour, val);
            this.Days(null).tick(day, val);
            this.Years(null).tick(year, val);
        }
        series() {
            function pick(Series, length, range) {
                let series = Array.from({ length }, (_, i) => Series.key(BigInt(i))?.val() ?? 0);
                let start = 0;
                let max = 0;
                for (let i = 0; i < series.length; ++i) {
                    if (series[i] < max)
                        continue;
                    max = series[i];
                    start = i + 1;
                }
                if (start)
                    series = [...series.slice(start), ...series.slice(0, start - 1)];
                let last = series[0];
                series = series.slice(1).map(val => {
                    try {
                        if (last === 0 || val < last)
                            return 0;
                        return (val - last) / range;
                    }
                    finally {
                        last = Math.max(val, last);
                    }
                });
                return series;
            }
            let days = pick(this.Days(), 365, 60 * 60 * 24);
            let hours = pick(this.Hours(), 24, 60 * 60);
            let minutes = pick(this.Minutes(), 60, 60);
            let seconds = pick(this.Seconds(), 60, 1);
            return [...days, ...hours, ...minutes, ...seconds].reverse();
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_stat_ranges.prototype, "series", null);
    $.$hyoo_crus_stat_ranges = $hyoo_crus_stat_ranges;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_app_stat extends $hyoo_crus_dict.with({
        Uptime: $hyoo_crus_atom_dur,
        Cpu_user: $hyoo_crus_stat_ranges,
        Cpu_system: $hyoo_crus_stat_ranges,
        Mem_used: $hyoo_crus_stat_ranges,
        Mem_free: $hyoo_crus_stat_ranges,
        Fs_free: $hyoo_crus_stat_ranges,
        Fs_reads: $hyoo_crus_stat_ranges,
        Fs_writes: $hyoo_crus_stat_ranges,
        Port_slaves: $hyoo_crus_stat_ranges,
        Port_masters: $hyoo_crus_stat_ranges,
    }) {
        freshness() {
            const last = this.last_change();
            if (!last)
                return null;
            const range = new $mol_time_interval({
                start: last,
                end: new $mol_time_moment(this.$.$mol_state_time.now(1000)),
            });
            return range.duration.count('PT1s');
        }
        uptime(next) {
            return this.Uptime(next)?.val(next) ?? new $mol_time_duration(0);
        }
        tick() {
            this.$.$mol_state_time.now(1000);
            this.uptime(new $mol_time_duration({ second: Math.floor(process.uptime()) }).normal);
            const res = process.resourceUsage();
            this.Cpu_user(null).tick_integral(res.userCPUTime / 1e6);
            this.Cpu_system(null).tick_integral(res.systemCPUTime / 1e6);
            this.Fs_reads(null).tick_integral(res.fsRead);
            this.Fs_writes(null).tick_integral(res.fsWrite);
            const mem_total = $node.os.totalmem();
            this.Mem_used(null).tick_instant((res.maxRSS - res.sharedMemorySize) * 1024 / mem_total * 100);
            this.Mem_free(null).tick_instant($node.os.freemem() / mem_total * 100);
            const fs = $node.fs.statfsSync('.');
            this.Fs_free(null).tick_instant(Number(fs.bfree) / Number(fs.blocks) * 100);
            const masters = $mol_wire_sync(this.$.$hyoo_crus_glob.yard()).masters().length;
            this.Port_masters(null).tick_instant(masters);
            const slaves = $mol_wire_sync(this.$.$hyoo_crus_glob.yard()).ports().length - masters;
            this.Port_slaves(null).tick_instant(slaves);
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_stat.prototype, "freshness", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_stat.prototype, "uptime", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_stat.prototype, "tick", null);
    $.$hyoo_crus_app_stat = $hyoo_crus_app_stat;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_app_home extends $hyoo_crus_home.with({
        Aliases: $hyoo_crus_dict_to($hyoo_crus_list_str),
        Stat: $hyoo_crus_atom_ref_to(() => $hyoo_crus_app_stat),
    }) {
        stat(auto) {
            return this.Stat(auto)?.ensure(this.land()) ?? null;
        }
        init() { }
        tick() { }
    }
    $.$hyoo_crus_app_home = $hyoo_crus_app_home;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_app_home_node extends $hyoo_crus_app_home {
        init() {
            this.title(process.env.DOMAIN || $node.os.hostname());
            const source = this.aliases();
            const target = this.Aliases(null);
            for (const ip of target.keys().map($hyoo_crus_vary_cast_str)) {
                if (!ip || !source.has(ip))
                    target.cut(ip);
            }
            for (const [ip, names] of source) {
                target.key(ip, null).items(names);
            }
        }
        ips() {
            const ips = [];
            for (const group of Object.values($node.os.networkInterfaces())) {
                for (const face of group) {
                    if (face.internal)
                        continue;
                    ips.push(face.address);
                }
            }
            return ips;
        }
        async lookup(ip) {
            try {
                return await $node.dns.promises.reverse(ip);
            }
            catch (error) {
                $mol_fail_log(error);
                return [];
            }
        }
        aliases() {
            const self = $mol_wire_sync(this);
            return new Map(this.ips().map(ip => [ip, self.lookup(ip)]));
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_home_node.prototype, "init", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_home_node.prototype, "ips", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_home_node.prototype, "aliases", null);
    $.$hyoo_crus_app_home_node = $hyoo_crus_app_home_node;
    $.$hyoo_crus_app_home = $hyoo_crus_app_home_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $hyoo_crus_app_node extends $mol_rest_resource_fs {
        _yard() {
            $mol_wire_solid();
            setTimeout(() => this._sync());
            return this.$.$hyoo_crus_glob.yard();
        }
        _sync() {
            $mol_wire_solid();
            this._yard().sync();
        }
        ref() {
            return new $hyoo_crus_app_node_ref;
        }
        OPEN(msg) {
            this._yard().slaves.add(msg.port);
        }
        POST(msg) {
            this._yard().port_income(msg.port, msg.bin());
        }
        CLOSE(msg) {
            this._yard().slaves.delete(msg.port);
        }
        _auto() {
            this._stat_update();
        }
        _stat_update() {
            const home = this.$.$hyoo_crus_glob.home($hyoo_crus_app_home);
            home.init();
            home.tick();
            const stat = home.stat(null);
            stat.tick();
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_node.prototype, "_yard", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_node.prototype, "_sync", null);
    __decorate([
        $mol_memo.method
    ], $hyoo_crus_app_node.prototype, "ref", null);
    __decorate([
        $mol_mem
    ], $hyoo_crus_app_node.prototype, "_stat_update", null);
    $.$hyoo_crus_app_node = $hyoo_crus_app_node;
    class $hyoo_crus_app_node_ref extends $mol_rest_resource {
        GET(msg) {
            msg.reply(this.$.$hyoo_crus_auth.current().lord().description);
        }
    }
    $.$hyoo_crus_app_node_ref = $hyoo_crus_app_node_ref;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $hyoo_crus_yard.masters = $mol_state_arg.value('masters')?.split(',') ?? [];
    $hyoo_crus_app_node.serve();
})($ || ($ = {}));


//# sourceMappingURL=node.js.map
