import './can-constructor.css';
import CanView from './canView.jsx'
import CanControls from './canControls.jsx'

export default function CanConstructor() {
    return (
        <div className='c-can-constructor'>
            <CanView />
            <CanControls />
        </div>
    )
}