'use client'

import siteMetadata from '@/data/siteMetadata'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ContactUsFormSchema from 'app/validators/formschema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useActionState, useEffect, useRef } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { PhoneInput } from '@/components/PhoneInput'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { MdEmail } from 'react-icons/md'
import InlineLoader from '@/components/InlineLoader'
import { submitContactForm } from '@/app/contact-us/actions'
import {
  initialContactActionState,
  type ContactActionState,
  type ContactField,
} from '@/app/contact-us/contact-state'

type FormSchemaType = z.infer<typeof ContactUsFormSchema>

const INQUIRY_TYPES = ['general', 'technical', 'support', 'miscellaneous'] as const

const INPUT_STYLES =
  'h-10 rounded-lg border-gray-200 bg-gray-50 transition-[border-color,background-color,box-shadow] duration-200 focus-visible:border-primary-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:transition-none dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:border-primary-400 dark:focus-visible:bg-gray-900 dark:focus-visible:ring-primary-400'

const GRID_CONFIG = {
  ROWS: 8,
  COLS: 6,
  ROW_SPACING: 12,
  COL_SPACING: 15,
  BASE_OFFSET: 5,
} as const

interface ContactFormViewProps {
  state: ContactActionState
  formAction: (formData: FormData) => void
  isPending: boolean
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactActionState, FormData>(
    submitContactForm,
    initialContactActionState
  )

  return <ContactFormView state={state} formAction={formAction} isPending={isPending} />
}

export function ContactFormView({ state, formAction, isPending }: ContactFormViewProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      inquiries: undefined,
      message: '',
    },
  })
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status === 'idle') return

    if (state.status === 'success') {
      form.reset()
      resultRef.current?.focus()
      return
    }

    const fieldErrors = state.fieldErrors
    if (fieldErrors) {
      const orderedFields: ContactField[] = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'inquiries',
        'message',
      ]
      const firstInvalidField = orderedFields.find((field) => fieldErrors[field]?.length)

      for (const field of orderedFields) {
        const message = fieldErrors[field]?.[0]
        if (message) form.setError(field, { type: 'server', message })
      }

      if (firstInvalidField) {
        form.setFocus(firstInvalidField)
        return
      }
    }

    resultRef.current?.focus()
  }, [form, state])

  const onSubmit = form.handleSubmit((_values, event) => {
    const target = event?.currentTarget
    if (!(target instanceof HTMLFormElement)) return
    const formData = new FormData(target)
    startTransition(() => formAction(formData))
  })

  return (
    <div className="container py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Any questions? We'd love to hear from you. Fill out the form below and we'll get back to
          you shortly.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-6xl">
        <div className="grid items-stretch gap-0 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 md:grid-cols-2">
          {/* Contact Information Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-secondary-700 to-secondary-900 p-8 text-white md:p-12">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold leading-tight">Contact Information</h2>
                <p className="mt-6 text-lg leading-relaxed text-white/90">
                  We're here to help and answer any questions you might have. We look forward to
                  hearing from you.
                </p>
              </div>
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <MdEmail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70">Email us</p>
                    <p className="text-lg font-semibold">{siteMetadata.email}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Packed grid pattern of ylang-ylang flowers */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {Array.from({ length: GRID_CONFIG.ROWS }, (_, row) =>
                Array.from({ length: GRID_CONFIG.COLS }, (_, col) => {
                  const left = GRID_CONFIG.BASE_OFFSET + col * GRID_CONFIG.COL_SPACING
                  const top = GRID_CONFIG.BASE_OFFSET + row * GRID_CONFIG.ROW_SPACING
                  const isCenter = row >= 2 && row <= 5 && col >= 2 && col <= 3

                  return (
                    <div
                      key={`flower-${row}-${col}`}
                      aria-hidden="true"
                      className={`absolute opacity-[0.4] ${isCenter ? 'block' : ''}`}
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      <Image
                        src="/static/images/logo-yellow.svg"
                        alt=""
                        width={250}
                        height={250}
                        className="h-8 w-8 object-contain md:h-16 md:w-16"
                      />
                    </div>
                  )
                })
              ).flat()}
            </div>

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-black/0 via-transparent to-white/5"></div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 dark:bg-gray-900 md:p-12">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Send us a message
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">We'll respond within 24 hours</p>
            </div>
            <Form {...form}>
              <form
                action={formAction}
                onSubmit={onSubmit}
                aria-busy={isPending}
                className="space-y-8"
              >
                <div
                  ref={resultRef}
                  aria-live="polite"
                  aria-atomic="true"
                  className={
                    state.status === 'idle'
                      ? 'sr-only'
                      : state.status === 'success'
                        ? 'rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-100'
                        : 'rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-100'
                  }
                  role={state.status === 'error' ? 'alert' : 'status'}
                  tabIndex={-1}
                >
                  {state.status === 'idle' ? '' : state.message}
                </div>
                <div
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                {/* Name Fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="given-name"
                            maxLength={80}
                            placeholder="What should we call you?"
                            {...field}
                            className={INPUT_STYLES}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="family-name"
                            maxLength={80}
                            placeholder="And your family name?"
                            {...field}
                            className={INPUT_STYLES}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            autoComplete="email"
                            maxLength={254}
                            spellCheck={false}
                            placeholder="your.email@example.com"
                            {...field}
                            className={INPUT_STYLES}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            defaultCountry="PH"
                            autoComplete="tel"
                            maxLength={32}
                            placeholder="Your phone number"
                            {...field}
                            className={INPUT_STYLES}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Inquiry Type */}
                <FormField
                  control={form.control}
                  name="inquiries"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-4">
                      <fieldset
                        className="space-y-4"
                        aria-invalid={fieldState.invalid}
                        aria-describedby={
                          fieldState.invalid ? 'contact-inquiries-error' : undefined
                        }
                      >
                        <legend className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Type of Inquiry
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                          {INQUIRY_TYPES.map((type, index) => {
                            const inputId = `inquiry-${type}`

                            return (
                              <label
                                key={type}
                                htmlFor={inputId}
                                className="flex items-center space-x-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                              >
                                <input
                                  id={inputId}
                                  type="radio"
                                  name={field.name}
                                  value={type}
                                  checked={field.value === type}
                                  onBlur={field.onBlur}
                                  onChange={() => field.onChange(type)}
                                  ref={index === 0 ? field.ref : undefined}
                                  aria-describedby={
                                    fieldState.invalid ? 'contact-inquiries-error' : undefined
                                  }
                                  className="h-5 w-5 border-gray-300 text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary-400 dark:focus-visible:ring-primary-400"
                                />
                                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                              </label>
                            )
                          })}
                        </div>
                      </fieldset>
                      <FormMessage id="contact-inquiries-error" className="text-sm" />
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          autoComplete="off"
                          maxLength={5000}
                          placeholder="Please tell us how we can help you…"
                          {...field}
                          className="min-h-[120px] rounded-lg border-gray-200 bg-gray-50 transition-[border-color,background-color,box-shadow] duration-200 focus-visible:border-primary-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:transition-none dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:border-primary-400 dark:focus-visible:bg-gray-900 dark:focus-visible:ring-primary-400"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 w-full rounded-lg bg-primary-500 font-medium text-gray-950 shadow-lg transition-[background-color,box-shadow] duration-200 hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 motion-reduce:transition-none dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-900"
                    disabled={isPending}
                    aria-busy={isPending}
                  >
                    {isPending ? (
                      <InlineLoader text="Sending your message…" size={20} color="text-gray-950" />
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
