import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If the user is already logged in, redirect them away from the login page to the admin panel
  if (session) {
    redirect("/admin");
  }

  return <>{children}</>;
}
