import { Bot, Loader2, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'

interface Question {
    id: string
    question: string
    answer?: string | null
    createdAt: string
    isGeneratingAnswer?: boolean
}

interface QuestionItemProps {
    question: Question
}

export function QuestionItem({ question }: QuestionItemProps) {
    const isGenerating = !question.answer

    return (
        <Card className="bg-zinc-950 text-white border border-zinc-700">
            <CardContent>
                <div className="space-y-4">
                    {/* Pergunta */}
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <div className="flex size-8 items-center justify-center rounded-full bg-zinc-800 text-white">
                                <MessageSquare className="size-4 text-zinc-300" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="mb-1 font-medium text-white">Pergunta</p>
                            <p className="whitespace-pre-line text-sm text-zinc-300 leading-relaxed">
                                {question.question}
                            </p>
                        </div>
                    </div>

                    {/* Resposta */}
                    { (!!question.answer || question.isGeneratingAnswer) && (
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <div className="flex size-8 items-center justify-center rounded-full bg-zinc-800 text-white">
                                    <Bot className="size-4 text-zinc-300" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="mb-1 font-medium text-white">Resposta da IA</p>
                                <div className="text-zinc-300">
                                    {question.isGeneratingAnswer ? (
                                        <div className="flex items-center space-x-2">
                                            <Loader2 className="size-4 animate-spin text-zinc-400" />
                                            <span className="text-sm italic text-zinc-400">
                                                Gerando resposta...
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="whitespace-pre-line text-sm leading-relaxed">
                                            {question.answer}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>)}

                    <div className="flex justify-end">
                        <span className="text-xs text-zinc-500">
                            {dayjs(question.createdAt).toNow()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
