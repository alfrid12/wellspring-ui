import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { columns } from './config'


const RunTable = props => {

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    {columns.map(column => <th key={column.columnKey}>{column.columnHeader}</th>)}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.runs.map(run => (
                    <tr key={run.runId}>
                        {columns.map(column => (
                            <td key={`${run.runId}-${column.columnKey}`}>
                                {run[column.columnKey]}
                            </td>
                        ))}
                        <td>
                            &nbsp;<Button variant="warning" onClick={() => props.editRun(run.runId)}>Edit</Button>
                            &nbsp;<Button variant="danger" onClick={() => props.deleteRun(run.runId)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RunTable;
