import {ComponentConstructor, ComponentInitializer} from './Component';

function bit_test(num: number, bit: number): boolean {
    return ((num >> bit) % 2 != 0)
}

function bit_set(num: number, bit: number): number {
    return num | 1 << bit;
}

function bit_clear(num: number, bit: number): number {
    return num & ~(1 << bit);
}

function bit_toggle(num: number, bit: number): number {
    return bit_test(num, bit) ? bit_clear(num, bit) : bit_set(num, bit);
}

export type ComponentsHash = number;

export function componentHashHasComponent(hash: ComponentsHash, component: ComponentConstructor): boolean {
    return bit_test(hash, component.hash);
}

export function getComponentsHashFromInitializators(components: ComponentInitializer[]): ComponentsHash {
    let num = 0;
    for (const comp of components) {
        num = bit_set(num, comp.component.id);
    }
    return num;
}

export function getComponentsHash(components: ComponentConstructor[]): ComponentsHash {
    let num = 0;
    for (const comp of components) {
        num = bit_set(num, comp.hash);
    }
    return num;
}

export function componentHashMatch(hash1: ComponentsHash, hash2: ComponentsHash): boolean {
    return (hash2 & hash1) === hash2;
}
