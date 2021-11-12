import { Model, File as SpinalFile } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph } from 'spinal-env-viewer-graph-service';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
import { INetwork } from '../data/INetwork';
declare class SpinalPCVueDiscoverModel extends Model {
    constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganConfigModel, network: INetwork, file: typeof SpinalFile);
    getGraph(): Promise<SpinalGraph<any>>;
    getFile(): Promise<typeof SpinalFile>;
    getOrgan(): Promise<SpinalOrganConfigModel>;
    getContext(): Promise<SpinalContext<any>>;
    addToGraph(): Promise<SpinalPCVueDiscoverModel>;
    removeToGraph(): Promise<boolean>;
    setInitialState(): void;
    setUploadingState(): void;
    setUploadedState(): void;
    setConvertingState(): void;
    setConvertedState(): void;
    setCreatingState(): void;
    setCreatedState(): void;
    setErrorState(): void;
}
export { SpinalPCVueDiscoverModel };
export default SpinalPCVueDiscoverModel;
