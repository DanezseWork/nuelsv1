<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Display the booking form.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Booking');
    }

    /**
     * Handle an incoming booking request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|string',
            'service' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
        ]);

        $booking = Booking::create($validated);

        return redirect()->back()->with('success', 'Booking submitted successfully!');
    }

    /**
     * Display a listing of the bookings.
     */
    public function index(): Response
    {
        $bookings = Booking::orderBy('created_at', 'desc')->get();
        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings
        ]);
    }

    public function updateStatus(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'status' => 'required|in:pending,confirmed,ongoing,done'
        ]);

        $booking = Booking::findOrFail($request->booking_id);
        $booking->status = $request->status;
        $booking->save();

        return back()->with('success', 'Status updated successfully');
    }
}
