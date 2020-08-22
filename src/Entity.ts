import {Component, ComponentInitializer} from "./Component";

export type EntityId = number;

export class EntityIdPool {
    private _entityId: EntityId = 0;
    private readonly _free: EntityId[] = [];

    public take(): EntityId {
        if (this._free.length > 0) {
            return this._free.pop();
        }
        return this._entityId++;
    }

    public put(entityId: EntityId) {
        this._free.push(entityId)
    }

    public clear() {
        this._entityId = 0;
        this._free.length = 0;
    }
}

export class Entity {
    public readonly id: EntityId;
    public readonly components: ComponentInitializer[];

    constructor(id:EntityId, components:ComponentInitializer[] = []) {
        this.id = id;
        this.components = components
    }
}