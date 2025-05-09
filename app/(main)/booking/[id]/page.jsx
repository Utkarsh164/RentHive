import { getCarById } from "@/actions/car-listing";
import { notFound } from "next/navigation";
import { BookingForm } from "./_components/Booking-form";

export async function generateMetadata() {
  return {
    title: `Book Your Drive | RentHive`,
    description: `Rent in few seconds`,
  };
}

export default async function TestDrivePage({ params }) {
  // Fetch car details
  const { id } = await params;
  const result = await getCarById(id);

  // If car not found, show 404
  if (!result.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-6 gradient-title">Rent car</h1>
      <BookingForm
        car={result.data}
        testDriveInfo={result.data.testDriveInfo}
      />
    </div>
  );
}
