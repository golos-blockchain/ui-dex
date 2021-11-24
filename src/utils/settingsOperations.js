import {getStorage, setStorage} from "./storage";
import {setNightMode, setSettings} from "../redux/actions";

export const initSettings = () => {
    const settings = getStorage("settings");

    if (!settings) return;

    if(settings.nightMode) toggleNightMode();

    setSettings(settings);
};

export const toggleNightMode = () => {
    const node = document.getElementById("root");

    if(node.classList.contains("dark-theme")) {
        node.classList.remove("dark-theme");
    } else {
        node.classList.add("dark-theme");
    }
};

export const saveNightModeSettings = () => {
    const settings = getStorage("settings") || { nightMode: false };

    settings.nightMode = !settings.nightMode;

    setStorage("settings", settings);
    setNightMode(settings.nightMode);
};

export const handleNightModeChange = () => {
    toggleNightMode();
    saveNightModeSettings();
};