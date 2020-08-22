import {Component, registerComponent} from "../src/Component";

enum TestComponentsIds { // it will need for sure of order of component ids on NodeJs server and js clients
    None,
    TestPositionComponentId,
    TestVelocityComponentId,
    TestEmptyComponentId,
    TestGoodConventionComponent1Id,
    TestGoodConventionComponent2Id
}

@registerComponent(TestComponentsIds.TestPositionComponentId)
export class TestPositionComponent extends Component {

    public x: number;
    public y: number;

    public reset(obj: this): void {
        obj.x = 10;
        obj.y = 20;
    }
}

@registerComponent(TestComponentsIds.TestVelocityComponentId)
export class TestVelocityComponent extends Component {

    public dx: number;
    public dy: number;

    public reset(obj: this, multi: number = 1): void {
        obj.dx = 10 * multi;
        obj.dy = 20 * multi;
    }

}

@registerComponent(TestComponentsIds.TestEmptyComponentId)
export class TestEmptyComponent extends Component {
    public reset(obj: this): void {
    }
}

@registerComponent(TestComponentsIds.TestGoodConventionComponent1Id)
export class TestGoodConventionComponent1 extends Component{
    public conventionData1:{title:string,description:string}
    public reset(obj: this) {
        obj.conventionData1 = {title:"hello",description:"vitek"};
    }
}

@registerComponent(TestComponentsIds.TestGoodConventionComponent2Id)
export class TestGoodConventionComponent2 extends Component{
    public conventionData2:{title:string,description:string}
    public reset(obj: this) {
        obj.conventionData2 = {title:"bye",description:"vasyan"};
    }
}