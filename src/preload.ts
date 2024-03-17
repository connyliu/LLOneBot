// Electron 主进程 与 渲染进程 交互的桥梁

import {Config, LLOneBotError} from "./common/types";
import {
    CHANNEL_ERROR,
    CHANNEL_GET_CONFIG,
    CHANNEL_LOG,
    CHANNEL_REMOTEVERSION,
    CHANNEL_SELECT_FILE,
    CHANNEL_SET_CONFIG,
    CHANNEL_UPDATE,
} from "./common/channels";

const {contextBridge} = require("electron");
const {ipcRenderer} = require('electron');

const llonebot = {
    log: (data: any) => {
        ipcRenderer.send(CHANNEL_LOG, data);
    },
    getRemoteVersion:async (): Promise<string> => {
        return ipcRenderer.invoke(CHANNEL_REMOTEVERSION);
    },
    updateLLOneBot:async (): Promise<boolean> => {
        return ipcRenderer.invoke(CHANNEL_UPDATE);
    },
    setConfig: (config: Config) => {
        ipcRenderer.send(CHANNEL_SET_CONFIG, config);
    },
    getConfig: async (): Promise<Config> => {
        return ipcRenderer.invoke(CHANNEL_GET_CONFIG);
    },
    getError: async (): Promise<LLOneBotError> => {
        return ipcRenderer.invoke(CHANNEL_ERROR);
    },
    selectFile: (): Promise<string> => {
        return ipcRenderer.invoke(CHANNEL_SELECT_FILE);
    }
}

export type LLOneBot = typeof llonebot;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld("llonebot", llonebot);