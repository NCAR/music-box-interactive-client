export const RunStatus = Object.freeze({
  RUNNING: 'RUNNING',
  WAITING: 'WAITING',
  NOT_FOUND: 'NOT_FOUND',
  DONE: 'DONE',
  ERROR: 'ERROR',
  UNKNOWN: 'UNKNOWN',
});

export function translate_from_camp_config(config) {
  return {
    gasSpecies: config['species'].map((species) => ({ name: species, properties: [] })),
    reactions: config['reactions']
  }
}

export function translate_to_camp_config(config) {
  return config
}