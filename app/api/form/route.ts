import { env } from 'utils/env/server.mjs'
import { NextResponse } from 'next/server'

// Apply new API function
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Example: Access form data
    const { firstName, lastName, email, message } = body

    console.log(body)

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Simulate form processing or external API call
    const response = await fetch(`${env.YLANG_API_URL}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${env.YLANG_API_AUTH}`,
        Origin: env.APP_URL,
        'x-api-key': env.YLANG_API_KEY,
      },
      body: JSON.stringify({
        ...body,
      }),
    }).catch((err) => {
      console.error('Environment Variables Failed', err)
      return NextResponse.json(
        { success: false, message: 'Internal Server Error' },
        { status: 400 }
      )
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Form submitted successfully!' })
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing form:', error)
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 })
  }
}
