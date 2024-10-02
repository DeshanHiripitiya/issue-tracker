'use client'

import React from 'react';
import { Button, Flex, TextArea, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const NewIssuePage = () => {
  return (
    <Flex direction='column' gap='3' maxWidth='500px'>
      <TextField.Root variant='classic' placeholder='Search the docs…' />
      <SimpleMDE placeholder='Reply to comment…' />
      <Button color='indigo' variant='soft'>
        Submit New Issue
      </Button>
    </Flex>
  );
};

export default NewIssuePage;
