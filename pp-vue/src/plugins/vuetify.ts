import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/components';

export type Headers = InstanceType<typeof VDataTable>['headers']

const darkStyles: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#ffffff',
    surface: '#e5e5e5',
    primary: '#000000',
    secondary: '#14213d',
    accent: '#fca311',
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
