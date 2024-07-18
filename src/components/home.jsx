import React, { useState } from 'react';
import Modal from './modal';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss';

const MySwal = withReactContent(Swal);

export default function Home() {
  const [click, setClick] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedDate, setBookedDate] = useState('');

  const bookedData = useSelector((state) =>
    state.booking.bookings.map((booking) => ({
      date: booking.date,
      seats: booking.seat,
      name:booking.name
    }))
  );
  console.log(bookedData)

  const bookedSeatsForDate = bookedData
    .filter((booking) => booking.date === bookedDate)
    .flatMap((booking) => booking.seats);

  const Click = (val) => {
    if (bookedSeatsForDate.includes(val)) {
      // Find the booking that contains the booked seat
      const bookingWithSeat = bookedData.find(booking => booking.seats.includes(val));
  
      MySwal.fire({
        title: 'This Slot Is already Booked',
        text: `This seat is already booked by ${bookingWithSeat ? bookingWithSeat.name : ''}`,
        icon: 'sad',
        confirmButtonText: 'Okay'
      });
      return;
    }

    if (!selectedSeats.includes(val)) {
      setSelectedSeats([...selectedSeats, val]);
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== val));
    }
  };

  const bookNow = () => {
    if (bookedDate !== '') {
      setClick(true);
    } else {
      toast("Please select a date");
    }
  };

  const Close = () => {
    setClick(false);
    setSelectedSeats([]);
  };

  const dates = Array.from({ length: 36 }, (_, i) => i + 1);

  return (
    <div>
      <div className='bg-red-950 h-20'></div>
      <ToastContainer />
      <input
        className='flex items-center justify-center bg-slate-200'
        type='date'
        min={new Date().toISOString().split("T")[0]}
        value={bookedDate}
        onChange={(e) => setBookedDate(e.target.value)}
      />

      <div className='bg-stone-200 shadow-2xl flex flex-wrap p-40'>
        {dates.map((val) => (
          <button
            key={val}
            onClick={() => Click(val)}
            className={`w-20 h-10 m-2 flex items-center justify-center ${
              selectedSeats.includes(val)
                ? 'bg-blue-500 text-white'
                : bookedSeatsForDate.includes(val)
                ? 'bg-red-600'
                : 'bg-white'
            } shadow-md`}
            // disabled={bookedSeatsForDate.includes(val)}
          >
            {val}
          </button>
        ))}
        <button
          className='mx-10 w-60 h-10 flex items-center justify-center bg-black text-white mt-3'
          onClick={bookNow}
        >
          Book Now
        </button>
        {click && (
          <Modal booked={bookedDate} selectedSeats={selectedSeats} onClose={Close} />
        )}
      </div>
    </div>
  );
}
