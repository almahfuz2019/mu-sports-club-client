"Use client";
import GalleryImage from "@/components/layout/Home/Gallery/GalleryImage/GalleryImage";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import GalleryVideo from "@/components/layout/Home/Gallery/GalleryVideo/GalleryVideo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="bg-ghost-white">
      <Breadcrumb />
      <div className="px-[5%] py-16">
        <div className="max-w-screen-xl mx-auto">
          <Tabs defaultValue="Image">
            <TabsList className="flex justify-center items-center mx-auto">
              <TabsTrigger value="Image">Images</TabsTrigger>
              <TabsTrigger value="Video">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="Image">
              <GalleryImage />
            </TabsContent>
            <TabsContent value="Video">
              <GalleryVideo />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
