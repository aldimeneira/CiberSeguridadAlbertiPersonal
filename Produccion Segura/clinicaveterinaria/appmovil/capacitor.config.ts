import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.clinicaveterinaria.client',
  appName: 'Clínica Veterinaria Cliente',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
