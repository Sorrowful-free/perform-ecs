import {ComponentsGroup} from "./ComponentGroup";
import {ComponentsHash, getComponentsHash, getComponentsHashFromInitializators} from "./ComponentGroupHash";
import {ComponentConstructor, ComponentInitializer} from "./Component";
import {Entity} from "./Entity";

export class ComponentGroupRegistry {
    public componentsGroups: Map<ComponentsHash, ComponentsGroup> = new Map<ComponentsHash, ComponentsGroup>();

    public get(components: ComponentConstructor[], hash?: ComponentsHash): ComponentsGroup {
        hash = hash || getComponentsHash(components);
        if (!this.componentsGroups.has(hash)) {
            this.componentsGroups.set(hash, new ComponentsGroup(components));
        }
        return this.componentsGroups.get(hash);
    }

    public removeComponentFromEntity(entity: Entity, component: ComponentConstructor): void {
        this.componentsGroups.forEach((group) => {
            console.log(group.hash+" "+component.hash);
            if (group.hasComponent(component)) {
                group.removeEntity(entity);
            }
        });
    }

    public addEntity(entity: Entity, components: ComponentInitializer[]): void {
        const hash = getComponentsHashFromInitializators(components);
        this.componentsGroups.forEach((group) => {
            if (group.matchComponentHash(hash)) {
                group.addEntity(entity);
            }
        });
    }

    public removeEntity(entity: Entity): void {
        const hash = getComponentsHashFromInitializators(entity.components);
        this.componentsGroups.forEach((group) => {
            if (group.matchComponentHash(hash)) {
                group.removeEntity(entity);
            }
        });
    }
}