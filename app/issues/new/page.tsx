'use client';

import React, { useState } from 'react';
import { Button, Callout, Flex, TextArea, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import { log } from 'console';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { CgLogIn } from 'react-icons/cg';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
    const [error, setError] = useState('');

  return (
    <div className='max-w-[500px]'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            // setSubmitting(false);
            setError('An unexpected error occurred.');
          }
        })}
      >
        <Flex direction='column' gap='3' maxWidth='500px'>
          <TextField.Root
            variant='classic'
            placeholder='title'
            {...register('title')}
          />
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

          <Button color='indigo' variant='soft'>
            Submit New Issue
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default NewIssuePage;
