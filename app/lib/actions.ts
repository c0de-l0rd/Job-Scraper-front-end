'use server'
import { todo } from 'node:test';
import {z} from 'zod';

const formSchema = z.object({
jobs : z.array(z.string())
})

export type State = {
    errors?: {jobs?: string[];};
    message?: string | null;
}

export async function createJobWatchList(prevState: State | undefined, formData: FormData){

const validatedFields = formSchema.safeParse({

        jobs: formData.get('jobs')
    })

    if(!validatedFields.success){

        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "form validation failed"
        }
    }

    else{
        // insertion query goes her
    }

}