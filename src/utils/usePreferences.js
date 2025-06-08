import { computed, ref, warn, watch } from "vue"

const DEFAULT_PREFERENCES = {
	notation: 'lagrange',
}

const STORAGE_KEY = 'morlan-preferences'

const preferences = ref({...DEFAULT_PREFERENCES});

const loadPreferences = () => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);

		if (stored) {
			const parsed = JSON.parse(stored);
			preferences.value = {
				...DEFAULT_PREFERENCES,
				...parsed
			}
		}
	} catch (error) {
		console.warn('Failed to load preferences', error);
		preferences.value = {...DEFAULT_PREFERENCES};
	}
}

const savePreferences = () => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences.value));
	} catch (error) {
		console.warn('Failed to save preferences', error);
	}
}

const resetPreferences = () => {
	preferences.value = { ...DEFAULT_PREFERENCES};
}

const updatePreference = (key, value) => {
	if (key in preferences.value) {
		preferences.value[key] = value;
	} else {
		console.warn('Unknown preference ' + key);
	}
}

export const usePreferences = () => {
	if (JSON.stringify(preferences.value) === JSON.stringify(DEFAULT_PREFERENCES)) {
		loadPreferences();
	}

	watch(preferences, savePreferences, {deep: true});

	return {
		preferences,
		loadPreferences,
		savePreferences,
		resetPreferences,
		updatePreference,

		notation: computed(() => preferences.value.notation),
	}
}