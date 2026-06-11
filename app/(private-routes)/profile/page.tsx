import type { Metadata } from "next";
import { getMe } from "../../../lib/api/serverApi";
import ProfileContent from "./ProfileContent";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View your profile information",
};

export default async function ProfilePage() {
  const user = await getMe();

  return <ProfileContent user={user} />;
}
