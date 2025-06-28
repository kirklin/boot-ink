/**
 * Theme manager for handling active theme selection
 *
 * Adapted from google-gemini/gemini-cli (https://github.com/google-gemini/gemini-cli), licensed under Apache-2.0.
 */

import type { Theme } from "./theme.js";
import { AtomOneDark } from "./atom-one-dark.js";

class ThemeManager {
  private activeTheme: Theme = AtomOneDark;

  getActiveTheme(): Theme {
    return this.activeTheme;
  }

  setActiveTheme(theme: Theme) {
    this.activeTheme = theme;
  }
}

export const themeManager = new ThemeManager();
