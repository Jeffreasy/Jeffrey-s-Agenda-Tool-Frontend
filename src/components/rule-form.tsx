import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form-field'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useCreateRule } from '../hooks/useRules'

const ruleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  summary_contains: z.string().min(1, 'Summary contains is required'),
  offset_minutes: z.string().regex(/^-?\d+$/, 'Offset minutes must be a number'),
  new_event_title: z.string().min(1, 'New event title is required'),
  duration_min: z.string().regex(/^\d+$/, 'Duration must be a positive number'),
})

type RuleFormData = z.infer<typeof ruleSchema>

interface RuleFormProps {
  accountId: string
}

export const RuleForm: React.FC<RuleFormProps> = ({ accountId }) => {
  const createRule = useCreateRule()
  const form = useForm<RuleFormData>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: '',
      summary_contains: '',
      offset_minutes: '',
      new_event_title: '',
      duration_min: '',
    },
  })

  const onSubmit = (data: RuleFormData) => {
    createRule.mutate({
      connected_account_id: accountId,
      name: data.name,
      trigger_conditions: {
        summary_contains: data.summary_contains.split(',').map(s => s.trim()).filter(s => s),
      },
      action_params: {
        offset_minutes: parseInt(data.offset_minutes),
        new_event_title: data.new_event_title,
        duration_min: parseInt(data.duration_min),
      },
    })
    form.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Rule</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Automation Rule</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rule Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter rule name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary_contains"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary Contains (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Work, Meeting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offset_minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offset Minutes</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. -60" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_event_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Prepare for work" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration Minutes</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createRule.isPending}>
              {createRule.isPending ? 'Creating...' : 'Create Rule'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}