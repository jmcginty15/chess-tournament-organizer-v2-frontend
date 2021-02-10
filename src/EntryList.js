import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import EntryCard from './EntryCard';
import './EntryList.css';

const EntryList = ({ entries }) => {
    return (
        <div className="EntryList">
            <Card>
                <CardHeader>
                    <h6 className="EntryList-header">Entries</h6>
                </CardHeader>
                {entries.length ? (
                    <CardBody>
                        {entries.map(entry => <EntryCard key={entry.player} entry={entry} />)}
                    </CardBody>
                ) : (
                        <CardBody>
                            <h4>No entries yet!</h4>
                        </CardBody>
                    )}
            </Card>
        </div>
    )
}

export default EntryList;