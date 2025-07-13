import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCreateQuestion } from '@/http/use-create-question'

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(500, 'Pergunta deve ter menos de 500 caracteres'),
})

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>

interface QuestionFormProps {
  roomId: string
}

export function QuestionForm({ roomId }: QuestionFormProps) {

  const { mutateAsync: createQuestion } = useCreateQuestion(roomId)

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
    },
  })



  async function handleCreateQuestion(data: CreateQuestionFormData) {
    await createQuestion(data)
  }

  const { isSubmitting } = form.formState

  return (
    <Card className="bg-zinc-950 text-white border border-zinc-700">
      <CardHeader>
        <CardTitle className="text-white">Fazer uma Pergunta</CardTitle>
        <CardDescription className="text-zinc-300">
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Sua Pergunta</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      className="min-h-[100px] bg-zinc-900 border border-zinc-600 text-white placeholder-zinc-500 focus:ring-zinc-500 focus:border-zinc-500"
                      placeholder="O que você gostaria de saber?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-white text-black hover:bg-zinc-400 "
            >
              Enviar pergunta
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
