export type ContactField = 'firstName' | 'lastName' | 'email' | 'phone' | 'inquiries' | 'message'

export type ContactActionState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | {
      status: 'error'
      message: string
      fieldErrors?: Partial<Record<ContactField, string[]>>
    }

export const initialContactActionState: ContactActionState = { status: 'idle' }
