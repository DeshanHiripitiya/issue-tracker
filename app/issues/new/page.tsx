import React from 'react';
import { Button, Flex, TextArea, TextField } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <Flex direction='column' gap='3' maxWidth='250px'>
      <TextField.Root variant='classic' placeholder='Search the docs…' />
      <TextArea variant='classic' placeholder='Reply to comment…' />
      <Button color='indigo' variant='soft'>
        Submit New Issue
      </Button>
    </Flex>
  );
};

export default NewIssuePage;
