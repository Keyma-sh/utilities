!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).SapphireType={})}(this,(function(e){"use strict";const{getPromiseDetails:t,getProxyDetails:i}="undefined"==typeof process?{getPromiseDetails:()=>{},getProxyDetails:()=>{}}:process.binding("util");class Type{constructor(e,t=null){Object.defineProperty(this,"value",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"is",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"parent",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"childKeys",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),Object.defineProperty(this,"childValues",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.value=e,this.is=Type.resolve(e),this.parent=t}get childTypes(){return this.childValues.size?`<${(this.childKeys.size?`${Type.list(this.childKeys)}, `:"")+Type.list(this.childValues)}>`:""}toString(){return this.check(),`${this.is}${this.childTypes}`}*parents(){let e=this;for(;e=e.parent;)yield e}isCircular(){for(const e of this.parents())if(e.value===this.value)return!0;return!1}addValue(e){const t=new Type(e,this);this.childValues.set(t.is,t)}addEntry([e,t]){const i=new Type(e,this);this.childKeys.set(i.is,i),this.addValue(t)}check(){if(Object.isFrozen(this))return;const e=t(this.value),s=i(this.value);if("object"==typeof this.value&&this.isCircular())this.is=`[Circular:${this.is}]`;else if(e&&e[0])this.addValue(e[1]);else if(s&&s[0])this.is="Proxy",this.addValue(s[0]);else if(this.value instanceof Map)for(const e of this.value)this.addEntry(e);else if(Array.isArray(this.value)||this.value instanceof Set)for(const e of this.value)this.addValue(e);else if("Object"===this.is){this.is="Record";for(const e of Object.entries(this.value))this.addEntry(e)}Object.freeze(this)}static resolve(e){const t=typeof e;switch(t){case"object":return null===e?"null":e.constructor&&e.constructor.name;case"function":return`${e.constructor.name}(${e.length}-arity)`;case"undefined":return"void";default:return t}}static list(e){return[...e.values()].sort().join(" | ")}}e.Type=Type,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=index.umd.js.map
