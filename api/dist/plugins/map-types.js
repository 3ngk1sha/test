"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_block_plugin_1 = require("./base-block-plugin");
const base_event_plugin_1 = require("./base-event-plugin");
const types_1 = require("./types");
const PLUGIN_TYPE_MAP = {
    [types_1.PluginType.event]: base_event_plugin_1.BaseEventPlugin,
    [types_1.PluginType.block]: base_block_plugin_1.BaseBlockPlugin,
};
//# sourceMappingURL=map-types.js.map