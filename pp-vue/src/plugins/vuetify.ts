import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/components';

export type Headers = InstanceType<typeof VDataTable>['headers']

const darkStyles: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0d1321',
    surface: '#f0ebd8',
    primary: '#1d2d44',
    secondary: '#344257',
    accent: '#4ec3e0',
    error: '#f44336',
    warning: '#ff9800',
    info: '#3f51b5',
    success: '#8bc34a'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'darkStyles',
    themes: {darkStyles},
  },
  components: {...components, VDataTable},
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})
