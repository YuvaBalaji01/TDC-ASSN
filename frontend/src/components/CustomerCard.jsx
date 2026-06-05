import { Link } from "react-router-dom";

function CustomerCard({ customer }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

      <h2 className="text-xl font-bold">
        {customer.firstName} {customer.lastName}
      </h2>

      <div className="mt-4 space-y-2 text-gray-600">
        <p>Age: {customer.age}</p>
        <p>City: {customer.city}</p>

        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Active
        </span>
      </div>

      <Link
        to={`/customer/${customer._id}`}
        className="mt-5 inline-block bg-pink-600 text-white px-5 py-2 rounded-lg"
      >
        View Profile
      </Link>

    </div>
  );
}

export default CustomerCard;