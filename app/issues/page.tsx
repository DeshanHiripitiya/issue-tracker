import { Button, Link } from '@radix-ui/themes';
import React from 'react';

const IssuePage = () => {
  return (
    <div>
      <Button color='indigo' variant='soft'>
        <Link href='/issues/new'>New Issue</Link>{' '}
      </Button> 
    </div>
  );
};

export default IssuePage;
