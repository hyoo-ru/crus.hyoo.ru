declare let _$_: {
    new (): {};
} & typeof globalThis;
declare class $ extends _$_ {
}
declare namespace $ {
    export type $ = typeof $$;
    export class $$ extends $ {
    }
    namespace $$ {
        type $$ = $;
    }
    export {};
}

declare namespace $ {
    const $mol_ambient_ref: unique symbol;
    type $mol_ambient_context = $;
    function $mol_ambient(this: $ | void, overrides: Partial<$>): $;
}

declare namespace $ {
    function $mol_delegate<Value extends object>(proto: Value, target: () => Value): Value;
}

declare namespace $ {
    const $mol_owning_map: WeakMap<any, any>;
    function $mol_owning_allow<Having>(having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_get<Having, Owner extends object>(having: Having, Owner?: {
        new (): Owner;
    }): Owner | null;
    function $mol_owning_check<Owner, Having>(owner: Owner, having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_catch<Owner, Having>(owner: Owner, having: Having): boolean;
}

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    type $mol_type_writable<T> = {
        -readonly [P in keyof T]: T[P];
    };
}

declare namespace $ {
    function $mol_func_name(this: $, func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
}

declare namespace $ {
    class $mol_object2 {
        static $: typeof $$;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
        get $(): $;
        set $(next: $);
        static create<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: $mol_type_writable<Instance>) => void): Instance;
        static [Symbol.toPrimitive](): any;
        static toString(): any;
        static toJSON(): any;
        destructor(): void;
        static destructor(): void;
        toString(): string;
    }
}

declare namespace $ {
    namespace $$ { }
    const $mol_object_field: unique symbol;
    class $mol_object extends $mol_object2 {
        static make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
    }
}

declare namespace $ {
    enum $mol_wire_cursor {
        stale = -1,
        doubt = -2,
        fresh = -3,
        final = -4
    }
}

declare namespace $ {
    class $mol_wire_pub extends Object {
        data: unknown[];
        static get [Symbol.species](): ArrayConstructor;
        protected sub_from: number;
        get sub_list(): readonly $mol_wire_sub[];
        get sub_empty(): boolean;
        sub_on(sub: $mol_wire_pub, pub_pos: number): number;
        sub_off(sub_pos: number): void;
        reap(): void;
        promote(): void;
        fresh(): void;
        complete(): void;
        get incompleted(): boolean;
        emit(quant?: $mol_wire_cursor): void;
        peer_move(from_pos: number, to_pos: number): void;
        peer_repos(peer_pos: number, self_pos: number): void;
    }
}

declare namespace $ {
    interface $mol_wire_sub extends $mol_wire_pub {
        temp: boolean;
        track_on(): $mol_wire_sub | null;
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        pub_off(pub_pos: number): void;
        track_cut(sub: $mol_wire_pub | null): void;
        track_off(sub: $mol_wire_pub | null): void;
        absorb(quant: $mol_wire_cursor): void;
        destructor(): void;
    }
}

declare namespace $ {
    let $mol_wire_auto_sub: $mol_wire_sub | null;
    function $mol_wire_auto(next?: $mol_wire_sub | null): $mol_wire_sub | null;
    const $mol_wire_affected: (number | $mol_wire_sub)[];
}

declare namespace $ {
    function $mol_dev_format_register(config: {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => false;
    } | {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => boolean;
        body: (val: any, config: any) => any;
    }): void;
    let $mol_dev_format_head: symbol;
    let $mol_dev_format_body: symbol;
    function $mol_dev_format_native(obj: any): any[];
    function $mol_dev_format_auto(obj: any): any[];
    function $mol_dev_format_element(element: string, style: object, ...content: any[]): any[];
    function $mol_dev_format_span(style: object, ...content: any[]): any[];
    let $mol_dev_format_div: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_ol: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_li: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_table: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_tr: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_td: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_accent: (...args: any[]) => any[];
    let $mol_dev_format_strong: (...args: any[]) => any[];
    let $mol_dev_format_string: (...args: any[]) => any[];
    let $mol_dev_format_shade: (...args: any[]) => any[];
    let $mol_dev_format_indent: (...args: any[]) => any[];
}

declare namespace $ {
    class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
        protected pub_from: number;
        protected cursor: $mol_wire_cursor;
        get temp(): boolean;
        get pub_list(): $mol_wire_pub[];
        track_on(): $mol_wire_sub | null;
        promote(): void;
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        track_off(sub: $mol_wire_sub | null): void;
        pub_off(sub_pos: number): void;
        destructor(): void;
        track_cut(): void;
        complete(): void;
        complete_pubs(): void;
        absorb(quant?: $mol_wire_cursor): void;
        get pub_empty(): boolean;
    }
}

declare namespace $ {
    class $mol_after_timeout extends $mol_object2 {
        delay: number;
        task: () => void;
        id: any;
        constructor(delay: number, task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    function $mol_promise_like(val: any): val is Promise<any>;
}

declare namespace $ {
    abstract class $mol_wire_fiber<Host, Args extends readonly unknown[], Result> extends $mol_wire_pub_sub {
        readonly task: (this: Host, ...args: Args) => Result;
        readonly host?: Host | undefined;
        static warm: boolean;
        static planning: Set<$mol_wire_fiber<any, any, any>>;
        static reaping: Set<$mol_wire_fiber<any, any, any>>;
        static plan_task: $mol_after_timeout | null;
        static plan(): void;
        static sync(): void;
        [Symbol.toStringTag]: string;
        cache: Result | Error | Promise<Result | Error>;
        get args(): Args;
        result(): Result | undefined;
        get incompleted(): boolean;
        field(): string;
        constructor(id: string, task: (this: Host, ...args: Args) => Result, host?: Host | undefined, args?: Args);
        plan(): this;
        reap(): void;
        toString(): string;
        toJSON(): string;
        get $(): any;
        emit(quant?: $mol_wire_cursor): void;
        fresh(): this | undefined;
        refresh(): void;
        abstract put(next: Result | Error | Promise<Result | Error>): Result | Error | Promise<Result | Error>;
        sync(): Awaited<Result>;
        async(): Promise<Result>;
        step(): Promise<null>;
    }
}

declare namespace $ {
    function $mol_guid(length?: number, exists?: (id: string) => boolean): string;
}

declare namespace $ {
    const $mol_key_store: WeakMap<object, string>;
    function $mol_key<Value>(value: Value): string;
}

declare namespace $ {
    class $mol_after_frame extends $mol_object2 {
        task: () => void;
        static _promise: Promise<void> | null;
        static get promise(): Promise<void>;
        cancelled: boolean;
        promise: Promise<void>;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    let $mol_compare_deep_cache: WeakMap<any, WeakMap<any, boolean>>;
    function $mol_compare_deep<Value>(left: Value, right: Value): boolean;
}

declare namespace $ {
    type $mol_log3_event<Fields> = {
        [key in string]: unknown;
    } & {
        time?: string;
        place: unknown;
        message: string;
    } & Fields;
    type $mol_log3_logger<Fields, Res = void> = (this: $, event: $mol_log3_event<Fields>) => Res;
    let $mol_log3_come: $mol_log3_logger<{}>;
    let $mol_log3_done: $mol_log3_logger<{}>;
    let $mol_log3_fail: $mol_log3_logger<{}>;
    let $mol_log3_warn: $mol_log3_logger<{
        hint: string;
    }>;
    let $mol_log3_rise: $mol_log3_logger<{}>;
    let $mol_log3_area: $mol_log3_logger<{}, () => void>;
    function $mol_log3_area_lazy(this: $, event: $mol_log3_event<{}>): () => void;
    let $mol_log3_stack: (() => void)[];
}

declare namespace $ {
    type $mol_type_keys_extract<Input, Upper, Lower = never> = {
        [Field in keyof Input]: unknown extends Input[Field] ? never : Input[Field] extends never ? never : Input[Field] extends Upper ? [
            Lower
        ] extends [Input[Field]] ? Field : never : never;
    }[keyof Input];
}

declare namespace $ {
    function $mol_log3_web_make(level: $mol_type_keys_extract<Console, Function>, color: string): (this: $, event: $mol_log3_event<{}>) => () => void;
}

declare namespace $ {
    class $mol_wire_task<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static getter<Host, Args extends readonly unknown[], Result>(task: (this: Host, ...args: Args) => Result): (host: Host, args: Args) => $mol_wire_task<Host, Args, Result>;
        get temp(): boolean;
        complete(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
    }
}

declare namespace $ {
    function $mol_wire_method<Host extends object, Args extends readonly any[]>(host: Host, field: PropertyKey, descr?: TypedPropertyDescriptor<(...args: Args) => any>): {
        value: (this: Host, ...args: Args) => any;
        enumerable?: boolean | undefined;
        configurable?: boolean | undefined;
        writable?: boolean | undefined;
        get?: (() => (...args: Args) => any) | undefined;
        set?: ((value: (...args: Args) => any) => void) | undefined;
    };
}

declare namespace $ {
    type $mol_type_tail<Tuple extends readonly any[]> = ((...tail: Tuple) => any) extends ((head: any, ...tail: infer Tail) => any) ? Tail : never;
}

declare namespace $ {
    type $mol_type_foot<Tuple extends readonly any[]> = Tuple['length'] extends 0 ? never : Tuple[$mol_type_tail<Tuple>['length']];
}

declare namespace $ {
    function $mol_fail_catch(error: unknown): boolean;
}

declare namespace $ {
    function $mol_fail_log(error: unknown): boolean;
}

declare namespace $ {
    class $mol_wire_atom<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static solo<Host, Args extends readonly unknown[], Result>(host: Host, task: (this: Host, ...args: Args) => Result): $mol_wire_atom<Host, Args, Result>;
        static plex<Host, Args extends readonly unknown[], Result>(host: Host, task: (this: Host, ...args: Args) => Result, key: Args[0]): $mol_wire_atom<Host, Args, Result>;
        static watching: Set<$mol_wire_atom<any, any, any>>;
        static watcher: $mol_after_frame | null;
        static watch(): void;
        watch(): void;
        resync(args: Args): Error | Result | Promise<Error | Result>;
        once(): Awaited<Result>;
        channel(): ((next?: $mol_type_foot<Args>) => Awaited<Result>) & {
            atom: $mol_wire_atom<Host, Args, Result>;
        };
        destructor(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
    }
}

declare namespace $ {
    export function $mol_wire_solo<Args extends any[]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): TypedPropertyDescriptor<(...args: First_optional<Args>) => any>;
    type First_optional<Args extends any[]> = Args extends [] ? [] : [Args[0] | undefined, ...$mol_type_tail<Args>];
    export {};
}

declare namespace $ {
    function $mol_wire_plex<Args extends [any, ...any[]]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): {
        value: (this: typeof host, ...args: Args) => any;
        enumerable?: boolean | undefined;
        configurable?: boolean | undefined;
        writable?: boolean | undefined;
        get?: (() => (...args: Args) => any) | undefined;
        set?: ((value: (...args: Args) => any) => void) | undefined;
    };
}

declare namespace $ {
    let $mol_mem: typeof $mol_wire_solo;
    let $mol_mem_key: typeof $mol_wire_plex;
}

declare namespace $ {
    class $mol_window extends $mol_object {
        static size(): {
            width: number;
            height: number;
        };
        static resizes(next?: Event): Event | undefined;
    }
}

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    class $mol_after_tick extends $mol_object2 {
        task: () => void;
        promise: any;
        cancelled: boolean;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], notify?: 'notify'): Element[];
    }
}

declare namespace $ {
    function $mol_maybe<Value>(value: Value | null | undefined): Value[];
}

declare namespace $ {
}

declare namespace $ {
    class $mol_wrapper extends $mol_object2 {
        static wrap: (task: (...ags: any[]) => any) => (...ags: any[]) => any;
        static run<Result>(task: () => Result): Result;
        static func<Args extends any[], Result, Host = void>(func: (this: Host, ...args: Args) => Result): (this: Host, ...args: Args) => Result;
        static get class(): <Class extends new (...args: any[]) => any>(Class: Class) => Class;
        static get method(): (obj: object, name: PropertyKey, descr: PropertyDescriptor) => PropertyDescriptor;
        static get field(): <Host, Field extends keyof Host, Args extends any[], Result>(obj: Host, name: Field, descr: TypedPropertyDescriptor<Result>) => TypedPropertyDescriptor<Result>;
    }
}

declare namespace $ {
    class $mol_memo extends $mol_wrapper {
        static wrap<This extends object, Value>(task: (this: This, next?: Value) => Value): (this: This, next?: Value) => Value | undefined;
    }
}

declare namespace $ {
    function $mol_dom_qname(name: string): string;
}

declare namespace $ {
    function $mol_wire_probe<Value>(task: () => Value, def?: Value): Value | undefined;
}

declare namespace $ {
    function $mol_wire_watch(): void;
}

declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

declare namespace $ {
    function $mol_wire_solid(): void;
}

declare namespace $ {
    function $mol_dom_render_attributes(el: Element, attrs: {
        [key: string]: string | number | boolean | null;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_events(el: Element, events: {
        [key: string]: (event: Event) => any;
    }, passive?: boolean): void;
}

declare namespace $ {
    function $mol_dom_render_styles(el: Element, styles: {
        [key: string]: string | number;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_children(el: Element | DocumentFragment, childNodes: NodeList | Array<Node | string | null>): void;
}

declare namespace $ {
    function $mol_dom_render_fields(el: Element, fields: {
        [key: string]: any;
    }): void;
}

declare namespace $ {
    export function $mol_wire_async<Host extends object>(obj: Host): ObjectOrFunctionResultPromisify<Host>;
    type FunctionResultPromisify<Some> = Some extends (...args: infer Args) => infer Res ? Res extends PromiseLike<unknown> ? Some : (...args: Args) => Promise<Res> : Some;
    type MethodsResultPromisify<Host extends Object> = {
        [K in keyof Host]: FunctionResultPromisify<Host[K]>;
    };
    type ObjectOrFunctionResultPromisify<Some> = (Some extends (...args: any) => unknown ? FunctionResultPromisify<Some> : {}) & (Some extends Object ? MethodsResultPromisify<Some> : Some);
    export {};
}

declare namespace $ {
    type $mol_type_pick<Input, Upper> = Pick<Input, $mol_type_keys_extract<Input, Upper>>;
}

declare namespace $ {
    function $mol_style_attach(id: string, text: string): HTMLStyleElement | null;
}

declare namespace $ {
    class $mol_decor<Value> {
        readonly value: Value;
        constructor(value: Value);
        prefix(): string;
        valueOf(): Value;
        postfix(): string;
        toString(): string;
    }
}

declare namespace $ {
    type $mol_style_unit_length = '%' | 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt' | 'cap' | 'ch' | 'em' | 'rem' | 'ex' | 'ic' | 'lh' | 'rlh' | 'vh' | 'vw' | 'vi' | 'vb' | 'vmin' | 'vmax';
    type $mol_style_unit_angle = 'deg' | 'rad' | 'grad' | 'turn';
    type $mol_style_unit_time = 's' | 'ms';
    type $mol_style_unit_any = $mol_style_unit_length | $mol_style_unit_angle | $mol_style_unit_time;
    type $mol_style_unit_str<Quanity extends $mol_style_unit_any = $mol_style_unit_any> = `${number}${Quanity}`;
    class $mol_style_unit<Literal extends $mol_style_unit_any> extends $mol_decor<number> {
        readonly literal: Literal;
        constructor(value: number, literal: Literal);
        postfix(): Literal;
        static per(value: number): `${number}%`;
        static px(value: number): `${number}px`;
        static mm(value: number): `${number}mm`;
        static cm(value: number): `${number}cm`;
        static Q(value: number): `${number}Q`;
        static in(value: number): `${number}in`;
        static pc(value: number): `${number}pc`;
        static pt(value: number): `${number}pt`;
        static cap(value: number): `${number}cap`;
        static ch(value: number): `${number}ch`;
        static em(value: number): `${number}em`;
        static rem(value: number): `${number}rem`;
        static ex(value: number): `${number}ex`;
        static ic(value: number): `${number}ic`;
        static lh(value: number): `${number}lh`;
        static rlh(value: number): `${number}rlh`;
        static vh(value: number): `${number}vh`;
        static vw(value: number): `${number}vw`;
        static vi(value: number): `${number}vi`;
        static vb(value: number): `${number}vb`;
        static vmin(value: number): `${number}vmin`;
        static vmax(value: number): `${number}vmax`;
        static deg(value: number): `${number}deg`;
        static rad(value: number): `${number}rad`;
        static grad(value: number): `${number}grad`;
        static turn(value: number): `${number}turn`;
        static s(value: number): `${number}s`;
        static ms(value: number): `${number}ms`;
    }
}

declare namespace $ {
    type $mol_style_func_name = 'calc' | 'hsla' | 'rgba' | 'var' | 'clamp' | 'scale' | 'cubic-bezier' | 'linear' | 'steps' | $mol_style_func_image | $mol_style_func_filter;
    type $mol_style_func_image = 'url' | 'linear-gradient' | 'radial-gradient' | 'conic-gradient';
    type $mol_style_func_filter = 'blur' | 'brightness' | 'contrast' | 'drop-shadow' | 'grayscale' | 'hue-rotate' | 'invert' | 'opacity' | 'sepia' | 'saturate';
    class $mol_style_func<Name extends $mol_style_func_name, Value = unknown> extends $mol_decor<Value> {
        readonly name: Name;
        constructor(name: Name, value: Value);
        prefix(): string;
        postfix(): string;
        static linear_gradient<Value>(value: Value): $mol_style_func<"linear-gradient", Value>;
        static calc<Value>(value: Value): $mol_style_func<"calc", Value>;
        static vary<Name extends string, Value extends string>(name: Name, defaultValue?: Value): $mol_style_func<"var", Name | (Name | Value)[]>;
        static url<Href extends string>(href: Href): $mol_style_func<"url", string>;
        static hsla(hue: number, saturation: number, lightness: number, alpha: number): $mol_style_func<"hsla", (number | `${number}%`)[]>;
        static clamp(min: $mol_style_unit_str<any>, mid: $mol_style_unit_str<any>, max: $mol_style_unit_str<any>): $mol_style_func<"clamp", `${number}${any}`[]>;
        static rgba(red: number, green: number, blue: number, alpha: number): $mol_style_func<"rgba", number[]>;
        static scale(zoom: number): $mol_style_func<"scale", number[]>;
        static linear(...breakpoints: Array<number | [number, number | $mol_style_unit_str<'%'>]>): $mol_style_func<"linear", string[]>;
        static cubic_bezier(x1: number, y1: number, x2: number, y2: number): $mol_style_func<"cubic-bezier", number[]>;
        static steps(value: number, step_position: 'jump-start' | 'jump-end' | 'jump-none' | 'jump-both' | 'start' | 'end'): $mol_style_func<"steps", (number | "end" | "start" | "jump-start" | "jump-end" | "jump-none" | "jump-both")[]>;
        static blur(value?: $mol_style_unit_str<$mol_style_unit_length>): $mol_style_func<"blur", string>;
        static brightness(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"brightness", string | number>;
        static contrast(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"contrast", string | number>;
        static drop_shadow(color: $mol_style_properties_color, x_offset: $mol_style_unit_str<$mol_style_unit_length>, y_offset: $mol_style_unit_str<$mol_style_unit_length>, blur_radius?: $mol_style_unit_str<$mol_style_unit_length>): $mol_style_func<"drop-shadow", (`${number}%` | `${number}px` | `${number}mm` | `${number}cm` | `${number}Q` | `${number}in` | `${number}pc` | `${number}pt` | `${number}cap` | `${number}ch` | `${number}em` | `${number}rem` | `${number}ex` | `${number}ic` | `${number}lh` | `${number}rlh` | `${number}vh` | `${number}vw` | `${number}vi` | `${number}vb` | `${number}vmin` | `${number}vmax` | $mol_style_properties_color)[]>;
        static grayscale(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"grayscale", string | number>;
        static hue_rotate(value?: 0 | $mol_style_unit_str<$mol_style_unit_angle>): $mol_style_func<"hue-rotate", string | 0>;
        static invert(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"invert", string | number>;
        static opacity(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"opacity", string | number>;
        static sepia(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"sepia", string | number>;
        static saturate(value?: number | $mol_style_unit_str<'%'>): $mol_style_func<"saturate", string | number>;
    }
}

declare namespace $ {
    type $mol_type_override<Base, Over> = Omit<Base, keyof Over> & Over;
}

declare namespace $ {
    export type $mol_style_properties = Partial<$mol_type_override<CSSStyleDeclaration, Overrides>>;
    type Common = 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer' | $mol_style_func<'var'>;
    export type $mol_style_properties_color = 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure' | 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue' | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' | 'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' | 'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategrey' | 'darkturquoise' | 'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia' | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray' | 'green' | 'greenyellow' | 'grey' | 'honeydew' | 'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' | 'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' | 'limegreen' | 'linen' | 'magenta' | 'maroon' | 'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin' | 'navajowhite' | 'navy' | 'oldlace' | 'olive' | 'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple' | 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue' | 'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'silver' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'teal' | 'thistle' | 'tomato' | 'turquoise' | 'violet' | 'wheat' | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen' | 'transparent' | 'currentcolor' | $mol_style_func<'hsla' | 'rgba' | 'var'> | `#${string}`;
    type Length = 0 | `${number}${$mol_style_unit_length}` | $mol_style_func<'calc' | 'var' | 'clamp'>;
    type Size = 'auto' | 'max-content' | 'min-content' | 'fit-content' | Length | Common;
    type Directions<Value> = Value | readonly [Value, Value] | {
        top?: Value;
        right?: Value;
        bottom?: Value;
        left?: Value;
    };
    type Single_animation_composition = 'replace' | 'add' | 'accumulate';
    type Single_animation_direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    type Single_animation_fill_mode = 'none' | 'forwards' | 'backwards' | 'both';
    type Single_animation_iteration_count = 'infinite' | number;
    type Single_animation_play_state = 'running' | 'paused';
    type Easing_function = Linear_easing_function | Cubic_bezier_easing_function | Step_easing_function;
    type Linear_easing_function = 'linear' | $mol_style_func<'linear'>;
    type Cubic_bezier_easing_function = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | $mol_style_func<'cubic-bezier'>;
    type Step_easing_function = 'step-start' | 'step-end' | $mol_style_func<'steps'>;
    type Compat_auto = 'searchfield' | 'textarea' | 'push-button' | 'slider-horizontal' | 'checkbox' | 'radio' | 'menulist' | 'listbox' | 'meter' | 'progress-bar' | 'button';
    type Compat_special = 'textfield' | 'menulist-button';
    type Mix_blend_mode = Blend_mode | 'plus-darker' | 'plus-lighter';
    type Blend_mode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
    type Box = 'border-box' | 'padding-box' | 'content-box';
    type Baseline_position = 'baseline' | `${'first' | 'last'} baseline`;
    type Content_distribution = 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
    type Self_position = 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end';
    type Content_position = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end';
    type Span_align = 'none' | 'start' | 'end' | 'center' | $mol_style_func<'var'>;
    type Snap_axis = 'x' | 'y' | 'block' | 'inline' | 'both' | $mol_style_func<'var'>;
    type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'overlay' | Common;
    type Overflow_position = 'unsafe' | 'safe';
    type ContainRule = 'size' | 'layout' | 'style' | 'paint' | $mol_style_func<'var'>;
    type Repeat = 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | $mol_style_func<'var'>;
    type BG_size = Length | 'auto' | 'contain' | 'cover';
    interface Overrides {
        accentColor?: $mol_style_properties_color | Common;
        align?: {
            content?: 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common;
            items?: 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
            self?: 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
        };
        justify?: {
            content?: 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common;
            items?: 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
            self?: 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
        };
        all?: Common;
        animation?: {
            composition?: Single_animation_composition | Single_animation_composition[][] | Common;
            delay?: $mol_style_unit_str<$mol_style_unit_time> | $mol_style_unit_str<$mol_style_unit_time>[][] | Common;
            direction?: Single_animation_direction | Single_animation_direction[][] | Common;
            duration?: $mol_style_unit_str<$mol_style_unit_time> | $mol_style_unit_str<$mol_style_unit_time>[][] | Common;
            fillMode?: Single_animation_fill_mode | Single_animation_fill_mode[][] | Common;
            iterationCount?: Single_animation_iteration_count | Single_animation_iteration_count[][] | Common;
            name?: 'none' | string & {} | ('none' | string & {})[][] | Common;
            playState?: Single_animation_play_state | Single_animation_play_state[][] | Common;
            timingFunction?: Easing_function | Easing_function[][] | Common;
        };
        appearance?: 'none' | 'auto' | Compat_auto | Compat_special | Common;
        aspectRatio?: 'auto' | number | `${number} / ${number}`;
        backdropFilter: $mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'> | ($mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'>)[][] | 'none' | Common;
        backfaceVisibility: 'visible' | 'hidden' | Common;
        justifyContent?: 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'space-between' | 'space-around' | 'space-evenly' | 'normal' | 'stretch' | 'center' | Common;
        gap?: Length;
        background?: 'none' | {
            attachment?: 'scroll' | 'fixed' | 'local' | ('scroll' | 'fixed' | 'local')[][] | Common;
            blendMode?: Mix_blend_mode | Mix_blend_mode[][] | Common;
            clip?: Box | Box[][] | Common;
            color?: $mol_style_properties_color | Common;
            image?: readonly (readonly [$mol_style_func<$mol_style_func_image> | string & {}])[] | 'none' | Common;
            repeat?: Repeat | [Repeat, Repeat] | Common;
            position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | Common;
            size?: (BG_size | [BG_size, BG_size])[];
        };
        box?: {
            shadow?: readonly ([
                ...[inset: 'inset'] | [],
                x: Length,
                y: Length,
                blur: Length,
                spread: Length,
                color: $mol_style_properties_color
            ] | {
                inset?: boolean;
                x: Length;
                y: Length;
                blur: Length;
                spread: Length;
                color: $mol_style_properties_color;
            })[] | 'none' | Common;
        };
        font?: {
            style?: 'normal' | 'italic' | Common;
            weight?: 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | Common;
            size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | Length | Common;
            family?: string & {} | 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | Common;
        };
        color?: $mol_style_properties_color | Common;
        display?: 'block' | 'inline' | 'run-in' | 'list-item' | 'none' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'contents' | 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-column-group' | 'table-row' | 'table-cell' | 'table-column' | 'table-caption' | 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid' | 'ruby' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container' | Common;
        overflow?: Overflow | {
            x?: Overflow | Common;
            y?: Overflow | Common;
            anchor?: 'auto' | 'none' | Common;
        };
        contain?: 'none' | 'strict' | 'content' | ContainRule | readonly ContainRule[] | Common;
        whiteSpace?: 'normal' | 'nowrap' | 'break-spaces' | 'pre' | 'pre-wrap' | 'pre-line' | Common;
        webkitOverflowScrolling?: 'auto' | 'touch' | Common;
        scrollbar?: {
            color?: readonly [$mol_style_properties_color, $mol_style_properties_color] | 'auto' | Common;
            width?: 'auto' | 'thin' | 'none' | Common;
        };
        scroll?: {
            snap?: {
                type: 'none' | Snap_axis | readonly [Snap_axis, 'mandatory' | 'proximity'] | Common;
                stop: 'normal' | 'always' | Common;
                align: Span_align | readonly [Span_align, Span_align] | Common;
            };
            padding?: Directions<Length | 'auto'>;
        };
        width?: Size;
        minWidth?: Size;
        maxWidth?: Size;
        height?: Size;
        minHeight?: Size;
        maxHeight?: Size;
        margin?: Directions<Length | 'auto'>;
        padding?: Directions<Length | 'auto'>;
        position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed' | Common;
        top?: Length | 'auto' | Common;
        right?: Length | 'auto' | Common;
        bottom?: Length | 'auto' | Common;
        left?: Length | 'auto' | Common;
        border?: Directions<{
            radius?: Length | [Length, Length];
            style?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | Common;
            color?: $mol_style_properties_color | Common;
            width?: Length | Common;
        }>;
        flex?: 'none' | 'auto' | {
            grow?: number | Common;
            shrink?: number | Common;
            basis?: Size | Common;
            direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | Common;
            wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | Common;
        };
        zIndex: number | Common;
        opacity: number | Common;
    }
    export {};
}

declare namespace $ {
    function $mol_style_prop<Keys extends string[]>(prefix: string, keys: Keys): Record<Keys[number], $mol_style_func<"var", unknown>>;
}

declare namespace $ {
    const $mol_theme: Record<"image" | "line" | "text" | "field" | "current" | "hover" | "focus" | "back" | "card" | "special" | "control" | "shade", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
    let $mol_gap: Record<"text" | "space" | "block" | "blur" | "round", $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
    type $mol_view_content = $mol_view | Node | string | number | boolean;
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    class $mol_view extends $mol_object {
        static Root<This extends typeof $mol_view>(this: This, id: number): InstanceType<This>;
        autorun(): void;
        static autobind(): void;
        title(): string;
        focused(next?: boolean): boolean;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): readonly (string | number | boolean | $mol_view | Node)[];
        sub_visible(): readonly (string | number | boolean | $mol_view | Node)[];
        minimal_width(): number;
        maximal_width(): number;
        minimal_height(): number;
        static watchers: Set<$mol_view>;
        view_rect(): {
            width: number;
            height: number;
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | null;
        dom_id(): string;
        dom_node_external(next?: Element): Element;
        dom_node(next?: Element): Element;
        dom_final(): Element | undefined;
        dom_tree(next?: Element): Element;
        dom_node_actual(): Element;
        auto(): any;
        render(): void;
        static view_classes(): (typeof $mol_view)[];
        static _view_names?: Map<string, string[]>;
        static view_names(suffix: string): string[];
        view_names_owned(): string[];
        view_names(): Set<string>;
        theme(next?: string | null): string | null;
        attr_static(): {
            [key: string]: string | number | boolean | null;
        };
        attr(): {};
        style_size(): {
            [key: string]: string | number;
        };
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        event_async(): {
            [x: string]: (event: Event) => Promise<void>;
        };
        plugins(): readonly $mol_view[];
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
        force_render(path: Set<$mol_view>): void;
        ensure_visible(view: $mol_view, align?: ScrollLogicalPosition): void;
        bring(): void;
        destructor(): void;
    }
    type $mol_view_all = $mol_type_pick<$, typeof $mol_view>;
}

declare namespace $ {
}

interface Window {
    cordova: any;
}
declare namespace $ {
}

declare namespace $ {
    class $mol_plugin extends $mol_view {
        dom_node_external(next?: Element): Element;
        render(): void;
    }
}

declare namespace $ {
    class $mol_dom_listener extends $mol_object {
        _node: any;
        _event: string;
        _handler: (event: any) => any;
        _config: boolean | {
            passive: boolean;
        };
        constructor(_node: any, _event: string, _handler: (event: any) => any, _config?: boolean | {
            passive: boolean;
        });
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_print extends $mol_object {
        static before(): $mol_dom_listener;
        static after(): $mol_dom_listener;
        static active(next?: boolean): boolean;
    }
}

declare namespace $ {
    type $mol_style_pseudo_class = ':active' | ':any' | ':any-link' | ':checked' | ':default' | ':defined' | ':dir(rtl)' | ':dir(ltr)' | ':disabled' | ':empty' | ':enabled' | ':first' | ':first-child' | ':first-of-type' | ':fullscreen' | ':focus' | ':focus-visible' | ':focus-within' | ':hover' | ':indeterminate' | ':in-range' | ':invalid' | ':last-child' | ':last-of-type' | ':left' | ':link' | ':not()' | ':nth-child(even)' | ':nth-child(odd)' | ':nth-last-child(even)' | ':nth-last-child(odd)' | ':nth-of-type(even)' | ':nth-of-type(odd)' | ':nth-last-of-type(even)' | ':nth-last-of-type(odd)' | ':only-child' | ':only-of-type' | ':optional' | ':out-of-range' | ':placeholder-shown' | ':read-only' | ':read-write' | ':required' | ':right' | ':root' | ':scope' | ':target' | ':valid' | ':visited';
}

declare namespace $ {
    type $mol_style_pseudo_element = '::after' | '::before' | '::cue' | '::first-letter' | '::first-line' | '::selection' | '::slotted' | '::backdrop' | '::placeholder' | '::marker' | '::spelling-error' | '::grammar-error' | '::-webkit-calendar-picker-indicator' | '::-webkit-color-swatch' | '::-webkit-color-swatch-wrapper' | '::-webkit-details-marker' | '::-webkit-file-upload-button' | '::-webkit-image-inner-element' | '::-webkit-inner-spin-button' | '::-webkit-input-placeholder' | '::-webkit-input-speech-button' | '::-webkit-keygen-select' | '::-webkit-media-controls-panel' | '::-webkit-media-controls-timeline-container' | '::-webkit-media-slider-container' | '::-webkit-meter-bar' | '::-webkit-meter-even-less-good-value' | '::-webkit-meter-optimum-value' | '::-webkit-meter-suboptimal-value' | '::-webkit-progress-bar' | '::-webkit-progress-value' | '::-webkit-resizer' | '::-webkit-resizer:window-inactive' | '::-webkit-scrollbar' | '::-webkit-scrollbar-button' | '::-webkit-scrollbar-button:disabled' | '::-webkit-scrollbar-button:double-button:horizontal:end:decrement' | '::-webkit-scrollbar-button:double-button:horizontal:end:increment' | '::-webkit-scrollbar-button:double-button:horizontal:end:increment:corner-present' | '::-webkit-scrollbar-button:double-button:horizontal:start:decrement' | '::-webkit-scrollbar-button:double-button:horizontal:start:increment' | '::-webkit-scrollbar-button:double-button:vertical:end:decrement' | '::-webkit-scrollbar-button:double-button:vertical:end:increment' | '::-webkit-scrollbar-button:double-button:vertical:end:increment:corner-present' | '::-webkit-scrollbar-button:double-button:vertical:start:decrement' | '::-webkit-scrollbar-button:double-button:vertical:start:increment' | '::-webkit-scrollbar-button:end' | '::-webkit-scrollbar-button:end:decrement' | '::-webkit-scrollbar-button:end:increment' | '::-webkit-scrollbar-button:horizontal' | '::-webkit-scrollbar-button:horizontal:decrement' | '::-webkit-scrollbar-button:horizontal:decrement:active' | '::-webkit-scrollbar-button:horizontal:decrement:hover' | '::-webkit-scrollbar-button:horizontal:decrement:window-inactive' | '::-webkit-scrollbar-button:horizontal:end' | '::-webkit-scrollbar-button:horizontal:end:decrement' | '::-webkit-scrollbar-button:horizontal:end:increment' | '::-webkit-scrollbar-button:horizontal:end:increment:corner-present' | '::-webkit-scrollbar-button:horizontal:increment' | '::-webkit-scrollbar-button:horizontal:increment:active' | '::-webkit-scrollbar-button:horizontal:increment:hover' | '::-webkit-scrollbar-button:horizontal:increment:window-inactive' | '::-webkit-scrollbar-button:horizontal:start' | '::-webkit-scrollbar-button:horizontal:start:decrement' | '::-webkit-scrollbar-button:horizontal:start:increment' | '::-webkit-scrollbar-button:start' | '::-webkit-scrollbar-button:start:decrement' | '::-webkit-scrollbar-button:start:increment' | '::-webkit-scrollbar-button:vertical' | '::-webkit-scrollbar-button:vertical:decrement' | '::-webkit-scrollbar-button:vertical:decrement:active' | '::-webkit-scrollbar-button:vertical:decrement:hover' | '::-webkit-scrollbar-button:vertical:decrement:window-inactive' | '::-webkit-scrollbar-button:vertical:end' | '::-webkit-scrollbar-button:vertical:end:decrement' | '::-webkit-scrollbar-button:vertical:end:increment' | '::-webkit-scrollbar-button:vertical:end:increment:corner-present' | '::-webkit-scrollbar-button:vertical:increment' | '::-webkit-scrollbar-button:vertical:increment:active' | '::-webkit-scrollbar-button:vertical:increment:hover' | '::-webkit-scrollbar-button:vertical:increment:window-inactive' | '::-webkit-scrollbar-button:vertical:start' | '::-webkit-scrollbar-button:vertical:start:decrement' | '::-webkit-scrollbar-button:vertical:start:increment' | '::-webkit-scrollbar-corner' | '::-webkit-scrollbar-corner:window-inactive' | '::-webkit-scrollbar-thumb' | '::-webkit-scrollbar-thumb:horizontal' | '::-webkit-scrollbar-thumb:horizontal:active' | '::-webkit-scrollbar-thumb:horizontal:hover' | '::-webkit-scrollbar-thumb:horizontal:window-inactive' | '::-webkit-scrollbar-thumb:vertical' | '::-webkit-scrollbar-thumb:vertical:active' | '::-webkit-scrollbar-thumb:vertical:hover' | '::-webkit-scrollbar-thumb:vertical:window-inactive' | '::-webkit-scrollbar-track' | '::-webkit-scrollbar-track-piece' | '::-webkit-scrollbar-track-piece:disabled' | '::-webkit-scrollbar-track-piece:end' | '::-webkit-scrollbar-track-piece:horizontal:decrement' | '::-webkit-scrollbar-track-piece:horizontal:decrement:active' | '::-webkit-scrollbar-track-piece:horizontal:decrement:hover' | '::-webkit-scrollbar-track-piece:horizontal:end' | '::-webkit-scrollbar-track-piece:horizontal:end:corner-present' | '::-webkit-scrollbar-track-piece:horizontal:end:double-button' | '::-webkit-scrollbar-track-piece:horizontal:end:no-button' | '::-webkit-scrollbar-track-piece:horizontal:end:no-button:corner-present' | '::-webkit-scrollbar-track-piece:horizontal:end:single-button' | '::-webkit-scrollbar-track-piece:horizontal:increment' | '::-webkit-scrollbar-track-piece:horizontal:increment:active' | '::-webkit-scrollbar-track-piece:horizontal:increment:hover' | '::-webkit-scrollbar-track-piece:horizontal:start' | '::-webkit-scrollbar-track-piece:horizontal:start:double-button' | '::-webkit-scrollbar-track-piece:horizontal:start:no-button' | '::-webkit-scrollbar-track-piece:horizontal:start:single-button' | '::-webkit-scrollbar-track-piece:start' | '::-webkit-scrollbar-track-piece:vertical:decrement' | '::-webkit-scrollbar-track-piece:vertical:decrement:active' | '::-webkit-scrollbar-track-piece:vertical:decrement:hover' | '::-webkit-scrollbar-track-piece:vertical:end' | '::-webkit-scrollbar-track-piece:vertical:end:corner-present' | '::-webkit-scrollbar-track-piece:vertical:end:double-button' | '::-webkit-scrollbar-track-piece:vertical:end:no-button' | '::-webkit-scrollbar-track-piece:vertical:end:no-button:corner-present' | '::-webkit-scrollbar-track-piece:vertical:end:single-button' | '::-webkit-scrollbar-track-piece:vertical:increment' | '::-webkit-scrollbar-track-piece:vertical:increment:active' | '::-webkit-scrollbar-track-piece:vertical:increment:hover' | '::-webkit-scrollbar-track-piece:vertical:start' | '::-webkit-scrollbar-track-piece:vertical:start:double-button' | '::-webkit-scrollbar-track-piece:vertical:start:no-button' | '::-webkit-scrollbar-track-piece:vertical:start:single-button' | '::-webkit-scrollbar-track:disabled' | '::-webkit-scrollbar-track:horizontal' | '::-webkit-scrollbar-track:horizontal:disabled' | '::-webkit-scrollbar-track:horizontal:disabled:corner-present' | '::-webkit-scrollbar-track:vertical:disabled' | '::-webkit-scrollbar-track:vertical:disabled:corner-present' | '::-webkit-scrollbar:horizontal' | '::-webkit-scrollbar:horizontal:corner-present' | '::-webkit-scrollbar:horizontal:window-inactive' | '::-webkit-scrollbar:vertical' | '::-webkit-scrollbar:vertical:corner-present' | '::-webkit-scrollbar:vertical:window-inactive' | '::-webkit-search-cancel-button' | '::-webkit-search-decoration' | '::-webkit-search-results-button' | '::-webkit-search-results-decoration' | '::-webkit-slider-container' | '::-webkit-slider-runnable-track' | '::-webkit-slider-thumb' | '::-webkit-slider-thumb:disabled' | '::-webkit-slider-thumb:hover' | '::-webkit-textfield-decoration-container' | '::-webkit-validation-bubble' | '::-webkit-validation-bubble-arrow' | '::-webkit-validation-bubble-arrow-clipper' | '::-webkit-validation-bubble-heading' | '::-webkit-validation-bubble-message' | '::-webkit-validation-bubble-text-block';
}

declare namespace $ {
    type $mol_type_error<Message, Info = {}> = Message & {
        $mol_type_error: Info;
    };
}

declare namespace $ {
    type Attrs<View extends $mol_view, Config, Attrs = ReturnType<View['attr']>> = {
        [name in keyof Attrs]?: {
            [val in keyof Config[Extract<name, keyof Config>]]: $mol_style_guard<View, Config[Extract<name, keyof Config>][val]>;
        };
    };
    type Medias<View extends $mol_view, Config> = {
        [query in keyof Config]: $mol_style_guard<View, Config[query]>;
    };
    type Keys<View extends $mol_view> = '>' | '@' | keyof $mol_style_properties | $mol_style_pseudo_element | $mol_style_pseudo_class | $mol_type_keys_extract<View, () => $mol_view> | `$${string}`;
    export type $mol_style_guard<View extends $mol_view, Config> = {
        [key in Keys<View>]?: unknown;
    } & $mol_style_properties & {
        [key in keyof Config]: key extends keyof $mol_style_properties ? $mol_style_properties[key] : key extends '>' | $mol_style_pseudo_class | $mol_style_pseudo_element ? $mol_style_guard<View, Config[key]> : key extends '@' ? Attrs<View, Config[key]> : key extends '@media' ? Medias<View, Config[key]> : key extends `[${string}]` ? {
            [val in keyof Config[key]]: $mol_style_guard<View, Config[key][val]>;
        } : key extends `--${string}` ? any : key extends keyof $ ? $mol_style_guard<InstanceType<Extract<$[key], typeof $mol_view>>, Config[key]> : key extends keyof View ? View[key] extends (id?: any) => infer Sub ? Sub extends $mol_view ? $mol_style_guard<Sub, Config[key]> : $mol_type_error<'Property returns non $mol_view', {
            Returns: Sub;
        }> : $mol_type_error<'Field is not a Property'> : key extends `$${string}` ? $mol_type_error<'Unknown View Class'> : $mol_type_error<'Unknown CSS Property'>;
    };
    export {};
}

declare namespace $ {
    function $mol_style_sheet<Component extends $mol_view, Config extends $mol_style_guard<Component, Config>>(Component: new () => Component, config0: Config): string;
}

declare namespace $ {
    function $mol_style_define<Component extends $mol_view, Config extends $mol_style_guard<Component, Config>>(Component: new () => Component, config: Config): HTMLStyleElement | null;
}

declare namespace $ {

	export class $mol_scroll extends $mol_view {
		tabindex( ): number
		event_scroll( next?: any ): any
		scroll_top( next?: number ): number
		scroll_left( next?: number ): number
		field( ): ({ 
			'tabIndex': ReturnType< $mol_scroll['tabindex'] >,
		})  & ReturnType< $mol_view['field'] >
		event( ): ({ 
			scroll( next?: ReturnType< $mol_scroll['event_scroll'] > ): ReturnType< $mol_scroll['event_scroll'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=scroll.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_scroll extends $.$mol_scroll {
        scroll_top(next?: number, cache?: 'cache'): number;
        scroll_left(next?: number, cache?: 'cache'): number;
        event_scroll(next?: Event): void;
        minimal_height(): number;
        minimal_width(): number;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
    let $mol_mem_cached: typeof $mol_wire_probe;
}

declare namespace $ {
    let $mol_layer: Record<string, $mol_style_func<"var", unknown>>;
}

declare namespace $ {
}

declare namespace $ {
    type $mol_type_enforce<Actual extends Expected, Expected> = Actual;
}

declare namespace $ {

	type $mol_view__title__IOA9QAJ8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['title'] >
	>
	export class $mol_book2 extends $mol_scroll {
		pages( ): readonly($mol_view)[]
		menu_title( ): string
		sub( ): ReturnType< $mol_book2['pages'] >
		minimal_width( ): number
		Placeholder( ): $mol_view
		Gap( id: any): $mol_view
	}
	
}

//# sourceMappingURL=book2.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_book2 extends $.$mol_book2 {
        title(): string;
        menu_title(): string;
        sub(): readonly $mol_view[];
        bring(): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_pop_bubble__align__SFFEFGN5 = $mol_type_enforce<
		ReturnType< $mol_pop['align'] >
		,
		ReturnType< $mol_pop_bubble['align'] >
	>
	type $mol_pop_bubble__content__ZGKP3MOY = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_content'] >
		,
		ReturnType< $mol_pop_bubble['content'] >
	>
	type $mol_pop_bubble__height_max__X22UCF1D = $mol_type_enforce<
		ReturnType< $mol_pop['height_max'] >
		,
		ReturnType< $mol_pop_bubble['height_max'] >
	>
	export class $mol_pop extends $mol_view {
		Anchor( ): any
		align( ): string
		bubble_content( ): readonly($mol_view_content)[]
		height_max( ): number
		Bubble( ): $mol_pop_bubble
		showed( next?: boolean ): boolean
		align_vert( ): string
		align_hor( ): string
		prefer( ): string
		sub( ): readonly(any)[]
		sub_visible( ): readonly(any)[]
	}
	
	export class $mol_pop_bubble extends $mol_view {
		content( ): readonly($mol_view_content)[]
		height_max( ): number
		align( ): string
		sub( ): ReturnType< $mol_pop_bubble['content'] >
		style( ): ({ 
			'maxHeight': ReturnType< $mol_pop_bubble['height_max'] >,
		})  & ReturnType< $mol_view['style'] >
		attr( ): ({ 
			'mol_pop_align': ReturnType< $mol_pop_bubble['align'] >,
			'tabindex': number,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=pop.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_pop extends $.$mol_pop {
        showed(next?: boolean): boolean;
        sub_visible(): any[];
        height_max(): number;
        align(): string;
        align_vert(): "suspense" | "top" | "bottom";
        align_hor(): "suspense" | "left" | "right";
        View_port(): $mol_view;
        view_port(): {
            width: number;
            height: number;
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | {
            left: number;
            top: number;
            width: number;
            height: number;
        };
    }
}

declare namespace $ {
}

declare namespace $ {
    enum $mol_keyboard_code {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pause = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        metaLeft = 91,
        metaRight = 92,
        select = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimal = 110,
        divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        numLock = 144,
        scrollLock = 145,
        semicolon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        bracketOpen = 219,
        slashBack = 220,
        slashBackLeft = 226,
        bracketClose = 221,
        quoteSingle = 222
    }
}

declare namespace $ {

	export class $mol_hotkey extends $mol_plugin {
		keydown( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_hotkey['keydown'] > ): ReturnType< $mol_hotkey['keydown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		key( ): Record<string, any>
		mod_ctrl( ): boolean
		mod_alt( ): boolean
		mod_shift( ): boolean
	}
	
}

//# sourceMappingURL=hotkey.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_hotkey extends $.$mol_hotkey {
        key(): {
            readonly [x: number]: ((event: KeyboardEvent) => void) | undefined;
            readonly backspace?: ((event: KeyboardEvent) => void) | undefined;
            readonly tab?: ((event: KeyboardEvent) => void) | undefined;
            readonly enter?: ((event: KeyboardEvent) => void) | undefined;
            readonly shift?: ((event: KeyboardEvent) => void) | undefined;
            readonly ctrl?: ((event: KeyboardEvent) => void) | undefined;
            readonly alt?: ((event: KeyboardEvent) => void) | undefined;
            readonly pause?: ((event: KeyboardEvent) => void) | undefined;
            readonly capsLock?: ((event: KeyboardEvent) => void) | undefined;
            readonly escape?: ((event: KeyboardEvent) => void) | undefined;
            readonly space?: ((event: KeyboardEvent) => void) | undefined;
            readonly pageUp?: ((event: KeyboardEvent) => void) | undefined;
            readonly pageDown?: ((event: KeyboardEvent) => void) | undefined;
            readonly end?: ((event: KeyboardEvent) => void) | undefined;
            readonly home?: ((event: KeyboardEvent) => void) | undefined;
            readonly left?: ((event: KeyboardEvent) => void) | undefined;
            readonly up?: ((event: KeyboardEvent) => void) | undefined;
            readonly right?: ((event: KeyboardEvent) => void) | undefined;
            readonly down?: ((event: KeyboardEvent) => void) | undefined;
            readonly insert?: ((event: KeyboardEvent) => void) | undefined;
            readonly delete?: ((event: KeyboardEvent) => void) | undefined;
            readonly key0?: ((event: KeyboardEvent) => void) | undefined;
            readonly key1?: ((event: KeyboardEvent) => void) | undefined;
            readonly key2?: ((event: KeyboardEvent) => void) | undefined;
            readonly key3?: ((event: KeyboardEvent) => void) | undefined;
            readonly key4?: ((event: KeyboardEvent) => void) | undefined;
            readonly key5?: ((event: KeyboardEvent) => void) | undefined;
            readonly key6?: ((event: KeyboardEvent) => void) | undefined;
            readonly key7?: ((event: KeyboardEvent) => void) | undefined;
            readonly key8?: ((event: KeyboardEvent) => void) | undefined;
            readonly key9?: ((event: KeyboardEvent) => void) | undefined;
            readonly A?: ((event: KeyboardEvent) => void) | undefined;
            readonly B?: ((event: KeyboardEvent) => void) | undefined;
            readonly C?: ((event: KeyboardEvent) => void) | undefined;
            readonly D?: ((event: KeyboardEvent) => void) | undefined;
            readonly E?: ((event: KeyboardEvent) => void) | undefined;
            readonly F?: ((event: KeyboardEvent) => void) | undefined;
            readonly G?: ((event: KeyboardEvent) => void) | undefined;
            readonly H?: ((event: KeyboardEvent) => void) | undefined;
            readonly I?: ((event: KeyboardEvent) => void) | undefined;
            readonly J?: ((event: KeyboardEvent) => void) | undefined;
            readonly K?: ((event: KeyboardEvent) => void) | undefined;
            readonly L?: ((event: KeyboardEvent) => void) | undefined;
            readonly M?: ((event: KeyboardEvent) => void) | undefined;
            readonly N?: ((event: KeyboardEvent) => void) | undefined;
            readonly O?: ((event: KeyboardEvent) => void) | undefined;
            readonly P?: ((event: KeyboardEvent) => void) | undefined;
            readonly Q?: ((event: KeyboardEvent) => void) | undefined;
            readonly R?: ((event: KeyboardEvent) => void) | undefined;
            readonly S?: ((event: KeyboardEvent) => void) | undefined;
            readonly T?: ((event: KeyboardEvent) => void) | undefined;
            readonly U?: ((event: KeyboardEvent) => void) | undefined;
            readonly V?: ((event: KeyboardEvent) => void) | undefined;
            readonly W?: ((event: KeyboardEvent) => void) | undefined;
            readonly X?: ((event: KeyboardEvent) => void) | undefined;
            readonly Y?: ((event: KeyboardEvent) => void) | undefined;
            readonly Z?: ((event: KeyboardEvent) => void) | undefined;
            readonly metaLeft?: ((event: KeyboardEvent) => void) | undefined;
            readonly metaRight?: ((event: KeyboardEvent) => void) | undefined;
            readonly select?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad0?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad1?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad2?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad3?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad4?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad5?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad6?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad7?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad8?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad9?: ((event: KeyboardEvent) => void) | undefined;
            readonly multiply?: ((event: KeyboardEvent) => void) | undefined;
            readonly add?: ((event: KeyboardEvent) => void) | undefined;
            readonly subtract?: ((event: KeyboardEvent) => void) | undefined;
            readonly decimal?: ((event: KeyboardEvent) => void) | undefined;
            readonly divide?: ((event: KeyboardEvent) => void) | undefined;
            readonly F1?: ((event: KeyboardEvent) => void) | undefined;
            readonly F2?: ((event: KeyboardEvent) => void) | undefined;
            readonly F3?: ((event: KeyboardEvent) => void) | undefined;
            readonly F4?: ((event: KeyboardEvent) => void) | undefined;
            readonly F5?: ((event: KeyboardEvent) => void) | undefined;
            readonly F6?: ((event: KeyboardEvent) => void) | undefined;
            readonly F7?: ((event: KeyboardEvent) => void) | undefined;
            readonly F8?: ((event: KeyboardEvent) => void) | undefined;
            readonly F9?: ((event: KeyboardEvent) => void) | undefined;
            readonly F10?: ((event: KeyboardEvent) => void) | undefined;
            readonly F11?: ((event: KeyboardEvent) => void) | undefined;
            readonly F12?: ((event: KeyboardEvent) => void) | undefined;
            readonly numLock?: ((event: KeyboardEvent) => void) | undefined;
            readonly scrollLock?: ((event: KeyboardEvent) => void) | undefined;
            readonly semicolon?: ((event: KeyboardEvent) => void) | undefined;
            readonly equals?: ((event: KeyboardEvent) => void) | undefined;
            readonly comma?: ((event: KeyboardEvent) => void) | undefined;
            readonly dash?: ((event: KeyboardEvent) => void) | undefined;
            readonly period?: ((event: KeyboardEvent) => void) | undefined;
            readonly forwardSlash?: ((event: KeyboardEvent) => void) | undefined;
            readonly graveAccent?: ((event: KeyboardEvent) => void) | undefined;
            readonly bracketOpen?: ((event: KeyboardEvent) => void) | undefined;
            readonly slashBack?: ((event: KeyboardEvent) => void) | undefined;
            readonly slashBackLeft?: ((event: KeyboardEvent) => void) | undefined;
            readonly bracketClose?: ((event: KeyboardEvent) => void) | undefined;
            readonly quoteSingle?: ((event: KeyboardEvent) => void) | undefined;
        };
        keydown(event?: KeyboardEvent): void;
    }
}

declare namespace $ {

	export class $mol_nav extends $mol_plugin {
		event_key( next?: any ): any
		cycle( next?: boolean ): boolean
		mod_ctrl( ): boolean
		mod_shift( ): boolean
		mod_alt( ): boolean
		keys_x( next?: readonly(any)[] ): readonly(any)[]
		keys_y( next?: readonly(any)[] ): readonly(any)[]
		current_x( next?: any ): any
		current_y( next?: any ): any
		event_up( next?: any ): any
		event_down( next?: any ): any
		event_left( next?: any ): any
		event_right( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_nav['event_key'] > ): ReturnType< $mol_nav['event_key'] >,
		})  & ReturnType< $mol_plugin['event'] >
	}
	
}

//# sourceMappingURL=nav.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_nav extends $.$mol_nav {
        event_key(event?: KeyboardEvent): undefined;
        event_up(event?: KeyboardEvent): undefined;
        event_down(event?: KeyboardEvent): undefined;
        event_left(event?: KeyboardEvent): undefined;
        event_right(event?: KeyboardEvent): undefined;
        index_y(): number | null;
        index_x(): number | null;
    }
}

declare namespace $ {
    let $mol_mem_persist: typeof $mol_wire_solid;
}

declare namespace $ {
    export function $mol_wire_sync<Host extends object>(obj: Host): ObjectOrFunctionResultAwaited<Host>;
    type FunctionResultAwaited<Some> = Some extends (...args: infer Args) => infer Res ? (...args: Args) => Awaited<Res> : Some;
    type MethodsResultAwaited<Host extends Object> = {
        [K in keyof Host]: FunctionResultAwaited<Host[K]>;
    };
    type ObjectOrFunctionResultAwaited<Some> = (Some extends (...args: any) => unknown ? FunctionResultAwaited<Some> : {}) & (Some extends Object ? MethodsResultAwaited<Some> : Some);
    export {};
}

declare namespace $ {
    class $mol_storage extends $mol_object2 {
        static native(): StorageManager;
        static persisted(next?: boolean, cache?: 'cache'): boolean;
        static estimate(): StorageEstimate;
        static dir(): FileSystemDirectoryHandle;
    }
}

declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static changes(next?: StorageEvent): StorageEvent | undefined;
        static value<Value>(key: string, next?: Value | null): Value | null;
        prefix(): string;
        value(key: string, next?: Value): Value | null;
    }
}

declare namespace $ {
}

declare namespace $ {
    type $mol_charset_encoding = 'utf8' | 'utf-16le' | 'utf-16be' | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6' | 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16' | 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253' | 'windows-1254' | 'windows-1255' | 'windows-1256' | 'windows-1257' | 'windows-1258' | 'x-mac-cyrillic' | 'gbk' | 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr';
}

declare namespace $ {
    function $mol_charset_decode(buffer: BufferSource, encoding?: $mol_charset_encoding): string;
}

declare var $node: any;

declare namespace $ {
    function $mol_charset_encode(value: string): Uint8Array;
}

declare namespace $ {
    type $mol_file_type = 'file' | 'dir' | 'link';
    interface $mol_file_stat {
        type: $mol_file_type;
        size: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
    }
    class $mol_file_not_found extends Error {
    }
    abstract class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        static base: string;
        path(): string;
        parent(): $mol_file;
        abstract stat(next?: $mol_file_stat | null, virt?: 'virt'): $mol_file_stat | null;
        reset(): void;
        version(): string;
        abstract ensure(): void;
        abstract drop(): void;
        watcher(): {
            destructor(): void;
        };
        exists(next?: boolean): boolean;
        type(): "" | $mol_file_type;
        name(): string;
        ext(): string;
        abstract buffer(next?: Uint8Array): Uint8Array;
        text(next?: string, virt?: 'virt'): string;
        abstract sub(): $mol_file[];
        abstract resolve(path: string): $mol_file;
        abstract relate(base?: $mol_file): string;
        abstract append(next: Uint8Array | string): void;
        find(include?: RegExp, exclude?: RegExp): $mol_file[];
        size(): number;
        open(...modes: readonly ('create' | 'exists_truncate' | 'exists_fail' | 'read_only' | 'write_only' | 'read_write' | 'append')[]): number;
        toJSON(): string;
    }
}

declare namespace $ {
    let $mol_action: typeof $mol_wire_method;
}

declare namespace $ {
    function $mol_dom_parse(text: string, type?: DOMParserSupportedType): Document;
}

declare namespace $ {
    class $mol_fetch_response extends $mol_object2 {
        readonly native: Response;
        constructor(native: Response);
        status(): "success" | "unknown" | "inform" | "redirect" | "wrong" | "failed";
        code(): number;
        message(): string;
        headers(): Headers;
        mime(): string | null;
        stream(): ReadableStream<Uint8Array> | null;
        text(): string;
        json(): unknown;
        buffer(): ArrayBuffer;
        xml(): Document;
        xhtml(): Document;
        html(): Document;
    }
    class $mol_fetch extends $mol_object2 {
        static request(input: RequestInfo, init?: RequestInit): Promise<Response> & {
            destructor: () => void;
        };
        static response(input: RequestInfo, init?: RequestInit): $mol_fetch_response;
        static success(input: RequestInfo, init?: RequestInit): $mol_fetch_response;
        static stream(input: RequestInfo, init?: RequestInit): ReadableStream<Uint8Array> | null;
        static text(input: RequestInfo, init?: RequestInit): string;
        static json(input: RequestInfo, init?: RequestInit): unknown;
        static buffer(input: RequestInfo, init?: RequestInit): ArrayBuffer;
        static xml(input: RequestInfo, init?: RequestInit): Document;
        static xhtml(input: RequestInfo, init?: RequestInit): Document;
        static html(input: RequestInfo, init?: RequestInit): Document;
    }
}

declare namespace $ {
    class $mol_file_web extends $mol_file {
        static absolute(path: string): $mol_file_web;
        static relative(path: string): $mol_file_web;
        static base: string;
        buffer(next?: Uint8Array): Uint8Array;
        stat(next?: $mol_file_stat, virt?: 'virt'): $mol_file_stat;
        resolve(path: string): $mol_file_web;
        ensure(): void;
        drop(): void;
        sub(): $mol_file[];
        relate(base?: $mol_file): string;
        append(next: Uint8Array | string): void;
    }
}

declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang_default(): string;
        static lang(next?: string): string;
        static source(lang: string): any;
        static texts(lang: string, next?: $mol_locale_dict): $mol_locale_dict;
        static text(key: string): string;
        static warn(key: string): null;
    }
}

declare namespace $ {

	type $mol_hotkey__mod_ctrl__HW5SO3Y5 = $mol_type_enforce<
		ReturnType< $mol_string['submit_with_ctrl'] >
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type $mol_hotkey__key__Y3XVZW0G = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_string['submit'] > ): ReturnType< $mol_string['submit'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	export class $mol_string extends $mol_view {
		selection_watcher( ): any
		error_report( ): any
		disabled( ): boolean
		value( next?: string ): string
		value_changed( next?: ReturnType< $mol_string['value'] > ): ReturnType< $mol_string['value'] >
		hint( ): string
		hint_visible( ): ReturnType< $mol_string['hint'] >
		spellcheck( ): boolean
		autocomplete_native( ): string
		selection_end( ): number
		selection_start( ): number
		keyboard( ): string
		enter( ): string
		length_max( ): number
		type( next?: string ): string
		event_change( next?: any ): any
		submit_with_ctrl( ): boolean
		submit( next?: any ): any
		Submit( ): $mol_hotkey
		dom_name( ): string
		enabled( ): boolean
		minimal_height( ): number
		autocomplete( ): boolean
		selection( next?: readonly(number)[] ): readonly(number)[]
		auto( ): readonly(any)[]
		field( ): ({ 
			'disabled': ReturnType< $mol_string['disabled'] >,
			'value': ReturnType< $mol_string['value_changed'] >,
			'placeholder': ReturnType< $mol_string['hint_visible'] >,
			'spellcheck': ReturnType< $mol_string['spellcheck'] >,
			'autocomplete': ReturnType< $mol_string['autocomplete_native'] >,
			'selectionEnd': ReturnType< $mol_string['selection_end'] >,
			'selectionStart': ReturnType< $mol_string['selection_start'] >,
			'inputMode': ReturnType< $mol_string['keyboard'] >,
			'enterkeyhint': ReturnType< $mol_string['enter'] >,
		})  & ReturnType< $mol_view['field'] >
		attr( ): ({ 
			'maxlength': ReturnType< $mol_string['length_max'] >,
			'type': ReturnType< $mol_string['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			input( next?: ReturnType< $mol_string['event_change'] > ): ReturnType< $mol_string['event_change'] >,
		})  & ReturnType< $mol_view['event'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=string.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_string extends $.$mol_string {
        event_change(next?: Event): void;
        error_report(): void;
        hint_visible(): string;
        disabled(): boolean;
        autocomplete_native(): "on" | "off";
        selection_watcher(): $mol_dom_listener;
        selection_change(event: Event): void;
        selection_start(): number;
        selection_end(): number;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_state_time extends $mol_object {
        static task(precision: number, reset?: null): $mol_after_timeout | $mol_after_frame;
        static now(precision: number): number;
    }
}

declare namespace $ {

	export class $mol_svg extends $mol_view {
		dom_name( ): string
		dom_name_space( ): string
		font_size( ): number
		font_family( ): string
		style_size( ): Record<string, any>
	}
	
}

//# sourceMappingURL=svg.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_svg extends $.$mol_svg {
        computed_style(): Record<string, any>;
        font_size(): number;
        font_family(): any;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_svg_root extends $mol_svg {
		view_box( ): string
		aspect( ): string
		dom_name( ): string
		attr( ): ({ 
			'viewBox': ReturnType< $mol_svg_root['view_box'] >,
			'preserveAspectRatio': ReturnType< $mol_svg_root['aspect'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=root.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_path extends $mol_svg {
		geometry( ): string
		dom_name( ): string
		attr( ): ({ 
			'd': ReturnType< $mol_svg_path['geometry'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=path.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	type $mol_svg_path__geometry__LA82TZKG = $mol_type_enforce<
		ReturnType< $mol_icon['path'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	export class $mol_icon extends $mol_svg_root {
		path( ): string
		Path( ): $mol_svg_path
		view_box( ): string
		minimal_width( ): number
		minimal_height( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_close extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=close.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_speck extends $mol_view {
		theme( ): string
		value( ): any
		attr( ): ({ 
			'mol_theme': ReturnType< $mol_speck['theme'] >,
		})  & ReturnType< $mol_view['attr'] >
		style( ): ({ 
			'minHeight': string,
		})  & ReturnType< $mol_view['style'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=speck.view.tree.d.ts.map
declare namespace $ {

	type $mol_speck__value__W78AKWUG = $mol_type_enforce<
		ReturnType< $mol_button['error'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	export class $mol_button extends $mol_view {
		event_activate( next?: any ): any
		clicks( next?: any ): any
		event_key_press( next?: any ): any
		disabled( ): boolean
		tab_index( ): number
		hint( ): string
		hint_safe( ): ReturnType< $mol_button['hint'] >
		error( ): string
		enabled( ): boolean
		click( next?: any ): any
		event_click( next?: any ): any
		event( ): ({ 
			click( next?: ReturnType< $mol_button['event_activate'] > ): ReturnType< $mol_button['event_activate'] >,
			dblclick( next?: ReturnType< $mol_button['clicks'] > ): ReturnType< $mol_button['clicks'] >,
			keydown( next?: ReturnType< $mol_button['event_key_press'] > ): ReturnType< $mol_button['event_key_press'] >,
		})  & ReturnType< $mol_view['event'] >
		attr( ): ({ 
			'disabled': ReturnType< $mol_button['disabled'] >,
			'role': string,
			'tabindex': ReturnType< $mol_button['tab_index'] >,
			'title': ReturnType< $mol_button['hint_safe'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		Speck( ): $mol_speck
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_button extends $.$mol_button {
        status(next?: any[]): any[];
        disabled(): boolean;
        event_activate(next: Event): void;
        event_key_press(event: KeyboardEvent): void;
        tab_index(): number;
        error(): string;
        hint_safe(): string;
        sub_visible(): ($mol_speck | $mol_view_content)[];
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_button_typed extends $mol_button {
		minimal_height( ): number
		minimal_width( ): number
	}
	
}

//# sourceMappingURL=typed.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_button_minor extends $mol_button_typed {
	}
	
}

//# sourceMappingURL=minor.view.tree.d.ts.map
declare namespace $ {
    function $mol_support_css_overflow_anchor(this: $): boolean;
}

declare namespace $ {

	type $mol_view__style__QMG65JOT = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_before'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style__WLTHYCBO = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_after'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $mol_list extends $mol_view {
		rows( ): readonly($mol_view)[]
		gap_before( ): number
		gap_after( ): number
		render_visible_only( ): boolean
		render_over( ): number
		sub( ): ReturnType< $mol_list['rows'] >
		Empty( ): $mol_view
		Gap_before( ): $mol_view
		Gap_after( ): $mol_view
		view_window( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_list extends $.$mol_list {
        sub(): readonly $mol_view[];
        render_visible_only(): boolean;
        view_window(next?: [number, number]): [number, number];
        gap_before(): number;
        gap_after(): number;
        sub_visible(): $mol_view[];
        minimal_height(): number;
        force_render(path: Set<$mol_view>): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_paragraph extends $mol_view {
		line_height( ): number
		letter_width( ): number
		width_limit( ): number
		row_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=paragraph.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_paragraph extends $.$mol_paragraph {
        maximal_width(): number;
        width_limit(): number;
        minimal_width(): number;
        row_width(): number;
        minimal_height(): number;
    }
}

declare namespace $ {
}

declare namespace $ {
    type $mol_type_equals<A, B> = (<X>() => X extends A ? 1 : 2) extends (<X>() => X extends B ? 1 : 2) ? unknown : never;
}

declare namespace $ {
    type $mol_type_merge<Intersection> = Intersection extends (...a: any[]) => any ? Intersection : Intersection extends new (...a: any[]) => any ? Intersection : Intersection extends object ? $mol_type_merge_object<Intersection> extends Intersection ? unknown extends $mol_type_equals<{
        [Key in keyof Intersection]: Intersection[Key];
    }, Intersection> ? Intersection : {
        [Key in keyof Intersection]: $mol_type_merge<Intersection[Key]>;
    } : Intersection : Intersection;
    type $mol_type_merge_object<Intersection> = {
        [Key in keyof Intersection]: Intersection[Key];
    };
}

declare namespace $ {
    type $mol_type_intersect<Union> = (Union extends any ? (_: Union) => void : never) extends ((_: infer Intersection) => void) ? Intersection : never;
}

declare namespace $ {
    type $mol_unicode_category = [$mol_unicode_category_binary] | ['General_Category', $mol_char_category_general] | ['Script', $mol_unicode_category_script] | ['Script_Extensions', $mol_unicode_category_script];
    type $mol_unicode_category_binary = 'ASCII' | 'ASCII_Hex_Digit' | 'Alphabetic' | 'Any' | 'Assigned' | 'Bidi_Control' | 'Bidi_Mirrored' | 'Case_Ignorable' | 'Cased' | 'Changes_When_Casefolded' | 'Changes_When_Casemapped' | 'Changes_When_Lowercased' | 'Changes_When_NFKC_Casefolded' | 'Changes_When_Titlecased' | 'Changes_When_Uppercased' | 'Dash' | 'Default_Ignorable_Code_Point' | 'Deprecated' | 'Diacritic' | 'Emoji' | 'Emoji_Component' | 'Emoji_Modifier' | 'Emoji_Modifier_Base' | 'Emoji_Presentation' | 'Extended_Pictographic' | 'Extender' | 'Grapheme_Base' | 'Grapheme_Extend' | 'Hex_Digit' | 'IDS_Binary_Operator' | 'IDS_Trinary_Operator' | 'ID_Continue' | 'ID_Start' | 'Ideographic' | 'Join_Control' | 'Logical_Order_Exception' | 'Lowercase' | 'Math' | 'Noncharacter_Code_Point' | 'Pattern_Syntax' | 'Pattern_White_Space' | 'Quotation_Mark' | 'Radical' | 'Regional_Indicator' | 'Sentence_Terminal' | 'Soft_Dotted' | 'Terminal_Punctuation' | 'Unified_Ideograph' | 'Uppercase' | 'Variation_Selector' | 'White_Space' | 'XID_Continue' | 'XID_Start';
    type $mol_char_category_general = 'Cased_Letter' | 'Close_Punctuation' | 'Connector_Punctuation' | 'Control' | 'Currency_Symbol' | 'Dash_Punctuation' | 'Decimal_Number' | 'Enclosing_Mark' | 'Final_Punctuation' | 'Format' | 'Initial_Punctuation' | 'Letter' | 'Letter_Number' | 'Line_Separator' | 'Lowercase_Letter' | 'Mark' | 'Math_Symbol' | 'Modifier_Letter' | 'Modifier_Symbol' | 'Nonspacing_Mark' | 'Number' | 'Open_Punctuation' | 'Other' | 'Other_Letter' | 'Other_Number' | 'Other_Punctuation' | 'Other_Symbol' | 'Paragraph_Separator' | 'Private_Use' | 'Punctuation' | 'Separator' | 'Space_Separator' | 'Spacing_Mark' | 'Surrogate' | 'Symbol' | 'Titlecase_Letter' | 'Unassigned' | 'Uppercase_Letter';
    type $mol_unicode_category_script = 'Adlam' | 'Ahom' | 'Anatolian_Hieroglyphs' | 'Arabic' | 'Armenian' | 'Avestan' | 'Balinese' | 'Bamum' | 'Bassa_Vah' | 'Batak' | 'Bengali' | 'Bhaiksuki' | 'Bopomofo' | 'Brahmi' | 'Braille' | 'Buginese' | 'Buhid' | 'Canadian_Aboriginal' | 'Carian' | 'Caucasian_Albanian' | 'Chakma' | 'Cham' | 'Chorasmian' | 'Cherokee' | 'Common' | 'Coptic' | 'Cuneiform' | 'Cypriot' | 'Cyrillic' | 'Deseret' | 'Devanagari' | 'Dives_Akuru' | 'Dogra' | 'Duployan' | 'Egyptian_Hieroglyphs' | 'Elbasan' | 'Elymaic' | 'Ethiopic' | 'Georgian' | 'Glagolitic' | 'Gothic' | 'Grantha' | 'Greek' | 'Gujarati' | 'Gunjala_Gondi' | 'Gurmukhi' | 'Han' | 'Hangul' | 'Hanifi_Rohingya' | 'Hanunoo' | 'Hatran' | 'Hebrew' | 'Hiragana' | 'Imperial_Aramaic' | 'Inherited' | 'Inscriptional_Pahlavi' | 'Inscriptional_Parthian' | 'Javanese' | 'Kaithi' | 'Kannada' | 'Katakana' | 'Kayah_Li' | 'Kharoshthi' | 'Khitan_Small_Script' | 'Khmer' | 'Khojki' | 'Khudawadi' | 'Lao' | 'Latin' | 'Lepcha' | 'Limbu' | 'Linear_A' | 'Linear_B' | 'Lisu' | 'Lycian' | 'Lydian' | 'Mahajani' | 'Makasar' | 'Malayalam' | 'Mandaic' | 'Manichaean' | 'Marchen' | 'Medefaidrin' | 'Masaram_Gondi' | 'Meetei_Mayek' | 'Mende_Kikakui' | 'Meroitic_Cursive' | 'Meroitic_Hieroglyphs' | 'Miao' | 'Modi' | 'Mongolian' | 'Mro' | 'Multani' | 'Myanmar' | 'Nabataean' | 'Nandinagari' | 'New_Tai_Lue' | 'Newa' | 'Nko' | 'Nushu' | 'Nyiakeng_Puachue_Hmong' | 'Ogham' | 'Ol_Chiki' | 'Old_Hungarian' | 'Old_Italic' | 'Old_North_Arabian' | 'Old_Permic' | 'Old_Persian' | 'Old_Sogdian' | 'Old_South_Arabian' | 'Old_Turkic' | 'Oriya' | 'Osage' | 'Osmanya' | 'Pahawh_Hmong' | 'Palmyrene' | 'Pau_Cin_Hau' | 'Phags_Pa' | 'Phoenician' | 'Psalter_Pahlavi' | 'Rejang' | 'Runic' | 'Samaritan' | 'Saurashtra' | 'Sharada' | 'Shavian' | 'Siddham' | 'SignWriting' | 'Sinhala' | 'Sogdian' | 'Sora_Sompeng' | 'Soyombo' | 'Sundanese' | 'Syloti_Nagri' | 'Syriac' | 'Tagalog' | 'Tagbanwa' | 'Tai_Le' | 'Tai_Tham' | 'Tai_Viet' | 'Takri' | 'Tamil' | 'Tangut' | 'Telugu' | 'Thaana' | 'Thai' | 'Tibetan' | 'Tifinagh' | 'Tirhuta' | 'Ugaritic' | 'Vai' | 'Wancho' | 'Warang_Citi' | 'Yezidi' | 'Yi' | 'Zanabazar_Square';
}

interface String {
    match<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.match]>;
    matchAll<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.matchAll]>;
}
declare namespace $ {
    type Groups_to_params<T> = {
        [P in keyof T]?: T[P] | boolean | undefined;
    };
    export type $mol_regexp_source = number | string | RegExp | {
        [key in string]: $mol_regexp_source;
    } | readonly [$mol_regexp_source, ...$mol_regexp_source[]];
    export type $mol_regexp_groups<Source extends $mol_regexp_source> = Source extends number ? {} : Source extends string ? {} : Source extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{
        [key in Extract<keyof Source, number>]: $mol_regexp_groups<Source[key]>;
    }[Extract<keyof Source, number>]>> : Source extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> ? {} : NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> : Source extends {
        readonly [key in string]: $mol_regexp_source;
    } ? $mol_type_merge<$mol_type_intersect<{
        [key in keyof Source]: $mol_type_merge<$mol_type_override<{
            readonly [k in Extract<keyof Source, string>]: string;
        }, {
            readonly [k in key]: Source[key] extends string ? Source[key] : string;
        }> & $mol_regexp_groups<Source[key]>>;
    }[keyof Source]>> : never;
    export class $mol_regexp<Groups extends Record<string, string>> extends RegExp {
        readonly groups: (Extract<keyof Groups, string>)[];
        constructor(source: string, flags?: string, groups?: (Extract<keyof Groups, string>)[]);
        [Symbol.matchAll](str: string): IterableIterator<RegExpMatchArray & $mol_type_override<RegExpMatchArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }>>;
        [Symbol.match](str: string): null | RegExpMatchArray;
        [Symbol.split](str: string): string[];
        test(str: string): boolean;
        exec(str: string): RegExpExecArray & $mol_type_override<RegExpExecArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }> | null;
        generate(params: Groups_to_params<Groups>): string | null;
        get native(): RegExp;
        static repeat<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        static repeat_greedy<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        static vary<Sources extends readonly $mol_regexp_source[]>(sources: Sources): $mol_regexp<$mol_regexp_groups<Sources[number]>>;
        static optional<Source extends $mol_regexp_source>(source: Source): $mol_regexp<$mol_regexp_groups<Source>>;
        static force_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        static forbid_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        static from<Source extends $mol_regexp_source>(source: Source, { ignoreCase, multiline }?: Partial<Pick<RegExp, 'ignoreCase' | 'multiline'>>): $mol_regexp<$mol_regexp_groups<Source>>;
        static unicode_only(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        static unicode_except(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        static char_range(from: number, to: number): $mol_regexp<{}>;
        static char_only(...allowed: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static char_except(...forbidden: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static decimal_only: $mol_regexp<{}>;
        static decimal_except: $mol_regexp<{}>;
        static latin_only: $mol_regexp<{}>;
        static latin_except: $mol_regexp<{}>;
        static space_only: $mol_regexp<{}>;
        static space_except: $mol_regexp<{}>;
        static word_break_only: $mol_regexp<{}>;
        static word_break_except: $mol_regexp<{}>;
        static tab: $mol_regexp<{}>;
        static slash_back: $mol_regexp<{}>;
        static nul: $mol_regexp<{}>;
        static char_any: $mol_regexp<{}>;
        static begin: $mol_regexp<{}>;
        static end: $mol_regexp<{}>;
        static or: $mol_regexp<{}>;
        static line_end: $mol_regexp<{
            readonly win_end: string;
            readonly mac_end: string;
        }>;
    }
    export {};
}

declare namespace $ {

	type $mol_paragraph__sub__13GRK72R = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__SI5C8JEZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_dimmer extends $mol_paragraph {
		parts( ): readonly($mol_view_content)[]
		string( id: any): string
		haystack( ): string
		needle( ): string
		sub( ): ReturnType< $mol_dimmer['parts'] >
		Low( id: any): $mol_paragraph
		High( id: any): $mol_paragraph
	}
	
}

//# sourceMappingURL=dimmer.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): string[];
        string(index: number): string;
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_hotkey__key__RNBPZ6BY = $mol_type_enforce<
		({ 
			escape( next?: ReturnType< $mol_search['clear'] > ): ReturnType< $mol_search['clear'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_nav__keys_y__LPVFNN1S = $mol_type_enforce<
		ReturnType< $mol_search['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y__OWWET8B6 = $mol_type_enforce<
		ReturnType< $mol_search['nav_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_string__value__6JSJ9P1K = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint__BZLFMTFH = $mol_type_enforce<
		ReturnType< $mol_search['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__submit__UH12VY9N = $mol_type_enforce<
		ReturnType< $mol_search['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled__ASUMY1GN = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__keyboard__JZ95DHTH = $mol_type_enforce<
		ReturnType< $mol_search['keyboard'] >
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__enter__QCECSO2R = $mol_type_enforce<
		ReturnType< $mol_search['enter'] >
		,
		ReturnType< $mol_string['enter'] >
	>
	type $mol_button_minor__hint__JUDMKKJ8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click__NGN2Y5UF = $mol_type_enforce<
		ReturnType< $mol_search['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__O8LW7ZUM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_list__rows__9TW4CTWF = $mol_type_enforce<
		ReturnType< $mol_search['menu_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_dimmer__haystack__7VJ6M11I = $mol_type_enforce<
		ReturnType< $mol_search['suggest_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle__IAANULTD = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_search_plugins__1AV2FVKX = $mol_type_enforce<
		ReturnType< $mol_pop['plugins'] >[number]
		,
		$mol_plugin
	>
	type $mol_view__sub__RJ4C073T = $mol_type_enforce<
		ReturnType< $mol_search['anchor_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click__RB4E2B2A = $mol_type_enforce<
		ReturnType< $mol_search['suggest_select'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__B758JTBS = $mol_type_enforce<
		ReturnType< $mol_search['suggest_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_search extends $mol_pop {
		clear( next?: any ): any
		Hotkey( ): $mol_hotkey
		nav_components( ): readonly($mol_view)[]
		nav_focused( next?: any ): any
		Nav( ): $mol_nav
		suggests_showed( next?: boolean ): boolean
		query( next?: string ): string
		hint( ): string
		submit( next?: any ): any
		enabled( ): boolean
		keyboard( ): string
		enter( ): string
		bring( ): ReturnType< ReturnType< $mol_search['Query'] >['bring'] >
		Query( ): $mol_string
		Clear_icon( ): $mol_icon_close
		Clear( ): $mol_button_minor
		anchor_content( ): readonly(any)[]
		menu_items( ): readonly($mol_view)[]
		Menu( ): $mol_list
		suggest_select( id: any, next?: any ): any
		suggest_label( id: any): string
		Suggest_label( id: any): $mol_dimmer
		suggest_content( id: any): readonly($mol_view_content)[]
		suggests( ): readonly(string)[]
		plugins( ): readonly($mol_plugin)[]
		showed( next?: ReturnType< $mol_search['suggests_showed'] > ): ReturnType< $mol_search['suggests_showed'] >
		align_hor( ): string
		Anchor( ): $mol_view
		bubble_content( ): readonly($mol_view_content)[]
		Suggest( id: any): $mol_button_minor
	}
	
}

//# sourceMappingURL=search.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_search extends $.$mol_search {
        anchor_content(): ($.$mol_string | $mol_button_minor)[];
        suggests_showed(next?: boolean): boolean;
        suggest_selected(next?: string): void;
        nav_components(): ($.$mol_string | $mol_button_minor)[];
        nav_focused(component?: $mol_view): $mol_view | $.$mol_string | null;
        suggest_label(key: string): string;
        menu_items(): $mol_button_minor[];
        suggest_select(id: string, event?: MouseEvent): void;
        clear(event?: Event): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_state_arg extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static href_normal(): string;
        static href_absolute(): string;
        static dict(next?: {
            [key: string]: string | null;
        }): Readonly<{
            [key: string]: string;
        }>;
        static dict_cut(except: string[]): {
            [key: string]: string;
        };
        static value(key: string, next?: string | null): string | null;
        static link(next: Record<string, string | null>): string;
        static prolog: string;
        static separator: string;
        static make_link(next: {
            [key: string]: string | null;
        }): string;
        static go(next: {
            [key: string]: string | null;
        }): void;
        static encode(str: string): string;
        constructor(prefix?: string);
        value(key: string, next?: string): string | null;
        sub(postfix: string): $mol_state_arg;
        link(next: Record<string, string | null>): string;
    }
}

declare namespace $ {

	export class $mol_link extends $mol_view {
		uri_toggle( ): string
		hint( ): string
		hint_safe( ): ReturnType< $mol_link['hint'] >
		target( ): string
		file_name( ): string
		current( ): boolean
		relation( ): string
		event_click( next?: any ): any
		click( next?: ReturnType< $mol_link['event_click'] > ): ReturnType< $mol_link['event_click'] >
		uri( ): string
		dom_name( ): string
		uri_off( ): string
		uri_native( ): any
		external( ): boolean
		attr( ): ({ 
			'href': ReturnType< $mol_link['uri_toggle'] >,
			'title': ReturnType< $mol_link['hint_safe'] >,
			'target': ReturnType< $mol_link['target'] >,
			'download': ReturnType< $mol_link['file_name'] >,
			'mol_link_current': ReturnType< $mol_link['current'] >,
			'rel': ReturnType< $mol_link['relation'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		arg( ): Record<string, any>
		event( ): ({ 
			click( next?: ReturnType< $mol_link['click'] > ): ReturnType< $mol_link['click'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=link.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_link extends $.$mol_link {
        uri_toggle(): string;
        uri(): string;
        uri_off(): string;
        uri_native(): URL;
        current(): boolean;
        file_name(): string;
        minimal_height(): number;
        external(): boolean;
        target(): '_self' | '_blank' | '_top' | '_parent' | string;
        hint_safe(): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__dom_name__HDL962RY = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub__FD8UO0YW = $mol_type_enforce<
		ReturnType< $mol_page['title_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__UDKH28F5 = $mol_type_enforce<
		ReturnType< $mol_page['tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height__YA5X2GFR = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__dom_name__V0AEWKSF = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub__NHMW72PU = $mol_type_enforce<
		ReturnType< $mol_page['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_page_body_scroll_top__DFAXACC0 = $mol_type_enforce<
		Parameters< $mol_page['body_scroll_top'] >[0]
		,
		Parameters< ReturnType< $mol_page['Body'] >['scroll_top'] >[0]
	>
	type $mol_view__sub__B972F2G7 = $mol_type_enforce<
		ReturnType< $mol_page['body'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_scroll__sub__GXMY0MDF = $mol_type_enforce<
		ReturnType< $mol_page['body_content'] >
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_view__dom_name__U30TA6PV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub__PVBM5T87 = $mol_type_enforce<
		ReturnType< $mol_page['foot'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_page extends $mol_view {
		tabindex( ): number
		Logo( ): any
		title_content( ): readonly(any)[]
		Title( ): $mol_view
		tools( ): readonly($mol_view_content)[]
		Tools( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		body_scroll_top( next?: ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] > ): ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] >
		body( ): readonly($mol_view)[]
		Body_content( ): $mol_view
		body_content( ): readonly(any)[]
		Body( ): $mol_scroll
		foot( ): readonly($mol_view)[]
		Foot( ): $mol_view
		dom_name( ): string
		field( ): ({ 
			'tabIndex': ReturnType< $mol_page['tabindex'] >,
		})  & ReturnType< $mol_view['field'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $.$$ {
}

declare namespace $ {
    function $mol_match_text<Variant>(query: string, values: (variant: Variant) => string[]): (variant: Variant) => boolean;
}

declare namespace $ {

	type $mol_search__query__7UB8TNTL = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_filter'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_dimmer__needle__JQRQLTOT = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack__478Z0JPM = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['spread_title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_link__arg__KDMBJYFK = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__ZD1347K4 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_link_content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_list__rows__FBJT80GH = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_links'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__title__J4P5IJKG = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__Logo__XKCTHVE8 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['Menu_logo'] >
		,
		ReturnType< $mol_page['Logo'] >
	>
	type $mol_page__tools__CM3S0ZGI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__head__DLM999MJ = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_head'] >
		,
		ReturnType< $mol_page['head'] >
	>
	type $mol_page__body__4LAF10JR = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_body'] >
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot__XV35POHV = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_foot'] >
		,
		ReturnType< $mol_page['foot'] >
	>
	type $mol_link__arg__PVZ6DN8X = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['spread_close_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__hint__IMCPFMCA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub__5OFE8EGP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_book2_catalog extends $mol_book2 {
		Menu_title( ): ReturnType< ReturnType< $mol_book2_catalog['Menu'] >['Title'] >
		menu_title( ): string
		Menu_tools( ): ReturnType< ReturnType< $mol_book2_catalog['Menu'] >['Tools'] >
		Menu_logo( ): any
		menu_head( ): readonly(any)[]
		menu_filter( next?: string ): string
		Menu_filter( ): $mol_search
		arg( id: any): Record<string, any>
		spread_title( id: any): string
		Menu_link_title( id: any): $mol_dimmer
		menu_link_content( id: any): readonly(any)[]
		Menu_link( id: any): $mol_link
		menu_links( ): readonly(any)[]
		Menu_links( ): $mol_list
		menu_body( ): readonly(any)[]
		menu_foot( ): readonly(any)[]
		Menu( ): $mol_page
		spread_close_arg( ): Record<string, any>
		Spread_close_icon( ): $mol_icon_close
		param( ): string
		spread( next?: string ): string
		spreads( ): Record<string, any>
		Spread( id: any): $mol_view
		Spread_default( ): any
		spread_ids( ): readonly(string)[]
		menu_filter_enabled( ): boolean
		spread_ids_filtered( ): readonly(string)[]
		menu_tools( ): readonly(any)[]
		addon_tools( ): readonly(any)[]
		pages( ): readonly(any)[]
		Spread_close( ): $mol_link
	}
	
}

//# sourceMappingURL=catalog.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_book2_catalog extends $.$mol_book2_catalog {
        pages(): any[];
        spread_ids(): readonly string[];
        menu_body(): ($.$mol_list | $.$mol_search)[];
        menu_filter_enabled(): boolean;
        menu_links(): $.$mol_link[];
        spread_ids_filtered(): string[];
        Spread(id: string): $mol_view;
        Spread_default(): any;
        spread(next?: string): string;
        arg(spread: string): {
            [x: string]: string | null;
        };
        spread_close_arg(): {
            [x: string]: null;
        };
        spread_title(spread: string): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_script extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=script.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_script_text extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $ {

	export class $mol_link_source extends $mol_link {
		Icon( ): $mol_icon_script_text
		hint( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=source.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	type $mol_view__sub__C5YHNJBH = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_check extends $mol_button_minor {
		checked( next?: boolean ): boolean
		aria_checked( ): string
		aria_role( ): string
		Icon( ): any
		title( ): string
		Title( ): $mol_view
		label( ): readonly(any)[]
		attr( ): ({ 
			'mol_check_checked': ReturnType< $mol_check['checked'] >,
			'aria-checked': ReturnType< $mol_check['aria_checked'] >,
			'role': ReturnType< $mol_check['aria_role'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		sub( ): readonly($mol_view_content)[]
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_check extends $.$mol_check {
        click(next?: Event): void;
        sub(): readonly $mol_view_content[];
        label(): readonly any[];
        aria_checked(): string;
    }
}

declare namespace $ {

	type $mol_check__minimal_width__P6CARI1S = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_width'] >
	>
	type $mol_check__minimal_height__13O4VJE3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_height'] >
	>
	type $mol_check__enabled__NJ6055BA = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_enabled'] >
		,
		ReturnType< $mol_check['enabled'] >
	>
	type $mol_check__checked__R2RAI8LJ = $mol_type_enforce<
		ReturnType< $mol_pick['showed'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__clicks__IEVGBJ6J = $mol_type_enforce<
		ReturnType< $mol_pick['clicks'] >
		,
		ReturnType< $mol_check['clicks'] >
	>
	type $mol_check__sub__YB64ME7K = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_content'] >
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_check__hint__RX93CL70 = $mol_type_enforce<
		ReturnType< $mol_pick['hint'] >
		,
		ReturnType< $mol_check['hint'] >
	>
	export class $mol_pick extends $mol_pop {
		keydown( next?: any ): any
		trigger_enabled( ): boolean
		clicks( next?: any ): any
		trigger_content( ): readonly($mol_view_content)[]
		hint( ): string
		Trigger( ): $mol_check
		event( ): ({ 
			keydown( next?: ReturnType< $mol_pick['keydown'] > ): ReturnType< $mol_pick['keydown'] >,
		})  & ReturnType< $mol_pop['event'] >
		Anchor( ): ReturnType< $mol_pick['Trigger'] >
	}
	
}

//# sourceMappingURL=pick.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_pick extends $.$mol_pick {
        keydown(event: KeyboardEvent): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_dots_vertical extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=vertical.view.tree.d.ts.map
declare namespace $ {

	type $mol_dimmer__haystack__LRUMGOXL = $mol_type_enforce<
		ReturnType< $mol_select['option_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle__9490TSNJ = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_nav__keys_y__UMQM3WCR = $mol_type_enforce<
		ReturnType< $mol_select['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y__GD1YF82Q = $mol_type_enforce<
		ReturnType< $mol_select['option_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_nav__cycle__5ES789OL = $mol_type_enforce<
		ReturnType< $mol_select['nav_cycle'] >
		,
		ReturnType< $mol_nav['cycle'] >
	>
	type $mol_list__rows__76FYNEDL = $mol_type_enforce<
		ReturnType< $mol_select['menu_content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub__C3IVGYAK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_button_minor__event_click__6F3O9JPX = $mol_type_enforce<
		ReturnType< $mol_select['event_select'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__sub__92LRUQGD = $mol_type_enforce<
		ReturnType< $mol_select['option_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub__M6Y1FGTC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_search__query__LIU8NQ54 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__hint__3VXNDCYV = $mol_type_enforce<
		ReturnType< $mol_select['filter_hint'] >
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_search__submit__S0LHQZ1O = $mol_type_enforce<
		ReturnType< $mol_select['submit'] >
		,
		ReturnType< $mol_search['submit'] >
	>
	type $mol_search__enabled__RQYC7WCE = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_search['enabled'] >
	>
	export class $mol_select extends $mol_pick {
		event_select( id: any, next?: any ): any
		option_label( id: any): string
		filter_pattern( next?: string ): string
		Option_label( id: any): $mol_dimmer
		option_content( id: any): readonly(any)[]
		no_options_message( ): string
		nav_components( ): readonly($mol_view)[]
		option_focused( next?: any ): any
		nav_cycle( next?: boolean ): boolean
		Nav( ): $mol_nav
		menu_content( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		filter_hint( ): string
		submit( next?: any ): any
		enabled( ): boolean
		dictionary( next?: Record<string, any> ): Record<string, any>
		options( ): readonly(string)[]
		value( next?: string ): string
		option_label_default( ): string
		Option_row( id: any): $mol_button_minor
		No_options( ): $mol_view
		plugins( ): readonly(any)[]
		hint( ): string
		bubble_content( ): readonly(any)[]
		Filter( ): $mol_search
		Trigger_icon( ): $mol_icon_dots_vertical
	}
	
}

//# sourceMappingURL=select.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_select extends $.$mol_select {
        filter_pattern(next?: string): string;
        open(): void;
        options(): readonly string[];
        options_filtered(): readonly string[];
        option_label(id: string): any;
        option_rows(): $mol_button_minor[];
        option_focused(component?: $mol_view): $mol_view | $.$mol_search | null;
        event_select(id: string, event?: MouseEvent): void;
        nav_components(): ($.$mol_search | $mol_button_minor)[];
        trigger_content(): readonly $mol_view_content[];
        menu_content(): $mol_view[];
    }
}

declare namespace $ {
}

declare namespace $ {
    function $mol_hash_string(str: string, seed?: number): number;
}

declare namespace $ {

	export class $mol_avatar extends $mol_icon {
		view_box( ): string
		id( ): string
		path( ): string
	}
	
}

//# sourceMappingURL=avatar.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_avatar extends $.$mol_avatar {
        path(): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_sync extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=sync.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_sync_off extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=off.view.tree.d.ts.map
declare namespace $ {
    class $mol_wire_dict<Key, Value> extends Map<Key, Value> {
        pub: $mol_wire_pub;
        has(key: Key): boolean;
        get(key: Key): Value | undefined;
        entries(): IterableIterator<[Key, Value]>;
        keys(): IterableIterator<Key>;
        values(): IterableIterator<Value>;
        forEach(task: (value: Value, key: Key, dict: Map<Key, Value>) => void, self?: any): void;
        [Symbol.iterator](): IterableIterator<[Key, Value]>;
        get size(): number;
        set(key: Key, value: Value): this;
        delete(key: Key): boolean;
        clear(): void;
        item(key: Key, next?: Value | null): NonNullable<Value> | null;
    }
}

declare namespace $ {
    type $mol_data_value<Input = any, Output = any> = (val: Input) => Output;
}

declare namespace $ {
    type $mol_data_tagged_type<Value, Tag extends PropertyKey> = Value & {
        [Key in Tag]: Value;
    };
    type $mol_data_tagged_parser<Input, Output> = {
        Value: Output;
    } & ((val: $mol_data_tagged_type<Input, never>) => Output);
    export function $mol_data_tagged<Config extends Record<string, $mol_data_value>>(config: Config): { [Type in keyof Config]: $mol_data_tagged_parser<Parameters<Config[Type]>[0], $mol_data_tagged_type<ReturnType<Config[Type]>, Type>>; };
    export {};
}

declare namespace $ {
    function $mol_base64_encode(src: string | Uint8Array): string;
}

declare namespace $ {
    function $mol_base64_encode_web(str: string | Uint8Array): string;
}

declare namespace $ {
    function $mol_base64_decode(base64: string): Uint8Array;
}

declare namespace $ {
    function $mol_base64_decode_web(base64Str: string): Uint8Array;
}

declare namespace $ {
    function $mol_base64_ae_encode(buffer: Uint8Array): string;
    function $mol_base64_ae_decode(str: string): Uint8Array;
}

declare namespace $ {
    const $hyoo_crus_ref: {
        Value: symbol & {
            $hyoo_crus_ref: symbol;
        };
    } & ((val: (string | symbol) & {}) => symbol & {
        $hyoo_crus_ref: symbol;
    });
    type $hyoo_crus_ref = typeof $hyoo_crus_ref.Value;
    function $hyoo_crus_ref_land(ref: $hyoo_crus_ref): symbol & {
        $hyoo_crus_ref: symbol;
    };
    function $hyoo_crus_ref_peer(ref: $hyoo_crus_ref): string;
    function $hyoo_crus_ref_head(ref: $hyoo_crus_ref): string;
    function $hyoo_crus_ref_encode(ref: $hyoo_crus_ref): Uint8Array;
    function $hyoo_crus_ref_decode(bin: Uint8Array): symbol & {
        $hyoo_crus_ref: symbol;
    };
    function $hyoo_crus_ref_relate(base: $hyoo_crus_ref, ref: $hyoo_crus_ref): symbol & {
        $hyoo_crus_ref: symbol;
    };
    function $hyoo_crus_ref_resolve(base: $hyoo_crus_ref, ref: $hyoo_crus_ref): symbol & {
        $hyoo_crus_ref: symbol;
    };
}

declare namespace $ {
    class $mol_buffer extends DataView {
        static from<This extends typeof $mol_buffer>(this: This, array: number | string | ArrayBufferView): InstanceType<This>;
        static toString(): string;
        getUint48(offset: number, LE?: boolean): number;
        setUint48(offset: number, value: number, LE?: boolean): void;
        int8(offset: number, next?: number): number;
        uint8(offset: number, next?: number): number;
        int16(offset: number, next?: number): number;
        uint16(offset: number, next?: number): number;
        int32(offset: number, next?: number): number;
        uint32(offset: number, next?: number): number;
        uint48(offset: number, next?: number): number;
        int64(offset: number, next?: bigint): bigint;
        uint64(offset: number, next?: bigint): bigint;
        float32(offset: number, next?: number): number;
        float64(offset: number, next?: number): number;
        asArray(): Uint8Array;
        toString(): string;
    }
}

declare namespace $ {
    function $mol_base64_url_encode(buffer: Uint8Array): string;
    function $mol_base64_url_decode(str: string): Uint8Array;
}

declare namespace $ {
    var $mol_crypto_native: Crypto;
}

declare namespace $ {
    class $mol_crypto_key extends $mol_buffer {
        static from<This extends typeof $mol_crypto_key>(this: This, serial: number | string | ArrayBufferView): InstanceType<This>;
        asArray(): Uint8Array;
        toString(): string;
    }
    class $mol_crypto_key_public extends $mol_crypto_key {
        static size_str: number;
        static size_bin: number;
        native(): Promise<CryptoKey>;
        verify(data: BufferSource, sign: BufferSource): Promise<boolean>;
    }
    class $mol_crypto_key_private extends $mol_crypto_key {
        static size_str: number;
        static size_bin: number;
        static size_sign: number;
        static generate(): Promise<$mol_crypto_key_private>;
        native(): Promise<CryptoKey>;
        public(): $mol_crypto_key_public;
        sign(data: BufferSource): Promise<Uint8Array>;
    }
}

declare namespace $ {
    class $mol_crypto_secret extends Object {
        readonly native: CryptoKey & {
            type: 'secret';
        };
        static size: number;
        constructor(native: CryptoKey & {
            type: 'secret';
        });
        static generate(): Promise<$mol_crypto_secret>;
        static from(serial: BufferSource): Promise<$mol_crypto_secret>;
        static pass(pass: string, salt: Uint8Array): Promise<$mol_crypto_secret>;
        static derive(private_serial: string, public_serial: string): Promise<$mol_crypto_secret>;
        serial(): Promise<Uint8Array>;
        encrypt(open: BufferSource, salt: BufferSource): Promise<Uint8Array>;
        decrypt(closed: BufferSource, salt: BufferSource): Promise<Uint8Array>;
    }
}

declare namespace $ {
    class $hyoo_crus_auth extends $mol_crypto_key_private {
        static current(next?: $hyoo_crus_auth | null): $hyoo_crus_auth;
        static embryos: string[];
        static grab(): $hyoo_crus_auth;
        static generate(): Promise<$hyoo_crus_auth>;
        lord(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        peer(): string;
        secret_mutual(pub: string): $mol_crypto_secret;
    }
}

declare namespace $ {
    class $mol_time_base {
        static patterns: Record<string, (arg: any) => string>;
        static formatter(pattern: string): (arg: any) => string;
        toString(pattern: string): string;
    }
}

declare namespace $ {
    type $mol_time_duration_config = number | string | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
    };
    class $mol_time_duration extends $mol_time_base {
        constructor(config?: $mol_time_duration_config);
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        get normal(): $mol_time_duration;
        summ(config: $mol_time_duration_config): $mol_time_duration;
        mult(numb: number): $mol_time_duration;
        count(config: $mol_time_duration_config): number;
        valueOf(): number;
        toJSON(): string;
        toString(pattern?: string): string;
        [Symbol.toPrimitive](mode: 'default' | 'number' | 'string'): string | number;
        static patterns: {
            '#Y': (duration: $mol_time_duration) => string;
            '#M': (duration: $mol_time_duration) => string;
            '#D': (duration: $mol_time_duration) => string;
            '#h': (duration: $mol_time_duration) => string;
            '#m': (duration: $mol_time_duration) => string;
            '#s': (duration: $mol_time_duration) => string;
            hh: (moment: $mol_time_moment) => string;
            h: (moment: $mol_time_moment) => string;
            ':mm': (moment: $mol_time_moment) => string;
            mm: (moment: $mol_time_moment) => string;
            m: (moment: $mol_time_moment) => string;
            ':ss': (moment: $mol_time_moment) => string;
            ss: (moment: $mol_time_moment) => string;
            s: (moment: $mol_time_moment) => string;
            '.sss': (moment: $mol_time_moment) => string;
            sss: (moment: $mol_time_moment) => string;
        };
    }
}

declare namespace $ {
    enum $mol_time_moment_weekdays {
        monday = 0,
        tuesday = 1,
        wednesday = 2,
        thursday = 3,
        friday = 4,
        saturday = 5,
        sunday = 6
    }
    type $mol_time_moment_config = number | Date | string | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
        offset?: $mol_time_duration_config;
    };
    class $mol_time_moment extends $mol_time_base {
        constructor(config?: $mol_time_moment_config);
        readonly year: number | undefined;
        readonly month: number | undefined;
        readonly day: number | undefined;
        readonly hour: number | undefined;
        readonly minute: number | undefined;
        readonly second: number | undefined;
        readonly offset: $mol_time_duration | undefined;
        get weekday(): number;
        _native: Date | undefined;
        get native(): Date;
        _normal: $mol_time_moment | undefined;
        get normal(): $mol_time_moment;
        merge(config: $mol_time_moment_config): $mol_time_moment;
        shift(config: $mol_time_duration_config): $mol_time_moment;
        mask(config: $mol_time_moment_config): $mol_time_moment;
        toOffset(config?: $mol_time_duration_config): $mol_time_moment;
        valueOf(): number;
        toJSON(): string;
        toString(pattern?: string): string;
        [Symbol.toPrimitive](mode: 'default' | 'number' | 'string'): string | number;
        static patterns: {
            YYYY: (moment: $mol_time_moment) => string;
            AD: (moment: $mol_time_moment) => string;
            YY: (moment: $mol_time_moment) => string;
            Month: (moment: $mol_time_moment) => string;
            'DD Month': (moment: $mol_time_moment) => string;
            'D Month': (moment: $mol_time_moment) => string;
            Mon: (moment: $mol_time_moment) => string;
            'DD Mon': (moment: $mol_time_moment) => string;
            'D Mon': (moment: $mol_time_moment) => string;
            '-MM': (moment: $mol_time_moment) => string;
            MM: (moment: $mol_time_moment) => string;
            M: (moment: $mol_time_moment) => string;
            WeekDay: (moment: $mol_time_moment) => string;
            WD: (moment: $mol_time_moment) => string;
            '-DD': (moment: $mol_time_moment) => string;
            DD: (moment: $mol_time_moment) => string;
            D: (moment: $mol_time_moment) => string;
            Thh: (moment: $mol_time_moment) => string;
            hh: (moment: $mol_time_moment) => string;
            h: (moment: $mol_time_moment) => string;
            ':mm': (moment: $mol_time_moment) => string;
            mm: (moment: $mol_time_moment) => string;
            m: (moment: $mol_time_moment) => string;
            ':ss': (moment: $mol_time_moment) => string;
            ss: (moment: $mol_time_moment) => string;
            s: (moment: $mol_time_moment) => string;
            '.sss': (moment: $mol_time_moment) => string;
            sss: (moment: $mol_time_moment) => string;
            Z: (moment: $mol_time_moment) => string;
        };
    }
}

declare namespace $ {
    function $hyoo_crus_time_moment(time: number): $mol_time_moment;
    function $hyoo_crus_time_counter(time: number): number;
    function $hyoo_crus_time_dump(time: number): string;
}

declare namespace $ {
    type $hyoo_crus_face_data = Iterable<readonly [peer: string, time: number]>;
    class $hyoo_crus_face_map extends Map<string, number> {
        last: number;
        total: number;
        constructor(entries?: $hyoo_crus_face_data);
        sync(right: $hyoo_crus_face_data): void;
        time_max(peer: string, time: number): void;
        tick(): number;
    }
}

declare namespace $ {
    class $mol_wire_set<Value> extends Set<Value> {
        pub: $mol_wire_pub;
        has(value: Value): boolean;
        entries(): IterableIterator<[Value, Value]>;
        keys(): IterableIterator<Value>;
        values(): IterableIterator<Value>;
        forEach(task: (value: Value, value2: Value, set: Set<Value>) => void, self?: any): void;
        [Symbol.iterator](): IterableIterator<Value>;
        get size(): number;
        add(value: Value): this;
        delete(value: Value): boolean;
        clear(): void;
        item(val: Value, next?: boolean): boolean;
    }
}

declare namespace $ {
    enum $hyoo_crus_area {
        data = 0,
        meta = 1
    }
    function $hyoo_crus_area_of(numb: string): "data" | "meta";
    function $hyoo_crus_area_to(numb: string, area: keyof typeof $hyoo_crus_area): string;
}

declare namespace $ {
    enum $hyoo_crus_rank {
        nil = 0,
        get = 1,
        add = 3,
        mod = 7,
        law = 15
    }
    type $hyoo_crus_rank_preset = Record<string, $hyoo_crus_rank>;
    let $hyoo_crus_rank_private: $hyoo_crus_rank_preset;
    let $hyoo_crus_rank_public: $hyoo_crus_rank_preset;
    let $hyoo_crus_rank_lobby: $hyoo_crus_rank_preset;
    let $hyoo_crus_rank_orgy: $hyoo_crus_rank_preset;
}

declare namespace $ {
    enum $hyoo_crus_part {
        land = 219,
        pass = 255,
        gift = 247,
        gist = 0,
        hash = 253,
        rock = 245,
        root = 1,
        buck = 9
    }
}

declare namespace $ {
    enum $hyoo_crus_unit_kind {
        pass = 255,
        gift = 247,
        gist = 0
    }
    class $hyoo_crus_unit extends $mol_buffer {
        static size: 128;
        constructor(buffer?: ArrayBuffer, byteOffset?: number, byteLength?: number);
        kind(): "gist" | "pass" | "gift";
        choose<Res>(ways: {
            pass: (unit: $hyoo_crus_pass) => Res;
            gift: (unit: $hyoo_crus_gift) => Res;
            gist: (unit: $hyoo_crus_gist) => Res;
        }): Res;
        narrow(): $hyoo_crus_gist | $hyoo_crus_gift | $hyoo_crus_pass;
        key(): string;
        id6(offset: number, next?: string): string;
        id12(offset: number, next?: $hyoo_crus_ref): symbol & {
            $hyoo_crus_ref: symbol;
        };
        _peer: string;
        peer(next?: string): string;
        salt(): Uint8Array;
        sens(next?: ArrayLike<number>): Uint8Array;
        mix(mixin: Uint8Array): void;
        sign(next?: ArrayLike<number>): Uint8Array;
        signed(): boolean;
        _land: $hyoo_crus_land | null;
        dump(): {};
    }
}

declare namespace $ {
    type $mol_time_interval_config = string | {
        start?: $mol_time_moment_config;
        end?: $mol_time_moment_config;
        duration?: $mol_time_duration_config;
    };
    class $mol_time_interval extends $mol_time_base {
        constructor(config: $mol_time_interval_config);
        private _start;
        get start(): $mol_time_moment;
        private _end;
        get end(): $mol_time_moment;
        private _duration;
        get duration(): $mol_time_duration;
        toJSON(): string;
        toString(): string;
        [Symbol.toPrimitive](mode: 'default' | 'number' | 'string'): string;
    }
}

declare namespace $ {
    class $mol_span extends $mol_object2 {
        readonly uri: string;
        readonly source: string;
        readonly row: number;
        readonly col: number;
        readonly length: number;
        constructor(uri: string, source: string, row: number, col: number, length: number);
        static unknown: $mol_span;
        static begin(uri: string, source?: string): $mol_span;
        static end(uri: string, source: string): $mol_span;
        static entire(uri: string, source: string): $mol_span;
        toString(): string;
        toJSON(): {
            uri: string;
            row: number;
            col: number;
            length: number;
        };
        error(message: string, Class?: ErrorConstructor): Error;
        span(row: number, col: number, length: number): $mol_span;
        after(length?: number): $mol_span;
        slice(begin: number, end?: number): $mol_span;
    }
}

declare namespace $ {
    class $mol_error_syntax extends SyntaxError {
        reason: string;
        line: string;
        span: $mol_span;
        constructor(reason: string, line: string, span: $mol_span);
    }
}

declare namespace $ {
    function $mol_tree2_from_string(this: $, str: string, uri?: string): $mol_tree2;
}

declare namespace $ {
    function $mol_tree2_to_string(this: $, tree: $mol_tree2): string;
}

declare namespace $ {
    type $mol_tree2_path = Array<string | number | null>;
    type $mol_tree2_hack<Context> = (input: $mol_tree2, belt: $mol_tree2_belt<Context>, context: Context) => readonly $mol_tree2[];
    type $mol_tree2_belt<Context> = Record<string, $mol_tree2_hack<Context>>;
    class $mol_tree2 extends Object {
        readonly type: string;
        readonly value: string;
        readonly kids: readonly $mol_tree2[];
        readonly span: $mol_span;
        constructor(type: string, value: string, kids: readonly $mol_tree2[], span: $mol_span);
        static list(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        list(kids: readonly $mol_tree2[]): $mol_tree2;
        static data(value: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        data(value: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        static struct(type: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        struct(type: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        clone(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        text(): string;
        static fromString(str: string, uri?: string): $mol_tree2;
        toString(): string;
        insert(value: $mol_tree2 | null, ...path: $mol_tree2_path): $mol_tree2;
        select(...path: $mol_tree2_path): $mol_tree2;
        filter(path: string[], value?: string): $mol_tree2;
        hack_self<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): readonly $mol_tree2[];
        hack<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): $mol_tree2[];
        error(message: string, Class?: ErrorConstructor): Error;
    }
    class $mol_tree2_empty extends $mol_tree2 {
        constructor();
    }
}

declare namespace $ {
    type $mol_type_result<Func> = Func extends (...params: any) => infer Result ? Result : Func extends new (...params: any) => infer Result ? Result : never;
}

declare namespace $ {
    function $mol_dom_serialize(node: Node): string;
}

declare namespace $ {
    type json = null | boolean | number | string | {
        [key in string]: json;
    } | readonly json[];
    export type $hyoo_crus_vary_type = Uint8Array | bigint | $hyoo_crus_ref | $mol_time_moment | $mol_time_duration | $mol_time_interval | $mol_tree2 | json | Node;
    export let $hyoo_crus_vary_mapping: {
        nil: null;
        bin: Uint8ArrayConstructor;
        bool: BooleanConstructor;
        int: BigIntConstructor;
        real: NumberConstructor;
        ref: SymbolConstructor;
        str: StringConstructor;
        time: typeof $mol_time_moment;
        dur: typeof $mol_time_duration;
        range: typeof $mol_time_interval;
        json: ObjectConstructor;
        jsan: ArrayConstructor;
        dom: {
            new (): Element;
            prototype: Element;
        };
        tree: typeof $mol_tree2;
    };
    export type $hyoo_crus_vary_classes = typeof $hyoo_crus_vary_mapping[keyof typeof $hyoo_crus_vary_mapping];
    export type $hyoo_crus_vary_pack = {
        tip: keyof typeof $hyoo_crus_vary_tip;
        bin: Uint8Array;
    };
    export enum $hyoo_crus_vary_tip {
        nil = 0,
        bin = 1,
        bool = 2,
        int = 3,
        real = 4,
        ref = 5,
        str = 16,
        time = 17,
        dur = 18,
        range = 19,
        json = 20,
        jsan = 21,
        dom = 22,
        tree = 23
    }
    export function $hyoo_crus_vary_switch<Ways extends {
        nil: (vary: null) => any;
        bin: (vary: Uint8Array) => any;
        bool: (vary: boolean) => any;
        int: (vary: bigint) => any;
        real: (vary: number) => any;
        ref: (vary: $hyoo_crus_ref) => any;
        str: (vary: string) => any;
        time: (vary: $mol_time_moment) => any;
        dur: (vary: $mol_time_duration) => any;
        range: (vary: $mol_time_interval) => any;
        json: (vary: {}) => any;
        jsan: (vary: any[]) => any;
        dom: (vary: Element) => any;
        tree: (vary: $mol_tree2) => any;
    }>(vary: $hyoo_crus_vary_type, ways: Ways): $mol_type_result<Ways[keyof Ways]>;
    export function $hyoo_crus_vary_encode(vary: $hyoo_crus_vary_type): $hyoo_crus_vary_pack;
    export function $hyoo_crus_vary_decode({ tip, bin }: $hyoo_crus_vary_pack): $hyoo_crus_vary_type;
    export {};
}

declare namespace $ {
    function $mol_crypto_hash(data: Uint8Array): Uint8Array;
}

declare namespace $ {
    enum $hyoo_crus_gist_tag {
        term = 0,
        solo = 1,
        vals = 2,
        keys = 3
    }
    class $hyoo_crus_gist extends $hyoo_crus_unit {
        _vary: $hyoo_crus_vary_type | undefined;
        _open: Uint8Array | null;
        hint(tip?: "ref" | "nil" | "bin" | "bool" | "int" | "real" | "str" | "time" | "dur" | "range" | "json" | "jsan" | "dom" | "tree", tag?: "keys" | "term" | "solo" | "vals"): void;
        tag(): "keys" | "term" | "solo" | "vals";
        tip(): "ref" | "nil" | "bin" | "bool" | "int" | "real" | "str" | "time" | "dur" | "range" | "json" | "jsan" | "dom" | "tree";
        utf(): boolean;
        nil(): boolean;
        size(next?: number): number;
        time(next?: number): number;
        _self: string;
        self(next?: string): string;
        _head: string;
        head(next?: string): string;
        key(): string;
        _lead: string;
        lead(next?: string): string;
        hash(next?: Uint8Array, tip?: "ref" | "nil" | "bin" | "bool" | "int" | "real" | "str" | "time" | "dur" | "range" | "json" | "jsan" | "dom" | "tree", tag?: "keys" | "term" | "solo" | "vals"): Uint8Array;
        meta(): Uint8Array;
        data(next?: Uint8Array, tip?: "ref" | "nil" | "bin" | "bool" | "int" | "real" | "str" | "time" | "dur" | "range" | "json" | "jsan" | "dom" | "tree", tag?: "keys" | "term" | "solo" | "vals"): Uint8Array;
        idea(): number;
        static compare(left: $hyoo_crus_gist, right: $hyoo_crus_gist): number;
        dump(): {
            kind: "gist" | "pass" | "gift";
            peer: string;
            lead: string;
            head: string;
            self: string;
            tip: "ref" | "nil" | "bin" | "bool" | "int" | "real" | "str" | "time" | "dur" | "range" | "json" | "jsan" | "dom" | "tree";
            tag: "keys" | "term" | "solo" | "vals";
            size: number;
            time: string;
        };
    }
}

declare namespace $ {
    class $hyoo_crus_node extends $mol_object {
        static tag: "keys" | "term" | "solo" | "vals";
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node extends typeof $hyoo_crus_node>(Node: Node | null): readonly InstanceType<Node>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
    }
}

declare namespace $ {
    function $mol_reconcile<Prev, Next>({ prev, from, to, next, equal, drop, insert, update, }: {
        prev: readonly Prev[];
        from: number;
        to: number;
        next: ArrayLike<Next>;
        equal: (next: Next, prev: Prev) => boolean;
        drop: (prev: Prev, lead: Prev | null) => Prev | null;
        insert: (next: Next, lead: Prev | null) => Prev;
        update?: (next: Next, prev: Prev, lead: Prev | null) => Prev;
    }): void;
}

declare namespace $ {
    type $mol_type_partial_deep<Val> = Val extends object ? Val extends Function ? Val : {
        [field in keyof Val]?: $mol_type_partial_deep<Val[field]> | undefined;
    } : Val;
}

declare namespace $ {
    let $mol_jsx_prefix: string;
    let $mol_jsx_crumbs: string;
    let $mol_jsx_booked: Set<string> | null;
    let $mol_jsx_document: $mol_jsx.JSX.ElementClass['ownerDocument'];
    const $mol_jsx_frag = "";
    function $mol_jsx<Props extends $mol_jsx.JSX.IntrinsicAttributes, Children extends Array<Node | string>>(Elem: string | ((props: Props, ...children: Children) => Element), props: Props, ...childNodes: Children): Element | DocumentFragment;
    namespace $mol_jsx.JSX {
        interface Element extends HTMLElement {
            class?: string;
        }
        interface ElementClass {
            attributes: {};
            ownerDocument: Pick<Document, 'getElementById' | 'createElementNS' | 'createDocumentFragment'>;
            childNodes: Array<Node | string>;
            valueOf(): Element;
        }
        type OrString<Dict> = {
            [key in keyof Dict]: Dict[key] | string;
        };
        type IntrinsicElements = {
            [key in keyof ElementTagNameMap]?: $.$mol_type_partial_deep<OrString<Element & IntrinsicAttributes & ElementTagNameMap[key]>>;
        };
        interface IntrinsicAttributes {
            id?: string;
            xmlns?: string;
        }
        interface ElementAttributesProperty {
            attributes: {};
        }
        interface ElementChildrenAttribute {
        }
    }
}

declare namespace $ {
    function $mol_tree2_bin_to_bytes(tree: $mol_tree2): Uint8Array;
    function $mol_tree2_bin_from_bytes(bytes: ArrayLike<number>, span?: $mol_span): $mol_tree2;
    function $mol_tree2_bin_from_string(str: string, span?: $mol_span): $mol_tree2;
}

declare namespace $ {
    function $mol_tree2_from_json(json: any, span?: $mol_span): $mol_tree2;
}

declare namespace $ {
    function $mol_tree2_xml_from_dom(dom: Node): $mol_tree2;
}

declare namespace $ {
    function $hyoo_crus_vary_cast_bin(vary: $hyoo_crus_vary_type): Uint8Array | null;
    function $hyoo_crus_vary_cast_bool(vary: $hyoo_crus_vary_type): boolean | null;
    function $hyoo_crus_vary_cast_int(vary: $hyoo_crus_vary_type): bigint | null;
    function $hyoo_crus_vary_cast_real(vary: $hyoo_crus_vary_type): number | null;
    function $hyoo_crus_vary_cast_ref(vary: $hyoo_crus_vary_type): (symbol & {
        $hyoo_crus_ref: symbol;
    }) | null;
    function $hyoo_crus_vary_cast_str(vary: $hyoo_crus_vary_type): string | null;
    function $hyoo_crus_vary_cast_time(vary: $hyoo_crus_vary_type): $mol_time_moment | null;
    function $hyoo_crus_vary_cast_dur(vary: $hyoo_crus_vary_type): $mol_time_moment | $mol_time_duration | null;
    function $hyoo_crus_vary_cast_range(vary: $hyoo_crus_vary_type): $mol_time_interval | null;
    function $hyoo_crus_vary_cast_json(vary: $hyoo_crus_vary_type): any;
    function $hyoo_crus_vary_cast_jsan(vary: $hyoo_crus_vary_type): any[] | string[] | number[] | boolean[] | {}[] | null;
    function $hyoo_crus_vary_cast_dom(vary: $hyoo_crus_vary_type): Element | HTMLElement | $mol_jsx.JSX.Element | null;
    function $hyoo_crus_vary_cast_tree(vary: $hyoo_crus_vary_type): $mol_tree2 | null;
    const $hyoo_crus_vary_cast_funcs: {
        readonly nil: () => null;
        readonly bin: typeof $hyoo_crus_vary_cast_bin;
        readonly bool: typeof $hyoo_crus_vary_cast_bool;
        readonly int: typeof $hyoo_crus_vary_cast_int;
        readonly real: typeof $hyoo_crus_vary_cast_real;
        readonly ref: typeof $hyoo_crus_vary_cast_ref;
        readonly str: typeof $hyoo_crus_vary_cast_str;
        readonly time: typeof $hyoo_crus_vary_cast_time;
        readonly dur: typeof $hyoo_crus_vary_cast_dur;
        readonly range: typeof $hyoo_crus_vary_cast_range;
        readonly json: typeof $hyoo_crus_vary_cast_json;
        readonly jsan: typeof $hyoo_crus_vary_cast_jsan;
        readonly dom: typeof $hyoo_crus_vary_cast_dom;
        readonly tree: typeof $hyoo_crus_vary_cast_tree;
    };
    function $hyoo_crus_vary_cast<Tip extends keyof typeof $hyoo_crus_vary_tip>(tip: Tip, vary: $hyoo_crus_vary_type): any;
}

declare namespace $ {
    function $mol_guard_defined<T>(value: T): value is NonNullable<T>;
}

declare namespace $ {
    export class $hyoo_crus_list_vary extends $hyoo_crus_node {
        static tag: "keys" | "term" | "solo" | "vals";
        items_vary(next?: readonly $hyoo_crus_vary_type[], tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
    }
    export function $hyoo_crus_list<Parse extends $mol_data_value>(parse: Parse): (abstract new () => {
        items(next?: readonly ReturnType<Parse>[]): readonly ReturnType<Parse>[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: Parse;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    const $hyoo_crus_list_bin_base: (abstract new () => {
        items(next?: readonly (Uint8Array | null)[] | undefined): readonly (Uint8Array | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_bin;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_bin extends $hyoo_crus_list_bin_base {
    }
    const $hyoo_crus_list_bool_base: (abstract new () => {
        items(next?: readonly (boolean | null)[] | undefined): readonly (boolean | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_bool;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_bool extends $hyoo_crus_list_bool_base {
    }
    const $hyoo_crus_list_int_base: (abstract new () => {
        items(next?: readonly (bigint | null)[] | undefined): readonly (bigint | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_int;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_int extends $hyoo_crus_list_int_base {
    }
    const $hyoo_crus_list_real_base: (abstract new () => {
        items(next?: readonly (number | null)[] | undefined): readonly (number | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_real;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_real extends $hyoo_crus_list_real_base {
    }
    const $hyoo_crus_list_ref_base_1: (abstract new () => {
        items(next?: readonly ((symbol & {
            $hyoo_crus_ref: symbol;
        }) | null)[] | undefined): readonly ((symbol & {
            $hyoo_crus_ref: symbol;
        }) | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_ref;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_ref extends $hyoo_crus_list_ref_base_1 {
    }
    const $hyoo_crus_list_str_base: (abstract new () => {
        items(next?: readonly (string | null)[] | undefined): readonly (string | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_str;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_str extends $hyoo_crus_list_str_base {
    }
    const $hyoo_crus_list_time_base: (abstract new () => {
        items(next?: readonly ($mol_time_moment | null)[] | undefined): readonly ($mol_time_moment | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_time;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_time extends $hyoo_crus_list_time_base {
    }
    const $hyoo_crus_list_dur_base: (abstract new () => {
        items(next?: readonly ($mol_time_moment | $mol_time_duration | null)[] | undefined): readonly ($mol_time_moment | $mol_time_duration | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_dur;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_dur extends $hyoo_crus_list_dur_base {
    }
    const $hyoo_crus_list_range_base: (abstract new () => {
        items(next?: readonly ($mol_time_interval | null)[] | undefined): readonly ($mol_time_interval | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_range;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_range extends $hyoo_crus_list_range_base {
    }
    const $hyoo_crus_list_json_base: (abstract new () => {
        items(next?: readonly any[] | undefined): readonly any[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_json;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_json extends $hyoo_crus_list_json_base {
    }
    const $hyoo_crus_list_jsan_base: (abstract new () => {
        items(next?: readonly (any[] | string[] | number[] | boolean[] | {}[] | null)[] | undefined): readonly (any[] | string[] | number[] | boolean[] | {}[] | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_jsan;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_jsan extends $hyoo_crus_list_jsan_base {
    }
    const $hyoo_crus_list_dom_base: (abstract new () => {
        items(next?: readonly (Element | HTMLElement | $mol_jsx.JSX.Element | null)[] | undefined): readonly (Element | HTMLElement | $mol_jsx.JSX.Element | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_dom;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_dom extends $hyoo_crus_list_dom_base {
    }
    const $hyoo_crus_list_tree_base: (abstract new () => {
        items(next?: readonly ($mol_tree2 | null)[] | undefined): readonly ($mol_tree2 | null)[];
        items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
        splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
        find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
        has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
        add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
        cut(vary: $hyoo_crus_vary_type): void;
        move(from: number, to: number): void;
        wipe(seat: number): void;
        node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
        nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_tree;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_list_tree extends $hyoo_crus_list_tree_base {
    }
    export class $hyoo_crus_list_ref_base extends $hyoo_crus_list_ref {
    }
    export function $hyoo_crus_list_ref_to<const Value extends any, Vals extends readonly any[] = readonly $mol_type_result<$mol_type_result<Value>>[]>(Value: Value): {
        new (): {
            remote_list(next?: Vals): Vals;
            remote_make(preset: $hyoo_crus_rank_preset): Vals[number];
            local_make(idea?: number): Vals[number];
            items(next?: readonly ((symbol & {
                $hyoo_crus_ref: symbol;
            }) | null)[] | undefined): readonly ((symbol & {
                $hyoo_crus_ref: symbol;
            }) | null)[];
            items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
            splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
            find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
            has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
            add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
            cut(vary: $hyoo_crus_vary_type): void;
            move(from: number, to: number): void;
            wipe(seat: number): void;
            node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
            nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        };
        Value: Value;
        toJSON(): string;
        parse: typeof $hyoo_crus_vary_cast_ref;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export {};
}

declare namespace $ {
    const $hyoo_crus_dict_base: typeof $hyoo_crus_list_vary;
    export class $hyoo_crus_dict extends $hyoo_crus_dict_base {
        static tag: "keys" | "term" | "solo" | "vals";
        keys(): readonly $hyoo_crus_vary_type[];
        dive<Node extends typeof $hyoo_crus_node>(key: $hyoo_crus_vary_type, Node: Node, auto?: any): InstanceType<Node> | null;
        static schema: Record<string, typeof $hyoo_crus_node>;
        static with<This extends typeof $hyoo_crus_dict, const Schema extends Record<string, {
            tag: keyof typeof $hyoo_crus_gist_tag;
            new (): {};
        }>>(this: This, schema: Schema): Omit<This, "prototype"> & (new (...args: any[]) => $mol_type_override<InstanceType<This>, { readonly [Key in keyof Schema]: (auto?: any) => InstanceType<Schema[Key]> | null; }>) & {
            schema: {
                [x: string]: typeof $hyoo_crus_node;
            } & Schema;
        };
    }
    export function $hyoo_crus_dict_to<Value extends {
        tag: keyof typeof $hyoo_crus_gist_tag;
        new (): {};
    }>(Value: Value): {
        new (): {
            Value: Value;
            key(key: $hyoo_crus_vary_type, auto?: any): InstanceType<Value>;
            keys(): readonly $hyoo_crus_vary_type[];
            dive<Node extends typeof $hyoo_crus_node>(key: $hyoo_crus_vary_type, Node: Node, auto?: any): InstanceType<Node> | null;
            items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
            splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
            find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
            has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
            add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
            cut(vary: $hyoo_crus_vary_type): void;
            move(from: number, to: number): void;
            wipe(seat: number): void;
            node_make<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node_1>;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2): InstanceType<Node_2>;
            nodes<Node_3 extends typeof $hyoo_crus_node>(Node: Node_3 | null): readonly InstanceType<Node_3>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        };
        toString(): any;
        tag: "keys" | "term" | "solo" | "vals";
        schema: Record<string, typeof $hyoo_crus_node>;
        with<This extends typeof $hyoo_crus_dict, const Schema extends Record<string, {
            new (): {};
            tag: "keys" | "term" | "solo" | "vals";
        }>>(this: This, schema: Schema): Omit<This, "prototype"> & (new (...args: any[]) => $mol_type_override<InstanceType<This>, { readonly [Key in keyof Schema]: (auto?: any) => InstanceType<Schema[Key]> | null; }>) & {
            schema: {
                [x: string]: typeof $hyoo_crus_node;
            } & Schema;
        };
        make<This_1 extends typeof $mol_object>(this: This_1, config: Partial<InstanceType<This_1>>): InstanceType<This_1>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export {};
}

declare namespace $ {
    const $hyoo_crus_meta_base: Omit<typeof $hyoo_crus_dict, "prototype"> & (new (...args: any[]) => $mol_type_override<$hyoo_crus_dict, {
        readonly Inflow: (auto?: any) => $hyoo_crus_list_ref | null;
    }>) & {
        schema: {
            [x: string]: typeof $hyoo_crus_node;
        } & {
            readonly Inflow: typeof $hyoo_crus_list_ref;
        };
    };
    export class $hyoo_crus_meta extends $hyoo_crus_meta_base {
    }
    export {};
}

declare namespace $ {
    class $hyoo_crus_fund<Key, Node> extends $mol_object {
        readonly item_make: (head: Key) => Node;
        constructor(item_make: (head: Key) => Node);
        Item(head: Key): Node;
    }
}

declare namespace $ {
    class $hyoo_crus_pass extends $hyoo_crus_unit {
        work(): number;
        _lord: $hyoo_crus_ref;
        lord(next?: $hyoo_crus_ref): symbol & {
            $hyoo_crus_ref: symbol;
        };
        key(): string;
        auth(next?: ArrayLike<number>): Uint8Array;
        dump(): {
            kind: "gist" | "pass" | "gift";
            lord: string;
        };
    }
}

declare namespace $ {
    class $hyoo_crus_gift extends $hyoo_crus_unit {
        rank(next?: $hyoo_crus_rank): $hyoo_crus_rank;
        time(next?: number): number;
        free(): Uint8Array;
        _dest: $hyoo_crus_ref;
        dest(next?: $hyoo_crus_ref): symbol & {
            $hyoo_crus_ref: symbol;
        };
        key(): string;
        bill(): Uint8Array;
        static compare(left: $hyoo_crus_gift, right: $hyoo_crus_gift): number;
        dump(): {
            kind: "gist" | "pass" | "gift";
            peer: string;
            dest: string;
            rank: string;
            time: string;
        };
    }
}

declare namespace $ {
    type $hyoo_crus_pack_parts = {
        lands: Record<$hyoo_crus_ref, {
            faces: $hyoo_crus_face_map;
            units: $hyoo_crus_unit[];
        }>;
        rocks: [Uint8Array, null | Uint8Array][];
    };
    class $hyoo_crus_pack extends $mol_buffer {
        toBlob(): Blob;
        parts(land?: (symbol & {
            $hyoo_crus_ref: symbol;
        }) | null): {
            lands: Record<symbol & {
                $hyoo_crus_ref: symbol;
            }, {
                faces: $hyoo_crus_face_map;
                units: $hyoo_crus_unit[];
            }>;
            rocks: [Uint8Array, Uint8Array | null][];
        };
        static make({ lands, rocks }: $hyoo_crus_pack_parts): $hyoo_crus_pack;
    }
}

declare namespace $ {
    class $mol_bus<Data> extends $mol_object {
        readonly name: string;
        readonly handle: (data: Data) => void;
        readonly channel: BroadcastChannel;
        constructor(name: string, handle: (data: Data) => void);
        destructor(): void;
        send(data: Data): void;
    }
}

declare namespace $ {
    class $mol_graph<Node, Edge> {
        nodes: Set<Node>;
        edges_out: Map<Node, Map<Node, Edge>>;
        edges_in: Map<Node, Map<Node, Edge>>;
        link(from: Node, to: Node, edge: Edge): void;
        unlink(from: Node, to: Node): void;
        link_out(from: Node, to: Node, edge: Edge): void;
        link_in(to: Node, from: Node, edge: Edge): void;
        edge(from: Node, to: Node): NonNullable<Edge> | null;
        edge_out(from: Node, to: Node): NonNullable<Edge> | null;
        edge_in(to: Node, from: Node): NonNullable<Edge> | null;
        acyclic(get_weight: (edge: Edge) => number): void;
        get sorted(): Set<Node>;
        get roots(): Node[];
        nodes_depth(select: (left: number, right: number) => number): Map<Node, number>;
        depth_nodes(select: (left: number, right: number) => number): Node[][];
    }
}

declare namespace $ {
    function $mol_wire_race<Tasks extends ((...args: any) => any)[]>(...tasks: Tasks): {
        [index in keyof Tasks]: ReturnType<Tasks[index]>;
    };
}

declare namespace $ {
    export class $hyoo_crus_atom_vary extends $hyoo_crus_node {
        static tag: "keys" | "term" | "solo" | "vals";
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type): $hyoo_crus_vary_type;
    }
    export class $hyoo_crus_atom_enum_base extends $hyoo_crus_atom_vary {
        static options: readonly $hyoo_crus_vary_type[];
    }
    export function $hyoo_crus_atom_enum<const Options extends readonly $hyoo_crus_vary_type[]>(options: Options): (abstract new () => {
        val(next?: Options[number]): Options[number] | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        options: Options;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export function $hyoo_crus_atom<Parse extends $mol_data_value>(parse: Parse): (abstract new () => {
        val(next?: ReturnType<Parse>): ReturnType<Parse> | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: Parse;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    const $hyoo_crus_atom_bin_base: (abstract new () => {
        val(next?: Uint8Array | null | undefined): Uint8Array | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_bin;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_bin extends $hyoo_crus_atom_bin_base {
    }
    const $hyoo_crus_atom_bool_base: (abstract new () => {
        val(next?: boolean | null | undefined): boolean | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_bool;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_bool extends $hyoo_crus_atom_bool_base {
    }
    const $hyoo_crus_atom_int_base: (abstract new () => {
        val(next?: bigint | null | undefined): bigint | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_int;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_int extends $hyoo_crus_atom_int_base {
    }
    const $hyoo_crus_atom_real_base: (abstract new () => {
        val(next?: number | null | undefined): number | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_real;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_real extends $hyoo_crus_atom_real_base {
    }
    const $hyoo_crus_atom_ref_base_1: (abstract new () => {
        val(next?: (symbol & {
            $hyoo_crus_ref: symbol;
        }) | null | undefined): (symbol & {
            $hyoo_crus_ref: symbol;
        }) | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_ref;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_ref extends $hyoo_crus_atom_ref_base_1 {
    }
    const $hyoo_crus_atom_str_base: (abstract new () => {
        val(next?: string | null | undefined): string | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_str;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_str extends $hyoo_crus_atom_str_base {
    }
    const $hyoo_crus_atom_time_base: (abstract new () => {
        val(next?: $mol_time_moment | null | undefined): $mol_time_moment | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_time;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_time extends $hyoo_crus_atom_time_base {
    }
    const $hyoo_crus_atom_dur_base: (abstract new () => {
        val(next?: $mol_time_moment | $mol_time_duration | null | undefined): $mol_time_moment | $mol_time_duration | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_dur;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_dur extends $hyoo_crus_atom_dur_base {
    }
    const $hyoo_crus_atom_range_base: (abstract new () => {
        val(next?: $mol_time_interval | null | undefined): $mol_time_interval | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_range;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_range extends $hyoo_crus_atom_range_base {
    }
    const $hyoo_crus_atom_json_base: (abstract new () => {
        val(next?: any): any;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_json;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_json extends $hyoo_crus_atom_json_base {
    }
    const $hyoo_crus_atom_jsan_base: (abstract new () => {
        val(next?: any[] | string[] | number[] | boolean[] | {}[] | null | undefined): any[] | string[] | number[] | boolean[] | {}[] | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_jsan;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_jsan extends $hyoo_crus_atom_jsan_base {
    }
    const $hyoo_crus_atom_dom_base: (abstract new () => {
        val(next?: Element | HTMLElement | $mol_jsx.JSX.Element | null | undefined): Element | HTMLElement | $mol_jsx.JSX.Element | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_dom;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_dom extends $hyoo_crus_atom_dom_base {
    }
    const $hyoo_crus_atom_tree_base: (abstract new () => {
        val(next?: $mol_tree2 | null | undefined): $mol_tree2 | null;
        pick_unit(): $hyoo_crus_gist | undefined;
        vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
        land(): $hyoo_crus_land;
        head(): string;
        realm(): $hyoo_crus_realm | null;
        land_ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        toJSON(): string | undefined;
        cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
        units(): $hyoo_crus_gist[];
        filled(): boolean;
        can_change(lord?: symbol & {
            $hyoo_crus_ref: symbol;
        }): boolean;
        last_change(): $mol_time_moment | null;
        $: typeof $$;
        destructor(): void;
        toString(): string;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
    }) & {
        parse: typeof $hyoo_crus_vary_cast_tree;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toString(): any;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_atom_tree extends $hyoo_crus_atom_tree_base {
    }
    export class $hyoo_crus_atom_ref_base extends $hyoo_crus_atom_ref {
        static Value: typeof $hyoo_crus_dict;
    }
    export function $hyoo_crus_atom_ref_to<const Value extends any>(Value: Value): {
        new (): {
            Value: Value;
            yoke(preset?: $hyoo_crus_rank_preset): $hyoo_crus_land | null;
            remote(next?: $mol_type_result<$mol_type_result<Value>> | null | undefined): $mol_type_result<$mol_type_result<Value>> | null;
            remote_ensure(preset?: $hyoo_crus_rank_preset): $mol_type_result<$mol_type_result<Value>> | null;
            local_ensure(): $mol_type_result<$mol_type_result<Value>> | null;
            val(next?: (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null | undefined): (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null;
            pick_unit(): $hyoo_crus_gist | undefined;
            vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
            nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        };
        toString(): string;
        Value: typeof $hyoo_crus_dict;
        parse: typeof $hyoo_crus_vary_cast_ref;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export {};
}

declare namespace $ {
    class $hyoo_crus_land extends $mol_object {
        realm(): $hyoo_crus_realm | null;
        ref(): symbol & {
            $hyoo_crus_ref: symbol;
        };
        auth(): $hyoo_crus_auth;
        faces: $hyoo_crus_face_map;
        passes: $mol_wire_dict<string, $hyoo_crus_pass>;
        gifts: $mol_wire_dict<symbol & {
            $hyoo_crus_ref: symbol;
        }, $hyoo_crus_gift>;
        gists: $mol_wire_dict<string, $mol_wire_dict<string, $hyoo_crus_gist>>;
        self_all: $mol_wire_set<string>;
        self_make(area: keyof typeof $hyoo_crus_area, idea?: number): string;
        home(): $hyoo_crus_home;
        Data<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
        Meta(): $hyoo_crus_meta;
        Node<Node extends typeof $hyoo_crus_node>(Node: Node): $hyoo_crus_fund<string, InstanceType<Node>>;
        total(): number;
        joined_list(): (symbol & {
            $hyoo_crus_ref: symbol;
        })[];
        key(): $hyoo_crus_auth | null;
        lord_rank(lord: $hyoo_crus_ref, next?: $hyoo_crus_rank): $hyoo_crus_rank;
        peer_rank(peer: string): $hyoo_crus_rank;
        delta_unit(face?: $hyoo_crus_face_map): $hyoo_crus_unit[];
        delta_pack(face?: $hyoo_crus_face_map): $hyoo_crus_pack | null;
        delta_parts(face?: $hyoo_crus_face_map): {
            lands: {
                [x: symbol]: {
                    faces: $hyoo_crus_face_map;
                    units: $hyoo_crus_unit[];
                };
            };
            rocks: [Uint8Array, Uint8Array | null][];
        } | null;
        faces_pack(): $hyoo_crus_pack;
        apply_unit(delta: readonly $hyoo_crus_unit[], skip_check?: boolean): string[];
        units_verify(delta: readonly $hyoo_crus_unit[]): Promise<string[]>;
        apply_unit_trust(delta: readonly $hyoo_crus_unit[], skip_check?: boolean): string[];
        apply_land(land: $hyoo_crus_land): string[];
        recheck(): void;
        check_unit(unit: $hyoo_crus_unit): string;
        fork(preset?: {
            '': $hyoo_crus_rank;
        }): $hyoo_crus_land;
        gists_ordered(head: string): $hyoo_crus_gist[];
        join(): $hyoo_crus_pass;
        give(dest: $hyoo_crus_auth | null, rank: $hyoo_crus_rank): $hyoo_crus_gift;
        post(lead: string, head: string, self: string, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): $hyoo_crus_gist;
        gist_move(gist: $hyoo_crus_gist, head: string, seat: number): void;
        gist_wipe(gist: $hyoo_crus_gist): void;
        broadcast(): void;
        sync(): this;
        sync_mine(): $mol_wire_atom<unknown, [], void> | undefined;
        sync_yard(): $mol_wire_atom<unknown, [], void | undefined> | undefined;
        bus(): $mol_bus<ArrayBuffer[]>;
        loading(): void;
        saving(): void;
        unit_sign(unit: $hyoo_crus_unit): void;
        gist_encode(gist: $hyoo_crus_gist): $hyoo_crus_gist;
        gist_decode(gist: $hyoo_crus_gist): $hyoo_crus_vary_type;
        gist_decode_raw(gist: $hyoo_crus_gist): $hyoo_crus_vary_type;
        key_public(peer: string): $mol_crypto_key_public | null;
        secret_mutual(key_public: string): $mol_crypto_secret;
        encryptable(): boolean;
        encrypted(next?: boolean): boolean;
        secret(): $mol_crypto_secret | null;
        dump(): {
            land: symbol & {
                $hyoo_crus_ref: symbol;
            };
            units: $hyoo_crus_unit[];
            rocks: [Uint8Array, Uint8Array][];
        };
    }
}

declare namespace $ {
    enum $mol_rest_code {
        Continue = 100,
        Switching_Protocols = 101,
        Processing = 102,
        OK = 200,
        Created = 201,
        Accepted = 202,
        Non_Authoritative_Information = 203,
        No_Content = 204,
        Reset_Content = 205,
        Partial_Content = 206,
        Multi_Status = 207,
        Already_Reported = 208,
        IM_Used = 226,
        Multiple_Choices = 300,
        Moved_Permanently = 301,
        Found = 302,
        See_Other = 303,
        Not_Modified = 304,
        Use_Proxy = 305,
        Temporary_Redirect = 307,
        Bad_Request = 400,
        Unauthorized = 401,
        Payment_Required = 402,
        Forbidden = 403,
        Not_Found = 404,
        Method_Not_Allowed = 405,
        Not_Acceptable = 406,
        Proxy_Authentication_Required = 407,
        Request_Timeout = 408,
        Conflict = 409,
        Gone = 410,
        Length_Required = 411,
        Precondition_Failed = 412,
        Request_Entity_Too_Large = 413,
        Request_URI_Too_Long = 414,
        Unsupported_Media_Type = 415,
        Requested_Range_Not_Satisfiable = 416,
        Expectation_Failed = 417,
        Teapot = 418,
        Unprocessable_Entity = 422,
        Locked = 423,
        Failed_Dependency = 424,
        Upgrade_Required = 426,
        Precondition_Required = 428,
        Too_Many_Requests = 429,
        Request_Header_Fields_Too_Large = 431,
        Unavailable_For_Legal_Reasons = 451,
        Internal_Server_Error = 500,
        Not_Implemented = 501,
        Bad_Gateway = 502,
        Service_Unavailable = 503,
        Gateway_Timeout = 504,
        HTTP_Version_Not_Supported = 505,
        Insufficient_Storage = 507,
        Loop_Detected = 508,
        Not_Extended = 510,
        Network_Authentication_Required = 511,
        Network_Read_Timeout_Error = 598,
        Network_Connect_Timeout_Error = 599
    }
}

declare namespace $ {
    type $mol_rest_port_mime_hi = 'text' | 'application' | 'font' | 'audio' | 'video' | 'image' | 'model';
    type $mol_rest_port_mime = `${$mol_rest_port_mime_hi}/${string}`;
    class $mol_rest_port extends $mol_object {
        send_code(code: $mol_rest_code): void;
        send_type(mime: $mol_rest_port_mime): void;
        send_data(data: null | string | Uint8Array | Element | object): void;
        send_nil(): void;
        send_bin(data: Uint8Array): void;
        send_text(data: string): void;
        send_json(data: object): void;
        send_dom(data: Element): void;
        static make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
    }
}

declare namespace $ {
    class $mol_rest_port_ws extends $mol_rest_port {
    }
}

declare namespace $ {
    class $mol_rest_port_ws_std extends $mol_rest_port_ws {
        socket: WebSocket;
        send_nil(): void;
        send_bin(data: Uint8Array): void;
        send_text(data: string): void;
    }
}

declare namespace $ {
    class $hyoo_crus_yard extends $mol_object {
        realm(): $hyoo_crus_realm;
        lands_neonatals: $mol_wire_set<symbol & {
            $hyoo_crus_ref: symbol;
        }>;
        static masters: string[];
        master_cursor(next?: number): number;
        master_current(): string;
        master_next(): void;
        reconnects(reset?: null): number;
        master(): $mol_rest_port | null;
        slaves: $mol_wire_set<$mol_rest_port>;
        sync(): void;
        sync_neonatals(): void;
        sync_port(): void;
        sync_port_lands(port: $mol_rest_port): void;
        ports(): $mol_rest_port[];
        port_lands(port: $mol_rest_port): $mol_wire_set<symbol & {
            $hyoo_crus_ref: symbol;
        }>;
        port_income(port: $mol_rest_port, msg: Uint8Array): void;
        face_port_sync(port: $mol_rest_port, income: Record<$hyoo_crus_ref, {
            faces: $hyoo_crus_face_map;
            units: $hyoo_crus_unit[];
        }>): void;
        sync_land(land: $hyoo_crus_ref): void;
        sync_port_land([port, land]: [$mol_rest_port, $hyoo_crus_ref]): void;
        init_port_land([port, land]: [$mol_rest_port, $hyoo_crus_ref]): void;
        face_port_land([port, land]: [$mol_rest_port, $hyoo_crus_ref], next?: $hyoo_crus_face_map | null): $hyoo_crus_face_map | null;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $hyoo_crus_mine extends $mol_object {
        static hash(blob: Uint8Array): Uint8Array;
        static rock(hash: Uint8Array, next?: Uint8Array): Uint8Array | null;
        static rock_save(blob: Uint8Array): Uint8Array;
        static units_persisted: WeakSet<$hyoo_crus_unit>;
        static units(land: $hyoo_crus_land, next?: readonly $hyoo_crus_unit[]): readonly $hyoo_crus_unit[];
        static units_load(land: $hyoo_crus_land): Promise<readonly $hyoo_crus_unit[]>;
        static units_save(land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[]): Promise<void>;
    }
}

declare namespace $ {
    function $mol_db_response<Result>(request: IDBRequest<Result>): Promise<Result>;
}

declare namespace $ {
    class $mol_db_store<Schema extends $mol_db_store_schema> {
        readonly native: IDBObjectStore;
        constructor(native: IDBObjectStore);
        get name(): string;
        get path(): string | string[];
        get incremental(): boolean;
        get indexes(): { [Name in keyof Schema["Indexes"]]: $mol_db_index<{
            Key: Schema["Indexes"][Name];
            Doc: Schema['Doc'];
        }>; };
        index_make(name: string, path?: string[], unique?: boolean, multiEntry?: boolean): IDBIndex;
        index_drop(name: string): this;
        get transaction(): $mol_db_transaction<$mol_db_schema>;
        get db(): $mol_db_database<$mol_db_schema>;
        clear(): Promise<undefined>;
        count(keys?: Schema['Key'] | IDBKeyRange): Promise<number>;
        put(doc: Schema['Doc'], key?: Schema['Key']): Promise<IDBValidKey>;
        get(key: Schema['Key']): Promise<Schema["Doc"] | undefined>;
        select(key?: Schema['Key'] | IDBKeyRange | null, count?: number): Promise<Schema["Doc"][]>;
        drop(keys: Schema['Key'] | IDBKeyRange): Promise<undefined>;
    }
}

declare namespace $ {
    type $mol_db_store_schema = {
        Key: IDBValidKey;
        Doc: unknown;
        Indexes: Record<string, IDBValidKey[]>;
    };
}

declare namespace $ {
    class $mol_db_index<Schema extends $mol_db_index_schema> {
        readonly native: IDBIndex;
        constructor(native: IDBIndex);
        get name(): string;
        get paths(): string[];
        get unique(): boolean;
        get multiple(): boolean;
        get store(): $mol_db_store<$mol_db_store_schema>;
        get transaction(): $mol_db_transaction<$mol_db_schema>;
        get db(): $mol_db_database<$mol_db_schema>;
        count(keys?: Schema['Key'] | IDBKeyRange): Promise<number>;
        get(key: Schema['Key']): Promise<Schema["Doc"] | undefined>;
        select(key?: Schema['Key'] | IDBKeyRange | null, count?: number): Promise<Schema["Doc"][]>;
    }
}

declare namespace $ {
    type $mol_db_index_schema = {
        Key: IDBValidKey[];
        Doc: unknown;
    };
}

declare namespace $ {
    function $mol_db<Schema extends $mol_db_schema>(this: $, name: string, ...migrations: ((transaction: $mol_db_transaction<$mol_db_schema>) => void)[]): Promise<$mol_db_database<Schema>>;
}

declare namespace $ {
    type $mol_db_schema = Record<string, $mol_db_store_schema>;
}

declare namespace $ {
    class $mol_db_database<Schema extends $mol_db_schema> {
        readonly native: IDBDatabase;
        constructor(native: IDBDatabase);
        get name(): string;
        get version(): number;
        get stores(): (keyof Schema)[];
        read<Names extends Exclude<keyof Schema, symbol | number>>(...names: Names[]): Pick<Schema, Names> extends infer T extends $mol_db_schema ? { [Name in keyof T]: $mol_db_store<Pick<Schema, Names>[Name]>; } : never;
        change<Names extends Exclude<keyof Schema, symbol | number>>(...names: Names[]): $mol_db_transaction<Pick<Schema, Names>>;
        kill(): Promise<IDBDatabase>;
        destructor(): void;
    }
}

interface IDBTransaction {
    commit(): void;
}
declare namespace $ {
    class $mol_db_transaction<Schema extends $mol_db_schema> {
        readonly native: IDBTransaction;
        constructor(native: IDBTransaction);
        get stores(): { [Name in keyof Schema]: $mol_db_store<Schema[Name]>; };
        store_make(name: string): IDBObjectStore;
        store_drop(name: string): this;
        abort(): void;
        commit(): Promise<void>;
        get db(): $mol_db_database<$mol_db_schema>;
    }
}

declare namespace $ {
    class $hyoo_crus_mine_idb extends $hyoo_crus_mine {
        static rock(hash: Uint8Array, next?: Uint8Array): Uint8Array | null;
        static rock_read(): $mol_db_store<{
            Key: [hash: Uint8Array];
            Doc: ArrayBuffer;
            Indexes: {};
        }>;
        static rock_change(): Promise<$mol_db_store<{
            Key: [hash: Uint8Array];
            Doc: ArrayBuffer;
            Indexes: {};
        }>>;
        static units_save(land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[]): Promise<void>;
        static units_load(land: $hyoo_crus_land): Promise<($hyoo_crus_gist | $hyoo_crus_gift | $hyoo_crus_pass)[]>;
        static db(): Promise<$mol_db_database<{
            Rock: {
                Key: [hash: Uint8Array];
                Doc: ArrayBuffer;
                Indexes: {};
            };
            Land: {
                Key: [land: string, path: string];
                Doc: ArrayBuffer;
                Indexes: {};
            };
        }>>;
    }
}

declare namespace $ {
}

declare namespace $ {
    const $hyoo_crus_home_base: Omit<typeof $hyoo_crus_dict, "prototype"> & (new (...args: any[]) => $mol_type_override<$hyoo_crus_dict, {
        readonly Title: (auto?: any) => $hyoo_crus_atom_str | null;
        readonly Selection: (auto?: any) => $hyoo_crus_atom_str | null;
        readonly Hall: (auto?: any) => {
            Value: () => typeof $hyoo_crus_dict;
            yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
            remote(next?: $hyoo_crus_dict | null | undefined): $hyoo_crus_dict | null;
            remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_dict | null;
            local_ensure(): $hyoo_crus_dict | null;
            val(next?: (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null | undefined): (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null;
            pick_unit(): $hyoo_crus_gist | undefined;
            vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
            nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        } | null;
    }>) & {
        schema: {
            [x: string]: typeof $hyoo_crus_node;
        } & {
            readonly Title: typeof $hyoo_crus_atom_str;
            readonly Selection: typeof $hyoo_crus_atom_str;
            readonly Hall: {
                new (): {
                    Value: () => typeof $hyoo_crus_dict;
                    yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
                    remote(next?: $hyoo_crus_dict | null | undefined): $hyoo_crus_dict | null;
                    remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_dict | null;
                    local_ensure(): $hyoo_crus_dict | null;
                    val(next?: (symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null | undefined): (symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null;
                    pick_unit(): $hyoo_crus_gist | undefined;
                    vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
                    land(): $hyoo_crus_land;
                    head(): string;
                    realm(): $hyoo_crus_realm | null;
                    land_ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    toJSON(): string | undefined;
                    cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
                    nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
                    units(): $hyoo_crus_gist[];
                    filled(): boolean;
                    can_change(lord?: symbol & {
                        $hyoo_crus_ref: symbol;
                    }): boolean;
                    last_change(): $mol_time_moment | null;
                    $: typeof $$;
                    destructor(): void;
                    toString(): string;
                    [Symbol.toStringTag]: string;
                    [$mol_ambient_ref]: typeof $$;
                };
                toString(): string;
                Value: typeof $hyoo_crus_dict;
                parse: typeof $hyoo_crus_vary_cast_ref;
                tag: "keys" | "term" | "solo" | "vals";
                make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
                $: typeof $$;
                create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
                toJSON(): any;
                destructor(): void;
                [Symbol.toPrimitive](): any;
            };
        };
    };
    export class $hyoo_crus_home extends $hyoo_crus_home_base {
        hall_by<Node extends typeof $hyoo_crus_dict>(Node: Node, preset?: $hyoo_crus_rank_preset): InstanceType<Node> | null;
    }
    export {};
}

declare namespace $ {
    class $hyoo_crus_realm extends $mol_object {
        lands: $mol_wire_dict<symbol & {
            $hyoo_crus_ref: symbol;
        }, $hyoo_crus_land>;
        yard(): $hyoo_crus_yard;
        home(): $hyoo_crus_home;
        king_grab(preset?: $hyoo_crus_rank_preset): $hyoo_crus_auth;
        land_grab(preset?: $hyoo_crus_rank_preset): $hyoo_crus_land;
        Land(ref: $hyoo_crus_ref): $hyoo_crus_land;
        Node<Node extends typeof $hyoo_crus_node>(ref: $hyoo_crus_ref, Node: Node): InstanceType<Node>;
        apply_pack(pack: $hyoo_crus_pack): void;
        apply_parts(lands: Record<$hyoo_crus_ref, {
            faces: $hyoo_crus_face_map;
            units: $hyoo_crus_unit[];
        }>, rocks: [Uint8Array, Uint8Array | null][]): void;
    }
}

declare namespace $ {

	type $mol_avatar__id__LJ4AT61R = $mol_type_enforce<
		ReturnType< $hyoo_crus_status['master_id'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_avatar__id__PVJ3RGIX = $mol_type_enforce<
		ReturnType< $hyoo_crus_status['master_link'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_link__uri__ZK425EYI = $mol_type_enforce<
		ReturnType< $hyoo_crus_status['master_link'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub__8NEC9VY1 = $mol_type_enforce<
		ReturnType< $hyoo_crus_status['link_content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__hint__S6LTVWH1 = $mol_type_enforce<
		ReturnType< $hyoo_crus_status['message'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	export class $hyoo_crus_status extends $mol_select {
		master_id( id: any): string
		Option_logo( id: any): $mol_avatar
		master_link( ): string
		Well( ): $mol_avatar
		Fail( ): $mol_icon_sync_off
		link_content( ): readonly(any)[]
		hint( ): string
		message( ): ReturnType< $hyoo_crus_status['hint'] >
		Link( ): $mol_link
		minimal_width( ): number
		minimal_height( ): number
		realm( ): $hyoo_crus_realm
		Filter( ): any
		option_content( id: any): readonly(any)[]
		trigger_content( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=status.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_status extends $.$hyoo_crus_status {
        message(): string;
        link_content(): $mol_icon_sync_off[];
        options(): string[];
        master_link(): string;
        master_id(uri: string): string;
        option_label(uri: string): string;
        value(next?: string): string;
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_stack extends $mol_view {
	}
	
}

//# sourceMappingURL=stack.view.tree.d.ts.map
declare namespace $ {

	export class $mol_text_code_token extends $mol_dimmer {
		type( ): string
		attr( ): ({ 
			'mol_text_code_token_type': ReturnType< $mol_text_code_token['type'] >,
		})  & ReturnType< $mol_dimmer['attr'] >
	}
	
	export class $mol_text_code_token_link extends $mol_text_code_token {
		uri( ): string
		dom_name( ): string
		type( ): string
		attr( ): ({ 
			'href': ReturnType< $mol_text_code_token_link['uri'] >,
			'target': string,
		})  & ReturnType< $mol_text_code_token['attr'] >
	}
	
}

//# sourceMappingURL=token.view.tree.d.ts.map
declare namespace $.$$ {
}

declare namespace $ {
    class $mol_syntax2<Lexems extends {
        [name: string]: RegExp;
    }> {
        lexems: Lexems;
        constructor(lexems: Lexems);
        rules: {
            regExp: RegExp;
            name: string;
            size: number;
        }[];
        regexp: RegExp;
        tokenize(text: string, handle: (name: string, found: string, chunks: string[], offset: number) => void): void;
        parse(text: string, handlers: {
            [key in keyof Lexems | '']: (found: string, chunks: string[], offset: number) => void;
        }): void;
    }
}

declare namespace $ {
    var $mol_syntax2_md_flow: $mol_syntax2<{
        quote: RegExp;
        header: RegExp;
        list: RegExp;
        code: RegExp;
        'code-indent': RegExp;
        table: RegExp;
        grid: RegExp;
        cut: RegExp;
        block: RegExp;
    }>;
    var $mol_syntax2_md_line: $mol_syntax2<{
        strong: RegExp;
        emphasis: RegExp;
        code: RegExp;
        insert: RegExp;
        delete: RegExp;
        embed: RegExp;
        link: RegExp;
        'image-link': RegExp;
        'text-link': RegExp;
        'text-link-http': RegExp;
    }>;
    const $mol_syntax2_md_code: $mol_syntax2<{
        'code-indent': RegExp;
        'code-docs': RegExp;
        'code-comment-block': RegExp;
        'code-link': RegExp;
        'code-comment-inline': RegExp;
        'code-string': RegExp;
        'code-number': RegExp;
        'code-call': RegExp;
        'code-sexpr': RegExp;
        'code-field': RegExp;
        'code-keyword': RegExp;
        'code-global': RegExp;
        'code-word': RegExp;
        'code-decorator': RegExp;
        'code-tag': RegExp;
        'code-punctuation': RegExp;
    }>;
}

declare namespace $ {

	type $mol_view__sub__PZ3JFDP1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text_code_token__type__GEEAX2DM = $mol_type_enforce<
		ReturnType< $mol_text_code_row['token_type'] >
		,
		ReturnType< $mol_text_code_token['type'] >
	>
	type $mol_text_code_token__haystack__UO150F9O = $mol_type_enforce<
		ReturnType< $mol_text_code_row['token_text'] >
		,
		ReturnType< $mol_text_code_token['haystack'] >
	>
	type $mol_text_code_token__needle__FLTMS6ZW = $mol_type_enforce<
		ReturnType< $mol_text_code_row['highlight'] >
		,
		ReturnType< $mol_text_code_token['needle'] >
	>
	type $mol_text_code_token_link__haystack__JRMX2AF5 = $mol_type_enforce<
		ReturnType< $mol_text_code_row['token_text'] >
		,
		ReturnType< $mol_text_code_token_link['haystack'] >
	>
	type $mol_text_code_token_link__needle__WYL9VOFY = $mol_type_enforce<
		ReturnType< $mol_text_code_row['highlight'] >
		,
		ReturnType< $mol_text_code_token_link['needle'] >
	>
	type $mol_text_code_token_link__uri__KHNVNMXZ = $mol_type_enforce<
		ReturnType< $mol_text_code_row['token_uri'] >
		,
		ReturnType< $mol_text_code_token_link['uri'] >
	>
	export class $mol_text_code_row extends $mol_paragraph {
		numb( ): number
		token_type( id: any): string
		token_text( id: any): string
		highlight( ): string
		token_uri( id: any): string
		text( ): string
		minimal_height( ): number
		numb_showed( ): boolean
		syntax( ): any
		uri_resolve( id: any): string
		Numb( ): $mol_view
		Token( id: any): $mol_text_code_token
		Token_link( id: any): $mol_text_code_token_link
		find_pos( id: any): any
	}
	
}

//# sourceMappingURL=row.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_text_code_row extends $.$mol_text_code_row {
        maximal_width(): number;
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        tokens(path: number[]): readonly {
            name: string;
            found: string;
            chunks: string[];
        }[];
        sub(): $mol_view[];
        row_content(path: number[]): $mol_text_code_token[];
        Token(path: number[]): $mol_text_code_token;
        token_type(path: number[]): string;
        token_content(path: number[]): (string | $mol_text_code_token)[];
        token_text(path: number[]): string;
        token_uri(path: number[]): string;
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
        find_pos(offset: number): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
        find_token_pos([offset, ...path]: number[]): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
    type $mol_blob = Blob;
    let $mol_blob: {
        new (blobParts?: readonly BlobPart[], options?: BlobPropertyBag): Blob;
        prototype: Blob;
    };
}

declare namespace $ {

	export class $mol_icon_clipboard extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=clipboard.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clipboard_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {
    function $mol_html_encode(text: string): string;
}

declare namespace $ {

	type $mol_blob__5XL5GYDV = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	type $mol_blob__JLQ3TEG7 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	export class $mol_button_copy extends $mol_button_minor {
		text( ): ReturnType< $mol_button_copy['title'] >
		text_blob( next?: $mol_blob ): $mol_blob
		html( ): string
		html_blob( next?: $mol_blob ): $mol_blob
		Icon( ): $mol_icon_clipboard_outline
		title( ): string
		blobs( ): readonly($mol_blob)[]
		data( ): Record<string, any>
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=copy.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_button_copy extends $.$mol_button_copy {
        data(): {
            [k: string]: Blob;
        };
        html(): string;
        attachments(): ClipboardItem[];
        click(event?: Event): void;
    }
}

declare namespace $ {

	type $mol_text_code_row__numb_showed__43NKWIK1 = $mol_type_enforce<
		ReturnType< $mol_text_code['sidebar_showed'] >
		,
		ReturnType< $mol_text_code_row['numb_showed'] >
	>
	type $mol_text_code_row__numb__2BUKFE3D = $mol_type_enforce<
		ReturnType< $mol_text_code['row_numb'] >
		,
		ReturnType< $mol_text_code_row['numb'] >
	>
	type $mol_text_code_row__text__F9V487U8 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_text'] >
		,
		ReturnType< $mol_text_code_row['text'] >
	>
	type $mol_text_code_row__syntax__IDGROK90 = $mol_type_enforce<
		ReturnType< $mol_text_code['syntax'] >
		,
		ReturnType< $mol_text_code_row['syntax'] >
	>
	type $mol_text_code_row__uri_resolve__HYJTLF7P = $mol_type_enforce<
		ReturnType< $mol_text_code['uri_resolve'] >
		,
		ReturnType< $mol_text_code_row['uri_resolve'] >
	>
	type $mol_text_code_row__highlight__1T28OX4Z = $mol_type_enforce<
		ReturnType< $mol_text_code['highlight'] >
		,
		ReturnType< $mol_text_code_row['highlight'] >
	>
	type $mol_list__render_visible_only__SUH0WWLH = $mol_type_enforce<
		ReturnType< $mol_text_code['render_visible_only'] >
		,
		ReturnType< $mol_list['render_visible_only'] >
	>
	type $mol_list__rows__C9BLT7GD = $mol_type_enforce<
		ReturnType< $mol_text_code['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__hint__7K50J4A5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['hint'] >
	>
	type $mol_button_copy__text__CTLRDVKY = $mol_type_enforce<
		ReturnType< $mol_text_code['text_export'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	export class $mol_text_code extends $mol_stack {
		sidebar_showed( ): boolean
		render_visible_only( ): boolean
		row_numb( id: any): number
		row_text( id: any): string
		syntax( ): any
		uri_resolve( id: any): string
		highlight( ): string
		Row( id: any): $mol_text_code_row
		rows( ): readonly(any)[]
		Rows( ): $mol_list
		text_export( ): string
		Copy( ): $mol_button_copy
		attr( ): ({ 
			'mol_text_code_sidebar_showed': ReturnType< $mol_text_code['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		text( ): string
		text_lines( ): readonly(string)[]
		find_pos( id: any): any
		uri_base( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_text_code extends $.$mol_text_code {
        render_visible_only(): boolean;
        text_lines(): readonly string[];
        rows(): $.$mol_text_code_row[];
        row_text(index: number): string;
        row_numb(index: number): number;
        find_pos(offset: number): any;
        sub(): ($.$mol_list | $.$mol_button_copy)[];
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        uri_base(): string;
        uri_resolve(uri: string): string;
        text_export(): string;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_float extends $mol_view {
		style( ): ({ 
			'minHeight': string,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=float.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=chevron.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_expand extends $mol_check {
		level_style( ): string
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		Icon( ): $mol_icon_chevron
		level( ): number
		style( ): ({ 
			'paddingLeft': ReturnType< $mol_check_expand['level_style'] >,
		})  & ReturnType< $mol_check['style'] >
		checked( next?: ReturnType< $mol_check_expand['expanded'] > ): ReturnType< $mol_check_expand['expanded'] >
		enabled( ): ReturnType< $mol_check_expand['expandable'] >
	}
	
}

//# sourceMappingURL=expand.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_check_expand extends $.$mol_check_expand {
        level_style(): string;
        expandable(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}

declare namespace $ {

	type $mol_grid_table__sub__HKJAROS6 = $mol_type_enforce<
		ReturnType< $mol_grid['rows'] >
		,
		ReturnType< $mol_grid_table['sub'] >
	>
	type $mol_dimmer__needle__R50XZNEA = $mol_type_enforce<
		ReturnType< $mol_grid['needle'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack__BCKLEMM5 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_value'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_grid_row__cells__QRFWBQDT = $mol_type_enforce<
		ReturnType< $mol_grid['head_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_row__minimal_height__2QE70UXE = $mol_type_enforce<
		ReturnType< $mol_grid['row_height'] >
		,
		ReturnType< $mol_grid_row['minimal_height'] >
	>
	type $mol_grid_row__minimal_width__93KC72TN = $mol_type_enforce<
		ReturnType< $mol_grid['minimal_width'] >
		,
		ReturnType< $mol_grid_row['minimal_width'] >
	>
	type $mol_grid_row__cells__PZZFJDUR = $mol_type_enforce<
		ReturnType< $mol_grid['cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_cell__sub__KPQDQQAU = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_text'] >
		,
		ReturnType< $mol_grid_cell['sub'] >
	>
	type $mol_grid_number__sub__5OXIK154 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_number'] >
		,
		ReturnType< $mol_grid_number['sub'] >
	>
	type $mol_float__dom_name__U8OW97NL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_float['dom_name'] >
	>
	type $mol_float__sub__AM0ABYYR = $mol_type_enforce<
		ReturnType< $mol_grid['col_head_content'] >
		,
		ReturnType< $mol_float['sub'] >
	>
	type $mol_check_expand__level__8KOPC9OK = $mol_type_enforce<
		ReturnType< $mol_grid['cell_level'] >
		,
		ReturnType< $mol_check_expand['level'] >
	>
	type $mol_check_expand__label__5P5DJOQI = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_check_expand__expanded__UO1YL7DI = $mol_type_enforce<
		ReturnType< $mol_grid['cell_expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	export class $mol_grid extends $mol_view {
		rows( ): readonly($mol_view)[]
		Table( ): $mol_grid_table
		head_cells( ): readonly($mol_view)[]
		cells( id: any): readonly($mol_view)[]
		cell_content( id: any): readonly($mol_view_content)[]
		cell_content_text( id: any): ReturnType< $mol_grid['cell_content'] >
		cell_content_number( id: any): ReturnType< $mol_grid['cell_content'] >
		col_head_content( id: any): readonly($mol_view_content)[]
		cell_level( id: any): number
		cell_expanded( id: any, next?: boolean ): boolean
		needle( ): string
		cell_value( id: any): string
		Cell_dimmer( id: any): $mol_dimmer
		row_height( ): number
		row_ids( ): readonly(string[])[]
		row_id( id: any): any
		col_ids( ): readonly(any)[]
		records( ): Record<string, any>
		record( id: any): any
		hierarchy( ): any
		hierarchy_col( ): string
		minimal_width( ): number
		sub( ): readonly(any)[]
		Head( ): $mol_grid_row
		Row( id: any): $mol_grid_row
		Cell( id: any): $mol_view
		cell( id: any): any
		Cell_text( id: any): $mol_grid_cell
		Cell_number( id: any): $mol_grid_number
		Col_head( id: any): $mol_float
		Cell_branch( id: any): $mol_check_expand
		Cell_content( id: any): readonly(any)[]
	}
	
	export class $mol_grid_table extends $mol_list {
	}
	
	export class $mol_grid_row extends $mol_view {
		cells( ): readonly($mol_view)[]
		sub( ): ReturnType< $mol_grid_row['cells'] >
	}
	
	export class $mol_grid_cell extends $mol_view {
		minimal_height( ): number
	}
	
	export class $mol_grid_number extends $mol_grid_cell {
	}
	
}

//# sourceMappingURL=grid.view.tree.d.ts.map
declare namespace $.$$ {
    interface $mol_grid_node {
        id: string;
        parent: $mol_grid_node;
        sub: $mol_grid_node[];
    }
    class $mol_grid extends $.$mol_grid {
        head_cells(): readonly $mol_view[];
        col_head_content(colId: string): readonly string[];
        rows(): readonly $mol_view[];
        cells(row_id: string[]): readonly $mol_view[];
        col_type(col_id: string): "text" | "number" | "branch";
        Cell(id: {
            row: string[];
            col: string;
        }): $mol_view;
        cell_content(id: {
            row: string[];
            col: string;
        }): any[];
        cell_content_text(id: {
            row: string[];
            col: string;
        }): any[];
        records(): any;
        record(id: string): any;
        record_ids(): string[];
        row_id(index: number): string;
        col_ids(): readonly string[];
        hierarchy(): {
            [id: string]: $mol_grid_node;
        };
        row_sub_ids(row: string[]): string[][];
        row_root_id(): string[];
        cell_level(id: {
            row: string[];
        }): number;
        row_ids(): readonly string[][];
        row_expanded(row_id: string[], next?: boolean): boolean | null;
        row_expanded_default(row_id: string[]): boolean;
        cell_expanded(id: {
            row: string[];
        }, next?: boolean): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_image extends $mol_view {
		uri( ): string
		loading( ): string
		decoding( ): string
		cors( ): any
		natural_width( ): number
		natural_height( ): number
		load( next?: any ): any
		dom_name( ): string
		field( ): Record<string, any> & ReturnType< $mol_view['field'] >
		attr( ): Record<string, any> & ReturnType< $mol_view['attr'] >
		event( ): Record<string, any>
		minimal_width( ): number
		minimal_height( ): number
	}
	
}

//# sourceMappingURL=image.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_image extends $.$mol_image {
        natural_width(next?: null): number;
        natural_height(next?: null): number;
        load(): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_image__uri__NY4MGTAT = $mol_type_enforce<
		ReturnType< $mol_link_iconed['icon'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_image__title__PCRKYWDV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	export class $mol_link_iconed extends $mol_link {
		icon( ): string
		Icon( ): $mol_image
		title( ): ReturnType< $mol_link_iconed['uri'] >
		sub( ): readonly(any)[]
		content( ): readonly(any)[]
		host( ): string
	}
	
}

//# sourceMappingURL=iconed.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_link_iconed extends $.$mol_link_iconed {
        icon(): string;
        host(): string;
        title(): string;
        sub(): readonly any[];
    }
}

declare namespace $ {
}

declare namespace $ {
    function $mol_promise<Result = void>(): Promise<Result> & {
        done: (res: Result | PromiseLike<Result>) => void;
        fail: (error?: any) => void;
    };
}

declare namespace $ {
    function $mol_wait_timeout_async(this: $, timeout: number): Promise<void> & {
        done: (res: void | PromiseLike<void>) => void;
        fail: (error?: any) => void;
    } & {
        destructor: () => void;
    };
    function $mol_wait_timeout(this: $, timeout: number): void;
}

declare namespace $ {

	type $mol_link__uri__NP61P83B = $mol_type_enforce<
		ReturnType< $mol_embed_native['uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub__I6WCA4KD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_embed_native extends $mol_scroll {
		mime( ): string
		title( ): string
		Fallback( ): $mol_link
		uri_change( next?: any ): any
		uri( next?: string ): string
		dom_name( ): string
		window( ): any
		attr( ): ({ 
			'data': ReturnType< $mol_embed_native['uri'] >,
			'type': ReturnType< $mol_embed_native['mime'] >,
		})  & ReturnType< $mol_scroll['attr'] >
		sub( ): readonly(any)[]
		message( ): ({ 
			hashchange( next?: ReturnType< $mol_embed_native['uri_change'] > ): ReturnType< $mol_embed_native['uri_change'] >,
		}) 
	}
	
}

//# sourceMappingURL=native.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_native extends $.$mol_embed_native {
        window(): Window;
        load(frame: HTMLIFrameElement): Promise<Window>;
        uri_resource(): string;
        message_listener(): $mol_dom_listener;
        message_receive(event?: MessageEvent<[string, string]>): void;
        uri_change(event: MessageEvent<[string, string]>): void;
        auto(): (Window | $mol_dom_listener)[];
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_youtube extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map
declare namespace $ {

	export class $mol_frame extends $mol_embed_native {
		uri( next?: string ): string
		html( ): any
		allow( ): string
		dom_name( ): string
		attr( ): ({ 
			'data': any,
			'type': any,
			'src': ReturnType< $mol_frame['uri'] >,
			'srcdoc': ReturnType< $mol_frame['html'] >,
			'allow': ReturnType< $mol_frame['allow'] >,
		})  & ReturnType< $mol_embed_native['attr'] >
		fullscreen( ): boolean
		accelerometer( ): boolean
		autoplay( ): boolean
		encription( ): boolean
		gyroscope( ): boolean
		pip( ): boolean
		clipboard_read( ): boolean
		clipboard_write( ): boolean
	}
	
}

//# sourceMappingURL=frame.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_frame extends $.$mol_frame {
        window(): any;
        allow(): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_image__title__HDY818FD = $mol_type_enforce<
		ReturnType< $mol_embed_youtube['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri__CYF3B3WF = $mol_type_enforce<
		ReturnType< $mol_embed_youtube['video_preview'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_frame__title__Q3O4NZFJ = $mol_type_enforce<
		ReturnType< $mol_embed_youtube['title'] >
		,
		ReturnType< $mol_frame['title'] >
	>
	type $mol_frame__uri__UQO7I51I = $mol_type_enforce<
		ReturnType< $mol_embed_youtube['video_embed'] >
		,
		ReturnType< $mol_frame['uri'] >
	>
	export class $mol_embed_youtube extends $mol_check {
		active( next?: boolean ): boolean
		title( ): string
		video_preview( ): string
		Image( ): $mol_image
		Hint( ): $mol_icon_youtube
		video_embed( ): string
		Frame( ): $mol_frame
		uri( ): string
		video_id( ): string
		checked( next?: ReturnType< $mol_embed_youtube['active'] > ): ReturnType< $mol_embed_youtube['active'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_youtube extends $.$mol_embed_youtube {
        video_embed(): string;
        video_id(): string;
        video_preview(): string;
        sub(): $.$mol_frame[] | ($.$mol_image | $mol_icon_youtube)[];
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_image__title__2GYGFYK4 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri__3MEQP9AR = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_embed_native__title__BRSNI6IY = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_native['title'] >
	>
	type $mol_embed_native__uri__L2V589AU = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_native['uri'] >
	>
	type $mol_embed_youtube__title__HN1CEC7M = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_youtube['title'] >
	>
	type $mol_embed_youtube__uri__TY6LUWVK = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_youtube['uri'] >
	>
	export class $mol_embed_any extends $mol_view {
		title( ): string
		uri( ): string
		Image( ): $mol_image
		Object( ): $mol_embed_native
		Youtube( ): $mol_embed_youtube
	}
	
}

//# sourceMappingURL=any.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_embed_any extends $.$mol_embed_any {
        type(): "object" | "image" | "youtube";
        sub(): $.$mol_image[] | $.$mol_embed_youtube[] | $.$mol_embed_native[];
    }
}

declare namespace $ {

	type $mol_paragraph__sub__N23T89YO = $mol_type_enforce<
		ReturnType< $mol_text['block_content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_text__uri_resolve__ZPG36IH3 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text__Q0UJEC80 = $mol_type_enforce<
		ReturnType< $mol_text['quote_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight__J1BZX9JA = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__auto_scroll__1L6UFRLB = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text_list__uri_resolve__LSZY2M6H = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_list['uri_resolve'] >
	>
	type $mol_text_list__type__H9LR773X = $mol_type_enforce<
		ReturnType< $mol_text['list_type'] >
		,
		ReturnType< $mol_text_list['type'] >
	>
	type $mol_text_list__text__1OTHOQ8P = $mol_type_enforce<
		ReturnType< $mol_text['list_text'] >
		,
		ReturnType< $mol_text_list['text'] >
	>
	type $mol_text_list__highlight__K20HDQFX = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_list['highlight'] >
	>
	type $mol_text_header__minimal_height__YDICZVF5 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_text_header['minimal_height'] >
	>
	type $mol_text_header__level__J3HX4S3R = $mol_type_enforce<
		ReturnType< $mol_text['header_level'] >
		,
		ReturnType< $mol_text_header['level'] >
	>
	type $mol_text_header__content__57AMUCR4 = $mol_type_enforce<
		ReturnType< $mol_text['block_content'] >
		,
		ReturnType< $mol_text_header['content'] >
	>
	type $mol_text_header__arg__IHUF3YNZ = $mol_type_enforce<
		ReturnType< $mol_text['header_arg'] >
		,
		ReturnType< $mol_text_header['arg'] >
	>
	type $mol_text_code__text__65LPMT1H = $mol_type_enforce<
		ReturnType< $mol_text['pre_text'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__highlight__5P6STX2E = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	type $mol_text_code__uri_resolve__0FPL5Y1Z = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_code['uri_resolve'] >
	>
	type $mol_text_code__sidebar_showed__5ZJYVSNV = $mol_type_enforce<
		ReturnType< $mol_text['pre_sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_view__dom_name__GIVSTVFF = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_grid__head_cells__2KQI7RG6 = $mol_type_enforce<
		ReturnType< $mol_text['table_head_cells'] >
		,
		ReturnType< $mol_grid['head_cells'] >
	>
	type $mol_grid__rows__8NYPVLLW = $mol_type_enforce<
		ReturnType< $mol_text['table_rows'] >
		,
		ReturnType< $mol_grid['rows'] >
	>
	type $mol_grid_row__cells__B6II8OYR = $mol_type_enforce<
		ReturnType< $mol_text['table_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_text__auto_scroll__H2AUCM0Q = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text__highlight__AID3K8UY = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__uri_resolve__LK6V42V8 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text__PT2CX47F = $mol_type_enforce<
		ReturnType< $mol_text['table_cell_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_grid__rows__QLFSP2GP = $mol_type_enforce<
		ReturnType< $mol_text['grid_rows'] >
		,
		ReturnType< $mol_grid['rows'] >
	>
	type $mol_grid_row__cells__V8NGL0QF = $mol_type_enforce<
		ReturnType< $mol_text['grid_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_text__auto_scroll__TQ303XFL = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text__highlight__2BTV5QQD = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__uri_resolve__H6AH49WS = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text__OTSPNQZW = $mol_type_enforce<
		ReturnType< $mol_text['grid_cell_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_dimmer__dom_name__XAASM9UQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['dom_name'] >
	>
	type $mol_dimmer__needle__7A01GMQ8 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack__FFZ00PVC = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_text_span__dom_name__6PO7QY5T = $mol_type_enforce<
		string
		,
		ReturnType< $mol_text_span['dom_name'] >
	>
	type $mol_text_span__type__9DOO0633 = $mol_type_enforce<
		ReturnType< $mol_text['line_type'] >
		,
		ReturnType< $mol_text_span['type'] >
	>
	type $mol_text_span__sub__F21N4M7K = $mol_type_enforce<
		ReturnType< $mol_text['line_content'] >
		,
		ReturnType< $mol_text_span['sub'] >
	>
	type $mol_text_code_row__numb_showed__DYJFFNSY = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code_row['numb_showed'] >
	>
	type $mol_text_code_row__highlight__0BLIYLF2 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_code_row['highlight'] >
	>
	type $mol_text_code_row__text__3W19E04T = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_text_code_row['text'] >
	>
	type $mol_text_code_row__uri_resolve__LWR71Q3Z = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_code_row['uri_resolve'] >
	>
	type $mol_text_code_row__syntax__E9997YYV = $mol_type_enforce<
		ReturnType< $mol_text['code_syntax'] >
		,
		ReturnType< $mol_text_code_row['syntax'] >
	>
	type $mol_link_iconed__uri__W4B9FPCP = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content__LLZQMSVB = $mol_type_enforce<
		ReturnType< $mol_text['line_content'] >
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_link_iconed__uri__3MG4K2O8 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content__J0JJ0R35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_embed_any__uri__W61V93MU = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_embed_any['uri'] >
	>
	type $mol_embed_any__title__4XKXTRLD = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_embed_any['title'] >
	>
	export class $mol_text extends $mol_list {
		auto_scroll( ): any
		block_content( id: any): readonly(any)[]
		uri_resolve( id: any): string
		quote_text( id: any): string
		highlight( ): string
		list_type( id: any): string
		list_text( id: any): string
		header_level( id: any): number
		header_arg( id: any): Record<string, any>
		pre_text( id: any): string
		code_sidebar_showed( ): boolean
		pre_sidebar_showed( ): ReturnType< $mol_text['code_sidebar_showed'] >
		table_head_cells( id: any): readonly(any)[]
		table_rows( id: any): readonly(any)[]
		table_cells( id: any): readonly(any)[]
		table_cell_text( id: any): string
		grid_rows( id: any): readonly(any)[]
		grid_cells( id: any): readonly(any)[]
		grid_cell_text( id: any): string
		line_text( id: any): string
		line_type( id: any): string
		line_content( id: any): readonly(any)[]
		code_syntax( ): any
		link_uri( id: any): string
		link_host( id: any): string
		uri_base( ): string
		text( ): string
		param( ): string
		flow_tokens( ): readonly(any)[]
		block_text( id: any): string
		auto( ): readonly(any)[]
		Paragraph( id: any): $mol_paragraph
		Quote( id: any): $mol_text
		List( id: any): $mol_text_list
		item_index( id: any): number
		Header( id: any): $mol_text_header
		Pre( id: any): $mol_text_code
		Cut( id: any): $mol_view
		Table( id: any): $mol_grid
		Table_row( id: any): $mol_grid_row
		Table_cell( id: any): $mol_text
		Grid( id: any): $mol_grid
		Grid_row( id: any): $mol_grid_row
		Grid_cell( id: any): $mol_text
		String( id: any): $mol_dimmer
		Span( id: any): $mol_text_span
		Code_line( id: any): $mol_text_code_row
		Link( id: any): $mol_link_iconed
		Link_http( id: any): $mol_link_iconed
		Embed( id: any): $mol_embed_any
	}
	
	type $mol_link__arg__46LXPXWR = $mol_type_enforce<
		ReturnType< $mol_text_header['arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__hint__PBF5K3FM = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub__LKF1Y843 = $mol_type_enforce<
		ReturnType< $mol_text_header['content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_text_header extends $mol_paragraph {
		arg( ): Record<string, any>
		content( ): readonly(any)[]
		Link( ): $mol_link
		level( ): number
		sub( ): readonly(any)[]
	}
	
	export class $mol_text_span extends $mol_paragraph {
		type( ): string
		dom_name( ): string
		attr( ): ({ 
			'mol_text_type': ReturnType< $mol_text_span['type'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_text extends $.$mol_text {
        flow_tokens(): readonly {
            name: string;
            found: string;
            chunks: string[];
        }[];
        block_type(index: number): string;
        rows(): ($mol_view | $.$mol_paragraph | $.$mol_text_code | $.$mol_grid)[];
        param(): string;
        header_level(index: number): number;
        header_arg(index: number): {
            [x: string]: string;
        };
        list_type(index: number): string;
        item_index(index: number): number;
        pre_text(index: number): string;
        quote_text(index: number): string;
        list_text(index: number): string;
        cell_content(indexBlock: number): string[][];
        table_rows(blockId: number): $mol_grid_row[];
        table_head_cells(blockId: number): $.$mol_text[];
        table_cells(id: {
            block: number;
            row: number;
        }): $.$mol_text[];
        table_cell_text(id: {
            block: number;
            row: number;
            cell: number;
        }): string;
        grid_content(indexBlock: number): string[][];
        grid_rows(blockId: number): $mol_grid_row[];
        grid_cells(id: {
            block: number;
            row: number;
        }): $.$mol_text[];
        grid_cell_text(id: {
            block: number;
            row: number;
            cell: number;
        }): string;
        uri_base(): string;
        uri_base_abs(): URL;
        uri_resolve(uri: string): string;
        code_syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        block_text(index: number): string;
        block_content(index: number): ($.$mol_dimmer | $.$mol_text_code_row | $.$mol_link_iconed | $.$mol_embed_any | $mol_text_span)[];
        line_tokens(path: readonly number[]): readonly {
            name: string;
            found: string;
            chunks: string[];
        }[];
        line_token(path: readonly number[]): {
            name: string;
            found: string;
            chunks: string[];
        };
        line_type(path: readonly number[]): string;
        line_text(path: readonly number[]): string;
        line_content(path: readonly number[]): ($.$mol_dimmer | $.$mol_text_code_row | $.$mol_link_iconed | $.$mol_embed_any | $mol_text_span)[];
        link_uri(path: readonly number[]): string;
        link_host(path: readonly number[]): string;
        auto_scroll(): void;
    }
    class $mol_text_header extends $.$mol_text_header {
        dom_name(): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_lock extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=lock.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_check_icon extends $mol_check {
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {
    const $hyoo_crus_flex_thing_base: Omit<typeof $hyoo_crus_dict, "prototype"> & (new (...args: any[]) => $mol_type_override<$hyoo_crus_dict, {
        readonly Kind: (auto?: any) => {
            Value: () => typeof $hyoo_crus_flex_kind;
            yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
            remote(next?: $hyoo_crus_flex_kind | null | undefined): $hyoo_crus_flex_kind | null;
            remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_flex_kind | null;
            local_ensure(): $hyoo_crus_flex_kind | null;
            val(next?: (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null | undefined): (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null;
            pick_unit(): $hyoo_crus_gist | undefined;
            vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
            nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        } | null;
        readonly Title: (auto?: any) => $hyoo_crus_atom_str | null;
    }>) & {
        schema: {
            [x: string]: typeof $hyoo_crus_node;
        } & {
            readonly Kind: {
                new (): {
                    Value: () => typeof $hyoo_crus_flex_kind;
                    yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
                    remote(next?: $hyoo_crus_flex_kind | null | undefined): $hyoo_crus_flex_kind | null;
                    remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_flex_kind | null;
                    local_ensure(): $hyoo_crus_flex_kind | null;
                    val(next?: (symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null | undefined): (symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null;
                    pick_unit(): $hyoo_crus_gist | undefined;
                    vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
                    land(): $hyoo_crus_land;
                    head(): string;
                    realm(): $hyoo_crus_realm | null;
                    land_ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    toJSON(): string | undefined;
                    cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
                    nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
                    units(): $hyoo_crus_gist[];
                    filled(): boolean;
                    can_change(lord?: symbol & {
                        $hyoo_crus_ref: symbol;
                    }): boolean;
                    last_change(): $mol_time_moment | null;
                    $: typeof $$;
                    destructor(): void;
                    toString(): string;
                    [Symbol.toStringTag]: string;
                    [$mol_ambient_ref]: typeof $$;
                };
                toString(): string;
                Value: typeof $hyoo_crus_dict;
                parse: typeof $hyoo_crus_vary_cast_ref;
                tag: "keys" | "term" | "solo" | "vals";
                make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
                $: typeof $$;
                create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
                toJSON(): any;
                destructor(): void;
                [Symbol.toPrimitive](): any;
            };
            readonly Title: typeof $hyoo_crus_atom_str;
        };
    };
    export class $hyoo_crus_flex_thing extends $hyoo_crus_flex_thing_base {
    }
    const $hyoo_crus_flex_thing_ref_base: {
        new (): {
            Value: () => typeof $hyoo_crus_flex_thing;
            yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
            remote(next?: $hyoo_crus_flex_thing | null | undefined): $hyoo_crus_flex_thing | null;
            remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_flex_thing | null;
            local_ensure(): $hyoo_crus_flex_thing | null;
            val(next?: (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null | undefined): (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null;
            pick_unit(): $hyoo_crus_gist | undefined;
            vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
            nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        };
        toString(): string;
        Value: typeof $hyoo_crus_dict;
        parse: typeof $hyoo_crus_vary_cast_ref;
        tag: "keys" | "term" | "solo" | "vals";
        make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
        $: typeof $$;
        create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
        toJSON(): any;
        destructor(): void;
        [Symbol.toPrimitive](): any;
    };
    export class $hyoo_crus_flex_thing_ref extends $hyoo_crus_flex_thing_ref_base {
    }
    const $hyoo_crus_flex_kind_base: Omit<typeof $hyoo_crus_flex_thing, "prototype"> & (new (...args: any[]) => $mol_type_override<$hyoo_crus_flex_thing, {
        readonly Props: (auto?: any) => {
            remote_list(next?: readonly $hyoo_crus_flex_prop[] | undefined): readonly $hyoo_crus_flex_prop[];
            remote_make(preset: $hyoo_crus_rank_preset): $hyoo_crus_flex_prop;
            local_make(idea?: number | undefined): $hyoo_crus_flex_prop;
            items(next?: readonly ((symbol & {
                $hyoo_crus_ref: symbol;
            }) | null)[] | undefined): readonly ((symbol & {
                $hyoo_crus_ref: symbol;
            }) | null)[];
            items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
            splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
            find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
            has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
            add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
            cut(vary: $hyoo_crus_vary_type): void;
            move(from: number, to: number): void;
            wipe(seat: number): void;
            node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
            nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        } | null;
    }>) & {
        schema: {
            [x: string]: typeof $hyoo_crus_node;
        } & {
            readonly Props: {
                new (): {
                    remote_list(next?: readonly $hyoo_crus_flex_prop[] | undefined): readonly $hyoo_crus_flex_prop[];
                    remote_make(preset: $hyoo_crus_rank_preset): $hyoo_crus_flex_prop;
                    local_make(idea?: number | undefined): $hyoo_crus_flex_prop;
                    items(next?: readonly ((symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null)[] | undefined): readonly ((symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null)[];
                    items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
                    splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
                    find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
                    has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
                    add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
                    cut(vary: $hyoo_crus_vary_type): void;
                    move(from: number, to: number): void;
                    wipe(seat: number): void;
                    node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
                    land(): $hyoo_crus_land;
                    head(): string;
                    realm(): $hyoo_crus_realm | null;
                    land_ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    toJSON(): string | undefined;
                    cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
                    nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
                    units(): $hyoo_crus_gist[];
                    filled(): boolean;
                    can_change(lord?: symbol & {
                        $hyoo_crus_ref: symbol;
                    }): boolean;
                    last_change(): $mol_time_moment | null;
                    $: typeof $$;
                    destructor(): void;
                    toString(): string;
                    [Symbol.toStringTag]: string;
                    [$mol_ambient_ref]: typeof $$;
                };
                Value: () => typeof $hyoo_crus_flex_prop;
                toJSON(): string;
                parse: typeof $hyoo_crus_vary_cast_ref;
                tag: "keys" | "term" | "solo" | "vals";
                make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
                $: typeof $$;
                create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
                toString(): any;
                destructor(): void;
                [Symbol.toPrimitive](): any;
            };
        };
    };
    export class $hyoo_crus_flex_kind extends $hyoo_crus_flex_kind_base {
    }
    const $hyoo_crus_flex_prop_base: Omit<typeof $hyoo_crus_flex_thing, "prototype"> & (new (...args: any[]) => $mol_type_override<$hyoo_crus_flex_thing, {
        readonly Key: (auto?: any) => $hyoo_crus_atom_str | null;
        readonly Type: (auto?: any) => $hyoo_crus_atom_str | null;
        readonly Target: (auto?: any) => {
            Value: () => typeof $hyoo_crus_flex_kind;
            yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
            remote(next?: $hyoo_crus_flex_kind | null | undefined): $hyoo_crus_flex_kind | null;
            remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_flex_kind | null;
            local_ensure(): $hyoo_crus_flex_kind | null;
            val(next?: (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null | undefined): (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null;
            pick_unit(): $hyoo_crus_gist | undefined;
            vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
            nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        } | null;
        readonly Enum: (auto?: any) => {
            Value: () => typeof $hyoo_crus_list_vary;
            yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
            remote(next?: $hyoo_crus_list_vary | null | undefined): $hyoo_crus_list_vary | null;
            remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_list_vary | null;
            local_ensure(): $hyoo_crus_list_vary | null;
            val(next?: (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null | undefined): (symbol & {
                $hyoo_crus_ref: symbol;
            }) | null;
            pick_unit(): $hyoo_crus_gist | undefined;
            vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2): InstanceType<Node_2>;
            nodes<Node_3 extends typeof $hyoo_crus_node>(Node: Node_3 | null): readonly InstanceType<Node_3>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        } | null;
        readonly Base: (auto?: any) => $hyoo_crus_atom_vary | null;
    }>) & {
        schema: {
            [x: string]: typeof $hyoo_crus_node;
        } & {
            readonly Key: typeof $hyoo_crus_atom_str;
            readonly Type: typeof $hyoo_crus_atom_str;
            readonly Target: {
                new (): {
                    Value: () => typeof $hyoo_crus_flex_kind;
                    yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
                    remote(next?: $hyoo_crus_flex_kind | null | undefined): $hyoo_crus_flex_kind | null;
                    remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_flex_kind | null;
                    local_ensure(): $hyoo_crus_flex_kind | null;
                    val(next?: (symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null | undefined): (symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null;
                    pick_unit(): $hyoo_crus_gist | undefined;
                    vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
                    land(): $hyoo_crus_land;
                    head(): string;
                    realm(): $hyoo_crus_realm | null;
                    land_ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    toJSON(): string | undefined;
                    cast<Node extends typeof $hyoo_crus_node>(Node: Node): InstanceType<Node>;
                    nodes<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1 | null): readonly InstanceType<Node_1>[];
                    units(): $hyoo_crus_gist[];
                    filled(): boolean;
                    can_change(lord?: symbol & {
                        $hyoo_crus_ref: symbol;
                    }): boolean;
                    last_change(): $mol_time_moment | null;
                    $: typeof $$;
                    destructor(): void;
                    toString(): string;
                    [Symbol.toStringTag]: string;
                    [$mol_ambient_ref]: typeof $$;
                };
                toString(): string;
                Value: typeof $hyoo_crus_dict;
                parse: typeof $hyoo_crus_vary_cast_ref;
                tag: "keys" | "term" | "solo" | "vals";
                make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
                $: typeof $$;
                create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
                toJSON(): any;
                destructor(): void;
                [Symbol.toPrimitive](): any;
            };
            readonly Enum: {
                new (): {
                    Value: () => typeof $hyoo_crus_list_vary;
                    yoke(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_land | null;
                    remote(next?: $hyoo_crus_list_vary | null | undefined): $hyoo_crus_list_vary | null;
                    remote_ensure(preset?: $hyoo_crus_rank_preset | undefined): $hyoo_crus_list_vary | null;
                    local_ensure(): $hyoo_crus_list_vary | null;
                    val(next?: (symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null | undefined): (symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null;
                    pick_unit(): $hyoo_crus_gist | undefined;
                    vary(next?: $hyoo_crus_vary_type | undefined): $hyoo_crus_vary_type;
                    land(): $hyoo_crus_land;
                    head(): string;
                    realm(): $hyoo_crus_realm | null;
                    land_ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    toJSON(): string | undefined;
                    cast<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2): InstanceType<Node_2>;
                    nodes<Node_3 extends typeof $hyoo_crus_node>(Node: Node_3 | null): readonly InstanceType<Node_3>[];
                    units(): $hyoo_crus_gist[];
                    filled(): boolean;
                    can_change(lord?: symbol & {
                        $hyoo_crus_ref: symbol;
                    }): boolean;
                    last_change(): $mol_time_moment | null;
                    $: typeof $$;
                    destructor(): void;
                    toString(): string;
                    [Symbol.toStringTag]: string;
                    [$mol_ambient_ref]: typeof $$;
                };
                toString(): string;
                Value: typeof $hyoo_crus_dict;
                parse: typeof $hyoo_crus_vary_cast_ref;
                tag: "keys" | "term" | "solo" | "vals";
                make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
                $: typeof $$;
                create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
                toJSON(): any;
                destructor(): void;
                [Symbol.toPrimitive](): any;
            };
            readonly Base: typeof $hyoo_crus_atom_vary;
        };
    };
    export class $hyoo_crus_flex_prop extends $hyoo_crus_flex_prop_base {
    }
    const $hyoo_crus_flex_domain_base: Omit<typeof $hyoo_crus_flex_thing, "prototype"> & (new (...args: any[]) => $mol_type_override<$hyoo_crus_flex_thing, {
        readonly Kinds: (auto?: any) => {
            remote_list(next?: readonly $hyoo_crus_flex_kind[] | undefined): readonly $hyoo_crus_flex_kind[];
            remote_make(preset: $hyoo_crus_rank_preset): $hyoo_crus_flex_kind;
            local_make(idea?: number | undefined): $hyoo_crus_flex_kind;
            items(next?: readonly ((symbol & {
                $hyoo_crus_ref: symbol;
            }) | null)[] | undefined): readonly ((symbol & {
                $hyoo_crus_ref: symbol;
            }) | null)[];
            items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
            splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
            find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
            has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
            add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
            cut(vary: $hyoo_crus_vary_type): void;
            move(from: number, to: number): void;
            wipe(seat: number): void;
            node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
            nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        } | null;
        readonly Props: (auto?: any) => {
            remote_list(next?: readonly $hyoo_crus_flex_prop[] | undefined): readonly $hyoo_crus_flex_prop[];
            remote_make(preset: $hyoo_crus_rank_preset): $hyoo_crus_flex_prop;
            local_make(idea?: number | undefined): $hyoo_crus_flex_prop;
            items(next?: readonly ((symbol & {
                $hyoo_crus_ref: symbol;
            }) | null)[] | undefined): readonly ((symbol & {
                $hyoo_crus_ref: symbol;
            }) | null)[];
            items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
            splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
            find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
            has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
            add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
            cut(vary: $hyoo_crus_vary_type): void;
            move(from: number, to: number): void;
            wipe(seat: number): void;
            node_make<Node_3 extends typeof $hyoo_crus_node>(Node: Node_3, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node_3>;
            land(): $hyoo_crus_land;
            head(): string;
            realm(): $hyoo_crus_realm | null;
            land_ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            ref(): symbol & {
                $hyoo_crus_ref: symbol;
            };
            toJSON(): string | undefined;
            cast<Node_4 extends typeof $hyoo_crus_node>(Node: Node_4): InstanceType<Node_4>;
            nodes<Node_5 extends typeof $hyoo_crus_node>(Node: Node_5 | null): readonly InstanceType<Node_5>[];
            units(): $hyoo_crus_gist[];
            filled(): boolean;
            can_change(lord?: symbol & {
                $hyoo_crus_ref: symbol;
            }): boolean;
            last_change(): $mol_time_moment | null;
            $: typeof $$;
            destructor(): void;
            toString(): string;
            [Symbol.toStringTag]: string;
            [$mol_ambient_ref]: typeof $$;
        } | null;
        readonly Types: (auto?: any) => $hyoo_crus_list_str | null;
    }>) & {
        schema: {
            [x: string]: typeof $hyoo_crus_node;
        } & {
            readonly Kinds: {
                new (): {
                    remote_list(next?: readonly $hyoo_crus_flex_kind[] | undefined): readonly $hyoo_crus_flex_kind[];
                    remote_make(preset: $hyoo_crus_rank_preset): $hyoo_crus_flex_kind;
                    local_make(idea?: number | undefined): $hyoo_crus_flex_kind;
                    items(next?: readonly ((symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null)[] | undefined): readonly ((symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null)[];
                    items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
                    splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
                    find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
                    has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
                    add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
                    cut(vary: $hyoo_crus_vary_type): void;
                    move(from: number, to: number): void;
                    wipe(seat: number): void;
                    node_make<Node extends typeof $hyoo_crus_node>(Node: Node, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node>;
                    land(): $hyoo_crus_land;
                    head(): string;
                    realm(): $hyoo_crus_realm | null;
                    land_ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    toJSON(): string | undefined;
                    cast<Node_1 extends typeof $hyoo_crus_node>(Node: Node_1): InstanceType<Node_1>;
                    nodes<Node_2 extends typeof $hyoo_crus_node>(Node: Node_2 | null): readonly InstanceType<Node_2>[];
                    units(): $hyoo_crus_gist[];
                    filled(): boolean;
                    can_change(lord?: symbol & {
                        $hyoo_crus_ref: symbol;
                    }): boolean;
                    last_change(): $mol_time_moment | null;
                    $: typeof $$;
                    destructor(): void;
                    toString(): string;
                    [Symbol.toStringTag]: string;
                    [$mol_ambient_ref]: typeof $$;
                };
                Value: () => typeof $hyoo_crus_flex_kind;
                toJSON(): string;
                parse: typeof $hyoo_crus_vary_cast_ref;
                tag: "keys" | "term" | "solo" | "vals";
                make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
                $: typeof $$;
                create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
                toString(): any;
                destructor(): void;
                [Symbol.toPrimitive](): any;
            };
            readonly Props: {
                new (): {
                    remote_list(next?: readonly $hyoo_crus_flex_prop[] | undefined): readonly $hyoo_crus_flex_prop[];
                    remote_make(preset: $hyoo_crus_rank_preset): $hyoo_crus_flex_prop;
                    local_make(idea?: number | undefined): $hyoo_crus_flex_prop;
                    items(next?: readonly ((symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null)[] | undefined): readonly ((symbol & {
                        $hyoo_crus_ref: symbol;
                    }) | null)[];
                    items_vary(next?: readonly $hyoo_crus_vary_type[] | undefined, tag?: "keys" | "term" | "solo" | "vals"): readonly $hyoo_crus_vary_type[];
                    splice(next: readonly $hyoo_crus_vary_type[], from?: number, to?: number, tag?: "keys" | "term" | "solo" | "vals"): void;
                    find(vary: $hyoo_crus_vary_type): $hyoo_crus_gist | null;
                    has(vary: $hyoo_crus_vary_type, next?: boolean | undefined, tag?: "keys" | "term" | "solo" | "vals"): boolean;
                    add(vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): void;
                    cut(vary: $hyoo_crus_vary_type): void;
                    move(from: number, to: number): void;
                    wipe(seat: number): void;
                    node_make<Node_3 extends typeof $hyoo_crus_node>(Node: Node_3, vary: $hyoo_crus_vary_type, tag?: "keys" | "term" | "solo" | "vals"): InstanceType<Node_3>;
                    land(): $hyoo_crus_land;
                    head(): string;
                    realm(): $hyoo_crus_realm | null;
                    land_ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    ref(): symbol & {
                        $hyoo_crus_ref: symbol;
                    };
                    toJSON(): string | undefined;
                    cast<Node_4 extends typeof $hyoo_crus_node>(Node: Node_4): InstanceType<Node_4>;
                    nodes<Node_5 extends typeof $hyoo_crus_node>(Node: Node_5 | null): readonly InstanceType<Node_5>[];
                    units(): $hyoo_crus_gist[];
                    filled(): boolean;
                    can_change(lord?: symbol & {
                        $hyoo_crus_ref: symbol;
                    }): boolean;
                    last_change(): $mol_time_moment | null;
                    $: typeof $$;
                    destructor(): void;
                    toString(): string;
                    [Symbol.toStringTag]: string;
                    [$mol_ambient_ref]: typeof $$;
                };
                Value: () => typeof $hyoo_crus_flex_prop;
                toJSON(): string;
                parse: typeof $hyoo_crus_vary_cast_ref;
                tag: "keys" | "term" | "solo" | "vals";
                make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
                $: typeof $$;
                create<Instance>(this: new (init?: ((instance: any) => void) | undefined) => Instance, init?: ((instance: $mol_type_writable<Instance>) => void) | undefined): Instance;
                toString(): any;
                destructor(): void;
                [Symbol.toPrimitive](): any;
            };
            readonly Types: typeof $hyoo_crus_list_str;
        };
    };
    export class $hyoo_crus_flex_domain extends $hyoo_crus_flex_domain_base {
        static ensure(land: $hyoo_crus_land): $hyoo_crus_flex_domain;
    }
    export {};
}

declare namespace $ {

	type $mol_dump_value__value__WP9ZWW2N = $mol_type_enforce<
		ReturnType< $mol_dump_list['dump_value'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	type $mol_dump_value__expanded__AL8MFSVN = $mol_type_enforce<
		ReturnType< $mol_dump_list['dump_expanded'] >
		,
		ReturnType< $mol_dump_value['expanded'] >
	>
	type $mol_dump_value__prototypes__AOJKH9OF = $mol_type_enforce<
		ReturnType< $mol_dump_list['prototypes'] >
		,
		ReturnType< $mol_dump_value['prototypes'] >
	>
	type $mol_dump_value__preview_show__UB8O9KR0 = $mol_type_enforce<
		ReturnType< $mol_dump_list['preview_show'] >
		,
		ReturnType< $mol_dump_value['preview_show'] >
	>
	export class $mol_dump_list extends $mol_view {
		dump_value( id: any): any
		dump_expanded( id: any, next?: boolean ): boolean
		prototypes( ): boolean
		preview_show( ): boolean
		Dump( id: any): $mol_dump_value
		values( ): readonly(any)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_dump_list extends $.$mol_dump_list {
        sub(): $.$mol_dump_value[];
        dump_value(index: number): any;
        expand_all(event?: Event): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_check_expand__checked__68637MVP = $mol_type_enforce<
		ReturnType< $mol_expander['expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__expandable__2DUL2M21 = $mol_type_enforce<
		ReturnType< $mol_expander['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__label__FE89SPB0 = $mol_type_enforce<
		ReturnType< $mol_expander['label'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__sub__00PFXNIN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows__ZENPCEGM = $mol_type_enforce<
		ReturnType< $mol_expander['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_expander extends $mol_list {
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		label( ): readonly(any)[]
		Trigger( ): $mol_check_expand
		Tools( ): any
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_list
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=expander.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_expander extends $.$mol_expander {
        rows(): $mol_view[];
        expandable(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {
    function $mol_try<Result>(handler2: () => Result): Result | Error;
}

declare namespace $ {

	type $mol_text_code__text__WOVX9GGB = $mol_type_enforce<
		ReturnType< $mol_dump_value['simple'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__text__DH6VQJOW = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_title'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_check_expand__minimal_height__WN6H9O4F = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check_expand['minimal_height'] >
	>
	type $mol_check_expand__minimal_width__0UZWNCU9 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check_expand['minimal_width'] >
	>
	type $mol_check_expand__expanded__19ZJLNOC = $mol_type_enforce<
		ReturnType< $mol_dump_value['expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	type $mol_check_expand__expandable__FNOVU6ZZ = $mol_type_enforce<
		ReturnType< $mol_dump_value['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__clicks__LOY14KEU = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_all'] >
		,
		ReturnType< $mol_check_expand['clicks'] >
	>
	type $mol_check_expand__label__GUM8T9E4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__dom_node__2ZBH2CC1 = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview_dom'] >
		,
		ReturnType< $mol_view['dom_node'] >
	>
	type $mol_view__render__74S8ETGV = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview'] >
		,
		ReturnType< $mol_view['render'] >
	>
	type $mol_view__sub__NTIORS3T = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_dump_list__values__Q1DFT8ZJ = $mol_type_enforce<
		ReturnType< $mol_dump_value['row_values'] >
		,
		ReturnType< $mol_dump_list['values'] >
	>
	type $mol_dump_list__prototypes__2DEPUF2U = $mol_type_enforce<
		ReturnType< $mol_dump_value['prototypes'] >
		,
		ReturnType< $mol_dump_list['prototypes'] >
	>
	type $mol_dump_list__preview_show__13N5HEN1 = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview_show'] >
		,
		ReturnType< $mol_dump_list['preview_show'] >
	>
	type $mol_expander__expanded__MX48FU9F = $mol_type_enforce<
		ReturnType< $mol_dump_value['expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__Trigger__U7XMJYR5 = $mol_type_enforce<
		ReturnType< $mol_dump_value['Expand_head'] >
		,
		ReturnType< $mol_expander['Trigger'] >
	>
	type $mol_expander__content__H6QM8MZY = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_content'] >
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_dump_value extends $mol_view {
		simple( ): string
		Simple( ): $mol_text_code
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		expand_all( next?: any ): any
		expand_title( ): string
		Expand_title( ): $mol_text_code
		Expand_head( ): $mol_check_expand
		preview_dom( ): any
		preview( ): any
		Preview_dom( ): $mol_view
		Preview( ): $mol_view
		row_values( id: any): readonly(any)[]
		prototypes( ): boolean
		Row( id: any): $mol_dump_list
		expand_content( ): readonly(any)[]
		Expand( ): $mol_expander
		value( next?: any ): any
		preview_show( next?: boolean ): boolean
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=value.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_dump_value extends $.$mol_dump_value {
        sub(): $.$mol_text_code[] | $.$mol_expander[];
        simple(): string;
        expand_title(): any;
        rows_values(): any[][];
        preview_dom(): Element | null;
        expand_content(): ($mol_view | $.$mol_dump_list)[];
        expandable(): boolean;
        row_values(index: number): any[];
        expand_all(event?: Event): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_link__title__6DMSEIJ3 = $mol_type_enforce<
		ReturnType< $hyoo_crus_gist_dump['title'] >
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg__3DZFWPMW = $mol_type_enforce<
		ReturnType< $hyoo_crus_gist_dump['arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_dump_value__value__6LM2Y4ET = $mol_type_enforce<
		ReturnType< $hyoo_crus_gist_dump['value'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	export class $hyoo_crus_gist_dump extends $mol_view {
		arg( ): Record<string, any>
		value( ): any
		land( ): $hyoo_crus_land
		gist( ): $hyoo_crus_gist
		Ref( ): $mol_link
		Other( ): $mol_dump_value
	}
	
}

//# sourceMappingURL=dump.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_gist_dump extends $.$hyoo_crus_gist_dump {
        value(): $hyoo_crus_vary_type;
        sub(): $.$mol_link[] | $.$mol_dump_value[];
        title(): string;
        arg(): {
            ref: string;
        };
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	export class $mol_icon_plus extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=plus.view.tree.d.ts.map
declare namespace $ {

	export class $mol_ghost extends $mol_view {
		Sub( ): $mol_view
	}
	
}

//# sourceMappingURL=ghost.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_ghost extends $.$mol_ghost {
        dom_node_external(next?: Element): Element;
        dom_node_actual(): Element;
        dom_tree(): Element;
        title(): string;
        minimal_width(): number;
        minimal_height(): number;
    }
}

declare namespace $ {

	export class $mol_drag extends $mol_ghost {
		start( next?: any ): any
		drag_start( next?: ReturnType< $mol_drag['start'] > ): ReturnType< $mol_drag['start'] >
		move( next?: any ): any
		drag_move( next?: ReturnType< $mol_drag['move'] > ): ReturnType< $mol_drag['move'] >
		end( next?: any ): any
		drag_end( next?: ReturnType< $mol_drag['end'] > ): ReturnType< $mol_drag['end'] >
		status( next?: string ): string
		event( ): ({ 
			dragstart( next?: ReturnType< $mol_drag['drag_start'] > ): ReturnType< $mol_drag['drag_start'] >,
			drag( next?: ReturnType< $mol_drag['drag_move'] > ): ReturnType< $mol_drag['drag_move'] >,
			dragend( next?: ReturnType< $mol_drag['drag_end'] > ): ReturnType< $mol_drag['drag_end'] >,
		}) 
		attr( ): ({ 
			'draggable': boolean,
			'mol_drag_status': ReturnType< $mol_drag['status'] >,
		}) 
		transfer( ): ({ 
			'text/plain': string,
			'text/html': string,
			'text/uri-list': string,
		}) 
		allow_copy( ): boolean
		allow_link( ): boolean
		allow_move( ): boolean
		image( ): ReturnType< $mol_drag['dom_node'] >
	}
	
}

//# sourceMappingURL=drag.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_drag extends $.$mol_drag {
        status(next?: "ready" | "drag"): "ready" | "drag";
        drag_start(event: DragEvent): void;
        drag_end(event: DragEvent): void;
    }
}

declare namespace $ {

	export class $mol_drop extends $mol_ghost {
		enter( next?: any ): any
		move( next?: any ): any
		leave( next?: any ): any
		drop( next?: any ): any
		status( next?: string ): string
		enabled( next?: boolean ): boolean
		event( ): ({ 
			dragenter( next?: ReturnType< $mol_drop['enter'] > ): ReturnType< $mol_drop['enter'] >,
			dragover( next?: ReturnType< $mol_drop['move'] > ): ReturnType< $mol_drop['move'] >,
			dragleave( next?: ReturnType< $mol_drop['leave'] > ): ReturnType< $mol_drop['leave'] >,
			drop( next?: ReturnType< $mol_drop['drop'] > ): ReturnType< $mol_drop['drop'] >,
		}) 
		attr( ): ({ 
			'mol_drop_status': ReturnType< $mol_drop['status'] >,
		}) 
		adopt( next?: Record<string, any> ): Record<string, any>
		receive( next?: any ): any
		allow( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=drop.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_drop extends $.$mol_drop {
        status(next?: "ready" | "drag"): "ready" | "drag";
        protected _target: EventTarget | null;
        enter(event: DragEvent): void;
        move(event: DragEvent): void;
        decide_action(event: DragEvent): any;
        leave(event: DragEvent): void;
        receive(transfer: unknown): unknown;
        drop(event: DragEvent): void;
    }
}

declare namespace $ {

	export class $mol_icon_tick extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=tick.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	export class $mol_check_box extends $mol_check {
		Icon( ): $mol_icon_tick
	}
	
}

//# sourceMappingURL=box.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_minus extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=minus.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	type $mol_string__type__USXFDLXC = $mol_type_enforce<
		ReturnType< $mol_number['type'] >
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_string__value__10V8BKAO = $mol_type_enforce<
		ReturnType< $mol_number['value_string'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint__0L0MOVGI = $mol_type_enforce<
		ReturnType< $mol_number['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__enabled__QX89P40P = $mol_type_enforce<
		ReturnType< $mol_number['string_enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__submit__FQM1EDIL = $mol_type_enforce<
		ReturnType< $mol_number['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_button_minor__event_click__WYIEEI50 = $mol_type_enforce<
		ReturnType< $mol_number['event_dec'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__enabled__XOSYH1OG = $mol_type_enforce<
		ReturnType< $mol_number['dec_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub__IVDPZ23F = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__event_click__RMH9700G = $mol_type_enforce<
		ReturnType< $mol_number['event_inc'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__enabled__DEC62IIQ = $mol_type_enforce<
		ReturnType< $mol_number['inc_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub__W5NM2TDP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_number extends $mol_view {
		precision( ): number
		type( ): string
		value_string( next?: string ): string
		hint( ): string
		string_enabled( ): ReturnType< $mol_number['enabled'] >
		submit( next?: any ): any
		String( ): $mol_string
		event_dec( next?: any ): any
		dec_enabled( ): ReturnType< $mol_number['enabled'] >
		dec_icon( ): $mol_icon_minus
		Dec( ): $mol_button_minor
		event_inc( next?: any ): any
		inc_enabled( ): ReturnType< $mol_number['enabled'] >
		inc_icon( ): $mol_icon_plus
		Inc( ): $mol_button_minor
		precision_view( ): ReturnType< $mol_number['precision'] >
		precision_change( ): ReturnType< $mol_number['precision'] >
		value_min( ): number
		value_max( ): number
		value( next?: number ): number
		enabled( ): boolean
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=number.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_number extends $.$mol_number {
        value_limited(next?: any): number;
        event_dec(next?: Event): void;
        event_inc(next?: Event): void;
        value_string(next?: string): string;
        dec_enabled(): boolean;
        inc_enabled(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_bar extends $mol_view {
	}
	
}

//# sourceMappingURL=bar.view.tree.d.ts.map
declare namespace $ {

	type $mol_textarea_edit__value__1KQOH7UD = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_textarea_edit['value'] >
	>
	type $mol_textarea_edit__hint__KX42QRE6 = $mol_type_enforce<
		ReturnType< $mol_textarea['hint'] >
		,
		ReturnType< $mol_textarea_edit['hint'] >
	>
	type $mol_textarea_edit__enabled__BE2MRZAF = $mol_type_enforce<
		ReturnType< $mol_textarea['enabled'] >
		,
		ReturnType< $mol_textarea_edit['enabled'] >
	>
	type $mol_textarea_edit__spellcheck__Y19C8N5R = $mol_type_enforce<
		ReturnType< $mol_textarea['spellcheck'] >
		,
		ReturnType< $mol_textarea_edit['spellcheck'] >
	>
	type $mol_textarea_edit__length_max__X87NST1Q = $mol_type_enforce<
		ReturnType< $mol_textarea['length_max'] >
		,
		ReturnType< $mol_textarea_edit['length_max'] >
	>
	type $mol_textarea_edit__selection__9FVMA6GG = $mol_type_enforce<
		ReturnType< $mol_textarea['selection'] >
		,
		ReturnType< $mol_textarea_edit['selection'] >
	>
	type $mol_textarea_edit__submit__E15OKA7N = $mol_type_enforce<
		ReturnType< $mol_textarea['submit'] >
		,
		ReturnType< $mol_textarea_edit['submit'] >
	>
	type $mol_textarea_edit__submit_with_ctrl__PU05XKBY = $mol_type_enforce<
		ReturnType< $mol_textarea['submit_with_ctrl'] >
		,
		ReturnType< $mol_textarea_edit['submit_with_ctrl'] >
	>
	type $mol_text_code__text__5G8NFTTN = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__render_visible_only__CG8TDBMH = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code['render_visible_only'] >
	>
	type $mol_text_code__row_numb__V04PLUJH = $mol_type_enforce<
		ReturnType< $mol_textarea['row_numb'] >
		,
		ReturnType< $mol_text_code['row_numb'] >
	>
	type $mol_text_code__sidebar_showed__C9AI7PQU = $mol_type_enforce<
		ReturnType< $mol_textarea['sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_text_code__highlight__G9CWMO0V = $mol_type_enforce<
		ReturnType< $mol_textarea['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	export class $mol_textarea extends $mol_stack {
		clickable( next?: boolean ): boolean
		sidebar_showed( ): boolean
		press( next?: any ): any
		hover( next?: any ): any
		value( next?: string ): string
		hint( ): string
		enabled( ): boolean
		spellcheck( ): boolean
		length_max( ): number
		selection( next?: readonly(number)[] ): readonly(number)[]
		bring( ): ReturnType< ReturnType< $mol_textarea['Edit'] >['bring'] >
		submit( next?: any ): any
		submit_with_ctrl( ): boolean
		Edit( ): $mol_textarea_edit
		row_numb( id: any): number
		highlight( ): string
		View( ): $mol_text_code
		attr( ): ({ 
			'mol_textarea_clickable': ReturnType< $mol_textarea['clickable'] >,
			'mol_textarea_sidebar_showed': ReturnType< $mol_textarea['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		event( ): ({ 
			keydown( next?: ReturnType< $mol_textarea['press'] > ): ReturnType< $mol_textarea['press'] >,
			pointermove( next?: ReturnType< $mol_textarea['hover'] > ): ReturnType< $mol_textarea['hover'] >,
		}) 
		sub( ): readonly(any)[]
		symbols_alt( ): Record<string, string>
		symbols_alt_ctrl( ): Record<string, string>
		symbols_alt_shift( ): Record<string, string>
	}
	
	export class $mol_textarea_edit extends $mol_string {
		dom_name( ): string
		enter( ): string
		field( ): ({ 
			'scrollTop': number,
		})  & ReturnType< $mol_string['field'] >
	}
	
}

//# sourceMappingURL=textarea.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_textarea extends $.$mol_textarea {
        indent_inc(): void;
        indent_dec(): void;
        symbol_insert(event: KeyboardEvent): void;
        clickable(next?: boolean): boolean;
        hover(event: PointerEvent): void;
        press(event: KeyboardEvent): void;
        row_numb(index: number): number;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_calendar extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=calendar.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_calendar_today extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=today.view.tree.d.ts.map
declare namespace $ {

	export class $mol_format extends $mol_string {
		mask( id: any): string
		allow( ): string
		hint( ): ReturnType< $mol_format['mask'] >
		keyboard( ): string
	}
	
}

//# sourceMappingURL=format.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_format extends $.$mol_format {
        selection([from, to]?: [number, number]): number[];
        value_changed(next?: string): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_icon_trash_can extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=can.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_trash_can_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_left extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=left.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_right extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=right.view.tree.d.ts.map
declare namespace $ {

	export class $mol_hor extends $mol_view {
	}
	
}

//# sourceMappingURL=hor.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_hor extends $.$mol_hor {
        minimal_width(): number;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__minimal_height__H4ECT9BU = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__GHEID21G = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__1QTLTVDM = $mol_type_enforce<
		ReturnType< $mol_calendar['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_hor__sub__RAXWC8T8 = $mol_type_enforce<
		ReturnType< $mol_calendar['weekdays'] >
		,
		ReturnType< $mol_hor['sub'] >
	>
	type $mol_calendar_day__holiday__EHS48FUD = $mol_type_enforce<
		ReturnType< $mol_calendar['weekend'] >
		,
		ReturnType< $mol_calendar_day['holiday'] >
	>
	type $mol_calendar_day__sub__L0JMAU3V = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_calendar_day['sub'] >
	>
	type $mol_hor__sub__O75G2685 = $mol_type_enforce<
		ReturnType< $mol_calendar['week_days'] >
		,
		ReturnType< $mol_hor['sub'] >
	>
	type $mol_calendar_day__ghost__84WIJMZ4 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_ghost'] >
		,
		ReturnType< $mol_calendar_day['ghost'] >
	>
	type $mol_calendar_day__holiday__BTWRBDSP = $mol_type_enforce<
		ReturnType< $mol_calendar['day_holiday'] >
		,
		ReturnType< $mol_calendar_day['holiday'] >
	>
	type $mol_calendar_day__selected__UBTM9OGL = $mol_type_enforce<
		ReturnType< $mol_calendar['day_selected'] >
		,
		ReturnType< $mol_calendar_day['selected'] >
	>
	type $mol_calendar_day__today__A1Q9EJ67 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_today'] >
		,
		ReturnType< $mol_calendar_day['today'] >
	>
	type $mol_calendar_day__theme__47C0IOTQ = $mol_type_enforce<
		ReturnType< $mol_calendar['day_theme'] >
		,
		ReturnType< $mol_calendar_day['theme'] >
	>
	type $mol_calendar_day__sub__CFR73KIC = $mol_type_enforce<
		ReturnType< $mol_calendar['day_content'] >
		,
		ReturnType< $mol_calendar_day['sub'] >
	>
	export class $mol_calendar extends $mol_list {
		title( ): string
		Title( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		weekdays( ): readonly($mol_view)[]
		Weekdays( ): $mol_hor
		weekend( id: any): boolean
		weekday( id: any): string
		week_days( id: any): readonly($mol_view)[]
		day_ghost( id: any): boolean
		day_holiday( id: any): boolean
		day_selected( id: any): boolean
		day_today( id: any): boolean
		day_theme( id: any): any
		day_text( id: any): string
		day_content( id: any): readonly(any)[]
		sub( ): readonly(any)[]
		weeks( ): readonly($mol_view)[]
		weeks_count( ): number
		Weekday( id: any): $mol_calendar_day
		Week( id: any): $mol_hor
		Day( id: any): $mol_calendar_day
		month_string( ): string
		month_moment( ): $mol_time_moment
	}
	
	export class $mol_calendar_day extends $mol_view {
		holiday( ): boolean
		ghost( ): boolean
		selected( ): boolean
		today( ): boolean
		theme( ): any
		minimal_height( ): number
		minimal_width( ): number
		attr( ): ({ 
			'mol_calendar_holiday': ReturnType< $mol_calendar_day['holiday'] >,
			'mol_calendar_ghost': ReturnType< $mol_calendar_day['ghost'] >,
			'mol_calendar_selected': ReturnType< $mol_calendar_day['selected'] >,
			'mol_calendar_today': ReturnType< $mol_calendar_day['today'] >,
			'mol_theme': ReturnType< $mol_calendar_day['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=calendar.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_calendar extends $.$mol_calendar {
        month_moment(): $mol_time_moment;
        title(): string;
        day_first(): $mol_time_moment;
        day_last(): $mol_time_moment;
        day_draw_from(): $mol_time_moment;
        weekdays(): $mol_view[];
        weekday(index: number): string;
        weekend(index: number): boolean;
        sub(): any[];
        weeks(): $mol_view[];
        week_days(index: number): $mol_view[];
        day_text(day: string): string;
        day_holiday(day: string): boolean;
        today(): $mol_time_moment;
        day_today(day: string): boolean;
        day_ghost(day: string): boolean;
        day_theme(day: string): any;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_button_minor__hint__KU2N53IJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled__N521R6V5 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__76HK8PHC = $mol_type_enforce<
		ReturnType< $mol_date['today_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__M146XGPS = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_date_value_changed__F8GP23DW = $mol_type_enforce<
		Parameters< $mol_date['value_changed'] >[0]
		,
		Parameters< ReturnType< $mol_date['Input'] >['value_changed'] >[0]
	>
	type $mol_format__value__KWHR7VYS = $mol_type_enforce<
		ReturnType< $mol_date['value'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_format__mask__OUVR4PNV = $mol_type_enforce<
		ReturnType< $mol_date['input_mask'] >
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__enabled__5RAS0WPV = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_format['enabled'] >
	>
	type $mol_button_minor__hint__4FEPIMZQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled__074JNQT6 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__BAKWYZZ6 = $mol_type_enforce<
		ReturnType< $mol_date['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__OXD0O9VM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub__961QRL77 = $mol_type_enforce<
		ReturnType< $mol_date['input_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint__K0CFUJ8K = $mol_type_enforce<
		ReturnType< $mol_date['prev_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click__6DIO2JE1 = $mol_type_enforce<
		ReturnType< $mol_date['prev'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__TQCPUQB2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint__V1G1TURK = $mol_type_enforce<
		ReturnType< $mol_date['next_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click__TKCFCULS = $mol_type_enforce<
		ReturnType< $mol_date['next'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__1IQ2LFI8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub__NYAHBP8C = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_date_calendar__enabled__DOKVYX1I = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_date_calendar['enabled'] >
	>
	type $mol_date_calendar__month_moment__123V28UP = $mol_type_enforce<
		ReturnType< $mol_date['month_moment'] >
		,
		ReturnType< $mol_date_calendar['month_moment'] >
	>
	type $mol_date_calendar__day_selected__5L28QZJF = $mol_type_enforce<
		ReturnType< $mol_date['day_selected'] >
		,
		ReturnType< $mol_date_calendar['day_selected'] >
	>
	type $mol_date_calendar__day_click__EEFHGIVI = $mol_type_enforce<
		ReturnType< $mol_date['day_click'] >
		,
		ReturnType< $mol_date_calendar['day_click'] >
	>
	type $mol_date_calendar__head__86YC8LRM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_date_calendar['head'] >
	>
	export class $mol_date extends $mol_pick {
		enabled( ): boolean
		today_click( next?: any ): any
		Today_icon( ): $mol_icon_calendar_today
		Today( ): $mol_button_minor
		value( next?: string ): string
		value_changed( next?: ReturnType< ReturnType< $mol_date['Input'] >['value_changed'] > ): ReturnType< ReturnType< $mol_date['Input'] >['value_changed'] >
		input_mask( id: any): string
		Input( ): $mol_format
		clear( next?: any ): any
		Clear_icon( ): $mol_icon_trash_can_outline
		Clear( ): $mol_button_minor
		input_content( ): readonly(any)[]
		Input_row( ): $mol_view
		month_moment( ): ReturnType< $mol_date['value_moment'] >
		day_selected( id: any): boolean
		day_click( id: any, next?: any ): any
		Calendar_title( ): ReturnType< ReturnType< $mol_date['Calendar'] >['Title'] >
		prev_hint( ): string
		prev( next?: any ): any
		Prev_icon( ): $mol_icon_chevron_left
		Prev( ): $mol_button_minor
		next_hint( ): string
		next( next?: any ): any
		Next_icon( ): $mol_icon_chevron_right
		Next( ): $mol_button_minor
		Calendar_tools( ): $mol_view
		Calendar( ): $mol_date_calendar
		Icon( ): $mol_icon_calendar
		bubble_content( ): readonly(any)[]
		value_number( next?: number ): number
		value_moment( next?: $mol_time_moment ): $mol_time_moment
	}
	
	type $mol_button_minor__title__F6LP10LZ = $mol_type_enforce<
		ReturnType< $mol_date_calendar['day_text'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__event_click__AYV1SXQW = $mol_type_enforce<
		ReturnType< $mol_date_calendar['day_click'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__minimal_height__N49U24QZ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_button_minor['minimal_height'] >
	>
	type $mol_button_minor__enabled__UTW2SRA6 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	export class $mol_date_calendar extends $mol_calendar {
		day_click( id: any, next?: any ): any
		enabled( ): boolean
		Day_button( id: any): $mol_button_minor
		day_content( id: any): readonly(any)[]
	}
	
}

//# sourceMappingURL=date.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_date extends $.$mol_date {
        trigger_content(): (string | $mol_icon_calendar)[];
        input_mask(val: string): "____-__-__ __:__" | "____-__-__ ";
        input_content(): ($mol_button_minor | $.$mol_format)[];
        value(val?: string): string;
        value_moment(next?: $mol_time_moment): $mol_time_moment;
        value_number(next?: number): number;
        value_moment_today(): $mol_time_moment;
        clear(): void;
        month_moment(next?: $mol_time_moment): $mol_time_moment;
        day_selected(day: string): boolean;
        day_click(day: string): void;
        prev(): void;
        next(): void;
        today_click(): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    let $hyoo_crus_text_tokens: $mol_regexp<{
        [x: string]: string;
        readonly token: string;
        readonly link: string;
        readonly emoji: string;
        readonly 'line-break': string;
        readonly indents: string;
        readonly Word: string;
        readonly word: string;
        readonly spaces: string;
        readonly others: string;
        readonly space: string;
        readonly win_end: string;
        readonly mac_end: string;
    }>;
}

declare namespace $ {
    class $hyoo_crus_text extends $hyoo_crus_node {
        static tag: "keys" | "term" | "solo" | "vals";
        value(next?: string): string;
        text(next?: string): string;
        str(next?: string): string;
        write(next: string, str_from?: number, str_to?: number): this;
        point_by_offset(offset: number): readonly [string, number];
        offset_by_point([self, offset]: readonly [string, number]): readonly [string, number];
        selection(lord: $hyoo_crus_ref, next?: readonly [begin: number, end: number]): number[] | readonly [begin: number, end: number];
    }
}

declare namespace $ {
    const $hyoo_crus_entity_base: Omit<typeof $hyoo_crus_dict, "prototype"> & (new (...args: any[]) => $mol_type_override<$hyoo_crus_dict, {
        readonly Title: (auto?: any) => $hyoo_crus_atom_str | null;
    }>) & {
        schema: {
            [x: string]: typeof $hyoo_crus_node;
        } & {
            readonly Title: typeof $hyoo_crus_atom_str;
        };
    };
    export class $hyoo_crus_entity extends $hyoo_crus_entity_base {
    }
    export {};
}

declare namespace $ {

	type $hyoo_crus_gist_dump__land__TGN95MA7 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['land'] >
		,
		ReturnType< $hyoo_crus_gist_dump['land'] >
	>
	type $hyoo_crus_gist_dump__value__C7MBHKNW = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['ref_value'] >
		,
		ReturnType< $hyoo_crus_gist_dump['value'] >
	>
	type $mol_select__enabled__WZDJWOFN = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_select['enabled'] >
	>
	type $mol_select__value__FC6XBH5S = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['ref'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__options__MQ2IFBGB = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['ref_options'] >
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_select__option_label__XOAH9NWD = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['ref_label'] >
		,
		ReturnType< $mol_select['option_label'] >
	>
	type $mol_select__Filter__SWROTOLX = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__trigger_content__PJBOPYR4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_select['trigger_content'] >
	>
	type $mol_select__value__ONQ86PDL = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['ref_new'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__dictionary__YX2AV2IC = $mol_type_enforce<
		({ 
			'local': string,
			'orgy': string,
			'lobby': string,
			'public': string,
			'private': string,
		}) 
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $hyoo_crus_flex_form__enabled__UWBN836N = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $hyoo_crus_flex_form['enabled'] >
	>
	type $hyoo_crus_flex_form__node__RV360S7D = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['dict_node'] >
		,
		ReturnType< $hyoo_crus_flex_form['node'] >
	>
	type $hyoo_crus_gist_dump__land__JHXVYRJX = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['land'] >
		,
		ReturnType< $hyoo_crus_gist_dump['land'] >
	>
	type $hyoo_crus_gist_dump__gist__11MQV7FQ = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_gist'] >
		,
		ReturnType< $hyoo_crus_gist_dump['gist'] >
	>
	type $mol_drag__end__D32CQDMZ = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_item_drag_end'] >
		,
		ReturnType< $mol_drag['end'] >
	>
	type $mol_drag__transfer__P482AYJD = $mol_type_enforce<
		({ 
			'text/plain': ReturnType< $hyoo_crus_flex_field['list_item_value'] >,
			'text/html': ReturnType< $hyoo_crus_flex_field['list_item_html'] >,
			'text/uri-list': ReturnType< $hyoo_crus_flex_field['list_item_uri'] >,
		}) 
		,
		ReturnType< $mol_drag['transfer'] >
	>
	type $mol_drag__Sub__GCQNOYT8 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['List_item_dump'] >
		,
		ReturnType< $mol_drag['Sub'] >
	>
	type $mol_drop__adopt__51C9G6RI = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_item_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive__ODW51BQY = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_item_receive'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__allow__EQP547JS = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_drop['allow'] >
	>
	type $mol_drop__Sub__ZACCQV0K = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['List_item_drag'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_select__enabled__K4KEQQPC = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_select['enabled'] >
	>
	type $mol_select__value__MDSNU6US = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_pick'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__options__Z2CUEL23 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['ref_options'] >
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_select__option_label__RZS5FGR4 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['ref_label'] >
		,
		ReturnType< $mol_select['option_label'] >
	>
	type $mol_button_minor__enabled__XJ6A4GKZ = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__4X5FYEZG = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_item_add'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__VUWTIC1Q = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_view__sub__YG1W9EJC = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_items'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_drop__adopt__F6R5I2GR = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_item_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive__JWR2WWBP = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['list_receive'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__allow__3C1GNQ6P = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_drop['allow'] >
	>
	type $mol_drop__Sub__1JWWUEWC = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['List_items'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_select__enabled__HG2WYJB5 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_select['enabled'] >
	>
	type $mol_select__value__FB12OE8W = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enum'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__options__OC3AR84Y = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enum_options'] >
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_select__option_label__IBMPUR4M = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enum_label'] >
		,
		ReturnType< $mol_select['option_label'] >
	>
	type $mol_check_box__enabled__9C85K20T = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	type $mol_check_box__checked__O6FTMP12 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['bool'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_number__enabled__05SPGF37 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_number['enabled'] >
	>
	type $mol_number__value__CGQH49W8 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['int'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__enabled__TDLGMIX4 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_number['enabled'] >
	>
	type $mol_number__value__JYPCR6EQ = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['real'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_bar__sub__9E0EAZKE = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['ref_content'] >
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_textarea__enabled__7IUCP08Z = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_textarea['enabled'] >
	>
	type $mol_textarea__value__M8HHOBDR = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['str'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_date__enabled__KB2FV9TE = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_date['enabled'] >
	>
	type $mol_date__value_moment__3XVRT3EO = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['time'] >
		,
		ReturnType< $mol_date['value_moment'] >
	>
	type $mol_expander__title__1KIN4ARJ = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['dict_title'] >
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content__I85VNERD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	type $mol_textarea__enabled__ODL30TWR = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['enabled'] >
		,
		ReturnType< $mol_textarea['enabled'] >
	>
	type $mol_textarea__value__7KO4SFCH = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_field['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	export class $hyoo_crus_flex_field extends $mol_view {
		Sub( ): $mol_view
		enabled( ): boolean
		enum( next?: any ): any
		enum_options( ): readonly(any)[]
		enum_label( id: any): string
		bool( next?: boolean ): boolean
		int( next?: number ): number
		real( next?: number ): number
		ref_value( ): any
		Ref_dump( ): $hyoo_crus_gist_dump
		ref( next?: any ): any
		ref_options( ): readonly(any)[]
		ref_label( id: any): string
		Ref_pick( ): $mol_select
		Ref_new_icon( ): $mol_icon_plus
		ref_new( next?: any ): any
		Ref_new( ): $mol_select
		ref_content( ): readonly(any)[]
		str( next?: string ): string
		time( next?: $mol_time_moment ): $mol_time_moment
		dict_title( ): string
		dict_node( ): $hyoo_crus_dict
		Dict_form( ): $hyoo_crus_flex_form
		text( next?: string ): string
		list_item_adopt( next?: any ): any
		list_receive( next?: any ): any
		list_item_receive( id: any, next?: any ): any
		list_item_drag_end( id: any, next?: any ): any
		list_item_value( id: any): string
		list_item_html( id: any): string
		list_item_uri( id: any): string
		list_gist( id: any): $hyoo_crus_gist
		List_item_dump( id: any): $hyoo_crus_gist_dump
		List_item_drag( id: any): $mol_drag
		List_item_drop( id: any): $mol_drop
		List_item( id: any): ReturnType< $hyoo_crus_flex_field['List_item_drop'] >
		list_pick( next?: any ): any
		List_pick( ): $mol_select
		list_item_add( next?: any ): any
		List_item_add( ): $mol_button_minor
		list_items( ): readonly(any)[]
		List_items( ): $mol_view
		List_drop( ): $mol_drop
		sub( ): readonly(any)[]
		node( next?: $hyoo_crus_node ): $hyoo_crus_node
		land( ): ReturnType< ReturnType< $hyoo_crus_flex_field['node'] >['land'] >
		prop( ): $hyoo_crus_flex_prop
		Enum( ): $mol_select
		Bool( ): $mol_check_box
		Int( ): $mol_number
		Real( ): $mol_number
		Ref( ): $mol_bar
		Str( ): $mol_textarea
		Time( ): $mol_date
		Dict( ): $mol_expander
		Text( ): $mol_textarea
		List( ): ReturnType< $hyoo_crus_flex_field['List_drop'] >
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_flex_field extends $.$hyoo_crus_flex_field {
        dict_node(): $hyoo_crus_dict;
        Sub(): $.$mol_select | $.$mol_expander | $.$mol_drop | $.$mol_number | $.$mol_textarea | $.$mol_date | $mol_check_box | $mol_bar;
        enum(next?: $hyoo_crus_vary_type): string | number | bigint | boolean | Node | Uint8Array | (symbol & {
            $hyoo_crus_ref: symbol;
        }) | $mol_time_moment | $mol_time_duration | $mol_time_interval | $mol_tree2 | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        enum_options(): readonly $hyoo_crus_vary_type[];
        enum_label(option: $hyoo_crus_vary_type): string;
        bool(next?: boolean): boolean;
        int(next?: number): number;
        real(next?: number): number;
        str(next?: string): string;
        time(next?: $mol_time_moment): $mol_time_moment;
        ref(next?: $hyoo_crus_ref): null;
        ref_content(): ($.$mol_select | $.$hyoo_crus_gist_dump)[];
        ref_value(): string | number | bigint | boolean | Node | Uint8Array | (symbol & {
            $hyoo_crus_ref: symbol;
        }) | $mol_time_moment | $mol_time_duration | $mol_time_interval | $mol_tree2 | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | readonly (string | number | boolean | {
            [x: string]: string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | readonly (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        } | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
        ref_options(): readonly $hyoo_crus_vary_type[];
        ref_label(ref: $hyoo_crus_vary_type): string;
        ref_remote(): $hyoo_crus_dict;
        ref_new(rights?: string): null;
        text(next?: string): string;
        dict_title(): string;
        list_items(): ($mol_button_minor | $.$mol_select | $.$mol_drop)[];
        list_pick(next?: $hyoo_crus_ref): null;
        list_item_add(): void;
        list_gist(gist: $hyoo_crus_gist): $hyoo_crus_gist;
        list_item_value(gist: $hyoo_crus_gist): string;
        list_item_adopt(transfer: DataTransfer): string | (symbol & {
            $hyoo_crus_ref: symbol;
        }) | null;
        list_item_receive(gist: $hyoo_crus_gist, value: string): void;
        list_receive(value: string): void;
        list_item_drag_end(gist: $hyoo_crus_gist, event: DragEvent): void;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
}

declare namespace $ {

	type $mol_view__minimal_height__6VCC3D8B = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__589LVS5E = $mol_type_enforce<
		ReturnType< $mol_labeler['label'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height__PKO6P3QQ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__3O133MNS = $mol_type_enforce<
		ReturnType< $mol_labeler['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_labeler extends $mol_list {
		label( ): readonly($mol_view_content)[]
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_view
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=labeler.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub__3M7KSYI2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_form_field extends $mol_labeler {
		name( ): string
		bid( ): string
		Bid( ): $mol_view
		control( ): any
		bids( ): readonly(string)[]
		label( ): readonly(any)[]
		content( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_form_field extends $.$mol_form_field {
        bid(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_row extends $mol_view {
	}
	
}

//# sourceMappingURL=row.view.tree.d.ts.map
declare namespace $ {

	type $mol_list__sub__XQHEDPK7 = $mol_type_enforce<
		ReturnType< $mol_form['body'] >
		,
		ReturnType< $mol_list['sub'] >
	>
	type $mol_row__sub__EASNLVB4 = $mol_type_enforce<
		ReturnType< $mol_form['foot'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_form extends $mol_list {
		keydown( next?: any ): any
		form_fields( ): readonly($mol_form_field)[]
		body( ): ReturnType< $mol_form['form_fields'] >
		Body( ): $mol_list
		buttons( ): readonly($mol_view)[]
		foot( ): ReturnType< $mol_form['buttons'] >
		Foot( ): $mol_row
		submit_allowed( ): boolean
		submit_blocked( ): boolean
		event( ): ({ 
			keydown( next?: ReturnType< $mol_form['keydown'] > ): ReturnType< $mol_form['keydown'] >,
		})  & ReturnType< $mol_list['event'] >
		submit( next?: any ): any
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_form extends $.$mol_form {
        form_fields(): readonly $mol_form_field[];
        submit_allowed(): boolean;
        submit_blocked(): boolean;
        keydown(next: KeyboardEvent): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $hyoo_crus_flex_field__node__YQ34CVHR = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_form['field_node'] >
		,
		ReturnType< $hyoo_crus_flex_field['node'] >
	>
	type $hyoo_crus_flex_field__prop__NI1GFHIN = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_form['field_prop'] >
		,
		ReturnType< $hyoo_crus_flex_field['prop'] >
	>
	type $hyoo_crus_flex_field__enabled__0ZB6A5R3 = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_form['enabled'] >
		,
		ReturnType< $hyoo_crus_flex_field['enabled'] >
	>
	type $mol_view__sub__5APROERG = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_form_field__name__URAQ5WPO = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_form['field_name'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content__XCLJD26Z = $mol_type_enforce<
		ReturnType< $hyoo_crus_flex_form['Field_content'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	export class $hyoo_crus_flex_form extends $mol_list {
		field_name( id: any): string
		field_node( id: any, next?: $hyoo_crus_node ): $hyoo_crus_node
		field_prop( id: any): $hyoo_crus_flex_prop
		enabled( ): boolean
		Field_control( id: any): $hyoo_crus_flex_field
		Field_content( id: any): $mol_view
		Field( id: any): $mol_form_field
		fields( ): readonly(any)[]
		node( ): $hyoo_crus_dict
		kind( ): $hyoo_crus_flex_kind
		rows( ): ReturnType< $hyoo_crus_flex_form['fields'] >
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_flex_form extends $.$hyoo_crus_flex_form {
        kind(): $hyoo_crus_flex_kind;
        fields(): $.$mol_form_field[];
        field_name(prop: $hyoo_crus_flex_prop): string;
        field_node(prop: $hyoo_crus_flex_prop, auto?: any): $hyoo_crus_node;
        field_prop(prop: $hyoo_crus_flex_prop): $hyoo_crus_flex_prop;
        enabled(): boolean;
    }
}

declare namespace $ {

	type $mol_paragraph__sub__4KGPWXC6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_textarea__enabled__OB3JH245 = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['can_change'] >
		,
		ReturnType< $mol_textarea['enabled'] >
	>
	type $mol_textarea__hint__L4X8OMVJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__26PZIETR = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['key_new'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__submit__LYF5ZHN6 = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['add_key'] >
		,
		ReturnType< $mol_textarea['submit'] >
	>
	type $mol_textarea__enabled__5ECN13LZ = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['can_change'] >
		,
		ReturnType< $mol_textarea['enabled'] >
	>
	type $mol_textarea__hint__G342NUMT = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__P6IANDJO = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['value_new'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__submit__Q4FURGHZ = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['add_value'] >
		,
		ReturnType< $mol_textarea['submit'] >
	>
	type $mol_textarea__enabled__BW0IIIM7 = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['can_change'] >
		,
		ReturnType< $mol_textarea['enabled'] >
	>
	type $mol_textarea__value__IK1JDT2E = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__enabled__TT8R6YW1 = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['can_change'] >
		,
		ReturnType< $mol_textarea['enabled'] >
	>
	type $mol_textarea__value__Z48LB0QU = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['value_str'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $hyoo_crus_gist_dump__land__LHQFBTS2 = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['land'] >
		,
		ReturnType< $hyoo_crus_gist_dump['land'] >
	>
	type $hyoo_crus_gist_dump__gist__8GPJOBNL = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['unit_value'] >
		,
		ReturnType< $hyoo_crus_gist_dump['gist'] >
	>
	type $mol_select__value__ZY21MPUR = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['unit_tip'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__enabled__V82QX10J = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['can_change'] >
		,
		ReturnType< $mol_select['enabled'] >
	>
	type $mol_select__dictionary__MIAKXIFP = $mol_type_enforce<
		({ 
			'bin': string,
			'bool': string,
			'int': string,
			'real': string,
			'ref': string,
			'str': string,
			'time': string,
			'dur': string,
			'range': string,
			'json': string,
			'jsan': string,
			'xml': string,
			'tree': string,
		}) 
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_select__value__P2HLR4DN = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['unit_tag'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__enabled__GX6BQD4M = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['can_change'] >
		,
		ReturnType< $mol_select['enabled'] >
	>
	type $mol_select__dictionary__3U8H0XUN = $mol_type_enforce<
		({ 
			'term': string,
			'solo': string,
			'vals': string,
			'keys': string,
		}) 
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_view__sub__QS0RWS87 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__sub__RCS2YMOW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__enabled__BD1PR1D4 = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['can_change'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__WPM18THK = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['unit_wipe'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $hyoo_crus_node_dump__tag__YRJAGTWX = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['unit_tag'] >
		,
		ReturnType< $hyoo_crus_node_dump['tag'] >
	>
	type $hyoo_crus_node_dump__addons__PPRSCXTS = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['node_addons'] >
		,
		ReturnType< $hyoo_crus_node_dump['addons'] >
	>
	type $hyoo_crus_node_dump__node__F49JLMSV = $mol_type_enforce<
		ReturnType< $hyoo_crus_node_dump['node_inner'] >
		,
		ReturnType< $hyoo_crus_node_dump['node'] >
	>
	type $mol_view__sub__2XY17YCP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__OEDBI42K = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $hyoo_crus_node_dump extends $mol_expander {
		can_change( ): ReturnType< ReturnType< $hyoo_crus_node_dump['node'] >['can_change'] >
		land( ): ReturnType< ReturnType< $hyoo_crus_node_dump['node'] >['land'] >
		title( ): string
		Head( ): $mol_paragraph
		key_new( next?: string ): string
		add_key( next?: any ): any
		Add_key( ): $mol_textarea
		value_new( next?: string ): string
		add_value( next?: any ): any
		Add_value( ): $mol_textarea
		text( next?: string ): string
		Value_text( ): $mol_textarea
		value_str( next?: string ): string
		Value_str( ): $mol_textarea
		unit_value( id: any): any
		Unit_value( id: any): $hyoo_crus_gist_dump
		unit_tip( id: any, next?: string ): string
		Unit_tip( id: any): $mol_select
		unit_tag( id: any, next?: string ): string
		Unit_tag( id: any): $mol_select
		unit_time( id: any): string
		Unit_time( id: any): $mol_view
		Unit_wipe_icon( id: any): $mol_icon_close
		unit_wipe( id: any, next?: any ): any
		Unit_wipe( id: any): $mol_button_minor
		node_addons( id: any): readonly(any)[]
		node_inner( id: any): $hyoo_crus_node
		Node_inner( id: any): $hyoo_crus_node_dump
		Inner( id: any): $mol_view
		nodes( ): readonly(any)[]
		node( ): $hyoo_crus_node
		tag( ): string
		label( ): readonly(any)[]
		addons( ): readonly(any)[]
		Tools( ): $mol_view
		editors( ): readonly(any)[]
		content( ): ReturnType< $hyoo_crus_node_dump['nodes'] >
	}
	
}

//# sourceMappingURL=dump.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_node_dump extends $.$hyoo_crus_node_dump {
        title(): string;
        value(): $hyoo_crus_vary_type;
        items(): readonly $hyoo_crus_vary_type[];
        nodes(): $mol_view[];
        unit_tag(index: number, next?: keyof typeof $hyoo_crus_gist_tag): "keys" | "term" | "solo" | "vals";
        unit_tip(index: number, next?: keyof typeof $hyoo_crus_vary_tip): "ref" | "nil" | "bin" | "bool" | "int" | "real" | "str" | "time" | "dur" | "range" | "json" | "jsan" | "dom" | "tree";
        unit_time(index: number): string;
        unit_value(index: number): $hyoo_crus_gist;
        unit_wipe(index: number, event?: Event): void;
        node_inner(index: number): $hyoo_crus_node;
        add_key(event: Event): void;
        add_value(event: Event): void;
        value_str(next?: string): string;
        text(next?: string): string;
        editors(): $.$mol_textarea[];
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	export class $mol_icon_source extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=source.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_source_fork extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=fork.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_download extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=download.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_button_download extends $.$mol_button_download {
        uri(): string;
        click(): void;
    }
}

declare namespace $ {

	export class $mol_button_download extends $mol_button_minor {
		Icon( ): $mol_icon_download
		title( ): string
		blob( ): any
		uri( ): string
		file_name( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=download.view.tree.d.ts.map
declare namespace $ {
    class $mol_after_work extends $mol_object2 {
        delay: number;
        task: () => void;
        id: any;
        constructor(delay: number, task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    function $mol_wait_rest_async(this: $): Promise<unknown>;
    function $mol_wait_rest(this: $): unknown;
}

declare namespace $ {
    enum $mol_si_prefix {
        y = -8,
        z = -7,
        a = -6,
        f = -5,
        p = -4,
        n = -3,
        µ = -2,
        m = -1,
        '' = 0,
        k = 1,
        M = 2,
        G = 3,
        T = 4,
        P = 5,
        E = 6,
        Z = 7,
        Y = 8
    }
}

declare namespace $ {
    function $mol_si_short(numb: number, unit?: string): string;
}

declare namespace $ {

	type $mol_check_icon__hint__4HPR6VG7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon__OR77J088 = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['Encrypted_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__ZPDP536F = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['encrypted'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__enabled__AKB0IC87 = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['encrypted'] >
		,
		ReturnType< $mol_check_icon['enabled'] >
	>
	type $hyoo_crus_flex_form__node__AJ3Z5IWQ = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['node'] >
		,
		ReturnType< $hyoo_crus_flex_form['node'] >
	>
	type $hyoo_crus_node_dump__title__N4JF9XRZ = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_crus_node_dump['title'] >
	>
	type $hyoo_crus_node_dump__node__2YI22MKL = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['node'] >
		,
		ReturnType< $hyoo_crus_node_dump['node'] >
	>
	type $hyoo_crus_node_dump__title__ZCJKRRO0 = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_crus_node_dump['title'] >
	>
	type $hyoo_crus_node_dump__node__KFEE95FD = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['node_meta'] >
		,
		ReturnType< $hyoo_crus_node_dump['node'] >
	>
	type $mol_list__rows__X22QO2W7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_labeler__Content__RTTH4X6X = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['Raw_content'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_button_minor__hint__67QN1RV3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub__BPHKNAGD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click__3DTO5KFL = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['fork'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_view__sub__U71DH7EM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_download__hint__AUSIQGG5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_download['hint'] >
	>
	type $mol_button_download__blob__Z9RTC71T = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['dump'] >
		,
		ReturnType< $mol_button_download['blob'] >
	>
	type $mol_button_download__file_name__9GGYV8LV = $mol_type_enforce<
		ReturnType< $hyoo_crus_land_page['dump_name'] >
		,
		ReturnType< $mol_button_download['file_name'] >
	>
	type $mol_view__sub__XOS10Q3X = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $hyoo_crus_land_page extends $mol_page {
		Encrypted_icon( ): $mol_icon_lock
		encrypted( ): boolean
		Encrypted( ): $mol_check_icon
		Close( ): any
		Flex( ): $hyoo_crus_flex_form
		Raw_data( ): $hyoo_crus_node_dump
		node_meta( ): $hyoo_crus_node
		Raw_meta( ): $hyoo_crus_node_dump
		Raw_content( ): $mol_list
		Raw( ): $mol_labeler
		Fork_icon( ): $mol_icon_source_fork
		fork( next?: any ): any
		Fork( ): $mol_button_minor
		size( ): string
		Size( ): $mol_view
		dump( ): $mol_blob
		dump_name( ): string
		Dump( ): $mol_button_download
		Dumping( ): $mol_view
		land( ): $hyoo_crus_land
		node( ): $hyoo_crus_dict
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
		foot( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_land_page extends $.$hyoo_crus_land_page {
        title(): string;
        theme(): "$mol_theme_special" | null;
        encrypted(): boolean;
        node_meta(): $hyoo_crus_node;
        dump_data_node(): $hyoo_crus_dict;
        fork(): void;
        pack(): $hyoo_crus_pack | null;
        size(): string;
        dump(): Blob;
        dump_name(): string;
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	export class $mol_icon_delete extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=delete.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_delete_forever extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=forever.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_upload extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=upload.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_open_native__files__BRYP3Q0A = $mol_type_enforce<
		ReturnType< $mol_button_open['files'] >
		,
		ReturnType< $mol_button_open_native['files'] >
	>
	type $mol_button_open_native__accept__5GACHKYR = $mol_type_enforce<
		ReturnType< $mol_button_open['accept'] >
		,
		ReturnType< $mol_button_open_native['accept'] >
	>
	type $mol_button_open_native__multiple__OZNI02AI = $mol_type_enforce<
		ReturnType< $mol_button_open['multiple'] >
		,
		ReturnType< $mol_button_open_native['multiple'] >
	>
	export class $mol_button_open extends $mol_button_minor {
		Icon( ): $mol_icon_upload
		files( next?: readonly(any)[] ): readonly(any)[]
		accept( ): string
		multiple( ): boolean
		Native( ): $mol_button_open_native
		sub( ): readonly(any)[]
	}
	
	export class $mol_button_open_native extends $mol_view {
		accept( ): string
		multiple( ): boolean
		picked( next?: any ): any
		dom_name( ): string
		files( next?: readonly(any)[] ): readonly(any)[]
		attr( ): ({ 
			'type': string,
			'accept': ReturnType< $mol_button_open_native['accept'] >,
			'multiple': ReturnType< $mol_button_open_native['multiple'] >,
		}) 
		event( ): ({ 
			change( next?: ReturnType< $mol_button_open_native['picked'] > ): ReturnType< $mol_button_open_native['picked'] >,
		}) 
	}
	
}

//# sourceMappingURL=open.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_button_open_native extends $.$mol_button_open_native {
        dom_node(): HTMLInputElement;
        picked(): void;
    }
}

declare namespace $ {
}

declare namespace $ {

	export class $hyoo_crus_land_grab extends $mol_select {
		Trigger_icon( ): $mol_icon_plus
		Filter( ): any
		trigger_content( ): readonly(any)[]
		dictionary( ): ({ 
			'orgy': string,
			'lobby': string,
			'public': string,
			'private': string,
		}) 
		grab( next?: $hyoo_crus_rank_preset | null ): $hyoo_crus_rank_preset | null
	}
	
}

//# sourceMappingURL=grab.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_land_grab extends $.$hyoo_crus_land_grab {
        value(rights?: string): string;
    }
}

declare namespace $ {

	type $hyoo_crus_land_page__land__O3XXUPS3 = $mol_type_enforce<
		ReturnType< $hyoo_crus_realm_book['land'] >
		,
		ReturnType< $hyoo_crus_land_page['land'] >
	>
	type $hyoo_crus_land_page__node__KELZRZIY = $mol_type_enforce<
		ReturnType< $hyoo_crus_realm_book['node'] >
		,
		ReturnType< $hyoo_crus_land_page['node'] >
	>
	type $hyoo_crus_land_page__Close__V83YBKVH = $mol_type_enforce<
		ReturnType< $hyoo_crus_realm_book['Spread_close'] >
		,
		ReturnType< $hyoo_crus_land_page['Close'] >
	>
	type $mol_pick__hint__INLGNEVJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__clicks__8XKX55PJ = $mol_type_enforce<
		ReturnType< $hyoo_crus_realm_book['wipe'] >
		,
		ReturnType< $mol_pick['clicks'] >
	>
	type $mol_pick__align_hor__90YFLE78 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align_hor'] >
	>
	type $mol_pick__trigger_content__E0PUKZ1C = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content__MWZUMCT6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_button_open__hint__0SWOEQ71 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_open['hint'] >
	>
	type $mol_button_open__files__1WF1XX21 = $mol_type_enforce<
		ReturnType< $hyoo_crus_realm_book['update'] >
		,
		ReturnType< $mol_button_open['files'] >
	>
	type $hyoo_crus_land_grab__hint__ZI17Q8UE = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_crus_land_grab['hint'] >
	>
	type $hyoo_crus_land_grab__align_hor__L289EJE2 = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_crus_land_grab['align_hor'] >
	>
	type $hyoo_crus_land_grab__grab__IEKPOT2D = $mol_type_enforce<
		ReturnType< $hyoo_crus_realm_book['land_add'] >
		,
		ReturnType< $hyoo_crus_land_grab['grab'] >
	>
	export class $hyoo_crus_realm_book extends $mol_book2_catalog {
		land( id: any): $hyoo_crus_land
		node( id: any): $hyoo_crus_dict
		Land( id: any): $hyoo_crus_land_page
		wipe( next?: any ): any
		Wipe_icon( ): $mol_icon_delete_forever
		Wipe_pick( ): $mol_pick
		update( next?: readonly(any)[] ): readonly(any)[]
		Update( ): $mol_button_open
		land_add( next?: $hyoo_crus_rank_preset | null ): $hyoo_crus_rank_preset | null
		Land_add( ): $hyoo_crus_land_grab
		menu_title( ): string
		param( ): string
		realm( ): $hyoo_crus_realm
		Spread( id: any): ReturnType< $hyoo_crus_realm_book['Land'] >
		menu_foot( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=book.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_realm_book extends $.$hyoo_crus_realm_book {
        spread_ids(): string[];
        land(id: string): $hyoo_crus_land;
        node(id: string): $hyoo_crus_dict;
        spread_title(id: string): string;
        land_add(preset: $hyoo_crus_rank_preset): null;
        update(files: File[]): never[];
        wipe(): Promise<void>;
    }
}

declare namespace $.$$ {
}

declare namespace $ {

	export class $mol_icon_play extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=play.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__hint__THUZENLC = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__LR7VG5T5 = $mol_type_enforce<
		ReturnType< $hyoo_crus_auth_slot['prefix'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__submit__UF6R6JMS = $mol_type_enforce<
		ReturnType< $hyoo_crus_auth_slot['run'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_check_icon__Icon__TMPXKGCX = $mol_type_enforce<
		ReturnType< $hyoo_crus_auth_slot['Run_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__MXEW2A0V = $mol_type_enforce<
		ReturnType< $hyoo_crus_auth_slot['running'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__enabled__1JI3FC8B = $mol_type_enforce<
		ReturnType< $hyoo_crus_auth_slot['run_enabled'] >
		,
		ReturnType< $mol_check_icon['enabled'] >
	>
	type $mol_check_icon__label__HM503S9N = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check_icon['label'] >
	>
	type $mol_bar__sub__20LS0V1G = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_button_copy__title__LNI0EG1V = $mol_type_enforce<
		ReturnType< $hyoo_crus_auth_slot['ref'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__text__P5D383JK = $mol_type_enforce<
		ReturnType< $hyoo_crus_auth_slot['key'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	type $mol_list__rows__42CW6GKT = $mol_type_enforce<
		ReturnType< $hyoo_crus_auth_slot['keys'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $hyoo_crus_auth_slot extends $mol_page {
		prefix( next?: string ): string
		run( next?: any ): any
		Prefix( ): $mol_string
		Run_icon( ): $mol_icon_play
		running( next?: boolean ): boolean
		run_enabled( ): boolean
		Running( ): $mol_check_icon
		Input( ): $mol_bar
		ref( id: any): string
		key( id: any): string
		Key( id: any): $mol_button_copy
		keys( ): readonly(any)[]
		Keys( ): $mol_list
		title( ): string
		realm( ): $hyoo_crus_realm
		found( id: any, next?: readonly(string)[] ): readonly(string)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=slot.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_auth_slot extends $.$hyoo_crus_auth_slot {
        prefix(next?: string): string;
        found(prefix: string, next?: readonly string[]): readonly string[];
        run(): void;
        running(next?: boolean): boolean;
        run_enabled(): boolean;
        grabbing(): number | null;
        keys(): $.$mol_button_copy[];
        ref(index: number): string;
        key(index: number): string;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
}

declare namespace $ {

	export class $mol_string_button extends $mol_string {
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_directions extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=directions.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_directions_fork extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=fork.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_plus_box extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=box.view.tree.d.ts.map
declare namespace $ {
    function $mol_lights(this: $, next?: boolean): boolean;
}

declare namespace $ {

	export class $mol_icon_brightness_6 extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=6.view.tree.d.ts.map
declare namespace $ {

	export class $mol_lights_toggle extends $mol_check_icon {
		Lights_icon( ): $mol_icon_brightness_6
		lights( next?: boolean ): boolean
		Icon( ): ReturnType< $mol_lights_toggle['Lights_icon'] >
		hint( ): string
		checked( next?: ReturnType< $mol_lights_toggle['lights'] > ): ReturnType< $mol_lights_toggle['lights'] >
	}
	
}

//# sourceMappingURL=toggle.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_lights_toggle extends $.$mol_lights_toggle {
        lights(next?: boolean): boolean;
    }
}

declare let $hyoo_sync_revision: string;

declare namespace $ {
    type $mol_int62_string = `${string}_${string}`;
    function $mol_int62_string_ensure(str: unknown): `${string}_${string}` | null;
    type $mol_int62_pair = {
        readonly lo: number;
        readonly hi: number;
    };
    const $mol_int62_max: number;
    const $mol_int62_min: number;
    const $mol_int62_range: number;
    function $mol_int62_to_string({ lo, hi }: $mol_int62_pair): `${string}_${string}`;
    function $mol_int62_from_string(str: string): null | $mol_int62_pair;
    function $mol_int62_compare(left_lo: number, left_hi: number, right_lo: number, right_hi: number): number;
    function $mol_int62_inc(lo: number, hi: number, max?: number): $mol_int62_pair;
    function $mol_int62_random(): $mol_int62_pair;
    function $mol_int62_hash_string(str: string): `${string}_${string}`;
    function $mol_int62_hash_buffer(buf: Uint8Array, seed?: {
        lo: number;
        hi: number;
    }): $mol_int62_pair;
}

declare namespace $ {
    function $mol_data_setup<Value extends $mol_data_value, Config = never>(value: Value, config: Config): Value & {
        config: Config;
        Value: ReturnType<Value>;
    };
}

declare namespace $ {
    class $mol_error_mix<Cause extends {} = {}> extends AggregateError {
        readonly cause: Cause;
        name: string;
        constructor(message: string, cause?: Cause, ...errors: Error[]);
        static [Symbol.toPrimitive](): string;
        static toString(): string;
        static make(...params: ConstructorParameters<typeof $mol_error_mix>): $mol_error_mix<{}>;
    }
}

declare namespace $ {
    class $mol_data_error extends $mol_error_mix {
    }
}

declare namespace $ {
    function $mol_data_enum<Dict extends Record<number | string, number | string>>(name: string, dict: Dict): ((value: Dict[keyof Dict]) => Dict[keyof Dict]) & {
        config: {
            name: string;
            dict: Dict;
        };
        Value: Dict[keyof Dict];
    };
}

declare namespace $ {
    function $mol_crypto_auditor_pair(this: $): Promise<{
        public: $mol_crypto_auditor_public;
        private: $mol_crypto_auditor_private;
    }>;
    class $mol_crypto_auditor_public extends Object {
        readonly native: CryptoKey & {
            type: 'public';
        };
        static size_str: number;
        static size_bin: number;
        constructor(native: CryptoKey & {
            type: 'public';
        });
        static from(serial: string | Uint8Array): Promise<$mol_crypto_auditor_public>;
        serial(): Promise<string>;
        toArray(): Promise<Uint8Array>;
        verify(data: BufferSource, sign: BufferSource): Promise<boolean>;
    }
    class $mol_crypto_auditor_private extends Object {
        readonly native: CryptoKey & {
            type: 'private';
        };
        static size_str: number;
        static size_bin: number;
        constructor(native: CryptoKey & {
            type: 'private';
        });
        static from(serial: string | Uint8Array): Promise<$mol_crypto_auditor_private>;
        serial(): Promise<string>;
        toArray(): Promise<Uint8Array>;
        sign(data: BufferSource): Promise<ArrayBuffer>;
        public(): Promise<$mol_crypto_auditor_public>;
    }
    const $mol_crypto_auditor_sign_size = 64;
    function $mol_crypto_auditor_private_to_public(serial: string): string;
}

declare namespace $ {
    enum $hyoo_crowd_peer_level {
        get = 0,
        add = 1,
        mod = 2,
        law = 3
    }
    class $hyoo_crowd_peer extends Object {
        readonly key_public: $mol_crypto_auditor_public;
        readonly key_public_serial: string;
        readonly key_private: $mol_crypto_auditor_private;
        readonly key_private_serial: string;
        id: $mol_int62_string;
        constructor(key_public: $mol_crypto_auditor_public, key_public_serial: string, key_private: $mol_crypto_auditor_private, key_private_serial: string);
        static generate(): Promise<$hyoo_crowd_peer>;
        static restore(serial: string): Promise<$hyoo_crowd_peer>;
    }
}

declare namespace $ {
    type $hyoo_crowd_unit_id = `${$mol_int62_string}!${$mol_int62_string}`;
    enum $hyoo_crowd_unit_kind {
        grab = 0,
        join = 1,
        give = 2,
        data = 3
    }
    enum $hyoo_crowd_unit_group {
        auth = 0,
        data = 1
    }
    class $hyoo_crowd_unit extends Object {
        readonly land: $mol_int62_string;
        readonly auth: $mol_int62_string;
        readonly head: $mol_int62_string;
        readonly self: $mol_int62_string;
        readonly next: $mol_int62_string;
        readonly prev: $mol_int62_string;
        readonly time: number;
        readonly data: unknown;
        bin: $hyoo_crowd_unit_bin | null;
        constructor(land: $mol_int62_string, auth: $mol_int62_string, head: $mol_int62_string, self: $mol_int62_string, next: $mol_int62_string, prev: $mol_int62_string, time: number, data: unknown, bin: $hyoo_crowd_unit_bin | null);
        kind(): $hyoo_crowd_unit_kind;
        group(): $hyoo_crowd_unit_group;
        level(): $hyoo_crowd_peer_level;
        [Symbol.toPrimitive](): string;
    }
    class $hyoo_crowd_unit_bin extends DataView {
        static from_buffer(buffer: Int16Array): $hyoo_crowd_unit_bin;
        static from_unit(unit: $hyoo_crowd_unit): $hyoo_crowd_unit_bin;
        sign(next?: Uint8Array): Uint8Array;
        size(): number;
        sens(): Uint8Array;
        unit(): $hyoo_crowd_unit;
    }
    function $hyoo_crowd_unit_compare(left: $hyoo_crowd_unit, right: $hyoo_crowd_unit): number;
}

declare namespace $ {
    function $hyoo_sync_peer(path: string, next?: string): Promise<$hyoo_crowd_peer>;
}

declare namespace $ {
    function $hyoo_crowd_time_now(): number;
    function $hyoo_crowd_time_stamp(time: number): number;
}

declare namespace $ {
    class $hyoo_crowd_clock extends Map<$mol_int62_string, number> {
        static begin: number;
        last_time: number;
        constructor(entries?: Iterable<readonly [$mol_int62_string, number]>);
        sync(right: $hyoo_crowd_clock): void;
        see_time(time: number): void;
        see_peer(peer: $mol_int62_string, time: number): void;
        see_bin(bin: $hyoo_crowd_clock_bin, group: $hyoo_crowd_unit_group): void;
        fresh(peer: $mol_int62_string, time: number): boolean;
        ahead(clock: $hyoo_crowd_clock): boolean;
        time(peer: $mol_int62_string): number;
        now(): number;
        last_stamp(): number;
        tick(peer: $mol_int62_string): number;
    }
    class $hyoo_crowd_clock_bin extends DataView {
        static from(land_id: $mol_int62_string, clocks: readonly [$hyoo_crowd_clock, $hyoo_crowd_clock], count: number): $hyoo_crowd_clock_bin;
        land(): `${string}_${string}`;
        count(): number;
    }
}

declare namespace $ {
    class $hyoo_crowd_node extends $mol_object2 {
        readonly land: $hyoo_crowd_land;
        readonly head: $mol_int62_string;
        constructor(land?: $hyoo_crowd_land, head?: $mol_int62_string);
        static for<Node extends typeof $hyoo_crowd_node>(this: Node, land: $hyoo_crowd_land, head: $mol_int62_string): InstanceType<Node>;
        static toJSON(): string;
        id(): `${string}_${string}`;
        world(): $hyoo_crowd_world | null;
        as<Node extends typeof $hyoo_crowd_node>(Node: Node): InstanceType<Node>;
        units(): readonly $hyoo_crowd_unit[];
        nodes<Node extends typeof $hyoo_crowd_node>(Node: Node): InstanceType<Node>[];
        virgin(): boolean;
        [Symbol.toPrimitive](): string;
        toJSON(): `${string}_${string}`;
    }
}

declare namespace $ {
    class $hyoo_crowd_reg extends $hyoo_crowd_node {
        value(next?: unknown): {} | null;
        str(next?: string): string;
        numb(next?: number): number;
        bool(next?: boolean): boolean;
        yoke(law?: readonly ("" | `${string}_${string}`)[], mod?: readonly ("" | `${string}_${string}`)[], add?: readonly ("" | `${string}_${string}`)[]): $hyoo_crowd_land | null;
    }
}

declare namespace $ {
    class $hyoo_crowd_struct extends $hyoo_crowd_node {
        sub<Node extends typeof $hyoo_crowd_node>(key: string, Node: Node): InstanceType<Node>;
        yoke<Node extends typeof $hyoo_crowd_node>(key: string, Node: Node, law?: readonly ("" | `${string}_${string}`)[], mod?: readonly ("" | `${string}_${string}`)[], add?: readonly ("" | `${string}_${string}`)[]): InstanceType<Node> | null;
    }
}

declare namespace $ {
    class $hyoo_crowd_land extends $mol_object {
        id(): `${string}_${string}`;
        toJSON(): `${string}_${string}`;
        peer(): $hyoo_crowd_peer;
        peer_id(): `${string}_${string}`;
        world(): $hyoo_crowd_world | null;
        get clock_auth(): $hyoo_crowd_clock;
        get clock_data(): $hyoo_crowd_clock;
        get clocks(): readonly [$hyoo_crowd_clock, $hyoo_crowd_clock];
        get clocks_bin(): Uint8Array;
        readonly pub: $mol_wire_pub;
        readonly _clocks: readonly [$hyoo_crowd_clock, $hyoo_crowd_clock];
        _unit_all: Map<`${string}_${string}!${string}_${string}`, $hyoo_crowd_unit>;
        unit(head: $mol_int62_string, self: $mol_int62_string): $hyoo_crowd_unit | undefined;
        _unit_lists: Map<`${string}_${string}`, ($hyoo_crowd_unit[] & {
            dirty: boolean;
        }) | undefined>;
        _unit_alives: Map<`${string}_${string}`, $hyoo_crowd_unit[] | undefined>;
        size(): number;
        unit_list(head: $mol_int62_string): $hyoo_crowd_unit[] & {
            dirty: boolean;
        };
        unit_alives(head: $mol_int62_string): readonly $hyoo_crowd_unit[];
        node<Node extends typeof $hyoo_crowd_node>(head: $mol_int62_string, Node: Node): InstanceType<Node>;
        chief: $hyoo_crowd_struct;
        id_new(): $mol_int62_string;
        fork(auth: $hyoo_crowd_peer): $hyoo_crowd_land;
        delta(clocks?: readonly [$hyoo_crowd_clock, $hyoo_crowd_clock]): readonly $hyoo_crowd_unit[];
        resort(head: $mol_int62_string): $hyoo_crowd_unit[] & {
            dirty: boolean;
        };
        apply(delta: readonly $hyoo_crowd_unit[]): this;
        _joined: boolean;
        join(): true | undefined;
        leave(): false | undefined;
        allowed_add(peer?: `${string}_${string}`): boolean;
        allowed_mod(peer?: `${string}_${string}`): boolean;
        allowed_law(peer?: `${string}_${string}`): boolean;
        level_base(next?: $hyoo_crowd_peer_level): void;
        level(peer: $mol_int62_string | '', next?: $hyoo_crowd_peer_level): $hyoo_crowd_peer_level;
        grabbed(): boolean;
        peers(): readonly `${string}_${string}`[];
        residents(): readonly `${string}_${string}`[];
        authors(): Set<`${string}_${string}`>;
        steal_rights(donor: $hyoo_crowd_land): void;
        first_stamp(): number | null;
        last_stamp(): number;
        selection(peer: $mol_int62_string): $hyoo_crowd_reg;
        put(head: $mol_int62_string, self: $mol_int62_string, prev: $mol_int62_string, data: unknown): $hyoo_crowd_unit;
        wipe(unit: $hyoo_crowd_unit): $hyoo_crowd_unit;
        move(unit: $hyoo_crowd_unit, head: $mol_int62_string, prev: $mol_int62_string): void;
        insert(unit: $hyoo_crowd_unit, head: $mol_int62_string, seat: number): void;
    }
}

declare namespace $ {
    class $hyoo_crowd_fund<Node extends typeof $hyoo_crowd_node> extends $mol_object {
        world: $hyoo_crowd_world;
        node_class: Node;
        constructor(world: $hyoo_crowd_world, node_class: Node);
        Item(id: $mol_int62_string | `${$mol_int62_string}!${$mol_int62_string}`): InstanceType<Node>;
        make(law?: readonly ("" | `${string}_${string}`)[], mod?: readonly ("" | `${string}_${string}`)[], add?: readonly ("" | `${string}_${string}`)[]): InstanceType<Node>;
    }
}

declare namespace $ {
    let $mol_dict_key: typeof $mol_key;
    class $mol_dict<Key, Value> extends Map<Key, Value> {
        get(key: Key): Value | undefined;
        has(key: Key): boolean;
        set(key: Key, value: Value): this;
        delete(key: Key): boolean;
        forEach(back: (value: Value, key: Key, dict: Map<Key, Value>) => void, context?: any): void;
        keys(): {
            [Symbol.iterator](): any;
            next(): IteratorReturnResult<any> | IteratorYieldResult<Key>;
        };
        entries(): {
            [Symbol.iterator](): any;
            next(): IteratorReturnResult<any> | IteratorYieldResult<[Key, Value]>;
        };
        [Symbol.iterator](): {
            [Symbol.iterator](): any;
            next(): IteratorReturnResult<any> | IteratorYieldResult<[Key, Value]>;
        };
    }
}

declare namespace $ {
    class $hyoo_crowd_world extends $mol_object {
        readonly peer?: $hyoo_crowd_peer | undefined;
        constructor(peer?: $hyoo_crowd_peer | undefined);
        readonly lands_pub: $mol_wire_pub;
        _lands: Map<`${string}_${string}`, $hyoo_crowd_land>;
        get lands(): Map<`${string}_${string}`, $hyoo_crowd_land>;
        land_init(id: $hyoo_crowd_land): void;
        land(id: $mol_int62_string): $hyoo_crowd_land;
        land_sync(id: $mol_int62_string): $hyoo_crowd_land;
        Fund<Item extends typeof $hyoo_crowd_node>(Item: Item): $hyoo_crowd_fund<Item>;
        home(): $hyoo_crowd_land;
        _knights: $mol_dict<`${string}_${string}`, $hyoo_crowd_peer>;
        _signs: WeakMap<$hyoo_crowd_unit, Uint8Array>;
        grab(law?: readonly ("" | `${string}_${string}`)[], mod?: readonly ("" | `${string}_${string}`)[], add?: readonly ("" | `${string}_${string}`)[]): Promise<$hyoo_crowd_land>;
        sign_units(units: readonly $hyoo_crowd_unit[]): Promise<$hyoo_crowd_unit[]>;
        delta_land(land: $hyoo_crowd_land, clocks?: readonly [$hyoo_crowd_clock, $hyoo_crowd_clock]): Promise<$hyoo_crowd_unit[]>;
        delta_batch(land: $hyoo_crowd_land, clocks?: readonly [$hyoo_crowd_clock, $hyoo_crowd_clock]): Promise<Uint8Array>;
        delta(clocks?: Map<`${string}_${string}`, readonly [$hyoo_crowd_clock, $hyoo_crowd_clock]>): AsyncGenerator<Uint8Array, void, unknown>;
        merge(donor: $hyoo_crowd_world): Promise<void>;
        apply(delta: Uint8Array): Promise<{
            allow: $hyoo_crowd_unit[];
            forbid: Map<$hyoo_crowd_unit, string>;
        }>;
        audit_delta(land: $hyoo_crowd_land, delta: $hyoo_crowd_unit[]): Promise<{
            allow: $hyoo_crowd_unit[];
            forbid: Map<$hyoo_crowd_unit, string>;
        }>;
    }
}

declare namespace $ {
    let $hyoo_sync_masters: string[];
}

declare namespace $ {
    class $hyoo_sync_yard<Line> extends $mol_object2 {
        db_unit_persisted: WeakSet<$hyoo_crowd_unit>;
        log_pack(data: any): any;
        peer(next?: string): $hyoo_crowd_peer;
        world(): $hyoo_crowd_world;
        land_init(land: $hyoo_crowd_land): void;
        land(id: $mol_int62_string): $hyoo_crowd_land;
        land_grab(law?: readonly ("" | `${string}_${string}`)[], mod?: readonly ("" | `${string}_${string}`)[], add?: readonly ("" | `${string}_${string}`)[]): $hyoo_crowd_land;
        home(): $hyoo_crowd_land;
        land_search(query: string): `${string}_${string}`[];
        sync(): void;
        land_sync(land: $hyoo_crowd_land): void;
        db_land_clocks(land: $mol_int62_string, next?: readonly [$hyoo_crowd_clock, $hyoo_crowd_clock]): readonly [$hyoo_crowd_clock, $hyoo_crowd_clock] | undefined;
        db_land_sync(land: $hyoo_crowd_land): void;
        db_land_init(land: $hyoo_crowd_land): void;
        db_land_load(land: $hyoo_crowd_land): Promise<$hyoo_crowd_unit[]>;
        db_land_search(from: string | number, to?: string | number): Promise<Set<`${string}_${string}`>>;
        db_land_save(land: $hyoo_crowd_land, units: readonly $hyoo_crowd_unit[]): Promise<void>;
        master_cursor(next?: number): number;
        master_list(): string[];
        master_link(): string;
        master(): any;
        server(): any;
        slaves(next?: readonly Line[]): readonly Line[];
        line_lands(line: Line, next?: $hyoo_crowd_land[]): $hyoo_crowd_land[];
        line_land_clocks({ line, land }: {
            line: Line;
            land: $hyoo_crowd_land;
        }, next?: readonly [$hyoo_crowd_clock, $hyoo_crowd_clock]): readonly [$hyoo_crowd_clock, $hyoo_crowd_clock] | undefined;
        line_sync(line: Line): void;
        line_land_sync({ line, land }: {
            line: Line;
            land: $hyoo_crowd_land;
        }): void;
        line_land_init({ line, land }: {
            line: Line;
            land: $hyoo_crowd_land;
        }): void;
        line_land_neck({ line, land }: {
            line: Line;
            land: $mol_int62_string;
        }, next?: Promise<any>[]): Promise<any>[];
        line_receive(line: Line, message: Uint8Array): Promise<void>;
        line_send_clocks(line: Line, land: $hyoo_crowd_land): void;
        line_send_units(line: Line, units: readonly $hyoo_crowd_unit[]): Promise<void>;
    }
}

declare namespace $.$$ {
    class $hyoo_sync_online extends $.$hyoo_sync_online {
        message(): string;
        link_content(): $mol_icon_sync_off[];
        hint(): string;
        master_link(): string;
        master_id(index: number): string;
        option_label(index: number): string;
        value(next?: string): string;
    }
}

declare namespace $ {
}

declare namespace $ {

	type $hyoo_sync_online_master_cursor__XSTNYVG5 = $mol_type_enforce<
		Parameters< $hyoo_sync_online['master_cursor'] >[0]
		,
		Parameters< ReturnType< $hyoo_sync_online['yard'] >['master_cursor'] >[0]
	>
	type $mol_avatar__id__2WH4T4M6 = $mol_type_enforce<
		ReturnType< $hyoo_sync_online['master_id'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_avatar__id__HIFY97DL = $mol_type_enforce<
		ReturnType< $hyoo_sync_online['master_link'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_link__uri__O6FKOSZO = $mol_type_enforce<
		ReturnType< $hyoo_sync_online['master_link'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub__S599BXAD = $mol_type_enforce<
		ReturnType< $hyoo_sync_online['link_content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__hint__OIQ0NTAN = $mol_type_enforce<
		ReturnType< $hyoo_sync_online['message'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	export class $hyoo_sync_online extends $mol_select {
		dictionary( ): ReturnType< ReturnType< $hyoo_sync_online['yard'] >['master_list'] >
		master_cursor( next?: ReturnType< ReturnType< $hyoo_sync_online['yard'] >['master_cursor'] > ): ReturnType< ReturnType< $hyoo_sync_online['yard'] >['master_cursor'] >
		master_id( id: any): string
		Option_logo( id: any): $mol_avatar
		master_link( ): string
		Well( ): $mol_avatar
		Fail( ): $mol_icon_sync_off
		link_content( ): readonly(any)[]
		hint( ): string
		message( ): ReturnType< $hyoo_sync_online['hint'] >
		Link( ): $mol_link
		minimal_width( ): number
		minimal_height( ): number
		yard( ): $hyoo_sync_yard<any>
		Filter( ): any
		option_content( id: any): readonly(any)[]
		trigger_content( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=online.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_hint extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=hint.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_down extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=down.view.tree.d.ts.map
declare namespace $ {

	export class $mol_theme_auto extends $mol_plugin {
		theme( ): string
		attr( ): ({ 
			'mol_theme': ReturnType< $mol_theme_auto['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=auto.view.tree.d.ts.map
declare namespace $.$$ {
    class $mol_theme_auto extends $.$mol_theme_auto {
        theme(): "$mol_theme_light" | "$mol_theme_dark";
    }
}

declare namespace $ {
    class $hyoo_sync_client extends $hyoo_sync_yard<WebSocket | Window> {
        db(): Promise<$mol_db_database<{
            Unit: {
                Key: [$mol_int62_string, $mol_int62_string, $mol_int62_string];
                Doc: $hyoo_crowd_unit;
                Indexes: {
                    Land: [$mol_int62_string];
                    Data: [$mol_int62_string];
                };
            };
        }>>;
        db_land_load(land: $hyoo_crowd_land): Promise<$hyoo_crowd_unit[]>;
        db_land_search(from: string, to?: string): Promise<Set<`${string}_${string}`>>;
        db_land_save(land: $hyoo_crowd_land, units: readonly $hyoo_crowd_unit[]): Promise<void>;
        reconnects(reset?: null): number;
        master(): WebSocket;
        line_send_clocks(line: WebSocket | Window, land: $hyoo_crowd_land): void;
        line_send_units(line: WebSocket | Window, units: readonly $hyoo_crowd_unit[]): Promise<void>;
    }
}

declare namespace $ {
    class $hyoo_crowd_dict extends $hyoo_crowd_node {
        keys(next?: string[]): string[];
        sub<Node extends typeof $hyoo_crowd_node>(key: string, Node: Node): InstanceType<Node>;
        has(key: string): boolean;
        add(key: string): void;
        drop(key: string): void;
    }
}

declare namespace $ {
    class $hyoo_calc_sheet extends $hyoo_crowd_struct {
        changable(): boolean;
        title(next?: string): string;
        formula_node(): $hyoo_crowd_dict;
        formula(cell: string, next?: string): string;
        cells(): string[];
        steal(donor: $hyoo_calc_sheet): void;
    }
}

declare namespace $ {
    class $mol_func_sandbox {
        static blacklist: Set<Function>;
        static whitelist: WeakSet<WeakKey>;
        static _make: (contexts: Object[]) => (code: string) => () => any;
        static get make(): ((contexts: Object[]) => (code: string) => () => any) | ((...args: Record<string, any>[]) => (code: string) => () => any);
        constructor(...contexts: Object[]);
        contexts: Object[];
        _eval: ((code: string) => () => any) | undefined;
        get eval(): (code: string) => () => any;
    }
}

declare namespace $ {
    function $mol_offline(): void;
}

declare namespace $ {
    function $mol_offline_web(): void;
}

declare namespace $ {
}

declare namespace $.$$ {
    class $hyoo_calc extends $.$hyoo_calc {
        sheet_fund(): $hyoo_crowd_fund<typeof $hyoo_calc_sheet>;
        sheet_id(): string;
        sheet(): $hyoo_calc_sheet | null;
        sheet_new(): $hyoo_calc_sheet;
        sheet_fork(): $hyoo_calc_sheet;
        sheet_changable(): $hyoo_calc_sheet;
        formulas_default(): Record<string, string>;
        formulas(): {
            [key: string]: string;
        };
        formula_name(id: string): string | null;
        refs(): Record<string, string>;
        id2coord(id: string): [number, number] | null;
        coord2id(coord: [number, number]): string;
        dimensions(): {
            rows: number;
            cols: number;
        };
        col_ids(): number[];
        row_ids(): number[];
        number2string(numb: number): string;
        string2number(str: string): number;
        title(next?: string): string;
        col_title(id: number): string;
        col_head_content(id: number): $mol_view[];
        row_title(id: number): string;
        row_head_content(id: number): $mol_view[];
        head_cells(): $mol_float[];
        cells(row_id: number): ($mol_float | $.$hyoo_calc_cell)[];
        selected(id: string, next?: boolean): boolean;
        pos(next?: string): string;
        coord(next?: [number, number]): [number, number];
        Edit_current(): $.$mol_textarea;
        current_row(next?: number): number;
        current_col(next?: number): number;
        formula(id: string, next?: string): string;
        formula_current(next?: string): string;
        sandbox(): $mol_func_sandbox;
        results(range: [string, string]): unknown[];
        sub(): $mol_view[];
        hint(): string;
        cell_content(id: string): string;
        func(id: string): () => any;
        result(id: string): string | number;
        paste(event: ClipboardEvent): void;
        download_file(): string;
        download_uri(): string;
        col_ins(col: number): void;
        row_ins(row: number): void;
        col_right(col: number): void;
        row_down(row: number): void;
    }
    class $hyoo_calc_cell extends $.$hyoo_calc_cell {
        click(event?: Event): void;
        type(): "string" | "number";
    }
}

declare namespace $ {
}

declare namespace $ {

	type $mol_string_button__value__IS28GBG7 = $mol_type_enforce<
		ReturnType< $hyoo_calc['title'] >
		,
		ReturnType< $mol_string_button['value'] >
	>
	type $mol_string_button__enabled__X6X6XYD8 = $mol_type_enforce<
		ReturnType< $hyoo_calc['editable'] >
		,
		ReturnType< $mol_string_button['enabled'] >
	>
	type $mol_string_button__hint__4GT2QZE4 = $mol_type_enforce<
		ReturnType< $hyoo_calc['title_default'] >
		,
		ReturnType< $mol_string_button['hint'] >
	>
	type $mol_button_download__hint__PYKBXSJZ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_download['hint'] >
	>
	type $mol_button_download__file_name__27G49GT1 = $mol_type_enforce<
		ReturnType< $hyoo_calc['download_file'] >
		,
		ReturnType< $mol_button_download['file_name'] >
	>
	type $mol_button_download__uri__9X7QQNB1 = $mol_type_enforce<
		ReturnType< $hyoo_calc['download_uri'] >
		,
		ReturnType< $mol_button_download['uri'] >
	>
	type $mol_button_minor__hint__I1WSY8IL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click__SI7ZV8HR = $mol_type_enforce<
		ReturnType< $hyoo_calc['sheet_fork'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__A7TN25H0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint__OPN0SJFQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click__78JG8NQW = $mol_type_enforce<
		ReturnType< $hyoo_calc['sheet_new'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__6B7CNCF5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_link_source__uri__J0KJ6B2A = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $hyoo_sync_online__yard__S6QI5A0C = $mol_type_enforce<
		ReturnType< $hyoo_calc['yard'] >
		,
		ReturnType< $hyoo_sync_online['yard'] >
	>
	type $mol_button_minor__enabled__BJ6LPHX7 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__title__MY4WTY5O = $mol_type_enforce<
		ReturnType< $hyoo_calc['pos'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_check_icon__checked__H8Y1RH0N = $mol_type_enforce<
		ReturnType< $hyoo_calc['hint_showed'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__2GN94RSX = $mol_type_enforce<
		ReturnType< $hyoo_calc['Hint_trigger_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_bar__sub__0VVPVXI9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_text__text__QKIUIESF = $mol_type_enforce<
		ReturnType< $hyoo_calc['hint'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_grid__col_ids__AI1ZLNQ6 = $mol_type_enforce<
		ReturnType< $hyoo_calc['col_ids'] >
		,
		ReturnType< $mol_grid['col_ids'] >
	>
	type $mol_grid__row_ids__9Y9HF6O4 = $mol_type_enforce<
		ReturnType< $hyoo_calc['row_ids'] >
		,
		ReturnType< $mol_grid['row_ids'] >
	>
	type $mol_grid__head_cells__867UWR33 = $mol_type_enforce<
		ReturnType< $hyoo_calc['head_cells'] >
		,
		ReturnType< $mol_grid['head_cells'] >
	>
	type $mol_grid__cells__4A6OURZ8 = $mol_type_enforce<
		ReturnType< $hyoo_calc['cells'] >
		,
		ReturnType< $mol_grid['cells'] >
	>
	type $mol_view__sub__43KR5TD1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint__8YQG74DT = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled__YYY1LUX0 = $mol_type_enforce<
		ReturnType< $hyoo_calc['editable'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click__H3PLY9RT = $mol_type_enforce<
		ReturnType< $hyoo_calc['col_ins'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__3R9X22LQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint__SXBTH4AR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click__WQYBCXNX = $mol_type_enforce<
		ReturnType< $hyoo_calc['col_right'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled__HIBI8584 = $mol_type_enforce<
		ReturnType< $hyoo_calc['editable'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub__V19Z7NLS = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_bar__sub__AUTD1UOT = $mol_type_enforce<
		ReturnType< $hyoo_calc['col_tools'] >
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_view__sub__0TTLWP46 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint__CNQTL8VO = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click__BAAQPKAS = $mol_type_enforce<
		ReturnType< $hyoo_calc['row_ins'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled__JQUVDVLI = $mol_type_enforce<
		ReturnType< $hyoo_calc['editable'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub__P0TZ9B7J = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint__46IGMTN6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click__E73RGAUM = $mol_type_enforce<
		ReturnType< $hyoo_calc['row_down'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled__QN29N58O = $mol_type_enforce<
		ReturnType< $hyoo_calc['editable'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub__3RYRP498 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub__7DS6TFLA = $mol_type_enforce<
		ReturnType< $hyoo_calc['row_tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_nav__mod_alt__CLUX41CU = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_nav['mod_alt'] >
	>
	type $mol_nav__keys_x__M8I8B9M6 = $mol_type_enforce<
		ReturnType< $hyoo_calc['col_ids'] >
		,
		ReturnType< $mol_nav['keys_x'] >
	>
	type $mol_nav__keys_y__T9E770SH = $mol_type_enforce<
		ReturnType< $hyoo_calc['row_ids'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_x__ATXWE2YK = $mol_type_enforce<
		ReturnType< $hyoo_calc['current_col'] >
		,
		ReturnType< $mol_nav['current_x'] >
	>
	type $mol_nav__current_y__9VAEB1WM = $mol_type_enforce<
		ReturnType< $hyoo_calc['current_row'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_textarea__hint__09NYC46R = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__SBF3MJ0S = $mol_type_enforce<
		ReturnType< $hyoo_calc['formula'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__enabled__QY3FB43N = $mol_type_enforce<
		ReturnType< $hyoo_calc['editable'] >
		,
		ReturnType< $mol_textarea['enabled'] >
	>
	type $mol_float__dom_name__7YJS49UJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_float['dom_name'] >
	>
	type $mol_float__sub__502JJJN9 = $mol_type_enforce<
		ReturnType< $hyoo_calc['col_head_content'] >
		,
		ReturnType< $mol_float['sub'] >
	>
	type $mol_float__dom_name__UFEDBU24 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_float['dom_name'] >
	>
	type $mol_float__sub__FU6555WV = $mol_type_enforce<
		ReturnType< $hyoo_calc['row_head_content'] >
		,
		ReturnType< $mol_float['sub'] >
	>
	type $hyoo_calc_cell__text__VK43Y3FM = $mol_type_enforce<
		ReturnType< $hyoo_calc['cell_content'] >
		,
		ReturnType< $hyoo_calc_cell['text'] >
	>
	type $hyoo_calc_cell__selected__KONPOWKS = $mol_type_enforce<
		ReturnType< $hyoo_calc['selected'] >
		,
		ReturnType< $hyoo_calc_cell['selected'] >
	>
	export class $hyoo_calc extends $mol_page {
		title( next?: string ): string
		title_default( ): string
		Title_edit( ): $mol_string_button
		download_file( ): string
		download_uri( next?: string ): string
		Download( ): $mol_button_download
		sheet_fork( next?: any ): any
		Fork_icon( ): $mol_icon_directions_fork
		Fork( ): $mol_button_minor
		sheet_new( next?: any ): any
		New_icon( ): $mol_icon_plus_box
		New( ): $mol_button_minor
		Lights( ): $mol_lights_toggle
		Source( ): $mol_link_source
		Online( ): $hyoo_sync_online
		pos( next?: string ): string
		Pos( ): $mol_button_minor
		Edit_current( ): $mol_textarea
		hint_showed( next?: boolean ): boolean
		Hint_trigger_icon( ): $mol_icon_hint
		Hint_trigger( ): $mol_check_icon
		Current( ): $mol_bar
		hint( ): string
		Hint( ): $mol_text
		col_ids( ): readonly(any)[]
		row_ids( ): readonly(any)[]
		head_cells( ): readonly(any)[]
		cells( id: any): readonly(any)[]
		Cells( ): $mol_grid
		formula( id: any, next?: string ): string
		col_title( id: any): string
		Col_title( id: any): $mol_view
		col_ins( id: any, next?: any ): any
		Col_ins_icon( id: any): $mol_icon_chevron_down
		Col_ins( id: any): $mol_button_minor
		col_right( id: any, next?: any ): any
		Col_right_icon( id: any): $mol_icon_chevron_right
		Col_right( id: any): $mol_button_minor
		col_tools( id: any): readonly(any)[]
		Col_tools( id: any): $mol_bar
		col_head_content( id: any): readonly(any)[]
		row_title( id: any): string
		Row_title( id: any): $mol_view
		row_ins( id: any, next?: any ): any
		Row_ins_icon( id: any): $mol_icon_chevron_right
		Row_ins( id: any): $mol_button_minor
		row_down( id: any, next?: any ): any
		Row_down_icon( id: any): $mol_icon_chevron_down
		Row_down( id: any): $mol_button_minor
		row_tools( id: any): readonly(any)[]
		Row_tools( id: any): $mol_view
		row_head_content( id: any): readonly(any)[]
		cell_content( id: any): string
		selected( id: any, next?: boolean ): boolean
		Theme( ): $mol_theme_auto
		current_col( next?: number ): number
		current_row( next?: number ): number
		Nav( ): $mol_nav
		paste( next?: any ): any
		yard( ): $hyoo_sync_client
		editable( ): boolean
		sheet_id( ): string
		formulas_default( ): Record<string, any>
		head( ): readonly(any)[]
		tools( ): readonly(any)[]
		sub( ): readonly(any)[]
		body( ): readonly(any)[]
		Edit( id: any): $mol_textarea
		Col_head( id: any): $mol_float
		Row_head( id: any): $mol_float
		Cell( id: any): $hyoo_calc_cell
		plugins( ): readonly(any)[]
		event( ): ({ 
			paste( next?: ReturnType< $hyoo_calc['paste'] > ): ReturnType< $hyoo_calc['paste'] >,
		}) 
	}
	
	export class $hyoo_calc_cell extends $mol_text {
		click( next?: any ): any
		selected( next?: boolean ): boolean
		type( next?: string ): string
		dom_name( ): string
		event( ): ({ 
			click( next?: ReturnType< $hyoo_calc_cell['click'] > ): ReturnType< $hyoo_calc_cell['click'] >,
		})  & ReturnType< $mol_text['event'] >
		attr( ): ({ 
			'hyoo_calc_cell_selected': ReturnType< $hyoo_calc_cell['selected'] >,
			'hyoo_calc_cell_type': ReturnType< $hyoo_calc_cell['type'] >,
		})  & ReturnType< $mol_text['attr'] >
	}
	
}

//# sourceMappingURL=calc.view.tree.d.ts.map
declare namespace $ {
}

declare namespace $ {

	type $mol_text_list_item__index__3VVF3K78 = $mol_type_enforce<
		ReturnType< $mol_text_list['item_index'] >
		,
		ReturnType< $mol_text_list_item['index'] >
	>
	type $mol_text_list_item__sub__D3VKQBDI = $mol_type_enforce<
		ReturnType< $mol_text_list['block_content'] >
		,
		ReturnType< $mol_text_list_item['sub'] >
	>
	export class $mol_text_list extends $mol_text {
		type( ): string
		auto_scroll( ): any
		attr( ): ({ 
			'mol_text_list_type': ReturnType< $mol_text_list['type'] >,
		})  & ReturnType< $mol_text['attr'] >
		Paragraph( id: any): $mol_text_list_item
	}
	
	export class $mol_text_list_item extends $mol_paragraph {
		index( ): number
		attr( ): ({ 
			'mol_text_list_item_index': ReturnType< $mol_text_list_item['index'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_source__uri__3KOXCUIZ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $hyoo_crus_status__realm__SY3ZYLA8 = $mol_type_enforce<
		ReturnType< $hyoo_crus_app['realm'] >
		,
		ReturnType< $hyoo_crus_status['realm'] >
	>
	type $mol_text__uri_base__XO25CK28 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_text['uri_base'] >
	>
	type $mol_text__text__HWG22TRF = $mol_type_enforce<
		ReturnType< $hyoo_crus_app['intro'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_page__title__KPG9G7PD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__body__L50PP6TK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $hyoo_crus_realm_book__realm__IG6P5XD7 = $mol_type_enforce<
		ReturnType< $hyoo_crus_app['realm'] >
		,
		ReturnType< $hyoo_crus_realm_book['realm'] >
	>
	type $hyoo_crus_realm_book__addon_tools__VBIJA2KU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $hyoo_crus_realm_book['addon_tools'] >
	>
	type $hyoo_crus_auth_slot__realm__EQYAY81S = $mol_type_enforce<
		ReturnType< $hyoo_crus_app['realm'] >
		,
		ReturnType< $hyoo_crus_auth_slot['realm'] >
	>
	type $hyoo_crus_auth_slot__tools__39GMF8KE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $hyoo_crus_auth_slot['tools'] >
	>
	type $hyoo_calc__title__Z0GK5LV3 = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_calc['title'] >
	>
	type $hyoo_calc__editable__TVBI9SBW = $mol_type_enforce<
		boolean
		,
		ReturnType< $hyoo_calc['editable'] >
	>
	type $hyoo_calc__sheet_id__LUMBD9CW = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_calc['sheet_id'] >
	>
	type $hyoo_calc__Fork__ZMCLDWTN = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_calc['Fork'] >
	>
	type $hyoo_calc__New__QV17ID2O = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_calc['New'] >
	>
	type $hyoo_calc__Lights__14HI18BK = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_calc['Lights'] >
	>
	type $hyoo_calc__Source__L0PZYHE5 = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_calc['Source'] >
	>
	type $hyoo_calc__Current__0GU8XGZ4 = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_calc['Current'] >
	>
	type $hyoo_calc__tools__YWAT202T = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $hyoo_calc['tools'] >
	>
	export class $hyoo_crus_app extends $mol_book2_catalog {
		Source( ): $mol_link_source
		Status( ): $hyoo_crus_status
		intro( ): string
		Intro_content( ): $mol_text
		Intro( ): $mol_page
		Realm( ): $hyoo_crus_realm_book
		Slot( ): $hyoo_crus_auth_slot
		Casting( ): $hyoo_calc
		menu_title( ): string
		param( ): string
		realm( ): $hyoo_crus_realm
		menu_foot( ): readonly(any)[]
		spreads( ): ({ 
			'': ReturnType< $hyoo_crus_app['Intro'] >,
			'realm': ReturnType< $hyoo_crus_app['Realm'] >,
			'slot': ReturnType< $hyoo_crus_app['Slot'] >,
			'casting': ReturnType< $hyoo_crus_app['Casting'] >,
		}) 
		Placeholder( ): any
	}
	
}

//# sourceMappingURL=app.web.view.tree.d.ts.map
declare namespace $.$$ {
    class $hyoo_crus_app extends $.$hyoo_crus_app {
        realm(): $hyoo_crus_realm;
        intro(): string;
    }
}

declare namespace $.$$ {
}

export = $;
//# sourceMappingURL=web.d.ts.map
