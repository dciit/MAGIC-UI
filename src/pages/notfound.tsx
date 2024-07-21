import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { base } from '../constants';
function NotFound() {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
            <span className='animate-pulse text-red-500 text-[5em]'>404</span>
            <span className='font-bold'>Not Found</span>
            <span >The resource requested could not be found on this server !</span>
            <Button color='error' onClick={() => navigate(`/${base}/home`)}>กลับหน้าหลัก</Button>
        </div>
    )
}

export default NotFound