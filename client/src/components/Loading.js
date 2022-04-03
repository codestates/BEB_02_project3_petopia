import {Spinner} from 'react-bootstrap';

function loading () {
    return (
        <div className="spinner-wrapper">
            <Spinner className="loading-spinner" animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default loading
