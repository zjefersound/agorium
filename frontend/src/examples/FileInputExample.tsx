import { useState } from "react";
import { FileInput, UploadedFile } from "../components/form/FileInput";

export function FileInputExample() {
  const [profilePicture, setProfilePicture] = useState<UploadedFile | null>(
    null
  );
  const [files, setFiles] = useState<UploadedFile[]>([]);

  return (
    <div className="p-8 space-y-4">
      <h1 className="font-bold">All File inputs</h1>

      <h2 className="text-lg font-bold">Single file</h2>

      <FileInput.Root>
        <FileInput.Dropzone className="h-[200px]">
          <FileInput.Input
            name="profilePicture"
            files={profilePicture ? [profilePicture] : []}
            onFilesChange={(f) => setProfilePicture(f[0])}
          />
          <FileInput.Preview
            visible={Boolean(profilePicture)}
            onRemove={() => setProfilePicture(null)}
          >
            <FileInput.FilePreview file={profilePicture as UploadedFile} />
          </FileInput.Preview>
        </FileInput.Dropzone>
      </FileInput.Root>

      <h2 className="text-lg font-bold">Multiple files</h2>

      <FileInput.Root>
        <FileInput.Dropzone>
          <FileInput.Input
            name="photos"
            files={files}
            onFilesChange={setFiles}
          />
        </FileInput.Dropzone>
        <FileInput.List
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(file) => {
            console.log("Removed file:", file);
          }}
        />
      </FileInput.Root>
    </div>
  );
}
