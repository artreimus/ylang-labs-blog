'use server'

import { env } from '@/app/env.mjs'
import ContactUsFormSchema from '@/app/validators/formschema'
import type { ContactActionState } from '@/app/contact-us/contact-state'
import { createWeb3FormsTransport, type ContactTransport } from '@/lib/contact/web3forms'

type ContactSubmissionDependencies = {
  transport: ContactTransport
}

function optionalFormValue(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

export async function submitContactFormWithDependencies(
  dependencies: ContactSubmissionDependencies,
  _previousState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  if (optionalFormValue(formData, 'company')) {
    return { status: 'error', message: 'We could not send your message. Please try again.' }
  }

  const parsed = ContactUsFormSchema.safeParse({
    firstName: optionalFormValue(formData, 'firstName') ?? '',
    lastName: optionalFormValue(formData, 'lastName') ?? '',
    email: optionalFormValue(formData, 'email') ?? '',
    phone: optionalFormValue(formData, 'phone'),
    inquiries: optionalFormValue(formData, 'inquiries'),
    message: optionalFormValue(formData, 'message') ?? '',
  })

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const result = await dependencies.transport.submit(parsed.data)
    if (!result.success) {
      return {
        status: 'error',
        message: 'We could not send your message. Please try again shortly.',
      }
    }

    return { status: 'success', message: 'Thanks—your message has been sent.' }
  } catch (error) {
    console.error('Contact transport failed', {
      kind: error instanceof DOMException && error.name === 'AbortError' ? 'timeout' : 'upstream',
    })
    return {
      status: 'error',
      message: 'We could not send your message. Please try again shortly.',
    }
  }
}

export async function submitContactForm(
  previousState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const transport = createWeb3FormsTransport({
    accessKey: env.WEB3FORMS_ACCESS_KEY,
    endpoint: env.WEB3FORMS_ENDPOINT,
  })

  return submitContactFormWithDependencies({ transport }, previousState, formData)
}
