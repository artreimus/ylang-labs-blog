'use client'

import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useState } from 'react'
import LogoIcon from '@/data/logo-icon.svg'
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

type formSchemaType = z.infer<typeof ContactUsFormSchema>

// Convert to SHADCN
export default function ContactPage() {
  const { toast } = useToast()

  const form = useForm({
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

  const onSubmit = async (values: formSchemaType) => {
    try {
      // Create form data object for Web3Forms
      const formData = {
        ...values,
        name: `${values.firstName} ${values.lastName}`, // Combined name for Web3Forms
        access_key: env.NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY, // Add access key from environment variables
      }

      // Convert to JSON
      const json = JSON.stringify(formData)

      // Submit to Web3Forms API
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
          className: 'bg-white',
        })
        form.reset()
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.message || 'Something went wrong',
          className: 'bg-white',
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while submitting the form',
        className: 'bg-white',
      })
    }
  }

  return (
    <div className="py-10">
      <div className="max-w-7x1 mx-auto px-4 pb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold">Contact Us</h1>
        <p className="mx-auto max-w-lg text-gray-600">
          Any questions? We'd love to hear from you. Fill out the form below and we'll get back to
          you shortly.
        </p>
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-stretch gap-8 overflow-hidden rounded-2xl shadow-lg md:grid-cols-2">
          <div className="relative bg-gradient-to-br from-[#B4D661] to-[#7AB55C] p-10 text-white">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h2 className="mb-6 text-3xl font-bold">Contact Information</h2>
                <p className="mb-4 text-white/80">
                  We're here to help and answer any questions you might have. We look forward to
                  hearing from you.
                </p>
              </div>
              <div>
                <div className="mb-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <MdEmail className="h-5 w-5" />
                    <p>{siteMetadata.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
              <Image
                src="/static/images/logo-yellow.svg"
                alt="Ylang Labs Logo"
                width={500}
                height={500}
                className="h-full w-full object-contain md:h-3/4 md:w-3/4 lg:h-2/3 lg:w-2/3"
              />
            </div>
          </div>
          <div className="bg-white p-8 md:p-10">
            <h3 className="mb-6 text-2xl font-semibold">Send us a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jane"
                            {...field}
                            className="rounded-md border-gray-300 bg-gray-50 px-4 py-3 transition-all focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="rounded-md border-gray-300 bg-gray-50 px-4 py-3 transition-all focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@email.com"
                            {...field}
                            className="rounded-md border-gray-300 bg-gray-50 px-4 py-3 transition-all focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            defaultCountry="PH"
                            placeholder="Enter Number"
                            {...field}
                            className="rounded-md border-gray-300 bg-gray-50 transition-all focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="inquiries"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Type of Inquiry</FormLabel>
                      <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
                        {(['general', 'technical', 'support', 'misc'] as const).map((type) => (
                          <FormField
                            key={type}
                            control={form.control}
                            name="inquiries"
                            render={({ field }) => (
                              <FormItem className="flex h-full items-start rounded-md border border-gray-200 bg-gray-50 p-3 transition-colors hover:border-green-500">
                                <FormControl>
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      id={type}
                                      checked={field.value == type}
                                      onCheckedChange={(checked) => {
                                        field.onChange(checked ? type : undefined)
                                      }}
                                      className="h-4 w-4 text-green-500 focus:ring-green-500"
                                    />
                                    <label
                                      htmlFor={type}
                                      className="max-w-[80%] cursor-pointer select-none truncate text-xs font-medium leading-tight"
                                    >
                                      {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </label>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage className="mt-1 text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please tell us how we can help you..."
                          {...field}
                          className="min-h-[120px] rounded-md border-gray-300 bg-gray-50 px-4 py-3 transition-all hover:border-green-500 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full rounded-md bg-[#7AB55C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#6AA54C] focus:outline-none focus:ring-2 focus:ring-[#7AB55C] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <InlineLoader text="Sending..." size={20} color="text-white" />
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
