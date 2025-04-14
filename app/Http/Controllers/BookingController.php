<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class BookingController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Booking');
    }

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

    public function index()
    {
        $bookings = Booking::orderBy('created_at', 'desc')->get();
        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings
        ]);
    }
}
