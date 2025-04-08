import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';

// Define types for our booking data
interface Booking {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
}

interface ColumnData {
  pending: Booking[];
  confirmed: Booking[];
  ongoing: Booking[];
  done: Booking[];
}

// Sample data - replace with your actual data from the backend
const initialData: ColumnData = {
  pending: [
    { id: 'booking-1', title: 'Makeup Session', client: 'Jane Doe', date: '2023-06-15', time: '10:00 AM' },
    { id: 'booking-2', title: 'Hair Styling', client: 'John Smith', date: '2023-06-16', time: '2:00 PM' },
  ],
  confirmed: [
    { id: 'booking-3', title: 'Full Makeup', client: 'Alice Johnson', date: '2023-06-17', time: '11:00 AM' },
    { id: 'booking-4', title: 'Bridal Makeup', client: 'Sarah Williams', date: '2023-06-18', time: '9:00 AM' },
  ],
  ongoing: [
    { id: 'booking-5', title: 'Evening Makeup', client: 'Emily Brown', date: '2023-06-19', time: '5:00 PM' },
  ],
  done: [
    { id: 'booking-6', title: 'Party Makeup', client: 'Michael Davis', date: '2023-06-14', time: '3:00 PM' },
    { id: 'booking-7', title: 'Casual Makeup', client: 'Lisa Anderson', date: '2023-06-13', time: '1:00 PM' },
  ],
};

export default function Dashboard() {
  const [columns, setColumns] = useState<ColumnData>(initialData);

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
    const sourceColumn = columns[source.droppableId as keyof ColumnData];
    const destColumn = columns[destination.droppableId as keyof ColumnData];
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
            <h3 className="text-lg font-medium text-gray-900">Booking Kanban Board</h3>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-yellow-400 mr-2"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-blue-400 mr-2"></div>
                <span className="text-sm text-gray-600">Confirmed</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-green-400 mr-2"></div>
                <span className="text-sm text-gray-600">Ongoing</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-gray-400 mr-2"></div>
                <span className="text-sm text-gray-600">Done</span>
              </div>
            </div>
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
                      className="flex h-full flex-col rounded-lg bg-yellow-50 p-4"
                    >
                      {columns.pending.map((booking, index) => (
                        <Draggable key={booking.id} draggableId={booking.id} index={index}>
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 rounded-md bg-white p-4 shadow-sm"
                            >
                              <h5 className="font-medium text-gray-900">{booking.title}</h5>
                              <p className="text-sm text-gray-600">{booking.client}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{booking.date}</span>
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
                        <Draggable key={booking.id} draggableId={booking.id} index={index}>
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 rounded-md bg-white p-4 shadow-sm"
                            >
                              <h5 className="font-medium text-gray-900">{booking.title}</h5>
                              <p className="text-sm text-gray-600">{booking.client}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{booking.date}</span>
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
                        <Draggable key={booking.id} draggableId={booking.id} index={index}>
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 rounded-md bg-white p-4 shadow-sm"
                            >
                              <h5 className="font-medium text-gray-900">{booking.title}</h5>
                              <p className="text-sm text-gray-600">{booking.client}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{booking.date}</span>
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
                        <Draggable key={booking.id} draggableId={booking.id} index={index}>
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3 rounded-md bg-white p-4 shadow-sm"
                            >
                              <h5 className="font-medium text-gray-900">{booking.title}</h5>
                              <p className="text-sm text-gray-600">{booking.client}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>{booking.date}</span>
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
