import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useMemo } from 'react';
import { Text } from 'react-native';

export const GET_ITEM = gql`
  query GetItem(
    $removalFilter: ModifierFilterInput
    $substitutionsFilter: ModifierFilterInput
  ) {
    getItem {
      id
      variants {
        id
        removals: modifiers(filter: $removalFilter) {
          ...Modifier
        }
        substitutions: modifiers(filter: $substitutionsFilter) {
          ...Modifier
        }
      }
    }
  }

  fragment Modifier on Modifier {
    id
    type
    name
    price
  }
`

export default function TestComponentViewModel() {
  const {
    data,
    loading,
    error
  } = useQuery(GET_ITEM, {
    variables: {
      "removalFilter": {
        "type": "removal"
      },
      "substitutionsFilter": {
        "type": "substitution"
      }
    }
  })

  if( error) {
    throw error
  }

  console.log("data:", JSON.stringify(data))

  const removals = useMemo(() => {
    return data?.getItem.variants[0]?.removals
  }, [data])

  const subs = useMemo(() => {
    return data?.getItem.variants[0]?.substitutions
  }, [data])
  
  if( loading ) {
    return <Text>Loading...</Text>
  }
  
  return (
    <>
      <Text>Removals</Text>
      {
        removals?.map((removal: any) => {
          return <Text testID='removal' key={removal.id}>{removal.name}</Text>
        })
      }

      <Text>Subs</Text>
      {
        subs?.map((sub: any) => {
          return <Text testID='sub' key={sub.id}>{sub.name}</Text>
        })
      }
    </>
  );
}  
  