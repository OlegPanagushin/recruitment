/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import Router from 'next/router';
import { Box, Flex } from '@rebass/grid/emotion';
import { Formik, Field } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { Link } from '../../controls/link';

import {
  type FragmentRefs,
  createFragment,
  createMutation,
} from '../../controls/relay';

import type { Property_property } from './__generated__/Property_property.graphql';
import type { PropertyUpsertMutation } from './__generated__/PropertyUpsertMutation.graphql';

type PropertyData = {|
  lead?: Property_property,
|};

const PropertyFragment = createFragment<PropertyData>(
  graphql`
    fragment Property_property on Property {
      id
      numberOfRooms
      livingSurface
      landSurface
      numberOfParkings
    }
  `
);

const PropertyUpsertProperty = createMutation<
  PropertyUpsertMutation,
  {}
>(graphql`
  mutation PropertyUpsertMutation($input: UpsertPropertyInput!) {
    upsertProperty(input: $input) {
      property {
        id
        livingSurface
        landSurface
        numberOfRooms
        numberOfParkings
      }
    }
  }
`);

type Props = {|
  ...FragmentRefs<PropertyData>,
  step?: string,
|};

export const Property = (props: Props) => {
  return (
    <>
      <PropertyFragment property={props.property}>
        {({ property }) => (
          <Box mx="auto" css={{ maxWidth: 960 }} width={1}>
            <Box my={16}>
              <Link href={{ pathname: '/properties' }}>
                <Button to="/properties" color="primary" variant="contained">
                  Back to List
                </Button>
              </Link>
            </Box>

            <Paper component={Box} p={16}>
              <PropertyUpsertProperty>
                {({ mutate }) => (
                  <Formik
                    initialValues={{ ...property }}
                    onSubmit={property => {
                      mutate({
                        property,
                      });
                      Router.push('/properties');
                    }}
                    render={props => (
                      <form onSubmit={props.handleSubmit}>
                        <Grid container spacing={16} css={{ maxWidth: 700 }}>
                          <Grid item xs={6}>
                            <Field
                              name="livingSurface"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Living surface"
                                  variant="filled"
                                  fullWidth
                                  type="number"
                                  required
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              name="landSurface"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Land surface"
                                  variant="filled"
                                  fullWidth
                                  type="number"
                                  required
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              name="numberOfRooms"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Number of rooms"
                                  variant="filled"
                                  fullWidth
                                  type="number"
                                  required
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              name="numberOfParkings"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Number of parkings"
                                  variant="filled"
                                  fullWidth
                                  type="number"
                                  required
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Flex mt={24} justifyContent="flex-end">
                          <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                          >
                            Save
                          </Button>
                        </Flex>
                      </form>
                    )}
                  />
                )}
              </PropertyUpsertProperty>
            </Paper>
          </Box>
        )}
      </PropertyFragment>
    </>
  );
};
