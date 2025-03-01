// @ts-ignore
import tsParser from '@typescript-eslint/parser'
import withNuxt from './.nuxt/eslint.config.mjs'
import vueParser from 'vue-eslint-parser'

export default withNuxt({
  files: ['**/*.vue'],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsParser,
      extraFileExtensions: ['.vue'],
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/object-curly-spacing': [2, 'always'],
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
  },
})
