"use client";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const MAX_IMAGE_SIZE_MB = 5;

interface GlobalImageUploadProps {
  setMetaData: (value: any) => void;
  methods: any;
  metaData: Record<string, any>;
  valueKey: string;
  multiple?: boolean;
  maxFiles?: number;
  minFiles?: number;
}

export default function GlobalImageUpload({
  setMetaData,
  methods,
  metaData,
  valueKey,
  multiple = true,
  maxFiles,
}: GlobalImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Initialize images from metaData
  useEffect(() => {
    const initial = metaData[valueKey];
    setImages(Array.isArray(initial) ? initial : initial ? [initial] : []);
  }, [metaData, valueKey]);

  const updateImages = useCallback(
    (newImages: string[]) => {
      setImages(newImages);
      setMetaData({ ...metaData, [valueKey]: newImages });
      methods.setValue(valueKey, newImages, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [metaData, setMetaData, methods, valueKey]
  );

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let selectedFiles = Array.from(files);

    if (maxFiles) {
      const availableSlots = maxFiles - images.length;
      if (availableSlots <= 0) {
        toast.error(
          `You can upload up to ${maxFiles} image${maxFiles > 1 ? "s" : ""}.`
        );
        e.target.value = "";
        return;
      }
      selectedFiles = selectedFiles.slice(0, availableSlots);
    }

    if (!multiple) selectedFiles = selectedFiles.slice(0, 1);

    const oversized = selectedFiles.some(
      (file) => file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024
    );
    if (oversized) {
      toast.error(`Each image must be under ${MAX_IMAGE_SIZE_MB}MB.`);
      e.target.value = "";
      return;
    }

    setUploading(true);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`;
    const uploadedUrls: string[] = [];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(uploadUrl, { method: "POST", body: formData });
        const data = await res.json();

        if (data.success) {
          uploadedUrls.push(data.data.url);
        } else {
          toast.error("Image upload failed, please try again.");
          console.error("Upload failed:", data);
        }
      } catch (error) {
        toast.error("An error occurred during upload.");
        console.error("Upload error:", error);
      }
    }

    updateImages(multiple ? [...images, ...uploadedUrls] : uploadedUrls);
    setUploading(false);
    e.target.value = "";
  };

  const handleRemove = useCallback(
    (index: number) => {
      updateImages(images.filter((_, i) => i !== index));
    },
    [images, updateImages]
  );

  return (
    <div className="space-y-2">
      {/* Upload box */}
      <div
        onClick={triggerFileInput}
        className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-gray-50 hover:bg-blue-50"
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleUpload}
        />

        {uploading ? (
          <div className="flex justify-center items-center gap-2 text-blue-500 animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin" />
            Uploading...
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-600">
            <ImagePlus className="w-8 h-8" />
            <p className="text-sm font-medium">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG up to {MAX_IMAGE_SIZE_MB}MB each{" "}
              {multiple ? "(multiple allowed)" : ""}
            </p>
          </div>
        )}
      </div>

      {/* File limit notice */}
      {maxFiles !== undefined && (
        <p className="text-xs text-gray-500 text-center">
          You can upload up to {maxFiles} image{maxFiles > 1 ? "s" : ""}.{" "}
          {maxFiles - images.length} left.
        </p>
      )}

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative rounded overflow-hidden border group"
            >
              <Image
                height={100}
                width={100}
                src={src}
                alt={`uploaded-image-${idx}`}
                className="w-full h-24 object-cover"
                unoptimized
              />
              <button
                type="button"
                aria-label="Remove image"
                className="absolute top-0 right-0 bg-black/60 text-white text-xs p-1 rounded-bl"
                onClick={() => handleRemove(idx)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
