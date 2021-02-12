import { Card, CardBody } from 'reactstrap';
import EntryCard from './EntryCard';
import './EntryList.css';

const EntryList = ({ entries }) => {
    return (
        <div className="EntryList">
            <Card>
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