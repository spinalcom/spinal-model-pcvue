import { Model } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalNode } from 'spinal-env-viewer-graph-service';
import { SpinalGraph } from 'spinal-model-graph';
import { INetwork } from '../data/INetwork';
import { SpinalOrganConfigModel } from "spinal-connector-service";
declare class PCVueListenerModel extends Model {
    constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, network: SpinalNode<any>, organ: SpinalOrganConfigModel, monitor: INetwork);
    getGraph(): Promise<SpinalGraph<any>>;
    getOrgan(): Promise<SpinalOrganConfigModel>;
    getContext(): Promise<SpinalContext<any>>;
    getNetwork(): Promise<SpinalNode<any>>;
}
export default PCVueListenerModel;
export { PCVueListenerModel };
