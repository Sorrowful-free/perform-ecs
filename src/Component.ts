import {NonFunctionProperties} from "./HelperTypes";

export type ComponentHash = number;

export abstract class Component {
    public static readonly hash: ComponentHash;
    public abstract reset(object: this, ...args: any[]): void;
}

export function registerComponent(componentId: ComponentHash) {
    const registerComponentDecorator: ClassDecorator = target => {
        const componentConstructor = (<ComponentConstructor><any>target);
        componentConstructor.hash = componentId;
        return target;
    }
    return registerComponentDecorator;
}

export type EntityOf<T extends any> = NonFunctionProperties<T>;

export type ComponentConstructor = {
    new(): Component;
    hash: ComponentHash;
}

export interface ComponentInitializer<T extends any = any> {
    component: T;
    args?: T['prototype']['reset'];
}
