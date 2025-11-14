import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateAutomationRuleMutation, useEventSummariesQuery } from '@/lib/api'
import { TriggerConditions } from '@/types/backend'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, Sparkles, CheckSquare, Square } from 'lucide-react'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  triggerConditions: z.object({
    summaryEquals: z.string().optional(),
    summaryContains: z.array(z.string()).optional(),
    locationEquals: z.string().optional(),
    locationContains: z.string().optional(),
    descriptionContains: z.string().optional(),
    statusEquals: z.string().optional(),
    creatorContains: z.string().optional(),
    organizerContains: z.string().optional(),
    startTimeAfter: z.string().optional(),
    startTimeBefore: z.string().optional(),
    endTimeAfter: z.string().optional(),
    endTimeBefore: z.string().optional(),
  }),
  actionParams: z.object({
    offsetMinutes: z.number().min(-1440).max(1440),
    durationMin: z.number().min(1).max(60),
    titlePrefix: z.string().optional(),
  }),
  connectedAccountId: z.string().uuid(),
})

export type RuleFormData = z.infer<typeof formSchema>

interface RuleFormProps {
  connectedAccountId: string
  onSuccess?: () => void
}

export function RuleForm({ connectedAccountId, onSuccess }: RuleFormProps) {
  const queryClient = useQueryClient()
  const mutation = useCreateAutomationRuleMutation(queryClient)
  
  // Fetch available event summaries from backend
  const { data: eventSummaries, isLoading: summariesLoading } = useEventSummariesQuery(connectedAccountId)
  
  // State for enabled criteria
  const [enabledCriteria, setEnabledCriteria] = useState({
    summaryEquals: true,
    locationEquals: false,
    locationContains: false,
    descriptionContains: false,
    statusEquals: false,
    creatorContains: false,
    organizerContains: false,
    startTimeAfter: false,
    startTimeBefore: false,
    endTimeAfter: false,
    endTimeBefore: false,
  })

  const form = useForm<RuleFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      connectedAccountId,
      triggerConditions: {
        summaryEquals: '',
        summaryContains: [],
        locationEquals: '',
        locationContains: '',
        descriptionContains: '',
        statusEquals: '',
        creatorContains: '',
        organizerContains: '',
        startTimeAfter: '',
        startTimeBefore: '',
        endTimeAfter: '',
        endTimeBefore: '',
      },
      actionParams: {
        offsetMinutes: -60,
        durationMin: 5,
        titlePrefix: '',
      },
    },
  })

  function onSubmit(values: RuleFormData) {
    // Filter out disabled criteria (keep in camelCase - API layer will convert)
    const filteredTriggerConditions: Partial<TriggerConditions> = {}
    
    if (enabledCriteria.summaryEquals && values.triggerConditions.summaryEquals) {
      filteredTriggerConditions.summaryEquals = values.triggerConditions.summaryEquals
    }
    if (enabledCriteria.locationEquals && values.triggerConditions.locationEquals) {
      filteredTriggerConditions.locationEquals = values.triggerConditions.locationEquals
    }
    if (enabledCriteria.locationContains && values.triggerConditions.locationContains) {
      filteredTriggerConditions.locationContains = values.triggerConditions.locationContains
    }
    if (enabledCriteria.descriptionContains && values.triggerConditions.descriptionContains) {
      filteredTriggerConditions.descriptionContains = values.triggerConditions.descriptionContains
    }
    if (enabledCriteria.statusEquals && values.triggerConditions.statusEquals) {
      filteredTriggerConditions.statusEquals = values.triggerConditions.statusEquals
    }
    if (enabledCriteria.creatorContains && values.triggerConditions.creatorContains) {
      filteredTriggerConditions.creatorContains = values.triggerConditions.creatorContains
    }
    if (enabledCriteria.organizerContains && values.triggerConditions.organizerContains) {
      filteredTriggerConditions.organizerContains = values.triggerConditions.organizerContains
    }
    if (enabledCriteria.startTimeAfter && values.triggerConditions.startTimeAfter) {
      filteredTriggerConditions.startTimeAfter = values.triggerConditions.startTimeAfter
    }
    if (enabledCriteria.startTimeBefore && values.triggerConditions.startTimeBefore) {
      filteredTriggerConditions.startTimeBefore = values.triggerConditions.startTimeBefore
    }
    if (enabledCriteria.endTimeAfter && values.triggerConditions.endTimeAfter) {
      filteredTriggerConditions.endTimeAfter = values.triggerConditions.endTimeAfter
    }
    if (enabledCriteria.endTimeBefore && values.triggerConditions.endTimeBefore) {
      filteredTriggerConditions.endTimeBefore = values.triggerConditions.endTimeBefore
    }

    mutation.mutate(
      {
        connected_account_id: values.connectedAccountId,
        name: values.name,
        trigger_conditions: filteredTriggerConditions as TriggerConditions,
        action_params: values.actionParams,
      },
      {
        onSuccess: () => {
          toast.success('Rule created successfully', {
            description: 'Your automation rule is now active',
          })
          form.reset()
          onSuccess?.()
        },
        onError: (error) => {
          toast.error('Failed to create rule', {
            description: error.message,
          })
        },
      }
    )
  }

  const toggleCriteria = (key: keyof typeof enabledCriteria) => {
    setEnabledCriteria(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Rule Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Rule Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Dienst Reminder" 
                  className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-xs">
                Give your automation rule a descriptive name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trigger Section */}
        <div className="space-y-5 p-5 rounded-lg border bg-muted/30">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Trigger Conditions</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Select which criteria to use for matching events
            </p>
          </div>

          {/* Event Matching */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Event Matching</h4>
            
            {/* Event Summary Match */}
            <div className="space-y-2 pl-0.5">
              <button
                type="button"
                onClick={() => toggleCriteria('summaryEquals')}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {enabledCriteria.summaryEquals ? (
                  <CheckSquare className="h-4 w-4 text-primary" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                Event Title (Exact Match)
              </button>
              
              {enabledCriteria.summaryEquals && (
                <FormField
                  control={form.control}
                  name="triggerConditions.summaryEquals"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {summariesLoading ? (
                          <div className="flex items-center gap-2 h-10 px-3 py-2 border rounded-md">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm text-muted-foreground">Loading event types...</span>
                          </div>
                        ) : eventSummaries && eventSummaries.length > 0 ? (
                          <Select
                            onValueChange={(value) => {
                              // Extract just the summary from the encoded value
                              try {
                                const decoded = JSON.parse(value);
                                field.onChange(decoded.summary);
                              } catch {
                                field.onChange(value);
                              }
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[400px]">
                              {eventSummaries.map((item, index) => {
                                const startTime = item.start_time
                                  ? new Date(item.start_time).toLocaleString('nl-NL', {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })
                                  : null;
                                
                                // Create unique value by encoding all fields
                                const uniqueValue = JSON.stringify({
                                  summary: item.summary,
                                  location: item.location,
                                  start_time: item.start_time,
                                  index
                                });
                                
                                return (
                                  <SelectItem
                                    key={uniqueValue}
                                    value={uniqueValue}
                                    className="py-3"
                                  >
                                    <div className="flex flex-col gap-1 w-full">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="font-medium">{item.summary}</span>
                                        <span className="text-xs text-muted-foreground shrink-0">({item.count}x)</span>
                                      </div>
                                      {item.location && (
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                          <span>📍</span>
                                          <span className="truncate">{item.location}</span>
                                        </div>
                                      )}
                                      {startTime && (
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                          <span>🕐</span>
                                          <span>{startTime}</span>
                                        </div>
                                      )}
                                      {item.description && (
                                        <div className="text-xs text-muted-foreground italic truncate">
                                          {item.description}
                                        </div>
                                      )}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            placeholder="e.g., Dienst"
                            className="transition-all focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormDescription className="text-xs">
                        {eventSummaries && eventSummaries.length > 0
                          ? `${eventSummaries.length} unique event variants found - showing location, time & count`
                          : 'Enter event title to match'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {/* Location & Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Location & Description</h4>
            
            {/* Location Exact Match */}
            <div className="space-y-2 pl-0.5">
              <button
                type="button"
                onClick={() => toggleCriteria('locationEquals')}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {enabledCriteria.locationEquals ? (
                  <CheckSquare className="h-4 w-4 text-primary" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                Location (Exact Match)
              </button>
              
              {enabledCriteria.locationEquals && (
                <FormField
                  control={form.control}
                  name="triggerConditions.locationEquals"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g., Amsterdam"
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Triggers when location exactly matches this text
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Location Contains */}
            <div className="space-y-2 pl-0.5">
              <button
                type="button"
                onClick={() => toggleCriteria('locationContains')}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {enabledCriteria.locationContains ? (
                  <CheckSquare className="h-4 w-4 text-primary" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                Location (Contains)
              </button>
              
              {enabledCriteria.locationContains && (
                <FormField
                  control={form.control}
                  name="triggerConditions.locationContains"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g., Office"
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Triggers when location contains this text
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Description Contains */}
            <div className="space-y-2 pl-0.5">
              <button
                type="button"
                onClick={() => toggleCriteria('descriptionContains')}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {enabledCriteria.descriptionContains ? (
                  <CheckSquare className="h-4 w-4 text-primary" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                Description (Contains)
              </button>
              
              {enabledCriteria.descriptionContains && (
                <FormField
                  control={form.control}
                  name="triggerConditions.descriptionContains"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g., important"
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Triggers when description contains this text
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {/* Event Metadata */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Event Metadata</h4>
            
            {/* Status Equals */}
            <div className="space-y-2 pl-0.5">
              <button
                type="button"
                onClick={() => toggleCriteria('statusEquals')}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {enabledCriteria.statusEquals ? (
                  <CheckSquare className="h-4 w-4 text-primary" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                Status (Exact Match)
              </button>
              
              {enabledCriteria.statusEquals && (
                <FormField
                  control={form.control}
                  name="triggerConditions.statusEquals"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g., confirmed"
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Triggers only for events with this status (confirmed/tentative/cancelled)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Creator Contains */}
            <div className="space-y-2 pl-0.5">
              <button
                type="button"
                onClick={() => toggleCriteria('creatorContains')}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {enabledCriteria.creatorContains ? (
                  <CheckSquare className="h-4 w-4 text-primary" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                Creator/Organizer (Contains)
              </button>
              
              {enabledCriteria.creatorContains && (
                <FormField
                  control={form.control}
                  name="triggerConditions.creatorContains"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g., SDB Planning"
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Triggers when creator/organizer contains this text
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {/* Time-based Filters */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Time-based Filters</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Start Time After */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleCriteria('startTimeAfter')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {enabledCriteria.startTimeAfter ? (
                    <CheckSquare className="h-4 w-4 text-primary" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  Start Time After
                </button>
                
                {enabledCriteria.startTimeAfter && (
                  <FormField
                    control={form.control}
                    name="triggerConditions.startTimeAfter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="time"
                            placeholder="06:00"
                            className="transition-all focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Events starting after this time
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Start Time Before */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleCriteria('startTimeBefore')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {enabledCriteria.startTimeBefore ? (
                    <CheckSquare className="h-4 w-4 text-primary" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  Start Time Before
                </button>
                
                {enabledCriteria.startTimeBefore && (
                  <FormField
                    control={form.control}
                    name="triggerConditions.startTimeBefore"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="time"
                            placeholder="14:00"
                            className="transition-all focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Events starting before this time
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* End Time After */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleCriteria('endTimeAfter')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {enabledCriteria.endTimeAfter ? (
                    <CheckSquare className="h-4 w-4 text-primary" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  End Time After
                </button>
                
                {enabledCriteria.endTimeAfter && (
                  <FormField
                    control={form.control}
                    name="triggerConditions.endTimeAfter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="time"
                            placeholder="13:45"
                            className="transition-all focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Events ending after this time
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* End Time Before */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleCriteria('endTimeBefore')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {enabledCriteria.endTimeBefore ? (
                    <CheckSquare className="h-4 w-4 text-primary" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  End Time Before
                </button>
                
                {enabledCriteria.endTimeBefore && (
                  <FormField
                    control={form.control}
                    name="triggerConditions.endTimeBefore"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="time"
                            placeholder="21:00"
                            className="transition-all focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Events ending before this time
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="space-y-4 p-4 rounded-lg border bg-accent/30">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Reminder Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="actionParams.offsetMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offset (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="-60"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Negative = before event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="actionParams.durationMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="5"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Reminder length
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-11 text-base font-medium group" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Rule...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Create Automation Rule
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}