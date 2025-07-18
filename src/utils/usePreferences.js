import { computed, ref, warn, watch } from 'vue'

const DEFAULT_PREFERENCES = {
  notation: 'lagrange',
  decimalPlaces: 4,
  independentVariable: 'x',
  dependentVariable: 'y',
  rootVariable: 'm',
  showSettings: false,
}

const STORAGE_KEY = 'morlan-preferences'

const preferences = ref({ ...DEFAULT_PREFERENCES })

const loadPreferences = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      const parsed = JSON.parse(stored)
      preferences.value = {
        ...DEFAULT_PREFERENCES,
        ...parsed,
      }
    }
  } catch (error) {
    console.warn('Failed to load preferences', error)
    preferences.value = { ...DEFAULT_PREFERENCES }
  }
}

const savePreferences = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences.value))
  } catch (error) {
    console.warn('Failed to save preferences', error)
  }
}

const resetPreferences = () => {
  preferences.value = { ...DEFAULT_PREFERENCES }
}

const updatePreference = (key, value) => {
  if (key in preferences.value) {
    preferences.value[key] = value
  } else {
    console.warn('Unknown preference ' + key)
  }
}

const getNotation = (notation, degree) => {
  const iV = preferences.value.independentVariable
  const dV = preferences.value.dependentVariable
  if (notation == 'leibniz') {
    return degree == 0 ? dV : `\\frac{d${degree == 1 ? '' : '^' + degree}${dV}}{d${iV}}`
  } else if (notation == 'lagrange') {
    return `${dV}${"'".repeat(degree)}`
  } else if (notation == 'newton') {
    return `${degree == 0 ? '' : '\\' + 'd'.repeat(degree) + 'ot'} ${dV}`
  }
}

export const usePreferences = () => {
  if (JSON.stringify(preferences.value) === JSON.stringify(DEFAULT_PREFERENCES)) {
    loadPreferences()
  }

  watch(preferences, savePreferences, { deep: true })

  return {
    preferences,
    loadPreferences,
    savePreferences,
    resetPreferences,
    updatePreference,

    getNotation,

    notation: computed(() => preferences.value.notation),
    decimalPlaces: computed(() => preferences.value.decimalPlaces),
    independentVariable: computed(() => preferences.value.independentVariable),
    dependentVariable: computed(() => preferences.value.dependentVariable),
    rootVariable: computed(() => preferences.value.rootVariable),
    showSettings: computed(() => preferences.value.showSettings),
  }
}
