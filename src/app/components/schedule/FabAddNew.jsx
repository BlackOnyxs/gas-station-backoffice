import { PlusOutlined } from '@ant-design/icons';
import { useUiStore } from '../../../hooks';


export const FabAddNew = () => {

    const { openScheduleModal } = useUiStore();
    // const { setActiveEvent } = useScheduleStore();

    const handleClickNew = () => {
        openScheduleModal();
        console.log('hey')
    }


  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
    >
        <PlusOutlined />
    </button>
  )
}