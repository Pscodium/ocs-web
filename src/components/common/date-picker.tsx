import { Input } from '@material-tailwind/react';
import React from 'react';

export interface DatePickerProps {
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
}

export default function DatePicker({ setDate, date }: DatePickerProps) {
    return (
        <div>
            <Input
                id='from-date-filter'
                label='Date'
                variant='outlined'
                color='indigo'
                type='datetime-local'
                value={date}
                onChange={({ target }) => setDate(target.value)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
            />
        </div>
    );
}
