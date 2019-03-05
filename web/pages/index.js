/* @flow */

import * as React from 'react';
import { Box } from '@rebass/grid/emotion';
import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from '../controls/link';

export default () => (
  <>
    <Head>
      <title>{'Home'}</title>
    </Head>

    <Paper
      component={Box}
      my={16}
      mx="auto"
      p={16}
      width={1}
      css={{
        maxWidth: 960,
      }}
    >
      <Typography variant="h6" css={{ marginBottom: 24 }}>
        Hello, Welcome to Total React Starter:
      </Typography>

      <Link href={{ pathname: '/properties' }}>
        <Button
          to="/properties"
          color="primary"
          variant="contained"
          css={{ marginTop: 24 }}
        >
          Start
        </Button>
      </Link>
    </Paper>
  </>
);
