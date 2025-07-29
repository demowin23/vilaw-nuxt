// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com/api/v1' 
    : 'http://localhost:4000/api/v1',
  
  ENDPOINTS: {
    AUTH: {
      SEND_REGISTRATION_OTP: '/auth/send-registration-otp',
      REGISTER: '/auth/register',
      SEND_LOGIN_OTP: '/auth/send-login-otp',
      LOGIN_OTP: '/auth/login-otp',
      LOGIN_PASSWORD: '/auth/login',
      ME: '/auth/me',
      UPDATE_PROFILE: '/auth/update-profile',
      LOGOUT: '/auth/logout',
    },
    CHAT: {
      CONVERSATIONS: '/chat/conversations',
      MESSAGES: '/chat/conversations/:id/messages',
      LAWYERS: '/chat/lawyers',
      ONLINE_STATUS: '/chat/online-status',
      STATS: '/chat/stats',
    }
  }
}

// App Configuration
export const APP_CONFIG = {
  NAME: 'VILAW',
  DESCRIPTION: 'Nền tảng tư vấn pháp lý trực tuyến',
  VERSION: '1.0.0',
  
  // OTP Configuration
  OTP: {
    LENGTH: 6,
    EXPIRY_TIME: 60, // seconds
    RESEND_DELAY: 60, // seconds
  },
  
  // Validation Rules
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 8,
    PHONE_REGEX: /^[0-9]{10,11}$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  AUTH_USER: 'auth_user',
  THEME: 'theme',
  LANGUAGE: 'language',
} 