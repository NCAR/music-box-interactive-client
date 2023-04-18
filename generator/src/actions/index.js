import utils from '../utils';

export const addGasSpecies = (content) => {
    return {
        type: utils.action_types.ADD_GAS_SPECIES,
        payload: { content }
    }
}

export const removeGasSpecies = (content) => {
    return {
        type: utils.action_types.REMOVE_GAS_SPECIES,
        payload: { content }
    }
}

export const changeReactionType = (reactionType) => {
    return {
        type: utils.action_types.CHANGE_REACTION_TYPE,
        payload: reactionType
    }
}

// TODO: define species config

// aerosol
// {
//     name:
//     description:
//     molecular weight:
//     fixed concentration:
//     density:
//     kappa:
// }

// gas
// {
//     description:
//     absolute_convergence_tolerance:
//     molecular_weight:
//     fixed_concentration:
// }

// TODO: add ADD_NEW_SPECIES to util.action_types
export const addNewSpecies = (speciesConfig) => {
    return {
        type: utils.action_types.ADD_NEW_SPECIES,
        payload: speciesConfig
    }
}

export const changeExistingSpecies = (speciesConfig) => {
    return {
        type: utils.action_types.CHANGE_EXISTING_SPECIES,
        payload: speciesConfig
    }
}

// TODO: define conditionsConfig
// {
//     latitude:
//     longitude:
//     startTime:
//     startDay:
//     model: {
//         name:
//         model_config:
//     }
// }

// PartMC model_config
// {
//     num_particles:
//     fractal_treatment:
//     frac_dim:
//     prime_radius:
//     height_profile_file:
//     loss_function_specification:
//     do_coagulation:
//     coagulation_kernel_options:
//     do_nucleation:
//     modes: {
//         {
//             mode_name:
                // num_conc:
                // mass_frac_list: {
                //     {
                //         species:
                //         mass_frac:
                //     },
                //     {
                //         ...
                //     }
                // }
                // diam_type:
                // mode_type:
//         }, 
//         {
//             ...
//         }
//     }
// }

export const changeConditions = (conditionsConfig) => {
    return {
        type: utils.action_types.CHANGE_CONDITIONS,
        payload: conditionsConfig
    }
}

export const loadConfig = ( config ) => {
    return {
        type: utils.action_types.LOAD_CONFIG,
        payload: { content: config }
    }
}