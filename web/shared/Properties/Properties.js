/* @flow */
import React from 'react';
import { graphql } from 'react-relay';
import { Box } from '@rebass/grid/emotion';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { Link } from '../../controls/link';
import {
  type FragmentRefs,
  createFragment,
  createMutation,
} from '../../controls/relay';
import type { Properties_root } from './__generated__/Properties_root.graphql';

type PropertiesData = {|
  root?: Properties_root,
|};

const PropertiesFragment = createFragment<PropertiesData>(
  graphql`
    fragment Properties_root on Query {
      properties {
        edges {
          node {
            id
            createdAt
            livingSurface
            landSurface
            numberOfRooms
            numberOfParkings
          }
        }
      }
    }
  `
);

const PropertyDeleteProperty = createMutation<
  PropertiesDeleteMutation,
  {}
>(graphql`
  mutation PropertiesDeleteMutation($input: DeletePropertyInput!) {
    deleteProperty(input: $input) {
      deletedPropertyId
    }
  }
`);

type Props = {|
  ...FragmentRefs<PropertyData>,
  step?: string,
|};

const ago = date => {
  date = new Date(date);
  var seconds = Math.floor((new Date() - date) / 1000);
  var type;

  var interval = Math.floor(seconds / 31536000); // 365 * 24 * 60 * 60
  if (interval >= 1) {
    type = 'year';
  } else {
    interval = Math.floor(seconds / 2592000); // 30 * 24 * 60 * 60
    if (interval >= 1) {
      type = 'month';
    } else {
      interval = Math.floor(seconds / 86400); // 24 * 60 * 60;
      if (interval >= 1) {
        type = 'day';
      } else {
        interval = Math.floor(seconds / 3600); // 60 * 60
        if (interval >= 1) {
          type = 'hour';
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            type = 'minute';
          } else {
            if (interval < 10) return 'just now';

            interval = seconds;
            type = 'second';
          }
        }
      }
    }
  }

  return `${interval} ${type}${interval > 1 || interval === 0 ? 's' : ''} ago`;
};

export const Properties = (props: Props) => {
  return (
    <PropertiesFragment root={props.root}>
      {({ root }) => (
        <Box mx="auto" width={1} css={{ maxWidth: 960 }}>
          <Box my={16}>
            <Link href={{ pathname: '/property' }}>
              <Button to="/property" color="primary" variant="contained">
                Create New
              </Button>
            </Link>
          </Box>
          <Paper component={Box}>
            <Toolbar>
              <Typography variant="h6">Properties</Typography>
            </Toolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Created At</TableCell>
                  <TableCell align="right">Living surface</TableCell>
                  <TableCell align="right">Land surface</TableCell>
                  <TableCell align="right">Number Of Rooms</TableCell>
                  <TableCell align="right">Number of parkings</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(root.properties.edges || []).map(({ node }) => (
                  <TableRow hover key={node.id}>
                    <TableCell>
                      <Link
                        href={{
                          pathname: '/property',
                          query: { propertyId: node.id },
                        }}
                      >
                        <a>{ago(node.createdAt)}</a>
                      </Link>
                    </TableCell>

                    <TableCell align="right">{node.livingSurface}</TableCell>

                    <TableCell align="right">{node.landSurface}</TableCell>

                    <TableCell align="right">{node.numberOfRooms}</TableCell>

                    <TableCell align="right">{node.numberOfParkings}</TableCell>

                    <TableCell>
                      <PropertyDeleteProperty>
                        {({ mutate }) => (
                          <IconButton
                            aria-label="Delete"
                            onClick={() => {
                              mutate({ propertyId: node.id });
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </PropertyDeleteProperty>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}
    </PropertiesFragment>
  );
};
