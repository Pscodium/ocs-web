import DatePicker from '@/components/common/date-picker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@material-tailwind/react';
import moment from 'moment';
import { useState } from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa6';

export interface DateTimeProps {}

export default function DateTime() {
    const [date, setDate] = useState(moment().format('YYYY-MM-DDTHH:mm').toString());
    const [success, setSuccess] = useState(false);
    const [successCopy, setSuccessCopy] = useState({
        datetime: false,
        timestamp: false,
    });
    const [inputs, setInputs] = useState({
        datetime: '',
        timestamp: '',
    });

    function onGenerate() {
        setSuccess(true);
        setInputs({
            datetime: moment(date).format('YYYY-MM-DD HH:mm:ss').toString(),
            timestamp: moment(date).valueOf().toString(),
        });
    }

    function copyToClipboard(type: 'datetime' | 'timestamp') {
        if (type === 'datetime') {
            navigator.clipboard.writeText(inputs.datetime);
            setSuccessCopy({ ...successCopy, datetime: true });
        } else {
            navigator.clipboard.writeText(inputs.timestamp);
            setSuccessCopy({ ...successCopy, timestamp: true });
        }

        setTimeout(() => {
            setSuccessCopy({
                datetime: false,
                timestamp: false,
            });
        }, 1000);
    }

    return (
        <div className='min-h-screen w-full items-center justify-center flex pt-4 pr-10 pb-4 pl-10 rounded-lg sm:py-2'>
            <div className='shadow-xl p-10 max-w-[80%] rounded-md bg-white'>
                <Label className='text-[30px]'>Datetime Generator</Label>
                <p>
                    That tool simplifies conversion between simple dates or timestamps and fully formed datetimes. Whether you're working with human-readable date formats or machine-generated
                    timestamps, it effortlessly transitions between different representations of time.
                </p>
                <div className='flex flex-row gap-3 items-center py-7 justify-between'>
                    <div className='flex flex-row gap-3 items-center'>
                        <DatePicker date={date} setDate={setDate} />
                        <Button className='bg-core-primary hover:bg-core-secondary gap-2' onClick={onGenerate}>
                            <Label className='text-[16px]'>Generate</Label>
                        </Button>
                    </div>
                    {success && (
                        <div className='flex gap-7'>
                            <Input
                                aria-readonly
                                value={inputs.datetime}
                                label='Datetime'
                                variant='outlined'
                                icon={
                                    <div onClick={() => copyToClipboard('datetime')} className='cursor-pointer'>
                                        {successCopy.datetime ? <FaCheck /> : <FaCopy />}
                                    </div>
                                }
                                color='indigo'
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                crossOrigin={undefined}
                            />
                            <Input
                                aria-readonly
                                value={inputs.timestamp}
                                label='Timestamp'
                                variant='outlined'
                                icon={
                                    <div onClick={() => copyToClipboard('timestamp')} className='cursor-pointer'>
                                        {successCopy.timestamp ? <FaCheck /> : <FaCopy />}
                                    </div>
                                }
                                color='indigo'
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                crossOrigin={undefined}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
