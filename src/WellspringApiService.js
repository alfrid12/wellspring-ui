const wellspringApiBaseUrl = 'http://localhost:5000';

const getAllRuns = (successCallback, errorCallback) => {
    fetch(`${wellspringApiBaseUrl}/runs`).then(successResponse => {
        console.log('Successfully retrieved runs using Wellspring API');
        successResponse.json().then(successCallback).catch(errorCallback);
    }, errorResponse => {
        console.log('Failed to retrieve runs using Wellspring API');
        errorCallback(errorResponse);
    });
};

const createRun = (run, successCallback, errorCallback) => {
    fetch(`${wellspringApiBaseUrl}/runs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(run)
    }).then(successResponse => {
        console.log('Successfully created run using Wellspring API');
        successResponse.json().then(successCallback).catch(errorCallback);
    }, errorResponse => {
        console.log('Failed to create run using Wellspring API');
        errorCallback(errorResponse);
    });
};

const updateRun = (runId, run, successCallback, errorCallback) => {
    fetch(`${wellspringApiBaseUrl}/runs/${runId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(run)
    }).then(successResponse => {
        console.log('Successfully updated run using Wellspring API');
        successResponse.json().then(successCallback).catch(errorCallback);
    }, errorResponse => {
        console.log('Failed to update run using Wellspring API');
        errorCallback(errorResponse);
    });
};

const deleteRun = (runId, successCallback, errorCallback) => {
    fetch(`${wellspringApiBaseUrl}/runs/${runId}`, {
        method: 'DELETE'
    }).then(successResponse => {
        console.log('Successfully deleted run using Wellspring API');
        successResponse.json().then(successCallback).catch(errorCallback);
    }, errorResponse => {
        console.log('Failed to delete run using Wellspring API');
        errorCallback(errorResponse);
    });
};

const WellspringApiService = {
    getAllRuns,
    createRun,
    updateRun,
    deleteRun
};

export default WellspringApiService;
