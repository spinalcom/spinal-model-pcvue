/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
 * 
 * This file is part of SpinalCore.
 * 
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 * 
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 * 
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
import { Choice, File as SpinalFile, Lst, Model, Pbr, Ptr, spinalCore } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";
import { INetwork } from '../data/INetwork';
import { SpinalOrganConfigModel } from "spinal-connector-service";

class SpinalPCVueDiscoverModel extends Model {

    constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalOrganConfigModel, network: INetwork, file: typeof SpinalFile) {
        super();

        this.add_attr({
            id: uuidv4(),
            state: new Choice(0, ["initial", "uploading", "uploaded", "converting", "converted", "creating", "created", "error"]),
            network,
            //@ts-ignore
            file: new Pbr(file),
            organ: new Pbr(organ),
            context: new Pbr(context),
            graph: new Pbr(graph)
        })
    }

    public getGraph(): Promise<SpinalGraph<any>> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.graph.load((data) => resolve(data), (err) => reject(err))
        });
    }

    public getFile(): Promise<typeof SpinalFile> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.file.load((data) => resolve(data), (err) => reject(err))
        });
    }

    public getOrgan(): Promise<SpinalOrganConfigModel> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.organ.load((data) => resolve(data), (err) => reject(err))
        });
    }

    public getContext(): Promise<SpinalContext<any>> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.context.load((data) => resolve(data), (err) => reject(err))
        });
    }

    public addToGraph(): Promise<SpinalPCVueDiscoverModel> {

        return new Promise((resolve, reject) => {
            this.getOrgan().then((organ: SpinalOrganConfigModel) => {
                if (organ.discover) {
                    organ.discover.load((list) => {
                        for (let i = 0; i < list.length; i++) {
                            const element = list[i];
                            if (element.id.get() === this.id.get()) return resolve(element);
                        }
                        list.push(this);
                        resolve(this);
                    })
                } else {
                    organ.add_attr({
                        discover: new Ptr(new Lst([this]))
                    })

                    resolve(this);
                }
            })
        });
    }

    public removeToGraph(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getOrgan().then((organ: SpinalOrganConfigModel) => {
                if (organ.discover) {
                    organ.discover.load((list) => {
                        for (let i = 0; i < list.length; i++) {
                            const element = list[i];
                            if (element.id.get() === this.id.get()) {
                                list.splice(i, 1);
                                return resolve(true);
                            }
                        }

                        resolve(false);
                    })
                } else {
                    resolve(false)
                }
            })
        });

    }



    public setInitialState(): void {
        this.state.set("initial");
    }

    public setUploadingState(): void {
        this.state.set("uploading");
    }

    public setUploadedState(): void {
        this.state.set("uploaded");
    }

    public setConvertingState(): void {
        this.state.set("converting");
    }

    public setConvertedState(): void {
        this.state.set("converted");
    }

    public setCreatingState(): void {
        this.state.set("creating");
    }

    public setCreatedState(): void {
        this.state.set("created");
    }

    public setErrorState(): void {
        this.state.set("error");
    }
}

spinalCore.register_models([SpinalPCVueDiscoverModel]);

export {
    SpinalPCVueDiscoverModel
};

export default SpinalPCVueDiscoverModel;