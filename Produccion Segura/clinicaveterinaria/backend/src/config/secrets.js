const requiredSecrets = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'APP_URL'
];

function validateSecrets() {
  const missing = requiredSecrets.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`[clinicaveterinaria] Faltan secrets: ${missing.join(', ')}`);
  }
  console.log('✅ Secrets validados correctamente');
}

module.exports = { validateSecrets };