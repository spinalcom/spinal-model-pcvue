"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCVueListenerModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
// import SpinalOrganConfigModel from './SpinalOrganConfigModel';
class PCVueListenerModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, network, organ, monitor) {
        super();
        this.add_attr({
            id: uuid_1.v4(),
            listen: true,
            saveTimeSeries: monitor === null || monitor === void 0 ? void 0 : monitor.saveTimeSeries,
            intervalTime: monitor === null || monitor === void 0 ? void 0 : monitor.interval,
            graph: new spinal_core_connectorjs_type_1.Pbr(graph),
            context: new spinal_core_connectorjs_type_1.Pbr(context),
            network: new spinal_core_connectorjs_type_1.Pbr(network),
            organ: new spinal_core_connectorjs_type_1.Pbr(organ)
        });
    }
    getGraph() {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.graph.load((data) => resolve(data), (err) => reject(err));
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
    getNetwork() {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            this.network.load((data) => resolve(data), (err) => reject(err));
        });
    }
}
exports.PCVueListenerModel = PCVueListenerModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([PCVueListenerModel]);
exports.default = PCVueListenerModel;
//# sourceMappingURL=PCVueListenerModel.js.map