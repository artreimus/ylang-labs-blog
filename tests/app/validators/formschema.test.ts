import ContactUsFormSchema from '@/app/validators/formschema'

const validMessage = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '+14155552671',
  inquiries: 'technical',
  message: 'I want to discuss an AI engineering project.',
}

describe('ContactUsFormSchema', () => {
  it('accepts a complete realistic contact request', () => {
    expect(ContactUsFormSchema.safeParse(validMessage).success).toBe(true)
  })

  it('accepts an omitted optional phone number and inquiry type', () => {
    const result = ContactUsFormSchema.safeParse({
      firstName: 'Grace',
      lastName: 'Hopper',
      email: 'grace@example.com',
      message: 'Please send me more details.',
    })

    expect(result.success).toBe(true)
  })

  it('rejects missing required fields and malformed contact details', () => {
    const result = ContactUsFormSchema.safeParse({
      firstName: '',
      lastName: '',
      email: 'not-an-email',
      phone: '12345',
      inquiries: 'sales',
      message: '',
    })

    expect(result.success).toBe(false)
    if (result.success) return

    const paths = result.error.issues.map((issue) => issue.path.join('.'))
    expect(paths).toEqual(
      expect.arrayContaining(['firstName', 'lastName', 'email', 'phone', 'inquiries', 'message'])
    )
  })
})
