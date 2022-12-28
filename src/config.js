export const columns = [{
    columnHeader: 'Train Line',
    columnKey: 'trainLineName'
}, {
    columnHeader: 'Route',
    columnKey: 'routeName'
}, {
    columnHeader: 'Run Number',
    columnKey: 'runNumber'
}, {
    columnHeader: 'Operator ID',
    columnKey: 'operatorId'
}];

export const modalModes = {
    OFF: 'off',
    INSERT: 'insert',
    EDIT: 'edit'
};

export const defaultModalRun = {
    runId: '',
    trainLineName: '',
    routeName: '',
    runNumber: '',
    operatorId: ''
};
