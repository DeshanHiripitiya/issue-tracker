'use client';

import React, { useState } from 'react';
import {
  Button,
  Callout,
  Flex,
  Text,
  TextField,
} from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import { issueSchema } from '@/app/validationSchema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof issueSchema>;
// z.infer<typeof issueSchema> will generate the following type automatically:
// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);    


  const onSubmit = handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
            
          } catch (error) {
            // setSubmitting(false);
            setError('An unexpected error occurred.');
            setSubmitting(false);
          }
        }) 

  return (
    <div className='max-w-[500px]'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit}>
        <Flex direction='column' gap='3' maxWidth='500px'>
          <TextField.Root
            variant='classic'
            placeholder='title'
            {...register('title')}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller //This is a component from react-hook-form that allows you to handle complex form fields, such as a custom component or an external UI library that doesn't directly support register
            name='description'
            control={control} //This passes the form control object from react-hook-form to manage the state and validation for this specific field.
            render={(
              { field } //The render prop takes a function that receives field, an object containing methods and props to control the input.
            ) => (
              <SimpleMDE
                placeholder='description'
                {...register('description')}
                {...field}
              />
            )}
          />
          <Text color='red'>{errors.description?.message}</Text>
          <Button color='indigo' variant='soft' disabled={isSubmitting}>
            Submit New Issue {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default NewIssuePage;
