'use server';

import { z } from 'zod';

const youtubeUrlSchema = z
  .string()
  .url()
  .refine(url => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?(?:\S+)$/;
    return regExp.test(url);
  }, 'Please enter a valid YouTube URL');

export async function validateAndSubmitYoutubeUrl(prevState: any, formData: FormData) {
  const url = Object.fromEntries(formData.entries()).youtubeUrl as string;

  try {
    youtubeUrlSchema.parse(url);
    // push to database
    console.log('Valid YouTube URL:', url);
    return { success: true, message: 'YouTube URL submitted successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
}
