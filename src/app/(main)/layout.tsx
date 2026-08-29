import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ShutterLoader from "@/components/ShutterLoader";
import { getSiteSettings } from "@/lib/settings";
import { SettingsProvider } from "@/components/SettingsContext";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <SettingsProvider settings={settings}>
      <ShutterLoader />
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </SettingsProvider>
  );
}
