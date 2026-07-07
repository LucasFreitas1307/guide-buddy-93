import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import botLogo from "@/assets/fanut-bot.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Assistente Virtual FANUT/UFG" },
      {
        name: "description",
        content:
          "Chatbot da Faculdade de Nutrição da UFG: informações sobre graduação, pós-graduação, Clínica Escola, secretaria e atendimento à comunidade.",
      },
      { property: "og:title", content: "Assistente Virtual FANUT/UFG" },
      {
        property: "og:description",
        content:
          "Tire dúvidas sobre a FANUT/UFG: graduação, pós, clínica escola, secretaria e mais.",
      },
    ],
  }),
  component: ChatPage,
});

const QUICK_OPTIONS = [
  { n: "1", label: "Sou aluno(a) da FANUT" },
  { n: "2", label: "Quero estudar na FANUT" },
  { n: "3", label: "Clínica Escola" },
  { n: "4", label: "Extensão e Ligas" },
  { n: "5", label: "Laboratórios e Pesquisa" },
  { n: "6", label: "Servidores e Docentes" },
  { n: "7", label: "Localização e Contato" },
  { n: "8", label: "Atendimento humano" },
];

function ChatPage() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({ transport });
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [status]);

  const isLoading = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    const t = text.trim();
    if (!t || isLoading) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <img src={botLogo} alt="FANUT" className="h-10 w-10" width={40} height={40} />
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold leading-tight">Assistente FANUT/UFG</h1>
            <p className="text-xs text-muted-foreground">
              Faculdade de Nutrição · Universidade Federal de Goiás
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online
          </span>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-3xl flex flex-col px-4">
        <Conversation className="flex-1">
          <ConversationContent className="pb-4">
            {messages.length === 0 && (
              <div className="py-8 space-y-6">
                <div className="text-center space-y-2">
                  <img
                    src={botLogo}
                    alt=""
                    className="mx-auto h-16 w-16"
                    width={64}
                    height={64}
                  />
                  <h2 className="text-xl font-semibold">Olá! 👋</h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Sou o assistente virtual da FANUT/UFG. Escolha uma opção abaixo ou
                    escreva sua dúvida.
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {QUICK_OPTIONS.map((o) => (
                    <button
                      key={o.n}
                      onClick={() => send(o.n)}
                      className="flex items-center gap-3 rounded-lg border bg-card p-3 text-left text-sm transition hover:bg-accent"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-100 font-semibold text-emerald-800">
                        {o.n}
                      </span>
                      <span className="font-medium">{o.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <Message key={message.id} from={message.role === "user" ? "user" : "assistant"}>
                <MessageContent>
                  {message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <MessageResponse key={i}>{part.text}</MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))}

            {status === "submitted" && (
              <Message from="assistant">
                <MessageContent>
                  <Shimmer>Pensando...</Shimmer>
                </MessageContent>
              </Message>
            )}

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                Ocorreu um erro ao contatar o assistente. Tente novamente em instantes.
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {messages.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-3">
            <Button variant="outline" size="sm" onClick={() => send("0")}>
              0 · Voltar ao menu
            </Button>
            <Button variant="outline" size="sm" onClick={() => send("8")}>
              8 · Atendimento humano
            </Button>
          </div>
        )}

        <div className="pb-4">
          <PromptInput
            onSubmit={(_, e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua dúvida ou digite o número da opção..."
              disabled={isLoading}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                status={status}
                disabled={!input.trim() || isLoading}
              />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            fanut@ufg.br · Segunda a Sexta, 08:00–17:00
          </p>
        </div>
      </main>
    </div>
  );
}
