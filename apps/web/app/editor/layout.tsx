import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black">
      {/* Navigation */}
      <Header subPage={true} />

      {children}
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
