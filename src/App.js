import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import WellspringApiService from './WellspringApiService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import RunTable from './RunTable';
import { columns, defaultModalRun, modalModes } from './config'

const App = () => {

    const [runs, setRuns] = useState([]);
    const [modalMode, setModalMode] = useState(modalModes.OFF);
    const [modalRun, setModalRun] = useState(defaultModalRun);

    useEffect(() => {
        retrieveAndSortRuns();
    }, []);

    const retrieveAndSortRuns = () => {
        WellspringApiService.getAllRuns(retrievedRuns => {
            const sortedRuns = getSortedRuns(retrievedRuns);
            setRuns(sortedRuns);
        }, errorResponse => {
            alert(errorResponse);
        });
    }

    const getSortedRuns = (unsortedRuns) => {
        const temporaryArray = [...unsortedRuns];
        temporaryArray.sort((a, b) => a.runNumber.localeCompare(b.runNumber));
        return temporaryArray;
    };

    const editRun = runId => {
        const runToEdit = runs.filter(run => run.runId === runId)[0];
        setModalRun(runToEdit);
        setModalMode(modalModes.EDIT);
    };

    const deleteRun = runId => {
        WellspringApiService.deleteRun(runId, successResponse => {
            alert("Successfully deleted run");
            retrieveAndSortRuns();
        }, errorResponse => {
            alert("Failed to delete run. Check logs for details.");
        })
    };

    const handleModalRunChange = (event, attributeKey) => {
        const newRun = { ...modalRun };
        newRun[attributeKey] = event.target.value;
        setModalRun(newRun);
    };

    const closeModal = () => {
        setModalMode(modalModes.OFF);
        setModalRun(defaultModalRun);
    };

    const saveModalRun = () => {
        console.log(modalRun);
        if (modalMode === modalModes.INSERT) {
            WellspringApiService.createRun(modalRun, successfullyCreatedRun => {
                const newRuns = [successfullyCreatedRun, ...runs];
                setRuns(newRuns);
                setModalRun(defaultModalRun);
                setModalMode(modalModes.OFF);
                alert("Successfully created run");
            }, errorResponse => {
                console.log(errorResponse);
                setModalMode(modalModes.OFF);
                alert("Failed to create run. Check logs for details");
            });
        } else if (modalMode === modalModes.EDIT) {
            WellspringApiService.updateRun(modalRun.runId, modalRun, successfullyCreatedRun => {
                const unchangedRuns = runs.filter(run => run.runId !== modalRun.runId);
                const newRuns = [successfullyCreatedRun, ...unchangedRuns];
                setRuns(newRuns);
                setModalRun(defaultModalRun);
                setModalMode(modalModes.OFF);
                alert("Successfully updated run");
            }, errorResponse => {
                setModalMode(modalModes.OFF);
                alert("Failed to update run. Check logs for details");
            });
        }
    };

    return (
        <div>
            <h1 style={{margin: "2%"}}>Train Tracker</h1>
            <div style= {{marginLeft: "1%"}}>
                <RunTable runs={runs} editRun={editRun} deleteRun={deleteRun} />
                
                <Button variant="primary" onClick={() => setModalMode(modalModes.INSERT)}>
                    Create Run
                </Button>
            </div>
            
            <Modal show={modalMode === modalModes.INSERT || modalMode === modalModes.EDIT} onHide={() => setModalMode(modalModes.OFF)}>
                <Modal.Header>
                    {modalMode === modalModes.INSERT && <Modal.Title>Create Run</Modal.Title>}
                    {modalMode === modalModes.EDIT && <Modal.Title>Edit Run</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {columns.map(column => (
                                <div key={column.columnKey}>
                                    <Form.Label>{column.columnHeader}</Form.Label>
                                    <Form.Control type="text"
                                        value={modalRun[column.columnKey]}
                                        onChange={(event) => handleModalRunChange(event, column.columnKey)} />
                                    <br />
                                </div>
                            ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveModalRun}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default App;
