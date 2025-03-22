import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

export const ContactUsFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().refine(isValidPhoneNumber, 'Invalid phone number').optional(),
  inquiries: z.enum(['general', 'technical', 'support', 'miscellaneous']).optional(),
  message: z.string().min(1, 'Message is required'),
})

export default ContactUsFormSchema
