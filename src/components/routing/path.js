import {DashboardIcon, HistoryIcon, OrdersIcon, SettingsIcon, WalletIcon} from "../../svg";

const isExact = true;

export const trade = { tag: "trade", link: "/trade/" };
export const cabinet = { tag: "cabinet", link: "/cabinet/" };

export const tradeRoot = { tag: "trade", link: "/trade/", isExact };
export const tradePair = { tag: "trade", link: "/trade/:pair", isExact };

export const dashboard = { tag: "dashboard", link: "/cabinet/", icon: DashboardIcon, isExact };
export const wallet = { tag: "wallet", link: "/cabinet/wallet", icon: WalletIcon, isExact };
export const orders = { tag: "orders", link: "/cabinet/orders", icon: OrdersIcon, isExact };
export const userHistory = { tag: "history", link: "/cabinet/history", icon: HistoryIcon, isExact };
export const settings = { tag: "settings", link: "/cabinet/settings", icon: SettingsIcon, isExact };