import React from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addBooking } from "../slice";

export default function Modal({ booked, selectedSeats, onClose }) {
  const result=useSelector((state)=>state.booking.bookings)
  console.log("shihas", result) 
  const dispatch=useDispatch()
 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [value, setaValue] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    const data = { name, phone, date:booked, seat:selectedSeats };
    // console.log(data);
    setaValue([...value, data]);
    dispatch(addBooking(data))
    setName("");
    setPhone("");
    setDate("");
  };
  // console.log(value);
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-red-900 shadow-xl rounded-lg p-8 w-1/2 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Form</h2>
          <form onSubmit={submit}>
            <label className="block text-white">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <label className="block text-white">Phone No</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Phone No"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            {/* <label className="block text-white">Select a date</label> */}
            {/* <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
            /> */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-10"
              onClick={onClose}
            >
              close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
