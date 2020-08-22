import { System, SystemEntityType } from "../src/System";
import { EntityViewFactory } from "../src/EntityViewFactory";
import { TestPositionComponent, TestVelocityComponent } from "./TestComponents";

export class TestPositionSystem extends System {

    public view = EntityViewFactory.createView({
        components: [TestPositionComponent],
        onEntityAdded: this.onEntityAdded.bind(this),
        onEntityRemoved: this.onEntityRemoved.bind(this),
    });

    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
        //entity = this.view.entities[0];
        console.log("added 1");
    }

    public onEntityRemoved(entity: SystemEntityType<this, "view">): void {
        console.log("removed 1");
    }
}

export class TestVelocitySystem extends System {

    public view = EntityViewFactory.createView({
        components: [TestPositionComponent, TestVelocityComponent],
        onEntityAdded: this.onEntityAdded.bind(this),
        onEntityRemoved: this.onEntityRemoved.bind(this),
    });

    public viewOnlyVelocity = EntityViewFactory.createView({
        components: [TestVelocityComponent]
    });

    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
        console.log("added 2");
    }

    public onEntityRemoved(entity: SystemEntityType<this, "view">): void {
        console.log("removed 2");
    }
}

