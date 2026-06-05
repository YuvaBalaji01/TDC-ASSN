
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchModal from "../components/MatchModal";
import {
  getCustomer,
  getMatches,
  generateEmail,
} from "../services/api";

function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const customerData = await getCustomer(id);
        const matchData = await getMatches(id);

        setCustomer(customerData);
        setMatches(matchData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">
          Loading Customer...
        </h1>
      </div>
    );
  }

  const handleSendMatch = async (
    match
  ) => {
    try {
      const response =
        await generateEmail(
          customer._id,
          match.customer._id,
          match.score,
          match.explanation
        );

      setEmail(response.email);

      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold">
            Customer Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Customer ID: {id}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Info
                  label="Name"
                  value={`${customer.firstName} ${customer.lastName}`}
                />
                <Info label="Gender" value={customer.gender} />
                <Info label="Age" value={customer.age} />
                <Info label="Height" value={customer.height} />
                <Info label="City" value={customer.city} />
                <Info label="Country" value={customer.country} />
                <Info
                  label="Marital Status"
                  value={customer.maritalStatus}
                />
                <Info label="Religion" value={customer.religion} />
                <Info label="Caste" value={customer.caste} />
                <Info
                  label="Languages"
                  value={customer.languages?.join(", ") || "N/A"}
                />
              </div>
            </div>

            {/* Education & Career */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Education & Career
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Info label="College" value={customer.college} />
                <Info label="Degree" value={customer.degree} />
                <Info label="Company" value={customer.company} />
                <Info label="Designation" value={customer.designation} />
                <Info label="Income" value={customer.income} />
              </div>
            </div>

            {/* Partner Preferences */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Partner Preferences
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <Info label="Want Kids" value={customer.wantKids} />
                <Info
                  label="Open To Relocate"
                  value={customer.openToRelocate}
                />
                <Info
                  label="Open To Pets"
                  value={customer.openToPets}
                />
              </div>
            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="sticky top-8 h-[calc(100vh-120px)]">

            <div className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col">

              <h2 className="text-xl font-bold mb-5 flex-shrink-0">
                Suggested Matches
              </h2>

              <div className="overflow-y-auto flex-1 space-y-5 pr-2">

                {matches.map((match) => (
                  <div
                    key={match.customer._id}
                    className={`rounded-xl p-4 border-l-4 shadow-sm ${
                      match.score >= 80
                        ? "border-green-500"
                        : match.score >= 60
                        ? "border-yellow-500"
                        : "border-red-500"
                    }`}
                  >
                    <h3 className="font-bold text-lg">
                      {match.customer.firstName}{" "}
                      {match.customer.lastName}
                    </h3>

                    <p className="text-gray-600">
                      {match.customer.age} • {match.customer.city}
                    </p>

                    <div className="mt-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          match.score >= 80
                            ? "bg-green-100 text-green-700"
                            : match.score >= 60
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Compatibility {match.score}%
                      </span>
                    </div>

                    <p className="text-gray-600 mt-3 text-sm">
                      {match.explanation}
                    </p>

                  <button
                    onClick={() =>
                      handleSendMatch(match)
                    }
                    className={`w-full mt-4 text-white py-2 rounded-lg transition ${
                      match.score >= 80
                        ? "bg-green-600 hover:bg-green-700"
                        : match.score >= 60
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Send Match
                  </button>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </div>
      <MatchModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
        email={email}
      />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}

export default CustomerDetails;

