"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxy = exports.createFunctionPrecondition = exports.createClassDecorator = exports.createMethodDecorator = void 0;
/**
 * Utility to make a method decorator with lighter syntax and inferred types.
 *
 * ```ts
 * // Enumerable function
 *	function enumerableMethod(value: boolean) {
 *		return createMethodDecorator((_target, _propertyKey, descriptor) => {
 *			descriptor.enumerable = value;
 *		});
 *	}
 * ```
 * @param fn The method to decorate
 */
function createMethodDecorator(fn) {
    return fn;
}
exports.createMethodDecorator = createMethodDecorator;
/**
 * Utility to make a class decorator with lighter syntax and inferred types.
 * @param fn The class to decorate
 * @see {@link ApplyOptions}
 */
function createClassDecorator(fn) {
    return fn;
}
exports.createClassDecorator = createClassDecorator;
/**
 * Utility to make function preconditions.
 *
 * ```ts
 * // No fallback (returns undefined)
 * function requireGuild(value: number) {
 *   return createFunctionPrecondition((message: Message) =>
 *     message.guild !== null
 *   );
 * }
 *
 * // With fallback
 * function requireGuild(
 *   value: number,
 *   fallback: () => unknown = () => undefined
 * ) {
 *   return createFunctionPrecondition(
 *     (message: Message) => message.guild !== null,
 *     fallback
 *   );
 * }
 * ```
 * @since 1.0.0
 * @param precondition The function that defines whether or not the function should be run, returning the returned value from fallback
 * @param fallback The fallback value that defines what the method should return in case the precondition fails
 */
function createFunctionPrecondition(precondition, fallback = () => undefined) {
    return createMethodDecorator((_target, _propertyKey, descriptor) => {
        const method = descriptor.value;
        if (!method)
            throw new Error('Function preconditions require a [[value]].');
        if (typeof method !== 'function')
            throw new Error('Function preconditions can only be applied to functions.');
        descriptor.value = async function descriptorValue(...args) {
            const canRun = await precondition(...args);
            return canRun ? method.call(this, ...args) : fallback.call(this, ...args);
        };
    });
}
exports.createFunctionPrecondition = createFunctionPrecondition;
/**
 * Creates a new proxy to efficiently add properties to class without creating subclasses
 * @param target The constructor of the class to modify
 * @param handler The handler function to modify the constructor behavior for the target
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function createProxy(target, handler) {
    return new Proxy(target, {
        ...handler,
        get: (target, property) => {
            const value = Reflect.get(target, property);
            return typeof value === 'function' ? (...args) => value.apply(target, args) : value;
        }
    });
}
exports.createProxy = createProxy;
//# sourceMappingURL=utils.js.map