// components/HistoryModal.tsx
import { Button } from "@/components/ui/button";

interface HistoryModalProps {
  historyModal: { open: boolean; field: any };
  metaData: Record<string, any>;
  metaDataHistory: Record<string, any[]>;
  setMetaData: (meta: Record<string, any>) => void;
  setHistoryModal: any
  methods: any;
}

export default function GlobalHistoryModal({
  historyModal,
  metaData,
  metaDataHistory,
  setMetaData,
  setHistoryModal,
  methods,
}: HistoryModalProps) {
  if (!historyModal.open || !historyModal.field) return null;

  const field = historyModal.field;
  const historyItems = metaDataHistory[field?.valueKey] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-auto">
        <h2 className="text-lg font-semibold mb-4 capitalize">
          {field.label} History
        </h2>
        <ul className="list-disc pl-5 space-y-4 text-sm">
          {historyItems.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="w-[70%] break-words">
                {Array.isArray(item) ? item.join(", ") : item}
              </span>
              <Button
                variant="outline"
                className="ml-4 text-xs"
                onClick={() => {
                  const isKeywordField = field?.type === "keywords";
                  const restoredValue = item;
                  const updatedMeta = {
                    ...metaData,
                    [field.valueKey]: isKeywordField
                      ? Array.isArray(restoredValue)
                        ? restoredValue
                        : restoredValue.split(/\s*,\s*/)
                      : restoredValue,
                  };

                  setMetaData(updatedMeta);
                  methods.setValue(field.valueKey, restoredValue);

                  setHistoryModal({ open: false, field: null });
                }}
              >
                Restore
              </Button>
            </li>
          ))}
        </ul>
        <div className="text-right mt-6">
          <Button onClick={() => setHistoryModal({ open: false, field: null })}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
