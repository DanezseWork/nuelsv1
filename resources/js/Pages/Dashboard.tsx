import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { format } from 'date-fns';

// Define types for our booking data
interface Booking {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  location: string;
  address: string | null;
  status: string;
  created_at: string;
}

interface Props {
  bookings: Booking[];
}

export default function Dashboard({ bookings = [] }: Props) {
  // Initialize columns with real data
  const initialData = {
    pending: bookings.filter(b => b.status === 'pending'),
    confirmed: bookings.filter(b => b.status === 'confirmed'),
    ongoing: bookings.filter(b => b.status === 'ongoing'),
    done: bookings.filter(b => b.status === 'done'),
  };

  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get the source and destination columns
    const sourceColumn = columns[source.droppableId as keyof typeof columns];
    const destColumn = columns[destination.droppableId as keyof typeof columns];
    const sourceItems = [...sourceColumn];
    const destItems = source.droppableId === destination.droppableId
      ? sourceItems
      : [...destColumn];

    // Remove from source
    const [removed] = sourceItems.splice(source.index, 1);
    
    // Insert into destination
    destItems.splice(destination.index, 0, removed);

    // Update state
    setColumns({
      ...columns,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems,
    });

    // Update the booking status in the database
    router.post(route('bookings.update-status'), {
      booking_id: removed.id,
      status: destination.droppableId,
    }, {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Booking Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Status</h3>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Pending Column */}
              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-700">Pending</h4>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-medium text-yellow-800">
                    {columns.pending.length}
                  </span>
                </div>
                <Droppable droppableId="pending">
                  {(provided: DroppableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex h-full min-h-[80vh] flex-col rounded-lg bg-yellow-50 p-4"
                    >
                      {columns.pending.map((booking, index) => (
                        <Draggable key={booking.id} draggableId={booking.id.toString()} index={index}>
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 rounded-md bg-white p-4 shadow-sm"
                            >
                              <h5 className="font-medium text-gray-900">{booking.service}</h5>
                              <p className="text-sm text-gray-600">{booking.first_name} {booking.last_name}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Confirmed Column */}
              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-700">Confirmed</h4>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-800">
                    {columns.confirmed.length}
                  </span>
                </div>
                <Droppable droppableId="confirmed">
                  {(provided: DroppableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex h-full flex-col rounded-lg bg-blue-50 p-4"
                    >
                      {columns.confirmed.map((booking, index) => (
                        <Draggable key={booking.id} draggableId={booking.id.toString()} index={index}>
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 rounded-md bg-white p-4 shadow-sm"
                            >
                              <h5 className="font-medium text-gray-900">{booking.service}</h5>
                              <p className="text-sm text-gray-600">{booking.first_name} {booking.last_name}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Ongoing Column */}
              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-700">Ongoing</h4>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-800">
                    {columns.ongoing.length}
                  </span>
                </div>
                <Droppable droppableId="ongoing">
                  {(provided: DroppableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex h-full flex-col rounded-lg bg-green-50 p-4"
                    >
                      {columns.ongoing.map((booking, index) => (
                        <Draggable key={booking.id} draggableId={booking.id.toString()} index={index}>
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 rounded-md bg-white p-4 shadow-sm"
                            >
                              <h5 className="font-medium text-gray-900">{booking.service}</h5>
                              <p className="text-sm text-gray-600">{booking.first_name} {booking.last_name}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Done Column */}
              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-md font-medium text-gray-700">Done</h4>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                    {columns.done.length}
                  </span>
                </div>
                <Droppable droppableId="done">
                  {(provided: DroppableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex h-full flex-col rounded-lg bg-gray-50 p-4"
                    >
                      {columns.done.map((booking, index) => (
                        <Draggable key={booking.id} draggableId={booking.id.toString()} index={index}>
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 rounded-md bg-white p-4 shadow-sm"
                            >
                              <h5 className="font-medium text-gray-900">{booking.service}</h5>
                              <p className="text-sm text-gray-600">{booking.first_name} {booking.last_name}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
