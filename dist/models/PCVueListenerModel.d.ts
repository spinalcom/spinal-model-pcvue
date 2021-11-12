import { Model } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-model-graph';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
import { SpinalContext, SpinalNode } from 'spinal-env-viewer-graph-service';
import { INetwork } from '../data/INetwork';
declare class PCVueListenerModel extends Model {
    constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, network: SpinalNode<any>, organ: SpinalOrganConfigModel, monitor: INetwork);
}
export default PCVueListenerModel;
export { PCVueListenerModel };
