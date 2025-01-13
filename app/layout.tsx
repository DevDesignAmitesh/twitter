import LeftSideBar from "@/components/LeftSideBar/LeftSideBar";
import RightSideBar from "@/components/RightSideBar/RightSideBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background pb-10 relative text-text min-h-screen flex justify-center items-start w-full">
        <div className="sm:w-[80%] w-full relative flex justify-end xl:justify-center items-start h-full">
          <LeftSideBar />
          {children}
          <RightSideBar />
        </div>
      </body>
    </html>
  );
}
