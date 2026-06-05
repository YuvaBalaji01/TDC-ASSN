import { useEffect, useState } from "react";
import CustomerCard from "../components/CustomerCard";
import { getCustomers } from "../services/api";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await getCustomers();

        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((customer) => {
      const fullName =
        `${customer.firstName} ${customer.lastName}`.toLowerCase();

      return (
        fullName.includes(search.toLowerCase()) ||
        customer.city?.toLowerCase().includes(search.toLowerCase()) ||
        customer.gender?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredCustomers(filtered);
  }, [search, customers]);

  const maleCount = customers.filter(
    (customer) => customer.gender === "Male"
  ).length;

  const femaleCount = customers.filter(
    (customer) => customer.gender === "Female"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">
          Loading Customers...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-6">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-3xl font-bold">
                Matchmaker Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Manage customer profiles and matches
              </p>
            </div>

            <div className="bg-pink-600 text-white px-5 py-3 rounded-lg font-semibold">
              {customers.length} Customers
            </div>

          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, city or gender..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Total Profiles
            </h3>

            <p className="text-3xl font-bold mt-2">
              {customers.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Male Profiles
            </h3>

            <p className="text-3xl font-bold mt-2">
              {maleCount}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Female Profiles
            </h3>

            <p className="text-3xl font-bold mt-2">
              {femaleCount}
            </p>
          </div>

        </div>
      </div>

      {/* Customer Cards */}
      <div className="max-w-7xl mx-auto p-8">

        <div className="mb-4 text-gray-600">
          Showing {filteredCustomers.length} profiles
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer._id}
              customer={customer}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;