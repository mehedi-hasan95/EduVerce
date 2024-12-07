import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "./uploadthing";
import { toast } from "sonner";

interface Props {
  onChange: (url?: string) => void;
  endPoint: keyof typeof ourFileRouter;
  value?: any;
}
export const UploadFile = ({ onChange, endPoint }: Props) => {
  return (
    <div>
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`);
        }}
      />
    </div>
  );
};
