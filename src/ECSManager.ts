import {Component, ComponentConstructor, ComponentInitializer} from "./Component";
import {Entity, EntityIdPool} from "./Entity";
import {Archetype} from "./Archetype";
import {SystemRegistry} from "./SystemRegistry";
import {ComponentGroupRegistry} from "./ComponentGroupRegistry";
import {System} from "./System";
import {NonFunctionProperties} from "./HelperTypes";

export class ECSManager {

    private readonly _entityIds: EntityIdPool;
    private readonly _systemsRegistry: SystemRegistry;
    private readonly _groupsRegistry: ComponentGroupRegistry;
    private readonly _components: Component[] = [];

    constructor() {
        this._systemsRegistry = new SystemRegistry();
        this._groupsRegistry = new ComponentGroupRegistry();
        this._entityIds = new EntityIdPool();
    }

    public dispose() {
        this._entityIds.clear();

    }

    public createEntity<T1 extends ComponentInitializer,
        T2 extends ComponentInitializer,
        T3 extends ComponentInitializer,
        T4 extends ComponentInitializer,
        T5 extends ComponentInitializer,
        T6 extends ComponentInitializer,
        T7 extends ComponentInitializer,
        T8 extends ComponentInitializer,
        T9 extends ComponentInitializer,
        T10 extends ComponentInitializer>
    (components: ComponentsInitList<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>):
        ComponentOf<T1>
        & ComponentOf<T2>
        & ComponentOf<T3>
        & ComponentOf<T4>
        & ComponentOf<T5>
        & ComponentOf<T6>
        & ComponentOf<T7>
        & ComponentOf<T8>
        & ComponentOf<T9>
        & ComponentOf<T10>
        & Entity {
        return this._createEntityInternal(components);
    }

    private readonly _createEntityInternal: createEntityFunc = ((components: ComponentInitializer[]) => {
        const entity = new Entity(this._entityIds.take());
        this.addComponentsToEntity(entity, components)
        return entity as any;
    }) as any;

    public removeEntity(entity: Entity): void {
        this._groupsRegistry.removeEntity(entity);
        this._entityIds.put(entity.id);
    }

    public removeComponentsFromEntity(entity: Entity, components: ComponentConstructor[] | ComponentConstructor): void {
        console.log("try remove component from entity");
        if (!(components instanceof Array)) {
            this._groupsRegistry.removeComponentFromEntity(entity, components);
        } else {
            components.forEach(comp => this._groupsRegistry.removeComponentFromEntity(entity, comp))
        }
    }

    public addComponentsToEntity(entity: Entity, components: ComponentInitializer[]): void {
        entity.components.push(...components);
        for (const component of components) {
            this._getComponentInstance(component.component).reset(entity as any, ...component.args);
        }
        this._groupsRegistry.addEntity(entity, components);
    }

    public registerSystem<T extends System = System>(system: T): T {
        system.manager = this;
        this._systemsRegistry.register(system, this._groupsRegistry);
        return system;
    }

    public update(dt: number): void {
        for (const system of this._systemsRegistry.systems) {
            system.update(dt);
        }
    }

    private _getComponentInstance(component: ComponentConstructor): Component {
        if (!this._components[component.hash]) {
            this._components[component.hash] = new component();
        }
        return this._components[component.hash];
    }

    public createArchetype(components: ComponentInitializer[]): Archetype {
        return components;
    }

}

type ComponentOf<T extends ComponentInitializer> = NonFunctionProperties<T['component']['prototype']>;

type createEntityFunc = <T1 extends ComponentInitializer,
    T2 extends ComponentInitializer,
    T3 extends ComponentInitializer,
    T4 extends ComponentInitializer,
    T5 extends ComponentInitializer,
    T6 extends ComponentInitializer,
    T7 extends ComponentInitializer,
    T8 extends ComponentInitializer,
    T9 extends ComponentInitializer,
    T10 extends ComponentInitializer>(comps: ComponentsInitList<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>)
    => ComponentOf<T1> & ComponentOf<T2> & ComponentOf<T3> & ComponentOf<T4> & ComponentOf<T5> & ComponentOf<T6>
    & ComponentOf<T7> & ComponentOf<T8> & ComponentOf<T9> & ComponentOf<T10> & Entity ;

type ComponentsInitList<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> =
    Partial<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]> | { length: any } & {
    '0'?: T1;
    '1'?: T2;
    '2'?: T3;
    '3'?: T4;
    '4'?: T5;
    '5'?: T6;
    '6'?: T7;
    '7'?: T8;
    '8'?: T9;
    '9'?: T10;
}