const utils = {
    methods: {
        NONE_SELECTED: 'NONE_SELECTED',
        USE_TEMPLATE: 'USE_TEMPLATE',
        START_FROM_SCRATCH: 'START_FROM_SCRATCH',
        UPLOAD_CONFIG: 'UPLOAD_CONFIG'
    },
    reaction_types: {
        AEROSOL: 'AEROSOL',
        GAS: 'GAS'
    },
    action_types: {
        CHANGE_REACTION_TYPE: 'CHANGE_REACTION_TYPE',
        ADD_GAS_SPECIES: 'ADD_GAS_SPECIES',
        REMOVE_GAS_SPECIES: 'REMOVE_GAS_SPECIES',
        CHANGE_EXISTING_SPECIES: 'CHANGE_EXISTING_SPECIES',
        CHANGE_CONDITIONS: 'CHANGE_CONDITIONS'
    }
}

export default utils
