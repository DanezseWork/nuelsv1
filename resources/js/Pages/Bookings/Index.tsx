import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

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

export default function Index({ bookings }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Bookings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {booking.first_name} {booking.last_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{booking.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {format(new Date(booking.date), 'MMM dd, yyyy')} at {booking.time}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{booking.service}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {booking.location}
                                                    {booking.address && <div className="text-sm text-gray-500">{booking.address}</div>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                                          'bg-red-100 text-red-800'}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 