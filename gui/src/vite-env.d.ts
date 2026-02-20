/// <reference types="vite/client" />
import type { WebviewApi } from "vscode-webview"

declare global {
    interface Window {
      isPearOverlay?: boolean;
      vscode: WebviewApi;
      initialRoute?: string;
      isFirstLaunch?: boolean;
      isPearOverlay?: boolean;
      viewType?: 'nellie.chatView' | 'nellie.mem0View' | 'nellie.searchView' | 'nellie.creatorView';
      __creatorOverlayAnimation?: {
        targetHeightOffset: undefined | string;
        timestamp: number;
      };
    }
  }

export {}