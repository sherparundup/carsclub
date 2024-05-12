// Initial state for distributor
export let distributorInitialState = localStorage.getItem("Distributor");

// Reducer for distributor
export const distributorReducer = (distributorState, action) => {
    if (action.type === "DISTRIBUTOR") {
        return [action.payload, localStorage.setItem("Distributor", action.payload)];
    }
    return distributorState;
};
