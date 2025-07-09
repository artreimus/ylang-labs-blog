'use client'

import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
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

export default function ContactPage() {
  const { toast } = useToast()

  const form = useForm<formSchemaType>({
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
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          Any questions? We'd love to hear from you. Fill out the form below and we'll get back to
          you shortly.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-6xl">
        <div className="grid items-stretch gap-10 overflow-hidden rounded-2xl shadow-xl md:grid-cols-2">
          <div className="relative bg-gradient-to-br from-[#B4D661] to-[#7AB55C] p-8 text-white md:p-12">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold">Contact Information</h2>
                <p className="mt-4 text-white/90">
                  We're here to help and answer any questions you might have. We look forward to
                  hearing from you.
                </p>
              </div>
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-4">
                  <MdEmail className="h-6 w-6" />
                  <p className="text-lg">{siteMetadata.email}</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
              <Image
                src="/static/images/logo-yellow.svg"
                alt="Ylang Labs Logo"
                width={500}
                height={500}
                className="h-full w-full object-contain md:h-3/4 md:w-3/4 lg:h-2/3 lg:w-2/3"
              />
            </div>
          </div>
          <div className="bg-background p-8 md:p-12">
            <h3 className="text-foreground mb-8 text-3xl font-semibold">Send us a message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="What should we call you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="And your family name?" {...field} />
                        </FormControl>
                        <FormMessage />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Where can we reach you? 📧" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput defaultCountry="PH" placeholder="Got digits? 📱" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="inquiries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Inquiry</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          {(['general', 'technical', 'support', 'misc'] as const).map((type) => (
                            <FormItem key={type} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value === type}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange(type)
                                      : field.onChange(undefined)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please tell us how we can help you..."
                          {...field}
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary-500 text-white shadow-lg transition-all duration-200 hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <InlineLoader text="Sending..." size={20} />
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
