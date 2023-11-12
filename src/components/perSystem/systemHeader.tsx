/* eslint-disable react-hooks/exhaustive-deps */
import systemStore from '../../store/SystemStore';

export const SystemHeader = () => {

    return (
        <div>
                <h1>{systemStore.currentSystem?.topic || 'no system'}</h1>
                <h4>{systemStore.currentSystem?.description || 'no system'}</h4>
        </div>
    )
}