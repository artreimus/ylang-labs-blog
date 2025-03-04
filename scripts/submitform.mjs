import { env } from 'app/env.mjs'
import formSchema from 'app/validators/formschema'

export async function submitForm(data) {
  try {
    const validatedData = formSchema.parse(data)

    const { firstName, lastName, email, message } = validatedData

    console.log(validatedData)
    console.log(env.NEXT_PUBLIC_YLANG_API_KEY)

    if (!firstName || !lastName || !email || !message) {
      return { success: false, message: 'All fields are required.' }
    }

    const response = await fetch(`${env.NEXT_PUBLIC_YLANG_API_URL}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${env.NEXT_PUBLIC_YLANG_API_AUTH}`,
        'x-api-key': env.NEXT_PUBLIC_YLANG_API_KEY,
      },
      body: JSON.stringify({
        ...validatedData,
      }),
    }).catch((err) => {
      return { success: false, message: 'Internal Server Error' }
    })

    const result = await response.json()

    if (result.success) {
      return { success: true, message: 'Form submitted successfully!' }
    } else {
      return { success: false, message: result.message }
    }
  } catch (err) {
    console.error('Error processing form: ', err)
    return { success: false, message: 'Internal Server error.' }
  }
}
