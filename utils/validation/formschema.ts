import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

export const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().refine(isValidPhoneNumber, 'Invalid phone number').optional(),
  inquiries: z.object({
    general: z.boolean(),
    technical: z.boolean(),
    support: z.boolean(),
    misc: z.boolean(),
  }),
  message: z.string().min(10, 'Message must be atleast 10 characters long'),
})

export default formSchema
