C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\dist







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\node_modules







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\public







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\assets







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components








C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\calendar







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\forms







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui








C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui\button.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui\card.tsx
import * as React from 'react'
import { cn } from '../../lib/utils'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui\dialog.tsx
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui\form-field.tsx
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import { cn } from '../../lib/utils'
import { Label } from './label'

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui\form.tsx
import * as React from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'

interface FormProps<TFieldValues extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<TFieldValues>
  onSubmit: (values: TFieldValues) => void | Promise<void>
  children: React.ReactNode
}

function Form<
  TFieldValues extends FieldValues = FieldValues
>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

export { Form }






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui\input.tsx
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui\label.tsx
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ui\select.tsx
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../lib/utils'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\AuthCallback.tsx
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

const AuthCallback = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const setToken = useAuthStore((state) => state.setToken)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setToken(token)
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }, [searchParams, setToken, navigate])

  return <div>Authenticating...</div>
}

export default AuthCallback






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\layout.tsx
import { ThemeToggle } from './theme-toggle'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Agenda Automator</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\ProtectedRoute.tsx
import React, { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [searchParams] = useSearchParams()
  const { token, setToken } = useAuthStore()
  const urlToken = searchParams.get('token')

  useEffect(() => {
    if (urlToken) {
      setToken(urlToken)
    }
  }, [urlToken, setToken])

  if (!token && !urlToken) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\rule-form.tsx
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






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\components\theme-toggle.tsx
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\hooks







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\hooks\useAccounts.ts
import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { Account } from '../types/backend'

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await api.get<Account[]>('/accounts')
      return response.data
    },
  })
}



C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\hooks\useRules.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { Rule } from '../types/backend'

interface CreateRuleData {
  connected_account_id: string
  name: string
  trigger_conditions: object
  action_params: object
}

export const useRules = (accountId?: string) => {
  return useQuery({
    queryKey: ['rules', accountId],
    queryFn: async () => {
      const response = await api.get<Rule[]>(`/accounts/${accountId}/rules`)
      return response.data
    },
    enabled: !!accountId,
  })
}

export const useCreateRule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (rule: CreateRuleData) => {
      const response = await api.post<Rule>('/rules', rule)
      return response.data
    },
    onSuccess: (data) => {
      // Invalideer specifiek voor dit account
      queryClient.invalidateQueries({ queryKey: ['rules', data.connected_account_id] })
    },
  })
}

// --- NIEUW (Feature 2) ---
export const useDeleteRule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ruleId: string) => {
      await api.delete(`/rules/${ruleId}`)
    },
    onSuccess: (_, variables, context) => {
      // We weten niet welk accountId het was, dus invalideer alle rules
      // Een betere implementatie zou het accountId meegeven
      queryClient.invalidateQueries({ queryKey: ['rules'] })
    },
  })
}
// --- EINDE NIEUW ---



C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\hooks\useLogs.ts
import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { AutomationLog } from '../types/backend'

export const useLogs = (accountId?: string) => {
  return useQuery({
    queryKey: ['logs', accountId],
    queryFn: async () => {
      const response = await api.get<AutomationLog[]>(`/accounts/${accountId}/logs`)
      return response.data
    },
    enabled: !!accountId, // Voer alleen uit als we een accountId hebben
    refetchInterval: 60000, // Haal elke minuut opnieuw op
  })
}









C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\lib







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\lib\api.ts
import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\lib\utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\pages








C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\pages\Calendar.tsx
import React from 'react'
import { Layout } from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const Calendar: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">View and manage your calendar events</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>FullCalendar integration coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Calendar component will be implemented here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Calendar






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\pages\Dashboard.tsx
import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button' // <-- NIEUW
import { RuleForm } from '../components/rule-form'
import { useAccounts } from '../hooks/useAccounts'
import { useRules, useDeleteRule } from '../hooks/useRules' // <-- AANGEPAST
import { useLogs } from '../hooks/useLogs' // <-- NIEUW
import { useAuthStore } from '../stores/authStore'
import { format } from 'date-fns' // <-- NIEUW
import { Trash2, CheckCircle, XCircle, SkipForward } from 'lucide-react' // <-- NIEUW

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      console.log("Gevonden token! Opslaan...")
      setToken(token)
      navigate('/dashboard', { replace: true })
    }
  }, [searchParams, setToken, navigate])

  // Data hooks
  const { data: accounts, isLoading: accountsLoading } = useAccounts()
  const firstAccountId = accounts?.[0]?.id

  const { data: rules, isLoading: rulesLoading } = useRules(firstAccountId)
  const { data: logs, isLoading: logsLoading } = useLogs(firstAccountId) // <-- NIEUW (Feature 1)

  // Action hooks
  const deleteRule = useDeleteRule() // <-- NIEUW (Feature 2)

  // --- NIEUW (Feature 1) ---
  const renderLogIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failure':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'skipped':
        return <SkipForward className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  // --- NIEUW (Feature 1) ---
  const getLogMessage = (log: any): string => {
    if (log.status === 'success' && log.action_details?.created_event_summary) {
      return `Created event: "${log.action_details.created_event_summary}"`
    }
    if (log.status === 'failure') {
      return `Failed: ${log.error_message}`
    }
    if (log.status === 'skipped' && log.trigger_details?.trigger_summary) {
      return `Skipped (already exists): "${log.trigger_details.trigger_summary}"`
    }
    return `Processed rule for "${log.trigger_details?.trigger_summary || 'event'}"`
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your accounts and automation rules</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* --- CARD 1: Connected Accounts (Aangepast voor duidelijkheid) --- */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                {accountsLoading ? 'Loading...' : `${accounts?.length || 0} accounts connected`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {accountsLoading && <p>Loading accounts...</p>}
              {accounts?.map((account) => (
                <div key={account.id} className="flex justify-between items-center py-2">
                  <span>{account.email}</span>
                  <span className={`text-sm ${account.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {account.status === 'active' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* --- CARD 2: Automation Rules (ZWAAR AANGEPAST) --- */}
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>
                {rulesLoading ? 'Loading...' : `${rules?.length || 0} rules active`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {firstAccountId && <RuleForm accountId={firstAccountId} />}

              {/* --- NIEUWE LIJST (Feature 2) --- */}
              <div className="mt-6 space-y-2">
                {rulesLoading && <p className="text-sm text-muted-foreground">Loading rules...</p>}
                {!rulesLoading && rules?.length === 0 && (
                  <p className="text-sm text-muted-foreground">No rules created yet.</p>
                )}
                {rules?.map((rule) => (
                  <div key={rule.id} className="flex justify-between items-center p-2 rounded-md border">
                    <span className="text-sm font-medium">{rule.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteRule.mutate(rule.id)}
                      disabled={deleteRule.isPending}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              {/* --- EINDE NIEUWE LIJST --- */}

            </CardContent>
          </Card>
        </div>

        {/* --- CARD 3: Recent Activity (ZWAAR AANGEPAST) --- */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest automation events</CardDescription>
          </CardHeader>
          <CardContent>
            {/* --- NIEUWE LIJST (Feature 1) --- */}
            {logsLoading && <p className="text-sm text-muted-foreground">Loading activity...</p>}
            {!logsLoading && logs?.length === 0 && (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {logs?.map((log) => (
                <div key={log.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {renderLogIcon(log.status)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{getLogMessage(log)}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(log.timestamp), 'dd MMM yyyy, HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* --- EINDE NIEUWE LIJST --- */}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard













C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\pages\Login.tsx
import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const Login: React.FC = () => {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google/login`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Agenda Automator</CardTitle>
          <CardDescription>
            Sign in with Google to manage your calendar automations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGoogleLogin}
            className="w-full"
            size="lg"
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\stores







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\stores\authStore.ts
import { create } from 'zustand'

interface AuthState {
  token: string | null
  setToken: (token: string | null) => void
}

const getInitialToken = () => {
  return localStorage.getItem('user_token')
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('user_token', token)
    } else {
      localStorage.removeItem('user_token')
    }
    set({ token })
  },
}))






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\types







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\types\backend.ts
export interface Account {
  id: string
  user_id: string
  provider: string
  email: string
  status: string
  provider_user_id: string
  created_at: string
}

export interface Rule {
  id: string
  connected_account_id: string
  name: string
  is_active: boolean
  trigger_conditions: object
  action_params: object
  created_at: string
  updated_at: string
}

// --- NIEUW (Feature 1) ---
export interface AutomationLog {
  id: number
  timestamp: string // ISO 8601 date string
  status: 'success' | 'failure' | 'skipped' | 'pending'
  trigger_details: {
    google_event_id?: string
    trigger_summary?: string
    trigger_time?: string
  } | null
  action_details: {
    created_event_id?: string
    created_event_summary?: string
    reminder_time?: string
  } | null
  error_message: string
}
// --- EINDE NIEUW ---

export interface ApiResponse<T> {
  data: T
  message?: string
}






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import AuthCallback from './components/AuthCallback'
import ProtectedRoute from './components/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/google/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\index.css
@tailwind base;
@tailwind components;
@tailwind utilities;






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\src\vite-env.d.ts
/// <reference types="vite/client" />






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\.env
VITE_API_BASE_URL=http://localhost:8080/api/v1






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\.gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\backend API.md







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\Full Codebase.md







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\package-lock.json







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\package.json
{
  "name": "agenda-automator-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fullcalendar/daygrid": "^6.1.19",
    "@fullcalendar/google-calendar": "^6.1.19",
    "@fullcalendar/react": "^6.1.19",
    "@fullcalendar/timegrid": "^6.1.19",
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@tanstack/react-query": "^5.90.8",
    "@tanstack/react-query-devtools": "^5.90.2",
    "axios": "^1.13.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.553.0",
    "next-themes": "^0.4.6",
    "react": "^18.3.1",
    "react-day-picker": "^9.11.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.66.0",
    "react-router-dom": "^7.1.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.1.12",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.22",
    "eslint": "^9.17.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.1",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.18.2",
    "vite": "^6.0.5"
  }
}







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\README.md







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\REFACTOR.MD







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-in",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "bounce-subtle": "bounce-subtle 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\tsconfig.app.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    
    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\tsconfig.node.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}







C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\tsconfig.tsbuildinfo
{"root":["./src/app.tsx","./src/main.tsx","./src/vite-env.d.ts","./src/components/authcallback.tsx","./src/components/protectedroute.tsx","./src/components/layout.tsx","./src/components/rule-form.tsx","./src/components/theme-toggle.tsx","./src/components/ui/button.tsx","./src/components/ui/card.tsx","./src/components/ui/dialog.tsx","./src/components/ui/form-field.tsx","./src/components/ui/form.tsx","./src/components/ui/input.tsx","./src/components/ui/label.tsx","./src/components/ui/select.tsx","./src/hooks/useaccounts.ts","./src/hooks/userules.ts","./src/lib/api.ts","./src/lib/utils.ts","./src/pages/calendar.tsx","./src/pages/dashboard.tsx","./src/pages/login.tsx","./src/stores/authstore.ts","./src/types/backend.ts"],"version":"5.6.3"}






C:\Users\jeffrey\Desktop\Githubmains\AgendaTool FrontBackend\Frontend\Jeffrey-s-Agenda-Tool FRONTEND\react-app\vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
