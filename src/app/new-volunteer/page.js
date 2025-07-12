import VolunteerForm from "../../components/VolunteerForm";
import { UserButton } from "@clerk/nextjs";

export default function NewVolunteer() {
  return (
    <div>
      <div>
        <VolunteerForm />
      </div>
      <UserButton />
    </div>
  );
}
