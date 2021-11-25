"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalPCVueDiscoverModel = void 0;
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
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalPCVueDiscoverModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, organ, network, file) {
        super();
        this.add_attr({
            id: uuid_1.v4(),
            state: new spinal_core_connectorjs_type_1.Choice(0, ["initial", "uploading", "uploaded", "converting", "converted", "creating", "created", "error"]),
            network,
            //@ts-ignore
            file: new spinal_core_connectorjs_type_1.Pbr(file),
            organ: new spinal_core_connectorjs_type_1.Pbr(organ),
            context: new spinal_core_connectorjs_type_1.Pbr(context),
            graph: new spinal_core_connectorjs_type_1.Pbr(graph)
        });
    }
    getGraph() {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.graph.load((data) => resolve(data), (err) => reject(err));
        });
    }
    getFile() {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.file.load((data) => resolve(data), (err) => reject(err));
        });
    }
    getOrgan() {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.organ.load((data) => resolve(data), (err) => reject(err));
        });
    }
    getContext() {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.context.load((data) => resolve(data), (err) => reject(err));
        });
    }
    addToGraph() {
        return new Promise((resolve, reject) => {
            this.getOrgan().then((organ) => {
                if (organ.discover) {
                    organ.discover.load((list) => {
                        for (let i = 0; i < list.length; i++) {
                            const element = list[i];
                            if (element.id.get() === this.id.get())
                                return resolve(element);
                        }
                        list.push(this);
                        resolve(this);
                    });
                }
                else {
                    organ.add_attr({
                        discover: new spinal_core_connectorjs_type_1.Ptr(new spinal_core_connectorjs_type_1.Lst([this]))
                    });
                    resolve(this);
                }
            });
        });
    }
    removeToGraph() {
        return new Promise((resolve, reject) => {
            this.getOrgan().then((organ) => {
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
                    });
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    setInitialState() {
        this.state.set("initial");
    }
    setUploadingState() {
        this.state.set("uploading");
    }
    setUploadedState() {
        this.state.set("uploaded");
    }
    setConvertingState() {
        this.state.set("converting");
    }
    setConvertedState() {
        this.state.set("converted");
    }
    setCreatingState() {
        this.state.set("creating");
    }
    setCreatedState() {
        this.state.set("created");
    }
    setErrorState() {
        this.state.set("error");
    }
}
exports.SpinalPCVueDiscoverModel = SpinalPCVueDiscoverModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalPCVueDiscoverModel]);
exports.default = SpinalPCVueDiscoverModel;
//# sourceMappingURL=SpinalPCVueDiscoverModel.js.map