import { contactTopics } from '../data/contact.js'
import { emailError } from './validation.js'

export const emptyContact = { name: '', email: '', topic: '', message: '' }

const MIN_MESSAGE = 10

export function validateContact(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  const email = emailError(values.email)
  if (email) errors.email = email
  if (!contactTopics.some((t) => t.value === values.topic)) errors.topic = 'Choose what your message is about.'
  if (values.message.trim().length < MIN_MESSAGE) errors.message = `Write at least ${MIN_MESSAGE} characters so a writer can help.`
  return errors
}
