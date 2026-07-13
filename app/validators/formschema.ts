import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

const phoneSchema = z
  .string()
  .trim()
  .max(32, 'Phone number is too long')
  .optional()
  .refine((value) => !value || isValidPhoneNumber(value), 'Invalid phone number')

export const ContactUsFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80, 'First name is too long'),
  lastName: z.string().trim().min(1, 'Last name is required').max(80, 'Last name is too long'),
  email: z.string().trim().email('Invalid email address').max(254, 'Email address is too long'),
  phone: phoneSchema,
  inquiries: z.enum(['general', 'technical', 'support', 'miscellaneous']).optional(),
  message: z.string().trim().min(1, 'Message is required').max(5000, 'Message is too long'),
})

export default ContactUsFormSchema
