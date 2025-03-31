import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Scheduler() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
 
    const calendar = useCalendarApp({
      views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      events: [
        {
          id: '1',
          title: 'Event 1',
          start: '2023-12-16',
          end: '2023-12-16',
        },
      ],
      plugins: [eventsService]
    })
   
    useEffect(() => {
      // get all events
      eventsService.getAll()
    }, [])

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Scheduler
                </h2>
            }
        >
            <Head title="Scheduler" />
            <div className='w-full h-full p-10'>
                <div className='w-full h-full p-5 [--sx-color-primary:#fbe37b] [--sx-color-on-primary:#000000] [--sx-color-secondary:#facc15] [--sx-color-on-secondary:#000000] [--sx-color-background:#ffffff] [--sx-color-surface:#ffffff] [--sx-color-text:#000000] [--sx-color-border:#e5e7eb]'>
                    <ScheduleXCalendar calendarApp={calendar} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
