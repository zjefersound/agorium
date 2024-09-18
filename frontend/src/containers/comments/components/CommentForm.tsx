import { MdOutlineModeComment } from "react-icons/md";
import { FieldError } from "../../../components/form/FieldError";
import { TextEditor } from "../../../components/form/TextEditor";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { FormEvent, useCallback, useRef, useState } from "react";

interface CommentFormProps {
  initialValue?: string;
  onClear: () => void;
  onSubmit: (content: string) => Promise<void>;
}

export function CommentForm({
  initialValue = "",
  onClear,
  onSubmit,
}: CommentFormProps) {
  const valueRef = useRef(initialValue);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClear = useCallback(() => {
    setError("");
    onClear();
    valueRef.current = "";
  }, [onClear]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const value = valueRef.current;
      if (!value.trim()) {
        setError("Comment is required");
        return;
      }
      setLoading(true);
      onSubmit(value)
        .then(handleClear)
        .finally(() => setLoading(false));
    },
    [onSubmit, handleClear],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col bg-agorium-800 border-[1px] border-agorium-700 rounded-md">
        <div className="transition-[.3s] max-h-[280px] overflow-auto">
          <TextEditor
            markdown={initialValue}
            placeholder="Type your comment..."
            onChange={(value) => {
              valueRef.current = value;
            }}
          />
        </div>
        <div className="flex items-center p-3">
          <FieldError message={error} />
          <Button
            className="ml-auto"
            type="button"
            color="secondary"
            onClick={handleClear}
          >
            Cancel
          </Button>
          <Button className="ml-3" type="submit" disabled={loading}>
            {loading && <Loading size="sm" className="mr-2" />}
            <MdOutlineModeComment className="size-6 mr-2" />
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
}
