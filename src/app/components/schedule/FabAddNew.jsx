import { PlusOutlined } from '@ant-design/icons';
import { useUiStore } from '../../../hooks';


export const FabAddNew = () => {

    const { openModal } = useUiStore();
    // const { setActiveEvent } = useScheduleStore();

    const handleClickNew = () => {
        openModal();
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