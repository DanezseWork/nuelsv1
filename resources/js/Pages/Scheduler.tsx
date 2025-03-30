import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Scheduler as BigScheduler, SchedulerData, ViewType, DATE_FORMAT, View, EventItem } from "react-big-schedule";
import dayjs from "dayjs";
import "react-big-schedule/dist/css/style.css";
import { useState } from 'react';

export default function BaseScheduler() {
    const [schedulerData] = useState(() => {
        // @ts-ignore - The package's type definitions are incomplete
        const data = new SchedulerData(new dayjs().format(DATE_FORMAT), ViewType.Week);
        data.setSchedulerLocale('pt-br');
        data.setCalendarPopoverLocale('pt_BR');
        
        data.setResources([
            { id: 'r0', name: 'Resource0', groupOnly: true },
            { id: 'r1', name: 'Resource1' },
            { id: 'r2', name: 'Resource2', parentId: 'r0' },
            { id: 'r3', name: 'Resource3', parentId: 'r4' },
            { id: 'r4', name: 'Resource4', parentId: 'r2' },
        ]);
        
        data.setEvents([
            {
                id: 1,
                start: '2022-12-18 09:30:00',
                end: '2022-12-19 23:30:00',
                resourceId: 'r1',
                title: 'I am finished',
                bgColor: '#D9D9D9',
            },
            {
                id: 2,
                start: '2022-12-18 12:30:00',
                end: '2022-12-26 23:30:00',
                resourceId: 'r2',
                title: 'I am not resizable',
                resizable: false,
            },
            {
                id: 3,
                start: '2022-12-19 12:30:00',
                end: '2022-12-20 23:30:00',
                resourceId: 'r3',
                title: 'I am not movable',
                movable: false,
            },
            {
                id: 4,
                start: '2022-12-19 14:30:00',
                end: '2022-12-20 23:30:00',
                resourceId: 'r1',
                title: 'I am not start-resizable',
                startResizable: false,
            },
            {
                id: 5,
                start: '2022-12-19 15:30:00',
                end: '2022-12-20 23:30:00',
                resourceId: 'r2',
                title: 'R2 has recurring tasks every week on Tuesday, Friday',
                rrule: 'FREQ=WEEKLY;DTSTART=20221219T013000Z;BYDAY=TU,FR',
                bgColor: '#f759ab',
            },
        ]);
        return data;
    });

    const prevClick = (schedulerData: SchedulerData) => {
        schedulerData.prev();
        schedulerData.setEvents(schedulerData.events);
    };

    const nextClick = (schedulerData: SchedulerData) => {
        schedulerData.next();
        schedulerData.setEvents(schedulerData.events);
    };

    // @ts-ignore - The package's type definitions are incomplete
    const onViewChange = (schedulerData: SchedulerData, view: View) => {
        schedulerData.setViewType(view);
        schedulerData.setEvents(schedulerData.events);
    };

    const onSelectDate = (schedulerData: SchedulerData, date: string) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(schedulerData.events);
    };

    const eventClicked = (schedulerData: SchedulerData, event: EventItem) => {
        alert(`You clicked event: ${event.title}`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Scheduler
                </h2>
            }
        >
            <Head title="Scheduler" />

            <BigScheduler
                schedulerData={schedulerData}
                prevClick={prevClick}
                nextClick={nextClick}
                onSelectDate={onSelectDate}
                onViewChange={onViewChange}
                eventItemClick={eventClicked}
            />
        </AuthenticatedLayout>
    );
}
