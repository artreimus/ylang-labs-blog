'use client'

import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useState } from 'react'
import LogoIcon from '@/data/logo-icon.svg'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import formSchema from 'app/validators/formschema'
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
import { submitForm } from 'scripts/submitform.mjs'
import { Button } from '@/components/ui/button'

type formSchemaType = z.infer<typeof formSchema>

// Convert to SHADCN
export default function ContactPage() {
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
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
      const data = await submitForm(values)

      console.log(data)

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
          description: data.message,
          className: 'bg-white',
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error ',
        className: 'bg-white',
      })
    }
  }

  return (
    <div className="">
      <div className="max-w-7x1 mx-auto px-4 pb-4 text-center">
        <h1 className="font-serif text-4xl">Contact Us</h1>
        <p className="text-gray-500">Any Questions? Feel free to contact us!</p>
      </div>
      <div className="grid items-start gap-8 rounded-2xl bg-gray-100 p-6 md:grid-cols-2">
        <div className="relative h-[62vh] overflow-hidden rounded-2xl bg-gradient-to-br from-[#B4D661] to-[#7AB55C] p-8 text-white">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <h2 className="text-2xl">Contact Information</h2>
            <div>
              <div className="mb-6 space-y-2">
                <p>ylangslabs@gmail.com</p>
              </div>
              <div className="flex gap-4">
                <SocialIcon kind="x" href={siteMetadata.x} size={6} className="" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
            <LogoIcon />
          </div>
        </div>
        <div className="space-y-6 pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 pb-10 md:grid-cols-2">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-4 pb-10 md:grid-cols-2">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput defaultCountry="PH" placeholder="Enter Number" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2 pb-10">
                <FormField
                  control={form.control}
                  name="inquiries"
                  render={() => (
                    <FormItem>
                      <FormLabel>Types of Inqury</FormLabel>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {(['general', 'technical', 'support', 'misc'] as const).map((type) => (
                          <FormField
                            key={type}
                            control={form.control}
                            name="inquiries"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={type}
                                      checked={field.value == type}
                                      onCheckedChange={(checked) => {
                                        field.onChange(checked ? type : undefined)
                                      }}
                                    />
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                      {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </label>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2 pb-8">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write your message..." {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-32 rounded-md bg-[#7AB55C] px-6 py-2 text-white hover:bg-[#6AA54C] md:w-auto"
                >
                  Send Inquiry
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
