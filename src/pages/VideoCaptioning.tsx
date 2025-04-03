
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoCaptioner from "@/components/VideoCaptioner";

const VideoCaptioning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <VideoCaptioner />
      </main>
      <Footer />
    </div>
  );
};

export default VideoCaptioning;
