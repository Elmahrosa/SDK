/**
 * i18n module (provider-pluggable).
 * Default implementation is placeholder; integrate with your translation provider.
 */
export class I18n {
  /**
   * @param {{ translate: (text: string, targetLang: string, sourceLang?: string) => Promise<string> }} provider
   */
  static setProvider(provider) {
    I18n._provider = provider;
  }

  static async translate(text, targetLang = "en", sourceLang) {
    if (!text) throw new Error("I18n.translate: text required");
    if (I18n._provider?.translate) {
      return I18n._provider.translate(text, targetLang, sourceLang);
    }
    return `[${targetLang}] ${text}`;
  }

  static detectLanguage(text) {
    if (!text) return "unknown";
    // naive heuristic placeholder
    const hasArabic = /[؀-ۿ]/.test(text);
    return hasArabic ? "ar" : "en";
  }
}
