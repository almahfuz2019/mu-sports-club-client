"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { GenerateDataWithAi } from "@/helper/GenerateDataWithAi/GenerateDataWithAi";
import { RiRobot2Line } from "react-icons/ri";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { Loader2, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Adjust path based on your project
import { IFields } from "@/Type/IFields";

interface ICommandHistory {
  state: IFields;
  test: string;
  ai: boolean;
}

interface GlobalAICommandInputProps {
  metaData: Record<string, any>;
  setMetaData: React.Dispatch<React.SetStateAction<any>>;
  setMetaDataHistory: React.Dispatch<React.SetStateAction<any>>;
  methods: any; // refine later if needed
  fieldConfig: IFields[];
}

export function GlobalAICommandInput({
  metaData,
  setMetaData,
  setMetaDataHistory,
  methods,
  fieldConfig,
}: GlobalAICommandInputProps) {
  const [command, setCommand] = useState<string>("");
  const [commandHistory, setCommandHistory] = useState<ICommandHistory[]>([]);
  const [aiState, setAiState] = useState<IFields | null>({
    label: "Conversation",
    valueKey: "conversation",
    placeholder: "Conversation",
    type: "text",
    formType: "string",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAi = async () => {
    if (!command) {
      setError("Please enter a valid command.");
      return;
    }
    if (!aiState) {
      setError("Please select a field to generate content for.");
      return;
    }

    setError(null);
    setIsLoading(true);

    let updatedCommand = command;

    fieldConfig.forEach((data: IFields) => {
      const value =
        data?.type === "keywords"
          ? metaData[data.valueKey]?.join(", ")
          : metaData[data.valueKey];

      // Special handling for richtext field
      if (aiState.type === "richtext" && data.type === "richtext") {
        updatedCommand = `Generate a well-formatted description with HTML tags suitable for a rich text editor (like in MS Word). Include elements like <h1> to <h6>, <p>, <i>, <b>, <a>, <ul>, <li>, <ol>, and <u> based on this content: ${
          command || ""
        }`;
      } else {
        updatedCommand = updatedCommand.replace(
          `$$${data.valueKey}`,
          value || ""
        );
      }
    });

    try {
      setCommandHistory((prev) => [
        ...prev,
        {
          state: aiState,
          test: command,
          ai: true,
        },
      ]);

      const generatedContent = await GenerateDataWithAi(updatedCommand);

      setCommandHistory((prev) => [
        ...prev,
        {
          state: aiState,
          test: generatedContent,
          ai: false,
        },
      ]);

      if (aiState?.valueKey === "conversaton") {
        return;
      }

      const updatedMetaData = {
        ...metaData,
        [aiState.valueKey]:
          aiState.type === "keywords"
            ? generatedContent.split(/\s*,\s*/).map((k) => k.trim())
            : generatedContent,
      };

      setMetaData(updatedMetaData);
      methods.setValue(aiState.valueKey, updatedMetaData[aiState.valueKey]);

      setMetaDataHistory((prev: any) => ({
        ...prev,
        [aiState.valueKey]: [
          ...(prev[aiState.valueKey] || []),
          updatedMetaData[aiState.valueKey],
        ],
      }));
    } catch {
      setError("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
      setCommand("");
    }
  };

  const handleInsertState = (valueKey: string) => {
    setCommand((prevCommand) => `${prevCommand} $$${valueKey}`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed top-6 right-6 z-40 rounded-xs cursor-pointer"
        >
          <RiRobot2Line></RiRobot2Line>
          {/* <span className="absolute top-0 right-0 -mt-3 -mr-3 px-2 py-[2px] text-xs bg-slate-700 text-white rounded-xs animate-pulse duration-1000">
            NEW
          </span> */}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-3">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-gray-900">
            Generate with AI
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            Use smart prompts with placeholders (like{" "}
            <code className="text-muted-foreground">$$title</code>) to generate
            rich content.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full overflow-hidden">
          {/* Command History */}
          <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar border rounded-lg bg-white p-3">
            {commandHistory.map((data, i) => (
              <div
                key={i}
                className={`px-4 py-3 text-sm rounded-sm my-2 ${
                  data.ai
                    ? "bg-gray-100 text-slate-800 ml-auto text-right rounded-br-none"
                    : "bg-blue-100/60 text-gray-800 mr-auto rounded-bl-none"
                } w-fit max-w-[90%]`}
              >
                {/* <div className="w-8 h-8 border rounded-full"></div> */}
                {/* <p className="font-semibold mb-1 text-xs  ">
                  {data.ai
                    ? `Command for ${data.state.label}:`
                    : `AI Response:`}
                </p> */}

                <p className="whitespace-pre-wrap break-words text-xs">
                  {data.test}
                </p>
              </div>
            ))}
          </div>

          {/* Command Input */}
          <div className="pt-2 mt-auto">
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="text-sm font-bold text-gray-700">
                  AI Prompt for :
                </FormLabel>
                <Select
                  defaultValue="conversation"
                  onValueChange={(valueKey) => {
                    if (valueKey === "conversation") {
                      setAiState({
                        label: "Conversation",
                        valueKey: "conversation",
                        placeholder: "Conversation",
                        type: "text",
                        formType: "string",
                      });
                    } else {
                      const selected =
                        fieldConfig.find((f) => f.valueKey === valueKey) ||
                        null;
                      setAiState(selected);
                    }
                  }}
                >
                  <SelectTrigger className="flex-1 h-6 rounded-none border-0 shadow-none">
                    <SelectValue placeholder="Select Field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversation">Conversation</SelectItem>
                    {fieldConfig.map((data) =>
                      data?.type === "image" ? null : (
                        <SelectItem key={data.valueKey} value={data.valueKey}>
                          {data.label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Textarea
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Start typing . . . . "
                  className="min-h-28 max-h-[25vh] border rounded-lg p-4 text-sm focus:ring-2 focus:ring-primary resize-none pr-12"
                />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="default"
                        className="absolute bottom-2 right-2 rounded-full"
                        onClick={handleAi}
                        disabled={isLoading || !command || !aiState}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      Generate content with AI
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {error && <p className="text-xs text-red-500 p-1">{error}</p>}
              </div>

              <span className="text-xs text-gray-500 px-1">
                Click a tag to insert placeholder:
              </span>
              <div className="flex flex-wrap gap-2 px-1">
                {fieldConfig
                  .filter((data) => data.type !== "image")
                  .map((data) => (
                    <button
                      key={data.valueKey}
                      type="button"
                      onClick={() => handleInsertState(data.valueKey)}
                      className="text-xs bg-muted text-muted-foreground hover:bg-primary hover:text-white transition px-2 py-[2px] rounded border cursor-pointer"
                    >
                      {data.label}
                    </button>
                  ))}
              </div>
            </FormItem>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
