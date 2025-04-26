import { ChatSection } from "@/components/ChatSection";
import UploadSection from "@/components/UploadSection";

const page = () => {
  return (
    <section className="h-[91vh] flex flex-col md:flex-row p-2 gap-1">
      <section className="w-full md:w-[25%]">
        <UploadSection />
      </section>
      <section className="w-full md:w-[75%]">
        <ChatSection />
      </section>
    </section>
  );
};

export default page;
