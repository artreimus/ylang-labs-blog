'use client'

import siteMetadata from '@/data/siteMetadata'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import ContactUsFormSchema from 'app/validators/formschema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/hooks/use-toast'
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
import { env } from 'app/env.mjs'
import Image from 'next/image'
import { MdEmail } from 'react-icons/md'
import InlineLoader from '@/components/InlineLoader'

type FormSchemaType = z.infer<typeof ContactUsFormSchema>

const INQUIRY_TYPES = ['general', 'technical', 'support', 'misc'] as const

const INPUT_STYLES =
  'h-10 rounded-lg border-gray-200 bg-gray-50 transition-all duration-200 focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-primary-400 dark:focus:bg-gray-900'

const GRID_CONFIG = {
  ROWS: 8,
  COLS: 6,
  ROW_SPACING: 12,
  COL_SPACING: 15,
  BASE_OFFSET: 5,
} as const

export default function ContactPage() {
  const { toast } = useToast()

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

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const formData = {
        ...values,
        name: `${values.firstName} ${values.lastName}`,
        access_key: env.NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY,
      }

      const json = JSON.stringify(formData)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'Success!',
          description: 'Form submitted successfully!',
        })
        form.reset()
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.message || 'Something went wrong',
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while submitting the form',
      })
    }
  }

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
          <div className="relative overflow-hidden bg-gradient-to-br from-[#B4D661] to-[#7AB55C] p-8 text-white md:p-12">
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
                    <MdEmail className="h-6 w-6" />
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
                      className={`absolute opacity-[0.4] ${isCenter ? 'block' : ''}`}
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      <Image
                        src="/static/images/logo-yellow.svg"
                        alt="Flower"
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Type of Inquiry
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-4">
                          {INQUIRY_TYPES.map((type) => (
                            <FormItem key={type} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value === type}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange(type)
                                      : field.onChange(undefined)
                                  }}
                                  className="h-5 w-5 rounded-md border-2 border-gray-300 data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500 dark:border-gray-600 dark:data-[state=checked]:border-primary-400 dark:data-[state=checked]:bg-primary-400"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage className="text-sm" />
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
                          placeholder="Please tell us how we can help you..."
                          {...field}
                          className="min-h-[120px] rounded-lg border-gray-200 bg-gray-50 transition-all duration-200 focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-primary-400 dark:focus:bg-gray-900"
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
                    className="h-11 w-full rounded-lg bg-primary-500 font-medium text-white shadow-lg transition-all duration-200 hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <InlineLoader text="Sending your message..." size={20} />
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
