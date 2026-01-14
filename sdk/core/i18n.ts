
type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    'auth.method_not_supported': 'Authentication method not supported.',
    'auth.failed': 'Authentication failed: {{error}}',
    'auth.pi_failed': 'Pi Network authentication failed.',
    'auth.teos_failed': 'TEOS Wallet connection failed.',
    'auth.wallet_credentials_required': 'Wallet address, signature, and message are required.',
    'auth.signature_invalid': 'Cryptographic signature is invalid.',
    'auth.biometric_required': 'Biometric verification is required to proceed.',
  },
  ar: {
    'auth.method_not_supported': 'طريقة المصادقة غير مدعومة.',
    'auth.failed': 'فشلت المصادقة: {{error}}',
    'auth.pi_failed': 'فشلت مصادقة شبكة Pi.',
    'auth.teos_failed': 'فشل الاتصال بمحفظة TEOS.',
    'auth.wallet_credentials_required': 'عنوان المحفظة والتوقيع والرسالة مطلوبة.',
    'auth.signature_invalid': 'التوقيع المشفر غير صالح.',
    'auth.biometric_required': 'التحقق البيومتري مطلوب للمتابعة.',
  }
};

export const i18n = {
  currentLocale: 'en',
  t(key: string, vars: Record<string, string> = {}): string {
    let text = translations[this.currentLocale][key] || key;
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{{${k}}}`, v);
    });
    return text;
  },
  setLocale(locale: 'en' | 'ar') {
    this.currentLocale = locale;
  }
};
